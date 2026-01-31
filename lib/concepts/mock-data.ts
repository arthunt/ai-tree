/**
 * Mock concept data — used as fallback when Supabase is unavailable.
 * Matches the shape of the `concepts` + `concept_translations` tables.
 *
 * As concepts migrate to the database, mock entries here serve as
 * development/testing fallback only.
 */

import type { EvolutionStage, ConceptVisualType } from './types';

interface MockTranslation {
  title: string;
  subtitle?: string;
  explanation: string;
  metaphor: string;
  question?: string;
  deep_dive?: string;
  completion_message?: string;
  hint?: string;
}

export interface MockConcept {
  id: string;
  stage: EvolutionStage;
  category: string;
  complexity_level: number;
  sort_order: number;
  visual_type: ConceptVisualType;
  icon: string | null;
  color: string | null;
  parent_id: string | null;
  translations: Record<string, MockTranslation>;
}

export const MOCK_CONCEPTS: MockConcept[] = [
  // ── DNA Stage ────────────────────────────────────────────
  {
    id: 'tokenization',
    stage: 'dna',
    category: 'dna',
    complexity_level: 1,
    sort_order: 0,
    visual_type: 'interactive',
    icon: null,
    color: '#25EDBA',
    parent_id: null,
    translations: {
      en: {
        title: 'Tokenization',
        explanation:
          'The raw input text is broken down into small chunks called tokens. These are the basic units of meaning the AI can process — like individual puzzle pieces that together form the full picture.',
        metaphor:
          'Like chopping vegetables for a stew — whole ingredients become bite-sized pieces the recipe can work with.',
        question: 'How does the machine start reading?',
        completion_message: 'Text tokenized! Each piece has a unique ID.',
        hint: 'Try typing a sentence to see how it gets split into tokens.',
      },
      et: {
        title: 'Tokeniseerimine',
        explanation:
          'Sisendtekst jagatakse väikesteks osadeks, mida nimetatakse tokeniteks. Need on tehisintellekti jaoks tähenduse põhiühikud — nagu pusletükid, mis koos moodustavad tervikliku pildi.',
        metaphor:
          'Nagu köögiviljade hakkimine — terved koostisosad muutuvad suutavateks tükkideks, millega retsept tööta saab.',
        question: 'Kuidas masin hakkab lugema?',
        completion_message: 'Tekst tokeniseeritud! Igal tükil on unikaalne ID.',
        hint: 'Proovi sisestada lause, et näha, kuidas see tokeniteks jagatakse.',
      },
    },
  },
  {
    id: 'embeddings',
    stage: 'dna',
    category: 'dna',
    complexity_level: 1,
    sort_order: 1,
    visual_type: 'interactive',
    icon: null,
    color: '#3B82F6',
    parent_id: null,
    translations: {
      en: {
        title: 'Vector Embeddings',
        explanation:
          'Each token is converted into a list of numbers that represent its meaning in a high-dimensional space. Words with similar meanings end up close together, forming a map of language.',
        metaphor:
          'Like GPS coordinates for ideas — "king" and "queen" are neighbors, while "king" and "banana" are continents apart.',
        question: 'How does the AI understand what words mean?',
        completion_message: 'Vectors mapped! Words now have coordinates in meaning-space.',
        hint: 'Watch how tokens transform into number arrays.',
      },
      et: {
        title: 'Vektoresitlused',
        explanation:
          'Iga token muudetakse arvude loendiks, mis esindab selle tähendust kõigemõõtmelises ruumis. Sarnase tähendusega sõnad satuvad lähestikku, moodustades keelekaardi.',
        metaphor:
          'Nagu GPS-koordinaadid ideede jaoks — "kuningas" ja "kuninganna" on naabrid, samas kui "kuningas" ja "banaan" on mandrite kaugusel.',
        question: 'Kuidas tehisintellekt mõistab sõnade tähendust?',
        completion_message: 'Vektorid kaardistatud! Sõnadel on nüüd koordinaadid tähendusruumis.',
        hint: 'Jälgi, kuidas tokenid muutuvad numbriteks.',
      },
    },
  },
  {
    id: 'attention',
    stage: 'dna',
    category: 'dna',
    complexity_level: 2,
    sort_order: 2,
    visual_type: 'interactive',
    icon: null,
    color: '#A855F7',
    parent_id: null,
    translations: {
      en: {
        title: 'Self-Attention',
        explanation:
          'The model analyzes the relationship between every token and every other token in the input. This lets it understand context — knowing that "bank" means something different in "river bank" vs "bank account".',
        metaphor:
          'Like a spotlight in a dark room — it illuminates the connections between words, revealing which ones matter most to each other.',
        question: 'How does it understand context?',
        completion_message: 'Attention computed! The model sees how words relate.',
        hint: 'See which words pay attention to each other.',
      },
      et: {
        title: 'Enesekohane Tähelepanu',
        explanation:
          'Mudel analüüsib iga tokeni seost kõigi teiste tokenitega sisendis. See võimaldab mõiststa konteksti — teadmist, et "pank" tähendab erinevat "jõepank" ja "pangakonto" puhul.',
        metaphor:
          'Nagu prožektor pimedas ruumis — see valgustab sõnade vahelisi seoseid, paljastades, millised on üksteise jaoks kõige olulisemad.',
        question: 'Kuidas see mõistab konteksti?',
        completion_message: 'Tähelepanu arvutatud! Mudel näeb, kuidas sõnad seostuvad.',
        hint: 'Vaata, millised sõnad üksteisele tähelepanu pööravad.',
      },
    },
  },
  {
    id: 'prediction',
    stage: 'dna',
    category: 'dna',
    complexity_level: 2,
    sort_order: 3,
    visual_type: 'interactive',
    icon: null,
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'Prediction',
        explanation:
          'Based on all the context gathered, the model calculates the probability of every possible next token. It picks the most likely one (or samples creatively) and repeats — one token at a time building the response.',
        metaphor:
          'Like autocomplete on steroids — instead of guessing one word, it weighs thousands of possibilities using everything it has learned.',
        question: 'How does it actually generate text?',
        completion_message: 'Prediction complete! The AI has generated its response.',
        hint: 'See probabilities for each possible next word.',
      },
      et: {
        title: 'Ennustamine',
        explanation:
          'Kogu kogutud konteksti põhjal arvutab mudel igale võimalikule järgmisele tokenile tõenäosuse. See valib kõige tõenäolisema (või valib loovalt) ja kordab — üks token korraga luues vastust.',
        metaphor:
          'Nagu automaattäiendus steroididel — ühe sõna asemel kaalub see tuhandeid võimalusi, kasutades kõike õpitut.',
        question: 'Kuidas see tegelikult teksti genereerib?',
        completion_message: 'Ennustamine lõpetatud! Tehisintellekt on genereerinud oma vastuse.',
        hint: 'Vaata iga järgmise sõna tõenäosusi.',
      },
    },
  },

  // ── Fruits Stage (Applications) ────────────────────────────
  {
    id: 'aiki',
    stage: 'fruits',
    category: 'fruits',
    complexity_level: 1,
    sort_order: 0,
    visual_type: 'card',
    icon: 'MessageSquare',
    color: '#F97316',
    parent_id: null,
    translations: {
      en: {
        title: 'AIKI',
        subtitle: 'Creative',
        explanation: 'AI-powered creative writing assistant. Generate stories, poems, and scripts with context-aware suggestions.',
        metaphor: 'Like having a co-author who never runs out of ideas — you lead, and it fills in the creative gaps.',
      },
      et: {
        title: 'AIKI',
        subtitle: 'Looming',
        explanation: 'Tehisintellektiga loominguline kirjutamisassistent. Loo lugusid, luuletusi ja stsenaariume kontekstiteadlike soovitustega.',
        metaphor: 'Nagu kaasautor, kellel ei saa ideed kunagi otsa — sina juhid ja tema täidab loovad lüngad.',
      },
    },
  },
  {
    id: 'aivo',
    stage: 'fruits',
    category: 'fruits',
    complexity_level: 1,
    sort_order: 1,
    visual_type: 'card',
    icon: 'Brain',
    color: '#8B5CF6',
    parent_id: null,
    translations: {
      en: {
        title: 'AIVO',
        subtitle: 'Audio',
        explanation: 'Voice synthesis and audio generation engine. Create lifelike speech from text in multiple languages.',
        metaphor: 'Like a voice actor who speaks every language — turn any text into natural, expressive speech.',
      },
      et: {
        title: 'AIVO',
        subtitle: 'Heli',
        explanation: 'Häälsünteesi ja heliloome mootor. Loo elutruu kõne tekstist mitmes keeles.',
        metaphor: 'Nagu näitleja, kes räägib iga keelt — muuda iga tekst loomulikuks, väljendusrikkaks kõneks.',
      },
    },
  },
  {
    id: 'codegen',
    stage: 'fruits',
    category: 'fruits',
    complexity_level: 1,
    sort_order: 2,
    visual_type: 'card',
    icon: 'Code',
    color: '#10B981',
    parent_id: null,
    translations: {
      en: {
        title: 'CodeGen',
        subtitle: 'Development',
        explanation: 'Intelligent code completion and refactoring tool. Supports TypeScript, Python, and Rust.',
        metaphor: 'Like pair programming with an expert — it reads your intent and writes the implementation.',
      },
      et: {
        title: 'CodeGen',
        subtitle: 'Arendus',
        explanation: 'Intelligentne koodi täiendamise ja ümbertöötlemise tööriist. Toetab TypeScripti, Pythonit ja Rusti.',
        metaphor: 'Nagu paariprogrammeerimine eksperdiga — see loeb sinu kavatsust ja kirjutab teostuse.',
      },
    },
  },
  {
    id: 'visionary',
    stage: 'fruits',
    category: 'fruits',
    complexity_level: 1,
    sort_order: 3,
    visual_type: 'card',
    icon: 'Image',
    color: '#3B82F6',
    parent_id: null,
    translations: {
      en: {
        title: 'Visionary',
        subtitle: 'Visual',
        explanation: 'Text-to-image generation pipeline. Create stunning visuals from natural language prompts.',
        metaphor: 'Like a painter who understands words — describe what you see in your mind, and it appears on canvas.',
      },
      et: {
        title: 'Visionary',
        subtitle: 'Visuaal',
        explanation: 'Tekst-pildiks genereerimise torujuhe. Loo vapustavaid visuaale loomuliku keele kirjeldustest.',
        metaphor: 'Nagu maalikunstnik, kes mõistab sõnu — kirjelda, mida näed oma meeles, ja see ilmub lõuendile.',
      },
    },
  },

  // ── Orchard Stage (Careers) ────────────────────────────────
  {
    id: 'ai-engineer',
    stage: 'orchard',
    category: 'orchard',
    complexity_level: 1,
    sort_order: 0,
    visual_type: 'card',
    icon: 'Code',
    color: '#F43F5E',
    parent_id: null,
    translations: {
      en: {
        title: 'AI Engineer',
        subtitle: 'Engineering',
        explanation: 'Build and deploy the models that power intelligent applications. Requires Python, PyTorch/TensorFlow.',
        metaphor: 'Like a master builder constructing the brain — you design the neural architecture that thinks.',
        hint: '$120k - $250k',
      },
      et: {
        title: 'AI Insener',
        subtitle: 'Inseneeria',
        explanation: 'Ehita ja juuruta mudeleid, mis toitavad intelligentseid rakendusi. Nõuab Pythonit, PyTorch/TensorFlow.',
        metaphor: 'Nagu meisterehitaja, kes konstrueerib aju — sina disainid mõtleva närvivõrgu arhitektuuri.',
        hint: '$120k - $250k',
      },
    },
  },
  {
    id: 'prompt-architect',
    stage: 'orchard',
    category: 'orchard',
    complexity_level: 1,
    sort_order: 1,
    visual_type: 'card',
    icon: 'Palette',
    color: '#F43F5E',
    parent_id: null,
    translations: {
      en: {
        title: 'Prompt Architect',
        subtitle: 'Design / Logic',
        explanation: 'Craft and optimize the instructions that guide LLMs to desired outputs. High creativity required.',
        metaphor: 'Like a conductor directing an orchestra — the right instructions bring harmony from complexity.',
        hint: '$90k - $180k',
      },
      et: {
        title: 'Viipa Arhitekt',
        subtitle: 'Disain / Loogika',
        explanation: 'Loo ja optimeeri juhiseid, mis suunavad keelemudeleid soovitud väljunditeni. Nõuab kõrget loovust.',
        metaphor: 'Nagu dirigent, kes juhib orkestrit — õiged juhised toovad keerukusest harmooniat.',
        hint: '$90k - $180k',
      },
    },
  },
  {
    id: 'data-scientist',
    stage: 'orchard',
    category: 'orchard',
    complexity_level: 1,
    sort_order: 2,
    visual_type: 'card',
    icon: 'LineChart',
    color: '#F43F5E',
    parent_id: null,
    translations: {
      en: {
        title: 'Data Scientist',
        subtitle: 'Science',
        explanation: 'Analyze vast datasets to find patterns and train predictive models.',
        metaphor: 'Like an archaeologist sifting through layers — patterns emerge from mountains of raw data.',
        hint: '$110k - $200k',
      },
      et: {
        title: 'Andmeteadlane',
        subtitle: 'Teadus',
        explanation: 'Analüüsi tohutuid andmekogusid mustrite leidmiseks ja ennustavate mudelite treenimiseks.',
        metaphor: 'Nagu arheoloog, kes sõelub kihte — mustrid kerkivad esile tohututest toorandmetest.',
        hint: '$110k - $200k',
      },
    },
  },
  {
    id: 'ai-ethicist',
    stage: 'orchard',
    category: 'orchard',
    complexity_level: 1,
    sort_order: 3,
    visual_type: 'card',
    icon: 'ShieldCheck',
    color: '#F43F5E',
    parent_id: null,
    translations: {
      en: {
        title: 'AI Ethicist',
        subtitle: 'Policy',
        explanation: 'Ensure AI systems are fair, unbiased, and safe for humanity.',
        metaphor: 'Like a guardian of the garden — ensuring every fruit grown is healthy and nourishing.',
        hint: '$100k - $190k',
      },
      et: {
        title: 'AI Eetik',
        subtitle: 'Poliitika',
        explanation: 'Taga, et tehisintellekti süsteemid on õiglased, erapooletud ja inimkonnale ohutud.',
        metaphor: 'Nagu aia valvur — tagades, et iga kasvatatud vili on tervislik ja toitev.',
        hint: '$100k - $190k',
      },
    },
  },
  {
    id: 'mlops-specialist',
    stage: 'orchard',
    category: 'orchard',
    complexity_level: 1,
    sort_order: 4,
    visual_type: 'card',
    icon: 'Cpu',
    color: '#F43F5E',
    parent_id: null,
    translations: {
      en: {
        title: 'ML Ops Specialist',
        subtitle: 'Operations',
        explanation: 'Manage the infrastructure and pipelines that keep AI models running in production.',
        metaphor: 'Like a chief engineer keeping the power plant running — models are only useful if they stay online.',
        hint: '$130k - $240k',
      },
      et: {
        title: 'ML Ops Spetsialist',
        subtitle: 'Operatsioonid',
        explanation: 'Halda infrastruktuuri ja torujuhtmeid, mis hoiavad AI mudeleid tootmises töös.',
        metaphor: 'Nagu peainsener, kes hoiab elektrijaama töös — mudelid on kasulikud ainult siis, kui nad püsivad võrgus.',
        hint: '$130k - $240k',
      },
    },
  },
];
