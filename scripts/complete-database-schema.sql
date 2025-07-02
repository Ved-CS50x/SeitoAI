-- Create users table with authentication and subscription management
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  subscription_tier VARCHAR(50) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'student', 'pro', 'team')),
  subscription_status VARCHAR(50) DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'expired')),
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  prompts_used INTEGER DEFAULT 0,
  prompts_limit INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES event_categories(id),
  description TEXT,
  output_format TEXT,
  mentor_persona TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_id VARCHAR(100) REFERENCES events(id),
  title VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table for payment tracking
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tier VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  amount_paid DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'INR',
  payment_provider VARCHAR(50),
  payment_id VARCHAR(255),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create usage tracking table
CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_id VARCHAR(100) REFERENCES events(id),
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  total_tokens INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert events data
INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'moot-court',
  'Moot Court',
  id,
  'Legal case simulation and advocacy',
  'Legal memorials, case briefs, oral argument structures with proper legal citations and precedent analysis',
  'Experienced legal advocate and moot court coach'
FROM event_categories WHERE name = 'Legal & Policy Simulation'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'client-counselling',
  'Client Counselling',
  id,
  'Legal client advisory simulation',
  'Client interview frameworks, legal advice structures, and counselling session plans',
  'Senior legal practitioner specializing in client relations'
FROM event_categories WHERE name = 'Legal & Policy Simulation'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'negotiation',
  'Negotiation',
  id,
  'Legal and commercial negotiation',
  'Negotiation strategies, BATNA analysis, and settlement frameworks',
  'Expert negotiator and mediation specialist'
FROM event_categories WHERE name = 'Legal & Policy Simulation'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'arbitration-mediation',
  'Arbitration/Mediation',
  id,
  'Alternative dispute resolution',
  'Arbitration awards, mediation proposals, and ADR procedural guidance',
  'Certified arbitrator and mediation expert'
FROM event_categories WHERE name = 'Legal & Policy Simulation'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'model-un',
  'Model UN',
  id,
  'United Nations simulation',
  'Position papers, resolution drafts, diplomatic statements, and committee-specific formats',
  'Experienced MUN director and international relations expert'
FROM event_categories WHERE name = 'Diplomacy & Global Governance'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'youth-parliament',
  'Youth Parliament',
  id,
  'Parliamentary procedure simulation',
  'Parliamentary speeches, bill drafts, and procedural motions',
  'Parliamentary procedure expert and debate coach'
FROM event_categories WHERE name = 'Diplomacy & Global Governance'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'model-g20',
  'Model G20/EU/ASEAN',
  id,
  'International organization simulation',
  'Policy briefs, communiqués, and multilateral negotiation frameworks',
  'International policy analyst and diplomatic advisor'
FROM event_categories WHERE name = 'Diplomacy & Global Governance'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'wsdc-debate',
  'WSDC-style Debates',
  id,
  'World Schools Debating Championship format',
  'Structured arguments, rebuttals, and reply speech frameworks',
  'World Schools debate champion and coach'
FROM event_categories WHERE name = 'Diplomacy & Global Governance'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'british-parliamentary',
  'British Parliamentary',
  id,
  'BP format debate',
  'Opening/closing government/opposition cases, extensions, and whip speeches',
  'British Parliamentary debate expert and tournament judge'
FROM event_categories WHERE name = 'Speech & Discourse'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'asian-parliamentary',
  'Asian Parliamentary',
  id,
  'AP format debate',
  'Government and opposition cases with Asian Parliamentary structure',
  'Asian Parliamentary debate specialist and adjudicator'
FROM event_categories WHERE name = 'Speech & Discourse'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'public-speaking',
  'Public Speaking',
  id,
  'Prepared and impromptu speaking',
  'Speech outlines, rhetorical structures, and delivery techniques',
  'Professional public speaking coach and rhetorician'
FROM event_categories WHERE name = 'Speech & Discourse'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'jam',
  'JAM (Just A Minute)',
  id,
  'Impromptu speaking challenge',
  'Quick speech structures, topic development techniques, and timing strategies',
  'JAM competition expert and impromptu speaking coach'
FROM event_categories WHERE name = 'Speech & Discourse'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'legal-essay',
  'Legal Essays',
  id,
  'Academic legal writing',
  'Legal essay structure, thesis development, and scholarly citation format',
  'Legal academic and scholarly writing expert'
FROM event_categories WHERE name = 'Legal & Academic Research'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'case-commentary',
  'Case Commentaries',
  id,
  'Legal case analysis',
  'Case analysis framework, legal reasoning critique, and commentary structure',
  'Legal scholar specializing in case law analysis'
FROM event_categories WHERE name = 'Legal & Academic Research'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'youth-think-tank',
  'Youth Think Tanks',
  id,
  'Policy research and analysis',
  'Policy papers, research briefs, and think tank reports',
  'Policy research expert and think tank analyst'
FROM event_categories WHERE name = 'Skill-Based Competitions'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'law-fest-exhibit',
  'Law Fest Exhibits',
  id,
  'Legal exhibition and presentation',
  'Exhibition proposals, presentation structures, and visual aid frameworks',
  'Legal education specialist and exhibition curator'
FROM event_categories WHERE name = 'Skill-Based Competitions'
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, name, category_id, description, output_format, mentor_persona) 
SELECT 
  'changemaker-platform',
  'Global Changemaker Platforms',
  id,
  'Social impact and innovation',
  'Impact proposals, solution frameworks, and changemaker presentations',
  'Social innovation expert and changemaker mentor'
FROM event_categories WHERE name = 'Skill-Based Competitions'
ON CONFLICT (id) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
