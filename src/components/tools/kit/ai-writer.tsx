"use client";

import { LoaderCircle, ShieldCheck, Sparkles } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { aiSpecs, type AiResult } from "@/lib/tool-defs/ai";
import type { Field, Values } from "@/lib/tool-defs/types";
import { btn, size } from "../../ui";
import { BlockView } from "./blocks";

/** Whether the site has AI writing switched on (set by the tool page on the server). */
export const AiEnabled = createContext(false);

/**
 * "Write it with AI": sends this tool's inputs to /api/tools/ai and shows the tailored
 * result under the template one. Only rendered for tools that have an AI spec.
 */
export function AiWriter({ slug, values }: { slug: string; values: Values; fields?: Field[] }) {
  const enabled = useContext(AiEnabled);
  const [state, setState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [out, setOut] = useState<(AiResult & { flags: string[] }) | null>(null);
  if (!enabled || !aiSpecs[slug]) return null;

  async function run() {
    setState("running");
    setError("");
    try {
      const res = await fetch("/api/tools/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, values }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "The AI didn't answer. Try again.");
      setOut(data);
      setState("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "The AI didn't answer.");
      setState("error");
    }
  }

  return (
    <section className="border border-edge bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 font-bold text-ink">
            <Sparkles className="size-4 text-brand-text" aria-hidden /> Write it with AI, free
          </p>
          <p className="mt-0.5 text-[13px] text-muted">Tailored to the details you typed. It never invents reviews, numbers or awards: anything it doesn't know is left in [brackets] for you.</p>
        </div>
        <button type="button" onClick={run} disabled={state === "running"} className={`${btn.primary} ${size.sm} shrink-0`}>
          {state === "running" ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden /> Writing…
            </>
          ) : state === "done" ? (
            "Write again"
          ) : (
            "Write with AI"
          )}
        </button>
      </div>
      {state === "running" && <p className="mt-3 font-mono text-[12px] text-muted">Writing from your details. This takes 10 to 30 seconds.</p>}
      {state === "error" && (
        <p className="mt-3 border border-edge bg-danger/10 px-3 py-2 text-[14px] text-ink" role="alert">
          {error}
        </p>
      )}
      {state === "done" && out && (
        <div className="mt-4 space-y-3" aria-live="polite">
          {out.flags.length > 0 && (
            <p className="flex items-start gap-2 border border-edge bg-danger/10 px-3 py-2.5 text-[14px] text-ink">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
              <span>
                <strong>Check before you use it:</strong> these weren't in your details, so make sure they're true or remove them: {out.flags.map((f) => `“${f}”`).join(", ")}.
              </span>
            </p>
          )}
          {out.sections.map((s) => (
            <BlockView key={s.title} b={{ type: "list", title: s.title, items: s.items }} />
          ))}
          {out.gaps.length > 0 && <BlockView b={{ type: "list", title: "Add these details for a stronger result", items: out.gaps }} />}
        </div>
      )}
    </section>
  );
}
