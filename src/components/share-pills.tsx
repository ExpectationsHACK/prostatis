"use client";

import { Link2, MessageCircle } from "lucide-react";
import { useState } from "react";

const pill =
  "inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3.5 text-[13px] font-semibold text-ink transition-colors hover:bg-wash";

// Substack's post action pills, with WhatsApp in place of restack/comment.
export function SharePills({ title, kind = "free tool" }: { title: string; kind?: string }) {
  const [copied, setCopied] = useState(false);
  const share = () => {
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title}: ${kind}: ${url}`)}`, "_blank", "noopener");
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked */
    }
  };
  return (
    <div className="flex gap-2">
      <button type="button" onClick={share} className={pill}>
        <MessageCircle className="size-4" aria-hidden /> Share
      </button>
      <button type="button" onClick={copy} className={pill} aria-live="polite">
        <Link2 className="size-4" aria-hidden /> {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
