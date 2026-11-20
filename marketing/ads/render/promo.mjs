// Renders the Stynark teaser and trailer from ../../brand/stynark-promo.html (1080×1920, 30 fps).
//   node promo.mjs stills trailer 1.5 3.4 ...   preview frames + contact sheet in brand/stills/
//   node promo.mjs render trailer|teaser|tracks silent video → brand/work/<cut>-silent.mp4
//   node promo.mjs mix trailer|teaser           sound effects + music → brand/stynark-<cut>.mp4
import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { compose } from "./sales-music.mjs";
import { renderSfx } from "./sfx.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const FF = createRequire(import.meta.url)("@ffmpeg-installer/ffmpeg").path;
const PAGE = path.join(here, "..", "..", "brand", "stynark-promo.html");
const DIR = path.join(here, "..", "..", "brand");
const WORK = path.join(DIR, "work");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FPS = 30;
for (const d of [WORK, path.join(DIR, "stills")]) mkdirSync(d, { recursive: true });

const [, , stage, cut = "trailer", ...args] = process.argv;

async function open() {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(PAGE).href + `#${cut}-export`, { waitUntil: "load" });
  await page.evaluate(async () => {
    await document.fonts.load('500 40px "Geist"');
    await document.fonts.load('600 40px "Geist"');
    await document.fonts.load('400 40px "Inter"');
    await document.fonts.load('600 80px "Archivo"');
    await document.fonts.ready;
  });
  return { browser, page };
}
const shot = (page, t) => page.evaluate((x) => window.__render(x), t).then(() => page.screenshot({ type: "jpeg", quality: 93, clip: { x: 0, y: 0, width: 1080, height: 1920 } }));

if (stage === "stills") {
  const { browser, page } = await open();
  const times = args.map(Number);
  const files = [];
  for (const t of times) {
    const f = path.join(DIR, "stills", `${cut}-${t.toFixed(2)}.jpg`);
    writeFileSync(f, await shot(page, t));
    files.push(f);
  }
  await browser.close();
  const cols = 6, rows = Math.ceil(files.length / cols);
  // Pad to a full grid (this ffmpeg's xstack has no fill option).
  const all = [...files]; while (all.length < cols * rows) all.push(files[files.length - 1]);
  const filter = all.map((_, i) => `[${i}:v]scale=270:480[s${i}]`).join(";") + ";" + all.map((_, i) => `[s${i}]`).join("") + `xstack=inputs=${all.length}:layout=${all.map((_, i) => `${(i % cols) * 270}_${Math.floor(i / cols) * 480}`).join("|")}[out]`;
  execFileSync(FF, ["-y", "-loglevel", "error", ...all.flatMap((f) => ["-i", f]), "-filter_complex", filter, "-map", "[out]", path.join(DIR, "stills", `${cut}-sheet.jpg`)]);
  console.log("stills + sheet written");
}

if (stage === "render") {
  const { browser, page } = await open();
  const dur = await page.evaluate(() => window.__dur());
  const out = path.join(WORK, `${cut}-silent.mp4`);
  const enc = spawn(FF, ["-y", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], { stdio: ["pipe", "ignore", "pipe"] });
  let err = "";
  enc.stderr.on("data", (d) => (err += d));
  const frames = Math.round(dur * FPS);
  for (let f = 0; f < frames; f++) {
    const img = await shot(page, f / FPS);
    if (!enc.stdin.write(img)) await new Promise((r) => enc.stdin.once("drain", r));
    if (f % (FPS * 3) === 0) console.log(`${cut}: ${Math.round((f / frames) * 100)}%`);
  }
  enc.stdin.end();
  const code = await new Promise((r) => enc.on("close", r));
  // Save the cut's sound-effect timeline for the mix.
  writeFileSync(path.join(WORK, `${cut}-sfx.json`), JSON.stringify({ dur, sfx: await page.evaluate(() => window.__sfx()) }));
  await browser.close();
  if (code !== 0) throw new Error(err.slice(-1500));
  console.log("rendered", out);
}

if (stage === "mix") {
  const { dur, sfx } = JSON.parse((await import("node:fs")).readFileSync(path.join(WORK, `${cut}-sfx.json`), "utf8"));
  const music = path.join(WORK, `${cut}-music.wav`), fxw = path.join(WORK, `${cut}-sfx.wav`);
  // A calm, cinematic bed (sales-music mood 2) whose beat lands on the flash to white.
  // The beat lands on each cut's big moment: the flash (teaser, trailer), the "Learn to" steps (tracks).
  const drop = { teaser: 6.95, trailer: 15.55, tracks: 4.0 }[cut] ?? 4;
  // Cinematic bed for the teaser and trailer; a brighter, upbeat groove for the tracks explainer.
  compose(music, cut === "tracks" ? 4 : 2, dur + 0.2, drop, { teaser: 11, trailer: 12, tracks: 13 }[cut] ?? 13);
  renderSfx(fxw, sfx, dur + 0.2);
  const final = path.join(DIR, `stynark-${cut}.mp4`);
  execFileSync(FF, ["-y", "-loglevel", "error", "-i", path.join(WORK, `${cut}-silent.mp4`), "-i", music, "-i", fxw, "-filter_complex",
    `[1:a]volume=0.55[m];[2:a]volume=1.0[s];[m][s]amix=inputs=2:duration=first:dropout_transition=0,volume=2,afade=t=out:st=${(dur - 0.9).toFixed(2)}:d=0.9,loudnorm=I=-14:TP=-1.5:LRA=10[a]`,
    "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", "-movflags", "+faststart", final]);
  console.log("final", final);
}
