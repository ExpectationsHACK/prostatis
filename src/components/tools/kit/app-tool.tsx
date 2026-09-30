"use client";

import { Eraser, Link2, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { decodeValues, encodeValues } from "@/lib/tool-defs/text";
import { ResultBar, StepHead } from "./result-bar";

type Source = "link" | "saved" | "example";

function sameShape(a: unknown, b: unknown) {
  return Array.isArray(a) ? Array.isArray(b) : typeof a === typeof b;
}

/** Keep only keys the tool knows, with the same type, saved data and shared links can't break it. */
function sanitize<T extends Record<string, unknown>>(base: T, raw: unknown): T {
  const out = { ...base };
  if (!raw || typeof raw !== "object") return out;
  for (const k of Object.keys(base)) {
    const x = (raw as Record<string, unknown>)[k];
    if (x !== undefined && sameShape(base[k], x)) (out as Record<string, unknown>)[k] = x;
  }
  return out;
}

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * State for a hand-built tool: starts from a shared link, then this device's last inputs,
 * then the example, and autosaves as the user types. Client-only (tools load without SSR).
 */
export function useToolState<T extends Record<string, unknown>>(slug: string, initial: T) {
  const [start] = useState<{ v: T; from: Source }>(() => {
    const q = new URLSearchParams(window.location.search).get("in");
    const shared = q ? decodeValues<unknown>(q) : null;
    if (shared) return { v: sanitize(initial, shared), from: "link" };
    const saved = read(`bwac:tool:${slug}`);
    if (saved) {
      try {
        return { v: sanitize(initial, JSON.parse(saved)), from: "saved" };
      } catch {
        /* fall through */
      }
    }
    return { v: initial, from: "example" };
  });
  const [f, setState] = useState<T>(start.v);
  const [source, setSource] = useState<Source>(start.from);

  useEffect(() => {
    try {
      localStorage.setItem(`bwac:tool:${slug}`, JSON.stringify(f));
    } catch {
      /* storage blocked */
    }
  }, [slug, f]);

  return {
    f,
    source,
    /** Update one or more fields (marks the inputs as the user's own). */
    patch: (p: Partial<T>) => {
      setState((prev) => ({ ...prev, ...p }));
      setSource("saved");
    },
    load: (v: Partial<T>, from: Source = "example") => {
      setState(sanitize(initial, { ...initial, ...v }));
      setSource(from);
    },
    shareUrl: () => `${window.location.origin}${window.location.pathname}?in=${encodeValues(f)}`,
  };
}

/** The shared app frame for hand-built tools: steps, examples, reset, and the result bar. */
export function AppToolLayout({
  slug,
  source,
  examples,
  onExample,
  onReset,
  onBlank,
  form,
  output,
  text,
  shareUrl,
}: {
  slug: string;
  source: Source;
  examples?: { label: string }[];
  onExample?: (i: number) => void;
  onReset: () => void;
  onBlank?: () => void;
  form: ReactNode;
  output: ReactNode;
  text: string;
  /** Omit for tools whose inputs are private (e.g. bank details), links end up in history and logs. */
  shareUrl?: () => string;
}) {
  const note = source === "link" ? "Loaded from a shared link" : source === "saved" ? "Saved on this device as you type" : "Showing an example: replace it with your own details";
  const small = "inline-flex items-center gap-1.5 font-mono text-[12px] font-bold text-muted hover:text-ink";
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="space-y-4 border border-edge bg-card p-5">
        <StepHead n={1} title="Fill in your details" sub={note} />
        {examples && examples.length > 0 && onExample && (
          <div className="border border-dashed border-line p-3">
            <p className="label flex items-center gap-1.5 text-muted">
              <Sparkles className="size-3.5" aria-hidden /> Try an example
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {examples.map((ex, i) => (
                <button
                  key={ex.label}
                  type="button"
                  onClick={() => onExample(i)}
                  className="border border-edge bg-paper px-2.5 py-1 font-mono text-[11.5px] font-bold text-ink transition-colors hover:bg-brand"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>
        )}
        {form}
        <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-dashed border-line pt-3">
          {onBlank && (
            <button type="button" onClick={onBlank} className={small}>
              <Eraser className="size-3.5" aria-hidden /> Start blank
            </button>
          )}
          <button type="button" onClick={onReset} className={small}>
            <RotateCcw className="size-3.5" aria-hidden /> Reset example
          </button>
        </div>
      </div>
      <div className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <StepHead n={2} title="Your result" sub="Updates as you type. Copy one part, or everything at once." />
        <ResultBar text={text} filename={`${slug}.txt`} shareUrl={shareUrl} />
        {output}
        {shareUrl && (
          <p className="flex items-start gap-1.5 font-mono text-[11.5px] text-muted">
            <Link2 className="mt-0.5 size-3.5 shrink-0" aria-hidden /> “Share link” copies a link that reopens this tool with your inputs. Anyone with the link can see them, don't share private details this way.
          </p>
        )}
      </div>
    </div>
  );
}
