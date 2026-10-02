import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "web-apps-auth-db",
  title: "Web apps with logins & databases",
  minutes: 130,
  outcome: "A small customer portal for Bisi: customers sign in with their email and see only their own measurements and order status, and Bisi signs in to update them. Built free with Supabase and tested with two customers who can't see each other's records.",
  intro:
    "Bisi keeps every customer's measurements in a notebook. Last rainy season it got soaked, and forty customers' measurements were gone. Her customers also message every day: “Is my dress ready?” Today you'll build something better than a website: a place where each customer signs in and sees **their own** measurements and order status, and where Bisi updates them from her phone. Websites show the same information to everyone; this kind of app lets people do things with their own private records. School result portals, customer dashboards and staff tools are all built this way, and clients pay several times the price of a basic website for them.",
  core: "Switch on Row Level Security for every table and write rules so each person can only ever see their own records.",
  youNeed: ["Your GitHub-connected site", "An email address for a free Supabase account (or your GitHub login)", "Two email addresses you can open, to test as two different customers", "About 2 hours"],
  sections: [
    {
      heading: "Websites that do more",
      blocks: [
        {
          t: "define",
          term: "Web app",
          like: "a church notice board versus an ATM. Everyone reads the same notice board; the ATM shows only your account, after your card and PIN.",
          meaning: "A website where people sign in and do things with their **own** information: view records, save details, track an order. School portals and customer dashboards are web apps.",
        },
        {
          t: "define",
          term: "Authentication",
          like: "the security man at an estate gate checking your ID before you're allowed in.",
          meaning: "Checking **who** someone is, usually by signing in with an email and password, or a one-time sign-in link sent to their email.",
        },
        {
          t: "define",
          term: "Authorisation",
          like: "your locker at the bank: you're already inside the building, but your key opens only your own locker.",
          meaning: "Deciding **what** each signed-in person may see or change. Ada may see Ada's measurements, never Ngozi's.",
        },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "gate", label: "who are you? (sign in)" }, { draw: "key", label: "what may you open? (rules)" }, { draw: "book", label: "only your own records", hot: true }] },
          caption: "Two different checks: the gate (authentication) asks who you are; the locker key (authorisation) decides which records you can open once you're inside.",
        },
        { t: "figure", figure: { product: "dashboard", caption: "A portal: each person signs in and sees only their own records." } },
        { t: "check", q: "A school portal lets a parent sign in, but she can see another family's results. Which part failed?", options: ["Authentication", "Authorisation", "The colours"], answer: 1, why: "She proved who she is (authentication worked), but the rules about what she may see (authorisation) are wrong." },
      ],
    },
    {
      heading: "Step 1: Plan the data first",
      blocks: [
        {
          t: "define",
          term: "Database",
          like: "the big register book in a school office, with one section for pupils, one for classes and one for fees.",
          meaning: "An organised store of information that an app can read and write very quickly. It's made of **tables**.",
        },
        {
          t: "define",
          term: "Table, row and column",
          like: "a class register: each column is one kind of detail (name, class), and each row is one pupil.",
          meaning: "A table holds one kind of thing, like customers or orders. Each **column** is one detail (waist, hip); each **row** is one record (one customer's measurements).",
        },
        { t: "p", text: "Before building, write down the tables, what goes in each, and **who may see or change each one**. Bisi's portal needs three:" },
        { t: "code", lang: "text", text: "profiles:      id, full_name, phone, role (customer or owner)\nmeasurements:  customer_id → a profile, bust, waist, hip, shoulder, length, updated_at\norders:        customer_id → a profile, item, status (received, cutting, sewing, ready, collected), due_date, balance_naira\n\nWho may see what:\n- A customer reads only her own profile, measurements and orders.\n- Only the owner adds or changes measurements and orders." },
        { t: "prompt", title: "Plan the data with your AI assistant", text: "I'm building [describe the app and who uses it]. Propose the simplest set of tables and columns for Supabase (Postgres), and how they connect. Then list, in plain English, which kind of user may read or change each table. Keep it small: this is for a small Nigerian business." },
        { t: "try", title: "Plan your own app on paper", minutes: 10, steps: ["Pick an app idea for a business you know: school results, a client portal, rent records, church members.", "Write its 2 or 3 tables with their columns.", "Next to each table, write who may see it and who may change it. That list becomes your privacy rules."] },
      ],
    },
    {
      heading: "Step 2: Create a free Supabase project",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Sign up", detail: "Go to `supabase.com` and click **Start your project**. The easiest sign-up is **Continue with GitHub**, using the account you made on Day 7." },
            { title: "Create an organisation", detail: "Give it a name (your name is fine) and choose the **Free** plan." },
            { title: "Create the project", detail: "Click **New project**. Name: `bisi-portal`. **Database password**: click **Generate a password**, copy it and save it somewhere safe (not in your `site` folder). Region: the closest one offered to Nigeria, usually a Europe region such as London or Frankfurt. Click **Create new project** and wait a minute or two." },
            { title: "Find the address and the safe key", detail: "Open **Project Settings** → **API Keys** (or click **Connect** at the top). Copy the **Project URL** and the **publishable** key into your notes." },
          ],
        },
        {
          t: "define",
          term: "Publishable key",
          like: "the shop's phone number on its signboard: anyone can have it, but having it only lets them call. The shop still decides what to tell them.",
          meaning: "Supabase's key that is safe to put in your pages. On its own it can only do what your privacy rules allow. Supabase also gives a **secret key** that ignores the rules: like Paystack's, it never goes in a page.",
        },
        { t: "warn", text: "Free Supabase projects **pause after about a week with no activity** (Supabase emails a warning first). A paused project keeps its data and can be restored from the dashboard, but the app is offline until then. Practise freely; for a client's live portal, see the upgrade note below." },
        { t: "upgrade", title: "A client app that must never sleep", text: "Supabase's Pro plan (about $25 a month at the time of writing; check supabase.com/pricing) never pauses and adds daily backups. Charge the client for it as part of their monthly care once their portal is in daily use. Until then, any real use keeps a free project awake." },
      ],
    },
    {
      heading: "Step 3: The privacy rules, the most important part",
      blocks: [
        {
          t: "define",
          term: "SQL",
          like: "the exact order codes a pharmacist writes to the wholesaler: short, strict, with no room for misunderstanding.",
          meaning: "The language for talking to a database: create this table, find these rows. Your AI assistant writes it; you paste it into Supabase's **SQL Editor** and click **Run**.",
        },
        {
          t: "define",
          term: "Row Level Security",
          also: ["RLS"],
          like: "a filing clerk who checks your ID and hands you only your own file, whatever you ask for.",
          meaning: "Rules stored **inside the database** that decide which rows each person may read or change, for example “a customer can only read measurements where customer_id is her own.” In Supabase you switch **RLS** on for every table and write the rules, which Supabase calls **policies**.",
        },
        { t: "figure", figure: { diagram: "rls", caption: "Same table, different views: each user only ever gets their own rows." } },
        {
          t: "sketch",
          sketch: { layout: "flow", nodes: [{ draw: "people", label: "Ada and Ngozi sign in" }, { draw: "database", label: "one measurements table" }, { draw: "shield", label: "RLS checks every row", hot: true }, { draw: "book", label: "each sees only her own" }] },
          caption: "Two customers ask the same table for measurements; the RLS clerk checks every row and hands each one only her own file.",
        },
        { t: "p", text: "Supabase lets your pages talk to the database directly, which is convenient and dangerous: a table **without RLS** can be read by anyone who opens the browser's developer tools and uses your publishable key." },
        { t: "prompt", title: "Create the tables, with RLS", text: "Write Supabase SQL that creates these tables: [paste your plan]. Link profiles to Supabase Auth users (profiles.id = auth.users.id) and create a profile automatically when a user signs up, with role 'customer'. Enable Row Level Security on EVERY table. Policies: a customer can read only her own profile, measurements and orders; only users whose profile role is 'owner' can insert or update measurements and orders. No table may be readable by signed-out visitors. Then explain every policy in one plain sentence." },
        {
          t: "steps",
          items: [
            { title: "Open the SQL Editor", detail: "In Supabase's left menu, click **SQL Editor** → **New query**." },
            { title: "Paste and run", detail: "Paste the SQL from your AI assistant and click **Run**. You should see “Success. No rows returned”." },
            { title: "Check the tables", detail: "Open **Table Editor**. Your three tables are listed. A table marked **Unrestricted** has RLS switched off: never leave it like that." },
          ],
        },
        {
          t: "errors",
          items: [
            { see: "ERROR: relation \"profiles\" already exists", means: "You ran the same SQL twice; the table was already created the first time.", fix: "Nothing is broken. If you need a fresh start, ask the AI for the SQL to drop the three tables, then run the creation SQL once." },
            { see: "A table shows the label “Unrestricted” in the Table Editor", means: "RLS is off for that table: anyone with the publishable key could read it.", fix: "Ask the AI for the SQL to enable RLS and add policies on that table, and run it." },
          ],
        },
        {
          t: "scenario",
          title: "The portal that leaked",
          text: "Picture a developer who launches a staff portal with one table's RLS switched off “just for now”. A curious staff member opens the developer tools and downloads everyone's salary. This kind of leak happens in real life, and it's why Supabase shows a warning on every unrestricted table. Never ignore it.",
        },
      ],
    },
    {
      heading: "Step 4: Build the sign-in and the portal",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Tell Supabase your site's address", detail: "Supabase → **Authentication** → **URL Configuration**. **Site URL**: your `.pages.dev` address. Under **Redirect URLs**, add the address of your portal page, e.g. `https://stitches-by-bisi.pages.dev/portal.html`. Save." },
            { title: "Ask your builder for the pages", detail: "Use the prompt below, review the new files in `site`, then upload them to GitHub and commit." },
            { title: "Make yourself the owner", detail: "Sign in once on the live site. Then in Supabase → **Table Editor** → `profiles`, find your row and change **role** to `owner`. Save." },
          ],
        },
        { t: "prompt", title: "Sign-in, customer portal and owner page", text: "Using plain HTML and the official supabase-js library from a CDN, add to my site (styles.css and site.js already exist):\n1) site/supabase-config.js with my Project URL [paste] and publishable key [paste]. Never use the secret key.\n2) site/portal.html: if signed out, an email box and a 'Send me a sign-in link' button (email magic link, redirecting back to portal.html). If signed in, show the customer's own measurements and her orders with their status as clear cards, plus a 'Sign out' button.\n3) site/admin.html: for the owner only (check profiles.role = 'owner'): a list of customers, and forms to update a customer's measurements and to add or update an order's status. If a non-owner opens it, show 'This page is for the shop owner.'\nPhone first, matching the brand. Explain in plain words how the privacy is enforced by the database rules, not by hiding buttons." },
        {
          t: "errors",
          items: [
            { see: "The sign-in email link opens the wrong page or says the link is invalid", means: "Supabase doesn't know your site's address yet, or the redirect address isn't on its list.", fix: "Set the **Site URL** and add the portal page under **Redirect URLs** (Step 4, first box), then request a new link." },
            { see: "“Email rate limit exceeded”", means: "Supabase's built-in email sender only sends a few sign-in emails per hour on the free plan; it's meant for testing.", fix: "Wait an hour. For a real client, connect a proper email sender in **Authentication** → **Emails** (some have free plans, like Resend)." },
            { see: "The portal shows no measurements", means: "There are no rows for this customer yet, or a policy is wrong.", fix: "Add a measurements row for that customer as the owner. If it's still empty, paste the policy SQL to the AI and ask it to find the problem." },
          ],
        },
      ],
    },
    {
      heading: "Step 5: Test like an attacker",
      blocks: [
        { t: "list", items: ["Sign in as **customer A** and **customer B** (two different emails). Add measurements for each as the owner. Can A see B's measurements? It must be **no**.", "Sign out and open `portal.html`: you should be asked to sign in, and see no data.", "As a customer, open `admin.html`: you must be refused, and the database must refuse any change.", "In Supabase's Table Editor, check that no table is marked **Unrestricted**."] },
        { t: "tip", text: "Ask your AI assistant: “Here are my RLS policies: [paste]. Try to find any way a customer could read or change another customer's data.” AI is good at spotting holes when you ask it to look for them." },
        { t: "win", title: "Two customers, two private views", proved: "you can build a web app where people sign in and see only their own records, and prove the privacy rules hold before any real customer uses it.", cue: "Screenshot customer A's and customer B's portals side by side. Finish your mission for the **Data guardian** badge." },
        { t: "mistakes", items: [{ wrong: "Switching RLS off “just to test”", right: "Keeping RLS on and writing a policy for exactly what's needed" }, { wrong: "Using the secret key in a page so “it just works”", right: "Pages use the publishable key; the secret key never leaves Supabase's dashboard and your server" }, { wrong: "Testing with one account only", right: "Testing with two customers and a signed-out visitor" }] },
        { t: "p", text: "**Stretch goal:** remember the custom booking system from Day 8? With sign-in, a database and RLS you can now build one: staff, opening hours, free slots, and a booking table only the owner can read." },
      ],
    },
  ],
  task: {
    title: "Build a private customer portal",
    steps: ["Plan the tables and who may see what.", "Create a free Supabase project and copy the Project URL and publishable key.", "Create the tables with RLS on and policies written, in the SQL Editor.", "Set the Site URL and redirect address, then build the portal and owner pages.", "Make yourself the owner and test with two customers and a signed-out visitor."],
    done: ["Customers can sign in with an email link", "Every table has RLS on (none marked Unrestricted)", "Customer A cannot see customer B's records", "The owner page refuses normal customers", "Only the publishable key is in my pages"],
  },
  recap: [
    "**Authentication** is who you are (signing in); **authorisation** is what you're allowed to see or change.",
    "A Supabase table **without Row Level Security** can be read by anyone with the publishable key: switch **RLS on for every table** and write policies.",
    "The Supabase **secret key ignores RLS**, so it never goes in a page; pages use the **publishable key**.",
    "**Plan the tables**, and who may see what, **before** building.",
    "Test privacy with **two customers and a signed-out visitor**: nobody may see anyone else's records.",
    "Free Supabase projects **pause after about a week with no activity**; a client's live app should stay in use or be upgraded.",
  ],
  resources: [
    { label: "Supabase: Row Level Security", url: "https://supabase.com/docs/guides/database/postgres/row-level-security", note: "How RLS policies work, with examples." },
    { label: "Supabase: Auth", url: "https://supabase.com/docs/guides/auth", note: "Sign-in options: email links, passwords, Google." },
    { label: "Supabase: Redirect URLs", url: "https://supabase.com/docs/guides/auth/redirect-urls", note: "Why the Site URL and redirect list matter." },
    { label: "Supabase: free project pausing", url: "https://supabase.com/docs/guides/platform/free-project-pausing", note: "What happens to quiet free projects." },
    { label: "freeCodeCamp: Relational databases", url: "https://www.freecodecamp.org/learn/relational-database/", note: "Free course if you want to understand SQL deeply." },
  ],
  quiz: [
    { q: "What happens if a Supabase table has RLS switched off?", options: ["Nothing", "Anyone with the publishable key could read it", "It gets faster and safer", "Supabase deletes it"], answer: 1, why: "Without RLS, the publishable key can read the whole table. Switch it on for every table.", from: 1, aim: "core" },
    { q: "Ada signs in and sees Ngozi's measurements. Which part failed?", options: ["Authentication: she shouldn't have signed in", "Authorisation: the rules about what she may see", "The website's colours", "Her phone"], answer: 1, why: "She proved who she is; the rules about what she may see are wrong. Your final client project tests every privacy rule like this.", from: 0, aim: "capstone" },
    { q: "Which Supabase key must never be in a page?", options: ["The publishable key", "The secret key", "The Project URL", "None of them"], answer: 1, why: "The secret key ignores RLS. The website chat assistant you build later keeps its AI key on the server for the same reason.", from: 2, aim: "whatsapp-bots-cs-agents" },
    { q: "What should you do before building a web app?", options: ["Choose the colours", "Plan the tables and who may see what", "Buy a domain", "Write the FAQ"], answer: 1, why: "The data plan shapes everything else. You'll plan a customer list the same way when you connect a whole system.", from: 3, aim: "connect-the-system" },
    { q: "How do you prove the privacy rules work?", options: ["Trust the AI", "Test with two customers and a signed-out visitor, and check nobody sees anyone else's records", "Ask the owner", "Look at the home page"], answer: 1, why: "Only a real test proves it. It belongs on your checklist before every handover.", from: 4, aim: "deliver-get-paid" },
  ],
  celebrate: {
    title: "Day 10 complete: private by design",
    proved: "You can build a web app where people sign in and see only their own records, and prove the privacy rules hold before any customer uses it.",
    badge: "Data guardian",
    badgeDesc: "Built a portal with tested privacy rules",
  },
};

export default lesson;
