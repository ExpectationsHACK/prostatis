"use client";

import { useState } from "react";
import { simulate, type Vision } from "@/lib/tool-defs/color";
import type { PreviewColors } from "@/lib/tool-defs/types";

const views: { id: "normal" | Vision; label: string }[] = [
  { id: "normal", label: "Normal" },
  { id: "deuteranopia", label: "Red-green (deutan)" },
  { id: "protanopia", label: "Red-green (protan)" },
  { id: "tritanopia", label: "Blue-yellow" },
];

/** A small phone-width website painted in the palette, with a colour-blind view switcher. */
export function PalettePreview({ title, name, colors }: { title: string; name: string; colors: PreviewColors }) {
  const [view, setView] = useState<"normal" | Vision>("normal");
  const c = Object.fromEntries(Object.entries(colors).map(([k, v]) => [k, view === "normal" ? v : simulate(v, view)])) as PreviewColors;
  return (
    <div className="overflow-hidden border border-edge bg-card">
      <div className="flex items-center justify-between gap-2 border-b border-edge px-4 py-2.5">
        <span className="font-mono text-[11px] font-bold text-muted">{title}</span>
      </div>
      <div role="tablist" aria-label="How it looks with colour blindness" className="flex flex-wrap gap-1 border-b border-edge bg-sunk p-2">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={view === v.id}
            onClick={() => setView(v.id)}
            className={"border border-edge px-2 py-1 font-mono text-[11px] font-bold " + (view === v.id ? "bg-ink text-paper" : "bg-card text-ink hover:bg-wash")}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div className="p-3" style={{ background: c.surface }}>
        <div className="mx-auto max-w-[360px] overflow-hidden rounded-[14px] border border-black/10 shadow-sm" style={{ background: c.background, color: c.text, fontFamily: "Arial, Helvetica, sans-serif" }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${c.surface}` }}>
            <span className="text-[15px] font-bold">{name}</span>
            <span className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: c.accent, color: c.accentInk }}>
              New
            </span>
          </div>
          <div className="px-4 py-5">
            <p className="text-[22px] font-bold leading-tight">Fresh, fast and made for you</p>
            <p className="mt-2 text-[14px] leading-relaxed" style={{ color: c.muted }}>
              This is muted text for details like opening hours and delivery areas.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-[8px] px-4 py-2.5 text-[14px] font-bold" style={{ background: c.primary, color: c.primaryInk }}>
                Order on WhatsApp
              </span>
              <span className="text-[14px] font-semibold underline" style={{ color: c.link }}>
                See prices
              </span>
            </div>
          </div>
          <div className="mx-4 mb-4 rounded-[10px] p-3" style={{ background: c.surface }}>
            <p className="text-[13px] font-bold">A card on the surface colour</p>
            <p className="mt-1 text-[12.5px]" style={{ color: c.muted }}>
              Cards, reviews and price lists sit here.
            </p>
          </div>
        </div>
        {view !== "normal" && <p className="mt-2 text-center font-mono text-[11px]" style={{ color: c.text }}>Simulated view. If the button and links still stand out, the palette works for colour-blind visitors.</p>}
      </div>
    </div>
  );
}
