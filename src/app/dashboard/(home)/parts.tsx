import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { HeatCell, TodoTag } from "@/lib/learning/insights";

/** A thin progress bar with an ink outline. */
export function Bar({ pct, tone = "bg-brand", label }: { pct: number; tone?: string; label?: string }) {
  const v = Math.max(0, Math.min(100, Math.round(pct)));
  return (
    <div className="h-2.5 overflow-hidden rounded-full border border-edge bg-paper" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className={`h-full rounded-full ${tone}`} style={{ width: `${v}%` }} />
    </div>
  );
}

/** A section heading with an optional count and a link on the right. */
export function SectionHead({ title, icon: Icon, count, link }: { title: string; icon: LucideIcon; count?: number; link?: { href: string; label: string } }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-[17px] font-bold text-ink sm:text-[18px]">
        <span className="grid size-7 place-items-center rounded-[8px] border-2 border-edge bg-brand-wash">
          <Icon className="size-4 text-brand-text" aria-hidden />
        </span>
        {title}
        {count !== undefined && <span className="grid h-6 min-w-6 place-items-center rounded-full bg-wash px-1.5 text-[12px] font-bold tabular-nums text-ink">{count}</span>}
      </h2>
      {link && (
        <Link href={link.href} className="shrink-0 text-[13px] font-semibold text-brand-text hover:underline">
          {link.label}
        </Link>
      )}
    </div>
  );
}

const tagTone: Record<TodoTag["tone"], string> = {
  orange: "bg-brand-wash text-brand-text",
  green: "bg-[#e3f5e9] text-success",
  red: "bg-[#fdecea] text-danger",
  plain: "bg-sunk text-ink",
};

export function Tag({ tag }: { tag: TodoTag }) {
  return <span className={`inline-flex h-6 items-center whitespace-nowrap rounded-full border border-edge px-2.5 text-[11.5px] font-bold ${tagTone[tag.tone]}`}>{tag.label}</span>;
}

/** A pill on the dark hero. */
export function Chip({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <li className="inline-flex h-8 items-center gap-1.5 rounded-full border-2 border-edge bg-card px-2.5 text-[12.5px] font-semibold text-ink sm:h-9 sm:px-3 sm:text-[13px]">
      <Icon className="size-4 text-brand-text" aria-hidden /> {children}
    </li>
  );
}

// Orange steps from "a little" to "a full lesson", so the grid reads at a glance.
const heat = ["bg-sunk", "bg-[#fbd5c2]", "bg-[#f5a37f]", "bg-brand", "bg-brand-text"];
const WEEKDAYS = ["Mon", "", "Wed", "", "Fri", "", ""];

/**
 * The last 13 weeks of learning, one square a day. Built from the days the member actually
 * passed a quiz or finished a task, shaded by the XP they earned that day.
 */
export function Heatmap({ grid }: { grid: HeatCell[][] }) {
  const cells = grid.flat().filter((c) => !c.future);
  const active = cells.filter((c) => c.active).length;
  const fmt = (day: string) => new Date(`${day}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
  return (
    <div>
      <div className="flex gap-1.5" role="img" aria-label={`Learning activity over the last ${grid.length} weeks: ${active} active ${active === 1 ? "day" : "days"}`}>
        <div className="grid grid-rows-7 gap-[3px] pr-0.5 text-[9.5px] leading-none text-muted" aria-hidden>
          {WEEKDAYS.map((d, i) => (
            <span key={i} className="flex h-[11px] items-center sm:h-[13px]">{d}</span>
          ))}
        </div>
        <div className="grid flex-1 grid-flow-col grid-rows-7 gap-[3px]" style={{ gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))` }} aria-hidden>
          {grid.flat().map((c) => (
            <span
              key={c.day}
              title={c.future ? undefined : `${fmt(c.day)}: ${c.xp ? `${c.xp} XP` : c.active ? "active" : "no activity"}`}
              className={"h-[11px] rounded-[3px] sm:h-[13px] " + (c.future ? "bg-transparent" : `${heat[c.level]} ${c.level ? "" : "border border-line"}`)}
            />
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-1 text-[10.5px] text-muted" aria-hidden>
        Less
        {heat.map((h, i) => (
          <span key={i} className={`size-[10px] rounded-[2px] ${h} ${i ? "" : "border border-line"}`} />
        ))}
        More
      </div>
    </div>
  );
}
