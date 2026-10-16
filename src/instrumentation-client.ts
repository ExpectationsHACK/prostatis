import { loadPostHog } from "@/lib/observability/posthog-client";
import { loadSentry, sentryRouterTransition } from "@/lib/observability/sentry-client";

// Both are no-ops unless their keys are set. Error tracking starts at once; analytics waits
// until the page is idle so it never competes with the page itself.
void loadSentry();
// The timeout matters: pages with animated thumbnails are rarely fully idle, and without it
// analytics could wait forever.
if (window.requestIdleCallback) window.requestIdleCallback(() => void loadPostHog(), { timeout: 3000 });
else window.setTimeout(() => void loadPostHog(), 1500);

export function onRouterTransitionStart(url: string, type: "push" | "replace" | "traverse") {
  sentryRouterTransition(url, type);
}
