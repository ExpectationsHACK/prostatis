import { Check } from "lucide-react";
import type { Badge } from "@/lib/learning/engine";
import { cycle, pillarHue, type Hue } from "@/lib/hues";
import { badgeIcon } from "./badge-icons";

// The deep shade of each hue (the text tones, 4.5:1+ on white), so a medal reads as one solid,
// confident colour rather than a pastel wash.
const medal: Record<Hue, string> = {
  purple: "bg-hue-purple",
  blue: "bg-hue-blue",
  orange: "bg-brand-text",
  green: "bg-hue-green",
  yellow: "bg-hue-yellow",
  pink: "bg-hue-pink",
  teal: "bg-hue-teal",
};

const fixed: Record<string, Hue> = { first: "blue", perfect: "pink", streak3: "orange", streak7: "orange", half: "purple", xp1000: "teal", done: "yellow", cert: "green" };

/** Each badge keeps one colour: a lesson milestone takes its skill's hue, a part badge the step cycle. */
function hueOf(b: Badge): Hue {
  if (b.pillar) return pillarHue[b.pillar];
  const part = /^week(\d+)$/.exec(b.id);
  if (part) return cycle[(Number(part[1]) - 1) % cycle.length];
  return fixed[b.id] ?? "blue";
}

/**
 * The badge shelf. Every badge is visible from the start so members can see what's ahead: unearned
 * ones are grey with how to earn them; earned ones light up as a solid coloured medal.
 */
export function BadgeShelf({ list }: { list: Badge[] }) {
  const got = list.filter((b) => b.earned).length;
  // Earned first, so a member's wins lead the shelf.
  const sorted = [...list.filter((b) => b.earned), ...list.filter((b) => !b.earned)];
  return (
    <section className="mt-10 rounded-[16px] border border-edge bg-card p-4 sm:p-6">
      <h2 className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="display text-[21px] sm:text-[24px] text-ink">Badges</span>
        <span className="text-[13px] font-semibold tabular-nums text-muted">
          <span className="text-ink">{got}</span> of {list.length} earned
        </span>
      </h2>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-wash" role="progressbar" aria-label="Badges earned" aria-valuenow={got} aria-valuemin={0} aria-valuemax={list.length}>
        <div className="h-full rounded-full bg-ink" style={{ width: `${list.length ? (got / list.length) * 100 : 0}%` }} />
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {sorted.map((b) => {
          const Icon = badgeIcon(b.id);
          return (
            <li
              key={b.id}
              className={"relative flex flex-col items-center rounded-[12px] border px-3 py-4 text-center " + (b.earned ? "border-line bg-card" : "border-line bg-paper")}
              aria-label={`${b.name}: ${b.earned ? "earned" : `not earned yet. ${b.desc}`}`}
            >
              {b.earned && (
                <span className="absolute right-2 top-2 grid size-4 place-items-center rounded-full bg-ink text-white">
                  <Check className="size-2.5" strokeWidth={3.5} aria-hidden />
                </span>
              )}
              <span className={"grid size-12 place-items-center rounded-full " + (b.earned ? `badge-lit ${medal[hueOf(b)]} text-white` : "bg-wash text-faint")}>
                <Icon className="size-[22px]" strokeWidth={1.75} aria-hidden />
              </span>
              <p className={"mt-3 text-[13px] font-semibold leading-tight " + (b.earned ? "text-ink" : "text-muted")}>{b.name}</p>
              <p className="mt-1 text-[11.5px] leading-snug text-muted">{b.desc}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
