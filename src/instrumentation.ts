import type { Instrumentation } from "next";
import { serverSentryDsn } from "@/lib/observability/sentry-options";

// Server-side error tracking. Without a Sentry DSN nothing is loaded or sent.
export async function register() {
  if (!serverSentryDsn()) return;
  if (process.env.NEXT_RUNTIME === "nodejs") await import("./sentry.server.config");
  if (process.env.NEXT_RUNTIME === "edge") await import("./sentry.edge.config");
}

// Errors thrown in Server Components, server actions, route handlers and the proxy.
export const onRequestError: Instrumentation.onRequestError = async (...args) => {
  if (!serverSentryDsn()) return;
  const Sentry = await import("@sentry/nextjs");
  Sentry.captureRequestError(...args);
  // Serverless functions can freeze as soon as the response is sent: send the report first.
  await Sentry.flush(2000);
};
