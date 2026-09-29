import type { Lesson } from "../types";

const lesson: Lesson = {
  id: "web-apps-auth-db",
  title: "Web apps with logins & databases",
  minutes: 120,
  outcome: "A small web app with sign-in, a database and an admin view — the kind of build clients pay the most for.",
  intro:
    "A website shows information. A web app lets people **do** things: log in, save data, see their own records. School portals, customer dashboards, property managers and staff tools are all web apps — and they're worth 3–10× a basic website. Today you'll build one with Supabase.",
  sections: [
    {
      heading: "Three new ideas",
      blocks: [
        { t: "table", columns: ["Idea", "Plain English", "Example"], rows: [["Authentication (auth)", "Knowing who someone is — logging in", "A parent signs in with email"], ["Database", "An organised place to store information in tables", "A 'students' table with names and classes"], ["Authorisation", "Deciding what each person may see or change", "A parent sees only their own child's results"]] },
        { t: "figure", figure: { product: "dashboard", caption: "A dashboard: each user signs in and sees only their own data." } },
      ],
    },
    {
      heading: "Step 1 — Design the data first",
      blocks: [
        { t: "p", text: "Before building, write down the **tables** and what's in each. Think of each table as a spreadsheet tab." },
        { t: "code", lang: "text", text: "profiles:   id, full_name, role (parent | admin)\nstudents:   id, name, class, parent_id → profiles\nresults:    id, student_id → students, subject, score, term" },
        { t: "prompt", title: "Plan the data with Claude", text: "I'm building [describe the app and who uses it]. Propose the database tables, columns and relationships for Supabase (Postgres). Keep it as simple as possible. Then list which user may read or change each table." },
      ],
    },
    {
      heading: "Step 2 — Set up Supabase",
      blocks: [
        { t: "steps", items: [
          { title: "Create a free project at supabase.com", detail: "Pick the region closest to your users (e.g. Europe West for Nigeria — lower delay than US)." },
          { title: "Copy the project URL and keys", detail: "Project Settings → API. The publishable (anon) key can be in the browser; the secret (service role) key must stay on the server." },
          { title: "Add them to .env.local", detail: "And later, to Vercel's environment variables." },
        ] },
      ],
    },
    {
      heading: "Step 3 — Row Level Security (the most important part)",
      blocks: [
        { t: "p", text: "Supabase lets the browser talk to the database directly. That's convenient — and dangerous if you skip **Row Level Security (RLS)**. RLS is a set of rules inside the database, like: “a user can only read results where the student's parent is them.”" },
        { t: "warn", text: "A table without RLS can be read by anyone who opens the browser's developer tools. Always turn RLS on for every table and write policies. Supabase's dashboard warns you when a table has it off." },
        { t: "prompt", title: "Build with RLS", text: "Create these tables in Supabase with a SQL migration: [paste the plan]. Enable Row Level Security on every table. Policies: parents can read only their own students and those students' results; only admins can insert or update results. Then build: an email sign-in page, a parent dashboard showing their children's results, and an admin page to add results. Use @supabase/ssr for Next.js. Explain each policy in plain English." },
      ],
    },
    {
      heading: "Step 4 — Test like an attacker",
      blocks: [
        { t: "list", items: ["Sign up as Parent A and Parent B. Can A see B's child? (It must be **no**.)", "Sign out and visit /dashboard. You should be sent to sign in.", "As a parent, try to open /admin. You should be refused.", "Check the Supabase dashboard: every table shows RLS enabled."] },
        { t: "tip", text: "Ask Claude: “Review my RLS policies and try to find a way a parent could see another family's data.” AI is good at spotting holes when you ask it to look for them." },
      ],
    },
  ],
  task: {
    title: "Build a mini web app",
    steps: ["Pick an app idea (school results, client portal, property rent tracker…).", "Plan the tables and who can see what.", "Create the Supabase project and tables with RLS.", "Build sign-in, the user dashboard and an admin page.", "Test with two users and a signed-out visitor."],
    done: ["Users can sign up and sign in", "Every table has RLS on", "User A cannot see User B's data", "The admin page is refused for normal users"],
  },
  resources: [
    { label: "Supabase — Next.js quickstart", url: "https://supabase.com/docs/guides/getting-started/quickstarts/nextjs", note: "Official setup guide." },
    { label: "Supabase — Row Level Security", url: "https://supabase.com/docs/guides/database/postgres/row-level-security", note: "How RLS policies work, with examples." },
    { label: "Supabase — Auth", url: "https://supabase.com/docs/guides/auth", note: "Sign-in options: email, magic links, Google." },
    { label: "freeCodeCamp — Relational databases", url: "https://www.freecodecamp.org/learn/relational-database/", note: "Free course if you want to understand SQL deeply." },
  ],
  quiz: [
    { q: "What's the difference between authentication and authorisation?", options: ["They're the same", "Authentication is who you are; authorisation is what you're allowed to do", "Authorisation is logging in", "Authentication is payments"], answer: 1, why: "Logging in proves identity; rules decide what that identity can access." },
    { q: "What happens if a Supabase table has RLS turned off?", options: ["Nothing", "Anyone with the public key could read it", "It gets faster", "It's deleted"], answer: 1, why: "Without RLS, the public key can read the table. Always enable it." },
    { q: "Which Supabase key must never be in the browser?", options: ["The publishable (anon) key", "The secret / service role key", "The project URL", "None"], answer: 1, why: "The secret key bypasses RLS completely." },
    { q: "What should you do before building a web app?", options: ["Pick colours", "Plan the tables and who may see what", "Buy a domain", "Write the FAQ"], answer: 1, why: "The data design shapes everything else." },
    { q: "How do you test data privacy?", options: ["Trust the AI", "Create two users and check neither can see the other's data", "Ask the client", "Look at the homepage"], answer: 1, why: "Real tests with two accounts prove the rules work." },
  ],
};

export default lesson;
