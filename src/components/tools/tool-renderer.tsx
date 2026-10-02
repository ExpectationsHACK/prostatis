"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentType } from "react";
import type { ToolDef } from "@/lib/tool-defs/types";
import { AiEnabled } from "./kit/ai-writer";

const loading = () => <div className="h-96 animate-pulse border border-edge bg-sunk" />;

// Hand-built tools. Client-only: they restore saved inputs and shared links from the browser.
const custom: Record<string, ComponentType> = {
  "claude-md-generator": dynamic(() => import("./claude-md-generator"), { loading, ssr: false }),
  "token-cost-calculator": dynamic(() => import("./token-cost-calculator"), { loading, ssr: false }),
  "cold-dm-script-generator": dynamic(() => import("./cold-dm-script-generator"), { loading, ssr: false }),
  "whatsapp-business-bio": dynamic(() => import("./whatsapp-business-bio"), { loading, ssr: false }),
  "cron-schedule-generator": dynamic(() => import("./cron-schedule-generator"), { loading, ssr: false }),
  "hook-line-generator": dynamic(() => import("./hook-line-generator"), { loading, ssr: false }),
  "proposal-generator": dynamic(() => import("./proposal-generator"), { loading, ssr: false }),
  "client-pricing-calculator": dynamic(() => import("./client-pricing-calculator"), { loading, ssr: false }),
  "invoice-generator": dynamic(() => import("./invoice-generator"), { loading, ssr: false }),
};

// Definition-driven tools, loaded per pillar so each page only ships its pillar's logic.
const pillarLoaders: Record<string, () => Promise<{ defs: Record<string, ToolDef> }>> = {
  web_design: () => import("@/lib/tool-defs/design"),
  web_dev: () => import("@/lib/tool-defs/dev"),
  web_solutions: () => import("@/lib/tool-defs/solutions"),
  seo: () => import("@/lib/tool-defs/seo"),
  automation: () => import("@/lib/tool-defs/automation"),
  lead_gen: () => import("@/lib/tool-defs/leadgen"),
  agents: () => import("@/lib/tool-defs/agents"),
};

const DefTool = dynamic(() => import("./kit/def-tool"), { loading });

function PillarTool({ slug, pillar, title }: { slug: string; pillar: string; title: string }) {
  const [def, setDef] = useState<ToolDef | null | undefined>(undefined);
  useEffect(() => {
    let live = true;
    pillarLoaders[pillar]?.().then((m) => live && setDef(m.defs[slug] ?? null));
    return () => {
      live = false;
    };
  }, [slug, pillar]);
  if (def === undefined) return loading();
  if (def === null) return <p className="text-muted">This tool is coming soon.</p>;
  return <DefTool def={def} slug={slug} title={title} />;
}

export default function ToolRenderer({ slug, pillar, title, ai = false }: { slug: string; pillar: string; title: string; ai?: boolean }) {
  const Custom = custom[slug];
  return <AiEnabled value={ai}>{Custom ? <Custom /> : <PillarTool slug={slug} pillar={pillar} title={title} />}</AiEnabled>;
}
