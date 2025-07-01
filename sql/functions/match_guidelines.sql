create or replace function match_guidelines (
  query vector,
  threshold float,
  count int
)
returns table (
  id uuid,
  title text,
  content text,
  tags text[],
  similarity float
)
language sql
as $$
  select id, title, content, tags, 1 - (embedding <=> query) as similarity
  from guidelines
  where 1 - (embedding <=> query) > threshold
  order by embedding <=> query
  limit count;
$$;