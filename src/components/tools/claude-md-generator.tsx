"use client";

import { useState } from "react";
import { Field, Output, Select, TextArea, TextInput, ToolLayout } from "../tool-ui";

const stacks = [
  "Next.js + Tailwind",
  "React + Vite",
  "Plain HTML/CSS/JS",
  "WordPress",
  "Python (FastAPI)",
  "Python (Django)",
  "Node.js + Express",
  "Flutter",
  "No code yet — planning",
];

export default function ClaudeMdGenerator() {
  const [f, setF] = useState({
    name: "Mama Nkechi's Kitchen site",
    purpose: "A website for a Lagos food vendor that takes orders via WhatsApp and Paystack.",
    audience: "Customers in Lekki and VI ordering lunch on their phones",
    stack: stacks[0],
    commands: "npm run dev\nnpm run build\nnpm run lint",
    style: "Mobile-first. Keep pages under 1MB — many users are on 3G/4G data.",
    rules: "Never commit API keys\nPrices are in naira, formatted like ₦4,500\nAsk before installing new packages",
    skill: "beginner",
  });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const lines = (s: string) =>
    s
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

  const skillNote =
    f.skill === "beginner"
      ? "I am new to coding. Explain what you changed in plain English, one short paragraph, after each task. Prefer simple solutions over clever ones."
      : f.skill === "intermediate"
        ? "I can read code but I am not an expert. Briefly explain non-obvious decisions."
        : "I am an experienced developer. Be concise; skip explanations of standard patterns.";

  const out = `# ${f.name || "Project"}

## What this project is
${f.purpose || "_Describe the project in one or two sentences._"}

**Who it's for:** ${f.audience || "_Describe the users._"}

## Tech stack
- ${f.stack}

## Commands
${lines(f.commands).map((c) => "- `" + c + "`").join("\n") || "- _Add your run/build/test commands._"}

## Style & conventions
${lines(f.style).map((s) => "- " + s).join("\n") || "- Follow the existing code style in each file."}

## Rules — always follow
${lines(f.rules).map((r) => "- " + r).join("\n") || "- Ask before deleting files."}
- Read the relevant files before editing them.
- Make the smallest change that solves the task.

## How to work with me
${skillNote}

## Memory
When we make a decision that should outlast this session (a naming convention, a design choice, a gotcha), add it under "Decisions" below.

## Decisions
- _(empty — the AI adds to this as we go)_
`;

  return (
    <ToolLayout
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
          <Field label="Commands" hint="One per line.">
            <TextArea value={f.commands} onChange={set("commands")} />
          </Field>
          <Field label="Style notes" hint="One per line.">
            <TextArea value={f.style} onChange={set("style")} />
          </Field>
          <Field label="Hard rules" hint="One per line.">
            <TextArea value={f.rules} onChange={set("rules")} />
          </Field>
          <Field label="Your coding level">
            <Select
              value={f.skill}
              onChange={set("skill")}
              options={[
                { value: "beginner", label: "Beginner — explain things" },
                { value: "intermediate", label: "Intermediate" },
                { value: "expert", label: "Experienced — be brief" },
              ]}
            />
          </Field>
        </>
      }
      output={
        <>
          <Output title="CLAUDE.md" text={out} filename="CLAUDE.md" />
          <p className="text-sm text-muted">
            Save this as <code className="font-mono">CLAUDE.md</code> in your project folder. Claude Code reads it at the
            start of every session, so it remembers your project without you repeating yourself.
          </p>
        </>
      }
    />
  );
}
