// Renders ../../brand/og-thumbnail.html to the site's link-preview image (src/app/opengraph-image.jpg).
//   node og-thumb.mjs
import { statSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import puppeteer from "puppeteer-core";

const here = path.dirname(fileURLToPath(import.meta.url));
const PAGE = path.join(here, "..", "..", "brand", "og-thumbnail.html");
const OUT = path.join(here, "..", "..", "..", "src", "app", "opengraph-image.jpg");

const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(PAGE).href, { waitUntil: "networkidle0" });
await page.evaluate(async () => {
  await document.fonts.load('600 78px "Archivo"');
  await document.fonts.load('600 26px "Geist"');
  await document.fonts.ready;
});
// JPEG keeps it small (WhatsApp skips large preview images); 1200×630 is the size every app expects.
writeFileSync(OUT, await page.screenshot({ type: "jpeg", quality: 88, clip: { x: 0, y: 0, width: 1200, height: 630 } }));
await browser.close();
console.log(OUT, Math.round(statSync(OUT).size / 1024) + " KB");
