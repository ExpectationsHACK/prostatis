import { Eye, FileText, Layers, LogOut, Radio } from "lucide-react";
import Link from "next/link";
import { BarList, DailyChart, PageHead, Panel, Stat } from "@/components/admin/blocks";
import { requireAdmin } from "@/lib/admin/auth";
import { loadViews } from "@/lib/analytics";
import { summarize } from "@/lib/analytics-shared";
import { SetupError, safe } from "../setup-error";

const RANGES = [1, 7, 30, 90];

export default async function AnalyticsPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  await requireAdmin("/admin/analytics");
  const d = Number((await searchParams).days);
  const days = RANGES.includes(d) ? d : 30;
  const res = await safe(() => loadViews(Math.max(days, 1)));
  if (!res.ok) return <SetupError error={res.error} />;
  const s = summarize(res.data, days);

  return (
    <div className="space-y-6">
      <PageHead title="Visitors" sub="Counted without cookies and without storing IP addresses. Location comes from your host (Vercel) and shows “Unknown” when running locally.">
        {RANGES.map((r) => (
          <Link key={r} href={`/admin/analytics?days=${r}`} className={"rounded-lg border px-3 py-1.5 text-[13px] " + (r === days ? "border-[var(--a-accent)] bg-[var(--a-accent-soft)] font-medium text-[var(--a-accent)]" : "border-[var(--a-border)] bg-white hover:bg-[var(--a-head)]")}>
            {r === 1 ? "Today" : `${r} days`}
          </Link>
        ))}
      </PageHead>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat icon={Radio} label="Live now" value={s.live} sub="last 5 minutes" tone="accent" />
        <Stat icon={Eye} label="Visitors" value={s.visitors.toLocaleString()} sub="unique per day, added up" />
        <Stat icon={FileText} label="Page views" value={s.views.toLocaleString()} />
        <Stat icon={Layers} label="Pages per visit" value={s.pagesPerVisit.toFixed(1)} />
        <Stat icon={LogOut} label="Bounce rate" value={`${Math.round(s.bounceRate * 100)}%`} sub="left after one page" />
      </div>

      {days > 1 && (
        <Panel title="Per day">
          <DailyChart series={s.series} />
        </Panel>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Top pages"><BarList rows={s.pages} /></Panel>
        <Panel title="Countries"><BarList rows={s.countries} /></Panel>
        <Panel title="Cities"><BarList rows={s.cities} /></Panel>
        <Panel title="Referrers (where they came from)"><BarList rows={s.referrers} /></Panel>
        <Panel title="Campaigns (?utm_source= or ?ref=)"><BarList rows={s.sources} empty="Add ?utm_source=whatsapp (or instagram, flyer…) to links you share to see which ones bring visitors." /></Panel>
        <Panel title="Devices"><BarList rows={s.devices} format={(k) => k[0].toUpperCase() + k.slice(1)} /></Panel>
        <Panel title="Most-used free tools"><BarList rows={s.tools} format={(k) => <Link href={`/tools/${k}`} className="hover:underline">{k}</Link>} /></Panel>
        <Panel title="Most-read blog posts"><BarList rows={s.posts} format={(k) => <Link href={`/blog/${k}`} className="hover:underline">{k}</Link>} /></Panel>
      </div>
    </div>
  );
}
