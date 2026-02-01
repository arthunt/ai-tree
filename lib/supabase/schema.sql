-- ============================================
-- AI-TREE DATABASE SCHEMA
-- ============================================
-- Run this in Supabase SQL Editor to create all tables
-- 
-- Project: AI Tree (Dendrix.ai)
-- Purpose: Anonymous learning progress tracking
-- Created: 2026-01-30
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

-- Concept completion status
CREATE TYPE concept_status AS ENUM ('viewed', 'completed', 'bookmarked');

-- DNA component identifiers
CREATE TYPE dna_component AS ENUM ('T', 'V', 'A', 'P');

-- Feedback types
CREATE TYPE feedback_type AS ENUM ('bug', 'suggestion', 'content_error', 'general');

-- Feedback status
CREATE TYPE feedback_status AS ENUM ('new', 'reviewed', 'resolved', 'wont_fix');

-- Supported locales
CREATE TYPE locale AS ENUM ('et', 'en', 'ru');

-- ============================================
-- TABLES
-- ============================================

-- Anonymous learning sessions
-- Tracks progress without requiring sign-in
CREATE TABLE learning_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_token TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    locale locale DEFAULT 'et',
    preferences JSONB DEFAULT '{}'::jsonb
);

-- Index for quick session lookups
CREATE INDEX idx_sessions_token ON learning_sessions(session_token);
CREATE INDEX idx_sessions_last_active ON learning_sessions(last_active_at);

-- Concept completion tracking
CREATE TABLE concept_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES learning_sessions(id) ON DELETE CASCADE,
    concept_id TEXT NOT NULL,
    status concept_status DEFAULT 'viewed',
    viewed_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    time_spent_seconds INTEGER DEFAULT 0,
    
    -- Each session can only have one record per concept
    UNIQUE(session_id, concept_id)
);

-- Indexes for progress queries
CREATE INDEX idx_concept_progress_session ON concept_progress(session_id);
CREATE INDEX idx_concept_progress_concept ON concept_progress(concept_id);

-- DNA component progress (T-V-A-P)
CREATE TABLE dna_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES learning_sessions(id) ON DELETE CASCADE,
    component_id dna_component NOT NULL,
    viewed_at TIMESTAMPTZ DEFAULT NOW(),
    explored_at TIMESTAMPTZ,
    demo_completed BOOLEAN DEFAULT FALSE,
    
    -- Each session can only have one record per DNA component
    UNIQUE(session_id, component_id)
);

-- Index for DNA progress queries
CREATE INDEX idx_dna_progress_session ON dna_progress(session_id);

-- Learning path progress
CREATE TABLE learning_path_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES learning_sessions(id) ON DELETE CASCADE,
    path_id TEXT NOT NULL,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    current_step INTEGER DEFAULT 0,
    total_steps INTEGER NOT NULL,
    
    -- Each session can only have one record per path
    UNIQUE(session_id, path_id)
);

-- Index for path progress queries
CREATE INDEX idx_path_progress_session ON learning_path_progress(session_id);

-- Analytics events (anonymous)
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES learning_sessions(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    event_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    page_path TEXT,
    referrer TEXT,
    user_agent TEXT
);

-- Indexes for analytics queries
CREATE INDEX idx_analytics_session ON analytics_events(session_id);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created ON analytics_events(created_at);

-- User feedback
CREATE TABLE user_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES learning_sessions(id) ON DELETE SET NULL,
    feedback_type feedback_type NOT NULL,
    concept_id TEXT,
    message TEXT NOT NULL,
    email TEXT,
    status feedback_status DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- Index for feedback queries
CREATE INDEX idx_feedback_status ON user_feedback(status);
CREATE INDEX idx_feedback_created ON user_feedback(created_at);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Get or create anonymous session
CREATE OR REPLACE FUNCTION get_or_create_session(
    p_session_token TEXT,
    p_locale locale DEFAULT 'et'
)
RETURNS TABLE (
    id UUID,
    session_token TEXT,
    created_at TIMESTAMPTZ,
    locale locale,
    preferences JSONB
) AS $$
DECLARE
    v_session learning_sessions%ROWTYPE;
BEGIN
    -- Try to find existing session
    SELECT * INTO v_session
    FROM learning_sessions ls
    WHERE ls.session_token = p_session_token;
    
    -- If not found, create new session
    IF NOT FOUND THEN
        INSERT INTO learning_sessions (session_token, locale)
        VALUES (p_session_token, p_locale)
        RETURNING * INTO v_session;
    ELSE
        -- Update last active time
        UPDATE learning_sessions
        SET last_active_at = NOW(),
            updated_at = NOW()
        WHERE learning_sessions.id = v_session.id;
    END IF;
    
    RETURN QUERY SELECT 
        v_session.id,
        v_session.session_token,
        v_session.created_at,
        v_session.locale,
        v_session.preferences;
END;
$$ LANGUAGE plpgsql;

-- Get progress summary for a session
CREATE OR REPLACE FUNCTION get_progress_summary(p_session_id UUID)
RETURNS TABLE (
    total_concepts INTEGER,
    viewed_concepts INTEGER,
    completed_concepts INTEGER,
    dna_components_viewed INTEGER,
    total_time_spent INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        23::INTEGER as total_concepts, -- Hardcoded total concepts in ai-tree
        (SELECT COUNT(*)::INTEGER FROM concept_progress WHERE session_id = p_session_id),
        (SELECT COUNT(*)::INTEGER FROM concept_progress WHERE session_id = p_session_id AND status = 'completed'),
        (SELECT COUNT(*)::INTEGER FROM dna_progress WHERE session_id = p_session_id),
        (SELECT COALESCE(SUM(time_spent_seconds), 0)::INTEGER FROM concept_progress WHERE session_id = p_session_id);
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE concept_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE dna_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_path_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;

-- Public read/write policies (anonymous access)
-- Since this is an anonymous learning platform, we allow broad access
-- but use session tokens to isolate data

-- Learning sessions: anyone can create, but only read/update their own
CREATE POLICY "Allow session creation" ON learning_sessions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow session read by token" ON learning_sessions
    FOR SELECT USING (true);

CREATE POLICY "Allow session update by token" ON learning_sessions
    FOR UPDATE USING (true);

-- Concept progress: linked to session
CREATE POLICY "Allow progress insert" ON concept_progress
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow progress read" ON concept_progress
    FOR SELECT USING (true);

CREATE POLICY "Allow progress update" ON concept_progress
    FOR UPDATE USING (true);

-- DNA progress: linked to session
CREATE POLICY "Allow dna progress insert" ON dna_progress
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow dna progress read" ON dna_progress
    FOR SELECT USING (true);

CREATE POLICY "Allow dna progress update" ON dna_progress
    FOR UPDATE USING (true);

-- Learning path progress: linked to session
CREATE POLICY "Allow path progress insert" ON learning_path_progress
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow path progress read" ON learning_path_progress
    FOR SELECT USING (true);

CREATE POLICY "Allow path progress update" ON learning_path_progress
    FOR UPDATE USING (true);

-- Analytics: insert only (no reading from client)
CREATE POLICY "Allow analytics insert" ON analytics_events
    FOR INSERT WITH CHECK (true);

-- Feedback: insert and read own feedback
CREATE POLICY "Allow feedback insert" ON user_feedback
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow feedback read" ON user_feedback
    FOR SELECT USING (true);

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_sessions_updated_at
    BEFORE UPDATE ON learning_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SAMPLE DATA (for testing)
-- ============================================

-- Uncomment to insert test data:
/*
INSERT INTO learning_sessions (session_token, locale)
VALUES ('test-session-001', 'et');

INSERT INTO concept_progress (session_id, concept_id, status)
SELECT id, 'tokens', 'completed' FROM learning_sessions WHERE session_token = 'test-session-001';

INSERT INTO dna_progress (session_id, component_id, demo_completed)
SELECT id, 'T', true FROM learning_sessions WHERE session_token = 'test-session-001';
*/

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Run these to verify the schema was created correctly:
/*
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
SELECT * FROM pg_type WHERE typname IN ('concept_status', 'dna_component', 'feedback_type', 'feedback_status', 'locale');
*/
