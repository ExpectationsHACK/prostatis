import { loadPostHog } from "@/lib/observability/posthog-client";
import { watchForErrors } from "@/lib/observability/sentry-client";

// Both are no-ops unless their keys are set.
// Error tracking: nothing loads until the first error happens.
watchForErrors();

// Analytics waits until the page has fully loaded and the browser is idle, so on a slow phone it
// never competes with the page's first paint or first taps. The timeout matters: pages with
// animated thumbnails are rarely fully idle, and without it analytics could wait forever.
const startAnalytics = () => {
  if (window.requestIdleCallback) window.requestIdleCallback(() => void loadPostHog(), { timeout: 4000 });
  else window.setTimeout(() => void loadPostHog(), 2000);
};
if (document.readyState === "complete") startAnalytics();
else window.addEventListener("load", startAnalytics, { once: true });
