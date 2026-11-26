import "server-only";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { site } from "@/lib/site";

/**
 * "Continue with Google" run by us instead of Supabase's hosted redirect, so Google's account
 * chooser says "continue to stynark.com" (and "Stynark" once the brand is verified) rather than
 * "<project>.supabase.co". Standard OpenID Connect authorization-code flow:
 *
 *   1. startGoogle() sends the visitor to Google with a random `state` (CSRF) and the SHA-256 of a
 *      random `nonce`, both kept in a short-lived httpOnly cookie.
 *   2. Google returns to /auth/google with a one-time code; the route checks `state`, swaps the
 *      code for an ID token server-side (client secret never leaves the server), and hands the
 *      token plus the raw nonce to Supabase's signInWithIdToken, which verifies Google's signature,
 *      the audience and the nonce, then creates the same session the hosted flow would.
 *
 * Needs GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (the same web client that is configured in
 * Supabase → Authentication → Providers → Google). Without them the old hosted flow is used.
 */
export const GOOGLE_COOKIE = "stynark_google";
export const GOOGLE_CALLBACK_PATH = "/auth/google";

export function googleDirectConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export const googleRedirectUri = (origin = site.url) => `${origin.replace(/\/+$/, "")}${GOOGLE_CALLBACK_PATH}`;

/** Supabase compares the token's nonce with the hex SHA-256 of the raw nonce it is given. */
export const hashNonce = (raw: string) => createHash("sha256").update(raw).digest("hex");

export type GoogleFlow = { state: string; nonce: string; next: string; from: "login" | "signup" };

export function newFlow(next: string, from: "login" | "signup"): GoogleFlow {
  return { state: randomBytes(24).toString("base64url"), nonce: randomBytes(24).toString("base64url"), next, from };
}

export function googleAuthUrl(flow: GoogleFlow, clientId: string, redirectUri: string) {
  const q = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state: flow.state,
    nonce: hashNonce(flow.nonce),
    // Always show the account chooser: many people share a phone or have several Google accounts.
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${q}`;
}

export function readFlow(raw: string | undefined): GoogleFlow | null {
  if (!raw) return null;
  try {
    const f = JSON.parse(raw) as Partial<GoogleFlow>;
    if (typeof f.state !== "string" || typeof f.nonce !== "string" || typeof f.next !== "string") return null;
    return { state: f.state, nonce: f.nonce, next: f.next, from: f.from === "signup" ? "signup" : "login" };
  } catch {
    return null;
  }
}

export function sameState(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && x.length > 0 && timingSafeEqual(x, y);
}

/** Swaps the one-time code for Google's signed ID token. Null on any failure. */
export async function exchangeCode(code: string, redirectUri: string): Promise<string | null> {
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { id_token?: unknown };
    return typeof json.id_token === "string" ? json.id_token : null;
  } catch {
    return null;
  }
}
