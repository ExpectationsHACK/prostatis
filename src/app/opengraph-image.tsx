import { ImageResponse } from "next/og";
import { OgCard, ogSize } from "@/lib/og-card";

export const alt = "Prostatis by Stynark: Learn to build websites with AI and turn it into a source of income.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard kicker="If you can type it, you can build it" title="Learn to build websites with AI. Turn it into income." sub="14-day fast track · 50 free tools · WhatsApp community · paid in naira" />,
    size,
  );
}
