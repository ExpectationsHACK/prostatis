import "server-only";
import { previewMode } from "@/lib/learning/store";
import { getMySubscription, type Subscription } from "@/lib/membership";
import { getCurrentUser } from "@/lib/supabase/server";

export type DashUser = { id: string; name: string; email: string; whatsapp: string };

/**
 * The member and their membership for the dashboard. In local development preview it's a
 * preview learner on the Main Track, so the dashboard can be seen without signing in.
 */
export async function dashboardContext(): Promise<{ user: DashUser | null; sub: Subscription | null; preview: boolean }> {
  if (previewMode) {
    const end = new Date(Date.now() + 40 * 86400_000).toISOString();
    return {
      user: { id: "preview", name: "Preview learner", email: "preview@localhost", whatsapp: "" },
      sub: { status: "active", plan: "main_track", current_period_end: end, paystack_subscription_code: null },
      preview: true,
    };
  }
  const user = await getCurrentUser();
  return { user, sub: user ? await getMySubscription() : null, preview: false };
}
