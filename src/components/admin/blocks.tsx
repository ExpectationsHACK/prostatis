import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export const ngn = (kobo: number) => "₦" + Math.round(kobo / 100).toLocaleString("en-NG");
export const fmtDate = (iso: string | null | undefined, time = false) =>
  iso
    ? new Date(iso.length === 10 ? `${iso}T12:00:00+01:00` : iso).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        ...(time ? { hour: "2-digit", minute: "2-digit" } : {}),
        timeZone: "Africa/Lagos",
      })
    : "-";
export const planName = (p: string | null) => (p === "main_track" ? "Main Track" : p === "fast_track" ? "Fast Track" : "No track");

/* ---------- Buttons and fields ---------- */
const base = "inline-flex items-center justify-center gap-2 rounded-[10px] text-[13.5px] font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-50";
export const ab = {
  primary: `${base} h-10 px-4 bg-[var(--a-accent)] text-white hover:brightness-110`,
  secondary: `${base} h-10 px-4 border border-[var(--a-border)] bg-white text-[#1c1c22] hover:bg-[var(--a-head)]`,
  danger: `${base} h-10 px-4 border border-[#f3c9c5] bg-white text-[#b3261e] hover:bg-[#fdf0ef]`,
  ghost: `${base} h-9 px-3 text-[#1c1c22] hover:bg-[var(--a-head)]`,
  sm: "h-8! px-3! text-[12.5px]!",
};
export const afield = "w-full rounded-[10px] border border-[var(--a-border)] bg-white px-3 py-2 text-[14px] text-[#1c1c22] placeholder:text-[#9a9aa4]";
export const alabel = "mb-1 block text-[12.5px] font-medium text-[var(--a-muted)]";

/** "13 January, 2026 · 11:23 AM" in Lagos time, for page headers. */
export function lagosNow() {
  const d = new Date();
  const date = d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Africa/Lagos" });
  return `${date.replace(/ (\d{4})$/, ", $1")}  ${time}`;
}

/* ---------- Page header: title, breadcrumbs, actions ---------- */
export function PageHead({ title, sub, crumbs = [], children }: { title: string; sub?: string; crumbs?: { label: string; href?: string }[]; children?: ReactNode }) {
  const trail = [{ label: "Dashboard", href: "/admin" }, ...crumbs, { label: title }];
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#1c1c22] sm:text-[24px]">{title}</h1>
        {title !== "Dashboard" && (
          <nav className="mt-1 flex flex-wrap items-center gap-1.5 text-[12.5px] text-[var(--a-muted)]" aria-label="Breadcrumb">
            {trail.map((c, i) => {
              const last = i === trail.length - 1;
              return (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden>·</span>}
                  {c.href && !last ? (
                    <Link href={c.href} className="hover:text-[#1c1c22]">{c.label}</Link>
                  ) : (
                    <span className={last ? "text-[var(--a-accent)]" : ""}>{c.label}</span>
                  )}
                </span>
              );
            })}
          </nav>
        )}
        {sub && <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-[var(--a-muted)]">{sub}</p>}
      </div>
      {children ? <div className="flex flex-wrap items-center gap-2">{children}</div> : <p className="whitespace-pre text-[13.5px] text-[#3a3a44]">{lagosNow()}</p>}
    </div>
  );
}

/* ---------- Stat card: icon, change vs previous period, big number ---------- */
export type Delta = { pct: number | null; label?: string };

export function deltaOf(now: number, before: number, label?: string): Delta {
  if (!before) return { pct: now ? null : 0, label };
  return { pct: Math.round(((now - before) / before) * 100), label };
}

export function Stat({ label, value, sub, href, icon: Icon, delta, tone = "plain" }: { label: string; value: ReactNode; sub?: ReactNode; href?: string; icon?: LucideIcon; delta?: Delta; tone?: "plain" | "accent" }) {
  const accent = tone === "accent";
  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        {Icon ? (
          <span className={"grid size-9 place-items-center rounded-[10px] border " + (accent ? "border-white/30 text-white" : "border-[var(--a-border)] text-[var(--a-accent)]")}>
            <Icon className="size-[18px]" aria-hidden />
          </span>
        ) : (
          <span />
        )}
        {delta && (
          <span className={"text-right text-[11.5px] leading-tight " + (accent ? "text-white/80" : "text-[var(--a-muted)]")}>
            {delta.pct === null ? (
              <span className="font-semibold">New</span>
            ) : (
              <span className={"font-semibold " + (accent ? "text-white" : delta.pct > 0 ? "text-[#1f9d55]" : delta.pct < 0 ? "text-[#d93b30]" : "")}>
                {delta.pct > 0 ? "+" : ""}
                {delta.pct}%
              </span>
            )}{" "}
            {delta.label ?? "vs last 30 days"}
          </span>
        )}
      </div>
      <p className={"mt-4 text-[12.5px] " + (accent ? "text-white/85" : "text-[var(--a-muted)]")}>{label}</p>
      <p className="tabular mt-0.5 text-[26px] font-semibold leading-tight tracking-tight">{value}</p>
      {sub && <p className={"mt-1 text-[12px] " + (accent ? "text-white/80" : "text-[var(--a-muted)]")}>{sub}</p>}
    </>
  );
  const cls = "block rounded-[14px] border p-4 transition-colors " + (accent ? "border-transparent bg-[var(--a-accent)] text-white" : "border-[var(--a-border)] bg-white text-[#1c1c22]");
  return href ? (
    <Link href={href} className={cls + (accent ? " hover:brightness-110" : " hover:border-[#d6d4f7]")}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export function Panel({ title, children, action, className = "" }: { title: string; children: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <section className={"min-w-0 rounded-[14px] border border-[var(--a-border)] bg-white " + className}>
      <div className="flex items-center justify-between gap-3 px-5 pt-4">
        <h2 className="text-[15px] font-semibold text-[#1c1c22]">{title}</h2>
        {action}
      </div>
      <div className="p-5 pt-3">{children}</div>
    </section>
  );
}

export const panelLink = "text-[12.5px] font-medium text-[var(--a-accent)] hover:underline";

/** Horizontal bars for "top X" lists. */
export function BarList({ rows, empty = "No data yet.", format = (k: string) => k }: { rows: { key: string; visitors: number; views: number }[]; empty?: string; format?: (k: string) => ReactNode }) {
  if (!rows.length) return <p className="text-[13px] text-[var(--a-muted)]">{empty}</p>;
  const max = Math.max(...rows.map((r) => r.visitors), 1);
  return (
    <ul className="space-y-1.5">
      {rows.map((r) => (
        <li key={r.key} className="relative flex items-center justify-between gap-3 overflow-hidden rounded-lg px-2.5 py-1.5 text-[13px]">
          <span className="absolute inset-y-0 left-0 rounded-lg bg-[var(--a-accent-soft)]" style={{ width: `${(r.visitors / max) * 100}%` }} aria-hidden />
          <span className="relative min-w-0 truncate text-[#1c1c22]">{format(r.key)}</span>
          <span className="tabular relative shrink-0 font-semibold text-[#1c1c22]">
            {r.visitors.toLocaleString()} <span className="hidden font-normal text-[var(--a-muted)] sm:inline">· {r.views.toLocaleString()} views</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Daily visitors (bars) with page views behind. Server-rendered SVG, no chart library. */
export function DailyChart({ series }: { series: { day: string; views: number; visitors: number }[] }) {
  const max = Math.max(...series.map((d) => d.views), 1);
  const w = 100 / series.length;
  return (
    <div>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-44 w-full" role="img" aria-label="Visitors per day">
        {[10, 20, 30].map((y) => (
          <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#eeeef3" strokeWidth="0.15" />
        ))}
        {series.map((d, i) => (
          <g key={d.day}>
            <title>{`${d.day}: ${d.visitors} visitors, ${d.views} views`}</title>
            <rect x={i * w + w * 0.18} width={w * 0.64} y={40 - (d.views / max) * 38} height={(d.views / max) * 38} rx="0.4" fill="#e4e1fb" />
            <rect x={i * w + w * 0.18} width={w * 0.64} y={40 - (d.visitors / max) * 38} height={(d.visitors / max) * 38} rx="0.4" fill="var(--a-accent)" />
          </g>
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[11.5px] text-[var(--a-muted)]">
        <span>{series[0]?.day}</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm bg-[var(--a-accent)]" /> visitors</span>
          <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm bg-[#e4e1fb]" /> page views</span>
        </span>
        <span>{series.at(-1)?.day}</span>
      </div>
    </div>
  );
}

/* ---------- Tables ---------- */
export function Table({ head, children, empty, footer }: { head: ReactNode[]; children: ReactNode; empty?: boolean; footer?: ReactNode }) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-separate border-spacing-0 text-left text-[13.5px]">
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={i} className={"whitespace-nowrap bg-[var(--a-head)] px-4 py-3.5 text-[13px] font-medium text-[#3a3a44] " + (i === 0 ? "rounded-l-xl" : "") + (i === head.length - 1 ? " rounded-r-xl" : "")}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {empty && <p className="px-4 py-8 text-center text-[13.5px] text-[var(--a-muted)]">Nothing here yet.</p>}
      {footer}
    </div>
  );
}

export const td = "border-b border-[#f0f0f4] px-4 py-3.5 align-middle text-[#1c1c22]";

export function Pill({ children, tone = "muted" }: { children: ReactNode; tone?: "ok" | "bad" | "warn" | "muted" | "brand" | "blue" }) {
  const c = {
    ok: "border-[#bfe5cd] bg-[#effaf3] text-[#1f7a4d]",
    bad: "border-[#f3c9c5] bg-[#fdf0ef] text-[#c0392b]",
    warn: "border-[#f5dca0] bg-[#fff8e6] text-[#a8700a]",
    muted: "border-[var(--a-border)] bg-[var(--a-head)] text-[var(--a-muted)]",
    brand: "border-[#d6d1fa] bg-[var(--a-accent-soft)] text-[var(--a-accent)]",
    blue: "border-[#c7dcf8] bg-[#eff5fe] text-[#2563c9]",
  }[tone];
  return <span className={`inline-block whitespace-nowrap rounded-md border px-2 py-0.5 text-[12px] font-medium ${c}`}>{children}</span>;
}

export function ProgressBar({ pct }: { pct: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-1.5 w-20 overflow-hidden rounded-full bg-[#ececf2]">
        <span className="block h-full rounded-full bg-[var(--a-accent)]" style={{ width: `${pct}%` }} />
      </span>
      <span className="tabular text-[12.5px]">{pct}%</span>
    </span>
  );
}

export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const letter = (name || "?").trim().charAt(0).toUpperCase();
  const hues = ["#fde2d0", "#dff3e6", "#e4e1fb", "#dcebfb", "#fbe3ef", "#fff1c9"];
  const bg = hues[[...(name || "?")].reduce((a, c) => a + c.charCodeAt(0), 0) % hues.length];
  return (
    <span className="grid shrink-0 place-items-center rounded-full text-[13px] font-semibold text-[#1c1c22]" style={{ width: size, height: size, background: bg }} aria-hidden>
      {letter}
    </span>
  );
}

/* ---------- Pagination ---------- */
export const PER_PAGE = 20;

export function paginate<T>(list: T[], pageParam: string | undefined, per = PER_PAGE) {
  const pages = Math.max(1, Math.ceil(list.length / per));
  const page = Math.min(pages, Math.max(1, Number(pageParam) || 1));
  return { rows: list.slice((page - 1) * per, page * per), page, pages, from: list.length ? (page - 1) * per + 1 : 0, to: Math.min(list.length, page * per), total: list.length };
}

export function Pagination({ p, noun, href }: { p: { page: number; pages: number; from: number; to: number; total: number }; noun: string; href: (page: number) => string }) {
  const nums = [...new Set([1, p.page - 1, p.page, p.page + 1, p.pages])].filter((n) => n >= 1 && n <= p.pages).sort((a, b) => a - b);
  const box = "grid size-10 place-items-center rounded-[10px] border text-[13.5px]";
  const nav = (n: number, label: string, Icon: LucideIcon, off: boolean) =>
    off ? (
      <span className={`${box} border-[var(--a-border)] bg-[var(--a-head)] text-[#c2c2cb]`} aria-hidden>
        <Icon className="size-4" />
      </span>
    ) : (
      <Link href={href(n)} className={`${box} border-[var(--a-border)] bg-[var(--a-head)] hover:bg-[#ececf2]`} aria-label={label}>
        <Icon className="size-4" />
      </Link>
    );
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-[13px] text-[var(--a-muted)]">
        Showing <span className="font-semibold text-[#1c1c22]">{p.from} to {p.to} of {p.total}</span> {noun}
      </p>
      {p.pages > 1 && (
        <div className="flex items-center gap-1.5">
          {nav(1, "First page", ChevronsLeft, p.page === 1)}
          {nav(p.page - 1, "Previous page", ChevronLeft, p.page === 1)}
          {nums.map((n, i) => (
            <span key={n} className="flex items-center gap-1.5">
              {i > 0 && n - nums[i - 1] > 1 && <span className={`${box} border-[var(--a-border)]`}>…</span>}
              <Link
                href={href(n)}
                aria-current={n === p.page ? "page" : undefined}
                className={`${box} ${n === p.page ? "border-[var(--a-accent)] bg-[var(--a-accent-soft)] font-semibold text-[var(--a-accent)]" : "border-[var(--a-border)] hover:bg-[var(--a-head)]"}`}
              >
                {n}
              </Link>
            </span>
          ))}
          {nav(p.page + 1, "Next page", ChevronRight, p.page === p.pages)}
          {nav(p.pages, "Last page", ChevronsRight, p.page === p.pages)}
        </div>
      )}
    </div>
  );
}

/** A URL for this page with some query params changed. */
export function withParams(path: string, current: Record<string, string | undefined>, change: Record<string, string | number | undefined>) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...current, ...change })) if (v !== undefined && v !== "") q.set(k, String(v));
  const s = q.toString();
  return s ? `${path}?${s}` : path;
}
