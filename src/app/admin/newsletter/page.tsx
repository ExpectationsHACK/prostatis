import { MailCheck, Plus, Send, Users } from "lucide-react";
import Link from "next/link";
import { ab, fmtDate, PageHead, Pill, Stat, Table, td } from "@/components/admin/blocks";
import { requireAdmin } from "@/lib/admin/auth";
import { canEmailAnyone } from "@/lib/email";
import { listIssues, listSubscribers } from "@/lib/newsletter";
import { SetupError, safe } from "../setup-error";

export default async function NewsletterPage() {
  await requireAdmin("/admin/newsletter");
  const [issues, subs] = await Promise.all([safe(listIssues), safe(listSubscribers)]);
  if (!issues.ok) return <SetupError error={issues.error} />;
  const subscribed = subs.data?.filter((s) => s.status === "subscribed").length ?? 0;
  const sent = issues.data.filter((i) => i.status === "sent");

  return (
    <div className="space-y-6">
      <PageHead title="Newsletter" crumbs={[{ label: "Content" }]} sub="Write an email, preview it, send yourself a test, then send it to every subscriber. Each email includes a one-click unsubscribe link.">
        <Link href="/admin/newsletter/new" className={`${ab.primary} ${ab.sm}`}>
          <Plus className="size-4" aria-hidden /> New issue
        </Link>
      </PageHead>

      {!canEmailAnyone() && (
        <p className="rounded-[12px] border-2 border-[#151515] bg-[#fff8e6] px-4 py-3 text-[13.5px] leading-relaxed">
          <strong>Sending is on hold until your domain is verified.</strong> Add your domain in Resend (resend.com → Domains), then set <code>EMAIL_FROM</code> to an address on it, e.g. <code>Prostatis &lt;hello@yourdomain.com&gt;</code>. Until then emails only reach the Resend account owner, so you can still send yourself tests.
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={MailCheck} label="Subscribed" value={subscribed} tone="accent" href="/admin/waitlist?status=subscribed" />
        <Stat icon={Send} label="Issues sent" value={sent.length} />
        <Stat icon={Users} label="Last send reached" value={sent[0]?.recipients ?? 0} sub={sent[0] ? fmtDate(sent[0].sent_at) : "Nothing sent yet"} />
        <Stat icon={Plus} label="Drafts" value={issues.data.filter((i) => i.status === "draft").length} />
      </div>

      <Table head={["Subject", "Status", "Recipients", "Sent", "Last edited"]} empty={!issues.data.length}>
        {issues.data.map((i) => (
          <tr key={i.id} className="hover:bg-[#fafafc]">
            <td className={td}>
              <Link href={`/admin/newsletter/${i.id}`} className="font-medium hover:underline">{i.subject}</Link>
              {i.preheader && <p className="truncate text-[12px] text-[var(--a-muted)]">{i.preheader}</p>}
            </td>
            <td className={td}>{i.status === "sent" ? <Pill tone="ok">Sent</Pill> : i.status === "sending" ? <Pill tone="warn">Sending</Pill> : <Pill>Draft</Pill>}</td>
            <td className={td + " tabular"}>{i.status === "sent" ? i.recipients : "-"}</td>
            <td className={td}>{fmtDate(i.sent_at, true)}</td>
            <td className={td}>{fmtDate(i.updated_at, true)}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
