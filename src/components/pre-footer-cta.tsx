"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { btn, size } from "./ui";

// Pages where an "enroll" push would be out of place.
const HIDDEN = ["/checkout", "/login", "/signup", "/welcome", "/auth", "/forgot-password", "/reset-password", "/privacy", "/terms", "/refund-policy", "/unsubscribe"];

/** The last push before the footer: one promise, one button, the honest facts. */
export function PreFooterCta({ from }: { from: string }) {
  const path = usePathname();
  if (HIDDEN.some((p) => path === p || path.startsWith(p + "/"))) return null;
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[24px] border-2 border-ink bg-night px-6 py-14 text-center shadow-[6px_6px_0_var(--brand)] sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -top-40 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-brand/25 blur-3xl" aria-hidden />
        <h2 className="display relative mx-auto max-w-3xl text-balance text-[34px] text-white sm:text-[56px]">Your first paid website is 14 days away.</h2>
        <p className="relative mx-auto mt-4 max-w-lg text-[16.5px] leading-relaxed text-white/70">
          Enroll now and start your first lesson in the next five minutes. From {from}, paid once in naira.
        </p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/pricing" className={`${btn.primary} ${size.lg}`}>
            Enroll Now <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/tracks/fast-track" className={`${btn.secondary} ${size.lg} border-white/15 bg-white/10 text-white hover:border-white/25 hover:bg-white/15`}>
            Start Learning
          </Link>
        </div>
      </div>
    </section>
  );
}
