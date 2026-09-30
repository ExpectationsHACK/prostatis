import { describe, expect, it } from "vitest";
import type { Question } from "@/content/types";
import { fastTrack } from "@/lib/curriculum";
import { certificateId, emptyState, grade, lagosDay, levelFor, publicQuestions, streaks, trackProgress } from "./engine";

const qs: Question[] = Array.from({ length: 5 }, (_, i) => ({ q: `Q${i}`, options: ["a", "b", "c", "d"], answer: i % 4, why: `because ${i}` }));
const right = qs.map((q) => q.answer);
const wrong = qs.map((q) => (q.answer + 1) % 4);

describe("grade", () => {
  it("passes at 70% and reveals explanations only on a pass", () => {
    const four = [...right.slice(0, 4), wrong[4]];
    const g = grade(qs, four);
    expect(g.score).toBe(4);
    expect(g.passed).toBe(true);
    expect(g.results[0].why).toBe("because 0");

    const three = [...right.slice(0, 3), wrong[3], wrong[4]];
    const f = grade(qs, three);
    expect(f.score).toBe(3);
    expect(f.passed).toBe(false);
    expect(f.results.every((r) => r.answer === undefined && r.why === undefined)).toBe(true);
  });

  it("ignores junk input", () => {
    expect(grade(qs, "nope").score).toBe(0);
    expect(grade(qs, [0.5, "1", null, -1, 99]).score).toBe(0);
    expect(grade(qs, { length: 5 }).passed).toBe(false);
  });

  it("never sends answers to the browser", () => {
    const pub = publicQuestions(qs);
    expect(pub[0]).toEqual({ q: "Q0", options: ["a", "b", "c", "d"] });
  });
});

describe("levels", () => {
  it("climbs with XP and reports progress", () => {
    expect(levelFor(0)).toMatchObject({ level: 1, name: "Newcomer", next: 250 });
    expect(levelFor(250).level).toBe(2);
    expect(levelFor(425).progress).toBeCloseTo(0.5);
    expect(levelFor(99999)).toMatchObject({ level: 10, next: null, progress: 1 });
  });
});

describe("streaks", () => {
  it("counts consecutive Lagos days ending today or yesterday", () => {
    expect(streaks(["2026-09-27", "2026-09-28", "2026-09-29"], "2026-09-29")).toEqual({ current: 3, longest: 3, activeToday: true });
    expect(streaks(["2026-09-27", "2026-09-28"], "2026-09-29")).toMatchObject({ current: 2, activeToday: false });
    expect(streaks(["2026-09-26"], "2026-09-29").current).toBe(0);
    expect(streaks(["2026-09-01", "2026-09-02", "2026-09-03", "2026-09-04", "2026-09-29"], "2026-09-29")).toMatchObject({ current: 1, longest: 4 });
    expect(streaks([], "2026-09-29")).toEqual({ current: 0, longest: 0, activeToday: false });
  });

  it("crosses month and year boundaries", () => {
    expect(streaks(["2025-12-31", "2026-01-01"], "2026-01-01").current).toBe(2);
    expect(streaks(["2026-02-28", "2026-03-01"], "2026-03-01").current).toBe(2);
  });

  it("uses Lagos time (UTC+1)", () => {
    expect(lagosDay(new Date("2026-09-29T23:30:00Z"))).toBe("2026-09-30");
    expect(lagosDay(new Date("2026-09-29T22:59:00Z"))).toBe("2026-09-29");
  });
});

describe("trackProgress", () => {
  it("opens lessons in order", () => {
    const s = emptyState();
    let p = trackProgress(fastTrack, s);
    expect(p.days.map((d) => d.status).slice(0, 3)).toEqual(["open", "locked", "locked"]);
    expect(p.next?.day).toBe(1);

    s.lessons[fastTrack.modules[0].lesson] = { lesson_id: "x", quiz_best: 5, quiz_total: 5, quiz_passed_at: "t", task_done_at: "t", completed_at: "t" };
    p = trackProgress(fastTrack, s);
    expect(p.days.map((d) => d.status).slice(0, 3)).toEqual(["done", "open", "locked"]);
    expect(p.completed).toBe(1);
    expect(p.pct).toBe(7);
    expect(p.allDone).toBe(false);
  });

  it("is all done when every lesson is complete", () => {
    const s = emptyState();
    for (const m of fastTrack.modules) s.lessons[m.lesson] = { lesson_id: m.lesson, quiz_best: 5, quiz_total: 5, quiz_passed_at: "t", task_done_at: "t", completed_at: "t" };
    const p = trackProgress(fastTrack, s);
    expect(p.allDone).toBe(true);
    expect(p.next).toBeNull();
  });
});

describe("certificateId", () => {
  it("is readable and track-specific", () => {
    const id = certificateId("3f2a9c1e-aaaa-bbbb", "main_track", new Date("2026-10-01T10:00:00Z"));
    expect(id).toMatch(/^STK-MT-2026-3F2A9C[A-Z0-9]{4}$/);
  });
});
