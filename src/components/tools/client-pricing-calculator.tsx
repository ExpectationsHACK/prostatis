"use client";

import { currencies, currencySymbol, fmtMoney } from "@/lib/money";
import { formatUsd } from "@/lib/site";
import { RateHint, rateText, useLiveRates } from "./kit/live-rate";
import { AppToolLayout, useToolState } from "./kit/app-tool";
import { Field, Output, Select, TextInput } from "../tool-ui";

const num = (s: string) => Math.max(0, Number(s.replace(/,/g, "")) || 0);

const projects = [
  { name: "Landing page (AI-built, 1 page)", hours: 8 },
  { name: "Business website (5 pages + WhatsApp/payments)", hours: 24 },
  { name: "AI customer-service chatbot", hours: 30 },
  { name: "Custom AI agent / automation", hours: 40 },
  { name: "10 short-form AI videos", hours: 16 },
  { name: "Monthly retainer (content + maintenance)", hours: 20 },
];

// Your goal and costs are in your own currency; the rate card comes out in US dollars (what most
// international clients pay), plus your currency when it isn't dollars.
const initial = { currency: "USD", perUsd: "1", takeHome: "2,500", hours: "30", billable: "60", toolsUsd: "40", otherCosts: "150", fee: "0", fxLoss: "3" };
const examples = [
  { label: "Starting out (part-time)", values: { ...initial, takeHome: "800", hours: "20", billable: "50", toolsUsd: "20", otherCosts: "60" } },
  { label: "Full-time, direct clients", values: initial },
  { label: "Via a freelance platform", values: { ...initial, takeHome: "3,500", hours: "35", fee: "10", fxLoss: "4" } },
];

export default function ClientPricingCalculator() {
  const { f, patch, load, source, shareUrl } = useToolState("client-pricing-calculator", initial);
  const live = useLiveRates();
  const setCurrency = (c: string) => patch({ currency: c, perUsd: c === "USD" ? "1" : live?.rates[c] ? rateText(live.rates[c]) : "" });

  const usd = f.currency === "USD";
  const fx = usd ? 1 : num(f.perUsd);
  const ready = fx > 0;
  const sym = currencySymbol(f.currency);
  const local = (n: number) => fmtMoney(n, f.currency);

  const monthlyNeedUsd = ready ? (num(f.takeHome) + num(f.otherCosts)) / fx + num(f.toolsUsd) : 0;
  const billableHours = ((num(f.hours) * 52) / 12) * (num(f.billable) / 100);
  const keep = (1 - num(f.fee) / 100) * (1 - num(f.fxLoss) / 100);
  const hourlyUsd = billableHours > 0 && keep > 0 ? monthlyNeedUsd / billableHours / keep : 0;
  const roundUp = (n: number, step: number) => Math.ceil(n / step) * step;
  const hourly = roundUp(hourlyUsd, 1);
  const floor = (hours: number) => roundUp(hours * hourly, 25);
  const andLocal = (usdAmount: number) => (usd ? "" : ` ≈ ${local(usdAmount * fx)}`);

  const summary = `My rate card
Hourly: ${formatUsd(hourly, 0)}${andLocal(hourly)}
Day (6 billable hours): ${formatUsd(hourly * 6, 0)}

Project floors (never quote below these):
${projects.map((p) => `- ${p.name}: ${formatUsd(floor(p.hours), 0)}${andLocal(floor(p.hours))}`).join("\n")}

Based on: ${local(num(f.takeHome))}/month take-home goal, ${Math.round(billableHours)} billable hours/month, ${num(f.fee)}% platform fee, ${num(f.fxLoss)}% currency/payout loss${usd ? "" : ` at ${fmtMoney(fx, f.currency, fx >= 20 ? 0 : 2)} per $1`}.`;

  return (
    <AppToolLayout
      slug="client-pricing-calculator"
      source={source}
      examples={examples}
      onExample={(i) => load(examples[i].values)}
      onReset={() => load(initial)}
      shareUrl={shareUrl}
      text={summary}
      form={
        <>
          <Field label="Your currency" hint="Where you live and spend. Clients pay in dollars either way.">
            <Select value={f.currency} onChange={(e) => setCurrency(e.target.value)} options={[...currencies]} />
          </Field>
          {!usd && (
            <Field label={`Exchange rate (${f.currency} per $1)`}>
              <TextInput inputMode="decimal" value={f.perUsd} onChange={(e) => patch({ perUsd: e.target.value })} />
              <RateHint currency={f.currency} current={num(f.perUsd)} onUse={(r) => patch({ perUsd: String(r) })} />
            </Field>
          )}
          <Field label={`Monthly take-home goal (${sym})`} hint="What you want to keep after costs.">
            <TextInput inputMode="numeric" value={f.takeHome} onChange={(e) => patch({ takeHome: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Hours you work / week">
              <TextInput inputMode="numeric" value={f.hours} onChange={(e) => patch({ hours: e.target.value })} />
            </Field>
            <Field label="% of that billable" hint="Admin & sales aren't billable.">
              <TextInput inputMode="numeric" value={f.billable} onChange={(e) => patch({ billable: e.target.value })} />
            </Field>
            <Field label="AI tools & subscriptions ($/mo)">
              <TextInput inputMode="numeric" value={f.toolsUsd} onChange={(e) => patch({ toolsUsd: e.target.value })} />
            </Field>
            <Field label={`Internet, power, other (${sym}/mo)`}>
              <TextInput inputMode="numeric" value={f.otherCosts} onChange={(e) => patch({ otherCosts: e.target.value })} />
            </Field>
            <Field label="Platform fee %" hint="0 for direct clients.">
              <TextInput inputMode="numeric" value={f.fee} onChange={(e) => patch({ fee: e.target.value })} />
            </Field>
            <Field label="Currency / payout loss %" hint="Payout service and bank spread.">
              <TextInput inputMode="numeric" value={f.fxLoss} onChange={(e) => patch({ fxLoss: e.target.value })} />
            </Field>
          </div>
        </>
      }
      output={
        <>
          {!ready && <p className="rounded-[12px] border border-edge bg-brand-wash px-3 py-2 text-sm text-ink">Enter the exchange rate for {f.currency} to work out your rates.</p>}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[12px] border border-edge bg-card p-5">
              <p className="text-sm font-semibold text-muted">Minimum hourly rate</p>
              <p className="font-display text-4xl font-semibold text-ink tabular">{formatUsd(hourly, 0)}</p>
              {!usd && ready && <p className="text-sm text-muted">≈ {local(hourly * fx)}</p>}
            </div>
            <div className="rounded-[12px] border border-edge bg-card p-5">
              <p className="text-sm font-semibold text-muted">You need to bill</p>
              <p className="font-display text-4xl font-semibold text-ink tabular">{formatUsd(monthlyNeedUsd / (keep || 1), 0)}</p>
              <p className="text-sm text-muted">per month, before fees</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[12px] border border-edge bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-sunk text-xs text-muted">
                <tr>
                  <th className="px-4 py-2">Project</th>
                  <th className="px-4 py-2 text-right">Est. hours</th>
                  <th className="px-4 py-2 text-right">Floor{usd ? " ($)" : ` ($ · ${sym})`}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {projects.map((p) => (
                  <tr key={p.name}>
                    <td className="px-4 py-2.5 text-ink">{p.name}</td>
                    <td className="px-4 py-2.5 text-right text-muted">{p.hours}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-ink">
                      {formatUsd(floor(p.hours), 0)}
                      {!usd && ready && <span className="block text-xs font-normal text-muted">{local(floor(p.hours) * fx)}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted">
            This is your <strong>floor</strong>, not your price. With AI you finish faster, so quote per project, based on the
            value to the client, and never below these numbers.
          </p>
          <Output title="Rate card" text={summary} />
        </>
      }
    />
  );
}
