import { Mark, og } from "./og-mark";

/** 1200×630 share card: calm off-white page, the arch tile and wordmark, one big line. */
export function OgCard({ kicker, title: rawTitle, sub: rawSub }: { kicker: string; title: string; sub: string }) {
  // The share-image font has no ₦ glyph, so spell the currency out here.
  const title = rawTitle.replace(/₦/g, "NGN ");
  const sub = rawSub.replace(/₦/g, "NGN ");
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: og.paper, padding: "64px 72px", color: og.ink }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ display: "flex", width: 60, height: 60, alignItems: "center", justifyContent: "center", background: og.orange, borderRadius: 16 }}>
          <Mark size={40} />
        </div>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: 4 }}>STEINARK</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
        <div style={{ display: "flex", fontSize: 26, color: og.label, fontWeight: 600 }}>{kicker}</div>
        <div style={{ display: "flex", fontSize: title.length > 48 ? 60 : 72, fontWeight: 700, lineHeight: 1.06, marginTop: 14, letterSpacing: -2 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 26, color: og.muted }}>{sub}</div>
      </div>
      <div style={{ display: "flex", height: 8, width: 120, background: og.orange, borderRadius: 4, marginTop: 40 }} />
    </div>
  );
}

export const ogSize = { width: 1200, height: 630 };
