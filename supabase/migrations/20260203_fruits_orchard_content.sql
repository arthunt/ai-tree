-- ============================================================
-- Fruits & Orchard stage concepts
-- Migrates hardcoded APPLICATIONS + CAREERS arrays to Concept Objects
-- ============================================================

-- ── Fruits concepts (Applications) ──────────────────────────

INSERT INTO concepts (id, category, complexity_level, stage, sort_order, visual_type, icon, color)
VALUES
  ('aiki',       'fruits', 1, 'fruits', 0, 'card', 'MessageSquare', '#F97316'),
  ('aivo',       'fruits', 1, 'fruits', 1, 'card', 'Brain',         '#8B5CF6'),
  ('codegen',    'fruits', 1, 'fruits', 2, 'card', 'Code',          '#10B981'),
  ('visionary',  'fruits', 1, 'fruits', 3, 'card', 'Image',         '#3B82F6')
ON CONFLICT (id) DO UPDATE SET
  stage = EXCLUDED.stage,
  sort_order = EXCLUDED.sort_order,
  visual_type = EXCLUDED.visual_type,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color;

-- EN translations
INSERT INTO concept_translations (concept_id, locale, title, subtitle, explanation, metaphor)
VALUES
  ('aiki', 'en', 'AIKI',
    'Creative',
    'AI-powered creative writing assistant. Generate stories, poems, and scripts with context-aware suggestions.',
    'Like having a co-author who never runs out of ideas — you lead, and it fills in the creative gaps.'),
  ('aivo', 'en', 'AIVO',
    'Audio',
    'Voice synthesis and audio generation engine. Create lifelike speech from text in multiple languages.',
    'Like a voice actor who speaks every language — turn any text into natural, expressive speech.'),
  ('codegen', 'en', 'CodeGen',
    'Development',
    'Intelligent code completion and refactoring tool. Supports TypeScript, Python, and Rust.',
    'Like pair programming with an expert — it reads your intent and writes the implementation.'),
  ('visionary', 'en', 'Visionary',
    'Visual',
    'Text-to-image generation pipeline. Create stunning visuals from natural language prompts.',
    'Like a painter who understands words — describe what you see in your mind, and it appears on canvas.')
ON CONFLICT (concept_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  explanation = EXCLUDED.explanation,
  metaphor = EXCLUDED.metaphor;

-- ET translations
INSERT INTO concept_translations (concept_id, locale, title, subtitle, explanation, metaphor)
VALUES
  ('aiki', 'et', 'AIKI',
    'Looming',
    'Tehisintellektiga loominguline kirjutamisassistent. Loo lugusid, luuletusi ja stsenaariume kontekstiteadlike soovitustega.',
    'Nagu kaasautor, kellel ei saa ideed kunagi otsa — sina juhid ja tema täidab loovad lüngad.'),
  ('aivo', 'et', 'AIVO',
    'Heli',
    'Häälsünteesi ja heliloome mootor. Loo elutruu kõne tekstist mitmes keeles.',
    'Nagu näitleja, kes räägib iga keelt — muuda iga tekst loomulikuks, väljendusrikkaks kõneks.'),
  ('codegen', 'et', 'CodeGen',
    'Arendus',
    'Intelligentne koodi täiendamise ja ümbertöötlemise tööriist. Toetab TypeScripti, Pythonit ja Rusti.',
    'Nagu paariprogrammeerimine eksperdiga — see loeb sinu kavatsust ja kirjutab teostuse.'),
  ('visionary', 'et', 'Visionary',
    'Visuaal',
    'Tekst-pildiks genereerimise torujuhe. Loo vapustavaid visuaale loomuliku keele kirjeldustest.',
    'Nagu maalikunstnik, kes mõistab sõnu — kirjelda, mida näed oma meeles, ja see ilmub lõuendile.')
ON CONFLICT (concept_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  explanation = EXCLUDED.explanation,
  metaphor = EXCLUDED.metaphor;

-- ── Orchard concepts (Careers) ──────────────────────────────

INSERT INTO concepts (id, category, complexity_level, stage, sort_order, visual_type, icon, color)
VALUES
  ('ai-engineer',       'orchard', 1, 'orchard', 0, 'card', 'Code',        '#F43F5E'),
  ('prompt-architect',  'orchard', 1, 'orchard', 1, 'card', 'Palette',     '#F43F5E'),
  ('data-scientist',    'orchard', 1, 'orchard', 2, 'card', 'LineChart',   '#F43F5E'),
  ('ai-ethicist',       'orchard', 1, 'orchard', 3, 'card', 'ShieldCheck', '#F43F5E'),
  ('mlops-specialist',  'orchard', 1, 'orchard', 4, 'card', 'Cpu',         '#F43F5E')
ON CONFLICT (id) DO UPDATE SET
  stage = EXCLUDED.stage,
  sort_order = EXCLUDED.sort_order,
  visual_type = EXCLUDED.visual_type,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color;

-- EN translations
INSERT INTO concept_translations (concept_id, locale, title, subtitle, explanation, metaphor, hint)
VALUES
  ('ai-engineer', 'en', 'AI Engineer',
    'Engineering',
    'Build and deploy the models that power intelligent applications. Requires Python, PyTorch/TensorFlow.',
    'Like a master builder constructing the brain — you design the neural architecture that thinks.',
    '$120k - $250k'),
  ('prompt-architect', 'en', 'Prompt Architect',
    'Design / Logic',
    'Craft and optimize the instructions that guide LLMs to desired outputs. High creativity required.',
    'Like a conductor directing an orchestra — the right instructions bring harmony from complexity.',
    '$90k - $180k'),
  ('data-scientist', 'en', 'Data Scientist',
    'Science',
    'Analyze vast datasets to find patterns and train predictive models.',
    'Like an archaeologist sifting through layers — patterns emerge from mountains of raw data.',
    '$110k - $200k'),
  ('ai-ethicist', 'en', 'AI Ethicist',
    'Policy',
    'Ensure AI systems are fair, unbiased, and safe for humanity.',
    'Like a guardian of the garden — ensuring every fruit grown is healthy and nourishing.',
    '$100k - $190k'),
  ('mlops-specialist', 'en', 'ML Ops Specialist',
    'Operations',
    'Manage the infrastructure and pipelines that keep AI models running in production.',
    'Like a chief engineer keeping the power plant running — models are only useful if they stay online.',
    '$130k - $240k')
ON CONFLICT (concept_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  explanation = EXCLUDED.explanation,
  metaphor = EXCLUDED.metaphor,
  hint = EXCLUDED.hint;

-- ET translations
INSERT INTO concept_translations (concept_id, locale, title, subtitle, explanation, metaphor, hint)
VALUES
  ('ai-engineer', 'et', 'AI Insener',
    'Inseneeria',
    'Ehita ja juuruta mudeleid, mis toitavad intelligentseid rakendusi. Nõuab Pythonit, PyTorch/TensorFlow.',
    'Nagu meisterehitaja, kes konstrueerib aju — sina disainid mõtleva närvivõrgu arhitektuuri.',
    '$120k - $250k'),
  ('prompt-architect', 'et', 'Viipa Arhitekt',
    'Disain / Loogika',
    'Loo ja optimeeri juhiseid, mis suunavad keelemudeleid soovitud väljunditeni. Nõuab kõrget loovust.',
    'Nagu dirigent, kes juhib orkestrit — õiged juhised toovad keerukusest harmooniat.',
    '$90k - $180k'),
  ('data-scientist', 'et', 'Andmeteadlane',
    'Teadus',
    'Analüüsi tohutuid andmekogusid mustrite leidmiseks ja ennustavate mudelite treenimiseks.',
    'Nagu arheoloog, kes sõelub kihte — mustrid kerkivad esile tohututest toorandmetest.',
    '$110k - $200k'),
  ('ai-ethicist', 'et', 'AI Eetik',
    'Poliitika',
    'Taga, et tehisintellekti süsteemid on õiglased, erapooletud ja inimkonnale ohutud.',
    'Nagu aia valvur — tagades, et iga kasvatatud vili on tervislik ja toitev.',
    '$100k - $190k'),
  ('mlops-specialist', 'et', 'ML Ops Spetsialist',
    'Operatsioonid',
    'Halda infrastruktuuri ja torujuhtmeid, mis hoiavad AI mudeleid tootmises töös.',
    'Nagu peainsener, kes hoiab elektrijaama töös — mudelid on kasulikud ainult siis, kui nad püsivad võrgus.',
    '$130k - $240k')
ON CONFLICT (concept_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  explanation = EXCLUDED.explanation,
  metaphor = EXCLUDED.metaphor,
  hint = EXCLUDED.hint;
