"use server";

import { after } from "next/server";
import { getLesson } from "@/content/lessons";
import { emailCertificate } from "@/lib/certificate-delivery";
import { issueCertificate } from "@/lib/certificates";
import { learnerTrack, requireLearner } from "@/lib/learning/access";
import type { Track } from "@/lib/curriculum";
import {
  badges,
  certificateId,
  FINAL_PASS_MARK,
  finalQuestions,
  grade,
  lagosDay,
  levelFor,
  statusOf,
  streaks,
  trackProgress,
  XP,
  type Graded,
  type LearnerState,
  type LessonRow,
} from "@/lib/learning/engine";
import { getStore, type Store } from "@/lib/learning/store";

export type ActionResult =
  | { ok: false; error: string }
  | {
      ok: true;
      graded?: Graded;
      xpGained: number;
      completed: boolean;
      xp: number;
      streak: number;
      /** Set when this action pushed the learner into a new level. */
      levelUp?: { level: number; name: string };
      /** Badges earned by this action. */
      newBadges: { name: string; desc: string }[];
    };

async function open(slug: unknown, day: unknown) {
  if (typeof slug !== "string" || !Number.isInteger(day)) return null;
  const learner = await requireLearner(`/learn/${slug}/${day}`);
  const track = learnerTrack(learner, slug);
  const mod = track?.modules.find((m) => m.day === day);
  const lesson = mod && getLesson(mod.lesson);
  if (!track || !mod || !lesson) return null;
  const store = getStore();
  const state = await store.load(learner.id);
  if (statusOf(track, state, mod.day, { unlockAll: learner.preview }) === "locked") return null;
  return { learner, track, mod, lesson, store, state };
}

const blank = (lesson_id: string): LessonRow => ({ lesson_id, quiz_best: 0, quiz_total: 0, quiz_passed_at: null, task_done_at: null, completed_at: null });

/** A lesson is complete once its quiz is passed and its practical task is confirmed. */
async function finish(store: Store, userId: string, row: LessonRow) {
  let gained = 0;
  if (row.quiz_passed_at && row.task_done_at && !row.completed_at) {
    row.completed_at = new Date().toISOString();
    if (await store.award(userId, "lesson", row.lesson_id, XP.lesson)) gained += XP.lesson;
  }
  await store.saveLesson(userId, row);
  await store.touchDay(userId, lagosDay());
  return gained;
}

async function summary(store: Store, userId: string, track: Track, before: LearnerState, xpGained: number, completed: boolean, graded?: Graded): Promise<ActionResult> {
  const s: LearnerState = await store.load(userId);
  const was = levelFor(before.xp);
  const now = levelFor(s.xp);
  const had = new Set(badges(track, before).filter((b) => b.earned).map((b) => b.id));
  return {
    ok: true,
    graded,
    xpGained,
    completed,
    xp: s.xp,
    streak: streaks(s.days).current,
    levelUp: now.level > was.level ? { level: now.level, name: now.name } : undefined,
    newBadges: badges(track, s)
      .filter((b) => b.earned && !had.has(b.id))
      .map(({ name, desc }) => ({ name, desc })),
  };
}

export async function submitQuiz(slug: string, day: number, answers: number[]): Promise<ActionResult> {
  const ctx = await open(slug, day);
  if (!ctx) return { ok: false, error: "This lesson isn't open yet." };
  const { learner, lesson, store, state } = ctx;

  const g = grade(lesson.quiz, Array.isArray(answers) ? answers.slice(0, lesson.quiz.length) : []);
  const row = { ...(state.lessons[lesson.id] ?? blank(lesson.id)) };
  row.quiz_best = Math.max(row.quiz_best, g.score);
  row.quiz_total = g.total;
  let gained = 0;
  if (g.passed) {
    row.quiz_passed_at ??= new Date().toISOString();
    if (await store.award(learner.id, "quiz", lesson.id, g.score * XP.perCorrect)) gained += g.score * XP.perCorrect;
    if (g.score === g.total && (await store.award(learner.id, "perfect", lesson.id, XP.perfect))) gained += XP.perfect;
  }
  const wasDone = Boolean(row.completed_at);
  gained += await finish(store, learner.id, row);
  return summary(store, learner.id, ctx.track, state, gained, !wasDone && Boolean(row.completed_at), g);
}

export async function completeTask(slug: string, day: number): Promise<ActionResult> {
  const ctx = await open(slug, day);
  if (!ctx) return { ok: false, error: "This lesson isn't open yet." };
  const { learner, lesson, store, state } = ctx;

  const row = { ...(state.lessons[lesson.id] ?? blank(lesson.id)) };
  row.task_done_at ??= new Date().toISOString();
  let gained = (await store.award(learner.id, "task", lesson.id, XP.task)) ? XP.task : 0;
  const wasDone = Boolean(row.completed_at);
  gained += await finish(store, learner.id, row);
  return summary(store, learner.id, ctx.track, state, gained, !wasDone && Boolean(row.completed_at));
}

export async function submitFinal(slug: string, answers: number[]): Promise<ActionResult> {
  if (typeof slug !== "string") return { ok: false, error: "Unknown track." };
  const learner = await requireLearner(`/learn/${slug}/final`);
  const track = learnerTrack(learner, slug);
  if (!track) return { ok: false, error: "Unknown track." };
  const store = getStore();
  const state = await store.load(learner.id);
  if (!trackProgress(track, state).allDone) return { ok: false, error: "Finish every lesson to unlock the final assessment." };

  const questions = finalQuestions(track, (id) => getLesson(id)?.quiz ?? []);
  const g = grade(questions, Array.isArray(answers) ? answers.slice(0, questions.length) : [], FINAL_PASS_MARK);
  const prev = state.finals[track.id];
  const now = new Date();
  const row = {
    track: track.id,
    best: Math.max(prev?.best ?? 0, g.score),
    total: g.total,
    passed_at: prev?.passed_at ?? (g.passed ? now.toISOString() : null),
    certificate_id: prev?.certificate_id ?? (g.passed ? certificateId(learner.id, track.id, now) : null),
  };
  await store.saveFinal(learner.id, row);
  await store.touchDay(learner.id, lagosDay());
  if (row.passed_at && row.certificate_id) {
    // Record the certificate once, then email it after the response so the result shows instantly.
    const cert = await issueCertificate({
      id: row.certificate_id,
      user_id: learner.id,
      track: track.id,
      name: learner.name,
      email: learner.email || null,
      score: row.best,
      total: row.total,
      issued_at: row.passed_at,
    });
    if (!cert.emailed_at) after(() => emailCertificate(cert).catch((e) => console.error("certificate email", e)));
  }
  const gained = g.passed && (await store.award(learner.id, "final", track.id, XP.final)) ? XP.final : 0;
  return summary(store, learner.id, track, state, gained, g.passed, g);
}
