# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Nigerians (mostly on phones, often on metered 3G/4G data) who want to earn in dollars by building with AI — freelancers, students and career-switchers, many with no coding background.

## Product Purpose

Stynark teaches website building with AI, sold as two one-time tracks, both **self-paced with lifetime access** (pay once, keep it for good, no deadlines): the **Fast Track** (14 lessons, ₦23,500 — business websites, landing pages, online stores, booking systems and web apps with logins and databases, SEO basics, portfolio, pitching, getting paid) and the **Main Track** (26 lessons, ₦46,500 — all of that plus full and local SEO, automation, AI agents and lead generation). The course is written in the app: illustrated beginner lessons, a practical task and a quiz for every lesson, a final assessment and certificate, with progress, XP, levels and streaks. Fifty free public tools (+6 bonus) are the lead-generation layer. Success: a visitor uses a free tool, buys a track (naira, via Paystack), joins the WhatsApp community, finishes the lessons and ships a first paid build.

## Positioning

Nigeria-first: naira pricing, Paystack, WhatsApp, Lagos time, ₦→$ maths built into the tools — teaching how to find clients (local and abroad) and get paid, not just how to prompt.

## Capabilities and Constraints

- Next.js 16 App Router, Tailwind v4, Supabase auth/DB, Paystack (test or live mode), hosted on Netlify. PostHog analytics and Sentry error tracking (both optional, off without keys).
- Routes: marketing home, `/tracks/[track]`, pricing, `/tools` + `/tools/[slug]`, signup/login, checkout, welcome (WhatsApp redirect), member dashboard + billing, and the course at `/learn` (track overview, lessons, final assessment, certificate).
- Lessons are in-app and self-contained; outside links are optional "go deeper" resources.
- Plan prices and results live in `src/lib/site.ts`; what a track promises must be taught by its lessons.
- Tracks are measured in lessons, never days: "Lesson N" and "Part N" in the course, "14 lessons" / "26 lessons" in marketing. A paid track never expires (`current_period_end` 9999-12-31); checkout never sells a track the member already has; buying the Main Track upgrades a Fast Track member.

## Brand Commitments

- Name: **Stynark** (the product and the company; renamed from Prostatis on 2026-11-14). The wordmark is brand orange in the site, dashboard and course headers, ink on the orange footer. Internal keys and file names that still say "prostatis" (browser storage keys, `/brand/prostatis-mark*` files, certificate IDs) stay, so saved settings, sent emails and issued certificates keep working. The video ads in `marketing/ads/` still say Prostatis and prostatis.com until they are re-rendered. Tagline: "Learn to build websites with AI and turn it into a source of income."
- Design direction set by the owner (2026-10-01, see DESIGN.md): bold and crafted, never cheap. Warm off-white pages, white cards with an ink outline and a hard offset shadow, one orange accent (#eb5e28) for the main action, and supporting hues (purple, blue, green, yellow, pink, teal) that give each course skill its own colour. Websites first. Original implementation only — never copy another site's code, copy, images or logos.
- Tool naming: the invoice tool is the **Invoice Generator** (owner's choice, 2026-10-19).

## Evidence on Hand

No real testimonials, member counts or client results yet. Content-parity numbers (650+ lessons, 8,000+ members) are targets and must not be presented as facts. Example builds must be labelled as examples.

## Marketing

- Five 30-second vertical video ads live in `marketing/ads/` (2026-10-21), one per angle: the skill, no coding needed, cost vs bootcamps, start on your phone, and businesses still needing websites. Each has a full version (voiceover + original music) and a music-only version for recording a real voice. The current voiceover is a synthetic guide voice (Microsoft George, en-GB); a Nigerian voice actor is the intended final voice.
- A second set (2026-10-21, `marketing/ads/sales/`): ten emotional sales ads for ages 15–40 (in school, no high-paying skill, after the Fast Track, after the Main Track, waiting for a job, salary finishes, scroll to build, AI is here, the one they call, spend or invest) and a 60-second **Welcome to Prostatis** video to pin on every social profile. "Passive income" is deliberately not promised: client work is active; the Main Track teaches monthly retainer packages, which are recurring.
- Ad copy follows the honesty rules: "learn a skill businesses pay for", never income promises, no competitor prices or statistics we can't source, and the phone angle says building happens on a laptop or desktop.
- The ads point to prostatis.com, which must be connected to the live site (currently prostatis.netlify.app) before they run.

## Product Principles

1. Free value first: tools work fully with no signup.
2. Honest numbers: every price, rate and claim is real or clearly marked.
3. Phone and data friendly: light pages, readable on small screens.
4. Getting paid is the point: every lesson ties back to earning.
5. Lessons deliver what they promise: every lesson ends with a practical task and an assessment.
