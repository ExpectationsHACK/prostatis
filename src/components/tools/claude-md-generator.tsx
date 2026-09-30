"use client";

import { AppToolLayout, useToolState } from "./kit/app-tool";
import { Field, Output, Select, TextArea, TextInput } from "../tool-ui";

const stacks = [
  "Next.js + Tailwind",
  "React + Vite",
  "Plain HTML/CSS/JS",
  "WordPress",
  "Python (FastAPI)",
  "Python (Django)",
  "Node.js + Express",
  "Flutter",
  "No code yet: planning",
];

const initial = {
  name: "Mama Nkechi's Kitchen site",
  purpose: "A website for a Lagos food vendor that takes orders via WhatsApp and Paystack.",
  audience: "Customers in Lekki and VI ordering lunch on their phones",
  stack: stacks[0],
  brand: "Colours: primary #d9480f, background #fff4e6, text #1b1714. Fonts: Fredoka (headings), Nunito (body).",
  commands: "npm run dev\nnpm run build\nnpm run lint",
  style: "Mobile-first; test at 360px wide\nKeep pages under 1MB, many users are on 3G/4G data\nPrices in naira, formatted like ₦4,500",
  rules: "Never commit API keys or .env files\nAsk before installing new packages\nAsk before deleting files",
  skill: "beginner",
};

const examples = [
  { label: "Food vendor site", values: initial },
  {
    label: "Salon booking site",
    values: {
      name: "Glow Beauty Studio website",
      purpose: "A booking website for a lash studio in Lekki, with a Cal.com booking page and a Paystack deposit link.",
      audience: "Working women in Lekki and VI booking on their phones",
      stack: stacks[0],
      brand: "Colours: primary #b8336a, background #f5e6d3, text #111111. Fonts: Playfair Display (headings), Lato (body).",
      commands: "npm run dev\nnpm run build",
      style: "Mobile-first; test at 360px wide\nWarm, confident tone; short sentences\nReal photos only, no stock images of people",
      rules: "Never commit API keys\nNever change prices without asking me\nAsk before adding new packages",
      skill: "beginner",
    },
  },
  {
    label: "School portal (Supabase)",
    values: {
      name: "Bright Stars parent portal",
      purpose: "A web app where parents sign in to see their children's results and fee balances.",
      audience: "Parents of Bright Stars Academy pupils, mostly on phones",
      stack: stacks[0],
      brand: "Colours: primary #1c6fb8, background #ffffff, text #111111. Fonts: Merriweather (headings), Source Sans 3 (body).",
      commands: "npm run dev\nnpm run build\nnpm run test",
      style: "Mobile-first\nPlain English for parents; no jargon",
      rules: "Row Level Security on every Supabase table\nThe Supabase secret key is server-only, never in browser code\nAsk before changing the database schema",
      skill: "intermediate",
    },
  },
];

const lines = (s: string) =>
  s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export default function ClaudeMdGenerator() {
  const { f, patch, load, source, shareUrl } = useToolState("claude-md-generator", initial);
  const set = (k: keyof typeof initial) => (e: { target: { value: string } }) => patch({ [k]: e.target.value });

  const skillNote =
    f.skill === "beginner"
      ? "I am new to coding. Explain what you changed in plain English, one short paragraph, after each task. Prefer simple solutions over clever ones. Tell me the exact command to run and what to check in the browser."
      : f.skill === "intermediate"
        ? "I can read code but I am not an expert. Briefly explain non-obvious decisions."
        : "I am an experienced developer. Be concise; skip explanations of standard patterns.";

  const out = `# ${f.name || "Project"}

## What this project is
${f.purpose || "_Describe the project in one or two sentences._"}

**Who it's for:** ${f.audience || "_Describe the users._"}

## Tech stack
- ${f.stack}

## Brand
${f.brand || "_Add the colours (hex codes) and the two fonts from the brand kit._"}

## Commands
${lines(f.commands).map((c) => "- `" + c + "`").join("\n") || "- _Add your run/build/test commands._"}

## Style & conventions
${lines(f.style).map((s) => "- " + s).join("\n") || "- Follow the existing code style in each file."}

## Rules: always follow
${lines(f.rules).map((r) => "- " + r).join("\n") || "- Ask before deleting files."}
- Read the relevant files before editing them.
- Make the smallest change that solves the task.
- Keep secrets in .env.local only.

## How to work with me
${skillNote}

## Decisions
When we make a decision that should outlast this session (a naming convention, a design choice, a gotcha), add it here.
- _(empty: add to this as we go)_
`;

  return (
    <AppToolLayout
      slug="claude-md-generator"
      source={source}
      examples={examples}
      onExample={(i) => load(examples[i].values)}
      onReset={() => load(initial)}
      shareUrl={shareUrl}
      text={out}
      form={
        <>
          <Field label="Project name">
            <TextInput value={f.name} onChange={set("name")} />
          </Field>
          <Field label="What is it?" hint="One or two sentences.">
            <TextArea value={f.purpose} onChange={set("purpose")} />
          </Field>
          <Field label="Who is it for?">
            <TextInput value={f.audience} onChange={set("audience")} />
          </Field>
          <Field label="Tech stack">
            <Select value={f.stack} onChange={set("stack")} options={stacks} />
          </Field>
          <Field label="Brand" hint="Paste the colours and fonts from your brand kit.">
            <TextArea value={f.brand} onChange={set("brand")} />
          </Field>
          <Field label="Commands" hint="One per line.">
            <TextArea value={f.commands} onChange={set("commands")} />
          </Field>
          <Field label="Style notes" hint="One per line.">
            <TextArea value={f.style} onChange={set("style")} />
          </Field>
          <Field label="Hard rules" hint="One per line: things the AI must never do without asking.">
            <TextArea value={f.rules} onChange={set("rules")} />
          </Field>
          <Field label="Your coding level">
            <Select
              value={f.skill}
              onChange={set("skill")}
              options={[
                { value: "beginner", label: "Beginner: explain things" },
                { value: "intermediate", label: "Intermediate" },
                { value: "expert", label: "Experienced: be brief" },
              ]}
            />
          </Field>
        </>
      }
      output={
        <>
          <Output title="CLAUDE.md" text={out} filename="CLAUDE.md" />
          <p className="text-sm text-muted">
            Save this as <code className="font-mono">CLAUDE.md</code> in the root of your project folder (next to package.json). Claude Code reads it at the start of every session, so it remembers your project without you repeating yourself.
          </p>
        </>
      }
    />
  );
}
