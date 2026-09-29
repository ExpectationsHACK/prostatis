"use client";

import { RotateCcw } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { defaults, type ChecklistDef, type Field as FieldDef, type GeneratorDef, type ToolDef, type Values } from "@/lib/tool-defs/types";
import { Field, Output, Select, TextArea, TextInput } from "../../tool-ui";
import { BlockView } from "./blocks";
import { LivePanel } from "./live-panel";

function FieldInput({ f, value, set }: { f: FieldDef; value: Values[string]; set: (v: Values[string]) => void }) {
  switch (f.type) {
    case "text":
      return <TextInput value={String(value)} placeholder={f.placeholder} onChange={(e) => set(e.target.value)} />;
    case "textarea":
      return <TextArea rows={f.rows ?? 4} value={String(value)} placeholder={f.placeholder} onChange={(e) => set(e.target.value)} />;
    case "number":
      return (
        <div className="flex items-center gap-2">
          <TextInput
            type="number"
            inputMode="decimal"
            min={f.min}
            max={f.max}
            step={f.step ?? 1}
            value={String(value)}
            onChange={(e) => set(e.target.value === "" ? 0 : Number(e.target.value))}
          />
          {f.suffix && <span className="shrink-0 font-mono text-[12px] text-muted">{f.suffix}</span>}
        </div>
      );
    case "select":
      return <Select value={String(value)} onChange={(e) => set(e.target.value)} options={f.options} />;
    case "color":
      return (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={String(value)}
            onChange={(e) => set(e.target.value)}
            className="h-11 w-14 shrink-0 cursor-pointer border-2 border-edge bg-card p-1"
            aria-label={f.label}
          />
          <TextInput value={String(value)} onChange={(e) => set(e.target.value)} />
        </div>
      );
    case "toggle":
      return (
        <button
          type="button"
          role="switch"
          aria-checked={value === true}
          onClick={() => set(!(value === true))}
          className={"flex h-8 w-14 items-center border-2 border-edge px-0.5 transition-colors " + (value === true ? "bg-brand" : "bg-wash")}
        >
          <span className={"size-6 border-2 border-edge bg-card transition-transform " + (value === true ? "translate-x-6" : "")} />
        </button>
      );
    case "multi": {
      const cur = Array.isArray(value) ? (value as string[]) : [];
      return (
        <div className="flex flex-wrap gap-2">
          {f.options.map((o) => {
            const onNow = cur.includes(o.value);
            return (
              <button
                key={o.value}
                type="button"
                aria-pressed={onNow}
                onClick={() => set(onNow ? cur.filter((x) => x !== o.value) : [...cur, o.value])}
                className={
                  "border-2 border-edge px-2.5 py-1 text-[13px] font-semibold transition-colors " +
                  (onNow ? "bg-ink text-paper" : "bg-card text-ink hover:bg-wash")
                }
              >
                {o.label}
              </button>
            );
          })}
        </div>
      );
    }
  }
}

function GeneratorTool({ def }: { def: GeneratorDef }) {
  const [v, setV] = useState<Values>(() => defaults(def.fields));
  // Keep typing responsive on slow phones: outputs render from a deferred copy.
  const deferred = useDeferredValue(v);
  const blocks = useMemo(() => {
    try {
      return def.generate(deferred);
    } catch (e) {
      console.error(e);
      return [{ type: "notice" as const, tone: "warn" as const, text: "Something in the inputs couldn't be processed. Check the fields and try again." }];
    }
  }, [def, deferred]);

  const halfPairs: FieldDef[][] = [];
  for (const f of def.fields) {
    const last = halfPairs[halfPairs.length - 1];
    const half = "half" in f && f.half;
    if (half && last && last.length === 1 && "half" in last[0] && last[0].half) last.push(f);
    else halfPairs.push([f]);
  }

  return (
    <>
      {def.live && <LivePanel spec={def.live} values={v} />}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="space-y-4 border-2 border-edge bg-card p-5 shadow-[5px_5px_0_var(--edge)]">
          {def.intro && <p className="text-[14px] text-muted">{def.intro}</p>}
          {halfPairs.map((row, i) => (
            <div key={i} className={row.length === 2 ? "grid grid-cols-2 gap-3" : ""}>
              {row.map((f) => (
                <Field key={f.key} label={f.label} hint={f.hint}>
                  <FieldInput f={f} value={v[f.key]} set={(x) => setV((prev) => ({ ...prev, [f.key]: x }))} />
                </Field>
              ))}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setV(defaults(def.fields))}
            className="inline-flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-wider text-muted hover:text-ink"
          >
            <RotateCcw className="size-3.5" aria-hidden /> Reset example
          </button>
        </div>
        <div className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
          {blocks.map((b, i) => (
            <BlockView key={i} b={b} />
          ))}
        </div>
      </div>
    </>
  );
}

function ChecklistTool({ def }: { def: ChecklistDef }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const all = def.groups.flatMap((g) => g.checks);
  const max = all.reduce((x, c) => x + c.weight, 0);
  const score = all.reduce((x, c) => x + (done[c.id] ? c.weight : 0), 0);
  const pct = Math.round((score / max) * 100);
  const grade = def.grades.find(([min]) => pct >= min)?.[1] ?? def.grades[def.grades.length - 1][1];
  const impact = { 1: "Low", 2: "Medium", 3: "High" } as const;
  const todo = all.filter((c) => !done[c.id]).sort((a, b) => b.weight - a.weight);
  const report = `Score: ${pct}/100 — ${grade}\n\nFix these, most important first:\n${
    todo.map((c, i) => `${i + 1}. ${c.text} (${impact[c.weight].toLowerCase()} impact)\n   → ${c.fix}`).join("\n") || "Nothing — every check passes."
  }`;

  return (
    <>
      {def.live && <LivePanel spec={def.live} values={{}} onChecks={(found) => setDone((prev) => ({ ...prev, ...found }))} />}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div className="space-y-5">
          {def.intro && <p className="text-[14px] text-muted">{def.intro}</p>}
          {def.groups.map((g) => (
            <fieldset key={g.title} className="border-2 border-edge bg-card p-5">
              <legend className="bg-paper px-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-ink">{g.title}</legend>
              <ul className="space-y-3">
                {g.checks.map((c) => (
                  <li key={c.id}>
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={!!done[c.id]}
                        onChange={(e) => setDone({ ...done, [c.id]: e.target.checked })}
                        className="mt-1 size-4 shrink-0 accent-[var(--brand)]"
                      />
                      <span className="text-[15px] text-ink">
                        {c.text}
                        <span
                          className={
                            "ml-2 inline-block px-1.5 py-px align-middle font-mono text-[10px] font-bold uppercase " +
                            (c.weight === 3 ? "bg-brand-wash text-brand-text" : "bg-wash text-muted")
                          }
                        >
                          {impact[c.weight]}
                        </span>
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          ))}
        </div>
        <div className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="border-2 border-edge bg-card p-5 shadow-[5px_5px_0_var(--edge)]">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-muted">Your score</span>
              <span className="display tabular text-[44px] text-ink">{pct}</span>
            </div>
            <div className="mt-2 h-3 border-2 border-edge bg-wash">
              <div className="h-full bg-brand transition-all duration-300" style={{ width: pct + "%" }} />
            </div>
            <p className="mt-2 text-[14px] font-semibold text-ink">{grade}</p>
            <p className="mt-1 font-mono text-[12px] text-muted">
              {all.length - todo.length} of {all.length} done
            </p>
          </div>
          <Output title="Your fix list" text={report} filename="fix-list.txt" />
        </div>
      </div>
    </>
  );
}

export default function DefTool({ def }: { def: ToolDef }) {
  return def.kind === "generator" ? <GeneratorTool def={def} /> : <ChecklistTool def={def} />;
}
