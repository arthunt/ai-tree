-- ============================================================
-- Concept Relationships: prerequisites, deepens, applies, related
-- Populates the concept_relationships table with learning flow
-- ============================================================

-- =============================================
-- 1. INTRA-STAGE: DNA (sequential learning)
-- =============================================
INSERT INTO concept_relationships (source_id, target_id, relationship, strength) VALUES
  -- Tokenization → Embeddings (tokens become vectors)
  ('tokenization', 'embeddings',  'prerequisite', 0.95),
  -- Embeddings → Attention (vectors are compared via attention)
  ('embeddings',   'attention',   'prerequisite', 0.9),
  -- Attention → Prediction (attention drives next-token prediction)
  ('attention',    'prediction',  'prerequisite', 0.9)
ON CONFLICT (source_id, target_id, relationship) DO UPDATE SET strength = EXCLUDED.strength;

-- =============================================
-- 2. INTRA-STAGE: Seed (within categories)
-- =============================================
INSERT INTO concept_relationships (source_id, target_id, relationship, strength) VALUES
  -- Data category chain
  ('dataset',       'common-crawl',    'deepens',      0.8),
  ('dataset',       'the-pile',        'deepens',      0.8),
  ('dataset',       'data-cleaning',   'prerequisite', 0.85),
  ('data-cleaning', 'bias-in-data',    'related',      0.7),
  -- Training category chain
  ('loss-function',    'backpropagation', 'prerequisite', 0.9),
  ('backpropagation',  'epochs',          'prerequisite', 0.8),
  ('epochs',           'overfitting',     'related',      0.75),
  ('compute-cluster',  'epochs',          'related',      0.6),
  -- Model category chain
  ('weights',      'base-model',   'prerequisite', 0.85),
  ('base-model',   'checkpoints',  'related',      0.7),
  ('base-model',   'evaluation',   'prerequisite', 0.8),
  ('overfitting',  'evaluation',   'related',      0.7)
ON CONFLICT (source_id, target_id, relationship) DO UPDATE SET strength = EXCLUDED.strength;

-- =============================================
-- 3. INTRA-STAGE: Sprout (emergent properties)
-- =============================================
INSERT INTO concept_relationships (source_id, target_id, relationship, strength) VALUES
  ('generalization',       'hallucination',        'related',      0.75),
  ('context-windows',      'prompting-basics',     'prerequisite', 0.8),
  ('temperature-sampling', 'hallucination',        'related',      0.65),
  ('representations',      'generalization',       'prerequisite', 0.7),
  ('prompting-basics',     'temperature-sampling', 'related',      0.6)
ON CONFLICT (source_id, target_id, relationship) DO UPDATE SET strength = EXCLUDED.strength;

-- =============================================
-- 4. CROSS-STAGE: DNA → Seed (mechanics enable training)
-- =============================================
INSERT INTO concept_relationships (source_id, target_id, relationship, strength) VALUES
  -- Tokenization feeds into datasets
  ('tokenization', 'dataset',        'prerequisite', 0.85),
  -- Embeddings underpin the model's weights
  ('embeddings',   'weights',        'prerequisite', 0.8),
  -- Prediction connects to loss function (training optimizes prediction)
  ('prediction',   'loss-function',  'prerequisite', 0.9),
  -- Attention relates to compute requirements
  ('attention',    'compute-cluster','related',      0.6)
ON CONFLICT (source_id, target_id, relationship) DO UPDATE SET strength = EXCLUDED.strength;

-- =============================================
-- 5. CROSS-STAGE: Seed → Sprout (training produces emergence)
-- =============================================
INSERT INTO concept_relationships (source_id, target_id, relationship, strength) VALUES
  -- Training produces generalization
  ('base-model',       'generalization',       'prerequisite', 0.9),
  -- Model architecture → context windows
  ('weights',          'context-windows',      'related',      0.65),
  -- Overfitting vs generalization
  ('overfitting',      'generalization',       'related',      0.8),
  -- Training → hallucination as emergent failure
  ('evaluation',       'hallucination',        'related',      0.7),
  -- Base model → representations
  ('base-model',       'representations',      'prerequisite', 0.85),
  -- Epochs → temperature (training controls distribution)
  ('epochs',           'temperature-sampling', 'related',      0.5)
ON CONFLICT (source_id, target_id, relationship) DO UPDATE SET strength = EXCLUDED.strength;

-- =============================================
-- 6. CROSS-STAGE: Sprout → Fruits (properties enable apps)
-- =============================================
INSERT INTO concept_relationships (source_id, target_id, relationship, strength) VALUES
  -- Prompting → chatbot (AIKI)
  ('prompting-basics', 'aiki',      'applies', 0.9),
  -- Generalization → reasoning assistant (AIVO)
  ('generalization',   'aivo',      'applies', 0.85),
  -- Representations → code generation
  ('representations',  'codegen',   'applies', 0.8),
  -- Context windows → multimodal (Visionary)
  ('context-windows',  'visionary', 'applies', 0.75),
  -- Temperature → creative applications
  ('temperature-sampling', 'aivo',  'related', 0.6)
ON CONFLICT (source_id, target_id, relationship) DO UPDATE SET strength = EXCLUDED.strength;

-- =============================================
-- 7. CROSS-STAGE: Fruits → Orchard (apps create careers)
-- =============================================
INSERT INTO concept_relationships (source_id, target_id, relationship, strength) VALUES
  -- Code generation → AI Engineer career
  ('codegen',    'ai-engineer',      'applies', 0.9),
  -- Chatbot (AIKI) → Prompt Architect career
  ('aiki',       'prompt-architect', 'applies', 0.85),
  -- Reasoning (AIVO) → Data Scientist career
  ('aivo',       'data-scientist',   'applies', 0.8),
  -- All fruits → AI Ethicist (cross-cutting)
  ('aiki',       'ai-ethicist',      'related', 0.6),
  ('aivo',       'ai-ethicist',      'related', 0.6),
  ('codegen',    'ai-ethicist',      'related', 0.6),
  ('visionary',  'ai-ethicist',      'related', 0.6),
  -- Code generation → MLOps
  ('codegen',    'mlops-specialist', 'applies', 0.75),
  -- Visionary → AI Engineer (multimodal systems)
  ('visionary',  'ai-engineer',      'related', 0.65)
ON CONFLICT (source_id, target_id, relationship) DO UPDATE SET strength = EXCLUDED.strength;

-- =============================================
-- 8. LONG-RANGE: DNA → Fruits (deep connections)
-- =============================================
INSERT INTO concept_relationships (source_id, target_id, relationship, strength) VALUES
  -- Attention mechanism is core to all modern AI apps
  ('attention',    'aiki',    'deepens', 0.7),
  ('attention',    'aivo',    'deepens', 0.7),
  ('attention',    'codegen', 'deepens', 0.7),
  -- Tokenization shapes how models understand language
  ('tokenization', 'aiki',    'deepens', 0.5)
ON CONFLICT (source_id, target_id, relationship) DO UPDATE SET strength = EXCLUDED.strength;
