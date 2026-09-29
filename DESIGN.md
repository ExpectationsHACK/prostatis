# Design

Direction set by the owner (2026-09-29): a **retro print / neo-brutalist** club site — cream grid paper, orange fields, Naija green, ink outlines, hard offset shadows, typewriter text. It's a style genre implemented our own way: our layouts, copy, numbers and components. Nothing is copied from another site's code, text, images or logos. **Websites and web development lead** every page.

## Colour (`src/app/globals.css` — light only, it's a printed-paper world)

| Token | Value | Use |
|---|---|---|
| `paper` | #f6efe2 | Page background (with `.paper-grid`) |
| `card` | #fffdf8 | Cards, blocks, the certificate |
| `sunk` / `wash` | #efe5d3 / #e9dcc5 | Alternate sections, chips, table stripes |
| `ink` / `edge` / `night` | #1b1714 | Text, 2px outlines, dark bands |
| `muted` | #5c5249 | Secondary text (7:1 on paper) |
| `line` | #d8caaf | Hairlines, dashed dividers |
| `brand` | #ff6719 | Orange fields and primary buttons — **ink text on orange** |
| `brand-text` | #b8430a | Orange text on paper |
| `accent` | #0f4d3a | Naija green: second field colour, accent buttons |
| `success` / `danger` | #1f7a4d / #b3261e | Passed/complete, errors and wrong answers |

## Type

- **Display** (`.display`): Archivo, wide, weight 600, tight tracking, sentence case. Headlines, card titles, big numbers.
- **Labels** (`.label`): Geist Mono, 11px caps, 0.16em tracking.
- **Marketing body**: Geist Mono. **Lesson reading text**: Geist sans at 16–17px, line-height 1.75, for long-form comfort.

## Surfaces and signatures

- `.ink-block`: 2px ink border + 5px hard offset shadow. `.block-press` presses it in on hover/click. (Never name a class `.block` — it collides with Tailwind's `block`.)
- `.paper-grid` / `.field-grid`: the grid-paper texture on cream and on coloured fields.
- `.scribble`: green hand-drawn underline under one word in a heading.
- Buttons (`src/components/ui.ts`): `btn.primary` orange, `btn.secondary` card, `btn.accent` green, `btn.ghost`. Square, mono, caps.

## Illustrations

All art is **coded**, not images: drawn on a fixed 320×200 canvas (`src/components/art/artboard.tsx`) and scaled to the card, so a phone shows exactly the desktop picture.

- `ToolThumb` — each free tool's real output (56 designs).
- `ProductThumb` — 37 recognisable example products (store, salon, clinic, dashboard…).
- `WebsiteKindThumb` — the six website kinds in "Websites first", with orange callout tags naming the parts that matter.
- `LessonThumb` — a track day's thumbnail (tool or product).
- `LessonDiagram` — 12 teaching diagrams (web stack, prompt anatomy, page anatomy, SERP, git flow, funnel, trigger→action, agent loop, delivery timeline, payment flow, keyword intent, booking flow).

## Page patterns

- **Header**: floating rounded pill (`site-nav.tsx`) with dropdowns (Tracks, Free tools, Who it's for), and a full-screen mobile sheet. Closes on outside click, Escape and navigation.
- **Hero**: orange grid field; four rows of topic chips drift in alternating directions behind the headline — full height on desktop, a centred band 50% of the screen tall on phones. Product-thumbnail collage on the right.
- **Track sections**: one row per week, each an auto-advancing carousel (`WeekCarousel`) with back/forward arrows; pauses on hover, focus, touch or off-screen; never auto-moves under reduced motion. Fast Track = 2 rows, Main Track = 4.
- **What you'll build**: two marquee rows — top slides left, bottom slides right.
- **Ledger**: before/after printed table; before struck through, after with a green check.
- **Plans**: dark band, two cards listing concrete results; the Main Track card is the orange highlight.
- **Placeholders** (wins, team): dashed outline + "Placeholder" stamp until real content exists (`src/lib/showcase.ts`).
- **Footer**: dark band with the email signup box.

## The learning area (`/learn`)

- Slim sticky paper header with an orange "LEARN" stamp.
- Stats row: three ink cards — XP + level bar, streak, lessons done bar.
- Lesson page: orange "By the end of today you'll have" block; 3-step checklist strip (read → task → quiz); table of contents; sections with numbered steps, dark **prompt cards** with a copy button, tip (yellow) and watch-out (pink) callouts, striped tables, figures with "Fig." captions, and tool cards linking to the free tools.
- Quiz: bordered question cards; green/red states after marking; result panel with XP and streak chips.
- Locked days: faded card with a lock over the thumbnail.
- Certificate: double ink frame on grid paper, printable (`print:` variants hide chrome).

## Rules

- Never invent wins, member counts, press logos or team members.
- Orange as text uses `brand-text`; text on orange is ink.
- Everything moving (marquees, carousels, pressed shadows) respects `prefers-reduced-motion`.
- No horizontal page scroll at 360px; tap targets ≥ 44px; body text ≥ 16px in lessons.
