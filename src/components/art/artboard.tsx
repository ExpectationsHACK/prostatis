"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export const ART_W = 320;
export const ART_H = 200;

/**
 * Draws its children on a fixed 320×200 canvas and scales the whole canvas to the card's
 * width. The illustration is identical on every screen — a phone shows the same picture
 * as a desktop, just resized, so nothing shrinks out of proportion or wraps.
 */
export function Artboard({ children, bg, className = "" }: { children: ReactNode; bg: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setScale(w / ART_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: `${ART_W} / ${ART_H}`, background: bg }} aria-hidden>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: ART_W, height: ART_H, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
