import { describe, expect, it } from "vitest";
import { tools } from "@/lib/tools";
import { aiPrompt, aiSpecs, factsText, flagClaims } from "./ai";
import { colorDistance, contrast, dominantColors, shadeScale, simulate, solveContrast } from "./color";
import { internalLinks, pickPages, renderCrawl, sitemapUrls, type CrawlData } from "./crawl";
import { defs } from "./design";
import { fitWidth, SERP, textWidth, widthVerdict } from "./pixels";
import { cleanSuggestions, intentOf, renderSuggestions, suggestQueries, type SuggestData } from "./suggest";
import { blocksToHtml } from "./text";

describe("pixel widths (Google cuts by pixels, not characters)", () => {
  it("measures wide letters wider than narrow ones", () => {
    expect(textWidth("WWWWWWWWWW", 20)).toBeGreaterThan(textWidth("iiiiiiiiii", 20) * 3);
    expect(textWidth("a", 20)).toBeCloseTo(11.12, 1);
  });
  it("cuts on a word boundary and adds an ellipsis", () => {
    const long = "Affordable mobile-first website design for small businesses in Lagos and Abuja | PixelHouse Studio";
    const f = fitWidth(long, SERP.title.max, SERP.title.px);
    expect(f.cut).toBe(true);
    expect(f.text.endsWith(" …")).toBe(true);
    expect(textWidth(f.text, SERP.title.px)).toBeLessThanOrEqual(SERP.title.max);
    expect(long.startsWith(f.text.replace(" …", ""))).toBe(true);
  });
  it("passes a title that fits and fails one that doesn't", () => {
    expect(widthVerdict("Lash Extensions in Lekki | Glow Beauty Studio", "title", 30).ok).toBe(true);
    // 58 characters but all capitals and wide letters: too wide, though a character count says fine.
    expect(widthVerdict("WEB DESIGN WORKSHOP MOMENTUM: WOW WEBSITES FOR MOMS AND MUMS", "title", 30).ok).toBe(false);
  });
});

describe("Google search suggestions", () => {
  it("builds a small set of starter searches", () => {
    const q = suggestQueries("Web Design", "Lagos", "all");
    expect(q).toContain("web design lagos");
    expect(q).toContain("how much is web design");
    expect(q.length).toBeLessThanOrEqual(16);
    expect(new Set(q).size).toBe(q.length);
    expect(suggestQueries("", "Lagos", "all")).toEqual([]);
    expect(suggestQueries("lash extensions", "", "questions").every((x) => x.includes("lash extensions"))).toBe(true);
  });
  it("sorts phrases by what the searcher wants", () => {
    expect(intentOf("web design jobs in lagos")).toBe("not-customer");
    expect(intentOf("web design course")).toBe("not-customer");
    expect(intentOf("how much is web design in nigeria")).toBe("price");
    expect(intentOf("web design company in lekki")).toBe("local");
    expect(intentOf("lash extensions near me")).toBe("local");
    expect(intentOf("what is seo")).toBe("question");
    expect(intentOf("best web design agency")).toBe("buy");
  });
  it("drops other countries' searches and duplicates", () => {
    const data: SuggestData = {
      seed: "web design",
      location: "Lagos",
      mode: "all",
      results: [
        { query: "how much is web design", suggestions: ["how much is web design in nigeria", "how much is website design cost in philippines", "How much is web design in Nigeria"] },
        { query: "web design lagos", suggestions: ["web design lagos", "web design jobs in lagos"] },
      ],
    };
    expect(cleanSuggestions(data)).toEqual(["how much is web design in nigeria", "web design lagos", "web design jobs in lagos"]);
    const out = renderSuggestions(data);
    const text = JSON.stringify(out.blocks);
    expect(text).toContain("Not customers");
    expect(text).toContain("keywords.csv");
    expect(text).not.toContain("philippines");
    expect(text).toContain("Keyword Planner"); // honest about volumes
  });
  it("says so plainly when Google has nothing", () => {
    const out = renderSuggestions({ seed: "zzqx", location: "", mode: "all", results: [{ query: "zzqx", suggestions: [] }] });
    expect(out.blocks[0]).toMatchObject({ type: "notice", tone: "warn" });
  });
});

describe("site crawl", () => {
  it("reads sitemaps and internal links", () => {
    expect(sitemapUrls("<urlset><url><loc>https://a.ng/</loc></url><url><loc> https://a.ng/about?x=1&amp;y=2 </loc></url></urlset>")).toEqual(["https://a.ng/", "https://a.ng/about?x=1&y=2"]);
    const links = internalLinks('<a href="/about">A</a><a href="https://www.a.ng/menu#top">M</a><a href="https://other.com/x">X</a><a href="/files/menu.pdf">PDF</a><a href="mailto:x@a.ng">E</a>', "https://a.ng/");
    expect(links).toEqual(["https://a.ng/about", "https://www.a.ng/menu"]);
  });
  it("picks the start page first, then the shortest paths, at most 10", () => {
    const many = Array.from({ length: 30 }, (_, i) => `https://a.ng/blog/post-${i}`);
    const pick = pickPages("https://a.ng/", ["https://a.ng/", "https://a.ng/contact", "https://evil.com/x", ...many]);
    expect(pick[0]).toBe("https://a.ng/");
    expect(pick[1]).toBe("https://a.ng/contact");
    expect(pick).toHaveLength(10);
    expect(pick.some((u) => u.includes("evil.com"))).toBe(false);
  });
  it("finds problems that only show across pages", () => {
    const base = { status: 200, ms: 300, description: "A good description of this page for Google results.", h1: 1, words: 500, noindex: false, canonical: true };
    const d: CrawlData = {
      start: "https://a.ng/",
      source: "sitemap",
      linksChecked: 12,
      broken: [{ url: "https://a.ng/old-menu", status: 404, from: "https://a.ng/" }],
      pages: [
        { ...base, url: "https://a.ng/", title: "Kora Foods | Catering in Ikeja" },
        { ...base, url: "https://a.ng/menu", title: "Kora Foods | Catering in Ikeja", h1: 0 },
        { ...base, url: "https://a.ng/contact", title: "Contact Kora Foods", words: 80 },
      ],
    };
    const checks = renderCrawl(d).blocks.find((b) => b.type === "checks");
    expect(checks?.type).toBe("checks");
    if (checks?.type !== "checks") return;
    const failed = checks.items.filter((i) => !i.ok).map((i) => i.text);
    expect(failed.some((t) => t.startsWith("Pages sharing the same title: 2"))).toBe(true);
    expect(failed.some((t) => t.startsWith("Pages without exactly one H1: 1"))).toBe(true);
    expect(failed.some((t) => t.startsWith("Broken pages or links: 1"))).toBe(true);
    expect(checks.items.find((i) => i.text.startsWith("Pages sharing the same title"))?.fix).toContain("/menu");
  });
});

describe("AI writing", () => {
  it("only exists for real tools", () => {
    const slugs = new Set(tools.map((t) => t.slug));
    for (const slug of Object.keys(aiSpecs)) expect(slugs.has(slug), slug).toBe(true);
  });
  it("turns inputs into a labelled, clipped facts list", () => {
    const facts = factsText(
      { business: "Kora Foods", empty: "", topics: ["price", "time"], rush: true, seed: 4, items: [] as string[] },
      [{ key: "topics", label: "Include", type: "multi", default: [], options: [{ value: "price", label: "Price & payment" }, { value: "time", label: "Timing" }] }],
      { business: "Business name" },
      ["seed"],
    );
    expect(facts).toBe("- Business name: Kora Foods\n- Include: Price & payment, Timing\n- Rush: yes");
    expect(factsText({ notes: "x".repeat(9000) }).length).toBeLessThanOrEqual(1600);
  });
  it("puts the facts and the requested sections in the prompt", () => {
    const p = aiPrompt(aiSpecs["hero-copy-generator"], "- Business: Kora Foods");
    expect(p).toContain("Kora Foods");
    expect(p).toContain("Headlines: 5 options");
  });
  it("flags numbers and big claims the user never gave", () => {
    const facts = "- Business: Kora Foods\n- Price: from ₦45,000\n- Guarantee: refund if we cancel";
    const flags = flagClaims(["Party trays from ₦45,000.", "Trusted by 500+ families, the best in Lagos!", "Rated 4.9 stars", "Book in 3 steps", "[number] happy customers"], facts);
    expect(flags).toContain("500+");
    expect(flags.some((f) => /best in lagos/i.test(f))).toBe(true);
    expect(flags.some((f) => f.startsWith("4.9"))).toBe(true);
    expect(flags.some((f) => f.includes("45"))).toBe(false); // the user's own price is fine
    expect(flags.some((f) => f === "3")).toBe(false); // list counts aren't claims
  });
});

describe("printable report", () => {
  it("escapes page content and includes checks, fixes and who prepared it", () => {
    const html = blocksToHtml(
      [
        { type: "checks", title: "Live audit", items: [{ ok: false, text: 'Title: "<script>alert(1)</script>"', fix: "Shorten it" }, { ok: true, text: "HTTPS" }] },
        { type: "image", title: "Shot", src: "javascript:alert(1)", alt: "x" },
      ],
      { title: "SEO report", subtitle: "kora.ng", preparedBy: "Ada Builds", date: "2 October 2026" },
    );
    expect(html).not.toContain("<script>alert(1)");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("(1/2 passed)");
    expect(html).toContain("Fix: Shorten it");
    expect(html).toContain("Prepared by Ada Builds");
    expect(html).not.toContain("javascript:");
  });
});

describe("colour palette upgrades", () => {
  it("solves text colours to pass 4.5:1 instead of guessing", () => {
    const bg = "#faf7f5";
    const c = solveContrast(25, 100, 60, bg, 4.5);
    expect(contrast(c, bg)).toBeGreaterThanOrEqual(4.5);
  });
  it("builds an 11-step shade scale that keeps the brand colour", () => {
    const scale = shadeScale("#e8590c");
    expect(scale.map((x) => x.step)).toEqual([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]);
    expect(scale.filter((x) => x.base)).toHaveLength(1);
    expect(scale.find((x) => x.base)?.hex).toBe("#e8590c");
  });
  it("simulates colour blindness: red and green collapse for deutans, not for normal vision", () => {
    expect(colorDistance("#d62728", "#2ca02c")).toBeGreaterThan(300);
    expect(colorDistance(simulate("#d62728", "deuteranopia"), simulate("#2ca02c", "deuteranopia"))).toBeLessThan(colorDistance("#d62728", "#2ca02c") / 2);
    expect(simulate("#ffffff", "protanopia")).toBe("#ffffff");
  });
  it("finds a logo's brand colour, not its white background", () => {
    const px: number[] = [];
    for (let i = 0; i < 600; i++) px.push(255, 255, 255, 255); // white background
    for (let i = 0; i < 200; i++) px.push(232, 89, 12, 255); // orange mark
    for (let i = 0; i < 100; i++) px.push(0, 0, 0, 0); // transparent
    const found = dominantColors(px);
    expect(found[0]).toBe("#e8590c");
  });
  it("every example palette passes the readability checks it shows", () => {
    const def = defs["color-palette-generator"];
    if (def.kind !== "generator") throw new Error("expected generator");
    for (const ex of def.examples ?? []) {
      const blocks = def.generate({ ...Object.fromEntries(def.fields.map((f) => [f.key, f.default])), ...ex.values });
      const checks = blocks.find((b) => b.type === "checks");
      if (checks?.type !== "checks") throw new Error("no checks");
      const contrastChecks = checks.items.filter((i) => !/colour blindness/.test(i.text));
      expect(contrastChecks.every((i) => i.ok), `${ex.label}: ${contrastChecks.filter((i) => !i.ok).map((i) => i.text).join("; ")}`).toBe(true);
      expect(blocks.some((b) => b.type === "preview")).toBe(true);
    }
  });
  it("a too-light brand colour gets a readable button shade", () => {
    const def = defs["color-palette-generator"];
    if (def.kind !== "generator") throw new Error("expected generator");
    const blocks = def.generate({ base: "#ffc400", harmony: "complementary", neutral: "warm", name: "Sun" });
    const preview = blocks.find((b) => b.type === "preview");
    if (preview?.type !== "preview") throw new Error("no preview");
    expect(contrast(preview.colors.primary, preview.colors.primaryInk)).toBeGreaterThanOrEqual(4.5);
  });
});

describe("suggestion filters seen on live Google data", () => {
  it("drops foreign cities and languages", () => {
    const data: SuggestData = { seed: "web design", location: "Lagos", mode: "all", results: [{ query: "x", suggestions: ["web design company in chennai", "affordable web design perth", "what is web designing in hindi", "web design fort worth", "web design company in lagos"] }] };
    expect(cleanSuggestions(data)).toEqual(["web design company in lagos"]);
  });
  it("treats students and tool learners as not customers", () => {
    for (const p of ["web design packages for ss2", "web design for kids", "best web design skills claude", "is web design a good career", "best web design software"]) expect(intentOf(p), p).toBe("not-customer");
    expect(intentOf("web design packages for small business")).toBe("buy");
  });
});
