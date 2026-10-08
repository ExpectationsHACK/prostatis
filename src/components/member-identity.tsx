"use client";

import { useEffect } from "react";
import { forgetMember, identifyMember } from "@/lib/observability/posthog-client";
import { setSentryMember } from "@/lib/observability/sentry-client";

/** Ties analytics and error reports to the signed-in account id (never the name or email). */
export function MemberIdentity({ id, plan }: { id: string; plan: string }) {
  useEffect(() => {
    identifyMember(id, { plan });
    setSentryMember(id);
  }, [id, plan]);
  return null;
}

/** A sign-out form that also forgets the member in analytics and error reports on this browser. */
export function SignOutForm({ action, className, children }: { action: () => Promise<void>; className?: string; children: React.ReactNode }) {
  return (
    <form
      action={action}
      className={className}
      onSubmit={() => {
        forgetMember();
        setSentryMember(null);
      }}
    >
      {children}
    </form>
  );
}
