"use client";

import { CircleAlert, Mail } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { btn, input, size } from "@/components/ui";
import { sendMagicLink, signIn, signUp, type AuthState } from "./actions";

function Notice({ state }: { state: AuthState }) {
  if (state?.error)
    return (
      <p className="flex items-start gap-2 rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger" role="alert">
        <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
        {state.error}
      </p>
    );
  if (state?.message)
    return (
      <p className="flex items-start gap-2 rounded-lg bg-brand-wash px-3 py-2.5 text-sm text-ink" role="status">
        <Mail className="mt-0.5 size-4 shrink-0 text-brand-text" aria-hidden />
        {state.message}
      </p>
    );
  return null;
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[14px] font-semibold text-ink">
      {children}
    </label>
  );
}

export function SignupForm({ next, email }: { next: string; email?: string }) {
  const [state, action, pending] = useActionState(signUp, undefined);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <div>
        <Label htmlFor="su-name">First name</Label>
        <input id="su-name" name="name" required autoComplete="given-name" className={input} />
      </div>
      <div>
        <Label htmlFor="su-email">Email</Label>
        <input id="su-email" name="email" type="email" required autoComplete="email" defaultValue={email} className={input} />
      </div>
      <div>
        <Label htmlFor="su-wa">
          WhatsApp number <span className="font-normal text-muted">(optional)</span>
        </Label>
        <input id="su-wa" name="whatsapp" type="tel" autoComplete="tel" placeholder="0803 123 4567" className={input} />
      </div>
      <div>
        <Label htmlFor="su-pw">Password</Label>
        <input id="su-pw" name="password" type="password" required minLength={8} autoComplete="new-password" placeholder="At least 8 characters" className={input} />
      </div>
      <Notice state={state} />
      <button disabled={pending} className={`${btn.primary} ${size.lg} w-full`}>
        {pending ? "Creating account…" : "Create account"}
      </button>
      <p className="text-center text-[14px] text-muted">
        Already a member?{" "}
        <Link href={`/login?next=${encodeURIComponent(next)}`} className="font-semibold text-ink underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export function LoginForm({ next, initialError }: { next: string; initialError?: string }) {
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [pwState, pwAction, pwPending] = useActionState(signIn, initialError ? { error: initialError } : undefined);
  const [mlState, mlAction, mlPending] = useActionState(sendMagicLink, undefined);
  const magic = mode === "magic";

  return (
    <form action={magic ? mlAction : pwAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <div>
        <Label htmlFor="li-email">Email</Label>
        <input id="li-email" name="email" type="email" required autoComplete="email" className={input} />
      </div>
      {!magic && (
        <div>
          <Label htmlFor="li-pw">Password</Label>
          <input id="li-pw" name="password" type="password" required autoComplete="current-password" className={input} />
        </div>
      )}
      <Notice state={magic ? mlState : pwState} />
      <button disabled={pwPending || mlPending} className={`${btn.primary} ${size.lg} w-full`}>
        {magic ? (mlPending ? "Sending…" : "Email me a sign-in link") : pwPending ? "Signing in…" : "Sign in"}
      </button>
      <button type="button" onClick={() => setMode(magic ? "password" : "magic")} className={`${btn.ghost} ${size.md} w-full`}>
        {magic ? "Sign in with password instead" : "Sign in with an email link instead"}
      </button>
      <p className="border-t border-line pt-4 text-center text-[14px] text-muted">
        New here?{" "}
        <Link href={`/signup?next=${encodeURIComponent(next)}`} className="font-semibold text-ink underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
