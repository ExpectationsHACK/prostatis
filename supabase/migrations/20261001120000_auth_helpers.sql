-- Lets the server tell "no account with this email" apart from "wrong password", so sign-in
-- can send new people to sign up. Callable only with the secret key (service_role), never
-- from the browser, so it can't be used to probe for accounts from outside.
create or replace function public.email_registered(p_email text)
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (select 1 from auth.users where lower(email) = lower(p_email));
$$;

revoke all on function public.email_registered(text) from public, anon, authenticated;
grant execute on function public.email_registered(text) to service_role;

-- Rebrand: new posts default to the STEINARK byline.
alter table public.posts alter column author_name set default 'STEINARK';
