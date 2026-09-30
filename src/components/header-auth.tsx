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
      <Link href="/dashboard" className={`${btn.primary} ${stacked ? size.lg : size.md} ${wide}`}>
        My dashboard <ArrowRight className="size-4" aria-hidden />
      </Link>
    );
  }
  return (
    <>
      <Link href="/pricing" className={`${btn.primary} ${stacked ? size.lg : size.md} ${wide}`}>
        Enroll Now
      </Link>
      <Link href="/login" className={`${stacked ? `${btn.secondary} ${size.lg}` : `${btn.ghost} ${size.md}`} ${wide}`}>
        Sign in
      </Link>
    </>
  );
}
