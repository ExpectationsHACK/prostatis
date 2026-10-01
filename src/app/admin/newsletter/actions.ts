"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { audit } from "@/lib/admin/data";
import { deleteIssue, getIssue, saveIssue, sendIssue, sendTest, setSubscription } from "@/lib/newsletter";

export type Result = { ok: boolean; msg: string } | null;

const str = (fd: FormData, k: string, max: number) => String(fd.get(k) ?? "").trim().slice(0, max);
const fail = (e: unknown): Result => ({ ok: false, msg: e instanceof Error ? e.message : "Something went wrong." });
const isRedirect = (e: unknown) => Boolean(e && typeof e === "object" && "digest" in e);

/** Save the draft; "test" also emails it to the admin, "send" sends it to every subscriber. */
export async function issueAction(_: Result, fd: FormData): Promise<Result> {
  const admin = await requireAdmin();
  const op = String(fd.get("op"));
  const subject = str(fd, "subject", 150);
  if (!subject) return { ok: false, msg: "Add a subject line." };
  const body_md = str(fd, "body_md", 100_000);
  if (!body_md) return { ok: false, msg: "Write the email first." };
  try {
    const issue = await saveIssue({ id: str(fd, "id", 60) || undefined, subject, preheader: str(fd, "preheader", 200), body_md });
    revalidatePath("/admin/newsletter");

    if (op === "test") {
      const to = str(fd, "test_to", 200) || admin.email;
      const res = await sendTest(issue, to);
      await audit(admin.email, "newsletter.test", issue.id, { to });
      if (!res.ok) return { ok: false, msg: `Saved, but the test email failed: ${res.error}` };
      if (!str(fd, "id", 60)) redirect(`/admin/newsletter/${issue.id}?tested=1`);
      return { ok: true, msg: `Saved. Test sent to ${to}.` };
    }
    if (op === "send") {
      if (fd.get("confirm") !== "SEND") return { ok: false, msg: "Type SEND to confirm." };
      const res = await sendIssue(issue.id, admin.email);
      await audit(admin.email, "newsletter.send", issue.id, res);
      revalidatePath(`/admin/newsletter/${issue.id}`);
      if (res.failed && !res.sent) return { ok: false, msg: `Nothing was sent: ${res.error}` };
      return { ok: true, msg: `Sent to ${res.sent} subscriber${res.sent === 1 ? "" : "s"}${res.failed ? `; ${res.failed} failed (${res.error})` : ""}.` };
    }
    await audit(admin.email, "newsletter.save", issue.id);
    if (!str(fd, "id", 60)) redirect(`/admin/newsletter/${issue.id}?saved=1`);
    return { ok: true, msg: "Draft saved." };
  } catch (e) {
    if (isRedirect(e)) throw e;
    return fail(e);
  }
}

export async function deleteIssueAction(id: string) {
  const admin = await requireAdmin();
  const issue = await getIssue(id);
  await deleteIssue(id);
  await audit(admin.email, "newsletter.delete", issue?.subject ?? id);
  revalidatePath("/admin/newsletter");
  redirect("/admin/newsletter");
}

export async function subscriptionAction(email: string, status: "subscribed" | "unsubscribed"): Promise<Result> {
  const admin = await requireAdmin();
  try {
    await setSubscription(email, status);
    await audit(admin.email, status === "subscribed" ? "subscriber.resubscribe" : "subscriber.unsubscribe", email);
    revalidatePath("/admin/waitlist");
    return { ok: true, msg: status === "subscribed" ? "Subscribed again." : "Unsubscribed." };
  } catch (e) {
    return fail(e);
  }
}
