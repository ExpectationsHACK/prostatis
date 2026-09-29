import { redirect } from "next/navigation";
import { requireLearner } from "@/lib/learning/access";

export default async function LearnHome() {
  const learner = await requireLearner("/learn");
  redirect(learner.tracks.includes("main_track") ? "/learn/main-track" : "/learn/fast-track");
}
