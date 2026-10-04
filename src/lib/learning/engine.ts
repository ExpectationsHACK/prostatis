import type { Question } from "@/content/types";
import type { Track } from "@/lib/curriculum";

/* ---------- XP rules (the server is the only thing that awards XP) ---------- */
export const XP = {
  lesson: 100, // quiz passed + task confirmed
  perCorrect: 10, // on the first passing quiz attempt
  perfect: 25, // first time a quiz is aced
  task: 50,
  final: 300,
} as const;

export const PASS_MARK = 0.7;
export const FINAL_PASS_MARK = 0.75;

export const levels = [
  { at: 0, name: "Newcomer" },
  { at: 250, name: "Starter" },
  { at: 600, name: "Builder" },
  { at: 1000, name: "Shipper" },
  { at: 1500, name: "Pro Builder" },
  { at: 2100, name: "Growth Builder" },
  { at: 2800, name: "Automator" },
  { at: 3600, name: "Agent Builder" },
  { at: 4500, name: "Closer" },
  { at: 5400, name: "Prostatis Legend" },
] as const;

export function levelFor(xp: number) {
  let i = 0;
  while (i + 1 < levels.length && xp >= levels[i + 1].at) i++;
  const next = levels[i + 1];
  return {
    level: i + 1,
    name: levels[i].name,
    floor: levels[i].at,
    next: next?.at ?? null,
    /** 0–1 progress towards the next level (1 at max level). */
    progress: next ? (xp - levels[i].at) / (next.at - levels[i].at) : 1,
  };
}

/* ---------- Quiz grading ---------- */
export type Graded = {
  score: number;
  total: number;
  passed: boolean;
  /** Per question: was it right. Explanations are only revealed once the quiz is passed. */
  results: { correct: boolean; answer?: number; why?: string }[];
};

export function grade(questions: Question[], answers: unknown, mark = PASS_MARK): Graded {
  const picked = Array.isArray(answers) ? answers : [];
  const correct = questions.map((q, i) => Number.isInteger(picked[i]) && picked[i] === q.answer);
  const score = correct.filter(Boolean).length;
  const passed = questions.length > 0 && score / questions.length >= mark;
  return {
    score,
    total: questions.length,
    passed,
    results: questions.map((q, i) => (passed ? { correct: correct[i], answer: q.answer, why: q.why } : { correct: correct[i] })),
  };
}

/** Questions as sent to the browser: no answers, no explanations. */
export function publicQuestions(questions: Question[]) {
  return questions.map(({ q, options }) => ({ q, options }));
}

/* ---------- Days and streaks (Lagos time, UTC+1, no daylight saving) ---------- */
export function lagosDay(d = new Date()) {
  return new Date(d.getTime() + 3600_000).toISOString().slice(0, 10);
}

function prevDay(day: string) {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

/** Current streak (counts if the learner was active today or yesterday) and the longest ever. */
export function streaks(days: string[], today = lagosDay()) {
  const set = new Set(days);
  let current = 0;
  let cursor = set.has(today) ? today : prevDay(today);
  while (set.has(cursor)) {
    current++;
    cursor = prevDay(cursor);
  }
  let longest = 0;
  let run = 0;
  let last = "";
  for (const d of [...set].sort()) {
    run = last && prevDay(d) === last ? run + 1 : 1;
    longest = Math.max(longest, run);
    last = d;
  }
  return { current, longest, activeToday: set.has(today) };
}

/* ---------- Progress through a track ---------- */
export type LessonRow = {
  lesson_id: string;
  quiz_best: number;
  quiz_total: number;
  quiz_passed_at: string | null;
  task_done_at: string | null;
  completed_at: string | null;
};

export type FinalRow = {
  track: Track["id"];
  best: number;
  total: number;
  passed_at: string | null;
  certificate_id: string | null;
};

export type LearnerState = {
  lessons: Record<string, LessonRow>;
  finals: Partial<Record<Track["id"], FinalRow>>;
  xp: number;
  days: string[];
};

export const emptyState = (): LearnerState => ({ lessons: {}, finals: {}, xp: 0, days: [] });

export type DayStatus = "done" | "open" | "locked";

/**
 * Lessons open in order: a day unlocks when the day before it is complete. Lessons shared
 * between tracks count wherever they were finished. `unlockAll` (local preview only) lets
 * the owner read every lesson; the final still needs every lesson complete.
 */
export function trackProgress(track: Track, state: LearnerState, { unlockAll = false } = {}) {
  let prevDone = true;
  const days = track.modules.map((m) => {
    const done = Boolean(state.lessons[m.lesson]?.completed_at);
    const status: DayStatus = done ? "done" : prevDone || unlockAll ? "open" : "locked";
    prevDone = done;
    return { module: m, status };
  });
  const completed = days.filter((d) => d.status === "done").length;
  const next = days.find((d) => d.status !== "done")?.module ?? null;
  return { days, completed, total: days.length, pct: Math.round((completed / days.length) * 100), next, allDone: completed === days.length };
}

export function statusOf(track: Track, state: LearnerState, day: number, opts?: { unlockAll?: boolean }): DayStatus {
  return trackProgress(track, state, opts).days.find((d) => d.module.day === day)?.status ?? "locked";
}

/**
 * The final exam: one question from every lesson in the track, rotated by day so the two
 * tracks don't draw identical papers from their shared lessons.
 */
export function finalQuestions(track: Track, quizOf: (lessonId: string) => Question[]) {
  const offset = track.id === "main_track" ? 2 : 0;
  return track.modules.map((m) => {
    const qs = quizOf(m.lesson);
    return qs[(m.day + offset) % qs.length];
  });
}

export function certificateId(userId: string, track: Track["id"], at: Date) {
  const code = track === "main_track" ? "MT" : "FT";
  const u = userId.replace(/-/g, "").slice(0, 6).toUpperCase();
  return `STK-${code}-${at.getUTCFullYear()}-${u}${at.getTime().toString(36).slice(-4).toUpperCase()}`;
}

/* ---------- Badges ---------- */
export type Badge = { id: string; name: string; desc: string; icon: "spark" | "target" | "flame" | "trophy" | "flag" | "award" | "star" | "medal"; earned: boolean };

/** A lesson's own milestone badge ("Live on the internet"), earned when that lesson is complete. */
export type Milestone = { lesson: string; name: string; desc: string };

/** Badges for a track, computed from saved progress, nothing extra to store. */
export function badges(track: Track, state: LearnerState, milestones: Milestone[] = []): Badge[] {
  const prog = trackProgress(track, state);
  const rows = track.modules.map((m) => state.lessons[m.lesson]).filter(Boolean);
  const st = streaks(state.days);
  const list: Badge[] = [
    { id: "first", name: "First steps", desc: "Complete your first lesson", icon: "spark", earned: prog.completed >= 1 },
    { id: "perfect", name: "Sharp shooter", desc: "Score 5/5 on a lesson quiz", icon: "target", earned: rows.some((r) => r.quiz_total > 0 && r.quiz_best === r.quiz_total) },
    { id: "streak3", name: "On a roll", desc: "Learn 3 days in a row", icon: "flame", earned: st.longest >= 3 },
    { id: "streak7", name: "Unstoppable", desc: "Learn 7 days in a row", icon: "flame", earned: st.longest >= 7 },
    ...track.weeks.map((w) => ({
      id: `week${w.week}`,
      name: `Week ${w.week} done`,
      desc: w.title,
      icon: "flag" as const,
      earned: track.modules.filter((m) => m.week === w.week).every((m) => state.lessons[m.lesson]?.completed_at),
    })),
    { id: "half", name: "Halfway hero", desc: "Complete half the lessons", icon: "star", earned: prog.completed * 2 >= prog.total },
    { id: "xp1000", name: "1,000 XP club", desc: "Earn 1,000 XP", icon: "spark", earned: state.xp >= 1000 },
    { id: "done", name: "Track complete", desc: "Finish every lesson", icon: "trophy", earned: prog.allDone },
    { id: "cert", name: "Certified", desc: "Pass the final assessment", icon: "award", earned: Boolean(state.finals[track.id]?.passed_at) },
  ];
  // One milestone per lesson in this track, in the order the track teaches them.
  const byLesson = new Map(milestones.map((m) => [m.lesson, m]));
  const mile: Badge[] = track.modules.flatMap((m) => {
    const ms = byLesson.get(m.lesson);
    return ms ? [{ id: `m:${m.lesson}`, name: ms.name, desc: ms.desc, icon: "medal" as const, earned: Boolean(state.lessons[m.lesson]?.completed_at) }] : [];
  });
  return [...list, ...mile];
}
