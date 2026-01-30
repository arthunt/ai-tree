-- AI Tree: Programs Schema for Headless CMS
-- Following existing pattern from concepts/nodes tables
-- Supports AIKI, AIVO, AIME programs with full i18n

-- ============================================================
-- 1. PROGRAMS TABLE (Core program data)
-- ============================================================

CREATE TABLE IF NOT EXISTS programs (
  id TEXT PRIMARY KEY,                    -- 'aiki', 'aivo', 'aime'
  slug TEXT UNIQUE NOT NULL,              -- URL-friendly slug
  code TEXT NOT NULL,                     -- Display code: 'AIKI', 'AIVO', 'AIME'
  color TEXT NOT NULL DEFAULT '#6366f1',  -- Brand color hex
  icon TEXT,                              -- Lucide icon name
  
  -- Duration & Hours
  duration_weeks INT NOT NULL,
  academic_hours INT NOT NULL,
  
  -- Pricing
  price_cents INT NOT NULL,               -- Base price in cents (€1590 = 159000)
  
  -- Graduate Discount (for AIVO)
  graduate_discount_percent INT,          -- 30 for AIVO
  graduate_discount_for TEXT REFERENCES programs(id), -- 'aiki' for AIVO
  
  -- Installments
  installment_count INT,                  -- Number of payments
  installment_amount_cents INT,           -- Each payment amount
  installment_fee_percent DECIMAL(4,2),   -- Fee percentage
  
  -- Bundle Info (for AIME)
  is_bundle BOOLEAN DEFAULT false,
  included_programs TEXT[],               -- ['aiki', 'aivo'] for AIME
  bundle_savings_cents INT,               -- Amount saved vs separate
  
  -- Capacity
  max_participants INT DEFAULT 20,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. PROGRAM_TRANSLATIONS TABLE (i18n content)
-- ============================================================

CREATE TABLE IF NOT EXISTS program_translations (
  program_id TEXT REFERENCES programs(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'et')),
  
  -- Names
  name TEXT NOT NULL,                     -- Short: 'AIKI'
  full_name TEXT NOT NULL,                -- 'Rakenduslik AI: Kasutajast Instruktoriks'
  
  -- Marketing
  tagline TEXT,                           -- 'Saa AI koolitajaks 6 nädalaga'
  description TEXT,                       -- Full description
  
  -- Target audience
  target_audience TEXT,                   -- Who is this for
  
  -- Outcomes
  outcomes TEXT[],                        -- What you'll learn (array)
  
  PRIMARY KEY (program_id, locale)
);

-- ============================================================
-- 3. PROGRAM_FEATURES TABLE (Key selling points)
-- ============================================================

CREATE TABLE IF NOT EXISTS program_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id TEXT REFERENCES programs(id) ON DELETE CASCADE,
  icon TEXT NOT NULL,                     -- Lucide icon name
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS feature_translations (
  feature_id UUID REFERENCES program_features(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'et')),
  title TEXT NOT NULL,
  description TEXT,
  PRIMARY KEY (feature_id, locale)
);

-- ============================================================
-- 4. PROGRAM_CURRICULUM TABLE (Weekly breakdown)
-- ============================================================

CREATE TABLE IF NOT EXISTS program_curriculum (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id TEXT REFERENCES programs(id) ON DELETE CASCADE,
  week_number INT NOT NULL,               -- 0 = pre-work, 1-6 = weeks
  hours INT NOT NULL,                     -- Hours for this week
  type TEXT CHECK (type IN ('self-study', 'group', 'practice', 'assessment', 'pre-work')),
  sort_order INT DEFAULT 0,
  UNIQUE(program_id, week_number)
);

CREATE TABLE IF NOT EXISTS curriculum_translations (
  curriculum_id UUID REFERENCES program_curriculum(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'et')),
  title TEXT NOT NULL,                    -- 'Nädal 1: AI DNA'
  subtitle TEXT,                          -- Short description
  topics TEXT[],                          -- Array of topic strings
  PRIMARY KEY (curriculum_id, locale)
);

-- ============================================================
-- 5. PROGRAM_FAQ TABLE (Frequently asked questions)
-- ============================================================

CREATE TABLE IF NOT EXISTS program_faq (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id TEXT REFERENCES programs(id) ON DELETE CASCADE,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faq_translations (
  faq_id UUID REFERENCES program_faq(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'et')),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  PRIMARY KEY (faq_id, locale)
);

-- ============================================================
-- 6. INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
CREATE INDEX IF NOT EXISTS idx_programs_active ON programs(is_active);
CREATE INDEX IF NOT EXISTS idx_program_translations_locale ON program_translations(locale);
CREATE INDEX IF NOT EXISTS idx_program_features_program ON program_features(program_id);
CREATE INDEX IF NOT EXISTS idx_program_curriculum_program ON program_curriculum(program_id);
CREATE INDEX IF NOT EXISTS idx_program_faq_program ON program_faq(program_id);

-- ============================================================
-- 7. RLS POLICIES (Public read)
-- ============================================================

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_curriculum ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_translations ENABLE ROW LEVEL SECURITY;

-- Public read policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read programs') THEN
    CREATE POLICY "Public read programs" ON programs FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read program_translations') THEN
    CREATE POLICY "Public read program_translations" ON program_translations FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read program_features') THEN
    CREATE POLICY "Public read program_features" ON program_features FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read feature_translations') THEN
    CREATE POLICY "Public read feature_translations" ON feature_translations FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read program_curriculum') THEN
    CREATE POLICY "Public read program_curriculum" ON program_curriculum FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read curriculum_translations') THEN
    CREATE POLICY "Public read curriculum_translations" ON curriculum_translations FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read program_faq') THEN
    CREATE POLICY "Public read program_faq" ON program_faq FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read faq_translations') THEN
    CREATE POLICY "Public read faq_translations" ON faq_translations FOR SELECT USING (true);
  END IF;
END $$;

-- ============================================================
-- 8. HELPER FUNCTIONS
-- ============================================================

-- Get program with translations
CREATE OR REPLACE FUNCTION get_program_with_translations(
  p_slug TEXT,
  p_locale TEXT DEFAULT 'et'
)
RETURNS TABLE (
  id TEXT,
  slug TEXT,
  code TEXT,
  color TEXT,
  duration_weeks INT,
  academic_hours INT,
  price_cents INT,
  graduate_discount_percent INT,
  installment_count INT,
  installment_amount_cents INT,
  is_bundle BOOLEAN,
  bundle_savings_cents INT,
  name TEXT,
  full_name TEXT,
  tagline TEXT,
  description TEXT,
  target_audience TEXT,
  outcomes TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.slug,
    p.code,
    p.color,
    p.duration_weeks,
    p.academic_hours,
    p.price_cents,
    p.graduate_discount_percent,
    p.installment_count,
    p.installment_amount_cents,
    p.is_bundle,
    p.bundle_savings_cents,
    pt.name,
    pt.full_name,
    pt.tagline,
    pt.description,
    pt.target_audience,
    pt.outcomes
  FROM programs p
  JOIN program_translations pt ON p.id = pt.program_id AND pt.locale = p_locale
  WHERE p.slug = p_slug AND p.is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Get all active programs
CREATE OR REPLACE FUNCTION get_active_programs(p_locale TEXT DEFAULT 'et')
RETURNS TABLE (
  id TEXT,
  slug TEXT,
  code TEXT,
  color TEXT,
  duration_weeks INT,
  academic_hours INT,
  price_cents INT,
  name TEXT,
  full_name TEXT,
  tagline TEXT,
  sort_order INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.slug,
    p.code,
    p.color,
    p.duration_weeks,
    p.academic_hours,
    p.price_cents,
    pt.name,
    pt.full_name,
    pt.tagline,
    p.sort_order
  FROM programs p
  JOIN program_translations pt ON p.id = pt.program_id AND pt.locale = p_locale
  WHERE p.is_active = true
  ORDER BY p.sort_order;
END;
$$ LANGUAGE plpgsql;
