"use client";

import { Eraser, Link2, RotateCcw, Sparkles } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { blocksToHtml, blocksToText, decodeValues, encodeValues } from "@/lib/tool-defs/text";
import { defaults, liveList, type ChecklistDef, type Field as FieldDef, type GeneratorDef, type ToolDef, type Values } from "@/lib/tool-defs/types";
import { Field, Output, Select, TextArea, TextInput } from "../../tool-ui";
import { BlockView } from "./blocks";
import { AiWriter } from "./ai-writer";
import { LivePanel } from "./live-panel";
import { LogoColors } from "./logo-colors";
import { ResultBar, StepHead } from "./result-bar";

const store = {
  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string | null) {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch {
      /* storage blocked: nothing is saved, the tool still works */
    }
  },
};

/** Keep only values whose keys and types match the tool's fields (saved data, links, examples). */
function sanitize(fields: FieldDef[], raw: unknown): Values {
  const base = defaults(fields);
  if (!raw || typeof raw !== "object") return base;
  const r = raw as Record<string, unknown>;
  for (const f of fields) {
    const x = r[f.key];
    if (x === undefined) continue;
    const ok =
      f.type === "multi"
        ? Array.isArray(x) && x.every((y) => typeof y === "string")
        : f.type === "toggle"
          ? typeof x === "boolean"
          : f.type === "number"
            ? typeof x === "number"
            : typeof x === "string";
    if (ok) base[f.key] = x as Values[string];
  }
  return base;
}

/** Inputs to start with: a shared link wins, then this browser's last session, then the example. */
function initial(def: GeneratorDef, slug: string): { v: Values; from: "link" | "saved" | "example" } {
  const q = new URLSearchParams(window.location.search).get("in");
  const shared = q ? decodeValues<Values>(q) : null;
  if (shared) return { v: sanitize(def.fields, shared), from: "link" };
  const saved = store.get(`bwac:tool:${slug}`);
  if (saved) {
    try {
      return { v: sanitize(def.fields, JSON.parse(saved)), from: "saved" };
    } catch {
      /* fall through to the example */
    }
  }
  return { v: defaults(def.fields), from: "example" };
}

function blank(fields: FieldDef[]): Values {
  return Object.fromEntries(fields.map((f) => [f.key, f.type === "text" || f.type === "textarea" ? "" : f.type === "multi" ? [] : f.default]));
}

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
        <div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={String(value)}
              onChange={(e) => set(e.target.value)}
              className="h-11 w-14 shrink-0 cursor-pointer border border-edge bg-card p-1"
              aria-label={f.label}
            />
            <TextInput value={String(value)} onChange={(e) => set(e.target.value)} />
          </div>
          {f.fromImage && <LogoColors onPick={(hex) => set(hex)} />}
        </div>
      );
    case "toggle":
      return (
        <button
          type="button"
          role="switch"
          aria-checked={value === true}
          onClick={() => set(!(value === true))}
          className={"flex h-8 w-14 items-center border border-edge px-0.5 transition-colors " + (value === true ? "bg-brand" : "bg-wash")}
        >
          <span className={"size-6 border border-edge bg-card transition-transform " + (value === true ? "translate-x-6" : "")} />
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

function GeneratorTool({ def, slug, title }: { def: GeneratorDef; slug: string; title: string }) {
  const [start] = useState(() => initial(def, slug));
  const [v, setV] = useState<Values>(start.v);
  const [source, setSource] = useState(start.from);
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
  const text = useMemo(() => blocksToText(blocks), [blocks]);

  // Autosave this browser's inputs so nothing is lost on refresh.
  useEffect(() => {
    store.set(`bwac:tool:${slug}`, JSON.stringify(v));
  }, [slug, v]);

  const load = (next: Values, from: "saved" | "example") => {
    setV(next);
    setSource(from);
  };

  const halfPairs: FieldDef[][] = [];
  for (const f of def.fields) {
    const last = halfPairs[halfPairs.length - 1];
    const half = "half" in f && f.half;
    if (half && last && last.length === 1 && "half" in last[0] && last[0].half) last.push(f);
    else halfPairs.push([f]);
  }

  const shareUrl = () => `${window.location.origin}${window.location.pathname}?in=${encodeValues(v)}`;
  const note =
    source === "link" ? "Loaded from a shared link" : source === "saved" ? "Saved on this device as you type" : "Showing an example: replace it with your own details";
  const small = "inline-flex items-center gap-1.5 font-mono text-[12px] font-bold text-muted hover:text-ink";

  return (
    <>
      {liveList(def.live).map((spec) => (
        <LivePanel key={spec.kind + spec.title} spec={spec} values={v} />
      ))}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="space-y-4 border border-edge bg-card p-5">
          <StepHead n={1} title="Fill in your details" sub={note} />
          {def.intro && <p className="text-[14px] text-muted">{def.intro}</p>}
          {def.examples && def.examples.length > 0 && (
            <div className="border border-dashed border-line p-3">
              <p className="label flex items-center gap-1.5 text-muted">
                <Sparkles className="size-3.5" aria-hidden /> Try an example
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {def.examples.map((ex) => (
                  <button
                    key={ex.label}
                    type="button"
                    onClick={() => load(sanitize(def.fields, ex.values), "example")}
                    className="border border-edge bg-paper px-2.5 py-1 font-mono text-[11.5px] font-bold text-ink transition-colors hover:bg-brand"
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {halfPairs.map((row, i) => (
            <div key={i} className={row.length === 2 ? "grid grid-cols-2 gap-3" : ""}>
              {row.map((f) => (
                <Field key={f.key} label={f.label} hint={f.hint}>
                  <FieldInput
                    f={f}
                    value={v[f.key]}
                    set={(x) => {
                      setV((prev) => ({ ...prev, [f.key]: x }));
                      setSource("saved");
                    }}
                  />
                </Field>
              ))}
            </div>
          ))}
          <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-dashed border-line pt-3">
            <button type="button" onClick={() => load(blank(def.fields), "saved")} className={small}>
              <Eraser className="size-3.5" aria-hidden /> Start blank
            </button>
            <button type="button" onClick={() => load(defaults(def.fields), "example")} className={small}>
              <RotateCcw className="size-3.5" aria-hidden /> Reset example
            </button>
          </div>
        </div>
        <div className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
          <StepHead n={2} title="Your result" sub="Updates as you type. Copy one part, or everything at once." />
          <AiWriter slug={slug} values={v} fields={def.fields} />
          <ResultBar text={text} filename={`${slug}.txt`} shareUrl={shareUrl} html={() => blocksToHtml(blocks, { title })} />
          {blocks.map((b, i) => (
            <BlockView key={i} b={b} />
          ))}
          <p className="flex items-start gap-1.5 font-mono text-[11.5px] text-muted">
            <Link2 className="mt-0.5 size-3.5 shrink-0" aria-hidden /> “Share link” copies a link that reopens this tool with your inputs, handy for a client or teammate. Anyone with the link can see them, so don't share private details this way.
          </p>
        </div>
      </div>
    </>
  );
}

function ChecklistTool({ def, slug, title }: { def: ChecklistDef; slug: string; title: string }) {
  const [done, setDone] = useState<Record<string, boolean>>(() => {
    try {
      const saved: unknown = JSON.parse(store.get(`bwac:check:${slug}`) ?? "{}");
      return saved && typeof saved === "object" ? (saved as Record<string, boolean>) : {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    store.set(`bwac:check:${slug}`, JSON.stringify(done));
  }, [slug, done]);
  const all = def.groups.flatMap((g) => g.checks);
  const max = all.reduce((x, c) => x + c.weight, 0);
  const score = all.reduce((x, c) => x + (done[c.id] ? c.weight : 0), 0);
  const pct = Math.round((score / max) * 100);
  const grade = def.grades.find(([min]) => pct >= min)?.[1] ?? def.grades[def.grades.length - 1][1];
  const impact = { 1: "Low", 2: "Medium", 3: "High" } as const;
  const todo = all.filter((c) => !done[c.id]).sort((a, b) => b.weight - a.weight);
  const report = `Score: ${pct}/100: ${grade}\n\nFix these, most important first:\n${
    todo.map((c, i) => `${i + 1}. ${c.text} (${impact[c.weight].toLowerCase()} impact)\n   → ${c.fix}`).join("\n") || "Nothing: every check passes."
  }`;

  return (
    <>
      {liveList(def.live).map((spec) => (
        <LivePanel key={spec.kind + spec.title} spec={spec} values={{}} onChecks={(found) => setDone((prev) => ({ ...prev, ...found }))} />
      ))}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div className="space-y-5">
          <StepHead n={1} title="Check each item" sub="Your ticks are saved on this device." />
          {def.intro && <p className="text-[14px] text-muted">{def.intro}</p>}
          {def.groups.map((g) => (
            <fieldset key={g.title} className="border border-edge bg-card p-5">
              <legend className="bg-paper px-2 font-mono text-[12px] font-bold text-ink">{g.title}</legend>
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
                            "ml-2 inline-block px-1.5 py-px align-middle font-mono text-[10px] font-bold " +
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
          <StepHead n={2} title="Your score and fix list" sub="Fix from the top: highest impact first." />
          <ResultBar
            text={report}
            filename={`${slug}-fix-list.txt`}
            html={() =>
              blocksToHtml(
                [
                  { type: "stats", items: [{ label: "Score", value: `${pct}/100`, sub: grade }, { label: "Done", value: `${all.length - todo.length} of ${all.length}` }] },
                  { type: "checks", title: "Checklist", items: all.map((c) => ({ ok: !!done[c.id], text: `${c.text} (${impact[c.weight].toLowerCase()} impact)`, fix: c.fix })) },
                ],
                { title },
              )
            }
          />
          <div className="border border-edge bg-card p-5">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[12px] font-bold text-muted">Your score</span>
              <span className="display tabular text-[34px] sm:text-[44px] text-ink">{pct}</span>
            </div>
            <div className="mt-2 h-3 border border-edge bg-wash">
              <div className="h-full bg-brand transition-all duration-300" style={{ width: pct + "%" }} />
            </div>
            <p className="mt-2 text-[14px] font-semibold text-ink">{grade}</p>
            <p className="mt-1 flex items-center justify-between gap-2 font-mono text-[12px] text-muted">
              <span>
                {all.length - todo.length} of {all.length} done
              </span>
              {all.length - todo.length > 0 && (
                <button type="button" onClick={() => setDone({})} className="font-bold hover:text-ink">
                  Clear ticks
                </button>
              )}
            </p>
          </div>
          <Output title="Your fix list" text={report} filename="fix-list.txt" />
        </div>
      </div>
    </>
  );
}

export default function DefTool({ def, slug, title }: { def: ToolDef; slug: string; title: string }) {
  return def.kind === "generator" ? <GeneratorTool def={def} slug={slug} title={title} /> : <ChecklistTool def={def} slug={slug} title={title} />;
}
