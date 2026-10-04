import type { Metadata } from "next";
import { ArrowLeft, BadgeCheck, Download } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LogoMark } from "@/components/brand";
import { CopyLink } from "@/components/copy-link";
import { PrintButton } from "@/components/learn/print-button";
import { btn, size } from "@/components/ui";
import { verifyUrl } from "@/lib/certificate-image";
import { issueCertificate } from "@/lib/certificates";
import { getPillar } from "@/lib/curriculum";
import { learnerTrack, requireLearner } from "@/lib/learning/access";
import { getStore } from "@/lib/learning/store";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Your certificate" };

export default async function CertificatePage({ params }: { params: Promise<{ track: string }> }) {
  const { track: slug } = await params;
  const learner = await requireLearner(`/learn/${slug}/certificate`);
  const track = learnerTrack(learner, slug);
  if (!track) notFound();
  const state = await getStore().load(learner.id);
  const final = state.finals[track.id];
  if (!final?.passed_at || !final.certificate_id) redirect(`/learn/${slug}/final`);

  // Backfills the public record for anyone who passed before certificates were stored.
  const cert = await issueCertificate({
    id: final.certificate_id,
    user_id: learner.id,
    track: track.id,
    name: learner.name,
    email: learner.email || null,
    score: final.best,
    total: final.total,
    issued_at: final.passed_at,
  });

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

      <section className="mt-6 border-[3px] border-edge bg-card p-2 print:mt-0 print:shadow-none">
        <div className="field-grid border border-edge bg-paper px-6 py-10 text-center sm:px-14 sm:py-14">
          <div className="flex items-center justify-center gap-2.5">
            <LogoMark size={40} />
            <span className="display text-[20px] sm:text-[22px] text-ink">{site.name}</span>
          </div>
          <p className="label mt-8 text-brand-text">Certificate of completion</p>
          <p className="mt-6 font-mono text-[14px] text-muted">This certifies that</p>
          <p className="display mt-2 text-balance text-[32px] leading-tight text-ink sm:text-[56px]">{cert.name || `${site.name} member`}</p>
          <p className="mx-auto mt-4 max-w-lg font-mono text-[14px] leading-relaxed text-ink">
            completed all {track.modules.length} lessons, practical tasks and assessments of the <strong>{track.name}</strong> ({track.length}) and passed the final assessment with {final.best}/{final.total}.
          </p>
          <ul className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-2">
            {skills.map((s) => (
              <li key={s} className="label border border-edge bg-card px-2 py-1 text-ink">{s}</li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6 border-t border-edge pt-6 sm:grid-cols-2">
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
      <div className="mt-6 space-y-4 print:hidden">
        <div className="flex flex-wrap justify-center gap-3">
          <a href={`/api/certificate/${cert.id}?download=1`} className={`${btn.primary} ${size.md}`}>
            <Download className="size-4" aria-hidden /> Download PNG
          </a>
          <Link href={`/certificate/${cert.id}`} className={`${btn.secondary} ${size.md}`}>
            <BadgeCheck className="size-4" aria-hidden /> Public proof page
          </Link>
          <CopyLink label="Copy verification link" url={verifyUrl(cert.id)} />
        </div>
        <p className="text-center font-mono text-[12px] leading-relaxed text-muted">
          {cert.emailed_at ? `We also emailed a copy to ${cert.email}. ` : ""}Anyone can check it's real at the public proof page. Add it to LinkedIn, your portfolio and your proposals. For a PDF, use Print and choose “Save as PDF”.
        </p>
      </div>
    </div>
  );
}
