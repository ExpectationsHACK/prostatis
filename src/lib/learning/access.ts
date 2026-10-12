import "server-only";
import { forbidden, redirect } from "next/navigation";
import { connection } from "next/server";
import { fastTrack, mainTrack, type Track } from "@/lib/curriculum";
import { getMySubscription, hasAccess } from "@/lib/membership";
import { studentName } from "@/lib/dashboard";
import { getCurrentUser } from "@/lib/supabase/server";

export const trackSlugs: Record<string, Track> = { "fast-track": fastTrack, "main-track": mainTrack };
export const slugOf = (t: Track) => (t.id === "main_track" ? "main-track" : "fast-track");

export type Learner = { id: string; name: string; email: string; tracks: Track["id"][] };

/**
 * The signed-in member and the tracks they can open. The Main Track includes the Fast Track.
 * Sends visitors to sign in, and non-members to billing.
 */
export async function requireLearner(next: string): Promise<Learner> {
  await connection();
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  const sub = await getMySubscription();
  if (!hasAccess(sub)) redirect("/dashboard/billing");
  return {
    id: user.id,
    name: await studentName(user),
    email: user.email,
    tracks: sub!.plan === "main_track" ? ["fast_track", "main_track"] : ["fast_track"],
  };
}

/** Resolve a track slug the learner may open. A track their plan doesn't include is a 403 (with the way to upgrade). */
export function learnerTrack(learner: Learner, slug: string): Track | null {
  const track = trackSlugs[slug];
  if (!track) return null;
  if (!learner.tracks.includes(track.id)) forbidden();
  return track;
}
