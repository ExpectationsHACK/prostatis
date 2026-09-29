import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/server";
import { AuthShell, nextParam } from "../auth-shell";
import { LoginForm } from "../auth-form";

export const metadata: Metadata = { title: "Log in", robots: { index: false } };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const sp = await searchParams;
  const next = nextParam(sp.next);
  if (await getCurrentUser()) redirect(next);
  const error = sp.error === "link" ? "That sign-in link is invalid or has expired. Request a new one." : undefined;
  return (
    <AuthShell title="Sign in to BuildWithAIClub" subtitle="Welcome back. Pick up where you left off.">
      <LoginForm next={next} initialError={error} />
    </AuthShell>
  );
}
