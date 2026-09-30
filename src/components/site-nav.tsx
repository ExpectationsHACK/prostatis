"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoTile, Wordmark } from "./brand";
import { HeaderAuth } from "./header-auth";
import { navMenus } from "./nav-data";

const link = "rounded-lg px-3 py-2 text-[14.5px] font-medium text-ink/80 transition-colors hover:bg-sunk hover:text-ink";

/** Header: logo, four destinations, Sign in and Enroll Now. A sheet on phones. */
export function SiteNav() {
  const [tracks, setTracks] = useState(false);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();

  // Close menus on outside click / Escape.
  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setTracks(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setTracks(false);
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
    setTracks(false);
    setMobile(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md" ref={ref}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="STEINARK home">
          <LogoTile size={32} />
          <Wordmark className="text-[16px]" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <div className="relative">
            <button type="button" onClick={() => setTracks((o) => !o)} aria-expanded={tracks} className={`${link} flex items-center gap-1`}>
              Tracks <ChevronDown className={"size-4 transition-transform " + (tracks ? "rotate-180" : "")} aria-hidden />
            </button>
            {tracks && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-[14px] border border-line bg-card p-2 shadow-[0_20px_40px_-20px_rgba(21,21,21,0.25)]">
                {navMenus.tracks.map((it) => (
                  <Link key={it.href} href={it.href} className="block rounded-[10px] px-3 py-2.5 hover:bg-sunk">
                    <span className="block text-[14.5px] font-semibold text-ink">{it.label}</span>
                    <span className="block text-[13px] text-muted">{it.note}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/tools" className={link}>Free tools</Link>
          <Link href="/pricing" className={link}>Pricing</Link>
          <Link href="/blog" className={link}>Blog</Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <HeaderAuth />
        </div>

        <button
          type="button"
          onClick={() => setMobile((m) => !m)}
          aria-expanded={mobile}
          aria-label={mobile ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-[10px] border border-line bg-card lg:hidden"
        >
          {mobile ? <X className="size-5 text-ink" /> : <Menu className="size-5 text-ink" />}
        </button>
      </div>

      {mobile && (
        <div className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-line bg-paper px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col" aria-label="Menu">
            {[
              { href: "/tracks/fast-track", label: "Fast Track", note: "14 days" },
              { href: "/tracks/main-track", label: "Main Track", note: "1 month" },
              { href: "/tools", label: "Free tools", note: "" },
              { href: "/pricing", label: "Pricing", note: "" },
              { href: "/blog", label: "Blog", note: "" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center justify-between border-b border-line py-3.5 text-[16px] font-medium text-ink">
                {l.label}
                {l.note && <span className="text-[13px] text-muted">{l.note}</span>}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <HeaderAuth stacked />
          </div>
        </div>
      )}
    </header>
  );
}
