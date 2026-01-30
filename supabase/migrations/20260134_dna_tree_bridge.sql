-- AI Tree: DNA-to-Tree Bridge
-- Maps the 4 DNA steps to specific Tree nodes for "Deep Dive" navigation
-- Also creates 2 missing nodes (tokenization-process, word2vec)

-- ============================================================
-- 1. Create missing tree nodes
-- ============================================================

-- Tokenization process node (child of era-transformers)
INSERT INTO nodes (id, parent_id, name, type, status, complexity, year_introduced, sort_order) VALUES
  ('tokenization-process', 'era-transformers', 'Tokenization (BPE)', 'architecture', 'active', 2, 2016, 5)
ON CONFLICT (id) DO NOTHING;

-- Word2Vec / Embeddings node (child of era-neural, predates Transformers)
INSERT INTO nodes (id, parent_id, name, type, status, complexity, year_introduced, sort_order) VALUES
  ('word2vec', 'era-neural', 'Word2Vec / Embeddings', 'architecture', 'active', 3, 2013, 7)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 2. Translations for new nodes (EN + ET)
-- ============================================================

INSERT INTO node_translations (node_id, locale, display_name, description, significance, metaphor) VALUES
  (
    'tokenization-process', 'en',
    'Tokenization (BPE)',
    'The process of splitting raw text into subword tokens using algorithms like Byte Pair Encoding. This is the first step in any modern language model — converting human language into discrete units the model can process.',
    'Without tokenization, AI cannot begin to process language. BPE solved the open-vocabulary problem by splitting rare words into common subword pieces.',
    'Like a jeweler cutting a rough diamond into precise facets — each cut reveals structure that was always there.'
  ),
  (
    'tokenization-process', 'et',
    'Tokeniseerimine (BPE)',
    'Teksti tükeldamine alamsonatokeniteks, kasutades algoritme nagu Byte Pair Encoding. See on iga kaasaegse keelemudeli esimene samm — inimkeele muutmine diskreetseteks ühikuteks, mida mudel saab töödelda.',
    'Ilma tokeniseerimiseta ei saa AI keelt töödelda. BPE lahendas avatud sõnavara probleemi, jagades haruldased sõnad levinud alamosadeks.',
    'Nagu juveliiritöö — toorkivi lõigatakse täpseteks tahkudeks, paljastades struktuuri, mis oli alati olemas.'
  ),
  (
    'word2vec', 'en',
    'Word2Vec / Embeddings',
    'A technique that maps words to dense numerical vectors where semantic meaning is preserved. Words with similar meanings cluster together in vector space. This breakthrough showed that AI could learn the meaning of words from context alone.',
    'Word2Vec proved that meaning could be captured as geometry — "king minus man plus woman equals queen" became the most famous equation in NLP.',
    'Like GPS coordinates for ideas — every concept has a location, and similar ideas are neighbors on the map.'
  ),
  (
    'word2vec', 'et',
    'Word2Vec / Vektorid',
    'Tehnika, mis teisendab sõnad tihedateks arvuvektoriteks, kus semantiline tähendus on säilinud. Sarnase tähendusega sõnad koonduvad vektorruumis. See läbimurre näitas, et AI suudab õppida sõnade tähendust ainult kontekstist.',
    'Word2Vec tõestas, et tähendust saab jäädvustada geomeetriana — "kuningas miinus mees pluss naine võrdub kuninganna" sai NLP kuulsaimaks võrrandiks.',
    'Nagu GPS-koordinaadid ideede jaoks — igal mõistel on asukoht ja sarnased ideed on kaardil naabrid.'
  )
ON CONFLICT (node_id, locale) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  significance = EXCLUDED.significance,
  metaphor = EXCLUDED.metaphor;

-- ============================================================
-- 3. Metadata for new nodes
-- ============================================================

INSERT INTO node_metadata (node_id, year_introduced, key_paper_title, key_paper_url, primary_use_case, visual_motif, related_program_id, marketing_hook_en, marketing_hook_et) VALUES
  (
    'tokenization-process', 2016,
    'Neural Machine Translation of Rare Words with Subword Units',
    'https://arxiv.org/abs/1508.07909',
    'Splitting text into processable subword tokens for any language model',
    'scissors',
    'aiki',
    'The first step in every AI thought — AIKI Week 2 starts here.',
    'Iga AI mõtte esimene samm — AIKI 2. nädal algab siit.'
  ),
  (
    'word2vec', 2013,
    'Efficient Estimation of Word Representations in Vector Space',
    'https://arxiv.org/abs/1301.3781',
    'Learning word meaning as numerical vectors from unlabeled text',
    'compass',
    'aiki',
    'How AI learns what words mean — a foundational AIKI topic.',
    'Kuidas AI õpib sõnade tähendust — AIKI põhiteema.'
  )
ON CONFLICT (node_id) DO UPDATE SET
  year_introduced = EXCLUDED.year_introduced,
  key_paper_title = EXCLUDED.key_paper_title,
  key_paper_url = EXCLUDED.key_paper_url,
  primary_use_case = EXCLUDED.primary_use_case,
  visual_motif = EXCLUDED.visual_motif,
  related_program_id = EXCLUDED.related_program_id,
  marketing_hook_en = EXCLUDED.marketing_hook_en,
  marketing_hook_et = EXCLUDED.marketing_hook_et;

-- ============================================================
-- 4. Add dna_concept_id column to node_metadata for bridge
-- ============================================================

ALTER TABLE node_metadata
  ADD COLUMN IF NOT EXISTS dna_concept_id TEXT REFERENCES concepts(id);

-- ============================================================
-- 5. Set the DNA-to-Tree bridge mappings
-- ============================================================

-- Tokenization (DNA) → tokenization-process (Tree)
UPDATE node_metadata SET dna_concept_id = 'tokenization'
WHERE node_id = 'tokenization-process';

-- Embeddings (DNA) → word2vec (Tree)
UPDATE node_metadata SET dna_concept_id = 'embeddings'
WHERE node_id = 'word2vec';

-- Attention (DNA) → attention-paper (Tree)
UPDATE node_metadata SET dna_concept_id = 'attention'
WHERE node_id = 'attention-paper';

-- Prediction (DNA) → gpt-1 (Tree)
UPDATE node_metadata SET dna_concept_id = 'prediction'
WHERE node_id = 'gpt-1';
