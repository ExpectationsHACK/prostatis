import { ArrowRight, Award, BookA, CalendarClock, Check, CircleCheck, Compass, Flame, Lock, MessageCircle, PlayCircle, Sparkles, Trophy, Wrench } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LessonThumb } from "@/components/art/lesson-thumb";
import { milestones } from "@/content/lessons";
import { BadgeShelf } from "@/components/learn/badges";
import { btn, size } from "@/components/ui";
import { fastTrack, getPillar, getTrack } from "@/lib/curriculum";
import { dashboardContext } from "@/lib/dashboard";
import { slugOf } from "@/lib/learning/access";
import { badges, levelFor, streaks, trackProgress } from "@/lib/learning/engine";
import { getStore } from "@/lib/learning/store";
import { getPlan, hasAccess } from "@/lib/membership";
import { site } from "@/lib/site";

function Bar({ pct, tone = "bg-brand" }: { pct: number; tone?: string }) {
  return (
    <div className="h-2.5 border border-edge bg-paper" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full ${tone}`} style={{ width: `${Math.min(100, pct)}%` }} />
    </div>
  );
}

function Card({ title, icon: Icon, children, className = "" }: { title: string; icon: typeof Award; children: React.ReactNode; className?: string }) {
  return (
    <section className={"ink-block bg-card p-5 " + className}>
      <h2 className="label flex items-center gap-1.5 text-brand-text">
        <Icon className="size-3.5" aria-hidden /> {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ password?: string }> }) {
  const { user, sub } = await dashboardContext();
  if (!user) redirect("/login?next=/dashboard");
  if (!hasAccess(sub)) redirect("/dashboard/billing");
  const sp = await searchParams;

  const track = getTrack(sub!.plan);
  const slug = slugOf(track);
  const state = await getStore().load(user.id);
  const prog = trackProgress(track, state);
  const lvl = levelFor(state.xp);
  const st = streaks(state.days);
  const final = state.finals[track.id];
  const end = new Date(sub!.current_period_end);
  const daysLeft = Math.max(0, Math.ceil((end.getTime() - new Date().getTime()) / 86400_000));
  const accessDays = getPlan(sub!.plan)?.accessDays ?? 30;
  const first = user.name.split(" ")[0];
  const next = prog.next;
  const nextWeek = next?.week ?? track.weeks.at(-1)!.week;
  const week = track.weeks.find((w) => w.week === nextWeek)!;
  const weekDays = prog.days.filter((d) => d.module.week === nextWeek);
  const fastIncluded = track.id === "main_track";
  const fastProg = fastIncluded ? trackProgress(fastTrack, state) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
      {sp.password === "updated" && (
        <p className="mb-5 flex items-center gap-2 border border-edge bg-[#e3f5e9] px-4 py-2.5 font-mono text-[13px] text-ink" role="status">
          <CircleCheck className="size-4 text-success" aria-hidden /> Your password has been updated.
        </p>
      )}

      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label text-muted">{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "Africa/Lagos" })}</p>
          <h1 className="display mt-1 text-[32px] leading-tight text-ink sm:text-[40px]">Welcome back{first ? `, ${first}` : ""}</h1>
        </div>
        <p className="label border border-edge bg-card px-2.5 py-1.5 text-ink">
          {track.name} · {prog.completed}/{prog.total} lessons
        </p>
      </div>

      {/* Continue learning */}
      <section className="ink-block mt-6 grid gap-5 bg-card p-5 sm:p-6 md:grid-cols-[260px_1fr] md:items-center">
        {next ? (
          <>
            <div className="border border-edge bg-card">
              <LessonThumb thumb={next.thumb} index={next.day} />
            </div>
            <div className="min-w-0">
              <p className="label text-brand-text">
                {prog.completed ? "Up next" : "Start here"} · Day {next.day} of {prog.total} · {getPillar(next.pillar).title}
              </p>
              <h2 className="display mt-1.5 text-balance text-[26px] leading-tight text-ink sm:text-[32px]">{next.title}</h2>
              <p className="mt-2 line-clamp-2 font-mono text-[13px] leading-relaxed text-muted">{next.summary}</p>
              <div className="mt-4 max-w-md">
                <Bar pct={prog.pct} />
                <p className="mt-1.5 font-mono text-[12px] font-bold text-ink">{prog.pct}% of the {track.name} complete</p>
              </div>
              <Link href={`/learn/${slug}/${next.day}`} className={`${btn.primary} ${size.lg} mt-5`}>
                <PlayCircle className="size-5" aria-hidden /> {prog.completed ? "Continue Learning" : "Start Learning"}
              </Link>
            </div>
          </>
        ) : (
          <div className="md:col-span-2">
            <p className="label text-brand-text">All {prog.total} lessons complete</p>
            <h2 className="display mt-1.5 text-[30px] text-ink">{final?.passed_at ? "You're certified. Well done!" : "One step left: the final assessment"}</h2>
            <Link href={final?.passed_at ? `/learn/${slug}/certificate` : `/learn/${slug}/final`} className={`${btn.primary} ${size.lg} mt-5`}>
              <Award className="size-5" aria-hidden /> {final?.passed_at ? "View your certificate" : "Take the final assessment"}
            </Link>
          </div>
        )}
      </section>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="ink-block bg-card p-4">
          <p className="label flex items-center gap-1.5 text-muted"><Sparkles className="size-3.5 text-brand-text" aria-hidden /> Level {lvl.level}</p>
          <p className="display mt-1 text-[28px] text-ink">{state.xp.toLocaleString("en-NG")} XP</p>
          <div className="mt-2"><Bar pct={lvl.progress * 100} /></div>
          <p className="mt-1.5 font-mono text-[11.5px] text-muted">{lvl.name}{lvl.next ? ` · ${lvl.next - state.xp} XP to next` : ""}</p>
        </div>
        <div className="ink-block bg-card p-4">
          <p className="label flex items-center gap-1.5 text-muted"><Flame className="size-3.5 text-brand-text" aria-hidden /> Streak</p>
          <p className="display mt-1 text-[28px] text-ink">{st.current} {st.current === 1 ? "day" : "days"}</p>
          <p className="mt-2 font-mono text-[11.5px] leading-snug text-muted">{st.activeToday ? "Done for today. Come back tomorrow." : "Pass a quiz or finish a task today."} Best {st.longest}.</p>
        </div>
        <div className="ink-block bg-card p-4">
          <p className="label flex items-center gap-1.5 text-muted"><Trophy className="size-3.5 text-brand-text" aria-hidden /> Lessons</p>
          <p className="display mt-1 text-[28px] text-ink">{prog.completed}/{prog.total}</p>
          <div className="mt-2"><Bar pct={prog.pct} tone="bg-success" /></div>
          <p className="mt-1.5 font-mono text-[11.5px] text-muted">{prog.pct}% complete</p>
        </div>
        <div className="ink-block bg-card p-4">
          <p className="label flex items-center gap-1.5 text-muted"><CalendarClock className="size-3.5 text-brand-text" aria-hidden /> Access</p>
          <p className="display mt-1 text-[28px] text-ink">{daysLeft} days</p>
          <div className="mt-2"><Bar pct={(daysLeft / accessDays) * 100} tone={daysLeft <= 5 ? "bg-danger" : "bg-accent"} /></div>
          <p className="mt-1.5 font-mono text-[11.5px] text-muted">left · until {end.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main column: this week, then every week */}
        <div className="min-w-0 space-y-6">
          <section className="ink-block bg-card">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-edge px-5 py-3">
              <h2 className="display text-[20px] text-ink">
                <span className="label mr-2 bg-ink px-2 py-0.5 align-middle text-paper">Week {week.week}</span>
                {week.title}
              </h2>
              <Link href={`/learn/${slug}`} className="label text-brand-text hover:underline">Full course map</Link>
            </div>
            <ol className="divide-y divide-line">
              {weekDays.map(({ module: m, status }) => {
                const row = (
                  <div className="flex items-center gap-4 px-5 py-3.5">
                    <span className={"grid size-9 shrink-0 place-items-center border border-edge font-mono text-[13px] font-bold " + (status === "done" ? "bg-success text-paper" : status === "open" ? "bg-brand text-ink" : "bg-paper text-muted")}>
                      {status === "done" ? <Check className="size-4" strokeWidth={3} aria-hidden /> : status === "locked" ? <Lock className="size-3.5" aria-hidden /> : m.day}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={"truncate font-bold " + (status === "locked" ? "text-muted" : "text-ink")}>{m.title}</p>
                      <p className="truncate font-mono text-[12px] text-muted">Day {m.day} · {getPillar(m.pillar).title}</p>
                    </div>
                    <span className="label shrink-0 text-muted">{status === "done" ? "Done" : status === "open" ? "Open" : "Locked"}</span>
                  </div>
                );
                return <li key={m.day}>{status === "locked" ? row : <Link href={`/learn/${slug}/${m.day}`} className="block hover:bg-wash">{row}</Link>}</li>;
              })}
            </ol>
          </section>

          <section>
            <h2 className="display text-[22px] text-ink">All weeks</h2>
            <div className="mt-3 space-y-3">
              {track.weeks.map((w) => {
                const days = prog.days.filter((d) => d.module.week === w.week);
                const done = days.filter((d) => d.status === "done").length;
                return (
                  <details key={w.week} className="group border border-edge bg-card" open={w.week === nextWeek}>
                    <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
                      <span className="label bg-ink px-2 py-0.5 text-paper">Week {w.week}</span>
                      <span className="min-w-0 flex-1 truncate font-bold text-ink">{w.title}</span>
                      <span className="tabular font-mono text-[12px] text-muted">{done}/{days.length}</span>
                      <span className="font-mono text-ink transition-transform group-open:rotate-90" aria-hidden>›</span>
                    </summary>
                    <ul className="grid gap-2 border-t border-edge p-3 sm:grid-cols-2">
                      {days.map(({ module: m, status }) => (
                        <li key={m.day}>
                          {status === "locked" ? (
                            <span className="flex items-center gap-2 px-2 py-1.5 font-mono text-[12.5px] text-muted"><Lock className="size-3.5 shrink-0" aria-hidden /> Day {m.day}: {m.title}</span>
                          ) : (
                            <Link href={`/learn/${slug}/${m.day}`} className="flex items-center gap-2 px-2 py-1.5 font-mono text-[12.5px] text-ink hover:bg-wash">
                              {status === "done" ? <Check className="size-3.5 shrink-0 text-success" strokeWidth={3} aria-hidden /> : <PlayCircle className="size-3.5 shrink-0 text-brand-text" aria-hidden />} Day {m.day}: {m.title}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </details>
                );
              })}
            </div>
          </section>

          <BadgeShelf list={badges(track, state, milestones)} />
        </div>

        {/* Side column */}
        <aside className="space-y-4">
          <Card title="Certificate" icon={Award}>
            {final?.passed_at ? (
              <>
                <p className="font-bold text-ink">Earned. Share your proof.</p>
                <Link href={`/learn/${slug}/certificate`} className={`${btn.primary} ${size.sm} mt-3 w-full`}>View certificate</Link>
              </>
            ) : (
              <>
                <p className="text-[14px] leading-snug text-ink">Finish all {prog.total} lessons, then pass the final (75%) to earn your verified certificate.</p>
                <div className="mt-3"><Bar pct={prog.pct} tone="bg-success" /></div>
                <p className="mt-1.5 font-mono text-[11.5px] text-muted">{prog.total - prog.completed} lessons to go</p>
              </>
            )}
          </Card>

          {fastProg && (
            <Card title="Also included" icon={Compass}>
              <p className="font-bold text-ink">Fast Track</p>
              <div className="mt-2"><Bar pct={fastProg.pct} tone="bg-success" /></div>
              <p className="mt-1.5 font-mono text-[11.5px] text-muted">{fastProg.completed}/{fastProg.total} lessons · shared lessons count for both</p>
              <Link href="/learn/fast-track" className="label mt-3 inline-flex items-center gap-1 text-brand-text hover:underline">Open the Fast Track <ArrowRight className="size-3.5" aria-hidden /></Link>
            </Card>
          )}

          {site.whatsappInviteUrl && (
            <Card title="Community" icon={MessageCircle}>
              <p className="text-[14px] leading-snug text-ink">Share builds, get unstuck, hear about client leads.</p>
              <a href={site.whatsappInviteUrl} target="_blank" rel="noopener" className={`${btn.accent} ${size.sm} mt-3 w-full`}>Open WhatsApp group</a>
            </Card>
          )}

          <Card title="Your membership" icon={CalendarClock}>
            <p className="font-bold text-ink">{getPlan(sub!.plan)?.name}</p>
            <p className="font-mono text-[12.5px] text-muted">Access until {end.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
            <Link href="/dashboard/billing" className={`${btn.secondary} ${size.sm} mt-3`}>Billing</Link>
          </Card>

          <Card title="Quick links" icon={Wrench}>
            <ul className="space-y-1 font-mono text-[13px]">
              <li><Link href="/learn/start" className="flex items-center gap-2 py-1 text-ink hover:underline"><Compass className="size-4 text-muted" aria-hidden /> How the course works</Link></li>
              <li><Link href="/learn/glossary" className="flex items-center gap-2 py-1 text-ink hover:underline"><BookA className="size-4 text-muted" aria-hidden /> Glossary</Link></li>
              <li><Link href="/tools" className="flex items-center gap-2 py-1 text-ink hover:underline"><Wrench className="size-4 text-muted" aria-hidden /> Free tools</Link></li>
              <li><Link href="/blog" className="flex items-center gap-2 py-1 text-ink hover:underline"><BookA className="size-4 text-muted" aria-hidden /> Blog</Link></li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}
