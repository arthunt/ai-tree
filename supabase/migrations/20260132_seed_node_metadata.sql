-- AI Tree: Node Metadata Enrichment Layer
-- Adds historical/technical metadata to existing 26 tree nodes

-- 1. Create node_metadata table
CREATE TABLE IF NOT EXISTS node_metadata (
  node_id TEXT PRIMARY KEY REFERENCES nodes(id) ON DELETE CASCADE,
  year_introduced INT,
  key_paper_title TEXT,
  key_paper_url TEXT,
  primary_use_case TEXT,
  visual_motif TEXT
);

-- 2. RLS (public read)
ALTER TABLE node_metadata ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read node_metadata') THEN
    CREATE POLICY "Public read node_metadata" ON node_metadata FOR SELECT USING (true);
  END IF;
END $$;

-- 3. Backfill year_introduced on nodes table where missing
UPDATE nodes SET year_introduced = v.yr FROM (VALUES
  ('algorithm',        1936),
  ('era-symbolic',     1956),
  ('era-neural',       1943),
  ('era-transformers', 2017),
  ('eliza',            1966),
  ('expert-systems',   1970),
  ('prolog',           1972),
  ('perceptron',       1958),
  ('backpropagation',  1986),
  ('cnn',              1989),
  ('rnn',              1986),
  ('lstm',             1997),
  ('gan',              2014),
  ('attention-paper',  2017),
  ('bert',             2018),
  ('gpt-1',           2018),
  ('gpt-2',           2019),
  ('gpt-3',           2020),
  ('gpt-4',           2023),
  ('dall-e',          2021),
  ('claude',           2023),
  ('gemini',           2023),
  ('llama',            2023),
  ('diffusion',        2015),
  ('stable-diffusion', 2022),
  ('midjourney',       2022)
) AS v(nid, yr)
WHERE nodes.id = v.nid;

-- 4. Insert metadata for all 26 nodes
INSERT INTO node_metadata (node_id, year_introduced, key_paper_title, key_paper_url, primary_use_case, visual_motif) VALUES
  (
    'algorithm', 1936,
    'On Computable Numbers, with an Application to the Entscheidungsproblem',
    'https://doi.org/10.1112/plms/s2-42.1.230',
    'Formalizing computation itself — the seed from which all AI grows',
    'seed'
  ),
  (
    'era-symbolic', 1956,
    'A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence',
    'http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf',
    'Rule-based reasoning, logic programming, knowledge representation',
    'crystal'
  ),
  (
    'era-neural', 1943,
    'A Logical Calculus of the Ideas Immanent in Nervous Activity',
    'https://doi.org/10.1007/BF02478259',
    'Learning from data via artificial neural networks',
    'network'
  ),
  (
    'era-transformers', 2017,
    'Attention Is All You Need',
    'https://arxiv.org/abs/1706.03762',
    'Parallel sequence processing with self-attention mechanisms',
    'prism'
  ),
  (
    'eliza', 1966,
    'ELIZA — A Computer Program For the Study of Natural Language Communication Between Man And Machine',
    'https://doi.org/10.1145/365153.365168',
    'Pattern-matching conversational agent — first chatbot',
    'mirror'
  ),
  (
    'expert-systems', 1970,
    'DENDRAL: A Case Study of the First Expert System',
    'https://doi.org/10.1016/0004-3702(78)90014-5',
    'Encoding domain expert knowledge into if-then rules for decision support',
    'filing-cabinet'
  ),
  (
    'prolog', 1972,
    'The Birth of Prolog',
    'https://doi.org/10.1145/155360.155362',
    'Logic programming for AI, theorem proving, and symbolic reasoning',
    'tree-logic'
  ),
  (
    'perceptron', 1958,
    'The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain',
    'https://doi.org/10.1037/h0042519',
    'Binary classification — the first trainable neural network',
    'neuron'
  ),
  (
    'backpropagation', 1986,
    'Learning representations by back-propagating errors',
    'https://doi.org/10.1038/323533a0',
    'Training multi-layer networks by propagating error gradients backward',
    'wave'
  ),
  (
    'cnn', 1989,
    'Backpropagation Applied to Handwritten Zip Code Recognition',
    'https://doi.org/10.1162/neco.1989.1.4.541',
    'Image recognition, computer vision, spatial pattern detection',
    'grid'
  ),
  (
    'rnn', 1986,
    'Learning Internal Representations by Error Propagation (PDP, Ch. 8)',
    'https://doi.org/10.7551/mitpress/5236.001.0001',
    'Sequential data processing — text, time series, speech',
    'spiral'
  ),
  (
    'lstm', 1997,
    'Long Short-Term Memory',
    'https://doi.org/10.1162/neco.1997.9.8.1735',
    'Learning long-range dependencies in sequences without vanishing gradients',
    'gate'
  ),
  (
    'gan', 2014,
    'Generative Adversarial Nets',
    'https://arxiv.org/abs/1406.2661',
    'Generating realistic synthetic data via adversarial training',
    'mirror-dual'
  ),
  (
    'attention-paper', 2017,
    'Attention Is All You Need',
    'https://arxiv.org/abs/1706.03762',
    'Self-attention mechanism replacing recurrence for sequence modeling',
    'triangle'
  ),
  (
    'bert', 2018,
    'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
    'https://arxiv.org/abs/1810.04805',
    'Bidirectional language understanding — search, classification, QA',
    'magnifying-glass'
  ),
  (
    'gpt-1', 2018,
    'Improving Language Understanding by Generative Pre-Training',
    'https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf',
    'Demonstrating that generative pre-training improves downstream NLP tasks',
    'scroll'
  ),
  (
    'gpt-2', 2019,
    'Language Models are Unsupervised Multitask Learners',
    'https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf',
    'Coherent long-form text generation — too dangerous to release (at the time)',
    'quill'
  ),
  (
    'gpt-3', 2020,
    'Language Models are Few-Shot Learners',
    'https://arxiv.org/abs/2005.14165',
    'Few-shot and zero-shot learning across tasks via scale (175B parameters)',
    'explosion'
  ),
  (
    'gpt-4', 2023,
    'GPT-4 Technical Report',
    'https://arxiv.org/abs/2303.08774',
    'Multimodal reasoning (text + images), advanced problem solving',
    'diamond'
  ),
  (
    'dall-e', 2021,
    'Zero-Shot Text-to-Image Generation',
    'https://arxiv.org/abs/2102.12092',
    'Generating images from text descriptions',
    'palette'
  ),
  (
    'claude', 2023,
    'Constitutional AI: Harmlessness from AI Feedback',
    'https://arxiv.org/abs/2212.08073',
    'Safety-aligned AI assistant with constitutional training',
    'shield'
  ),
  (
    'gemini', 2023,
    'Gemini: A Family of Highly Capable Multimodal Models',
    'https://arxiv.org/abs/2312.11805',
    'Natively multimodal AI (text, image, audio, video, code)',
    'gem'
  ),
  (
    'llama', 2023,
    'LLaMA: Open and Efficient Foundation Language Models',
    'https://arxiv.org/abs/2302.13971',
    'Open-weight foundation models enabling community research and fine-tuning',
    'llama'
  ),
  (
    'diffusion', 2015,
    'Deep Unsupervised Learning using Nonequilibrium Thermodynamics',
    'https://arxiv.org/abs/1503.03585',
    'Iterative denoising for high-quality image generation',
    'cloud'
  ),
  (
    'stable-diffusion', 2022,
    'High-Resolution Image Synthesis with Latent Diffusion Models',
    'https://arxiv.org/abs/2112.10752',
    'Open-source text-to-image generation in latent space',
    'paintbrush'
  ),
  (
    'midjourney', 2022,
    NULL,
    NULL,
    'Artistic AI image generation with strong aesthetic bias',
    'canvas'
  )
ON CONFLICT (node_id) DO UPDATE SET
  year_introduced = EXCLUDED.year_introduced,
  key_paper_title = EXCLUDED.key_paper_title,
  key_paper_url = EXCLUDED.key_paper_url,
  primary_use_case = EXCLUDED.primary_use_case,
  visual_motif = EXCLUDED.visual_motif;
