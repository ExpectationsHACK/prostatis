import { ImageResponse } from "next/og";
import { OgCard, ogSize } from "@/lib/og-card";

export const alt = "BuildWithAIClub — Learn to build with AI. Get paid in dollars from Nigeria.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard kicker="Nigeria-first · No code needed" title="Learn to build with AI. Get paid in dollars." sub="14-day fast track · 50 free tools · WhatsApp community · paid in naira" />,
    size,
  );
}
