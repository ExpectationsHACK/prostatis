import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getPillar } from "@/lib/curriculum";
import type { ToolMeta } from "@/lib/tools";
import { ToolThumb } from "./art/tool-thumb";

/** Grid card: the tool's thumbnail, title, what it does, and its pillar. */
export function ToolCard({ tool }: { tool: ToolMeta }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="ink-block block-press group flex h-full flex-col bg-card">
      <div className="border-b border-edge">
        <ToolThumb slug={tool.slug} tone={tool.tone} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="label text-brand-text">
          {getPillar(tool.pillar).title}
          {tool.bonus ? " · Bonus" : ""}
        </p>
        <h3 className="display mt-1.5 flex items-start justify-between gap-2 text-[17px] sm:text-[19px] text-ink">
          {tool.title}
          <ArrowRight className="mt-1 size-4 shrink-0 text-brand-text transition-transform group-hover:translate-x-1" aria-hidden />
        </h3>
        <p className="mt-1.5 flex-1 font-mono text-[12.5px] leading-relaxed text-muted">{tool.description}</p>
      </div>
    </Link>
  );
}
