// Builds the sales videos in ../prostatis-sales-videos.html end to end. Run the stages in order
// (each can be re-run on its own):
//   node sales.mjs extract        lines.json from the page
//   node sales.mjs voice          speaks every line (Windows voice)
//   node sales.mjs plan           trims the lines, times each scene to its line, writes the timings into the page, builds voice tracks
//   node sales.mjs music          composes an original music bed per video
//   node sales.mjs render [ids]   renders silent videos (one browser per video), e.g. "render 0,3"
//   node sales.mjs mix [ids]      final MP4s (voice + ducked music) and music-only versions into ../sales/
import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { compose } from "./sales-music.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const FF = createRequire(import.meta.url)("@ffmpeg-installer/ffmpeg").path;
const PAGE = path.join(here, "..", "prostatis-sales-videos.html");
const WORK = path.join(here, "sales");
const OUT = path.join(here, "..", "sales");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FPS = 30;
for (const d of [WORK, `${WORK}/vo`, `${WORK}/trim`, `${WORK}/voice`, `${WORK}/music`, `${WORK}/silent`, OUT]) mkdirSync(d, { recursive: true });

const [, , stage, which] = process.argv;
const readJson = (f) => JSON.parse(readFileSync(f, "utf8"));
const wavSeconds = (file) => {
  const b = readFileSync(file);
  for (let off = 12; off < b.length; ) {
    const id = b.toString("ascii", off, off + 4), size = b.readUInt32LE(off + 4);
    if (id === "data") return size / b.readUInt32LE(28);
    off += 8 + size;
  }
  return 0;
};
async function openPage(hash = "") {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(PAGE).href + hash, { waitUntil: "networkidle0" });
  return { browser, page };
}
const ids = async () => (which ? which.split(",").map(Number) : (await meta()).map((_, i) => i));
async function meta() { const { browser, page } = await openPage(); const m = await page.evaluate(() => window.__meta()); await browser.close(); return m; }

if (stage === "extract") {
  const { browser, page } = await openPage();
  const lines = (await page.evaluate(() => window.__lines())).map((l) => ({ ...l, file: `v${l.v}-b${l.i}.wav` }));
  await browser.close();
  writeFileSync(`${WORK}/lines.json`, JSON.stringify(lines, null, 1));
  console.log(`${lines.length} lines`);
}

if (stage === "voice") {
  execFileSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", path.join(here, "voice-lines.ps1"), "-Lines", `${WORK}/lines.json`, "-Out", `${WORK}/vo`], { stdio: "inherit" });
}

if (stage === "plan") {
  const lines = readJson(`${WORK}/lines.json`);
  for (const l of lines) execFileSync(FF, ["-y", "-loglevel", "error", "-i", `${WORK}/vo/${l.file}`, "-af", "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,aresample=48000", "-ac", "1", `${WORK}/trim/${l.file}`]);
  const LEAD = 0.3, BREATH = 0.55, timings = {}, voiceAt = {};
  for (const v of [...new Set(lines.map((l) => l.v))]) {
    const ls = lines.filter((l) => l.v === v);
    let t = 0;
    const beats = ls.map((l, i) => {
      const d = wavSeconds(`${WORK}/trim/${l.file}`);
      let len = d + LEAD + BREATH;
      if (i === 0) len = Math.max(len, 2.8);           // the hook holds long enough to read
      if (i === ls.length - 1) len += 1.6;              // the end card lingers on the address
      len = Math.max(len, 3.2);
      const s = Math.round(t * 10) / 10; t += len;
      return [s, Math.round(t * 10) / 10, +(s + LEAD).toFixed(2)];
    });
    timings[v] = { beats: beats.map(([s, e]) => [s, e]), total: beats.at(-1)[1] };
    voiceAt[v] = beats.map((b) => b[2]);
  }
  const html = readFileSync(PAGE, "utf8").replace(/\/\*TIMINGS\*\/[\s\S]*?\/\*END\*\//, `/*TIMINGS*/const TIMINGS = ${JSON.stringify(timings)};/*END*/`);
  writeFileSync(PAGE, html);
  writeFileSync(`${WORK}/timings.json`, JSON.stringify({ timings, voiceAt }, null, 1));
  for (const v of Object.keys(timings)) {
    const ls = lines.filter((l) => l.v === Number(v)), total = timings[v].total, args = ["-y", "-loglevel", "error"];
    ls.forEach((l) => args.push("-i", `${WORK}/trim/${l.file}`));
    const fc = ls.map((l, k) => { const ms = Math.round(voiceAt[v][k] * 1000); return `[${k}:a]aresample=48000,adelay=${ms}|${ms},apad=whole_len=${Math.round(total * 48000)}[a${k}]`; }).join(";") +
      ";" + ls.map((_, k) => `[a${k}]`).join("") + `amix=inputs=${ls.length}:dropout_transition=0,volume=${ls.length},atrim=0:${total},loudnorm=I=-16:TP=-1.5:LRA=7[out]`;
    execFileSync(FF, [...args, "-filter_complex", fc, "-map", "[out]", "-ar", "48000", "-ac", "2", `${WORK}/voice/v${v}.wav`]);
    console.log(`video ${Number(v) + 1}: ${total.toFixed(1)}s`);
  }
}

if (stage === "music") {
  const { timings } = readJson(`${WORK}/timings.json`);
  const m = await meta();
  const page = readFileSync(PAGE, "utf8");
  const moods = [...page.matchAll(/mood: (\d)/g)].map((x) => Number(x[1]));
  for (const v of Object.keys(timings)) {
    const tm = timings[v];
    compose(`${WORK}/music/v${v}.wav`, moods[v], tm.total, tm.beats[Math.min(2, tm.beats.length - 1)][0], Number(v));
    console.log(`music v${v} (${m[v].slug}, mood ${moods[v]})`);
  }
}

if (stage === "render") {
  const m = await meta();
  for (const v of await ids()) {
    const { browser, page } = await openPage("#export");
    await page.evaluate(() => document.fonts.ready);
    const out = `${WORK}/silent/v${v}.mp4`;
    const enc = spawn(FF, ["-y", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], { stdio: ["pipe", "ignore", "pipe"] });
    let err = ""; enc.stderr.on("data", (d) => (err += d));
    const frames = Math.round(m[v].total * FPS);
    for (let f = 0; f < frames; f++) {
      await page.evaluate((a, s) => window.__render(a, s), v, f / FPS);
      const img = await page.screenshot({ type: "jpeg", quality: 92, clip: { x: 0, y: 0, width: 1080, height: 1920 } });
      if (!enc.stdin.write(img)) await new Promise((r) => enc.stdin.once("drain", r));
      if (f % (FPS * 10) === 0) console.log(`${m[v].slug}: ${Math.round((f / frames) * 100)}%`);
    }
    enc.stdin.end();
    const code = await new Promise((r) => enc.on("close", r));
    await browser.close();
    if (code !== 0) throw new Error(err.slice(-1500));
    console.log(`rendered ${out}`);
  }
}

if (stage === "mix") {
  const m = await meta();
  for (const v of await ids()) {
    const n = String(v + 1).padStart(2, "0"), name = v === 10 ? "prostatis-welcome" : `prostatis-sales-${n}-${m[v].slug}`;
    const enc = ["-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", "-movflags", "+faststart"];
    execFileSync(FF, ["-y", "-loglevel", "error", "-i", `${WORK}/silent/v${v}.mp4`, "-i", `${WORK}/music/v${v}.wav`, "-i", `${WORK}/voice/v${v}.wav`, "-filter_complex",
      "[2:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,asplit=2[vo][sc];[1:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,volume=0.32[m];[m][sc]sidechaincompress=threshold=0.02:ratio=6:attack=15:release=350[md];" +
      "[md][vo]amix=inputs=2:duration=first:dropout_transition=0,volume=2,loudnorm=I=-14:TP=-1.5:LRA=9[a]",
      "-map", "0:v", "-map", "[a]", ...enc, `${OUT}/${name}.mp4`]);
    execFileSync(FF, ["-y", "-loglevel", "error", "-i", `${WORK}/silent/v${v}.mp4`, "-i", `${WORK}/music/v${v}.wav`, "-filter_complex", "[1:a]loudnorm=I=-16:TP=-1.5:LRA=9[a]",
      "-map", "0:v", "-map", "[a]", ...enc, `${OUT}/${name}-music-only.mp4`]);
    console.log(`${name}.mp4`);
  }
}
