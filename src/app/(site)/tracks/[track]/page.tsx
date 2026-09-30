import { ArrowRight, Check, ClipboardCheck, Flame, Trophy } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackLessons } from "@/components/track-lessons";
import { btn, size } from "@/components/ui";
import { fastTrack, mainTrack, type Track } from "@/lib/curriculum";
import { formatNgn, plans } from "@/lib/site";

const bySlug: Record<string, Track> = { "fast-track": fastTrack, "main-track": mainTrack };

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(bySlug).map((track) => ({ track }));
}

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }): Promise<Metadata> {
  const track = bySlug[(await params).track];
  if (!track) return {};
  const plan = plans.find((p) => p.id === track.id)!;
  return { title: `${track.name}: ${track.length}, ${formatNgn(plan.priceNgn)}`, description: track.blurb };
}

export default async function TrackPage({ params }: { params: Promise<{ track: string }> }) {
  const track = bySlug[(await params).track];
  if (!track) notFound();
  const plan = plans.find((p) => p.id === track.id)!;
  const other = track.id === "fast_track" ? mainTrack : fastTrack;
  const otherSlug = track.id === "fast_track" ? "main-track" : "fast-track";

  return (
    <div>
      <header className="border-b border-line bg-card px-4 py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <p className="text-[13px] font-semibold text-brand-text">
              {track.length} · {track.modules.length} lessons · {track.weeks.length} weeks
            </p>
            <h1 className="display mt-3 text-[44px] text-ink sm:text-[60px]">The {track.name}</h1>
            <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-muted">{track.blurb}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={`/checkout/${track.id}`} className={`${btn.primary} ${size.lg}`}>
                Enroll Now · {formatNgn(plan.priceNgn)} <ArrowRight className="size-4" aria-hidden />
              </Link>
              <span className="text-[13.5px] text-muted">One-time · {plan.accessDays} days access</span>
            </div>
          </div>
          <div className="ink-block bg-card p-6">
            <p className="label text-brand-text">What you&apos;ll walk away with</p>
            <ul className="mt-3 space-y-2.5">
              {plan.results.map((r) => (
                <li key={r} className="flex gap-2.5 text-[14px] text-ink">
                  <Check className="mt-0.5 size-[18px] shrink-0 text-success" strokeWidth={2.75} aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* How learning works */}
      <section className="border-b border-edge px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            { icon: ClipboardCheck, title: "A quiz after every lesson", body: "Score 70% or more to complete the lesson. Every question explains the right answer." },
            { icon: Trophy, title: "XP and levels", body: "Earn XP for lessons, quizzes and practical tasks. Level up as you ship real work." },
            { icon: Flame, title: "Daily streak", body: "Learn something every day to keep your streak alive, small steps, every day." },
          ].map((c) => (
            <div key={c.title} className="ink-block flex gap-4 bg-card p-5">
              <span className="grid size-11 shrink-0 place-items-center border border-edge bg-brand">
                <c.icon className="size-5 text-ink" aria-hidden />
              </span>
              <div>
                <h2 className="display text-[19px] text-ink">{c.title}</h2>
                <p className="mt-1 font-mono text-[12.5px] leading-relaxed text-muted">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20">
        <TrackLessons track={track} />
        <div className="ink-block mx-auto mt-16 max-w-3xl bg-card p-6 text-center">
          <p className="label text-brand-text">Final assessment</p>
          <h2 className="display mt-2 text-[26px] text-ink">Finish with a capstone and a verified certificate</h2>
          <p className="mt-2 font-mono text-[13px] leading-relaxed text-muted">
            A final exam drawn from every lesson, plus a project checklist that proves you can deliver what the track promises. Pass it and your certificate is ready to download, emailed to you, and backed by a public proof page with a unique ID that clients can check.
          </p>
          <Link href={`/checkout/${track.id}`} className={`${btn.primary} ${size.lg} mt-6`}>
            Enroll Now <ArrowRight className="size-4" aria-hidden />
          </Link>
          <p className="mt-4 font-mono text-[12px] text-muted">
            Want {track.id === "fast_track" ? "everything" : "something shorter"}?{" "}
            <Link href={`/tracks/${otherSlug}`} className="font-bold text-ink underline">
              See the {other.name}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
