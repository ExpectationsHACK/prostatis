import { type NextRequest } from "next/server";
import { unsubscribeByToken } from "@/lib/newsletter";

/**
 * One-click unsubscribe (RFC 8058): mail apps POST here when someone taps their built-in
 * "Unsubscribe" button. Always answers 200 so the address can't be probed.
 */
export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("t") ?? "";
  await unsubscribeByToken(token).catch(() => null);
  return new Response("Unsubscribed", { status: 200 });
}
