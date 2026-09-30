"use client";

import { RefreshCw } from "lucide-react";
import { btn, size } from "../ui";
import { AppToolLayout, useToolState } from "./kit/app-tool";
import { CopyButton, Field, Output, Select, TextInput } from "../tool-ui";

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
  { type: "Number", t: (v) => `${v.num} steps to ${v.result}: save this.` },
  { type: "Number", t: (v) => `${v.num} ${v.topic} tools I use every single day.` },
  { type: "Number", t: (v) => `From zero to ${v.result} in ${v.time}: the ${v.num} things that mattered.` },
  { type: "Story", t: (v) => `${v.time} ago I knew nothing about ${v.topic}. Here's what changed.` },
  { type: "Story", t: (v) => `I almost gave up on ${v.topic}. Then I changed one thing.` },
  { type: "Story", t: (v) => `The first time I tried ${v.topic}, I made every mistake. Learn from mine.` },
  { type: "Pain", t: (v) => `If you're ${v.mistake}, watch this before you waste another week.` },
  { type: "Pain", t: (v) => `Tired of ${v.mistake}? Do this instead.` },
  { type: "Pain", t: (v) => `${v.audience}: this is why ${v.topic} isn't working for you yet.` },
  { type: "Direct", t: (v) => `How to start ${v.topic} with just your phone and data.` },
  { type: "Direct", t: (v) => `Here's exactly how I'd start ${v.topic} if I were starting today.` },
  { type: "Direct", t: (v) => `Watch me go from idea to ${v.result} using only AI.` },
  { type: "Direct", t: (v) => `Steal my ${v.topic} workflow. It takes ${v.time}.` },
  { type: "Proof", t: (v) => `This took me ${v.time} with AI. It used to take a week.` },
  { type: "Proof", t: (v) => `Here's the exact prompt behind ${v.result}.` },
  { type: "Question", t: (v) => `Would you pay someone to do ${v.topic} for you? Businesses do.` },
  { type: "Question", t: (v) => `Why are more ${v.audience} ${v.result} than ever before?` },
];

const platformTip: Record<string, string> = {
  TikTok: "Say it in the first 1.5 seconds and put it on screen as text too.",
  "Instagram Reels": "Use it as the on-screen text over your first frame.",
  "X / Twitter": "Use it as the first line of the thread, then deliver in the second post.",
  LinkedIn: "Keep it to the first line. LinkedIn cuts off after about 210 characters.",
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

const initial = {
  topic: "building websites with AI",
  audience: "Nigerian freelancers",
  result: "earning in dollars",
  mistake: "charging clients in naira",
  time: "30 days",
  num: "5",
  platform: "TikTok",
  type: "All",
  seed: 1,
};
const examples = [
  { label: "Freelancer (TikTok)", values: initial },
  { label: "Salon owner (Reels)", values: { ...initial, topic: "lash extensions", audience: "Lagos brides", result: "photo-ready lashes that last", mistake: "booking the cheapest lash tech", time: "4 weeks", num: "3", platform: "Instagram Reels" } },
  { label: "Solar business (LinkedIn)", values: { ...initial, topic: "solar for small businesses", audience: "Abuja shop owners", result: "cutting diesel costs", mistake: "running the generator all day", time: "3 months", num: "4", platform: "LinkedIn" } },
];

export default function HookLineGenerator() {
  const { f, patch, load, source, shareUrl } = useToolState("hook-line-generator", initial);
  const set = (k: keyof Vars) => (e: { target: { value: string } }) => patch({ [k]: e.target.value });

  const types = ["All", ...Array.from(new Set(templates.map((x) => x.type)))];
  const hooks = shuffled(
    templates.filter((x) => f.type === "All" || x.type === f.type),
    f.seed,
  )
    .slice(0, 20)
    .map((x) => ({ type: x.type, text: x.t(f) }));

  const text = `HOOKS FOR ${f.platform.toUpperCase()}\n${f.platform}: ${platformTip[f.platform]}\n\n${hooks.map((h) => `[${h.type}] ${h.text}`).join("\n")}\n\nOnly use hooks that are true for your work, then deliver on the promise in the next few seconds.`;

  return (
    <AppToolLayout
      slug="hook-line-generator"
      source={source}
      examples={examples}
      onExample={(i) => load(examples[i].values)}
      onReset={() => load(initial)}
      shareUrl={shareUrl}
      text={text}
      form={
        <>
          <Field label="Topic">
            <TextInput value={f.topic} onChange={set("topic")} />
          </Field>
          <Field label="Audience">
            <TextInput value={f.audience} onChange={set("audience")} />
          </Field>
          <Field label="Result they want">
            <TextInput value={f.result} onChange={set("result")} />
          </Field>
          <Field label="Common mistake they make">
            <TextInput value={f.mistake} onChange={set("mistake")} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Timeframe">
              <TextInput value={f.time} onChange={set("time")} />
            </Field>
            <Field label="A number">
              <TextInput value={f.num} onChange={set("num")} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Platform">
              <Select value={f.platform} onChange={(e) => patch({ platform: e.target.value })} options={Object.keys(platformTip)} />
            </Field>
            <Field label="Hook style">
              <Select value={f.type} onChange={(e) => patch({ type: e.target.value })} options={types} />
            </Field>
          </div>
          <button type="button" onClick={() => patch({ seed: f.seed + 1 })} className={`${btn.secondary} ${size.md} w-full`}>
            <RefreshCw className="size-4" aria-hidden /> Shuffle hooks
          </button>
        </>
      }
      output={
        <>
          <p className="border-2 border-edge bg-brand-wash px-3 py-2 text-sm text-ink">
            <strong>{f.platform}:</strong> {platformTip[f.platform]}
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
          <p className="text-sm text-muted">Only use hooks that are true for your work. A hook makes a promise, the next few seconds must keep it.</p>
        </>
      }
    />
  );
}
