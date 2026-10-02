# Free tools: research, gaps and what was rebuilt

Research and rebuild: October 2026. Covers all 56 free tools (50 core + 6 bonus). For each tool:

- the **real problem** a visitor has when they land;
- the **best existing tools** and where they fall short;
- what **ours does now**;
- an honest **flag** where "better than everything online" isn't possible in a free, no-signup tool.

**Status key:** ✅ rebuilt or upgraded in this pass · ◐ already strong, small fixes · ⚑ known gap (explained).

## The market, in short

**Real checks.** SEOptimer, Seobility, PageSpeed Insights and Mangools run real checks, but the best parts sit behind a paywall or a signup:

- SEOptimer's white-label PDF costs $29 a month.
- Seobility's free crawl is capped.
- Ahrefs Webmaster Tools needs an account.

**AI writing.** Copy.ai (2,000 free words a month), Jasper (paid) and Lavender (5 emails a month free) all have three problems:

- they need an account;
- the copy is generic;
- they don't stop invented reviews, numbers or awards.

**Show it live.** Realtime Colors, Relume and Fontjoy show results live, but none of them hands over to the next step: building, pricing or sending the work to a client.

## Our edge, as built

1. **No signup, ever.** Autosave, share links and one-tap examples on every tool.
2. **Real data wherever a free source exists:**
   - a live page fetch (through `safeFetch`);
   - Google PageSpeed lab results *and* real-visitor (Chrome UX Report) data;
   - domain registry lookups (RDAP);
   - Google's search suggestions for Nigeria;
   - today's exchange rate.
3. **Optional AI writing** on 20 text tools:
   - It writes from the user's own inputs, under fixed honesty rules.
   - Gaps stay in [brackets].
   - The result is checked automatically: any number or big claim the user never gave is flagged before they copy it.
   - It's free to visitors, with per-person and daily limits.
   - The templates keep working without it.
4. **Nigeria-first defaults:** naira, WhatsApp, Paystack, NiRA domains, the cost of a page in mobile data, Nigerian place names.
5. **Hand-over:** every result prints as a clean report (Save as PDF) with an optional "Prepared by" name, and no STEINARK branding forced on it.

## Shared infrastructure

| Piece | Where | What it does | Used by |
|---|---|---|---|
| AI writer | `src/lib/server/ai.ts`, `/api/tools/ai`, `src/lib/tool-defs/ai.ts` | Claude writes structured sections (zod structured output) from the tool's inputs. The browser sends only the slug and inputs; the server builds the prompt, so the endpoint can't be used as a general chatbot. Limits: 4 a minute and 25 a day per visitor, plus a site-wide daily cap (`AI_TOOLS_DAILY_LIMIT`, default 300). The model comes from `AI_TOOLS_MODEL` (default `claude-opus-5-5`), with `effort: low`. **Off unless `ANTHROPIC_API_KEY` is set**, and then the button is hidden. | Hero copy, landing page copy, wireframe, design brief, FAQ, WhatsApp catalog, blog topics, backlink outreach, GBP posts, meta tags, autoresponders, lead magnets, follow-ups, chatbot persona, customer service, handoff, cold DM, proposal, hook lines, WhatsApp bio |
| Honesty check | `flagClaims()` | Any number, star rating or "best / #1 / guaranteed" claim in the AI output that isn't in the user's facts is shown in a red "Check before you use it" box | All AI results |
| Search suggestions | `suggest` in `/api/tools/analyze`, `src/lib/tool-defs/suggest.ts` | Asks Google's autocomplete (Nigeria, English) up to 16 starter searches, then: removes foreign places and languages; sorts phrases into *hire nearby / looking for a provider / checking prices / questions / other*; filters out job seekers and students as *not customers*. Gives a keyword map and a CSV. Cached 10 minutes. | Keyword research, blog topics, SEO content brief, FAQ generator |
| Exchange rate | `/api/tools/fx`, `kit/live-rate.tsx` | Today's USD→NGN rate (ExchangeRate-API's open endpoint, credited), cached 6 hours. One tap to use it, with a note that cards charge more. | Client pricing calculator, token cost calculator, Get Paid generator (naira equivalent of a dollar request) |
| Real-visitor speed + data cost | `pagespeed()` in the analyze route, `renderSpeed()` | Chrome UX Report LCP, INP and CLS (75th percentile, page or whole site) next to the Lighthouse test. Also the cost of one visit in naira at ₦750/GB (MTN's 2GB monthly bundle is ₦1,500), using Lighthouse's true page weight. | Website speed checklist |
| Site crawl | `crawl` in the analyze route, `src/lib/tool-defs/crawl.ts` | Up to 10 pages from `sitemap.xml` (or the home page's links), shortest paths first. Finds duplicate titles and descriptions, missing titles and descriptions, H1 problems, thin pages, noindex, slow pages and broken pages. Tests up to 30 more internal links (HEAD, then GET on 403/405). | On-page SEO audit |
| Pixel widths | `src/lib/tool-defs/pixels.ts` | Arial glyph widths. Titles are cut at about 600px; descriptions at about 920px on desktop and 680px on phones, on a word boundary with "…", the way Google does. | Meta tag generator, its live check, every Google preview |
| Printable report | `blocksToHtml()`, `printHtml()` | Escaped, print-friendly HTML from any result, with an optional "Prepared by" | Every live check, checklist and generator result |
| Palette maths | `src/lib/tool-defs/color.ts` | Contrast solving, 50–950 shade scales, colour-blind simulation (Machado 2009) and main colours from a logo | Colour palette generator |

**Verified on live data (2 Oct 2026):**

- **Search suggestions:** "web design, Lagos" returned 111 real phrases from Google Nigeria. Foreign cities and SS2 or course searches were then filtered out.
- **Whole-site check on nextjs.org:** 10 pages in about 5 seconds. It found two pages with the same title and six with the same description.
- **Speed check on jumia.com.ng:** real-visitor LCP 5.7s, INP 605ms, CLS 0.35, all rated "slow" by Google. Page weight 1.3MB, about ₦1 of data per visit.
- **Exchange rate:** ₦1,328.65 per $1.

---

## Web design

### 1. Color Palette Generator ✅
- **Problem:** "I need brand colours that look professional *and* are readable, and I don't know which colour goes where."
- **Best existing:**
  - Coolors: fast, with a colour-blind view.
  - Realtime Colors: shows the palette on a page.
  - Adobe Leonardo: builds colours to a contrast target.
  - uicolors.app: shade scales.
- **Gaps:** each does one slice. Leonardo is hard for beginners, and none of them takes colours from a logo *and* fixes contrast.
- **Ours now:**
  - "Pick from logo": the image is read in the browser and never uploaded.
  - Link, muted-text and button colours are **solved** to pass 4.5:1. A brand colour too light for button text gets a nearby "Button" shade.
  - A live mini-website preview with Normal, Red-green (deutan), Red-green (protan) and Blue-yellow views.
  - A check that the brand colour and accent stay distinct for colour-blind visitors.
  - A 50–950 shade scale, CSS, a Tailwind v4 theme and a "tell your AI" block.
  - Tests confirm every example palette passes its own checks.
- **Flag:** none.

### 2. Layout / Wireframe Generator ✅
- **Problem:** "What sections does this page need, in what order, and what goes in each?"
- **Best existing:** Relume (AI sitemap and wireframe, limited free tier); Uizard and Visily (signup).
- **Ours now:**
  - Section plans by page type, with each section's job.
  - A build prompt and a client approval message.
  - **A downloadable `index.html` starter page:** phone-first CSS, every section in place, [bracketed] copy slots and WhatsApp buttons.
  - With AI on, the actual words for every section.
- **⚑ Flag:** there's no drag-and-drop canvas like Relume or Figma; a beginner who builds with an AI agent gets more from a working starter page.

### 3. Hero Section Copy Generator ✅
- **Problem:** "My headline says 'Welcome to X'."
- **Best existing:** Copy.ai, Jasper, Writesonic. All need signup, all are generic, and they happily write "#1 in Lagos".
- **Ours now:** formula combinations always run. With AI on: 5 headlines, 3 subheadlines, button text and a risk-reducing line, all from the real facts, with invented claims flagged.
- **⚑ Flag:** without the AI key, the copy is formula-based, which is weaker than an AI copywriter.

### 4. Font Pairing Picker ✅
- **Problem:** "Which two fonts suit this business, and how do I load them without slowing the site?"
- **Best existing:** Fontjoy (endless AI pairs), FontPair (curated), Google Fonts.
- **Ours now:**
  - Curated pairs per mood, previewed live.
  - Next.js and plain HTML loading code.
  - A **type scale** for phone and laptop (H1 32→48px … body 16→18px), with `clamp()` CSS.
  - How many font files the pair loads.
- **⚑ Flag:** a curated list rather than endless pairs. That's deliberate: fewer, safer choices for beginners.

### 5. Logo Concept Prompt Generator ◐
- **Ours:** prompts in five directions for free image tools, a negative prompt, and a judging checklist.
- **⚑ Flag:** we don't generate the images. Image generation for everyone can't be offered free; the prompts are built for the free image makers taught in the course.

### 6. Brand Style Guide Generator ◐
- **Ours:** a one-page guide: voice, colours with readable text colours, fonts, and do's and don'ts. Markdown, print/PDF and a project-brief block.
- **Flag:** none.

### 7. Website Design Brief Generator ✅
- **Ours:** a brief, call questions and a sign-off message. With AI on, it turns rough call notes into a tidy brief the client can approve.
- **Flag:** none.

## Web development

### 8. Tech Stack Picker ✅
- **Problem:** "What do I build this with, what will it cost each month, and who pays?"
- **Before:** recommended Vercel, Next.js and Formspree for everything. Vercel's free plan doesn't allow paid client work.
- **Ours now, the course's free stack:**
  - **Code and styling:** plain HTML, CSS and a little JavaScript, plus one style.css.
  - **Hosting:** Cloudflare Pages, free and allowed for business sites.
  - **Forms and bookings:** Web3Forms, and Cal.com plus a Paystack deposit.
  - **Payments:** Paystack Payment Pages and Storefront.
  - **Apps:** Supabase plus Cloudflare Pages Functions.
  - **Analytics:** Cloudflare Web Analytics.
  - **Next.js:** only for experienced builders making apps, with an honest note about hosting it.
  - An honest cost table that says who pays, and a kick-off prompt for the AI builder.
- **Flag:** none.

### 9. AI Project Brief Generator (was "CLAUDE.md Generator") ✅
- **Ours now:** one brief for all three builders:
  - `notes/brief.md` for Antigravity, with the "Read the project brief first" habit;
  - `CLAUDE.md` for Claude Code;
  - paste-first for a free chat.
- The defaults use the course's preview-and-publish flow, and secrets go in Cloudflare's Variables and Secrets.

### 10. Component Prompt Library ◐ · 11. Bug / Error Debug Prompt ◐
- Prompts and error help now point to "your AI builder" instead of Claude Code only. The debug example uses the course stack.

### 12. Website Speed Checklist ✅
- **Problem:** "Is the site slow on Nigerian mobile data, and what do I fix first?"
- **Best existing:** PageSpeed Insights (jargon-heavy), GTmetrix (signup for mobile tests), WebPageTest.
- **Ours now:**
  - **Real visitors first:** Chrome UX Report LCP, INP and CLS in plain words, with "good is under…".
  - Then Google's phone test, its screenshot and its top fixes.
  - Our own weighing of every image, script and stylesheet.
  - **What each visit costs in naira**, and per 1,000 visits.
  - Items that pass are ticked automatically, and the fix list is ordered by impact.
  - A printable report for before-and-after.
- **⚑ Flags:**
  - Real-visitor data only exists once enough Chrome users visit; small sites get a plain note saying so.
  - Google's test needs `PAGESPEED_API_KEY` (free); without it, our own scan still runs.

### 13. Responsive Design Checklist ◐
- **Ours:** viewport, font size and tap-target results from Lighthouse, Google's phone screenshot, and the hands-on checklist.
- **⚑ Flag:** there's no real-device farm (BrowserStack is paid). We show Google's phone render and teach testing on a real phone.

### 14. Domain Name Idea Generator ◐
- **Ours:** ideas, plus a **live registry check** (RDAP) of up to 20 names at once.
- **⚑ Flag:** NiRA's lookup service (rdap.nic.net.ng) answers for taken `.ng` names but often times out on free ones. Those show "? Check manually" rather than a guess.

## Web solutions

### 15. Requirements Questionnaire ◐ · 16. Booking Feature Picker ◐ · 19. Pricing Layout Picker ◐ · 21. Testimonial Formatter ◐
- Already useful and Nigeria-specific; unchanged apart from printable results.
- The testimonial tool never adds words the customer didn't say.

### 17. WhatsApp Catalog Setup Guide ✅
- With AI on: catalog entries ("Name | Price | Description under 300 characters"), a price-list quick reply and share messages.

### 18. Landing Page Copy Generator ✅
- With AI on: the whole page in the order visitors decide, including 5 doubts answered as Q&A. Invented proof is flagged.
- **⚑ Flag:** as for the hero tool, it's best with the AI key.

### 20. FAQ Section Generator ✅
- **New:** a "What you sell" field and **"Get real questions"**, which shows the questions people in Nigeria ask Google before buying.
- With AI on, it writes answers only from the given facts, with [gaps] where a fact is missing.
- It already tells users that Google no longer shows FAQ rich results for most sites.

## SEO

### 22. Keyword Research Tool (was "Keyword Research Prompt Generator") ✅
- **Problem:** "What do people in my city actually type into Google?"
- **Best existing:**
  - Google Keyword Planner: free, but needs an Ads account and gives vague ranges.
  - Ahrefs and Semrush: paid.
  - AnswerThePublic: limited free use.
  - Keywordtool.io: volumes are paid.
- **Ours now:**
  - **Live phrases from Google Nigeria**, sorted by intent.
  - Job seekers, students and other countries filtered out.
  - A keyword map built from the real phrases, and a CSV for Google Sheets.
- **⚑ Flag:** **no search volumes or difficulty scores.** Those need paid data or a Google Ads account. The tool says so and points to Keyword Planner and Search Console.

### 23. Meta Title / Description Generator ✅
- **Best existing:** Mangools SERP Simulator and Portent (pixel-based), Yoast (inside WordPress only).
- **Ours now:**
  - **Pixel-accurate** widths and cut-off previews for desktop and phone.
  - The live check reports the current tags in pixels.
  - Options built from keyword, benefit and call to action, plus 5+5 AI options.
  - Code to paste.
- **Flag:** none. Google changes its layout now and then, so the tool calls the widths "close guides".

### 24. Local SEO Checklist ◐
- **Ours:** a live website scan for schema, map, click-to-call and address, a GBP checklist with fixes, Nigerian directories, and a printable score and fix list.
- **⚑ Flag:** we can't read a Google Business Profile's live data. That needs Google's paid Places API or the owner's login, so those items are ticked by hand.

### 25. On-Page SEO Audit ✅
- **Best existing:** SEOptimer (PDF report $29/month), Seobility (capped free crawl).
- **Ours now:**
  - A 16-point audit of one page, from its link or pasted HTML.
  - **A whole-site check of up to 10 pages.**
  - **A free printable client report** with your name on it.
- **⚑ Flag:** no backlink data; that needs a paid link index.

### 26. Blog Topic Generator ✅
- Topic types ordered closest-to-buying first, plus **real questions from Google**.
- With AI on: 10 topics with angles, and the 3 to write first.
- **⚑ Flag:** no traffic estimates (paid data).

### 27. Backlink Outreach Scripts ✅
- Short emails by outreach type, where to find Nigerian link opportunities, and rules against link schemes.
- With AI on: three versions with a [personal first line] to fill in after reading the target site.
- **⚑ Flag:** no prospect database (paid tools like Pitchbox).

### 28. SEO Content Brief Generator ✅
- An outline by page type, a must-include list, the AI writing prompt, and **real reader questions** for the FAQ section.
- **⚑ Flag:** paid tools (Frase, Surfer, Clearscope) analyse the current top 10 results. Scraping Google's results isn't allowed for a free tool, so we use real search suggestions instead.

### 29. Google Business Profile Post Generator ✅
- Posts within the limits, button and date guidance, a photo checklist, and 4 AI posts with photo ideas.
- **⚑ Flag:** we can't publish to the profile; that needs the owner's Google login.

## AI business automation

### 30. Automation Idea Generator ◐ · 32. Process Audit ◐ · 34. ROI Calculator ◐ · 36. MCP Server Picker ◐
- Already useful; unchanged apart from printable results.
- **⚑ ROI calculator:** no "what if it only saves half" view yet.

### 31. Zapier / Make Scenario Planner ◐
- Usage is now counted in Make's **credits** (Make bills in credits; the free plan has 1,000 a month) or Zapier tasks, against the free plan.

### 33. Email Autoresponder Generator ✅
- With AI on: an instant reply, timed follow-ups and a WhatsApp version.

### 35. Token Cost Calculator ✅
- Claude list prices, checked 30 September 2026.
- Per-request and monthly cost in dollars and **naira at today's rate**.
- A "cheaper model" saving hint.
- **⚑ Flag:** prices change; the tool shows the date they were checked and where to confirm them. It doesn't cover Gemini's free tier yet (the Main Track lesson covers that).

## Lead generation

### 37. Cold DM / Email Script Generator ✅
- Messages built from your research note, per channel, with spam-rule notes.
- With AI on: 3 versions under 80 words and 2 follow-ups.
- **⚑ Flag:** we don't scrape LinkedIn for icebreakers. Paid tools do, and it breaks LinkedIn's terms.

### 38. Lead Magnets ✅ · 40. Follow-Up Sequence ✅
- AI versions added. Unchanged otherwise.

### 39. Prospect List Builder ◐ · 41. Web Scraper Config ◐ · 42. Lead Qualification ◐ · 43. Landing Page Checklist ◐
- Search strings and a CSV tracking sheet; a live selector test and a Node script; scoring with the next message; a live landing-page scan.
- **⚑ Flags:**
  - The prospect builder doesn't scrape Google Maps (against Google's terms).
  - Use the scraper only on sites whose terms allow it.

## AI agents for business

### 44. Chatbot Persona ✅ · 45. Customer Service Scripts ✅ · 50. Handoff Scripts ✅
- AI versions added: a ready system prompt and 10 tricky test questions; replies per situation; customer and staff handoff messages.

### 46. WhatsApp Bot Flow ◐ · 47. Agent Task Decomposer ◐ · 48. FAQ-to-Knowledge Base ◐ · 49. Agent Monitoring Checklist ◐
- Flows with Meta's rules, knowledge bases cleaned to Markdown/JSON with gaps flagged, a live uptime check, and a 20-question test script.
- **⚑ Flag:** we don't host bots. The Main Track teaches that on free plans.

## Bonus tools

| Tool | Status | What changed | Gap |
|---|---|---|---|
| Proposal Generator | ✅ | AI writes the persuasive parts from call notes, using only the prices and timeline given | No multi-option package builder yet |
| Client Pricing Calculator | ✅ | Today's USD→NGN rate, one tap to use it | - |
| Get Paid Generator | ✅ | Shows the naira equivalent of a dollar request at today's rate (on screen only, not printed) | No reminder schedule yet |
| WhatsApp Business Bio | ✅ | AI versions within the 139-character "About" limit, plus greeting and away messages | - |
| Cron Schedule Generator | ✅ | Free targets: a Cloudflare Worker (`wrangler.toml`), GitHub Actions and crontab. Free-plan limits listed: Cloudflare allows 5 cron triggers per account; GitHub schedules run at most every 5 minutes; Make runs at most every 15 minutes | - |
| Hook Line Generator | ✅ | AI hooks from the real offer; claims checked | - |

## What it needs from the site owner

- **AI writing:** add `ANTHROPIC_API_KEY` (and optionally `AI_TOOLS_MODEL`, `AI_TOOLS_DAILY_LIMIT`) in the host's environment settings, then redeploy. The tool pages are static, so the button appears after a rebuild.
  - **Cost:** with the default `claude-opus-5-5` ($4 / $20 per million tokens), a typical tool write is roughly 1–2 thousand tokens in and out.
  - **Cheaper model:** `AI_TOOLS_MODEL=claude-sonnet-5-5` ($2 / $10) roughly halves the cost.
  - **Ceiling:** the daily cap is the hard limit on spending.
- **Speed tests:** `PAGESPEED_API_KEY` is already set.
- **Limits:** the rate limits are per server instance, so a fully durable limit would need a database counter.
