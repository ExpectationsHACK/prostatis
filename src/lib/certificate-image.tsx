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
      <div style={{ width: "100%", height: "100%", display: "flex", background: og.paper, padding: 36 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", background: "#ffffff", border: `2px solid ${og.line}`, borderRadius: 24, padding: "64px 96px 44px", color: og.ink }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", width: 60, height: 60, alignItems: "center", justifyContent: "center", background: og.orange, borderRadius: 16 }}>
              <Mark size={40} />
            </div>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 600, letterSpacing: 5 }}>STEINARK</div>
          </div>
          <div style={{ display: "flex", marginTop: 56, fontSize: 22, letterSpacing: 6, color: og.label, fontWeight: 600 }}>CERTIFICATE OF COMPLETION</div>
          <div style={{ display: "flex", marginTop: 30, fontSize: 26, color: og.muted }}>This certifies that</div>
          <div style={{ display: "flex", marginTop: 12, fontSize: name.length > 26 ? 76 : 92, fontWeight: 700, letterSpacing: -2, textAlign: "center" }}>{name}</div>
          <div style={{ display: "flex", width: 120, height: 4, background: og.orange, borderRadius: 2, marginTop: 26 }} />
          <div style={{ display: "flex", marginTop: 26, maxWidth: 1080, fontSize: 27, lineHeight: 1.5, textAlign: "center", color: "#3a3833" }}>
            {`completed all ${track.modules.length} lessons, practical tasks and assessments of the ${track.name} (${track.length}) and passed the final assessment with ${c.score}/${c.total}.`}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 28, maxWidth: 1200 }}>
            {skills.map((s) => (
              <div key={s} style={{ display: "flex", border: `2px solid ${og.line}`, borderRadius: 999, padding: "6px 16px", fontSize: 19, color: "#3a3833" }}>
                {s}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", width: "100%", marginTop: "auto", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", width: 400 }}>
              <div style={{ display: "flex", fontSize: 28, fontWeight: 600, paddingBottom: 10, borderBottom: `2px solid ${og.ink}` }}>{site.name}</div>
              <div style={{ display: "flex", fontSize: 17, letterSpacing: 3, color: og.muted, marginTop: 10 }}>ISSUED BY</div>
            </div>
            <div style={{ display: "flex", width: 150, height: 150, borderRadius: 999, background: og.orange, alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <Mark size={48} />
              <div style={{ display: "flex", fontSize: 17, fontWeight: 700, letterSpacing: 3, marginTop: 4 }}>VERIFIED</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: 400, alignItems: "flex-end" }}>
              <div style={{ display: "flex", fontSize: 28, fontWeight: 600, paddingBottom: 10, borderBottom: `2px solid ${og.ink}` }}>{certDate(c.issued_at)}</div>
              <div style={{ display: "flex", fontSize: 17, letterSpacing: 3, color: og.muted, marginTop: 10 }}>DATE ISSUED</div>
            </div>
          </div>
          <div style={{ display: "flex", width: "100%", marginTop: 34, borderTop: `2px solid ${og.line}`, paddingTop: 18, justifyContent: "space-between", fontSize: 18, color: og.muted }}>
            <div style={{ display: "flex" }}>{`Certificate ID: ${c.id}`}</div>
            <div style={{ display: "flex" }}>{`Verify: ${host}`}</div>
          </div>
        </div>
      </div>
    ),
    certSize,
  );
}
