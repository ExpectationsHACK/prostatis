"use client";

import { Check, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LessonThumb } from "@/components/art/lesson-thumb";
import { getPillar, type Track } from "@/lib/curriculum";

/**
 * The course map for a track: week tabs, the days of that week, and a preview of the
 * selected day (its animated thumbnail, what it teaches, what you'll have by the end).
 * It walks through the days on its own until the visitor takes over; never under
 * reduced motion.
 */
export function CurriculumExplorer({ track, dark = false }: { track: Track; dark?: boolean }) {
  const [day, setDay] = useState(track.modules[0].day);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const mod = track.modules.find((m) => m.day === day)!;
  const week = mod.week;
  const days = track.modules.filter((m) => m.week === week);
  const idx = track.modules.findIndex((m) => m.day === day);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setDay(track.modules[(idx + 1) % track.modules.length].day), 6500);
    return () => clearTimeout(id);
  }, [auto, visible, idx, track.modules]);

  const pick = (d: number) => {
    setAuto(false);
    setDay(d);
  };
  const step = (by: number) => pick(track.modules[(idx + by + track.modules.length) % track.modules.length].day);

  const ink = dark ? "text-white" : "text-ink";
  const muted = dark ? "text-white/65" : "text-muted";

  return (
    <div ref={ref} onMouseEnter={() => setAuto(false)} onFocus={() => setAuto(false)}>
      {/* Week tabs */}
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label={`${track.name} weeks`}>
        {track.weeks.map((w) => {
          const on = w.week === week;
          return (
            <button
              key={w.week}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => pick(track.modules.find((m) => m.week === w.week)!.day)}
              className={
                "rounded-full border-2 px-3.5 py-1.5 text-[13px] font-semibold transition-colors " +
                (on ? "border-ink bg-brand text-ink shadow-[2px_2px_0_var(--ink)]" : dark ? "border-white/25 text-white/80 hover:border-white/60" : "border-ink/20 text-ink/75 hover:border-ink")
              }
            >
              Week {w.week} · {w.title}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setAuto((a) => !a)}
          className={"ml-auto grid size-9 place-items-center rounded-full border-2 " + (dark ? "border-white/25 text-white" : "border-ink/20 text-ink")}
          aria-label={auto ? "Pause the tour" : "Play the tour"}
          title={auto ? "Pause the tour" : "Play the tour"}
        >
          {auto ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
      </div>
      <p className={`mt-3 text-[14px] ${muted}`}>{track.weeks.find((w) => w.week === week)?.blurb}</p>

      <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Days in this week */}
        <ol className="space-y-2">
          {days.map((m) => {
            const on = m.day === day;
            return (
              <li key={m.day}>
                <button
                  type="button"
                  onClick={() => pick(m.day)}
                  aria-current={on ? "step" : undefined}
                  className={
                    "flex w-full items-center gap-3 rounded-[12px] border-2 px-3 py-2.5 text-left transition-[background-color,border-color] " +
                    (on ? "border-ink bg-card shadow-[3px_3px_0_var(--ink)]" : dark ? "border-white/15 hover:border-white/40" : "border-ink/10 bg-card/60 hover:border-ink/40")
                  }
                >
                  <span className={"grid size-9 shrink-0 place-items-center rounded-[10px] text-[13px] font-bold " + (on ? "bg-brand text-ink" : dark ? "bg-white/10 text-white" : "bg-sunk text-ink")}>{m.day}</span>
                  <span className="min-w-0 flex-1">
                    <span className={"block truncate text-[14.5px] font-semibold " + (on ? "text-ink" : ink)}>{m.title}</span>
                    <span className={"block truncate text-[12.5px] " + (on ? "text-muted" : muted)}>{getPillar(m.pillar).title}</span>
                  </span>
                  {on && <ChevronRight className="size-4 shrink-0 text-ink" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ol>

        {/* Selected day */}
        <div className="ink-block flex flex-col bg-card" aria-live="polite">
          <div className="border-b-2 border-ink bg-sunk">
            <LessonThumb key={mod.day} thumb={mod.thumb} index={mod.day} />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="label text-brand-text">
              Day {mod.day} of {track.modules.length} · {getPillar(mod.pillar).title}
            </p>
            <h3 className="display mt-1.5 text-[21px] sm:text-[24px] leading-tight text-ink">{mod.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{mod.summary}</p>
            <p className="label mt-4 text-ink">By the end of the day you&apos;ll have</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {mod.outcomes.map((o) => (
                <li key={o} className="flex items-center gap-1.5 rounded-full border-2 border-line px-2.5 py-1 text-[13px] font-medium text-ink">
                  <Check className="size-3.5 text-success" strokeWidth={3} aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sunk" aria-hidden>
                <div className="h-full rounded-full bg-brand transition-[width] duration-500" style={{ width: `${((idx + 1) / track.modules.length) * 100}%` }} />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => step(-1)} className="grid size-9 place-items-center rounded-full border-2 border-ink bg-card hover:bg-sunk" aria-label="Previous day">
                  <ChevronLeft className="size-4" />
                </button>
                <button type="button" onClick={() => step(1)} className="grid size-9 place-items-center rounded-full border-2 border-ink bg-brand hover:bg-brand-hover" aria-label="Next day">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
