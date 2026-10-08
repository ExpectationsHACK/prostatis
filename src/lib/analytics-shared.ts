// Pure analytics helpers (tested in analytics.test.ts).

export type View = {
  created_at: string;
  path: string;
  referrer: string | null;
  utm_source: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  device: "mobile" | "tablet" | "desktop";
  visitor: string;
  user_id: string | null;
};

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|preview|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|axios|node-fetch|go-http/i;
export const isBot = (ua: string) => !ua || BOT.test(ua);

export function deviceOf(ua: string): View["device"] {
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return "tablet";
  if (/mobi|iphone|android/i.test(ua)) return "mobile";
  return "desktop";
}

/** Only the referring host is kept (never the full URL), and our own host counts as direct. */
export function referrerHost(ref: string | undefined, ownHost: string): string | null {
  if (!ref) return null;
  try {
    const h = new URL(ref).hostname.replace(/^www\./, "");
    if (!h || h === ownHost.replace(/^www\./, "")) return null;
    // Group the common apps so they read well in the admin.
    if (/(^|\.)google\./.test(h)) return "Google";
    if (/(^|\.)bing\.com$/.test(h)) return "Bing";
    if (/(^|\.)(facebook\.com|fb\.com|m\.facebook\.com|l\.facebook\.com)$/.test(h)) return "Facebook";
    if (/(^|\.)instagram\.com$/.test(h)) return "Instagram";
    if (/(^|\.)(t\.co|twitter\.com|x\.com)$/.test(h)) return "X (Twitter)";
    if (/(^|\.)linkedin\.com$|^lnkd\.in$/.test(h)) return "LinkedIn";
    if (/whatsapp/.test(h)) return "WhatsApp";
    if (/(^|\.)tiktok\.com$/.test(h)) return "TikTok";
    if (/(^|\.)youtube\.com$|^youtu\.be$/.test(h)) return "YouTube";
    return h;
  } catch {
    return null;
  }
}

/** Keep paths tidy and bounded: no query strings, no very long junk. */
export function cleanPath(p: unknown): string | null {
  if (typeof p !== "string" || !p.startsWith("/") || p.startsWith("//")) return null;
  const path = p.split(/[?#]/)[0].slice(0, 200);
  if (/^\/(admin|api|_next)(\/|$)/.test(path)) return null;
  return path || "/";
}

export const COUNTRY_NAMES: Record<string, string> = {
  NG: "Nigeria", GH: "Ghana", KE: "Kenya", ZA: "South Africa", US: "United States", GB: "United Kingdom", CA: "Canada",
  DE: "Germany", FR: "France", NL: "Netherlands", IE: "Ireland", AE: "UAE", IN: "India", CM: "Cameroon", BJ: "Benin",
  TG: "Togo", SN: "Senegal", CI: "Côte d'Ivoire", RW: "Rwanda", UG: "Uganda", TZ: "Tanzania", EG: "Egypt", AU: "Australia",
};
export const countryName = (c: string | null) => (c ? (COUNTRY_NAMES[c] ?? c) : "Unknown");

/**
 * The visitor's approximate location from the host's edge headers: Vercel's, Netlify's
 * (`x-nf-geo`, base64 JSON) or Cloudflare's (country only). Nulls when running locally.
 */
export function geoFrom(h: Headers): { country: string | null; region: string | null; city: string | null } {
  const vercelCity = h.get("x-vercel-ip-city");
  if (h.get("x-vercel-ip-country")) {
    return { country: h.get("x-vercel-ip-country"), region: h.get("x-vercel-ip-country-region") || null, city: vercelCity ? decodeURIComponent(vercelCity) : null };
  }
  const nf = h.get("x-nf-geo");
  if (nf) {
    try {
      const g = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(nf), (c) => c.charCodeAt(0)))) as { city?: string; country?: { code?: string }; subdivision?: { code?: string } };
      return { country: g.country?.code || null, region: g.subdivision?.code || null, city: g.city || null };
    } catch {
      // Malformed header: fall through to the country-only headers.
    }
  }
  return { country: h.get("x-country") || h.get("cf-ipcountry") || null, region: null, city: null };
}

export function lagosDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", { timeZone: "Africa/Lagos" });
}

type Count = { key: string; views: number; visitors: number };

function top(rows: View[], keyOf: (v: View) => string, n = 10): Count[] {
  const m = new Map<string, { views: number; v: Set<string> }>();
  for (const r of rows) {
    const k = keyOf(r);
    const e = m.get(k) ?? { views: 0, v: new Set<string>() };
    e.views++;
    e.v.add(r.visitor);
    m.set(k, e);
  }
  return [...m.entries()]
    .map(([key, e]) => ({ key, views: e.views, visitors: e.v.size }))
    .sort((a, b) => b.visitors - a.visitors || b.views - a.views)
    .slice(0, n);
}

/**
 * Summarise page views. The visitor id rotates daily, so "visitors" over a range is the sum
 * of each day's unique visitors (the same way Plausible counts without cookies).
 */
export function summarize(rows: View[], days: number, now = new Date()) {
  const since = now.getTime() - days * 86400_000;
  const inRange = rows.filter((r) => new Date(r.created_at).getTime() >= since);
  const live = new Set(rows.filter((r) => now.getTime() - new Date(r.created_at).getTime() < 5 * 60_000).map((r) => r.visitor)).size;
  const dayUsers = new Set(rows.filter((r) => r.user_id && now.getTime() - new Date(r.created_at).getTime() < 86400_000).map((r) => r.user_id)).size;

  const byDay = new Map<string, { views: number; v: Set<string> }>();
  for (let i = days - 1; i >= 0; i--) byDay.set(lagosDate(new Date(now.getTime() - i * 86400_000).toISOString()), { views: 0, v: new Set() });
  for (const r of inRange) {
    const d = byDay.get(lagosDate(r.created_at));
    if (!d) continue;
    d.views++;
    d.v.add(r.visitor);
  }
  const series = [...byDay.entries()].map(([day, d]) => ({ day, views: d.views, visitors: d.v.size }));
  const visitors = series.reduce((a, d) => a + d.visitors, 0);

  // Bounce: a visitor-day with a single page view.
  const perVisit = new Map<string, number>();
  for (const r of inRange) {
    const k = `${lagosDate(r.created_at)}:${r.visitor}`;
    perVisit.set(k, (perVisit.get(k) ?? 0) + 1);
  }
  const visits = perVisit.size;
  const bounces = [...perVisit.values()].filter((n) => n === 1).length;

  return {
    views: inRange.length,
    visitors,
    live,
    signedInToday: dayUsers,
    pagesPerVisit: visits ? inRange.length / visits : 0,
    bounceRate: visits ? bounces / visits : 0,
    series,
    pages: top(inRange, (r) => r.path),
    countries: top(inRange, (r) => countryName(r.country)),
    cities: top(inRange, (r) => (r.city ? `${r.city}, ${countryName(r.country)}` : "Unknown")),
    referrers: top(inRange, (r) => r.referrer ?? "Direct / none"),
    sources: top(inRange.filter((r) => r.utm_source), (r) => r.utm_source!),
    devices: top(inRange, (r) => r.device),
    tools: top(inRange.filter((r) => r.path.startsWith("/tools/")), (r) => r.path.slice(7)),
    posts: top(inRange.filter((r) => r.path.startsWith("/blog/") && !r.path.startsWith("/blog/tag/")), (r) => r.path.slice(6)),
  };
}

export type Summary = ReturnType<typeof summarize>;
