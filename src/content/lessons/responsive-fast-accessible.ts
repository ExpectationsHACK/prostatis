import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "responsive-fast-accessible",
  title: "Responsive, fast & accessible",
  minutes: 90,
  outcome: "Your site scores 80+ on mobile speed, looks right on every phone, and passes the basic accessibility checks.",
  intro:
    "Picture a customer in Aba on a budget Android phone, on 3G, with ₦500 of data left. Your site takes 12 seconds to load a giant photo, and they're gone, with a little less data than before. Most of your clients' customers are on phones, many on slow or expensive data. Today you learn the checks professionals run before any site goes live, and how to fix what they find.",
  youNeed: ["Your site from Days 4–5", "Google Chrome on your computer", "Your own phone (a cheap Android is even better for testing)", "A free image compressor: squoosh.app"],
  sections: [
    {
      heading: "Why this matters so much in Nigeria",
      blocks: [
        { t: "list", items: ["Most web visits in Nigeria come from phones, many of them budget Androids.", "Mobile data costs money. A heavy page literally costs your visitor money to open.", "Google shows faster, mobile-friendly pages more readily in search results.", "People leave slow pages. Every extra second of waiting loses visitors."] },
        { t: "define", term: "Responsive design", meaning: "A website that rearranges itself to fit any screen, one column on a phone, more columns on a laptop, without anything spilling off the side.", like: "water poured into different cups. Same water, it takes the shape of each cup." },
        { t: "figure", figure: { diagram: "breakpoints", caption: "One website, three screen sizes. The layout changes; the content stays the same." } },
      ],
    },
    {
      heading: "Step 1: Measure speed",
      blocks: [
        { t: "p", text: "You can't improve what you don't measure. Use a live link (you'll deploy properly tomorrow; any live site works for practice) and run a speed test." },
        { t: "tool", slug: "website-speed-checklist", why: "Paste any link: it measures the page weight, finds the heaviest images and scripts, and tells you what to fix first." },
        { t: "p", text: "Google's free **PageSpeed Insights** gives the official score from 0 to 100. Aim for **80 or more on mobile** (90+ is excellent). Google cares most about three measurements, called **Core Web Vitals**:" },
        { t: "table", columns: ["Name", "In plain English", "Good"], rows: [["LCP: Largest Contentful Paint", "How fast the main content (usually the big image or headline) appears", "2.5 seconds or less"], ["INP: Interaction to Next Paint", "How fast the page reacts when you tap something", "200 milliseconds or less"], ["CLS: Cumulative Layout Shift", "How much things jump around while loading", "0.1 or less"]] },
        { t: "define", term: "Page weight", meaning: "The total size of everything a page downloads, text, images, fonts, scripts, measured in KB or MB. Lighter pages load faster and use less of the visitor's data.", like: "luggage. The heavier the bag, the slower you walk, and the more the airline charges." },
        { t: "check", q: "While a page loads, the button jumps down just as you're about to tap it, and you tap an advert instead. Which measurement is bad?", options: ["LCP", "INP", "CLS"], answer: 2, why: "CLS measures layout shift: things jumping around while the page loads." },
        { t: "try", title: "Test a real Nigerian website", minutes: 5, steps: ["Open pagespeed.web.dev.", "Paste the website of any Nigerian business you know.", "Look at the Mobile score and the three Core Web Vitals. Note the top suggestion."] },
      ],
    },
    {
      heading: "Step 2: Fix the usual suspects",
      blocks: [
        { t: "p", text: "Most slow small-business sites have the same four problems. Fix them in this order:" },
        {
          t: "steps",
          items: [
            { title: "Huge images", detail: "A phone camera photo is often 3–5 MB. On a website it should usually be about 100–200 KB, in the WebP format, and no wider than it's shown." },
            { title: "No lazy loading", detail: "Images further down the page should only load when the visitor scrolls to them." },
            { title: "Too many fonts", detail: "Every font style is another download. Keep to your two fonts and 2–3 weights." },
            { title: "Heavy extra scripts", detail: "Chat widgets, trackers and embedded videos can double the page weight. Keep only what earns money." },
          ],
        },
        { t: "define", term: "Lazy loading", meaning: "Waiting to download an image until the visitor is about to see it, instead of loading everything at once.", like: "a waiter bringing each course when you're ready, instead of dumping the whole meal on the table at once." },
        { t: "prompt", title: "Speed fix prompt", text: "Our mobile PageSpeed score is [score]. The report says: [paste the top issues]. Fix these in order of impact. Use next/image with correct sizes for every image, lazy-load images below the first screen, keep only the two fonts in CLAUDE.md with font-display swap, and remove unused scripts. Tell me what you changed and why." },
        { t: "tip", text: "To shrink a photo by hand before uploading, open squoosh.app, drop the photo in, choose WebP, and watch the size fall, often by 90%." },
        { t: "scenario", title: "The 9 MB home page", text: "A restaurant owner uploaded six photos straight from her phone: over 9 MB for one page. On 3G that's a very long wait, and a real cost to every visitor. After compressing to WebP and resizing, the same page was under 1 MB and looked identical. Nothing about the design changed; only the file sizes did." },
      ],
    },
    {
      heading: "Step 3: Test on real phone sizes",
      blocks: [
        { t: "p", text: "In Chrome, press **F12** (or right-click → Inspect), then click the **phone icon** to see your site at phone size. Test at **360px wide**, very common on Android, and at 390px (a common iPhone width)." },
        { t: "tool", slug: "responsive-design-checklist", why: "Paste your link to check the viewport, tap targets and text sizes, then work through the checklist." },
        { t: "list", items: ["Nothing scrolls sideways", "Body text is 16px or bigger", "Buttons are big enough for a thumb, around 44px tall is a good rule", "The menu opens and closes", "Phone numbers can be tapped to call"] },
        { t: "tip", text: "Nothing beats a real phone. Open your link on your own phone, and on a cheap Android if you can borrow one." },
      ],
    },
    {
      heading: "Step 4: Accessibility basics",
      blocks: [
        { t: "define", term: "Accessibility", meaning: "Making sure everyone can use the site, including people who are blind and use a **screen reader** (software that reads the page aloud), people who can't use a mouse, and people with poor eyesight.", like: "a ramp next to the stairs. It helps wheelchair users, and also mothers with buggies and people carrying heavy loads." },
        { t: "define", term: "Alt text", meaning: "A short description of an image, hidden in the page code. Screen readers read it aloud, and it shows if the image fails to load. Example: “Jollof rice with fried chicken and plantain”.", like: "a caption for someone who can't see the photo." },
        { t: "list", items: ["Every meaningful image has alt text describing it", "Text passes the 4.5 : 1 contrast rule (Day 1)", "Every form box has a visible label", "The whole site works with the keyboard alone: **Tab** moves, **Enter** clicks", "Headings go in order: one main title (H1) per page, then H2s, then H3s"] },
        { t: "prompt", title: "Accessibility pass", text: "Do an accessibility pass on the whole site: add descriptive alt text to every meaningful image, make sure every form input has a visible label, check heading order (one h1 per page), make sure all buttons and links can be reached with the keyboard and show a visible focus outline, and fix any text colour below 4.5:1 contrast. List every change." },
        { t: "try", title: "Use your site without a mouse", minutes: 5, steps: ["Open your site and click once on the address bar.", "Press **Tab** repeatedly. Can you always see where you are?", "Reach the main button and press **Enter**. Does it work?"] },
        { t: "mistakes", items: [{ wrong: "Uploading photos straight from the phone", right: "Compress to WebP and resize before uploading" }, { wrong: "Testing only on a big laptop screen", right: "Test at 360px and on a real phone" }, { wrong: "alt=\"image1.jpg\"", right: "alt=\"Fresh jollof rice with fried plantain\"" }] },
      ],
    },
  ],
  task: {
    title: "Get your site to professional standard",
    steps: ["Run a speed test and write down the mobile score.", "Fix images, fonts and scripts with the speed prompt.", "Test again and write down the new score.", "Check every page at 360px wide and on a real phone.", "Run the accessibility pass, then use the site with only the keyboard."],
    done: ["Mobile speed score is 80 or higher", "No page scrolls sideways at 360px", "Every meaningful image has descriptive alt text", "I can use the whole site with only the keyboard"],
  },
  recap: [
    "Aim for a mobile **PageSpeed score of 80 or more** before launch (90+ is excellent).",
    "The most common cause of slow small-business sites is **huge, uncompressed images**, phone photos of 3–5 MB that should be about 100–200 KB.",
    "**CLS** measures how much the page **jumps around while loading**; good is 0.1 or less.",
    "Always test at **360px wide**, a very common Android screen width, and on a real phone.",
    "**Alt text** describes an image for screen readers; every meaningful image needs it.",
  ],
  resources: [
    { label: "PageSpeed Insights", url: "https://pagespeed.web.dev", note: "Google's official speed test." },
    { label: "web.dev: Core Web Vitals", url: "https://web.dev/articles/vitals", note: "What LCP, INP and CLS mean, from Google." },
    { label: "Squoosh", url: "https://squoosh.app", note: "Compress images in your browser." },
    { label: "web.dev: Learn Accessibility", url: "https://web.dev/learn/accessibility", note: "Free, beginner-friendly accessibility course." },
    { label: "WAVE accessibility checker", url: "https://wave.webaim.org", note: "Paste a link and see accessibility problems highlighted." },
  ],
  quiz: [
    { q: "What mobile PageSpeed score should you aim for before launch?", options: ["20+", "50+", "80+", "It doesn't matter"], answer: 2, why: "80+ is solid; 90+ is excellent.", from: 0 },
    { q: "What is the most common cause of a slow small-business site?", options: ["Too much text", "Huge, uncompressed images", "Having a footer", "Using naira prices"], answer: 1, why: "Phone photos are often 3–5 MB; on the web they should be about 100–200 KB.", from: 1 },
    { q: "What does CLS measure?", options: ["How much the page jumps around while loading", "The cost of hosting", "Colour contrast", "The number of links"], answer: 0, why: "Cumulative Layout Shift: things jumping around make people tap the wrong thing.", from: 2 },
    { q: "Which screen width should you always test for Android phones?", options: ["1920px", "1024px", "360px", "100px"], answer: 2, why: "360px is a very common Android screen width.", from: 3 },
    { q: "What is alt text for?", options: ["Making images load faster", "Describing an image for screen readers and when it fails to load", "Adding a watermark", "SEO tricks only"], answer: 1, why: "Screen readers read alt text aloud, so blind visitors know what the image shows.", from: 4 },
  ],
};

export default lesson;
