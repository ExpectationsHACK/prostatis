import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { oauthProviders } from "@/lib/auth-providers";
import { getCurrentUser } from "@/lib/supabase/server";
import { AuthShell, nextParam } from "../auth-shell";
import { LoginForm } from "../auth-form";
import { OAuthButtons } from "../oauth-buttons";

export const metadata: Metadata = { title: "Log in", robots: { index: false } };

const errors: Record<string, string> = {
  link: "That sign-in link is invalid or has expired. Request a new one.",
  oauth: "That sign-in option isn't available right now. Use your email instead.",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const sp = await searchParams;
  const next = nextParam(sp.next);
  if (await getCurrentUser()) redirect(next);
  const error = errors[String(sp.error ?? "")];
  return (
    <AuthShell title="Sign in to STEINARK" subtitle="Welcome back. Pick up where you left off.">
      <OAuthButtons providers={await oauthProviders()} next={next} from="login" />
      <LoginForm next={next} initialError={error} />
    </AuthShell>
  );
}
