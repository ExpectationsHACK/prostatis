"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";

type Step = { label: string; ok: boolean };

/**
 * Sticky lesson header under the site bar: where you are in the track, the three steps
 * (read → task → quiz) and one bar for today's lesson. Reading fills the first third as
 * you scroll; the task and the quiz fill a third each once done.
 */
export function ReadingProgress({ day, total, title, doneLessons, steps }: { day: number; total: number; title: string; doneLessons: number; steps: [Step, Step, Step] }) {
  const [read, setRead] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setRead(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  // Reading counts as done once you reach the bottom (or it was already completed).
  const readPart = steps[1].ok || steps[2].ok ? 1 : read > 0.97 ? 1 : read;
  const pct = Math.round(((readPart + Number(steps[1].ok) + Number(steps[2].ok)) / 3) * 100);
  const marks = [readPart >= 1, steps[1].ok, steps[2].ok];

  return (
    <div className="sticky top-14 z-20 border-b-2 border-edge bg-paper/95 backdrop-blur print:hidden">
      <div className="mx-auto flex h-11 max-w-6xl items-center gap-3 px-4">
        <p className="label shrink-0 text-brand-text">
          Day {day}/{total}
        </p>
        <p className="min-w-0 flex-1 truncate font-mono text-[12.5px] font-bold text-ink">{title}</p>
        <ol className="hidden items-center gap-2 md:flex" aria-label="Today's steps">
          {steps.map((s, i) => (
            <li key={s.label} className="flex items-center gap-1 font-mono text-[11.5px] text-ink">
              <span className={"grid size-4 place-items-center border-2 border-edge " + (marks[i] ? "bg-success text-paper" : "bg-card")} aria-hidden>
                {marks[i] && <Check className="size-2.5" strokeWidth={4} />}
              </span>
              <span className={marks[i] ? "text-muted line-through" : ""}>{s.label}</span>
            </li>
          ))}
        </ol>
        <p className="tabular shrink-0 font-mono text-[12px] font-bold text-ink" aria-live="polite">
          {pct}%
        </p>
      </div>
      <div
        className="h-2 bg-wash"
        role="progressbar"
        aria-label="Today's lesson progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        title={`${pct}% of today's lesson · ${doneLessons}/${total} lessons done in this track`}
      >
        <div className="h-full bg-brand transition-[width] duration-150 motion-reduce:transition-none" style={{ width: `${pct}%` }} />
      </div>
      <div className="h-1 bg-card" aria-hidden title={`${doneLessons}/${total} lessons done`}>
        <div className="h-full bg-success" style={{ width: `${(doneLessons / total) * 100}%` }} />
      </div>
    </div>
  );
}
