import { Check, Lock, MessageCircle, PlayCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LessonThumb } from "@/components/art/lesson-thumb";
import { LearnerStats } from "@/components/learn/stats";
import { btn, byline, size } from "@/components/ui";
import { getPillar, getTrack } from "@/lib/curriculum";
import { slugOf } from "@/lib/learning/access";
import { trackProgress } from "@/lib/learning/engine";
import { getStore } from "@/lib/learning/store";
import { getMySubscription, getPlan, hasAccess } from "@/lib/membership";
import { site } from "@/lib/site";
import { getCurrentUser } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");
  const sub = await getMySubscription();
  if (!hasAccess(sub)) redirect("/dashboard/billing");

  const track = getTrack(sub!.plan);
  const slug = slugOf(track);
  const state = await getStore().load(user.id);
  const prog = trackProgress(track, state);
  const renews = new Date(sub!.current_period_end).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="mx-auto flex max-w-[1060px] gap-10 px-4 py-6 sm:px-6 lg:py-8">
      {/* Feed */}
      <div className="min-w-0 max-w-[640px] flex-1">
        <h1 className="text-xl font-bold text-ink">Home</h1>
        <p className="mt-6 font-display text-[26px] font-semibold leading-tight text-ink">
          Welcome{user.name ? `, ${user.name}` : ""}
        </p>
        <p className="mt-1 text-[15px] text-muted">Your {track.name} · {track.length}. Each lesson opens when you finish the one before it.</p>
        {prog.next && (
          <Link href={`/learn/${slug}/${prog.next.day}`} className={`${btn.primary} ${size.md} mt-5`}>
            <PlayCircle className="size-4" aria-hidden /> {prog.completed ? "Continue" : "Start"}: Day {prog.next.day} — {prog.next.title}
          </Link>
        )}
        <div className="mt-6">
          <LearnerStats state={state} done={prog.completed} total={prog.total} />
        </div>

        {track.weeks.map((w) => (
          <section key={w.week} className="mt-8">
            <h2 className="flex items-baseline gap-3 border-b-2 border-edge pb-2">
              <span className="label bg-ink px-2 py-0.5 text-paper">Week {w.week}</span>
              <span className="display text-[20px] text-ink">{w.title}</span>
            </h2>
            <ol className="mt-4 space-y-3">
              {prog.days
                .filter((d) => d.module.week === w.week)
                .map(({ module: m, status }, i) => {
                  const body = (
                    <>
                      <div className="relative w-full shrink-0 border-2 border-edge sm:w-44">
                        <LessonThumb thumb={m.thumb} index={m.day + i} />
                        {status === "locked" && <span className="absolute inset-0 grid place-items-center bg-paper/70"><Lock className="size-5 text-ink" aria-hidden /></span>}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="label text-brand-text">
                          Day {m.day} · {getPillar(m.pillar).title}
                        </p>
                        <h3 className="display mt-1 text-[17px] text-ink">{m.title}</h3>
                        <p className="mt-1 line-clamp-2 font-mono text-[12px] text-muted">{m.summary}</p>
                        <p className="label mt-2 inline-flex items-center gap-1 text-muted">
                          {status === "done" ? <><Check className="size-3 text-success" strokeWidth={3} aria-hidden /> Complete</> : status === "open" ? "Open now" : "Locked"}
                        </p>
                      </div>
                    </>
                  );
                  return (
                    <li key={m.day}>
                      {status === "locked" ? (
                        <div className="flex flex-col gap-4 border-2 border-line bg-card/60 p-3 sm:flex-row">{body}</div>
                      ) : (
                        <Link href={`/learn/${slug}/${m.day}`} className="ink-block block-press flex flex-col gap-4 bg-card p-3 sm:flex-row">{body}</Link>
                      )}
                    </li>
                  );
                })}
            </ol>
          </section>
        ))}
      </div>

      {/* Right rail */}
      <aside className="hidden w-[300px] shrink-0 space-y-4 xl:block">
        <div className="rounded-xl border border-line p-5">
          <p className={byline}>Your membership</p>
          <p className="mt-2 font-display text-lg font-semibold text-ink">{getPlan(sub!.plan)?.name} plan</p>
          <p className="mt-0.5 text-[14px] text-muted">
            {sub!.status === "non_renewing" ? "Ends" : "Renews"} {renews}
          </p>
          <Link href="/dashboard/billing" className={`${btn.secondary} ${size.sm} mt-4`}>
            Manage billing
          </Link>
        </div>
        {site.whatsappInviteUrl && (
          <div className="rounded-xl border border-line p-5">
            <p className="flex items-center gap-2 font-semibold text-ink">
              <MessageCircle className="size-[18px] text-muted" aria-hidden /> Community
            </p>
            <p className="mt-1 text-[14px] text-muted">Share builds, get unstuck, hear about client leads.</p>
            <a href={site.whatsappInviteUrl} target="_blank" rel="noopener" className={`${btn.primary} ${size.md} mt-4 w-full`}>
              Open WhatsApp group
            </a>
          </div>
        )}
      </aside>
    </div>
  );
}
