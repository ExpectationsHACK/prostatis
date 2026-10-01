-- Newsletter: subscriber status and a private unsubscribe token on the existing waitlist
-- (the site's email signup list), plus the issues you write and send from the admin.
-- Everything is written by the server with the secret key.

alter table public.waitlist add column if not exists status text not null default 'subscribed';
alter table public.waitlist drop constraint if exists waitlist_status_check;
alter table public.waitlist add constraint waitlist_status_check check (status in ('subscribed', 'unsubscribed'));
alter table public.waitlist add column if not exists token uuid not null default gen_random_uuid();
alter table public.waitlist add column if not exists unsubscribed_at timestamptz;
create unique index if not exists waitlist_token_idx on public.waitlist (token);

create table if not exists public.newsletter_issues (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  preheader text not null default '',
  body_md text not null default '',
  status text not null default 'draft' check (status in ('draft', 'sending', 'sent')),
  recipients int not null default 0,
  sent_at timestamptz,
  sent_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.newsletter_issues enable row level security;
