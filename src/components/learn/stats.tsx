import { Flame, Sparkles, Trophy } from "lucide-react";
import { levelFor, streaks, type LearnerState } from "@/lib/learning/engine";

/** XP + level, streak, and lesson progress, as three ink cards. */
export function LearnerStats({ state, done, total }: { state: LearnerState; done: number; total: number }) {
  const lvl = levelFor(state.xp);
  const st = streaks(state.days);
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="ink-block bg-card p-4">
        <p className="label flex items-center gap-1.5 text-brand-text"><Sparkles className="size-3.5" aria-hidden /> Level {lvl.level} · {lvl.name}</p>
        <p className="display mt-1 text-[26px] sm:text-[32px] text-ink">{state.xp.toLocaleString("en-NG")} XP</p>
        <div className="mt-2 h-2.5 border border-edge bg-wash" role="progressbar" aria-label="Progress to next level" aria-valuenow={Math.round(lvl.progress * 100)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-brand" style={{ width: `${lvl.progress * 100}%` }} />
        </div>
        <p className="mt-1.5 font-mono text-[11.5px] text-muted">{lvl.next ? `${lvl.next - state.xp} XP to level ${lvl.level + 1}` : "Top level reached"}</p>
      </div>
      <div className="ink-block bg-card p-4">
        <p className="label flex items-center gap-1.5 text-brand-text"><Flame className="size-3.5" aria-hidden /> Streak</p>
        <p className="display mt-1 text-[26px] sm:text-[32px] text-ink">{st.current} {st.current === 1 ? "day" : "days"}</p>
        <p className="mt-1.5 font-mono text-[11.5px] leading-snug text-muted">
          {st.activeToday ? "You've learned today: keep it going tomorrow." : st.current ? "Pass a quiz or finish a task today to keep it." : "Pass a quiz or finish a task to start one."} Best: {st.longest}.
        </p>
      </div>
      <div className="ink-block bg-card p-4">
        <p className="label flex items-center gap-1.5 text-brand-text"><Trophy className="size-3.5" aria-hidden /> Lessons</p>
        <p className="display mt-1 text-[26px] sm:text-[32px] text-ink">{done}/{total}</p>
        <div className="mt-2 h-2.5 border border-edge bg-wash" role="progressbar" aria-label="Lessons complete" aria-valuenow={done} aria-valuemin={0} aria-valuemax={total}>
          <div className="h-full bg-success" style={{ width: `${(done / total) * 100}%` }} />
        </div>
        <p className="mt-1.5 font-mono text-[11.5px] text-muted">{Math.round((done / total) * 100)}% complete</p>
      </div>
    </div>
  );
}
