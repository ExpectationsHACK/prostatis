import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { AI_RULES, type AiResult } from "@/lib/tool-defs/ai";

/**
 * Claude behind the free tools' "Write it with AI" button. Off unless ANTHROPIC_API_KEY is
 * set; every tool still works without it (the templates run in the browser).
 */

export const aiEnabled = () => !!process.env.ANTHROPIC_API_KEY;

// Default to the current Opus; AI_TOOLS_MODEL can pick a cheaper model (e.g. claude-sonnet-5-5).
const model = () => process.env.AI_TOOLS_MODEL || "claude-opus-5-5";

/** Daily cap across everyone, so a busy day can't run up an unexpected bill. */
export const dailyCap = () => Math.max(1, Number(process.env.AI_TOOLS_DAILY_LIMIT) || 300);

const Output = z.object({
  sections: z.array(z.object({ title: z.string(), items: z.array(z.string()) })),
  gaps: z.array(z.string()),
});

export class AiUnavailable extends Error {}

let client: Anthropic | null = null;

export async function writeWithAi(prompt: string): Promise<AiResult> {
  client ??= new Anthropic({ timeout: 55_000, maxRetries: 1 });
  const id = model();
  // Effort keeps short copy jobs quick and cheap; only the 5-series models accept it.
  const effort = /^claude-(opus|sonnet|fable)-5/.test(id) ? { effort: "low" as const } : {};
  try {
    const res = await client.messages.parse({
      model: id,
      max_tokens: 8000,
      system: AI_RULES,
      messages: [{ role: "user", content: prompt }],
      output_config: { format: zodOutputFormat(Output), ...effort },
    });
    if (res.stop_reason === "refusal") throw new AiUnavailable("The AI couldn't write this one. Check the details and try again.");
    if (!res.parsed_output) throw new AiUnavailable("The AI's answer came back incomplete. Try again.");
    const clip = (x: string) => x.trim().slice(0, 2000);
    return {
      sections: res.parsed_output.sections.slice(0, 12).map((s) => ({ title: clip(s.title).slice(0, 160), items: s.items.slice(0, 20).map(clip).filter(Boolean) })),
      gaps: res.parsed_output.gaps.slice(0, 5).map(clip),
    };
  } catch (e) {
    if (e instanceof AiUnavailable) throw e;
    if (e instanceof Anthropic.RateLimitError || (e instanceof Anthropic.APIError && (e.status === 529 || e.status === 503))) {
      throw new AiUnavailable("The AI is busy right now. Wait a minute and try again.");
    }
    throw e;
  }
}
