-- Admin, blog, visitor analytics and certificates.
-- Everything is written by the server with the secret key (bypasses RLS). The only public
-- read is published blog posts. Run after the three earlier migrations.

-- Visitor analytics: one row per page view. No IP addresses or cookies are stored:
-- `visitor` is a salted hash of IP + browser that changes every day (like Plausible).
create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  path text not null,
  referrer text,
  utm_source text,
  country text,
  region text,
  city text,
  device text not null default 'desktop' check (device in ('mobile', 'tablet', 'desktop')),
  visitor text not null,
  user_id uuid references auth.users (id) on delete set null
);

create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
alter table public.page_views enable row level security;

-- Blog posts with their own search and social fields.
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  excerpt text not null default '',
  content_md text not null default '',
  cover_image text,
  cover_alt text,
  tags text[] not null default '{}',
  seo_title text,
  seo_description text,
  seo_keywords text[] not null default '{}',
  canonical_url text,
  og_image text,
  author_name text not null default 'BuildWithAIClub',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_idx on public.posts (status, published_at desc);
alter table public.posts enable row level security;

create policy "posts: public reads published" on public.posts
  for select to anon, authenticated
  using (status = 'published' and published_at <= now());

grant select on public.posts to anon, authenticated;

-- Issued certificates. Public verification goes through the server, not the Data API.
create table if not exists public.certificates (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  track text not null check (track in ('fast_track', 'main_track')),
  name text not null,
  email text,
  score int not null,
  total int not null,
  issued_at timestamptz not null default now(),
  emailed_at timestamptz,
  revoked_at timestamptz,
  unique (user_id, track)
);

alter table public.certificates enable row level security;

create policy "certificates: read own" on public.certificates
  for select to authenticated
  using ((select auth.uid()) = user_id);

grant select on public.certificates to authenticated;

-- Student affairs: private staff notes on a student.
create table if not exists public.student_notes (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  author text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists student_notes_user_idx on public.student_notes (user_id, created_at desc);
alter table public.student_notes enable row level security;

-- Every admin action, for accountability.
create table if not exists public.admin_audit (
  id bigint generated always as identity primary key,
  actor text not null,
  action text not null,
  target text,
  detail jsonb,
  created_at timestamptz not null default now()
);

alter table public.admin_audit enable row level security;

-- Public bucket for blog images (uploads go through the server).
insert into storage.buckets (id, name, public)
values ('blog', 'blog', true)
on conflict (id) do nothing;
