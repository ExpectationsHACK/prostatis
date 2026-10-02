"use client";

import { Check, Copy, Download, Link2, Printer } from "lucide-react";
import { useState } from "react";

const btn = "inline-flex items-center gap-1.5 border border-edge bg-card px-2.5 py-1.5 font-mono text-[11px] font-bold text-ink hover:bg-wash";

/** Open a printable page in a new window and show the print dialog (Save as PDF works there). */
export function printHtml(doc: string) {
  const w = window.open("", "_blank", "width=820,height=900");
  if (!w) return;
  w.document.write(doc);
  w.document.close();
  w.focus();
  // Let images (e.g. the phone screenshot) load before printing.
  setTimeout(() => w.print(), 300);
}

function flash(set: (v: string) => void, key: string) {
  set(key);
  setTimeout(() => set(""), 1600);
}

/** One bar for the whole result: copy everything, download, print/PDF, and share a link. */
export function ResultBar({ text, filename, shareUrl, html }: { text: string; filename: string; shareUrl?: () => string; html?: () => string }) {
  const [done, setDone] = useState("");

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      flash(setDone, key);
    } catch {
      /* clipboard blocked: the text is still selectable below */
    }
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: filename });
    a.click();
    URL.revokeObjectURL(url);
    flash(setDone, "download");
  };

  const print = () => {
    const esc = text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    printHtml(
      html
        ? html()
        : `<!doctype html><meta charset="utf-8"><title>${filename}</title><style>body{font:14px/1.6 ui-monospace,Menlo,Consolas,monospace;margin:32px;color:#111}pre{white-space:pre-wrap;word-break:break-word}</style><pre>${esc}</pre>`,
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border border-edge bg-sunk p-2" role="toolbar" aria-label="Result actions">
      <button type="button" className={btn} onClick={() => copy(text, "all")} aria-live="polite">
        {done === "all" ? <Check className="size-3.5 text-success" strokeWidth={3} /> : <Copy className="size-3.5" />} {done === "all" ? "Copied" : "Copy everything"}
      </button>
      <button type="button" className={btn} onClick={download}>
        <Download className="size-3.5" /> {done === "download" ? "Saved" : "Download .txt"}
      </button>
      <button type="button" className={btn} onClick={print}>
        <Printer className="size-3.5" /> Print / PDF
      </button>
      {shareUrl && (
        <button type="button" className={btn} onClick={() => copy(shareUrl(), "share")} aria-live="polite">
          {done === "share" ? <Check className="size-3.5 text-success" strokeWidth={3} /> : <Link2 className="size-3.5" />} {done === "share" ? "Link copied" : "Share link"}
        </button>
      )}
    </div>
  );
}

export function StepHead({ n, title, sub }: { n: number; title: string; sub?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="display grid size-8 shrink-0 place-items-center border border-edge bg-brand text-[15px] text-ink">{n}</span>
      <div>
        <p className="display text-[20px] leading-tight text-ink">{title}</p>
        {sub && <p className="mt-0.5 font-mono text-[12px] text-muted">{sub}</p>}
      </div>
    </div>
  );
}
