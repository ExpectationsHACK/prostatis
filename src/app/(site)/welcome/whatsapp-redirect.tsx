"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { btn, size } from "@/components/ui";

export function WhatsAppRedirect({ url, seconds = 5 }: { url: string; seconds?: number }) {
  const [left, setLeft] = useState(seconds);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (cancelled) return;
    if (left <= 0) {
      window.location.href = url;
      return;
    }
    const t = setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [left, cancelled, url]);

  return (
    <div className="space-y-2">
      <a href={url} className={`${btn.primary} ${size.lg} w-full`}>
        <MessageCircle className="size-4" aria-hidden /> Open the WhatsApp community
      </a>
      {!cancelled && left > 0 ? (
        <p className="text-center text-[13px] text-muted" aria-live="polite">
          Opening WhatsApp in {left}s ·{" "}
          <button type="button" onClick={() => setCancelled(true)} className="font-semibold text-ink underline">
            stay here
          </button>
        </p>
      ) : null}
    </div>
  );
}
