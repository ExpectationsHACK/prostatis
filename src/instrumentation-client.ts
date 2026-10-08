import { loadPostHog } from "@/lib/observability/posthog-client";
import { loadSentry, sentryRouterTransition } from "@/lib/observability/sentry-client";

// Both are no-ops unless their keys are set. Error tracking starts at once; analytics waits
// until the page is idle so it never competes with the page itself.
void loadSentry();
const whenIdle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
whenIdle(() => void loadPostHog());

export function onRouterTransitionStart(url: string, type: "push" | "replace" | "traverse") {
  sentryRouterTransition(url, type);
}
