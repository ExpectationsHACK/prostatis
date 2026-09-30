import "server-only";
import { createHash } from "node:crypto";
import { readTable, writeTable } from "@/lib/data/local";
import { previewMode } from "@/lib/learning/store";
import { createAdminClient } from "@/lib/supabase/admin";
import type { View } from "./analytics-shared";

const T = "page_views";

/**
 * A visitor id that can't be reversed or followed across days: hash of a server secret, the
 * date, the IP and the browser. No cookie is set and the IP itself is never stored.
 */
export function visitorId(ip: string, ua: string, day: string) {
  const salt = process.env.ANALYTICS_SALT || process.env.SUPABASE_SECRET_KEY || "bwac-local";
  return createHash("sha256").update(`${salt}|${day}|${ip}|${ua}`).digest("hex").slice(0, 20);
}

export async function recordView(v: View) {
  if (previewMode) {
    await writeTable<View>(T, (rows) => {
      rows.push(v);
      // Keep the local file small.
      if (rows.length > 20000) rows.splice(0, rows.length - 20000);
    });
    return;
  }
  const { error } = await createAdminClient().from(T).insert(v);
  if (error) console.error("analytics: insert failed", error.message);
}

/** Page views from the last `days` days (capped so the admin stays fast). */
export async function loadViews(days: number): Promise<View[]> {
  const since = new Date(Date.now() - days * 86400_000).toISOString();
  if (previewMode) return (await readTable<View>(T)).filter((r) => r.created_at >= since);
  const db = createAdminClient();
  const out: View[] = [];
  // Page through in chunks of 1000 (the Data API's default page size), up to 100k rows.
  for (let from = 0; from < 100_000; from += 1000) {
    const { data, error } = await db
      .from(T)
      .select("created_at, path, referrer, utm_source, country, region, city, device, visitor, user_id")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .range(from, from + 999);
    if (error) throw error;
    out.push(...((data ?? []) as View[]));
    if (!data || data.length < 1000) break;
  }
  return out;
}
