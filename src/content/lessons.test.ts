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

  it.each(all.map((l) => [l.id, l] as const))("%s teaches for complete beginners", (_, l) => {
    const blocks = l.sections.flatMap((s) => s.blocks);
    const count = (t: string) => blocks.filter((b) => b.t === t).length;
    expect(count("define"), "plain-English definitions").toBeGreaterThanOrEqual(2);
    expect(count("scenario"), "real-life scenario").toBeGreaterThanOrEqual(1);
    expect(count("try"), "try-it-now practice").toBeGreaterThanOrEqual(1);
    expect(count("check"), "self-check").toBeGreaterThanOrEqual(1);
    expect(l.youNeed.length).toBeGreaterThanOrEqual(3);
    expect(l.recap.length).toBeGreaterThanOrEqual(5);
    for (const b of blocks) {
      if (b.t === "check") {
        expect(b.answer).toBeLessThan(b.options.length);
        // Practice checks must not simply leak the graded questions.
        expect(l.quiz.map((q) => q.q)).not.toContain(b.q);
      }
      if (b.t === "try") expect(b.steps.length).toBeGreaterThanOrEqual(2);
    }
  });

  // Every assessed idea must be taught, each question points at a takeaway, and that
  // takeaway contains the key words of the correct answer.
  const stop = new Set("about after again always because before being could every their there these thing things those through under until what when where which while would your yours with from that this they them then than only just into also have more most other some such very will should must".split(" "));
  const clean = (x: string) => x.toLowerCase().replace(/\*\*/g, "").replace(/(\d),(\d)/g, "$1$2");
  const tokens = (x: string) =>
    clean(x)
      .replace(/[^a-z0-9₦. ]/g, " ")
      .split(/\s+/)
      .map((w) => w.replace(/^\.+|\.+$/g, ""))
      .filter((w) => (/\d/.test(w) ? w.length > 0 : w.length >= 4 && !stop.has(w)));
  // A word counts as taught if the takeaway contains it (numbers exactly, words by their stem).
  const taught = (take: string, w: string) => clean(take).includes(/\d/.test(w) ? w : w.slice(0, 5));
  it.each(all.map((l) => [l.id, l] as const))("%s: every quiz answer is taught in the key takeaways", (_, l) => {
    for (const q of l.quiz) {
      expect(q.from, q.q).toBeTypeOf("number");
      const take = l.recap[q.from!];
      expect(take, q.q).toBeDefined();
      const shared = tokens(q.options[q.answer]).filter((w) => taught(take, w));
      expect(shared.length, `"${q.options[q.answer]}" not found in takeaway "${take}"`).toBeGreaterThan(0);
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
