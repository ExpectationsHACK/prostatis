"use client";

import { Printer } from "lucide-react";
import { btn, size } from "@/components/ui";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className={`${btn.primary} ${size.sm}`}>
      <Printer className="size-4" aria-hidden /> Print / save PDF
    </button>
  );
}
