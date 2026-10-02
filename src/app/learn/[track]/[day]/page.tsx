import { ArrowLeft, ArrowRight, BookA, BookOpen, CheckCircle2, Clock, ExternalLink, KeyRound, Lock, Package, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonBody, Rich, slugTerm } from "@/components/learn/lesson-body";
import { ReadingProgress } from "@/components/learn/reading-progress";
import { Quiz } from "@/components/learn/quiz";
import { PreviewBanner } from "@/components/learn/stats";
import { TaskCheck } from "@/components/learn/task-card";
import { btn, size } from "@/components/ui";
import { getLesson } from "@/content/lessons";
import { getPillar } from "@/lib/curriculum";
import { learnerTrack, requireLearner } from "@/lib/learning/access";
import { PASS_MARK, publicQuestions, trackProgress, XP } from "@/lib/learning/engine";
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

  const terms = lesson.sections.flatMap((sec) => sec.blocks).flatMap((b) => (b.t === "define" ? [b.term] : []));
  const maxXp = XP.lesson + XP.task + lesson.quiz.length * XP.perCorrect + XP.perfect;

  return (
    <>
      {learner.preview && <PreviewBanner />}
      <ReadingProgress day={day} total={track.modules.length} title={lesson.title} doneLessons={prog.completed} steps={[steps[0], steps[1], steps[2]]} />
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
            <span className="label inline-flex items-center gap-1.5 border border-edge bg-card px-2 py-1 text-ink"><Clock className="size-3.5" aria-hidden /> {lesson.minutes} min</span>
            <span className="label inline-flex items-center gap-1.5 border border-edge bg-[#f2c230] px-2 py-1 text-ink"><Sparkles className="size-3.5" aria-hidden /> Up to {maxXp} XP</span>
            {done && <span className="label inline-flex items-center gap-1.5 border border-edge bg-[#e3f5e9] px-2 py-1 text-success"><CheckCircle2 className="size-3.5" aria-hidden /> Complete</span>}
          </div>
        </header>

        <div className="ink-block mt-6 bg-brand p-5">
          <p className="label flex items-center gap-1.5 text-ink"><Target className="size-3.5" aria-hidden /> By the end of today you&apos;ll have</p>
          <p className="mt-1.5 text-[17px] font-bold leading-snug text-ink">{lesson.outcome}</p>
        </div>

        <ol className="mt-5 grid grid-cols-3 border border-edge bg-card" aria-label="Lesson checklist">
          {steps.map((s, i) => (
            <li key={s.label} className={"flex items-center gap-2 px-3 py-2.5 font-mono text-[12px] font-bold text-ink " + (i < 2 ? "border-r border-edge" : "")}>
              <span className={"grid size-5 shrink-0 place-items-center border border-edge " + (s.ok ? "bg-success text-paper" : "bg-paper")}>{s.ok ? "✓" : i + 1}</span>
              <span className="leading-tight">{s.label}</span>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-[17px] leading-[1.75] text-ink/90"><Rich text={lesson.intro} /></p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="border border-edge bg-card p-4">
            <p className="label flex items-center gap-1.5 text-ink"><Package className="size-3.5" aria-hidden /> You&apos;ll need</p>
            <ul className="mt-2 space-y-1.5">
              {lesson.youNeed.map((n) => (
                <li key={n} className="flex gap-2 text-[14.5px] leading-snug text-ink"><span className="mt-2 size-1.5 shrink-0 bg-brand" aria-hidden /><span><Rich text={n} /></span></li>
              ))}
            </ul>
          </div>
          {terms.length > 0 && (
            <div className="border border-edge bg-card p-4">
              <p className="label flex items-center gap-1.5 text-ink"><BookA className="size-3.5" aria-hidden /> New words today</p>
              <p className="mt-1 font-mono text-[12px] text-muted">Each one is explained in plain English when it comes up. Tap to jump.</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {terms.map((t) => (
                  <a key={t} href={`#term-${slugTerm(t)}`} className="border border-edge bg-accent px-2 py-0.5 font-mono text-[12px] font-bold text-accent-ink hover:bg-ink">{t}</a>
                ))}
              </div>
              <Link href="/learn/glossary" className="label mt-3 inline-block text-brand-text underline">Full glossary →</Link>
            </div>
          )}
        </div>

        <nav className="mt-8 border border-edge bg-card p-4" aria-label="In this lesson">
          <p className="label flex items-center gap-1.5 text-ink"><BookOpen className="size-3.5" aria-hidden /> In this lesson</p>
          <ol className="mt-2 space-y-1 font-mono text-[13px]">
            {lesson.sections.map((s, i) => (
              <li key={s.heading}><a href={`#s${i + 1}`} className="text-ink hover:text-brand-text hover:underline">{i + 1}. {s.heading}</a></li>
            ))}
            <li><a href="#task" className="text-ink hover:text-brand-text hover:underline">{lesson.sections.length + 1}. Your mission</a></li>
            <li><a href="#resources" className="text-ink hover:text-brand-text hover:underline">{lesson.sections.length + 2}. Go deeper</a></li>
            <li><a href="#takeaways" className="text-ink hover:text-brand-text hover:underline">{lesson.sections.length + 3}. Key takeaways</a></li>
            <li><a href="#assessment" className="text-ink hover:text-brand-text hover:underline">{lesson.sections.length + 4}. Assessment</a></li>
          </ol>
        </nav>

        <div className="mt-10">
          <LessonBody lesson={lesson} track={track} />
        </div>

        <section id="task" className="ink-block mt-12 scroll-mt-24 bg-card p-5 sm:p-7">
          <p className="label flex items-center justify-between gap-2 text-brand-text"><span>Your mission · do it for real</span><span className="bg-[#f2c230] px-1.5 py-0.5 text-ink">+{XP.task} XP</span></p>
          <h2 className="display mt-1 text-[26px] text-ink">{lesson.task.title}</h2>
          <ol className="mt-4 space-y-2">
            {lesson.task.steps.map((s, i) => (
              <li key={s} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                <span className="display w-5 shrink-0 text-brand-text">{i + 1}</span>
                <span><Rich text={s} /></span>
              </li>
            ))}
          </ol>
          <div className="mt-6 border-t border-dashed border-line pt-5">
            <TaskCheck slug={slug} day={day} done={lesson.task.done} confirmed={Boolean(row?.task_done_at)} celebrate={lesson.celebrate} />
          </div>
        </section>

        <section id="resources" className="mt-12 scroll-mt-24">
          <h2 className="display text-[26px] text-ink">Go deeper</h2>
          <p className="mt-1 font-mono text-[13px] text-muted">Everything you need is on this page. These trusted free resources are here if you want more.</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {lesson.resources.map((r) => (
              <li key={r.url}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex h-full gap-3 border border-edge bg-card p-3 hover:bg-wash">
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

        <section id="takeaways" className="ink-block mt-12 scroll-mt-24 bg-[#fff4d6] p-5 sm:p-7">
          <p className="label flex items-center gap-1.5 text-ink"><KeyRound className="size-3.5" aria-hidden /> Key takeaways</p>
          <div className="mt-3 border border-edge bg-card p-3">
            <p className="label text-brand-text">The one idea to remember</p>
            <p className="mt-1 text-[16px] font-bold leading-snug text-ink"><Rich text={lesson.core} /></p>
          </div>
          <p className="mt-3 font-mono text-[12.5px] text-muted">Everything the assessment asks is covered here. Read it once more before you start.</p>
          <ol className="mt-4 space-y-2.5">
            {lesson.recap.map((r, i) => (
              <li key={i} className="flex gap-3 text-[15.5px] leading-relaxed text-ink">
                <span className="display grid size-6 shrink-0 place-items-center border border-edge bg-card text-[13px]">{i + 1}</span>
                <span><Rich text={r} /></span>
              </li>
            ))}
          </ol>
        </section>

        <section id="assessment" className="mt-12 scroll-mt-24 border-t border-edge pt-8">
          <p className="label text-brand-text">Assessment</p>
          <h2 className="display mt-1 text-[30px] text-ink">Check what you learned</h2>
          <div className="mt-4">
            <Quiz slug={slug} day={day} questions={publicQuestions(lesson.quiz)} passMark={PASS_MARK} passed={Boolean(row?.quiz_passed_at)} best={row?.quiz_best ?? 0} celebrate={lesson.celebrate} />
          </div>
        </section>

        <nav className="mt-14 flex items-center justify-between gap-3 border-t border-edge pt-6" aria-label="Lesson navigation">
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
