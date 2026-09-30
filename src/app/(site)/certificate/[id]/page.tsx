import { BadgeCheck, Download, ShieldX } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyLink } from "@/components/copy-link";
import { btn, size } from "@/components/ui";
import { certDate, trackOf, verifyUrl } from "@/lib/certificate-image";
import { getCertificate } from "@/lib/certificates";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const cert = await getCertificate((await params).id);
  if (!cert) return { title: "Certificate not found", robots: { index: false } };
  const track = trackOf(cert.track);
  return {
    title: `${cert.name}: ${track.name} certificate`,
    description: `${cert.name} completed the ${track.name} at ${site.name}. Certificate ID ${cert.id}.`,
    robots: { index: false },
    openGraph: { images: [`/api/certificate/${cert.id}`] },
  };
}

export default async function VerifyCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const cert = await getCertificate((await params).id);
  if (!cert) notFound();
  const track = trackOf(cert.track);
  const issued = new Date(cert.issued_at);
  const linkedin = new URL("https://www.linkedin.com/profile/add");
  Object.entries({
    startTask: "CERTIFICATION_NAME",
    name: `${track.name}: Building Websites with AI`,
    organizationName: site.name,
    issueYear: String(issued.getUTCFullYear()),
    issueMonth: String(issued.getUTCMonth() + 1),
    certUrl: verifyUrl(cert.id),
    certId: cert.id,
  }).forEach(([k, v]) => linkedin.searchParams.set(k, v));

  return (
    <div className="paper-grid px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        {cert.revoked_at ? (
          <p className="ink-block flex items-center gap-3 bg-[#fde2df] px-4 py-3 font-mono text-[14px] text-ink">
            <ShieldX className="size-5 shrink-0 text-danger" aria-hidden /> This certificate has been revoked and is no longer valid.
          </p>
        ) : (
          <p className="ink-block flex items-center gap-3 bg-[#e3f5e9] px-4 py-3 font-mono text-[14px] text-ink">
            <BadgeCheck className="size-5 shrink-0 text-success" aria-hidden />
            <span>
              <strong>Verified.</strong> {site.name} issued this certificate to {cert.name} on {certDate(cert.issued_at)}.
            </span>
          </p>
        )}

        {!cert.revoked_at && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- generated PNG, sized by the route */}
            <img src={`/api/certificate/${cert.id}`} alt={`${track.name} certificate of completion for ${cert.name}`} width={1600} height={1131} className="ink-block mt-6 h-auto w-full bg-card" />
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`/api/certificate/${cert.id}?download=1`} className={`${btn.primary} ${size.md}`}>
                <Download className="size-4" aria-hidden /> Download PNG
              </a>
              <a href={linkedin.toString()} target="_blank" rel="noopener" className={`${btn.secondary} ${size.md}`}>
                Add to LinkedIn
              </a>
              <CopyLink label="Copy verification link" />
            </div>
          </>
        )}

        <dl className="ink-block mt-8 grid gap-4 bg-card p-5 font-mono text-[14px] sm:grid-cols-2">
          <div><dt className="label text-muted">Awarded to</dt><dd className="mt-1 font-bold text-ink">{cert.name}</dd></div>
          <div><dt className="label text-muted">Programme</dt><dd className="mt-1 font-bold text-ink">{track.name} ({track.length}, {track.modules.length} lessons)</dd></div>
          <div><dt className="label text-muted">Final assessment</dt><dd className="mt-1 font-bold text-ink">{cert.score}/{cert.total} (pass mark 75%)</dd></div>
          <div><dt className="label text-muted">Certificate ID</dt><dd className="mt-1 font-bold text-ink">{cert.id}</dd></div>
        </dl>
        <p className="mt-5 font-mono text-[13px] leading-relaxed text-muted">
          How it's earned: every lesson's quiz passed (70%+), every practical task completed, then a final assessment passed with 75% or more.{" "}
          <Link href={`/tracks/${cert.track === "main_track" ? "main-track" : "fast-track"}`} className="font-bold text-ink underline">See what the {track.name} covers</Link>.
        </p>
      </div>
    </div>
  );
}
