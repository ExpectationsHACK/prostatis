-- Learning progress, XP and streaks.
-- Everything here is written only by the server (secret key, bypasses RLS) after it has
-- graded the work, so members can't award themselves XP. Members can read their own rows.

create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  quiz_best int not null default 0,
  quiz_total int not null default 0,
  quiz_passed_at timestamptz,
  task_done_at timestamptz,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "lesson_progress: read own" on public.lesson_progress
  for select to authenticated
  using ((select auth.uid()) = user_id);

-- One row per award. The (kind, ref) key makes every award idempotent.
create table if not exists public.xp_events (
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null,
  ref text not null,
  xp int not null check (xp >= 0),
  created_at timestamptz not null default now(),
  primary key (user_id, kind, ref)
);

alter table public.xp_events enable row level security;

create policy "xp_events: read own" on public.xp_events
  for select to authenticated
  using ((select auth.uid()) = user_id);

-- Days (Africa/Lagos) on which the member submitted a quiz or completed a task.
create table if not exists public.activity_days (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  primary key (user_id, day)
);

alter table public.activity_days enable row level security;

create policy "activity_days: read own" on public.activity_days
  for select to authenticated
  using ((select auth.uid()) = user_id);

create table if not exists public.final_exams (
  user_id uuid not null references auth.users (id) on delete cascade,
  track text not null check (track in ('fast_track', 'main_track')),
  best int not null default 0,
  total int not null default 0,
  passed_at timestamptz,
  certificate_id text unique,
  updated_at timestamptz not null default now(),
  primary key (user_id, track)
);

alter table public.final_exams enable row level security;

create policy "final_exams: read own" on public.final_exams
  for select to authenticated
  using ((select auth.uid()) = user_id);
