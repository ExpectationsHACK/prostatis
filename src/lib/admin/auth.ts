import "server-only";
import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";
import { previewMode } from "@/lib/learning/store";
import { adminConfigured, createAdminClient } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/supabase/server";

export type Admin = { id: string; email: string; name: string; preview: boolean };

/** Comma-separated ADMIN_EMAILS, lower-cased. Nobody is an admin when it's empty. */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * The signed-in admin, or a redirect/404. An admin must be signed in, have a *confirmed*
 * email (checked on the server with the secret key, not from the session) and be listed in
 * ADMIN_EMAILS. Non-admins get a 404 so the area isn't advertised.
 */
export async function requireAdmin(next = "/admin"): Promise<Admin> {
  await connection();
  // Local development preview only: explore the admin without signing in.
  if (previewMode) return { id: "preview-admin", email: "preview@localhost", name: "Preview admin", preview: true };

  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  if (!adminConfigured() || !adminEmails().includes(user.email.toLowerCase())) notFound();

  const { data, error } = await createAdminClient().auth.admin.getUserById(user.id);
  if (error || !data.user?.email_confirmed_at || data.user.email?.toLowerCase() !== user.email.toLowerCase()) notFound();
  return { id: user.id, email: user.email, name: user.name, preview: false };
}

/** For links in the site header: true only for a listed admin (no DB round trip). */
export function looksLikeAdmin(email: string | undefined) {
  return Boolean(email && adminEmails().includes(email.toLowerCase()));
}
