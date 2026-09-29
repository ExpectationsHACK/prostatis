"use client";

import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { btn, size } from "../ui";
import { CopyButton, Field, Output, Select, TextInput, ToolLayout } from "../tool-ui";

type Vars = { topic: string; audience: string; result: string; mistake: string; time: string; num: string };

const templates: { type: string; t: (v: Vars) => string }[] = [
  { type: "Curiosity", t: (v) => `Nobody tells ${v.audience} this about ${v.topic}.` },
  { type: "Curiosity", t: (v) => `I tried ${v.topic} for ${v.time}. Here's what actually happened.` },
  { type: "Curiosity", t: (v) => `The ${v.topic} trick I wish I knew before I started.` },
  { type: "Curiosity", t: (v) => `This is how ${v.audience} are quietly ${v.result}.` },
  { type: "Contrarian", t: (v) => `Stop ${v.mistake}. It's why you're not ${v.result}.` },
  { type: "Contrarian", t: (v) => `Unpopular opinion: ${v.topic} is easier than they make it look.` },
  { type: "Contrarian", t: (v) => `You don't need a big budget for ${v.topic}. You need this.` },
  { type: "Contrarian", t: (v) => `Everyone says ${v.mistake} is fine. It isn't.` },
  { type: "Number", t: (v) => `${v.num} ${v.topic} mistakes costing ${v.audience} money.` },
  { type: "Number", t: (v) => `${v.num} steps to ${v.result} — save this.` },
  { type: "Number", t: (v) => `${v.num} ${v.topic} tools I use every single day.` },
  { type: "Number", t: (v) => `From zero to ${v.result} in ${v.time}. ${v.num} things that mattered.` },
  { type: "Story", t: (v) => `${v.time} ago I knew nothing about ${v.topic}. Now I'm ${v.result}.` },
  { type: "Story", t: () => `My first client paid me in dollars. Here's how I found them.` },
  { type: "Story", t: (v) => `I almost gave up on ${v.topic}. Then I changed one thing.` },
  { type: "Pain", t: (v) => `If you're ${v.mistake}, watch this before you waste another week.` },
  { type: "Pain", t: (v) => `Tired of ${v.mistake}? Do this instead.` },
  { type: "Pain", t: (v) => `${v.audience}: this is why ${v.topic} isn't working for you yet.` },
  { type: "Direct", t: (v) => `How to start ${v.topic} with just your phone and data.` },
  { type: "Direct", t: (v) => `Here's exactly how I'd start ${v.topic} if I were starting today.` },
  { type: "Direct", t: (v) => `Watch me go from idea to ${v.result} using only AI.` },
  { type: "Direct", t: (v) => `Steal my ${v.topic} workflow. It takes ${v.time}.` },
  { type: "Proof", t: (v) => `This took me ${v.time} with AI. It used to take a week.` },
  { type: "Proof", t: (v) => `Here's the exact prompt behind ${v.result}.` },
  { type: "Proof", t: (v) => `Receipts: what ${v.topic} actually paid me this month.` },
  { type: "Question", t: (v) => `Would you pay someone to do ${v.topic} for you? Businesses do.` },
  { type: "Question", t: (v) => `What if ${v.topic} could pay your rent in dollars?` },
  { type: "Question", t: (v) => `Why are more ${v.audience} ${v.result} than ever before?` },
];

const platformTip: Record<string, string> = {
  TikTok: "Say it in the first 1.5 seconds and put it on screen as text too.",
  "Instagram Reels": "Use it as the on-screen text over your first frame.",
  "X / Twitter": "Use it as the first line of the thread, then deliver in tweet 2.",
  LinkedIn: "Keep it to the first line — LinkedIn cuts off after ~210 characters.",
  "YouTube Shorts": "Say it straight away; add it to the title too.",
};

function shuffled<T>(arr: T[], seed: number) {
  const a = [...arr];
  let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HookLineGenerator() {
  const [v, setV] = useState<Vars>({
    topic: "building websites with AI",
    audience: "Nigerian freelancers",
    result: "earning in dollars",
    mistake: "charging clients in naira",
    time: "30 days",
    num: "5",
  });
  const [platform, setPlatform] = useState("TikTok");
  const [type, setType] = useState("All");
  const [seed, setSeed] = useState(1);
  const set = (k: keyof Vars) => (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value });

  const types = ["All", ...Array.from(new Set(templates.map((x) => x.type)))];
  const hooks = shuffled(
    templates.filter((x) => type === "All" || x.type === type),
    seed,
  )
    .slice(0, 20)
    .map((x) => ({ type: x.type, text: x.t(v) }));

  return (
    <ToolLayout
      form={
        <>
          <Field label="Topic">
            <TextInput value={v.topic} onChange={set("topic")} />
          </Field>
          <Field label="Audience">
            <TextInput value={v.audience} onChange={set("audience")} />
          </Field>
          <Field label="Result they want">
            <TextInput value={v.result} onChange={set("result")} />
          </Field>
          <Field label="Common mistake they make">
            <TextInput value={v.mistake} onChange={set("mistake")} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Timeframe">
              <TextInput value={v.time} onChange={set("time")} />
            </Field>
            <Field label="A number">
              <TextInput value={v.num} onChange={set("num")} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Platform">
              <Select value={platform} onChange={(e) => setPlatform(e.target.value)} options={Object.keys(platformTip)} />
            </Field>
            <Field label="Hook style">
              <Select value={type} onChange={(e) => setType(e.target.value)} options={types} />
            </Field>
          </div>
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            className={`${btn.secondary} ${size.md} w-full`}
          >
            <RefreshCw className="size-4" aria-hidden /> Shuffle hooks
          </button>
        </>
      }
      output={
        <>
          <p className="border-2 border-edge bg-brand-wash px-3 py-2 text-sm text-ink">
            <strong>{platform}:</strong> {platformTip[platform]}
          </p>
          <div className="overflow-hidden border-2 border-edge bg-card">
            <ul className="divide-y divide-line">
              {hooks.map((h, i) => (
                <li key={i} className="flex items-start justify-between gap-3 px-4 py-3">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-text">{h.type}</span>
                    <p className="text-[15px] text-ink">{h.text}</p>
                  </div>
                  <CopyButton text={h.text} />
                </li>
              ))}
            </ul>
          </div>
          <Output title="All hooks" text={hooks.map((h) => h.text).join("\n")} filename="hooks.txt" />
        </>
      }
    />
  );
}
