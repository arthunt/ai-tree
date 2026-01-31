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
];
