"use client";

import { Check, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { completeTask } from "@/app/learn/actions";
import type { ActionResult } from "@/app/learn/actions";
import { btn, size } from "@/components/ui";
import { Celebrate } from "./celebrate";

/** The practical task's done-checklist. Every box must be ticked before it can be confirmed. */
export function TaskCheck({ slug, day, done: items, confirmed: savedBefore, celebrate }: { slug: string; day: number; done: string[]; confirmed: boolean; celebrate?: { title: string; proved: string } }) {
  const router = useRouter();
  const [ticked, setTicked] = useState<boolean[]>(() => items.map(() => savedBefore));
  const [gained, setGained] = useState<number | null>(null);
  const [result, setResult] = useState<Extract<ActionResult, { ok: true }> | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [savedNow, setSavedNow] = useState(false);
  const confirmed = savedBefore || savedNow;
  const all = ticked.every(Boolean);

  async function confirm() {
    setPending(true);
    setError("");
    try {
      const r = await completeTask(slug, day);
      if (!r.ok) return setError(r.error);
      setGained(r.xpGained);
      setResult(r);
      setSavedNow(true);
      // Refresh the rest of the page (progress, next steps) in the background: the button
      // shows "confirmed" as soon as the save succeeds, even on a slow connection.
      startTransition(() => router.refresh());
    } catch {
      setError("Couldn't save. Check your connection and try again: your ticks are still here.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <p className="label text-ink">Done when</p>
      <ul className="mt-2 space-y-2">
        {items.map((d, i) => (
          <li key={d}>
            <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-snug text-ink">
              <input
                type="checkbox"
                className="mt-0.5 size-4 accent-[var(--success)]"
                checked={ticked[i]}
                disabled={confirmed || pending}
                onChange={(e) => setTicked((t) => t.map((v, j) => (j === i ? e.target.checked : v)))}
              />
              <span className={ticked[i] ? "line-through decoration-success/60" : ""}>{d}</span>
            </label>
          </li>
        ))}
      </ul>
      {confirmed ? (
        <p className="label mt-4 inline-flex items-center gap-1.5 border border-edge bg-[#e3f5e9] px-2 py-1 text-ink">
          <Check className="size-3.5 text-success" strokeWidth={3} aria-hidden /> Task confirmed
          {gained ? ` · +${gained} XP` : ""}
        </p>
      ) : (
        <button
          type="button"
          disabled={!all || pending}
          className={`${btn.accent} ${size.md} mt-4 disabled:opacity-50`}
          onClick={confirm}
        >
          <Sparkles className="size-4" aria-hidden /> {pending ? "Saving…" : "I've done the task"}
        </button>
      )}
      {error && <p className="mt-3 font-mono text-[13px] text-danger" role="alert">{error}</p>}
      {result && (result.completed || result.levelUp || result.newBadges.length > 0) && (
        <Celebrate title={result.completed ? (celebrate?.title ?? "Lesson complete!") : "Mission done!"} proved={result.completed ? celebrate?.proved : undefined} xp={result.xpGained} levelUp={result.levelUp} badges={result.newBadges} />
      )}
    </div>
  );
}
