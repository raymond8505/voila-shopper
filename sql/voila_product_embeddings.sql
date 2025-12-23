-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create table voila_product_embeddings
CREATE TABLE IF NOT EXISTS public.voila_product_embeddings (
  id bigserial PRIMARY KEY,
  content text,
  metadata jsonb DEFAULT '{}'::jsonb,
  embedding vector(768)
);

-- Create or replace function match_voila_product_embeddings
CREATE OR REPLACE FUNCTION public.match_voila_product_embeddings(
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
  FROM public.voila_product_embeddings v
  WHERE v.metadata @> filter
  ORDER BY v.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;