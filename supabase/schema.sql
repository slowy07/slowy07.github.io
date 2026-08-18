-- Run this in Supabase SQL Editor

create table if not exists guestbook_entries (
  id bigserial primary key,
  username text not null,
  email text not null,
  message text not null,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

-- RLS: anyone can read verified entries, anyone can insert
alter table guestbook_entries enable row level security;

create policy "Public read verified" on guestbook_entries
  for select using (verified = true);

create policy "Anyone can insert" on guestbook_entries
  for insert with check (true);

create policy "Anyone can update own" on guestbook_entries
  for update using (true);
