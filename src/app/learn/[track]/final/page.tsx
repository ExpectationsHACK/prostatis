import type { Metadata } from "next";
import { ArrowLeft, Award, Lock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Quiz } from "@/components/learn/quiz";
import { PreviewBanner } from "@/components/learn/stats";
import { btn, size } from "@/components/ui";
import { getLesson } from "@/content/lessons";
import { learnerTrack, requireLearner } from "@/lib/learning/access";
import { FINAL_PASS_MARK, FINAL_RETRY_MINUTES, finalQuestions, publicQuestions, trackProgress, XP } from "@/lib/learning/engine";
import { getStore } from "@/lib/learning/store";

export const metadata: Metadata = { title: "Final assessment" };

export default async function FinalPage({ params }: { params: Promise<{ track: string }> }) {
  const { track: slug } = await params;
  const learner = await requireLearner(`/learn/${slug}/final`);
  const track = learnerTrack(learner, slug);
  if (!track) notFound();
  const state = await getStore().load(learner.id);
  const prog = trackProgress(track, state);
  const final = state.finals[track.id];

  return (
    <>
      {learner.preview && <PreviewBanner />}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <Link href={`/learn/${slug}`} className="label inline-flex items-center gap-1.5 text-muted hover:text-ink">
          <ArrowLeft className="size-3.5" aria-hidden /> {track.name}
        </Link>
        <p className="label mt-5 text-brand-text">Final assessment</p>
        <h1 className="display mt-2 text-[30px] text-ink sm:text-[48px]">{track.name}: the final</h1>

        {!prog.allDone ? (
          <div className="ink-block mt-8 bg-card p-6 text-center">
            <Lock className="mx-auto size-8 text-ink" aria-hidden />
            <p className="mt-3 font-mono text-[14px] text-ink">
              Complete all {prog.total} lessons to unlock the final ({prog.completed} done).
            </p>
            {prog.next && (
              <Link href={`/learn/${slug}/${prog.next.day}`} className={`${btn.primary} ${size.md} mt-5`}>
                Continue with Day {prog.next.day}
              </Link>
            )}
          </div>
        ) : (
          <>
            <p className="mt-3 max-w-2xl font-mono text-[14px] leading-relaxed text-muted">
              One question from each lesson, {prog.total} in all. Score 75% or more to pass, earn {XP.final} XP and your certificate. If you don&apos;t pass, you&apos;ll see your score (not which answers were wrong) and can try again after {FINAL_RETRY_MINUTES} minutes.
            </p>
            {final?.passed_at && (
              <Link href={`/learn/${slug}/certificate`} className={`${btn.primary} ${size.md} mt-5`}>
                <Award className="size-4" aria-hidden /> View your certificate
              </Link>
            )}
            <div className="mt-8">
              <Quiz
                slug={slug}
                questions={publicQuestions(finalQuestions(track, (id) => getLesson(id)?.quiz ?? []))}
                passMark={FINAL_PASS_MARK}
                passed={Boolean(final?.passed_at)}
                best={final?.best ?? 0}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
