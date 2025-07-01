create table public.messages (
  created_at timestamp with time zone not null default now(),
  role public.role not null,
  chat_id uuid not null,
  turn_id uuid not null,
  content text not null,
  embedding vector null,
  id uuid not null,
  constraint messages_pkey primary key (id)
) TABLESPACE pg_default;