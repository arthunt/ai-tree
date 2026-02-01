-- ============================================================
-- FIRST EXPERIMENTS: Tokenization Title + Landing Hook
-- Tests three framings per concept per locale
-- Reference: docs/I18N_TECHNICAL_MIGRATION.md, Section 5.3
-- ============================================================

INSERT INTO content_variants (content_key, locale, variant_name, content, weight) VALUES

-- Estonian variants for tokenization title
('concept:tokenization:title', 'et', 'base',
 'Kuidas AI teksti loeb', 1.0),
('concept:tokenization:title', 'et', 'practical',
 'Miks eesti keel on AI-le kallis', 1.0),
('concept:tokenization:title', 'et', 'provocative',
 'Sinu lause koosneb 47 tükist', 1.0),

-- English variants for tokenization title
('concept:tokenization:title', 'en', 'base',
 'How AI Reads Text', 1.0),
('concept:tokenization:title', 'en', 'practical',
 'Why Your Language Costs AI More', 1.0),
('concept:tokenization:title', 'en', 'provocative',
 'Your Sentence Has 47 Pieces', 1.0),

-- Russian variants for tokenization title
('concept:tokenization:title', 'ru', 'base',
 'Как ИИ читает текст', 1.0),
('concept:tokenization:title', 'ru', 'practical',
 'Почему русский язык дорого обходится ИИ', 1.0),
('concept:tokenization:title', 'ru', 'provocative',
 'Ваше предложение состоит из 47 частей', 1.0),

-- Estonian landing hook variants
('landing:hook', 'et', 'base',
 'Sa juba kasutad AI-d. Nüüd mõista, kuidas see töötab.', 1.0),
('landing:hook', 'et', 'practical',
 'AI kirjutab su e-kirju. Kas sa ei peaks teadma, kuidas?', 1.0),
('landing:hook', 'et', 'provocative',
 'AI tegi 47 otsust, kuni sa seda lauset lugesid.', 1.0),

-- English landing hook variants
('landing:hook', 'en', 'base',
 'You already use AI. Now understand how it works.', 1.0),
('landing:hook', 'en', 'practical',
 'AI writes your emails. Shouldn''t you know how?', 1.0),
('landing:hook', 'en', 'provocative',
 'AI made 47 decisions while you read this sentence.', 1.0),

-- Russian landing hook variants
('landing:hook', 'ru', 'base',
 'Вы уже используете ИИ. Теперь поймите, как он работает.', 1.0),
('landing:hook', 'ru', 'practical',
 'ИИ пишет ваши письма. Не стоит ли разобраться, как?', 1.0),
('landing:hook', 'ru', 'provocative',
 'ИИ принял 47 решений, пока вы читали это предложение.', 1.0)

ON CONFLICT (content_key, locale, variant_name) DO UPDATE SET
  content = EXCLUDED.content,
  updated_at = now();
