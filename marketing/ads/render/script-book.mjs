// Builds marketing/ads/Prostatis-Video-Scripts.pdf: every video script (taken straight from the two
// video pages, so it always matches the videos) plus the storytelling scripts below.
// Usage: node script-book.mjs
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import puppeteer from "puppeteer-core";

const here = path.dirname(fileURLToPath(import.meta.url));
const ADS_PAGE = path.join(here, "..", "prostatis-ads.html");
const SALES_PAGE = path.join(here, "..", "prostatis-sales-videos.html");
const OUT = path.join(here, "..", "Prostatis-Video-Scripts.pdf");

const STORIES = [
  { title: "The ₦0 night", length: "about 45s", audience: "18–30 · graduates and job-seekers", pick: true,
    why: "The ₦0 alert shocks; “the night he made his decision” is an open loop. The sister's transport money lands emotionally. It never states earnings: the proof is a second request.",
    music: "Silence and room tone at first; one low piano note on the alert. Warm Afro-soul enters at the turn.",
    beats: [
      ["Hook", "0–3s", "This was Tobi's balance the night he made his decision.", "Phone at night: bank alert “Balance: ₦0.00”.", "Dramatisation tag top-left. No music, just a phone buzz."],
      ["Open loop", "3–6s", "Not the night he lost money. The night he stopped waiting for it.", "Close on his face lit by the screen.", "The viewer now needs to know what he decided."],
      ["Stakes", "6–15s", "Graduated two years ago. Twelve CVs. Zero replies. And his younger sister asking for transport money, again.", "“Tomorrow” typed in a chat, deleted, typed again.", "Specific numbers make it real."],
      ["Mini reveal", "15–22s", "Walking home, he passed the tailor's shop he'd passed a hundred times. This time he heard her: “How do people even find me online?”", "Bisi turning a customer away at her shop in Yaba.", "The everyday problem everyone else walks past."],
      ["The turn (product)", "22–32s", "He didn't need a job offer. He needed a skill that shop needed.", "Prostatis lesson screen “Lesson 1: Design direction & brand kit”, then a website for Stitches by Bisi building on his laptop.", "First time the brand appears, around 70% in."],
      ["Payoff", "32–40s", "Fourteen lessons later, he wasn't waiting anymore.", "He shows Bisi the live site on his phone. Her face.", "Show the change, not money."],
      ["Loop close + CTA", "40–45s", "Same phone. Different night. Learn a skill businesses pay for, at prostatis dot com.", "Phone at night again, now a WhatsApp message: “Can you do my friend's salon too?” End card: prostatis.com.", "Callback to the first shot."],
    ] },
  { title: "Everyone laughed at the laptop", length: "about 40s", audience: "15–25 · students",
    why: "Social doubt then vindication: a powerful feeling for students. The opening promise (“one of them asked me to teach him”) pays off at the end.",
    music: "Lo-fi Afrobeats; drops out during the doubt montage, returns full at the turn.",
    beats: [
      ["Hook", "0–3s", "My roommates laughed when they saw what I was doing with this.", "A cheap second-hand laptop on a hostel bed.", "Dramatisation tag."],
      ["Open loop", "3–6s", "Three months later, one of them asked me to teach him.", "Her smiling at the laptop.", "Why did they change their minds?"],
      ["Stakes", "6–16s", "Late nights during exams. “You're wasting your time.” “Read your books.”", "Doubt montage: fan noise, a power cut, charging at a friend's place.", "Real student struggles."],
      ["Mini reveal", "16–24s", "Then his uncle needed something I had just learned to build.", "The roommate's uncle's restaurant: no way to take orders online.", ""],
      ["The turn (product)", "24–32s", "I'd been doing one Prostatis lesson at a time. Between lectures. At my own pace.", "Lesson path filling; “Lesson 9: Online stores & Paystack checkout”; the restaurant's ordering page goes live.", "Brand appears here."],
      ["Loop close + CTA", "32–40s", "They stopped laughing. They started asking. Start before you graduate, at prostatis dot com.", "The same roommates crowd around the laptop: “Abeg, show me how.” End card.", ""],
    ] },
  { title: "The message I almost ignored", length: "about 35s", audience: "25–40 · workers",
    why: "A tiny everyday moment (leaving a message on “seen”) becomes the turning point. Relatable for anyone with a 9-to-5.",
    music: "Soft keys and a WhatsApp ping; groove builds from the turn.",
    beats: [
      ["Hook", "0–3s", "I almost left this message on “seen”.", "A WhatsApp notification pops up.", "Dramatisation tag."],
      ["Open loop", "3–6s", "If I had, I'd still be counting days to month end.", "Calendar with red circles.", ""],
      ["Stakes", "6–14s", "Nine to five. Salary gone by the twentieth. Then an old school friend: “You still do computer things? My shop needs a website.”", "The message on screen.", ""],
      ["Tension", "14–20s", "I didn't know how. But I didn't want to say no again.", "Thumb hovering over the keyboard.", ""],
      ["The turn (product)", "20–28s", "So I learned. Evenings with Prostatis: a short lesson, a task, a quiz, every night.", "Streak counter climbing; “Lesson 4: Build the full business website ✓”.", "Brand appears here."],
      ["Loop close + CTA", "28–35s", "This time, I didn't leave it on seen. Build your side skill, at prostatis dot com.", "He replies “Yes. Send me your logo” with the site link. End card.", "Callback to the first line."],
    ] },
];

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clean = (s) => esc(String(s).replace(/A I/g, "AI").replace(/U S S D/g, "USSD"));

const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const page = await browser.newPage();
await page.goto(pathToFileURL(ADS_PAGE).href, { waitUntil: "networkidle0" });
const first = await page.evaluate(() => ADS.map((a) => ({ name: a.name, angle: a.angle, music: a.music, beats: a.beats.map((b) => ({ label: b.label, t: b.t, vo: b.vo, ost: b.ost, vis: b.vis })) })));
await page.goto(pathToFileURL(SALES_PAGE).href, { waitUntil: "networkidle0" });
const sales = await page.evaluate(() => VIDEOS.map((v, i) => ({ name: v.name, hook: v.hook, audience: v.audience, music: v.music, welcome: !!v.welcome, total: timesFor(i).total, beats: v.beats.map((b, j) => ({ label: b.label, t: timesFor(i).beats[j], vo: b.vo, ost: b.ost, vis: b.vis })) })));

const welcome = sales.find((v) => v.welcome), ads10 = sales.filter((v) => !v.welcome);
const secs = (t) => `${t[0].toFixed(1)}–${t[1].toFixed(1)}s`;
const table = (beats) => `<table><thead><tr><th>Beat</th><th>Time</th><th>Voiceover</th><th>On screen</th><th>Visual</th></tr></thead><tbody>${beats.map((b) => `<tr><td class="lbl">${esc(b.label)}</td><td class="tm">${secs(b.t)}</td><td class="vo">${clean(b.vo)}</td><td>${esc(b.ost)}</td><td class="vis">${esc(b.vis)}</td></tr>`).join("")}</tbody></table>`;
const video = (num, v, meta) => `<section class="video"><h3><span class="num">${num}</span>${esc(v.name)}</h3><p class="meta">${meta}</p>${table(v.beats)}</section>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><title>Prostatis Video Scripts</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,600..800&family=Geist:wght@400;500;600;700&display=swap">
<style>
@page { size: A4; margin: 16mm 14mm 18mm; }
:root { --ink:#151515; --muted:#5f5b53; --line:#e6e1d8; --brand:#eb5e28; --brandText:#b8400f; --wash:#fdeee6; --sunk:#f3f0ea; --green:#16794a; --greenWash:#e3f5e9; }
* { box-sizing: border-box; }
body { font-family: "Geist", system-ui, sans-serif; color: var(--ink); font-size: 9.6pt; line-height: 1.45; margin: 0; }
h1, h2, h3 { font-family: "Archivo", "Arial Narrow", sans-serif; font-stretch: 110%; letter-spacing: -0.02em; margin: 0; }
.cover { height: 255mm; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always; }
.cover .band { background: var(--brand); border: 2px solid var(--ink); border-radius: 16px; box-shadow: 6px 6px 0 var(--ink); padding: 18mm 14mm; }
.cover h1 { font-size: 34pt; line-height: 1.02; }
.cover .sub { font-size: 12pt; margin-top: 6mm; max-width: 140mm; }
.toc { border: 2px solid var(--ink); border-radius: 14px; padding: 8mm 10mm; }
.toc h2 { font-size: 13pt; margin-bottom: 3mm; }
.toc ol { margin: 0; padding-left: 5mm; columns: 2; column-gap: 10mm; font-size: 10pt; }
.rules { font-size: 9pt; color: var(--muted); }
.part { page-break-before: always; }
.part > h2 { font-size: 20pt; border-bottom: 3px solid var(--brand); padding-bottom: 2mm; margin-bottom: 2mm; }
.part > p.lead { color: var(--muted); margin: 0 0 5mm; max-width: 170mm; }
.video { page-break-inside: avoid; margin-bottom: 7mm; }
.video h3 { font-size: 13pt; display: flex; align-items: center; gap: 3mm; margin-bottom: 1mm; }
.num { display: inline-grid; place-items: center; min-width: 8mm; height: 8mm; padding: 0 2mm; border-radius: 99px; background: var(--wash); color: var(--brandText); font-family: "Geist", sans-serif; font-size: 9pt; font-weight: 700; border: 1.5px solid var(--ink); }
.meta { margin: 0 0 2.5mm; color: var(--muted); font-size: 8.8pt; }
.meta b { color: var(--ink); }
table { width: 100%; border-collapse: collapse; font-size: 8.7pt; }
th { text-align: left; font-size: 7.4pt; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); border-bottom: 1.5px solid var(--ink); padding: 1.6mm 2mm; }
td { vertical-align: top; padding: 2mm; border-bottom: 1px solid var(--line); }
td.lbl { font-weight: 700; width: 18mm; }
td.tm { white-space: nowrap; color: var(--muted); width: 17mm; font-variant-numeric: tabular-nums; }
td.vo { font-weight: 600; width: 52mm; }
td.vis { color: var(--muted); }
.why { background: var(--greenWash); border-radius: 10px; padding: 3mm 4mm; margin: 0 0 3mm; font-size: 9pt; }
.pick { display: inline-block; background: var(--brand); color: var(--ink); border-radius: 99px; padding: .6mm 3mm; font-size: 8pt; font-weight: 700; margin-left: 2mm; }
.box { border: 1.5px solid var(--ink); border-radius: 12px; padding: 4mm 5mm; margin-bottom: 5mm; page-break-inside: avoid; }
.box h3 { font-size: 11.5pt; margin-bottom: 2mm; }
.box ul, .box ol { margin: 0; padding-left: 5mm; }
</style></head><body>

<section class="cover">
  <div class="band"><h1>Prostatis<br>Video Scripts</h1><p class="sub">Every script behind the Prostatis video ads, the pinned Welcome video, and three storytelling scripts. Voiceover, on-screen text, visual direction and timing for each scene.</p></div>
  <div class="toc"><h2>Contents</h2><ol>
    <li>Welcome to Prostatis (pin this)</li><li>Sales ads 1–10</li><li>First set: five angle tests</li><li>Storytelling scripts (3)</li><li>Rules every script follows</li></ol></div>
  <p class="rules">Prostatis by Stynark · prostatis.com · Fast Track: 14 lessons, ₦15,000 · Main Track: 26 lessons, ₦30,000 · pay once, self-paced, lifetime access.</p>
</section>

<section class="part"><h2>Welcome to Prostatis</h2><p class="lead">Pin this on every social profile. Warm, unhurried, and honest about what Prostatis is. Length ${welcome.total.toFixed(0)}s.</p>
${video("W", welcome, `<b>Audience:</b> ${esc(welcome.audience)} · <b>Music:</b> ${esc(welcome.music)}`)}</section>

<section class="part"><h2>Sales ads 1–10</h2><p class="lead">Emotional hooks for Nigerians aged 15–40. Each follows hook → struggle → Prostatis → proof → call to action, timed to its voiceover line (25–33s).</p>
${ads10.map((v, i) => video(i + 1, v, `<b>Hook:</b> ${esc(v.hook)} · <b>Audience:</b> ${esc(v.audience)} · <b>Music:</b> ${esc(v.music)} · <b>Length:</b> ${v.total.toFixed(0)}s`)).join("")}</section>

<section class="part"><h2>First set: five angle tests</h2><p class="lead">The first five 30-second ads, each testing one angle.</p>
${first.map((v, i) => video(i + 1, v, `<b>Angle:</b> ${esc(v.angle)} · <b>Music:</b> ${esc(v.music)}`)).join("")}</section>

<section class="part"><h2>Storytelling scripts</h2><p class="lead">Story-first ads that hold viewers past the first five seconds and only introduce Prostatis at the turn, about 70% through. These are dramatisations: show a small “Dramatisation” tag, because we don't yet have real student stories.</p>
<div class="box"><h3>How they hold attention</h3><ol>
<li><b>0–2s:</b> a line that doesn't make sense yet, so the brain stays to resolve it.</li>
<li><b>2–5s:</b> a specific detail and an unanswered question (an open loop).</li>
<li><b>Middle:</b> rising stakes with a small reveal every 5–7 seconds.</li>
<li><b>About 70%:</b> the turn. Prostatis appears as what made the change possible, not as an advert.</li>
<li><b>End:</b> the opening line comes back (callback), then the call to action.</li></ol>
<p style="margin:2mm 0 0">Keep the brand out until the turn, use specific details (“12 CVs”, “transport money”), let sound carry emotion, and show change, never naira amounts.</p></div>
${STORIES.map((s, i) => `<section class="video"><h3><span class="num">S${i + 1}</span>${esc(s.title)}${s.pick ? `<span class="pick">Recommended</span>` : ""}</h3><p class="meta"><b>Length:</b> ${s.length} · <b>Audience:</b> ${esc(s.audience)} · <b>Music:</b> ${esc(s.music)}</p><p class="why"><b>Why it works:</b> ${esc(s.why)}</p><table><thead><tr><th>Beat</th><th>Time</th><th>Voiceover</th><th>Visual</th><th>Note</th></tr></thead><tbody>${s.beats.map((b) => `<tr><td class="lbl">${esc(b[0])}</td><td class="tm">${esc(b[1])}</td><td class="vo">${esc(b[2])}</td><td>${esc(b[3])}</td><td class="vis">${esc(b[4])}</td></tr>`).join("")}</tbody></table></section>`).join("")}
</section>

<section class="part"><h2>Rules every script follows</h2>
<div class="box"><ul>
<li>Never promise income. Say “learn a skill businesses pay for”, not “make ₦X”. No “passive income”: client work is active; the Main Track teaches monthly retainer packages, which are recurring.</li>
<li>No invented testimonials, member counts, results, statistics or competitor prices.</li>
<li>Stories are dramatisations and say so on screen. The practice client, Stitches by Bisi in Yaba, is illustrative.</li>
<li>Phone-angle videos say building happens on a laptop or desktop: the course needs one.</li>
<li>Facts in every script match the live course: 14 and 26 lessons, ₦15,000 and ₦30,000, pay once, self-paced, lifetime access, task + quiz every lesson, verified certificate, WhatsApp community, 56 free tools, 7-day refund window.</li>
<li>Every video ends on prostatis.com. Make sure that address points to the live site before running ads.</li>
<li>Record the final voiceover with a warm Nigerian voice; each rendered video has a music-only version for this.</li>
</ul></div></section>
</body></html>`;

const doc = await browser.newPage();
await doc.setContent(html, { waitUntil: "load", timeout: 90000 });
await doc.evaluate(() => document.fonts.ready);
await doc.pdf({ path: OUT, format: "A4", printBackground: true, displayHeaderFooter: true, headerTemplate: "<span></span>",
  footerTemplate: `<div style="width:100%;font-size:7.5pt;color:#5f5b53;padding:0 14mm;display:flex;justify-content:space-between;font-family:sans-serif"><span>Prostatis Video Scripts · Prostatis by Stynark</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
  margin: { top: "16mm", bottom: "18mm", left: "14mm", right: "14mm" } });
await browser.close();
console.log(OUT);
