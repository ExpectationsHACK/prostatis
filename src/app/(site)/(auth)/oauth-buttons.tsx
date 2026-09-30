import type { SocialProvider } from "@/lib/auth-providers";
import { btn, size } from "@/components/ui";
import { signInWithProvider } from "./actions";

const names: Record<SocialProvider, string> = { google: "Google", facebook: "Facebook", apple: "Apple", github: "GitHub" };

// Provider marks drawn inline (lucide has no brand icons).
function Mark({ p }: { p: SocialProvider }) {
  if (p === "google")
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
        <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.7z" />
        <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9h-4v3.1A12 12 0 0 0 12 24z" />
        <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.7V6.6h-4a12 12 0 0 0 0 10.9l4-3.1z" />
        <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
      </svg>
    );
  if (p === "facebook")
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
        <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z" />
      </svg>
    );
  if (p === "apple")
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
        <path fill="currentColor" d="M16.4 12.7c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1zM13.9 5.1c.7-.9 1.2-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1.1 3 1.1.1 2.3-.6 3-1.4z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path fill="currentColor" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.3 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
    </svg>
  );
}

/** One button per provider enabled in Supabase, above the email form. */
export function OAuthButtons({ providers, next, from }: { providers: SocialProvider[]; next: string; from: "login" | "signup" }) {
  if (!providers.length)
    return process.env.NODE_ENV === "development" ? (
      <p className="mb-6 border-2 border-dashed border-line px-3 py-2.5 text-center font-mono text-[12px] text-muted">
        Dev note: “Continue with Google” appears here once Google is enabled in Supabase → Authentication → Sign In / Providers.
      </p>
    ) : null;
  return (
    <div className="mb-6">
      <div className="space-y-2.5">
        {providers.map((p) => (
          <form key={p} action={signInWithProvider}>
            <input type="hidden" name="provider" value={p} />
            <input type="hidden" name="next" value={next} />
            <input type="hidden" name="from" value={from} />
            <button className={`${btn.secondary} ${size.lg} w-full normal-case tracking-normal`}>
              <Mark p={p} /> Continue with {names[p]}
            </button>
          </form>
        ))}
      </div>
      <p className="mt-6 flex items-center gap-3 font-mono text-[12px] uppercase tracking-widest text-muted before:h-px before:flex-1 before:bg-line after:h-px after:flex-1 after:bg-line">
        or with email
      </p>
    </div>
  );
}
