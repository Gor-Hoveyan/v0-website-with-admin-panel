-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  duration TEXT,
  level TEXT,
  price DECIMAL(10,2),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create video_courses table
CREATE TABLE IF NOT EXISTS video_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  duration TEXT,
  level TEXT,
  price DECIMAL(10,2),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  slug TEXT UNIQUE,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  project_url TEXT,
  github_url TEXT,
  technologies TEXT[], -- Array of technology names
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  partnership_type TEXT, -- 'client', 'partner', 'sponsor'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event category enum
CREATE TYPE IF NOT EXISTS event_category AS ENUM (
  'talk',
  'panel',
  'podcast',
  'interview',
  'commentary',
  'mention'
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category event_category NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date DATE,
  location TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view published/visible content)
CREATE POLICY "Allow public read access to courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Allow public read access to video_courses" ON video_courses FOR SELECT USING (true);
CREATE POLICY "Allow public read access to published blog_posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Allow public read access to projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to companies" ON companies FOR SELECT USING (true);
CREATE POLICY "Allow public read access to events" ON events FOR SELECT USING (true);

-- Admin write policies (authenticated users can manage content)
CREATE POLICY "Allow authenticated users to insert courses" ON courses FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to update courses" ON courses FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to delete courses" ON courses FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert video_courses" ON video_courses FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to update video_courses" ON video_courses FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to delete video_courses" ON video_courses FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert blog_posts" ON blog_posts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to update blog_posts" ON blog_posts FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to delete blog_posts" ON blog_posts FOR DELETE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to read all blog_posts" ON blog_posts FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert events" ON events FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to update events" ON events FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to delete events" ON events FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert projects" ON projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to update projects" ON projects FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to delete projects" ON projects FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert companies" ON companies FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to update companies" ON companies FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to delete companies" ON companies FOR DELETE USING (auth.uid() IS NOT NULL);
-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  duration TEXT,
  level TEXT,
  price DECIMAL(10,2),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create video_courses table
CREATE TABLE IF NOT EXISTS video_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  duration TEXT,
  level TEXT,
  price DECIMAL(10,2),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  slug TEXT UNIQUE,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  project_url TEXT,
  github_url TEXT,
  technologies TEXT[], -- Array of technology names
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  partnership_type TEXT, -- 'client', 'partner', 'sponsor'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event category enum
CREATE TYPE IF NOT EXISTS event_category AS ENUM (
  'talk',
  'panel',
  'podcast',
  'interview',
  'commentary',
  'mention'
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category event_category NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date DATE,
  location TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view published/visible content)
CREATE POLICY "Allow public read access to courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Allow public read access to video_courses" ON video_courses FOR SELECT USING (true);
CREATE POLICY "Allow public read access to published blog_posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Allow public read access to projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to companies" ON companies FOR SELECT USING (true);
CREATE POLICY "Allow public read access to events" ON events FOR SELECT USING (true);

-- Admin write policies (authenticated users can manage content)
CREATE POLICY "Allow authenticated users to insert courses" ON courses FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to update courses" ON courses FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to delete courses" ON courses FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert video_courses" ON video_courses FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to update video_courses" ON video_courses FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to delete video_courses" ON video_courses FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert blog_posts" ON blog_posts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to update blog_posts" ON blog_posts FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to delete blog_posts" ON blog_posts FOR DELETE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to read all blog_posts" ON blog_posts FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert events" ON events FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to update events" ON events FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to delete events" ON events FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert projects" ON projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to update projects" ON projects FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to delete projects" ON projects FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert companies" ON companies FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to update companies" ON companies FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to delete companies" ON companies FOR DELETE USING (auth.uid() IS NOT NULL);
