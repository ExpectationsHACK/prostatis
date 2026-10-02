"use client";

import { Check, Flame, RotateCcw, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { submitFinal, submitQuiz, type ActionResult } from "@/app/learn/actions";
import { btn, size } from "@/components/ui";
import { Celebrate } from "./celebrate";

type Q = { q: string; options: string[] };

/**
 * A multiple-choice assessment. Answers are graded on the server; the browser never sees
 * the answer key. Explanations appear once the learner passes.
 */
export function Quiz({
  slug,
  day,
  questions,
  passMark,
  passed: passedBefore,
  best,
  celebrate,
}: {
  slug: string;
  day?: number; // omitted for the final assessment
  questions: Q[];
  passMark: number;
  passed: boolean;
  best: number;
  /** The lesson's own completion moment. */
  celebrate?: { title: string; proved: string };
}) {
  const router = useRouter();
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [result, setResult] = useState<Extract<ActionResult, { ok: true }> | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const graded = result?.graded;
  const need = Math.ceil(questions.length * passMark);
  const answered = picked.filter((p) => p !== null).length;

  async function submit() {
    setError("");
    setPending(true);
    try {
      const answers = picked.map((p) => p ?? -1);
      const r = day === undefined ? await submitFinal(slug, answers) : await submitQuiz(slug, day, answers);
      if (!r.ok) return setError(r.error);
      setResult(r);
      // Show the marks straight away; the rest of the page catches up in the background.
      startTransition(() => router.refresh());
    } catch {
      setError("Couldn't send your answers. Check your connection and try again: your choices are still here.");
    } finally {
      setPending(false);
    }
  }

  function retry() {
    setPicked(questions.map(() => null));
    setResult(null);
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div id="quiz" className="scroll-mt-24">
      <p className="font-mono text-[13px] text-muted">
        {questions.length} questions · pass mark {need}/{questions.length}
        {best > 0 && ` · your best ${best}/${questions.length}`}
        {passedBefore && " · passed ✓"}
      </p>
      <ol className="mt-5 space-y-5">
        {questions.map((q, i) => {
          const r = graded?.results[i];
          return (
            <li key={i} className={"border bg-card p-4 " + (r ? (r.correct ? "border-success" : "border-danger") : "border-edge")}>
              <fieldset disabled={Boolean(graded) || pending}>
                <legend className="flex gap-2 font-bold leading-snug text-ink">
                  <span className="display text-brand-text">{i + 1}.</span> {q.q}
                </legend>
                <div className="mt-3 grid gap-2">
                  {q.options.map((o, k) => {
                    const chosen = picked[i] === k;
                    const isAnswer = r?.answer === k;
                    return (
                      <label
                        key={k}
                        className={
                          "flex cursor-pointer items-start gap-3 border-2 px-3 py-2.5 text-[15px] leading-snug transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand " +
                          (isAnswer ? "border-success bg-[#e3f5e9]" : chosen ? (r && !r.correct ? "border-danger bg-[#ffe3dc]" : "border-edge bg-brand/25") : "border-line hover:border-edge")
                        }
                      >
                        <input
                          type="radio"
                          name={`q${i}`}
                          className="mt-1 accent-[var(--brand)]"
                          checked={chosen}
                          onChange={() => setPicked((p) => p.map((v, j) => (j === i ? k : v)))}
                        />
                        <span className="text-ink">{o}</span>
                      </label>
                    );
                  })}
                </div>
                {r && (
                  <p className={"mt-3 flex gap-2 font-mono text-[13px] leading-relaxed " + (r.correct ? "text-success" : "text-danger")}>
                    {r.correct ? <Check className="mt-0.5 size-4 shrink-0" strokeWidth={3} /> : <X className="mt-0.5 size-4 shrink-0" strokeWidth={3} />}
                    <span>{r.why ?? (r.correct ? "Correct." : "Not quite: re-read the lesson and try again.")}</span>
                  </p>
                )}
              </fieldset>
            </li>
          );
        })}
      </ol>

      {error && <p className="mt-4 font-mono text-[13px] text-danger" role="alert">{error}</p>}

      {!graded ? (
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button type="button" onClick={submit} disabled={pending || answered < questions.length} className={`${btn.primary} ${size.lg} disabled:opacity-50`}>
            {pending ? "Marking…" : "Submit answers"}
          </button>
          <span className="font-mono text-[13px] text-muted">{answered}/{questions.length} answered</span>
        </div>
      ) : (
        <div role="status" className={"mt-6 border border-edge p-5 " + (graded.passed ? "bg-[#e3f5e9]" : "bg-[#fff4d6]")}>
          <p className="display text-[26px] text-ink">
            {graded.score}/{graded.total}: {graded.passed ? "passed!" : "not yet"}
          </p>
          <p className="mt-1 font-mono text-[13px] text-ink/80">
            {graded.passed
              ? result.completed
                ? "Lesson complete. The next one is unlocked."
                : day === undefined
                  ? "You passed the final assessment."
                  : "Now confirm the practical task below to complete the lesson."
              : `You need ${need}. The questions marked red point to what to re-read.`}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {result.xpGained > 0 && (
              <span className="label inline-flex items-center gap-1.5 border border-edge bg-brand px-2 py-1 text-ink">
                <Sparkles className="size-3.5" aria-hidden /> +{result.xpGained} XP
              </span>
            )}
            <span className="label inline-flex items-center gap-1.5 border border-edge bg-card px-2 py-1 text-ink">
              <Flame className="size-3.5 text-brand-text" aria-hidden /> {result.streak}-day streak
            </span>
          </div>
          {!graded.passed || graded.score < graded.total ? (
            <button type="button" onClick={retry} className={`${btn.secondary} ${size.md} mt-4`}>
              <RotateCcw className="size-4" aria-hidden /> Try again
            </button>
          ) : null}
        </div>
      )}
      {result && (result.completed || result.levelUp || result.newBadges.length > 0) && (
        <Celebrate
          title={day === undefined ? "Final assessment passed!" : result.completed ? (celebrate?.title ?? "Lesson complete!") : "Quiz passed!"}
          proved={result.completed ? celebrate?.proved : undefined}
          xp={result.xpGained}
          levelUp={result.levelUp}
          badges={result.newBadges}
        />
      )}
    </div>
  );
}
