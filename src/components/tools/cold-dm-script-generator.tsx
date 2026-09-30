"use client";

import { AppToolLayout, useToolState } from "./kit/app-tool";
import { Field, Output, Select, TextInput } from "../tool-ui";

const channels = ["Instagram DM", "LinkedIn", "X / Twitter DM", "Email", "WhatsApp"];

const initial = {
  name: "Tunde",
  prospect: "Chioma",
  business: "Chi's Lash Studio",
  observation: "people can't book you online and your number isn't on Google Maps",
  offer: "a simple booking page with a deposit link",
  result: "more bookings from Instagram and fewer no-shows",
  proof: "",
  channel: "Instagram DM",
};
const examples = [
  { label: "Salon (Instagram)", values: initial },
  { label: "Clinic (email)", values: { name: "Ade", prospect: "Dr Bello", business: "CarePoint Clinic", observation: "your website takes about 9 seconds to open on a phone", offer: "a fast mobile website with online appointment requests", result: "more patients booking instead of calling", proof: "", channel: "Email" } },
  { label: "Restaurant (WhatsApp)", values: { name: "Kemi", prospect: "Mama Nkechi", business: "Mama Nkechi's Kitchen", observation: "your menu is only in Instagram highlights, so it's hard to see prices", offer: "a menu page with an Order on WhatsApp button", result: "faster orders and fewer “how much?” messages", proof: "", channel: "WhatsApp" } },
];

export default function ColdDmScriptGenerator() {
  const { f, patch, load, source, shareUrl } = useToolState("cold-dm-script-generator", initial);
  const set = (k: keyof typeof initial) => (e: { target: { value: string } }) => patch({ [k]: e.target.value });
  const email = f.channel === "Email";
  const hasProof = f.proof.trim().length > 0;

  const opener = `Hi ${f.prospect}, I was looking at ${f.business} and noticed ${f.observation}.`;

  const scripts = [
    {
      title: "Version A: Helpful observation",
      text: `${email ? `Subject: Quick idea for ${f.business}\n\n` : ""}${opener}

That's probably costing you customers. I help businesses like yours with ${f.offer}: so you get ${f.result}.

Want me to send a free 2-minute video showing exactly what I'd change?

${f.name}`,
    },
    hasProof
      ? {
          title: "Version B: Proof first",
          text: `${email ? `Subject: ${f.business} + ${f.offer}\n\n` : ""}Hi ${f.prospect}: ${f.proof}.

I noticed ${f.observation}, so I think the same approach would work for ${f.business}.

Open to a quick look? I can make a free mock-up for you first.

${f.name}`,
        }
      : {
          title: "Version B: Free mock-up",
          text: `${email ? `Subject: A free mock-up for ${f.business}\n\n` : ""}Hi ${f.prospect}! I noticed ${f.observation}.

I made a quick idea of how ${f.offer} could look for ${f.business}. Can I send it? No cost, no obligation.

${f.name}`,
        },
    {
      title: "Version C: Ultra short",
      text: `${email ? `Subject: ${f.business}\n\n` : ""}Hi ${f.prospect}, noticed ${f.observation}. I fix exactly that (${f.offer}). Want a free mock-up? - ${f.name}`,
    },
  ];

  const followUps = `Follow-up 1 (3 days later):
Hi ${f.prospect}, just bumping this in case it got buried. Happy to send that mock-up for ${f.business}: it takes me 10 minutes.

Follow-up 2 (7 days later, add value):
Hi ${f.prospect}, I went ahead and made a quick mock-up of what I meant: [link]. Yours to keep either way.

Follow-up 3 (14 days later, close the loop):
Hi ${f.prospect}, I'll stop messaging after this one. If ${f.result} becomes a priority, I'm here. All the best with ${f.business}.`;

  const words = scripts[0].text.split(/\s+/).filter(Boolean).length;
  const rules = `Before you send:
${f.observation.length > 25 ? "✓" : "✗"} The observation is specific to THIS business (not “I love your page!”)
${words <= (email ? 120 : 70) ? "✓" : "✗"} Version A is ${words} words: aim under ${email ? "120" : "70"}; ${f.channel} readers skim
✓ One easy question at the end
✓ No links in the first message (they look like spam)
✓ Only real proof: leave “Proof” empty until you have a result
✓ About 10 personalised messages a day, logged in your tracker. Most replies come from follow-ups`;

  const text = `${scripts.map((s) => `${s.title.toUpperCase()}\n${s.text}`).join("\n\n")}\n\nFOLLOW-UPS\n${followUps}\n\n${rules}`;

  return (
    <AppToolLayout
      slug="cold-dm-script-generator"
      source={source}
      examples={examples}
      onExample={(i) => load(examples[i].values)}
      onReset={() => load(initial)}
      shareUrl={shareUrl}
      text={text}
      form={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Your first name">
              <TextInput value={f.name} onChange={set("name")} />
            </Field>
            <Field label="Prospect's first name">
              <TextInput value={f.prospect} onChange={set("prospect")} />
            </Field>
          </div>
          <Field label="Their business">
            <TextInput value={f.business} onChange={set("business")} />
          </Field>
          <Field label="Something specific you noticed" hint="Finish the sentence “I noticed…”. The more specific, the more replies.">
            <TextInput value={f.observation} onChange={set("observation")} />
          </Field>
          <Field label="What you offer">
            <TextInput value={f.offer} onChange={set("offer")} />
          </Field>
          <Field label="The result for them">
            <TextInput value={f.result} onChange={set("result")} />
          </Field>
          <Field label="Real proof (optional)" hint="Only something that really happened, e.g. “I built a booking page for a salon in Yaba last month”. Leave empty if none yet.">
            <TextInput value={f.proof} onChange={set("proof")} />
          </Field>
          <Field label="Channel">
            <Select value={f.channel} onChange={set("channel")} options={channels} />
          </Field>
        </>
      }
      output={
        <>
          {scripts.map((s) => (
            <Output key={s.title} title={s.title} text={s.text} />
          ))}
          <Output title="Follow-up sequence" text={followUps} />
          <Output title="Checklist" text={rules} />
        </>
      }
    />
  );
}
