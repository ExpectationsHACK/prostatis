import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { fastTrack, mainTrack, type Track } from "@/lib/curriculum";
import { getMySubscription, hasAccess } from "@/lib/membership";
import { getCurrentUser } from "@/lib/supabase/server";
import { previewMode } from "./store";

export const trackSlugs: Record<string, Track> = { "fast-track": fastTrack, "main-track": mainTrack };
export const slugOf = (t: Track) => (t.id === "main_track" ? "main-track" : "fast-track");

export type Learner = { id: string; name: string; preview: boolean; tracks: Track["id"][] };

/**
 * The signed-in member and the tracks they can open. The Main Track includes the Fast Track.
 * Sends visitors to sign in, and non-members to billing. In local development without
 * Supabase, a preview learner with both tracks is used instead.
 */
export async function requireLearner(next: string): Promise<Learner> {
  await connection();
  if (previewMode) return { id: "preview", name: "Preview learner", preview: true, tracks: ["fast_track", "main_track"] };

  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  const sub = await getMySubscription();
  if (!hasAccess(sub)) redirect("/dashboard/billing");
  return {
    id: user.id,
    name: user.name,
    preview: false,
    tracks: sub!.plan === "main_track" ? ["fast_track", "main_track"] : ["fast_track"],
  };
}

/** Resolve a track slug the learner may open, or send them to pricing. */
export function learnerTrack(learner: Learner, slug: string): Track | null {
  const track = trackSlugs[slug];
  if (!track) return null;
  if (!learner.tracks.includes(track.id)) redirect(`/checkout/${track.id}`);
  return track;
}
