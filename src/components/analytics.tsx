"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Sends one tiny beacon per page view to /api/track. No cookies, no third parties. */
export function Analytics() {
  const path = usePathname();
  const first = useRef(true);
  const last = useRef("");

  useEffect(() => {
    // `last` also stops React's development double-run from counting a view twice.
    if (!path || path.startsWith("/admin") || last.current === path) return;
    last.current = path;
    const params = new URLSearchParams(window.location.search);
    const body = JSON.stringify({
      p: path,
      // The outside referrer only matters on the first page of a visit.
      r: first.current ? document.referrer : "",
      u: params.get("utm_source") ?? params.get("ref") ?? "",
    });
    first.current = false;
    try {
      if (!navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" })))
        fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
    } catch {
      /* never break the page over analytics */
    }
  }, [path]);

  return null;
}
