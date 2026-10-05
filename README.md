# Prostatis by Stynark

Nigeria-first club that teaches website building with AI, plus web solutions, SEO, automation, lead generation and AI agents. Two one-time tracks — **Fast Track** (14 days, ₦15,000) and **Main Track** (1 month, ₦30,000) — a WhatsApp community, and 50 free public tools.

**Status:** marketing site; all 50 free tools (+6 bonus) live and tested; Supabase auth; Paystack one-time payments (test/demo); the full written course (27 lessons with illustrations, tasks, resources and quizzes); progress, XP, levels and streaks; final assessments and certificates.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional in dev
npm run dev
```

Everything runs on Supabase, in development too: there is no preview or demo mode. Sign in with a
real account; to test the course without paying, add your account's email to
`PERMANENT_STUDENT_EMAILS` (it must be confirmed) and it gets the Main Track with no end date.

## Supabase setup

1. Create a project. Run every file in `supabase/migrations/` in order (SQL editor, or `supabase db push`).
2. Copy the URL, publishable key and secret key into `.env.local` (see `.env.example`).
3. Authentication → URL Configuration: set **Site URL** to your site, and add
   `http://localhost:3000/auth/callback` (plus your production `/auth/callback`) to **Redirect URLs**.
4. Optional for local testing: turn off "Confirm email" under Authentication → Providers → Email,
   so signup logs you straight in.

## Payments

Two modes, picked automatically (`src/lib/paystack.ts`):

| Mode | When | What happens |
|---|---|---|
| paystack | `PAYSTACK_SECRET_KEY` set | Real Paystack checkout. `sk_live_…` takes real money; with an `sk_test_…` key it's Paystack test mode (test card 4084 0840 8408 4081, CVV 408). |
| disabled | No key | Checkout says payments aren't open. |

/admin/system checks the key live (read-only) and shows the webhook URL to paste into Paystack.

Flow: `/pricing` → `/checkout/[plan]` (sign-up/login first if needed) → Paystack → `/api/paystack/callback`
(re-verifies the transaction server-side, checks amount/currency) → `/welcome` (WhatsApp invite, auto-opens) → `/dashboard`.

- **Webhook:** in Paystack → Settings → API Keys & Webhooks, set the URL to `https://<your-domain>/api/webhooks/paystack`.
  It checks the `x-paystack-signature` HMAC, re-verifies charges, and handles renewals, cancellations and failed payments.
  To receive webhooks locally, expose port 3000 with a tunnel (e.g. `ngrok http 3000`).
- **One-time:** each payment unlocks its track for `accessDays` (Fast Track 30, Main Track 60). Buying again extends from the later of now or the current end; the Main Track outranks and includes the Fast Track.
- Payment recording is idempotent per reference, so the callback and webhook can both fire safely.
- Membership access = `current_period_end` + 3 days grace (`src/lib/membership.ts`).

## The course

- **Tracks** (`src/lib/curriculum.ts`): each day points to a written lesson by id. The tracks share lessons where they overlap, and progress on a shared lesson counts in both.
- **Lessons** (`src/content/lessons/<id>.ts`, one file each, typed by `src/content/types.ts`): intro, sections of blocks (text, steps, copy-able prompts, code, tips, warnings, tables, links to our tools, figures), a practical task with a done-checklist, outside resources, and a 5-question quiz. Figures are coded illustrations — tool output, product thumbnails, or teaching diagrams (`src/components/art/lesson-diagram.tsx`).
- **Assessment:** a lesson is complete when its quiz is passed (70%+) **and** its task is confirmed. Lessons open in order. Quizzes are graded by server actions (`src/app/learn/actions.ts`); the answer key never reaches the browser, and explanations are shown only after a pass. Option order is shuffled per question, stably, so answer positions carry no pattern. The final assessment draws one question per lesson (pass mark 75%) and issues a printable certificate with an ID.
- **XP, levels, streaks** (`src/lib/learning/engine.ts`): 10 XP per correct answer on the first pass, +25 for a perfect quiz, +50 for the task, +100 for completing the lesson, +300 for the final. Every award is idempotent per (kind, ref) and written only by the server. Streaks count consecutive Africa/Lagos days with a quiz submission or task completion.
- **Storage** (`src/lib/learning/store.ts`): Supabase tables `lesson_progress`, `xp_events`, `activity_days`, `final_exams` (migration `20260929120000_learning.sql`; members can read their own rows, only the secret key writes).

### Lesson format

Every lesson has: a “You'll need” list, plain-English Jargon busters for each new word, real-life scenarios, “Try it now” practice, ungraded quick checks, common-mistakes tables, a real-world mission, key takeaways, and a 5-question assessment where each question points at the takeaway that teaches it. A “Start here” orientation (`/learn/start`) covers costs, paying for AI tools from Nigeria, study habits and getting unstuck; `/learn/glossary` collects every Jargon buster. Gamification: XP, levels, streaks, badges (`badges()` in the engine) and a celebration when a lesson completes or a level/badge is earned.

### Adding or editing a lesson

Edit or add a file in `src/content/lessons/`, register new ones in `index.ts`, and point a module's `lesson` at it. `npm test` checks every day has a lesson, every lesson has a figure, a task, 3+ https resources, a valid 5-question quiz, and that every tool it links to exists.

## Where things live

| Path | What |
|---|---|
| `src/lib/site.ts` | Name, tagline, the two plans (price, access days, results) |
| `src/lib/curriculum.ts` | 7 pillars; Fast Track (14 days) and Main Track (25 lessons over 4 weeks) |
| `src/lib/tools.ts` | Registry: 50 core + 6 bonus tools — pillar, copy, illustration |
| `src/lib/tool-defs/*.ts` | Tool logic per pillar (pure functions, unit-tested) |
| `src/components/tools/kit/` | Renders any tool definition (form + output blocks) |
| `src/components/art/` | Coded illustrations on a fixed 320×200 artboard: tool thumbnails, product thumbnails, website kinds, lesson diagrams |
| `src/lib/showcase.ts` | 37 example products, placeholder wins and team |
| `src/lib/models.ts` | Claude API prices + default ₦/$ rate used by calculators |
| `src/components/tools/` | One client component per live tool, registered in `tool-renderer.tsx` |
| `src/app/api/waitlist/route.ts` | Waitlist endpoint |
| `src/proxy.ts` | Refreshes the Supabase session on each request; redirects signed-out users away from member pages |
| `src/lib/membership.ts` | Plans, access check, idempotent payment → subscription recording |
| `src/app/(auth)/` | Signup, login (password + magic link), server actions |
| `src/app/checkout/`, `src/app/api/paystack/`, `src/app/api/webhooks/paystack/` | Payment flow |
| `src/app/dashboard/` | Member home (progress, next lesson), billing |
| `src/app/learn/` | The course: track overview, lessons, final assessment, certificate |
| `src/app/api/tools/analyze/` | Live website checks for the tools (SSRF-guarded fetch, optional PageSpeed via `PAGESPEED_API_KEY`) |
| `src/app/api/tools/ai/`, `src/lib/server/ai.ts` | Optional “Write it with AI” for 20 text tools (Claude, structured output, per-visitor and daily limits, honesty check). Off unless `ANTHROPIC_API_KEY` is set |
| `src/app/api/tools/fx/` | Today's USD→NGN rate for the money tools (cached 6 hours) |

### Tool experience

Every tool page wraps the tool in an app flow: the problem → how to use it (3 steps) → the tool → “Now put it to work”. The engine autosaves inputs on the device, restores them from a shareable link (`?in=` encodes the inputs), offers one-tap industry examples, and has a result bar (copy everything, download, print/PDF, share link). Checklists remember ticks. Hand-built tools get the same features through `useToolState` + `AppToolLayout` (`src/components/tools/kit/app-tool.tsx`).

### Adding a tool

1. Add a definition to the right pillar file in `src/lib/tool-defs/` (fields + a pure `generate` function, or a checklist).
2. Add its entry to `src/lib/tools.ts` with a pillar, description, use case and illustration scene, and a guide in `src/lib/tool-guides.ts`. Give generators 2+ `examples`.
3. Run `npm test` — the suite checks every tool with example, empty and messy inputs, speed, and that no tool is missing an implementation.

## Tests

```bash
npm test
```

## Deploying to Cloudflare

The site runs on Cloudflare Workers through the OpenNext adapter (`wrangler.jsonc`, `open-next.config.ts`).
Cloudflare's free plan allows commercial sites.

**Recommended: let Cloudflare build from GitHub** (Workers & Pages → Create → Import a repository):

- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx wrangler deploy`
- Environment variables: everything from `.env.example`. Set `NEXT_PUBLIC_*` values as **build** variables
  (they're baked into the pages at build time), and the secret keys as runtime **secrets**.

From your own machine instead (Linux, macOS or WSL; OpenNext isn't reliable on plain Windows):
`npx wrangler login`, then `npm run deploy`.

After the first deploy: set `NEXT_PUBLIC_SITE_URL` to the live address, add `<address>/auth/callback` to
Supabase → Authentication → URL Configuration, and set Paystack's webhook to `<address>/api/webhooks/paystack`.
Then open `/admin/system` on the live site to check every service.
