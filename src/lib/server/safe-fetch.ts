import "server-only";
import { lookup } from "node:dns/promises";
import net from "node:net";

/**
 * Fetch a user-supplied URL without letting it reach private infrastructure (SSRF):
 * http/https only, standard ports, public IPs only (re-checked on every redirect),
 * time and size limits.
 */

export class FetchRejected extends Error {}

const MAX_BYTES = 3_000_000;
const TIMEOUT_MS = 12_000;
const MAX_REDIRECTS = 4;

export function normaliseUrl(input: string): URL {
  let raw = input.trim();
  if (!raw) throw new FetchRejected("Enter a website address.");
  if (!/^[a-z]+:\/\//i.test(raw)) raw = "https://" + raw;
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    throw new FetchRejected("That doesn't look like a website address.");
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") throw new FetchRejected("Only http and https addresses are allowed.");
  if (u.username || u.password) throw new FetchRejected("Addresses with a username or password aren't allowed.");
  if (u.port && u.port !== "80" && u.port !== "443") throw new FetchRejected("Only standard web ports are allowed.");
  if (!u.hostname.includes(".") || /\.(local|internal|localhost)$/i.test(u.hostname)) throw new FetchRejected("Use a public website address.");
  return u;
}

export function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) || // CGNAT
      (a === 169 && b === 254) || // link-local, cloud metadata
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0) ||
      (a === 198 && (b === 18 || b === 19))
    );
  }
  const v = ip.toLowerCase();
  if (v === "::" || v === "::1") return true;
  if (v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe8") || v.startsWith("fe9") || v.startsWith("fea") || v.startsWith("feb") || v.startsWith("ff")) return true;
  const mapped = v.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  return mapped ? isPrivateIp(mapped[1]) : false;
}

async function assertPublicHost(hostname: string) {
  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) throw new FetchRejected("That address points to a private network.");
    return;
  }
  let addrs: { address: string }[];
  try {
    addrs = await lookup(hostname, { all: true });
  } catch {
    throw new FetchRejected(`Couldn't find ${hostname}. Check the spelling.`);
  }
  if (!addrs.length || addrs.some((a) => isPrivateIp(a.address))) throw new FetchRejected("That address points to a private network.");
}

export type FetchedPage = {
  url: string;
  status: number;
  ms: number;
  headers: Record<string, string>;
  body: string;
  bytes: number;
  redirects: number;
};

export async function safeFetch(input: string, opts: { method?: "GET" | "HEAD"; maxBytes?: number } = {}): Promise<FetchedPage> {
  let url = normaliseUrl(input);
  const started = performance.now();
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublicHost(url.hostname);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    let res: Response;
    try {
      res = await fetch(url, {
        method: opts.method ?? "GET",
        redirect: "manual",
        signal: ctrl.signal,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; STEINARK-Tools/1.0)", Accept: "text/html,application/xhtml+xml,*/*;q=0.8", "Accept-Encoding": "gzip, deflate, br" },
      });
    } catch (e) {
      clearTimeout(timer);
      throw new FetchRejected((e as Error).name === "AbortError" ? "The site took too long to respond (over 12 seconds)." : "Couldn't connect to that site.");
    }
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      clearTimeout(timer);
      url = normaliseUrl(new URL(res.headers.get("location")!, url).toString());
      continue;
    }
    const headers = Object.fromEntries(res.headers.entries());
    let body = "";
    let bytes = 0;
    if (opts.method !== "HEAD" && res.body) {
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      const cap = opts.maxBytes ?? MAX_BYTES;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > cap) {
          await reader.cancel();
          break;
        }
        body += dec.decode(value, { stream: true });
      }
    }
    clearTimeout(timer);
    return { url: url.toString(), status: res.status, ms: Math.round(performance.now() - started), headers, body, bytes, redirects: hop };
  }
  throw new FetchRejected("Too many redirects.");
}

/** Best-effort per-IP limiter (per server instance). */
const hits = new Map<string, number[]>();
export function rateLimited(key: string, max = 20, windowMs = 60_000) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}
