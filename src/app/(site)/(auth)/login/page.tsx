import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { oauthProviders } from "@/lib/auth-providers";
import { Notice } from "@/components/status";
import { getCurrentUser } from "@/lib/supabase/server";
import { AuthShell, nextParam } from "../auth-shell";
import { LoginForm } from "../auth-form";
import { OAuthButtons } from "../oauth-buttons";
import { site } from "@/lib/site";

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
    <AuthShell title={`Sign in to ${site.name}`} subtitle="Welcome back. Pick up where you left off.">
      {sp.reason === "expired" && (
        <Notice tone="warning" title="Your session expired" className="mb-5">
          For your security you were signed out after some time away. Sign in again and you&apos;ll go straight back to where you were. Your progress is saved.
        </Notice>
      )}
      <OAuthButtons providers={await oauthProviders()} next={next} from="login" />
      <LoginForm next={next} initialError={error} />
    </AuthShell>
  );
}
