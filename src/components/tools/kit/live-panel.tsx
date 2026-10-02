"use client";

import { Check, Copy, Globe, LoaderCircle, Printer } from "lucide-react";
import { useState } from "react";
import { blocksToHtml, blocksToText } from "@/lib/tool-defs/text";
import type { Block, LiveSpec, Values } from "@/lib/tool-defs/types";
import { btn, input, size } from "../../ui";
import { BlockView } from "./blocks";
import { printHtml } from "./result-bar";

const PREPARED_BY = "steinark:prepared-by";
const waiting: Partial<Record<LiveSpec["kind"], string>> = {
  speed: "Loading the page and weighing every image, script and stylesheet, and asking Google for its test and real-visitor data. This can take up to a minute.",
  crawl: "Reading the sitemap, checking up to 10 pages and testing their links. This can take up to a minute.",
  suggest: "Asking Google what people in Nigeria type…",
};

function readName() {
  try {
    return localStorage.getItem(PREPARED_BY) ?? "";
  } catch {
    return "";
  }
}

/**
 * Runs a live check against a real website (via /api/tools/analyze) and shows the result.
 * For checklists, `onChecks` receives the items the scan could verify so they tick themselves.
 */
export function LivePanel({ spec, values, onChecks }: { spec: LiveSpec; values: Values; onChecks?: (c: Record<string, boolean>) => void }) {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [checked, setChecked] = useState("");
  const [by, setBy] = useState(readName);
  const [copied, setCopied] = useState(false);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    setState("running");
    setError("");
    try {
      const res = await fetch("/api/tools/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: spec.kind, url, ...(spec.payload ? spec.payload(values) : {}) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "The check failed. Try again.");
      const out = spec.render(data, values);
      setBlocks(out.blocks);
      setChecked(typeof data.url === "string" ? data.url : typeof data.start === "string" ? data.start : url);
      if (out.checks && onChecks) onChecks(out.checks);
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "The check failed.");
      setState("error");
    }
  }

  const saveName = (x: string) => {
    setBy(x);
    try {
      localStorage.setItem(PREPARED_BY, x);
    } catch {
      /* storage blocked */
    }
  };
  const report = () => printHtml(blocksToHtml(blocks, { title: spec.title, subtitle: checked || undefined, preparedBy: by.trim() || undefined }));
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(blocksToText(blocks));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked */
    }
  };
  const small = "inline-flex items-center gap-1.5 border border-edge bg-card px-2.5 py-1.5 font-mono text-[11px] font-bold text-ink hover:bg-wash";

  return (
    <section className="mb-8 border border-edge bg-brand-wash p-5">
      <p className="flex items-center gap-2 font-mono text-[12px] font-bold text-brand-text">
        <Globe className="size-4" aria-hidden /> Live check
      </p>
      <h2 className="display mt-1 text-[22px] text-ink">{spec.title}</h2>
      <form onSubmit={run} className="mt-4 flex flex-col gap-3 sm:flex-row">
        {spec.url && (
          <label className="flex-1">
            <span className="sr-only">Website address</span>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              inputMode="url"
              autoComplete="url"
              placeholder={spec.url.placeholder}
              className={input}
            />
          </label>
        )}
        <button type="submit" disabled={state === "running"} className={`${btn.primary} ${size.md} shrink-0`}>
          {state === "running" ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden /> Checking…
            </>
          ) : (
            spec.button
          )}
        </button>
      </form>
      {(spec.url?.hint ?? spec.note) && <p className="mt-2 font-mono text-[12px] text-muted">{spec.url?.hint ?? spec.note}</p>}
      {state === "running" && waiting[spec.kind] && <p className="mt-3 font-mono text-[12px] text-muted">{waiting[spec.kind]}</p>}
      {state === "error" && (
        <p className="mt-3 border border-edge bg-danger/10 px-3 py-2 text-[14px] text-danger" role="alert">
          {error}
        </p>
      )}
      {state === "done" && (
        <div className="mt-5 space-y-4" aria-live="polite">
          <div className="flex flex-wrap items-end gap-2 border border-edge bg-sunk p-2">
            <label className="min-w-[180px] flex-1">
              <span className="block font-mono text-[11px] font-bold text-muted">Report prepared by (optional)</span>
              <input value={by} onChange={(e) => saveName(e.target.value)} placeholder="Your name or business" className={`${input} mt-1 h-9 text-[14px]`} />
            </label>
            <button type="button" onClick={report} className={small}>
              <Printer className="size-3.5" aria-hidden /> Print report / PDF
            </button>
            <button type="button" onClick={copy} className={small} aria-live="polite">
              {copied ? <Check className="size-3.5 text-success" strokeWidth={3} aria-hidden /> : <Copy className="size-3.5" aria-hidden />} {copied ? "Copied" : "Copy results"}
            </button>
          </div>
          {blocks.map((b, i) => (
            <BlockView key={i} b={b} />
          ))}
        </div>
      )}
    </section>
  );
}
