import type { ThumbKind } from "@/components/art/product-thumb";
import type { DiagramKind } from "@/components/art/lesson-diagram";
import type { Glyph } from "@/components/art/sketch-glyphs";

/** A figure in a lesson: a tool's output, a finished product, or a teaching diagram. */
export type Figure = ({ tool: string } | { product: ThumbKind } | { diagram: DiagramKind }) & { caption: string };

/** One drawn thing in a sketch: an everyday object with a handwritten label. `hot` circles it in orange. */
export type SketchNode = { draw: Glyph; label: string; hot?: boolean };

/** A hand-drawn style illustration, built from everyday objects the learner already knows. */
export type Sketch =
  /** Things in order, joined by arrows. `arrows[i]` labels the arrow after node i; `loop` draws a return arrow. */
  | { layout: "flow"; nodes: SketchNode[]; arrows?: string[]; loop?: string }
  /** A screen drawn as labelled boxes, top to bottom (a wireframe). `hot` highlights one row. */
  | { layout: "stack"; frame: "phone" | "laptop"; rows: string[]; hot?: number }
  /** Two sides compared: before and after, wrong and right, the everyday thing and the web thing. */
  | { layout: "versus"; left: { title: string; nodes: SketchNode[] }; right: { title: string; nodes: SketchNode[] } };

export type LessonBlock =
  | { t: "p"; text: string } // supports **bold** and `code`
  | { t: "list"; items: string[] }
  | { t: "steps"; items: { title: string; detail: string }[] }
  | { t: "prompt"; title: string; text: string } // a prompt to copy into the AI chat
  | { t: "code"; lang: string; text: string }
  | { t: "tip"; text: string }
  | { t: "warn"; text: string }
  | { t: "figure"; figure: Figure }
  | { t: "table"; columns: string[]; rows: string[][] }
  | { t: "tool"; slug: string; why: string } // links to one of our free tools
  /**
   * Jargon buster: a word explained with something from everyday Nigerian life first (`like`),
   * then in plain English. `also` lists other words this box explains (e.g. an abbreviation).
   */
  | { t: "define"; term: string; like: string; meaning: string; also?: string[] }
  /** A real-life story showing where the idea is used. */
  | { t: "scenario"; title: string; text: string }
  /** Practise now, in real life. Ticked in the browser; no XP (XP is server-awarded). */
  | { t: "try"; title: string; minutes: number; steps: string[] }
  /** A quick self-check with instant feedback. Practice only: not graded. */
  | { t: "check"; q: string; options: string[]; answer: number; why: string }
  /** Common mistakes, each with the fix. */
  | { t: "mistakes"; items: { wrong: string; right: string }[] }
  /** A hand-drawn style sketch of the idea. `caption` says in words what it shows. */
  | { t: "sketch"; sketch: Sketch; caption: string }
  /** A milestone moment: what the learner just did, what it proves, and the reward waiting. */
  | { t: "win"; title: string; proved: string; cue: string }
  /** Something taught properly in a later lesson: name it, and give the exact steps for now. */
  | { t: "later"; lesson: string; text: string }
  /** The optional paid upgrade, for once the learner is earning. Never needed to finish a lesson. */
  | { t: "upgrade"; title: string; text: string }
  /** What an error or warning message on screen means, and what to do. */
  | { t: "errors"; items: { see: string; means: string; fix: string }[] }
  /**
   * Steps that differ by how the learner builds: Antigravity (free, the default), Claude Code
   * (paid, optional) or a free AI chat with copy and paste (the backup). The learner picks once.
   */
  | { t: "builder"; title: string; antigravity: BuilderStep[]; claudeCode: BuilderStep[]; chat: BuilderStep[] };

export type BuilderStep = { title: string; detail: string };

export type Question = {
  q: string;
  options: string[];
  answer: number; // index into options
  why: string; // explanation shown after passing
  /** Index into the lesson's `recap` - the takeaway that teaches this answer. */
  from?: number;
  /**
   * Why the question earns its place: "core" tests the lesson's one big idea; a lesson id names
   * the later lesson that builds on this; "client-work" is what real client work needs next.
   */
  aim?: "core" | "client-work" | (string & {});
};

export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  /** What the student has at the end of the lesson. */
  outcome: string;
  intro: string;
  /** The one idea that must stick, in a sentence. */
  core: string;
  /** What to have ready before starting. Everything required is free; paid things start with "Optional". */
  youNeed: string[];
  sections: { heading: string; blocks: LessonBlock[] }[];
  task: { title: string; steps: string[]; done: string[] };
  /** Key takeaways. Every quiz question points at one of these. */
  recap: string[];
  resources: { label: string; url: string; note: string }[];
  quiz: Question[];
  /** The moment the lesson is complete: what they did, what it proves, and its milestone badge. */
  celebrate: { title: string; proved: string; badge: string; badgeDesc: string };
};
