# Prostatis app audit (4 October 2026)

This audit covered security, payments, sign-in, the learning flow (lessons, quizzes, final, certificates), admin, the newsletter, public APIs, the database rules, page weight, accessibility and copy.

Severity:
- **High:** exploitable or loses money or trust.
- **Medium:** a real bug or an abuse path.
- **Low:** polish.

## Fixed

| # | Area | Severity | Problem | Fix |
|---|---|---|---|---|
| 1 | Sign-in redirect | High | Open redirect. The "where to go after sign-in" check let `/` + tab + `/evil.com` through; browsers strip the tab, so it became `//evil.com`. In `/auth/callback` this sent a freshly signed-in user to another site. | One strict checker, `src/lib/safe-next.ts`. It rejects control characters and backslashes, and anything that resolves to another origin. Used by the sign-in actions and the callback. Tested. |
| 2 | Mailing list | High | `/api/waitlist` sent a welcome email to any address, with no limit. A script could make the site email thousands of strangers and get the sending domain blacklisted. | Limited to 5 sign-ups per 10 minutes per visitor and 300 an hour site-wide. A welcome email goes only to a genuinely new address. |
| 3 | Consent (NDPA) | High | Submitting an address that had unsubscribed silently switched it back on, so anyone could re-subscribe someone else. | Such an address is never re-subscribed by a form. Its owner gets a "rejoin" email; the link opens a page with a confirm button. |
| 4 | Final assessment | High | A failed final showed which answers were wrong, and retakes were instant and unlimited. The certificate could be won by elimination in a few tries. | A failed final now shows only the score, and there's a 10-minute wait between failed attempts (using the existing `updated_at`). Lesson quizzes keep per-question feedback, because that's how people learn. Tested. |
| 5 | AI budget | High | The in-memory limiter cleared every counter once it held 5,000 keys. Flooding it reset the site-wide daily AI cap, letting someone run up the bill. | New `src/lib/server/rate-limit.ts`. "global:" caps are never evicted, and a blocked caller's history can't grow. The AI budget is only spent on valid requests. Tested. |
| 6 | Checkout | Medium | Checkout turned away anyone with active access, so billing's "Upgrade to Main Track" and "Add days" buttons went nowhere. | Members can now upgrade or add time, and a notice says exactly what buying does. The page also moved to the current design and shows a clear message when payments are off. |
| 7 | Sign-in | Medium | No throttling on sign-in, sign-up, magic links or password resets. If the SQL helper was missing, each failed sign-in listed up to 10,000 accounts. | Limits per IP, plus per email for sign-in. The user-listing fallback is removed. |
| 8 | Page weight | Medium | The header loaded the whole Supabase library (about 69KB compressed) on every public page, just to choose between "Sign in" and "My dashboard". | It now reads the session cookie. Every page is about 67KB lighter; pricing went from 247KB to 180KB of JavaScript. The server still checks sign-in on every protected page. |
| 9 | Visit counter | Medium | `/api/track` had no limit, so fake visits could pad the analytics and fill the database. | Limited to 30 a minute per visitor. |
| 10 | Certificates | Medium | Sign-up asked only for "First name", which is what the certificate prints. | Sign-up now asks for "Full name (as you want it on your certificate)", trimmed to 80 characters. |
| 11 | Shipped notes | Medium | An old "design contract" (internal notes about a dark-hero design that no longer exists) sat as a hidden comment in every page. It cost bytes on every load and was readable in the page source. | Removed. |
| 12 | Welcome page | Low | After paying, people saw "Start Stage 1: Foundations: memory, pages that convert…", copy from an older curriculum. | A real next step: Start Learning, linked to the learner's own track. |
| 13 | Payment webhook | Low | It handled monthly-subscription events that can't happen with one-time payments; a malformed body threw an error. | Handles `charge.success` only. A bad payload gets a 400. The unused "manage subscription" call is removed. |
| 14 | Certificate image | Low | Redrawn on every request (CPU-heavy), with no shared caching. | Cacheable at the CDN for an hour; a revoked certificate disappears within the hour. |
| 15 | Browser tabs | Low | Every lesson tab read just "Learn · Prostatis". | Lessons show "Day N: lesson title". The track, final, certificate, glossary and start pages have their own titles too. |
| 16 | Tap target | Low | "+ N more on the full curriculum" was 20px tall. | Now 44px. |
| 17 | Admin inputs | Low | Link fields accepted `//other-site.com`. | Refused. |
| 18 | Brand leftovers | Low | Payment references (`stk_`) and certificate IDs (`STK-`) carried the old name and showed on receipts. | `pst_` and `PRS-` from now on. Old prefixes are still accepted. |
| 19 | Legal | Low | The terms listed Claude and Vercel as course tools. The privacy policy didn't mention Google search suggestions, Anthropic (AI writing) or the exchange-rate source. | Both updated, and both name Stynark as the company responsible. |

## Checked and sound

- **Payments:**
  - every payment is re-verified with Paystack server-to-server, with the amount and currency checked;
  - the webhook checks Paystack's HMAC with a constant-time compare (now tested);
  - recording is idempotent per reference, so the callback and webhook can both run safely.
- **Database:**
  - row-level security is on for every table;
  - members can only read their own rows, and only the server writes;
  - the email-lookup function can only be run with the server key.
- **Learning:**
  - the answer key never reaches the browser before a pass;
  - XP is only awarded on the server, once per event;
  - lessons open in order, and a locked lesson can't be opened early;
  - the final needs every lesson complete.
- **Admin:** every page and action re-checks a signed-in, email-confirmed address listed in `ADMIN_EMAILS`, and every change is written to the audit log.
- **XSS:** blog posts are rendered by our own Markdown renderer, which never injects raw HTML and allows only safe link types. The only raw HTML is the blog's JSON-LD, which is escaped.
- **Website checks:** the free tools fetch user-supplied URLs through `safeFetch`, which blocks private and internal network addresses.
- **Links:** 23 key pages and all 123 internal links on them load with no errors.
- **Search engines:** the sitemap and robots rules are right (private areas excluded).
- **Phones:** no horizontal scroll at 360px on the home, pricing, sign-in, sign-up, lesson, dashboard and billing pages. Every form field has a label, every image has a description, and each page has one main heading.

## Not fixed: decisions or follow-ups for the owner

1. **Revealing registered emails at sign-in (your design choice).** Signing in with an unknown email sends people to sign up, which reveals whether an address has an account. It's now rate-limited; switch it off if privacy matters more than convenience.
2. **Limits reset per server instance.** Rate limits live in memory on each server, which is fine for one instance. If the site scales to many, move them to a shared store (Upstash Redis, or a Supabase table) so limits hold everywhere.
3. **Supabase's own sign-in limits.** Sign-ins reach Supabase from your server, not from each visitor, so check the auth rate limits in the Supabase dashboard (Authentication → Rate Limits) before a big launch.
4. **The final reuses lesson questions.** The final draws one question from each lesson quiz, and learners have already seen those answers. With the changes above it can't be won by guessing, but a separate final-only question bank would make the certificate stronger.
5. **Task completion is on trust.** Learners tick their own task checklists. If certificates need stronger proof, ask for a link to the live page at key milestones.
6. **The admin analytics page will slow down with traffic.** It adds up to 100,000 raw visits in code, which is fine now. Move the totals into SQL views when traffic grows.
7. **Profile write on every dashboard visit.** The dashboard layout writes the profile row each visit (ignored if it already exists). It's harmless, but could move to sign-up and the sign-in callback.
8. **Price changes mid-payment.** Payments are checked against today's price, so changing a price while someone is mid-checkout fails their verification, and they'd need to contact support.
9. **Not browser-tested here.** I couldn't test the checkout and welcome pages signed in, because that needs an account on your live Supabase project. The checkout logic is covered by the typecheck and a code review, but try one Paystack test-mode purchase before launch.
10. **The display font is 88KB.** It keeps the brand's width axis and is cached after the first visit.
