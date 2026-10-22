// Original 30-second music beds for the five Prostatis ads, synthesised from scratch (no samples,
// no borrowed melodies). Each ad gets its own tempo and groove; the full beat drops where the
// ad's solution scene starts (from vo/plan.json). Output: music/adN.wav (48 kHz stereo 16-bit).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SR = 48000, LEN = 30, N = SR * LEN;
const plan = JSON.parse(readFileSync("vo/plan.json", "utf8"));
mkdirSync("music", { recursive: true });

let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);

function track() { return { L: new Float32Array(N), R: new Float32Array(N) }; }
function add(t, start, buf, gain = 1, pan = 0) {
  const s = Math.floor(start * SR), gl = gain * (1 - Math.max(0, pan)), gr = gain * (1 + Math.min(0, pan));
  for (let i = 0; i < buf.length && s + i < N; i++) { if (s + i < 0) continue; t.L[s + i] += buf[i] * gl; t.R[s + i] += buf[i] * gr; }
}

// ---- Instruments (each returns a mono Float32Array) ----
function kick(len = .35) { const n = SR * len, b = new Float32Array(n); let ph = 0; for (let i = 0; i < n; i++) { const t = i / SR; const f = 45 + 110 * Math.exp(-t * 30); ph += 2 * Math.PI * f / SR; b[i] = Math.sin(ph) * Math.exp(-t * 9) * 1.1; } return b; }
function clap() { const n = SR * .18, b = new Float32Array(n); let lp = 0; for (let i = 0; i < n; i++) { const t = i / SR; const burst = t < .03 ? (Math.floor(t * 300) % 2 ? .6 : 1) : 1; const x = rnd(); lp += .35 * (x - lp); b[i] = (x - lp) * Math.exp(-t * 22) * burst * .7; } return b; }
function hat(dec = 45) { const n = SR * .08, b = new Float32Array(n); let prev = 0; for (let i = 0; i < n; i++) { const x = rnd(); b[i] = (x - prev) * Math.exp(-(i / SR) * dec) * .35; prev = x; } return b; }
function shaker() { const n = SR * .07, b = new Float32Array(n); let prev = 0; for (let i = 0; i < n; i++) { const t = i / SR; const x = rnd(); b[i] = (x - prev) * Math.min(1, t * 200) * Math.exp(-t * 55) * .18; prev = x; } return b; }
function tone(midi, len, { wave = "sine", dec = .3, att = .005, harm = 0, cutoff = 0 } = {}) {
  const n = Math.floor(SR * len), b = new Float32Array(n), f = hz(midi); let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR, p = (t * f) % 1;
    let x = wave === "saw" ? (2 * p - 1) * .6 + (2 * ((t * f * 1.006) % 1) - 1) * .4 : Math.sin(2 * Math.PI * p);
    if (harm) x += harm * Math.sin(2 * Math.PI * ((t * f * 4) % 1)) * Math.exp(-t * 18);
    if (cutoff) { lp += cutoff * (x - lp); x = lp; }
    b[i] = x * (t < att ? t / att : Math.exp(-(t - att) / dec));
  }
  return b;
}
function logDrum(midi) { const n = SR * .45, b = new Float32Array(n); let ph = 0; const f0 = hz(midi); for (let i = 0; i < n; i++) { const t = i / SR; const f = f0 * (1 + .6 * Math.exp(-t * 40)); ph += 2 * Math.PI * f / SR; b[i] = Math.tanh(Math.sin(ph) * 1.8) * Math.exp(-t * 7) * .8; } return b; }
function tick() { const n = SR * .02, b = new Float32Array(n); for (let i = 0; i < n; i++) { const t = i / SR; b[i] = Math.sin(2 * Math.PI * 2400 * t) * Math.exp(-t * 400) * .6; } return b; }
function ding() { const n = SR * 1.6, b = new Float32Array(n); for (let i = 0; i < n; i++) { const t = i / SR; b[i] = (Math.sin(2 * Math.PI * 1568 * t) + .5 * Math.sin(2 * Math.PI * 3136 * t) + .25 * Math.sin(2 * Math.PI * 4704 * t)) * Math.exp(-t * 3) * .35; } return b; }
function whoosh(len = .7) { const n = SR * len, b = new Float32Array(n); let lp = 0; for (let i = 0; i < n; i++) { const t = i / SR, k = t / len; lp += (.02 + k * .4) * (rnd() - lp); b[i] = lp * Math.sin(Math.PI * k) * 1.2; } return b; }
function crackle(t) { for (let i = 0; i < N; i++) { const v = (Math.random() < .0004 ? rnd() * .25 : 0) + rnd() * .004; t.L[i] += v; t.R[i] += v; } }

// Chord progression vi–IV–I–V, shifted per ad. [root, third, fifth] as MIDI notes.
const prog = (k) => [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]].map((c) => c.map((m) => m + k));

function build(ad) {
  const cfg = [
    { bpm: 118, key: 0 },  // 1 Afro-house
    { bpm: 104, key: 2 },  // 2 marimba Afrobeat
    { bpm: 100, key: -3 }, // 3 minimal, ticking clock
    { bpm: 82, key: 1 },   // 4 lo-fi Afrobeats
    { bpm: 108, key: -1 }, // 5 Afropop
  ][ad];
  const beat = 60 / cfg.bpm, bar = beat * 4, drop = plan[ad][2].start, chords = prog(cfg.key);
  const t = track(), K = kick(), C = clap(), H = hat(), S = shaker();
  const bars = Math.ceil(LEN / bar);
  for (let b = 0; b < bars; b++) {
    const t0 = b * bar, ch = chords[b % 4], full = t0 >= drop - .01;
    for (let q = 0; q < 16; q++) {
      const at = t0 + q * beat / 4; if (at >= LEN) break;
      const on = q % 4 === 0, off = q % 4 === 2;
      if (ad === 0) {
        if (on) add(t, at, K, .9);
        if (off) add(t, at, H, .7, .2);
        if (full) { add(t, at, S, 1, -.3); if (q === 4 || q === 12) add(t, at, C, .55); if ([3, 6, 10, 14].includes(q)) add(t, at, tone(ch[0] - 24, .25, { dec: .12, harm: .3 }), .5); if (off) add(t, at, tone(ch[1 + (q % 8 ? 1 : 0)] + 12, .2, { wave: "saw", dec: .07, cutoff: .2 }), .14, .3); }
      }
      if (ad === 1) {
        if (q % 2 === 0) add(t, at, tone(ch[(q / 2) % 3] + 12 + (q % 8 === 6 ? 12 : 0), .45, { dec: .18, harm: .45 }), .32, (q % 4 ? .25 : -.25));
        if (full) { if (q === 0 || q === 8 || q === 11) add(t, at, K, .65); if (q % 2 === 1) add(t, at, S, .9); if (q === 4 || q === 12) add(t, at, C, .35); if (on) add(t, at, tone(ch[0] - 24, .35, { dec: .2 }), .35); }
      }
      if (ad === 2) {
        if (!full && q % 2 === 0) add(t, at, tick(), q % 8 === 0 ? .9 : .5);
        if (full) { if (q === 0 || q === 6 || q === 8) add(t, at, K, .85); if (q === 4 || q === 12) add(t, at, C, .4); if (q % 2 === 0) add(t, at, H, .45, .2); if (q === 0) add(t, at, tone(ch[0] - 24, bar * .9, { dec: 1.2, harm: .2 }), .32); if (q === 0) ch.forEach((m, i) => add(t, at, tone(m, bar, { wave: "saw", att: .3, dec: 2, cutoff: .03 }), .06, i - 1)); }
      }
      if (ad === 3) {
        if (q === 0) ch.forEach((m, i) => add(t, at, tone(m, bar, { wave: "saw", att: .25, dec: 2.5, cutoff: .02 }), .09, (i - 1) * .4));
        if (full || t0 >= 3) { if (q === 0 || q === 10) add(t, at, K, .6); if (q === 4 || q === 12) add(t, at, C, .25); if (q % 2 === 0) add(t, at + (q % 4 === 2 ? beat * .08 : 0), H, .3, .25); }
        if (full && (q === 0 || q === 7)) add(t, at, tone(ch[0] - 24, .5, { dec: .35 }), .4);
      }
      if (ad === 4) {
        if ([0, 3, 6, 10].includes(q) && (full || t0 >= 3)) add(t, at, K, .8);
        if (full) { if (q === 4 || q === 12) add(t, at, C, .5); add(t, at, S, q % 2 ? .6 : 1); if ([2, 7, 11, 14].includes(q)) add(t, at, logDrum(ch[0] - 12 + (q === 14 ? 7 : 0)), .45); if (q === 2 || q === 10) ch.forEach((m, i) => add(t, at, tone(m + 12, .25, { wave: "saw", dec: .09, cutoff: .25 }), .07, (i - 1) * .5)); }
        else if (q === 0) ch.forEach((m, i) => add(t, at, tone(m, bar, { wave: "saw", att: .2, dec: 2, cutoff: .03 }), .06, i - 1));
      }
    }
  }
  if (ad === 1) add(t, drop - .65, whoosh(), .7);
  if (ad === 2) add(t, drop, kick(.6), 1);
  if (ad === 3) crackle(t);
  if (ad === 4) add(t, drop, ding(), .8);
  return t;
}

function write(file, t) {
  let peak = 0; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(t.L[i]), Math.abs(t.R[i]));
  const g = .89 / (peak || 1), fade = SR * 1.5, fin = SR * .05;
  const buf = Buffer.alloc(44 + N * 4);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) {
    const f = Math.min(1, i / fin, (N - i) / fade);
    const l = Math.tanh(t.L[i] * g * 1.15) * f, r = Math.tanh(t.R[i] * g * 1.15) * f;
    buf.writeInt16LE(Math.round(l * 32000), 44 + i * 4); buf.writeInt16LE(Math.round(r * 32000), 46 + i * 4);
  }
  writeFileSync(file, buf);
}

for (let ad = 0; ad < 5; ad++) { write(`music/ad${ad}.wav`, build(ad)); console.log(`music/ad${ad}.wav`); }
