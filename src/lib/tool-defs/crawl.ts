import type { Block } from "./types";

/**
 * Site crawl: up to 10 pages from the sitemap (or the home page's links), checked together
 * for problems you only see across a whole site: duplicate titles, missing headings, broken
 * links. Pure helpers; the server route does the fetching.
 */

export type CrawlPage = { url: string; status: number; ms: number; title: string; description: string; h1: number; words: number; noindex: boolean; canonical: boolean; error?: string };
export type CrawlData = { start: string; source: "sitemap" | "links"; pages: CrawlPage[]; broken: { url: string; status: number; from: string }[]; linksChecked: number };

export const CRAWL_MAX = 10;

/** <loc> URLs from a sitemap (or sitemap index) document. */
export function sitemapUrls(xml: string): string[] {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1].replace(/&amp;/g, "&"));
}

/** Internal page links (same host, http/https, no files or fragments) from a page's HTML. */
export function internalLinks(html: string, base: string): string[] {
  let host = "";
  try {
    host = new URL(base).hostname.replace(/^www\./, "");
  } catch {
    return [];
  }
  const out = new Set<string>();
  for (const m of html.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["']/gi)) {
    try {
      const u = new URL(m[1].trim(), base);
      if (!/^https?:$/.test(u.protocol) || u.hostname.replace(/^www\./, "") !== host) continue;
      if (/\.(pdf|jpe?g|png|gif|webp|avif|svg|zip|mp4|mp3|docx?|xlsx?|css|js|xml|txt)$/i.test(u.pathname)) continue;
      u.hash = "";
      out.add(u.toString());
    } catch {
      /* not a URL */
    }
  }
  return [...out];
}

/** The pages to check: the start page first, then the shortest (most important) paths. */
export function pickPages(start: string, candidates: string[], max = CRAWL_MAX): string[] {
  let host = "";
  try {
    host = new URL(start).hostname.replace(/^www\./, "");
  } catch {
    return [start];
  }
  const norm = (u: string) => u.replace(/\/$/, "");
  const seen = new Set([norm(start)]);
  const rest = candidates
    .filter((u) => {
      try {
        return new URL(u).hostname.replace(/^www\./, "") === host;
      } catch {
        return false;
      }
    })
    .filter((u) => !seen.has(norm(u)) && !!seen.add(norm(u)))
    .sort((a, b) => new URL(a).pathname.split("/").length - new URL(b).pathname.split("/").length || a.length - b.length);
  return [start, ...rest].slice(0, max);
}

const path = (u: string) => {
  try {
    const p = new URL(u).pathname;
    return p.length > 42 ? p.slice(0, 40) + "…" : p;
  } catch {
    return u;
  }
};

function dupes(pages: CrawlPage[], key: "title" | "description") {
  const by = new Map<string, string[]>();
  for (const p of pages) {
    const k = p[key].trim().toLowerCase();
    if (!k) continue;
    by.set(k, [...(by.get(k) ?? []), p.url]);
  }
  return [...by.values()].filter((v) => v.length > 1);
}

export function renderCrawl(d: CrawlData): { blocks: Block[] } {
  const ok = d.pages.filter((p) => !p.error && p.status < 400);
  const dt = dupes(ok, "title"), dd = dupes(ok, "description");
  const noTitle = ok.filter((p) => !p.title), noDesc = ok.filter((p) => !p.description);
  const badH1 = ok.filter((p) => p.h1 !== 1), thin = ok.filter((p) => p.words < 300), noindex = ok.filter((p) => p.noindex), slow = ok.filter((p) => p.ms > 1500);
  const failed = d.pages.filter((p) => p.error || p.status >= 400);
  const list = (ps: { url: string }[]) => ps.slice(0, 4).map((p) => path(p.url)).join(", ") + (ps.length > 4 ? ` and ${ps.length - 4} more` : "");
  const items = [
    { ok: dt.length === 0, text: `Pages sharing the same title: ${dt.reduce((n, g) => n + g.length, 0)}`, fix: `Give every page its own title. Same title on: ${dt.map((g) => g.map(path).join(" + ")).join("; ")}` },
    { ok: dd.length === 0, text: `Pages sharing the same description: ${dd.reduce((n, g) => n + g.length, 0)}`, fix: `Write a description per page. Same on: ${dd.map((g) => g.map(path).join(" + ")).join("; ")}` },
    { ok: noTitle.length === 0, text: `Pages with no title: ${noTitle.length}`, fix: `Add a <title>: ${list(noTitle)}` },
    { ok: noDesc.length === 0, text: `Pages with no meta description: ${noDesc.length}`, fix: `Add one (110–158 characters): ${list(noDesc)}` },
    { ok: badH1.length === 0, text: `Pages without exactly one H1: ${badH1.length}`, fix: `Use one main heading per page: ${list(badH1)}` },
    { ok: thin.length <= Math.floor(ok.length / 3), text: `Thin pages (under 300 words): ${thin.length}`, fix: `Add useful detail (prices, process, FAQs) to: ${list(thin)}` },
    { ok: noindex.length === 0, text: `Pages hidden from Google (noindex): ${noindex.length}`, fix: `Remove noindex if these should be found: ${list(noindex)}` },
    { ok: failed.length === 0 && d.broken.length === 0, text: `Broken pages or links: ${failed.length + d.broken.length}`, fix: `Fix or remove: ${[...failed.map((p) => `${path(p.url)} (${p.error ? "no answer" : p.status})`), ...d.broken.slice(0, 5).map((b) => `${path(b.url)} (${b.status || "no answer"}, linked from ${path(b.from)})`)].join("; ")}` },
    { ok: slow.length === 0, text: `Slow pages (server took over 1.5s): ${slow.length}`, fix: `Check hosting and page size: ${list(slow)}` },
  ];
  const issues = items.filter((i) => !i.ok).length;
  return {
    blocks: [
      { type: "stats", items: [{ label: "Pages checked", value: String(d.pages.length), sub: d.source === "sitemap" ? "from the sitemap" : "from the home page's links" }, { label: "Site-wide issues", value: String(issues), sub: `${d.linksChecked} internal links tested` }] },
      { type: "checks", title: "Whole-site check", items },
      {
        type: "table",
        title: "Every page checked",
        columns: ["Page", "Title", "Description", "H1", "Words", "Status"],
        rows: d.pages.map((p) => [path(p.url), p.title ? `${p.title.length} chars` : "missing", p.description ? `${p.description.length} chars` : "missing", String(p.h1), String(p.words), p.error ? "no answer" : String(p.status)]),
      },
      ...(d.source === "links" ? [{ type: "notice" as const, tone: "info" as const, text: "No sitemap.xml found, so pages were picked from the home page's links. A sitemap helps Google find every page: most AI builders can create one in a minute." }] : []),
    ],
  };
}
