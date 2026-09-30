import { ArrowLeft, Clock, Flame, Mail, MessageCircle, Sparkles, Wallet } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ab, afield, fmtDate, ngn, Panel, Pill, planName, ProgressBar, Stat, Table, td } from "@/components/admin/blocks";
import { ActionForm } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { getStudent } from "@/lib/admin/data";
import { fastTrack, mainTrack } from "@/lib/curriculum";
import { levelFor, streaks, trackProgress } from "@/lib/learning/engine";
import { plans } from "@/lib/site";
import { addNoteAction, certificateAction, endAccessAction, extendAccessAction, grantTrackAction, updateProfileAction } from "../../actions";
import { SetupError, safe } from "../../setup-error";

const label = "label mb-1 block text-muted";

export default async function StudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireAdmin(`/admin/students/${id}`);
  const res = await safe(() => getStudent(id));
  if (!res.ok) return <SetupError error={res.error} />;
  if (!res.data) notFound();
  const { student: s, payments, notes, certificates, flags } = res.data;
  const tracks = s.plan === "main_track" ? [fastTrack, mainTrack] : s.plan === "fast_track" ? [fastTrack] : [];
  const lvl = levelFor(s.state.xp);
  const st = streaks(s.state.days);
  const wa = s.whatsapp?.replace(/\D/g, "");

  return (
    <div className="space-y-6">
      <Link href="/admin/students" className="label inline-flex items-center gap-1.5 text-muted hover:text-ink">
        <ArrowLeft className="size-3.5" aria-hidden /> Students
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-edge pb-5">
        <div className="min-w-0">
          <h1 className="display text-[30px] text-ink sm:text-[36px]">{s.name || "(no name)"}</h1>
          <p className="mt-1 break-all font-mono text-[13px] text-muted">{s.email}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Pill tone={s.plan ? "brand" : "muted"}>{planName(s.plan)}</Pill>
            {s.plan && <Pill tone={s.active ? "ok" : "bad"}>{s.active ? `access to ${fmtDate(s.accessEnd)}` : "access ended"}</Pill>}
            {!s.confirmed && <Pill tone="warn">email not confirmed</Pill>}
            {s.finalPassed && <Pill tone="ok">certified</Pill>}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {wa && (
            <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener" className={`${ab.primary} ${ab.sm}`}>
              <MessageCircle className="size-4" aria-hidden /> WhatsApp
            </a>
          )}
          {s.email && (
            <a href={`mailto:${s.email}`} className={`${ab.secondary} ${ab.sm}`}>
              <Mail className="size-4" aria-hidden /> Email
            </a>
          )}
        </div>
      </div>

      {flags.length > 0 && (
        <div className="space-y-2">
          {flags.map((f, i) => (
            <p key={i} className={"border-2 border-edge px-3 py-2 font-mono text-[13px] text-ink " + (f.severity === 3 ? "bg-[#fde2df]" : f.severity === 2 ? "bg-[#fff1c2]" : "border-[var(--a-border)] bg-white")}>
              <strong>{f.label}.</strong> {f.detail}
            </p>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat icon={Sparkles} label="XP" value={s.state.xp} sub={`Level ${lvl.level}: ${lvl.name}`} />
        <Stat icon={Flame} label="Streak" value={`${st.current} days`} sub={`best ${st.longest}`} />
        <Stat icon={Clock} label="Last active" value={<span className="text-[20px]">{fmtDate(s.lastActive)}</span>} sub={`${s.state.days.length} active days`} />
        <Stat icon={Wallet} label="Paid" value={ngn(s.paidKobo)} sub={`${payments.length} payment${payments.length === 1 ? "" : "s"}`} />
      </div>

      {tracks.map((t) => {
        const p = trackProgress(t, s.state);
        const final = s.state.finals[t.id];
        return (
          <Panel key={t.id} title={`${t.name} progress`} action={<ProgressBar pct={p.pct} />}>
            <Table head={["Day", "Lesson", "Quiz (best)", "Mission", "Completed"]}>
              {p.days.map(({ module: m, status }) => {
                const row = s.state.lessons[m.lesson];
                return (
                  <tr key={m.day} className={status === "locked" ? "opacity-50" : ""}>
                    <td className={td + " tabular"}>{m.day}</td>
                    <td className={td}>{m.title}</td>
                    <td className={td}>
                      {row?.quiz_total ? <Pill tone={row.quiz_passed_at ? "ok" : "bad"}>{row.quiz_best}/{row.quiz_total}</Pill> : "-"}
                    </td>
                    <td className={td}>{row?.task_done_at ? <Pill tone="ok">done</Pill> : "-"}</td>
                    <td className={td}>{row?.completed_at ? fmtDate(row.completed_at) : status === "open" ? <Pill tone="warn">current</Pill> : "-"}</td>
                  </tr>
                );
              })}
              <tr className="bg-wash">
                <td className={td}>Final</td>
                <td className={td}>Final assessment (75% to pass)</td>
                <td className={td}>{final?.total ? <Pill tone={final.passed_at ? "ok" : "bad"}>{final.best}/{final.total}</Pill> : "-"}</td>
                <td className={td}>-</td>
                <td className={td}>{final?.passed_at ? fmtDate(final.passed_at) : "-"}</td>
              </tr>
            </Table>
          </Panel>
        );
      })}

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Student info">
          <dl className="mb-4 grid grid-cols-2 gap-3 font-mono text-[12.5px]">
            <div><dt className="text-muted">Joined</dt><dd className="font-bold">{fmtDate(s.joined, true)}</dd></div>
            <div><dt className="text-muted">Last sign-in</dt><dd className="font-bold">{fmtDate(s.lastSignIn, true)}</dd></div>
            <div><dt className="text-muted">WhatsApp</dt><dd className="font-bold">{s.whatsapp ?? "-"}</dd></div>
            <div><dt className="text-muted">User ID</dt><dd className="break-all">{s.id}</dd></div>
          </dl>
          <ActionForm action={updateProfileAction.bind(null, s.id)} className="space-y-2 border-t-2 border-dashed border-line pt-4">
            <label className="block"><span className={label}>Name (also used on new certificates)</span><input name="name" defaultValue={s.name} className={afield} required /></label>
            <label className="block"><span className={label}>WhatsApp number</span><input name="whatsapp" defaultValue={s.whatsapp ?? ""} className={afield} /></label>
            <button className={`${ab.secondary} ${ab.sm}`}>Save profile</button>
          </ActionForm>
        </Panel>

        <Panel title="Membership">
          <div className="space-y-5">
            <ActionForm action={extendAccessAction.bind(null, s.id)} className="flex flex-wrap items-end gap-2">
              <label className="block"><span className={label}>Extend access by (days)</span><input name="days" type="number" min={1} max={365} defaultValue={7} className={afield + " w-32"} /></label>
              <button className={`${ab.primary}`}>Extend</button>
            </ActionForm>
            <ActionForm action={grantTrackAction.bind(null, s.id)} className="space-y-2 border-t-2 border-dashed border-line pt-4" confirm="Grant this track and record the payment?">
              <p className="font-mono text-[12px] text-muted">Grant a track, e.g. after a bank transfer outside Paystack. It&apos;s recorded as a manual payment.</p>
              <div className="flex flex-wrap gap-2">
                <select name="plan" className={afield + " w-40"} aria-label="Track">
                  {plans.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <input name="amount" type="number" min={0} placeholder="Amount ₦ (0 if free)" className={afield + " w-48"} aria-label="Amount in naira" />
              </div>
              <input name="note" placeholder="Note (e.g. transfer ref, scholarship)" className={afield} aria-label="Note" />
              <button className={`${ab.primary} ${ab.sm}`}>Grant track</button>
            </ActionForm>
            <ActionForm action={endAccessAction.bind(null, s.id)} className="flex flex-wrap items-end gap-2 border-t-2 border-dashed border-line pt-4">
              <label className="block"><span className={label}>End access now: type END</span><input name="confirm" className={afield + " w-32"} autoComplete="off" /></label>
              <button className={`${ab.secondary} text-danger`}>End access</button>
            </ActionForm>
          </div>
        </Panel>

        <Panel title={`Notes (${notes.length})`}>
          <ActionForm action={addNoteAction.bind(null, s.id)} className="space-y-2">
            <textarea name="body" rows={3} placeholder="Private note: calls, complaints, promises, context…" className={afield} aria-label="New note" />
            <button className={`${ab.primary} ${ab.sm}`}>Add note</button>
          </ActionForm>
          <ul className="mt-4 space-y-3">
            {notes.map((n) => (
              <li key={n.id} className="border-l-4 border-brand bg-paper px-3 py-2">
                <p className="whitespace-pre-wrap text-[14px] text-ink">{n.body}</p>
                <p className="mt-1 font-mono text-[11px] text-muted">{n.author} · {fmtDate(n.created_at, true)}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Certificates & payments">
          {certificates.length === 0 ? (
            <p className="font-mono text-[13px] text-muted">No certificate yet.</p>
          ) : (
            certificates.map((c) => (
              <div key={c.id} className="mb-4 border-2 border-edge bg-paper p-3">
                <p className="font-mono text-[12.5px]">
                  <Link href={`/certificate/${c.id}`} className="font-bold underline">{c.id}</Link> · {planName(c.track)} · {c.score}/{c.total}
                </p>
                <p className="mt-1 font-mono text-[11.5px] text-muted">
                  Issued {fmtDate(c.issued_at)} · {c.emailed_at ? `emailed ${fmtDate(c.emailed_at)}` : "not emailed"} {c.revoked_at && "· REVOKED"}
                </p>
                <ActionForm action={certificateAction.bind(null, c.id)} className="mt-2 flex flex-wrap gap-2">
                  <input type="hidden" name="op" value="email" />
                  <input name="email" defaultValue={c.email ?? s.email} className={afield + " max-w-64 py-1.5 text-[13px]"} aria-label="Send to" />
                  <button className={`${ab.secondary} ${ab.sm}`}>Email certificate</button>
                </ActionForm>
              </div>
            ))
          )}
          <ul className="divide-y divide-line border-t-2 border-edge font-mono text-[12.5px]">
            {payments.map((p) => (
              <li key={p.id} className="flex justify-between gap-3 py-2">
                <span>{fmtDate(p.created_at, true)} · {planName(p.plan)} · {p.provider}</span>
                <span className="font-bold">{ngn(p.amount_kobo)}</span>
              </li>
            ))}
            {!payments.length && <li className="py-2 text-muted">No payments.</li>}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
