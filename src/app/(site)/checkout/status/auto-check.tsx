"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useOnline } from "@/components/error-view";

const EVERY = 10;
const TRIES = 18; // three minutes, then the member decides

/** Re-checks a pending payment every few seconds (the page asks Paystack again on each refresh). */
export function AutoCheck() {
  const router = useRouter();
  const [tries, setTries] = useState(0);
  const [left, setLeft] = useState(EVERY);
  const online = useOnline();
  const done = tries >= TRIES;

  // Offline: stop counting down. Back online: check straight away.
  useEffect(() => {
    const back = () => {
      setLeft(EVERY);
      router.refresh();
    };
    window.addEventListener("online", back);
    return () => window.removeEventListener("online", back);
  }, [router]);

  useEffect(() => {
    if (done || !online) return;
    const t = setInterval(() => {
      setLeft((s) => {
        if (s > 1) return s - 1;
        setTries((n) => n + 1);
        router.refresh();
        return EVERY;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [done, online, router]);

  return (
    <p className="text-[13px] text-muted" aria-live="polite">
      {!online ? "You're offline. We'll check again as soon as your connection is back." : done ? "We've stopped checking automatically. Tap Check again, or come back later: your access opens by itself once Paystack confirms." : `Checking again in ${left}s…`}
    </p>
  );
}
