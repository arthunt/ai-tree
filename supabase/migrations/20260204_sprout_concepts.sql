-- ============================================================
-- Sprout stage: "Emergent Properties" concepts
-- Ref: VISION_AND_STRATEGY.md Decision 6c
-- Replaces sprout_lessons with unified Concept Objects
-- ============================================================

INSERT INTO concepts (id, category, complexity_level, stage, sort_order, visual_type, icon, color)
VALUES
  ('generalization',       'sprout', 1, 'sprout', 0, 'card', 'Sparkles',       '#818CF8'),
  ('context-windows',      'sprout', 1, 'sprout', 1, 'card', 'Maximize2',      '#A78BFA'),
  ('hallucination',        'sprout', 2, 'sprout', 2, 'card', 'CloudLightning', '#C084FC'),
  ('temperature-sampling', 'sprout', 2, 'sprout', 3, 'card', 'Thermometer',    '#E879F9'),
  ('representations',      'sprout', 1, 'sprout', 4, 'card', 'Layers',         '#7C3AED'),
  ('prompting-basics',     'sprout', 1, 'sprout', 5, 'card', 'MessageCircle',  '#6366F1')
ON CONFLICT (id) DO UPDATE SET
  stage = EXCLUDED.stage,
  sort_order = EXCLUDED.sort_order,
  visual_type = EXCLUDED.visual_type,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color;

-- EN translations
INSERT INTO concept_translations (concept_id, locale, title, subtitle, explanation, metaphor, question)
VALUES
  ('generalization', 'en', 'Generalization',
    'Emergent Property',
    'After training on millions of examples, the model develops the ability to handle situations it has never seen before. This emergent capability — applying learned patterns to new contexts — is what makes AI genuinely useful rather than just a lookup table.',
    'Like learning to cook by following 1,000 recipes, then being able to improvise a dish from whatever is in the fridge.',
    'How can it answer questions it was never trained on?'),
  ('context-windows', 'en', 'Context Windows',
    'Working Memory',
    'The context window is the amount of text the model can consider at once — its working memory. Everything outside this window is forgotten. Larger windows allow more coherent, nuanced conversations but cost more compute.',
    'Like your short-term memory during a conversation — if someone talks for hours, you start forgetting what was said at the beginning.',
    'Why does the AI sometimes forget what you said earlier?'),
  ('hallucination', 'en', 'Hallucination',
    'Confident Errors',
    'Sometimes the model generates text that sounds authoritative but is factually wrong. This happens because the model predicts probable next tokens, not verified facts. It has no concept of truth — only of plausibility.',
    'Like a dream where everything looks real but isn''t — the model is predicting words, not checking facts.',
    'Why does it sometimes make things up?'),
  ('temperature-sampling', 'en', 'Temperature & Sampling',
    'Creativity Control',
    'Temperature controls how adventurous the model is when choosing the next word. Low temperature (0.1) makes it stick to the most probable choice — safe and predictable. High temperature (1.5) lets it explore unlikely options — creative but risky.',
    'Like adjusting the "wildness" dial on a musician''s improvisation — turn it low for a faithful cover, turn it high for experimental jazz.',
    'How do you control how creative or precise the AI is?'),
  ('representations', 'en', 'Internal Representations',
    'Hidden Understanding',
    'Inside its layers, the model builds abstract representations of concepts — not just words, but relationships, categories, and hierarchies. These internal maps are how it "understands" that Paris is to France as Tokyo is to Japan.',
    'Like how your brain doesn''t store a photo of your friend — it stores an abstract sense of who they are, their personality, their voice.',
    'What does the model actually "know" inside?'),
  ('prompting-basics', 'en', 'Prompting',
    'Steering the Model',
    'Prompting is the art of crafting input that guides the model toward the output you want. Clear structure, role assignment, and examples dramatically improve results. The same model can be brilliant or useless depending on the prompt.',
    'Like giving instructions to a brilliant intern — the clearer and more specific your brief, the better the deliverable.',
    'How do you get the best results from AI?')
ON CONFLICT (concept_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  explanation = EXCLUDED.explanation,
  metaphor = EXCLUDED.metaphor,
  question = EXCLUDED.question;

-- ET translations
INSERT INTO concept_translations (concept_id, locale, title, subtitle, explanation, metaphor, question)
VALUES
  ('generalization', 'et', 'Üldistamine',
    'Ilmnev omadus',
    'Miljonitel näidetel treenides arendab mudel võime tulla toime olukordadega, mida ta pole kunagi varem näinud. See ilmnev võime — õpitud mustrite rakendamine uutes kontekstides — teeb tehisintellektist tõeliselt kasuliku, mitte lihtsalt otsimistabeli.',
    'Nagu kokkamine pärast 1000 retsepti järgimist — suudad improviseerida roa mis iganes külmkapis on.',
    'Kuidas saab see vastata küsimustele, mille jaoks seda ei treenitud?'),
  ('context-windows', 'et', 'Kontekstiaken',
    'Töömälu',
    'Kontekstiaken on tekstihulk, mida mudel suudab korraga töödelda — selle töömälu. Kõik, mis jääb aknast välja, unustatakse. Suuremad aknad võimaldavad sidusemaid vestlusi, kuid nõuavad rohkem arvutusvõimsust.',
    'Nagu sinu lühimälu vestluse ajal — kui keegi räägib tundide kaupa, hakkad unustama, mida alguses öeldi.',
    'Miks AI mõnikord unustab, mida sa varem ütlesid?'),
  ('hallucination', 'et', 'Hallutsinatsioon',
    'Enesekindlad vead',
    'Mõnikord genereerib mudel teksti, mis kõlab autoriteetivalt, kuid on faktiliselt vale. See juhtub, sest mudel ennustab tõenäolisi järgmisi tokeneid, mitte kontrollitud fakte. Tal pole tõe mõistet — ainult usutavuse.',
    'Nagu unenägu, kus kõik tundub päris, aga pole — mudel ennustab sõnu, mitte ei kontrolli fakte.',
    'Miks see mõnikord mõtleb asju välja?'),
  ('temperature-sampling', 'et', 'Temperatuur ja sämpling',
    'Loovuse juhtimine',
    'Temperatuur kontrollib, kui seiklushimuline on mudel järgmise sõna valimisel. Madal temperatuur (0,1) paneb valima tõenäoliseima variandi — ohutu ja ennustatav. Kõrge temperatuur (1,5) laseb uurida ebatõenäolisi variante — loov, aga riskantne.',
    'Nagu muusiku improvisatsiooni "metsikuse" nupu reguleerimine — keera madalaks truu koopia jaoks, kõrgeks eksperimentaalse džässi jaoks.',
    'Kuidas sa kontrollid, kui loov või täpne AI on?'),
  ('representations', 'et', 'Sisemised esitlused',
    'Peidetud mõistmine',
    'Oma kihtide sees ehitab mudel abstraktseid kontseptsioonide esitlusi — mitte ainult sõnu, vaid suhteid, kategooriaid ja hierarhiaid. Need sisemised kaardid on viis, kuidas ta "mõistab", et Pariis on Prantsusmaa suhtes nagu Tokyo Jaapani suhtes.',
    'Nagu sinu aju ei salvesta sõbra fotot — see salvestab abstraktse tunde, kes nad on, nende isiksus, nende hääl.',
    'Mida mudel tegelikult "teab" seestpoolt?'),
  ('prompting-basics', 'et', 'Promptimine',
    'Mudeli suunamine',
    'Promptimine on kunst koostada sisendit, mis suunab mudelit soovitud väljundi poole. Selge struktuur, rollide määramine ja näited parandavad tulemusi märkimisväärselt. Sama mudel võib olla geniaalne või kasutu olenevalt promptist.',
    'Nagu juhiste andmine hiilgavale praktikandile — mida selgem ja täpsem sinu ülesanne, seda parem tulemus.',
    'Kuidas saad AI-lt parimaid tulemusi?')
ON CONFLICT (concept_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  explanation = EXCLUDED.explanation,
  metaphor = EXCLUDED.metaphor,
  question = EXCLUDED.question;
