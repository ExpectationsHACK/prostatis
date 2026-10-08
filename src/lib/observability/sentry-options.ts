/** The server's Sentry DSN: SENTRY_DSN, or the public one the browser uses. Empty = off. */
export function serverSentryDsn() {
  return process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || "";
}

/** Server and edge settings: errors only, and no personal data (cookies, IPs, request bodies). */
export function sentryServerOptions() {
  return {
    dsn: serverSentryDsn(),
    environment: process.env.SENTRY_ENVIRONMENT || process.env.CONTEXT || process.env.NODE_ENV,
    dataCollection: { userInfo: false },
  };
}
