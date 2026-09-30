import { fmtDate, PageHead, paginate, Pagination, Table, td, withParams } from "@/components/admin/blocks";
import { requireAdmin } from "@/lib/admin/auth";
import { listAudit } from "@/lib/admin/data";
import { SetupError, safe } from "../setup-error";

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  await requireAdmin("/admin/audit");
  const res = await safe(() => listAudit());
  if (!res.ok) return <SetupError error={res.error} />;
  const pg = paginate(res.data, sp.page, 30);
  return (
    <div className="space-y-6">
      <PageHead title="Audit log" sub="Every change made in the admin: who, what and when. The newest 300 are shown." />
      <Table head={["When", "Who", "Action", "Target", "Detail"]} empty={!res.data.length} footer={<Pagination p={pg} noun="changes" href={(n) => withParams("/admin/audit", sp, { page: n })} />}>
        {pg.rows.map((a) => (
          <tr key={a.id}>
            <td className={td + " whitespace-nowrap"}>{fmtDate(a.created_at, true)}</td>
            <td className={td}>{a.actor}</td>
            <td className={td + " font-bold"}>{a.action}</td>
            <td className={td + " break-all"}>{a.target ?? "-"}</td>
            <td className={td + " break-all text-[11px] text-muted"}>{a.detail ? JSON.stringify(a.detail) : "-"}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
