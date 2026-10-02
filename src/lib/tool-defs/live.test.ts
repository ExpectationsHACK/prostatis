import { describe, expect, it } from "vitest";
import { renderDomains, renderLandingCheck, renderLocalCheck, renderMetaCheck, renderPageAudit, renderScrape, renderSpeed, renderUptime, type PageData, type SpeedData } from "./live";
import { extractPage } from "./page-facts";

const html = `<!doctype html><html lang="en"><head>
<title>Glow Beauty Studio | Lash Extensions in Lekki</title>
<meta name="description" content="Natural-looking lash extensions in Lekki that last up to four weeks. Book online, pay a small deposit with Paystack and get reminders on WhatsApp.">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta property="og:title" content="Glow"><meta property="og:image" content="/og.png">
<link rel="canonical" href="https://glow.ng/">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BeautySalon","name":"Glow"}</script>
<script src="https://www.googletagmanager.com/gtag/js?id=G-1"></script>
</head><body>
<h1>Lash extensions in Lekki</h1><h2>Prices</h2><h2>FAQ</h2>
<p>Classic set from ₦25,000. What our clients say: ★★★★★ Admiralty Way, Lekki.</p>
<img src="/hero.webp" alt="Lashes"><img src="/team.jpg">
<a href="https://wa.me/2348031234567?text=Hi">WhatsApp</a><a href="tel:+2348031234567">Call</a>
<a href="/book" class="btn btn-primary">Book now</a><a href="/about">About</a><a href="/contact">Contact</a>
<iframe src="https://www.google.com/maps/embed?pb=1"></iframe>
<p>Pay securely with Paystack.</p>
</body></html>`;

const page = (h = html): PageData => ({ url: "https://glow.ng/", status: 200, ms: 320, bytes: h.length, https: true, compression: "br", facts: extractPage(h, "https://glow.ng/") });

describe("extractPage", () => {
  const f = extractPage(html, "https://glow.ng/");
  it("reads SEO tags", () => {
    expect(f.title).toBe("Glow Beauty Studio | Lash Extensions in Lekki");
    expect(f.description.length).toBeGreaterThan(110);
    expect(f.h1s).toEqual(["Lash extensions in Lekki"]);
    expect(f.h2Count).toBe(2);
    expect(f.viewport && f.canonical && f.lang).toBe(true);
    expect(f.jsonLdTypes).toContain("BeautySalon");
  });
  it("finds business signals", () => {
    expect(f.whatsappLinks).toBe(1);
    expect(f.telLinks).toBe(1);
    expect(f.mapEmbed).toBe(true);
    expect(f.prices).toBe(true);
    expect(f.analytics).toContain("Google Analytics");
    expect(f.paymentBrands).toContain("Paystack");
    expect(f.images).toMatchObject({ count: 2, noAlt: 1, modern: 1 });
    expect(f.buttons).toContain("Book now");
  });
  it("copes with empty and broken HTML", () => {
    const e = extractPage("");
    expect(e.title).toBe("");
    expect(e.wordCount).toBe(0);
    expect(() => extractPage("<html><title>unclosed <h1>")).not.toThrow();
  });
});

describe("live renderers", () => {
  it("page audit scores a well-built page highly", () => {
    const out = renderPageAudit(page(), { keyword: "lash extensions" });
    const stats = out.blocks.find((b) => b.type === "stats");
    expect(stats && stats.type === "stats" && parseInt(stats.items[0].value)).toBeGreaterThanOrEqual(60);
  });
  it("meta check previews the real title", () => {
    const serp = renderMetaCheck(page()).blocks.find((b) => b.type === "serp");
    expect(serp && serp.type === "serp" && serp.pageTitle).toContain("Glow Beauty");
  });
  it("local check ticks schema and map", () => {
    expect(renderLocalCheck(page()).checks).toEqual({ schema: true, map: true });
  });
  it("landing check ticks detectable items only", () => {
    const c = renderLandingCheck(page()).checks!;
    expect(c).toMatchObject({ https: true, price: true, wa: true, payment: true, analytics: true, contact: true });
    expect(c.h1).toBeUndefined(); // copy quality is never auto-ticked
  });
  it("landing check fails a bare page", () => {
    const c = renderLandingCheck(page("<html><body><p>Hello</p></body></html>")).checks!;
    expect(c).toMatchObject({ price: false, wa: false, payment: false, analytics: false });
  });

  const speed: SpeedData = {
    url: "https://glow.ng/", status: 200, ttfbMs: 420, redirects: 0, htmlBytes: 40_000, compression: "br", cacheControl: "", https: true,
    counts: { images: 6, scripts: 4, css: 1, lazyImages: 5, modernImages: 5, fontFamilies: 2 },
    weights: { html: 40_000, images: 900_000, scripts: 180_000, css: 30_000 },
    largest: [{ type: "image", url: "https://glow.ng/hero.jpg", bytes: 520_000 }],
    viewport: true, lighthouseEnabled: false, lighthouse: null,
  };
  it("speed scan: flags the heavy hero image and passes fast TTFB", () => {
    const out = renderSpeed(speed, "speed");
    expect(out.checks).toMatchObject({ sizes: false, ttfb: true, https: true, js: true, fonts: true, webp: true });
    expect(out.checks!.psi).toBeUndefined(); // no Lighthouse data, no guess
    expect(JSON.stringify(out.blocks)).toContain("hero.jpg");
  });
  it("speed scan uses Lighthouse metrics when present", () => {
    const out = renderSpeed({ ...speed, lighthouseEnabled: true, lighthouse: { field: { scope: "site", lcp: { p75: 2300, category: "FAST" }, inp: { p75: 180, category: "FAST" }, cls: { p75: 0.04, category: "FAST" }, overall: "FAST" }, totalBytes: 2_000_000, scores: { performance: 91, seo: 100, accessibility: 95, bestPractices: 100 }, metrics: { fcp: "1.1 s", lcp: "2.1 s", tbt: "80 ms", cls: "0.02", si: "1.9 s" }, mobile: { viewport: true, fontSize: true, tapTargets: false }, opportunities: [{ title: "Properly size images", saving: "0.6 s" }], screenshot: "data:image/jpeg;base64,xx" } }, "speed");
    expect(out.checks).toMatchObject({ psi: true, lcp: true, cls: true });
    expect(out.blocks.some((b) => b.type === "image")).toBe(true);
    // Real-visitor data comes first, in plain words, and the data cost uses Lighthouse's true page weight.
    const text = JSON.stringify(out.blocks);
    expect(text).toContain("Real visitors");
    expect(text).toContain("2.3s");
    expect(text).toContain("180ms");
    expect(text).toContain("₦1.50"); // 2MB at ₦750/GB
    const mobile = renderSpeed({ ...speed, lighthouse: { field: null, totalBytes: null, scores: { performance: 91, seo: 100, accessibility: 95, bestPractices: 100 }, metrics: { fcp: "", lcp: "", tbt: "", cls: "", si: "" }, mobile: { viewport: true, fontSize: true, tapTargets: false }, opportunities: [], screenshot: null } }, "responsive");
    expect(mobile.checks).toMatchObject({ "16px": true, tap: false });
  });
  it("domains, uptime and scrape render sensibly", () => {
    expect(JSON.stringify(renderDomains({ results: [{ domain: "a.com", status: "available" }, { domain: "b.com", status: "taken" }] }).blocks)).toContain("a.com");
    expect(renderUptime({ url: "https://x.ng", https: true, runs: [{ status: 200, ms: 300 }, { status: 200, ms: 320 }, { status: 200, ms: 310 }] }).checks).toEqual({});
    expect(renderUptime({ url: "https://x.ng", https: true, runs: [{ status: 500, ms: 300 }, { status: 0, ms: 0 }, { status: 200, ms: 310 }] }).checks).toEqual({ uptime: false });
    const sc = renderScrape({ url: "https://x.ng", status: 200, matched: 0, rows: [], columns: ["name"] });
    expect(sc.blocks.some((b) => b.type === "notice" && b.tone === "warn")).toBe(true);
  });
});
