# Prostatis video ads

## Sales set (current)

Ten emotional sales ads and the pinned **Welcome to Prostatis** video, in `sales/` (9:16, 1080×1920, voiceover + original music, plus `-music-only` versions). Scripts, on-screen text, visual direction and music notes are in `prostatis-sales-videos.html`; open it in a browser to play any of them.

| # | File | Hook | Audience |
|---|---|---|---|
| 1 | `prostatis-sales-01-in-school.mp4` | Still in school? Learn a skill before you graduate | 15–24 |
| 2 | `prostatis-sales-02-no-high-paid-skill.mp4` | Don't have a high-paying skill yet? | 18–35 |
| 3 | `prostatis-sales-03-after-fast-track.mp4` | What you can do after 14 lessons | 15–40 |
| 4 | `prostatis-sales-04-after-main-track.mp4` | Twenty-six lessons from now | 18–40 |
| 5 | `prostatis-sales-05-waiting-for-a-job.mp4` | Finished school, still waiting for that job? | 21–30 |
| 6 | `prostatis-sales-06-salary-finishes.mp4` | Salary finishes before month end? | 25–40 |
| 7 | `prostatis-sales-07-scroll-to-build.mp4` | You scroll for hours every day | 15–30 |
| 8 | `prostatis-sales-08-ai-is-here.mp4` | AI isn't coming. It's already here | 16–40 |
| 9 | `prostatis-sales-09-the-one-they-call.mp4` | Be the person every business calls | 18–40 |
| 10 | `prostatis-sales-10-spend-or-invest.mp4` | ₦15,000: spend it or invest it? | 15–40 |
| — | `prostatis-welcome.mp4` | Welcome to Prostatis (pin this) | Everyone |

Rebuild after editing the page (needs Node, Chrome, Windows PowerShell):

```bash
cd marketing/ads/render && npm install
node sales.mjs extract && node sales.mjs voice && node sales.mjs plan && node sales.mjs music
node sales.mjs render        # about 5–10 minutes per video; "render 0,3" for some
node sales.mjs mix
```

`plan` times every scene to its voiceover line, so each video's length follows its script.

## First set (five angle tests)

Five 30-second vertical ads (1080×1920, 30 fps) for Reels, TikTok, Shorts and WhatsApp Status.

| File | Angle |
|---|---|
| `prostatis-ad-1-the-skill.mp4` | One skill every business needs |
| `prostatis-ad-2-no-coding.mp4` | No coding background needed |
| `prostatis-ad-3-cost.mp4` | Cost vs expensive bootcamps |
| `prostatis-ad-4-phone.mp4` | Start learning on your phone |
| `prostatis-ad-5-businesses.mp4` | Businesses still need websites |

Each also has a `…-music-only.mp4` version, for recording a real voiceover on top in CapCut or InShot.

- **Voiceover:** a synthetic guide voice (Microsoft George, British English), placed scene by scene. Replace it with a Nigerian voice before running paid ads.
- **Music:** original, composed in code for each ad (`render/music.mjs`), so there are no licensing issues. It ducks under the voice.
- **Captions** are burned in, because most people watch muted.
- **Scripts, on-screen text, visual direction and music notes** are in `prostatis-ads.html`. Open it in a browser to play any ad.

The MP4s are git-ignored (large binaries); keep them in your drive or ad manager.

## Re-rendering after a script change

Needs Node, Google Chrome, and Windows PowerShell for the voice.

```bash
cd marketing/ads/render
npm install
```

1. Edit the lines in `render/vo/lines.json` (and the matching `vo:` text in `prostatis-ads.html`).
2. `powershell -File voice.ps1`: records every line.
3. `node voice-track.mjs`: trims the lines, re-times the scenes to the voice, writes the timings into the page, builds `voice/adN.wav`.
4. `node render.mjs ../prostatis-ads.html silent`: renders the silent videos (about 5 minutes per ad). Add `0,2` to render only ads 1 and 3.
5. `node music.mjs`: composes the music beds (the beat drops where each ad's solution scene starts).
6. `node mix.mjs ..`: writes the final and music-only MP4s into `marketing/ads/`.

`node stills.mjs ../prostatis-ads.html 0 2.9 17 25` saves still frames of ad 1 for a quick visual check.
