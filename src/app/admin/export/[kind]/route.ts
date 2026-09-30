import { requireAdmin } from "@/lib/admin/auth";
import { listStudents, listWaitlist } from "@/lib/admin/data";

const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const csv = (rows: unknown[][]) => rows.map((r) => r.map(esc).join(",")).join("\n");

/** CSV downloads for the admin (students, payments, waitlist). */
export async function GET(_: Request, { params }: { params: Promise<{ kind: string }> }) {
  await requireAdmin();
  const { kind } = await params;
  let body: string;
  if (kind === "students") {
    const { students } = await listStudents();
    body = csv([
      ["name", "email", "whatsapp", "joined", "track", "access_until", "active", "progress_pct", "lessons_done", "xp", "last_active", "streak", "final_passed", "paid_ngn"],
      ...students.map((s) => [s.name, s.email, s.whatsapp, s.joined, s.plan, s.accessEnd, s.active, s.pct, s.lessonsDone, s.xp, s.lastActive, s.streak, s.finalPassed, s.paidKobo / 100]),
    ]);
  } else if (kind === "payments") {
    const { students, payments } = await listStudents();
    const email = new Map(students.map((s) => [s.id, s.email]));
    body = csv([["date", "email", "plan", "amount", "currency", "provider", "status", "reference"], ...payments.map((p) => [p.created_at, email.get(p.user_id), p.plan, p.amount_kobo / 100, p.currency, p.provider, p.status, p.reference])]);
  } else if (kind === "waitlist") {
    body = csv([["date", "name", "email", "whatsapp", "source"], ...(await listWaitlist()).map((w) => [w.created_at, w.name, w.email, w.whatsapp, w.source])]);
  } else return new Response("Not found", { status: 404 });

  return new Response("﻿" + body, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${kind}-${new Date().toISOString().slice(0, 10)}.csv"`, "Cache-Control": "no-store" },
  });
}
