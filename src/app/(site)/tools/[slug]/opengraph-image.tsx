import { ImageResponse } from "next/og";
import { OgCard, ogSize } from "@/lib/og-card";
import { getTool, liveTools } from "@/lib/tools";

export const alt = "Free tool from STEINARK";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return liveTools.map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const tool = getTool((await params).slug);
  return new ImageResponse(
    <OgCard kicker="Free tool · no signup" title={tool?.title ?? "Free AI tools"} sub={tool?.description ?? "No signup. Works on your phone."} />,
    size,
  );
}
