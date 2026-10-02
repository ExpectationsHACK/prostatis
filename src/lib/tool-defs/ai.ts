import type { Field, Values } from "./types";

/**
 * Optional AI writing for the text tools. The browser sends only the tool's slug and its
 * inputs; the server builds the request from these specs, so nobody can use the endpoint as
 * a free general-purpose chatbot. Pure and shared, so the rules are unit-tested.
 */

export type AiSpec = {
  /** What to write, in one or two sentences. */
  task: string;
  /** The sections to return, in order (titles may include limits). */
  sections: string[];
  /** Labels for hand-built tools' inputs (definition tools use their field labels). */
  labels?: Record<string, string>;
  /** Inputs that are UI state, not facts. */
  omit?: string[];
};

export type AiResult = { sections: { title: string; items: string[] }[]; gaps: string[] };

const qa = "each item formatted as “Q: … A: …”";

export const aiSpecs: Record<string, AiSpec> = {
  "hero-copy-generator": {
    task: "Write the hero section (the first screen) of this business's home page.",
    sections: ["Headlines: 5 options, at most 10 words each", "Subheadlines: 3 options, one sentence each", "Button text: 3 options, 2 to 4 words", "Line under the button: 2 options that lower the risk (e.g. how fast they reply)"],
  },
  "landing-page-copy-generator": {
    task: "Write a one-offer landing page, section by section, in the order a visitor decides.",
    sections: ["Headline: 3 options", "Subheadline: 2 options", "The problem: 3 short lines in the customer's words", "What you get: 5 bullets", "How it works: 3 steps", `Doubts answered: 5 questions, ${qa}`, "Final call to action: 2 options"],
  },
  "wireframe-generator": {
    task: "Write the actual words for every section of this page, in order. Keep each section short enough to read on a phone.",
    sections: ["One section per page section, titled with the section's name; items are the heading, the text and any button label"],
  },
  "design-brief-generator": {
    task: "Turn these notes into a clear one-page website brief the client can approve.",
    sections: ["Project summary: 2 sentences", "Goals", "Pages", "Must-haves", "Content the client must send", "Questions still to answer"],
  },
  "faq-generator": {
    task: "Write FAQ answers for this business using only the facts given. Where a fact is missing, write the answer with a [bracketed gap] instead of guessing.",
    sections: [`Website FAQ: 8 questions, ${qa}`, "WhatsApp quick replies: the same answers in under 300 characters each"],
  },
  "whatsapp-catalog-guide": {
    task: "Write WhatsApp Business catalog entries for these products or services.",
    sections: ["Catalog items: one per product, formatted “Name | Price | Description (under 300 characters)”", "Price-list quick reply: one message", "Messages to share the catalog: 3 options"],
  },
  "blog-topic-generator": {
    task: "Suggest blog topics for this business, ordered from closest-to-buying to early research. Each topic must help a real customer decide.",
    sections: ["Topics: 10, each formatted “Title: the angle in one sentence”", "Write these first: the 3 best for a new website and why"],
  },
  "backlink-outreach-scripts": {
    task: "Write short, personal outreach emails asking for a link or mention. No flattery, no link schemes, no payment offers.",
    sections: ["Subject lines: 4 options", "Emails: 3 versions under 120 words, each with a [personal first line] the sender must fill in after reading the site", "Follow-up: 1 short message for a week later"],
  },
  "gbp-post-generator": {
    task: "Write Google Business Profile posts for this business. Each post under 1,000 characters, the key point in the first 100 characters, one clear action.",
    sections: ["Posts: 4 ready to publish", "Photo idea for each post"],
  },
  "meta-tag-generator": {
    task: "Write search result titles and meta descriptions for this page.",
    sections: ["Titles: 5 options, each under 60 characters, main keyword near the start", "Descriptions: 5 options, each 120 to 155 characters, ending with a call to action"],
  },
  "email-autoresponder-generator": {
    task: "Write the automatic replies and follow-ups for this situation, warm and specific to the business.",
    sections: ["Instant auto-reply", "Follow-up messages: in order, each starting with when to send it", "WhatsApp version of the auto-reply: under 400 characters"],
  },
  "lead-magnet-ideas": {
    task: "Suggest free lead magnets this business's customers would actually want, that the owner can make in a day.",
    sections: ["Ideas: 6, each formatted “Name: what's inside, and why this customer wants it”", "The landing page headline for the best idea: 3 options"],
  },
  "follow-up-sequence-generator": {
    task: "Write a polite follow-up sequence that adds something useful each time, never just “checking in”.",
    sections: ["Messages: 4, each starting with the day to send it", "Breakup message: the last, friendly close"],
  },
  "chatbot-persona-builder": {
    task: "Improve this AI assistant's instructions so it helps customers, stays on topic and hands over to a human when it should.",
    sections: ["System prompt: the full text, ready to paste", "Greetings: 3 options", "Test questions: 10 tricky customer questions to try before going live"],
  },
  "customer-service-scripts": {
    task: "Write customer service replies for this business. Calm, specific, no blame, always a next step.",
    sections: ["Replies: one per situation, titled with the situation", "Phrases to avoid and what to say instead"],
  },
  "handoff-script-generator": {
    task: "Write the messages for handing a customer from the AI assistant to a human.",
    sections: ["To the customer: 3 options", "To the staff member: the summary message with every detail they need", "If nobody is available: 2 options"],
  },
  "cold-dm-script-generator": {
    task: "Write first messages to this prospect. Open with the specific thing the sender noticed, offer one useful idea, ask one easy question. No hype, no fake familiarity.",
    sections: ["Messages: 3 versions under 80 words", "Follow-up: 2 short messages for 3 and 7 days later"],
    labels: { name: "My name", prospect: "Prospect's name", business: "Their business", observation: "What I noticed about them", offer: "What I offer", result: "Result it could bring them", proof: "My real proof (if any)", channel: "Channel" },
  },
  "proposal-generator": {
    task: "Write the persuasive parts of a website proposal from these details. Use only the prices and timelines given.",
    sections: ["Summary of their situation: 3 sentences in the client's terms", "What we'll build: bullets", "Why this approach: 3 reasons tied to their goals", "Next steps: numbered"],
    labels: { you: "My name", studio: "My business", client: "Client", company: "Client's business", problem: "Their problem", outcome: "What we'll deliver", deliverables: "Deliverables", timeline: "Timeline", currency: "Currency", price: "Price", split: "Payment split", validity: "Proposal valid for" },
  },
  "hook-line-generator": {
    task: "Write scroll-stopping opening lines for social posts about this offer. Specific, honest, no clickbait promises.",
    sections: ["Hooks: 10 options, at most 15 words each", "The 3 strongest, with the post idea each one opens"],
    labels: { topic: "Topic or offer", audience: "Audience", result: "Result they want", mistake: "Common mistake they make", time: "Timeframe (only if true)", num: "A real number to use (only if true)", platform: "Platform" },
    omit: ["seed", "type"],
  },
  "whatsapp-business-bio": {
    task: "Write WhatsApp Business profile text for this business.",
    sections: ["About: 5 options, each under 139 characters", "Greeting message: 2 options", "Away message: 2 options"],
    labels: { business: "Business name", what: "What they offer", who: "Who it's for", location: "Area", proof: "Real proof (if any)", hours: "Hours", delivery: "Turnaround", cta: "How to order", tone: "Tone" },
  },
};

/** The rules every AI-written result follows. */
export const AI_RULES = `You write for STEINARK's free tools, used by small businesses and beginner web designers in Nigeria.

Write in clear, warm, plain Nigerian English: short sentences, everyday words, no hype ("revolutionary", "world-class", "unleash"). Prefer naira (₦), WhatsApp and local detail when the facts include them.

Honesty rules (most important):
- Use only the facts provided. Never invent reviews, testimonials, customer names, numbers of clients, years in business, ratings, awards, press, guarantees, prices, delivery times or results.
- When something would help but isn't in the facts, write a short placeholder in square brackets, e.g. [number of happy customers] or [delivery time], so the user fills it in.
- Don't claim to be "the best", "#1" or "leading" unless the facts say so with proof.

Return the sections asked for, in order, using the exact section titles given. Each item is ready to copy and use; no numbering, no commentary. In "gaps", list up to 5 specific details the user could add to make the result stronger (empty if none).`;

export const MAX_INPUT_CHARS = 6000;

const humanise = (k: string) => k.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/^./, (c) => c.toUpperCase());

/** The facts block: each non-empty input with its label, clipped so requests stay small. */
export function factsText(values: Values, fields: Field[] = [], labels: Record<string, string> = {}, omit: string[] = []): string {
  const label = (k: string) => fields.find((f) => f.key === k)?.label ?? labels[k] ?? humanise(k);
  const opt = (k: string, x: string) => {
    const f = fields.find((ff) => ff.key === k);
    return f && (f.type === "select" || f.type === "multi") ? (f.options.find((o) => o.value === x)?.label ?? x) : x;
  };
  const lines: string[] = [];
  for (const [k, raw] of Object.entries(values)) {
    if (omit.includes(k) || (raw !== null && typeof raw === "object" && !Array.isArray(raw))) continue;
    let x: string;
    if (Array.isArray(raw)) x = raw.map((r) => opt(k, String(r))).join(", ");
    else if (typeof raw === "boolean") x = raw ? "yes" : "no";
    else x = opt(k, String(raw ?? ""));
    x = x.replace(/\s+\n/g, "\n").trim().slice(0, 1500);
    if (x) lines.push(`- ${label(k)}: ${x}`);
  }
  return lines.join("\n").slice(0, MAX_INPUT_CHARS);
}

export function aiPrompt(spec: AiSpec, facts: string): string {
  return `${spec.task}\n\nFacts from the user:\n${facts || "- (none given)"}\n\nSections to return, in this order:\n${spec.sections.map((x) => `- ${x}`).join("\n")}`;
}

/**
 * Honesty check on what came back: numbers and big claims that aren't in the user's facts.
 * Placeholders in [brackets] are fine, they're meant to be filled in.
 */
export function flagClaims(texts: string[], facts: string): string[] {
  const known = facts.toLowerCase().replace(/,/g, "");
  // Compare whole numbers, so "500" isn't excused by "45000".
  const knownNumbers = new Set([...known.matchAll(/\d+(?:\.\d+)?/g)].map((m) => m[0]));
  const flags = new Set<string>();
  for (const t of texts) {
    const plain = t.replace(/\[[^\]]*\]/g, " ");
    for (const m of plain.matchAll(/(?:₦|\$|n)?\d[\d,.]*(?:\s?(?:%|k\b|m\b|\+|years?|yrs|clients?|customers?|projects?|reviews?|stars?|hours?|hrs|days?|weeks?|minutes?|mins))?/gi)) {
      const raw = m[0].trim();
      const digits = raw.replace(/[^\d.]/g, "").replace(/\.$/, "");
      if (!digits || digits.length < 1) continue;
      if (/^[1-9]$/.test(digits) && !/%|years?|clients?|customers?|reviews?|stars?/i.test(raw)) continue; // list counts like "3 steps"
      if (!knownNumbers.has(digits)) flags.add(raw);
    }
    for (const m of plain.matchAll(/#1|number one|no\.\s?1\b|\bbest in [a-z ]+|\bleading\b|\btop[- ]rated\b|\baward[- ]winning\b|\bguarantee[ds]?\b|\b100%|\btrusted by\b/gi)) {
      if (!known.includes(m[0].toLowerCase())) flags.add(m[0].trim());
    }
  }
  return [...flags].slice(0, 8);
}
