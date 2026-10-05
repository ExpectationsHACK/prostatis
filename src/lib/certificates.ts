import "server-only";
import type { Track } from "@/lib/curriculum";
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
  const db = createAdminClient();
  const { error } = await db.from(T).upsert({ ...c }, { onConflict: "user_id,track", ignoreDuplicates: true });
  if (error) throw error;
  const { data, error: e2 } = await db.from(T).select("*").eq("user_id", c.user_id).eq("track", c.track).single();
  if (e2) throw e2;
  return data as Certificate;
}

export async function getCertificate(id: string): Promise<Certificate | null> {
  if (!/^[A-Z0-9-]{8,40}$/.test(id)) return null;
  const { data } = await createAdminClient().from(T).select("*").eq("id", id).maybeSingle();
  return (data as Certificate | null) ?? null;
}

export async function listCertificates(userId?: string): Promise<Certificate[]> {
  let q = createAdminClient().from(T).select("*").order("issued_at", { ascending: false }).limit(1000);
  if (userId) q = q.eq("user_id", userId);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Certificate[];
}

export async function updateCertificate(id: string, patch: Partial<Pick<Certificate, "name" | "emailed_at" | "revoked_at" | "email">>) {
  const { error } = await createAdminClient().from(T).update(patch).eq("id", id);
  if (error) throw error;
}
