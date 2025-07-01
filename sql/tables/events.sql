create table public.events (
  id uuid not null,
  created_at timestamp with time zone not null default now(),
  topic text not null,
  aggregate_root_id text not null,
  data json not null,
  constraint events_pkey primary key (id)
) TABLESPACE pg_default;