"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/observability/sentry-client";
import "./globals.css";

// The last-resort error page (it replaces the root layout, so it brings its own <html>).
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => reportError(error), [error]);

  return (
    <html lang="en">
      <body className="grid min-h-screen place-items-center bg-paper px-4 font-sans text-ink">
        <main className="ink-block w-full max-w-md bg-card p-6 text-center">
          <p className="label text-brand-text">Something went wrong</p>
          <h1 className="mt-2 text-[24px] font-bold leading-tight">This page hit an error.</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            {process.env.NEXT_PUBLIC_SENTRY_DSN ? "We've been notified. " : ""}Your progress is saved. Try again, or go back to the home page.
            {error.digest && <span className="mt-2 block font-code text-[12px]">Ref: {error.digest}</span>}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              onClick={reset}
              className="inline-flex h-11 items-center rounded-[12px] border-2 border-ink bg-brand px-5 text-[14px] font-semibold text-ink shadow-[3px_3px_0_var(--ink)]"
            >
              Try again
            </button>
            {/* A plain link on purpose: the router may be what broke. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="inline-flex h-11 items-center rounded-[12px] border-2 border-ink bg-card px-5 text-[14px] font-semibold text-ink">
              Home page
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
