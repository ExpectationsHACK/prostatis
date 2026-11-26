import { NextResponse, type NextRequest } from "next/server";
import { exchangeCode, GOOGLE_CALLBACK_PATH, GOOGLE_COOKIE, googleDirectConfigured, googleRedirectUri, readFlow, sameState } from "@/lib/google-signin";
import { safeNext } from "@/lib/safe-next";
import { createClient } from "@/lib/supabase/server";

// Google sends people back here after "Continue with Google" (see src/lib/google-signin.ts).
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const flow = readFlow(request.cookies.get(GOOGLE_COOKIE)?.value);
  const back = flow?.from === "signup" ? "/signup" : "/login";
  const next = safeNext(flow?.next);
  const go = (path: string) => {
    const res = NextResponse.redirect(new URL(path, origin));
    res.cookies.set(GOOGLE_COOKIE, "", { path: GOOGLE_CALLBACK_PATH, maxAge: 0 }); // one use only
    return res;
  };
  const failed = () => go(`${back}?error=oauth&next=${encodeURIComponent(next)}`);

  // Closed the chooser or pressed Cancel: back to the form, no error banner.
  if (searchParams.get("error") === "access_denied") return go(`${back}?next=${encodeURIComponent(next)}`);

  const code = searchParams.get("code"), state = searchParams.get("state");
  if (!googleDirectConfigured() || !flow || !code || !state || !sameState(state, flow.state)) return failed();

  const idToken = await exchangeCode(code, googleRedirectUri());
  if (!idToken) return failed();

  // Supabase checks Google's signature, that the token is for our client ID, and the nonce.
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithIdToken({ provider: "google", token: idToken, nonce: flow.nonce });
  if (error) {
    console.error("Google sign-in: Supabase rejected the ID token:", error.message);
    return failed();
  }
  return go(next);
}
