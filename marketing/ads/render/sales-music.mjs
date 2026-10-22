// Original music beds, synthesised from scratch (no samples, no borrowed melodies), any length.
// compose(file, mood, seconds, dropAt, variant): soft before `dropAt` (the problem beat), full after
// (the solution), fading out at the end. Moods: 0 Afro-house · 1 marimba · 2 cinematic minimal ·
// 3 lo-fi · 4 Afropop · 5 warm Afro-soul (the Welcome video).
import { writeFileSync } from "node:fs";

const SR = 48000;
const hz = (m) => 440 * 2 ** ((m - 69) / 12);

export function compose(file, mood, LEN, drop, variant = 0) {
  const N = Math.ceil(SR * LEN), L = new Float32Array(N), R = new Float32Array(N);
  let seed = 11 + variant * 97;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
  const add = (start, buf, gain = 1, pan = 0) => {
    const s = Math.floor(start * SR), gl = gain * (1 - Math.max(0, pan)), gr = gain * (1 + Math.min(0, pan));
    for (let i = 0; i < buf.length && s + i < N; i++) if (s + i >= 0) { L[s + i] += buf[i] * gl; R[s + i] += buf[i] * gr; }
  };
  const kick = (len = .35) => { const n = SR * len, b = new Float32Array(n); let ph = 0; for (let i = 0; i < n; i++) { const t = i / SR; ph += 2 * Math.PI * (45 + 110 * Math.exp(-t * 30)) / SR; b[i] = Math.sin(ph) * Math.exp(-t * 9) * 1.1; } return b; };
  const clap = () => { const n = SR * .18, b = new Float32Array(n); let lp = 0; for (let i = 0; i < n; i++) { const t = i / SR, x = rnd(); lp += .35 * (x - lp); b[i] = (x - lp) * Math.exp(-t * 22) * (t < .03 ? (Math.floor(t * 300) % 2 ? .6 : 1) : 1) * .7; } return b; };
  const rim = () => { const n = SR * .05, b = new Float32Array(n); for (let i = 0; i < n; i++) { const t = i / SR; b[i] = (Math.sin(2 * Math.PI * 1700 * t) * .5 + rnd() * .3) * Math.exp(-t * 90); } return b; };
  const hat = () => { const n = SR * .08, b = new Float32Array(n); let p = 0; for (let i = 0; i < n; i++) { const x = rnd(); b[i] = (x - p) * Math.exp(-(i / SR) * 45) * .35; p = x; } return b; };
  const shaker = () => { const n = SR * .07, b = new Float32Array(n); let p = 0; for (let i = 0; i < n; i++) { const t = i / SR, x = rnd(); b[i] = (x - p) * Math.min(1, t * 200) * Math.exp(-t * 55) * .18; p = x; } return b; };
  const tone = (m, len, { wave = "sine", dec = .3, att = .005, harm = 0, cutoff = 0 } = {}) => {
    const n = Math.floor(SR * len), b = new Float32Array(n), f = hz(m); let lp = 0;
    for (let i = 0; i < n; i++) {
      const t = i / SR, p = (t * f) % 1;
      let x = wave === "saw" ? (2 * p - 1) * .6 + (2 * ((t * f * 1.006) % 1) - 1) * .4 : Math.sin(2 * Math.PI * p);
      if (harm) x += harm * Math.sin(2 * Math.PI * ((t * f * 4) % 1)) * Math.exp(-t * 18);
      if (cutoff) { lp += cutoff * (x - lp); x = lp; }
      b[i] = x * (t < att ? t / att : Math.exp(-(t - att) / dec));
    }
    return b;
  };
  const keys = (m, len) => { // soft electric-piano-like note
    const n = Math.floor(SR * len), b = new Float32Array(n), f = hz(m);
    for (let i = 0; i < n; i++) { const t = i / SR; b[i] = (Math.sin(2 * Math.PI * f * t) + .35 * Math.sin(2 * Math.PI * 2 * f * t) * Math.exp(-t * 3) + .15 * Math.sin(2 * Math.PI * 3 * f * t) * Math.exp(-t * 6)) * Math.min(1, t * 80) * Math.exp(-t * 1.6); }
    return b;
  };
  const logDrum = (m) => { const n = SR * .45, b = new Float32Array(n); let ph = 0; const f0 = hz(m); for (let i = 0; i < n; i++) { const t = i / SR; ph += 2 * Math.PI * f0 * (1 + .6 * Math.exp(-t * 40)) / SR; b[i] = Math.tanh(Math.sin(ph) * 1.8) * Math.exp(-t * 7) * .8; } return b; };
  const whoosh = (len = .7) => { const n = SR * len, b = new Float32Array(n); let lp = 0; for (let i = 0; i < n; i++) { const t = i / SR, k = t / len; lp += (.02 + k * .4) * (rnd() - lp); b[i] = lp * Math.sin(Math.PI * k) * 1.2; } return b; };
  const riser = (len = 1.2) => { const n = SR * len, b = new Float32Array(n); for (let i = 0; i < n; i++) { const t = i / SR, k = t / len; b[i] = (rnd() * .25 * k + Math.sin(2 * Math.PI * (300 + 900 * k * k) * t) * .12 * k) * k; } return b; };

  const cfg = [{ bpm: 118, key: 0 }, { bpm: 104, key: 2 }, { bpm: 96, key: -3 }, { bpm: 82, key: 1 }, { bpm: 108, key: -1 }, { bpm: 90, key: -2 }][mood];
  const key = cfg.key + ((variant % 3) - 1); // neighbouring videos in the same mood get a different key
  const chords = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]].map((c) => c.map((m) => m + key));
  const beat = 60 / cfg.bpm, bar = beat * 4, K = kick(), C = clap(), H = hat(), S = shaker(), RIM = rim();
  const pad = (t0, ch, g = .07) => ch.forEach((m, i) => add(t0, tone(m, bar * 1.05, { wave: "saw", att: .3, dec: 2.4, cutoff: .025 }), g, (i - 1) * .45));

  for (let b = 0; b * bar < LEN; b++) {
    const t0 = b * bar, ch = chords[b % 4], full = t0 >= drop - .01;
    if (!full || mood === 2 || mood === 5) pad(t0, ch, full ? .05 : .08); // soft bed before the solution
    for (let q = 0; q < 16; q++) {
      const at = t0 + q * beat / 4; if (at >= LEN) break;
      const on = q % 4 === 0, off = q % 4 === 2;
      if (!full) { if (mood !== 2 && mood !== 5 && q === 0) add(at, K, .45); if (off && mood !== 5) add(at, H, .35, .2); continue; }
      if (mood === 0) { if (on) add(at, K, .9); if (off) add(at, H, .7, .2); add(at, S, 1, -.3); if (q === 4 || q === 12) add(at, C, .55); if ([3, 6, 10, 14].includes(q)) add(at, tone(ch[0] - 24, .25, { dec: .12, harm: .3 }), .5); if (off) add(at, tone(ch[1] + 12, .2, { wave: "saw", dec: .07, cutoff: .2 }), .14, .3); }
      if (mood === 1) { if (q % 2 === 0) add(at, tone(ch[(q / 2) % 3] + 12 + (q % 8 === 6 ? 12 : 0), .45, { dec: .18, harm: .45 }), .32, q % 4 ? .25 : -.25); if (q === 0 || q === 8 || q === 11) add(at, K, .65); if (q % 2) add(at, S, .9); if (q === 4 || q === 12) add(at, C, .35); if (on) add(at, tone(ch[0] - 24, .35, { dec: .2 }), .35); }
      if (mood === 2) { if (q === 0 || q === 6 || q === 8) add(at, K, .85); if (q === 4 || q === 12) add(at, C, .4); if (q % 2 === 0) add(at, H, .45, .2); if (q === 0) add(at, tone(ch[0] - 24, bar * .9, { dec: 1.2, harm: .2 }), .32); if (q % 4 === 2) add(at, tone(ch[(q / 2) % 3] + 24, .3, { dec: .2 }), .08, .4); }
      if (mood === 3) { if (q === 0) pad(t0, ch, .08); if (q === 0 || q === 10) add(at, K, .6); if (q === 4 || q === 12) add(at, C, .25); if (q % 2 === 0) add(at + (q % 4 === 2 ? beat * .08 : 0), H, .3, .25); if (q === 0 || q === 7) add(at, tone(ch[0] - 24, .5, { dec: .35 }), .4); }
      if (mood === 4) { if ([0, 3, 6, 10].includes(q)) add(at, K, .8); if (q === 4 || q === 12) add(at, C, .5); add(at, S, q % 2 ? .6 : 1); if ([2, 7, 11, 14].includes(q)) add(at, logDrum(ch[0] - 12 + (q === 14 ? 7 : 0)), .45); if (q === 2 || q === 10) ch.forEach((m, i) => add(at, tone(m + 12, .25, { wave: "saw", dec: .09, cutoff: .25 }), .07, (i - 1) * .5)); }
      if (mood === 5) { if (q === 0 || q === 10) add(at, K, .55); if (q === 4 || q === 12) add(at, RIM, .5); if (q % 2 === 0) add(at, S, .7, .2); if (q === 0 || q === 6) ch.forEach((m, i) => add(at + i * .02, keys(m + 12, bar * .6), .09, (i - 1) * .4)); if (q === 0 || q === 8) add(at, tone(ch[0] - 24, .6, { dec: .45 }), .38); if (q === 14) add(at, keys(ch[2] + 24, .5), .05, .5); }
    }
  }
  if (drop > 1) { add(drop - 1.2, riser(), .55); add(drop - .6, whoosh(), .45); add(drop, kick(.6), .9); }

  let peak = 0; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  const g = .89 / (peak || 1), fade = SR * 1.8, fin = SR * .05, buf = Buffer.alloc(44 + N * 4);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) {
    const f = Math.min(1, i / fin, (N - i) / fade);
    buf.writeInt16LE(Math.round(Math.tanh(L[i] * g * 1.15) * f * 32000), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.tanh(R[i] * g * 1.15) * f * 32000), 46 + i * 4);
  }
  writeFileSync(file, buf);
}
