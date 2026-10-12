/**
 * Plain-English messages for failed requests from the browser, so every tool and form says the
 * same thing for the same problem. Offline and flaky mobile data are the common case here.
 */

export type FetchProblem = { kind: "offline" | "network" | "session" | "busy" | "server" | "rejected"; message: string };

const NETWORK = /failed to fetch|load failed|networkerror|network request failed|the internet connection appears to be offline|aborted|timed? ?out/i;

/** Describe a failed request from the thrown error and/or the response status and body message. */
export function fetchProblem(input: { error?: unknown; status?: number; message?: string; online?: boolean }): FetchProblem {
  const { error, status, message, online = true } = input;
  if (!online) return { kind: "offline", message: "You're offline. Check your data or Wi-Fi, then try again. Nothing you typed is lost." };
  if (status === undefined && error !== undefined) {
    const text = error instanceof Error ? `${error.name} ${error.message}` : String(error);
    if (NETWORK.test(text)) return { kind: "network", message: "We couldn't reach Prostatis. Your connection may be weak: try again in a moment." };
  }
  if (status === 401) return { kind: "session", message: "Your session has expired. Sign in again to continue." };
  if (status === 429) return { kind: "busy", message: message || "That's a lot of tries in a short time. Wait a minute, then try again." };
  if (status !== undefined && status >= 500) return { kind: "server", message: message || "Something went wrong on our side. Try again in a minute." };
  if (message) return { kind: "rejected", message };
  if (error instanceof Error && error.message) return { kind: "rejected", message: error.message };
  return { kind: "server", message: "Something went wrong. Try again in a minute." };
}

/** True when the browser says it has no connection (always true on the server). */
export const browserOnline = () => typeof navigator === "undefined" || navigator.onLine !== false;

export type JsonResult<T> = { ok: true; data: T } | { ok: false; problem: FetchProblem };

/** POST JSON and get the answer or a plain-English problem: never throws. */
export async function postJson<T = Record<string, unknown>>(url: string, body: unknown): Promise<JsonResult<T>> {
  if (!browserOnline()) return { ok: false, problem: fetchProblem({ online: false }) };
  let res: Response;
  try {
    res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  } catch (error) {
    return { ok: false, problem: fetchProblem({ error, online: browserOnline() }) };
  }
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) return { ok: false, problem: fetchProblem({ status: res.status, message: typeof data.error === "string" ? data.error : undefined }) };
  return { ok: true, data };
}
