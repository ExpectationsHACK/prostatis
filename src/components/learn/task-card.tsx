"use client";

import { Check, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { completeTask } from "@/app/learn/actions";
import type { ActionResult } from "@/app/learn/actions";
import { btn, size } from "@/components/ui";
import { Celebrate } from "./celebrate";

/** The practical task's done-checklist. Every box must be ticked before it can be confirmed. */
export function TaskCheck({ slug, day, done: items, confirmed }: { slug: string; day: number; done: string[]; confirmed: boolean }) {
  const router = useRouter();
  const [ticked, setTicked] = useState<boolean[]>(() => items.map(() => confirmed));
  const [gained, setGained] = useState<number | null>(null);
  const [result, setResult] = useState<Extract<ActionResult, { ok: true }> | null>(null);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const all = ticked.every(Boolean);

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
        <p className="label mt-4 inline-flex items-center gap-1.5 border-2 border-edge bg-[#e3f5e9] px-2 py-1 text-ink">
          <Check className="size-3.5 text-success" strokeWidth={3} aria-hidden /> Task confirmed
          {gained ? ` · +${gained} XP` : ""}
        </p>
      ) : (
        <button
          type="button"
          disabled={!all || pending}
          className={`${btn.accent} ${size.md} mt-4 disabled:opacity-50`}
          onClick={() =>
            start(async () => {
              setError("");
              const r = await completeTask(slug, day);
              if (!r.ok) return setError(r.error);
              setGained(r.xpGained);
              setResult(r);
              router.refresh();
            })
          }
        >
          <Sparkles className="size-4" aria-hidden /> {pending ? "Saving…" : "I've done the task"}
        </button>
      )}
      {error && <p className="mt-3 font-mono text-[13px] text-danger" role="alert">{error}</p>}
      {result && (result.completed || result.levelUp || result.newBadges.length > 0) && (
        <Celebrate title={result.completed ? "Lesson complete!" : "Mission done!"} xp={result.xpGained} levelUp={result.levelUp} badges={result.newBadges} />
      )}
    </div>
  );
}
