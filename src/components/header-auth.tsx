"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/env";
import { btn, size } from "./ui";

// Client-side so public pages stay statically rendered. Display only: the server
// re-checks auth on every protected page.
export function HeaderAuth({ stacked = false }: { stacked?: boolean }) {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    if (!supabaseConfigured) return;
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_, session) => setSignedIn(Boolean(session)));
    return () => data.subscription.unsubscribe();
  }, []);

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
