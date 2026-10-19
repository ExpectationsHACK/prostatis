-- Every track is now a one-time purchase with lifetime access (owner's decision, 2026-10-19).
-- Give everyone who has ever paid successfully access with no end date, including anyone whose
-- old 30/60-day access had already run out. Rows an admin closed without a successful payment
-- behind them are left alone. The end date 9999-12-31 is what the app treats as "never ends".
update public.subscriptions s
set current_period_end = '9999-12-31T00:00:00Z',
    status = 'active',
    updated_at = now()
where exists (
  select 1 from public.payments p
  where p.user_id = s.user_id and p.status = 'success'
);
