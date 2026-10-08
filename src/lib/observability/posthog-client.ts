import type { PostHog } from "posthog-js";

/**
 * PostHog product analytics in the browser. Off unless NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is set,
 * and loaded lazily (its own chunk, after the page is idle) so visitors on metered data never
 * wait for it. No cookies: state lives in localStorage. No session recordings or surveys.
 */
const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ?? "";
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

/** Pages that never send analytics: the admin shows other people's data, receipts show payments. */
export const PRIVATE_PATHS = [/^\/admin(\/|$)/, /^\/dashboard\/billing\/receipt\//];

let loading: Promise<PostHog | null> | null = null;

export function loadPostHog(): Promise<PostHog | null> {
  if (!token || typeof window === "undefined") return Promise.resolve(null);
  loading ??= import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(token, {
        api_host: host,
        defaults: "2026-05-30",
        persistence: "localStorage",
        person_profiles: "identified_only",
        respect_dnt: true,
        mask_personal_data_properties: true,
        disable_session_recording: true,
        disable_surveys: true,
        // No feature flags on this site: skip the flags request every page load would make.
        advanced_disable_flags: true,
        before_send: (event) => (event && PRIVATE_PATHS.some((re) => re.test(window.location.pathname)) ? null : event),
      });
      return posthog;
    })
    .catch(() => null);
  return loading;
}

/** Link this browser's events to a signed-in member: account id only, never the email or name. */
export function identifyMember(id: string, props: Record<string, string>) {
  void loadPostHog().then((ph) => {
    if (ph && ph.get_distinct_id() !== id) ph.identify(id, props);
    else ph?.setPersonProperties(props);
  });
}

/** Forget the member on this browser (sign-out), so the next person isn't counted as them. */
export function forgetMember() {
  if (loading) void loading.then((ph) => ph?.reset());
}
