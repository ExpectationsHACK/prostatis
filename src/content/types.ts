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
  | { t: "tool"; slug: string; why: string }; // links to one of our free tools

export type Question = {
  q: string;
  options: string[];
  answer: number; // index into options
  why: string; // explanation shown after answering
};

export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  /** What the student has at the end of the lesson. */
  outcome: string;
  intro: string;
  sections: { heading: string; blocks: LessonBlock[] }[];
  task: { title: string; steps: string[]; done: string[] };
  resources: { label: string; url: string; note: string }[];
  quiz: Question[];
};
