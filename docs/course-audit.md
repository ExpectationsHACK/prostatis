# Course audit and rewrite plan

Audit date: 2026-10-01. Scope: the "Start here" page, every lesson of the Fast Track (14 days) and the Main Track (25 days, now 26), checked against eight rules:

1. Beginner-first language: every technical term gets an everyday Nigerian analogy before it is used.
2. No gaps: every click, field, error message and "obvious" step is spelled out.
3. Free before paid: a learner with zero budget can go from nothing to a shipped, sellable website. Paid tools only appear as optional "once you're earning" upgrades.
4. End-of-track outcome: each track produces a real, working, sellable website using only what that track teaches.
5. Purposeful assessments: each question tests the lesson's one core idea or a skill a later lesson needs. No trivia.
6. Hand-sketch visuals for each major concept or step.
7. Celebration moments after every real accomplishment.
8. Real-life scenario framing: every concept is solved for a relatable local business, step by step.

For each lesson below: **(a)** unclear or missing steps, **(b)** terms used without an analogy (or before they are explained), **(c)** can a total beginner finish it with a real, working result on free tools, **(d)** paid requirements and the free alternative, **(e)** whether the assessment targets the core idea and what's needed ahead, **(f)** where sketches go and what they show, **(g)** where the celebration goes. Each ends with the **fix** that the rewrite applies.

---

## Cross-cutting findings

| # | Finding | Effect on a zero-budget, zero-background learner | Fix in the rewrite |
|---|---|---|---|
| 1 | **Day 3 requires a paid Claude plan (Claude Pro, about $20/month)** for Claude Code, and every build lesson after it depends on Claude Code. | A learner with no dollar card, or no money, is blocked from Day 3 to the end of both tracks. Rule 3 fails for 23 of 26 lessons. | The default builder is **Google Antigravity**, a free coding agent (free Individual plan, generally available, Nigeria supported, personal Gmail, 18+, weekly allowance). **Claude Code** (Claude Pro, $20/month or $17/month yearly) is offered as a choice for those who can afford it, from the Claude desktop app's Code tab. A **free AI chat + VS Code** route is the backup for older laptops or a week when Antigravity's allowance runs out. Every build step has three tabs, and the learner's choice is remembered. |
| 2 | **Day 3 is a terminal-and-Node.js setup** (PowerShell, `node -v`, Git config, `npm run dev`, Next.js). | The steepest cliff in the course arrives on Day 3, for people who have never seen a file extension. Most "it doesn't work" moments come from here. | No terminal at all in the Fast Track. Websites are plain HTML/CSS/JavaScript files that open by double-click. The terminal stays in the optional Claude Code upgrade. |
| 3 | **Hosting is Vercel's Hobby plan, which is non-commercial only.** The course itself says client sites need Vercel Pro (about $20/month). | A learner can't legally host a paid client site for free. Rule 3 fails at the exact moment money arrives. | **Cloudflare Pages** (free; its free plan allows commercial sites; unlimited bandwidth for static files; 500 deploys a month). Drag-and-drop upload on Day 3, GitHub-connected automatic deploys on Day 7. |
| 4 | **Day 7 asks the learner to buy a domain** (₦5,000–₦25,000). | Optional in the text, but the lesson, outcomes and marketing ("live on your own domain by day 7") all assume it. | Sites go live free on `name.pages.dev` from Day 3. Domain connection is taught completely, step by step, for when a **client** buys their domain (in their own name). Marketing copy changed to match. |
| 5 | **The site goes live only on Day 7**, but Day 5 (landing page checker on a live link) and Day 6 (PageSpeed needs a live link) need a live page earlier. | Two lessons send learners forward ("once it's live, deploy day") or to "any live site", so the checks can't be done on their own work. | First deploy moves to **Day 3**. Days 4–6 publish and test the learner's own live pages. |
| 6 | **Payment verification (Day 9) and the website chat agent (Day 17) need a server**, which assumed Vercel + Next.js. | No free, commercial-friendly place to run the secret part. | **Cloudflare Pages Functions** (free daily allowance) run the server code from the same GitHub project, with secrets stored as encrypted variables. |
| 7 | **AI agents needed a paid API** (Claude API) for the website chat agent. | Paid requirement in the Main Track. | Prototype in a free Claude Project; the live website agent uses the **Gemini API free tier** (Flash models) from a Cloudflare Function, with an honest privacy note: free-tier prompts may be used by Google to improve its products, so no sensitive customer data, and an upgrade note for paid-tier privacy once the client pays. |
| 8 | **Uptime monitoring used UptimeRobot**, whose free plan has been non-commercial since late 2024. | Not allowed on client sites. | **Better Stack's free plan** (10 monitors, commercial use allowed). |
| 9 | **WhatsApp pricing keeps changing.** Several providers report that Meta began billing service replies (after a monthly free allowance) from 1 October 2026; Meta's own pricing page, checked on 2 October 2026, still lists them as free. The old lesson stated prices as fixed facts. | Learners may quote clients wrong costs. | The lesson now teaches the free WhatsApp Business app first, the Cloud API test number for practice, and tells learners to check Meta's current pricing page before quoting. |
| 10 | **Jargon without analogies**: `LTS`, `Git Bash`, `npm run dev`, `Next.js`, `Tailwind`, `endpoint`, `JSON-LD`, `SQL migration`, `@supabase/ssr`, `API`, `px`, `WebP`, `KB/MB`, `F12/developer tools`, `H1/H2`, `robots.txt`, `CNAME/A record`, `token`, `AI model`, `credits/operations` and more appear with no explanation or before their explanation. Some analogies aren't from Nigerian life (video-game save points, ring-binders, hotel key cards, car service plans). | Each unexplained word is a place a beginner stops. | Every jargon box now leads with a Nigerian everyday analogy ("Think of it like…") before the plain-English meaning. A new automated test fails the build if any listed technical term is used before the lesson (or an earlier lesson in that track) has explained it. |
| 11 | **Account creation and dashboards are summarised** ("Create a GitHub account", "Copy the endpoint from your Formspree dashboard", "Import your repository"). | Beginners don't know which button, which field, or what the confirmation email looks like. | Click-by-click steps for every account and dashboard, plus an **"If you see this on screen"** box that explains the common error and warning messages in plain English. |
| 12 | **Assessments are recall of the takeaways.** Several questions are trivia (what NAP stands for, what the A in BANT stands for, the exact 360px number, a CLS acronym) that don't carry forward. | Learners pass by memorising letters, not by keeping the skill. | Each lesson now states its **one core idea**. Each question is tagged as testing the core idea or as preparing a named later lesson, and the test suite enforces it. Trivia questions were replaced with situation questions ("Bisi's customer sees…, what do you do?"). |
| 13 | **No hand-drawn visuals.** Figures are clean coded diagrams and product mock-ups. | Visual learners get few "see the idea" moments, and the diagrams explain web things using web things. | A sketch system: everyday objects drawn by hand on exercise-book paper (a danfo, a POS machine, a tailor's tape, a prepaid meter…), labelled with the new idea. Two to four sketches per lesson. |
| 14 | **Celebrations are generic** ("Lesson complete!", "Nice work!") and only appear after the quiz or mission. | First page live, first form message, first test payment and first pitch pass without a moment. | Mid-lesson **milestone** cards at each real accomplishment, and a lesson-specific completion moment with a "what you just proved" line and its own **milestone badge** (e.g. "Live on the internet"). |
| 15 | **Scenarios change every lesson** (Mama Tobi, Kemi, Aisha, Tunde, Mr Okafor, Ngozi…), and some are invented anecdotes with outcomes. | No single story to follow; a learner never sees one business grow from zero. | One running practice client across both tracks: **Bisi Adeyemi's tailoring shop, Stitches by Bisi, in Yaba**. Each lesson opens with Bisi's next real problem and solves it step by step. Learners are encouraged to do the same work for a real business they know. Side scenarios are framed as illustrations, not as real events with results. |
| 16 | **The Main Track has no portfolio lesson**, but its capstone ends with "the case study on my portfolio" and Week 4 pitches assume one. | Outcome gap: a Main Track learner reaches outreach with nothing to send. | The portfolio lesson is added to the Main Track (Day 20), before prospecting. The Main Track becomes 26 days (still one month). |

### What replaces what (the free stack)

| Job | Before | Now (free) | Optional upgrade once earning |
|---|---|---|---|
| AI that writes the code | Claude Code (Claude Pro, paid) | **Google Antigravity** (free coding agent, the default); backup: Claude, ChatGPT or Gemini free chat + copy and paste | Claude Code with Claude Pro, offered as a choice from Day 3 |
| Where files are written | Terminal + Next.js project | Plain HTML, CSS and JavaScript files, written by the agent in Antigravity's built-in editor (or VS Code on the backup route) | Next.js, once the learner is comfortable |
| Hosting | Vercel Hobby (non-commercial) | Cloudflare Pages (free, commercial use allowed) | Cloudflare paid plans, or Vercel Pro for Next.js apps |
| Saving versions | Git in the terminal | Cloudflare deployment history (Day 3), then GitHub in the browser (Day 7) | GitHub Desktop or Git in the terminal |
| Server code (payments, AI agent) | Next.js API routes on Vercel | Cloudflare Pages Functions | Same, on a paid plan for higher limits |
| Contact form | Formspree (50 messages/month) | Web3Forms (250 messages/month, public key) | A paid form plan, or the site's own function |
| Domain | Bought by the learner on Day 7 | Free `name.pages.dev` address; the client buys their own domain | Learner's own domain for the portfolio |
| Bookings | Cal.com | Cal.com free plan (Google Calendar booking page as an alternative) | Cal.com paid for teams |
| Payments | Paystack | Paystack (free account, test mode; fees only on real sales) and Paystack Storefront (free, no code) | none needed |
| Database and logins | Supabase free (pauses after a week idle) | Supabase free, with the pause explained | Supabase Pro for a client app that must never pause |
| Automations | Make free | Make free (1,000 credits/month) | Make paid, Zapier |
| AI agent prototype | Claude Project | Claude Project on the free plan (up to 5 projects) | Claude Pro |
| Website chat agent | Claude API (paid) | Gemini API free tier via a Cloudflare Function | Paid AI API for privacy and higher limits |
| WhatsApp bot | Cloud API test number | WhatsApp Business app (free) + Cloud API test number; 1,000 free service messages/month | Paid per message beyond that |
| Uptime monitoring | UptimeRobot (free = non-commercial) | Better Stack free plan | Better Stack paid |
| Analytics | Vercel Web Analytics | Cloudflare Web Analytics (free) | none needed |

---

## End-of-track outcome check

### Fast Track (14 days): before the rewrite

| Day | Lesson | Can the learner do it with only what's been taught so far, for free? |
|---|---|---|
| 1–2 | Brand kit, wireframe and copy | Yes. |
| 3 | AI dev setup | **No.** Needs Claude Pro. Terminal skills are taught here from zero, in one sitting. |
| 4 | Business site | Yes, if Day 3 worked. Formspree "endpoint" unexplained. |
| 5 | Landing page | **Partly.** The checker step says "after deploy day". |
| 6 | Speed and polish | **No.** PageSpeed needs a live link; the learner has none until Day 7. |
| 7 | Deploy and domain | **Partly.** Free only on a non-commercial plan; domain purchase assumed. |
| 8–10 | Booking, store, web app | Yes on test mode, but a paying client's store or app needs paid hosting. |
| 11 | SEO | Yes; Search Console verification "usually a DNS record" can't be done on a free subdomain without explanation. |
| 12 | Portfolio | Yes, but "deploy on Vercel with your own domain". |
| 13–14 | Package, pitch, deliver | Yes. |

**Verdict:** a zero-budget learner cannot finish the Fast Track. With money, they can, but the sellable site needs a paid host. **After the rewrite:** every day is completable for free; the first page is live on Day 3; the five-page site with a working form is live on Day 4; the store and payments run on free Cloudflare Functions; the learner can legally host a paying client's site at no cost. The track ends with a real, working, sellable website plus booking, store and web-app add-ons, a portfolio and sent pitches.

### Main Track (25 days): before the rewrite

Days 1–11 share the Fast Track's problems. Additionally:

- Day 15 (automations): free on Make, but the form-to-automation step assumed a Next.js server.
- Day 17 (WhatsApp and website agent): the website agent needs a paid AI API; WhatsApp pricing out of date.
- Day 19 (monitoring): UptimeRobot free isn't allowed for client sites.
- Days 20–25: **no portfolio is ever built in the Main Track**, yet outreach and the capstone depend on one.

**After the rewrite:** free at every step; portfolio added at Day 20; the capstone's "website + web solution + SEO + automation + agent" system is buildable entirely on free plans, with the paid upgrades listed as what the client pays for once the system earns.

---

## Lesson by lesson

### Start here (orientation)

- **(a)** The "What it costs" table lists Claude Pro as a requirement and tells learners to sort out dollar payments "before Day 3". The page says nothing about the running practice client.
- **(b)** XP, levels and streak are explained; "Git" is promised for Day 3 without explanation.
- **(c)** Readable, no task.
- **(d)** Claude Pro, Vercel Pro and a domain are presented as costs of the course.
- **(e)** No assessment (orientation).
- **(f)** One coded diagram. Add a sketch of the course path: notebook → laptop → shop → people (plan, build, go live, get customers).
- **(g)** None needed beyond the first-lesson badge.
- **Fix:** "Everything in this course is free" table; optional upgrades listed separately as "once you're earning"; meet Bisi; how sketches, milestones and the one-idea box work; the dollar-card advice moved to the optional upgrades section.

### Day 1 · Design direction & brand kit (both tracks)

- **(a)** "Open webaim.org… type your hex code" doesn't say where the fields are or what pass/fail looks like. Google Fonts browsing isn't walked through. "AI image tools" for the logo aren't named, and there's no account step.
- **(b)** `16px` is used with no explanation of a pixel. "WCAG" appears inside the contrast definition with no analogy. "School uniform" (brand kit) is good; "chalk on a blackboard" is good.
- **(c)** Yes. All free.
- **(d)** None paid. Logo ideas now name free image makers (Gemini, ChatGPT and Canva free plans).
- **(e)** Five recall questions. "How should you treat an AI logo" doesn't carry forward. Better: the hex codes (pasted into the build prompt on Day 3), contrast (checked again on Day 6), two fonts (speed on Day 6) and voice words (copy on Day 2).
- **(f)** Sketches: (1) before/after, Bisi's messy posts vs one brand kit; (2) the paint-shop code → hex code; (3) chalk on a blackboard vs chalk on a white wall (contrast).
- **(g)** Completion: "Bisi has a brand", with the **Brand maker** badge.
- **Fix:** Bisi as the client; a free AI chat account is created here (used from Day 2); step-by-step contrast and font picking; pixel and WCAG explained; purposeful quiz.

### Day 2 · Layouts, wireframes & copy (both tracks)

- **(a)** Figma mentioned without steps (fine as optional). The "send to one friend" check is good. The design brief tool is mentioned but not what to do with the output.
- **(b)** "Hero" (shop window: good). "CTA" is used in the copy rules without definition (defined only on Day 5). "Placeholder" is used without definition. "Conversion" is good.
- **(c)** Yes.
- **(d)** None paid. The "free Claude account" is now created on Day 1.
- **(e)** Good core (wireframe first). "What must the hero include" is fine; the reviews question carries to the portfolio honesty rule. Re-tag.
- **(f)** Sketches: (1) the phone wireframe of Bisi's home page as labelled boxes; (2) the visitor's questions in order: is this for me → can I trust her → how much → how do I order.
- **(g)** Completion: "Bisi's home page is planned", **Planner** badge.
- **Fix:** CTA and placeholder defined; Bisi's real copy as the worked example; prompt for a free AI chat.

### Day 3 · Your AI build setup (both tracks): the biggest change

- **(a)** Installs Node, Git, VS Code and Claude Code in one sitting via the terminal; no screenshots of what success looks like; "copy the command into the terminal" assumes the learner can open a terminal; the Windows `Git Bash` requirement is mentioned once; login flow for Claude Code is one line.
- **(b)** `LTS`, `Git Bash`, `npm run dev`, `Next.js`, `Tailwind`, `mkdir`, `cd` are used before or without analogies. "Terminal" uses an SMS-order analogy (fine) but the concept isn't needed by a beginner.
- **(c)** **No** without a paid plan. With a paid plan, many beginners still fail at the terminal.
- **(d)** **Claude Pro required.** Free alternative: Google Antigravity (free coding agent) + Cloudflare Pages drag-and-drop; free chat + VS Code as the backup.
- **(e)** Recall of what Claude Code and CLAUDE.md are. Doesn't test the core idea (a website is files that hosting puts at a web address) or the habits needed tomorrow (brief first, small specific prompts, what to do at the free message limit).
- **(f)** Sketches: (1) your laptop at home → rented shop (hosting) → street address (web address) → customers; (2) a vague tailoring order vs a clear one (prompting); (3) the build loop: ask → copy → save → open → ask for a change.
- **(g)** Mid-lesson milestone: **your first page is live on the internet** (with the link sent to a friend). Completion: **Live on the internet** badge.
- **Fix:** rewritten as "Your free AI build kit & first live page": folders and files explained, **Google Antigravity** set up click by click as the free default coding agent (with Claude Code as a paid choice and a free-chat backup, each in its own tab), the project brief, the first page built and reviewed, opened locally, then published free on Cloudflare Pages the same day.

### Day 4 · Build a business website (both tracks)

- **(a)** "Paste the endpoint from your Formspree dashboard": where? "Commit after each page" assumes Git. "Press F12 and click the phone icon" is unexplained until Day 6.
- **(b)** "Endpoint", "component" (rubber-stamp analogy, good), "URL" (rooms in a house, good) but used on Day 3 first.
- **(c)** Yes after the Day 3 fix.
- **(d)** Formspree free is 50 messages/month. Web3Forms free is 250 a month, and its key is designed to be public.
- **(e)** Good core (small steps). The WhatsApp link format carries to the CRM lesson; the form test carries to the capstone quality gates. Re-tag.
- **(f)** Sketches: (1) adire stamp → header and footer on every page (component); (2) form → post office (form service) → Bisi's inbox; (3) the phone number → wa.me link.
- **(g)** Mid-lesson milestone: **the first test enquiry lands in the inbox**. Completion: **Site builder** badge.
- **Fix:** plain files with a shared `site.js` for the header and footer, Web3Forms with click-by-click steps, re-publish on Cloudflare, real-phone test.

### Day 5 · Landing pages (both tracks)

- **(a)** The checker step is deferred to deploy day; analytics deferred to Day 7.
- **(b)** "Below the fold", "FAQ schema" used without explanation; "risk reversal" unexplained.
- **(c)** Yes, now that the site is live from Day 3.
- **(d)** None paid.
- **(e)** Good, focused on one-offer-one-action. Re-tag: benefits carry to outreach and proposals; one page per offer carries to the lead-magnet page.
- **(f)** Sketches: (1) a supermarket with many doors vs a hawker selling one thing (website vs landing page); (2) Instagram ad → landing page → one button → WhatsApp chat.
- **(g)** Milestone: **the landing page passes the live checker**. Completion: **One offer, one action** badge.
- **Fix:** Bisi's aso-ebi promo page, built in the same site with no menu, published and checked live.

### Day 6 · Responsive, fast & accessible (both tracks)

- **(a)** "Use a live link (you'll deploy properly tomorrow; any live site works)": the learner can't test their own work. `F12` and the device toolbar aren't walked through.
- **(b)** `KB/MB`, `WebP`, `F12`, `H1/H2` and "screen reader" appear before or without analogies. LCP/INP/CLS are tabled but have no everyday analogy.
- **(c)** Now yes (live since Day 3).
- **(d)** None paid (PageSpeed, Squoosh, WAVE are free).
- **(e)** CLS acronym and "360px" are trivia. Better: what to fix first (photos), test on a cheap phone, alt text (carries to SEO), heading order (carries to SEO).
- **(f)** Sketches: (1) the doctor's three vital signs → Core Web Vitals; (2) an overloaded okada vs a light one (page weight); (3) a ramp beside the stairs (accessibility).
- **(g)** Milestone: **mobile speed score 80+ on the live site**. Completion: **Fast on any phone** badge.
- **Fix:** test the learner's own live link; MB explained through data bundles; Chrome device toolbar step by step; Squoosh walk-through.

### Day 7 · Deploy on your own domain (both tracks)

- **(a)** "Walk me through creating a repository" is delegated to the AI; Vercel import settings skipped; DNS record entry at the registrar isn't shown for any real registrar.
- **(b)** DNS (phone book), domain, hosting are good but hosting arrives on Day 7 although the site's location matters from Day 3. "Environment variable" is fine. "CNAME/A record" not explained.
- **(c)** Free only on a non-commercial plan.
- **(d)** Vercel Hobby is non-commercial; a domain must be bought. Free: GitHub + Cloudflare Pages, free subdomain; domains bought by clients.
- **(e)** Good questions; the "Vercel rebuilds on push" one becomes "every commit updates the live site" (core).
- **(f)** Sketches: (1) the estate gate's address book (DNS) pointing a visitor to the right house; (2) edit → dated version (commit) → site updates itself; (3) client owns the domain vs the developer holds it.
- **(g)** Milestone: **an edit on GitHub updates the live site by itself**; optional milestone: **domain connected**. Completion: **Auto-pilot publisher** badge.
- **Fix:** rewritten as "Go live properly": GitHub in the browser, Cloudflare connected to GitHub, Cloudflare Web Analytics, and the complete client-domain procedure (Cloudflare nameservers, custom domain, padlock), plus free email forwarding.

### Day 8 · Booking systems (both tracks)

- **(a)** Paystack account creation isn't walked through; Cal.com's "redirect after booking" location is vague; "test card" values are given without where to type them.
- **(b)** "Embed" (POS machine analogy: good), "test mode" used without definition.
- **(c)** Yes.
- **(d)** None paid (Cal.com free, Paystack free account, fees only on real payments).
- **(e)** Good core (deposits cut no-shows). Re-tag: Payment Pages carry to the get-paid lesson; client's own account carries to the store.
- **(f)** Sketches: (1) the fitting journey: pick a time → pay deposit → reminder → Bisi measures; (2) the bank's POS on Bisi's counter (embed).
- **(g)** Milestone: **the first test deposit shows in the Paystack dashboard**. Completion: **Booked & paid** badge.

### Day 9 · Online stores & Paystack checkout (both tracks)

- **(a)** Server verification assumed Next.js + Vercel; "add it to Vercel" for secrets; Storefront is a one-line tip.
- **(b)** "Server" (back office, good), "metadata", "API" used without definition.
- **(c)** Needed paid hosting for a client's store.
- **(d)** Free: Paystack Storefront (no code) taught fully first; custom store verified by a free Cloudflare Function.
- **(e)** Strong core ("never trust the browser"). Good forward links (secret key → web app and agent; webhook → automations).
- **(f)** Sketches: (1) the fake bank-alert screenshot vs calling the bank (verification); (2) shop counter → back office (browser vs server); (3) account number vs ATM PIN (public vs secret key).
- **(g)** Milestone: **a test payment verified by your own server**. Completion: **Safe checkout** badge.

### Day 10 · Web apps with logins & databases (both tracks)

- **(a)** `@supabase/ssr`, "SQL migration" and "policies" are delegated to the AI without showing where to paste SQL or how to read the result; Auth "Site URL" setting missing (sign-in links break without it).
- **(b)** "SQL", "Postgres", "publishable key" used without analogies; "hotel key card" isn't everyday for most learners.
- **(c)** Yes on free Supabase, with the free-tier pause explained.
- **(d)** Free; Supabase Pro only as an upgrade for client apps that must never pause.
- **(e)** Good. Core: Row Level Security; ahead: secret key handling, two-user testing (capstone).
- **(f)** Sketches: (1) estate gate (who are you) vs your own locker key (what you may open); (2) the clerk who hands each customer only their own file (RLS).
- **(g)** Milestone: **two test customers, two private views**. Completion: **Data guardian** badge.

### Day 11 · SEO: keywords & on-page (both tracks)

- **(a)** Search Console verification "usually a DNS record" doesn't work on a free subdomain; the sitemap is "ask Claude, Next.js can generate both".
- **(b)** "H1", "JSON-LD", "robots.txt", "crawl/index" unexplained.
- **(c)** Yes with the HTML-file verification method.
- **(d)** None paid.
- **(e)** "What is a keyword" is recall; the title-length number is borderline. Re-centred on the core (customers' words in the places Google reads) and the next lessons (one keyword per page → content; "near me" → Google Business Profile).
- **(f)** Sketches: (1) Google's messenger visiting every shop and writing in a register (crawl → index → results); (2) the plaza directory board (sitemap).
- **(g)** Milestone: **sitemap accepted by Google**. Completion: **Found on Google** badge.

### Day 12 (Fast) / Day 20 (Main) · Build your own portfolio

- **(a)** "Deploy on Vercel with your own domain".
- **(b)** "Niche" used in the headline advice before it's defined (Main Track defines it on Day 21).
- **(c)** Yes, free on `yourname.pages.dev`.
- **(d)** A domain is optional.
- **(e)** Good, but "why must your portfolio be fast" overlaps Day 6. Re-tag: case-study format carries to the capstone.
- **(f)** Sketches: (1) a tailor's display window of finished outfits (portfolio); (2) before → what I built → after (case study).
- **(g)** Milestone: **portfolio live and shared in your WhatsApp bio**. Completion: **Proof on display** badge.
- **Fix:** added to the Main Track (it was missing).

### Day 13 (Fast) · Package, price & pitch

- **(a)** Finding businesses and sending messages are summarised; no tracker template steps.
- **(b)** "Scope", "floor price" fine; "prospect" and "follow-up" used without definition in the Fast Track.
- **(c)** Yes.
- **(d)** None.
- **(e)** "50% deposit" carries to the deliver lesson (good); questionnaire question is recall.
- **(f)** Sketches: (1) the tailor's order slip (scope); (2) three combo plates (packages).
- **(g)** Milestone: **first three pitches sent**. Completion: **First pitches** badge.

### Day 14 (Fast) / Day 25 (Main) · Deliver & get paid

- **(a)** "Share a Vercel preview link".
- **(b)** "Milestone", "scope creep" fine; "care plan" defined only in the Main Track.
- **(c)** Yes.
- **(d)** None.
- **(e)** Good core (deposit before work, balance before launch).
- **(f)** Sketches: (1) the house-building stages, each paid (milestones); (2) extra meat, extra plantain, same price (scope creep).
- **(g)** Milestone: **first payment request sent**; completion: **Paid in full** badge, plus "your first real sale" note.

### Day 12 (Main) · Local SEO & Google Business Profile

- **(a)** Video verification steps are clear; the review-link location in the dashboard is vague.
- **(b)** "Citation" isn't defined; NAP analogy is good.
- **(c)** Yes (needs the owner).
- **(d)** None.
- **(e)** "What does NAP stand for" is trivia: replaced with a mismatch situation.
- **(f)** Sketches: (1) three shops at the market entrance (map pack); (2) the same name on NIN, BVN and bank account (NAP).
- **(g)** Milestone: **profile submitted for verification**. Completion: **On the map** badge.

### Day 13 (Main) · Content that ranks + SEO audit

- **(a)** Publishing articles assumed a blog system; now they're new pages in the site.
- **(b)** Fine; "backlink" not used.
- **(c)** Yes.
- **(d)** None.
- **(e)** Good; the four audit areas carry to lead magnets (the free check-up).
- **(f)** Sketches: (1) the pharmacist's free advice at the counter (content); (2) the mechanic's inspection sheet (audit).
- **(g)** Milestone: **first article live**. Completion: **Week 2 shipped** badge.

### Day 14 (Main) · Map a business's workflows

- **(a)** Good interview steps.
- **(b)** "ROI" analogy is fine; "trigger/filter/action" lacks an everyday frame.
- **(c)** Yes.
- **(d)** None.
- **(e)** The 40-hours maths question is useful (carries to proposals' value pricing).
- **(f)** Sketches: (1) the estate gateman's rule (car arrives → has sticker? → open gate); (2) before/after for Bisi's "your outfit is ready" messages.
- **(g)** Completion: **Time finder** badge.

### Day 15 (Main) · Automations with Make, Zapier & n8n

- **(a)** "Ask Claude to send your contact form's data to the webhook" assumed a server.
- **(b)** "Operation" (prepaid meter: good), "module", "time zone" fine; "API" not used now.
- **(c)** Yes on Make free.
- **(d)** None (Make free 1,000 credits/month).
- **(e)** "Which tool is easiest" is trivia. Replaced with situations (double-recording, scheduled summary).
- **(f)** Sketches: (1) form → webhook letterbox → sheet + owner's phone; (2) the prepaid meter (credits).
- **(g)** Milestone: **first automation runs on real data**. Completion: **Automator** badge.

### Day 16 (Main) · AI agents: personas & knowledge bases

- **(a)** Claude Project steps compressed into one sentence.
- **(b)** "AI model" never defined; "hallucination" behaviour described but not named.
- **(c)** Yes (Claude free plan includes up to five Projects).
- **(d)** None.
- **(e)** Good; re-tagged to the WhatsApp and connect lessons.
- **(f)** Sketches: (1) a new receptionist with the staff handbook and price list (agent = rules + knowledge); (2) the 20-question driving-test route (test script).
- **(g)** Milestone: **agent passes 18 of 20**. Completion: **Agent trainer** badge.

### Day 17 (Main) · WhatsApp bots & customer-service agents

- **(a)** Cloud API steps are summarised; the website agent needs "the Claude API".
- **(b)** "Cloud API", "template message" fine; "opt-in" in passing.
- **(c)** Business-app setup yes; website agent needed a paid API.
- **(d)** Free: Gemini API free tier via a Cloudflare Function; WhatsApp test number.
- **(e)** Pricing facts updated (Oct 2026 change).
- **(f)** Sketches: (1) the shop door open for 24 hours after a customer knocks (service window); (2) the receptionist walking the customer to the manager (handoff).
- **(g)** Milestone: **greeting + away message live on the Business app**; **chat agent answers on the site**. Completion: **Always open** badge.

### Day 18 (Main) · Connect website + automation + agent

- **(a)** Agent → webhook depends on the platform; given concrete free route.
- **(b)** "Normalise" lacks an analogy; NIN for unique key is good.
- **(c)** Yes.
- **(d)** None.
- **(e)** Good (phone normalising carries to capstone testing).
- **(f)** Sketches: (1) three doors (form, chat, WhatsApp) → one customer notebook → owner's phone rings only for hot leads.
- **(g)** Milestone: **one person = one record across two channels**. Completion: **System builder** badge.

### Day 19 (Main) · Monitoring & handover

- **(a)** UptimeRobot steps.
- **(b)** "Uptime" (NEPA light availability is a stronger local analogy).
- **(c)** Yes.
- **(d)** UptimeRobot free is non-commercial; Better Stack free allows it.
- **(e)** Good.
- **(f)** Sketches: (1) smoke alarm (monitor); (2) the "when NEPA takes light" card on the wall (runbook).
- **(g)** Completion: **Week 3 shipped** badge.

### Day 21 (Main) · Find prospects

- **(a)** Good; the sheet columns are listed.
- **(b)** "Scraping" is used in a tool name without definition.
- **(c)** Yes.
- **(d)** None.
- **(e)** "Out of 100, realistic result" is fine; "Why pick a niche" moved to portfolio (where niche is defined).
- **(f)** Sketches: (1) the fishing net (funnel).
- **(g)** Milestone: **top 20 researched**. Completion: **List builder** badge.

### Day 22 (Main) · Lead magnets & qualification

- **(a)** Good.
- **(b)** BANT letters fine.
- **(c)** Yes.
- **(d)** Cal.com free.
- **(e)** "What does the A in BANT stand for" is trivia: replaced with a situation (manager without authority).
- **(f)** Sketches: (1) the free taste of suya (lead magnet).
- **(g)** Completion: **Lead engine** badge.

### Day 23 (Main) · Cold outreach & follow-ups

- **(a)** Good.
- **(b)** Fine.
- **(c)** Yes.
- **(d)** None.
- **(e)** "How many messages a day" is borderline trivia: kept as a habit question tied to the capstone pipeline.
- **(f)** Sketches: (1) four friendly knocks over two weeks (follow-ups).
- **(g)** Milestone: **first 10 messages sent**; **first reply**. Completion: **Conversation starter** badge.

### Day 24 (Main) · Proposals, pricing & packaging

- **(a)** Good.
- **(b)** Fine.
- **(c)** Yes.
- **(d)** None.
- **(e)** Good; value-based pricing uses the ROI number from Day 14.
- **(f)** Sketches: (1) three combo plates with the middle one circled (packages).
- **(g)** Completion: **Deal maker** badge.

### Day 26 (Main) · Capstone

- **(a)** Good checklist; "website live on the client's domain" assumed a purchase.
- **(b)** Fine.
- **(c)** Yes now (client buys domain; everything else free).
- **(d)** None required; upgrades listed for the client to pay once the system earns.
- **(e)** Good.
- **(f)** Sketches: (1) the whole system: shop (site) → bell (automation) → robot (agent) → notebook (CRM) → owner.
- **(g)** Completion: **Prostatis graduate** moment (in addition to the certificate).

---

## How the rewrite is enforced

`src/content/lessons.test.ts` now fails the build when:

- a listed technical term (`src/content/jargon.ts`) is used before a jargon box has explained it, in that lesson or an earlier lesson of the same track;
- a jargon box has no everyday analogy;
- a lesson has fewer than two sketches, no lesson-specific celebration, or no stated core idea;
- a quiz has no question on the core idea, or a question aimed at a "later lesson" that doesn't come later in the track;
- a "coming later" note points to a lesson that isn't later;
- a "You'll need" item asks for money without starting with "Optional".
