import { Mark, og } from "./og-mark";

/** 1200×630 share card in the site's print style: orange field, ink block, receipt-style footer. */
export function OgCard({ kicker, title: rawTitle, sub: rawSub }: { kicker: string; title: string; sub: string }) {
  // The share-image font has no ₦ glyph, so spell the currency out here.
  const title = rawTitle.replace(/₦/g, "NGN ");
  const sub = rawSub.replace(/₦/g, "NGN ");
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: og.orange, padding: 56, color: og.ink }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", width: 64, height: 64, alignItems: "center", justifyContent: "center", background: og.paper, border: `4px solid ${og.ink}` }}>
          <Mark size={44} />
        </div>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>STEINARK</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 44,
          background: og.paper,
          border: `4px solid ${og.ink}`,
          boxShadow: `12px 12px 0 ${og.ink}`,
          padding: "36px 44px",
          flex: 1,
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: og.green, fontWeight: 700 }}>{kicker}</div>
        <div style={{ display: "flex", fontSize: title.length > 40 ? 58 : 72, fontWeight: 700, lineHeight: 1.05, marginTop: 14, letterSpacing: -1.5 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 28, marginTop: "auto", color: "#5c5249" }}>{sub}</div>
      </div>
    </div>
  );
}

export const ogSize = { width: 1200, height: 630 };
