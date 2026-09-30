import { describe, expect, it } from "vitest";
import { cleanPath, deviceOf, isBot, referrerHost, summarize, type View } from "@/lib/analytics-shared";
import { relatedPosts, seoChecks, slugify, type Post } from "@/lib/blog-shared";
import { safeUrl, headingsOf } from "@/components/markdown";
import { fastTrack } from "@/lib/curriculum";
import { emptyState } from "@/lib/learning/engine";
import { flagsFor, type AffairsInput } from "./affairs";

const now = new Date("2026-09-30T12:00:00Z");
const view = (o: Partial<View>): View => ({ created_at: now.toISOString(), path: "/", referrer: null, utm_source: null, country: "NG", region: null, city: "Lagos", device: "mobile", visitor: "a", user_id: null, ...o });

describe("analytics", () => {
  it("filters bots and classifies devices", () => {
    expect(isBot("Mozilla/5.0 (compatible; Googlebot/2.1)")).toBe(true);
    expect(isBot("WhatsApp/2.23")).toBe(true);
    expect(isBot("")).toBe(true);
    expect(isBot("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) Mobile Safari")).toBe(false);
    expect(deviceOf("Mozilla/5.0 (iPhone) Mobile")).toBe("mobile");
    expect(deviceOf("Mozilla/5.0 (Linux; Android 13; Tab) Safari")).toBe("tablet");
    expect(deviceOf("Mozilla/5.0 (Windows NT 10.0)")).toBe("desktop");
  });

  it("keeps only referrer hosts and treats our own site as direct", () => {
    expect(referrerHost("https://www.google.com/search?q=x", "steinark.com")).toBe("Google");
    expect(referrerHost("https://l.facebook.com/l.php?u=x", "x.com")).toBe("Facebook");
    expect(referrerHost("https://steinark.com/tools", "steinark.com")).toBeNull();
    expect(referrerHost("https://blog.example.org/post?id=1", "x.com")).toBe("blog.example.org");
    expect(referrerHost("not a url", "x.com")).toBeNull();
  });

  it("cleans paths and never tracks admin or api", () => {
    expect(cleanPath("/tools/faq-generator?in=abc")).toBe("/tools/faq-generator");
    expect(cleanPath("/admin/students")).toBeNull();
    expect(cleanPath("/api/track")).toBeNull();
    expect(cleanPath("//evil.com")).toBeNull();
    expect(cleanPath(42)).toBeNull();
  });

  it("summarises visitors, live users, pages and bounce", () => {
    const rows = [
      view({ visitor: "a", path: "/" }),
      view({ visitor: "a", path: "/pricing" }),
      view({ visitor: "b", path: "/", country: "GH", referrer: "Google" }),
      view({ visitor: "c", path: "/tools/faq-generator", created_at: new Date(now.getTime() - 3 * 86400_000).toISOString() }),
      view({ visitor: "old", created_at: new Date(now.getTime() - 40 * 86400_000).toISOString() }),
    ];
    const s = summarize(rows, 30, now);
    expect(s.views).toBe(4);
    expect(s.visitors).toBe(3);
    expect(s.live).toBe(2);
    expect(s.series).toHaveLength(30);
    expect(s.pages[0]).toMatchObject({ key: "/", visitors: 2, views: 2 });
    expect(s.countries.find((c) => c.key === "Ghana")?.visitors).toBe(1);
    expect(s.tools[0].key).toBe("faq-generator");
    expect(s.bounceRate).toBeCloseTo(2 / 3);
  });
});

describe("student affairs", () => {
  const base: AffairsInput = { id: "u", name: "Ada", email: "a@x.com", whatsapp: null, joined: "2026-09-01T00:00:00Z", plan: "fast_track", accessEnd: "2026-10-20T00:00:00Z", state: emptyState() };

  it("flags a paid student who never started", () => {
    expect(flagsFor(base, now).map((f) => f.kind)).toContain("not_started");
  });

  it("flags inactivity and a stuck quiz", () => {
    const state = emptyState();
    state.days = ["2026-09-20"];
    const first = fastTrack.modules[0].lesson;
    state.lessons[first] = { lesson_id: first, quiz_best: 2, quiz_total: 5, quiz_passed_at: null, task_done_at: null, completed_at: null };
    const kinds = flagsFor({ ...base, state }, now).map((f) => f.kind);
    expect(kinds).toContain("inactive");
    expect(kinds).toContain("stuck_quiz");
  });

  it("flags access ending soon and expired-unfinished", () => {
    const state = emptyState();
    state.days = ["2026-09-29"];
    expect(flagsFor({ ...base, state, accessEnd: "2026-10-02T00:00:00Z" }, now).map((f) => f.kind)).toContain("expiring");
    expect(flagsFor({ ...base, state, accessEnd: "2026-09-01T00:00:00Z" }, now).map((f) => f.kind)).toEqual(["expired_unfinished"]);
  });

  it("ignores people without a track", () => {
    expect(flagsFor({ ...base, plan: null, accessEnd: null }, now)).toEqual([]);
  });
});

describe("blog", () => {
  it("makes clean slugs", () => {
    expect(slugify("How to Find Your First Client: Lagos & Abuja!")).toBe("how-to-find-your-first-client-lagos-and-abuja");
    expect(slugify("  --Café  crème-- ")).toBe("cafe-creme");
  });

  it("only allows safe link targets in markdown", () => {
    expect(safeUrl("/tools")).toBe("/tools");
    expect(safeUrl("https://x.com")).toBe("https://x.com");
    expect(safeUrl("javascript:alert(1)")).toBeNull();
    expect(safeUrl("//evil.com")).toBeNull();
    expect(safeUrl("data:text/html,x")).toBeNull();
  });

  it("builds a table of contents from headings, skipping code", () => {
    expect(headingsOf("## One\ntext\n```\n## not a heading\n```\n### Two *b*")).toEqual([
      { id: "one", text: "One", level: 2 },
      { id: "two-b", text: "Two b", level: 3 },
    ]);
  });

  it("ranks related posts by shared tags", () => {
    const p = (id: string, tags: string[], d: string) => ({ id, slug: id, tags, published_at: d }) as Post;
    const me = p("me", ["Clients", "SEO"], "2026-09-01");
    const out = relatedPosts(me, [me, p("a", ["SEO"], "2026-09-10"), p("b", ["Clients", "SEO"], "2026-08-01"), p("c", [], "2026-09-20")]);
    expect(out.map((x) => x.id)).toEqual(["b", "a", "c"]);
  });

  it("checks SEO basics before publishing", () => {
    const checks = seoChecks({ title: "A", slug: "Bad Slug", excerpt: "", content_md: "# Extra H1\n![](x.png)", seo_title: null, seo_description: null, cover_image: null, cover_alt: null, tags: [] });
    expect(checks.filter((c) => !c.ok).length).toBeGreaterThanOrEqual(6);
  });
});
