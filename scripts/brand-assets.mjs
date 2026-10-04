// Regenerates the Prostatis logo files from src/lib/logo.ts (run: node scripts/brand-assets.mjs).
// SVGs are written directly; PNGs are rendered from those SVGs with sharp (bundled with Next.js).
import { writeFileSync } from "node:fs";
import sharp from "sharp";
import { logoSvg } from "../src/lib/logo.ts";

const out = (p, data) => writeFileSync(new URL(`../${p}`, import.meta.url), data);
const png = (svg, size) => sharp(Buffer.from(svg), { density: 600 }).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();

out("public/brand/prostatis-mark.svg", logoSvg() + "\n");
out("public/brand/prostatis-mark-white.svg", logoSvg({ color: "#ffffff" }) + "\n");
// Favicon: white on dark browser tabs, ink on light ones, heavier line for 16px.
out("src/app/icon.svg", logoSvg({ square: true, adaptive: true, stroke: 5.6 }) + "\n");

out("public/brand/prostatis-mark.png", await png(logoSvg({ square: true }), 1024));
out("public/brand/prostatis-mark-white.png", await png(logoSvg({ square: true, color: "#ffffff" }), 1024));
// Emails can't use SVG: a small transparent PNG, shown at 36px (2× for sharp phone screens).
out("public/brand/prostatis-mark-email.png", await png(logoSvg({ square: true }), 72));

// favicon.ico for older browsers: ink mark on the paper colour so it shows on dark tabs too.
const tile = (size) =>
  sharp({ create: { width: size, height: size, channels: 4, background: "#faf8f4" } })
    .composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${size * 0.22}" fill="#faf8f4"/></svg>`), blend: "dest-in" }])
    .png()
    .toBuffer()
    .then(async (bg) => sharp(bg).composite([{ input: await png(logoSvg({ square: true, stroke: 6 }), size) }]).png().toBuffer());
const sizes = [16, 32, 48];
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
