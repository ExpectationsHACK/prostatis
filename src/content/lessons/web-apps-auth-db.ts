import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "web-apps-auth-db",
  title: "Web apps with logins & databases",
  minutes: 120,
  outcome: "A small web app with sign-in, a database and an admin page, where each user can only ever see their own information.",
  intro:
    "A school in Ibadan sends every parent a printed report card. Half get lost; parents keep calling to ask for results. A **web app** fixes this, each parent signs in and sees only their own child's results. Websites show information; web apps let people **do** things with their own data: sign in, save, view records. School portals, customer dashboards and staff tools are all web apps, and they're worth several times the price of a basic website.",
  youNeed: ["Your project and live site", "A free Supabase account (supabase.com)", "Two email addresses you can open (to test as two different users)", "About 2 hours"],
  sections: [
    {
      heading: "Three new ideas",
      blocks: [
        { t: "define", term: "Authentication (auth)", meaning: "Checking **who** someone is, usually by signing in with an email and password, or a sign-in link sent to their email.", like: "the security guard checking your ID at the gate." },
        { t: "define", term: "Database", meaning: "An organised place to store information in **tables**, rows and columns, like a spreadsheet that the app can read and write very fast.", like: "a very tidy filing cabinet, with one drawer (table) per type of thing." },
        { t: "define", term: "Authorisation", meaning: "Deciding **what** each signed-in person may see or change. A parent may see their own child's results, not everyone's.", like: "your hotel key card: it proves you're a guest (authentication) but only opens **your** room (authorisation)." },
        { t: "figure", figure: { product: "dashboard", caption: "A dashboard: each user signs in and sees only their own data." } },
        { t: "check", q: "A parent signs in successfully but can see another family's results. Which part failed?", options: ["Authentication", "Authorisation", "The domain name"], answer: 1, why: "They proved who they are (authentication worked), but the rules about what they may see (authorisation) are wrong." },
      ],
    },
    {
      heading: "Step 1: Design the data first",
      blocks: [
        { t: "p", text: "Before building, write down the **tables** and what goes in each. Think of each table as one tab of a spreadsheet." },
        { t: "code", lang: "text", text: "profiles:  id, full_name, role (parent or admin)\nstudents:  id, name, class, parent_id → points to a profile\nresults:   id, student_id → points to a student, subject, score, term" },
        { t: "define", term: "Row and column", meaning: "A **column** is one kind of information (name, class, score). A **row** is one record: one student, one result.", like: "a class register, each column is a day, each row is a pupil." },
        { t: "prompt", title: "Plan the data with Claude", text: "I'm building [describe the app and who uses it]. Propose the database tables, columns and how they connect, for Supabase (Postgres). Keep it as simple as possible. Then list, in plain English, which kind of user may read or change each table." },
        { t: "try", title: "Plan your own app on paper", minutes: 10, steps: ["Pick an app idea: school results, a client portal, rent tracker, church members…", "Write the 2–3 tables it needs, with their columns.", "Next to each table, write who may see it and who may change it."] },
      ],
    },
    {
      heading: "Step 2: Set up Supabase",
      blocks: [
        {
          t: "steps",
          items: [
            { title: "Create a free project at supabase.com", detail: "Choose a region close to your users, a Europe region is usually closer to Nigeria than the US." },
            { title: "Copy the project URL and keys", detail: "Project Settings → API Keys. The **publishable** key can be used in the browser. The **secret** key must stay on the server." },
            { title: "Add them to .env.local and to Vercel", detail: "Just like the Paystack key: never in code, never on GitHub." },
          ],
        },
        { t: "warn", text: "Supabase **pauses free projects** that have very little activity for about a week (you get warning emails). A paused project can be resumed from the dashboard, but a client's live app should be on a **paid plan** so it never goes to sleep." },
        { t: "tip", text: "Supabase's built-in sign-in emails are meant for testing and have a low hourly limit. For a real client app, connect a proper email sender (for example Resend) in Supabase's Auth settings." },
      ],
    },
    {
      heading: "Step 3: Row Level Security: the most important part",
      blocks: [
        { t: "define", term: "Row Level Security (RLS)", meaning: "Rules stored **inside the database** that decide which rows each user may read or change, for example “a parent can only read results where the student's parent is them.” Supabase requires you to switch it on and write the rules (called **policies**).", like: "a filing clerk who checks your ID and hands you **only your own** folder, no matter what you ask for." },
        { t: "figure", figure: { diagram: "rls", caption: "Same table, different views, each user only ever gets their own rows." } },
        { t: "p", text: "Supabase lets the browser talk to the database directly, convenient, and dangerous without RLS. A table **without** RLS can be read by anyone who knows how to open the browser's developer tools." },
        { t: "prompt", title: "Build it, with RLS", text: "Create these tables in Supabase with a SQL migration: [paste your plan]. Enable Row Level Security on every table. Policies: parents can read only their own students and those students' results; only admins can add or change results. Then build: an email sign-in page, a parent dashboard showing their children's results, and an admin page to add results. Use @supabase/ssr for Next.js. Explain every policy in plain English." },
        { t: "warn", text: "The **secret key skips RLS completely**. It must never appear in browser code. If it leaks, rotate it in Supabase at once." },
        { t: "scenario", title: "The portal that leaked", text: "A developer launched a staff portal with one table's RLS switched off “temporarily”. A curious staff member opened the browser tools and downloaded everyone's salary. Supabase's dashboard shows a warning on every table without RLS, never ignore it." },
      ],
    },
    {
      heading: "Step 4: Test like an attacker",
      blocks: [
        { t: "list", items: ["Sign up as **Parent A** and **Parent B** (two different emails). Can A see B's child? It must be **no**.", "Sign out and visit /dashboard. You should be sent to the sign-in page.", "As a parent, try to open /admin. You must be refused.", "In the Supabase dashboard, check every table shows RLS enabled."] },
        { t: "tip", text: "Ask Claude: “Review my RLS policies and try to find a way a parent could see another family's data.” AI is good at spotting holes when you ask it to look for them." },
        { t: "mistakes", items: [{ wrong: "Switching RLS off “just to test”", right: "Keep RLS on and write a policy for exactly what you need" }, { wrong: "Using the secret key in a page so “it just works”", right: "Secret key only on the server; the browser uses the publishable key" }, { wrong: "Testing with one account only", right: "Test with two users and a signed-out visitor" }] },
      ],
    },
  ],
  task: {
    title: "Build a mini web app",
    steps: ["Pick an app idea and plan its tables and who may see what.", "Create the Supabase project and add the keys to .env.local and Vercel.", "Create the tables with RLS switched on and policies written.", "Build sign-in, a user dashboard and an admin page.", "Test with two users and a signed-out visitor."],
    done: ["Users can sign up and sign in", "Every table has RLS switched on", "User A cannot see User B's data", "The admin page refuses normal users"],
  },
  recap: [
    "**Authentication** is who you are (signing in); **authorisation** is what you're allowed to see or change.",
    "A Supabase table **without RLS** can be read by anyone with the public key, always switch RLS on and write policies.",
    "The **secret key skips RLS** entirely, so it must never be in the browser, server only.",
    "**Plan the tables** and who may see what **before** building.",
    "Test privacy by creating **two users** and checking neither can see the other's data, plus a signed-out visitor.",
  ],
  resources: [
    { label: "Supabase: Next.js quickstart", url: "https://supabase.com/docs/guides/getting-started/quickstarts/nextjs", note: "Official setup guide." },
    { label: "Supabase: Row Level Security", url: "https://supabase.com/docs/guides/database/postgres/row-level-security", note: "How RLS policies work, with examples." },
    { label: "Supabase: Auth", url: "https://supabase.com/docs/guides/auth", note: "Sign-in options: email, magic links, Google." },
    { label: "Supabase: Project pausing", url: "https://supabase.com/docs/guides/platform/free-project-pausing", note: "What happens to inactive free projects." },
    { label: "freeCodeCamp: Relational databases", url: "https://www.freecodecamp.org/learn/relational-database/", note: "Free course if you want to understand SQL deeply." },
  ],
  quiz: [
    { q: "What's the difference between authentication and authorisation?", options: ["They're the same", "Authentication is who you are; authorisation is what you're allowed to do", "Authorisation is signing in", "Authentication is payments"], answer: 1, why: "Signing in proves identity; rules decide what that identity can access.", from: 0 },
    { q: "What happens if a Supabase table has RLS switched off?", options: ["Nothing", "Anyone with the public key could read it", "It gets faster", "It's deleted"], answer: 1, why: "Without RLS, the public key can read the table.", from: 1 },
    { q: "Which Supabase key must never be in the browser?", options: ["The publishable key", "The secret key", "The project URL", "None of them"], answer: 1, why: "The secret key skips RLS completely.", from: 2 },
    { q: "What should you do before building a web app?", options: ["Pick colours", "Plan the tables and who may see what", "Buy a domain", "Write the FAQ"], answer: 1, why: "The data plan shapes everything else.", from: 3 },
    { q: "How do you test data privacy?", options: ["Trust the AI", "Create two users and check neither can see the other's data", "Ask the client", "Look at the homepage"], answer: 1, why: "A real test with two accounts proves the rules work.", from: 4 },
  ],
};

export default lesson;
