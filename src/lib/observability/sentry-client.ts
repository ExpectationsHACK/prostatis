/**
 * Sentry error tracking in the browser. Off unless NEXT_PUBLIC_SENTRY_DSN is set at build time.
 *
 * Loaded only when something actually goes wrong: a few-line listener waits for the first error,
 * then fetches the SDK (its own chunk) and reports it. Most visitors never download Sentry at all,
 * which keeps it off the critical path on slow phones. The browser package is used rather than
 * the Next.js one, which bundles session replay and tracing this site doesn't use.
 */
type SentryModule = typeof import("@sentry/browser");

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN ?? "";
let loading: Promise<SentryModule | null> | null = null;
// The signed-in member, applied when (if) Sentry loads; setting it never loads the SDK.
let member: string | null = null;

export function loadSentry(): Promise<SentryModule | null> {
  if (!dsn || typeof window === "undefined") return Promise.resolve(null);
  loading ??= import("@sentry/browser")
    .then((Sentry) => {
      Sentry.init({
        dsn,
        environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV,
        // No names, emails or IP addresses: a member is known only by account id.
        dataCollection: { userInfo: false },
        // Noise from browser extensions and flaky mobile networks, not bugs in the site.
        ignoreErrors: ["ResizeObserver loop", "Non-Error promise rejection captured", /^Load failed$/, /Failed to fetch/],
      });
      if (member) Sentry.setUser({ id: member });
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
  member = id;
  if (loading) void loading.then((Sentry) => Sentry?.setUser(id ? { id } : null));
}

/**
 * Catch the first uncaught error or rejected promise, then load Sentry to report it. Once loaded,
 * Sentry's own global handlers take over, so these listeners remove themselves.
 */
export function watchForErrors() {
  if (!dsn || typeof window === "undefined") return;
  const onError = (e: ErrorEvent) => first(e.error ?? new Error(e.message));
  const onRejection = (e: PromiseRejectionEvent) => first(e.reason);
  const first = (err: unknown) => {
    window.removeEventListener("error", onError);
    window.removeEventListener("unhandledrejection", onRejection);
    reportError(err);
  };
  window.addEventListener("error", onError);
  window.addEventListener("unhandledrejection", onRejection);
}
