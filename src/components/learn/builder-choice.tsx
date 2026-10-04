"use client";

import { Bot, Gift, MessagesSquare } from "lucide-react";
import { useSyncExternalStore } from "react";
import { Rich } from "./rich";

/** The three ways to build in this course. Antigravity (free) is the default. */
export type Builder = "antigravity" | "claude-code" | "chat";
type Step = { title: string; detail: string };

const KEY = "prostatis:builder";
const listeners = new Set<() => void>();

function read(): Builder {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "claude-code" || v === "chat") return v;
  } catch {
    /* storage blocked: use the default */
  }
  return "antigravity";
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function choose(b: Builder) {
  try {
    localStorage.setItem(KEY, b);
  } catch {
    /* ignore */
  }
  // Every builder box on the page follows the learner's choice.
  listeners.forEach((l) => l());
}

const tabs: { id: Builder; label: string; tag: string; note: string; icon: typeof Bot }[] = [
  { id: "antigravity", label: "Antigravity", tag: "free · default", note: "The default: a free coding agent from Google that writes the files in your folder for you.", icon: Gift },
  { id: "claude-code", label: "Claude Code", tag: "paid", note: "Only if you can afford Claude Pro (about $20 a month). Every lesson works without it.", icon: Bot },
  { id: "chat", label: "Free chat", tag: "backup", note: "For older laptops, or when Antigravity's weekly allowance runs out: a free AI chat plus copy and paste.", icon: MessagesSquare },
];

/** Steps that differ by builder. The learner picks once; every lesson remembers it. */
export function BuilderSteps({ title, paths }: { title: string; paths: Record<Builder, Step[]> }) {
  const active = useSyncExternalStore(subscribe, read, () => "antigravity" as Builder);
  const tab = tabs.find((t) => t.id === active)!;
  return (
    <div className="my-6 border border-edge bg-card">
      <div className="border-b border-edge bg-sunk px-3 pt-3">
        <p className="label text-ink">{title}</p>
        <div role="tablist" aria-label="Choose how you build" className="mt-2 grid grid-cols-3 gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              onClick={() => choose(t.id)}
              className={"flex min-h-[48px] flex-col items-center justify-center border border-b-0 border-edge px-1 py-1.5 text-center " + (active === t.id ? "bg-card text-ink" : "bg-wash text-muted hover:text-ink")}
            >
              <span className="inline-flex items-center gap-1 text-[13px] font-semibold leading-tight"><t.icon className="hidden size-3.5 shrink-0 sm:block" aria-hidden /> {t.label}</span>
              <span className={"mt-0.5 text-[11px] leading-none " + (t.id === "antigravity" ? "font-semibold text-brand-text" : "")}>{t.tag}</span>
            </button>
          ))}
        </div>
      </div>
      <div role="tabpanel" className="px-4 py-4">
        <p className="text-[13.5px] text-muted">{tab.note}</p>
        <ol className="mt-3 space-y-3">
          {paths[active].map((s, n) => (
            <li key={s.title} className="flex gap-3">
              <span className="display grid size-7 shrink-0 place-items-center border border-edge bg-brand text-[14px] text-ink">{n + 1}</span>
              <div className="pt-0.5">
                <p className="font-bold text-ink"><Rich text={s.title} /></p>
                <p className="mt-0.5 text-[15px] leading-relaxed text-muted"><Rich text={s.detail} /></p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
