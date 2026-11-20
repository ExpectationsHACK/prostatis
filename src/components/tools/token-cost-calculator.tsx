"use client";

import { modelPrices } from "@/lib/models";
import { currencies, fmtMoney } from "@/lib/money";
import { formatUsd } from "@/lib/site";
import { AppToolLayout, useToolState } from "./kit/app-tool";
import { RateHint, rateText, useLiveRates } from "./kit/live-rate";
import { Field, Select, TextInput } from "../tool-ui";

const presets = [
  { value: "custom", label: "Custom", inT: 0, outT: 0, perDay: 0 },
  { value: "chatbot", label: "Customer-service chatbot (WhatsApp/web)", inT: 1500, outT: 300, perDay: 200 },
  { value: "copy", label: "Blog / product copy writer", inT: 800, outT: 1500, perDay: 20 },
  { value: "agent", label: "Coding agent session", inT: 60000, outT: 8000, perDay: 15 },
  { value: "extract", label: "Receipt data extraction", inT: 2500, outT: 250, perDay: 300 },
];

const num = (s: string) => Math.max(0, Number(s.replace(/,/g, "")) || 0);

// Model prices are in US dollars; "currency" + "perUsd" show the bill in the user's own money too.
const initial = { preset: "chatbot", inT: "1500", outT: "300", perDay: "200", days: "30", currency: "USD", perUsd: "1", modelId: "claude-sonnet-5-5", margin: "30" };
const examples = [
  { label: "Salon WhatsApp bot", values: { ...initial, preset: "chatbot", perDay: "80", modelId: "claude-haiku-4-5" } },
  { label: "Busy store chatbot", values: { ...initial, preset: "chatbot", perDay: "600", modelId: "claude-sonnet-5-5" } },
  { label: "Product descriptions", values: { ...initial, preset: "copy", inT: "800", outT: "1500", perDay: "20", days: "22" } },
];

export default function TokenCostCalculator() {
  const { f, patch, load, source, shareUrl } = useToolState("token-cost-calculator", initial);
  const live = useLiveRates();

  const applyPreset = (v: string) => {
    const p = presets.find((x) => x.value === v);
    patch(p && v !== "custom" ? { preset: v, inT: String(p.inT), outT: String(p.outT), perDay: String(p.perDay) } : { preset: v });
  };
  // Switching currency fills in today's rate when we have it.
  const setCurrency = (c: string) => patch({ currency: c, perUsd: c === "USD" ? "1" : live?.rates[c] ? rateText(live.rates[c]) : "" });

  const usd = f.currency === "USD";
  const fx = usd ? 1 : num(f.perUsd);
  const local = (n: number, digits = 0) => fmtMoney(n * fx, f.currency, digits);
  const monthlyReq = num(f.perDay) * num(f.days);
  const rows = modelPrices.map((m) => {
    const perReq = (num(f.inT) * m.input + num(f.outT) * m.output) / 1_000_000;
    const month = perReq * monthlyReq;
    return { ...m, perReq, month };
  });
  const sel = rows.find((r) => r.id === f.modelId) ?? rows[1];
  const cheapest = rows[0];
  const quote = sel.month * (1 + num(f.margin) / 100);
  const ready = usd || fx > 0;
  const both = (n: number, digits = 2) => (usd || !ready ? formatUsd(n, digits) : `${local(n, digits)} (${formatUsd(n, digits)})`);

  const text = `AI COST ESTIMATE: ${sel.name}
Usage: ${monthlyReq.toLocaleString()} requests a month (${num(f.inT).toLocaleString()} tokens in, ${num(f.outT).toLocaleString()} out per request)
Monthly AI cost: ${both(sel.month)}${usd ? "" : ` at ${fmtMoney(fx, f.currency, 2)} per $1`}
Per request: ${formatUsd(sel.perReq, 4)}
With a ${num(f.margin)}% safety margin, budget ${both(quote)} a month.

All models:
${rows.map((r) => `- ${r.name}: ${both(r.month)} / month`).join("\n")}

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
            <Field label="Show costs in">
              <Select value={f.currency} onChange={(e) => setCurrency(e.target.value)} options={[...currencies]} />
            </Field>
            <Field label="Safety margin %" hint="Busy months cost more.">
              <TextInput inputMode="numeric" value={f.margin} onChange={(e) => patch({ margin: e.target.value })} />
            </Field>
          </div>
          {!usd && (
            <Field label={`Exchange rate (${f.currency} per $1)`} hint="The rate your card or dollar account actually charges.">
              <TextInput inputMode="decimal" value={f.perUsd} onChange={(e) => patch({ perUsd: e.target.value })} />
              <RateHint currency={f.currency} current={num(f.perUsd)} onUse={(r) => patch({ perUsd: String(r) })} />
            </Field>
          )}
          <Field label="Model">
            <Select value={f.modelId} onChange={(e) => patch({ modelId: e.target.value })} options={modelPrices.map((m) => ({ value: m.id, label: m.name }))} />
          </Field>
        </>
      }
      output={
        <>
          <div className="rounded-[12px] border border-edge bg-card p-5">
            <p className="text-sm font-semibold text-muted">
              {sel.name} · {monthlyReq.toLocaleString()} requests/month
            </p>
            <p className="mt-1 font-display text-4xl font-semibold text-ink tabular">{usd || !ready ? formatUsd(sel.month) : local(sel.month)}</p>
            {!usd && ready && <p className="text-lg font-semibold text-muted">{formatUsd(sel.month)} / month</p>}
            {!ready && <p className="text-sm text-muted">Enter the exchange rate to see it in {f.currency}.</p>}
            <p className="mt-3 text-sm text-ink">
              {formatUsd(sel.perReq, 4)} per request · budget <strong>{both(quote, 0)}</strong> with a {num(f.margin)}% margin
            </p>
            {sel.id !== cheapest.id && sel.month > 0 && (
              <p className="mt-3 rounded-[12px] border border-edge bg-brand-wash px-3 py-2 text-sm text-ink">
                If {cheapest.name} is good enough for this job, you&apos;d save <strong>{both(sel.month - cheapest.month)}</strong> a month. Test it with your real questions first.
              </p>
            )}
          </div>
          <div className="overflow-x-auto rounded-[12px] border border-edge bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-sunk text-xs text-muted">
                <tr>
                  <th className="px-4 py-2">Model</th>
                  <th className="px-4 py-2 text-right">$ / 1M in · out</th>
                  <th className="px-4 py-2 text-right">Monthly{usd || !ready ? "" : ` (${f.currency})`}</th>
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
                    <td className="whitespace-nowrap px-4 py-2.5 text-right font-semibold">{usd || !ready ? formatUsd(r.month) : local(r.month)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            List prices from claude.com/pricing (checked 30 Sept 2026), standard tier, before prompt caching or batch discounts, both can cut costs a lot. Always set a monthly spending limit in the provider&apos;s console, and check current prices before quoting a client.
          </p>
        </>
      }
    />
  );
}
