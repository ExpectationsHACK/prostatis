"use client";

import { BarChart3, ChevronDown, CircleHelp, CreditCard, ExternalLink, FileText, LayoutGrid, LogOut, Menu, ScrollText, Users, X, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Leaf = { href: string; label: string };
type Item = { label: string; icon: LucideIcon; href?: string; children?: Leaf[] };

const items: Item[] = [
  { label: "Dashboard", icon: LayoutGrid, href: "/admin" },
  { label: "Visitors", icon: BarChart3, href: "/admin/analytics" },
  {
    label: "Students",
    icon: Users,
    children: [
      { href: "/admin/students", label: "Student directory" },
      { href: "/admin/affairs", label: "Student affairs" },
      { href: "/admin/certificates", label: "Certificates" },
    ],
  },
  { label: "Payments", icon: CreditCard, href: "/admin/payments" },
  {
    label: "Content",
    icon: FileText,
    children: [
      { href: "/admin/blog", label: "Blog posts" },
      { href: "/admin/newsletter", label: "Newsletter" },
      { href: "/admin/waitlist", label: "Subscribers" },
    ],
  },
  { label: "Audit log", icon: ScrollText, href: "/admin/audit" },
];

const isOn = (path: string, href: string) => (href === "/admin" ? path === href : path === href || path.startsWith(href + "/"));

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>(() => Object.fromEntries(items.filter((i) => i.children).map((i) => [i.label, i.children!.some((c) => isOn(path, c.href))])));

  const row = "flex h-11 w-full items-center gap-3 rounded-[10px] px-3 text-[14px] transition-colors";
  return (
    <nav className="space-y-1" aria-label="Admin">
      {items.map((i) => {
        const Icon = i.icon;
        if (i.href) {
          const on = isOn(path, i.href);
          return (
            <Link key={i.label} href={i.href} onClick={onNavigate} aria-current={on ? "page" : undefined} className={`${row} ${on ? "bg-[var(--a-accent)] font-semibold text-[#151515] ring-2 ring-inset ring-[#151515] shadow-[2px_2px_0_#151515]" : "text-[#3a3a44] hover:bg-white"}`}>
              <Icon className="size-[18px]" aria-hidden /> {i.label}
            </Link>
          );
        }
        const groupOn = i.children!.some((c) => isOn(path, c.href));
        const expanded = open[i.label] ?? groupOn;
        return (
          <div key={i.label}>
            <button type="button" onClick={() => setOpen((o) => ({ ...o, [i.label]: !expanded }))} aria-expanded={expanded} className={`${row} ${groupOn && !expanded ? "bg-[var(--a-accent)] font-semibold text-[#151515] ring-2 ring-inset ring-[#151515] shadow-[2px_2px_0_#151515]" : "text-[#3a3a44] hover:bg-white"}`}>
              <Icon className="size-[18px]" aria-hidden /> {i.label}
              <ChevronDown className={"ml-auto size-4 transition-transform " + (expanded ? "rotate-180" : "")} aria-hidden />
            </button>
            {expanded && (
              <ul className="mt-1 space-y-0.5 pl-3">
                {i.children!.map((c) => {
                  const on = isOn(path, c.href);
                  return (
                    <li key={c.href}>
                      <Link href={c.href} onClick={onNavigate} aria-current={on ? "page" : undefined} className={"flex h-9 items-center gap-3 rounded-lg px-3 text-[13.5px] " + (on ? "font-medium text-[var(--a-accent-text)]" : "text-[#55555f] hover:text-[#1c1c22]")}>
                        <span className={"size-1.5 rounded-full " + (on ? "bg-[var(--a-accent)]" : "bg-transparent")} aria-hidden />
                        {c.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function Footer({ signOut, onNavigate }: { signOut: () => Promise<void>; onNavigate?: () => void }) {
  const cls = "flex h-10 w-full items-center gap-3 rounded-[10px] px-3 text-[14px] text-[#3a3a44] hover:bg-white";
  return (
    <div className="space-y-1">
      <Link href="/admin/system" onClick={onNavigate} className={cls}><CircleHelp className="size-[18px]" aria-hidden /> Setup & health</Link>
      <Link href="/" className={cls}><ExternalLink className="size-[18px]" aria-hidden /> View site</Link>
      <form action={signOut}>
        <button className={cls}><LogOut className="size-[18px]" aria-hidden /> Logout</button>
      </form>
    </div>
  );
}

export function AdminSidebar({ signOut }: { signOut: () => Promise<void> }) {
  return (
    <>
      <NavList />
      <div className="mt-8">
        <Footer signOut={signOut} />
      </div>
    </>
  );
}

/** Phone and tablet: a menu button that opens the same navigation as a sheet. */
export function MobileNav({ signOut }: { signOut: () => Promise<void> }) {
  const path = usePathname();
  // Remember which page the menu was opened on, so navigating closes it without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === path;
  const setOpen = (v: boolean) => setOpenAt(v ? path : null);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="grid size-10 place-items-center rounded-[10px] border border-[var(--a-border)] lg:hidden" aria-label="Open menu">
        <Menu className="size-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Admin menu">
          <button type="button" className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} aria-label="Close menu" />
          <div className="absolute inset-y-0 left-0 flex w-[280px] flex-col overflow-y-auto bg-[var(--a-side)] p-4">
            <button type="button" onClick={() => setOpen(false)} className="mb-4 ml-auto grid size-9 place-items-center rounded-lg hover:bg-white" aria-label="Close menu">
              <X className="size-5" />
            </button>
            <NavList onNavigate={() => setOpen(false)} />
            <div className="mt-8">
              <Footer signOut={signOut} onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
