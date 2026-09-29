@AGENTS.md

# BuildWithAIClub — project guide for Claude

Nigeria-first platform that teaches people to build and sell websites with AI. Two one-time paid tracks (Fast Track: 14 days, ₦15,000 · Main Track: 1 month, ₦30,000), a written in-app course with assessments, XP and streaks, 50 free public tools (+6 bonus), Paystack payments and a WhatsApp community.

Read before changing things: `PRODUCT.md` (who it's for, principles, honesty rules), `DESIGN.md` (visual system — follow it), `README.md` (setup, payments, course architecture).

Repo: https://github.com/ExpectationsHACK/buildwithitaiclub

## Stack

- Next.js 16 App Router + Turbopack. `src/proxy.ts` (not middleware). Params are Promises. New dynamic routes: type params explicitly (`{ params: Promise<{ x: string }> }`) — `PageProps<"/route">` types only exist after a build.
- Tailwind v4 with tokens in `src/app/globals.css` (`@theme inline`). Light only.
- Supabase (`@supabase/ssr`): `getCurrentUser()` verifies with `getClaims()`. RLS on every table; members read their own rows; **all writes to payments, subscriptions and learning progress go through the admin client on the server**.
- Paystack one-time charges. Server-verify every transaction; webhook checks the HMAC; recording is idempotent per reference.
- lucide-react 1.48 (no brand icons — `Github` doesn't exist).
- Tests: Vitest (`npm test`). Mock `server-only` in tests with `vi.mock("server-only", () => ({}))`.

## Commands

```bash
npm run dev      # http://localhost:3000 — course runs in preview mode without Supabase
npm test         # 340+ tests: tools, live renderers, SSRF guard, course content, XP/streak engine
npx tsc --noEmit
npm run lint
npm run build
```

Before calling work done: typecheck, lint, tests and build must pass, and anything visible should be checked in the browser at 375px and desktop.

## Where things live

| Path | What |
|---|---|
| `src/lib/site.ts` | Name, copy, the two plans (price, access days, results list) |
| `src/lib/curriculum.ts` | Pillars and both tracks; each day's `lesson` id points into `src/content/lessons/` |
| `src/content/lessons/*.ts` | One file per written lesson (typed by `src/content/types.ts`), registered in `index.ts` |
| `src/lib/learning/` | `engine.ts` (grading, XP, levels, streaks, unlocks — pure), `store.ts` (Supabase or `.data/` file), `access.ts` |
| `src/app/learn/` | Course UI + server actions that grade quizzes and award XP |
| `src/lib/tools.ts`, `src/lib/tool-defs/` | Free tool registry and pure tool logic |
| `src/app/api/tools/analyze/` | Live website checks (use `safeFetch` — never fetch user URLs directly) |
| `src/components/art/` | Coded illustrations on a fixed 320×200 `Artboard` |
| `supabase/migrations/` | SQL, run in order |

## Rules

- **Honesty:** never invent testimonials, member counts, results, press or team. Placeholders are labelled. Example prices in lessons are examples.
- **Course integrity:** the answer key never reaches the browser (`publicQuestions`), XP is only awarded server-side and idempotently, a lesson completes only when quiz (≥70%) **and** task are done. If you change what a track promises (`plans[].results`), make sure its lessons actually teach it.
- **Shared lessons** are used by both tracks — don't write "Day N" inside them; refer to lessons by name.
- **Wording:** say "get paid", not "invoice", in site copy (the printed document itself may say INVOICE).
- **Security:** secrets only in env vars; nothing sensitive in URLs; user-supplied URLs go through `safeFetch` (DNS + private-IP blocking).
- **Mobile first:** users are on phones and metered data. Keep pages light; no horizontal scroll at 360px.
- Match surrounding code style; comment the *why*, sparingly.
