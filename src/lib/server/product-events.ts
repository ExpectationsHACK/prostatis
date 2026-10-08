import "server-only";
import { after } from "next/server";

/**
 * Milestones recorded on the server, where they can't be blocked or faked: payments, finished
 * lessons, passed finals. Sent to PostHog's capture API after the response, keyed by account
 * id (the same id the browser uses after sign-in). Off without NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN.
 */
export type ProductEvent = "payment_succeeded" | "lesson_completed" | "final_passed";

export function productEvent(userId: string, event: ProductEvent, properties: Record<string, string | number | boolean> = {}) {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token) return;
  const host = (process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com").replace(/\/$/, "");
  const send = () =>
    fetch(`${host}/i/v0/e/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ api_key: token, event, distinct_id: userId, timestamp: new Date().toISOString(), properties: { ...properties, source: "server" } }),
      signal: AbortSignal.timeout(5000),
    })
      .then(() => undefined)
      .catch((e) => console.error("product event", event, e));
  try {
    after(send);
  } catch {
    // Outside a request (scripts, tests): send now and don't wait.
    void send();
  }
}
