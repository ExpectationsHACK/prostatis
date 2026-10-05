import { after } from "next/server";
import { afterSubscribe } from "@/lib/newsletter";
import { clientIp, rateLimited } from "@/lib/server/rate-limit";
import { adminConfigured, createAdminClient } from "@/lib/supabase/admin";

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
  // Each signup can send an email, so cap it per visitor: stops scripts mailing strangers.
  const ip = clientIp(req.headers);
  if (rateLimited(`waitlist:${ip}`, 5, 600_000) || rateLimited("global:waitlist", 300, 3_600_000)) {
    return Response.json({ error: "Too many signups from here just now. Please try again in a few minutes." }, { status: 429 });
  }
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
    const { data: inserted, error } = await createAdminClient()
      .from("waitlist")
      .upsert(entry, { onConflict: "email", ignoreDuplicates: true })
      .select("email");
    if (error) {
      console.error("waitlist insert failed", error);
      return Response.json({ error: "Couldn't save your details. Please try again." }, { status: 502 });
    }
    // Welcome new subscribers (or ask a returning one to confirm), after responding. The answer
    // is the same either way, so the form can't be used to check who is subscribed.
    const isNew = Boolean(inserted?.length);
    after(() => afterSubscribe(entry.email, isNew).catch((e) => console.error("after subscribe", e)));
    return Response.json({ ok: true });
  }

  console.error("waitlist: Supabase admin credentials not set");
  return Response.json({ error: "The waitlist isn't open yet. Please try again soon." }, { status: 503 });
}
