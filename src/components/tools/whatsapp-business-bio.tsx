"use client";

import { AiWriter } from "./kit/ai-writer";
import { AppToolLayout, useToolState } from "./kit/app-tool";
import { CopyButton, Field, Output, Select, TextInput } from "../tool-ui";

const ABOUT_LIMIT = 139;
const DESC_LIMIT = 512;

const initial = {
  business: "Tolu Builds",
  what: "AI-powered websites & landing pages",
  who: "small businesses",
  location: "Lagos",
  proof: "",
  hours: "Mon–Sat, 9am–7pm",
  delivery: "Delivered in 5 days",
  cta: "Send 'HI' to get a free quote",
  tone: "friendly",
};
const examples = [
  { label: "Web designer", values: initial },
  { label: "Bakery", values: { business: "Ada's Bakery", what: "Cakes, pastries & small chops", who: "parties and offices", location: "Lagos Mainland", proof: "4.9★ on Google", hours: "Mon–Sat, 8am–6pm", delivery: "Order 24h ahead", cta: "Send 'MENU' for prices", tone: "friendly" } },
  { label: "Law firm", values: { business: "Adeyemi & Co", what: "Property and business law", who: "families and SMEs", location: "Abuja", proof: "", hours: "Mon–Fri, 9am–5pm", delivery: "Consultations within 48h", cta: "Message us to book a consultation", tone: "professional" } },
];

export default function WhatsAppBusinessBio() {
  const { f, patch, load, source, shareUrl } = useToolState("whatsapp-business-bio", initial);
  const set = (k: keyof typeof initial) => (e: { target: { value: string } }) => patch({ [k]: e.target.value });

  const emoji = f.tone === "friendly";
  const e = (s: string) => (emoji ? s + " " : "");
  const clean = (s: string) => s.replace(/\s+/g, " ").replace(/\.\s*\./g, ".").replace(/\s\./g, ".").trim();

  const aboutVariants = [
    `${e("✨")}${f.what} for ${f.who} in ${f.location}. ${f.delivery}. ${f.cta}${emoji ? " 👇" : "."}`,
    `${f.what} · ${f.who} · ${f.location}. ${f.proof ? f.proof + ". " : ""}${f.cta}.`,
    `${e("🚀")}${f.business}: ${f.what}. ${f.proof ? f.proof + ". " : ""}${f.hours}.`,
    `${f.what} for ${f.who}. ${f.delivery}. ${f.cta}.`,
    `${e("📍")}${f.location} | ${f.what}${f.proof ? ` | ${f.proof}` : ` | ${f.hours}`}`,
  ].map(clean);

  const description = `${f.business}: ${f.what} for ${f.who} in ${f.location} and beyond.

${f.proof ? `${e("✅")}${f.proof}\n` : ""}${e("⏱️")}${f.delivery}
${e("🕘")}Open ${f.hours}

How to order:
1. ${f.cta}
2. Tell us what you need
3. Get a quote and timeline the same day

We reply fastest on WhatsApp.`.trim();

  const greeting = `${e("👋")}Hi, thanks for messaging ${f.business}! ${emoji ? "How can we help today?" : "How can we help you today?"}\n\nFor a fast reply, tell us what you need${/order|menu|price/i.test(f.cta) ? " and we'll send our prices" : ""}. ${f.hours ? `We're open ${f.hours}.` : ""}`.trim();
  const away = `${e("🌙")}Thanks for your message! ${f.business} is closed right now (open ${f.hours}). We'll reply as soon as we're back.${emoji ? " 🙏" : ""}`;
  const quick = [
    ["/hours", `We're open ${f.hours}.`],
    ["/location", `We're in ${f.location}. [Add your full address and a Google Maps link]`],
    ["/prices", `Here are our prices: [paste your price list or catalog link]`],
    ["/pay", "You can pay by bank transfer or card with this secure link: [Paystack payment link]"],
    ["/thanks", `Thank you for choosing ${f.business}!${emoji ? " 🙏" : ""} If you're happy, a quick Google review helps us a lot: [review link]`],
  ];

  const text = `ABOUT LINE OPTIONS (max ${ABOUT_LIMIT})\n${aboutVariants.map((v) => `- ${v} (${v.length})`).join("\n")}\n\nDESCRIPTION\n${description}\n\nGREETING MESSAGE\n${greeting}\n\nAWAY MESSAGE\n${away}\n\nQUICK REPLIES\n${quick.map(([k, v]) => `${k}: ${v}`).join("\n")}`;

  return (
    <AppToolLayout
      slug="whatsapp-business-bio"
      source={source}
      examples={examples}
      onExample={(i) => load(examples[i].values)}
      onReset={() => load(initial)}
      shareUrl={shareUrl}
      text={text}
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
          <Field label="Real proof (optional)" hint="A true number beats an adjective: “4.9★ on Google”, “200+ cakes delivered”. Leave empty if none yet.">
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
          <AiWriter slug="whatsapp-business-bio" values={f} />
          <div className="overflow-hidden border border-edge bg-card">
            <div className="border-b border-line bg-sunk px-4 py-2 text-xs font-semibold text-muted">“About” line options: limit {ABOUT_LIMIT} characters</div>
            <ul className="divide-y divide-line">
              {aboutVariants.map((v, i) => {
                const over = v.length > ABOUT_LIMIT;
                return (
                  <li key={i} className="flex items-start justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-[15px] text-ink">{v}</p>
                      <p className={"mt-1 text-xs font-semibold " + (over ? "text-danger" : "text-success")}>
                        {v.length}/{ABOUT_LIMIT} {over ? "- too long, shorten a field" : "- fits"}
                      </p>
                    </div>
                    <CopyButton text={v} />
                  </li>
                );
              })}
            </ul>
          </div>
          <Output title={`Business description (${description.length}/${DESC_LIMIT})`} text={description} />
          <Output title="Greeting message (Business tools → Greeting message)" text={greeting} />
          <Output title="Away message (Business tools → Away message)" text={away} />
          <Output title="Quick replies (Business tools → Quick replies)" text={quick.map(([k, v]) => `${k}\n${v}`).join("\n\n")} />
          <p className="text-sm text-muted">
            In WhatsApp Business: Settings → Business tools. Paste the short line into “About”, the long one into “Description”, then set up the greeting, away message and quick replies. Replace every [bracket] with the real details.
          </p>
        </>
      }
    />
  );
}
