-- ============================================
-- AI-TREE MARKETING SCHEMA EXTENSION
-- ============================================
-- Run this in Supabase SQL Editor AFTER the base schema
-- 
-- Purpose: Program leads, applications, and marketing analytics
-- Created: 2026-01-30
-- ============================================

-- ============================================
-- ENUMS
-- ============================================

-- Only AIKI, AIVO, and AIME bundle (automation removed as separate product)
CREATE TYPE program_id AS ENUM ('aiki', 'aivo', 'aime');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'enrolled', 'declined', 'lost');
CREATE TYPE application_status AS ENUM ('draft', 'submitted', 'reviewing', 'accepted', 'enrolled', 'declined', 'withdrawn');
CREATE TYPE payment_method AS ENUM ('full', 'installments', 'company', 'scholarship');

-- ============================================
-- TABLES
-- ============================================

-- Program cohorts (scheduled program runs)
CREATE TABLE program_cohorts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program program_id NOT NULL,
    name TEXT NOT NULL,                          -- 'AIKI-2026-Q2', 'AIME-2026-MAR'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    registration_deadline DATE,
    max_participants INTEGER DEFAULT 20,
    current_participants INTEGER DEFAULT 0,
    price_cents INTEGER NOT NULL,                -- Price in cents (159000 = €1590)
    early_bird_price_cents INTEGER,              -- Optional early bird price
    early_bird_deadline DATE,
    locale locale DEFAULT 'et',
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cohorts_program ON program_cohorts(program);
CREATE INDEX idx_cohorts_start ON program_cohorts(start_date);
CREATE INDEX idx_cohorts_active ON program_cohorts(is_active);

-- Program leads (interest capture)
CREATE TABLE program_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES learning_sessions(id) ON DELETE SET NULL,
    
    -- Contact info
    email TEXT NOT NULL,
    name TEXT,
    phone TEXT,
    company TEXT,
    
    -- Interest
    programs program_id[] NOT NULL DEFAULT '{}', -- Can be interested in multiple
    message TEXT,                                 -- Optional message/question
    
    -- Source tracking
    source TEXT,                                  -- 'landing_aiki', 'dna_cta', 'popup', 'direct'
    source_page TEXT,                             -- Page URL where captured
    referrer TEXT,
    
    -- UTM tracking
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    
    -- Lead management
    status lead_status DEFAULT 'new',
    score INTEGER DEFAULT 0,                      -- Lead score for prioritization
    locale locale DEFAULT 'et',
    
    -- Follow-up tracking
    contacted_at TIMESTAMPTZ,
    contacted_by TEXT,
    contact_notes TEXT,
    next_followup DATE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- One lead per email
    UNIQUE(email)
);

CREATE INDEX idx_leads_email ON program_leads(email);
CREATE INDEX idx_leads_status ON program_leads(status);
CREATE INDEX idx_leads_programs ON program_leads USING GIN(programs);
CREATE INDEX idx_leads_created ON program_leads(created_at);

-- Program applications
CREATE TABLE program_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES program_leads(id) ON DELETE SET NULL,
    cohort_id UUID REFERENCES program_cohorts(id) ON DELETE SET NULL,
    program program_id NOT NULL,
    
    -- Personal info
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    country TEXT DEFAULT 'Estonia',
    city TEXT,
    
    -- Background
    current_role TEXT,
    company TEXT,
    linkedin_url TEXT,
    experience_level TEXT,                        -- 'none', 'beginner', 'intermediate', 'advanced'
    
    -- Motivation
    motivation TEXT,                              -- Why do you want to join?
    goals TEXT,                                   -- What do you want to achieve?
    how_heard TEXT,                               -- How did you hear about us?
    
    -- Logistics
    preferred_cohort_id UUID REFERENCES program_cohorts(id),
    can_commit_schedule BOOLEAN DEFAULT false,
    has_required_equipment BOOLEAN DEFAULT false,
    special_requirements TEXT,
    
    -- For AIVO/AIME - previous AIKI completion
    has_aiki_certificate BOOLEAN DEFAULT false,
    aiki_certificate_date DATE,
    aiki_certificate_number TEXT,
    
    -- Application status
    status application_status DEFAULT 'draft',
    submitted_at TIMESTAMPTZ,
    reviewed_at TIMESTAMPTZ,
    reviewed_by TEXT,
    decision_notes TEXT,
    
    -- Payment
    payment_method payment_method,
    payment_status TEXT DEFAULT 'pending',        -- 'pending', 'partial', 'completed'
    discount_code TEXT,
    discount_percent INTEGER DEFAULT 0,
    final_price_cents INTEGER,
    
    -- Enrollment
    enrolled_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    certificate_number TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_applications_email ON program_applications(email);
CREATE INDEX idx_applications_program ON program_applications(program);
CREATE INDEX idx_applications_status ON program_applications(status);
CREATE INDEX idx_applications_cohort ON program_applications(cohort_id);

-- Marketing page analytics
CREATE TABLE marketing_page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES learning_sessions(id) ON DELETE SET NULL,
    
    -- Page info
    page_type TEXT NOT NULL,                      -- 'landing', 'overview', 'apply', 'success'
    page_path TEXT NOT NULL,
    program program_id,
    
    -- Engagement
    time_on_page_seconds INTEGER,
    scroll_depth_percent INTEGER,
    cta_clicks TEXT[],                            -- ['apply_btn', 'download_pdf', 'faq_1']
    
    -- Attribution
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_page_views_session ON marketing_page_views(session_id);
CREATE INDEX idx_page_views_program ON marketing_page_views(program);
CREATE INDEX idx_page_views_type ON marketing_page_views(page_type);
CREATE INDEX idx_page_views_created ON marketing_page_views(created_at);

-- CTA interactions (from ai-tree → programs)
CREATE TABLE cta_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES learning_sessions(id) ON DELETE SET NULL,
    
    -- CTA info
    cta_type TEXT NOT NULL,                       -- 'banner', 'popup', 'inline', 'nav'
    cta_location TEXT NOT NULL,                   -- 'dna_complete', 'concept_agents', 'footer'
    program program_id NOT NULL,
    
    -- Interaction
    action TEXT NOT NULL,                         -- 'view', 'click', 'dismiss'
    
    -- Context
    completed_concepts TEXT[],
    completed_dna TEXT[],
    time_on_site_seconds INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cta_session ON cta_interactions(session_id);
CREATE INDEX idx_cta_program ON cta_interactions(program);
CREATE INDEX idx_cta_action ON cta_interactions(action);

-- Discount codes
CREATE TABLE discount_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    discount_percent INTEGER NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
    valid_programs program_id[] DEFAULT '{aiki,aivo,aime,automation}',
    valid_from DATE,
    valid_until DATE,
    max_uses INTEGER,
    current_uses INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Capture or update lead
CREATE OR REPLACE FUNCTION capture_program_lead(
    p_email TEXT,
    p_name TEXT DEFAULT NULL,
    p_phone TEXT DEFAULT NULL,
    p_programs program_id[] DEFAULT '{}',
    p_source TEXT DEFAULT NULL,
    p_source_page TEXT DEFAULT NULL,
    p_session_id UUID DEFAULT NULL,
    p_locale locale DEFAULT 'et'
)
RETURNS TABLE (
    lead_id UUID,
    is_new BOOLEAN
) AS $$
DECLARE
    v_lead program_leads%ROWTYPE;
    v_is_new BOOLEAN := false;
BEGIN
    -- Try to find existing lead
    SELECT * INTO v_lead FROM program_leads l WHERE l.email = p_email;
    
    IF NOT FOUND THEN
        -- Create new lead
        INSERT INTO program_leads (email, name, phone, programs, source, source_page, session_id, locale)
        VALUES (p_email, p_name, p_phone, p_programs, p_source, p_source_page, p_session_id, p_locale)
        RETURNING * INTO v_lead;
        v_is_new := true;
    ELSE
        -- Update existing lead - add new programs to interest
        UPDATE program_leads
        SET 
            name = COALESCE(p_name, program_leads.name),
            phone = COALESCE(p_phone, program_leads.phone),
            programs = ARRAY(SELECT DISTINCT unnest(program_leads.programs || p_programs)),
            session_id = COALESCE(p_session_id, program_leads.session_id),
            updated_at = NOW()
        WHERE program_leads.id = v_lead.id
        RETURNING * INTO v_lead;
    END IF;
    
    RETURN QUERY SELECT v_lead.id, v_is_new;
END;
$$ LANGUAGE plpgsql;

-- Get active cohorts
CREATE OR REPLACE FUNCTION get_active_cohorts(p_program program_id DEFAULT NULL)
RETURNS TABLE (
    id UUID,
    program program_id,
    name TEXT,
    start_date DATE,
    end_date DATE,
    spots_remaining INTEGER,
    price_cents INTEGER,
    early_bird_price_cents INTEGER,
    is_early_bird BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.program,
        c.name,
        c.start_date,
        c.end_date,
        (c.max_participants - c.current_participants) as spots_remaining,
        c.price_cents,
        c.early_bird_price_cents,
        (c.early_bird_deadline IS NOT NULL AND c.early_bird_deadline >= CURRENT_DATE) as is_early_bird
    FROM program_cohorts c
    WHERE c.is_active = true
      AND c.start_date >= CURRENT_DATE
      AND (p_program IS NULL OR c.program = p_program)
    ORDER BY c.start_date ASC;
END;
$$ LANGUAGE plpgsql;

-- Validate discount code
CREATE OR REPLACE FUNCTION validate_discount(
    p_code TEXT,
    p_program program_id
)
RETURNS TABLE (
    is_valid BOOLEAN,
    discount_percent INTEGER,
    message TEXT
) AS $$
DECLARE
    v_discount discount_codes%ROWTYPE;
BEGIN
    SELECT * INTO v_discount FROM discount_codes WHERE UPPER(code) = UPPER(p_code);
    
    IF NOT FOUND THEN
        RETURN QUERY SELECT false, 0, 'Sooduskood ei kehti'::TEXT;
        RETURN;
    END IF;
    
    IF NOT v_discount.is_active THEN
        RETURN QUERY SELECT false, 0, 'Sooduskood on aegunud'::TEXT;
        RETURN;
    END IF;
    
    IF v_discount.valid_until IS NOT NULL AND v_discount.valid_until < CURRENT_DATE THEN
        RETURN QUERY SELECT false, 0, 'Sooduskood on aegunud'::TEXT;
        RETURN;
    END IF;
    
    IF v_discount.max_uses IS NOT NULL AND v_discount.current_uses >= v_discount.max_uses THEN
        RETURN QUERY SELECT false, 0, 'Sooduskood on ära kasutatud'::TEXT;
        RETURN;
    END IF;
    
    IF NOT (p_program = ANY(v_discount.valid_programs)) THEN
        RETURN QUERY SELECT false, 0, 'Sooduskood ei kehti sellele programmile'::TEXT;
        RETURN;
    END IF;
    
    RETURN QUERY SELECT true, v_discount.discount_percent, 'Sooduskood kehtib!'::TEXT;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE program_cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE cta_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

-- Public read for cohorts
CREATE POLICY "Allow cohort read" ON program_cohorts FOR SELECT USING (is_active = true);

-- Insert-only for leads (admin read separately)
CREATE POLICY "Allow lead insert" ON program_leads FOR INSERT WITH CHECK (true);

-- Insert and read own applications
CREATE POLICY "Allow application insert" ON program_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow application read" ON program_applications FOR SELECT USING (true);

-- Insert-only for analytics
CREATE POLICY "Allow page view insert" ON marketing_page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow cta insert" ON cta_interactions FOR INSERT WITH CHECK (true);

-- Read-only for discount validation
CREATE POLICY "Allow discount read" ON discount_codes FOR SELECT USING (is_active = true);

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update timestamps
CREATE TRIGGER trigger_cohorts_updated
    BEFORE UPDATE ON program_cohorts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_leads_updated
    BEFORE UPDATE ON program_leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_applications_updated
    BEFORE UPDATE ON program_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Uncomment to insert sample cohorts:
/*
-- PRICING (Updated 2026-01-30):
-- AIKI: €1590 (159000 cents)
-- AIVO: €1290 full (129000 cents) / €900 for AIKI grads (90000 cents) - 30% off
-- AIME: €2490 (249000 cents) - same as AIKI + AIVO grad price

INSERT INTO program_cohorts (program, name, start_date, end_date, price_cents, early_bird_price_cents, early_bird_deadline) VALUES
('aiki', 'AIKI-2026-MAR', '2026-03-03', '2026-04-14', 159000, NULL, NULL),
('aiki', 'AIKI-2026-MAY', '2026-05-05', '2026-06-16', 159000, NULL, NULL),
('aivo', 'AIVO-2026-APR', '2026-04-14', '2026-05-12', 129000, NULL, NULL),
('aime', 'AIME-2026-MAR', '2026-03-03', '2026-05-12', 249000, NULL, NULL);

-- Sample discount codes
INSERT INTO discount_codes (code, description, discount_percent, valid_programs, valid_until) VALUES
('AIKIGRAD30', 'AIKI lõpetajate 30% soodustus AIVO-le', 30, '{aivo}', '2026-12-31'),
('LAUNCH10', 'Lansserimise soodustus', 10, '{aiki,aivo,aime}', '2026-02-28');
*/

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

/*
-- Check tables created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'program%' OR table_name LIKE 'marketing%' OR table_name LIKE 'cta%' OR table_name = 'discount_codes';

-- Check functions
SELECT routine_name FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('capture_program_lead', 'get_active_cohorts', 'validate_discount');

-- Check enums
SELECT typname FROM pg_type WHERE typname IN ('program_id', 'lead_status', 'application_status', 'payment_method');
*/
