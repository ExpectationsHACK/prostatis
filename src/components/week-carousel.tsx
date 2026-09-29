"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * One week of lessons as a sliding row. It advances one card every few seconds, loops back
 * to the start, and pauses while the visitor hovers, focuses, touches it, or when it's off
 * screen. Arrows move one card. Under reduced motion it never moves on its own.
 */
export function WeekCarousel({ children, label, seconds = 4, dark = false }: { children: ReactNode; label: string; seconds?: number; dark?: boolean }) {
  const track = useRef<HTMLOListElement>(null);
  const paused = useRef(false);
  const visible = useRef(false);
  const [edges, setEdges] = useState({ start: true, end: false });

  const step = useCallback((dir: 1 | -1, loop = false) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const w = card ? card.getBoundingClientRect().width + 24 : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const atStart = el.scrollLeft <= 4;
    if (loop && dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (loop && dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * w, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.4 });
    io.observe(el);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = reduce
      ? undefined
      : window.setInterval(() => {
          if (!paused.current && visible.current && !document.hidden) step(1, true);
        }, seconds * 1000);

    return () => {
      el.removeEventListener("scroll", onScroll);
      io.disconnect();
      if (id) window.clearInterval(id);
    };
  }, [seconds, step]);

  const pause = () => (paused.current = true);
  const resume = () => (paused.current = false);
  const arrow = `grid size-11 place-items-center border-2 disabled:opacity-40 ${dark ? "border-paper bg-paper text-ink" : "border-edge bg-card text-ink"} shadow-[3px_3px_0_var(--edge)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
      onTouchStart={pause}
      onTouchEnd={() => window.setTimeout(resume, 4000)}
    >
      <ol ref={track} className="-mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {Children.map(children, (c) => (
          <li className="flex w-[84%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">{c}</li>
        ))}
      </ol>
      <div className="mt-4 flex justify-end gap-3">
        <button type="button" className={arrow} onClick={() => step(-1, true)} aria-label={`Previous lesson in ${label}`} disabled={edges.start && edges.end}>
          <ChevronLeft className="size-5" strokeWidth={3} />
        </button>
        <button type="button" className={arrow} onClick={() => step(1, true)} aria-label={`Next lesson in ${label}`} disabled={edges.start && edges.end}>
          <ChevronRight className="size-5" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
