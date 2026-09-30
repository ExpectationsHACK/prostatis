import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import { LogoTile, Wordmark } from "./brand";
import { SiteNav } from "./site-nav";
import { btn, size } from "./ui";
import { SubscribeForm } from "./waitlist-form";

export function SiteHeader() {
  return <SiteNav />;
}

const learn = [
  { href: "/tracks/fast-track", label: "Fast Track · 14 days" },
  { href: "/tracks/main-track", label: "Main Track · 1 month" },
  { href: "/pricing", label: "Pricing" },
  { href: "/tools", label: "Free tools" },
  { href: "/blog", label: "Blog" },
];

const company = [
  { href: "/login", label: "Sign in" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refund policy" },
  { href: "/blog/rss.xml", label: "RSS feed" },
];

const link = "text-[15px] font-medium text-ink/85 underline-offset-4 transition-colors hover:text-ink hover:underline";

/** Orange footer, three columns: brand and signup, learn, company. */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-ink bg-brand text-ink">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:gap-10">
        <div className="min-w-0">
          <Link href="/" className="flex items-center gap-2.5" aria-label="STEINARK home">
            <span className="rounded-[26%] border-2 border-ink">
              <LogoTile size={34} />
            </span>
            <Wordmark className="text-[20px]" />
          </Link>
          <p className="mt-4 max-w-sm text-[15px] font-medium leading-relaxed text-ink/85">
            Learn to build websites with AI and turn it into a source of income. Made in Nigeria, paid once in naira.
          </p>
          <Link href="/pricing" className={`${btn.accent} ${size.md} mt-6`}>
            Enroll Now <ArrowRight className="size-4" aria-hidden />
          </Link>
          <div className="ink-block mt-8 max-w-sm bg-card p-4">
            <p className="text-[14.5px] font-semibold">New free tools, by email</p>
            <p className="mt-0.5 text-[13px] text-muted">One short email when something new ships.</p>
            <div className="mt-3">
              <SubscribeForm source="footer" />
            </div>
          </div>
        </div>
        <nav aria-label="Learn">
          <p className="label text-ink">Learn</p>
          <ul className="mt-5 space-y-3.5">
            {learn.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <p className="label text-ink">Company</p>
          <ul className="mt-5 space-y-3.5">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t-2 border-ink">
        <p className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-5 text-[13.5px] font-medium text-ink/80">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>Payments secured by Paystack</span>
        </p>
      </div>
    </footer>
  );
}
