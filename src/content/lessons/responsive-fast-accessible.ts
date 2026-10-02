import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "responsive-fast-accessible",
  title: "Fast on any phone, usable by everyone",
  minutes: 100,
  outcome: "Bisi's live site scoring 80 or more for mobile speed, with light photos, no sideways scrolling on any phone, and the basic checks that let everyone (including blind visitors) use it.",
  intro:
    "Picture Bisi's customer in Aba: a budget Android phone, a slow connection, and ₦500 of data left. She taps Bisi's link. The gallery downloads six photos straight from Bisi's phone camera, about 4 megabytes each, and she waits, and waits, and leaves, with less data than before. Most of your clients' customers are on phones, many on slow or expensive data. Today you'll run the checks professionals run before showing a site to anyone, on **your own live site**, and fix what they find. You'll finish with a score you can screenshot.",
  core: "Test like a real customer on a cheap phone with slow data: make the photos light first, then fix the layout and access, and measure again.",
  youNeed: ["Your live site from Days 3 to 5", "Google Chrome on your computer", "Your own phone (a budget Android is perfect for testing)", "The original photos you used, saved on your computer"],
  sections: [
    {
      heading: "Why this matters so much in Nigeria",
      blocks: [
        { t: "list", items: ["Most web visits in Nigeria come from phones, many of them budget Androids.", "Mobile data costs money. A heavy page literally costs your visitor money to open.", "Google tends to favour pages that are fast and work well on phones.", "People leave slow pages. Every extra second of waiting loses visitors."] },
        {
          t: "define",
          term: "Responsive design",
          like: "an adjustable iro (wrapper): the same cloth wraps neatly around any waist, slim or full.",
          meaning: "A website that rearranges itself to fit any screen: one column on a phone, more columns on a laptop, with nothing spilling off the side.",
        },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Not responsive", nodes: [{ draw: "phone", label: "page spills off the side" }, { draw: "cross", label: "pinch, zoom, leave" }] },
            right: { title: "Responsive", nodes: [{ draw: "phone", label: "one neat column", hot: true }, { draw: "check", label: "read, tap, order" }] },
          },
          caption: "The same page on the same phone: left, a layout made for laptops that customers must pinch and drag; right, a layout that rearranges itself into one column.",
        },
        { t: "figure", figure: { diagram: "breakpoints", caption: "One website, three screen sizes. The layout changes; the content stays the same." } },
      ],
    },
    {
      heading: "Step 1: Measure your live site",
      blocks: [
        { t: "p", text: "You can't improve what you don't measure. Because your site is live, you can measure the real thing right now." },
        {
          t: "define",
          term: "Page weight",
          like: "the load on an okada: the heavier the load, the slower it moves, and the more fuel it burns.",
          meaning: "The total size of everything a page downloads: words, photos, fonts and scripts, measured in KB or MB. Heavy pages load slowly and cost the visitor more data.",
        },
        { t: "tool", slug: "website-speed-checklist", why: "Paste your live address: it measures the page weight, finds the heaviest photos and files, and tells you what to fix first." },
        {
          t: "steps",
          items: [
            { title: "Open PageSpeed Insights", detail: "Google's free official test: go to `pagespeed.web.dev`." },
            { title: "Paste your address", detail: "Paste your `.pages.dev` address (try the home page and the gallery) and click **Analyze**. Wait about 30 seconds." },
            { title: "Read the Mobile score", detail: "Make sure the **Mobile** tab is selected. The big number (0 to 100) is the score. Aim for **80 or more**; 90+ is excellent. Write down today's number." },
            { title: "Read the top suggestions", detail: "Scroll to **Diagnostics** or **Opportunities**. The first items are usually about images. That's where you'll start." },
          ],
        },
        {
          t: "define",
          term: "Core Web Vitals",
          also: ["LCP", "INP", "CLS"],
          like: "a doctor's three vital signs (temperature, pulse and blood pressure): three quick numbers that say how healthy you are.",
          meaning: "Google's three health checks for a page: **LCP** (how fast the main content appears; good is 2.5 seconds or less), **INP** (how fast the page reacts when you tap; good is 200 milliseconds or less) and **CLS** (how much things jump around while loading; good is 0.1 or less).",
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "clock", label: "LCP: how fast it appears" }, { draw: "bolt", label: "INP: how fast it reacts" }, { draw: "warning", label: "CLS: how much it jumps", hot: true }] },
          caption: "A page's three vital signs, like a doctor's quick check: the time until the main photo or headline appears, the delay after a tap, and how much the layout jumps while loading.",
        },
        { t: "check", q: "As a page loads, the button jumps down just as you tap, and you tap the wrong thing. Which vital sign is bad?", options: ["LCP", "INP", "CLS"], answer: 2, why: "CLS measures layout shift: things jumping around while the page loads." },
        { t: "try", title: "Test a real Nigerian website", minutes: 5, steps: ["Open pagespeed.web.dev.", "Paste the website of any Nigerian business you know.", "Note its Mobile score and its top suggestion. You've just done the first step of a professional website check."] },
      ],
    },
    {
      heading: "Step 2: Make the photos light",
      blocks: [
        { t: "p", text: "A phone camera photo is often 3 to 5 MB. On a website, a photo should usually be about **100 to 200 KB**: twenty times smaller, and on a phone screen it looks the same." },
        {
          t: "define",
          term: "WebP",
          like: "packing clothes in a vacuum bag for a trip: the same clothes, a fraction of the space in the box.",
          meaning: "A modern photo format that keeps photos looking the same at a much smaller file size. Every current browser shows it.",
        },
        {
          t: "steps",
          items: [
            { title: "Open Squoosh", detail: "Go to `squoosh.app` (free, from Google; your photos stay on your computer)." },
            { title: "Drop in a photo", detail: "Drag one photo from your computer onto the page, or click to choose it." },
            { title: "Choose WebP", detail: "On the right side, under **Compress**, choose **WebP**. Set **Quality** around 75." },
            { title: "Resize it", detail: "Switch on **Resize** and set the width to **1200** for a big top photo or **800** for gallery photos." },
            { title: "Check and download", detail: "The new size shows at the bottom right. Aim for 100 to 200 KB. Click the download button and save it into `site/images`." },
            { title: "Point the pages at the new photos", detail: "Ask your builder: “I put .webp versions of the photos in site/images with the same names. Update every page to use them.” Check, then deploy." },
          ],
        },
        {
          t: "sketch",
          sketch: {
            layout: "versus",
            left: { title: "Straight from the phone", nodes: [{ draw: "camera", label: "4 MB each, slow" }] },
            right: { title: "After Squoosh", nodes: [{ draw: "camera", label: "WebP, 150 KB, same look", hot: true }] },
          },
          caption: "The same gallery photo before and after: from about 4 MB to about 150 KB, looking identical on a phone screen. Six photos go from a long wait to almost instant.",
        },
        {
          t: "define",
          term: "Lazy loading",
          like: "the waiters at an owambe bringing each tray as guests reach their table, instead of dumping all the food at the gate at once.",
          meaning: "Waiting to download a photo until the visitor is about to scroll to it, instead of loading everything at once. The first screen appears much faster.",
        },
        { t: "prompt", title: "Speed fixes", text: "Our mobile PageSpeed score is [score]. The top suggestions are: [paste them]. Fix these in order of impact, in plain HTML and CSS: add loading=\"lazy\" to every image below the first screen; give every image its width and height so nothing jumps while loading; keep only the two Google Fonts in the brief with display=swap; remove anything not used. Tell me in plain English what you changed and why." },
        {
          t: "scenario",
          title: "Bisi's 9 MB gallery",
          text: "Bisi sent you twelve photos straight from her phone, and you used them as they were: the gallery page weighed over 9 MB. On a slow connection that's a long wait and a real cost to every visitor. After Squoosh, the same twelve photos added up to under 2 MB, and the page looked exactly the same. Nothing about the design changed, only the file sizes.",
        },
      ],
    },
    {
      heading: "Step 3: Check every page at phone size",
      blocks: [
        {
          t: "define",
          term: "Developer tools",
          also: ["F12"],
          like: "the mechanic's diagnosis machine he plugs into a car: it shows what's happening inside without opening the engine.",
          meaning: "A hidden panel in Chrome for checking pages. One of its buttons shows your site at any phone's size. Open it with **F12** (or right-click the page → **Inspect**; Mac: **Cmd+Option+I**).",
        },
        {
          t: "steps",
          items: [
            { title: "Open your live site in Chrome", detail: "Use your `.pages.dev` address, not the file on your computer." },
            { title: "Open developer tools", detail: "Press **F12**. A panel opens on the side or bottom." },
            { title: "Switch to phone view", detail: "Click the small **phone-and-tablet icon** at the top left of the panel (its name is **Toggle device toolbar**). The page shrinks to a phone shape." },
            { title: "Set the width", detail: "At the top of the page, choose **Dimensions: Responsive** and type **360** in the width box. Scroll through every page. Then try **390**, a common iPhone width." },
          ],
        },
        { t: "tool", slug: "responsive-design-checklist", why: "Paste your live address to check phone settings, tap sizes and text sizes automatically, then work through the hands-on list." },
        { t: "list", items: ["Nothing scrolls sideways", "Body text is 16 pixels or bigger", "Buttons are big enough for a thumb: about 44 pixels tall", "The menu opens and closes", "Phone numbers can be tapped to call"] },
        {
          t: "errors",
          items: [
            { see: "The page slides sideways at 360 pixels wide", means: "Something is wider than the screen: often a wide photo, a table or a long unbroken word.", fix: "Tell your builder: “At 360 pixels wide, [page name] scrolls sideways. Find what's too wide and fix it.”" },
          ],
        },
        { t: "tip", text: "Nothing beats a real phone. Open your link on your own phone, on mobile data (not Wi-Fi), and on a cheap Android if you can borrow one." },
      ],
    },
    {
      heading: "Step 4: Usable by everyone",
      blocks: [
        {
          t: "define",
          term: "Accessibility",
          like: "a ramp next to the stairs at a hospital entrance. It lets wheelchair users in, and also helps mothers with prams and people carrying heavy loads.",
          meaning: "Making sure everyone can use the website, including blind and partially sighted people, people who can't use a mouse, and people with poor eyesight. It's also good for everyone else.",
        },
        {
          t: "define",
          term: "Screen reader",
          like: "a grandchild reading the newspaper aloud to a grandfather who can no longer see the print.",
          meaning: "Software that reads a page aloud for blind and partially sighted people, and lets them move through it with the keyboard or simple gestures.",
        },
        {
          t: "define",
          term: "Alt text",
          like: "describing a photo to a friend on a phone call: “It's Bisi's green boubou with gold embroidery on the neckline.”",
          meaning: "A short description of an image, hidden in the page. Screen readers say it aloud, and it shows if the image fails to load. Every meaningful photo needs one.",
        },
        {
          t: "define",
          term: "Heading levels",
          also: ["H1"],
          like: "a newspaper: one big front-page headline, the smaller headline of each story, then the little sub-headings inside a story.",
          meaning: "Headings have levels: **one H1** per page (the main title), **H2s** for the sections, H3s inside sections. Screen readers use them like a table of contents, and Google reads them too.",
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "camera", label: "a photo of the outfit" }, { draw: "chat", label: "alt text: “green boubou, gold embroidery”" }, { draw: "person", label: "a blind customer hears it", hot: true }] },
          caption: "Alt text in action: the photo carries a short description, and a screen reader says it aloud, so a blind customer knows what Bisi made.",
        },
        { t: "list", items: ["Every meaningful photo has alt text describing it", "Words pass the 4.5 : 1 contrast rule (Day 1)", "Every form box has a visible label", "The whole site works with the keyboard alone: **Tab** moves forward, **Enter** clicks", "One H1 per page, then H2s for sections, in order"] },
        { t: "prompt", title: "Accessibility pass", text: "Do an accessibility pass on every page in site: add short, descriptive alt text to every meaningful image (describe the outfit, colour and detail), make sure every form field has a visible label, make sure there is exactly one h1 and the other headings go in order, make sure every link and button can be reached with the Tab key and shows a clear outline when focused, and fix any text colour below 4.5:1 contrast. List every change." },
        { t: "try", title: "Use the site without a mouse", minutes: 5, steps: ["Open your live site and click once in the browser's address bar.", "Press **Tab** again and again. Can you always see which link or button is selected?", "Reach the main button and press **Enter**. Does it work?"] },
        { t: "mistakes", items: [{ wrong: "Uploading photos straight from the phone", right: "WebP, resized, about 100 to 200 KB each" }, { wrong: "Testing only on a big laptop screen", right: "360 pixels wide in developer tools, then a real phone on mobile data" }, { wrong: "alt=\"IMG_2034.jpg\"", right: "alt=\"Green boubou with gold embroidery on the neckline\"" }] },
      ],
    },
    {
      heading: "Step 5: Measure again",
      blocks: [
        { t: "steps", items: [{ title: "Deploy the fixed site", detail: "Cloudflare → your project → **Create deployment** → drag `site` → **Save and Deploy**." }, { title: "Run PageSpeed again", detail: "Same pages, **Mobile** tab. Write the new score next to the old one." }, { title: "Screenshot the before and after", detail: "Two numbers side by side are powerful proof when you sell this service later." }] },
        { t: "win", title: "Mobile score of 80 or more", proved: "you can measure a real website like a professional, find what makes it slow on cheap phones, fix it, and prove the improvement with a number.", cue: "Keep that before-and-after screenshot. Finish your mission to collect the **Fast on any phone** badge." },
      ],
    },
  ],
  task: {
    title: "Bring the site up to professional standard",
    steps: ["Run PageSpeed Insights on your live home page and gallery; write down the mobile scores.", "Compress every photo to WebP with Squoosh and update the pages.", "Apply the speed fixes with the prompt, deploy, and measure again.", "Check every page at 360 and 390 pixels wide in developer tools, then on a real phone.", "Run the accessibility pass and use the site with only the keyboard."],
    done: ["My mobile speed score is 80 or higher", "No page scrolls sideways at 360 pixels wide", "Every meaningful photo has descriptive alt text", "Each page has exactly one H1", "I can use the whole site with only the keyboard"],
  },
  recap: [
    "Test like a real customer: a **budget phone on slow data**. Measure first with PageSpeed Insights and aim for **80+ on mobile**.",
    "The number-one cause of slow small-business sites is **huge photos**: compress each one to **WebP, about 100 to 200 KB**, with Squoosh.",
    "**Responsive design** means one website fits every screen: check at **phone widths (360 and 390 pixels)** in developer tools and on a real phone, with no sideways scrolling.",
    "Every meaningful photo needs **alt text** describing it (like “green boubou with gold embroidery on the neckline”), so screen readers can say it aloud and Google can understand it.",
    "Use **one H1 per page**, then H2s for sections: screen readers and Google both read headings like a table of contents.",
    "**Core Web Vitals** are three health checks: how fast the main content appears, how fast taps respond, and how much things jump while loading.",
  ],
  resources: [
    { label: "PageSpeed Insights", url: "https://pagespeed.web.dev", note: "Google's official, free speed test." },
    { label: "Squoosh", url: "https://squoosh.app", note: "Free photo shrinking in your browser." },
    { label: "web.dev: Core Web Vitals", url: "https://web.dev/articles/vitals", note: "What LCP, INP and CLS mean, from Google." },
    { label: "Chrome: device mode", url: "https://developer.chrome.com/docs/devtools/device-mode", note: "Official guide to the phone view in developer tools." },
    { label: "WAVE accessibility checker", url: "https://wave.webaim.org", note: "Paste a link to see accessibility problems highlighted." },
  ],
  quiz: [
    { q: "Bisi's gallery scores 38 on mobile and PageSpeed's top suggestion is about images. What do you fix first?", options: ["Change the colours", "Compress the photos to WebP, about 100 to 200 KB each, with Squoosh", "Add more photos", "Remove the menu"], answer: 1, why: "Huge photos are the most common cause of slow small-business sites; fix them first, then measure again.", from: 1, aim: "core" },
    { q: "Why check at 360 pixels wide and on a real phone, not just on your laptop?", options: ["Laptops are illegal", "Many customers use budget phones about that wide; laptop-only testing hides problems they'll hit", "Google requires exactly 360", "It makes the site cheaper"], answer: 1, why: "Your clients' customers are on phones, and clients will judge your own work on a phone too.", from: 2, aim: "portfolio-site" },
    { q: "What's good alt text for a photo of Bisi's green boubou?", options: ["image1.jpg", "photo", "Green boubou with gold embroidery on the neckline", "Click here"], answer: 2, why: "It describes what a person would see. On Day 11 you'll see that Google uses it too.", from: 3, aim: "seo-keywords-onpage" },
    { q: "Bisi's services page has three big titles, all marked H1. What's the fix?", options: ["Leave them: more H1s is better", "Keep one H1 for the main title and make the section titles H2s", "Delete all the titles", "Make them all bigger"], answer: 1, why: "One H1, then H2s, in order. On Day 11 your main search words go into that one H1.", from: 4, aim: "seo-keywords-onpage" },
    { q: "A customer says the button jumped as the page loaded and she tapped the wrong thing. What's happening?", options: ["Her phone is broken", "Things jump while loading: a Core Web Vitals problem (CLS)", "The page is too fast", "The colours are wrong"], answer: 1, why: "Layout shift. Giving every photo its size in advance usually fixes it. You'll check this on every client site before handover.", from: 5, aim: "client-work" },
  ],
  celebrate: {
    title: "Day 6 complete: fast on any phone",
    proved: "You can measure a real website like a professional, make it fast on cheap phones and slow data, make it usable by everyone, and prove it with a score.",
    badge: "Fast on any phone",
    badgeDesc: "Got a live site to 80+ on mobile speed",
  },
};

export default lesson;
