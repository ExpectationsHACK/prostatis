// Small colour maths toolkit: hex <-> HSL, WCAG contrast.

export function normHex(input: string): string | null {
  let h = input.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(h)) h = h.split("").map((c) => c + c).join("");
  return /^[0-9a-f]{6}$/i.test(h) ? "#" + h.toLowerCase() : null;
}

export function hexToRgb(hex: string): [number, number, number] {
  const h = (normHex(hex) ?? "#000000").slice(1);
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

export function rgbToHsl([r, g, b]: [number, number, number]): [number, number, number] {
  const R = r / 255, G = g / 255, B = b / 255;
  const max = Math.max(R, G, B), min = Math.min(R, G, B);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = max === R ? (G - B) / d + (G < B ? 6 : 0) : max === G ? (B - R) / d + 2 : (R - G) / d + 4;
  h *= 60;
  return [h, s * 100, l * 100];
}

export function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const k = (x: number) => (x + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (x: number) => l - a * Math.max(-1, Math.min(k(x) - 3, Math.min(9 - k(x), 1)));
  return "#" + [f(0), f(8), f(4)].map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
}

function lum(hex: string) {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

/** Pick black-ish or white text for a background, and report the ratio. */
export function bestInk(bg: string, dark = "#111111", light = "#ffffff") {
  const cd = contrast(bg, dark), cl = contrast(bg, light);
  return cd >= cl ? { ink: dark, ratio: cd } : { ink: light, ratio: cl };
}

export const ratioLabel = (r: number) => `${r.toFixed(1)}:1 ${r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "AA large" : "fail"}`;

export function rgbToHex([r, g, b]: [number, number, number]): string {
  return "#" + [r, g, b].map((x) => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, "0")).join("");
}

/**
 * The colour of this hue and saturation, as close to `l` as possible, that reaches `target`
 * contrast against `against`. Moves darker (or lighter for dark backgrounds) one step at a time.
 */
export function solveContrast(h: number, s: number, l: number, against: string, target: number): string {
  const darker = lum(against) > 0.18;
  for (let x = l; darker ? x >= 0 : x <= 100; x += darker ? -1 : 1) {
    const hex = hslToHex(h, s, x);
    if (contrast(hex, against) >= target) return hex;
  }
  return darker ? "#000000" : "#ffffff";
}

/** A Tailwind-style 50–950 scale for one hue; `base` marks the step closest to the brand colour. */
export function shadeScale(hex: string): { step: number; hex: string; base: boolean }[] {
  const [h, s, l] = rgbToHsl(hexToRgb(hex));
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const ls = [97, 94, 87, 77, 66, 55, 45, 36, 28, 21, 13];
  const near = ls.reduce((best, x, i) => (Math.abs(x - l) < Math.abs(ls[best] - l) ? i : best), 0);
  return steps.map((step, i) => ({ step, hex: i === near ? normHex(hex)! : hslToHex(h, Math.min(s * (ls[i] > 90 ? 0.9 : 1), 100), ls[i]), base: i === near }));
}

// Colour vision deficiency, full severity (Machado, Oliveira & Fernandes 2009), on linear RGB.
const cvd = {
  protanopia: [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882, -0.048116, 1.051998],
  deuteranopia: [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.01182, 0.04294, 0.968881],
  tritanopia: [1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 0.004733, 0.691367, 0.3039],
} as const;
export type Vision = keyof typeof cvd;
const toLin = (c: number) => {
  const x = c / 255;
  return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
};
const toSrgb = (x: number) => 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(Math.max(0, x), 1 / 2.4) - 0.055);

/** How a colour looks to someone with this kind of colour blindness. */
export function simulate(hex: string, vision: Vision): string {
  const [r, g, b] = hexToRgb(hex).map(toLin);
  const m = cvd[vision];
  return rgbToHex([toSrgb(m[0] * r + m[1] * g + m[2] * b), toSrgb(m[3] * r + m[4] * g + m[5] * b), toSrgb(m[6] * r + m[7] * g + m[8] * b)]);
}

/** Rough "how different do these look" distance ("redmean": 0 = same, about 765 = black vs white). */
export function colorDistance(a: string, b: string): number {
  const [r1, g1, b1] = hexToRgb(a), [r2, g2, b2] = hexToRgb(b);
  const rm = (r1 + r2) / 2;
  return Math.sqrt((2 + rm / 256) * (r1 - r2) ** 2 + 4 * (g1 - g2) ** 2 + (2 + (255 - rm) / 256) * (b1 - b2) ** 2);
}

/**
 * The main colours in a logo, from its pixels (RGBA bytes). Skips transparent pixels, groups
 * similar colours, and favours brand-like colours over the white/black/grey around them.
 */
export function dominantColors(rgba: ArrayLike<number>, max = 5): string[] {
  const buckets = new Map<number, { n: number; r: number; g: number; b: number }>();
  for (let i = 0; i + 3 < rgba.length; i += 4) {
    if (rgba[i + 3] < 128) continue;
    const r = rgba[i], g = rgba[i + 1], b = rgba[i + 2];
    const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
    const x = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
    x.n++;
    x.r += r;
    x.g += g;
    x.b += b;
    buckets.set(key, x);
  }
  const scored = [...buckets.values()]
    .map((x) => {
      const hex = rgbToHex([x.r / x.n, x.g / x.n, x.b / x.n]);
      const [, s, l] = rgbToHsl(hexToRgb(hex));
      const plain = s < 12 || l > 94 || l < 6;
      return { hex, score: x.n * (plain ? 0.15 : 1 + s / 100) };
    })
    .sort((a, b) => b.score - a.score);
  const out: string[] = [];
  for (const c of scored) {
    if (out.every((o) => colorDistance(o, c.hex) > 60)) out.push(c.hex);
    if (out.length >= max) break;
  }
  return out;
}
