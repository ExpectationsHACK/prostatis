import { getPillar, type Pillar } from "@/lib/curriculum";
import { pillarClasses } from "@/lib/hues";

/** A course skill as a coloured tag: the same colour for that skill on every page. */
export function PillarTag({ pillar, short = false, extra }: { pillar: Pillar; short?: boolean; extra?: string }) {
  const c = pillarClasses(pillar);
  const p = getPillar(pillar);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-bold uppercase tracking-[0.06em] ${c.wash} ${c.text}`}>
      <span className={`size-1.5 rounded-full ${c.solid}`} aria-hidden />
      {short ? p.short : p.title}
      {extra}
    </span>
  );
}
