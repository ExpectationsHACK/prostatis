"use client";

import { useState } from "react";
import { DEFAULT_NGN_PER_USD, modelPrices } from "@/lib/models";
import { formatNgn, formatUsd } from "@/lib/site";
import { Field, Select, TextInput, ToolLayout } from "../tool-ui";

const presets = [
  { value: "custom", label: "Custom", inT: 0, outT: 0, perDay: 0 },
  { value: "chatbot", label: "Customer-service chatbot (WhatsApp/web)", inT: 1500, outT: 300, perDay: 200 },
  { value: "copy", label: "Blog / product copy writer", inT: 800, outT: 1500, perDay: 20 },
  { value: "agent", label: "Coding agent session", inT: 60000, outT: 8000, perDay: 15 },
  { value: "extract", label: "Receipt data extraction", inT: 2500, outT: 250, perDay: 300 },
];

const num = (s: string) => Math.max(0, Number(s.replace(/,/g, "")) || 0);

export default function TokenCostCalculator() {
  const [preset, setPreset] = useState("chatbot");
  const [inT, setInT] = useState("1500");
  const [outT, setOutT] = useState("300");
  const [perDay, setPerDay] = useState("200");
  const [days, setDays] = useState("30");
  const [rate, setRate] = useState(String(DEFAULT_NGN_PER_USD));
  const [modelId, setModelId] = useState<string>("claude-sonnet-5");

  const applyPreset = (v: string) => {
    setPreset(v);
    const p = presets.find((x) => x.value === v);
    if (p && v !== "custom") {
      setInT(String(p.inT));
      setOutT(String(p.outT));
      setPerDay(String(p.perDay));
    }
  };

  const monthlyReq = num(perDay) * num(days);
  const fx = num(rate);
  const rows = modelPrices.map((m) => {
    const perReq = (num(inT) * m.input + num(outT) * m.output) / 1_000_000;
    const month = perReq * monthlyReq;
    return { ...m, perReq, month };
  });
  const sel = rows.find((r) => r.id === modelId) ?? rows[1];
  const cheapest = rows[0];

  return (
    <ToolLayout
      form={
        <>
          <Field label="Start from a preset">
            <Select value={preset} onChange={(e) => applyPreset(e.target.value)} options={presets} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Input tokens / request" hint="~1,000 tokens ≈ 750 words">
              <TextInput inputMode="numeric" value={inT} onChange={(e) => { setInT(e.target.value); setPreset("custom"); }} />
            </Field>
            <Field label="Output tokens / request" hint="What the AI writes back">
              <TextInput inputMode="numeric" value={outT} onChange={(e) => { setOutT(e.target.value); setPreset("custom"); }} />
            </Field>
            <Field label="Requests per day">
              <TextInput inputMode="numeric" value={perDay} onChange={(e) => { setPerDay(e.target.value); setPreset("custom"); }} />
            </Field>
            <Field label="Days per month">
              <TextInput inputMode="numeric" value={days} onChange={(e) => setDays(e.target.value)} />
            </Field>
          </div>
          <Field label="Exchange rate (₦ per $1)" hint="Use the rate your card or dom account actually charges.">
            <TextInput inputMode="numeric" value={rate} onChange={(e) => setRate(e.target.value)} />
          </Field>
          <Field label="Model">
            <Select value={modelId} onChange={(e) => setModelId(e.target.value)} options={modelPrices.map((m) => ({ value: m.id, label: m.name }))} />
          </Field>
        </>
      }
      output={
        <>
          <div className="border-2 border-edge bg-card p-5">
            <p className="text-sm font-semibold text-muted">{sel.name} · {monthlyReq.toLocaleString()} requests/month</p>
            <p className="mt-1 font-display text-4xl font-semibold text-ink tabular">{formatNgn(sel.month * fx)}</p>
            <p className="text-lg font-semibold text-muted">{formatUsd(sel.month)} / month</p>
            <p className="mt-3 text-sm text-ink">
              {formatNgn(sel.perReq * fx)} per request ({formatUsd(sel.perReq, 4)})
            </p>
            {sel.id !== cheapest.id && sel.month > 0 && (
              <p className="mt-3 border-2 border-edge bg-brand-wash px-3 py-2 text-sm text-ink">
                If {cheapest.name} is good enough for this job, you'd save{" "}
                <strong>{formatNgn((sel.month - cheapest.month) * fx)}</strong> a month.
              </p>
            )}
          </div>
          <div className="overflow-x-auto border-2 border-edge bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-sunk text-xs uppercase tracking-wider text-muted">
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
                    <td className="whitespace-nowrap px-4 py-2.5 text-right font-mono text-xs">${r.input} · ${r.output}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right font-semibold">{formatNgn(r.month * fx)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">
            List prices from Anthropic, standard API tier, before prompt caching or batch discounts (both can cut costs a lot).
            Check current prices before quoting a client.
          </p>
        </>
      }
    />
  );
}
