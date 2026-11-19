import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import { LogoMark, Wordmark } from "./brand";
import { SiteNav } from "./site-nav";
import { btn, size } from "./ui";
import { SubscribeForm } from "./waitlist-form";

export function SiteHeader() {
  return <SiteNav />;
}

const learn = [
  { href: "/tracks/fast-track", label: "Fast Track · 14 lessons" },
  { href: "/tracks/main-track", label: "Main Track · 26 lessons" },
  { href: "/#compare", label: "Compare the tracks" },
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

const link = "text-[14px] font-medium leading-snug text-ink/85 underline-offset-4 transition-colors hover:text-ink hover:underline sm:text-[15px]";

/**
 * Orange footer. Phones: two columns (brand across the top, then Learn and Company side by side,
 * then the email signup). Desktop: three columns, with the signup under the brand column.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-ink bg-brand text-ink">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:py-14 md:grid-cols-[1.5fr_1fr_1fr] md:gap-x-10 md:gap-y-6">
        <div className="col-span-2 min-w-0 md:col-span-1">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
            <LogoMark size={30} />
            <span className="flex flex-col leading-none">
              <Wordmark tone="ink" className="text-[17px] sm:text-[22px]" />
            </span>
          </Link>
          <p className="mt-3 max-w-sm text-[14px] font-medium leading-snug text-ink/85 sm:mt-4 sm:text-[15px] sm:leading-relaxed">
            Learn to build websites with AI and turn it into a source of income. Self-paced, open to learners everywhere, paid once.
          </p>
          <Link href="/#tracks" className={`${btn.accent} ${size.sm} mt-4 sm:mt-6 sm:h-11 sm:px-5 sm:text-[15px]`}>
            Enroll Now <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <nav aria-label="Learn" className="md:row-span-2">
          <p className="label text-ink">Learn</p>
          <ul className="mt-3 space-y-2.5 sm:mt-5 sm:space-y-3.5">
            {learn.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company" className="md:row-span-2">
          <p className="label text-ink">Company</p>
          <ul className="mt-3 space-y-2.5 sm:mt-5 sm:space-y-3.5">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ink-block col-span-2 bg-card p-4 md:col-span-1 md:col-start-1 md:row-start-2 md:max-w-sm">
          <p className="text-[14.5px] font-semibold">New free tools, by email</p>
          <p className="mt-0.5 text-[13px] text-muted">One short email when something new ships.</p>
          <div className="mt-3">
            <SubscribeForm source="footer" />
          </div>
        </div>
      </div>
      <div className="border-t-2 border-ink">
        <p className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-5 text-[13.5px] font-medium text-ink/80">
          <span>
            © {new Date().getFullYear()} {site.company}. All rights reserved.
          </span>
          <span>Payments secured by Paystack</span>
        </p>
      </div>
    </footer>
  );
}
