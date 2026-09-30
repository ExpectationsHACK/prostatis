"use client";

import { DEFAULT_NGN_PER_USD } from "@/lib/models";
import { formatNgn, formatUsd } from "@/lib/site";
import { AppToolLayout, useToolState } from "./kit/app-tool";
import { Field, Output, TextInput } from "../tool-ui";

const num = (s: string) => Math.max(0, Number(s.replace(/,/g, "")) || 0);

const projects = [
  { name: "Landing page (AI-built, 1 page)", hours: 8 },
  { name: "Business website (5 pages + WhatsApp/Paystack)", hours: 24 },
  { name: "AI customer-service chatbot", hours: 30 },
  { name: "Custom AI agent / automation", hours: 40 },
  { name: "10 short-form AI videos", hours: 16 },
  { name: "Monthly retainer (content + maintenance)", hours: 20 },
];

const initial = { goal: "1,500,000", hours: "30", billable: "60", toolsUsd: "40", otherNgn: "80,000", fee: "0", fxLoss: "3", rate: String(DEFAULT_NGN_PER_USD) };
const examples = [
  { label: "Starting out (part-time)", values: { ...initial, goal: "400,000", hours: "20", billable: "50", toolsUsd: "20", otherNgn: "40,000" } },
  { label: "Full-time, direct clients", values: initial },
  { label: "Via a freelance platform", values: { ...initial, goal: "2,000,000", hours: "35", fee: "10", fxLoss: "4" } },
];

export default function ClientPricingCalculator() {
  const { f, patch, load, source, shareUrl } = useToolState("client-pricing-calculator", initial);
  const { goal, hours, billable, toolsUsd, otherNgn, fee, fxLoss, rate } = f;
  const setGoal = (v: string) => patch({ goal: v });
  const setHours = (v: string) => patch({ hours: v });
  const setBillable = (v: string) => patch({ billable: v });
  const setToolsUsd = (v: string) => patch({ toolsUsd: v });
  const setOtherNgn = (v: string) => patch({ otherNgn: v });
  const setFee = (v: string) => patch({ fee: v });
  const setFxLoss = (v: string) => patch({ fxLoss: v });
  const setRate = (v: string) => patch({ rate: v });

  const fx = num(rate) || 1;
  const monthlyNeedNgn = num(goal) + num(otherNgn) + num(toolsUsd) * fx;
  const billableHours = (num(hours) * 52) / 12 * (num(billable) / 100);
  const keep = (1 - num(fee) / 100) * (1 - num(fxLoss) / 100);
  const hourlyUsd = billableHours > 0 && keep > 0 ? monthlyNeedNgn / fx / billableHours / keep : 0;
  const roundUp = (n: number, step: number) => Math.ceil(n / step) * step;
  const hourly = roundUp(hourlyUsd, 1);

  const summary = `My rate card
Hourly: ${formatUsd(hourly, 0)}
Day (6 billable hours): ${formatUsd(hourly * 6, 0)}

Project floors (never quote below these):
${projects.map((p) => `- ${p.name}: ${formatUsd(roundUp(p.hours * hourly, 25), 0)} ≈ ${formatNgn(roundUp(p.hours * hourly, 25) * fx)}`).join("\n")}

Based on: ${formatNgn(num(goal))}/month take-home goal, ${Math.round(billableHours)} billable hours/month, ${num(fee)}% platform fee, ${num(fxLoss)}% FX/payout loss at ₦${fx.toLocaleString()}/$.`;

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
          <Field label="Monthly take-home goal (₦)" hint="What you want to keep after costs.">
            <TextInput inputMode="numeric" value={goal} onChange={(e) => setGoal(e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Hours you work / week">
              <TextInput inputMode="numeric" value={hours} onChange={(e) => setHours(e.target.value)} />
            </Field>
            <Field label="% of that billable" hint="Admin & sales aren't billable.">
              <TextInput inputMode="numeric" value={billable} onChange={(e) => setBillable(e.target.value)} />
            </Field>
            <Field label="AI tools & subscriptions ($/mo)">
              <TextInput inputMode="numeric" value={toolsUsd} onChange={(e) => setToolsUsd(e.target.value)} />
            </Field>
            <Field label="Data, power, other (₦/mo)">
              <TextInput inputMode="numeric" value={otherNgn} onChange={(e) => setOtherNgn(e.target.value)} />
            </Field>
            <Field label="Platform fee %" hint="0 for direct clients.">
              <TextInput inputMode="numeric" value={fee} onChange={(e) => setFee(e.target.value)} />
            </Field>
            <Field label="FX / payout loss %" hint="Payoneer, Grey, bank spread.">
              <TextInput inputMode="numeric" value={fxLoss} onChange={(e) => setFxLoss(e.target.value)} />
            </Field>
          </div>
          <Field label="Exchange rate (₦ per $1)">
            <TextInput inputMode="numeric" value={rate} onChange={(e) => setRate(e.target.value)} />
          </Field>
        </>
      }
      output={
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="border-2 border-edge bg-card p-5">
              <p className="text-sm font-semibold text-muted">Minimum hourly rate</p>
              <p className="font-display text-4xl font-semibold text-ink tabular">{formatUsd(hourly, 0)}</p>
              <p className="text-sm text-muted">≈ {formatNgn(hourly * fx)}</p>
            </div>
            <div className="border-2 border-edge bg-card p-5">
              <p className="text-sm font-semibold text-muted">You need to bill</p>
              <p className="font-display text-4xl font-semibold text-ink tabular">{formatUsd(monthlyNeedNgn / fx / (keep || 1), 0)}</p>
              <p className="text-sm text-muted">per month, before fees</p>
            </div>
          </div>
          <div className="overflow-hidden border-2 border-edge bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-sunk text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-2">Project</th>
                  <th className="px-4 py-2 text-right">Est. hours</th>
                  <th className="px-4 py-2 text-right">Floor ($ · ₦)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {projects.map((p) => (
                  <tr key={p.name}>
                    <td className="px-4 py-2.5 text-ink">{p.name}</td>
                    <td className="px-4 py-2.5 text-right text-muted">{p.hours}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-ink">
                      {formatUsd(roundUp(p.hours * hourly, 25), 0)}
                      <span className="block text-xs font-normal text-muted">{formatNgn(roundUp(p.hours * hourly, 25) * fx)}</span>
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
