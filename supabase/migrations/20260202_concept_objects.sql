-- ============================================================
-- Concept Object Architecture (VISION_AND_STRATEGY.md V3.0, Decision 7)
-- Evolves the existing concepts + concept_translations tables
-- into the unified Concept Object system for all 7 stages.
-- ============================================================

-- 1. EVOLVE concepts table (add new columns, all backward-compatible)
-- Existing columns: id TEXT PK, category TEXT, complexity_level INT

-- Create stage enum type
DO $$ BEGIN
  CREATE TYPE evolution_stage AS ENUM (
    'dna', 'seed', 'sprout', 'istik', 'tree', 'fruits', 'orchard'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Add new columns to concepts
ALTER TABLE concepts ADD COLUMN IF NOT EXISTS stage evolution_stage;
ALTER TABLE concepts ADD COLUMN IF NOT EXISTS parent_id TEXT REFERENCES concepts(id) ON DELETE SET NULL;
ALTER TABLE concepts ADD COLUMN IF NOT EXISTS sort_order INT NOT NULL DEFAULT 0;
ALTER TABLE concepts ADD COLUMN IF NOT EXISTS visual_type TEXT CHECK (visual_type IN (
  'card', 'interactive', 'sandbox', 'animation', 'diagram', 'timeline'
)) DEFAULT 'card';
ALTER TABLE concepts ADD COLUMN IF NOT EXISTS icon TEXT;
ALTER TABLE concepts ADD COLUMN IF NOT EXISTS color TEXT;
ALTER TABLE concepts ADD COLUMN IF NOT EXISTS related_program_id TEXT;
ALTER TABLE concepts ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE concepts ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT now();
ALTER TABLE concepts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Backfill stage from category for existing DNA rows
UPDATE concepts SET stage = 'dna' WHERE category = 'dna' AND stage IS NULL;

-- Make stage NOT NULL after backfill (safe since we only have dna rows)
-- We do this in a DO block to handle the case where it's already NOT NULL
DO $$ BEGIN
  ALTER TABLE concepts ALTER COLUMN stage SET NOT NULL;
EXCEPTION WHEN others THEN NULL;
END $$;

-- Set sort_order for existing DNA concepts
UPDATE concepts SET sort_order = 0 WHERE id = 'tokenization' AND sort_order = 0;
UPDATE concepts SET sort_order = 1 WHERE id = 'embeddings' AND sort_order = 0;
UPDATE concepts SET sort_order = 2 WHERE id = 'attention' AND sort_order = 0;
UPDATE concepts SET sort_order = 3 WHERE id = 'prediction' AND sort_order = 0;

-- 2. EVOLVE concept_translations table (add new columns)
-- Existing columns: concept_id TEXT FK, locale TEXT, title TEXT, explanation TEXT, metaphor TEXT, question TEXT

ALTER TABLE concept_translations ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE concept_translations ADD COLUMN IF NOT EXISTS deep_dive TEXT;
ALTER TABLE concept_translations ADD COLUMN IF NOT EXISTS completion_message TEXT;
ALTER TABLE concept_translations ADD COLUMN IF NOT EXISTS hint TEXT;

-- 3. CREATE concept_relationships table
CREATE TABLE IF NOT EXISTS concept_relationships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_id TEXT NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
  target_id TEXT NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
  relationship TEXT NOT NULL CHECK (relationship IN (
    'prerequisite',     -- source must be understood before target
    'deepens',          -- target is a deeper version of source
    'applies',          -- target is a practical application of source
    'related',          -- general relationship
    'part-of'           -- source is a sub-concept of target
  )),
  strength FLOAT NOT NULL DEFAULT 0.5 CHECK (strength BETWEEN 0 AND 1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(source_id, target_id, relationship)
);

-- 4. RLS for concept_relationships
ALTER TABLE concept_relationships ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read concept_relationships') THEN
    CREATE POLICY "Public read concept_relationships" ON concept_relationships FOR SELECT USING (true);
  END IF;
END $$;

-- 5. INDEXES
CREATE INDEX IF NOT EXISTS idx_concepts_stage_sort ON concepts(stage, sort_order);
CREATE INDEX IF NOT EXISTS idx_concepts_parent ON concepts(parent_id);
CREATE INDEX IF NOT EXISTS idx_concepts_published ON concepts(is_published) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_concept_translations_locale ON concept_translations(locale);
CREATE INDEX IF NOT EXISTS idx_concept_relationships_source ON concept_relationships(source_id);
CREATE INDEX IF NOT EXISTS idx_concept_relationships_target ON concept_relationships(target_id);

-- 6. Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_concepts_updated_at ON concepts;
CREATE TRIGGER update_concepts_updated_at
    BEFORE UPDATE ON concepts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
