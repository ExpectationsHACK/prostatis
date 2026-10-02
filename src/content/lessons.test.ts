import { describe, expect, it, vi } from "vitest";
import type { Lesson, LessonBlock } from "./types";

vi.mock("server-only", () => ({}));

const { lessons } = await import("./lessons");
const { fastTrack, mainTrack, tracks } = await import("@/lib/curriculum");
const { getTool } = await import("@/lib/tools");
const { finalQuestions } = await import("@/lib/learning/engine");
const { jargon } = await import("./jargon");
const { glyphs } = await import("@/components/art/sketch-glyphs");

const all = Object.values(lessons);
const blocksOf = (l: Lesson) => l.sections.flatMap((s) => s.blocks);

describe("course content", () => {
  it("has a written lesson for every day of both tracks", () => {
    for (const t of tracks) for (const m of t.modules) expect(lessons[m.lesson], `${t.id} day ${m.day}`).toBeDefined();
    expect(fastTrack.modules).toHaveLength(14);
    expect(mainTrack.modules).toHaveLength(26);
    for (const t of tracks) expect(t.modules.map((m) => m.day)).toEqual(t.modules.map((_, i) => i + 1));
  });

  it("uses every lesson in at least one track", () => {
    const used = new Set(tracks.flatMap((t) => t.modules.map((m) => m.lesson)));
    for (const l of all) expect(used.has(l.id), l.id).toBe(true);
  });

  it.each(all.map((l) => [l.id, l] as const))("%s is complete and well-formed", (_, l) => {
    expect(l.title.length).toBeGreaterThan(5);
    expect(l.outcome.length).toBeGreaterThan(20);
    expect(l.intro.length).toBeGreaterThan(150);
    expect(l.core.length, "the one idea to remember").toBeGreaterThan(20);
    expect(l.sections.length).toBeGreaterThanOrEqual(3);
    for (const s of l.sections) expect(s.blocks.length).toBeGreaterThan(0);
    expect(l.task.steps.length).toBeGreaterThanOrEqual(3);
    expect(l.task.done.length).toBeGreaterThanOrEqual(3);
    expect(l.resources.length).toBeGreaterThanOrEqual(3);
    for (const r of l.resources) expect(r.url).toMatch(/^https:\/\//);

    // At least one illustration per lesson.
    expect(blocksOf(l).some((b) => b.t === "figure" || b.t === "sketch")).toBe(true);

    // Every tool the lesson points to exists.
    for (const b of blocksOf(l)) {
      if (b.t === "tool") expect(getTool(b.slug), `${l.id} → ${b.slug}`).toBeDefined();
      if (b.t === "figure" && "tool" in b.figure) expect(getTool(b.figure.tool), `${l.id} fig → ${b.figure.tool}`).toBeDefined();
    }
  });

  it.each(all.map((l) => [l.id, l] as const))("%s teaches for complete beginners", (_, l) => {
    const blocks = blocksOf(l);
    const count = (t: LessonBlock["t"]) => blocks.filter((b) => b.t === t).length;
    expect(count("define"), "plain-English definitions").toBeGreaterThanOrEqual(2);
    expect(count("scenario"), "real-life scenario").toBeGreaterThanOrEqual(1);
    expect(count("try"), "try-it-now practice").toBeGreaterThanOrEqual(1);
    expect(count("check"), "self-check").toBeGreaterThanOrEqual(1);
    expect(count("sketch"), "hand-drawn sketches").toBeGreaterThanOrEqual(2);
    expect(l.youNeed.length).toBeGreaterThanOrEqual(3);
    expect(l.recap.length).toBeGreaterThanOrEqual(5);
    for (const b of blocks) {
      if (b.t === "define") {
        expect(b.like.length, `${b.term}: everyday analogy`).toBeGreaterThan(15);
        expect(b.meaning.length, `${b.term}: plain meaning`).toBeGreaterThan(20);
      }
      if (b.t === "check") {
        expect(b.answer).toBeLessThan(b.options.length);
        // Practice checks must not simply leak the graded questions.
        expect(l.quiz.map((q) => q.q)).not.toContain(b.q);
      }
      if (b.t === "try") expect(b.steps.length).toBeGreaterThanOrEqual(2);
      if (b.t === "sketch") {
        const s = b.sketch;
        const nodes = s.layout === "flow" ? s.nodes : s.layout === "versus" ? [...s.left.nodes, ...s.right.nodes] : [];
        for (const n of nodes) expect(n.draw in glyphs, `${l.id}: glyph ${n.draw}`).toBe(true);
        if (s.layout === "flow") {
          expect(s.nodes.length, `${l.id}: a flow sketch fits 2–4 drawings`).toBeGreaterThanOrEqual(2);
          expect(s.nodes.length).toBeLessThanOrEqual(4);
          expect((s.arrows ?? []).length).toBeLessThan(s.nodes.length);
        }
        if (s.layout === "stack") expect(s.rows.length).toBeGreaterThanOrEqual(3);
        expect(b.caption.length).toBeGreaterThan(20);
      }
      if (b.t === "builder") {
        // Every builder box covers all three ways to build, so nobody is left without steps.
        for (const path of [b.antigravity, b.claudeCode, b.chat]) expect(path.length, `${l.id}: ${b.title}`).toBeGreaterThan(0);
      }
      if (b.t === "win") {
        expect(b.proved.length).toBeGreaterThan(20);
        expect(b.cue.length).toBeGreaterThan(10);
      }
    }
    // A lesson-specific celebration, not a generic "great job".
    expect(l.celebrate.title.length).toBeGreaterThan(10);
    expect(l.celebrate.proved.length).toBeGreaterThan(30);
    expect(l.celebrate.badge.length).toBeGreaterThan(3);
  });

  it("gives every lesson its own milestone badge name", () => {
    const names = all.map((l) => l.celebrate.badge);
    expect(new Set(names).size).toBe(names.length);
  });

  it.each(all.map((l) => [l.id, l] as const))("%s never requires a paid account", (_, l) => {
    const money = /\$\s?\d|₦\s?\d|paid plan|subscription|\bPro plan\b|\bpay for\b/i;
    for (const n of l.youNeed) if (money.test(n)) expect(n, "paid items must be optional").toMatch(/^Optional/i);
  });

  // Every assessed idea must be taught, each question points at a takeaway, and that
  // takeaway contains the key words of the correct answer.
  const stop = new Set("about after again always because before being could every their there these thing things those through under until what when where which while would your yours with from that this they them then than only just into also have more most other some such very will should must".split(" "));
  const clean = (x: string) => x.toLowerCase().replace(/\*\*/g, "").replace(/(\d),(\d)/g, "$1$2");
  const tokens = (x: string) =>
    clean(x)
      .replace(/[^a-z0-9₦. ]/g, " ")
      .split(/\s+/)
      .map((w) => w.replace(/^\.+|\.+$/g, ""))
      .filter((w) => (/\d/.test(w) ? w.length > 0 : w.length >= 4 && !stop.has(w)));
  // A word counts as taught if the takeaway contains it (numbers exactly, words by their stem).
  const taught = (take: string, w: string) => clean(take).includes(/\d/.test(w) ? w : w.slice(0, 5));
  it.each(all.map((l) => [l.id, l] as const))("%s: every quiz answer is taught in the key takeaways", (_, l) => {
    for (const q of l.quiz) {
      expect(q.from, q.q).toBeTypeOf("number");
      const take = l.recap[q.from!];
      expect(take, q.q).toBeDefined();
      const shared = tokens(q.options[q.answer]).filter((w) => taught(take, w));
      expect(shared.length, `"${q.options[q.answer]}" not found in takeaway "${take}"`).toBeGreaterThan(0);
    }
  });

  it.each(all.map((l) => [l.id, l] as const))("%s has a sound 5-question quiz", (_, l) => {
    expect(l.quiz).toHaveLength(5);
    for (const q of l.quiz) {
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(new Set(q.options).size, q.q).toBe(q.options.length);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
      expect(q.why.length).toBeGreaterThan(10);
    }
    // Answers aren't all in the same position.
    expect(new Set(l.quiz.map((q) => q.answer)).size).toBeGreaterThan(1);
  });

  /** Day of a lesson in a track, or undefined. */
  const dayIn = (t: (typeof tracks)[number], id: string) => t.modules.find((m) => m.lesson === id)?.day;

  // Rule 5: each question tests the lesson's core idea, or something a named later lesson needs.
  it.each(all.map((l) => [l.id, l] as const))("%s: every question earns its place", (_, l) => {
    expect(l.quiz.filter((q) => q.aim === "core").length, "at least one question on the core idea").toBeGreaterThanOrEqual(1);
    for (const q of l.quiz) {
      expect(q.aim, `"${q.q}" needs an aim`).toBeTruthy();
      if (q.aim === "core" || q.aim === "client-work") continue;
      expect(lessons[q.aim!], `"${q.q}" aims at unknown lesson ${q.aim}`).toBeDefined();
      const both = tracks.filter((t) => dayIn(t, l.id) && dayIn(t, q.aim!));
      expect(both.length, `"${q.q}": ${q.aim} isn't in a track with ${l.id}`).toBeGreaterThan(0);
      for (const t of both) expect(dayIn(t, q.aim!)!, `"${q.q}": ${q.aim} must come after ${l.id} in ${t.id}`).toBeGreaterThan(dayIn(t, l.id)!);
    }
  });

  // Rule 4: "coming later" notes point at a lesson that really comes later.
  it.each(all.map((l) => [l.id, l] as const))("%s: coming-later notes point forward", (_, l) => {
    for (const b of blocksOf(l)) {
      if (b.t !== "later") continue;
      expect(lessons[b.lesson], `later → ${b.lesson}`).toBeDefined();
      for (const t of tracks) {
        const here = dayIn(t, l.id);
        const there = dayIn(t, b.lesson);
        if (here && there) expect(there, `${b.lesson} must come after ${l.id} in ${t.id}`).toBeGreaterThan(here);
      }
    }
  });

  // Rule 1: no technical word before its jargon box, in this lesson or an earlier one in the track.
  const textsOf = (l: Lesson): { where: string; text: string; defines?: string[] }[] => {
    const out: { where: string; text: string; defines?: string[] }[] = [
      { where: "outcome", text: l.outcome },
      { where: "intro", text: l.intro },
      ...l.youNeed.map((n) => ({ where: "you'll need", text: n })),
    ];
    for (const s of l.sections) {
      out.push({ where: `heading "${s.heading}"`, text: s.heading });
      for (const b of s.blocks) {
        const at = `${s.heading} › ${b.t}`;
        switch (b.t) {
          case "p": case "tip": case "warn": out.push({ where: at, text: b.text }); break;
          case "list": b.items.forEach((x) => out.push({ where: at, text: x })); break;
          case "steps": b.items.forEach((x) => out.push({ where: `${at} "${x.title}"`, text: `${x.title} ${x.detail}` })); break;
          case "table": out.push({ where: at, text: [...b.columns, ...b.rows.flat()].join(" | ") }); break;
          case "tool": out.push({ where: at, text: b.why }); break;
          case "figure": out.push({ where: at, text: b.figure.caption }); break;
          case "define": out.push({ where: `${at} ${b.term}`, text: `${b.like} ${b.meaning}`, defines: [b.term, ...(b.also ?? [])] }); break;
          case "scenario": out.push({ where: at, text: `${b.title} ${b.text}` }); break;
          case "try": out.push({ where: at, text: [b.title, ...b.steps].join(" ") }); break;
          case "check": out.push({ where: at, text: [b.q, ...b.options, b.why].join(" ") }); break;
          case "mistakes": b.items.forEach((x) => out.push({ where: at, text: `${x.wrong} ${x.right}` })); break;
          case "win": out.push({ where: at, text: `${b.title} ${b.proved} ${b.cue}` }); break;
          case "later": case "upgrade": out.push({ where: at, text: "title" in b ? `${b.title} ${b.text}` : b.text }); break;
          case "errors": b.items.forEach((x) => out.push({ where: at, text: `${x.means} ${x.fix}` })); break;
          case "builder": [b.title, ...[...b.antigravity, ...b.claudeCode, ...b.chat].map((x) => `${x.title} ${x.detail}`)].forEach((x) => out.push({ where: at, text: x })); break;
          case "sketch": {
            const s = b.sketch;
            const labels = s.layout === "flow" ? [...s.nodes.map((n) => n.label), ...(s.arrows ?? []), s.loop ?? ""] : s.layout === "stack" ? s.rows : [s.left.title, s.right.title, ...s.left.nodes.map((n) => n.label), ...s.right.nodes.map((n) => n.label)];
            out.push({ where: at, text: [...labels, b.caption].join(" | ") });
            break;
          }
          // Prompts and code are written for the AI, not the learner.
          case "prompt": case "code": break;
        }
      }
    }
    out.push({ where: "mission", text: [l.task.title, ...l.task.steps, ...l.task.done].join(" ") });
    l.recap.forEach((r) => out.push({ where: "takeaways", text: r }));
    out.push({ where: "core idea", text: l.core });
    l.quiz.forEach((q) => out.push({ where: "assessment", text: [q.q, ...q.options, q.why].join(" ") }));
    out.push({ where: "celebration", text: `${l.celebrate.title} ${l.celebrate.proved}` });
    return out;
  };

  it("has a jargon box for every listed term somewhere in the course", () => {
    const defined = new Set(all.flatMap((l) => blocksOf(l).flatMap((b) => (b.t === "define" ? [b.term, ...(b.also ?? [])] : []))));
    const missing = jargon.filter((j) => !defined.has(j.term)).map((j) => j.term);
    expect(missing).toEqual([]);
  });

  it.each(tracks.map((t) => [t.id, t] as const))("%s explains every technical word before using it", (_, t) => {
    const known = new Set<string>();
    const problems: string[] = [];
    for (const m of t.modules) {
      const l = lessons[m.lesson];
      for (const chunk of textsOf(l)) {
        // A jargon box may use its own word; the rest must already be explained.
        for (const d of chunk.defines ?? []) known.add(d);
        for (const j of jargon) {
          if (known.has(j.term)) continue;
          const hit = chunk.text.replace(/`[^`]*`/g, "").match(j.match);
          if (hit) problems.push(`Day ${m.day} ${l.id} (${chunk.where}): "${hit[0]}" used before "${j.term}" is explained`);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it("draws a final exam with one question per lesson", () => {
    for (const t of tracks) {
      const qs = finalQuestions(t, (id) => lessons[id].quiz);
      expect(qs).toHaveLength(t.modules.length);
      expect(qs.every(Boolean)).toBe(true);
    }
  });
});
