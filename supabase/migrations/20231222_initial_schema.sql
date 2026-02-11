-- Create companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo TEXT,
  tagline TEXT,
  description TEXT,
  website TEXT,
  twitter TEXT,
  github TEXT,
  linkedin TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) -- ID of the user who "owns" this company profile
);

-- Create jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  location TEXT NOT NULL,
  location_type TEXT NOT NULL CHECK (location_type IN ('Remote', 'On-site', 'Hybrid')),
  salary_range TEXT,
  job_type TEXT NOT NULL CHECK (job_type IN ('Full-time', 'Part-time', 'Contract', 'Freelance')),
  seniority TEXT NOT NULL CHECK (seniority IN ('Junior', 'Mid', 'Senior', 'Lead', 'Principal')),
  description TEXT NOT NULL,
  responsibilities TEXT[] DEFAULT '{}',
  requirements TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  apply_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) -- ID of the user who posted the job
);

-- Row Level Security (RLS)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policies for companies
CREATE POLICY "Companies are viewable by everyone" ON companies FOR SELECT USING (true);
CREATE POLICY "Users can create their own company" ON companies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own company" ON companies FOR UPDATE USING (auth.uid() = user_id);

-- Policies for jobs
CREATE POLICY "Jobs are viewable by everyone" ON jobs FOR SELECT USING (true);
CREATE POLICY "Users can post their own jobs" ON jobs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own jobs" ON jobs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own jobs" ON jobs FOR DELETE USING (auth.uid() = user_id);
