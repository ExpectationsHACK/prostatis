import type { ReactNode } from "react";

/**
 * A sliding row. Items render twice so the track can loop seamlessly by moving half
 * its width. The copy is hidden from assistive tech. Motion stops under reduced-motion.
 */
export function Marquee({
  children,
  reverse = false,
  seconds = 60,
  gap = "gap-3",
  className = "",
}: {
  children: ReactNode;
  reverse?: boolean;
  seconds?: number;
  gap?: string;
  className?: string;
}) {
  return (
    <div className={"overflow-hidden " + className}>
      <div
        className={`flex w-max ${reverse ? "slide-right" : "slide-left"}`}
        style={{ ["--dur" as string]: `${seconds}s` }}
      >
        <div className={`flex shrink-0 items-center pr-3 ${gap}`}>{children}</div>
        <div className={`flex shrink-0 items-center pr-3 ${gap}`} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
