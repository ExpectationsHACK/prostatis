/**
 * Sentry error tracking in the browser. Off unless NEXT_PUBLIC_SENTRY_DSN is set at build time;
 * then the SDK loads as its own chunk straight away (errors only: no tracing, no replays), so a
 * site without Sentry ships none of it.
 */
type SentryModule = typeof import("@sentry/nextjs");

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN ?? "";
let loading: Promise<SentryModule | null> | null = null;

export function loadSentry(): Promise<SentryModule | null> {
  if (!dsn || typeof window === "undefined") return Promise.resolve(null);
  loading ??= import("@sentry/nextjs")
    .then((Sentry) => {
      Sentry.init({
        dsn,
        environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV,
        // No names, emails or IP addresses: a member is known only by account id (setMember).
        dataCollection: { userInfo: false },
        // Noise from browser extensions and flaky mobile networks, not bugs in the site.
        ignoreErrors: ["ResizeObserver loop", "Non-Error promise rejection captured", /^Load failed$/, /Failed to fetch/],
      });
      return Sentry;
    })
    .catch(() => null);
  return loading;
}

/** Report an error caught by an error boundary (those never reach the global handlers). */
export function reportError(error: unknown) {
  void loadSentry().then((Sentry) => Sentry?.captureException(error));
}

export function setSentryMember(id: string | null) {
  void loadSentry().then((Sentry) => Sentry?.setUser(id ? { id } : null));
}

export function sentryRouterTransition(url: string, type: "push" | "replace" | "traverse") {
  if (loading) void loading.then((Sentry) => Sentry?.captureRouterTransitionStart(url, type));
}
