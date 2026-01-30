-- AI Tree: Content-to-Commerce Mapping
-- Links tree nodes to paid programs (AIKI / AIVO) with bilingual marketing hooks

-- 1. Extend node_metadata with commerce columns
ALTER TABLE node_metadata
  ADD COLUMN IF NOT EXISTS related_program_id TEXT CHECK (related_program_id IN ('aiki', 'aivo')),
  ADD COLUMN IF NOT EXISTS marketing_hook_en TEXT,
  ADD COLUMN IF NOT EXISTS marketing_hook_et TEXT;

-- 2. Map nodes to programs
-- Mapping logic:
--   AIKI = AI Instructor (LLMs, Transformers, Prompting, Hallucination, RAG)
--   AIVO = AI Automation  (Agents, Tools, APIs, Fine-tuning, Vision, Speech)
--   NULL = Historical / too theoretical for direct program link

-- ── AIKI mappings (Transformer-era + language models) ──────────────────────

UPDATE node_metadata SET
  related_program_id = 'aiki',
  marketing_hook_en = 'The foundation of every modern AI — explored in depth in AIKI.',
  marketing_hook_et = 'Iga kaasaegse tehisintellekti alus — AIKI programmis uurime seda süvitsi.'
WHERE node_id = 'attention-paper';

UPDATE node_metadata SET
  related_program_id = 'aiki',
  marketing_hook_en = 'Understanding BERT means understanding how AI reads — a core AIKI topic.',
  marketing_hook_et = 'BERT-i mõistmine tähendab AI lugemisoskuse mõistmist — AIKI põhiteema.'
WHERE node_id = 'bert';

UPDATE node_metadata SET
  related_program_id = 'aiki',
  marketing_hook_en = 'Where generative AI began — learn the lineage in AIKI.',
  marketing_hook_et = 'Siit sai alguse generatiivne AI — õpi päritolu tundma AIKI-s.'
WHERE node_id = 'gpt-1';

UPDATE node_metadata SET
  related_program_id = 'aiki',
  marketing_hook_en = 'The model that proved scale matters — we teach why in AIKI.',
  marketing_hook_et = 'Mudel, mis tõestas skaleerimise tähtsust — AIKI-s õpetame, miks.'
WHERE node_id = 'gpt-2';

UPDATE node_metadata SET
  related_program_id = 'aiki',
  marketing_hook_en = 'Few-shot learning changed everything — master it in AIKI.',
  marketing_hook_et = 'Väheste näidete õppimine muutis kõike — omanda see AIKI-s.'
WHERE node_id = 'gpt-3';

UPDATE node_metadata SET
  related_program_id = 'aiki',
  marketing_hook_en = 'Multimodal reasoning at its peak — AIKI covers prompting GPT-4 effectively.',
  marketing_hook_et = 'Multimodaalne arutlus tipptasemel — AIKI õpetab GPT-4 tõhusat kasutamist.'
WHERE node_id = 'gpt-4';

UPDATE node_metadata SET
  related_program_id = 'aiki',
  marketing_hook_en = 'Safety-first AI design — learn constitutional AI principles in AIKI.',
  marketing_hook_et = 'Ohutusele suunatud AI disain — õpi konstitutsioonilise AI põhimõtteid AIKI-s.'
WHERE node_id = 'claude';

UPDATE node_metadata SET
  related_program_id = 'aiki',
  marketing_hook_en = 'Natively multimodal — AIKI teaches how to work with Gemini across modalities.',
  marketing_hook_et = 'Loomulikult multimodaalne — AIKI õpetab Geminiga töötamist eri modaalsustes.'
WHERE node_id = 'gemini';

UPDATE node_metadata SET
  related_program_id = 'aiki',
  marketing_hook_en = 'Open models democratized AI — learn to leverage them in AIKI.',
  marketing_hook_et = 'Avatud mudelid demokratiseerisid AI — õpi neid kasutama AIKI-s.'
WHERE node_id = 'llama';

UPDATE node_metadata SET
  related_program_id = 'aiki',
  marketing_hook_en = 'The architecture behind every LLM — Week 2 of AIKI covers T-V-A-P.',
  marketing_hook_et = 'Iga suure keelemudeli taga olev arhitektuur — AIKI 2. nädal käsitleb T-V-A-P-d.'
WHERE node_id = 'era-transformers';

-- ── AIVO mappings (Automation, Vision, Tools) ──────────────────────────────

UPDATE node_metadata SET
  related_program_id = 'aivo',
  marketing_hook_en = 'From text to images — AIVO teaches building AI-powered visual tools.',
  marketing_hook_et = 'Tekstist piltideni — AIVO õpetab AI-põhiste visuaalsete tööriistade loomist.'
WHERE node_id = 'dall-e';

UPDATE node_metadata SET
  related_program_id = 'aivo',
  marketing_hook_en = 'The engine behind AI art tools — AIVO covers integrating diffusion APIs.',
  marketing_hook_et = 'AI kunstitööriistade mootor — AIVO käsitleb difusiooni API-de integreerimist.'
WHERE node_id = 'diffusion';

UPDATE node_metadata SET
  related_program_id = 'aivo',
  marketing_hook_en = 'Open-source image generation — learn to deploy it in AIVO.',
  marketing_hook_et = 'Avatud lähtekoodiga pildigenereerimine — õpi seda juurutama AIVO-s.'
WHERE node_id = 'stable-diffusion';

UPDATE node_metadata SET
  related_program_id = 'aivo',
  marketing_hook_en = 'Artistic AI at scale — AIVO teaches building similar creative pipelines.',
  marketing_hook_et = 'Kunstiline AI mastaabis — AIVO õpetab sarnaste loominguliste torude ehitamist.'
WHERE node_id = 'midjourney';

UPDATE node_metadata SET
  related_program_id = 'aivo',
  marketing_hook_en = 'Adversarial networks power deepfakes and art — AIVO explores the applications.',
  marketing_hook_et = 'Võistlevad võrgud loovad süvavõltsinguid ja kunsti — AIVO uurib rakendusi.'
WHERE node_id = 'gan';

UPDATE node_metadata SET
  related_program_id = 'aivo',
  marketing_hook_en = 'Computer vision starts here — AIVO covers building with CNNs.',
  marketing_hook_et = 'Arvutinägemine algab siit — AIVO käsitleb CNN-idega ehitamist.'
WHERE node_id = 'cnn';

-- ── NULL mappings (Historical / too theoretical) ───────────────────────────
-- These nodes remain without a program link:
--   algorithm, era-symbolic, era-neural, eliza, expert-systems, prolog,
--   perceptron, backpropagation, rnn, lstm

-- No UPDATE needed — related_program_id defaults to NULL
