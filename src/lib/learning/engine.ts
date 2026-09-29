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
  { at: 5400, name: "Club Legend" },
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
  return `BWAC-${code}-${at.getUTCFullYear()}-${u}${at.getTime().toString(36).slice(-4).toUpperCase()}`;
}
