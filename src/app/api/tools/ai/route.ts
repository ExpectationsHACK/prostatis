import { aiPrompt, aiSpecs, factsText, flagClaims } from "@/lib/tool-defs/ai";
import type { Field, ToolDef, Values } from "@/lib/tool-defs/types";
import { AiUnavailable, aiEnabled, dailyCap, writeWithAi } from "@/lib/server/ai";
import { clientIp, rateLimited } from "@/lib/server/rate-limit";

export const maxDuration = 60;

async function fieldsFor(slug: string): Promise<Field[]> {
  const mods = await Promise.all([
    import("@/lib/tool-defs/design"),
    import("@/lib/tool-defs/solutions"),
    import("@/lib/tool-defs/seo"),
    import("@/lib/tool-defs/automation"),
    import("@/lib/tool-defs/leadgen"),
    import("@/lib/tool-defs/agents"),
  ]);
  const def: ToolDef | undefined = mods.map((m) => m.defs[slug]).find(Boolean);
  return def?.kind === "generator" ? def.fields : [];
}

/** Keep plain values only: strings, numbers, booleans and string lists. */
function clean(raw: unknown): Values {
  if (!raw || typeof raw !== "object") return {};
  const out: Values = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>).slice(0, 40)) {
    if (!/^[a-zA-Z][\w-]{0,40}$/.test(k)) continue;
    if (typeof v === "string") out[k] = v.slice(0, 2000);
    else if (typeof v === "number" || typeof v === "boolean") out[k] = v;
    else if (Array.isArray(v)) out[k] = v.filter((x): x is string => typeof x === "string").slice(0, 30).map((x) => x.slice(0, 200));
  }
  return out;
}

export async function POST(req: Request) {
  if (!aiEnabled()) return Response.json({ error: "AI writing isn't switched on for this site." }, { status: 503 });
  const ip = clientIp(req.headers);
  if (rateLimited(`ai:${ip}`, 4, 60_000)) return Response.json({ error: "That's a lot of AI requests in a minute. Wait a moment and try again." }, { status: 429 });
  if (rateLimited(`ai-day:${ip}`, 25, 86_400_000)) return Response.json({ error: "You've used today's free AI writes. The templates still work, and the AI is back tomorrow." }, { status: 429 });

  let body: { slug?: unknown; values?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const slug = String(body.slug ?? "");
  const spec = aiSpecs[slug];
  if (!spec) return Response.json({ error: "This tool doesn't use AI writing." }, { status: 400 });

  const facts = factsText(clean(body.values), await fieldsFor(slug), spec.labels, spec.omit);
  if (facts.length < 20) return Response.json({ error: "Fill in a few details first, so the AI has something real to work from." }, { status: 400 });
  // The site-wide daily budget is only spent on requests that will actually reach the AI.
  if (rateLimited("global:ai-day", dailyCap(), 86_400_000)) return Response.json({ error: "Today's free AI writing has all been used. The templates still work, and the AI is back tomorrow." }, { status: 429 });

  try {
    const result = await writeWithAi(aiPrompt(spec, facts));
    return Response.json({ ...result, flags: flagClaims(result.sections.flatMap((s) => s.items), facts) });
  } catch (e) {
    if (e instanceof AiUnavailable) return Response.json({ error: e.message }, { status: 503 });
    console.error("ai tool failed", slug, e);
    return Response.json({ error: "The AI didn't answer. Try again in a moment, or use the template result." }, { status: 500 });
  }
}
