import "server-only";
import { listCertificates } from "@/lib/certificates";
import type { Track } from "@/lib/curriculum";
import { emptyState, type FinalRow, type LearnerState, type LessonRow, levelFor, streaks, trackProgress } from "@/lib/learning/engine";
import { getStore } from "@/lib/learning/store";
import { createAdminClient } from "@/lib/supabase/admin";
import { type AffairsInput, flagsFor, lastActive, tracksFor } from "./affairs";

/* ---------- Helpers ---------- */

/** Read a whole table past the Data API's 1000-row page limit. */
async function all<T>(table: string, columns: string): Promise<T[]> {
  const db = createAdminClient();
  const out: T[] = [];
  for (let from = 0; from < 200_000; from += 1000) {
    const { data, error } = await db.from(table).select(columns).range(from, from + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    out.push(...((data ?? []) as T[]));
    if (!data || data.length < 1000) break;
  }
  return out;
}

export type Payment = { id: number; user_id: string; reference: string; provider: string; plan: string; amount_kobo: number; currency: string; status: string; created_at: string };
type Sub = { user_id: string; status: string; plan: Track["id"]; current_period_end: string; created_at: string };
type AuthUser = { id: string; email: string; name: string; whatsapp: string | null; joined: string; lastSignIn: string | null; confirmed: boolean };

export type Student = AuthUser & {
  plan: Track["id"] | null;
  accessEnd: string | null;
  active: boolean;
  paidKobo: number;
  xp: number;
  level: string;
  lessonsDone: number;
  pct: number;
  lastActive: string | null;
  streak: number;
  finalPassed: boolean;
  state: LearnerState;
};

/* ---------- Everyone, joined up ---------- */

async function usersAndData() {

  const db = createAdminClient();
  const users: AuthUser[] = [];
  for (let page = 1; page < 200; page++) {
    const { data, error } = await db.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    for (const u of data.users) {
      const meta = (u.user_metadata ?? {}) as Record<string, unknown>;
      users.push({
        id: u.id,
        email: u.email ?? "",
        name: typeof meta.name === "string" ? meta.name : "",
        whatsapp: typeof meta.whatsapp === "string" && meta.whatsapp ? meta.whatsapp : null,
        joined: u.created_at,
        lastSignIn: u.last_sign_in_at ?? null,
        confirmed: Boolean(u.email_confirmed_at),
      });
    }
    if (data.users.length < 1000) break;
  }

  const [profiles, subs, payments, lessons, finals, xp, days] = await Promise.all([
    all<{ id: string; name: string; whatsapp_number: string | null }>("profiles", "id, name, whatsapp_number"),
    all<Sub>("subscriptions", "user_id, status, plan, current_period_end, created_at"),
    all<Payment>("payments", "id, user_id, reference, provider, plan, amount_kobo, currency, status, created_at"),
    all<LessonRow & { user_id: string }>("lesson_progress", "user_id, lesson_id, quiz_best, quiz_total, quiz_passed_at, task_done_at, completed_at"),
    all<FinalRow & { user_id: string }>("final_exams", "user_id, track, best, total, passed_at, certificate_id"),
    all<{ user_id: string; xp: number }>("xp_events", "user_id, xp"),
    all<{ user_id: string; day: string }>("activity_days", "user_id, day"),
  ]);

  // The profile (editable) wins over signup metadata for name and WhatsApp.
  const prof = new Map(profiles.map((p) => [p.id, p]));
  for (const u of users) {
    const p = prof.get(u.id);
    if (p?.name) u.name = p.name;
    if (p?.whatsapp_number) u.whatsapp = p.whatsapp_number;
  }

  const states = new Map<string, LearnerState>();
  const st = (id: string) => states.get(id) ?? (states.set(id, emptyState()), states.get(id)!);
  for (const r of lessons) st(r.user_id).lessons[r.lesson_id] = r;
  for (const r of finals) st(r.user_id).finals[r.track] = r;
  for (const r of xp) st(r.user_id).xp += r.xp;
  for (const r of days) st(r.user_id).days.push(r.day);
  return { users, subs, payments, states };
}

function toStudent(u: AuthUser, sub: Sub | undefined, state: LearnerState, paidKobo: number, now = Date.now()): Student {
  const plan = sub?.plan ?? null;
  const track = tracksFor(plan)[0];
  const prog = track ? trackProgress(track, state) : null;
  return {
    ...u,
    plan,
    accessEnd: sub?.current_period_end ?? null,
    active: Boolean(sub && new Date(sub.current_period_end).getTime() > now),
    paidKobo,
    xp: state.xp,
    level: levelFor(state.xp).name,
    lessonsDone: Object.values(state.lessons).filter((l) => l.completed_at).length,
    pct: prog?.pct ?? 0,
    lastActive: lastActive(state),
    streak: streaks(state.days).current,
    finalPassed: Boolean(track && state.finals[track.id]?.passed_at),
    state,
  };
}

export async function listStudents(): Promise<{ students: Student[]; payments: Payment[] }> {
  const { users, subs, payments, states } = await usersAndData();
  const subOf = new Map(subs.map((s) => [s.user_id, s]));
  const paid = new Map<string, number>();
  for (const p of payments) if (p.status === "success" && p.provider !== "demo") paid.set(p.user_id, (paid.get(p.user_id) ?? 0) + p.amount_kobo);
  const students = users
    .map((u) => toStudent(u, subOf.get(u.id), states.get(u.id) ?? emptyState(), paid.get(u.id) ?? 0))
    .sort((a, b) => b.joined.localeCompare(a.joined));
  return { students, payments: payments.sort((a, b) => b.created_at.localeCompare(a.created_at)) };
}

export async function getStudent(id: string) {
  const { students, payments } = await listStudents();
  const s = students.find((x) => x.id === id);
  if (!s) return null;
  // Load the full state through the store so it matches exactly what the learner sees.
  const state = await getStore().load(id);
  return {
    student: { ...s, state },
    payments: payments.filter((p) => p.user_id === id),
    notes: await listNotes(id),
    certificates: await listCertificates(id),
    flags: flagsFor(s as AffairsInput),
  };
}

export function affairsQueue(students: Student[]) {
  return students
    .flatMap((s) => flagsFor(s).map((f) => ({ student: s, flag: f })))
    .sort((a, b) => b.flag.severity - a.flag.severity || a.student.name.localeCompare(b.student.name));
}

/* ---------- Notes and audit ---------- */
export type Note = { id: number; user_id: string; author: string; body: string; created_at: string };

export async function listNotes(userId?: string, limit = 200): Promise<Note[]> {
  let q = createAdminClient().from("student_notes").select("*").order("created_at", { ascending: false }).limit(limit);
  if (userId) q = q.eq("user_id", userId);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Note[];
}

export async function addNote(userId: string, author: string, body: string) {
  const row = { user_id: userId, author, body, created_at: new Date().toISOString() };
  const { error } = await createAdminClient().from("student_notes").insert(row);
  if (error) throw error;
}

export type AuditRow = { id: number; actor: string; action: string; target: string | null; detail: unknown; created_at: string };

export async function audit(actor: string, action: string, target?: string, detail?: unknown) {
  const row = { actor, action, target: target ?? null, detail: detail ?? null, created_at: new Date().toISOString() };
  try {
    await createAdminClient().from("admin_audit").insert(row);
  } catch (e) {
    console.error("audit", e);
  }
}

export async function listAudit(limit = 300): Promise<AuditRow[]> {
  const { data, error } = await createAdminClient().from("admin_audit").select("*").order("created_at", { ascending: false }).limit(limit);
  if (error) throw error;
  return (data ?? []) as AuditRow[];
}

/* ---------- Waitlist ---------- */
export type WaitRow = { email: string; name: string; whatsapp: string | null; source: string; created_at: string };

export async function listWaitlist(): Promise<WaitRow[]> {
  return (await all<WaitRow>("waitlist", "email, name, whatsapp, source, created_at")).sort((a, b) => b.created_at.localeCompare(a.created_at));
}

/* ---------- Membership changes ---------- */
export async function setAccess(userId: string, plan: Track["id"], periodEnd: Date) {
  const { error } = await createAdminClient()
    .from("subscriptions")
    .upsert({ user_id: userId, status: "active", plan, current_period_end: periodEnd.toISOString(), updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  if (error) throw error;
}

export async function endAccess(userId: string) {
  const { error } = await createAdminClient()
    .from("subscriptions")
    .update({ status: "cancelled", current_period_end: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("user_id", userId);
  if (error) throw error;
}

export async function updateProfile(userId: string, name: string, whatsapp: string | null) {
  const { error } = await createAdminClient().from("profiles").upsert({ id: userId, name, whatsapp_number: whatsapp }, { onConflict: "id" });
  if (error) throw error;
}

/* ---------- Setup health ---------- */
export const TABLES = ["waitlist", "profiles", "subscriptions", "payments", "lesson_progress", "xp_events", "activity_days", "final_exams", "page_views", "posts", "certificates", "student_notes", "admin_audit"];

export async function tableStatus(): Promise<{ table: string; ok: boolean; rows: number | null; error?: string }[]> {
  const db = createAdminClient();
  return Promise.all(
    TABLES.map(async (t) => {
      const { count, error } = await db.from(t).select("*", { count: "exact", head: true });
      return { table: t, ok: !error, rows: error ? null : (count ?? 0), error: error?.message };
    }),
  );
}

/** Successful, non-demo revenue in kobo over the last `days` days (optionally for one plan). */
export function revenue(payments: Payment[], days: number, plan?: string, now = Date.now()) {
  return payments
    .filter((p) => p.status === "success" && p.provider !== "demo" && (!plan || p.plan === plan) && now - new Date(p.created_at).getTime() < days * 86400_000)
    .reduce((a, p) => a + p.amount_kobo, 0);
}

/** An ISO date `days` ago, for "active in the last N days" comparisons. */
export const daysAgo = (days: number) => new Date(Date.now() - days * 86400_000).toISOString().slice(0, 10);
