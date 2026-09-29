-- Phase 1: waitlist signups. Written by the /api/waitlist route using the service-role key.
create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  email text not null unique,
  name text not null default '',
  whatsapp text,
  source text not null default 'unknown',
  created_at timestamptz not null default now()
);

-- RLS on with no policies: anon/authenticated clients can't read or write;
-- only the server (service role) can.
alter table public.waitlist enable row level security;
