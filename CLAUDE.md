@AGENTS.md

# STEINARK — project guide for Claude

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
| `src/lib/tools.ts`, `src/lib/tool-defs/` | Free tool registry and pure tool logic (definition-driven tools) |
| `src/lib/tool-guides.ts` | The app wrapper for every tool: problem, steps, result, next actions |
| `src/components/tools/kit/` | Tool engine: autosave, share links (`?in=`), examples, result bar; `app-tool.tsx` gives hand-built tools the same features |
| `src/app/api/tools/analyze/` | Live website checks (use `safeFetch` — never fetch user URLs directly) |
| `src/components/art/` | Coded illustrations on a fixed 320×200 `Artboard`; `live-site.tsx` holds the six animated website mock-ups (keyframes in `globals.css`) |
| `src/components/legal.tsx`, `(site)/privacy`, `/terms`, `/refund-policy` | Legal pages; contact from `NEXT_PUBLIC_CONTACT_EMAIL` |
| `src/app/admin/`, `src/lib/admin/` | Admin: overview, visitors, students, student affairs, payments, certificates, blog, waitlist, audit log, setup & health. Access = signed in + email confirmed + listed in `ADMIN_EMAILS` (checked server-side on every page and action). Every change is written to `admin_audit`. |
| `src/lib/blog.ts`, `src/app/(site)/blog/` | Blog (Supabase `posts`): per-post SEO fields, `BlogPosting` JSON-LD, RSS, sitemap, related posts. `src/components/markdown.tsx` renders posts safely (no raw HTML). |
| `src/lib/analytics*.ts`, `/api/track` | Cookieless visitor analytics: daily-rotating salted hash, no IPs stored; country/city from Vercel headers |
| `src/lib/certificates.ts`, `certificate-*.ts` | Certificates: issued on passing a final, PNG via `/api/certificate/[id]`, public proof page `/certificate/[id]`, emailed through Resend (`RESEND_API_KEY`, `EMAIL_FROM`) |
| `src/app/(site)/(auth)/` | Sign in / sign up / forgot + reset password. Social buttons appear only for providers enabled in Supabase (`src/lib/auth-providers.ts` reads the public auth settings). A sign-in with an unknown email goes to sign up (email carried in a short-lived cookie, never the URL) via the service-only `email_registered` SQL function. |
| `src/lib/dashboard.ts` | Member dashboard context (a preview learner in local preview) |
| `src/lib/email-templates.ts`, `src/lib/auth-email.ts` | Branded STEINARK emails (one table-based layout). Account emails (confirm, reset, sign-in link) are sent by us via Supabase `generateLink` + Resend once `EMAIL_FROM` is on a verified domain (`canEmailAnyone()`); before that Supabase's mailer is used. Matching templates to paste into Supabase live in `supabase/email-templates/`. |
| `src/lib/newsletter.ts`, `/admin/newsletter`, `/unsubscribe` | Newsletter: subscribers are the `waitlist` table (status + private token), issues in `newsletter_issues`. Welcome email on signup, one-click unsubscribe (link + `List-Unsubscribe` headers), batch sending through Resend, claim-before-send so an issue can't go out twice. |
| `src/lib/data/local.ts` | `.data/` JSON tables used only in local preview mode |
| `supabase/migrations/` | SQL, run in order |

## Rules

- **Honesty:** never invent testimonials, member counts, results, press or team. Placeholders are labelled. Example prices in lessons are examples.
- **Course integrity:** the answer key never reaches the browser (`publicQuestions`), XP is only awarded server-side and idempotently, a lesson completes only when quiz (≥70%) **and** task are done. If you change what a track promises (`plans[].results`), make sure its lessons actually teach it.
- **Shared lessons** are used by both tracks — don't write "Day N" inside them; refer to lessons by name.
- **Lesson standard** (enforced by `src/content/lessons.test.ts`): plain English for non-techies; every new word gets a `define` block; at least one real-life `scenario`, one `try` (practise now), one `check` (self-test), one figure; a real-world mission; 5+ `recap` takeaways; 5 quiz questions, each with `from` pointing at the takeaway that teaches it (the test checks the answer's key words appear there). Scenarios are illustrative — never invent statistics or claim they are real events.
- **Facts that change** (prices, install commands, platform rules) must be checked against the official source before editing — e.g. Claude Code's native installer, Vercel Hobby = non-commercial, Meta per-message WhatsApp pricing, Google no longer shows FAQ rich results, Supabase free projects pause after a quiet week.
- **Tool standard** (enforced by `src/lib/tool-defs/tools.test.ts`): every tool has a guide in `src/lib/tool-guides.ts` (problem, what you get, 3 explicit steps, next actions); every generator has 2+ one-tap `examples`; outputs never invent reviews, results or proof — use [brackets] for anything the user must fill in.
- **Wording:** say "get paid", not "invoice", in site copy (the printed document itself may say INVOICE). Main CTAs are **Enroll Now** (to pay) and **Start Learning** (to open the course).
- **Security:** secrets only in env vars; nothing sensitive in URLs; user-supplied URLs go through `safeFetch` (DNS + private-IP blocking).
- **Mobile first:** users are on phones and metered data. Keep pages light; no horizontal scroll at 360px.
- Match surrounding code style; comment the *why*, sparingly.
