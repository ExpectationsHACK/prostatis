import { Award, BadgeCheck, BookOpen, Eye, FileText, GraduationCap, Inbox, Radio, Rocket, UserCheck, Users, Wallet } from "lucide-react";
import Link from "next/link";
import { Avatar, BarList, DailyChart, deltaOf, fmtDate, ngn, PageHead, Panel, panelLink, Pill, planName, Stat } from "@/components/admin/blocks";
import { requireAdmin } from "@/lib/admin/auth";
import { affairsQueue, daysAgo, listStudents, listWaitlist, revenue } from "@/lib/admin/data";
import { loadViews } from "@/lib/analytics";
import { summarize } from "@/lib/analytics-shared";
import { listAllPosts } from "@/lib/blog";
import { listCertificates } from "@/lib/certificates";
import { SetupError, safe } from "./setup-error";

export default async function AdminOverview() {
  await requireAdmin();
  const [st, views, wait, certs, posts] = await Promise.all([safe(listStudents), safe(() => loadViews(60)), safe(listWaitlist), safe(() => listCertificates()), safe(listAllPosts)]);
  if (!st.ok) return <SetupError error={st.error} />;
  const { students, payments } = st.data;

  const paid = students.filter((s) => s.plan);
  const active = paid.filter((s) => s.active);
  const learning7d = active.filter((s) => s.lastActive && s.lastActive >= daysAgo(7)).length;
  const joinedIn = (from: number, to: number) => students.filter((s) => s.joined.slice(0, 10) >= daysAgo(from) && s.joined.slice(0, 10) < daysAgo(to)).length;
  const rev30 = revenue(payments, 30);
  const revPrev = revenue(payments, 60) - rev30;

  const s60 = views.data ? summarize(views.data, 60) : null;
  const s30 = views.data ? summarize(views.data, 30) : null;
  const s1 = views.data ? summarize(views.data, 1) : null;
  const prevVisitors = s60 ? s60.series.slice(0, 30).reduce((a, d) => a + d.visitors, 0) : 0;
  const queue = affairsQueue(students);
  const newest = students.slice(0, 6);

  return (
    <div className="space-y-6">
      <PageHead title="Dashboard" sub="Visitors, students, money and who needs attention, at a glance." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={Radio} label="Live now" value={s1?.live ?? 0} sub="visitors in the last 5 minutes" tone="accent" href="/admin/analytics?days=1" />
        <Stat icon={Eye} label="Visitors (30 days)" value={(s30?.visitors ?? 0).toLocaleString()} sub={`${s1?.visitors ?? 0} today · ${(s30?.views ?? 0).toLocaleString()} page views`} delta={deltaOf(s30?.visitors ?? 0, prevVisitors)} href="/admin/analytics" />
        <Stat icon={Users} label="Total students" value={paid.length} sub={`${students.length} accounts in all`} delta={deltaOf(joinedIn(30, 0), joinedIn(60, 30), "sign-ups vs prior 30 days")} href="/admin/students" />
        <Stat icon={Wallet} label="Revenue (30 days)" value={ngn(rev30)} sub={`${ngn(revenue(payments, 36500))} all time`} delta={deltaOf(rev30, revPrev)} href="/admin/payments" />
        <Stat icon={UserCheck} label="Active students" value={active.length} sub={`${learning7d} learned in the last 7 days`} href="/admin/students?status=active" />
        <Stat icon={Rocket} label="Fast Track" value={paid.filter((s) => s.plan === "fast_track").length} sub={`${active.filter((s) => s.plan === "fast_track").length} with access now`} href="/admin/students?track=fast_track" />
        <Stat icon={GraduationCap} label="Main Track" value={paid.filter((s) => s.plan === "main_track").length} sub={`${active.filter((s) => s.plan === "main_track").length} with access now`} href="/admin/students?track=main_track" />
        <Stat icon={Award} label="Certificates" value={certs.data?.filter((c) => !c.revoked_at).length ?? 0} sub={`${students.filter((s) => s.finalPassed).length} finals passed`} href="/admin/certificates" />
      </div>

      {views.error && <p className="rounded-xl border border-[#f5dca0] bg-[#fff8e6] p-3 text-[13px]">Visitor analytics aren&apos;t available yet: {views.error}</p>}

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {s30 && (
          <Panel title="Visitors, last 30 days" action={<Link href="/admin/analytics" className={panelLink}>Details</Link>}>
            <DailyChart series={s30.series} />
          </Panel>
        )}
        <Panel title={`Needs attention (${queue.length})`} action={<Link href="/admin/affairs" className={panelLink}>Student affairs</Link>}>
          {queue.length === 0 ? (
            <p className="text-[13.5px] text-[var(--a-muted)]">Nobody needs a nudge right now.</p>
          ) : (
            <ul className="divide-y divide-[#f0f0f4]">
              {queue.slice(0, 6).map(({ student, flag }, i) => (
                <li key={i}>
                  <Link href={`/admin/students/${student.id}`} className="flex items-center gap-3 py-2.5">
                    <Avatar name={student.name || student.email} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-medium">{student.name || student.email}</span>
                      <span className="block truncate text-[12px] text-[var(--a-muted)]">{flag.detail}</span>
                    </span>
                    <Pill tone={flag.severity === 3 ? "bad" : flag.severity === 2 ? "warn" : "muted"}>{flag.label}</Pill>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Where visitors are from">
          <BarList rows={s30?.countries.slice(0, 6) ?? []} />
        </Panel>
        <Panel title="How they found you">
          <BarList rows={s30?.referrers.slice(0, 6) ?? []} />
        </Panel>
        <Panel title="At a glance">
          <ul className="space-y-3 text-[13.5px]">
            <li className="flex items-center gap-3"><Inbox className="size-4 text-[var(--a-accent-text)]" aria-hidden /> <span className="flex-1">Waitlist</span> <Link href="/admin/waitlist" className="font-semibold">{wait.data?.length ?? 0}</Link></li>
            <li className="flex items-center gap-3"><FileText className="size-4 text-[var(--a-accent-text)]" aria-hidden /> <span className="flex-1">Published posts</span> <Link href="/admin/blog" className="font-semibold">{posts.data?.filter((p) => p.status === "published").length ?? 0}</Link></li>
            <li className="flex items-center gap-3"><BookOpen className="size-4 text-[var(--a-accent-text)]" aria-hidden /> <span className="flex-1">Draft posts</span> <Link href="/admin/blog" className="font-semibold">{posts.data?.filter((p) => p.status === "draft").length ?? 0}</Link></li>
            <li className="flex items-center gap-3"><BadgeCheck className="size-4 text-[var(--a-accent-text)]" aria-hidden /> <span className="flex-1">Signed-in visitors today</span> <span className="font-semibold">{s1?.signedInToday ?? 0}</span></li>
          </ul>
        </Panel>
      </div>

      <Panel title="Newest accounts" action={<Link href="/admin/students" className={panelLink}>Student directory</Link>}>
        {newest.length === 0 ? (
          <p className="text-[13.5px] text-[var(--a-muted)]">No sign-ups yet.</p>
        ) : (
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {newest.map((s) => (
              <li key={s.id} className="border-b border-[#f0f0f4]">
                <Link href={`/admin/students/${s.id}`} className="flex items-center gap-3 py-2.5">
                  <Avatar name={s.name || s.email} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-medium">{s.name || s.email}</span>
                    <span className="block truncate text-[12px] text-[var(--a-muted)]">Joined {fmtDate(s.joined)}</span>
                  </span>
                  <Pill tone={s.plan ? (s.active ? "brand" : "muted") : "muted"}>{planName(s.plan)}</Pill>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
