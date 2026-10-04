-- Rebrand: the product is now Prostatis (by Stynark). New posts default to the Prostatis byline,
-- and posts still credited to the old name move to the new one.
alter table public.posts alter column author_name set default 'Prostatis';
update public.posts set author_name = 'Prostatis' where author_name = 'STEINARK';
