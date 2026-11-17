// Regenerates the Stynark logo files from src/lib/logo.ts (run: node scripts/brand-assets.mjs).
// SVGs are written directly; PNGs are rendered from those SVGs with sharp (bundled with Next.js).
import { writeFileSync } from "node:fs";
import sharp from "sharp";
import { logoSvg } from "../src/lib/logo.ts";

const out = (p, data) => writeFileSync(new URL(`../${p}`, import.meta.url), data);
const png = (svg, size) => sharp(Buffer.from(svg), { density: 600 }).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();

out("public/brand/prostatis-mark.svg", logoSvg() + "\n");
out("public/brand/prostatis-mark-white.svg", logoSvg({ color: "#ffffff" }) + "\n");
// Favicon: a black mark on a white rounded tile, so it's black everywhere (tabs, bookmarks,
// Google results) and still shows on dark backgrounds. Heavier line for 16px.
out("src/app/icon.svg", logoSvg({ color: "#000000", tile: "#ffffff", stroke: 5.6 }) + "\n");

out("public/brand/prostatis-mark.png", await png(logoSvg({ square: true }), 1024));
out("public/brand/prostatis-mark-white.png", await png(logoSvg({ square: true, color: "#ffffff" }), 1024));
// Emails can't use SVG: a small transparent PNG, shown at 36px (2× for sharp phone screens).
out("public/brand/prostatis-mark-email.png", await png(logoSvg({ square: true }), 72));

// favicon.ico, the same black-on-white tile. Google wants favicons in multiples of 48px.
const tile = (size) => png(logoSvg({ color: "#000000", tile: "#ffffff", stroke: 6 }), size);
const sizes = [16, 32, 48, 96];
const images = await Promise.all(sizes.map(tile));
// ICO container holding PNG images (supported by every current browser).
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((img, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(sizes[i], e);
  header.writeUInt8(sizes[i], e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(img.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += img.length;
});
out("src/app/favicon.ico", Buffer.concat([header, ...images]));
console.log("brand assets written");
