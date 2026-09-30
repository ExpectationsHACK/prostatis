/**
 * Declarative tool definitions. Logic is pure (no DOM, no network) so every tool can be
 * unit-tested and runs instantly on a phone. The UI kit renders fields and output blocks.
 */

export type Field =
  | { key: string; label: string; type: "text"; default: string; placeholder?: string; hint?: string; half?: boolean }
  | { key: string; label: string; type: "textarea"; default: string; placeholder?: string; hint?: string; rows?: number }
  | { key: string; label: string; type: "number"; default: number; min?: number; max?: number; step?: number; hint?: string; half?: boolean; suffix?: string }
  | { key: string; label: string; type: "select"; default: string; options: { value: string; label: string }[]; hint?: string; half?: boolean }
  | { key: string; label: string; type: "multi"; default: string[]; options: { value: string; label: string }[]; hint?: string }
  | { key: string; label: string; type: "toggle"; default: boolean; hint?: string }
  | { key: string; label: string; type: "color"; default: string; hint?: string; half?: boolean };

export type Values = Record<string, string | number | boolean | string[]>;

export type Block =
  | { type: "text"; title: string; text: string; filename?: string }
  | { type: "list"; title: string; items: string[] }
  | { type: "table"; title: string; columns: string[]; rows: string[][] }
  | { type: "stats"; items: { label: string; value: string; sub?: string }[] }
  | { type: "swatches"; title: string; colors: { name: string; hex: string; ink: string; contrast: string }[] }
  | { type: "serp"; title: string; pageTitle: string; url: string; description: string }
  | { type: "wireframe"; title: string; sections: string[] }
  | { type: "fonts"; title: string; pairs: { heading: string; body: string; note: string }[] }
  | { type: "flow"; title: string; steps: { label: string; detail?: string }[] }
  | { type: "checks"; title: string; items: { ok: boolean; text: string; fix?: string }[] }
  | { type: "notice"; tone: "info" | "warn" | "good"; text: string }
  | { type: "image"; title: string; src: string; alt: string };

/** A live check that runs against a real website through /api/tools/analyze. */
export type LiveSpec = {
  kind: "page" | "speed" | "domain" | "uptime" | "scrape";
  title: string;
  button: string;
  /** Show a URL box? (false when the payload comes from the form, e.g. domain names) */
  url?: { placeholder: string; hint?: string };
  payload?: (v: Values) => Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (data: any, v: Values) => { blocks: Block[]; checks?: Record<string, boolean> };
};

export type GeneratorDef = {
  kind: "generator";
  fields: Field[];
  generate: (v: Values) => Block[];
  /** Short line shown above the form: what to do. */
  intro?: string;
  live?: LiveSpec;
  /** One-tap example inputs for different kinds of business; merged over the defaults. */
  examples?: { label: string; values: Values }[];
};

export type ChecklistDef = {
  kind: "checklist";
  intro?: string;
  groups: { title: string; checks: { id: string; text: string; fix: string; weight: 1 | 2 | 3 }[] }[];
  grades: [number, string][]; // [minPct, label], highest first
  live?: LiveSpec;
};

export type ToolDef = GeneratorDef | ChecklistDef;

// ---------- helpers shared by definitions ----------

export const s = (v: Values, k: string) => String(v[k] ?? "").trim();
export const n = (v: Values, k: string) => {
  const x = Number(v[k]);
  return Number.isFinite(x) ? x : 0;
};
export const arr = (v: Values, k: string) => (Array.isArray(v[k]) ? (v[k] as string[]) : []);
export const on = (v: Values, k: string) => v[k] === true;
export const or = (x: string, fallback: string) => (x ? x : fallback);
export const lines = (x: string) =>
  x
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
export const opts = (...xs: string[]) => xs.map((x) => ({ value: x, label: x }));
export const slugify = (x: string) =>
  x
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export const naira = (x: number) => "₦" + Math.round(x).toLocaleString("en-NG");
export const usd = (x: number) => "$" + Math.round(x).toLocaleString("en-US");

export function defaults(fields: Field[]): Values {
  return Object.fromEntries(fields.map((f) => [f.key, f.default]));
}

