import { Award, Flag, Flame, Lock, Sparkles, Star, Target, Trophy } from "lucide-react";
import type { Badge } from "@/lib/learning/engine";

const icons = { spark: Sparkles, target: Target, flame: Flame, trophy: Trophy, flag: Flag, award: Award, star: Star };

/** The badge shelf: earned badges in colour, the rest greyed with how to earn them. */
export function BadgeShelf({ list }: { list: Badge[] }) {
  const got = list.filter((b) => b.earned).length;
  return (
    <section className="mt-10">
      <h2 className="flex items-baseline justify-between gap-3 border-b border-edge pb-2">
        <span className="display text-[24px] text-ink">Badges</span>
        <span className="label text-muted">{got}/{list.length} earned</span>
      </h2>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {list.map((b) => {
          const Icon = b.earned ? icons[b.icon] : Lock;
          return (
            <li key={b.id} className={"flex flex-col items-center border p-3 text-center " + (b.earned ? "border-edge bg-card" : "border-dashed border-line bg-paper/60")}>
              <span className={"grid size-12 place-items-center rounded-full border " + (b.earned ? "border-edge bg-[#f2c230]" : "border-line bg-wash")}>
                <Icon className={"size-5 " + (b.earned ? "text-ink" : "text-muted")} aria-hidden />
              </span>
              <p className={"mt-2 font-mono text-[12px] font-bold leading-tight " + (b.earned ? "text-ink" : "text-muted")}>{b.name}</p>
              <p className="mt-0.5 font-mono text-[10.5px] leading-snug text-muted">{b.desc}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
