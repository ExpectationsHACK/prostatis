import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/env";
import { emptyState, type FinalRow, type LearnerState, type LessonRow } from "./engine";

/**
 * Where learning progress lives. In production it's Supabase (written only with the secret
 * key, after the server has graded the work). In local development without Supabase it's a
 * JSON file in .data/ so the course can be tried end to end.
 */
export type Store = {
  load(userId: string): Promise<LearnerState>;
  saveLesson(userId: string, row: LessonRow): Promise<void>;
  saveFinal(userId: string, row: FinalRow): Promise<void>;
  /** Idempotent per (kind, ref). Returns true only the first time. */
  award(userId: string, kind: string, ref: string, xp: number): Promise<boolean>;
  touchDay(userId: string, day: string): Promise<void>;
};

/* ---------- Supabase ---------- */
const supabaseStore: Store = {
  async load(userId) {
    const db = createAdminClient();
    const [lessons, finals, xp, days] = await Promise.all([
      db.from("lesson_progress").select("lesson_id, quiz_best, quiz_total, quiz_passed_at, task_done_at, completed_at").eq("user_id", userId),
      db.from("final_exams").select("track, best, total, passed_at, certificate_id, updated_at").eq("user_id", userId),
      db.from("xp_events").select("xp").eq("user_id", userId),
      db.from("activity_days").select("day").eq("user_id", userId).order("day", { ascending: false }).limit(400),
    ]);
    for (const r of [lessons, finals, xp, days]) if (r.error) throw r.error;
    const s = emptyState();
    for (const r of (lessons.data ?? []) as LessonRow[]) s.lessons[r.lesson_id] = r;
    for (const r of (finals.data ?? []) as FinalRow[]) s.finals[r.track] = r;
    s.xp = ((xp.data ?? []) as { xp: number }[]).reduce((a, r) => a + r.xp, 0);
    s.days = ((days.data ?? []) as { day: string }[]).map((r) => r.day);
    return s;
  },
  async saveLesson(userId, row) {
    const { error } = await createAdminClient()
      .from("lesson_progress")
      .upsert({ user_id: userId, ...row, updated_at: new Date().toISOString() }, { onConflict: "user_id,lesson_id" });
    if (error) throw error;
  },
  async saveFinal(userId, row) {
    const { error } = await createAdminClient()
      .from("final_exams")
      .upsert({ user_id: userId, ...row, updated_at: new Date().toISOString() }, { onConflict: "user_id,track" });
    if (error) throw error;
  },
  async award(userId, kind, ref, xp) {
    const { data, error } = await createAdminClient()
      .from("xp_events")
      .upsert({ user_id: userId, kind, ref, xp }, { onConflict: "user_id,kind,ref", ignoreDuplicates: true })
      .select("kind");
    if (error) throw error;
    return Boolean(data?.length);
  },
  async touchDay(userId, day) {
    const { error } = await createAdminClient()
      .from("activity_days")
      .upsert({ user_id: userId, day }, { onConflict: "user_id,day", ignoreDuplicates: true });
    if (error) throw error;
  },
};

/* ---------- Local file (development preview only) ---------- */
type FileDb = Record<string, LearnerState & { events: string[] }>;
const file = path.join(process.cwd(), ".data", "learning.json");
let queue: Promise<unknown> = Promise.resolve();

async function readDb(): Promise<FileDb> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as FileDb;
  } catch {
    return {};
  }
}

/** Serialise read-modify-write so concurrent actions don't clobber each other. */
function mutate<T>(userId: string, fn: (s: LearnerState & { events: string[] }) => T): Promise<T> {
  const run = queue.then(async () => {
    const db = await readDb();
    const s = (db[userId] ??= { ...emptyState(), events: [] });
    const out = fn(s);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(db, null, 2));
    return out;
  });
  queue = run.catch(() => undefined);
  return run;
}

const fileStore: Store = {
  async load(userId) {
    await queue;
    const s = (await readDb())[userId];
    return s ? { lessons: s.lessons, finals: s.finals, xp: s.xp, days: s.days } : emptyState();
  },
  saveLesson: (userId, row) => mutate(userId, (s) => void (s.lessons[row.lesson_id] = row)),
  saveFinal: (userId, row) => mutate(userId, (s) => void (s.finals[row.track] = row)),
  award: (userId, kind, ref, xp) =>
    mutate(userId, (s) => {
      const key = `${kind}:${ref}`;
      if (s.events.includes(key)) return false;
      s.events.push(key);
      s.xp += xp;
      return true;
    }),
  touchDay: (userId, day) => mutate(userId, (s) => void (s.days.includes(day) || s.days.push(day))),
};

// Local development only: no Supabase yet, or COURSE_PREVIEW=true to read the course without signing in.
export const previewMode = process.env.NODE_ENV === "development" && (!supabaseConfigured || process.env.COURSE_PREVIEW === "true");

export function getStore(): Store {
  return previewMode ? fileStore : supabaseStore;
}
