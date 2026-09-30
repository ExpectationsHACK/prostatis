import { CalendarDays, Download, PiggyBank, Scale, Wallet } from "lucide-react";
import Link from "next/link";
import { ab, fmtDate, ngn, PageHead, paginate, Pagination, Pill, planName, Stat, Table, td, withParams } from "@/components/admin/blocks";
import { requireAdmin } from "@/lib/admin/auth";
import { listStudents, revenue } from "@/lib/admin/data";
import { SetupError, safe } from "../setup-error";

export default async function PaymentsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  await requireAdmin("/admin/payments");
  const res = await safe(listStudents);
  if (!res.ok) return <SetupError error={res.error} />;
  const { students, payments } = res.data;
  const who = new Map(students.map((s) => [s.id, s]));
  const real = payments.filter((p) => p.status === "success" && p.provider !== "demo");
  const sum = (days: number, plan?: string) => revenue(payments, days, plan);
  const pg = paginate(payments, sp.page);

  return (
    <div className="space-y-6">
      <PageHead title="Payments" sub="Every recorded payment. Demo payments (test mode) are listed but never counted in revenue.">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a CSV file download, not a page */}
        <a href="/admin/export/payments" className={`${ab.secondary} ${ab.sm}`}>
          <Download className="size-4" aria-hidden /> Export CSV
        </a>
      </PageHead>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat icon={Wallet} label="Last 7 days" value={ngn(sum(7))} tone="accent" />
        <Stat icon={CalendarDays} label="Last 30 days" value={ngn(sum(30))} />
        <Stat icon={PiggyBank} label="All time" value={ngn(sum(36500))} sub={`${real.length} payments`} />
        <Stat icon={Scale} label="Fast / Main (all time)" value={<span className="text-[20px]">{ngn(sum(36500, "fast_track"))} / {ngn(sum(36500, "main_track"))}</span>} />
      </div>
      <Table head={["Date", "Student", "Track", "Amount", "Method", "Reference"]} empty={!payments.length} footer={<Pagination p={pg} noun="payments" href={(n) => withParams("/admin/payments", sp, { page: n })} />}>
        {pg.rows.map((p) => (
          <tr key={p.id}>
            <td className={td}>{fmtDate(p.created_at, true)}</td>
            <td className={td}>
              <Link href={`/admin/students/${p.user_id}`} className="font-bold hover:underline">{who.get(p.user_id)?.name || who.get(p.user_id)?.email || p.user_id.slice(0, 8)}</Link>
            </td>
            <td className={td}>{planName(p.plan)}</td>
            <td className={td + " tabular font-bold"}>{ngn(p.amount_kobo)}</td>
            <td className={td}><Pill tone={p.provider === "demo" ? "warn" : p.provider === "manual" ? "muted" : "ok"}>{p.provider}</Pill></td>
            <td className={td + " break-all text-[11px] text-muted"}>{p.reference}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
