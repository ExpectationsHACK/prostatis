import type { ThumbKind } from "@/components/art/product-thumb";
import type { DiagramKind } from "@/components/art/lesson-diagram";

/** A figure in a lesson: a tool's output, a finished product, or a teaching diagram. */
export type Figure = ({ tool: string } | { product: ThumbKind } | { diagram: DiagramKind }) & { caption: string };

export type LessonBlock =
  | { t: "p"; text: string } // supports **bold** and `code`
  | { t: "list"; items: string[] }
  | { t: "steps"; items: { title: string; detail: string }[] }
  | { t: "prompt"; title: string; text: string } // a prompt to copy into Claude
  | { t: "code"; lang: string; text: string }
  | { t: "tip"; text: string }
  | { t: "warn"; text: string }
  | { t: "figure"; figure: Figure }
  | { t: "table"; columns: string[]; rows: string[][] }
  | { t: "tool"; slug: string; why: string } // links to one of our free tools
  /** Jargon buster: a word explained in plain English, with an everyday comparison. */
  | { t: "define"; term: string; meaning: string; like?: string }
  /** A real-life story showing where the idea is used. */
  | { t: "scenario"; title: string; text: string }
  /** Practise now, in real life. Ticked in the browser; no XP (XP is server-awarded). */
  | { t: "try"; title: string; minutes: number; steps: string[] }
  /** A quick self-check with instant feedback. Practice only: not graded. */
  | { t: "check"; q: string; options: string[]; answer: number; why: string }
  /** Common mistakes, each with the fix. */
  | { t: "mistakes"; items: { wrong: string; right: string }[] };

export type Question = {
  q: string;
  options: string[];
  answer: number; // index into options
  why: string; // explanation shown after passing
  /** Index into the lesson's `recap` - the takeaway that teaches this answer. */
  from?: number;
};

export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  /** What the student has at the end of the lesson. */
  outcome: string;
  intro: string;
  /** What to have ready before starting (accounts, tools, costs). */
  youNeed: string[];
  sections: { heading: string; blocks: LessonBlock[] }[];
  task: { title: string; steps: string[]; done: string[] };
  /** Key takeaways. Every quiz question points at one of these. */
  recap: string[];
  resources: { label: string; url: string; note: string }[];
  quiz: Question[];
};
