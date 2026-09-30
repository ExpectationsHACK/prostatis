import type { PageFacts } from "./page-facts";
import type { Block, Values } from "./types";

/**
 * Pure renderers for the live (URL-powered) checks. The server route returns data; these
 * turn it into output blocks and, for checklists, tick the items the scan could verify.
 */

export type LiveResult = { blocks: Block[]; checks?: Record<string, boolean> };

export type PageData = { url: string; status: number; ms: number; bytes: number; https: boolean; compression: string; facts: PageFacts };
export type SpeedData = {
  url: string;
  status: number;
  ttfbMs: number;
  redirects: number;
  htmlBytes: number;
  compression: string;
  cacheControl: string;
  https: boolean;
  counts: { images: number; scripts: number; css: number; lazyImages: number; modernImages: number; fontFamilies: number };
  weights: { html: number; images: number; scripts: number; css: number };
  largest: { type: string; url: string; bytes: number }[];
  viewport: boolean;
  lighthouseEnabled: boolean;
  lighthouse:
    | null
    | { error: string }
    | {
        scores: { performance: number; seo: number; accessibility: number; bestPractices: number };
        metrics: { fcp: string; lcp: string; tbt: string; cls: string; si: string };
        mobile: { viewport: boolean; fontSize: boolean; tapTargets: boolean };
        opportunities: { title: string; saving: string }[];
        screenshot: string | null;
      };
};
export type DomainData = { results: { domain: string; status: "available" | "taken" | "unknown" }[] };
export type UptimeData = { url: string; https: boolean; runs: { status: number; ms: number }[] };
export type ScrapeData = { url: string; status: number; matched: number; rows: string[][]; columns: string[] };

export const kb = (b: number) => (b >= 1_000_000 ? `${(b / 1_000_000).toFixed(1)}MB` : `${Math.round(b / 1000)}KB`);
const secs = (s: string) => Number(s.replace(/[^\d.]/g, "")) || 0;
const shortUrl = (u: string) => u.replace(/^https?:\/\//, "").slice(0, 70);

// ---------- on-page SEO (shared by paste mode and URL mode) ----------
export function auditFromFacts(f: PageFacts, keyword: string) {
  const kw = keyword.trim().toLowerCase();
  const main = kw.split(" ")[0] ?? "";
  const inText = kw ? f.text.toLowerCase().split(kw).length - 1 : 0;
  const items = [
    { ok: f.title.length >= 30 && f.title.length <= 60, text: `Title length: ${f.title.length} chars${f.title ? ` - “${f.title}”` : " (missing)"}`, fix: "Aim for 30–60 characters, keyword near the start." },
    { ok: !!kw && f.title.toLowerCase().includes(main), text: "Keyword appears in the title", fix: `Put “${kw || "your keyword"}” (or its main word) in the <title>.` },
    { ok: f.description.length >= 110 && f.description.length <= 160, text: `Meta description: ${f.description.length} chars${f.description ? "" : " (missing)"}`, fix: "Write 110–160 characters with the keyword and a call to action." },
    { ok: f.h1s.length === 1, text: `H1 headings: ${f.h1s.length}${f.h1s[0] ? ` - “${f.h1s[0].slice(0, 80)}”` : ""}`, fix: "Use exactly one H1 per page." },
    { ok: !!kw && f.h1s.join(" ").toLowerCase().includes(main), text: "Keyword appears in the H1", fix: "Work the keyword naturally into the H1." },
    { ok: f.h2Count >= 2, text: `H2 subheadings: ${f.h2Count}`, fix: "Break content into sections with 2+ H2s." },
    { ok: f.images.noAlt === 0, text: `Images missing alt text: ${f.images.noAlt} of ${f.images.count}`, fix: "Describe every meaningful image in its alt attribute." },
    { ok: f.wordCount >= 300, text: `Word count: ~${f.wordCount}`, fix: "Service pages rank better with 300+ words of useful content." },
    { ok: inText >= 1 && inText <= Math.max(3, Math.round(f.wordCount / 100)), text: `Keyword mentions in content: ${inText}`, fix: inText === 0 ? "Mention the keyword in the first paragraph." : "Don't over-repeat the keyword: write naturally." },
    { ok: f.canonical, text: "Canonical tag present", fix: 'Add <link rel="canonical" href="https://yourdomain/page">.' },
    { ok: f.viewport, text: "Mobile viewport tag present", fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.' },
    { ok: f.lang, text: "HTML lang attribute set", fix: 'Use <html lang="en">.' },
    { ok: f.og.title && f.og.image, text: "Open Graph tags (title + image) for sharing", fix: "Add og:title, og:description and og:image so links look good on WhatsApp." },
    { ok: f.jsonLdTypes.length > 0, text: `Structured data: ${f.jsonLdTypes.slice(0, 4).join(", ") || "none"}`, fix: "Add LocalBusiness / Organization schema as JSON-LD." },
    { ok: !f.noindex, text: "Page is indexable (no noindex)", fix: "Remove the robots noindex tag if you want this page in Google." },
    { ok: f.links.internal >= 3, text: `Internal links: ${f.links.internal}`, fix: "Link to related pages (services, contact) to help Google crawl." },
  ];
  const score = Math.round((items.filter((i) => i.ok).length / items.length) * 100);
  return { items, score };
}

export function renderPageAudit(d: PageData, v: Values): LiveResult {
  const { items, score } = auditFromFacts(d.facts, String(v.keyword ?? ""));
  return {
    blocks: [
      { type: "stats", items: [{ label: "SEO score", value: `${score}/100`, sub: shortUrl(d.url) }, { label: "Issues", value: String(items.filter((i) => !i.ok).length), sub: "fix from top to bottom" }] },
      { type: "checks", title: "Live on-page audit", items },
    ],
  };
}

export function renderMetaCheck(d: PageData): LiveResult {
  const f = d.facts;
  const t = f.title.length, ds = f.description.length;
  return {
    blocks: [
      { type: "serp", title: "How this page looks in Google now", pageTitle: f.title || "(no title: Google will make one up)", url: shortUrl(d.url).replace(/\//g, " › "), description: f.description || "(no meta description: Google will pull random text from the page)" },
      {
        type: "checks",
        title: "Current tags",
        items: [
          { ok: t >= 30 && t <= 60, text: `Title: ${t} characters`, fix: t > 60 ? "Shorten it: Google cuts titles off around 60 characters." : "Make it more descriptive (30–60 characters)." },
          { ok: ds >= 110 && ds <= 158, text: `Description: ${ds} characters`, fix: ds > 158 ? "Trim to under 158 characters." : "Write 110–158 characters that sell the click." },
          { ok: f.og.title && f.og.image, text: "Social share tags (og:title + og:image)", fix: "Add them so WhatsApp and X show a proper preview card." },
          { ok: f.canonical, text: "Canonical tag", fix: "Add a canonical link to avoid duplicate-page issues." },
        ],
      },
      { type: "notice", tone: "info", text: "Use the generator below to write better replacements, then compare." },
    ],
  };
}

export function renderLocalCheck(d: PageData): LiveResult {
  const f = d.facts;
  const localTypes = f.jsonLdTypes.filter((x) => /LocalBusiness|Restaurant|Store|Dentist|Clinic|Salon|Hotel|Organization|Physician|AutoRepair|LegalService|Beauty/i.test(x));
  const contact = f.telLinks > 0 || f.whatsappLinks > 0;
  const addressy = /\b(street|st\.|road|rd\.|avenue|ave|close|crescent|estate|lekki|ikeja|abuja|lagos|port harcourt|ibadan|kano|enugu)\b/i.test(f.text);
  return {
    blocks: [
      {
        type: "checks",
        title: `Website checks: ${shortUrl(d.url)}`,
        items: [
          { ok: localTypes.length > 0, text: `LocalBusiness schema: ${localTypes.join(", ") || "not found"}`, fix: "Add LocalBusiness JSON-LD with name, address, phone, hours and geo." },
          { ok: f.mapEmbed, text: "Google Map embedded", fix: "Embed the map from the Google Business Profile on the contact page." },
          { ok: contact, text: `Click-to-call / WhatsApp links: ${f.telLinks + f.whatsappLinks}`, fix: "Add tel: and wa.me links so mobile visitors can call in one tap." },
          { ok: addressy, text: "Address or area mentioned on the page", fix: "Show the full address (the same format as on Google) in the footer." },
          { ok: f.testimonials, text: "Reviews or testimonials on the page", fix: "Show Google reviews on the site and link to the review page." },
        ],
      },
      { type: "notice", tone: "info", text: "Google Business Profile items (verification, category, photos, reviews) can only be checked in your GBP dashboard, tick those below by hand." },
    ],
    checks: { schema: localTypes.length > 0, map: f.mapEmbed },
  };
}

export function renderLandingCheck(d: PageData): LiveResult {
  const f = d.facts;
  const contact = f.whatsappLinks + f.telLinks + f.mailtoLinks > 0;
  return {
    blocks: [
      { type: "stats", items: [{ label: "Buttons found", value: String(f.buttons.length), sub: f.buttons.slice(0, 3).join(" · ").slice(0, 60) || "none" }, { label: "Forms", value: String(f.forms), sub: `${f.images.count} images` }] },
      {
        type: "checks",
        title: `Auto-detected: ${shortUrl(d.url)}`,
        items: [
          { ok: d.https, text: "Served over HTTPS", fix: "Put the page on your own domain with HTTPS." },
          { ok: f.prices, text: "A price is shown", fix: "Show a price or “from ₦…”." },
          { ok: f.faq, text: "FAQ section", fix: "Answer cost, timeline and risk questions." },
          { ok: f.testimonials, text: "Testimonials / reviews", fix: "Add 3 real testimonials with names." },
          { ok: contact, text: `Contact links (WhatsApp ${f.whatsappLinks}, phone ${f.telLinks}, email ${f.mailtoLinks})`, fix: "Add a WhatsApp link and a phone number." },
          { ok: f.whatsappLinks > 0, text: "Click-to-WhatsApp link", fix: "Use https://wa.me/234… with a pre-filled message." },
          { ok: f.paymentBrands.length > 0, text: `Payment brands: ${f.paymentBrands.join(", ") || "none"}`, fix: "Show Paystack/Stripe logos near the buy button." },
          { ok: f.analytics.length > 0, text: `Analytics: ${f.analytics.join(", ") || "none"}`, fix: "Install analytics and track the main button." },
        ],
      },
      { type: "notice", tone: "info", text: "Copy quality (headline, benefits, urgency) can't be judged by a scan, tick those yourself below." },
    ],
    checks: { https: d.https, price: f.prices, objections: f.faq, testimonials: f.testimonials, contact, wa: f.whatsappLinks > 0, payment: f.paymentBrands.length > 0, analytics: f.analytics.length > 0 },
  };
}

// ---------- speed (+ responsive) ----------
export function renderSpeed(d: SpeedData, mode: "speed" | "responsive" = "speed"): LiveResult {
  const total = d.weights.html + d.weights.images + d.weights.scripts + d.weights.css;
  const bigImages = d.largest.filter((a) => a.type === "image" && a.bytes > 300_000);
  const lh = d.lighthouse && "scores" in d.lighthouse ? d.lighthouse : null;
  const blocks: Block[] = [];
  if (mode === "speed") {
    blocks.push({
      type: "stats",
      items: [
        { label: "Server response", value: `${d.ttfbMs}ms`, sub: d.ttfbMs < 600 ? "good" : d.ttfbMs < 1500 ? "slow-ish" : "slow" },
        { label: "Page weight", value: kb(total), sub: total < 1_500_000 ? "light enough for 4G" : "heavy on mobile data" },
        { label: "Images", value: kb(d.weights.images), sub: `${d.counts.images} images · ${d.counts.lazyImages} lazy` },
        { label: "JavaScript", value: kb(d.weights.scripts), sub: `${d.counts.scripts} scripts` },
      ],
    });
  }
  if (lh) {
    blocks.push({ type: "stats", items: [{ label: "Google mobile score", value: String(lh.scores.performance), sub: "Lighthouse performance" }, { label: "LCP", value: lh.metrics.lcp || "–", sub: "main content visible" }, { label: "CLS", value: lh.metrics.cls || "–", sub: "layout shift" }, { label: "TBT", value: lh.metrics.tbt || "–", sub: "blocking time" }] });
    if (lh.screenshot) blocks.push({ type: "image", title: "How it loads on a phone (Google test)", src: lh.screenshot, alt: "Mobile screenshot of the page" });
    if (lh.opportunities.length) blocks.push({ type: "list", title: "Google's top fixes", items: lh.opportunities.map((o) => `${o.title}${o.saving ? ` - ${o.saving}` : ""}`) });
  } else if (d.lighthouse && "error" in d.lighthouse) {
    blocks.push({ type: "notice", tone: "warn", text: `${d.lighthouse.error}. The quick scan above still ran.` });
  } else if (!d.lighthouseEnabled) {
    blocks.push({ type: "notice", tone: "info", text: "Quick scan complete. For Google's full Lighthouse test (LCP, CLS, mobile screenshot), the site owner can add a free PageSpeed API key." });
  }
  const findings = [
    { ok: d.https, text: "HTTPS", fix: "Serve the site over HTTPS." },
    { ok: !!d.compression, text: `Compression: ${d.compression || "none"}`, fix: "Enable gzip or brotli on the server/host." },
    { ok: d.ttfbMs < 600, text: `Server response ${d.ttfbMs}ms`, fix: "Use static pages, caching or a faster host (Vercel, Netlify, Cloudflare)." },
    { ok: d.counts.images === 0 || d.counts.modernImages / d.counts.images >= 0.6, text: `Modern image formats: ${d.counts.modernImages}/${d.counts.images}`, fix: "Convert images to WebP/AVIF." },
    { ok: bigImages.length === 0, text: `Images over 300KB: ${bigImages.length}`, fix: `Compress: ${bigImages.slice(0, 2).map((a) => a.url.split("/").pop()?.slice(0, 40)).join(", ")}` },
    { ok: d.weights.scripts < 250_000, text: `JavaScript ${kb(d.weights.scripts)}`, fix: "Remove unused libraries, widgets and tracking scripts." },
    { ok: d.counts.fontFamilies <= 2, text: `Google font families: ${d.counts.fontFamilies}`, fix: "Use two font families at most." },
    { ok: d.viewport, text: "Mobile viewport tag", fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.' },
  ];
  if (mode === "speed") {
    blocks.push({ type: "checks", title: `Quick scan: ${shortUrl(d.url)}`, items: findings });
    if (d.largest.length) blocks.push({ type: "table", title: "Heaviest files", columns: ["File", "Type", "Size"], rows: d.largest.filter((a) => a.bytes > 0).map((a) => [a.url.split("/").pop()?.split("?")[0]?.slice(0, 50) || a.url, a.type, kb(a.bytes)]) });
  } else {
    blocks.push({
      type: "checks",
      title: `Mobile checks: ${shortUrl(d.url)}`,
      items: [
        { ok: d.viewport, text: "Mobile viewport tag", fix: "Without it, phones show a zoomed-out desktop page." },
        ...(lh
          ? [
              { ok: lh.mobile.fontSize, text: "Text is readable on phones", fix: "Make body text at least 16px." },
              { ok: lh.mobile.tapTargets, text: "Buttons and links are big enough to tap", fix: "Make tap targets at least 44×44px with space between." },
            ]
          : []),
        { ok: bigImages.length === 0, text: `Heavy images: ${bigImages.length}`, fix: "Big images make phones slow, compress them." },
      ],
    });
  }
  const perf = lh?.scores.performance;
  const checks: Record<string, boolean> = mode === "speed"
    ? {
        webp: d.counts.images === 0 || d.counts.modernImages / d.counts.images >= 0.6,
        sizes: bigImages.length === 0,
        lazy: d.counts.images <= 3 || d.counts.lazyImages >= d.counts.images - 3,
        js: d.weights.scripts < 200_000,
        fonts: d.counts.fontFamilies <= 2,
        ttfb: d.ttfbMs < 600,
        https: d.https,
        ...(lh ? { psi: (perf ?? 0) >= 80, lcp: secs(lh.metrics.lcp) > 0 && secs(lh.metrics.lcp) <= 2.5, cls: Number(lh.metrics.cls) <= 0.1 } : {}),
      }
    : { ...(lh ? { "16px": lh.mobile.fontSize, tap: lh.mobile.tapTargets } : {}), img: bigImages.length === 0 };
  return { blocks, checks };
}

// ---------- domains ----------
export function renderDomains(d: DomainData): LiveResult {
  const label = { available: "✓ Available", taken: "✗ Taken", unknown: "? Check manually" } as const;
  const free = d.results.filter((r) => r.status === "available");
  return {
    blocks: [
      { type: "stats", items: [{ label: "Available", value: String(free.length), sub: `of ${d.results.length} checked` }, { label: "Best pick", value: free[0]?.domain ?? "-", sub: free[0] ? "register it before someone else does" : "try another keyword" }] },
      { type: "table", title: "Live availability (registry lookup)", columns: ["Domain", "Status"], rows: d.results.map((r) => [r.domain, label[r.status]]) },
      { type: "notice", tone: "info", text: "Checked live against the domain registries (RDAP). Availability can change within minutes, confirm at your registrar before paying." },
    ],
  };
}

// ---------- uptime ----------
export function renderUptime(d: UptimeData): LiveResult {
  const okRuns = d.runs.filter((r) => r.status >= 200 && r.status < 400);
  const avg = okRuns.length ? Math.round(okRuns.reduce((n, r) => n + r.ms, 0) / okRuns.length) : 0;
  const up = okRuns.length === d.runs.length;
  return {
    blocks: [
      { type: "stats", items: [{ label: "Status", value: up ? "Up" : okRuns.length ? "Unstable" : "Down", sub: d.runs.map((r) => r.status || "fail").join(" · ") }, { label: "Avg response", value: avg ? `${avg}ms` : "-", sub: avg && avg < 800 ? "healthy" : avg ? "slow: users will notice" : "" }] },
      { type: "notice", tone: up ? "good" : "warn", text: up ? `${shortUrl(d.url)} answered all 3 checks. Now put it on a 5-minute uptime monitor so you hear about outages first.` : `${shortUrl(d.url)} didn't answer reliably. Check the host, the webhook URL and your error logs.` },
    ],
    checks: up ? {} : { uptime: false },
  };
}

// ---------- scraper ----------
export function renderScrape(d: ScrapeData): LiveResult {
  const filled = d.rows.filter((r) => r.some(Boolean));
  const blocks: Block[] = [
    { type: "stats", items: [{ label: "Items matched", value: String(d.matched), sub: "on the first page" }, { label: "Rows with data", value: `${filled.length}/${d.rows.length}`, sub: "first 10 shown" }] },
  ];
  if (d.rows.length) blocks.push({ type: "table", title: "Test run: first rows", columns: d.columns, rows: d.rows.map((r) => r.map((c) => c || "-")) });
  blocks.push(
    d.matched === 0
      ? { type: "notice", tone: "warn", text: "The item selector matched nothing. Right-click a listing on the page → Inspect, and copy a class that wraps one listing." }
      : filled.length < d.rows.length
        ? { type: "notice", tone: "warn", text: "Some rows are empty: adjust the field selectors (they're searched inside each item)." }
        : { type: "notice", tone: "good", text: "Selectors work. Copy the script and run it for all pages." },
  );
  return { blocks };
}
