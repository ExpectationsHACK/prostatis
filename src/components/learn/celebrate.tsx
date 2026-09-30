"use client";

import { Award, Sparkles } from "lucide-react";

const bits = Array.from({ length: 18 }, (_, i) => ({
  x: Math.round(Math.cos((i / 18) * Math.PI * 2) * (70 + (i % 3) * 30)),
  y: Math.round(Math.sin((i / 18) * Math.PI * 2) * (50 + (i % 4) * 22)),
  c: ["var(--brand)", "var(--accent)", "#f2c230", "var(--edge)"][i % 4],
  r: (i * 47) % 360,
}));

/**
 * The payoff moment: a burst of paper confetti plus what was earned. The burst is purely
 * decorative and is skipped for people who prefer reduced motion.
 */
export function Celebrate({ title, xp, levelUp, badges }: { title: string; xp: number; levelUp?: { level: number; name: string }; badges: { name: string; desc: string }[] }) {
  return (
    <div role="status" className="relative mt-5 overflow-hidden border border-edge bg-brand p-5 text-ink">
      <div className="pointer-events-none absolute left-1/2 top-1/2 motion-reduce:hidden" aria-hidden>
        {bits.map((b, i) => (
          <span
            key={i}
            className="confetti absolute block size-2.5 border border-edge"
            style={{ background: b.c, ["--x" as string]: `${b.x}px`, ["--y" as string]: `${b.y}px`, ["--r" as string]: `${b.r}deg`, animationDelay: `${(i % 6) * 30}ms` }}
          />
        ))}
      </div>
      <p className="label flex items-center gap-1.5"><Sparkles className="size-4" aria-hidden /> Nice work!</p>
      <p className="display mt-1 text-[28px] leading-tight">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {xp > 0 && <span className="label border border-edge bg-paper px-2 py-1">+{xp} XP</span>}
        {levelUp && <span className="label border border-edge bg-ink px-2 py-1 text-paper">Level up! → Level {levelUp.level} · {levelUp.name}</span>}
        {badges.map((b) => (
          <span key={b.name} className="label inline-flex items-center gap-1.5 border border-edge bg-[#f2c230] px-2 py-1" title={b.desc}>
            <Award className="size-3.5" aria-hidden /> New badge: {b.name}
          </span>
        ))}
      </div>
    </div>
  );
}
