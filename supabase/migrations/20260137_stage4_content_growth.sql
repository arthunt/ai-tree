-- Stage 4: Content Growth & Marketing Integration
-- Adds 8 new conceptual nodes + enriches 2 existing nodes (tokenization-process, word2vec)
-- Total: 10 key learning-path nodes with full EN/ET translations, metadata, papers, marketing

-- ============================================================
-- 1. NEW NODES (8 conceptual nodes for the learning tree)
-- ============================================================

-- Trunk: Training paradigm nodes (children of era-transformers)
INSERT INTO nodes (id, parent_id, name, type, status, complexity, year_introduced, sort_order) VALUES
  ('pre-training',    'era-transformers', 'Pre-training',     'architecture', 'active', 5, 2018, 20),
  ('fine-tuning',     'pre-training',     'Fine-tuning',      'architecture', 'active', 5, 2018, 21),
  ('rlhf',            'fine-tuning',      'RLHF',             'architecture', 'active', 7, 2022, 22)
ON CONFLICT (id) DO NOTHING;

-- Branches: Applied AI patterns (children of era-transformers)
INSERT INTO nodes (id, parent_id, name, type, status, complexity, year_introduced, sort_order) VALUES
  ('rag',              'era-transformers', 'RAG',              'architecture', 'active', 6, 2020, 30),
  ('agents',           'era-transformers', 'AI Agents',        'architecture', 'active', 8, 2023, 31),
  ('function-calling', 'agents',           'Function Calling', 'architecture', 'active', 6, 2023, 32)
ON CONFLICT (id) DO NOTHING;

-- Leaves: Emerging frontiers (children of era-transformers)
INSERT INTO nodes (id, parent_id, name, type, status, complexity, year_introduced, sort_order) VALUES
  ('green-ai',          'era-transformers', 'Green AI',          'model', 'active', 4, 2019, 40),
  ('reasoning-models',  'era-transformers', 'Reasoning Models',  'model', 'active', 9, 2024, 41)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- 2. ENGLISH TRANSLATIONS (all 10 nodes)
-- ============================================================

INSERT INTO node_translations (node_id, locale, display_name, description, significance, metaphor) VALUES

  -- Existing nodes: update with richer content
  ('word2vec', 'en',
   'Vectors & Embeddings',
   'A technique that maps words to dense numerical vectors where semantic meaning is preserved. Words with similar meanings cluster together in vector space. This breakthrough showed that AI could learn the meaning of words from context alone.',
   'Word2Vec proved that meaning could be captured as geometry — "king minus man plus woman equals queen" became the most famous equation in NLP.',
   'Like GPS coordinates for ideas — every concept has a location, and similar ideas are neighbors on the map.'),

  ('tokenization-process', 'en',
   'Tokenization (BPE)',
   'The process of splitting raw text into subword tokens using algorithms like Byte Pair Encoding. This is the first step in any modern language model — converting human language into discrete units the model can process.',
   'Without tokenization, AI cannot begin to process language. BPE solved the open-vocabulary problem by splitting rare words into common subword pieces.',
   'Like a jeweler cutting a rough diamond into precise facets — each cut reveals structure that was always there.'),

  -- New trunk nodes
  ('pre-training', 'en',
   'Pre-training',
   'The process of training a model on massive unlabeled text (or other data) to learn general language patterns before any specific task. The model predicts the next token billions of times, absorbing grammar, facts, and reasoning.',
   'Pre-training is why modern AI can answer questions about anything — it has "read" the internet. This self-supervised approach eliminated the need for hand-labeled data at scale.',
   'The schooling years — learning everything about the world before choosing a career.'),

  ('fine-tuning', 'en',
   'Fine-tuning',
   'Taking a pre-trained model and training it further on a smaller, task-specific dataset. This adapts the general knowledge to a particular domain or behavior, like following instructions or answering in a specific format.',
   'Fine-tuning made foundation models practical. Instead of training from scratch for every task, you specialize an already-knowledgeable model — dramatically reducing cost and data requirements.',
   'The apprenticeship — taking general education and sharpening it into a specific craft.'),

  ('rlhf', 'en',
   'RLHF',
   'Reinforcement Learning from Human Feedback: humans rank model outputs by quality, training a reward model that then guides the AI to produce responses humans prefer. This is how ChatGPT became conversational.',
   'RLHF bridged the gap between "predicting text" and "being helpful." It aligned raw language ability with human values and preferences, making AI assistants actually useful.',
   'The domestication of AI — wild intelligence tamed to serve human needs, guided by human judgment.'),

  -- New branch nodes
  ('rag', 'en',
   'Retrieval-Augmented Generation',
   'A pattern that combines an LLM with a search system: before generating an answer, the model retrieves relevant documents from a knowledge base. This grounds responses in real, up-to-date information.',
   'RAG solved the "hallucination problem" for factual queries. Instead of relying on memorized training data, the model can look things up — like a student allowed to use textbooks during an exam.',
   'An open-book exam — the AI is not just smart, it can also look things up.'),

  ('agents', 'en',
   'AI Agents',
   'Autonomous AI systems that can plan, use tools, browse the web, write code, and take actions in the real world. They go beyond simple question-answering to execute multi-step tasks independently.',
   'Agents represent the shift from AI as a "tool you use" to AI as a "colleague that acts." This is the frontier of applied AI — systems that can accomplish goals, not just generate text.',
   'The leap from single-celled to multicellular life — AI that can coordinate complex behaviors.'),

  ('function-calling', 'en',
   'Function Calling',
   'The ability of an LLM to output structured JSON that invokes external tools, APIs, or databases. Instead of just generating text, the model decides when and how to call specific functions.',
   'Function calling gave LLMs hands. Before this, AI could only talk. Now it can check the weather, query databases, send emails, and control software — bridging language and action.',
   'The evolution of opposable thumbs — language models that can finally grasp and manipulate the world.'),

  -- New leaf nodes
  ('green-ai', 'en',
   'Green AI',
   'A movement advocating for energy-efficient AI research: smaller models, smarter training, and measuring computational cost alongside accuracy. Challenges the "bigger is better" paradigm.',
   'Training GPT-4 consumed as much energy as 120 US homes use in a year. Green AI asks: can we get 90% of the performance at 1% of the cost? Efficiency is the next frontier.',
   'The efficiency revolution — proving that intelligence does not require brute force.'),

  ('reasoning-models', 'en',
   'Reasoning Models',
   'A new generation of AI models (like o1 and o3) that "think before answering" — using chain-of-thought and internal deliberation to solve complex math, logic, and coding problems.',
   'Reasoning models showed that giving AI time to think dramatically improves performance on hard problems. This challenges the assumption that intelligence is just pattern matching.',
   'The evolution of consciousness — AI that pauses, reflects, and reasons before speaking.')

ON CONFLICT (node_id, locale) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  significance = EXCLUDED.significance,
  metaphor = EXCLUDED.metaphor;


-- ============================================================
-- 3. ESTONIAN TRANSLATIONS (all 10 nodes)
-- ============================================================

INSERT INTO node_translations (node_id, locale, display_name, description, significance, metaphor) VALUES

  -- Existing nodes: update
  ('word2vec', 'et',
   'Vektorid ja manused',
   'Tehnika, mis teisendab sonad tihedateks arvuvektoriteks, kus semantiline tahendus on sailinud. Sarnase tahendusega sonad koonduvad vektorruumis. See labimurre naitas, et AI suudab oppida sonade tahendust ainult kontekstist.',
   'Word2Vec toestas, et tahendust saab jaadvustada geomeetriana — "kuningas miinus mees pluss naine vordub kuninganna" sai NLP kuulsaimaks vorrandiks.',
   'Nagu GPS-koordinaadid ideede jaoks — igal moistel on asukoht ja sarnased ideed on kaardil naabrid.'),

  ('tokenization-process', 'et',
   'Tokeniseerimine (BPE)',
   'Teksti tukeldamine alamsona-tokeniteks, kasutades algoritme nagu Byte Pair Encoding. See on iga kaasaegse keelemudeli esimene samm — inimkeele muutmine diskreetseteks uhikuteks, mida mudel saab toodelda.',
   'Ilma tokeniseerimiseta ei saa AI keelt toodelda. BPE lahendas avatud sonavara probleemi, jagades haruldased sonad levinud alamosadeks.',
   'Nagu juveliiritoo — toorkivi loigatakse tapseteks tahkudeks, paljastades struktuuri, mis oli alati olemas.'),

  -- New trunk nodes
  ('pre-training', 'et',
   'Eelkoolitus',
   'Mudeli treenimine massiivsete markimata andmetega, et opida uldisi keelemustrid enne konkreetset ulesannet. Mudel ennustab jargmist tokenit miljardeid kordi, omandades grammatikat, fakte ja arutlust.',
   'Eelkoolitus on pohjus, miks kaasaegne AI suudab vastata kuskimustele — see on "lugenud" kogu internetti. Enesejarelevalvega lahenemisviis kaotas vajaduse kaesitsi margendatud andmete jarele.',
   'Kooliaasted — koike maailma kohta opimine enne karjaari valimist.'),

  ('fine-tuning', 'et',
   'Peenhaaldistamine',
   'Eelkoolitatud mudeli edasine treenimine vaiksema, ulesandespetsiifilise andmekoguga. See kohandab uldteadmised konkreetsele valdkonnale voi kaitumusele.',
   'Peenhaaldistamine tegi alusmudelid praktiliseks. Iga ulesande jaoks nullist treenimise asemel spetsialiseerid juba teadliku mudeli — vahendades kulusid dramaatiliselt.',
   'Opipoisiaeg — uldhariduse teritamine konkreetseks oskuseks.'),

  ('rlhf', 'et',
   'RLHF',
   'Inimtagasisidega kinnitusoppimine: inimesed hindavad mudeli valjundeid kvaliteedi jargi, treenides tasumudelit, mis seejarel juhib AI-d tootma vastuseid, mida inimesed eelistavad.',
   'RLHF uletas lohe "teksti ennustamise" ja "kasulik olemise" vahel. See joondas keelevoime inimlike vaartuste ja eelistustega, muutes AI assistendid tegelikult kasulikuks.',
   'AI kodustamine — metsik intelligentsus taltsutatud inimeste teenimiseks.'),

  -- New branch nodes
  ('rag', 'et',
   'RAG (Otsinguga Taiendatud Genereerimine)',
   'Muster, mis uhendab suure keelemudeli otsingususteemiga: enne vastuse genereerimist otsib mudel asjakohaseid dokumente teadmusbaasist. See pohineb vastused reaalsetel, ajakohastel andmetel.',
   'RAG lahendas "hallutsineerimise probleemi" faktikusimustes. Mudel saab asju juurde otsida — nagu opilane, kes tohib eksamil opikut kasutada.',
   'Avatud raamatuga eksam — AI pole mitte ainult tark, vaid oskab ka juurde vaadata.'),

  ('agents', 'et',
   'AI Agendid',
   'Autonoomsed AI susteemid, mis suudavad planeerida, tooriistu kasutada, veebi sirvida, koodi kirjutada ja tegelikus maailmas tegutseda. Nad uletavad lihtsa kusimustele vastamise.',
   'Agendid esindavad nihet AI-st kui "toriistast" AI-le kui "kolleegile, kes tegutseb." See on rakendatud AI eesrind — susteemid, mis saavutavad eesmarke.',
   'Hupe uherakuliselt mitmerakulisele elule — AI, mis koordineerib keerukaid kaitumusmustreid.'),

  ('function-calling', 'et',
   'Funktsioonide valjaskutsumine',
   'Suure keelemudeli voime valjastada struktureeritud JSONi, mis kaivitab valised tooriistad, APIid voi andmebaasid. Mudel otsustab, millal ja kuidas konkreetseid funktsioone kutsuda.',
   'Funktsioonide valjaskutsumine andis keelemudelitele kaed. Varem sai AI ainult raakida. Nuud saab see kontrollida ilma, paerida andmebaase ja saata e-kirju.',
   'Haardvoimelise poialvaimu evolutsioon — keelemudelid, mis suudavad lopuks maailma haarata.'),

  -- New leaf nodes
  ('green-ai', 'et',
   'Roheline AI',
   'Liikumine, mis propageerib energiatohnusat AI uurimist: vaiksemad mudelid, targem treenimine ja arvutuskulude mootmine koos tapsusega.',
   'GPT-4 treenimine tarvis sama palju energiat kui 120 USA kodu kasutab aastas. Roheline AI kusib: kas saame 90% joudlusest 1% kuluga?',
   'Tohnususrevolutsioon — toestatem, et intelligentsus ei vaja jobijouga.'),

  ('reasoning-models', 'et',
   'Arutlusmudelid',
   'Uue polve AI mudelid (nagu o1 ja o3), mis "motlevad enne vastamist" — kasutades motteahelat ja sisemist kaalumist keerukate matemaatika-, loogika- ja koodimisprobleemide lahendamiseks.',
   'Arutlusmudelid naitsid, et AI-le motlemisaja andmine parandab dramaatiliselt joudlust rasketel probleemidel. See seab kahtluse alla eelduse, et intelligentsus on lihtsalt mustrite sobitamine.',
   'Teadvuse evolutsioon — AI, mis peatub, peegeldab ja arutleb enne konemist.')

ON CONFLICT (node_id, locale) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  significance = EXCLUDED.significance,
  metaphor = EXCLUDED.metaphor;


-- ============================================================
-- 4. METADATA + PAPERS + MOTIFS (all 10 nodes)
-- ============================================================

-- Update existing nodes (word2vec and tokenization-process already have metadata)
-- We update them with richer motif info + ensure marketing hooks
UPDATE node_metadata SET
  visual_motif = 'compass',
  related_program_id = 'aiki',
  marketing_hook_en = 'How AI learns what words mean — a foundational AIKI topic.',
  marketing_hook_et = 'Kuidas AI opib sonade tahendust — AIKI pohiteema.'
WHERE node_id = 'word2vec';

UPDATE node_metadata SET
  visual_motif = 'scissors',
  related_program_id = 'aiki',
  marketing_hook_en = 'The first step in every AI thought — AIKI Week 2 starts here.',
  marketing_hook_et = 'Iga AI motte esimene samm — AIKI 2. nadal algab siit.'
WHERE node_id = 'tokenization-process';

-- Insert metadata for 8 new nodes
INSERT INTO node_metadata (node_id, year_introduced, key_paper_title, key_paper_url, primary_use_case, visual_motif, related_program_id, marketing_hook_en, marketing_hook_et) VALUES

  ('pre-training', 2018,
   'Improving Language Understanding by Generative Pre-Training',
   'https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf',
   'Training foundation models on unlabeled data before task-specific fine-tuning',
   'seed',
   'aiki',
   'The secret behind every modern AI — AIKI reveals how pre-training works.',
   'Iga kaasaegse AI saladus — AIKI paljastab, kuidas eelkoolitus toimib.'),

  ('fine-tuning', 2018,
   'Language Models are Few-Shot Learners',
   'https://arxiv.org/abs/2005.14165',
   'Adapting pre-trained models to specific tasks or domains',
   'paintbrush',
   'aiki',
   'Turn any AI into YOUR expert — learn fine-tuning techniques in AIKI.',
   'Muuda iga AI SINU eksperdiks — opi peenhaaldistamist AIKI-s.'),

  ('rlhf', 2022,
   'Training language models to follow instructions with human feedback',
   'https://arxiv.org/abs/2203.02155',
   'Aligning AI outputs with human preferences and values',
   'shield',
   'aiki',
   'How ChatGPT learned to be helpful — AIKI teaches the alignment techniques.',
   'Kuidas ChatGPT opis kasulik olema — AIKI opetab joondamistehnikaid.'),

  ('rag', 2020,
   'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
   'https://arxiv.org/abs/2005.11401',
   'Grounding LLM responses in retrieved factual documents',
   'magnifying-glass',
   'aivo',
   'Build AI that knows YOUR data — RAG is the heart of AIVO Week 3.',
   'Ehita AI, mis tunneb SINU andmeid — RAG on AIVO 3. nadala sudamik.'),

  ('agents', 2023,
   'ReAct: Synergizing Reasoning and Acting in Language Models',
   'https://arxiv.org/abs/2210.03629',
   'Building autonomous AI systems that plan, reason, and execute tasks',
   'network',
   'aivo',
   'From chatbot to colleague — AIVO teaches building AI agents that act.',
   'Jutubotist kolleegiks — AIVO opetab AI agentide ehitamist, mis tegutsevad.'),

  ('function-calling', 2023,
   'Toolformer: Language Models Can Teach Themselves to Use Tools',
   'https://arxiv.org/abs/2302.04761',
   'Enabling LLMs to invoke external tools and APIs via structured output',
   'gate',
   'aivo',
   'Give your AI hands — function calling is a core AIVO skill.',
   'Anna oma AI-le kaed — funktsioonide valjaskutsumine on AIVO pohioskus.'),

  ('green-ai', 2019,
   'Green AI',
   'https://arxiv.org/abs/1907.10597',
   'Energy-efficient AI research and sustainable model training',
   'crystal',
   NULL,
   NULL,
   NULL),

  ('reasoning-models', 2024,
   'Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters',
   'https://arxiv.org/abs/2408.03314',
   'Models that use chain-of-thought deliberation for complex problem solving',
   'prism',
   'aiki',
   'The future of AI intelligence — AIKI explores how reasoning models think.',
   'AI intelligentsuse tulevik — AIKI uurib, kuidas arutlusmudelid motlevad.')

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
-- 5. Verify: count all nodes with metadata
-- ============================================================
-- Expected: 28 original + 8 new = 36 nodes total
-- This SELECT is for verification only (no-op in migration)
-- SELECT count(*) FROM nodes;
-- SELECT count(*) FROM node_metadata WHERE visual_motif IS NOT NULL;
-- SELECT count(*) FROM node_metadata WHERE related_program_id IS NOT NULL;
