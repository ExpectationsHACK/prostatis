import { describe, expect, it } from "vitest";
import { hasToolThumb } from "@/components/art/tool-thumb";
import { tracks } from "../curriculum";
import { guides } from "../tool-guides";
import { CUSTOM_TOOL_SLUGS, coreTools, getTool, tools } from "../tools";
import { defs as agents } from "./agents";
import { defs as automation } from "./automation";
import { contrast, hexToRgb, normHex } from "./color";
import { defs as design } from "./design";
import { defs as dev } from "./dev";
import { defs as leadgen } from "./leadgen";
import { defs as seo } from "./seo";
import { defs as solutions } from "./solutions";
import { defaults, type Block, type Field, type GeneratorDef, type ToolDef, type Values } from "./types";

const all: Record<string, ToolDef> = { ...design, ...dev, ...solutions, ...seo, ...automation, ...leadgen, ...agents };
const generators = Object.entries(all).filter((e): e is [string, GeneratorDef] => e[1].kind === "generator");
const checklists = Object.entries(all).filter(([, d]) => d.kind === "checklist");

/** Everything a user could see, flattened to text, to scan for broken output. */
function flatten(blocks: Block[]): string {
  return JSON.stringify(blocks);
}
const BROKEN = /\bundefined\b|\bNaN\b|\[object Object\]|Infinity(?! months)/;

function emptyValues(fields: Field[]): Values {
  return Object.fromEntries(
    fields.map((f) => [f.key, f.type === "number" ? 0 : f.type === "multi" ? [] : f.type === "toggle" ? false : f.type === "select" ? f.options[0].value : ""]),
  );
}
function messyValues(fields: Field[]): Values {
  const junk = `  <script>alert(1)</script> ₦#@!"'\n\n|||  😀 ${"x".repeat(300)} `;
  return Object.fromEntries(
    fields.map((f) => [f.key, f.type === "number" ? -99999 : f.type === "multi" ? f.options.map((o) => o.value) : f.type === "toggle" ? true : f.type === "select" ? f.options[f.options.length - 1].value : junk]),
  );
}

describe("registry", () => {
  it("has exactly 50 core tools across 7 pillars", () => {
    expect(coreTools).toHaveLength(50);
    expect(new Set(coreTools.map((t) => t.pillar)).size).toBe(7);
  });
  it("has unique slugs", () => {
    expect(new Set(tools.map((t) => t.slug)).size).toBe(tools.length);
  });
  it("every tool has a working implementation (custom component or definition)", () => {
    const custom = new Set<string>(CUSTOM_TOOL_SLUGS);
    const missing = tools.filter((t) => !custom.has(t.slug) && !all[t.slug]).map((t) => t.slug);
    expect(missing).toEqual([]);
  });
  it("has no orphan definitions", () => {
    const slugs = new Set(tools.map((t) => t.slug));
    expect(Object.keys(all).filter((k) => !slugs.has(k))).toEqual([]);
  });
  it("every tool has a description, use case and its own thumbnail", () => {
    for (const t of tools) {
      expect(t.description.length, t.slug).toBeGreaterThan(20);
      expect(t.useCase.length, t.slug).toBeGreaterThan(15);
      expect(hasToolThumb(t.slug), `${t.slug} thumbnail`).toBe(true);
    }
  });
  it("every lesson's thumbnail points at a real tool", () => {
    for (const track of tracks) for (const m of track.modules) if ("tool" in m.thumb) expect(getTool(m.thumb.tool), `${track.id} day ${m.day}`).toBeTruthy();
  });
  it("tracks have the right shape", () => {
    expect(tracks.find((t) => t.id === "fast_track")!.modules).toHaveLength(14);
    expect(tracks.find((t) => t.id === "main_track")!.weeks).toHaveLength(4);
  });
});

describe.each(generators)("%s", (slug, def) => {
  it("fields have unique keys and valid defaults", () => {
    const keys = def.fields.map((f) => f.key);
    expect(new Set(keys).size).toBe(keys.length);
    for (const f of def.fields) if (f.type === "select") expect(f.options.map((o) => o.value)).toContain(f.default);
  });

  it("produces clean, useful output from the example inputs", () => {
    const out = def.generate(defaults(def.fields));
    expect(out.length).toBeGreaterThan(0);
    expect(out.some((b) => b.type !== "notice"), "should produce more than a notice").toBe(true);
    expect(flatten(out)).not.toMatch(BROKEN);
    for (const b of out) if (b.type === "text") expect(b.text.trim().length).toBeGreaterThan(10);
  });

  it("never crashes on empty inputs", () => {
    const out = def.generate(emptyValues(def.fields));
    expect(out.length).toBeGreaterThan(0);
    expect(flatten(out)).not.toMatch(/\[object Object\]|\bNaN\b/);
  });

  it("never crashes on messy, extreme inputs", () => {
    const out = def.generate(messyValues(def.fields));
    expect(out.length).toBeGreaterThan(0);
    expect(flatten(out)).not.toMatch(/\[object Object\]|\bNaN\b/);
  });

  it("runs fast (under 25ms even with extreme input)", () => {
    const v = messyValues(def.fields);
    const t0 = performance.now();
    for (let i = 0; i < 5; i++) def.generate(v);
    expect((performance.now() - t0) / 5).toBeLessThan(25);
  });
});

describe.each(checklists)("%s (checklist)", (_slug, def) => {
  it("has unique ids, valid weights and descending grades", () => {
    if (def.kind !== "checklist") throw new Error();
    const ids = def.groups.flatMap((g) => g.checks.map((c) => c.id));
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBeGreaterThanOrEqual(8);
    for (const g of def.groups) for (const c of g.checks) {
      expect([1, 2, 3]).toContain(c.weight);
      expect(c.fix.length).toBeGreaterThan(10);
    }
    const mins = def.grades.map(([m]) => m);
    expect([...mins].sort((a, b) => b - a)).toEqual(mins);
    expect(mins[mins.length - 1]).toBe(0);
  });
});

// ---------- correctness of specific tools ----------
const run = (slug: string, over: Values = {}) => {
  const def = all[slug] as GeneratorDef;
  return def.generate({ ...defaults(def.fields), ...over });
};
const find = <T extends Block["type"]>(blocks: Block[], type: T) => blocks.find((b) => b.type === type) as Extract<Block, { type: T }>;

describe("colour maths", () => {
  it("computes WCAG contrast correctly", () => {
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 0);
    expect(contrast("#777777", "#ffffff")).toBeCloseTo(4.48, 1);
  });
  it("normalises hex", () => {
    expect(normHex("#FFF")).toBe("#ffffff");
    expect(normHex("nope")).toBeNull();
    expect(hexToRgb("#ff6719")).toEqual([255, 103, 25]);
  });
  it("palette returns 9 valid hex colours and rejects bad input", () => {
    const sw = find(run("color-palette-generator"), "swatches");
    expect(sw.colors).toHaveLength(9);
    for (const c of sw.colors) expect(c.hex).toMatch(/^#[0-9a-f]{6}$/);
    expect(run("color-palette-generator", { base: "banana" })[0]).toMatchObject({ type: "notice", tone: "warn" });
  });
});

describe("SEO tools", () => {
  it("on-page audit flags a page with no title, no description and two H1s", () => {
    const out = run("on-page-seo-audit", { html: "<html><body><h1>A</h1><h1>B</h1><img src='x.png'></body></html>", keyword: "shoes" });
    const checks = find(out, "checks");
    const failed = checks.items.filter((i) => !i.ok).map((i) => i.text).join(" | ");
    expect(failed).toMatch(/Title length: 0/);
    expect(failed).toMatch(/Meta description: 0/);
    expect(failed).toMatch(/H1 headings: 2/);
    expect(failed).toMatch(/missing alt text: 1 of 1/);
  });
  it("on-page audit handles a 300KB page quickly", () => {
    const big = "<html><head><title>Big page for testing speed</title></head><body>" + "<p>word word word</p>".repeat(15000) + "</body></html>";
    const t0 = performance.now();
    run("on-page-seo-audit", { html: big });
    expect(performance.now() - t0).toBeLessThan(250);
  });
  it("meta tags: at least one title fits 60 chars and HTML is escaped", () => {
    const out = run("meta-tag-generator", { benefit: 'say "hello"' });
    const html = out.find((b) => b.type === "text" && b.title.startsWith("HTML"));
    expect(html && html.type === "text" && html.text).toContain("&quot;");
    expect(find(out, "serp").pageTitle.length).toBeLessThanOrEqual(70);
  });
});

describe("parsers and calculators", () => {
  it("FAQ-to-KB parses mixed formats", () => {
    const out = run("faq-to-knowledge-base", { raw: "Q: One?\nA: Yes.\n\nTwo?\nSure.\n\n1) Three?\nOk." });
    expect(find(out, "stats").items[0].value).toBe("3");
  });
  it("FAQ-to-KB reports missing answers", () => {
    const out = run("faq-to-knowledge-base", { raw: "Q: Lonely question?" });
    expect(find(out, "stats").items[1].value).toBe("1");
  });
  it("ROI calculator: payback = setup / net monthly gain", () => {
    const out = run("automation-roi-calculator", { hours: 10, rate: 1000, cut: 100, errors: 0, setup: 100000, monthly: 3300 });
    // 10h * ₦1000 * 4.33 = ₦43,300/mo; net ₦40,000 → 2.5 months
    expect(find(out, "stats").items[1].value).toBe("2.5 months");
  });
  it("ROI calculator warns when costs exceed savings", () => {
    const out = run("automation-roi-calculator", { hours: 1, rate: 100, monthly: 50000 });
    expect(out.some((b) => b.type === "notice" && b.tone === "warn")).toBe(true);
  });
  it("process audit ranks the biggest repetitive task first", () => {
    const out = run("business-process-audit", { tasks: "Small | 1 | 5\nBig | 10 | 5\nCreative | 20 | 1" });
    expect(find(out, "table").rows[0][0]).toBe("Big");
  });
  it("testimonial formatter removes emoji and fixes shorthand", () => {
    const out = run("testimonial-formatter", { raw: "thx u sooo much!!! 😍😍" });
    const first = find(out, "list").items[0];
    expect(first).not.toMatch(/😍|!!!/);
    expect(first).toMatch(/thanks you so much/i);
  });
  it("lead qualification: perfect lead scores 15 and GO", () => {
    const out = run("lead-qualification");
    expect(find(out, "stats").items[0].value).toBe("15/15");
  });
  it("scraper config is valid JSON and the script embeds it", () => {
    const out = run("web-scraper-config");
    const cfg = out.find((b) => b.type === "text" && b.title.startsWith("Config"));
    expect(cfg && cfg.type === "text" && JSON.parse(cfg.text).fields.length).toBe(4);
  });
  it("domain generator respects the max length", () => {
    const table = find(run("domain-name-generator", { max: 8 }), "table");
    for (const r of table.rows) expect(Number(r[1])).toBeLessThanOrEqual(8);
  });
  it("WhatsApp catalog formats naira prices", () => {
    const list = find(run("whatsapp-catalog-guide"), "list");
    expect(list.items[0]).toContain("₦18,000");
  });
  it("FAQ schema is valid JSON-LD", () => {
    const schema = run("faq-generator").find((b) => b.type === "text" && /schema/i.test(b.title));
    const parsed = JSON.parse(schema && schema.type === "text" ? schema.text : "{}");
    expect(parsed["@type"]).toBe("FAQPage");
    expect(parsed.mainEntity.length).toBeGreaterThan(3);
  });
});

describe("tool guides", () => {
  it("every tool has a complete guide: problem, result, 3 steps and next actions", () => {
    for (const t of tools) {
      const g = guides[t.slug];
      expect(g, t.slug).toBeDefined();
      expect(g.problem.length, t.slug).toBeGreaterThan(30);
      expect(g.get.length, t.slug).toBeGreaterThan(20);
      expect(g.steps, t.slug).toHaveLength(3);
      expect(g.next.length, t.slug).toBeGreaterThanOrEqual(2);
      expect(g.minutes, t.slug).toBeGreaterThan(0);
    }
    expect(Object.keys(guides).sort()).toEqual(tools.map((t) => t.slug).sort());
  });
});

describe("tool examples", () => {
  const all = { ...design, ...dev, ...solutions, ...seo, ...automation, ...leadgen, ...agents };
  const generators = Object.entries(all).filter(([, d]) => d.kind === "generator") as [string, GeneratorDef][];
  it.each(generators.filter(([slug]) => slug !== "on-page-seo-audit"))("%s has one-tap examples that only use real fields and produce output", (_, d) => {
    expect(d.examples?.length ?? 0).toBeGreaterThanOrEqual(2);
    const keys = new Set(d.fields.map((f) => f.key));
    for (const ex of d.examples!) {
      for (const k of Object.keys(ex.values)) expect(keys.has(k), `${ex.label}: unknown field ${k}`).toBe(true);
      const blocks = d.generate({ ...defaults(d.fields), ...ex.values });
      expect(blocks.length, ex.label).toBeGreaterThan(0);
      expect(blocks.some((b) => b.type === "notice" && b.tone === "warn" && /couldn't|enter|add at least|pick at least/i.test(b.text)), `${ex.label} produced an input error`).toBe(false);
    }
  });
});
