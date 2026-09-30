"use client";

import { Check, Copy, Download } from "lucide-react";
import { useState, type ReactNode } from "react";
import { input } from "./ui";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[14px] font-semibold text-ink">{label}</span>
      {hint && <span className="mt-0.5 block text-[13px] text-muted">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={input + " " + (props.className ?? "")} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={3} {...props} className={input + " resize-y " + (props.className ?? "")} />;
}

export function Select({
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options: readonly (string | { value: string; label: string })[] }) {
  return (
    <select {...props} className={input + " " + (props.className ?? "")}>
      {options.map((o) => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        return (
          <option key={v} value={v}>
            {l}
          </option>
        );
      })}
    </select>
  );
}

const pill =
  "inline-flex h-8 shrink-0 items-center gap-1.5 border-2 border-edge bg-card px-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink transition-colors hover:bg-wash";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-live="polite"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard blocked: user can still select the text */
        }
      }}
      className={pill}
    >
      {copied ? <Check className="size-3.5 text-success" strokeWidth={3} aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      {copied ? "Copied" : label}
    </button>
  );
}

export function DownloadButton({ text, filename, label = "Download" }: { text: string; filename: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      }}
      className={pill}
    >
      <Download className="size-3.5" aria-hidden />
      {label}
    </button>
  );
}

export function Output({ title, text, filename }: { title: string; text: string; filename?: string }) {
  return (
    <div className="overflow-hidden border-2 border-edge bg-card">
      <div className="flex items-center justify-between gap-2 border-b-2 border-edge px-4 py-2.5">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{title}</span>
        <div className="flex gap-2">
          {filename && <DownloadButton text={text} filename={filename} />}
          <CopyButton text={text} />
        </div>
      </div>
      <pre className="max-h-[560px] overflow-auto whitespace-pre-wrap break-words bg-sunk p-4 font-mono text-[13px] leading-relaxed text-ink">
        {text}
      </pre>
    </div>
  );
}

export function ToolLayout({ form, output }: { form: ReactNode; output: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="space-y-4 border-2 border-edge bg-card p-5 shadow-[5px_5px_0_var(--edge)]">{form}</div>
      <div className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">{output}</div>
    </div>
  );
}

// Deterministic pick so SSR and client agree; `seed` changes on "shuffle".
export function pick<T>(arr: readonly T[], seed: number, offset = 0): T {
  return arr[Math.abs(seed * 31 + offset * 17) % arr.length];
}
