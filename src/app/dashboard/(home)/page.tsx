import { redirect } from "next/navigation";
import { dashboardContext } from "@/lib/dashboard";
import { getStore, loadLearnerState } from "@/lib/learning/store";
import { hasAccess } from "@/lib/membership";
import { DashboardHome, WEEKS } from "./view";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ password?: string }> }) {
  const { user, sub } = await dashboardContext();
  if (!user) redirect("/login?next=/dashboard");
  if (!hasAccess(sub)) redirect("/dashboard/billing");
  const sp = await searchParams;

  // The heatmap covers 13 weeks, so only that much XP history is read.
  const now = new Date();
  const since = new Date(now.getTime() - (WEEKS * 7 + 1) * 86_400_000).toISOString();
  const [state, events] = await Promise.all([loadLearnerState(user.id), getStore().events(user.id, since)]);
  return <DashboardHome name={user.name} sub={sub!} state={state} events={events} now={now} passwordUpdated={sp.password === "updated"} />;
}
