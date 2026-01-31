-- AI Tree: Programs Operational Schema
--
-- DESIGN DECISION: Static content (names, features, curriculum) stays in
-- lib/programs/data.ts (556 lines, full ET+EN, instant import).
-- Only dynamic/operational data lives in the database:
--   - Cohorts (scheduling, capacity)
--   - Leads (email capture, marketing attribution)
--   - Applications (multi-step enrollment)
--   - Analytics (page views, CTA interactions)
--
-- This avoids duplicating 3 programs × 6 curriculum weeks × 2 locales
-- into 6 normalized tables for content that changes quarterly at best.

-- ============================================================
-- 1. Program Cohorts (scheduling & capacity)
-- ============================================================
CREATE TABLE IF NOT EXISTS program_cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id TEXT NOT NULL CHECK (program_id IN ('aiki', 'aivo', 'aime')),
  name TEXT NOT NULL,                      -- 'AIKI Kevad 2026'
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  registration_deadline DATE,
  max_participants INT NOT NULL DEFAULT 20,
  current_participants INT NOT NULL DEFAULT 0,
  price_cents INT NOT NULL,                -- Base price in cents
  early_bird_price_cents INT,
  early_bird_deadline DATE,
  locale TEXT NOT NULL DEFAULT 'et',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. Program Leads (email capture & marketing)
-- ============================================================
CREATE TABLE IF NOT EXISTS program_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT,                          -- Browser session for dedup
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  company TEXT,
  programs TEXT[] NOT NULL,                 -- ['aiki'], ['aivo', 'aime'], etc.
  message TEXT,
  source TEXT,                             -- 'tree_detail_panel', 'dna_cta', 'programs_page'
  source_page TEXT,                        -- URL path where lead was captured
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'enrolled', 'declined', 'lost')),
  score INT NOT NULL DEFAULT 0,            -- Lead scoring (0-100)
  locale TEXT NOT NULL DEFAULT 'et',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 3. Program Applications (multi-step enrollment)
-- ============================================================
CREATE TABLE IF NOT EXISTS program_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES program_leads(id),
  cohort_id UUID REFERENCES program_cohorts(id),
  program_id TEXT NOT NULL CHECK (program_id IN ('aiki', 'aivo', 'aime')),

  -- Step 1: Personal
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  city TEXT,

  -- Step 2: Background
  applicant_role TEXT,
  company TEXT,
  linkedin_url TEXT,
  experience_level TEXT CHECK (experience_level IN ('none', 'beginner', 'intermediate', 'advanced')),

  -- Step 3: Motivation
  motivation TEXT,
  goals TEXT,
  how_heard TEXT,

  -- Step 4: Logistics
  can_commit_schedule BOOLEAN DEFAULT false,
  has_required_equipment BOOLEAN DEFAULT false,
  special_requirements TEXT,

  -- Step 5: AIKI Certificate (for AIVO applicants)
  has_aiki_certificate BOOLEAN DEFAULT false,
  aiki_certificate_date DATE,

  -- Step 6: Payment
  payment_method TEXT CHECK (payment_method IN ('full', 'installments', 'company', 'scholarship')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'completed')),
  discount_code TEXT,
  discount_percent INT NOT NULL DEFAULT 0,
  final_price_cents INT,

  -- Status
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'reviewing', 'accepted', 'enrolled', 'declined', 'withdrawn')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at TIMESTAMPTZ
);

-- ============================================================
-- 4. Analytics: Page Views
-- ============================================================
CREATE TABLE IF NOT EXISTS marketing_page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,                      -- '/programs/aiki'
  program_id TEXT,
  session_id TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  locale TEXT DEFAULT 'et',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 5. Analytics: CTA Interactions
-- ============================================================
CREATE TABLE IF NOT EXISTS cta_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cta_type TEXT NOT NULL,                  -- 'tree_detail_panel', 'dna_deep_dive', 'programs_hero'
  program_id TEXT,
  node_id TEXT,                            -- Which tree node triggered this
  action TEXT NOT NULL DEFAULT 'click',    -- 'click', 'dismiss', 'view'
  session_id TEXT,
  source_page TEXT,
  locale TEXT DEFAULT 'et',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 6. Discount Codes
-- ============================================================
CREATE TABLE IF NOT EXISTS discount_codes (
  code TEXT PRIMARY KEY,
  program_id TEXT,                         -- NULL = applies to all programs
  discount_percent INT NOT NULL,
  max_uses INT,
  current_uses INT NOT NULL DEFAULT 0,
  valid_from DATE,
  valid_until DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 7. RLS Policies
-- ============================================================
ALTER TABLE program_cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE cta_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

-- Public read on cohorts (needed for landing pages)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read cohorts') THEN
    CREATE POLICY "Public read cohorts" ON program_cohorts FOR SELECT USING (is_active = true);
  END IF;
END $$;

-- Public insert on leads (anonymous email capture)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public insert leads') THEN
    CREATE POLICY "Public insert leads" ON program_leads FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Public insert on applications (anonymous form submission)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public insert applications') THEN
    CREATE POLICY "Public insert applications" ON program_applications FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Public insert on analytics (anonymous tracking)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public insert page views') THEN
    CREATE POLICY "Public insert page views" ON marketing_page_views FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public insert cta interactions') THEN
    CREATE POLICY "Public insert cta interactions" ON cta_interactions FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Public read on discount codes (validation at checkout)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read discount codes') THEN
    CREATE POLICY "Public read discount codes" ON discount_codes FOR SELECT USING (is_active = true);
  END IF;
END $$;

-- ============================================================
-- 8. Helper Functions
-- ============================================================

-- Capture a lead (handles dedup by email+program)
CREATE OR REPLACE FUNCTION capture_program_lead(
  p_email TEXT,
  p_name TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_programs TEXT[] DEFAULT ARRAY['aiki'],
  p_source TEXT DEFAULT NULL,
  p_source_page TEXT DEFAULT NULL,
  p_utm_source TEXT DEFAULT NULL,
  p_utm_medium TEXT DEFAULT NULL,
  p_utm_campaign TEXT DEFAULT NULL,
  p_locale TEXT DEFAULT 'et',
  p_session_id TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  v_id UUID;
BEGIN
  -- Check for existing lead with same email
  SELECT id INTO v_id FROM program_leads
  WHERE email = p_email
  ORDER BY created_at DESC LIMIT 1;

  IF v_id IS NOT NULL THEN
    -- Update existing lead with new programs (merge arrays)
    UPDATE program_leads SET
      programs = ARRAY(SELECT DISTINCT unnest(programs || p_programs)),
      name = COALESCE(p_name, name),
      phone = COALESCE(p_phone, phone),
      source = COALESCE(p_source, source)
    WHERE id = v_id;
    RETURN v_id;
  END IF;

  -- Insert new lead
  INSERT INTO program_leads (email, name, phone, programs, source, source_page, utm_source, utm_medium, utm_campaign, locale, session_id)
  VALUES (p_email, p_name, p_phone, p_programs, p_source, p_source_page, p_utm_source, p_utm_medium, p_utm_campaign, p_locale, p_session_id)
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get active cohorts for a program
CREATE OR REPLACE FUNCTION get_active_cohorts(p_program_id TEXT DEFAULT NULL)
RETURNS SETOF program_cohorts AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM program_cohorts
  WHERE is_active = true
    AND (p_program_id IS NULL OR program_id = p_program_id)
    AND (registration_deadline IS NULL OR registration_deadline >= CURRENT_DATE)
  ORDER BY start_date ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Validate a discount code
CREATE OR REPLACE FUNCTION validate_discount(p_code TEXT, p_program_id TEXT DEFAULT NULL)
RETURNS TABLE(valid BOOLEAN, discount_pct INT, message TEXT) AS $$
DECLARE
  v_code discount_codes%ROWTYPE;
BEGIN
  SELECT * INTO v_code FROM discount_codes WHERE code = UPPER(p_code) AND is_active = true;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 0, 'Invalid discount code'::TEXT;
    RETURN;
  END IF;

  IF v_code.valid_from IS NOT NULL AND CURRENT_DATE < v_code.valid_from THEN
    RETURN QUERY SELECT false, 0, 'Discount code not yet active'::TEXT;
    RETURN;
  END IF;

  IF v_code.valid_until IS NOT NULL AND CURRENT_DATE > v_code.valid_until THEN
    RETURN QUERY SELECT false, 0, 'Discount code has expired'::TEXT;
    RETURN;
  END IF;

  IF v_code.max_uses IS NOT NULL AND v_code.current_uses >= v_code.max_uses THEN
    RETURN QUERY SELECT false, 0, 'Discount code fully redeemed'::TEXT;
    RETURN;
  END IF;

  IF v_code.program_id IS NOT NULL AND p_program_id IS NOT NULL AND v_code.program_id != p_program_id THEN
    RETURN QUERY SELECT false, 0, 'Discount code not valid for this program'::TEXT;
    RETURN;
  END IF;

  RETURN QUERY SELECT true, v_code.discount_percent, 'Discount applied'::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 9. Seed Data: Initial Cohorts + Discount Codes
-- ============================================================

-- Sample cohorts (Spring 2026)
INSERT INTO program_cohorts (program_id, name, start_date, end_date, registration_deadline, max_participants, price_cents, early_bird_price_cents, early_bird_deadline, locale) VALUES
  ('aiki', 'AIKI Kevad 2026',  '2026-03-02', '2026-04-10', '2026-02-21', 20, 159000, 143100, '2026-02-14', 'et'),
  ('aivo', 'AIVO Kevad 2026',  '2026-04-14', '2026-05-09', '2026-04-04', 15, 129000, NULL, NULL, 'et'),
  ('aime', 'AIME Kevad 2026',  '2026-03-02', '2026-05-09', '2026-02-21', 15, 249000, NULL, NULL, 'et')
ON CONFLICT DO NOTHING;

-- Discount codes
INSERT INTO discount_codes (code, program_id, discount_percent, max_uses, valid_until) VALUES
  ('AIKIGRAD30', 'aivo', 30, NULL, '2026-12-31'),
  ('LAUNCH10', NULL, 10, 50, '2026-06-30'),
  ('EARLYBIRD15', NULL, 15, 30, '2026-02-28')
ON CONFLICT (code) DO NOTHING;
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
  id TEXT PRIMARY KEY,                    -- 'f-aiki-1'
  program_id TEXT REFERENCES programs(id) ON DELETE CASCADE,
  icon TEXT NOT NULL,                     -- Lucide icon name
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS feature_translations (
  feature_id TEXT REFERENCES program_features(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'et')),
  title TEXT NOT NULL,
  description TEXT,
  PRIMARY KEY (feature_id, locale)
);

-- ============================================================
-- 4. PROGRAM_CURRICULUM TABLE (Weekly breakdown)
-- ============================================================

CREATE TABLE IF NOT EXISTS program_curriculum (
  id TEXT PRIMARY KEY,                    -- 'c-aiki-1'
  program_id TEXT REFERENCES programs(id) ON DELETE CASCADE,
  week_number INT NOT NULL,               -- 0 = pre-work, 1-6 = weeks
  hours INT NOT NULL,                     -- Hours for this week
  type TEXT CHECK (type IN ('self-study', 'group', 'practice', 'assessment', 'pre-work')),
  sort_order INT DEFAULT 0,
  UNIQUE(program_id, week_number)
);

CREATE TABLE IF NOT EXISTS curriculum_translations (
  curriculum_id TEXT REFERENCES program_curriculum(id) ON DELETE CASCADE,
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
  id TEXT PRIMARY KEY,                    -- 'faq-aiki-1'
  program_id TEXT REFERENCES programs(id) ON DELETE CASCADE,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faq_translations (
  faq_id TEXT REFERENCES program_faq(id) ON DELETE CASCADE,
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
