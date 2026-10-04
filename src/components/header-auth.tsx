"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { btn, size } from "./ui";

// Supabase keeps the session in an "sb-<project>-auth-token" cookie (split into .0, .1… when long).
const SESSION_COOKIE = /(?:^|;\s*)sb-[^=;]+-auth-token(?:\.\d+)?=/;

function subscribe(cb: () => void) {
  // Re-check when the tab comes back into view (e.g. after signing in in another tab).
  window.addEventListener("focus", cb);
  document.addEventListener("visibilitychange", cb);
  return () => {
    window.removeEventListener("focus", cb);
    document.removeEventListener("visibilitychange", cb);
  };
}

/**
 * Sign in / Enroll, or "My dashboard" when there's a session. Reads the session cookie instead
 * of loading the Supabase library, which kept ~70KB of JavaScript off every public page.
 * Display only: the server checks auth again on every protected page.
 */
export function HeaderAuth({ stacked = false }: { stacked?: boolean }) {
  const signedIn = useSyncExternalStore(subscribe, () => SESSION_COOKIE.test(document.cookie), () => false);

  const wide = stacked ? "w-full" : "";
  if (signedIn) {
    return (
      <Link href="/dashboard" className={`${btn.primary} ${stacked ? size.lg : size.sm} ${wide}`}>
        My dashboard <ArrowRight className="size-4" aria-hidden />
      </Link>
    );
  }
  const enroll = (
    <Link href="/pricing" className={`${btn.primary} ${stacked ? size.lg : size.sm} ${wide}`}>
      Enroll Now
    </Link>
  );
  const signIn = (
    <Link href="/login" className={`${stacked ? `${btn.secondary} ${size.lg}` : `${btn.ghost} ${size.sm}`} ${wide}`}>
      Sign in
    </Link>
  );
  // Phones: the main action first. Desktop: quiet Sign in, then the orange button at the end.
  return stacked ? (
    <>
      {enroll}
      {signIn}
    </>
  ) : (
    <>
      {signIn}
      {enroll}
    </>
  );
}
