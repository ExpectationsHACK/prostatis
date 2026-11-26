// Builds the Stynark "learn a skill" ad from ../../brand/stynark-skill-ad.html. Stages, in order:
//   node skill-ad.mjs voice          speaks every line (Windows voice) into brand/work/skill/vo
//   node skill-ad.mjs plan           trims the lines, times each scene to its line, writes TIMINGS into the page
//   node skill-ad.mjs stills 1 5 9   preview frames into brand/stills/
//   node skill-ad.mjs render         silent video
//   node skill-ad.mjs mix            voice + ducked music + sound effects → brand/stynark-skill-ad.mp4 (+ music-only)
import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { compose } from "./sales-music.mjs";
import { renderSfx } from "./sfx.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const FF = createRequire(import.meta.url)("@ffmpeg-installer/ffmpeg").path;
const BRAND = path.join(here, "..", "..", "brand");
const PAGE = path.join(BRAND, "stynark-skill-ad.html");
const WORK = path.join(BRAND, "work", "skill");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FPS = 30;
for (const d of [WORK, `${WORK}/vo`, `${WORK}/trim`, path.join(BRAND, "stills")]) mkdirSync(d, { recursive: true });
const [, , stage, ...args] = process.argv;

const wavSeconds = (file) => {
  const b = readFileSync(file);
  for (let off = 12; off < b.length; ) {
    const id = b.toString("ascii", off, off + 4), size = b.readUInt32LE(off + 4);
    if (id === "data") return size / b.readUInt32LE(28);
    off += 8 + size;
  }
  return 0;
};
async function open() {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(PAGE).href + "#export", { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    for (const f of ['600 80px "Archivo"', '500 40px "Geist"', '600 40px "Geist"', '500 30px "Geist Mono"']) await document.fonts.load(f);
    await document.fonts.ready;
  });
  return { browser, page };
}
const shot = (page, t) => page.evaluate((x) => window.__render(x), t).then(() => page.screenshot({ type: "jpeg", quality: 92, clip: { x: 0, y: 0, width: 1080, height: 1920 } }));

if (stage === "voice") {
  const { browser, page } = await open();
  const lines = (await page.evaluate(() => window.__lines())).map((l) => ({ ...l, file: `b${String(l.i).padStart(2, "0")}.wav` }));
  await browser.close();
  writeFileSync(`${WORK}/lines.json`, JSON.stringify(lines, null, 1));
  execFileSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", path.join(here, "voice-lines.ps1"), "-Lines", `${WORK}/lines.json`, "-Out", `${WORK}/vo`, "-Rate", "+4%"], { stdio: "inherit" });
}

if (stage === "plan") {
  const lines = JSON.parse(readFileSync(`${WORK}/lines.json`, "utf8"));
  for (const l of lines) execFileSync(FF, ["-y", "-loglevel", "error", "-i", `${WORK}/vo/${l.file}`, "-af", "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,aresample=48000", "-ac", "1", `${WORK}/trim/${l.file}`]);
  // Each scene lasts as long as its line plus a short breath; a few beats get room to land.
  const LEAD = 0.12, BREATH = 0.32, HOLD = { 2: 0.35, 5: 0.5, 9: 0.3, 10: 0.9, 15: 0.5, 20: 0.4 };
  let t = 0;
  const beats = [], voiceAt = [];
  lines.forEach((l, i) => {
    const d = wavSeconds(`${WORK}/trim/${l.file}`);
    let len = Math.max(LEAD + d + BREATH + (HOLD[i] ?? 0), 1.35);
    if (i === lines.length - 1) len += 2.6; // the end card lingers on the address
    const s = +t.toFixed(3); t += len;
    beats.push([s, +t.toFixed(3)]); voiceAt.push(+(s + LEAD).toFixed(3));
  });
  const total = +t.toFixed(3);
  const html = readFileSync(PAGE, "utf8").replace(/\/\*TIMINGS\*\/[\s\S]*?\/\*END\*\//, `/*TIMINGS*/const TIMINGS = ${JSON.stringify({ beats, voiceAt, total })};/*END*/`);
  writeFileSync(PAGE, html);
  const inputs = lines.flatMap((l) => ["-i", `${WORK}/trim/${l.file}`]);
  const fc = lines.map((_, k) => { const ms = Math.round(voiceAt[k] * 1000); return `[${k}:a]aresample=48000,adelay=${ms}|${ms},apad=whole_len=${Math.round(total * 48000)}[a${k}]`; }).join(";") +
    ";" + lines.map((_, k) => `[a${k}]`).join("") + `amix=inputs=${lines.length}:dropout_transition=0,volume=${lines.length},atrim=0:${total},loudnorm=I=-16:TP=-1.5:LRA=7[out]`;
  execFileSync(FF, ["-y", "-loglevel", "error", ...inputs, "-filter_complex", fc, "-map", "[out]", "-ar", "48000", "-ac", "2", `${WORK}/voice.wav`]);
  console.log(`planned ${lines.length} beats, ${total.toFixed(1)}s`);
}

if (stage === "stills") {
  const { browser, page } = await open();
  for (const t of args.map(Number)) writeFileSync(path.join(BRAND, "stills", `skill-${t.toFixed(2)}.jpg`), await shot(page, t));
  await browser.close();
  console.log("stills written");
}

if (stage === "render") {
  const { browser, page } = await open();
  const dur = await page.evaluate(() => window.__dur());
  const out = `${WORK}/silent.mp4`;
  const enc = spawn(FF, ["-y", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], { stdio: ["pipe", "ignore", "pipe"] });
  let err = ""; enc.stderr.on("data", (d) => (err += d));
  const frames = Math.round(dur * FPS);
  for (let f = 0; f < frames; f++) {
    const img = await shot(page, f / FPS);
    if (!enc.stdin.write(img)) await new Promise((r) => enc.stdin.once("drain", r));
    if (f % (FPS * 5) === 0) console.log(`${Math.round((f / frames) * 100)}%`);
  }
  enc.stdin.end();
  const code = await new Promise((r) => enc.on("close", r));
  writeFileSync(`${WORK}/meta.json`, JSON.stringify({ dur, sfx: await page.evaluate(() => window.__sfx()), drop: await page.evaluate(() => window.__drop()) }));
  await browser.close();
  if (code !== 0) throw new Error(err.slice(-1500));
  console.log("rendered", out);
}

if (stage === "mix") {
  const { dur, sfx, drop } = JSON.parse(readFileSync(`${WORK}/meta.json`, "utf8"));
  const music = `${WORK}/music.wav`, fxw = `${WORK}/sfx.wav`;
  // An upbeat original bed whose beat drops on "Meet Stynark".
  compose(music, 4, dur + 0.2, drop, 21);
  renderSfx(fxw, sfx, dur + 0.2);
  const enc = ["-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", "-movflags", "+faststart"];
  const fade = `afade=t=out:st=${(dur - 1).toFixed(2)}:d=1`;
  execFileSync(FF, ["-y", "-loglevel", "error", "-i", `${WORK}/silent.mp4`, "-i", music, "-i", `${WORK}/voice.wav`, "-i", fxw, "-filter_complex",
    "[2:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,asplit=2[vo][sc];[1:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,volume=0.34[m];[m][sc]sidechaincompress=threshold=0.02:ratio=6:attack=15:release=350[md];" +
    `[3:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,volume=0.45[fx];[md][vo][fx]amix=inputs=3:duration=first:dropout_transition=0,volume=3,${fade},loudnorm=I=-14:TP=-1.5:LRA=9[a]`,
    "-map", "0:v", "-map", "[a]", ...enc, path.join(BRAND, "stynark-skill-ad.mp4")]);
  execFileSync(FF, ["-y", "-loglevel", "error", "-i", `${WORK}/silent.mp4`, "-i", music, "-i", fxw, "-filter_complex",
    `[1:a]volume=0.6[m];[2:a]volume=0.6[s];[m][s]amix=inputs=2:duration=first:dropout_transition=0,volume=2,${fade},loudnorm=I=-15:TP=-1.5:LRA=9[a]`,
    "-map", "0:v", "-map", "[a]", ...enc, path.join(BRAND, "stynark-skill-ad-music-only.mp4")]);
  console.log("final", path.join(BRAND, "stynark-skill-ad.mp4"));
}
