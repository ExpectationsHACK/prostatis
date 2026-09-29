import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LogoTile } from "@/components/brand";
import { PrintButton } from "@/components/learn/print-button";
import { getPillar } from "@/lib/curriculum";
import { learnerTrack, requireLearner } from "@/lib/learning/access";
import { getStore } from "@/lib/learning/store";
import { site } from "@/lib/site";

export default async function CertificatePage({ params }: { params: Promise<{ track: string }> }) {
  const { track: slug } = await params;
  const learner = await requireLearner(`/learn/${slug}/certificate`);
  const track = learnerTrack(learner, slug);
  if (!track) notFound();
  const state = await getStore().load(learner.id);
  const final = state.finals[track.id];
  if (!final?.passed_at) redirect(`/learn/${slug}/final`);

  const date = new Date(final.passed_at).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" });
  const skills = [...new Set(track.modules.map((m) => getPillar(m.pillar).title))];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12 print:p-0">
      <div className="flex items-center justify-between gap-3 print:hidden">
        <Link href={`/learn/${slug}`} className="label inline-flex items-center gap-1.5 text-muted hover:text-ink">
          <ArrowLeft className="size-3.5" aria-hidden /> {track.name}
        </Link>
        <PrintButton />
      </div>

      <section className="mt-6 border-[3px] border-edge bg-card p-2 shadow-[8px_8px_0_var(--edge)] print:mt-0 print:shadow-none">
        <div className="field-grid border-2 border-edge bg-paper px-6 py-10 text-center sm:px-14 sm:py-14">
          <div className="flex items-center justify-center gap-2.5">
            <LogoTile size={40} />
            <span className="display text-[22px] text-ink">{site.name}</span>
          </div>
          <p className="label mt-8 text-brand-text">Certificate of completion</p>
          <p className="mt-6 font-mono text-[14px] text-muted">This certifies that</p>
          <p className="display mt-2 text-balance text-[40px] leading-tight text-ink sm:text-[56px]">{learner.name || "Club member"}</p>
          <p className="mx-auto mt-4 max-w-lg font-mono text-[14px] leading-relaxed text-ink">
            completed all {track.modules.length} lessons, practical tasks and assessments of the <strong>{track.name}</strong> ({track.length}) and passed the final assessment with {final.best}/{final.total}.
          </p>
          <ul className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-2">
            {skills.map((s) => (
              <li key={s} className="label border-2 border-edge bg-card px-2 py-1 text-ink">{s}</li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6 border-t-2 border-edge pt-6 sm:grid-cols-2">
            <div>
              <p className="label text-muted">Date</p>
              <p className="mt-1 font-bold text-ink">{date}</p>
            </div>
            <div>
              <p className="label text-muted">Certificate ID</p>
              <p className="mt-1 font-mono font-bold text-ink">{final.certificate_id}</p>
            </div>
          </div>
        </div>
      </section>
      <p className="mt-6 text-center font-mono text-[12px] text-muted print:hidden">Tip: choose “Save as PDF” in the print dialog to download it.</p>
    </div>
  );
}
