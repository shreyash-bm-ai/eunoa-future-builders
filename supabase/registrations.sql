-- Run in Supabase SQL Editor if the registrations table does not exist yet.

create table if not exists public.registrations (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  parent_name text not null,
  phone text not null,
  child_name text not null,
  child_grade text not null,
  created_at timestamptz not null default now()
);

alter table public.registrations enable row level security;

drop policy if exists "Users can read own registration" on public.registrations;
create policy "Users can read own registration"
  on public.registrations for select
  using (auth.uid() = id);

drop policy if exists "Users can insert own registration" on public.registrations;
create policy "Users can insert own registration"
  on public.registrations for insert
  with check (auth.uid() = id);
