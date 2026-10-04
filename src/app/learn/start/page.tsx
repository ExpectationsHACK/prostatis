import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";
import { LessonBody } from "@/components/learn/lesson-body";
import { PreviewBanner } from "@/components/learn/stats";
import { btn, size } from "@/components/ui";
import { startHere } from "@/content/start";
import { requireLearner } from "@/lib/learning/access";
import { site } from "@/lib/site";

export default async function StartHere() {
  const learner = await requireLearner("/learn/start");
  const first = learner.tracks.includes("main_track") ? "/learn/main-track/1" : "/learn/fast-track/1";
  return (
    <>
      {learner.preview && <PreviewBanner />}
      <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <Link href="/learn" className="label inline-flex items-center gap-1.5 text-muted hover:text-ink">
          <ArrowLeft className="size-3.5" aria-hidden /> My tracks
        </Link>
        <p className="label mt-5 flex items-center gap-1.5 text-brand-text"><Compass className="size-3.5" aria-hidden /> Start here · 10 min</p>
        <h1 className="display mt-2 text-[36px] leading-[1.05] text-ink sm:text-[48px]">Welcome to {site.name}</h1>
        <p className="mt-4 text-[17px] leading-[1.75] text-ink/90">
          You don&apos;t need to know anything about code to succeed here. You need a laptop, a little time each day, and the habit of trying things as you read. This page explains how the course works, what it costs, and how to get unstuck, read it once, then begin Day 1.
        </p>
        <div className="mt-10">
          <LessonBody lesson={startHere} />
        </div>
        <div className="mt-12 border-t border-edge pt-6 text-center">
          <Link href={first} className={`${btn.primary} ${size.lg}`}>I&apos;m ready: start Day 1</Link>
        </div>
      </article>
    </>
  );
}
