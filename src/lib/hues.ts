import type { Pillar } from "@/lib/curriculum";

/**
 * The supporting colours. Each course skill (pillar) keeps one hue everywhere it appears, so
 * colour means something: purple is always design, blue development, and so on. Class names are
 * written out in full so Tailwind sees them.
 */
export type Hue = "purple" | "blue" | "orange" | "green" | "yellow" | "pink" | "teal";

export const hueClass: Record<Hue, { text: string; wash: string; solid: string; border: string }> = {
  purple: { text: "text-hue-purple", wash: "bg-hue-purple-wash", solid: "bg-hue-purple", border: "border-hue-purple" },
  blue: { text: "text-hue-blue", wash: "bg-hue-blue-wash", solid: "bg-hue-blue", border: "border-hue-blue" },
  orange: { text: "text-brand-text", wash: "bg-brand-wash", solid: "bg-brand", border: "border-brand" },
  green: { text: "text-hue-green", wash: "bg-hue-green-wash", solid: "bg-hue-green", border: "border-hue-green" },
  yellow: { text: "text-hue-yellow", wash: "bg-hue-yellow-wash", solid: "bg-hue-yellow-solid", border: "border-hue-yellow" },
  pink: { text: "text-hue-pink", wash: "bg-hue-pink-wash", solid: "bg-hue-pink", border: "border-hue-pink" },
  teal: { text: "text-hue-teal", wash: "bg-hue-teal-wash", solid: "bg-hue-teal", border: "border-hue-teal" },
};

export const pillarHue: Record<Pillar, Hue> = {
  web_design: "purple",
  web_dev: "blue",
  web_solutions: "orange",
  seo: "green",
  automation: "yellow",
  lead_gen: "pink",
  agents: "teal",
};

export const pillarClasses = (p: Pillar) => hueClass[pillarHue[p]];

/** A sequence for lists without a natural colour (steps, personas), avoiding orange next to orange buttons. */
export const cycle: Hue[] = ["blue", "green", "purple", "yellow", "teal", "pink"];
