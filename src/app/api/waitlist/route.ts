import { adminConfigured, createAdminClient } from "@/lib/supabase/admin";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

// Normalise Nigerian numbers to +234XXXXXXXXXX; leave anything else as typed.
function normaliseWhatsapp(raw: string) {
  const digits = raw.replace(/[^\d+]/g, "");
  if (/^0\d{10}$/.test(digits)) return "+234" + digits.slice(1);
  if (/^234\d{10}$/.test(digits)) return "+" + digits;
  return digits;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const entry = {
    name: clean(body.name, 80),
    email: clean(body.email, 200).toLowerCase(),
    whatsapp: normaliseWhatsapp(clean(body.whatsapp, 30)) || null,
    source: clean(body.source, 60) || "unknown",
  };

  if (!EMAIL_RE.test(entry.email)) return Response.json({ error: "Please enter a valid email." }, { status: 400 });

  if (adminConfigured()) {
    // Duplicate emails are ignored rather than erroring.
    const { error } = await createAdminClient()
      .from("waitlist")
      .upsert(entry, { onConflict: "email", ignoreDuplicates: true });
    if (error) {
      console.error("waitlist insert failed", error);
      return Response.json({ error: "Couldn't save your details. Please try again." }, { status: 502 });
    }
    return Response.json({ ok: true });
  }

  // No database configured: keep a local file in development so the flow is testable.
  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "waitlist.jsonl"), JSON.stringify({ ...entry, created_at: new Date().toISOString() }) + "\n");
    return Response.json({ ok: true });
  }

  console.error("waitlist: Supabase admin credentials not set");
  return Response.json({ error: "The waitlist isn't open yet. Please try again soon." }, { status: 503 });
}
