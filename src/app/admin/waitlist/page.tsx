import { Download } from "lucide-react";
import { ab, fmtDate, PageHead, paginate, Pagination, Table, td, withParams } from "@/components/admin/blocks";
import { requireAdmin } from "@/lib/admin/auth";
import { listWaitlist } from "@/lib/admin/data";
import { SetupError, safe } from "../setup-error";

export default async function WaitlistPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  await requireAdmin("/admin/waitlist");
  const res = await safe(listWaitlist);
  if (!res.ok) return <SetupError error={res.error} />;
  const pg = paginate(res.data, sp.page);
  return (
    <div className="space-y-6">
      <PageHead title="Waitlist & subscribers" crumbs={[{ label: "Content" }]} sub={`${res.data.length} people left their email through the site's signup boxes.`}>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a CSV file download, not a page */}
        <a href="/admin/export/waitlist" className={`${ab.secondary} ${ab.sm}`}>
          <Download className="size-4" aria-hidden /> Export CSV
        </a>
      </PageHead>
      <Table head={["Date", "Name", "Email", "WhatsApp", "Signed up from"]} empty={!res.data.length} footer={<Pagination p={pg} noun="people" href={(n) => withParams("/admin/waitlist", sp, { page: n })} />}>
        {pg.rows.map((w) => (
          <tr key={w.email}>
            <td className={td}>{fmtDate(w.created_at, true)}</td>
            <td className={td}>{w.name || "-"}</td>
            <td className={td}><a href={`mailto:${w.email}`} className="hover:underline">{w.email}</a></td>
            <td className={td}>{w.whatsapp ? <a href={`https://wa.me/${w.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener" className="hover:underline">{w.whatsapp}</a> : "-"}</td>
            <td className={td}>{w.source}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
