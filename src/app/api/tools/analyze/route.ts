import * as cheerio from "cheerio";
import { extractPage } from "@/lib/tool-defs/page-facts";
import { FetchRejected, normaliseUrl, rateLimited, safeFetch } from "@/lib/server/safe-fetch";

export const maxDuration = 60;

const cache = new Map<string, { at: number; data: unknown }>();
const TTL = 10 * 60_000;
const cached = async <T,>(key: string, fn: () => Promise<T>): Promise<T> => {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.data as T;
  const data = await fn();
  cache.set(key, { at: Date.now(), data });
  if (cache.size > 300) cache.delete(cache.keys().next().value!);
  return data;
};

async function pool<T, R>(items: T[], n: number, fn: (x: T) => Promise<R>): Promise<R[]> {
  const out: R[] = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await fn(items[idx]);
      }
    }),
  );
  return out;
}

// ---------- page: SEO / content facts for one URL ----------
async function page(url: string) {
  const res = await safeFetch(url);
  const facts = extractPage(res.body, res.url);
  return {
    url: res.url,
    status: res.status,
    ms: res.ms,
    bytes: res.bytes,
    https: res.url.startsWith("https://"),
    compression: res.headers["content-encoding"] ?? "",
    facts: { ...facts, text: facts.text.slice(0, 6000) },
  };
}

// ---------- speed: our own quick scan + optional Google Lighthouse ----------
async function assetSize(u: string): Promise<number> {
  try {
    const head = await safeFetch(u, { method: "HEAD" });
    const len = Number(head.headers["content-length"]);
    if (len > 0) return len;
    const get = await safeFetch(u, { maxBytes: 2_000_000 });
    return get.bytes;
  } catch {
    return 0;
  }
}

async function pagespeed(url: string) {
  const key = process.env.PAGESPEED_API_KEY;
  if (!key) return null;
  const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  api.searchParams.set("url", url);
  api.searchParams.set("strategy", "mobile");
  for (const c of ["performance", "seo", "accessibility", "best-practices"]) api.searchParams.append("category", c);
  api.searchParams.set("key", key);
  const r = await fetch(api, { signal: AbortSignal.timeout(55_000) });
  if (!r.ok) return { error: `Google PageSpeed returned ${r.status}` };
  const j = await r.json();
  const lh = j.lighthouseResult;
  const a = lh?.audits ?? {};
  const score = (k: string) => Math.round((lh?.categories?.[k]?.score ?? 0) * 100);
  const opportunities = Object.values(a as Record<string, { title: string; score: number | null; details?: { type?: string; overallSavingsMs?: number }; displayValue?: string }>)
    .filter((x) => x.details?.type === "opportunity" && (x.score ?? 1) < 0.9)
    .sort((x, y) => (y.details?.overallSavingsMs ?? 0) - (x.details?.overallSavingsMs ?? 0))
    .slice(0, 6)
    .map((x) => ({ title: x.title, saving: x.displayValue ?? "" }));
  return {
    scores: { performance: score("performance"), seo: score("seo"), accessibility: score("accessibility"), bestPractices: score("best-practices") },
    metrics: {
      fcp: a["first-contentful-paint"]?.displayValue ?? "",
      lcp: a["largest-contentful-paint"]?.displayValue ?? "",
      tbt: a["total-blocking-time"]?.displayValue ?? "",
      cls: a["cumulative-layout-shift"]?.displayValue ?? "",
      si: a["speed-index"]?.displayValue ?? "",
    },
    mobile: {
      viewport: (a.viewport?.score ?? 0) === 1,
      fontSize: (a["font-size"]?.score ?? 1) === 1,
      tapTargets: (a["tap-targets"]?.score ?? 1) === 1,
    },
    opportunities,
    screenshot: a["final-screenshot"]?.details?.data ?? null,
  };
}

async function speed(url: string) {
  const res = await safeFetch(url);
  const facts = extractPage(res.body, res.url);
  const abs = (s: string) => {
    try {
      return new URL(s, res.url).toString();
    } catch {
      return "";
    }
  };
  const lists = {
    image: [...new Set(facts.images.srcs.map(abs).filter((s) => s.startsWith("http")))].slice(0, 25),
    script: [...new Set(facts.scripts.map(abs).filter((s) => s.startsWith("http")))].slice(0, 15),
    css: [...new Set(facts.stylesheets.map(abs).filter((s) => s.startsWith("http")))].slice(0, 10),
  };
  const entries = Object.entries(lists).flatMap(([type, urls]) => urls.map((u) => ({ type, url: u })));
  const sizes = await pool(entries, 6, (e) => assetSize(e.url));
  const assets = entries.map((e, i) => ({ ...e, bytes: sizes[i] }));
  const sum = (t: string) => assets.filter((a) => a.type === t).reduce((n, a) => n + a.bytes, 0);
  const lighthouse = await pagespeed(res.url).catch(() => ({ error: "Google PageSpeed didn't respond" }));
  return {
    url: res.url,
    status: res.status,
    ttfbMs: res.ms,
    redirects: res.redirects,
    htmlBytes: res.bytes,
    compression: res.headers["content-encoding"] ?? "",
    cacheControl: res.headers["cache-control"] ?? "",
    https: res.url.startsWith("https://"),
    counts: { images: facts.images.count, scripts: facts.scripts.length, css: facts.stylesheets.length, lazyImages: facts.images.lazy, modernImages: facts.images.modern, fontFamilies: facts.fontFamilies },
    weights: { html: res.bytes, images: sum("image"), scripts: sum("script"), css: sum("css") },
    largest: assets.sort((a, b) => b.bytes - a.bytes).slice(0, 6),
    viewport: facts.viewport,
    lighthouse,
    lighthouseEnabled: !!process.env.PAGESPEED_API_KEY,
  };
}

// ---------- domain availability via RDAP ----------
let bootstrap: { at: number; map: Map<string, string> } | null = null;
async function rdapBase(tld: string) {
  if (!bootstrap || Date.now() - bootstrap.at > 24 * 3600_000) {
    const j = await (await fetch("https://data.iana.org/rdap/dns.json", { signal: AbortSignal.timeout(10_000) })).json();
    const map = new Map<string, string>();
    for (const [tlds, urls] of j.services as [string[], string[]][]) for (const t of tlds) map.set(t, urls[0]);
    bootstrap = { at: Date.now(), map };
  }
  return bootstrap.map.get(tld);
}
async function domains(names: string[]) {
  const clean = [...new Set(names.map((n) => n.toLowerCase().trim()).filter((n) => /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(n)))].slice(0, 20);
  return {
    results: await pool(clean, 5, async (d) => {
      const tld = d.split(".").slice(1).join(".");
      const base = (await rdapBase(tld)) ?? (await rdapBase(d.split(".").pop()!));
      if (!base) return { domain: d, status: "unknown" as const };
      try {
        const r = await fetch(`${base.replace(/\/$/, "")}/domain/${d}`, { signal: AbortSignal.timeout(8000), headers: { Accept: "application/rdap+json" } });
        return { domain: d, status: r.status === 404 ? ("available" as const) : r.ok ? ("taken" as const) : ("unknown" as const) };
      } catch {
        return { domain: d, status: "unknown" as const };
      }
    }),
  };
}

// ---------- uptime / response check ----------
async function uptime(url: string) {
  const runs: { status: number; ms: number }[] = [];
  for (let i = 0; i < 3; i++) {
    try {
      const r = await safeFetch(url, { maxBytes: 300_000 });
      runs.push({ status: r.status, ms: r.ms });
    } catch (e) {
      runs.push({ status: 0, ms: 0 });
      if (i === 0) throw e;
    }
  }
  const u = normaliseUrl(url);
  return { url: u.toString(), https: u.protocol === "https:", runs };
}

// ---------- scraper test ----------
async function scrape(body: { url: string; item: string; fields: { name: string; selector: string; attr: string }[] }) {
  const res = await safeFetch(body.url);
  const $ = cheerio.load(res.body);
  const rows: string[][] = [];
  let matched = 0;
  try {
    $(body.item || "body").each((_, el) => {
      matched++;
      if (rows.length >= 10) return;
      rows.push(body.fields.slice(0, 10).map((f) => {
        const node = f.selector === "*" ? $(el) : $(el).find(f.selector).first();
        const v = f.attr === "text" ? node.text() : node.attr(f.attr);
        return (v ?? "").replace(/\s+/g, " ").trim().slice(0, 140);
      }));
    });
  } catch {
    throw new FetchRejected("One of the CSS selectors isn't valid.");
  }
  return { url: res.url, status: res.status, matched, rows, columns: body.fields.map((f) => f.name) };
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) return Response.json({ error: "Too many checks in a minute — wait a moment and try again." }, { status: 429 });
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const url = String(body.url ?? "");
  try {
    switch (body.kind) {
      case "page":
        return Response.json(await cached(`page:${url}`, () => page(url)));
      case "speed":
        return Response.json(await cached(`speed:${url}`, () => speed(url)));
      case "domain":
        return Response.json(await domains(Array.isArray(body.names) ? (body.names as string[]) : []));
      case "uptime":
        return Response.json(await uptime(url));
      case "scrape":
        return Response.json(await scrape({ url, item: String(body.item ?? ""), fields: Array.isArray(body.fields) ? (body.fields as { name: string; selector: string; attr: string }[]) : [] }));
      default:
        return Response.json({ error: "Unknown check." }, { status: 400 });
    }
  } catch (e) {
    if (e instanceof FetchRejected) return Response.json({ error: e.message }, { status: 400 });
    console.error("analyze failed", body.kind, e);
    return Response.json({ error: "Something went wrong analysing that site. Try again." }, { status: 500 });
  }
}
