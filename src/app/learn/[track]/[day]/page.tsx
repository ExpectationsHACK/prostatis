import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock, ExternalLink, Lock, Target } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonBody, Rich } from "@/components/learn/lesson-body";
import { Quiz } from "@/components/learn/quiz";
import { PreviewBanner } from "@/components/learn/stats";
import { TaskCheck } from "@/components/learn/task-card";
import { btn, size } from "@/components/ui";
import { getLesson } from "@/content/lessons";
import { getPillar } from "@/lib/curriculum";
import { learnerTrack, requireLearner } from "@/lib/learning/access";
import { PASS_MARK, publicQuestions, trackProgress } from "@/lib/learning/engine";
import { getStore } from "@/lib/learning/store";

export default async function LessonPage({ params }: { params: Promise<{ track: string; day: string }> }) {
  const { track: slug, day: dayParam } = await params;
  const learner = await requireLearner(`/learn/${slug}/${dayParam}`);
  const track = learnerTrack(learner, slug);
  const day = Number(dayParam);
  const mod = track?.modules.find((m) => m.day === day);
  const lesson = mod && getLesson(mod.lesson);
  if (!track || !mod || !lesson) notFound();

  const state = await getStore().load(learner.id);
  const prog = trackProgress(track, state, { unlockAll: learner.preview });
  const status = prog.days.find((d) => d.module.day === day)!.status;
  const prev = track.modules.find((m) => m.day === day - 1);
  const next = track.modules.find((m) => m.day === day + 1);
  const row = state.lessons[lesson.id];

  if (status === "locked") {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <Lock className="mx-auto size-10 text-ink" aria-hidden />
        <h1 className="display mt-4 text-[32px] text-ink">Day {day} is locked</h1>
        <p className="mt-2 font-mono text-[14px] text-muted">Lessons open in order so each one builds on the last. Finish Day {prog.next?.day} first.</p>
        {prog.next && (
          <Link href={`/learn/${slug}/${prog.next.day}`} className={`${btn.primary} ${size.lg} mt-6`}>
            Go to Day {prog.next.day}
          </Link>
        )}
      </div>
    );
  }

  const done = Boolean(row?.completed_at);
  const steps = [
    { label: "Read the lesson", ok: true },
    { label: "Do the task", ok: Boolean(row?.task_done_at) },
    { label: "Pass the quiz", ok: Boolean(row?.quiz_passed_at) },
  ];

  return (
    <>
      {learner.preview && <PreviewBanner />}
      <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <Link href={`/learn/${slug}`} className="label inline-flex items-center gap-1.5 text-muted hover:text-ink">
          <ArrowLeft className="size-3.5" aria-hidden /> {track.name}
        </Link>

        <header className="mt-5">
          <p className="label text-brand-text">
            Day {day} of {track.modules.length} · {getPillar(mod.pillar).title}
          </p>
          <h1 className="display mt-2 text-balance text-[36px] leading-[1.05] text-ink sm:text-[48px]">{lesson.title}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="label inline-flex items-center gap-1.5 border-2 border-edge bg-card px-2 py-1 text-ink"><Clock className="size-3.5" aria-hidden /> {lesson.minutes} min</span>
            {done && <span className="label inline-flex items-center gap-1.5 border-2 border-edge bg-[#e3f5e9] px-2 py-1 text-success"><CheckCircle2 className="size-3.5" aria-hidden /> Complete</span>}
          </div>
        </header>

        <div className="ink-block mt-6 bg-brand p-5">
          <p className="label flex items-center gap-1.5 text-ink"><Target className="size-3.5" aria-hidden /> By the end of today you&apos;ll have</p>
          <p className="mt-1.5 text-[17px] font-bold leading-snug text-ink">{lesson.outcome}</p>
        </div>

        <ol className="mt-5 grid grid-cols-3 border-2 border-edge bg-card" aria-label="Lesson checklist">
          {steps.map((s, i) => (
            <li key={s.label} className={"flex items-center gap-2 px-3 py-2.5 font-mono text-[12px] font-bold text-ink " + (i < 2 ? "border-r-2 border-edge" : "")}>
              <span className={"grid size-5 shrink-0 place-items-center border-2 border-edge " + (s.ok ? "bg-success text-paper" : "bg-paper")}>{s.ok ? "✓" : i + 1}</span>
              <span className="leading-tight">{s.label}</span>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-[17px] leading-[1.75] text-ink/90"><Rich text={lesson.intro} /></p>

        <nav className="mt-8 border-2 border-edge bg-card p-4" aria-label="In this lesson">
          <p className="label flex items-center gap-1.5 text-ink"><BookOpen className="size-3.5" aria-hidden /> In this lesson</p>
          <ol className="mt-2 space-y-1 font-mono text-[13px]">
            {lesson.sections.map((s, i) => (
              <li key={s.heading}><a href={`#s${i + 1}`} className="text-ink hover:text-brand-text hover:underline">{i + 1}. {s.heading}</a></li>
            ))}
            <li><a href="#task" className="text-ink hover:text-brand-text hover:underline">{lesson.sections.length + 1}. Your task</a></li>
            <li><a href="#resources" className="text-ink hover:text-brand-text hover:underline">{lesson.sections.length + 2}. Go deeper</a></li>
            <li><a href="#assessment" className="text-ink hover:text-brand-text hover:underline">{lesson.sections.length + 3}. Assessment</a></li>
          </ol>
        </nav>

        <div className="mt-10">
          <LessonBody lesson={lesson} />
        </div>

        <section id="task" className="ink-block mt-12 scroll-mt-24 bg-card p-5 sm:p-7">
          <p className="label text-brand-text">Your task</p>
          <h2 className="display mt-1 text-[26px] text-ink">{lesson.task.title}</h2>
          <ol className="mt-4 space-y-2">
            {lesson.task.steps.map((s, i) => (
              <li key={s} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                <span className="display w-5 shrink-0 text-brand-text">{i + 1}</span>
                <span><Rich text={s} /></span>
              </li>
            ))}
          </ol>
          <div className="mt-6 border-t-2 border-dashed border-line pt-5">
            <TaskCheck slug={slug} day={day} done={lesson.task.done} confirmed={Boolean(row?.task_done_at)} />
          </div>
        </section>

        <section id="resources" className="mt-12 scroll-mt-24">
          <h2 className="display text-[26px] text-ink">Go deeper</h2>
          <p className="mt-1 font-mono text-[13px] text-muted">Everything you need is on this page. These trusted free resources are here if you want more.</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {lesson.resources.map((r) => (
              <li key={r.url}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex h-full gap-3 border-2 border-edge bg-card p-3 hover:bg-wash">
                  <ExternalLink className="mt-0.5 size-4 shrink-0 text-brand-text" aria-hidden />
                  <span>
                    <span className="block font-bold leading-snug text-ink">{r.label}</span>
                    <span className="mt-0.5 block font-mono text-[12px] leading-snug text-muted">{r.note}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="assessment" className="mt-12 scroll-mt-24 border-t-2 border-edge pt-8">
          <p className="label text-brand-text">Assessment</p>
          <h2 className="display mt-1 text-[30px] text-ink">Check what you learned</h2>
          <div className="mt-4">
            <Quiz slug={slug} day={day} questions={publicQuestions(lesson.quiz)} passMark={PASS_MARK} passed={Boolean(row?.quiz_passed_at)} best={row?.quiz_best ?? 0} />
          </div>
        </section>

        <nav className="mt-14 flex items-center justify-between gap-3 border-t-2 border-edge pt-6" aria-label="Lesson navigation">
          {prev ? (
            <Link href={`/learn/${slug}/${prev.day}`} className={`${btn.secondary} ${size.md}`}>
              <ArrowLeft className="size-4" aria-hidden /> Day {prev.day}
            </Link>
          ) : <span />}
          {next ? (
            done || learner.preview ? (
              <Link href={`/learn/${slug}/${next.day}`} className={`${btn.primary} ${size.md}`}>
                Day {next.day} <ArrowRight className="size-4" aria-hidden />
              </Link>
            ) : (
              <span className="label inline-flex items-center gap-1.5 text-muted"><Lock className="size-3.5" aria-hidden /> Day {next.day} opens when this one is complete</span>
            )
          ) : (
            <Link href={`/learn/${slug}/final`} className={`${btn.primary} ${size.md}`}>
              Final assessment <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}
        </nav>
      </article>
    </>
  );
}
