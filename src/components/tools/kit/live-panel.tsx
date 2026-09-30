"use client";

import { Globe, LoaderCircle } from "lucide-react";
import { useState } from "react";
import type { Block, LiveSpec, Values } from "@/lib/tool-defs/types";
import { btn, input, size } from "../../ui";
import { BlockView } from "./blocks";

/**
 * Runs a live check against a real website (via /api/tools/analyze) and shows the result.
 * For checklists, `onChecks` receives the items the scan could verify so they tick themselves.
 */
export function LivePanel({ spec, values, onChecks }: { spec: LiveSpec; values: Values; onChecks?: (c: Record<string, boolean>) => void }) {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);

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
      if (out.checks && onChecks) onChecks(out.checks);
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "The check failed.");
      setState("error");
    }
  }

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
      {spec.url?.hint && <p className="mt-2 font-mono text-[12px] text-muted">{spec.url.hint}</p>}
      {state === "running" && spec.kind === "speed" && <p className="mt-3 font-mono text-[12px] text-muted">Loading the page and weighing every image, script and stylesheet, this can take up to a minute.</p>}
      {state === "error" && (
        <p className="mt-3 border border-edge bg-danger/10 px-3 py-2 text-[14px] text-danger" role="alert">
          {error}
        </p>
      )}
      {state === "done" && (
        <div className="mt-5 space-y-4" aria-live="polite">
          {blocks.map((b, i) => (
            <BlockView key={i} b={b} />
          ))}
        </div>
      )}
    </section>
  );
}
