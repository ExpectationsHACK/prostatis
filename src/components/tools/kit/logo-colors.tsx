"use client";

import { ImageUp } from "lucide-react";
import { useRef, useState } from "react";
import { dominantColors } from "@/lib/tool-defs/color";

/**
 * "Pick from logo": reads the image in the browser (nothing is uploaded), finds its main
 * colours and lets the user tap one.
 */
export function LogoColors({ onPick }: { onPick: (hex: string) => void }) {
  const file = useRef<HTMLInputElement>(null);
  const [found, setFound] = useState<string[]>([]);
  const [error, setError] = useState("");

  function read(f: File | undefined) {
    if (!f) return;
    setError("");
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      // A small copy is plenty to find the main colours, and fast on any phone.
      const scale = Math.min(1, 120 / Math.max(img.naturalWidth || 120, img.naturalHeight || 120));
      const w = Math.max(1, Math.round((img.naturalWidth || 120) * scale)), h = Math.max(1, Math.round((img.naturalHeight || 120) * scale));
      const canvas = Object.assign(document.createElement("canvas"), { width: w, height: h });
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      URL.revokeObjectURL(url);
      if (!ctx) return setError("This browser can't read the image.");
      ctx.drawImage(img, 0, 0, w, h);
      const colors = dominantColors(ctx.getImageData(0, 0, w, h).data);
      if (!colors.length) return setError("No colours found: is the image empty or fully transparent?");
      setFound(colors);
      onPick(colors[0]);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError("That file couldn't be opened as an image. Try a PNG, JPG or SVG.");
    };
    img.src = url;
  }

  return (
    <div className="mt-2">
      <input ref={file} type="file" accept="image/*" className="sr-only" onChange={(e) => read(e.target.files?.[0])} tabIndex={-1} aria-hidden />
      <button type="button" onClick={() => file.current?.click()} className="inline-flex items-center gap-1.5 border border-edge bg-paper px-2.5 py-1.5 font-mono text-[11.5px] font-bold text-ink hover:bg-wash">
        <ImageUp className="size-3.5" aria-hidden /> Pick from logo
      </button>
      {found.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] text-muted">Colours in the logo:</span>
          {found.map((c) => (
            <button key={c} type="button" onClick={() => onPick(c)} className="flex items-center gap-1 border border-edge bg-card px-1.5 py-1 font-mono text-[11px] text-ink hover:bg-wash" aria-label={`Use ${c}`}>
              <span className="size-4 border border-black/10" style={{ background: c }} />
              {c}
            </button>
          ))}
        </div>
      )}
      {error && <p className="mt-1.5 text-[12px] text-danger">{error}</p>}
    </div>
  );
}
