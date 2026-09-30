import Link from "next/link";
import { site } from "@/lib/site";
import { LogoTile, Wordmark } from "./brand";
import { SiteNav } from "./site-nav";
import { SubscribeForm } from "./waitlist-form";

export function SiteHeader() {
  return <SiteNav />;
}

const columns = [
  {
    title: "Learn",
    links: [
      { href: "/tracks/fast-track", label: "Fast Track" },
      { href: "/tracks/main-track", label: "Main Track" },
      { href: "/pricing", label: "Pricing" },
      { href: "/login", label: "Sign in" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/tools", label: "Free tools" },
      { href: "/blog", label: "Blog" },
      { href: "/blog/rss.xml", label: "RSS feed" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms" },
      { href: "/refund-policy", label: "Refund policy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-card">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 md:grid-cols-[1.4fr_repeat(3,minmax(0,0.6fr))] md:gap-10">
        <div className="min-w-0">
          <Link href="/" className="flex items-center gap-2.5" aria-label="STEINARK home">
            <LogoTile size={32} />
            <Wordmark className="text-[16px]" />
          </Link>
          <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-muted">
            Learn to build websites with AI and turn it into a source of income. Made in Nigeria, priced in naira.
          </p>
          <div className="mt-6 max-w-sm">
            <p className="text-[14px] font-semibold text-ink">New free tools, by email</p>
            <p className="mt-0.5 text-[13px] text-muted">One short email when something new ships.</p>
            <div className="mt-3">
              <SubscribeForm source="footer" />
            </div>
          </div>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-[13px] font-semibold text-ink">{c.title}</p>
            <ul className="mt-4 space-y-3">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[14px] text-muted transition-colors hover:text-ink">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <p className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-5 text-[13px] text-muted">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>Payments secured by Paystack</span>
        </p>
      </div>
    </footer>
  );
}
