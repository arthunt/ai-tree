-- AI Tree DNA Content Migration
-- Creates core tables and seeds 4 DNA concepts in EN + ET

-- 1. Create tables (idempotent)
CREATE TABLE IF NOT EXISTS concepts (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL DEFAULT 'dna',
  complexity_level INT NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS concept_translations (
  concept_id TEXT REFERENCES concepts(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  title TEXT NOT NULL,
  explanation TEXT NOT NULL,
  metaphor TEXT NOT NULL,
  question TEXT,
  PRIMARY KEY (concept_id, locale)
);

-- 2. Enable RLS (Row Level Security) but allow public read
ALTER TABLE concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE concept_translations ENABLE ROW LEVEL SECURITY;

-- Public read policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read concepts') THEN
    CREATE POLICY "Public read concepts" ON concepts FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read translations') THEN
    CREATE POLICY "Public read translations" ON concept_translations FOR SELECT USING (true);
  END IF;
END $$;

-- 3. Insert DNA concepts
INSERT INTO concepts (id, category, complexity_level) VALUES
  ('tokenization', 'dna', 1),
  ('embeddings',   'dna', 1),
  ('attention',    'dna', 2),
  ('prediction',   'dna', 2)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert English translations
INSERT INTO concept_translations (concept_id, locale, title, explanation, metaphor, question) VALUES
  (
    'tokenization', 'en',
    'Tokenization',
    'The raw input text is broken down into small chunks called tokens. These are the basic units of meaning the AI can process — like individual puzzle pieces that together form the full picture.',
    'Like chopping vegetables for a stew — whole ingredients become bite-sized pieces the recipe can work with.',
    'How does the machine start reading?'
  ),
  (
    'embeddings', 'en',
    'Vector Embeddings',
    'Each token is converted into a list of numbers that represent its meaning in a high-dimensional space. Words with similar meanings end up close together, forming a map of language.',
    'Like GPS coordinates for ideas — "king" and "queen" are neighbors, while "king" and "banana" are continents apart.',
    'How does the AI understand what words mean?'
  ),
  (
    'attention', 'en',
    'Self-Attention',
    'The model analyzes the relationship between every token and every other token in the input. This lets it understand context — knowing that "bank" means something different in "river bank" vs "bank account".',
    'Like a spotlight in a dark room — it illuminates the connections between words, revealing which ones matter most to each other.',
    'How does it understand context?'
  ),
  (
    'prediction', 'en',
    'Prediction',
    'Based on all the context gathered, the model calculates the probability of every possible next token. It picks the most likely one (or samples creatively) and repeats — one token at a time building the response.',
    'Like autocomplete on steroids — instead of guessing one word, it weighs thousands of possibilities using everything it has learned.',
    'How does it actually generate text?'
  )
ON CONFLICT (concept_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  explanation = EXCLUDED.explanation,
  metaphor = EXCLUDED.metaphor,
  question = EXCLUDED.question;

-- 5. Insert Estonian translations
INSERT INTO concept_translations (concept_id, locale, title, explanation, metaphor, question) VALUES
  (
    'tokenization', 'et',
    'Tokeniseerimine',
    'Tekst puruneb väikesteks numbriteks — ainus keel, mida masinad mõistavad.',
    'Puude lõhkumine — terved palgid muutuvad halgudeks, mis ahju mahuvad.',
    'Kuidas masin lugema hakkab?'
  ),
  (
    'embeddings', 'et',
    'Vektorid',
    'Iga token muudetakse arvude loendiks, mis esindab selle tähendust kõrgemõõtmelises ruumis. Sarnase tähendusega sõnad satuvad lähestikku, moodustades keelekaardi.',
    'Nagu GPS-koordinaadid ideede jaoks — "kuningas" ja "kuninganna" on naabrid, samas kui "kuningas" ja "banaan" on mandrite kaugusel.',
    'Kuidas tehisintellekt mõistab sõnade tähendust?'
  ),
  (
    'attention', 'et',
    'Enesetähelepanu',
    'Mudel analüüsib iga tokeni seost kõigi teiste tokenitega sisendis. See võimaldab mõista konteksti — teadmist, et "pank" tähendab erinevat "jõepank" ja "pangakonto" puhul.',
    'Nagu prožektor pimedas ruumis — see valgustab sõnade vahelisi seoseid, paljastades, millised on üksteise jaoks kõige olulisemad.',
    'Kuidas see mõistab konteksti?'
  ),
  (
    'prediction', 'et',
    'Ennustamine',
    'Kogu kogutud konteksti põhjal arvutab mudel igale võimalikule järgmisele tokenile tõenäosuse. See valib kõige tõenäolisema (või valib loovalt) ja kordab — üks token korraga luues vastust.',
    'Nagu automaattäiendus steroididel — ühe sõna asemel kaalub see tuhandeid võimalusi, kasutades kõike õpitut.',
    'Kuidas see tegelikult teksti genereerib?'
  )
ON CONFLICT (concept_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  explanation = EXCLUDED.explanation,
  metaphor = EXCLUDED.metaphor,
  question = EXCLUDED.question;
