"use client";

import { CreditCard, GraduationCap, House, MessageCircle, Wrench, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; icon: LucideIcon; external?: boolean; soon?: boolean; memberOnly?: boolean };

function items(whatsapp: string): Item[] {
  return [
    { href: "/dashboard", label: "Home", icon: House, memberOnly: true },
    { href: "/learn", label: "My course", icon: GraduationCap, memberOnly: true },
    ...(whatsapp ? [{ href: whatsapp, label: "Community", icon: MessageCircle, external: true, memberOnly: true }] : []),
    { href: "/tools", label: "Free tools", icon: Wrench },
    { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  ];
}

// Substack app sidebar: icon + label rows, active row in bold ink.
export function SideNav({ whatsapp, active }: { whatsapp: string; active: boolean }) {
  const path = usePathname();
  return (
    <nav className="mt-6 space-y-0.5" aria-label="Dashboard">
      {items(whatsapp)
        .filter((i) => active || !i.memberOnly)
        .map((i) => {
          const on = !i.external && i.href === path;
          const Icon = i.icon;
          const cls =
            "flex h-11 items-center gap-3 rounded-lg px-3 text-[15px] transition-colors " +
            (on ? "font-semibold text-ink" : "font-medium text-muted hover:bg-wash hover:text-ink");
          if (i.soon)
            return (
              <span key={i.label} className={cls + " cursor-default hover:bg-transparent hover:text-muted"} aria-disabled>
                <Icon className="size-5" aria-hidden /> {i.label}
                <span className="ml-auto rounded-full bg-wash px-2 py-0.5 text-[11px] font-semibold text-muted">Soon</span>
              </span>
            );
          return i.external ? (
            <a key={i.label} href={i.href} target="_blank" rel="noopener" className={cls}>
              <Icon className="size-5" aria-hidden /> {i.label}
            </a>
          ) : (
            <Link key={i.label} href={i.href} className={cls} aria-current={on ? "page" : undefined}>
              <Icon className="size-5" strokeWidth={on ? 2.4 : 2} aria-hidden /> {i.label}
            </Link>
          );
        })}
    </nav>
  );
}

// Mobile bottom tab bar, as in the Substack app.
export function BottomNav({ whatsapp, active }: { whatsapp: string; active: boolean }) {
  const path = usePathname();
  const list = items(whatsapp).filter((i) => !i.soon && (active || !i.memberOnly));
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 grid border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden"
      style={{ gridTemplateColumns: `repeat(${list.length}, minmax(0, 1fr))` }}
      aria-label="Dashboard"
    >
      {list.map((i) => {
        const on = !i.external && i.href === path;
        const Icon = i.icon;
        const cls = "flex flex-col items-center gap-0.5 py-2 text-[11px] " + (on ? "font-semibold text-ink" : "text-muted");
        return i.external ? (
          <a key={i.label} href={i.href} target="_blank" rel="noopener" className={cls}>
            <Icon className="size-[22px]" aria-hidden />
            {i.label}
          </a>
        ) : (
          <Link key={i.label} href={i.href} className={cls} aria-current={on ? "page" : undefined}>
            <Icon className="size-[22px]" strokeWidth={on ? 2.4 : 2} aria-hidden />
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
