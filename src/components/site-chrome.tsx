import Link from "next/link";
import { site } from "@/lib/site";
import { LogoTile } from "./brand";
import { SiteNav } from "./site-nav";
import { SubscribeForm } from "./waitlist-form";

export function SiteHeader() {
  return <SiteNav />;
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-night text-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoTile size={36} />
            <span className="display text-2xl">{site.name}</span>
          </div>
          <p className="mt-3 max-w-xs font-mono text-[13px] leading-relaxed text-paper/70">{site.tagline}</p>
          <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em]" aria-label="Footer">
            <Link href="/tracks/main-track" className="text-paper/80 hover:text-brand">Curriculum</Link>
            <Link href="/tools" className="text-paper/80 hover:text-brand">Free tools</Link>
            <Link href="/pricing" className="text-paper/80 hover:text-brand">Pricing</Link>
            <Link href="/login" className="text-paper/80 hover:text-brand">Sign in</Link>
          </nav>
        </div>
        <div className="border-2 border-paper/25 p-5">
          <p className="display text-xl">New free tools, by email</p>
          <p className="mt-1 font-mono text-[12px] leading-relaxed text-paper/65">One short email when something new ships. Unsubscribe any time.</p>
          <div className="mt-4">
            <SubscribeForm source="footer" />
          </div>
        </div>
      </div>
      <p className="border-t border-paper/15 py-5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50">
        © {new Date().getFullYear()} {site.name} · Made in Nigeria
      </p>
    </footer>
  );
}
