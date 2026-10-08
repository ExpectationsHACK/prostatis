import type { Module, Track } from "@/lib/curriculum";
import { lagosDay, streaks, type LearnerState } from "./engine";

/**
 * What the dashboard shows beyond raw progress: the activity heatmap, the to-do list and the
 * recent-activity feed. Pure functions over saved progress and XP events, so nothing shown is
 * made up and everything here is testable.
 */

/** One row of `xp_events`, as the dashboard reads it. */
export type XpEvent = { kind: string; ref: string; xp: number; created_at: string };

const DAY = 86_400_000;
const toDate = (day: string) => new Date(`${day}T00:00:00Z`);
const addDays = (day: string, n: number) => new Date(toDate(day).getTime() + n * DAY).toISOString().slice(0, 10);

/* ---------- Activity heatmap ---------- */

export type HeatCell = { day: string; xp: number; active: boolean; level: 0 | 1 | 2 | 3 | 4; future: boolean };

/** XP to colour steps: any activity shows, a full lesson (quiz + task + completion) is the top. */
export function heatLevel(xp: number, active: boolean): HeatCell["level"] {
  if (xp >= 200) return 4;
  if (xp >= 100) return 3;
  if (xp >= 40) return 2;
  return xp > 0 || active ? 1 : 0;
}

/**
 * The last `weeks` weeks as columns (Monday at the top, like a wall calendar), ending with the
 * current week. Days after today are marked `future` and drawn empty.
 */
export function activityGrid(days: string[], events: XpEvent[], today = lagosDay(), weeks = 13): HeatCell[][] {
  const xpByDay = new Map<string, number>();
  for (const e of events) {
    const d = lagosDay(new Date(e.created_at));
    xpByDay.set(d, (xpByDay.get(d) ?? 0) + e.xp);
  }
  const activeDays = new Set(days);
  const mondayIndex = (toDate(today).getUTCDay() + 6) % 7;
  const start = addDays(today, -mondayIndex - (weeks - 1) * 7);
  return Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const day = addDays(start, w * 7 + d);
      const future = day > today;
      const xp = future ? 0 : (xpByDay.get(day) ?? 0);
      const active = !future && (activeDays.has(day) || xp > 0);
      return { day, xp, active, level: future ? 0 : heatLevel(xp, active), future };
    }),
  );
}

/** XP earned in the 7 days ending today (Lagos time). */
export function xpThisWeek(events: XpEvent[], today = lagosDay()) {
  const from = addDays(today, -6);
  return events.reduce((sum, e) => {
    const d = lagosDay(new Date(e.created_at));
    return d >= from && d <= today ? sum + e.xp : sum;
  }, 0);
}

/* ---------- To-do list ---------- */

export type TodoTag = { label: string; tone: "orange" | "green" | "red" | "plain" };
export type Todo = { id: string; text: string; href: string; tags: TodoTag[] };

export function todos(input: {
  track: Track;
  slug: string;
  state: LearnerState;
  next: Module | null;
  allDone: boolean;
  /** Whole days of access left, or null for permanent access. */
  daysLeft: number | null;
  today?: string;
}): Todo[] {
  const { track, slug, state, next, allDone, daysLeft } = input;
  const list: Todo[] = [];
  const trackTag: TodoTag = { label: track.name, tone: "plain" };

  if (next) {
    const row = state.lessons[next.lesson];
    const href = `/learn/${slug}/${next.day}`;
    const day: TodoTag = { label: `Day ${next.day}`, tone: "orange" };
    if (row?.quiz_passed_at && !row.task_done_at) list.push({ id: "task", text: `Finish the practical task in “${next.title}”`, href, tags: [day, { label: "Task", tone: "plain" }] });
    else if (row?.task_done_at && !row.quiz_passed_at) list.push({ id: "quiz", text: `Pass the quiz in “${next.title}” (70% to pass)`, href, tags: [day, { label: "Quiz", tone: "plain" }] });
    else list.push({ id: "lesson", text: `Read “${next.title}”, pass its quiz and do the task`, href, tags: [day, trackTag] });
  } else if (allDone) {
    const final = state.finals[track.id];
    if (final?.passed_at) list.push({ id: "share", text: "Share your certificate with clients and on LinkedIn", href: `/learn/${slug}/certificate`, tags: [{ label: "Certified", tone: "green" }] });
    else list.push({ id: "final", text: "Take the final assessment (75% to pass) to earn your certificate", href: `/learn/${slug}/final`, tags: [{ label: "Final", tone: "orange" }, trackTag] });
  }

  const st = streaks(state.days, input.today);
  if (st.current > 0 && !st.activeToday) {
    list.push({ id: "streak", text: `Keep your ${st.current}-day streak: pass a quiz or finish a task today`, href: next ? `/learn/${slug}/${next.day}` : `/learn/${slug}`, tags: [{ label: "Streak", tone: "orange" }] });
  }

  if (daysLeft !== null && daysLeft <= 7) {
    list.push({
      id: "access",
      text: daysLeft === 0 ? "Your access ends today. Add time to keep learning" : `Your access ends in ${daysLeft} ${daysLeft === 1 ? "day" : "days"}. Add time to keep going`,
      href: "/dashboard/billing",
      tags: [{ label: "Billing", tone: "red" }],
    });
  }
  return list;
}

/* ---------- Recent activity ---------- */

export type Activity = { id: string; title: string; what: string; kinds: string[]; xp: number; at: string };

const WINDOW = 5 * 60_000;
const rankOf: Record<string, number> = { final: 4, lesson: 3, perfect: 2, quiz: 1, task: 1 };

function describe(kinds: Set<string>) {
  if (kinds.has("final")) return "Passed the final assessment";
  if (kinds.has("lesson")) return "Completed the lesson";
  if (kinds.has("perfect")) return "Aced the quiz";
  if (kinds.has("quiz")) return "Passed the quiz";
  return "Finished the practical task";
}

/**
 * XP events folded into moments: a quiz pass, a perfect score and the lesson completing a few
 * seconds apart are one thing that happened, not three. Newest first.
 */
export function recentActivity(events: XpEvent[], titleOf: (ref: string) => string, limit = 6): Activity[] {
  const sorted = [...events].sort((a, b) => b.created_at.localeCompare(a.created_at));
  const groups: { ref: string; at: string; last: number; kinds: Set<string>; xp: number }[] = [];
  for (const e of sorted) {
    const t = Date.parse(e.created_at);
    const g = groups.find((x) => x.ref === e.ref && x.last - t <= WINDOW);
    if (g) {
      g.kinds.add(e.kind);
      g.xp += e.xp;
      g.last = t;
    } else groups.push({ ref: e.ref, at: e.created_at, last: t, kinds: new Set([e.kind]), xp: e.xp });
  }
  return groups.slice(0, limit).map((g) => ({
    id: `${g.ref}:${g.at}`,
    title: titleOf(g.ref),
    what: describe(g.kinds),
    kinds: [...g.kinds].sort((a, b) => (rankOf[b] ?? 0) - (rankOf[a] ?? 0)),
    xp: g.xp,
    at: g.at,
  }));
}

/** "3 hours ago", "yesterday", "12 Oct". */
export function timeAgo(iso: string, now = new Date()) {
  const s = Math.max(0, (now.getTime() - Date.parse(iso)) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86_400) return `${Math.floor(s / 3600)} ${Math.floor(s / 3600) === 1 ? "hour" : "hours"} ago`;
  const days = Math.floor(s / 86_400);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Africa/Lagos" });
}

/** Good morning / afternoon / evening, by the clock in Lagos. */
export function greeting(now = new Date()) {
  const h = Number(now.toLocaleString("en-GB", { hour: "2-digit", hour12: false, timeZone: "Africa/Lagos" })) % 24;
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}
