"use client";

import { useState } from "react";
import { Field, Output, Select, TextArea, TextInput, ToolLayout } from "../tool-ui";

const lines = (s: string) =>
  s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export default function ProposalGenerator() {
  const [f, setF] = useState({
    you: "Ada Okafor",
    studio: "Ada Builds",
    client: "Sarah Mitchell",
    company: "Brightside Dental (Texas)",
    problem: "Their website is slow, not mobile-friendly, and new patients can't book online — so they lose bookings to competitors.",
    outcome: "A fast, mobile-first website with online booking and an AI chat assistant that answers common questions 24/7.",
    deliverables: "5-page website (Home, Services, About, Reviews, Contact)\nOnline booking integration\nAI chat assistant trained on their FAQs\nBasic SEO setup and Google Business link\n30 days of post-launch support",
    timeline: "2 weeks",
    currency: "USD",
    price: "1,200",
    split: "50/50",
    validity: "14 days",
  });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const sym = f.currency === "USD" ? "$" : f.currency === "GBP" ? "£" : f.currency === "EUR" ? "€" : "₦";
  const total = Number(f.price.replace(/,/g, "")) || 0;
  const [a, b] = f.split === "100" ? [100, 0] : f.split === "40/30/30" ? [40, 60] : [50, 50];
  const money = (n: number) => sym + Math.round(n).toLocaleString("en-US");
  const deliverables = lines(f.deliverables);

  const payment =
    f.split === "100"
      ? `- 100% (${money(total)}) before work starts.`
      : f.split === "40/30/30"
        ? `- 40% (${money(total * 0.4)}) to start\n- 30% (${money(total * 0.3)}) at design approval\n- 30% (${money(total * 0.3)}) on launch`
        : `- ${a}% (${money((total * a) / 100)}) to start\n- ${b}% (${money((total * b) / 100)}) on launch, before handover`;

  const headline = f.outcome.split(/[.—]/)[0].trim();
  const out = `PROPOSAL: ${headline.length > 70 ? headline.slice(0, 67).trimEnd() + "…" : headline}
Prepared for ${f.client}, ${f.company}
Prepared by ${f.you}, ${f.studio}

────────────────────────────────

1. THE PROBLEM
${f.problem}

2. WHAT YOU'LL GET
${f.outcome}

3. DELIVERABLES
${deliverables.map((d, i) => `${i + 1}. ${d}`).join("\n")}

4. TIMELINE — ${f.timeline}
- Day 1–2: Kick-off call, content and access collected
- First half: Design and build; you review a live preview link
- Second half: Revisions (2 rounds included), testing on mobile and desktop
- Final day: Launch and handover walkthrough

5. INVESTMENT
Total: ${money(total)} ${f.currency}

Payment schedule:
${payment}

Payment by bank transfer, Wise, Payoneer or card (payment details provided).

6. WHAT I NEED FROM YOU
- Logo, photos and any existing text
- Logins/access for domain and hosting (or I can set these up)
- One point of contact who can approve work within 48 hours

7. NOT INCLUDED
- Paid ad management, copywriting beyond the pages listed, or features not in section 3.
Anything extra is quoted separately before any work begins.

8. NEXT STEP
Reply "approved" and I'll send the first payment request. Work starts as soon as the deposit lands.
This proposal is valid for ${f.validity}.

Thank you,
${f.you}
${f.studio}`;

  return (
    <ToolLayout
      form={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Your name">
              <TextInput value={f.you} onChange={set("you")} />
            </Field>
            <Field label="Business / studio">
              <TextInput value={f.studio} onChange={set("studio")} />
            </Field>
            <Field label="Client name">
              <TextInput value={f.client} onChange={set("client")} />
            </Field>
            <Field label="Client company">
              <TextInput value={f.company} onChange={set("company")} />
            </Field>
          </div>
          <Field label="Their problem" hint="In their words, from the discovery call.">
            <TextArea value={f.problem} onChange={set("problem")} />
          </Field>
          <Field label="The outcome you'll deliver">
            <TextArea value={f.outcome} onChange={set("outcome")} />
          </Field>
          <Field label="Deliverables" hint="One per line.">
            <TextArea rows={5} value={f.deliverables} onChange={set("deliverables")} />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Timeline">
              <TextInput value={f.timeline} onChange={set("timeline")} />
            </Field>
            <Field label="Currency">
              <Select value={f.currency} onChange={set("currency")} options={["USD", "GBP", "EUR", "NGN"]} />
            </Field>
            <Field label="Price">
              <TextInput inputMode="numeric" value={f.price} onChange={set("price")} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Payment split">
              <Select
                value={f.split}
                onChange={set("split")}
                options={[
                  { value: "50/50", label: "50% upfront / 50% on launch" },
                  { value: "40/30/30", label: "40 / 30 / 30 milestones" },
                  { value: "100", label: "100% upfront" },
                ]}
              />
            </Field>
            <Field label="Valid for">
              <TextInput value={f.validity} onChange={set("validity")} />
            </Field>
          </div>
        </>
      }
      output={
        <>
          <Output title="Proposal" text={out} filename={`proposal-${f.company.replace(/\W+/g, "-").toLowerCase()}.txt`} />
          <p className="text-sm text-muted">
            Paste into Google Docs or Notion, add your logo, and export as PDF. Always get the deposit before starting.
          </p>
        </>
      }
    />
  );
}
