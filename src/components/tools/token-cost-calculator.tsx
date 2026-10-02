"use client";

import { DEFAULT_NGN_PER_USD, modelPrices } from "@/lib/models";
import { formatNgn, formatUsd } from "@/lib/site";
import { AppToolLayout, useToolState } from "./kit/app-tool";
import { RateHint } from "./kit/live-rate";
import { Field, Select, TextInput } from "../tool-ui";

const presets = [
  { value: "custom", label: "Custom", inT: 0, outT: 0, perDay: 0 },
  { value: "chatbot", label: "Customer-service chatbot (WhatsApp/web)", inT: 1500, outT: 300, perDay: 200 },
  { value: "copy", label: "Blog / product copy writer", inT: 800, outT: 1500, perDay: 20 },
  { value: "agent", label: "Coding agent session", inT: 60000, outT: 8000, perDay: 15 },
  { value: "extract", label: "Receipt data extraction", inT: 2500, outT: 250, perDay: 300 },
];

const num = (s: string) => Math.max(0, Number(s.replace(/,/g, "")) || 0);

const initial = { preset: "chatbot", inT: "1500", outT: "300", perDay: "200", days: "30", rate: String(DEFAULT_NGN_PER_USD), modelId: "claude-sonnet-5-5", margin: "30" };
const examples = [
  { label: "Salon WhatsApp bot", values: { ...initial, preset: "chatbot", perDay: "80", modelId: "claude-haiku-4-5" } },
  { label: "Busy store chatbot", values: { ...initial, preset: "chatbot", perDay: "600", modelId: "claude-sonnet-5-5" } },
  { label: "Product descriptions", values: { ...initial, preset: "copy", inT: "800", outT: "1500", perDay: "20", days: "22" } },
];

export default function TokenCostCalculator() {
  const { f, patch, load, source, shareUrl } = useToolState("token-cost-calculator", initial);

  const applyPreset = (v: string) => {
    const p = presets.find((x) => x.value === v);
    patch(p && v !== "custom" ? { preset: v, inT: String(p.inT), outT: String(p.outT), perDay: String(p.perDay) } : { preset: v });
  };

  const monthlyReq = num(f.perDay) * num(f.days);
  const fx = num(f.rate);
  const rows = modelPrices.map((m) => {
    const perReq = (num(f.inT) * m.input + num(f.outT) * m.output) / 1_000_000;
    const month = perReq * monthlyReq;
    return { ...m, perReq, month };
  });
  const sel = rows.find((r) => r.id === f.modelId) ?? rows[1];
  const cheapest = rows[0];
  const quote = sel.month * fx * (1 + num(f.margin) / 100);

  const text = `AI COST ESTIMATE: ${sel.name}
Usage: ${monthlyReq.toLocaleString()} requests a month (${num(f.inT).toLocaleString()} tokens in, ${num(f.outT).toLocaleString()} out per request)
Monthly AI cost: ${formatUsd(sel.month)} ≈ ${formatNgn(sel.month * fx)} at ₦${fx.toLocaleString()}/$
Per request: ${formatUsd(sel.perReq, 4)} ≈ ${formatNgn(sel.perReq * fx)}
With a ${num(f.margin)}% safety margin, budget ${formatNgn(quote)} a month.

All models:
${rows.map((r) => `- ${r.name}: ${formatNgn(r.month * fx)} / month`).join("\n")}

List prices from claude.com/pricing (standard tier, before caching or batch discounts). Check current prices before quoting.`;

  return (
    <AppToolLayout
      slug="token-cost-calculator"
      source={source}
      examples={examples}
      onExample={(i) => load(examples[i].values)}
      onReset={() => load(initial)}
      shareUrl={shareUrl}
      text={text}
      form={
        <>
          <Field label="Start from a use case">
            <Select value={f.preset} onChange={(e) => applyPreset(e.target.value)} options={presets} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Input tokens / request" hint="~1,000 tokens ≈ 750 words">
              <TextInput inputMode="numeric" value={f.inT} onChange={(e) => patch({ inT: e.target.value, preset: "custom" })} />
            </Field>
            <Field label="Output tokens / request" hint="What the AI writes back">
              <TextInput inputMode="numeric" value={f.outT} onChange={(e) => patch({ outT: e.target.value, preset: "custom" })} />
            </Field>
            <Field label="Requests per day">
              <TextInput inputMode="numeric" value={f.perDay} onChange={(e) => patch({ perDay: e.target.value, preset: "custom" })} />
            </Field>
            <Field label="Days per month">
              <TextInput inputMode="numeric" value={f.days} onChange={(e) => patch({ days: e.target.value })} />
            </Field>
            <Field label="Exchange rate (₦ per $1)" hint="The rate your card or dollar account actually charges.">
              <TextInput inputMode="numeric" value={f.rate} onChange={(e) => patch({ rate: e.target.value })} />
              <RateHint current={num(f.rate)} onUse={(r) => patch({ rate: String(r) })} />
            </Field>
            <Field label="Safety margin %" hint="Busy months cost more.">
              <TextInput inputMode="numeric" value={f.margin} onChange={(e) => patch({ margin: e.target.value })} />
            </Field>
          </div>
          <Field label="Model">
            <Select value={f.modelId} onChange={(e) => patch({ modelId: e.target.value })} options={modelPrices.map((m) => ({ value: m.id, label: m.name }))} />
          </Field>
        </>
      }
      output={
        <>
          <div className="border border-edge bg-card p-5">
            <p className="text-sm font-semibold text-muted">
              {sel.name} · {monthlyReq.toLocaleString()} requests/month
            </p>
            <p className="mt-1 font-display text-4xl font-semibold text-ink tabular">{formatNgn(sel.month * fx)}</p>
            <p className="text-lg font-semibold text-muted">{formatUsd(sel.month)} / month</p>
            <p className="mt-3 text-sm text-ink">
              {formatNgn(sel.perReq * fx)} per request ({formatUsd(sel.perReq, 4)}) · budget <strong>{formatNgn(quote)}</strong> with a {num(f.margin)}% margin
            </p>
            {sel.id !== cheapest.id && sel.month > 0 && (
              <p className="mt-3 border border-edge bg-brand-wash px-3 py-2 text-sm text-ink">
                If {cheapest.name} is good enough for this job, you'd save <strong>{formatNgn((sel.month - cheapest.month) * fx)}</strong> a month. Test it with your real questions first.
              </p>
            )}
          </div>
          <div className="overflow-x-auto border border-edge bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-sunk text-xs text-muted">
                <tr>
                  <th className="px-4 py-2">Model</th>
                  <th className="px-4 py-2 text-right">$ / 1M in · out</th>
                  <th className="px-4 py-2 text-right">Monthly (₦)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((r) => (
                  <tr key={r.id} className={r.id === sel.id ? "bg-brand/5" : ""}>
                    <td className="px-4 py-2.5">
                      <div className="font-semibold text-ink">{r.name}</div>
                      <div className="text-xs text-muted">{r.note}</div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right font-mono text-xs">
                      ${r.input} · ${r.output}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right font-semibold">{formatNgn(r.month * fx)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            List prices from claude.com/pricing (checked 30 Sept 2026), standard tier, before prompt caching or batch discounts, both can cut costs a lot. Always set a monthly spending limit in the provider's console, and check current prices before quoting a client.
          </p>
        </>
      }
    />
  );
}
