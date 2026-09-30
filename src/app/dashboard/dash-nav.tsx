"use client";

import { CreditCard, GraduationCap, House, MessageCircle, Newspaper, Wrench, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; icon: LucideIcon; external?: boolean; soon?: boolean; memberOnly?: boolean; desktopOnly?: boolean };

function items(whatsapp: string): Item[] {
  return [
    { href: "/dashboard", label: "Home", icon: House, memberOnly: true },
    { href: "/learn", label: "My course", icon: GraduationCap, memberOnly: true },
    ...(whatsapp ? [{ href: whatsapp, label: "Community", icon: MessageCircle, external: true, memberOnly: true }] : []),
    { href: "/tools", label: "Free tools", icon: Wrench },
    { href: "/blog", label: "Blog", icon: Newspaper, desktopOnly: true },
    { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  ];
}

// Sidebar: icon + label rows; the current page is an orange ink tab.
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
            "flex h-11 items-center gap-3 px-3 font-mono text-[12.5px] font-bold transition-colors " +
            (on ? "border-2 border-edge bg-brand text-ink" : "text-muted hover:bg-wash hover:text-ink");
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

// Mobile bottom tab bar.
export function BottomNav({ whatsapp, active }: { whatsapp: string; active: boolean }) {
  const path = usePathname();
  const list = items(whatsapp).filter((i) => !i.soon && !i.desktopOnly && (active || !i.memberOnly));
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 grid border-t border-edge bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden"
      style={{ gridTemplateColumns: `repeat(${list.length}, minmax(0, 1fr))` }}
      aria-label="Dashboard"
    >
      {list.map((i) => {
        const on = !i.external && i.href === path;
        const Icon = i.icon;
        const cls = "flex flex-col items-center gap-0.5 py-2 font-mono text-[10.5px] font-bold " + (on ? "bg-brand text-ink" : "text-muted");
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
