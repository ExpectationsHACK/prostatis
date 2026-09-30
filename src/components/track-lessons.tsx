import Link from "next/link";
import { getPillar, type Module, type Track } from "@/lib/curriculum";
import { LessonThumb } from "./art/lesson-thumb";
import { WeekCarousel } from "./week-carousel";

export function LessonCard({ m, i, href }: { m: Module; i: number; href?: string }) {
  const body = (
    <>
      <div className="relative border-b border-edge">
        <LessonThumb thumb={m.thumb} index={m.day + i} />
        <span className="display absolute left-2 top-2 border border-edge bg-paper px-2 py-0.5 text-[15px] text-ink">Day {m.day}</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="label text-brand-text">{getPillar(m.pillar).title}</p>
        <h4 className="display mt-1.5 text-[19px] text-ink">{m.title}</h4>
        <p className="mt-1.5 font-mono text-[12.5px] leading-relaxed text-muted">{m.summary}</p>
        <ul className="mt-3 space-y-1 border-t border-dashed border-line pt-3">
          {m.outcomes.map((o) => (
            <li key={o} className="flex gap-2 font-mono text-[12px] text-ink">
              <span className="mt-1.5 size-1.5 shrink-0 bg-brand" aria-hidden />
              {o}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
  const cls = "ink-block block-press flex w-full flex-col bg-card";
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/** A track's lessons: one auto-scrolling row per week, each card with its own thumbnail. */
export function TrackLessons({ track, hrefFor, compact = false }: { track: Track; hrefFor?: (m: Module) => string; compact?: boolean }) {
  return (
    <>
      {track.weeks.map((w) => (
        <div key={w.week} className={"mx-auto max-w-6xl " + (compact ? "mt-10" : "mt-14")}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-edge pb-3">
            <span className="label bg-ink px-2 py-1 text-paper">Week {w.week}</span>
            <h3 className={"display text-ink " + (compact ? "text-[22px] sm:text-[26px]" : "text-[26px] sm:text-[32px]")}>{w.title}</h3>
            <p className="w-full font-mono text-[13px] text-muted sm:w-auto">{w.blurb}</p>
          </div>
          <div className="mt-6">
            <WeekCarousel label={`${track.name} week ${w.week}`}>
              {track.modules
                .filter((m) => m.week === w.week)
                .map((m, i) => (
                  <LessonCard key={m.day} m={m} i={i} href={hrefFor?.(m)} />
                ))}
            </WeekCarousel>
          </div>
        </div>
      ))}
    </>
  );
}
