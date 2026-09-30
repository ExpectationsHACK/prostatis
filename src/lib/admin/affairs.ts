// Student-affairs rules: who needs a nudge, and why. Pure, so it's unit-tested.
import { fastTrack, mainTrack, type Track } from "@/lib/curriculum";
import { type LearnerState, trackProgress } from "@/lib/learning/engine";

export type AffairsInput = {
  id: string;
  name: string;
  email: string;
  whatsapp: string | null;
  joined: string;
  plan: Track["id"] | null;
  accessEnd: string | null;
  state: LearnerState;
};

export type Flag = { kind: "not_started" | "inactive" | "stuck_quiz" | "task_pending" | "expiring" | "ready_final" | "failed_final" | "expired_unfinished"; label: string; detail: string; severity: 1 | 2 | 3 };

const DAY = 86400_000;

export function tracksFor(plan: Track["id"] | null): Track[] {
  return plan === "main_track" ? [mainTrack] : plan === "fast_track" ? [fastTrack] : [];
}

export function lastActive(state: LearnerState): string | null {
  const days = [...state.days].sort();
  return days.at(-1) ?? null;
}

export function flagsFor(s: AffairsInput, now = new Date()): Flag[] {
  if (!s.plan || !s.accessEnd) return [];
  const flags: Flag[] = [];
  const end = new Date(s.accessEnd).getTime();
  const active = end > now.getTime();
  const track = tracksFor(s.plan)[0];
  const prog = trackProgress(track, s.state);
  const last = lastActive(s.state);
  const idleDays = last ? Math.floor((now.getTime() - new Date(`${last}T12:00:00+01:00`).getTime()) / DAY) : null;
  const final = s.state.finals[track.id];

  if (!active) {
    if (!final?.passed_at) flags.push({ kind: "expired_unfinished", label: "Access ended before finishing", detail: `${prog.completed}/${prog.total} lessons done. Offer an extension?`, severity: 1 });
    return flags;
  }

  if (!last && now.getTime() - new Date(s.joined).getTime() > 2 * DAY) {
    flags.push({ kind: "not_started", label: "Paid but hasn't started", detail: "No lesson activity yet.", severity: 3 });
  } else if (idleDays !== null && idleDays >= 5 && !prog.allDone) {
    flags.push({ kind: "inactive", label: `Inactive for ${idleDays} days`, detail: `Stopped at ${prog.next ? `Day ${prog.next.day}: ${prog.next.title}` : "the final"}.`, severity: idleDays >= 10 ? 3 : 2 });
  }

  for (const d of prog.days) {
    if (d.status !== "open") continue;
    const row = s.state.lessons[d.module.lesson];
    if (!row) continue;
    if (row.quiz_total > 0 && !row.quiz_passed_at) flags.push({ kind: "stuck_quiz", label: "Stuck on a quiz", detail: `Day ${d.module.day}: best ${row.quiz_best}/${row.quiz_total}, needs 70%.`, severity: 2 });
    else if (row.quiz_passed_at && !row.task_done_at) flags.push({ kind: "task_pending", label: "Mission not confirmed", detail: `Day ${d.module.day}: passed the quiz, task not done.`, severity: 1 });
  }

  const left = Math.ceil((end - now.getTime()) / DAY);
  if (left <= 5 && !final?.passed_at) flags.push({ kind: "expiring", label: `Access ends in ${left} day${left === 1 ? "" : "s"}`, detail: `${prog.completed}/${prog.total} lessons done.`, severity: left <= 2 ? 3 : 2 });
  if (prog.allDone && !final?.passed_at) {
    if (final && final.total > 0) flags.push({ kind: "failed_final", label: "Final not passed yet", detail: `Best ${final.best}/${final.total}, needs 75%.`, severity: 2 });
    else flags.push({ kind: "ready_final", label: "Ready for the final", detail: "All lessons done; final not attempted.", severity: 1 });
  }
  return flags;
}
