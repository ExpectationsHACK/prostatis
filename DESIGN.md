# Design

Direction set by the owner (2026-10-01): **bold and crafted, never cheap.** Warm off-white pages, white cards drawn with a crisp ink outline and a hard offset shadow, near-black text, and **one orange accent** (#eb5e28) for the main action. The hero is the calm, minimal exception. **Websites and web development lead** every page, and the work itself (animated website mock-ups) carries the energy.

## Colour (`src/app/globals.css`, light only)

| Token | Value | Use |
|---|---|---|
| `paper` | #faf8f4 | Page background |
| `card` | #ffffff | Cards, the certificate |
| `sunk` / `wash` | #f3f0ea / #ece7de | Alternate sections, image wells, hover fills |
| `ink` / `edge` / `night` | #151515 | Text, card outlines and shadows, the dark bands |
| `muted` | #5f5b53 | Secondary text (6.4:1 on paper) |
| `line` | #e6e1d8 | Hairline dividers |
| `brand` | #eb5e28 | **The accent.** Primary buttons, the footer, the Fast Track highlight. Text on it is ink (5.4:1) |
| `brand-text` | #b8400f | Orange text on light backgrounds (5.6:1) |
| `brand-wash` | #fdeee6 | Soft orange tint for ticks, chips, the highlighted table column |
| `success` / `danger` | #16794a / #b42318 | Status only |

Section rhythm: paper and `sunk` alternate, with ink hairlines between; two dark bands (the Main Track section and the final call to action card); the orange footer.

## Type

- **Headlines:** `.display`, Archivo (wide, weight 600, tight tracking).
- **Everything you read:** Geist, 15–17px (lessons 16–17px at line-height 1.75).
- **Eyebrows:** `.label`, small capitals with a little tracking. Use sparingly.
- **Code only:** Geist Mono (`pre`, `code`, `kbd`, and the `font-code` utility). `font-mono` maps to Geist so older markup reads as normal text. The navbar keeps its mono capitals on purpose.

## Surfaces

- `.ink-block`: 2px ink outline, 16px radius, 4px hard offset shadow, clips its content. `.block-press` lifts on hover and presses in on click. On the dark band, cards get an orange shadow instead.
- Buttons (`src/components/ui.ts`): `btn.primary` orange, `btn.secondary` white, `btn.accent` near-black; all with the ink outline and a small hard shadow; `btn.ghost` for quiet links. 12px radius, sentence case.
- `.scribble`: an orange hand-drawn underline under one word in a heading.

## Brand

- The mark: an isometric box drawn as one unbroken line that reads as an "S" (for Stynark), with two dashes on the front face. Transparent background, ink line (it takes the text colour, so it can go white on dark panels). Geometry lives in one place, `src/lib/logo.ts`, used by `LogoMark` (`src/components/brand.tsx`), `Mark` (`src/lib/og-mark.tsx`: share images, certificates, Apple icon) and `scripts/brand-assets.mjs`, which regenerates `public/brand/*` (SVG + transparent PNGs), the adaptive `src/app/icon.svg` favicon (white on dark tabs) and `src/app/favicon.ico`.
- The wordmark: **Prostatis** in Archivo (`Wordmark`); the company line "by Stynark" sits under it in the footer and on share images and certificates.

## Illustrations: every thumbnail is animated

All art is coded, drawn on a fixed 320×200 `Artboard` scaled to the card, and **plays only while on screen** (`.is-live`) and **never under reduced motion** (the base styles are the finished frame).

- **Motion kit** (`components/art/kit.tsx` + "Thumbnail motion kit" in `globals.css`): building blocks (`in`, `pop`, `type`, `grow-x/y`, `press`, `mark`, `cursor`, `stamp`, `needle`, `draw`, `swap`, `scan`…). Each thumbnail sets its loop length on `Stage` and gives each element a start time with `at(seconds)`, so every thumbnail tells its own story.
- `LiveSite` (`live-site.tsx`): six realistic website mock-ups (landing page, business site, store, web app, booking, portfolio) with hand-timed stories. Keyframes under "Live site mock-ups".
- `ToolThumb` (`tool-thumb.tsx`): all 56 free tools, each producing its real result (swatches appear, a gauge sweeps, domains are checked, an invoice is stamped PAID).
- `ProductThumb` (`product-thumb.tsx`): the 13 example products used in lessons and the course map, each acting out what it does for the business.
- `StepArt` (`step-art.tsx`): the four "How it works" scenes.
- `LessonDiagram`: static teaching diagrams inside lessons.
- **Lesson sketches** (`sketch.tsx`, `sketch-glyphs.tsx`): hand-drawn style teaching pictures on exercise-book paper (ruled lines, orange margin). About 75 everyday glyphs (danfo, POS machine, tailor's tape, prepaid meter…) drawn as line art and roughened by one shared SVG filter, labelled in the Caveat handwriting face (loaded only where sketches appear). Layouts: `flow` (2–4 things joined by arrows, stacked with downward arrows on phones), `stack` (a phone or laptop wireframe) and `versus` (before/after). One `hot` item gets an orange marker circle. Static, so nothing to pause.

## Page patterns

- **Navbar**: the floating pill (ink outline, hard shadow) with What's inside · Tracks · Free tools · Who it's for · Pricing · Blog, then Sign in and Enroll Now. Full-screen sheet on phones.
- **Hero (minimal)**: off-white with one soft orange glow; pill eyebrow; headline with "websites" and "income" in orange; Enroll Now + Start Learning; three facts; a fanned stack of three animated website mock-ups.
- **Homepage**: hero → websites businesses pay for (six LiveSites) → how it works (four illustrated cards) → the Fast Track and the Main Track (each: structured `PlanCard` beside the `CurriculumExplorer`) → who it's for → six free tools → Fast Track vs Main Track table → FAQ → dark call-to-action card → orange footer.
- **`PlanCard`** (`components/plan-card.tsx`): header band (orange for the Fast Track), price, three key facts (length, lessons, access), what you'll walk away with, what's included, one button and the payment small print. Used on the homepage and `/pricing`.
- **`CurriculumExplorer`** (`components/curriculum-explorer.tsx`): week tabs, the days of the week, and a preview of the selected day with its animated thumbnail and outcomes. Tours the days on its own until the visitor clicks; never under reduced motion.
- **Footer**: orange, three columns (brand, blurb, Enroll Now and email signup · Learn · Company and legal).
- **Legal**: `/privacy`, `/terms`, `/refund-policy` share `components/legal.tsx`; contact from `NEXT_PUBLIC_CONTACT_EMAIL`.

## The admin (`/admin`)

The admin keeps its dashboard structure (sidebar with groups, top bar, stat cards, tables, pagination) in the site's brand, scoped under `.admin-ui` in `globals.css`: warm off-white, the orange accent (`--a-accent`) with ink text on it, ink-outlined cards with a hard shadow, Archivo page titles, the spark logo with an "Admin" tag. Orange as small text uses `--a-accent-text`. Components in `src/components/admin/blocks.tsx`.

## Forms

Lesson extras: orange **Milestone** cards (`win`) at real accomplishments, blue **Optional upgrade** callouts, dashed **Coming later** notes, red **If you see this on screen** error explainers, and the **builder** box: three tabs (Antigravity · free · default, Claude Code · paid, Free chat · backup) whose choice is remembered across lessons.

Fields are light: a hairline border at rest; on focus the border fades and a soft orange glow shows (no outline). Password fields have a show/hide button. Sign-in, sign-up and password pages pair the form with an orange panel and an animated scene (`components/art/auth-art.tsx`).

## Rules

- Never invent wins, member counts, press logos or team members. Proof sections stay off the site until the content is real.
- Orange text uses `brand-text`; text on orange is ink.
- One orange button per view where possible.
- Everything that moves respects `prefers-reduced-motion`, and animated art pauses off screen.
- No horizontal page scroll at 360px; tap targets ≥ 44px; body text ≥ 16px in lessons.
