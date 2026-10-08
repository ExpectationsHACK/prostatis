import { describe, expect, it } from "vitest";
import { fastTrack } from "@/lib/curriculum";
import { emptyState, type LessonRow } from "./engine";
import { activityGrid, greeting, heatLevel, recentActivity, timeAgo, todos, xpThisWeek, type XpEvent } from "./insights";

const ev = (kind: string, ref: string, xp: number, created_at: string): XpEvent => ({ kind, ref, xp, created_at });
const row = (lesson_id: string, over: Partial<LessonRow> = {}): LessonRow => ({ lesson_id, quiz_best: 0, quiz_total: 0, quiz_passed_at: null, task_done_at: null, completed_at: null, ...over });

describe("activity heatmap", () => {
  // 2026-10-07 is a Wednesday.
  const grid = activityGrid(["2026-10-05"], [ev("quiz", "a", 40, "2026-10-06T09:00:00Z"), ev("task", "a", 50, "2026-10-06T10:00:00Z"), ev("lesson", "a", 100, "2026-10-06T10:00:01Z")], "2026-10-07", 13);

  it("draws 13 week columns, Monday first, ending with this week", () => {
    expect(grid).toHaveLength(13);
    expect(grid.every((w) => w.length === 7)).toBe(true);
    const thisWeek = grid.at(-1)!;
    expect(thisWeek[0].day).toBe("2026-10-05");
    expect(thisWeek[6].day).toBe("2026-10-11");
    expect(grid[0][0].day).toBe("2026-07-13");
  });

  it("shades a day by the XP earned that day (Lagos time) and marks the future empty", () => {
    const [mon, tue, wed, thu] = grid.at(-1)!;
    expect(mon).toMatchObject({ active: true, xp: 0, level: 1 }); // active without XP still shows
    expect(tue).toMatchObject({ active: true, xp: 190, level: 3 });
    expect(wed).toMatchObject({ active: false, level: 0, future: false });
    expect(thu).toMatchObject({ future: true, level: 0, active: false });
  });

  it("counts an event late at night UTC on the next Lagos day", () => {
    const g = activityGrid([], [ev("quiz", "a", 50, "2026-10-05T23:30:00Z")], "2026-10-07", 1);
    expect(g[0][1]).toMatchObject({ day: "2026-10-06", xp: 50 });
  });

  it("uses fixed XP steps", () => {
    expect([heatLevel(0, false), heatLevel(0, true), heatLevel(40, true), heatLevel(100, true), heatLevel(250, true)]).toEqual([0, 1, 2, 3, 4]);
  });

  it("sums only the last 7 days for this week's XP", () => {
    expect(xpThisWeek([ev("quiz", "a", 40, "2026-10-07T08:00:00Z"), ev("quiz", "b", 30, "2026-10-01T08:00:00Z"), ev("quiz", "c", 20, "2026-09-30T08:00:00Z")], "2026-10-07")).toBe(70);
  });
});

describe("to-do list", () => {
  const base = { track: fastTrack, slug: "fast-track", allDone: false, daysLeft: null, today: "2026-10-07" };
  const first = fastTrack.modules[0];

  it("points at the next lesson, and at the half that's missing", () => {
    expect(todos({ ...base, state: emptyState(), next: first })[0]).toMatchObject({ id: "lesson", href: "/learn/fast-track/1" });
    const quizDone = { ...emptyState(), lessons: { [first.lesson]: row(first.lesson, { quiz_passed_at: "2026-10-06T10:00:00Z" }) } };
    expect(todos({ ...base, state: quizDone, next: first })[0].id).toBe("task");
    const taskDone = { ...emptyState(), lessons: { [first.lesson]: row(first.lesson, { task_done_at: "2026-10-06T10:00:00Z" }) } };
    expect(todos({ ...base, state: taskDone, next: first })[0].id).toBe("quiz");
  });

  it("sends a finished learner to the final, then to sharing the certificate", () => {
    expect(todos({ ...base, state: emptyState(), next: null, allDone: true })[0].id).toBe("final");
    const certified = { ...emptyState(), finals: { fast_track: { track: "fast_track" as const, best: 14, total: 14, passed_at: "2026-10-06T10:00:00Z", certificate_id: "PRS-FT-X" } } };
    expect(todos({ ...base, state: certified, next: null, allDone: true })[0].id).toBe("share");
  });

  it("warns about a streak at risk only when there is one and today isn't done", () => {
    const ids = (days: string[]) => todos({ ...base, state: { ...emptyState(), days }, next: first }).map((t) => t.id);
    expect(ids(["2026-10-06", "2026-10-05"])).toContain("streak");
    expect(ids(["2026-10-07", "2026-10-06"])).not.toContain("streak");
    expect(ids([])).not.toContain("streak");
  });

  it("flags access ending within a week, never permanent access", () => {
    const access = (daysLeft: number | null) => todos({ ...base, state: emptyState(), next: first, daysLeft }).find((t) => t.id === "access");
    expect(access(3)?.text).toContain("3 days");
    expect(access(0)?.text).toContain("today");
    expect(access(20)).toBeUndefined();
    expect(access(null)).toBeUndefined();
  });
});

describe("recent activity", () => {
  const title = (ref: string) => `Lesson ${ref}`;

  it("folds a quiz, a perfect score and the completion seconds apart into one moment", () => {
    const list = recentActivity(
      [ev("quiz", "a", 50, "2026-10-06T10:00:00Z"), ev("perfect", "a", 25, "2026-10-06T10:00:01Z"), ev("lesson", "a", 100, "2026-10-06T10:00:02Z"), ev("task", "b", 50, "2026-10-05T09:00:00Z")],
      title,
    );
    expect(list).toHaveLength(2);
    expect(list[0]).toMatchObject({ title: "Lesson a", what: "Completed the lesson", xp: 175, kinds: ["lesson", "perfect", "quiz"] });
    expect(list[1]).toMatchObject({ title: "Lesson b", what: "Finished the practical task", xp: 50 });
  });

  it("keeps separate visits to the same lesson apart, newest first", () => {
    const list = recentActivity([ev("task", "a", 50, "2026-10-01T10:00:00Z"), ev("quiz", "a", 40, "2026-10-03T10:00:00Z")], title);
    expect(list.map((a) => a.what)).toEqual(["Passed the quiz", "Finished the practical task"]);
  });
});

describe("time words", () => {
  const now = new Date("2026-10-07T12:00:00Z");
  it("says how long ago, then the date", () => {
    expect(timeAgo("2026-10-07T11:59:30Z", now)).toBe("just now");
    expect(timeAgo("2026-10-07T11:15:00Z", now)).toBe("45 min ago");
    expect(timeAgo("2026-10-07T09:00:00Z", now)).toBe("3 hours ago");
    expect(timeAgo("2026-10-06T09:00:00Z", now)).toBe("yesterday");
    expect(timeAgo("2026-09-20T09:00:00Z", now)).toBe("20 Sept");
  });
  it("greets by the clock in Lagos (UTC+1)", () => {
    expect(greeting(new Date("2026-10-07T07:30:00Z"))).toBe("Good morning");
    expect(greeting(new Date("2026-10-07T11:30:00Z"))).toBe("Good afternoon");
    expect(greeting(new Date("2026-10-07T17:30:00Z"))).toBe("Good evening");
    expect(greeting(new Date("2026-10-07T23:30:00Z"))).toBe("Good morning");
  });
});
