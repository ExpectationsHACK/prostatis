// Renders ../../brand/stynark-brand-reel.html to MP4 (1080×1920, 30 fps) with original music.
//   node brand-reel.mjs stills 0.5 1.8 3.0 ...   saves preview frames (+ a contact sheet) to brand/stills/
//   node brand-reel.mjs render                   silent video → brand/work/silent.mp4
//   node brand-reel.mjs mix                      music + final MP4 → brand/stynark-brand-reel.mp4
import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { compose } from "./sales-music.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const FF = createRequire(import.meta.url)("@ffmpeg-installer/ffmpeg").path;
const PAGE = path.join(here, "..", "..", "brand", "stynark-brand-reel.html");
const DIR = path.join(here, "..", "..", "brand");
const WORK = path.join(DIR, "work");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FPS = 30;
for (const d of [WORK, path.join(DIR, "stills")]) mkdirSync(d, { recursive: true });

async function open() {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(PAGE).href + "#export", { waitUntil: "load" });
  await page.evaluate(async () => {
    await document.fonts.load('600 100px "Archivo"');
    await document.fonts.load('500 30px "JetBrains Mono"');
    await document.fonts.ready;
  });
  return { browser, page };
}
const shot = (page, t) => page.evaluate((x) => window.__render(x), t).then(() => page.screenshot({ type: "jpeg", quality: 93, clip: { x: 0, y: 0, width: 1080, height: 1920 } }));

const [, , stage, ...args] = process.argv;

if (stage === "stills") {
  const { browser, page } = await open();
  const times = args.map(Number);
  for (const t of times) {
    const img = await shot(page, t);
    writeFileSync(path.join(DIR, "stills", `t${t.toFixed(2)}.jpg`), img);
  }
  await browser.close();
  const files = times.map((t) => path.join(DIR, "stills", `t${t.toFixed(2)}.jpg`));
  const cols = Math.min(6, files.length);
  const inputs = files.flatMap((f) => ["-i", f]);
  const filter = files.map((_, i) => `[${i}:v]scale=270:480[s${i}]`).join(";") + ";" + files.map((_, i) => `[s${i}]`).join("") + `xstack=inputs=${files.length}:layout=${files.map((_, i) => `${(i % cols) * 270}_${Math.floor(i / cols) * 480}`).join("|")}[out]`;
  execFileSync(FF, ["-y", "-loglevel", "error", ...inputs, "-filter_complex", filter, "-map", "[out]", path.join(DIR, "stills", "sheet.jpg")]);
  console.log("stills + sheet written");
}

if (stage === "render") {
  const { browser, page } = await open();
  const dur = await page.evaluate(() => window.__dur);
  const out = path.join(WORK, "silent.mp4");
  const enc = spawn(FF, ["-y", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], { stdio: ["pipe", "ignore", "pipe"] });
  let err = "";
  enc.stderr.on("data", (d) => (err += d));
  const frames = Math.round(dur * FPS);
  for (let f = 0; f < frames; f++) {
    const img = await shot(page, f / FPS);
    if (!enc.stdin.write(img)) await new Promise((r) => enc.stdin.once("drain", r));
    if (f % (FPS * 2) === 0) console.log(`${Math.round((f / frames) * 100)}%`);
  }
  enc.stdin.end();
  const code = await new Promise((r) => enc.on("close", r));
  await browser.close();
  if (code !== 0) throw new Error(err.slice(-1500));
  console.log("rendered", out);
}

if (stage === "mix") {
  const music = path.join(WORK, "music.wav");
  // Original music (sales-music.mjs): energetic house groove; the beat drops on the reveal (2.6 s).
  compose(music, 0, 16.6, 2.6, 7);
  const final = path.join(DIR, "stynark-brand-reel.mp4");
  execFileSync(FF, ["-y", "-loglevel", "error", "-i", path.join(WORK, "silent.mp4"), "-i", music, "-filter_complex", "[1:a]afade=t=out:st=15.6:d=0.9,loudnorm=I=-14:TP=-1.5:LRA=9[a]", "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", "-movflags", "+faststart", final]);
  console.log("final", final);
}
