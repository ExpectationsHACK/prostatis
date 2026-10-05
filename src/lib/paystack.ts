import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

const API = "https://api.paystack.co";

export type PaymentsMode = "paystack" | "disabled";

/**
 * paystack: real Paystack checkout (sk_live_… takes real money; sk_test_… is Paystack's test mode).
 * disabled: no key set, so checkout says payments aren't open. There is no simulated checkout.
 */
export function paymentsMode(): PaymentsMode {
  return process.env.PAYSTACK_SECRET_KEY ? "paystack" : "disabled";
}

export function isTestKey() {
  return (process.env.PAYSTACK_SECRET_KEY ?? "").startsWith("sk_test_");
}

async function paystack<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(API + path, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.status) {
    throw new Error(`Paystack ${path} failed: ${res.status} ${json?.message ?? ""}`);
  }
  return json.data as T;
}

export function initializeTransaction(input: {
  email: string;
  amountKobo: number;
  reference: string;
  callbackUrl: string;
  metadata: Record<string, unknown>;
}) {
  return paystack<{ authorization_url: string; reference: string }>("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email: input.email,
      amount: input.amountKobo,
      currency: "NGN",
      reference: input.reference,
      callback_url: input.callbackUrl,
      metadata: input.metadata,
    }),
  });
}

export type PaystackTransaction = {
  status: string;
  reference: string;
  amount: number;
  currency: string;
  metadata: Record<string, unknown> | null | string;
  customer: { email: string; customer_code: string };
  plan?: string | { plan_code?: string } | null;
};

export function verifyTransaction(reference: string) {
  return paystack<PaystackTransaction>(`/transaction/verify/${encodeURIComponent(reference)}`);
}

export function isValidWebhookSignature(rawBody: string, signature: string | null) {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key || !signature) return false;
  const expected = createHmac("sha512", key).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
