import { ImageResponse } from "next/og";
import type { Certificate } from "@/lib/certificates";
import { fastTrack, getPillar, mainTrack } from "@/lib/curriculum";
import { Mark, og } from "@/lib/og-mark";
import { site } from "@/lib/site";

export const certSize = { width: 1600, height: 1131 }; // A4 landscape ratio

export function trackOf(id: Certificate["track"]) {
  return id === "main_track" ? mainTrack : fastTrack;
}

export function certDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" });
}

export function verifyUrl(id: string) {
  return `${site.url}/certificate/${id}`;
}

/** The certificate as a PNG: used for the download button and the email attachment. */
export function certificateImage(c: Certificate) {
  const track = trackOf(c.track);
  const skills = [...new Set(track.modules.map((m) => getPillar(m.pillar).title))];
  const name = c.name || "STEINARK member";
  const host = verifyUrl(c.id).replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: og.orange, padding: 40 }}>
        <div style={{ flex: 1, display: "flex", background: og.ink, padding: 10 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", background: og.paper, border: `4px solid ${og.ink}`, padding: "52px 80px 40px", color: og.ink }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", width: 64, height: 64, alignItems: "center", justifyContent: "center", background: og.orange, border: `4px solid ${og.ink}` }}>
                <Mark size={44} />
              </div>
              <div style={{ display: "flex", fontSize: 38, fontWeight: 700 }}>{site.name}</div>
            </div>
            <div style={{ display: "flex", marginTop: 48, fontSize: 24, letterSpacing: 8, textTransform: "uppercase", color: og.green, fontWeight: 700 }}>
              Certificate of completion
            </div>
            <div style={{ display: "flex", marginTop: 34, fontSize: 26, color: "#5c5249" }}>This certifies that</div>
            <div style={{ display: "flex", marginTop: 10, fontSize: name.length > 26 ? 76 : 96, fontWeight: 700, letterSpacing: -2, textAlign: "center" }}>{name}</div>
            <div style={{ display: "flex", marginTop: 22, maxWidth: 1100, fontSize: 28, lineHeight: 1.45, textAlign: "center" }}>
              {`completed all ${track.modules.length} lessons, practical tasks and assessments of the ${track.name} (${track.length}) and passed the final assessment with ${c.score}/${c.total}.`}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 30, maxWidth: 1200 }}>
              {skills.map((s) => (
                <div key={s} style={{ display: "flex", border: `3px solid ${og.ink}`, background: "#fffdf8", padding: "6px 14px", fontSize: 20, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>
                  {s}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", width: "100%", marginTop: "auto", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column", width: 420 }}>
                <div style={{ display: "flex", fontSize: 30, fontWeight: 700, paddingBottom: 8, borderBottom: `3px solid ${og.ink}` }}>{site.name}</div>
                <div style={{ display: "flex", fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "#5c5249", marginTop: 8 }}>Issued by</div>
              </div>
              <div style={{ display: "flex", width: 190, height: 190, borderRadius: 999, background: og.orange, border: `5px solid ${og.ink}`, alignItems: "center", justifyContent: "center", flexDirection: "column", transform: "rotate(-8deg)" }}>
                <Mark size={54} />
                <div style={{ display: "flex", fontSize: 22, fontWeight: 700, letterSpacing: 3, marginTop: 6 }}>VERIFIED</div>
                <div style={{ display: "flex", fontSize: 15, letterSpacing: 2 }}>{new Date(c.issued_at).getUTCFullYear()}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", width: 420, alignItems: "flex-end" }}>
                <div style={{ display: "flex", fontSize: 30, fontWeight: 700, paddingBottom: 8, borderBottom: `3px solid ${og.ink}` }}>{certDate(c.issued_at)}</div>
                <div style={{ display: "flex", fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "#5c5249", marginTop: 8 }}>Date issued</div>
              </div>
            </div>
            <div style={{ display: "flex", width: "100%", marginTop: 34, borderTop: `3px solid ${og.ink}`, paddingTop: 18, justifyContent: "space-between", fontSize: 19 }}>
              <div style={{ display: "flex" }}>{`Certificate ID: ${c.id}`}</div>
              <div style={{ display: "flex" }}>{`Verify: ${host}`}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    certSize,
  );
}
