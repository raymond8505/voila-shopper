-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create table recipes_embedding
CREATE TABLE IF NOT EXISTS public.recipes_embedding (
  id bigserial PRIMARY KEY,
  content text,
  metadata jsonb DEFAULT '{}'::jsonb,
  embedding vector(768)
);

-- Create or replace function match_recipes_embedding
CREATE OR REPLACE FUNCTION public.match_recipes_embedding(
  query_embedding vector(768),
  match_count int DEFAULT NULL,
  filter jsonb DEFAULT '{}'::jsonb
) RETURNS TABLE (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    v.id,
    v.content,
    v.metadata,
    1 - (v.embedding <=> query_embedding) AS similarity
  FROM public.recipes_embedding v
  WHERE v.metadata @> filter
  ORDER BY v.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

set statement_timeout = '10min';
CREATE INDEX ON recipes_embedding
USING hnsw (embedding vector_cosine_ops);