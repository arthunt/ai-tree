-- AI Tree: Seed Program Data
-- AIKI, AIVO, AIME programs with full content (ET + EN)

-- ============================================================
-- 1. INSERT PROGRAMS
-- ============================================================

INSERT INTO programs (
  id, slug, code, color, icon,
  duration_weeks, academic_hours,
  price_cents,
  graduate_discount_percent, graduate_discount_for,
  installment_count, installment_amount_cents, installment_fee_percent,
  is_bundle, included_programs, bundle_savings_cents,
  max_participants, is_active, sort_order
) VALUES
  -- AIKI: AI Instructor Training
  (
    'aiki', 'aiki', 'AIKI', '#6366f1', 'GraduationCap',
    6, 60,
    159000,  -- €1590
    NULL, NULL,
    3, 56300, 6.23,  -- 3 × €563 = €1689
    false, NULL, NULL,
    20, true, 1
  ),
  -- AIVO: AI Automation Module
  (
    'aivo', 'aivo', 'AIVO', '#10b981', 'Zap',
    4, 40,
    129000,  -- €1290
    30, 'aiki',  -- 30% off for AIKI graduates = €900
    3, 46000, 6.98,  -- 3 × €460 = €1380
    false, NULL, NULL,
    20, true, 2
  ),
  -- AIME: AI Master Bundle
  (
    'aime', 'aime', 'AIME', '#8b5cf6', 'Crown',
    10, 100,
    249000,  -- €2490
    NULL, NULL,
    4, 67300, 8.11,  -- 4 × €673 = €2692
    true, ARRAY['aiki', 'aivo'], 39000,  -- Saves €390
    15, true, 3
  )
ON CONFLICT (id) DO UPDATE SET
  price_cents = EXCLUDED.price_cents,
  graduate_discount_percent = EXCLUDED.graduate_discount_percent,
  installment_count = EXCLUDED.installment_count,
  installment_amount_cents = EXCLUDED.installment_amount_cents,
  updated_at = now();

-- ============================================================
-- 2. INSERT PROGRAM TRANSLATIONS
-- ============================================================

-- AIKI Estonian
INSERT INTO program_translations (program_id, locale, name, full_name, tagline, description, target_audience, outcomes) VALUES
(
  'aiki', 'et',
  'AIKI',
  'Rakenduslik AI: Kasutajast Instruktoriks',
  'Saa AI koolitajaks 6 nädalaga',
  'AIKI on intensiivne 6-nädalane programm, mis valmistab sind ette AI koolitajaks. Omandad sügava arusaama AI toimimisest (T-V-A-P mudel), õpid 4C õpetamismetoodikat ja ehitad portfoolio, mis tõestab su kompetentsi.',
  'Koolitajatele, õpetajatele, HR-spetsialistidele ja kõigile, kes soovivad karjääripööret AI valdkonda',
  ARRAY[
    'Mõistad AI toimimist sügavuti (Tokenid, Vektorid, Attention, Prediction)',
    'Valdad 4C õpetamismetoodikat AI teemade jaoks',
    'Ehitad professionaalse portfoolio',
    'Saad tunnistuse, mis kvalifitseerib sind AI koolitajaks'
  ]
)
ON CONFLICT (program_id, locale) DO UPDATE SET
  name = EXCLUDED.name,
  full_name = EXCLUDED.full_name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  target_audience = EXCLUDED.target_audience,
  outcomes = EXCLUDED.outcomes;

-- AIKI English
INSERT INTO program_translations (program_id, locale, name, full_name, tagline, description, target_audience, outcomes) VALUES
(
  'aiki', 'en',
  'AIKI',
  'Applied AI: From User to Instructor',
  'Become an AI instructor in 6 weeks',
  'AIKI is an intensive 6-week program that prepares you to become an AI instructor. You will gain deep understanding of how AI works (T-V-A-P model), master the 4C teaching methodology, and build a portfolio that proves your competence.',
  'For trainers, teachers, HR specialists, and anyone seeking a career pivot into AI',
  ARRAY[
    'Understand AI mechanics deeply (Tokens, Vectors, Attention, Prediction)',
    'Master the 4C teaching methodology for AI topics',
    'Build a professional portfolio',
    'Earn a certificate qualifying you as an AI instructor'
  ]
)
ON CONFLICT (program_id, locale) DO UPDATE SET
  name = EXCLUDED.name,
  full_name = EXCLUDED.full_name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  target_audience = EXCLUDED.target_audience,
  outcomes = EXCLUDED.outcomes;

-- AIVO Estonian
INSERT INTO program_translations (program_id, locale, name, full_name, tagline, description, target_audience, outcomes) VALUES
(
  'aivo', 'et',
  'AIVO',
  'AI Automatiseerimise Moodul',
  'Automatiseeri töövood AI-ga',
  'AIVO on 4-nädalane praktiline programm, mis õpetab sind ehitama AI-põhiseid automatiseerimislahendusi. Kasutad Zapieri, Make''i ja OpenAI API-t, et luua päris töövoogusid.',
  'Ärianalüütikutele, projektijuhtidele, IT-spetsialistidele ja kõigile, kes soovivad automatiseerida tööprotsesse',
  ARRAY[
    'Ehitad töötavaid automatiseerimisi Zapier ja Make platvormidel',
    'Integreerid OpenAI API oma lahendustesse',
    'Lood kliendiprojekti portfooliosse',
    'Saad AIKI lõpetajana 30% soodustust'
  ]
)
ON CONFLICT (program_id, locale) DO UPDATE SET
  name = EXCLUDED.name,
  full_name = EXCLUDED.full_name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  target_audience = EXCLUDED.target_audience,
  outcomes = EXCLUDED.outcomes;

-- AIVO English
INSERT INTO program_translations (program_id, locale, name, full_name, tagline, description, target_audience, outcomes) VALUES
(
  'aivo', 'en',
  'AIVO',
  'AI Automation Module',
  'Automate workflows with AI',
  'AIVO is a 4-week practical program that teaches you to build AI-powered automation solutions. You will use Zapier, Make, and OpenAI API to create real workflows.',
  'For business analysts, project managers, IT specialists, and anyone wanting to automate work processes',
  ARRAY[
    'Build working automations on Zapier and Make platforms',
    'Integrate OpenAI API into your solutions',
    'Create a client project for your portfolio',
    'AIKI graduates get 30% discount'
  ]
)
ON CONFLICT (program_id, locale) DO UPDATE SET
  name = EXCLUDED.name,
  full_name = EXCLUDED.full_name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  target_audience = EXCLUDED.target_audience,
  outcomes = EXCLUDED.outcomes;

-- AIME Estonian
INSERT INTO program_translations (program_id, locale, name, full_name, tagline, description, target_audience, outcomes) VALUES
(
  'aime', 'et',
  'AIME',
  'AI Meistri Pakett',
  'Täielik AI kompetents ühes paketis',
  'AIME ühendab AIKI ja AIVO üheks 10-nädalaseks intensiivprogrammiks. Sama hind kui lõpetaja soodustusega, aga garanteeritud koht mõlemas programmis ja ühtne õpiteekond.',
  'Neile, kes soovivad täielikku AI kompetentsi – nii koolitamiseks kui automatiseerimiseks',
  ARRAY[
    'Omandad AIKI täieliku sisu (AI koolitaja kompetents)',
    'Omandad AIVO täieliku sisu (automatiseerimise kompetents)',
    'Säästad €390 võrreldes eraldi ostmisega',
    'Garanteeritud koht mõlemas programmis'
  ]
)
ON CONFLICT (program_id, locale) DO UPDATE SET
  name = EXCLUDED.name,
  full_name = EXCLUDED.full_name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  target_audience = EXCLUDED.target_audience,
  outcomes = EXCLUDED.outcomes;

-- AIME English
INSERT INTO program_translations (program_id, locale, name, full_name, tagline, description, target_audience, outcomes) VALUES
(
  'aime', 'en',
  'AIME',
  'AI Master Bundle',
  'Complete AI competency in one package',
  'AIME combines AIKI and AIVO into a single 10-week intensive program. Same price as the graduate discount path, but with guaranteed spots in both programs and a unified learning journey.',
  'For those who want complete AI competency – both for training and automation',
  ARRAY[
    'Master all AIKI content (AI instructor competency)',
    'Master all AIVO content (automation competency)',
    'Save €390 compared to buying separately',
    'Guaranteed spot in both programs'
  ]
)
ON CONFLICT (program_id, locale) DO UPDATE SET
  name = EXCLUDED.name,
  full_name = EXCLUDED.full_name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  target_audience = EXCLUDED.target_audience,
  outcomes = EXCLUDED.outcomes;

-- ============================================================
-- 3. INSERT PROGRAM FEATURES
-- ============================================================

-- AIKI Features
INSERT INTO program_features (id, program_id, icon, sort_order) VALUES
  ('f-aiki-1', 'aiki', 'Brain', 1),
  ('f-aiki-2', 'aiki', 'Users', 2),
  ('f-aiki-3', 'aiki', 'Briefcase', 3),
  ('f-aiki-4', 'aiki', 'Award', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO feature_translations (feature_id, locale, title, description) VALUES
  ('f-aiki-1', 'et', 'T-V-A-P Meisterlikkus', 'Sügav arusaam AI toimimisest: Tokenid, Vektorid, Attention, Prediction'),
  ('f-aiki-1', 'en', 'T-V-A-P Mastery', 'Deep understanding of AI mechanics: Tokens, Vectors, Attention, Prediction'),
  ('f-aiki-2', 'et', '4C Õpetamismetoodika', 'Tõestatud raamistik AI teemade õpetamiseks täiskasvanutele'),
  ('f-aiki-2', 'en', '4C Teaching Methodology', 'Proven framework for teaching AI topics to adults'),
  ('f-aiki-3', 'et', 'Portfoolio Projekt', 'Ehita päris õppematerjale, mida saad koheselt kasutada'),
  ('f-aiki-3', 'en', 'Portfolio Project', 'Build real teaching materials you can use immediately'),
  ('f-aiki-4', 'et', 'Tunnistus', 'Ametlik tunnistus, mis kvalifitseerib sind AI koolitajaks'),
  ('f-aiki-4', 'en', 'Certificate', 'Official certificate qualifying you as an AI instructor')
ON CONFLICT (feature_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- AIVO Features
INSERT INTO program_features (id, program_id, icon, sort_order) VALUES
  ('f-aivo-1', 'aivo', 'Workflow', 1),
  ('f-aivo-2', 'aivo', 'Plug', 2),
  ('f-aivo-3', 'aivo', 'Code', 3),
  ('f-aivo-4', 'aivo', 'Percent', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO feature_translations (feature_id, locale, title, description) VALUES
  ('f-aivo-1', 'et', 'No-Code Automatiseerimine', 'Ehita töötavaid lahendusi Zapier ja Make platvormidel'),
  ('f-aivo-1', 'en', 'No-Code Automation', 'Build working solutions on Zapier and Make platforms'),
  ('f-aivo-2', 'et', 'API Integratsioonid', 'Ühenda OpenAI, Claude ja teised AI teenused'),
  ('f-aivo-2', 'en', 'API Integrations', 'Connect OpenAI, Claude, and other AI services'),
  ('f-aivo-3', 'et', 'Kliendiprojekt', 'Loo päris automatiseering portfooliosse'),
  ('f-aivo-3', 'en', 'Client Project', 'Create a real automation for your portfolio'),
  ('f-aivo-4', 'et', '30% Lõpetaja Soodustus', 'AIKI lõpetajad maksavad €900 (tavahind €1290)'),
  ('f-aivo-4', 'en', '30% Graduate Discount', 'AIKI graduates pay €900 (regular €1290)')
ON CONFLICT (feature_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- AIME Features
INSERT INTO program_features (id, program_id, icon, sort_order) VALUES
  ('f-aime-1', 'aime', 'Package', 1),
  ('f-aime-2', 'aime', 'TrendingDown', 2),
  ('f-aime-3', 'aime', 'Shield', 3),
  ('f-aime-4', 'aime', 'Infinity', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO feature_translations (feature_id, locale, title, description) VALUES
  ('f-aime-1', 'et', 'Kõik Ühes', 'AIKI + AIVO täielik sisu ühes programmis'),
  ('f-aime-1', 'en', 'All-in-One', 'Complete AIKI + AIVO content in one program'),
  ('f-aime-2', 'et', 'Säästa €390', 'Sama hind kui lõpetaja soodustusega, aga kohe'),
  ('f-aime-2', 'en', 'Save €390', 'Same price as graduate discount path, but immediate'),
  ('f-aime-3', 'et', 'Garanteeritud Kohad', 'Kindel koht mõlemas programmis'),
  ('f-aime-3', 'en', 'Guaranteed Spots', 'Secure your place in both programs'),
  ('f-aime-4', 'et', 'Ühtne Teekond', '10 nädalat järjest, ilma pausita'),
  ('f-aime-4', 'en', 'Unified Journey', '10 weeks continuous, no gap')
ON CONFLICT (feature_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- ============================================================
-- 4. INSERT CURRICULUM (AIKI Weeks 0-5)
-- ============================================================

INSERT INTO program_curriculum (id, program_id, week_number, hours, type, sort_order) VALUES
  ('c-aiki-0', 'aiki', 0, 6, 'pre-work', 0),
  ('c-aiki-1', 'aiki', 1, 10, 'group', 1),
  ('c-aiki-2', 'aiki', 2, 10, 'group', 2),
  ('c-aiki-3', 'aiki', 3, 10, 'group', 3),
  ('c-aiki-4', 'aiki', 4, 12, 'practice', 4),
  ('c-aiki-5', 'aiki', 5, 12, 'assessment', 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO curriculum_translations (curriculum_id, locale, title, subtitle, topics) VALUES
  ('c-aiki-0', 'et', 'Nädal 0: Eeltöö', 'Iseseisev ettevalmistus', ARRAY['AI Teadmiste Puu läbimine', 'Esmase õppematerjali koostamine', 'Eesmärkide seadmine']),
  ('c-aiki-0', 'en', 'Week 0: Pre-work', 'Independent preparation', ARRAY['Complete AI Knowledge Tree', 'Draft initial teaching material', 'Set learning goals']),
  
  ('c-aiki-1', 'et', 'Nädal 1: AI DNA', 'T-V-A-P mudeli sügav mõistmine', ARRAY['Tokeniseerimine ja sõnavara', 'Vektorid ja embeddings', 'Attention mehanism', 'Prediction ja genereerimine']),
  ('c-aiki-1', 'en', 'Week 1: AI DNA', 'Deep understanding of T-V-A-P model', ARRAY['Tokenization and vocabulary', 'Vectors and embeddings', 'Attention mechanism', 'Prediction and generation']),
  
  ('c-aiki-2', 'et', 'Nädal 2: Õpetamise Kunst', '4C metoodika ja täiskasvanute õpe', ARRAY['4C raamistik (Connection, Concepts, Concrete Practice, Conclusions)', 'Shu-Ha õppimise progressioon', 'Tagasiside andmine (SBI meetod)', 'Grupi dünaamika']),
  ('c-aiki-2', 'en', 'Week 2: Art of Teaching', '4C methodology and adult learning', ARRAY['4C framework (Connection, Concepts, Concrete Practice, Conclusions)', 'Shu-Ha learning progression', 'Giving feedback (SBI method)', 'Group dynamics']),
  
  ('c-aiki-3', 'et', 'Nädal 3: Praktilised Rakendused', 'Prompt engineering ja tööriistad', ARRAY['Prompt engineering tehnikad', 'AI tööriistade ülevaade', 'Kasutuse mustrid', 'Piirangud ja riskid']),
  ('c-aiki-3', 'en', 'Week 3: Practical Applications', 'Prompt engineering and tools', ARRAY['Prompt engineering techniques', 'AI tools overview', 'Usage patterns', 'Limitations and risks']),
  
  ('c-aiki-4', 'et', 'Nädal 4: Portfoolio Arendus', 'Õppematerjalide loomine', ARRAY['Õppekava disain', 'Materjalide koostamine', 'Demo sessioonid grupis', 'Tagasiside tsüklid']),
  ('c-aiki-4', 'en', 'Week 4: Portfolio Development', 'Creating teaching materials', ARRAY['Curriculum design', 'Materials development', 'Demo sessions with group', 'Feedback cycles']),
  
  ('c-aiki-5', 'et', 'Nädal 5: Lõpuprojekt', 'Hindamine ja tunnistus', ARRAY['Lõpuprojekti esitlus', 'Ekspertide tagasiside', 'Portfoolio viimistlus', 'Tunnistuse omistamine']),
  ('c-aiki-5', 'en', 'Week 5: Final Project', 'Assessment and certificate', ARRAY['Final project presentation', 'Expert feedback', 'Portfolio refinement', 'Certificate award'])
ON CONFLICT (curriculum_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  topics = EXCLUDED.topics;

-- ============================================================
-- 5. INSERT CURRICULUM (AIVO Weeks 0-4)
-- ============================================================

INSERT INTO program_curriculum (id, program_id, week_number, hours, type, sort_order) VALUES
  ('c-aivo-0', 'aivo', 0, 4, 'pre-work', 0),
  ('c-aivo-1', 'aivo', 1, 9, 'group', 1),
  ('c-aivo-2', 'aivo', 2, 9, 'group', 2),
  ('c-aivo-3', 'aivo', 3, 9, 'practice', 3),
  ('c-aivo-4', 'aivo', 4, 9, 'assessment', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO curriculum_translations (curriculum_id, locale, title, subtitle, topics) VALUES
  ('c-aivo-0', 'et', 'Nädal 0: Eeltöö', 'Platvormide seadistamine', ARRAY['Zapier konto loomine', 'Make konto loomine', 'OpenAI API võtme hankimine']),
  ('c-aivo-0', 'en', 'Week 0: Pre-work', 'Platform setup', ARRAY['Create Zapier account', 'Create Make account', 'Obtain OpenAI API key']),
  
  ('c-aivo-1', 'et', 'Nädal 1: No-Code Alused', 'Zapier ja Make põhitõed', ARRAY['Triggerid ja tegevused', 'Andmete kaardistamine', 'Tingimusloogika', 'Veahaldus']),
  ('c-aivo-1', 'en', 'Week 1: No-Code Fundamentals', 'Zapier and Make basics', ARRAY['Triggers and actions', 'Data mapping', 'Conditional logic', 'Error handling']),
  
  ('c-aivo-2', 'et', 'Nädal 2: AI Integratsioonid', 'OpenAI ja Claude API-d', ARRAY['API autentimine', 'Chat completions', 'Promptide optimeerimine', 'Tokenite ja kulude haldus']),
  ('c-aivo-2', 'en', 'Week 2: AI Integrations', 'OpenAI and Claude APIs', ARRAY['API authentication', 'Chat completions', 'Prompt optimization', 'Token and cost management']),
  
  ('c-aivo-3', 'et', 'Nädal 3: Kliendiprojekt', 'Päris automatiseering', ARRAY['Probleemi analüüs', 'Lahenduse disain', 'Ehitamine ja testimine', 'Dokumentatsioon']),
  ('c-aivo-3', 'en', 'Week 3: Client Project', 'Real automation', ARRAY['Problem analysis', 'Solution design', 'Building and testing', 'Documentation']),
  
  ('c-aivo-4', 'et', 'Nädal 4: Lõpuprojekt', 'Esitlus ja tunnistus', ARRAY['Projekti esitlus', 'Tagasiside', 'Portfooliosse lisamine', 'Tunnistuse omistamine']),
  ('c-aivo-4', 'en', 'Week 4: Final Project', 'Presentation and certificate', ARRAY['Project presentation', 'Feedback', 'Portfolio addition', 'Certificate award'])
ON CONFLICT (curriculum_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  topics = EXCLUDED.topics;

-- ============================================================
-- 6. INSERT FAQ
-- ============================================================

-- AIKI FAQ
INSERT INTO program_faq (id, program_id, sort_order) VALUES
  ('faq-aiki-1', 'aiki', 1),
  ('faq-aiki-2', 'aiki', 2),
  ('faq-aiki-3', 'aiki', 3),
  ('faq-aiki-4', 'aiki', 4),
  ('faq-aiki-5', 'aiki', 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO faq_translations (faq_id, locale, question, answer) VALUES
  ('faq-aiki-1', 'et', 'Kas mul on vaja tehnilist tausta?', 'Ei, AIKI on loodud inimestele, kes kasutavad AI-d, mitte arendavad seda. Piisab, kui oled kasutanud ChatGPT-d või sarnaseid tööriistu.'),
  ('faq-aiki-1', 'en', 'Do I need a technical background?', 'No, AIKI is designed for people who use AI, not develop it. It''s enough if you''ve used ChatGPT or similar tools.'),
  
  ('faq-aiki-2', 'et', 'Kui palju aega nädala kohta kulub?', 'Arvestame 10 akadeemilise tunniga nädalas: 4h iseseisvat tööd + 6h rühmatööd/sessioone.'),
  ('faq-aiki-2', 'en', 'How much time per week does it take?', 'We estimate 10 academic hours per week: 4h self-study + 6h group work/sessions.'),
  
  ('faq-aiki-3', 'et', 'Kas tunnistus on ametlik?', 'Jah, tunnistus vastab HAKA mikrokvalifikatsiooni standarditele ja on tööandjate poolt tunnustatud.'),
  ('faq-aiki-3', 'en', 'Is the certificate official?', 'Yes, the certificate meets HAKA micro-credential standards and is recognized by employers.'),
  
  ('faq-aiki-4', 'et', 'Mis kui ma ei saa mõnel sessioonil osaleda?', 'Kõik sessioonid on salvestatud. Maksimum 2 puudumist on lubatud, üle selle tuleb sessiooni aeg teha tasa.'),
  ('faq-aiki-4', 'en', 'What if I can''t attend some sessions?', 'All sessions are recorded. Maximum 2 absences are allowed, beyond that you''ll need to make up the time.'),
  
  ('faq-aiki-5', 'et', 'Kas saan maksta osamaksetena?', 'Jah, pakume 3 osamakset: 3 × €563 = €1689 (6% lisatasu).'),
  ('faq-aiki-5', 'en', 'Can I pay in installments?', 'Yes, we offer 3 installments: 3 × €563 = €1689 (6% fee).')
ON CONFLICT (faq_id, locale) DO UPDATE SET
  question = EXCLUDED.question,
  answer = EXCLUDED.answer;

-- AIVO FAQ
INSERT INTO program_faq (id, program_id, sort_order) VALUES
  ('faq-aivo-1', 'aivo', 1),
  ('faq-aivo-2', 'aivo', 2),
  ('faq-aivo-3', 'aivo', 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO faq_translations (faq_id, locale, question, answer) VALUES
  ('faq-aivo-1', 'et', 'Kas pean olema AIKI lõpetanud?', 'Ei pea, aga AIKI lõpetajad saavad 30% soodustust (€900 vs €1290). See on meie viis tunnustada juba omandatud AI teadmisi.'),
  ('faq-aivo-1', 'en', 'Do I need to have completed AIKI?', 'No, but AIKI graduates get a 30% discount (€900 vs €1290). This is our way of recognizing already acquired AI knowledge.'),
  
  ('faq-aivo-2', 'et', 'Milliseid tööriistu kasutame?', 'Peamiselt Zapier, Make (endine Integromat) ja OpenAI API. Kõik platvormid pakuvad tasuta tasemeid harjutamiseks.'),
  ('faq-aivo-2', 'en', 'What tools do we use?', 'Mainly Zapier, Make (formerly Integromat), and OpenAI API. All platforms offer free tiers for practice.'),
  
  ('faq-aivo-3', 'et', 'Kas saan luua päris klienditööd?', 'Jah, programmi osa on kliendiprojekt, kus ehitad päris automatiseeringu, mida saad portfooliosse lisada.'),
  ('faq-aivo-3', 'en', 'Can I create real client work?', 'Yes, part of the program is a client project where you build a real automation you can add to your portfolio.')
ON CONFLICT (faq_id, locale) DO UPDATE SET
  question = EXCLUDED.question,
  answer = EXCLUDED.answer;
