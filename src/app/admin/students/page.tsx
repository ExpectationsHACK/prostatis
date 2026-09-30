import { CloudDownload, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { ab, Avatar, fmtDate, ngn, PageHead, Pagination, paginate, Pill, planName, ProgressBar, Table, td, withParams } from "@/components/admin/blocks";
import { SearchBox } from "@/components/admin/search-box";
import { requireAdmin } from "@/lib/admin/auth";
import { listStudents } from "@/lib/admin/data";
import { SetupError, safe } from "../setup-error";

const STATUSES = { all: "All statuses", active: "Active access", expired: "Access ended", none: "No track yet" } as const;
const select = "h-10 rounded-[10px] border border-[var(--a-border)] bg-white px-3 text-[13.5px]";

export default async function StudentsPage({ searchParams }: { searchParams: Promise<{ q?: string; track?: string; status?: string; page?: string }> }) {
  await requireAdmin("/admin/students");
  const sp = await searchParams;
  const res = await safe(listStudents);
  if (!res.ok) return <SetupError error={res.error} />;

  const q = (sp.q ?? "").trim().toLowerCase();
  const status = (sp.status ?? "all") as keyof typeof STATUSES;
  const list = res.data.students.filter(
    (s) =>
      (!q || [s.name, s.email, s.whatsapp].some((v) => v?.toLowerCase().includes(q))) &&
      (!sp.track || s.plan === sp.track) &&
      (status === "all" || (status === "active" && s.active) || (status === "expired" && s.plan && !s.active) || (status === "none" && !s.plan)),
  );
  const p = paginate(list, sp.page);

  return (
    <div className="space-y-6">
      <PageHead title="Student directory" crumbs={[{ label: "Students" }]} sub="Everyone with an account. Open anyone for their full profile, lesson-by-lesson progress and actions." />

      <form className="flex flex-wrap items-center gap-2">
        <SearchBox defaultValue={sp.q} placeholder="Search by name, email or WhatsApp…" />
        <button className={ab.secondary}>
          Filter <SlidersHorizontal className="size-4" aria-hidden />
        </button>
        <div className="ml-auto flex flex-wrap gap-2">
          <select name="track" defaultValue={sp.track ?? ""} className={select} aria-label="Track">
            <option value="">All tracks</option>
            <option value="fast_track">Fast Track</option>
            <option value="main_track">Main Track</option>
          </select>
          <select name="status" defaultValue={status} className={select} aria-label="Status">
            {Object.entries(STATUSES).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a CSV file download, not a page */}
          <a href="/admin/export/students" className={ab.secondary}>
            Export CSV <CloudDownload className="size-4" aria-hidden />
          </a>
        </div>
      </form>

      <Table
        head={["Student", "Track", "Access", "Progress", "XP", "Last active", "Streak", "Paid"]}
        empty={!list.length}
        footer={<Pagination p={p} noun="students" href={(n) => withParams("/admin/students", sp, { page: n })} />}
      >
        {p.rows.map((s) => (
          <tr key={s.id} className="hover:bg-[#fafafc]">
            <td className={td}>
              <Link href={`/admin/students/${s.id}`} className="flex items-center gap-3">
                <Avatar name={s.name || s.email} />
                <span className="min-w-0">
                  <span className="block truncate font-medium hover:underline">{s.name || "(no name)"}</span>
                  <span className="block truncate text-[12px] text-[var(--a-muted)]">{s.email}</span>
                </span>
              </Link>
            </td>
            <td className={td}>{s.plan ? <Pill tone={s.plan === "main_track" ? "brand" : "blue"}>{planName(s.plan)}</Pill> : <Pill>None</Pill>}</td>
            <td className={td}>{s.plan ? <Pill tone={s.active ? "ok" : "bad"}>{s.active ? `Until ${fmtDate(s.accessEnd)}` : "Ended"}</Pill> : "-"}</td>
            <td className={td}>
              {s.plan ? <ProgressBar pct={s.pct} /> : "-"}
              {s.finalPassed && <div className="mt-1"><Pill tone="ok">Certified</Pill></div>}
            </td>
            <td className={td + " tabular"}>{s.xp}</td>
            <td className={td}>{fmtDate(s.lastActive)}</td>
            <td className={td + " tabular"}>{s.streak ? `${s.streak}d` : "0d"}</td>
            <td className={td + " tabular"}>{s.paidKobo ? ngn(s.paidKobo) : "-"}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
