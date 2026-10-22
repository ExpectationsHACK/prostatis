// Renders each Prostatis ad frame by frame (30 fps, 30 s, 1080×1920) and encodes it to MP4.
// Usage: node render.mjs <html-file> <out-dir> [adIndexes comma-separated] [fps]
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const require = createRequire(import.meta.url);
const ffmpeg = require("@ffmpeg-installer/ffmpeg").path;
const [, , htmlFile, outDir, which = "0,1,2,3,4", fpsArg = "30"] = process.argv;
const fps = Number(fpsArg);
const names = ["1-the-skill", "2-no-coding", "3-cost", "4-phone", "5-businesses"];
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(htmlFile).href + "#export", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);

for (const ad of which.split(",").map(Number)) {
  const out = `${outDir}/prostatis-ad-${names[ad]}.mp4`;
  const enc = spawn(ffmpeg, ["-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], { stdio: ["pipe", "ignore", "pipe"] });
  let err = "";
  enc.stderr.on("data", (d) => (err += d));
  const total = 30 * fps;
  for (let f = 0; f < total; f++) {
    await page.evaluate((a, s) => window.__render(a, s), ad, f / fps);
    const img = await page.screenshot({ type: "jpeg", quality: 92, clip: { x: 0, y: 0, width: 1080, height: 1920 } });
    if (!enc.stdin.write(img)) await new Promise((r) => enc.stdin.once("drain", r));
    if (f % (fps * 5) === 0) console.log(`${names[ad]}: ${Math.round((f / total) * 100)}%`);
  }
  enc.stdin.end();
  const code = await new Promise((r) => enc.on("close", r));
  if (code !== 0) { console.error(err.slice(-2000)); process.exit(1); }
  console.log(`done ${out}`);
}
await browser.close();
