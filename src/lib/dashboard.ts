import "server-only";
import { getMySubscription, type Subscription } from "@/lib/membership";
import { createClient, getCurrentUser } from "@/lib/supabase/server";

export type DashUser = { id: string; name: string; email: string; whatsapp: string };

/**
 * The student's name as it should appear across the app. The profile (which an admin can
 * correct) wins, then the name given at sign-up or by Google, then a tidy version of the
 * email's first part, so the dashboard never shows a blank or a placeholder.
 */
/** Pure rule behind studentName(): profile name, then sign-up/Google name, then the email. */
export function pickName(profileName: string | null | undefined, metaName: string, email: string): string {
  const fromProfile = (profileName ?? "").trim();
  if (fromProfile) return fromProfile;
  if (metaName.trim()) return metaName.trim();
  const local = email.split("@")[0]?.replace(/[._-]+/g, " ").replace(/\d+/g, "").trim() ?? "";
  return local ? local.replace(/(^|\s)(\w)/g, (_, gap: string, c: string) => gap + c.toUpperCase()) : "Student";
}

export async function studentName(user: { id: string; name: string; email: string }): Promise<string> {
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("name").eq("id", user.id).maybeSingle();
  return pickName(typeof data?.name === "string" ? data.name : "", user.name, user.email);
}

/** The signed-in member, their display name and their membership. */
export async function dashboardContext(): Promise<{ user: DashUser | null; sub: Subscription | null }> {
  const user = await getCurrentUser();
  if (!user) return { user: null, sub: null };
  const [name, sub] = await Promise.all([studentName(user), getMySubscription()]);
  return { user: { ...user, name }, sub };
}
