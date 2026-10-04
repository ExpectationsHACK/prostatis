import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { AuthArt, type AuthArtKind } from "@/components/art/auth-art";
import { LogoMark } from "@/components/brand";

const panels: Record<AuthArtKind, { eyebrow: string; title: string; points: string[] }> = {
  signin: {
    eyebrow: "Welcome back",
    title: "Your next lesson is waiting.",
    points: ["Your progress, XP and streak are saved", "Lessons open in order as you finish them", "Your certificate lives in your dashboard"],
  },
  signup: {
    eyebrow: "Your first 14 days",
    title: "From sign-up to your first paid website.",
    points: ["Pay once in naira: card, transfer or USSD", "Your first page is live on Day 3, with free tools", "A verified certificate when you finish"],
  },
  reset: {
    eyebrow: "Account help",
    title: "Back in within a minute.",
    points: ["We email you a secure link", "The link works once, then expires", "Your progress stays exactly where it was"],
  },
};

/** Sign-in and sign-up layout: the form on one side, an animated story of what's next on the other. */
export function AuthShell({ title, subtitle, children, art = "signin" }: { title: string; subtitle: string; children: ReactNode; art?: AuthArtKind }) {
  const p = panels[art];
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 sm:py-16 lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:gap-16">
      <div className="mx-auto w-full max-w-[430px]">
        <LogoMark size={44} />
        <h1 className="display mt-5 text-[30px] leading-tight text-ink sm:text-[40px]">{title}</h1>
        <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>

      <aside className="ink-block relative mx-auto w-full max-w-[560px] bg-brand p-5 sm:p-8">
        <p className="label text-ink/75">{p.eyebrow}</p>
        <p className="display mt-2 text-balance text-[22px] leading-tight text-ink sm:text-[32px]">{p.title}</p>
        <div className="mt-6 overflow-hidden rounded-[14px] border-2 border-ink bg-card shadow-[4px_4px_0_var(--ink)]">
          <AuthArt kind={art} />
        </div>
        <ul className="mt-6 space-y-2.5">
          {p.points.map((x) => (
            <li key={x} className="flex items-start gap-2.5 text-[15px] font-medium text-ink">
              <span className="mt-[2px] grid size-5 shrink-0 place-items-center rounded-full border-2 border-ink bg-card">
                <Check className="size-3" strokeWidth={3.5} aria-hidden />
              </span>
              {x}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export function nextParam(v: string | string[] | undefined) {
  const s = typeof v === "string" ? v : "";
  return s.startsWith("/") && !s.startsWith("//") && !s.startsWith("/\\") ? s : "/dashboard";
}
