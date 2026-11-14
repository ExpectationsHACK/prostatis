import { Award, Check, Flag, Flame, Medal, Sparkles, Star, Target, Trophy } from "lucide-react";
import type { Badge } from "@/lib/learning/engine";
import { cycle, hueClass, pillarHue, type Hue } from "@/lib/hues";

const icons = { spark: Sparkles, target: Target, flame: Flame, trophy: Trophy, flag: Flag, award: Award, star: Star, medal: Medal };

const fixed: Record<string, Hue> = { first: "blue", perfect: "pink", streak3: "orange", streak7: "orange", half: "purple", xp1000: "yellow", done: "teal", cert: "green" };

/** Each badge keeps one colour: a lesson milestone takes its skill's hue, a part badge the step cycle. */
function hueOf(b: Badge): Hue {
  if (b.pillar) return pillarHue[b.pillar];
  const part = /^week(\d+)$/.exec(b.id);
  if (part) return cycle[(Number(part[1]) - 1) % cycle.length];
  return fixed[b.id] ?? "blue";
}

/**
 * The badge shelf. Every badge is visible from day one so members can see what's ahead: unearned
 * ones sit in black and white with how to earn them, and light up in their own colour once earned.
 */
export function BadgeShelf({ list }: { list: Badge[] }) {
  const got = list.filter((b) => b.earned).length;
  // Earned first, so a member's wins lead the shelf.
  const sorted = [...list.filter((b) => b.earned), ...list.filter((b) => !b.earned)];
  return (
    <section className="mt-10 rounded-[16px] border border-edge bg-gradient-to-br from-hue-yellow-wash via-card to-hue-purple-wash p-4 sm:p-6">
      <h2 className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="display text-[21px] sm:text-[24px] text-ink">Badges</span>
        <span className="label text-ink">
          <span className="text-brand-text">{got}</span> of {list.length} earned
        </span>
      </h2>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-wash" role="progressbar" aria-label="Badges earned" aria-valuenow={got} aria-valuemin={0} aria-valuemax={list.length}>
        <div className="h-full rounded-full bg-gradient-to-r from-hue-blue via-hue-purple to-brand" style={{ width: `${list.length ? (got / list.length) * 100 : 0}%` }} />
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {sorted.map((b) => {
          const Icon = icons[b.icon];
          const h = hueClass[hueOf(b)];
          const onSolid = hueOf(b) === "yellow" || hueOf(b) === "orange" ? "text-ink" : "text-white";
          return (
            <li
              key={b.id}
              className={
                "relative flex flex-col items-center rounded-[14px] p-3 text-center " +
                (b.earned ? `badge-lit border-2 ${h.border} ${h.wash}` : "border border-dashed border-line bg-card/80")
              }
              aria-label={`${b.name}: ${b.earned ? "earned" : `not earned yet. ${b.desc}`}`}
            >
              {b.earned && (
                <span className={`absolute right-2 top-2 grid size-5 place-items-center rounded-full ${h.solid} ${onSolid}`}>
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
              )}
              <span
                className={
                  `grid size-14 place-items-center rounded-full border-2 border-edge ${h.solid} ` +
                  (b.earned ? "badge-glow" : "opacity-50 grayscale")
                }
              >
                <Icon className={`size-6 ${onSolid}`} aria-hidden />
              </span>
              <p className={"mt-2 font-mono text-[12px] font-bold leading-tight " + (b.earned ? "text-ink" : "text-muted")}>{b.name}</p>
              <p className={"mt-0.5 font-mono text-[10.5px] leading-snug " + (b.earned ? h.text : "text-muted")}>
                {b.desc}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
