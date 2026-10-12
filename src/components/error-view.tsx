"use client";

import { House, RefreshCw, ServerCrash, WifiOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useSyncExternalStore, useTransition } from "react";
import { reportError } from "@/lib/observability/sentry-client";
import { site } from "@/lib/site";
import { btn, size } from "./ui";
import { StatusPage } from "./status";

function subscribe(cb: () => void) {
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);
  return () => {
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);
  };
}

/** Whether the browser has a connection, kept up to date (true while rendering on the server). */
export function useOnline() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );
}

/** A "Try again" button that shows it's working while the page re-fetches. */
export function RetryButton({ retry, label = "Try again", className = "" }: { retry: () => void; label?: string; className?: string }) {
  const [pending, start] = useTransition();
  return (
    <button type="button" onClick={() => start(() => retry())} disabled={pending} className={`${btn.primary} ${size.md} ${className}`}>
      <RefreshCw className={"size-4 " + (pending ? "animate-spin motion-reduce:animate-none" : "")} aria-hidden /> {pending ? "Trying again…" : label}
    </button>
  );
}

/**
 * What an error boundary shows. Offline gets its own message and reloads by itself when the
 * connection returns; anything else is reported to Sentry (when it's on) with a reference the
 * member can quote.
 */
export function ErrorView({ error, retry, home = { href: "/", label: "Home page" } }: { error: Error & { digest?: string }; retry: () => void; home?: { href: string; label: string } }) {
  const online = useOnline();
  useEffect(() => reportError(error), [error]);
  // Back online: try again without making them tap anything.
  useEffect(() => {
    window.addEventListener("online", retry);
    return () => window.removeEventListener("online", retry);
  }, [retry]);

  const homeLink = (
    <Link href={home.href} className={`${btn.secondary} ${size.md}`}>
      <House className="size-4" aria-hidden /> {home.label}
    </Link>
  );

  if (!online) {
    return (
      <StatusPage icon={WifiOff} tone="warning" title="You're offline" actions={<RetryButton retry={retry} />}>
        This page needs the internet to load. Check your data or Wi-Fi. Your progress is saved, and the page will load by itself as soon as you&apos;re back online.
      </StatusPage>
    );
  }

  return (
    <StatusPage
      code="500"
      icon={ServerCrash}
      title="Something went wrong"
      actions={
        <>
          <RetryButton retry={retry} />
          {homeLink}
        </>
      }
      footnote={
        <>
          {error.digest && (
            <span className="mb-1 block">
              Reference: <span className="font-code text-ink">{error.digest}</span>
            </span>
          )}
          If it keeps happening,{" "}
          {site.contactEmail ? (
            <a href={`mailto:${site.contactEmail}`} className="font-semibold text-ink underline">
              email us
            </a>
          ) : (
            "message us"
          )}
          {error.digest ? " with that reference" : ""} and we&apos;ll fix it.
        </>
      }
    >
      This page didn&apos;t load properly. It&apos;s not something you did, and your progress and payments are safe. Try again in a moment.
    </StatusPage>
  );
}
