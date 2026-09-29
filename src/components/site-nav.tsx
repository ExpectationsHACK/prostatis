"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoTile } from "./brand";
import { HeaderAuth } from "./header-auth";
import { navMenus, personas } from "./nav-data";

type Item = { href: string; label: string; note: string };

function Dropdown({ label, items, open, onToggle }: { label: string; items: Item[]; open: boolean; onToggle: () => void }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex items-center gap-1 px-2.5 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-ink hover:text-brand-text"
      >
        {label}
        <ChevronDown className={"size-3.5 transition-transform " + (open ? "rotate-180" : "")} strokeWidth={3} aria-hidden />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 border-2 border-edge bg-paper py-2 shadow-[6px_6px_0_var(--edge)]">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="flex items-center gap-3 px-4 py-2.5 hover:bg-wash">
              <span className="size-2 shrink-0 border border-edge bg-brand" aria-hidden />
              <span className="flex-1 font-mono text-[12.5px] font-bold uppercase tracking-[0.08em] text-ink">{it.label}</span>
              {it.note && <span className="font-mono text-[10px] text-muted">{it.note}</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/** Floating pill header: logo, dropdown menus, join button; full-screen sheet on phones. */
export function SiteNav() {
  const [open, setOpen] = useState<null | "tracks" | "tools" | "who">(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();

  // Close menus on outside click / Escape.
  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    document.addEventListener("mousedown", click);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", click);
      document.removeEventListener("keydown", key);
    };
  }, []);

  // Close everything after navigating.
  const [lastPath, setLastPath] = useState(path);
  if (path !== lastPath) {
    setLastPath(path);
    setOpen(null);
    setMobile(false);
  }

  const toggle = (k: "tracks" | "tools" | "who") => setOpen((o) => (o === k ? null : k));

  return (
    <header className="sticky top-0 z-50 px-3 pt-3" ref={ref}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 rounded-full border-2 border-edge bg-paper pl-3 pr-2 shadow-[5px_5px_0_var(--edge)]">
        <Link href="/" className="flex items-center gap-2.5" aria-label="BuildWithAIClub home">
          <LogoTile size={38} />
          <span className="display text-[17px] text-ink sm:text-[20px]">BuildWithAIClub</span>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Main">
          <Link href="/#inside" className="px-2.5 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-ink hover:text-brand-text">
            What&apos;s inside
          </Link>
          <Dropdown label="Tracks" items={navMenus.tracks} open={open === "tracks"} onToggle={() => toggle("tracks")} />
          <Dropdown label="Free tools" items={navMenus.tools} open={open === "tools"} onToggle={() => toggle("tools")} />
          <Dropdown label="Who it's for" items={navMenus.who} open={open === "who"} onToggle={() => toggle("who")} />
          <Link href="/pricing" className="px-2.5 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-ink hover:text-brand-text">
            Pricing
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <HeaderAuth />
        </div>

        <button
          type="button"
          onClick={() => setMobile((m) => !m)}
          aria-expanded={mobile}
          aria-label={mobile ? "Close menu" : "Open menu"}
          className="grid size-11 place-items-center rounded-full border-2 border-edge bg-brand lg:hidden"
        >
          {mobile ? <X className="size-5 text-ink" /> : <Menu className="size-5 text-ink" />}
        </button>
      </div>

      {mobile && (
        <div className="mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-6xl overflow-y-auto border-2 border-edge bg-paper p-5 shadow-[5px_5px_0_var(--edge)] lg:hidden">
          <nav className="flex flex-col" aria-label="Menu">
            {[
              { href: "/#inside", label: "What's inside" },
              { href: "/tracks/main-track", label: "Main Track · 1 month" },
              { href: "/tracks/fast-track", label: "Fast Track · 14 days" },
              { href: "/tools", label: "50 free tools" },
              { href: "/pricing", label: "Pricing" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="border-b border-line py-3 font-mono text-[14px] font-bold uppercase tracking-[0.1em] text-ink">
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="label mt-6 text-muted">Who it&apos;s for</p>
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5">
            {personas.map((p) => (
              <Link key={p.id} href={`/#${p.id}`} className="flex items-start gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-ink">
                <span className="mt-1 size-2 shrink-0 border border-edge bg-brand" aria-hidden />
                {p.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <HeaderAuth stacked />
          </div>
        </div>
      )}
    </header>
  );
}
