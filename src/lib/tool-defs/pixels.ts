/**
 * How wide text is on Google's results page. Google cuts titles and descriptions by pixel
 * width, not character count ("WWW" is far wider than "iii"), so we measure with Arial's
 * real glyph widths (Arial shares Helvetica's metrics: units per 1000 em).
 */

const widths: Record<string, number> = {
  " ": 278, "!": 278, '"': 355, "#": 556, $: 556, "%": 889, "&": 667, "'": 191, "(": 333, ")": 333, "*": 389, "+": 584,
  ",": 278, "-": 333, ".": 278, "/": 278, ":": 278, ";": 278, "<": 584, "=": 584, ">": 584, "?": 556, "@": 1015,
  A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 500, K: 667, L: 556, M: 833,
  N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  "[": 278, "\\": 278, "]": 278, "^": 469, _: 556, "`": 333,
  a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222, j: 222, k: 500, l: 222, m: 833,
  n: 556, o: 556, p: 556, q: 556, r: 333, s: 500, t: 278, u: 556, v: 500, w: 722, x: 500, y: 500, z: 500,
  "{": 334, "|": 260, "}": 334, "~": 584,
  "–": 556, "—": 1000, "…": 1000, "‘": 222, "’": 222, "“": 333, "”": 333, "•": 350, "·": 278, "₦": 722, "£": 556, "€": 556, "★": 800,
};
for (let d = 0; d <= 9; d++) widths[String(d)] = 556;

/** Pixel width of `text` set in Arial at `px` size. */
export function textWidth(text: string, px: number): number {
  let units = 0;
  for (const ch of text) units += widths[ch] ?? (/[A-ZÀ-Þ]/.test(ch) ? 667 : 556);
  return (units * px) / 1000;
}

/**
 * Approximate limits on Google's results page. Google changes its layout now and then, so
 * these are good guides, not guarantees; the length checks say "about".
 */
export const SERP = {
  title: { px: 20, max: 600, label: "title (desktop)" },
  description: { px: 14, max: 920, label: "description (desktop)" },
  descriptionMobile: { px: 14, max: 680, label: "description (phone)" },
} as const;

/** Cut text the way Google does: whole words that fit, then "…". */
export function fitWidth(text: string, max: number, px: number): { text: string; cut: boolean; width: number } {
  const width = textWidth(text, px);
  if (width <= max) return { text, cut: false, width };
  const room = max - textWidth(" …", px);
  let out = "";
  for (const word of text.split(" ")) {
    const next = out ? `${out} ${word}` : word;
    if (textWidth(next, px) > room) break;
    out = next;
  }
  return { text: (out || text.slice(0, 10)).replace(/[\s,.;:|–-]+$/, "") + " …", cut: true, width };
}

/** Short verdict for a title or description, e.g. "54 chars · 512 of 600px ✓". */
export function widthVerdict(text: string, kind: keyof typeof SERP, minChars: number) {
  const { px, max } = SERP[kind];
  const w = Math.round(textWidth(text, px));
  const base = `${text.length} chars · ${w} of ${max}px`;
  if (w > max) return { ok: false, text: `${base}: too wide, Google will cut it off` };
  if (text.length < minChars) return { ok: false, text: `${base}: a bit short` };
  return { ok: true, text: `${base} ✓` };
}
