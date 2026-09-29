"use client";

import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { btn, size } from "./ui";

/**
 * Substack-style free subscribe: one email field joined to an orange button.
 * Free subscribers get launch news and new tools (stored in the waitlist table);
 * the success state offers the paid upgrade.
 */
export function SubscribeForm({ source = "homepage", buttonLabel = "Subscribe" }: { source?: string; buttonLabel?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong. Please try again.");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="w-full rounded-xl border border-line bg-card p-5 text-left" role="status">
        <p className="flex items-center gap-2 font-semibold text-ink">
          <CircleCheck className="size-5 text-success" aria-hidden />
          You're subscribed
        </p>
        <p className="mt-1.5 text-[15px] text-muted">
          We'll email you new free tools and launch news. Want the full curriculum and the WhatsApp community?
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/pricing" className={`${btn.primary} ${size.md}`}>
            Upgrade to paid
          </Link>
          <Link href="/tools" className={`${btn.secondary} ${size.md}`}>
            Try the free tools
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex overflow-hidden rounded-none border-2 border-brand bg-card focus-within:ring-2 focus-within:ring-brand/25">
        <label htmlFor={`sub-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`sub-${source}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Type your email…"
          className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-[15px] text-ink placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="shrink-0 bg-brand px-5 text-[14px] font-extrabold uppercase tracking-[0.06em] text-brand-ink transition-colors hover:bg-brand-hover disabled:opacity-60"
        >
          {state === "sending" ? "Subscribing…" : buttonLabel}
        </button>
      </div>
      {state === "error" && (
        <p className="mt-2 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
