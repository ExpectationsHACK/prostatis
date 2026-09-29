"use client";

import { useState } from "react";
import { Field, Output, Select, TextInput, ToolLayout } from "../tool-ui";

const channels = ["Instagram DM", "LinkedIn", "X / Twitter DM", "Email", "WhatsApp"];

export default function ColdDmScriptGenerator() {
  const [f, setF] = useState({
    name: "Tunde",
    prospect: "James",
    business: "Oak & Iron Barbers",
    observation: "your booking link on Instagram goes to a page that doesn't load on mobile",
    offer: "a mobile booking page with WhatsApp reminders",
    result: "fewer no-shows and more bookings from Instagram",
    proof: "I built the same thing for a salon in Leeds last month",
    channel: "Instagram DM",
  });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });
  const email = f.channel === "Email";

  const opener = `Hi ${f.prospect}, I was looking at ${f.business} and noticed ${f.observation}.`;

  const scripts = [
    {
      title: "Version A — Helpful observation",
      text: `${email ? `Subject: Quick fix for ${f.business}\n\n` : ""}${opener}

That's probably costing you bookings. I help businesses like yours with ${f.offer} — so you get ${f.result}.

Want me to send a 2-minute video showing exactly what I'd change? No charge for the video.

${f.name}`,
    },
    {
      title: "Version B — Proof first",
      text: `${email ? `Subject: ${f.business} + ${f.offer}\n\n` : ""}Hi ${f.prospect} — ${f.proof}, and they're now seeing ${f.result}.

I noticed ${f.observation}, so I think the same approach would work for ${f.business}.

Open to a quick look? I can mock it up for you first.

${f.name}`,
    },
    {
      title: "Version C — Ultra short",
      text: `${email ? `Subject: ${f.business}\n\n` : ""}Hi ${f.prospect}, noticed ${f.observation}. I fix exactly that (${f.offer}). Want a free mock-up? — ${f.name}`,
    },
  ];

  const followUps = `Follow-up 1 (3 days later):
Hi ${f.prospect}, just bumping this in case it got buried. Happy to send that mock-up for ${f.business} — takes me 10 minutes.

Follow-up 2 (7 days later, add value):
Hi ${f.prospect}, I went ahead and made a quick mock-up of what I meant: [link]. Yours to keep either way.

Follow-up 3 (14 days later, close the loop):
Hi ${f.prospect}, I'll stop messaging after this one. If ${f.result} becomes a priority, I'm here. All the best with ${f.business}.`;

  const rules = `Before you send:
✓ The observation is specific to THIS business (not "I love your page!")
✓ Under ${email ? "120 words" : "60 words"} — ${f.channel} readers skim
✓ One question at the end, easy to say yes to
✓ No links in the first message (they look like spam)
✓ Send 20/day, track replies in a sheet, follow up — most replies come from follow-ups`;

  return (
    <ToolLayout
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
          <Field label="Something specific you noticed" hint="The more specific, the more replies. Finish the sentence “I noticed…”">
            <TextInput value={f.observation} onChange={set("observation")} />
          </Field>
          <Field label="What you offer">
            <TextInput value={f.offer} onChange={set("offer")} />
          </Field>
          <Field label="The result for them">
            <TextInput value={f.result} onChange={set("result")} />
          </Field>
          <Field label="Proof" hint="A past result, even a small one.">
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
