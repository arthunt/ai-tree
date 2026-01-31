-- ============================================================
-- 5.3 Tree ↔ Concept Object Bridge
-- Adds concept_id FK to nodes table so tree nodes can link
-- directly to the unified concept system.
-- ============================================================

-- 1. Add concept_id column to nodes table
ALTER TABLE nodes ADD COLUMN IF NOT EXISTS concept_id TEXT REFERENCES concepts(id) ON DELETE SET NULL;

-- 2. Create index for fast lookups
CREATE INDEX IF NOT EXISTS idx_nodes_concept_id ON nodes(concept_id) WHERE concept_id IS NOT NULL;

-- 3. Link overlapping tree nodes to matching concepts
-- DNA stage concepts ↔ tree architecture nodes
UPDATE nodes SET concept_id = 'tokenization'    WHERE id = 'tokenization-process' AND concept_id IS NULL;
UPDATE nodes SET concept_id = 'embeddings'       WHERE id = 'word2vec'              AND concept_id IS NULL;
UPDATE nodes SET concept_id = 'attention'        WHERE id = 'attention-paper'       AND concept_id IS NULL;
UPDATE nodes SET concept_id = 'prediction'       WHERE id = 'gpt-1'                AND concept_id IS NULL;

-- Seed stage concepts ↔ tree nodes
UPDATE nodes SET concept_id = 'backpropagation'  WHERE id = 'backpropagation'       AND concept_id IS NULL;

-- NOTE: As more concepts are added to the tree stage, they can be linked here.
-- The concept_id is nullable — not all tree nodes need a linked concept.
