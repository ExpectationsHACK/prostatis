import { ImageResponse } from "next/og";
import { Mark, og } from "@/lib/og-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon: iOS fills transparent areas with black, so the mark sits on the paper colour.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: og.paper }}>
        <Mark size={120} />
      </div>
    ),
    size,
  );
}
