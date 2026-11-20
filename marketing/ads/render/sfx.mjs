// Original sound effects, synthesised from scratch (no samples): riser, whoosh, air, tick, pop,
// hit, shimmer, swell. renderSfx(file, events, seconds) places [time, type, param] events and
// writes a 48 kHz stereo WAV with a little reverb. param = length (riser, swell, shimmer) or gain.
import { writeFileSync } from "node:fs";

const SR = 48000;

export function renderSfx(file, events, LEN) {
  const N = Math.ceil(SR * LEN), L = new Float32Array(N), R = new Float32Array(N);
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
  const put = (t0, len, fn, gain = 1, pan = 0) => {
    const s = Math.floor(t0 * SR), n = Math.floor(len * SR);
    const gl = gain * (1 - Math.max(0, pan)), gr = gain * (1 + Math.min(0, pan));
    for (let i = 0; i < n && s + i < N; i++) {
      if (s + i < 0) continue;
      const v = fn(i / SR, i / n);
      if (Array.isArray(v)) { L[s + i] += v[0] * gl; R[s + i] += v[1] * gr; } else { L[s + i] += v * gl; R[s + i] += v * gr; }
    }
  };
  const lowpass = () => { let y = 0; return (x, k) => (y += k * (x - y)); };

  const fx = {
    // Noise and a sine sweep rising together, ending in a clean cut.
    riser(t0, len = 2) {
      const lp = lowpass(); let ph = 0;
      put(t0, len, (t, k) => { ph += (2 * Math.PI * (180 + 1400 * k * k)) / SR; const env = Math.pow(k, 2.2) * Math.min(1, (1 - k) * 40); return (lp(rnd(), 0.02 + k * 0.5) * 0.9 + Math.sin(ph) * 0.18) * env; }, 0.55);
    },
    // A filtered-noise pass from left to right.
    whoosh(t0) {
      const lp = lowpass(), len = 0.75;
      put(t0, len, (t, k) => { const env = Math.sin(Math.PI * k) ** 2; const v = lp(rnd(), 0.03 + Math.sin(Math.PI * k) * 0.35) * env * 1.3; return [v * (1 - k), v * k]; }, 0.8);
    },
    // A soft breath of air on a scene change.
    air(t0) {
      const lp = lowpass(), len = 1.3;
      put(t0, len, (t, k) => lp(rnd(), 0.06) * Math.sin(Math.PI * k) * 0.6, 0.35);
    },
    // A short bright click.
    tick(t0, g = 1) {
      put(t0, 0.04, (t) => (Math.sin(2 * Math.PI * 2600 * t) * 0.6 + rnd() * 0.25) * Math.exp(-t * 160), 0.5 * g, (rnd() * 0.4));
    },
    // A round pop with a quick pitch drop.
    pop(t0) {
      let ph = 0;
      put(t0, 0.14, (t) => { ph += (2 * Math.PI * (300 + 700 * Math.exp(-t * 45))) / SR; return Math.sin(ph) * Math.exp(-t * 32) * Math.min(1, t * 900); }, 0.55, rnd() * 0.5);
    },
    // Sub boom with a transient: the big moments.
    hit(t0, g = 1) {
      let ph = 0; const lp = lowpass();
      put(t0, 1.6, (t) => { ph += (2 * Math.PI * (45 + 60 * Math.exp(-t * 9))) / SR; return Math.tanh(Math.sin(ph) * 1.6) * Math.exp(-t * 2.6) * 0.9 + lp(rnd(), 0.25) * Math.exp(-t * 30) * 0.7; }, 0.9 * g);
    },
    // Bell-like high chord with a gentle tremolo.
    shimmer(t0, len = 1.3) {
      const fr = [1568, 2093, 2637, 3136];
      put(t0, len, (t, k) => { const env = Math.min(1, t * 12) * Math.pow(1 - k, 1.6); let v = 0; fr.forEach((f, i) => (v += Math.sin(2 * Math.PI * f * t + i) * (0.6 - i * 0.1))); const trem = 0.75 + 0.25 * Math.sin(2 * Math.PI * 7 * t); return [v * env * trem, v * env * (1.5 - trem)]; }, 0.12);
    },
    // A long rising swell (noise + pad) that resolves into the next hit.
    swell(t0, len = 3) {
      const lp = lowpass();
      put(t0, len, (t, k) => { const env = Math.pow(k, 1.8) * Math.min(1, (1 - k) * 25); const pad = Math.sin(2 * Math.PI * 220 * t) * 0.3 + Math.sin(2 * Math.PI * 330 * t) * 0.2 + Math.sin(2 * Math.PI * 440 * t) * 0.12; return (lp(rnd(), 0.015 + k * 0.2) * 0.8 + pad) * env; }, 0.45);
    },
  };
  for (const [t, type, p] of events) fx[type]?.(t, p);

  // Small room: four feedback combs per side, mixed in quietly.
  const combs = [1557, 1617, 1491, 1422];
  const wet = (src, off) => {
    const out = new Float32Array(N);
    for (const d0 of combs) { const d = d0 + off, buf = new Float32Array(d); let j = 0; for (let i = 0; i < N; i++) { const y = buf[j]; buf[j] = src[i] + y * 0.78; out[i] += y * 0.18; j = (j + 1) % d; } }
    return out;
  };
  const wl = wet(L, 0), wr = wet(R, 23);
  let peak = 0;
  for (let i = 0; i < N; i++) { L[i] += wl[i]; R[i] += wr[i]; peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i])); }
  const g = 0.9 / (peak || 1);
  const buf = Buffer.alloc(44 + N * 4);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) {
    buf.writeInt16LE(Math.round(Math.tanh(L[i] * g) * 32000), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.tanh(R[i] * g) * 32000), 46 + i * 4);
  }
  writeFileSync(file, buf);
}
