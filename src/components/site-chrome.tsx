import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import { LogoTile } from "./brand";
import { personas } from "./nav-data";
import { SiteNav } from "./site-nav";
import { SubscribeForm } from "./waitlist-form";

export function SiteHeader() {
  return <SiteNav />;
}

const explore = [
  { href: "/tracks/fast-track", label: "Fast Track" },
  { href: "/tracks/main-track", label: "Main Track" },
  { href: "/pricing", label: "Pricing" },
  { href: "/tools", label: "Free tools" },
  { href: "/blog", label: "Blog" },
  { href: "/#inside", label: "What's inside" },
  { href: "/#who", label: "Who it's for" },
  { href: "/login", label: "Sign in" },
];

const link = "font-mono text-[13px] font-bold uppercase tracking-[0.12em] text-paper/85 hover:text-brand";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-night text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 md:grid-cols-[1.3fr_1fr_1fr] md:gap-10">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <LogoTile size={36} />
            <span className="display min-w-0 break-words text-[19px] uppercase text-brand sm:text-[26px]">{site.name}</span>
          </div>
          <p className="mt-4 max-w-sm font-mono text-[13px] leading-relaxed text-paper/75">
            The Nigeria-first school for building websites with AI, and selling them, with SEO, automation and AI agents, to businesses that pay.
          </p>
          <Link
            href="/pricing"
            className="block-press mt-6 inline-flex items-center gap-2 border-2 border-paper bg-[#f2c230] px-4 py-2.5 font-mono text-[13px] font-bold uppercase tracking-[0.08em] text-ink shadow-[4px_4px_0_var(--brand)]"
          >
            Enroll Now <ArrowRight className="size-4" aria-hidden />
          </Link>
          <div className="mt-8 border-2 border-paper/25 p-5">
            <p className="display text-xl">New free tools, by email</p>
            <p className="mt-1 font-mono text-[12px] leading-relaxed text-paper/65">One short email when something new ships. Unsubscribe any time.</p>
            <div className="mt-4">
              <SubscribeForm source="footer" />
            </div>
          </div>
        </div>
        <nav aria-label="Explore">
          <p className="label inline-block border-2 border-edge bg-brand px-2 py-1 text-ink">Explore</p>
          <ul className="mt-5 space-y-3.5">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Who it's for">
          <p className="label inline-block border-2 border-edge bg-brand px-2 py-1 text-ink">Who it&apos;s for</p>
          <ul className="mt-5 space-y-3.5">
            {personas.map((p) => (
              <li key={p.id}>
                <Link href={`/#${p.id}`} className={link}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="border-t border-paper/15 py-5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50">
        © {new Date().getFullYear()} {site.name} · Made in Nigeria
      </p>
    </footer>
  );
}
