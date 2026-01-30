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
