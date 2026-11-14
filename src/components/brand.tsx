import Link from "next/link";
import { LOGO } from "@/lib/logo";
import { site } from "@/lib/site";

/**
 * The Stynark mark on a transparent background. It takes the text colour (ink by
 * default), so it works on light pages, the orange footer and dark panels alike.
 */
export function LogoMark({ size = 36, className = "text-ink" }: { size?: number; className?: string }) {
  return (
    <svg viewBox={LOGO.viewBox} height={size} width={(size * 62) / 71} className={"shrink-0 " + className} aria-hidden focusable="false">
      <path d={LOGO.outline} fill="none" stroke="currentColor" strokeWidth={LOGO.stroke} strokeLinecap="round" strokeLinejoin="round" />
      {LOGO.dashes.map((d) => (
        <path key={d} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}

/** The name in the headline face: brand orange in headers, ink where the background is orange (the footer). */
export function Wordmark({ className = "", tone = "brand" }: { className?: string; tone?: "brand" | "ink" }) {
  return <span className={"display " + (tone === "brand" ? "text-brand" : "text-ink") + " " + className}>{site.name}</span>;
}

export function Brand({ size = 32, name = true }: { size?: number; name?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <LogoMark size={size} />
      {name && <Wordmark className="text-[16px] sm:text-[20px]" />}
    </Link>
  );
}
