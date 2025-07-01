create table public.guidelines (
  id uuid not null default gen_random_uuid (),
  title text null,
  content text null,
  tags text[] null,
  embedding vector null,
  active boolean null default true,
  created_at timestamp without time zone null default now(),
  constraint guidelines_pkey primary key (id)
) TABLESPACE pg_default;