import { ArrowRight, Award, Check, Lock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonThumb } from "@/components/art/lesson-thumb";
import { BadgeShelf } from "@/components/learn/badges";
import { LearnerStats, PreviewBanner } from "@/components/learn/stats";
import { btn, size } from "@/components/ui";
import { getLesson } from "@/content/lessons";
import { getPillar } from "@/lib/curriculum";
import { learnerTrack, requireLearner, slugOf, trackSlugs } from "@/lib/learning/access";
import { badges, trackProgress, XP } from "@/lib/learning/engine";
import { getStore } from "@/lib/learning/store";

export default async function TrackHome({ params }: { params: Promise<{ track: string }> }) {
  const { track: slug } = await params;
  const learner = await requireLearner(`/learn/${slug}`);
  const track = learnerTrack(learner, slug);
  if (!track) notFound();
  const state = await getStore().load(learner.id);
  const prog = trackProgress(track, state, { unlockAll: learner.preview });
  const final = state.finals[track.id];
  const others = Object.values(trackSlugs).filter((t) => t.id !== track.id && learner.tracks.includes(t.id));

  return (
    <>
      {learner.preview && <PreviewBanner />}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-brand-text">{track.length} · {track.modules.length} lessons</p>
            <h1 className="display mt-2 text-[40px] text-ink sm:text-[56px]">{track.name}</h1>
            <p className="mt-2 max-w-xl font-mono text-[14px] leading-relaxed text-muted">
              {learner.name && !learner.preview ? `Welcome back, ${learner.name}. ` : ""}Each lesson opens when you finish the one before it: pass its quiz (70%+) and confirm its practical task.
            </p>
          </div>
          {prog.next ? (
            <Link href={`/learn/${slug}/${prog.next.day}`} className={`${btn.primary} ${size.lg}`}>
              <PlayCircle className="size-5" aria-hidden /> {prog.completed ? `Continue: Day ${prog.next.day}` : "Start Learning"}
            </Link>
          ) : (
            <Link href={`/learn/${slug}/final`} className={`${btn.primary} ${size.lg}`}>
              <Award className="size-5" aria-hidden /> {final?.passed_at ? "View certificate" : "Take the final assessment"}
            </Link>
          )}
        </div>

        {prog.completed === 0 && (
          <Link href="/learn/start" className="ink-block block-press mt-8 flex items-center justify-between gap-4 bg-accent p-4 text-accent-ink">
            <span>
              <span className="label block text-brand">New here? Read this first · 10 min</span>
              <span className="display mt-1 block text-[20px]">Start here: how the course works, what you&apos;ll need, and how to pay for AI tools from Nigeria</span>
            </span>
            <ArrowRight className="size-5 shrink-0" aria-hidden />
          </Link>
        )}

        <div className="mt-8">
          <LearnerStats state={state} done={prog.completed} total={prog.total} />
        </div>

        <BadgeShelf list={badges(track, state)} />

        {track.weeks.map((w) => (
          <section key={w.week} className="mt-12">
            <h2 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-edge pb-2">
              <span className="label bg-ink px-2 py-0.5 text-paper">Week {w.week}</span>
              <span className="display text-[24px] text-ink">{w.title}</span>
            </h2>
            <ol className="mt-5 grid gap-4 md:grid-cols-2">
              {prog.days
                .filter((d) => d.module.week === w.week)
                .map(({ module: m, status }, i) => {
                  const row = state.lessons[m.lesson];
                  const lesson = getLesson(m.lesson);
                  const inner = (
                    <>
                      <div className="relative w-32 shrink-0 border border-edge sm:w-40">
                        <LessonThumb thumb={m.thumb} index={m.day + i} />
                        {status === "locked" && (
                          <span className="absolute inset-0 grid place-items-center bg-paper/70"><Lock className="size-6 text-ink" aria-hidden /></span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="label text-brand-text">Day {m.day} · {getPillar(m.pillar).short}</p>
                        <h3 className="display mt-1 text-[17px] leading-tight text-ink">{m.title}</h3>
                        <p className="mt-1 font-mono text-[12px] text-muted">{lesson?.minutes ?? 60} min</p>
                        <p className="mt-2">
                          {status === "done" ? (
                            <span className="label inline-flex items-center gap-1 bg-[#e3f5e9] px-1.5 py-0.5 text-success"><Check className="size-3" strokeWidth={3} aria-hidden /> Done · quiz {row?.quiz_best}/{row?.quiz_total}</span>
                          ) : status === "open" ? (
                            <span className="label inline-flex items-center gap-1 bg-brand px-1.5 py-0.5 text-ink">
                              {row?.quiz_passed_at ? "Quiz passed · task left" : row?.task_done_at ? "Task done · quiz left" : m.day === prog.next?.day ? "Up next" : "Open"}
                            </span>
                          ) : (
                            <span className="label text-muted">Locked</span>
                          )}
                        </p>
                      </div>
                    </>
                  );
                  return (
                    <li key={m.day}>
                      {status === "locked" ? (
                        <div className="flex gap-4 border border-line bg-card/60 p-3 opacity-80" aria-label={`Day ${m.day}: locked`}>{inner}</div>
                      ) : (
                        <Link href={`/learn/${slug}/${m.day}`} className="ink-block block-press flex gap-4 bg-card p-3">{inner}</Link>
                      )}
                    </li>
                  );
                })}
            </ol>
          </section>
        ))}

        <section className={"mt-12 border border-edge p-6 sm:p-8 " + (prog.allDone ? "ink-block bg-brand" : "bg-card")}>
          <p className="label text-ink">Final assessment</p>
          <h2 className="display mt-2 text-[28px] text-ink">{final?.passed_at ? "Passed: your certificate is ready" : "One question from every lesson"}</h2>
          <p className="mt-2 max-w-2xl font-mono text-[13px] leading-relaxed text-ink/80">
            {track.modules.length} questions, pass mark 75%. Pass to earn {XP.final} XP and your certificate of completion.
            {!prog.allDone && ` Unlocks after all ${track.modules.length} lessons are complete (${prog.completed} so far).`}
          </p>
          {prog.allDone && (
            <Link href={final?.passed_at ? `/learn/${slug}/certificate` : `/learn/${slug}/final`} className={`${btn.secondary} ${size.md} mt-5`}>
              {final?.passed_at ? "View certificate" : "Start the final assessment"} <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}
        </section>

        {others.map((t) => (
          <p key={t.id} className="mt-8 text-center font-mono text-[13px] text-muted">
            You also have the{" "}
            <Link href={`/learn/${slugOf(t)}`} className="font-bold text-ink underline decoration-brand decoration-2 underline-offset-4">
              {t.name}
            </Link>
            . Shared lessons count in both.
          </p>
        ))}
      </div>
    </>
  );
}
