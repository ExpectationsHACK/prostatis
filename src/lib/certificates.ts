import "server-only";
import type { Track } from "@/lib/curriculum";
import { readTable, writeTable } from "@/lib/data/local";
import { previewMode } from "@/lib/learning/store";
import { createAdminClient } from "@/lib/supabase/admin";

export type Certificate = {
  id: string;
  user_id: string;
  track: Track["id"];
  name: string;
  email: string | null;
  score: number;
  total: number;
  issued_at: string;
  emailed_at: string | null;
  revoked_at: string | null;
};

const T = "certificates";

/** Record a certificate once per (student, track). Returns the stored one either way. */
export async function issueCertificate(c: Omit<Certificate, "emailed_at" | "revoked_at">): Promise<Certificate> {
  if (previewMode) {
    return writeTable<Certificate, Certificate>(T, (rows) => {
      const found = rows.find((r) => r.user_id === c.user_id && r.track === c.track);
      if (found) return found;
      const row = { ...c, emailed_at: null, revoked_at: null };
      rows.push(row);
      return row;
    });
  }
  const db = createAdminClient();
  const { error } = await db.from(T).upsert({ ...c }, { onConflict: "user_id,track", ignoreDuplicates: true });
  if (error) throw error;
  const { data, error: e2 } = await db.from(T).select("*").eq("user_id", c.user_id).eq("track", c.track).single();
  if (e2) throw e2;
  return data as Certificate;
}

export async function getCertificate(id: string): Promise<Certificate | null> {
  if (!/^[A-Z0-9-]{8,40}$/.test(id)) return null;
  if (previewMode) return (await readTable<Certificate>(T)).find((r) => r.id === id) ?? null;
  const { data } = await createAdminClient().from(T).select("*").eq("id", id).maybeSingle();
  return (data as Certificate | null) ?? null;
}

export async function listCertificates(userId?: string): Promise<Certificate[]> {
  if (previewMode) {
    const rows = await readTable<Certificate>(T);
    return rows.filter((r) => !userId || r.user_id === userId).sort((a, b) => b.issued_at.localeCompare(a.issued_at));
  }
  let q = createAdminClient().from(T).select("*").order("issued_at", { ascending: false }).limit(1000);
  if (userId) q = q.eq("user_id", userId);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Certificate[];
}

export async function updateCertificate(id: string, patch: Partial<Pick<Certificate, "name" | "emailed_at" | "revoked_at" | "email">>) {
  if (previewMode) {
    await writeTable<Certificate>(T, (rows) => {
      const r = rows.find((x) => x.id === id);
      if (r) Object.assign(r, patch);
    });
    return;
  }
  const { error } = await createAdminClient().from(T).update(patch).eq("id", id);
  if (error) throw error;
}
