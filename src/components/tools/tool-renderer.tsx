"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentType } from "react";
import type { ToolDef } from "@/lib/tool-defs/types";

const loading = () => <div className="h-96 animate-pulse border-2 border-edge bg-sunk" />;

// Hand-built tools. Tools whose output depends on the current date render client-only.
const custom: Record<string, ComponentType> = {
  "claude-md-generator": dynamic(() => import("./claude-md-generator"), { loading }),
  "token-cost-calculator": dynamic(() => import("./token-cost-calculator"), { loading }),
  "cold-dm-script-generator": dynamic(() => import("./cold-dm-script-generator"), { loading }),
  "whatsapp-business-bio": dynamic(() => import("./whatsapp-business-bio"), { loading }),
  "cron-schedule-generator": dynamic(() => import("./cron-schedule-generator"), { loading, ssr: false }),
  "hook-line-generator": dynamic(() => import("./hook-line-generator"), { loading }),
  "proposal-generator": dynamic(() => import("./proposal-generator"), { loading }),
  "client-pricing-calculator": dynamic(() => import("./client-pricing-calculator"), { loading }),
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

function PillarTool({ slug, pillar }: { slug: string; pillar: string }) {
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
  return <DefTool def={def} />;
}

export default function ToolRenderer({ slug, pillar }: { slug: string; pillar: string }) {
  const Custom = custom[slug];
  return Custom ? <Custom /> : <PillarTool slug={slug} pillar={pillar} />;
}
