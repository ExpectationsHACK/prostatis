# Design

Direction set by the owner (2026-10-01): **STEINARK is calm, neutral and precise.** Warm off-white pages, white cards, near-black text, hairline borders, and **one orange accent** reserved for the main action. Minimal, but not cold: the work itself (animated website mock-ups) carries the energy. **Websites and web development lead** every page.

The brand name suggests stone and an arch: solid, trustworthy, an opening you build through. The logo is a stone arch with its keystone.

## Colour (`src/app/globals.css`, light only)

| Token | Value | Use |
|---|---|---|
| `paper` | #fafaf8 | Page background |
| `card` | #ffffff | Cards, alternate sections, header and footer |
| `sunk` / `wash` | #f4f3ef / #efede8 | Hover fills, table heads, image wells |
| `ink` / `night` | #151515 | Text; the one dark band (final call to action) |
| `muted` | #625f58 | Secondary text (6.3:1 on paper) |
| `line` / `edge` | #e7e5e0 / #dcd9d2 | Hairlines; stronger borders and outlines inside illustrations |
| `brand` | #eb5e28 | **The accent.** Primary buttons, key highlights. Text on it is ink (5.4:1) |
| `brand-text` | #b8400f | Orange text on light backgrounds (5.6:1) |
| `brand-wash` | #fdeee6 | Soft orange tint for numbered steps and ticks |
| `success` / `danger` | #16794a / #b42318 | Status only |

Rules: at most one orange button per view; no coloured section backgrounds (paper and white alternate, plus one dark band); illustration grounds use the quiet `tones` in `components/cover.tsx`.

## Type

- **One family: Geist.** Headlines use `.display` (Geist 600, tight tracking); body 15–17px; lessons 16–17px at line-height 1.75.
- `.label` is sentence case, 12.5px, medium. No letter-spaced capitals in the UI.
- **Code only** uses Geist Mono: `pre`, `code`, `kbd` and the `font-code` utility. (`font-mono` now maps to Geist so older markup reads as normal text.)

## Surfaces

- `.ink-block`: 1px `line` border, 14px radius, barely-there shadow, clips its content. `.block-press` lifts 1px with a soft shadow on hover.
- Buttons (`src/components/ui.ts`): `btn.primary` orange with ink text, `btn.secondary` white with a hairline, `btn.accent` near-black, `btn.ghost`. 10px radius, sentence case, semibold.
- `.paper-grid`, `.field-grid` and `.scribble` are kept as no-ops so old markup stays calm. No tilts, no hard offset shadows, no grid-paper texture.

## Brand

- `ArchMark`, `LogoTile` and `Wordmark` in `src/components/brand.tsx`; the same arch as plain SVG in `src/lib/og-mark.tsx` for icons, share images and certificates.
- Wordmark: STEINARK in capitals, Geist semibold, 0.12em tracking. The only letter-spaced capitals on the site.

## Illustrations

All art is **coded**, on a fixed 320×200 `Artboard` scaled to the card (a phone shows the same picture as a desktop).

- `LiveSite` (`components/art/live-site.tsx`): six realistic website mock-ups that **act out what the real thing does**, each with its own loop: landing page (scroll to proof, tap, booking arrives), business site (map pin drops, WhatsApp question and reply), online store (add to cart, item flies to the bag, Paystack succeeds), web app (sign in, chart grows, new payment row), booking (pick day and time, pay deposit, confirmation and reminder), portfolio (work slides past, "Hire me", message sent). Keyframes live in `globals.css` under "Live site mock-ups". They play only while on screen (`.is-live`, set by `Artboard`) and never under reduced motion, where the base styles show a still frame.
- `ToolThumb`, `ProductThumb`, `LessonDiagram`: static coded illustrations for tools, lessons and diagrams.

## Page patterns

- **Header**: sticky, full-width, translucent paper with a hairline. Logo, then Tracks (menu) · Free tools · Pricing · Blog, then Sign in and Enroll Now.
- **Homepage (7 sections)**: hero (headline with "websites" and "income" in orange, one orange button, a live store demo) → websites businesses pay for (six LiveSites) → how it works (3 steps) → the Fast Track (the main offer, with its 14 days listed) → free tools (3 cards) → pricing (Fast Track highlighted as "Start here") → FAQ. Then the dark call-to-action card and the footer.
- **Page headers** (pricing, tools, tracks, blog): white band, orange eyebrow, large headline, muted intro.
- **Footer**: white, brand and email signup, then Learn · Resources · Legal.
- **Legal**: `/privacy`, `/terms`, `/refund-policy` share `components/legal.tsx`. The contact route comes from `NEXT_PUBLIC_CONTACT_EMAIL`.

## The learning area (`/learn`) and dashboard

Same tokens and components: white cards on paper, the sticky lesson header with the three-step progress bar, prompt and code blocks in Geist Mono on near-black, tip and watch-out callouts, quiz cards with green/red states. The dashboard's "continue" card is white with the orange button as its one action.

## The admin (`/admin`)

A separate calm workspace (owner's reference: a clean HR dashboard), scoped under `.admin-ui` in `globals.css`, with its own accent `--a-accent` (#5b4de6). Components in `src/components/admin/blocks.tsx`.

## Rules

- Never invent wins, member counts, press logos or team members. Sections that need real proof (testimonials, team) stay off the site until the content is real.
- Orange text uses `brand-text`; text on orange is ink.
- Everything that moves respects `prefers-reduced-motion`, and animated art pauses off screen.
- No horizontal page scroll at 360px; tap targets ≥ 44px; body text ≥ 16px in lessons.
