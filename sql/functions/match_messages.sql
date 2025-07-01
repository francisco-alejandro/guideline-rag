create or replace function match_messages (
  query vector,
  threshold float,
  count int
)
returns table (
  id uuid,
  chat_id uuid,
  turn_id uuid,
  role text,
  content text
)
language sql
as $$
  with top as (
    select
      turn_id,
      1 - (embedding <=> query) as similarity
    from messages
    where role = 'user'
      and embedding is not null
      and 1 - (embedding <=> query) > threshold
    order by embedding <=> query
    limit count
  )
  select
    m.id,
    m.chat_id,
    m.turn_id,
    m.role,
    m.content
  from messages m
  join top t on m.turn_id = t.turn_id
  order by t.similarity desc;
$$;