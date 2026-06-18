-- Migration: Create scraped_jobs table for storing job scraper results
-- This table stores all jobs scraped from various job boards.

CREATE TABLE IF NOT EXISTS scraped_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL,
  salary TEXT,
  source TEXT NOT NULL CHECK (source IN ('lever', 'greenhouse', 'ashby', 'wellfound', 'naukri', 'linkedin', 'indeed')),
  posted_at TIMESTAMPTZ,
  scraped_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  tags TEXT[] NOT NULL DEFAULT '{}',
  job_type TEXT CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship', 'freelance')),
  experience_level TEXT CHECK (experience_level IN ('intern', 'junior', 'mid', 'senior', 'lead', 'principal', 'staff')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Unique constraint on URL to support upsert and prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_scraped_jobs_url ON scraped_jobs (url);

-- Composite index for company + title as secondary dedup
CREATE INDEX IF NOT EXISTS idx_scraped_jobs_company_title ON scraped_jobs (company, title);

-- Index for filtering by source
CREATE INDEX IF NOT EXISTS idx_scraped_jobs_source ON scraped_jobs (source);

-- Index for filtering by location (text search)
CREATE INDEX IF NOT EXISTS idx_scraped_jobs_location ON scraped_jobs USING gin (to_tsvector('english', location));

-- Index for filtering by tags
CREATE INDEX IF NOT EXISTS idx_scraped_jobs_tags ON scraped_jobs USING gin (tags);

-- Index for sorting by posted date
CREATE INDEX IF NOT EXISTS idx_scraped_jobs_posted_at ON scraped_jobs (posted_at DESC NULLS LAST);

-- Index for sorting by scraped date
CREATE INDEX IF NOT EXISTS idx_scraped_jobs_scraped_at ON scraped_jobs (scraped_at DESC);

-- Full-text search index on title and description
CREATE INDEX IF NOT EXISTS idx_scraped_jobs_fts ON scraped_jobs USING gin (
  to_tsvector('english', title || ' ' || description)
);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_scraped_jobs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_scraped_jobs_updated_at
  BEFORE UPDATE ON scraped_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_scraped_jobs_updated_at();

-- Enable Row Level Security (optional, for public read access)
ALTER TABLE scraped_jobs ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Allow public read access on scraped_jobs"
  ON scraped_jobs
  FOR SELECT
  USING (true);

-- Policy: Allow service role full access
CREATE POLICY "Allow service role full access on scraped_jobs"
  ON scraped_jobs
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
