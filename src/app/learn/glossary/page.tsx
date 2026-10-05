import type { Metadata } from "next";
import { ArrowLeft, BookA } from "lucide-react";
import Link from "next/link";
import { Rich, slugTerm } from "@/components/learn/lesson-body";
import { lessons } from "@/content/lessons";
import { tracks } from "@/lib/curriculum";
import { requireLearner, slugOf } from "@/lib/learning/access";

export const metadata: Metadata = { title: "Glossary" };

/** Every Jargon buster from every lesson, A–Z, linked back to where it's taught. */
export default async function Glossary() {
  const learner = await requireLearner("/learn/glossary");
  const track = tracks.find((t) => learner.tracks.includes(t.id) && t.id === "main_track") ?? tracks[0];
  const where = new Map(track.modules.map((m) => [m.lesson, m.day]));
  // Walk the learner's track in order first, so each word links to the earliest lesson that explains it.
  const order = [...track.modules, ...tracks.filter((t) => t !== track).flatMap((t) => t.modules)].map((m) => m.lesson);
  const seen = new Map<string, { term: string; meaning: string; like: string; lesson: string; title: string }>();
  for (const id of order) {
    const l = lessons[id];
    for (const s of l.sections)
      for (const b of s.blocks)
        if (b.t === "define" && !seen.has(b.term.toLowerCase())) seen.set(b.term.toLowerCase(), { term: b.term, meaning: b.meaning, like: b.like, lesson: l.id, title: l.title });
  }
  const entries = [...seen.values()].sort((a, b) => a.term.localeCompare(b.term));
  const letters = [...new Set(entries.map((e) => e.term[0].toUpperCase()))];

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <Link href="/learn" className="label inline-flex items-center gap-1.5 text-muted hover:text-ink">
          <ArrowLeft className="size-3.5" aria-hidden /> My tracks
        </Link>
        <p className="label mt-5 flex items-center gap-1.5 text-brand-text"><BookA className="size-3.5" aria-hidden /> Glossary · {entries.length} words</p>
        <h1 className="display mt-2 text-[30px] text-ink sm:text-[48px]">Every word, in plain English</h1>
        <nav className="mt-6 flex flex-wrap gap-1.5" aria-label="Jump to letter">
          {letters.map((l) => (
            <a key={l} href={`#letter-${l}`} className="grid size-8 place-items-center border border-edge bg-card font-mono text-[13px] font-bold text-ink hover:bg-brand">{l}</a>
          ))}
        </nav>
        <dl className="mt-8 space-y-4">
          {entries.map((e, i) => {
            const first = i === 0 || entries[i - 1].term[0].toUpperCase() !== e.term[0].toUpperCase();
            const day = where.get(e.lesson);
            const t = track.modules.find((m) => m.lesson === e.lesson) ? track : tracks.find((x) => x.modules.some((m) => m.lesson === e.lesson))!;
            const d = day ?? t.modules.find((m) => m.lesson === e.lesson)!.day;
            return (
              <div key={e.term} id={first ? `letter-${e.term[0].toUpperCase()}` : undefined} className="scroll-mt-24 border border-edge bg-card p-4">
                <dt className="display text-[18px] sm:text-[20px] text-ink" id={`term-${slugTerm(e.term)}`}>{e.term}</dt>
                <dd className="mt-1.5 border-l-4 border-brand pl-3 text-[15px] leading-relaxed text-ink"><span className="font-semibold">Think of it like </span><Rich text={e.like} /></dd>
                <dd className="mt-2 text-[15.5px] leading-relaxed text-ink/90"><span className="font-semibold">In plain English: </span><Rich text={e.meaning} /></dd>
                <dd className="mt-2">
                  <Link href={`/learn/${slugOf(t)}/${d}#term-${slugTerm(e.term)}`} className="label text-brand-text underline">
                    Taught in Day {d}: {e.title}
                  </Link>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </>
  );
}
