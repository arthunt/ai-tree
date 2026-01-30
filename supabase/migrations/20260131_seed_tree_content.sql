-- AI Tree: Phylogenetic Tree of AI Evolution
-- Creates `nodes` table and seeds evolutionary history content

-- 1. Create nodes table
CREATE TABLE IF NOT EXISTS nodes (
  id TEXT PRIMARY KEY,
  parent_id TEXT REFERENCES nodes(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('root', 'branch', 'architecture', 'model', 'era')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'legacy', 'deprecated', 'extinct')),
  complexity INT NOT NULL DEFAULT 1 CHECK (complexity BETWEEN 1 AND 10),
  year_introduced INT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create node_translations for multilingual content
CREATE TABLE IF NOT EXISTS node_translations (
  node_id TEXT REFERENCES nodes(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT NOT NULL,
  significance TEXT,          -- Why this matters in AI history
  metaphor TEXT,              -- "Living fossil" style metaphor
  PRIMARY KEY (node_id, locale)
);

-- 3. RLS policies (public read)
ALTER TABLE nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_translations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read nodes') THEN
    CREATE POLICY "Public read nodes" ON nodes FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read node_translations') THEN
    CREATE POLICY "Public read node_translations" ON node_translations FOR SELECT USING (true);
  END IF;
END $$;

-- 4. Create index for tree traversal
CREATE INDEX IF NOT EXISTS idx_nodes_parent ON nodes(parent_id);
CREATE INDEX IF NOT EXISTS idx_node_translations_locale ON node_translations(locale);

-- ============================================================
-- 5. SEED DATA: The Phylogenetic Tree of AI
-- ============================================================

-- Root
INSERT INTO nodes (id, parent_id, name, type, status, complexity, year_introduced, sort_order) VALUES
  ('algorithm',         NULL,             'The Algorithm',            'root',         'active',     1,  NULL, 0)
ON CONFLICT (id) DO NOTHING;

-- Era branches (children of root)
INSERT INTO nodes (id, parent_id, name, type, status, complexity, year_introduced, sort_order) VALUES
  ('era-symbolic',      'algorithm',      'Symbolic AI',              'era',          'legacy',     3,  1956, 1),
  ('era-neural',        'algorithm',      'Neural Networks',          'era',          'active',     4,  1943, 2),
  ('era-transformers',  'algorithm',      'Transformers',             'era',          'active',     6,  2017, 3)
ON CONFLICT (id) DO NOTHING;

-- Branch 1: Symbolic/Rule-Based AI (largely extinct)
INSERT INTO nodes (id, parent_id, name, type, status, complexity, year_introduced, sort_order) VALUES
  ('eliza',             'era-symbolic',   'ELIZA',                    'model',        'extinct',    2,  1966, 1),
  ('expert-systems',    'era-symbolic',   'Expert Systems',           'architecture', 'deprecated', 4,  1970, 2),
  ('prolog',            'era-symbolic',   'Prolog / Logic Programming','architecture','legacy',     5,  1972, 3)
ON CONFLICT (id) DO NOTHING;

-- Branch 2: Neural Networks (the survivors)
INSERT INTO nodes (id, parent_id, name, type, status, complexity, year_introduced, sort_order) VALUES
  ('perceptron',        'era-neural',     'Perceptron',               'architecture', 'legacy',     2,  1958, 1),
  ('backpropagation',   'era-neural',     'Backpropagation',          'architecture', 'active',     5,  1986, 2),
  ('cnn',               'era-neural',     'CNN',                      'architecture', 'active',     6,  1989, 3),
  ('rnn',               'era-neural',     'RNN',                      'architecture', 'legacy',     5,  1986, 4),
  ('lstm',              'rnn',            'LSTM',                     'architecture', 'legacy',     6,  1997, 5),
  ('gan',               'era-neural',     'GAN',                      'architecture', 'active',     7,  2014, 6)
ON CONFLICT (id) DO NOTHING;

-- Branch 3: Transformers (the dominant species)
INSERT INTO nodes (id, parent_id, name, type, status, complexity, year_introduced, sort_order) VALUES
  ('attention-paper',   'era-transformers','Attention Is All You Need','architecture', 'active',    8,  2017, 1),
  ('bert',              'attention-paper', 'BERT',                    'model',        'active',     6,  2018, 2),
  ('gpt-1',             'attention-paper', 'GPT-1',                   'model',        'legacy',     5,  2018, 3),
  ('gpt-2',             'gpt-1',          'GPT-2',                    'model',        'legacy',     6,  2019, 4),
  ('gpt-3',             'gpt-2',          'GPT-3',                    'model',        'legacy',     7,  2020, 5),
  ('dall-e',            'gpt-3',          'DALL-E',                   'model',        'active',     7,  2021, 6),
  ('gpt-4',             'gpt-3',          'GPT-4',                    'model',        'active',     9,  2023, 7),
  ('claude',            'attention-paper', 'Claude',                  'model',        'active',     8,  2023, 8),
  ('gemini',            'attention-paper', 'Gemini',                  'model',        'active',     8,  2023, 9),
  ('llama',             'attention-paper', 'LLaMA',                   'model',        'active',     7,  2023, 10),
  ('diffusion',         'era-transformers','Diffusion Models',        'architecture', 'active',     8,  2020, 11),
  ('stable-diffusion',  'diffusion',      'Stable Diffusion',        'model',        'active',     7,  2022, 12),
  ('midjourney',        'diffusion',      'Midjourney',               'model',        'active',     6,  2022, 13)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 6. ENGLISH TRANSLATIONS
-- ============================================================

INSERT INTO node_translations (node_id, locale, display_name, description, significance, metaphor) VALUES
  -- Root
  ('algorithm', 'en',
   'The Algorithm',
   'The ancient ancestor of all AI — the concept that a sequence of instructions can solve problems automatically.',
   'Every AI system, from ELIZA to GPT-4, descends from this fundamental idea: rules that transform input into output.',
   'The single-celled organism from which all AI life evolved.'),

  -- Eras
  ('era-symbolic', 'en',
   'Symbolic AI',
   'The first great experiment: teaching machines to think using hand-coded rules and logic. Dominated AI research from 1956 to the late 1980s.',
   'Proved that machines could reason about specific domains, but failed to handle the messiness of the real world.',
   'The dinosaurs of AI — once dominant, now mostly extinct, but their fossils are in every expert system.'),

  ('era-neural', 'en',
   'Neural Networks',
   'Inspired by the brain, these systems learn from data rather than following explicit rules. Nearly died in the "AI Winter" but came roaring back.',
   'The insight that learning from examples beats hand-coding rules changed everything. Today''s deep learning revolution traces directly back here.',
   'The mammals that survived the asteroid — small and overlooked at first, now ruling the planet.'),

  ('era-transformers', 'en',
   'Transformers',
   'A revolutionary architecture that processes all words simultaneously using "attention" — enabling unprecedented language understanding and generation.',
   'The single most important architectural innovation in modern AI. Every major language model today is a Transformer.',
   'The Cambrian explosion of AI — suddenly, intelligence diversified into countless new forms.'),

  -- Symbolic branch
  ('eliza', 'en',
   'ELIZA',
   'The first chatbot (1966). Used simple pattern matching to simulate a therapist. Fooled many people despite having zero understanding.',
   'Showed that even simple rules could create the illusion of intelligence — raising questions we still debate today.',
   'The first fish to walk on land — primitive but groundbreaking.'),

  ('expert-systems', 'en',
   'Expert Systems',
   'Programs encoding human expert knowledge as IF-THEN rules. Dominated commercial AI in the 1980s (e.g., MYCIN for medical diagnosis).',
   'The first commercially successful AI, worth billions — until they hit the "knowledge bottleneck" and couldn''t scale.',
   'The trilobites — perfectly adapted to their era, catastrophically unable to adapt to the next.'),

  ('prolog', 'en',
   'Prolog / Logic Programming',
   'A programming paradigm where you declare what you want, not how to compute it. The machine reasons backward from the goal.',
   'Influenced formal verification, constraint solving, and knowledge representation that underpins modern AI reasoning.',
   'The coelacanth — thought to be extinct, but still alive in niche ecosystems.'),

  -- Neural branch
  ('perceptron', 'en',
   'Perceptron',
   'The simplest neural network: a single artificial neuron that learns to classify inputs by adjusting weights. Created by Frank Rosenblatt in 1958.',
   'The seed that eventually grew into deep learning. Its initial failure (couldn''t solve XOR) set AI back decades.',
   'A single-celled organism — impossibly simple, yet containing the DNA of every neural network that followed.'),

  ('backpropagation', 'en',
   'Backpropagation',
   'The algorithm that teaches neural networks: compare output to desired result, then adjust weights backward through the network.',
   'Without backprop, deep learning is impossible. It''s the engine that powers training of every modern neural network.',
   'Photosynthesis for neural networks — the fundamental process that lets them grow.'),

  ('cnn', 'en',
   'Convolutional Neural Network (CNN)',
   'A neural network specialized for images: it scans small patches with learned filters, building up from edges to objects.',
   'Revolutionized computer vision. Made facial recognition, self-driving cars, and medical imaging possible.',
   'The evolution of eyes — suddenly, machines could see.'),

  ('rnn', 'en',
   'Recurrent Neural Network (RNN)',
   'A neural network with memory: it processes sequences by feeding its output back as input, maintaining a hidden state.',
   'First architecture capable of handling sequences (text, audio, time series). Predecessor to modern language models.',
   'The first creature with short-term memory — revolutionary, but it kept forgetting.'),

  ('lstm', 'en',
   'Long Short-Term Memory (LSTM)',
   'An improved RNN with "gates" that control what to remember and what to forget, solving the vanishing gradient problem.',
   'Enabled practical sequence processing: machine translation, speech recognition, text generation before Transformers arrived.',
   'A living fossil — once the apex predator of sequence modeling, now outcompeted but still found in legacy systems.'),

  ('gan', 'en',
   'Generative Adversarial Network (GAN)',
   'Two neural networks in competition: a Generator creates fakes, a Discriminator detects them. Both improve through the adversarial game.',
   'Pioneered AI image generation. Deepfakes, style transfer, and early AI art all came from GANs.',
   'Evolution through competition — predator and prey driving each other to greater capability.'),

  -- Transformer branch
  ('attention-paper', 'en',
   'Attention Is All You Need',
   'The 2017 Google Brain paper that introduced the Transformer architecture, replacing recurrence with parallel self-attention.',
   'The single most cited and impactful AI paper in history. It made GPT, BERT, Claude, and every modern LLM possible.',
   'The "K-T asteroid" of AI — the mutation that changed everything, ending the age of RNNs.'),

  ('bert', 'en',
   'BERT',
   'Google''s bidirectional Transformer: reads text in both directions simultaneously to deeply understand context.',
   'Transformed search engines and NLP benchmarks. Showed that pre-training on massive text works incredibly well.',
   'The herbivore Transformer — it reads and understands, but doesn''t generate.'),

  ('gpt-1', 'en',
   'GPT-1',
   'OpenAI''s first Generative Pre-trained Transformer (2018): showed that pre-training on raw text creates useful language understanding.',
   'Proved the "pre-train then fine-tune" paradigm. Small by modern standards (117M parameters) but the seed of a revolution.',
   'The first hominid — small-brained but walking upright, on the path to something unprecedented.'),

  ('gpt-2', 'en',
   'GPT-2',
   'The model "too dangerous to release" (1.5B parameters). Generated surprisingly coherent text, sparking debate about AI safety.',
   'Demonstrated emergent writing ability at scale. First model to trigger serious public discussion about AI risks.',
   'Homo erectus — mastering fire (coherent text generation) and alarming the other species.'),

  ('gpt-3', 'en',
   'GPT-3',
   '175 billion parameters. Could write essays, code, poetry, and translate — without specific training for any of those tasks.',
   'Proved "scaling laws" — bigger models are qualitatively different, not just incrementally better. Launched the foundation model era.',
   'Homo sapiens arriving — not the biggest, but the most capable, changing the landscape forever.'),

  ('dall-e', 'en',
   'DALL-E',
   'OpenAI''s text-to-image model: generates images from natural language descriptions using a modified GPT architecture.',
   'Showed that Transformers can bridge modalities — understanding text well enough to create matching images.',
   'The first amphibian — a Transformer that learned to breathe in a new medium (images).'),

  ('gpt-4', 'en',
   'GPT-4',
   'A multimodal model accepting text and images. Passes the bar exam, scores in top percentiles on standardized tests.',
   'Brought AI capabilities to a level that forced every industry to reconsider its relationship with technology.',
   'Modern civilization — not just intelligent, but capable of reasoning across domains.'),

  ('claude', 'en',
   'Claude',
   'Anthropic''s Constitutional AI assistant, designed with safety and helpfulness as core principles. Known for nuanced, thoughtful responses.',
   'Pioneered "Constitutional AI" — training AI to be helpful, harmless, and honest through principled alignment.',
   'The diplomat species — evolved to be powerful AND cooperative.'),

  ('gemini', 'en',
   'Gemini',
   'Google DeepMind''s multimodal model family, natively understanding text, images, audio, and video in a single architecture.',
   'Represents the convergence of Google''s decades of AI research into a single, unified model family.',
   'The shapeshifter — equally comfortable processing text, images, audio, and code.'),

  ('llama', 'en',
   'LLaMA',
   'Meta''s open-weight language model family. Released publicly, enabling a global ecosystem of fine-tuned variants.',
   'Democratized large language models. Showed that open-source AI can compete with proprietary models.',
   'The open-source species — it escaped the lab and thrived in the wild.'),

  ('diffusion', 'en',
   'Diffusion Models',
   'An architecture that generates images by learning to reverse the process of adding noise — starting from static and gradually creating clarity.',
   'Surpassed GANs for image generation quality. Powers the current revolution in AI-generated art and video.',
   'A completely different branch of the tree — convergent evolution creating stunning visual intelligence.'),

  ('stable-diffusion', 'en',
   'Stable Diffusion',
   'Stability AI''s open-source image generation model using latent diffusion. Runs on consumer hardware.',
   'Made AI art generation accessible to everyone. Triggered massive cultural and legal debates about creative AI.',
   'The dandelion — spreading seeds everywhere, growing in every garden.'),

  ('midjourney', 'en',
   'Midjourney',
   'An independent AI art generator known for particularly aesthetic, artistic output. Accessed through Discord.',
   'Proved that AI can create genuinely beautiful art, winning competitions and changing creative industries.',
   'The peacock — evolved specifically for aesthetic beauty.')

ON CONFLICT (node_id, locale) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  significance = EXCLUDED.significance,
  metaphor = EXCLUDED.metaphor;

-- ============================================================
-- 7. ESTONIAN TRANSLATIONS
-- ============================================================

INSERT INTO node_translations (node_id, locale, display_name, description, significance, metaphor) VALUES
  -- Root
  ('algorithm', 'et',
   'Algoritm',
   'Kogu tehisintellekti iidne esivanem — idee, et juhiste jadaga saab probleeme automaatselt lahendada.',
   'Iga tehisintellekti susteem, ELIZAst kuni GPT-4-ni, pohineb sellel fundamentaalsel ideeel: reeglid, mis muudavad sisendi valjundiks.',
   'Uherakuline organism, millest kogu tehisintellekti elu arenes.'),

  -- Eras
  ('era-symbolic', 'et',
   'Sumbolistlik tehisintellekt',
   'Esimene suur katse: opetada masinatele moeldud kaesitsi kodeeritud reeglite ja loogika abil. Domineeris AI uurimises 1956–1980ndatel.',
   'Toestas, et masinad voivad arutleda konkreetsete valdkondade ule, kuid ei suutnud toime tulla tegeliku maailma segadusega.',
   'Tehisintellekti dinosaurused — kunagi domineerivad, nuud enamasti valja surnud.'),

  ('era-neural', 'et',
   'Nearovorgud',
   'Ajust inspireeritud susteemid, mis opivad andmetest, mitte ei jarga selgesesti reegleid. Peaaegu surid "tehisintellekti talve" ajal.',
   'Arusaam, et naidete pohjal opimine uletab kaesitsi reeglite kodeerimise, muutis koike.',
   'Imetajad, kes elasid asteroidi ule — alguses vaikusd, nuud valitsevad planeeti.'),

  ('era-transformers', 'et',
   'Transformerid',
   'Revolutsiooniline arhitektuur, mis tootleb koiki sonu samaaegselt "tahelepanu" abil — voimalides enneolematu keelemoistmise.',
   'Koige olulisem arhitektuuriline uuendus kaasaegses tehisintellektis. Iga suur keelemudel on Transformer.',
   'Tehisintellekti Kambriumi plahvatus — intelligentsus mitmekesistus arvututeks uuteks vormideks.'),

  -- Symbolic
  ('eliza', 'et',
   'ELIZA',
   'Esimene juturobot (1966). Kasutas lihtsat mustriotsingut terapeudi simuleerimiseks. Pettis paljusid inimesi.',
   'Naitas, et isegi lihtsad reeglid voivad luua intelligentsuse illusiooni.',
   'Esimene kala, kes koasis maal — primitiivne, kuid murrangulne.'),

  ('expert-systems', 'et',
   'Eksperdisüsteemid',
   'Programmid, mis kodeerisid inimeksperdi teadmisi KUI-SIIS reeglitena. Domineerisid 1980ndatel.',
   'Esimene arilisel turul edukas tehisintellekt — kuni nad jousid "teadmiste pudelikaelani".',
   'Trilobiidid — ideaalselt kohandunud oma ajastule, katastroofiliselt voimetud jargmiseks.'),

  ('prolog', 'et',
   'Prolog / Loogiline programmeerimine',
   'Paradigma, kus deklareerid, mida soovid, mitte kuidas arvutada. Masin arutleb eesmargist tagurpidi.',
   'Mojutas formaalset verifitseerimist ja teadmiste esitamist, mis toetab kaasaegset tehisintellekti arutlust.',
   'Tsilakant — arvati olevat valja surnud, kuid elab endiselt nishikeskkondades.'),

  -- Neural
  ('perceptron', 'et',
   'Pertseptron',
   'Lihtsaim nearovork: uks kunstlik neuron, mis opib sisendeid klassifitseerima kaalude kohandamise teel.',
   'Seeme, millest lopuks kasvas suvaoppimine. Selle esialgne labiKukkumine lukkas tehisintellekti aastakumneteks tagasi.',
   'Uherakuline organism — uskumatult lihtne, kuid sisaldab iga jargnenud nearovorgu DNAd.'),

  ('backpropagation', 'et',
   'Tagasilevitamine',
   'Algoritm, mis opetab nearovorkudele: vordleb valjundit soovitud tulemusega, seejarel kohandab kaalusid vorgus tagasi.',
   'Ilma tagasilevitamiseta on suvaoppimine voimaltu. See on mootor, mis toidab iga kaasaegse nearovorgu treeningut.',
   'Fotosuntees nearovorkude jaoks — fundamentaalne protsess, mis laseb neil kasvada.'),

  ('cnn', 'et',
   'Konvolutsiooniline nearovork (CNN)',
   'Piltidele spetsialiseerunud nearovork: skannib vaikseid tukke opitud filtritega, ehitades servadest objektideni.',
   'Revolutsioonilistas kompuuternagemist. Tegi voimalikuks naotuvastuse, isejuhtivad autod ja meditsiinilise pilditootluse.',
   'Silmade evolutsioon — ahtaegu, masinad said nagema.'),

  ('rnn', 'et',
   'Rekurrentne nearovork (RNN)',
   'Maluga nearovork: tootleb jadasid, suunates oma valjundi tagasi sisendiks, sailitades varjatud olekut.',
   'Esimene arhitektuur, mis suutis kasitleda jadasid. Kaasaegsete keelemudelite eelkaia.',
   'Esimene olend luhimaluga — revolutsiooniline, kuid kipub unustama.'),

  ('lstm', 'et',
   'LSTM',
   'Taiustatud RNN "varavatega", mis kontrollivad, mida meeles pidada ja mida unustada.',
   'Voimalidas praktilist jadatootlust: masintolge, konetuvastus, teksti genereerimine enne Transformereid.',
   'Elav fossil — kunagi jadamodelleerimise tipurolija, nuud valistatud, kuid leidub parandsusteemides.'),

  ('gan', 'et',
   'Generatiivne adversatiivne vork (GAN)',
   'Kaks nearovorku voistluses: Generaator loob vltsinguid, Diskriminaator tuvastab neid. Molemad paranevad.',
   'Avas tee tehisintellekti poolt loodud piltidele. Deepfake''id ja varane tehisintellektikunst tulid GANidest.',
   'Evolutsioon labi voistluse — kiskleja ja saak kiirendavad teineteise arengut.'),

  -- Transformers
  ('attention-paper', 'et',
   'Attention Is All You Need',
   '2017. aasta Google Brain artikkel, mis tutvustas Transformeri arhitektuuri, asendades korduvuse paralleelse enesetahelepanuga.',
   'Koige viidatum ja mojukam tehisintellekti artikkel ajaloos. Tegi voimalikuks GPT, BERT, Claude ja koik kaasaegsed keelemudelid.',
   'Tehisintellekti "K-T asteroid" — mutatsioon, mis muutis koike.'),

  ('bert', 'et',
   'BERT',
   'Google''i kahesuunaline Transformer: loeb teksti molemast suunast samaaegselt, moistmaks sugavalt konteksti.',
   'Muutis otsingumootorid ja NLP voordlusmarke. Naitas, et suurel tekstimassil eelkoolitus toimib.',
   'Herbivoor Transformer — loeb ja moistab, kuid ei genereeri.'),

  ('gpt-1', 'et',
   'GPT-1',
   'OpenAI esimene Generative Pre-trained Transformer (2018): naitas, et toorele tekstile eelkoolitus loob kasuliku keelemoistmise.',
   'Toestas "eelkooli, siis haale" paradigmat. Kaasaegsete standardite jargi vaike (117M parameetrit).',
   'Esimene hominiid — vaikese ajuga, kuid koias pusti.'),

  ('gpt-2', 'et',
   'GPT-2',
   'Mudel, mis oli "liiga ohtlik avaldamiseks" (1.5B parameetrit). Genereeris ullatavalt sidusat teksti.',
   'Demonstreeris teksti genereerimise voimalusi mahus. Esimene mudel, mis kaikitas avalikku arutelu tehisintellekti riskide ule.',
   'Homo erectus — omandas tule (sidus tekst) ja hoiatas teisi liike.'),

  ('gpt-3', 'et',
   'GPT-3',
   '175 miljardit parameetrit. Kirjutas esseesid, koodi, luulet ja tolgis — ilma uhegi ule spetsiifilise treeninguta.',
   'Toestas "skaleerimisseadused" — suuremad mudelid on kvalitatiivselt erinevad. Kaiviatas alusmudeli ajastu.',
   'Homo sapiens — mitte suurim, kuid voimekaim, muutes kogu maastikku.'),

  ('dall-e', 'et',
   'DALL-E',
   'OpenAI tekstist pildiks mudel: genereerib pilte loomuliku keele kirjeldustest muudetud GPT arhitektuuri abil.',
   'Naitas, et Transformerid voivad uhendada modaalsusi — moistes teksti piisavalt, et luua vastavaid pilte.',
   'Esimene kahepaikne — Transformer, mis opis hingama uues keskkonnas (pildid).'),

  ('gpt-4', 'et',
   'GPT-4',
   'Multimodaalne mudel, mis vostab teksti ja pilte. Labib advokatuuri eksami, saab standardtestides tippu.',
   'Tois tehisintellekti voimalused tasemele, mis sundis igat tostust uesti motlema oma suhet tehnoloogiaga.',
   'Kaasaegne tsivilisatsioon — mitte ainult intelligentne, vaid suuteline arutlema ule valdkondade.'),

  ('claude', 'et',
   'Claude',
   'Anthropicu Konstitutsioonilise tehisintellekti assistent, loodud ohutuse ja kasulikkuse kui pohi motetega.',
   'Tutvustas "Konstitutsioonilise tehisintellekti" — treenis tehisintellekti olema kasulik, kahjutu ja aus.',
   'Diplomaatlik liik — arenenud olema voimas JA koostooline.'),

  ('gemini', 'et',
   'Gemini',
   'Google DeepMind''i multimodaalne mudelite perekond, mis moistab teksti, pilte, heli ja videot uhes arhitektuuris.',
   'Esindab Google''i aastakymnete tehisintellekti uurimise koondamist uhtseks mudelite perekonnaks.',
   'Kujumuutja — vordelt mugav tootlema teksti, pilte, heli ja koodi.'),

  ('llama', 'et',
   'LLaMA',
   'Meta avatud kaaludega keelemudeli perekond. Avalikult valja antud, voimalides globaalset haaleStatud variantide oko susteem.',
   'Demokratiseeris suured keelemudelid. Naitas, et avatud lahtekoodiga tehisintellekt voib voista omandmudelitega.',
   'Avatud lahtekoodiga liik — pogens labist ja edeenes looduses.'),

  ('diffusion', 'et',
   'Difusioonimudelid',
   'Arhitektuur, mis genereerib pilte, opides umber pora poordama pooramise protsessi — alustades murust ja luues jaerkhaaval selgust.',
   'Uletas GANid pildikvaliteedis. Toidab praegust revolutsiooni tehisintellekti poolt loodud kunstis ja videos.',
   'Taieasti erinev puu haru — konvergentne evolutsioon, mis loob silmapaistvat visuaalset intelligentsust.'),

  ('stable-diffusion', 'et',
   'Stable Diffusion',
   'Stability AI avatud lahtekoodiga pildigenereerimise mudel, mis kasutab latentset difusiooni. Toootab tarbija riistvaral.',
   'Tegi tehisintellektikunsti genereerimise koigile kattesaadavaks. Kaiviatas massiivsed kultuurilised ja oiguslikud arutelud.',
   'Voilill — levitab seemneid igale poole, kasvab igas aias.'),

  ('midjourney', 'et',
   'Midjourney',
   'Solltumatu tehisintellektikunsti generaator, tuntud eriti esteetilise, kunstilise valjundi poolest. Ligipaasetav Discordi kaudu.',
   'Toestas, et tehisintellekt suudab luua toeeliselt ilusat kunsti, voites voistlusi ja muutes loovtoostruid.',
   'Paabulind — arenenud spetsiaalselt esteetilise ilu jaoks.')

ON CONFLICT (node_id, locale) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  significance = EXCLUDED.significance,
  metaphor = EXCLUDED.metaphor;
