import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "responsive-fast-accessible",
  title: "Responsive, fast & accessible",
  minutes: 90,
  outcome: "Your site scores 80+ on mobile speed, looks right on every phone, and passes the basic accessibility checks.",
  intro:
    "Most of your client's customers will visit on a phone, often on 3G or 4G data that costs them money. A slow or broken mobile site loses those customers in seconds. Today you learn the checks professionals run before any site goes live — and how to fix what they find.",
  sections: [
    {
      heading: "Why this matters so much in Nigeria",
      blocks: [
        { t: "list", items: ["Most web traffic in Nigeria comes from phones, many of them budget Android phones.", "Mobile data is expensive — a 5MB page literally costs visitors money.", "Google ranks faster, mobile-friendly sites higher in search.", "People leave slow pages: every extra second of loading loses visitors."] },
        { t: "figure", figure: { tool: "website-speed-checklist", caption: "A speed report: score, page weight, and the biggest things slowing it down." } },
      ],
    },
    {
      heading: "Step 1 — Measure speed",
      blocks: [
        { t: "p", text: "You can't improve what you don't measure. Deploy a preview (or use a site that's already live) and run a speed test." },
        { t: "tool", slug: "website-speed-checklist", why: "Paste any URL — it measures the page weight, finds the heaviest images and scripts, and tells you what to fix first." },
        { t: "p", text: "Google's PageSpeed Insights gives the official score. Aim for **80+ on mobile** (90+ is excellent). The three numbers Google cares about most are called **Core Web Vitals**:" },
        { t: "table", columns: ["Metric", "In plain English", "Good"], rows: [["LCP", "How fast the main content appears", "Under 2.5 s"], ["INP", "How fast the page reacts when tapped", "Under 200 ms"], ["CLS", "How much things jump around while loading", "Under 0.1"]] },
      ],
    },
    {
      heading: "Step 2 — Fix the usual suspects",
      blocks: [
        { t: "p", text: "90% of slow small-business sites have the same problems. Fix these in order:" },
        {
          t: "steps",
          items: [
            { title: "Huge images", detail: "A 4MB photo from a phone camera should be about 100–200KB on a website. Use the WebP format and the right size." },
            { title: "No lazy loading", detail: "Images lower down the page should only load when the visitor scrolls to them." },
            { title: "Too many fonts", detail: "Each font weight is another download. Two fonts, 2–3 weights." },
            { title: "Heavy third-party scripts", detail: "Chat widgets, trackers and embeds can double the page weight. Keep only what earns money." },
          ],
        },
        { t: "prompt", title: "Speed fix prompt", text: "Our mobile PageSpeed score is [score]. The report says: [paste the top issues]. Fix these in order of impact. Use next/image with correct sizes for all images, lazy-load images below the fold, limit fonts to the two in CLAUDE.md with display swap, and remove any unused scripts. Tell me what you changed and why." },
        { t: "tip", text: "Squoosh (free, in your browser) compresses images by hand if you need to shrink a photo before uploading it." },
      ],
    },
    {
      heading: "Step 3 — Test on real phone sizes",
      blocks: [
        { t: "p", text: "Open your site in Chrome, press **F12** (or right-click → Inspect), then click the phone icon to switch to device mode. Test at **360px wide** — the most common Android width — and at 390px (iPhone)." },
        { t: "tool", slug: "responsive-design-checklist", why: "Paste your URL to check the viewport, tap targets and text sizes, then work through the manual checklist." },
        { t: "list", items: ["Nothing scrolls sideways", "Text is 16px or bigger", "Buttons are at least 44px tall, easy to tap with a thumb", "The menu opens and closes", "Phone numbers are tappable to call"] },
        { t: "tip", text: "Nothing beats a real phone. Open your preview link on your own phone and on a cheap Android if you can borrow one." },
      ],
    },
    {
      heading: "Step 4 — Accessibility basics",
      blocks: [
        { t: "p", text: "Accessibility means people with disabilities (for example, people who are blind and use a screen reader, or who can't use a mouse) can use the site. It also makes the site better for everyone — and Google rewards it." },
        { t: "list", items: ["Every image has alt text describing it (e.g. “Jollof rice with chicken”)", "Text has enough contrast (4.5:1 — you checked this on Day 1)", "Every form field has a visible label", "The site works with the keyboard alone: press Tab to move, Enter to click", "Headings go in order: one H1, then H2s, then H3s"] },
        { t: "prompt", title: "Accessibility pass", text: "Do an accessibility pass on the whole site: add descriptive alt text to every image, make sure every form input has a label, check heading order (one h1 per page), make sure all buttons and links are reachable with the keyboard with a visible focus style, and fix any colour contrast below 4.5:1. List every change." },
      ],
    },
  ],
  task: {
    title: "Get your site to pro standard",
    steps: ["Run a speed test and note the score.", "Fix images, fonts and scripts with the speed prompt.", "Re-test and note the new score.", "Check every page at 360px wide and on a real phone.", "Run the accessibility pass and tab through the site with the keyboard."],
    done: ["Mobile speed score is 80 or higher", "No page scrolls sideways at 360px", "Every image has alt text", "I can use the whole site with only the keyboard"],
  },
  resources: [
    { label: "PageSpeed Insights", url: "https://pagespeed.web.dev", note: "Google's official speed test." },
    { label: "web.dev — Core Web Vitals", url: "https://web.dev/articles/vitals", note: "What LCP, INP and CLS mean." },
    { label: "Squoosh", url: "https://squoosh.app", note: "Compress images in your browser." },
    { label: "web.dev — Learn Accessibility", url: "https://web.dev/learn/accessibility", note: "Free, beginner-friendly accessibility course." },
    { label: "WAVE accessibility checker", url: "https://wave.webaim.org", note: "Paste a URL and see accessibility problems highlighted." },
  ],
  quiz: [
    { q: "What mobile PageSpeed score should you aim for before launch?", options: ["20+", "50+", "80+", "It doesn't matter"], answer: 2, why: "80+ is solid; 90+ is excellent." },
    { q: "What is the most common cause of a slow small-business site?", options: ["Too much text", "Huge, uncompressed images", "Using Nigeria as location", "Having a footer"], answer: 1, why: "Phone photos are often 3–5MB; on the web they should be ~100–200KB." },
    { q: "What does CLS measure?", options: ["How much content jumps around while loading", "The cost of the server", "Colour contrast", "The number of links"], answer: 0, why: "CLS (Cumulative Layout Shift) — things jumping around make people tap the wrong thing." },
    { q: "What width should you always test on for Android phones?", options: ["1920px", "1024px", "360px", "100px"], answer: 2, why: "360px is the most common Android viewport width." },
    { q: "Which is an accessibility requirement?", options: ["Every image has descriptive alt text", "Use at least 5 colours", "Autoplay music", "Hide labels to save space"], answer: 0, why: "Alt text lets screen-reader users know what an image shows." },
  ],
};

export default lesson;
