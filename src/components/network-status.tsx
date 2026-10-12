"use client";

import { Wifi, WifiOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useOnline } from "./error-view";

/**
 * A bar at the bottom of every page when the connection drops, and a short "back online" when
 * it returns. Most visitors are on mobile data, where this happens a lot.
 */
export function NetworkStatus() {
  const online = useOnline();
  const [back, setBack] = useState(false);
  const wasOffline = useRef(false);

  useEffect(() => {
    if (!online) {
      wasOffline.current = true;
      return;
    }
    if (!wasOffline.current) return;
    wasOffline.current = false;
    setBack(true);
    const t = setTimeout(() => setBack(false), 3000);
    return () => clearTimeout(t);
  }, [online]);

  if (online && !back) return null;
  return (
    <div role="status" className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+80px)] z-50 mx-auto flex max-w-md items-center gap-2.5 rounded-[12px] border-2 border-edge bg-night px-4 py-3 text-[14px] text-paper shadow-[3px_3px_0_var(--brand)] lg:bottom-5 print:hidden">
      {online ? <Wifi className="size-4 shrink-0 text-[#7ee2a8]" aria-hidden /> : <WifiOff className="size-4 shrink-0 text-brand" aria-hidden />}
      {online ? "You're back online." : "You're offline. Pages won't load until your connection returns; nothing you've done is lost."}
    </div>
  );
}
