"use client";

import { Link2 } from "lucide-react";
import { useState } from "react";
import { btn, size } from "@/components/ui";

export function CopyLink({ label = "Copy link", url }: { label?: string; url?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={`${btn.secondary} ${size.md}`}
      aria-live="polite"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url ?? window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard blocked */
        }
      }}
    >
      <Link2 className="size-4" aria-hidden /> {copied ? "Copied" : label}
    </button>
  );
}
