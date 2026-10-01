import { Download, MailCheck, MailX, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { ab, fmtDate, PageHead, paginate, Pagination, Pill, Stat, Table, td, withParams } from "@/components/admin/blocks";
import { SearchBox } from "@/components/admin/search-box";
import { ActionForm } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { daysAgo } from "@/lib/admin/data";
import { listSubscribers } from "@/lib/newsletter";
import { subscriptionAction } from "../newsletter/actions";
import { SetupError, safe } from "../setup-error";

const FILTERS = { all: "Everyone", subscribed: "Subscribed", unsubscribed: "Unsubscribed" } as const;

export default async function SubscribersPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; status?: string }> }) {
  const sp = await searchParams;
  await requireAdmin("/admin/waitlist");
  const res = await safe(listSubscribers);
  if (!res.ok) return <SetupError error={res.error} />;
  const all = res.data;
  const status = (sp.status ?? "all") as keyof typeof FILTERS;
  const q = (sp.q ?? "").trim().toLowerCase();
  const list = all.filter((s) => (status === "all" || s.status === status) && (!q || [s.email, s.name, s.source].some((v) => v?.toLowerCase().includes(q))));
  const pg = paginate(list, sp.page);
  const on = all.filter((s) => s.status === "subscribed").length;

  return (
    <div className="space-y-6">
      <PageHead title="Subscribers" crumbs={[{ label: "Content" }]} sub="Everyone who left their email in a signup box on the site. Subscribed people get your newsletter; every email has a one-click unsubscribe link.">
        <Link href="/admin/newsletter" className={`${ab.primary} ${ab.sm}`}>Write a newsletter</Link>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a CSV file download, not a page */}
        <a href="/admin/export/waitlist" className={`${ab.secondary} ${ab.sm}`}>
          <Download className="size-4" aria-hidden /> Export CSV
        </a>
      </PageHead>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={MailCheck} label="Subscribed" value={on} tone="accent" />
        <Stat icon={Users} label="Everyone" value={all.length} />
        <Stat icon={UserPlus} label="New in 30 days" value={all.filter((s) => s.created_at.slice(0, 10) >= daysAgo(30)).length} />
        <Stat icon={MailX} label="Unsubscribed" value={all.length - on} />
      </div>

      <form className="flex flex-wrap items-center gap-2">
        <SearchBox defaultValue={sp.q} placeholder="Search by email, name or source…" />
        <select name="status" defaultValue={status} className="h-10 rounded-[10px] border border-[var(--a-border)] bg-white px-3 text-[13.5px]" aria-label="Status">
          {Object.entries(FILTERS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <button className={ab.secondary}>Filter</button>
      </form>

      <Table head={["Joined", "Email", "Name", "Signed up from", "Status", ""]} empty={!list.length} footer={<Pagination p={pg} noun="people" href={(n) => withParams("/admin/waitlist", sp, { page: n })} />}>
        {pg.rows.map((w) => (
          <tr key={w.email}>
            <td className={td + " whitespace-nowrap"}>{fmtDate(w.created_at)}</td>
            <td className={td}>
              <a href={`mailto:${w.email}`} className="hover:underline">{w.email}</a>
            </td>
            <td className={td}>{w.name || "-"}</td>
            <td className={td}>{w.source}</td>
            <td className={td}>{w.status === "subscribed" ? <Pill tone="ok">Subscribed</Pill> : <Pill>Unsubscribed</Pill>}</td>
            <td className={td + " text-right"}>
              <ActionForm action={subscriptionAction.bind(null, w.email, w.status === "subscribed" ? "unsubscribed" : "subscribed")} confirm={w.status === "subscribed" ? `Unsubscribe ${w.email}?` : undefined}>
                <button className={`${ab.ghost} ${ab.sm}`}>{w.status === "subscribed" ? "Unsubscribe" : "Re-subscribe"}</button>
              </ActionForm>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
