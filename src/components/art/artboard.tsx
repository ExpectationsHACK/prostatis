"use client";

import { useEffect, useRef, type ReactNode } from "react";

export const ART_W = 320;
export const ART_H = 200;

/**
 * Draws its children on a fixed 320×200 canvas and scales the whole canvas to the card's
 * width. The illustration is identical on every screen, a phone shows the same picture
 * as a desktop, just resized, so nothing shrinks out of proportion or wraps.
 *
 * The scale and the "on screen" flag are written straight to the DOM rather than kept in React
 * state: each illustration is hundreds of elements, and re-rendering them on every resize or
 * scroll cost slow phones seconds of main-thread time during page load.
 */
export function Artboard({ children, bg, className = "" }: { children: ReactNode; bg: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = canvas.current;
    if (!el || !inner) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) inner.style.transform = `scale(${w / ART_W})`;
    });
    ro.observe(el);
    // Animated art only plays while it's on screen (saves battery and data on phones).
    const io = new IntersectionObserver(([e]) => el.classList.toggle("is-live", e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`art-board relative w-full overflow-hidden ${className}`} style={{ aspectRatio: `${ART_W} / ${ART_H}`, background: bg }} aria-hidden>
      <div ref={canvas} className="art-canvas absolute left-0 top-0 origin-top-left" style={{ width: ART_W, height: ART_H }}>
        {children}
      </div>
    </div>
  );
}
