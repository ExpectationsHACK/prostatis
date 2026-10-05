import "server-only";
import { emailSender } from "@/lib/email";

/**
 * Live, read-only checks of the outside services, for the admin's Setup & health page.
 * Nothing is charged or sent: Paystack is asked to list one transaction, Resend to list domains.
 */

export type ServiceCheck = { ok: boolean; title: string; detail: string };

export async function checkPaystack(): Promise<ServiceCheck> {
  const key = process.env.PAYSTACK_SECRET_KEY ?? "";
  if (!key) return { ok: false, title: "Paystack", detail: "No PAYSTACK_SECRET_KEY: checkout says payments aren't open." };
  const live = key.startsWith("sk_live_");
  try {
    const r = await fetch("https://api.paystack.co/transaction?perPage=1", { headers: { Authorization: `Bearer ${key}` }, cache: "no-store", signal: AbortSignal.timeout(10_000) });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.status) return { ok: false, title: "Paystack", detail: `Paystack rejected the key (${r.status}${j?.message ? `: ${j.message}` : ""}). Copy it again from Paystack → Settings → API Keys.` };
    return { ok: true, title: `Paystack: key works (${live ? "LIVE: real money" : "test mode"})`, detail: "" };
  } catch {
    return { ok: false, title: "Paystack", detail: "Couldn't reach Paystack just now. Try again in a minute." };
  }
}

export async function checkEmail(): Promise<ServiceCheck> {
  const key = process.env.RESEND_API_KEY ?? "";
  const sender = emailSender();
  if (!key) return { ok: false, title: "Email (Resend)", detail: "No RESEND_API_KEY. Account emails fall back to Supabase's built-in mailer (a few emails an hour); certificates and the newsletter can't be emailed." };
  if (!sender) {
    return {
      ok: false,
      title: "Email sender (EMAIL_FROM)",
      detail: `EMAIL_FROM "${process.env.EMAIL_FROM ?? ""}" isn't an email address. Set it to e.g. "Prostatis <hello@yourdomain.com>" on a domain verified in Resend. Until then the site uses Supabase's mailer for account emails.`,
    };
  }
  const domain = sender.address.split("@")[1]?.toLowerCase() ?? "";
  if (domain === "resend.dev") return { ok: false, title: `Email sender: ${sender.address}`, detail: "Resend's test sender only delivers to your own Resend account. Add and verify your domain in Resend → Domains, then use an address on it." };
  try {
    const r = await fetch("https://api.resend.com/domains", { headers: { Authorization: `Bearer ${key}` }, cache: "no-store", signal: AbortSignal.timeout(10_000) });
    if (!r.ok) return { ok: false, title: "Email (Resend)", detail: `Resend rejected the API key (${r.status}). Create a new key in Resend → API Keys.` };
    const list = ((await r.json()).data ?? []) as { name: string; status: string }[];
    const found = list.find((d) => d.name.toLowerCase() === domain);
    if (!found) return { ok: false, title: `Email sender: ${sender.address}`, detail: `${domain} isn't added in Resend yet. Resend → Domains → Add domain, then add the DNS records it shows.` };
    if (found.status !== "verified") return { ok: false, title: `Email sender: ${sender.address}`, detail: `${domain} is "${found.status}" in Resend. Add the DNS records it lists and wait for "verified".` };
    return { ok: true, title: `Email: sending from ${sender.address} (domain verified)`, detail: "" };
  } catch {
    return { ok: false, title: "Email (Resend)", detail: "Couldn't reach Resend just now. Try again in a minute." };
  }
}
