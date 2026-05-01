create extension if not exists pgcrypto;

create table if not exists public.montessori_quiz_leads (
  id uuid primary key default gen_random_uuid(),
  parent_first_name text not null,
  email text not null,
  child_age text not null,
  city text,
  quiz_score integer not null check (quiz_score between 7 and 28),
  archetype text not null,
  compatibility_stars integer not null check (compatibility_stars between 1 and 5),
  top_tags jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists montessori_quiz_leads_created_at_idx
  on public.montessori_quiz_leads (created_at desc);

create index if not exists montessori_quiz_leads_email_idx
  on public.montessori_quiz_leads (email);
