import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { lessons } = await import("./lessons");
const { fastTrack, mainTrack, tracks } = await import("@/lib/curriculum");
const { getTool } = await import("@/lib/tools");
const { finalQuestions } = await import("@/lib/learning/engine");

const all = Object.values(lessons);

describe("course content", () => {
  it("has a written lesson for every day of both tracks", () => {
    for (const t of tracks) for (const m of t.modules) expect(lessons[m.lesson], `${t.id} day ${m.day}`).toBeDefined();
    expect(fastTrack.modules).toHaveLength(14);
    expect(mainTrack.modules).toHaveLength(25);
  });

  it("uses every lesson in at least one track", () => {
    const used = new Set(tracks.flatMap((t) => t.modules.map((m) => m.lesson)));
    for (const l of all) expect(used.has(l.id), l.id).toBe(true);
  });

  it.each(all.map((l) => [l.id, l] as const))("%s is complete and well-formed", (_, l) => {
    expect(l.title.length).toBeGreaterThan(5);
    expect(l.outcome.length).toBeGreaterThan(20);
    expect(l.intro.length).toBeGreaterThan(150);
    expect(l.sections.length).toBeGreaterThanOrEqual(3);
    for (const s of l.sections) expect(s.blocks.length).toBeGreaterThan(0);
    expect(l.task.steps.length).toBeGreaterThanOrEqual(3);
    expect(l.task.done.length).toBeGreaterThanOrEqual(3);
    expect(l.resources.length).toBeGreaterThanOrEqual(3);
    for (const r of l.resources) expect(r.url).toMatch(/^https:\/\//);

    // At least one illustration per lesson.
    expect(l.sections.some((s) => s.blocks.some((b) => b.t === "figure"))).toBe(true);

    // Every tool the lesson points to exists.
    for (const s of l.sections)
      for (const b of s.blocks) {
        if (b.t === "tool") expect(getTool(b.slug), `${l.id} → ${b.slug}`).toBeDefined();
        if (b.t === "figure" && "tool" in b.figure) expect(getTool(b.figure.tool), `${l.id} fig → ${b.figure.tool}`).toBeDefined();
      }
  });

  it.each(all.map((l) => [l.id, l] as const))("%s has a sound 5-question quiz", (_, l) => {
    expect(l.quiz).toHaveLength(5);
    for (const q of l.quiz) {
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(new Set(q.options).size, q.q).toBe(q.options.length);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
      expect(q.why.length).toBeGreaterThan(10);
    }
    // Answers aren't all in the same position.
    expect(new Set(l.quiz.map((q) => q.answer)).size).toBeGreaterThan(1);
  });

  it("draws a final exam with one question per lesson", () => {
    for (const t of tracks) {
      const qs = finalQuestions(t, (id) => lessons[id].quiz);
      expect(qs).toHaveLength(t.modules.length);
      expect(qs.every(Boolean)).toBe(true);
    }
  });
});
