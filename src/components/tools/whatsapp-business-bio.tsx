"use client";

import { useState } from "react";
import { CopyButton, Field, Output, Select, TextInput, ToolLayout } from "../tool-ui";

const ABOUT_LIMIT = 139;
const DESC_LIMIT = 512;

export default function WhatsAppBusinessBio() {
  const [f, setF] = useState({
    business: "Tolu Builds",
    what: "AI-powered websites & landing pages",
    who: "small businesses",
    location: "Lagos",
    proof: "40+ sites delivered",
    hours: "Mon–Sat, 9am–7pm",
    delivery: "Delivered in 5 days",
    cta: "Send 'HI' to get a free quote",
    tone: "friendly",
  });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const emoji = f.tone === "friendly";
  const e = (s: string) => (emoji ? s + " " : "");

  const aboutVariants = [
    `${e("✨")}${f.what} for ${f.who} in ${f.location}. ${f.delivery}. ${f.cta}${emoji ? " 👇" : "."}`,
    `${f.what} · ${f.who} · ${f.location}. ${f.proof}. ${f.cta}.`,
    `${e("🚀")}${f.business}: ${f.what}. ${f.proof}. ${f.hours}.`,
    `${f.what} for ${f.who}. ${f.delivery}. ${f.cta}.`,
    `${e("📍")}${f.location} | ${f.what} | ${f.proof}`,
  ].map((s) => s.replace(/\s+/g, " ").replace(/\.\./g, ".").trim());

  const description = `${f.business} — ${f.what} for ${f.who} in ${f.location} and beyond.

${e("✅")}${f.proof}
${e("⏱️")}${f.delivery}
${e("🕘")}Open ${f.hours}

How to order:
1. ${f.cta}
2. Tell us what you need
3. Get a quote and timeline the same day

We reply fastest on WhatsApp.`.trim();

  return (
    <ToolLayout
      form={
        <>
          <Field label="Business name">
            <TextInput value={f.business} onChange={set("business")} />
          </Field>
          <Field label="What you sell or do">
            <TextInput value={f.what} onChange={set("what")} />
          </Field>
          <Field label="Who you serve">
            <TextInput value={f.who} onChange={set("who")} />
          </Field>
          <Field label="City / area">
            <TextInput value={f.location} onChange={set("location")} />
          </Field>
          <Field label="Proof" hint="A number beats an adjective: '40+ sites delivered', '4.9★ on Google'.">
            <TextInput value={f.proof} onChange={set("proof")} />
          </Field>
          <Field label="Speed / delivery promise">
            <TextInput value={f.delivery} onChange={set("delivery")} />
          </Field>
          <Field label="Opening hours">
            <TextInput value={f.hours} onChange={set("hours")} />
          </Field>
          <Field label="Call to action">
            <TextInput value={f.cta} onChange={set("cta")} />
          </Field>
          <Field label="Tone">
            <Select
              value={f.tone}
              onChange={set("tone")}
              options={[
                { value: "friendly", label: "Friendly (with emoji)" },
                { value: "professional", label: "Professional (no emoji)" },
              ]}
            />
          </Field>
        </>
      }
      output={
        <>
          <div className="overflow-hidden border-2 border-edge bg-card">
            <div className="border-b border-line bg-sunk px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted">
              “About” line options — limit {ABOUT_LIMIT} characters
            </div>
            <ul className="divide-y divide-line">
              {aboutVariants.map((v, i) => {
                const over = v.length > ABOUT_LIMIT;
                return (
                  <li key={i} className="flex items-start justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-[15px] text-ink">{v}</p>
                      <p className={"mt-1 text-xs font-semibold " + (over ? "text-danger" : "text-success")}>
                        {v.length}/{ABOUT_LIMIT} {over ? "— too long, shorten a field" : "— fits"}
                      </p>
                    </div>
                    <CopyButton text={v} />
                  </li>
                );
              })}
            </ul>
          </div>
          <Output title={`Business description (${description.length}/${DESC_LIMIT})`} text={description} />
          <p className="text-sm text-muted">
            In WhatsApp Business: Settings → Business tools → Business profile. Paste the short line into “About” and the
            longer one into “Description”.
          </p>
        </>
      }
    />
  );
}
