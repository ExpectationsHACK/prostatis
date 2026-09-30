import type { Block } from "./types";

const H = (t: string) => t.toUpperCase();

/** Plain-text version of a tool's result, for "copy everything", download and print. */
export function blocksToText(blocks: Block[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "text":
          return `${H(b.title)}\n${b.text}`;
        case "list":
          return `${H(b.title)}\n${b.items.map((x) => "- " + x.replace(/\n/g, "\n  ")).join("\n")}`;
        case "table":
          return `${H(b.title)}\n${[b.columns, ...b.rows].map((r) => r.join(" | ")).join("\n")}`;
        case "stats":
          return b.items.map((i) => `${i.label}: ${i.value}${i.sub ? ` (${i.sub})` : ""}`).join("\n");
        case "swatches":
          return `${H(b.title)}\n${b.colors.map((c) => `${c.name}: ${c.hex} (text ${c.ink}, ${c.contrast})`).join("\n")}`;
        case "serp":
          return `${H(b.title)}\n${b.pageTitle}\n${b.url}\n${b.description}`;
        case "wireframe":
          return `${H(b.title)}\n${b.sections.map((x, i) => `${i + 1}. ${x}`).join("\n")}`;
        case "fonts":
          return `${H(b.title)}\n${b.pairs.map((p) => `${p.heading} + ${p.body}: ${p.note}`).join("\n")}`;
        case "flow":
          return `${H(b.title)}\n${b.steps.map((x, i) => `${i + 1}. ${x.label}${x.detail ? " - " + x.detail : ""}`).join("\n")}`;
        case "checks":
          return `${H(b.title)}\n${b.items.map((x) => `${x.ok ? "✓" : "✗"} ${x.text}${!x.ok && x.fix ? " → " + x.fix : ""}`).join("\n")}`;
        case "notice":
          return `NOTE: ${b.text}`;
        case "image":
          return `${b.title}: ${b.alt}`;
      }
    })
    .join("\n\n");
}

/** Encode a tool's inputs for a shareable link (URL-safe base64 of JSON). */
export function encodeValues(v: unknown): string {
  const bytes = new TextEncoder().encode(JSON.stringify(v));
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeValues<T>(s: string): T | null {
  try {
    const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64 + "===".slice((b64.length + 3) % 4));
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)))) as T;
  } catch {
    return null;
  }
}
