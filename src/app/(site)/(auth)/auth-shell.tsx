import type { ReactNode } from "react";
import { LogoTile } from "@/components/brand";

// Substack's sign-in: a centred narrow column, logo tile, serif heading, no card chrome.
export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[400px] flex-col items-center px-4 py-14 sm:py-20">
      <LogoTile size={48} />
      <h1 className="display mt-5 text-center text-[40px] text-ink">{title}</h1>
      <p className="mt-2 text-center text-[15px] text-muted">{subtitle}</p>
      <div className="mt-8 w-full">{children}</div>
    </div>
  );
}

export function nextParam(v: string | string[] | undefined) {
  const s = typeof v === "string" ? v : "";
  return s.startsWith("/") && !s.startsWith("//") && !s.startsWith("/\\") ? s : "/dashboard";
}
