// After voice.ps1: trims the silence off each line, times every scene to its line (vo/plan.json),
// writes those timings into ../prostatis-ads.html, and builds one 30-second voice track per ad
// (voice/adN.wav) with each line placed at its scene.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const FF = createRequire(import.meta.url)("@ffmpeg-installer/ffmpeg").path;
const lines = JSON.parse(readFileSync("vo/lines.json", "utf8"));
mkdirSync("vo/trim", { recursive: true });
mkdirSync("voice", { recursive: true });

const seconds = (file) => {
  const b = readFileSync(file);
  let off = 12;
  while (off < b.length) {
    const id = b.toString("ascii", off, off + 4), size = b.readUInt32LE(off + 4);
    if (id === "data") return size / b.readUInt32LE(28);
    off += 8 + size;
  }
  return 0;
};

for (const l of lines) {
  const name = `ad${l.ad}-${l.label}.wav`;
  execFileSync(FF, ["-y", "-loglevel", "error", "-i", `vo/${name}`, "-af", "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,aresample=48000", "-ac", "1", `vo/trim/${name}`]);
}

// Scene length = its line + a breath (hooks at least 3s); spare time goes to solution, proof and the end card.
const LEAD = 0.25, mins = [3, 4.5, 8, 5, 4], share = [0, 0, 0.4, 0.3, 0.3];
const plan = [];
for (let ad = 0; ad < 5; ad++) {
  const ls = lines.filter((l) => l.ad === ad);
  const L = ls.map((l, i) => Math.max(mins[i], seconds(`vo/trim/ad${ad}-${l.label}.wav`) + LEAD + 0.55));
  const slack = 30 - L.reduce((a, b) => a + b, 0);
  if (slack < 0) throw new Error(`Ad ${ad + 1}'s voiceover is longer than 30 seconds: shorten a line in vo/lines.json`);
  L.forEach((x, i) => (L[i] = x + slack * share[i]));
  let t = 0;
  plan.push(L.map((x, i) => {
    const start = Math.round(t * 10) / 10; t += x;
    return { label: ls[i].label, start, end: i === 4 ? 30 : Math.round(t * 10) / 10, voAt: +(start + LEAD).toFixed(2) };
  }));
}
writeFileSync("vo/plan.json", JSON.stringify(plan, null, 1));

// Scene timings into the player/video page.
const page = "../prostatis-ads.html", flat = plan.flat();
let i = 0;
const html = readFileSync(page, "utf8").replace(/t: \[\d+(?:\.\d+)?, \d+(?:\.\d+)?\], label: "(\w+)"/g, (m, label) => {
  const b = flat[i++];
  if (b.label !== label) throw new Error(`Scene order mismatch at ${label}`);
  return `t: [${b.start}, ${b.end}], label: "${label}"`;
});
writeFileSync(page, html);

for (const [ad, beats] of plan.entries()) {
  const args = ["-y", "-loglevel", "error"];
  beats.forEach((b) => args.push("-i", `vo/trim/ad${ad}-${b.label}.wav`));
  const fc = beats.map((b, k) => `[${k}:a]aresample=48000,adelay=${Math.round(b.voAt * 1000)}|${Math.round(b.voAt * 1000)},apad=whole_len=1440000[v${k}]`).join(";") +
    ";" + beats.map((_, k) => `[v${k}]`).join("") + `amix=inputs=${beats.length}:dropout_transition=0,volume=${beats.length},atrim=0:30,loudnorm=I=-16:TP=-1.5:LRA=7[out]`;
  execFileSync(FF, [...args, "-filter_complex", fc, "-map", "[out]", "-ar", "48000", "-ac", "2", `voice/ad${ad}.wav`]);
  console.log(`voice/ad${ad}.wav`);
}
