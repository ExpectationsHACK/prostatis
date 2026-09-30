import { Award, GraduationCap, MailWarning, Rocket } from "lucide-react";
import Link from "next/link";
import { ab, afield, fmtDate, PageHead, paginate, Pagination, Pill, planName, Stat, Table, td, withParams } from "@/components/admin/blocks";
import { ActionForm } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { listCertificates } from "@/lib/certificates";
import { emailConfigured } from "@/lib/email";
import { certificateAction } from "../actions";
import { SetupError, safe } from "../setup-error";

export default async function CertificatesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  await requireAdmin("/admin/certificates");
  const res = await safe(() => listCertificates());
  if (!res.ok) return <SetupError error={res.error} />;
  const certs = res.data;
  const pg = paginate(certs, sp.page);

  return (
    <div className="space-y-6">
      <PageHead title="Certificates" crumbs={[{ label: "Students" }]} sub="Issued automatically when a student passes a track's final assessment, then emailed to them. Fix a name, resend, or revoke here." />
      {!emailConfigured() && (
        <p className="border-2 border-edge bg-[#fff1c2] p-3 font-mono text-[12.5px] text-ink">
          Certificate emails are off until RESEND_API_KEY and EMAIL_FROM are set (see <Link href="/admin/system" className="underline">Setup &amp; health</Link>). Students can still download theirs from the course.
        </p>
      )}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat icon={Award} label="Issued" value={certs.filter((c) => !c.revoked_at).length} tone="accent" />
        <Stat icon={Rocket} label="Fast Track" value={certs.filter((c) => c.track === "fast_track" && !c.revoked_at).length} />
        <Stat icon={GraduationCap} label="Main Track" value={certs.filter((c) => c.track === "main_track" && !c.revoked_at).length} />
        <Stat icon={MailWarning} label="Not emailed" value={certs.filter((c) => !c.emailed_at && !c.revoked_at).length} />
      </div>
      <Table head={["Certificate", "Name on it", "Track · score", "Issued", "Email", "Actions"]} empty={!certs.length} footer={<Pagination p={pg} noun="certificates" href={(n) => withParams("/admin/certificates", sp, { page: n })} />}>
        {pg.rows.map((c) => {
          const act = certificateAction.bind(null, c.id);
          return (
            <tr key={c.id} className={c.revoked_at ? "opacity-60" : ""}>
              <td className={td}>
                <Link href={`/certificate/${c.id}`} className="font-bold hover:underline">{c.id}</Link>
                <p><Link href={`/admin/students/${c.user_id}`} className="text-[11.5px] text-muted hover:underline">student profile</Link></p>
              </td>
              <td className={td}>
                <ActionForm action={act} className="flex gap-1.5">
                  <input type="hidden" name="op" value="rename" />
                  <input name="name" defaultValue={c.name} className={afield + " w-44 py-1 text-[13px]"} aria-label="Name on certificate" />
                  <button className={`${ab.ghost} ${ab.sm}`}>Save</button>
                </ActionForm>
              </td>
              <td className={td}>{planName(c.track)} · {c.score}/{c.total}</td>
              <td className={td}>{fmtDate(c.issued_at)}</td>
              <td className={td}>{c.emailed_at ? <Pill tone="ok">sent {fmtDate(c.emailed_at)}</Pill> : <Pill tone="warn">not sent</Pill>}</td>
              <td className={td}>
                <div className="flex flex-wrap gap-1.5">
                  {!c.revoked_at && (
                    <ActionForm action={act}>
                      <input type="hidden" name="op" value="email" />
                      <button className={`${ab.secondary} ${ab.sm}`}>{c.emailed_at ? "Resend" : "Email"}</button>
                    </ActionForm>
                  )}
                  <ActionForm action={act} confirm={c.revoked_at ? "Restore this certificate?" : "Revoke this certificate? Its public proof page will say it's no longer valid."}>
                    <input type="hidden" name="op" value={c.revoked_at ? "restore" : "revoke"} />
                    <button className={`${ab.secondary} ${ab.sm}`}>{c.revoked_at ? "Restore" : "Revoke"}</button>
                  </ActionForm>
                </div>
              </td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}
