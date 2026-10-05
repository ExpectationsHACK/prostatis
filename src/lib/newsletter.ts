import "server-only";
import { canEmailAnyone, sendBatch, sendEmail } from "@/lib/email";
import { newsletterEmail, rejoinEmail, welcomeEmail } from "@/lib/email-templates";
import { site } from "@/lib/site";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * The newsletter: subscribers live in the `waitlist` table (every email signup box on the
 * site feeds it), issues in `newsletter_issues`. Every email carries a one-click unsubscribe
 * link and the List-Unsubscribe headers mail apps use for their own unsubscribe button.
 */

export type Subscriber = { email: string; name: string; whatsapp: string | null; source: string; created_at: string; status: "subscribed" | "unsubscribed"; token: string | null; unsubscribed_at: string | null };
export type Issue = { id: string; subject: string; preheader: string; body_md: string; status: "draft" | "sending" | "sent"; recipients: number; sent_at: string | null; sent_by: string | null; created_at: string; updated_at: string };

export const unsubscribeUrl = (token: string) => `${site.url}/unsubscribe?t=${token}`;
const oneClickUrl = (token: string) => `${site.url}/api/unsubscribe?t=${token}`;
export const rejoinUrl = (token: string) => `${site.url}/unsubscribe?t=${token}&rejoin=1`;

/* ---------- Subscribers ---------- */
export async function listSubscribers(): Promise<Subscriber[]> {
  const db = createAdminClient();
  const out: Subscriber[] = [];
  for (let from = 0; from < 200_000; from += 1000) {
    const { data, error } = await db.from("waitlist").select("email, name, whatsapp, source, created_at, status, token, unsubscribed_at").order("created_at", { ascending: false }).range(from, from + 999);
    if (error) throw new Error(/column .* does not exist/i.test(error.message) ? "Run the newsletter migration (20261001130000_newsletter.sql) in Supabase first." : error.message);
    out.push(...((data ?? []) as Subscriber[]));
    if (!data || data.length < 1000) break;
  }
  return out;
}

export async function setSubscription(email: string, status: Subscriber["status"]) {
  const { error } = await createAdminClient()
    .from("waitlist")
    .update({ status, unsubscribed_at: status === "unsubscribed" ? new Date().toISOString() : null })
    .eq("email", email);
  if (error) throw error;
}

/** Unsubscribe from a link. Returns the (partly hidden) email, or null if the link is unknown. */
export async function unsubscribeByToken(token: string): Promise<string | null> {
  if (!/^[0-9a-f-]{36}$/i.test(token)) return null;
  const { data, error } = await createAdminClient()
    .from("waitlist")
    .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
    .eq("token", token)
    .select("email")
    .maybeSingle();
  if (error || !data) return null;
  const [user, domain] = (data.email as string).split("@");
  return `${user.slice(0, 2)}${"•".repeat(Math.max(1, user.length - 2))}@${domain}`;
}

/** Rejoin from the link in the rejoin email. Returns true when the address is subscribed again. */
export async function resubscribeByToken(token: string): Promise<boolean> {
  if (!/^[0-9a-f-]{36}$/i.test(token)) return false;
  const { data, error } = await createAdminClient().from("waitlist").update({ status: "subscribed", unsubscribed_at: null }).eq("token", token).select("email").maybeSingle();
  return !error && Boolean(data);
}

/**
 * After a signup box is submitted. A brand-new address gets the welcome email, once. An
 * address that unsubscribed is NOT switched back on (anyone can type anyone's email); it gets
 * a confirmation link instead, so only its owner can rejoin. Already subscribed: nothing.
 */
export async function afterSubscribe(email: string, isNew: boolean) {
  if (!canEmailAnyone()) return;
  const { data } = await createAdminClient().from("waitlist").select("status, token").eq("email", email).maybeSingle();
  if (!data?.token) return;
  const list = { "List-Unsubscribe": `<${oneClickUrl(data.token)}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" };
  const mail = isNew ? welcomeEmail(unsubscribeUrl(data.token)) : data.status === "unsubscribed" ? rejoinEmail(rejoinUrl(data.token)) : null;
  if (!mail) return;
  const res = await sendEmail({ to: email, ...mail, ...(isNew ? { headers: list } : {}) });
  if (!res.ok) console.error("subscribe email", res.error);
}

/* ---------- Issues ---------- */
const T = "newsletter_issues";

export async function listIssues(): Promise<Issue[]> {
  const { data, error } = await createAdminClient().from(T).select("*").order("updated_at", { ascending: false }).limit(500);
  if (error) throw new Error(/does not exist|schema cache/i.test(error.message) ? "Run the newsletter migration (20261001130000_newsletter.sql) in Supabase first." : error.message);
  return (data ?? []) as Issue[];
}

export async function getIssue(id: string): Promise<Issue | null> {
  const { data } = await createAdminClient().from(T).select("*").eq("id", id).maybeSingle();
  return (data as Issue | null) ?? null;
}

export async function saveIssue(input: { id?: string; subject: string; preheader: string; body_md: string }): Promise<Issue> {
  const now = new Date().toISOString();
  const db = createAdminClient();
  const fields = { subject: input.subject, preheader: input.preheader, body_md: input.body_md, updated_at: now };
  const q = input.id ? db.from(T).update(fields).eq("id", input.id).eq("status", "draft") : db.from(T).insert(fields);
  const { data, error } = await q.select("*").single();
  if (error) throw new Error(input.id ? "Couldn't save: this issue may already have been sent." : error.message);
  return data as Issue;
}

export async function deleteIssue(id: string) {
  const { error } = await createAdminClient().from(T).delete().eq("id", id).eq("status", "draft");
  if (error) throw error;
}

/** Send one issue to one address, for checking it before the real send. */
export async function sendTest(issue: Issue, to: string) {
  const mail = newsletterEmail(issue, `${site.url}/unsubscribe`);
  return sendEmail({ to, ...mail, subject: `[Test] ${mail.subject}` });
}

/**
 * Send an issue to every subscribed address, once. The row is claimed (draft → sending)
 * before anything goes out, so a double click can't send twice.
 */
export async function sendIssue(id: string, actor: string): Promise<{ sent: number; failed: number; error?: string }> {
  if (!canEmailAnyone()) throw new Error("Verify your domain in Resend and set EMAIL_FROM to an address on it first. Until then emails only reach the Resend account owner.");
  const db = createAdminClient();
  const { data: claimed, error } = await db.from(T).update({ status: "sending", updated_at: new Date().toISOString() }).eq("id", id).eq("status", "draft").select("*").maybeSingle();
  if (error) throw error;
  if (!claimed) throw new Error("This issue has already been sent (or is sending now).");
  const issue = claimed as Issue;

  const subs = (await listSubscribers()).filter((s) => s.status === "subscribed" && s.token);
  const emails = subs.map((s) => {
    const mail = newsletterEmail(issue, unsubscribeUrl(s.token!));
    return { to: s.email, ...mail, headers: { "List-Unsubscribe": `<${oneClickUrl(s.token!)}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } };
  });
  const res = await sendBatch(emails);
  await db.from(T).update({ status: res.sent > 0 || emails.length === 0 ? "sent" : "draft", recipients: res.sent, sent_at: new Date().toISOString(), sent_by: actor, updated_at: new Date().toISOString() }).eq("id", id);
  return res;
}
