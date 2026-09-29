import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Handles email-confirmation and magic-link redirects from Supabase Auth.
// Supports both the PKCE `code` flow and `token_hash` email templates.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const raw = searchParams.get("next") ?? "/dashboard";
  const next = raw.startsWith("/") && !raw.startsWith("//") && !raw.startsWith("/\\") ? raw : "/dashboard";

  const supabase = await createClient();
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  let ok = false;
  if (code) {
    ok = !(await supabase.auth.exchangeCodeForSession(code)).error;
  } else if (tokenHash && type) {
    ok = !(await supabase.auth.verifyOtp({ token_hash: tokenHash, type })).error;
  }

  return NextResponse.redirect(new URL(ok ? next : `/login?error=link&next=${encodeURIComponent(next)}`, origin));
}
