import { ImageResponse } from "next/og";
import { Mark, og } from "@/lib/og-mark";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: og.orange, borderRadius: 14 }}>
        <Mark size={42} />
      </div>
    ),
    size,
  );
}
