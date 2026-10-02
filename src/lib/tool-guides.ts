/**
 * The "app wrapper" for every free tool: the problem it solves, exactly how to use it, what
 * you walk away with, and what to do with the result. Shown around the tool on its page.
 */
export type ToolGuide = {
  /** The pain, in the user's words. */
  problem: string;
  /** What they walk away with. */
  get: string;
  /** Rough minutes to a usable result. */
  minutes: number;
  /** Explicit, numbered instructions. */
  steps: [string, string, string];
  /** What to do with the result, in order. */
  next: string[];
};

export const guides: Record<string, ToolGuide> = {
  // ---------- Web design ----------
  "color-palette-generator": {
    problem: "You picked colours you like, but the site looks messy and some text is hard to read on a phone.",
    get: "A palette whose text and link colours are adjusted until they pass readability rules, a live website preview with a colour-blind view, shade scales, and CSS and Tailwind code to paste.",
    minutes: 2,
    steps: ["Tap “Pick from logo” and choose the business's main colour (or type its hex code).", "Choose a harmony and watch the website preview change; switch the colour-blind views to check buttons still stand out.", "Make sure every readability check passes, then copy the CSS or Tailwind block."],
    next: ["Paste the code into your project (or tell your AI builder: “use these colours”).", "Add the hex codes to the brand kit.", "Test your text colour on the WebAIM contrast checker if you change anything."],
  },
  "wireframe-generator": {
    problem: "You start building and keep moving sections around, or the client wants changes after it's built.",
    get: "A section-by-section page plan and a ready prompt to build it with AI.",
    minutes: 3,
    steps: ["Choose the page type and type the business name.", "Tick any extra sections the business needs (pricing, booking, gallery…).", "Read the plan top to bottom: does it answer promise → proof → details → questions → action?"],
    next: ["Send the wireframe to the client on WhatsApp and get a yes before building.", "Copy the build prompt into your AI builder (Antigravity or Claude Code).", "Write the words for each section with the Hero and Landing Page copy tools."],
  },
  "hero-copy-generator": {
    problem: "Your headline says “Welcome to…” and visitors leave without understanding what the business offers.",
    get: "Five headline + subhead + button combinations, each built around the customer's result.",
    minutes: 3,
    steps: ["Fill in what the business sells, who buys it and the result they get, in plain words.", "Add real proof if you have it (rating, number of customers).", "Read the five options aloud and pick the one a customer would understand in 5 seconds."],
    next: ["Put the winner in the top of the page, with the button visible on a phone.", "Test two headlines with real people: ask “what does this business offer?”", "Use the same promise in the page's title tag (Meta Tag Generator)."],
  },
  "font-pairing-picker": {
    problem: "You're guessing at fonts, and the site ends up with four of them, or one that's hard to read.",
    get: "Three tested heading + body pairings for the mood, with live previews and the code.",
    minutes: 2,
    steps: ["Pick the mood that matches the brand's three voice words.", "Compare the live previews: read the body text as a customer would.", "Copy the pair you like into the brand kit."],
    next: ["Ask your AI builder to load only the font weights you use.", "Keep body text at 16px or bigger.", "Add the fonts to your project brief so every page uses them."],
  },
  "logo-concept-prompts": {
    problem: "The client needs a logo, you're not a designer, and random AI images all look generic.",
    get: "Five precise image prompts: wordmark, lettermark, symbol, emblem and negative space.",
    minutes: 3,
    steps: ["Enter the name, industry, mood, a simple symbol idea and 1–2 colours.", "Copy each prompt into an AI image tool and generate a few of each.", "Shortlist 3 concepts that are still clear when shrunk to a phone icon."],
    next: ["Show the client the shortlist, not all of them.", "Simplify the winner (or have a designer redraw it as a clean vector).", "Check it isn't similar to an existing brand before using it."],
  },
  "brand-style-guide": {
    problem: "Every post, page and AI output looks slightly different, so the brand never feels professional.",
    get: "A one-page style guide: mission, audience, voice, colours, fonts, do's and don'ts, in Markdown.",
    minutes: 4,
    steps: ["Enter the name, mission and audience in one sentence each.", "Pick the voice words, paste the two colours and the two fonts.", "Check both colours pass the readability score, then copy the guide."],
    next: ["Save it as the client's brand kit (Google Doc or Notion).", "Paste it into your project brief so the AI follows it.", "Send it to the client with the website handover."],
  },
  "design-brief-generator": {
    problem: "Projects drift because nobody wrote down the goal, the pages, the deadline or the budget.",
    get: "A signed-off design brief you build from: goal, audience, pages, look, references, deadline, budget.",
    minutes: 5,
    steps: ["Fill it in live with the client on the first call.", "Add 2–3 websites the client likes as references.", "Read it back to them and get a “yes, that's right” before the call ends."],
    next: ["Send the brief by email or WhatsApp and ask for a written OK.", "Use it to write the proposal and price.", "Keep it open while you build. It's your checklist."],
  },

  // ---------- Web development ----------
  "tech-stack-picker": {
    problem: "You don't know what to build the project with, or what hosting it will cost the client.",
    get: "A recommended stack built on free tools first (Cloudflare Pages, Web3Forms, Supabase, Paystack), the real monthly cost and who pays, and a kick-off prompt for your AI builder.",
    minutes: 2,
    steps: ["Pick the project type and your skill level.", "Answer whether the client edits content, how they take payment, and expected traffic.", "Read the “why” column: make sure every choice makes sense for this client."],
    next: ["Put the costs into your proposal (hosting is free; the domain is the client's, in their name).", "Paste the kick-off prompt into your AI builder in a new project folder.", "Record the stack in your project brief."],
  },
  "claude-md-generator": {
    problem: "Every new AI session forgets your rules, colours, stack and “mobile-first”, so you repeat yourself.",
    get: "A ready project brief your AI builder reads at the start of every session: notes/brief.md for Antigravity, CLAUDE.md for Claude Code, or paste it first in a free chat.",
    minutes: 4,
    steps: ["Describe the project and the business in a sentence or two.", "Fill in the stack, the brand rules and the do's and don'ts.", "Download the file and save it in the root of your project folder."],
    next: ["Start every request with “Read the project brief first and follow it.” (Claude Code reads CLAUDE.md by itself).", "Add a rule every time you catch yourself repeating an instruction.", "Keep the brief with your project files."],
  },
  "component-prompt-library": {
    problem: "You ask AI for “a pricing section” and get something generic, broken on phones or inaccessible.",
    get: "Precise, copy-ready prompts for common components, with your stack and brand baked in.",
    minutes: 2,
    steps: ["Choose the component group (layout, content, commerce, forms…).", "Pick your stack and describe your brand style in one line.", "Copy the prompt for the component you need."],
    next: ["Paste it into your AI builder and review the plan before approving.", "Check the result at 360px wide and with the keyboard.", "Commit once it works."],
  },
  "debug-prompt-template": {
    problem: "Something broke, you told the AI “it's not working”, and it made things worse.",
    get: "A structured debugging prompt with the error, context and what you've tried, plus quick hints.",
    minutes: 3,
    steps: ["Paste the exact error message (copy it: don't retype it).", "Say what you expected, what happened instead, and what you already tried.", "List the files involved, then copy the prompt."],
    next: ["Paste it into your AI builder and let it explain the cause before changing code.", "Apply one fix at a time, then test.", "Commit once it works so you have a safe point."],
  },
  "website-speed-checklist": {
    problem: "The site feels slow on phones, visitors leave, and you don't know what to fix first.",
    get: "A live speed scan of any link: what real visitors experienced (Google's Chrome data), Google's phone test, what each visit costs in mobile data, and a fix list ordered by impact.",
    minutes: 3,
    steps: ["Paste the website's link into the live check and run it.", "Tick anything else you've confirmed by hand.", "Copy the fix list: work from the top down."],
    next: ["Fix images first (they're usually the biggest win).", "Run the check again and note the new score for the client.", "Print the report for the client (Save as PDF) before and after the fixes."],
  },
  "responsive-design-checklist": {
    problem: "The site looks great on your laptop but breaks on the client's phone.",
    get: "A live mobile scan plus a checklist and fix list for layout, text, tap targets and forms.",
    minutes: 5,
    steps: ["Run the live check on the site's link.", "Open the site on a real phone (and at 360px in Chrome DevTools).", "Tick each item that passes, then copy the fix list."],
    next: ["Fix sideways scrolling and tiny text first.", "Re-test on a real phone.", "Keep the passed checklist as part of your handover."],
  },
  "domain-name-generator": {
    problem: "Every good name seems taken, and you waste an hour checking domains one by one.",
    get: "Short, sayable domain ideas, and a live check of which are actually available.",
    minutes: 3,
    steps: ["Type the main word, an optional extra word and a location.", "Choose the ending (.com, .ng, .com.ng).", "Press “Check availability” and shortlist 3 that are free."],
    next: ["Say each shortlisted name out loud on a pretend phone call, keep the clearest.", "Buy it in the client's name at a registrar.", "Connect it to the site (Deploy lesson)."],
  },

  // ---------- Web solutions ----------
  "website-requirements-questionnaire": {
    problem: "You quote a price, then discover the client also wants bookings, payments and ten more pages.",
    get: "A requirements document, a content checklist for the client, and a build-time estimate.",
    minutes: 6,
    steps: ["Go through it with the client on a call.", "Tick what they already have and every feature they want.", "Add notes in their words, then copy the document."],
    next: ["Send the content checklist to the client straight away.", "Use the estimate to price your package.", "Attach the document to your proposal as the agreed scope."],
  },
  "booking-feature-picker": {
    problem: "You're about to build a booking system and don't know which features actually matter for this business.",
    get: "Must-have vs later features for the business type, the simplest approach, and a build prompt.",
    minutes: 2,
    steps: ["Pick the business type and roughly how many bookings a week.", "Say whether no-shows are a problem.", "Read the plan: build the “must have” list first."],
    next: ["Start with the suggested approach (often a scheduler + deposit link).", "Copy the build prompt only if a custom build is truly needed.", "Test by booking yourself, and trying to double-book."],
  },
  "whatsapp-catalog-guide": {
    problem: "A small seller loses sales answering “how much?” and “what do you have?” all day on WhatsApp.",
    get: "Catalog-ready product text, step-by-step setup, and messages to share the catalog.",
    minutes: 5,
    steps: ["List each product as: name | price | short description.", "Add the delivery or pickup note.", "Copy each item into the WhatsApp Business catalog, following the steps."],
    next: ["Post the catalog link on WhatsApp status and in the Instagram bio.", "Add an “Order on WhatsApp” button on the website.", "Update prices in the catalog whenever they change."],
  },
  "landing-page-copy-generator": {
    problem: "You have an offer and an ad budget, but no page that turns visitors into buyers.",
    get: "Full landing page copy: hero, problem, benefits, how it works, offer, guarantee, FAQ, final call.",
    minutes: 5,
    steps: ["Describe the offer, who it's for, their pain and the result they want.", "List 3 benefits, the price, a guarantee (if any) and the button text.", "Read the copy aloud and replace every [placeholder] with real proof."],
    next: ["Build the page with the Landing Pages lesson prompt.", "Run the Landing Page Checklist on the live link.", "Send ad traffic only after two people can say what the page offers."],
  },
  "pricing-layout-picker": {
    problem: "Your pricing section confuses people, so they message to ask instead of buying.",
    get: "The layout that fits your offer, conversion rules, and a build prompt.",
    minutes: 2,
    steps: ["Choose how many options you sell and how people pay.", "Say who's buying (individuals or businesses).", "Read the rules, then copy the build prompt."],
    next: ["Put the option you most want to sell in the middle, marked “most popular”.", "Show prices in one currency per card.", "Check the section on a phone, the recommended card should show first."],
  },
  "faq-generator": {
    problem: "Customers keep asking the same questions, and some leave to ask a competitor instead.",
    get: "A FAQ that answers price, time, trust, area and contact questions in the business's facts.",
    minutes: 4,
    steps: ["Fill in the real facts: what you sell, price range, turnaround time, proof, guarantee, area and hours.", "Press “Get real questions” to see what people ask Google, and add the ones you can answer honestly.", "Edit any answer that doesn't sound like the business."],
    next: ["Add the FAQ near the bottom of the service or landing page.", "Paste the same answers into the chatbot's knowledge base.", "Update it whenever a new question comes up twice."],
  },
  "testimonial-formatter": {
    problem: "You have happy messages in WhatsApp, but they're messy screenshots nobody reads.",
    get: "A clean testimonial, a short pull-quote and a star version, ready for the website.",
    minutes: 2,
    steps: ["Paste the customer's message exactly as they sent it.", "Add their name (first name + initial is fine), role and rating.", "Pick the version that keeps their real meaning."],
    next: ["Send the cleaned version to the customer and get a “yes” to publish it.", "Put it next to the booking or buy button.", "Collect one new testimonial every week."],
  },

  // ---------- SEO ----------
  "keyword-research-prompts": {
    problem: "You don't know what customers type into Google, so the site doesn't show up for the right searches.",
    get: "The real phrases people in Nigeria type into Google, sorted by what they want (hire nearby, compare prices, ask questions), with the job-seekers filtered out and a keyword map for the site.",
    minutes: 3,
    steps: ["Enter the service in the words customers use, and the city or area.", "Press “Get real searches” to pull live suggestions from Google Nigeria.", "Give each page one main phrase from the keyword map; use the questions for the FAQ and articles."],
    next: ["Make a keyword map: one main keyword per page.", "Write titles and descriptions with the Meta Tag Generator.", "Plan articles for the “learn” keywords with the Blog Topic tool."],
  },
  "meta-tag-generator": {
    problem: "The page shows up in Google with a boring or cut-off title, so nobody clicks.",
    get: "Title and description options measured in pixels the way Google cuts them, a desktop and phone preview, and the code to paste.",
    minutes: 3,
    steps: ["Optionally check the page's current tags with the live check.", "Enter the brand, the page's main keyword, the benefit and the call to action.", "Pick a title that fits in 600 pixels and a description of 120–155 characters that isn't cut off."],
    next: ["Paste the tags into the page (or ask your AI builder to set them).", "Do this for every page, each needs its own.", "Re-check the live link to confirm the new tags are there."],
  },
  "local-seo-checklist": {
    problem: "The business doesn't appear on Google Maps when people nearby search for what it sells.",
    get: "A local SEO score for the business, and a fix list. Google profile, reviews, website and listings.",
    minutes: 6,
    steps: ["Run the live scan on the business's website.", "Tick the Google Business Profile items you've checked.", "Copy the fix list: high-impact items first."],
    next: ["Fix the primary category and NAP first.", "Start the review request routine this week.", "Re-score monthly and show the client the progress."],
  },
  "on-page-seo-audit": {
    problem: "A page isn't ranking and you don't know which of the dozen on-page basics is missing.",
    get: "A 16-point audit of any page, a whole-site check of up to 10 pages (duplicate titles, missing headings, broken links), and a printable report for the client.",
    minutes: 3,
    steps: ["Enter the page's main keyword.", "Run the page audit on its link (or paste the HTML), then the whole-site check on the home page.", "Fix the failed checks from the top down, and print the report."],
    next: ["Re-run the audit after fixing to confirm the score went up.", "Repeat for every important page.", "Send the printed report (Save as PDF) to the client with your quote."],
  },
  "blog-topic-generator": {
    problem: "You know content helps, but you have no idea what to write that brings in buyers.",
    get: "Blog topics grouped by type: cost, comparison, how-to, local, mistakes, checklists.",
    minutes: 2,
    steps: ["Enter what the business does, who the customers are and where.", "Press “Get real questions” to see what people ask Google, then choose topic types.", "Pick 3 topics: cost and checklist topics first."],
    next: ["Make a content brief for each with the SEO Content Brief tool.", "Publish one a week, each linking to a service page.", "Track which ones bring enquiries in Search Console."],
  },
  "backlink-outreach-scripts": {
    problem: "Other websites don't link to yours, so Google doesn't trust it enough to rank it.",
    get: "Short, specific outreach emails for guest posts, resource pages and broken links, plus a follow-up.",
    minutes: 3,
    steps: ["Choose the outreach type and the site you're contacting.", "Enter your name, site and the article idea.", "Personalise the first line with a real article of theirs."],
    next: ["Send about 10 personalised emails a day, never bulk.", "Follow up once after 5 days.", "Never pay for links or join link schemes."],
  },
  "seo-content-brief": {
    problem: "AI-written articles come out vague and don't rank because nobody planned them.",
    get: "A complete brief: keyword, intent, title, description, outline, must-includes and tone.",
    minutes: 3,
    steps: ["Enter the main keyword, related keywords and the page type.", "Describe the reader and the target length.", "Check the outline answers what the reader really wants to know."],
    next: ["Give the brief to your AI (or a writer) to draft the article.", "Edit, fact-check and add the owner's real experience.", "Publish with the suggested title and link it to a service page."],
  },
  "gbp-post-generator": {
    problem: "The business's Google profile looks abandoned, no updates in months.",
    get: "Ready Google Business Profile posts for offers, updates and events, with a button suggestion.",
    minutes: 2,
    steps: ["Pick the post type: offer, update or event.", "Enter the headline, details, area and dates.", "Choose the version that sounds most like the business."],
    next: ["Post it with a real, bright photo.", "Add the suggested button.", "Schedule one post a week, offers expire, updates stay."],
  },

  // ---------- Automation ----------
  "automation-idea-generator": {
    problem: "You know automation saves time, but not which automation to offer this particular business first.",
    get: "Proven automation ideas for the business type, trigger, action and time saved.",
    minutes: 2,
    steps: ["Pick the business type.", "Tick the tools they already use.", "Start with the first idea. It usually pays back fastest."],
    next: ["Put numbers on it with the Automation ROI Calculator.", "Plan the steps with the Scenario Planner.", "Pitch it to the owner with the saving in naira."],
  },
  "zapier-make-scenario-planner": {
    problem: "You open Make or Zapier and get lost in modules, or build something that breaks the first week.",
    get: "A module-by-module plan, the credits (Make) or tasks (Zapier) it will use each month against the free plan, and a go-live checklist.",
    minutes: 4,
    steps: ["Pick the platform and describe the trigger in one line.", "List each step on its own line, in order.", "Enter roughly how many times a month it will run."],
    next: ["Build it module by module in the tool, following the plan.", "Run 5 test records end to end.", "Turn on error alerts before switching it on for real."],
  },
  "business-process-audit": {
    problem: "The owner says “we're always busy” but can't say where the hours go, so nothing changes.",
    get: "A ranked list of tasks to automate, with hours and naira saved per year.",
    minutes: 5,
    steps: ["List each repeated task as: task | hours per week | how repetitive (1–5).", "Enter what an hour of their time is worth, in naira.", "Read the ranking: automate from the top."],
    next: ["Show the owner the yearly saving at the top.", "Pick the top 3 tasks and plan them.", "Price the project with the ROI calculator."],
  },
  "email-autoresponder-generator": {
    problem: "Enquiries sit unanswered for days, and customers go elsewhere.",
    get: "An instant auto-reply plus a short follow-up sequence for the situation.",
    minutes: 2,
    steps: ["Pick the situation (new enquiry, order, booking…).", "Enter the business name, reply time and a useful link.", "Replace any {{tags}} your email tool doesn't support."],
    next: ["Set it up in Gmail, Brevo or Mailchimp.", "Send yourself a test email to see it arrive.", "Review replies monthly and update the wording."],
  },
  "automation-roi-calculator": {
    problem: "The owner asks “is it worth it?” and you can only say “it'll save time”.",
    get: "Monthly saving, payback time, first-year gain and a ready pitch line, in naira.",
    minutes: 2,
    steps: ["Enter the hours the task takes each week and what an hour is worth.", "Enter how much the automation cuts it, and any money lost to errors.", "Enter your setup fee and the monthly tool cost."],
    next: ["Copy the pitch line into your proposal.", "Use the payback time to justify your price.", "Re-run it after launch with real numbers for a case study."],
  },
  "token-cost-calculator": {
    problem: "You're about to price an AI chatbot or feature but have no idea what the AI will cost each month.",
    get: "A monthly AI cost estimate in dollars and naira, per model, for your use case.",
    minutes: 2,
    steps: ["Pick the use case and how many times a day it runs.", "Set today's naira-to-dollar rate.", "Compare the models: pick the cheapest one that does the job well."],
    next: ["Add a safety margin and put the cost in your proposal.", "Set a monthly spending limit with the AI provider.", "Re-check with real usage after the first week."],
  },
  "mcp-server-picker": {
    problem: "You want an AI assistant to reach a business's files, data or payments, but don't know how to connect it.",
    get: "The MCP servers to consider for each need, what each does, and where the official docs are.",
    minutes: 2,
    steps: ["Tick what the AI needs to reach (files, web, payments, calendar…).", "Read what each suggested server can do.", "Open the official docs for the ones you'll use."],
    next: ["Connect one server at a time and test it.", "Give each the least access it needs.", "Keep keys out of shared files."],
  },

  // ---------- Lead generation ----------
  "cold-dm-script-generator": {
    problem: "You send “Do you need a website?” and nobody replies.",
    get: "A short, specific first message and follow-ups, written for the channel you're using.",
    minutes: 3,
    steps: ["Pick the channel and the business you're contacting.", "Add one specific observation from your research.", "Copy the message and personalise the first line."],
    next: ["Send it: one by one, never in bulk.", "Log it in your tracker with the follow-up dates.", "Follow up with the Follow-Up Sequence tool."],
  },
  "lead-magnet-ideas": {
    problem: "Strangers ignore your offers because you ask for money before giving anything.",
    get: "Lead magnet ideas with titles, why each works and how close to buying it attracts people.",
    minutes: 2,
    steps: ["Describe what you sell and to whom.", "Name the main problem your customers have.", "Pick one idea you can deliver in under an hour."],
    next: ["Make one real sample.", "Build a page for it with the landing page tools.", "Offer it in every outreach message."],
  },
  "prospect-list-builder": {
    problem: "You don't know where to find businesses that need what you sell.",
    get: "Search strings for Google and Maps, a research prompt, and a ready sheet layout.",
    minutes: 3,
    steps: ["Enter the niche and the city.", "Choose the buying signal you're looking for.", "Copy the searches and the sheet columns into a Google Sheet."],
    next: ["Collect 100 businesses by hand from the searches.", "Score them and research the top 20.", "Contact the best ones first."],
  },
  "follow-up-sequence-generator": {
    problem: "Prospects don't reply to your first message, and you don't know what to send next.",
    get: "A 4-step follow-up sequence that adds something useful each time.",
    minutes: 2,
    steps: ["Choose the channel and enter the prospect's business.", "Describe your free offer and a useful extra (like a short video).", "Replace any [placeholder] with something true."],
    next: ["Put the follow-up dates in your tracker.", "Send each one personally, on its day.", "Stop politely after the last one."],
  },
  "web-scraper-config": {
    problem: "Copying business listings from a directory by hand takes hours.",
    get: "A scraper configuration, a live selector test, and a ready-to-run Node.js script.",
    minutes: 8,
    steps: ["Check the directory's terms allow collecting its public listings.", "Enter the page link and the CSS selectors for each field, then test them live.", "Copy the script and run it on your computer."],
    next: ["Open the CSV in Google Sheets and clean it.", "Score the businesses before contacting anyone.", "Never scrape Google Maps or personal data."],
  },
  "lead-qualification": {
    problem: "You spend hours on proposals for people who never had the budget or the authority to buy.",
    get: "A score out of 15 and a clear decision: send a proposal, nurture, or pass.",
    minutes: 1,
    steps: ["Right after the first call, pick the answer for each question.", "Read the verdict.", "Follow the next step it gives you."],
    next: ["“Go”: send the proposal within 24 hours.", "“Nurture”: set a reminder to check in next month.", "“Pass”: thank them and move on."],
  },
  "landing-page-checklist": {
    problem: "You're about to spend money on ads, but you're not sure the page will turn visitors into buyers.",
    get: "A live scan, a conversion score and a fix list ordered by impact.",
    minutes: 5,
    steps: ["Run the live scan on the page's link.", "Judge the copy items honestly and tick what passes.", "Copy the fix list and work from the top."],
    next: ["Fix everything marked high impact before spending on ads.", "Re-scan and aim for 80+.", "Ask two strangers what the page offers."],
  },

  // ---------- AI agents ----------
  "chatbot-persona-builder": {
    problem: "Your chatbot invents prices, promises discounts and never knows when to hand over to a human.",
    get: "A complete system prompt: personality, can/can't rules, facts, handoff, plus test messages.",
    minutes: 5,
    steps: ["Name the assistant, the business and the channel.", "Tick what it may do, list what it must never do, and paste the real facts.", "Copy the system prompt and run the test messages."],
    next: ["Paste it into your bot platform (or a Claude or Gemini project) with the knowledge base.", "Run a 20-question test script and fix failures.", "Re-test whenever prices or rules change."],
  },
  "customer-service-scripts": {
    problem: "Support replies are inconsistent: some polite, some not, some wrong.",
    get: "Approved reply scripts for common situations, with clear handoff points.",
    minutes: 3,
    steps: ["Enter the business, its refund policy and hours.", "Tick the situations it deals with.", "Edit each script so it matches the real policy."],
    next: ["Add the scripts to the agent's knowledge base as approved replies.", "Train human staff with the same scripts.", "Update them when policies change."],
  },
  "whatsapp-bot-flow-builder": {
    problem: "You want a WhatsApp bot but don't know how the conversation should flow.",
    get: "A visual menu flow, the exact message texts, and a build spec for any WhatsApp platform.",
    minutes: 4,
    steps: ["Write the greeting.", "List each menu option as: option | what happens.", "Write a friendly message for when the bot doesn't understand."],
    next: ["Build it on an official WhatsApp platform (Business app or Cloud API).", "Always keep a “talk to a person” option.", "Test every path yourself before customers do."],
  },
  "agent-task-decomposer": {
    problem: "“Make an AI do my outreach” is too vague for any agent to do well.",
    get: "The job broken into clear steps, with tools, checks and human approval points, plus agent instructions.",
    minutes: 3,
    steps: ["Describe the job in one sentence, including how often it runs.", "Tick the tools the agent can use.", "Choose what needs your approval before it happens."],
    next: ["Paste the instructions into your agent tool.", "Run it once while watching every step.", "Keep the approval step for anything that leaves the business."],
  },
  "faq-to-knowledge-base": {
    problem: "The business's answers are scattered across chats and notes, so the chatbot can't use them.",
    get: "A clean knowledge base in Markdown and JSON, with missing answers flagged.",
    minutes: 3,
    steps: ["Paste the questions and answers in any rough format.", "Check the count of pairs found and any missing answers.", "Fill in missing answers with the owner, then copy."],
    next: ["Upload the Markdown to your bot platform (or a Claude or Gemini project).", "Agree who updates it and how often.", "Re-run the bot's test script after each update."],
  },
  "agent-monitoring-checklist": {
    problem: "The bot or automation breaks on a Saturday and the client finds out before you do.",
    get: "A live uptime check and a checklist for reliability, quality, cost and safety.",
    minutes: 6,
    steps: ["Run the live uptime check on the agent's website or webhook.", "Tick each item you've set up.", "Copy the fix list: high-impact items first."],
    next: ["Set up an uptime monitor with alerts to your phone.", "Set a monthly AI spending limit.", "Put the checklist in the client's handover pack."],
  },
  "handoff-script-generator": {
    problem: "When the bot can't help, customers get stuck, or have to explain everything again to a person.",
    get: "Handoff rules, the messages customers see, and the summary note staff receive.",
    minutes: 3,
    steps: ["Tick when the bot should hand over.", "Enter who takes over, how fast they reply, and the working hours.", "Copy the customer messages and the staff note."],
    next: ["Add the rules to the bot's instructions.", "Test it with an angry message and a refund request.", "Make sure the bot pauses once a person takes over."],
  },

  // ---------- Bonus: getting paid ----------
  "proposal-generator": {
    problem: "You had a great call, then took three days to send a messy proposal, and lost the client.",
    get: "A clear proposal: situation, outcome, scope, timeline, price and next step, ready to send.",
    minutes: 5,
    steps: ["Fill in the client's situation in their own words.", "Add the package, timeline and payment terms.", "Read it as the client: is the next step obvious?"],
    next: ["Send it within 24 hours of the call.", "Follow up after 3 days if there's no reply.", "When they approve, send the deposit request."],
  },
  "client-pricing-calculator": {
    problem: "You don't know what to charge, so you guess low, especially with clients abroad paying in dollars.",
    get: "Your minimum hourly rate in dollars and naira, and a floor price for common projects, built from what you actually need to earn.",
    minutes: 3,
    steps: ["Enter your monthly take-home goal and the hours you work each week.", "Add your AI tool costs, other monthly costs, any platform fee and today's exchange rate.", "Read your floor rate and project floors, never quote below them."],
    next: ["Quote per project based on the value to the client, starting above the floor.", "Offer a smaller package instead of dropping your price.", "Re-run it whenever your costs or the exchange rate change."],
  },
  "invoice-generator": {
    problem: "The work is done but the payment is late, because the request was unclear or easy to ignore.",
    get: "A clean payment request in naira or dollars, with a reference, due date and how to pay.",
    minutes: 3,
    steps: ["Enter your details and the client's.", "Add what it's for, the amount and a due date.", "Add how to pay (bank, Paystack link, or USD account), then print or save as PDF."],
    next: ["Send it the day the milestone is reached.", "Send a friendly reminder 3 days before it's due.", "Record it in your tracker until it's paid."],
  },
  "whatsapp-business-bio": {
    problem: "The business's WhatsApp profile is empty, so customers don't know what it sells or when it's open.",
    get: "A WhatsApp Business bio within the character limit, plus greeting and away messages.",
    minutes: 2,
    steps: ["Enter the business, what it sells and where.", "Pick a tone.", "Copy the bio (it's checked for length) and the messages."],
    next: ["Paste them into WhatsApp Business → Business tools.", "Turn on the greeting and away messages.", "Add quick replies for the top questions."],
  },
  "cron-schedule-generator": {
    problem: "Your automation should run “every weekday at 8am” but the tool wants a cryptic cron code, in UTC.",
    get: "The cron expression, a plain-English check, and the next run times in Lagos time.",
    minutes: 2,
    steps: ["Pick how often it should run.", "Set the time in Lagos time.", "Check the next run times look right, then copy the expression."],
    next: ["Paste it into your automation or scheduler.", "Set the tool's time zone to Africa/Lagos if it has one.", "Watch the first real run to confirm."],
  },
  "hook-line-generator": {
    problem: "People scroll past your posts before reading the second line.",
    get: "Scroll-stopping first lines for your topic and platform.",
    minutes: 2,
    steps: ["Enter what you do and who it's for.", "Pick the platform.", "Choose 2–3 hooks that are true for your work."],
    next: ["Write the post under the hook with one clear idea.", "End with a simple call to action (e.g. the free check-up).", "Track which hooks bring replies and reuse the style."],
  },
};
