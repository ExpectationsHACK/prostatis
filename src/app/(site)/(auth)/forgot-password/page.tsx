import type { Metadata } from "next";
import { AuthShell } from "../auth-shell";
import { ForgotForm } from "../auth-form";

export const metadata: Metadata = { title: "Forgot password", robots: { index: false } };

export default function ForgotPasswordPage() {
  return (
    <AuthShell art="reset" title="Forgot your password?" subtitle="Enter your email and we'll send you a link to set a new one.">
      <ForgotForm />
    </AuthShell>
  );
}
