import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/server";
import { AuthShell, nextParam } from "../auth-shell";
import { SignupForm } from "../auth-form";

export const metadata: Metadata = { title: "Create your account", robots: { index: false } };

export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const sp = await searchParams;
  const next = nextParam(sp.next);
  const email = typeof sp.email === "string" ? sp.email : undefined;
  if (await getCurrentUser()) redirect(next);
  return (
    <AuthShell title="Create your account" subtitle="Takes a minute. Next you'll pay with Paystack and get your WhatsApp invite.">
      <SignupForm next={next} email={email} />
    </AuthShell>
  );
}
