/**
 * The Prostatis mark: an isometric box drawn as one unbroken line that reads as an "S"
 * (for Stynark), with two dashes on the front face. One source of truth for every place
 * the logo is drawn: the site header, icons, share images, certificates and emails.
 *
 * Units: the box's centre corner is (0,0); each edge is 33 units long.
 */
const W = 28.58; // half the box's width (33 × cos 30°)

export const LOGO = {
  /** Tight box around the mark, for use next to the wordmark. */
  viewBox: "-31 -35.5 62 71",
  /** Square box, for icons and avatars. */
  squareViewBox: "-37 -37 74 74",
  stroke: 4.2,
  /** The box outline, drawn in one stroke with round ends and corners. */
  outline: `M13.15 -25.41L0 -33L${-W} -16.5L0 0L${W} -16.5L${W} 16.5L0 33L${-W} 16.5L${-W} 4.9`,
  /** The two slanted dashes on the front face (filled shapes). */
  dashes: ["M-13.75 4.11L-2 10.9L-2 15.75L-13.75 8.96Z", "M-10.75 14.35L-2 19.4L-2 24.25L-10.75 19.2Z"],
  ink: "#151515",
} as const;

/** The mark as a standalone SVG document (transparent background). */
export function logoSvg({ color = LOGO.ink, square = false, adaptive = false, stroke = LOGO.stroke }: { color?: string; square?: boolean; adaptive?: boolean; stroke?: number } = {}) {
  // `adaptive` (favicons): white on dark browser tabs, ink on light ones. Favicons also use a
  // heavier `stroke` so the line survives at 16px.
  const style = adaptive ? `<style>.m{stroke:${color};fill:${color}}@media (prefers-color-scheme:dark){.m{stroke:#fff;fill:#fff}}</style>` : "";
  const paint = adaptive ? `class="m"` : `stroke="${color}" fill="${color}"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${square ? LOGO.squareViewBox : LOGO.viewBox}" role="img" aria-label="Prostatis">${style}<g ${paint}><path d="${LOGO.outline}" fill="none" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>${LOGO.dashes
    .map((d) => `<path d="${d}" stroke="none"/>`)
    .join("")}</g></svg>`;
}
