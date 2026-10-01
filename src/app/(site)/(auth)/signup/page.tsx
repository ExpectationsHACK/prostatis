import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { oauthProviders, PREFILL_COOKIE } from "@/lib/auth-providers";
import { getCurrentUser } from "@/lib/supabase/server";
import { AuthShell, nextParam } from "../auth-shell";
import { SignupForm } from "../auth-form";
import { OAuthButtons } from "../oauth-buttons";

export const metadata: Metadata = { title: "Create your account", robots: { index: false } };

export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const sp = await searchParams;
  const next = nextParam(sp.next);
  if (await getCurrentUser()) redirect(next);
  // Set by sign-in when no account exists for the email that was typed.
  const prefill = sp.from === "login" ? (await cookies()).get(PREFILL_COOKIE)?.value : undefined;
  const email = prefill ?? (typeof sp.email === "string" ? sp.email : undefined);
  const notice = prefill ? `There's no account for ${prefill} yet. Create one below: it takes a minute.` : undefined;
  return (
    <AuthShell art="signup" title="Create your account" subtitle="Takes a minute. Then enroll with Paystack and get your WhatsApp invite.">
      <OAuthButtons providers={await oauthProviders()} next={next} from="signup" />
      <SignupForm next={next} email={email} notice={notice} />
    </AuthShell>
  );
}
