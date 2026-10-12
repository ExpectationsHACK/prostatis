import { ArrowRight, BookOpen, GraduationCap, House, MapPinOff, Newspaper, Wrench } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { StatusPage } from "@/components/status";
import { btn, size } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

const places = [
  { href: "/tools", icon: Wrench, title: "Free tools", text: "Tools for building and selling websites" },
  { href: "/pricing", icon: GraduationCap, title: "The tracks", text: "Fast Track and Main Track, paid once" },
  { href: "/dashboard", icon: BookOpen, title: "My dashboard", text: "Your lessons, progress and certificate" },
  { href: "/blog", icon: Newspaper, title: "Blog", text: "Guides on building and selling websites" },
];

// Every URL that doesn't exist, and every notFound() (a deleted post, an unknown tool…).
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <StatusPage
          code="404"
          icon={MapPinOff}
          tone="warning"
          title="We can't find that page"
          actions={
            <Link href="/" className={`${btn.primary} ${size.md}`}>
              <House className="size-4" aria-hidden /> Go to the home page
            </Link>
          }
        >
          The link may be old, or the address may have a typo. Nothing is wrong with your account. Here are the places people usually look for:
        </StatusPage>
        <ul className="mx-auto -mt-4 grid max-w-3xl gap-3 px-4 pb-16 sm:grid-cols-2">
          {places.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="ink-block block-press flex items-center gap-3 bg-card p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-[10px] border-2 border-edge bg-brand-wash">
                  <p.icon className="size-5 text-brand-text" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-ink">{p.title}</span>
                  <span className="block text-[13.5px] text-muted">{p.text}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-ink" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
