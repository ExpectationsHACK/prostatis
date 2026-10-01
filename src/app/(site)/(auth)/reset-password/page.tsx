import type { Metadata } from "next";
import Link from "next/link";
import { btn, size } from "@/components/ui";
import { getCurrentUser } from "@/lib/supabase/server";
import { AuthShell } from "../auth-shell";
import { ResetForm } from "../auth-form";

export const metadata: Metadata = { title: "Set a new password", robots: { index: false } };

// Reached from the reset email via /auth/callback, which signs the user in first.
export default async function ResetPasswordPage() {
  const user = await getCurrentUser();
  if (!user)
    return (
      <AuthShell art="reset" title="Link expired" subtitle="That reset link is invalid or has already been used.">
        <Link href="/forgot-password" className={`${btn.primary} ${size.lg} w-full`}>Send a new link</Link>
      </AuthShell>
    );
  return (
    <AuthShell art="reset" title="Set a new password" subtitle={`For ${user.email}. Use at least 8 characters.`}>
      <ResetForm />
    </AuthShell>
  );
}
