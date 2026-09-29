-- Phase 2: member profiles, subscriptions and payments.
-- Subscriptions and payments are written only by the server (secret key, bypasses RLS)
-- after a verified Paystack payment. Members can read their own rows.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  whatsapp_number text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: read own" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

create policy "profiles: insert own" on public.profiles
  for insert to authenticated
  with check ((select auth.uid()) = id);

create policy "profiles: update own" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create table if not exists public.subscriptions (
  id bigint generated always as identity primary key,
  user_id uuid not null unique references auth.users (id) on delete cascade,
  status text not null check (status in ('active', 'non_renewing', 'past_due', 'cancelled')),
  plan text not null check (plan in ('fast_track', 'main_track')),
  paystack_ref text,
  paystack_customer_code text,
  paystack_subscription_code text,
  paystack_email_token text,
  current_period_end timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_customer_code_idx on public.subscriptions (paystack_customer_code);
create index if not exists subscriptions_subscription_code_idx on public.subscriptions (paystack_subscription_code);

alter table public.subscriptions enable row level security;

create policy "subscriptions: read own" on public.subscriptions
  for select to authenticated
  using ((select auth.uid()) = user_id);

create table if not exists public.payments (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  reference text not null unique,
  provider text not null default 'paystack',
  plan text not null,
  amount_kobo bigint not null,
  currency text not null,
  status text not null,
  raw jsonb,
  created_at timestamptz not null default now()
);

create index if not exists payments_user_id_idx on public.payments (user_id);

alter table public.payments enable row level security;

create policy "payments: read own" on public.payments
  for select to authenticated
  using ((select auth.uid()) = user_id);

-- Data API access. RLS above decides which rows each role sees.
grant select, insert, update on public.profiles to authenticated;
grant select on public.subscriptions, public.payments to authenticated;
