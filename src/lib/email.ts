import "server-only";

/**
 * Transactional email through Resend's HTTP API (no SDK needed). Set RESEND_API_KEY and
 * EMAIL_FROM (an address on a domain verified in Resend). Without them, sending is skipped
 * and the caller is told so, which the admin shows as "not emailed yet".
 */
export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

/**
 * True once EMAIL_FROM is on your own verified domain. Resend's shared test sender
 * (onboarding@resend.dev) only delivers to the Resend account owner, so emails meant for
 * students and subscribers wait until this is true.
 */
export function canEmailAnyone() {
  return emailConfigured() && !/@resend\.dev>?\s*$/i.test(process.env.EMAIL_FROM ?? "");
}

export type Attachment = { filename: string; content: ArrayBuffer };
export type OutgoingEmail = { to: string; subject: string; html: string; text: string; attachments?: Attachment[]; headers?: Record<string, string> };

const payload = (m: OutgoingEmail) => ({
  from: process.env.EMAIL_FROM,
  to: [m.to],
  subject: m.subject,
  html: m.html,
  text: m.text,
  ...(m.headers ? { headers: m.headers } : {}),
  ...(m.attachments ? { attachments: m.attachments.map((a) => ({ filename: a.filename, content: Buffer.from(a.content).toString("base64") })) } : {}),
});

export async function sendEmail(m: OutgoingEmail): Promise<{ ok: boolean; error?: string }> {
  if (!emailConfigured()) return { ok: false, error: "Email isn't set up yet (RESEND_API_KEY and EMAIL_FROM)." };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload(m)),
    });
    if (!res.ok) return { ok: false, error: `Resend returned ${res.status}: ${(await res.text()).slice(0, 200)}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Email failed" };
  }
}

/** Send up to 100 emails per request (Resend's batch endpoint). Returns how many were accepted. */
export async function sendBatch(list: OutgoingEmail[]): Promise<{ sent: number; failed: number; error?: string }> {
  if (!emailConfigured()) return { sent: 0, failed: list.length, error: "Email isn't set up yet (RESEND_API_KEY and EMAIL_FROM)." };
  let sent = 0;
  let error: string | undefined;
  for (let i = 0; i < list.length; i += 100) {
    const chunk = list.slice(i, i + 100);
    try {
      const res = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(chunk.map(payload)),
      });
      if (res.ok) sent += chunk.length;
      else error = `Resend returned ${res.status}: ${(await res.text()).slice(0, 200)}`;
    } catch (e) {
      error = e instanceof Error ? e.message : "Email failed";
    }
  }
  return { sent, failed: list.length - sent, error };
}

export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
