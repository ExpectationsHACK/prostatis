import { CalendarClock, HeartHandshake, Hourglass, MessageCircle, Moon } from "lucide-react";
import Link from "next/link";
import { fmtDate, PageHead, Panel, Pill, planName, Stat } from "@/components/admin/blocks";
import { requireAdmin } from "@/lib/admin/auth";
import { affairsQueue, listNotes, listStudents } from "@/lib/admin/data";
import { SetupError, safe } from "../setup-error";

const KINDS: Record<string, string> = {
  not_started: "Paid, not started",
  inactive: "Inactive",
  stuck_quiz: "Stuck on a quiz",
  task_pending: "Mission pending",
  expiring: "Access ending soon",
  ready_final: "Ready for the final",
  failed_final: "Final not passed",
  expired_unfinished: "Ended unfinished",
};

// Ready-made WhatsApp nudges, so following up takes seconds.
const NUDGE: Record<string, (first: string) => string> = {
  not_started: (n) => `Hi ${n}! Welcome to STEINARK. Your first lesson is waiting: it takes about an hour. Need help getting started?`,
  inactive: (n) => `Hi ${n}! We noticed you've paused the course. Anything blocking you? Reply here and we'll help you get moving again.`,
  stuck_quiz: (n) => `Hi ${n}! That quiz can be tricky. Re-read the lesson's recap at the bottom, then try again. Want us to explain any question?`,
  task_pending: (n) => `Hi ${n}! You passed the quiz, nice! Confirm your mission to unlock the next lesson. Need a hand with it?`,
  expiring: (n) => `Hi ${n}! Your course access ends soon. Want to finish strong? Tell us what you need to get to the final.`,
  ready_final: (n) => `Hi ${n}! You've finished every lesson. The final assessment is open: pass it to get your certificate!`,
  failed_final: (n) => `Hi ${n}! You're close on the final. Review the lesson recaps and try again: you need 75%.`,
  expired_unfinished: (n) => `Hi ${n}! Your access ended before you finished. Would you like a short extension to complete the track?`,
};

export default async function AffairsPage({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  await requireAdmin("/admin/affairs");
  const { kind } = await searchParams;
  const [st, notes] = await Promise.all([safe(listStudents), safe(() => listNotes(undefined, 20))]);
  if (!st.ok) return <SetupError error={st.error} />;
  const queue = affairsQueue(st.data.students);
  const shown = kind ? queue.filter((x) => x.flag.kind === kind) : queue;
  const count = (k: string) => queue.filter((x) => x.flag.kind === k).length;
  const names = new Map(st.data.students.map((s) => [s.id, s.name || s.email]));

  return (
    <div className="space-y-6">
      <PageHead title="Student affairs" crumbs={[{ label: "Students" }]} sub="Who needs help, a nudge or an extension, worked out from their progress. Tap WhatsApp to send a ready-made message." />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat icon={HeartHandshake} label="Need attention" value={new Set(queue.map((x) => x.student.id)).size} tone="accent" />
        <Stat icon={Hourglass} label="Paid, not started" value={count("not_started")} href="/admin/affairs?kind=not_started" />
        <Stat icon={Moon} label="Inactive 5+ days" value={count("inactive")} href="/admin/affairs?kind=inactive" />
        <Stat icon={CalendarClock} label="Access ending" value={count("expiring")} href="/admin/affairs?kind=expiring" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/admin/affairs" className={"rounded-lg border px-3 py-1.5 text-[13px] " + (!kind ? "border-[var(--a-accent)] bg-[var(--a-accent-soft)] font-medium text-[var(--a-accent-text)]" : "border-[var(--a-border)] bg-white")}>All {queue.length}</Link>
        {Object.entries(KINDS).map(([k, v]) => (
          <Link key={k} href={`/admin/affairs?kind=${k}`} className={"rounded-lg border px-3 py-1.5 text-[13px] " + (kind === k ? "border-[var(--a-accent)] bg-[var(--a-accent-soft)] font-medium text-[var(--a-accent-text)]" : "border-[var(--a-border)] bg-white")}>
            {v} {count(k)}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Panel title={`Queue (${shown.length})`}>
          {shown.length === 0 ? (
            <p className="font-mono text-[13px] text-muted">Nothing here. Everyone is on track.</p>
          ) : (
            <ul className="divide-y divide-line">
              {shown.map(({ student: s, flag }, i) => {
                const wa = s.whatsapp?.replace(/\D/g, "");
                const msg = NUDGE[flag.kind]?.(s.name.split(" ")[0] || "there");
                return (
                  <li key={i} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <Link href={`/admin/students/${s.id}`} className="font-bold text-ink hover:underline">{s.name || s.email}</Link>
                      <p className="font-mono text-[12px] text-muted">{planName(s.plan)} · {flag.detail}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Pill tone={flag.severity === 3 ? "bad" : flag.severity === 2 ? "warn" : "muted"}>{flag.label}</Pill>
                      {wa && msg && (
                        <a href={`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener" className="grid size-9 place-items-center border-2 border-edge bg-accent text-paper" aria-label={`WhatsApp ${s.name}`}>
                          <MessageCircle className="size-4" aria-hidden />
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <Panel title="Recent notes">
          {!notes.data?.length ? (
            <p className="font-mono text-[13px] text-muted">No notes yet. Add them on a student&apos;s page.</p>
          ) : (
            <ul className="space-y-3">
              {notes.data.map((n) => (
                <li key={n.id} className="border-l-4 border-brand bg-paper px-3 py-2">
                  <Link href={`/admin/students/${n.user_id}`} className="label text-brand-text hover:underline">{names.get(n.user_id) ?? "Student"}</Link>
                  <p className="mt-1 line-clamp-3 whitespace-pre-wrap text-[13.5px] text-ink">{n.body}</p>
                  <p className="mt-1 font-mono text-[11px] text-muted">{n.author} · {fmtDate(n.created_at, true)}</p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
