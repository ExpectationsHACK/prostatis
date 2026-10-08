import { ArrowRight, Award, BookOpen, CalendarClock, Check, CircleCheck, Circle, Compass, Flame, History, ListTodo, Lock, MessageCircle, PlayCircle, Route, Sparkles, Wrench, Zap } from "lucide-react";
import Link from "next/link";
import { LessonThumb } from "@/components/art/lesson-thumb";
import { BadgeShelf } from "@/components/learn/badges";
import { btn, size } from "@/components/ui";
import { milestones } from "@/content/lessons";
import { fastTrack, getPillar, getTrack, mainTrack } from "@/lib/curriculum";
import { slugOf } from "@/lib/learning/access";
import { badges, lagosDay, levelFor, streaks, trackProgress, type LearnerState } from "@/lib/learning/engine";
import { activityGrid, greeting, recentActivity, timeAgo, todos, xpThisWeek, type XpEvent } from "@/lib/learning/insights";
import { getPlan, type Subscription } from "@/lib/membership";
import { site } from "@/lib/site";
import { Bar, Chip, Heatmap, SectionHead, Tag } from "./parts";

export const WEEKS = 13;

function SideCard({ title, icon: Icon, children }: { title: string; icon: typeof Award; children: React.ReactNode }) {
  return (
    <section className="ink-block bg-card p-5">
      <h2 className="label flex items-center gap-1.5 text-muted">
        <Icon className="size-3.5 text-brand-text" aria-hidden /> {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

const kindLabel: Record<string, string> = { final: "Final", lesson: "Lesson", perfect: "5/5", quiz: "Quiz", task: "Task" };

/** The dashboard home, drawn from saved progress only. Data loading lives in page.tsx. */
export function DashboardHome({ name, sub, state, events, now, passwordUpdated = false }: { name: string; sub: Subscription; state: LearnerState; events: XpEvent[]; now: Date; passwordUpdated?: boolean }) {
  const track = getTrack(sub.plan);
  const slug = slugOf(track);
  const today = lagosDay(now);
  const prog = trackProgress(track, state);
  const lvl = levelFor(state.xp);
  const st = streaks(state.days, today);
  const final = state.finals[track.id];
  const next = prog.next;
  const nextRow = next ? state.lessons[next.lesson] : undefined;
  const end = new Date(sub.current_period_end);
  const daysLeft = sub.permanent ? null : Math.max(0, Math.ceil((end.getTime() - now.getTime()) / 86_400_000));
  const accessDays = getPlan(sub.plan)?.accessDays ?? 30;
  const first = name.split(" ")[0];
  const fastProg = track.id === "main_track" ? trackProgress(fastTrack, state) : null;

  const grid = activityGrid(state.days, events, today, WEEKS);
  const weekXp = xpThisWeek(events, today);
  const todo = todos({ track, slug, state, next, allDone: prog.allDone, daysLeft, today });
  const titles = new Map([...fastTrack.modules, ...mainTrack.modules].map((m) => [m.lesson as string, m.title]));
  titles.set("fast_track", "Fast Track final").set("main_track", "Main Track final");
  const recent = recentActivity(events, (ref) => titles.get(ref) ?? ref);
  const curWeek = next?.week ?? track.weeks.at(-1)!.week;

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:py-8">
      {passwordUpdated && (
        <p className="mb-5 flex items-center gap-2 rounded-[12px] border border-edge bg-[#e3f5e9] px-4 py-2.5 text-[14px] text-ink" role="status">
          <CircleCheck className="size-4 text-success" aria-hidden /> Your password has been updated.
        </p>
      )}

      {/* Hero: who you are, where you are, and how consistent you've been */}
      <section className="ink-block grid gap-5 bg-night p-5 text-paper shadow-[4px_4px_0_var(--brand)]! sm:p-7 lg:grid-cols-[1fr_400px] lg:items-center lg:gap-8">
        <div className="min-w-0">
          <p className="label text-paper/65">{now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "Africa/Lagos" })}</p>
          <h1 className="display mt-2 text-[28px] leading-[1.05] text-paper sm:text-[44px]">
            {greeting(now)}
            {first ? `, ${first}` : ""}.
          </h1>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-paper/80 sm:text-[16.5px]">
            {prog.allDone
              ? final?.passed_at
                ? `You finished the ${track.name} and earned your certificate. Time to win clients.`
                : `Every lesson in the ${track.name} is done. One step left: the final assessment.`
              : prog.completed
                ? `${prog.completed} of ${prog.total} lessons done. Let's build something people pay for.`
                : `Your ${track.name} starts here. Let's build something people pay for.`}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            <Chip icon={Sparkles}>
              Level {lvl.level} · {lvl.name}
            </Chip>
            <Chip icon={Zap}>
              {state.xp.toLocaleString("en-NG")} XP{weekXp ? <span className="hidden text-muted sm:inline"> · +{weekXp.toLocaleString("en-NG")} this week</span> : null}
            </Chip>
            <Chip icon={BookOpen}>
              {prog.completed}/{prog.total} lessons
            </Chip>
          </ul>
        </div>

        <div className="rounded-[14px] border-2 border-edge bg-card p-4 text-ink">
          <div className="flex items-start justify-between gap-3">
            <p className="label text-muted">Last {WEEKS} weeks</p>
            <div className="text-right">
              <p className="flex items-center justify-end gap-1 text-[30px] font-bold leading-none tabular-nums">
                <Flame className={"size-6 " + (st.current ? "text-brand" : "text-faint")} aria-hidden /> {st.current}
              </p>
              <p className="label mt-1 text-muted">Day streak</p>
            </div>
          </div>
          <div className="mt-3">
            <Heatmap grid={grid} />
          </div>
          <p className="mt-2 border-t border-line pt-2 text-[12.5px] text-muted">
            {st.activeToday ? "Done for today. Come back tomorrow." : st.current ? "Pass a quiz or finish a task today to keep it going." : "Pass a quiz or finish a task to start a streak."}
            {st.longest > 1 && <> Best: {st.longest} days.</>}
          </p>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-6">
          {/* Up next: the one orange action on the page */}
          <section className="ink-block grid gap-5 bg-card p-5 sm:p-6 md:grid-cols-[230px_1fr] md:items-center">
            {next ? (
              <>
                {/* The cover is decoration: phones skip it and get to the button sooner. */}
                <div className="hidden overflow-hidden rounded-[10px] border border-edge md:block">
                  <LessonThumb thumb={next.thumb} index={next.day} />
                </div>
                <div className="min-w-0">
                  <p className="label text-brand-text">
                    {prog.completed ? "Up next" : "Start here"} · Day {next.day} · {getPillar(next.pillar).title}
                  </p>
                  <h2 className="display mt-1.5 text-balance text-[22px] leading-tight text-ink sm:text-[28px]">{next.title}</h2>
                  <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-muted">{next.summary}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-semibold">
                    <li className={nextRow?.quiz_passed_at ? "text-success" : "text-muted"}>
                      {nextRow?.quiz_passed_at ? <Check className="mr-1 inline size-4" strokeWidth={3} aria-hidden /> : <Circle className="mr-1 inline size-3.5" aria-hidden />}
                      Quiz {nextRow?.quiz_passed_at ? `passed (${nextRow.quiz_best}/${nextRow.quiz_total})` : "to pass"}
                    </li>
                    <li className={nextRow?.task_done_at ? "text-success" : "text-muted"}>
                      {nextRow?.task_done_at ? <Check className="mr-1 inline size-4" strokeWidth={3} aria-hidden /> : <Circle className="mr-1 inline size-3.5" aria-hidden />}
                      Task {nextRow?.task_done_at ? "done" : "to do"}
                    </li>
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <Link href={`/learn/${slug}/${next.day}`} className={`${btn.primary} ${size.lg}`}>
                      <PlayCircle className="size-5" aria-hidden /> {prog.completed || nextRow ? "Continue Learning" : "Start Learning"}
                    </Link>
                    <div className="min-w-[160px] flex-1">
                      <Bar pct={prog.pct} label={`${track.name} progress`} />
                      <p className="mt-1.5 text-[12.5px] font-semibold text-ink">{prog.pct}% of the {track.name}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="md:col-span-2">
                <p className="label text-brand-text">All {prog.total} lessons complete</p>
                <h2 className="display mt-1.5 text-[24px] text-ink sm:text-[30px]">{final?.passed_at ? "You're certified. Well done!" : "One step left: the final assessment"}</h2>
                <Link href={final?.passed_at ? `/learn/${slug}/certificate` : `/learn/${slug}/final`} className={`${btn.primary} ${size.lg} mt-5`}>
                  <Award className="size-5" aria-hidden /> {final?.passed_at ? "View your certificate" : "Take the final assessment"}
                </Link>
              </div>
            )}
          </section>

          {/* To do */}
          <section>
            <SectionHead title="To do" icon={ListTodo} count={todo.length} link={{ href: `/learn/${slug}`, label: "Course map" }} />
            <div className="ink-block mt-3 bg-card">
              {todo.length ? (
                <ul className="divide-y divide-line">
                  {todo.map((t) => (
                    <li key={t.id}>
                      <Link href={t.href} className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3.5 hover:bg-sunk sm:flex-nowrap sm:px-5">
                        <Circle className="size-[18px] shrink-0 text-ink" strokeWidth={2.2} aria-hidden />
                        <span className="min-w-0 flex-1 text-[14.5px] font-medium text-ink">{t.text}</span>
                        <span className="flex shrink-0 gap-1.5 pl-[30px] sm:pl-0">
                          {t.tags.map((tag) => (
                            <Tag key={tag.label} tag={tag} />
                          ))}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="flex items-center gap-2 px-5 py-4 text-[14.5px] text-muted">
                  <CircleCheck className="size-[18px] text-success" aria-hidden /> All caught up.
                </p>
              )}
            </div>
          </section>

          {/* Recent activity */}
          <section>
            <SectionHead title="Recent activity" icon={History} />
            {recent.length ? (
              <ul className="mt-5 grid gap-x-4 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
                {recent.map((a, i) => (
                  <li key={a.id} className={(i >= 3 ? "hidden sm:block " : "") + "relative rounded-[14px] border-2 border-edge bg-card px-4 pb-3.5 pt-5 shadow-[3px_3px_0_var(--edge)]"}>
                    <span className="absolute -top-3 right-3 flex gap-1">
                      {a.kinds.slice(0, 2).map((k) => (
                        <Tag key={k} tag={{ label: kindLabel[k] ?? k, tone: k === "lesson" || k === "final" ? "green" : "orange" }} />
                      ))}
                    </span>
                    <p className="line-clamp-2 text-[15px] font-bold leading-snug text-ink">{a.title}</p>
                    <p className="mt-1 text-[13px] text-muted">{a.what}</p>
                    <p className="mt-3 flex items-center justify-between border-t border-line pt-2 text-[12.5px]">
                      <span className="font-bold text-brand-text">+{a.xp} XP</span>
                      <span className="text-muted">{timeAgo(a.at, now)}</span>
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 rounded-[14px] border-2 border-dashed border-line bg-card/60 px-5 py-5 text-[14.5px] text-muted">
                Quizzes you pass and tasks you finish will show up here, with the XP you earned.
              </p>
            )}
          </section>

          {/* The course, week by week */}
          <section>
            <SectionHead title="Your course" icon={Route} link={{ href: `/learn/${slug}`, label: "Full course map" }} />
            <ol className="ink-block mt-3 divide-y divide-line bg-card">
              {track.weeks.map((w) => {
                const days = prog.days.filter((d) => d.module.week === w.week);
                const done = days.filter((d) => d.status === "done").length;
                const current = w.week === curWeek;
                return (
                  <li key={w.week}>
                    <div className={"flex items-center gap-3 px-4 py-3.5 sm:px-5 " + (current ? "bg-sunk" : "")}>
                      <span className={"grid size-9 shrink-0 place-items-center rounded-[10px] border-2 border-edge text-[13px] font-bold " + (done === days.length ? "bg-success text-paper" : current ? "bg-brand text-ink" : "bg-card text-ink")}>
                        {done === days.length ? <Check className="size-4" strokeWidth={3} aria-hidden /> : w.week}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 truncate text-[14.5px] font-bold text-ink">
                          <span className="truncate">Week {w.week}: {w.title}</span>
                          {current && <Tag tag={{ label: "This week", tone: "orange" }} />}
                        </p>
                        <div className="mt-1.5 flex items-center gap-3">
                          <div className="flex-1"><Bar pct={(done / days.length) * 100} tone="bg-success" label={`Week ${w.week} progress`} /></div>
                          <span className="text-[12.5px] font-semibold tabular-nums text-muted">{done}/{days.length}</span>
                        </div>
                      </div>
                    </div>
                    {current && (
                      <ul className="grid gap-1 px-3 pb-3 sm:grid-cols-2 sm:px-4">
                        {days.map(({ module: m, status }) => (
                          <li key={m.day}>
                            {status === "locked" ? (
                              <span className="flex items-center gap-2 rounded-[8px] px-2 py-2 text-[13.5px] text-muted">
                                <Lock className="size-3.5 shrink-0" aria-hidden /> <span className="truncate">Day {m.day}: {m.title}</span>
                              </span>
                            ) : (
                              <Link href={`/learn/${slug}/${m.day}`} className="flex items-center gap-2 rounded-[8px] px-2 py-2 text-[13.5px] text-ink hover:bg-wash">
                                {status === "done" ? <Check className="size-4 shrink-0 text-success" strokeWidth={3} aria-hidden /> : <PlayCircle className="size-4 shrink-0 text-brand-text" aria-hidden />}
                                <span className="truncate">Day {m.day}: {m.title}</span>
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>

          <BadgeShelf list={badges(track, state, milestones)} />
        </div>

        {/* Side column */}
        <aside className="space-y-4">
          <SideCard title={`Level ${lvl.level}`} icon={Sparkles}>
            <p className="text-[20px] font-bold leading-tight text-ink">{lvl.name}</p>
            <div className="mt-3"><Bar pct={lvl.progress * 100} label="Progress to the next level" /></div>
            <p className="mt-1.5 text-[12.5px] text-muted">{lvl.next ? `${(lvl.next - state.xp).toLocaleString("en-NG")} XP to level ${lvl.level + 1}` : "Top level reached"}</p>
          </SideCard>

          <SideCard title="Certificate" icon={Award}>
            {final?.passed_at ? (
              <>
                <p className="font-bold text-ink">Earned. Share your proof.</p>
                <Link href={`/learn/${slug}/certificate`} className={`${btn.secondary} ${size.sm} mt-3 w-full`}>View certificate</Link>
              </>
            ) : (
              <>
                <p className="text-[14px] leading-snug text-ink">Finish all {prog.total} lessons, then pass the final (75%) for your verified certificate.</p>
                <div className="mt-3"><Bar pct={prog.pct} tone="bg-success" label="Lessons towards the certificate" /></div>
                <p className="mt-1.5 text-[12.5px] text-muted">{prog.total - prog.completed} lessons to go</p>
              </>
            )}
          </SideCard>

          {fastProg && (
            <SideCard title="Also included" icon={Compass}>
              <p className="font-bold text-ink">Fast Track</p>
              <div className="mt-2"><Bar pct={fastProg.pct} tone="bg-success" label="Fast Track progress" /></div>
              <p className="mt-1.5 text-[12.5px] text-muted">{fastProg.completed}/{fastProg.total} lessons · shared lessons count for both</p>
              <Link href="/learn/fast-track" className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-text hover:underline">Open the Fast Track <ArrowRight className="size-3.5" aria-hidden /></Link>
            </SideCard>
          )}

          <SideCard title="Access" icon={CalendarClock}>
            <p className="font-bold text-ink">{getPlan(sub.plan)?.name}</p>
            {daysLeft === null ? (
              <p className="text-[13px] text-muted">Permanent: access never ends on this account</p>
            ) : (
              <>
                <div className="mt-2"><Bar pct={(daysLeft / accessDays) * 100} tone={daysLeft <= 5 ? "bg-danger" : "bg-ink"} label="Access left" /></div>
                <p className="mt-1.5 text-[12.5px] text-muted">{daysLeft} {daysLeft === 1 ? "day" : "days"} left · until {end.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Lagos" })}</p>
              </>
            )}
            <Link href="/dashboard/billing" className={`${btn.secondary} ${size.sm} mt-3`}>Billing</Link>
          </SideCard>

          {site.whatsappInviteUrl && (
            <SideCard title="Community" icon={MessageCircle}>
              <p className="text-[14px] leading-snug text-ink">Share builds, get unstuck, hear about client leads.</p>
              <a href={site.whatsappInviteUrl} target="_blank" rel="noopener" className={`${btn.accent} ${size.sm} mt-3 w-full`}>Open WhatsApp group</a>
            </SideCard>
          )}

          <SideCard title="Quick links" icon={Wrench}>
            <ul className="space-y-0.5 text-[14px]">
              <li><Link href="/learn/start" className="flex items-center gap-2 rounded-[8px] px-1 py-1.5 text-ink hover:bg-sunk"><Compass className="size-4 text-muted" aria-hidden /> How the course works</Link></li>
              <li><Link href="/learn/glossary" className="flex items-center gap-2 rounded-[8px] px-1 py-1.5 text-ink hover:bg-sunk"><BookOpen className="size-4 text-muted" aria-hidden /> Glossary</Link></li>
              <li><Link href="/tools" className="flex items-center gap-2 rounded-[8px] px-1 py-1.5 text-ink hover:bg-sunk"><Wrench className="size-4 text-muted" aria-hidden /> Free tools</Link></li>
            </ul>
          </SideCard>
        </aside>
      </div>
    </div>
  );
}
