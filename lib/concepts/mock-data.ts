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

  // ── Sprout Stage (Emergent Properties) ──────────────────────
  {
    id: 'generalization',
    stage: 'sprout',
    category: 'sprout',
    complexity_level: 1,
    sort_order: 0,
    visual_type: 'card',
    icon: 'Sparkles',
    color: '#818CF8',
    parent_id: null,
    translations: {
      en: {
        title: 'Generalization',
        subtitle: 'Emergent Property',
        explanation: 'After training on millions of examples, the model develops the ability to handle situations it has never seen before. This emergent capability — applying learned patterns to new contexts — is what makes AI genuinely useful rather than just a lookup table.',
        metaphor: 'Like learning to cook by following 1,000 recipes, then being able to improvise a dish from whatever is in the fridge.',
        question: 'How can it answer questions it was never trained on?',
      },
      et: {
        title: 'Uldistamine',
        subtitle: 'Ilmnev omadus',
        explanation: 'Miljonitel näidetel treenides arendab mudel võime tulla toime olukordadega, mida ta pole kunagi varem näinud. See ilmnev võime — õpitud mustrite rakendamine uutes kontekstides — teeb tehisintellektist tõeliselt kasuliku, mitte lihtsalt otsimistabeli.',
        metaphor: 'Nagu kokkamine pärast 1000 retsepti järgimist — suudad improviseerida roa mis iganes külmkapis on.',
        question: 'Kuidas saab see vastata küsimustele, mille jaoks seda ei treenitud?',
      },
    },
  },
  {
    id: 'context-windows',
    stage: 'sprout',
    category: 'sprout',
    complexity_level: 1,
    sort_order: 1,
    visual_type: 'card',
    icon: 'Maximize2',
    color: '#A78BFA',
    parent_id: null,
    translations: {
      en: {
        title: 'Context Windows',
        subtitle: 'Working Memory',
        explanation: 'The context window is the amount of text the model can consider at once — its working memory. Everything outside this window is forgotten. Larger windows allow more coherent, nuanced conversations but cost more compute.',
        metaphor: 'Like your short-term memory during a conversation — if someone talks for hours, you start forgetting what was said at the beginning.',
        question: 'Why does the AI sometimes forget what you said earlier?',
      },
      et: {
        title: 'Kontekstiaken',
        subtitle: 'Töömälu',
        explanation: 'Kontekstiaken on tekstihulk, mida mudel suudab korraga töödelda — selle töömälu. Kõik, mis jääb aknast välja, unustatakse. Suuremad aknad võimaldavad sidusemaid vestlusi, kuid nõuavad rohkem arvutusvõimsust.',
        metaphor: 'Nagu sinu lühimälu vestluse ajal — kui keegi räägib tundide kaupa, hakkad unustama, mida alguses öeldi.',
        question: 'Miks AI mõnikord unustab, mida sa varem ütlesid?',
      },
    },
  },
  {
    id: 'hallucination',
    stage: 'sprout',
    category: 'sprout',
    complexity_level: 2,
    sort_order: 2,
    visual_type: 'card',
    icon: 'CloudLightning',
    color: '#C084FC',
    parent_id: null,
    translations: {
      en: {
        title: 'Hallucination',
        subtitle: 'Confident Errors',
        explanation: 'Sometimes the model generates text that sounds authoritative but is factually wrong. This happens because the model predicts probable next tokens, not verified facts. It has no concept of truth — only of plausibility.',
        metaphor: 'Like a dream where everything looks real but isn\'t — the model is predicting words, not checking facts.',
        question: 'Why does it sometimes make things up?',
      },
      et: {
        title: 'Hallutsinatsioon',
        subtitle: 'Enesekindlad vead',
        explanation: 'Mõnikord genereerib mudel teksti, mis kõlab autoriteetivalt, kuid on faktiliselt vale. See juhtub, sest mudel ennustab tõenäolisi järgmisi tokeneid, mitte kontrollitud fakte. Tal pole tõe mõistet — ainult usutavuse.',
        metaphor: 'Nagu unenägu, kus kõik tundub päris, aga pole — mudel ennustab sõnu, mitte ei kontrolli fakte.',
        question: 'Miks see mõnikord mõtleb asju välja?',
      },
    },
  },
  {
    id: 'temperature-sampling',
    stage: 'sprout',
    category: 'sprout',
    complexity_level: 2,
    sort_order: 3,
    visual_type: 'card',
    icon: 'Thermometer',
    color: '#E879F9',
    parent_id: null,
    translations: {
      en: {
        title: 'Temperature & Sampling',
        subtitle: 'Creativity Control',
        explanation: 'Temperature controls how adventurous the model is when choosing the next word. Low temperature (0.1) makes it stick to the most probable choice — safe and predictable. High temperature (1.5) lets it explore unlikely options — creative but risky.',
        metaphor: 'Like adjusting the "wildness" dial on a musician\'s improvisation — turn it low for a faithful cover, turn it high for experimental jazz.',
        question: 'How do you control how creative or precise the AI is?',
      },
      et: {
        title: 'Temperatuur ja sämpling',
        subtitle: 'Loovuse juhtimine',
        explanation: 'Temperatuur kontrollib, kui seiklushimuline on mudel järgmise sõna valimisel. Madal temperatuur (0,1) paneb valima tõenäoliseima variandi — ohutu ja ennustatav. Kõrge temperatuur (1,5) laseb uurida ebatõenäolisi variante — loov, aga riskantne.',
        metaphor: 'Nagu muusiku improvisatsiooni "metsikuse" nupu reguleerimine — keera madalaks truu koopia jaoks, kõrgeks eksperimentaalse džässi jaoks.',
        question: 'Kuidas sa kontrollid, kui loov või täpne AI on?',
      },
    },
  },
  {
    id: 'representations',
    stage: 'sprout',
    category: 'sprout',
    complexity_level: 1,
    sort_order: 4,
    visual_type: 'card',
    icon: 'Layers',
    color: '#7C3AED',
    parent_id: null,
    translations: {
      en: {
        title: 'Internal Representations',
        subtitle: 'Hidden Understanding',
        explanation: 'Inside its layers, the model builds abstract representations of concepts — not just words, but relationships, categories, and hierarchies. These internal maps are how it "understands" that Paris is to France as Tokyo is to Japan.',
        metaphor: 'Like how your brain doesn\'t store a photo of your friend — it stores an abstract sense of who they are, their personality, their voice.',
        question: 'What does the model actually "know" inside?',
      },
      et: {
        title: 'Sisemised esitlused',
        subtitle: 'Peidetud mõistmine',
        explanation: 'Oma kihtide sees ehitab mudel abstraktseid kontseptsioonide esitlusi — mitte ainult sõnu, vaid suhteid, kategooriaid ja hierarhiaid. Need sisemised kaardid on viis, kuidas ta "mõistab", et Pariis on Prantsusmaa suhtes nagu Tokyo Jaapani suhtes.',
        metaphor: 'Nagu sinu aju ei salvesta sõbra fotot — see salvestab abstraktse tunde, kes nad on, nende isiksus, nende hääl.',
        question: 'Mida mudel tegelikult "teab" seestpoolt?',
      },
    },
  },
  {
    id: 'prompting-basics',
    stage: 'sprout',
    category: 'sprout',
    complexity_level: 1,
    sort_order: 5,
    visual_type: 'card',
    icon: 'MessageCircle',
    color: '#6366F1',
    parent_id: null,
    translations: {
      en: {
        title: 'Prompting',
        subtitle: 'Steering the Model',
        explanation: 'Prompting is the art of crafting input that guides the model toward the output you want. Clear structure, role assignment, and examples dramatically improve results. The same model can be brilliant or useless depending on the prompt.',
        metaphor: 'Like giving instructions to a brilliant intern — the clearer and more specific your brief, the better the deliverable.',
        question: 'How do you get the best results from AI?',
      },
      et: {
        title: 'Promptimine',
        subtitle: 'Mudeli suunamine',
        explanation: 'Promptimine on kunst koostada sisendit, mis suunab mudelit soovitud väljundi poole. Selge struktuur, rollide määramine ja näited parandavad tulemusi märkimisväärselt. Sama mudel võib olla geniaalne või kasutu olenevalt promptist.',
        metaphor: 'Nagu juhiste andmine hiilgavale praktikandile — mida selgem ja täpsem sinu ülesanne, seda parem tulemus.',
        question: 'Kuidas saad AI-lt parimaid tulemusi?',
      },
    },
  },

  // ── Seed Stage (Data & Training) ──────────────────────────
  // Phase 1: The Dataset
  {
    id: 'dataset',
    stage: 'seed',
    category: 'data',
    complexity_level: 1,
    sort_order: 10,
    visual_type: 'card',
    icon: 'Database',
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'Training Dataset',
        explanation: 'The massive collection of text used to teach the AI model, containing trillions of words from books, websites, and code.',
        metaphor: 'The library of all human knowledge.',
      },
      et: {
        title: 'Treeningandmestik',
        explanation: 'Massiivine tekstikogu, mida kasutatakse tehisintellekti mudeli õpetamiseks, sisaldades triljoneid sõnu raamatutest ja veebist.',
        metaphor: 'Kogu inimteadmiste raamatukogu.',
      },
    },
  },
  {
    id: 'common-crawl',
    stage: 'seed',
    category: 'data',
    complexity_level: 2,
    sort_order: 11,
    visual_type: 'card',
    icon: 'Globe',
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'Common Crawl',
        explanation: 'An open repository of web crawl data that makes up a significant portion of LLM training data.',
        metaphor: 'Snapshot of the internet.',
      },
      et: {
        title: 'Common Crawl',
        explanation: 'Avatud veebiandmete arhiiv, mis moodustab suure osa LLM-ide treeningmaterjalist.',
        metaphor: 'Internetist tehtud hetktõmmis.',
      },
    },
  },
  {
    id: 'the-pile',
    stage: 'seed',
    category: 'data',
    complexity_level: 2,
    sort_order: 12,
    visual_type: 'card',
    icon: 'Layers',
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'The Pile',
        explanation: 'A diverse, curated dataset designed to improve model generalization across different domains.',
        metaphor: 'A carefully mixed balanced diet.',
      },
      et: {
        title: 'The Pile',
        explanation: 'Mitmekesine ja kureeritud andmestik, mis on loodud mudeli üldistusvõime parandamiseks.',
        metaphor: 'Hoolikalt tasakaalustatud toitumine.',
      },
    },
  },
  {
    id: 'data-cleaning',
    stage: 'seed',
    category: 'data',
    complexity_level: 2,
    sort_order: 13,
    visual_type: 'card',
    icon: 'Filter',
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'Data Cleaning',
        explanation: 'The process of removing duplicates, formatting errors, and low-quality text from the dataset.',
        metaphor: 'filtering the water before bottling it.',
      },
      et: {
        title: 'Andmete Puhastamine',
        explanation: 'Duplikaatide, vormindamisvigade ja madalakvaliteedilise teksti eemaldamine andmestikust.',
        metaphor: 'Vee filtreerimine enne pudelisse villimist.',
      },
    },
  },
  {
    id: 'bias-in-data',
    stage: 'seed',
    category: 'data',
    complexity_level: 3,
    sort_order: 14,
    visual_type: 'card',
    icon: 'Scale',
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'Bias in Data',
        explanation: 'Historical and social prejudices present in the training data that the model might learn to replicate.',
        metaphor: 'If the library has mostly old books, the student learns old ideas.',
      },
      et: {
        title: 'Andmete Kallutatus',
        explanation: 'Ajaloolised ja sotsiaalsed eelarvamused treeningandmetes, mida mudel võib õppida kordama.',
        metaphor: 'Kui raamatukogus on vaid vanad raamatud, õpib tudeng vanu ideid.',
      },
    },
  },

  // Phase 2: Training
  {
    id: 'loss-function',
    stage: 'seed',
    category: 'training',
    complexity_level: 3,
    sort_order: 20,
    visual_type: 'interactive',
    icon: 'Activity',
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'Loss Function',
        explanation: 'A mathematical way to calculate how far off the model\'s prediction is from the actual target.',
        metaphor: 'The "hot or cold" game feedback.',
      },
      et: {
        title: 'Kaofunktsioon',
        explanation: 'Matemaatiline viis arvutada, kui kaugel on mudeli ennustus tegelikust eesmärgist.',
        metaphor: 'Mäng "soe või külm".',
      },
    },
  },
  {
    id: 'backpropagation',
    stage: 'seed',
    category: 'training',
    complexity_level: 4,
    sort_order: 21,
    visual_type: 'animation',
    icon: 'GitCommit',
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'Backpropagation',
        explanation: 'The algorithm that updates the model\'s weights based on the error calculated by the loss function.',
        metaphor: 'Correcting your swing after missing the ball.',
      },
      et: {
        title: 'Tagasilevi',
        explanation: 'Algoritm, mis uuendab mudeli kaalusid vastavalt kaofunktsiooni arvutatud veale.',
        metaphor: 'Löögi korrigeerimine pärast möödalasku.',
      },
    },
  },
  {
    id: 'compute-cluster',
    stage: 'seed',
    category: 'training',
    complexity_level: 2,
    sort_order: 22,
    visual_type: 'card',
    icon: 'Server',
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'Compute Cluster',
        explanation: 'Thousands of GPUs working in parallel to process the massive dataset and update the model.',
        metaphor: 'A factory of super-brains.',
      },
      et: {
        title: 'Arvutusklaster',
        explanation: 'Tuhanded GPU-d, mis töötavad paralleelselt andmestiku töötlemiseks.',
        metaphor: 'Superajude tehas.',
      },
    },
  },
  {
    id: 'epochs',
    stage: 'seed',
    category: 'training',
    complexity_level: 2,
    sort_order: 23,
    visual_type: 'card',
    icon: 'RotateCw',
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'Epochs',
        explanation: 'One complete pass through the entire training dataset.',
        metaphor: 'Reading the textbook from cover to cover once.',
      },
      et: {
        title: 'Epohhid',
        explanation: 'Üks täielik läbimine läbi kogu treeningandmestiku.',
        metaphor: 'Õpiku kaanest kaaneni läbilugemine ühe korra.',
      },
    },
  },
  {
    id: 'overfitting',
    stage: 'seed',
    category: 'training',
    complexity_level: 3,
    sort_order: 24,
    visual_type: 'interactive',
    icon: 'AlertTriangle',
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'Overfitting',
        explanation: 'When a model memorizes the training data instead of learning general patterns, performing poorly on new data.',
        metaphor: 'Memorizing the answers instead of understanding the subject.',
      },
      et: {
        title: 'Ülesobitamine',
        explanation: 'Kui mudel jätab treeningandmed meelde selle asemel, et õppida üldisi mustreid.',
        metaphor: 'Vastuste päheõppimine aine mõistmise asemel.',
      },
    },
  },

  // Phase 3: The Model
  {
    id: 'weights',
    stage: 'seed',
    category: 'model',
    complexity_level: 4,
    sort_order: 30,
    visual_type: 'card',
    icon: 'Grid',
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'Weights (Parameters)',
        explanation: 'The adjustable numbers inside the model that determine how input signals are processed.',
        metaphor: 'The dial settings on a complex machine.',
      },
      et: {
        title: 'Kaalud (Parameetrid)',
        explanation: 'Reguleeritavad arvud mudeli sees, mis määravad, kuidas sisendsignaale töödeldakse.',
        metaphor: 'Keerulise masina seadistusnupud.',
      },
    },
  },
  {
    id: 'base-model',
    stage: 'seed',
    category: 'model',
    complexity_level: 3,
    sort_order: 31,
    visual_type: 'card',
    icon: 'Box',
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'Base Model',
        explanation: 'The raw, pre-trained model before any fine-tuning for specific tasks like chat or coding.',
        metaphor: 'A brilliant student who knows facts but lacks social skills.',
      },
      et: {
        title: 'Baasmudel',
        explanation: 'Toores, eeltreenitud mudel enne peenhäälestamist spetsiifilisteks ülesanneteks.',
        metaphor: 'Geniaalne tudeng, kes teab fakte, kuid ei oska veel suhelda.',
      },
    },
  },
  {
    id: 'checkpoints',
    stage: 'seed',
    category: 'model',
    complexity_level: 2,
    sort_order: 32,
    visual_type: 'card',
    icon: 'Save',
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'Checkpoints',
        explanation: 'Snapshots of the model saved at various points during training to prevent data loss.',
        metaphor: 'Auto-save in a video game.',
      },
      et: {
        title: 'Kontrollpunktid',
        explanation: 'Mudeli salvestatud hetkeseisud treeningu ajal.',
        metaphor: 'Automaatne salvestamine videomängus.',
      },
    },
  },
  {
    id: 'evaluation',
    stage: 'seed',
    category: 'model',
    complexity_level: 3,
    sort_order: 33,
    visual_type: 'card',
    icon: 'CheckCircle',
    color: '#F59E0B',
    parent_id: null,
    translations: {
      en: {
        title: 'Evaluation',
        explanation: 'Testing the model on a held-out set of data it hasn\'t seen before to measure true performance.',
        metaphor: 'The final exam.',
      },
      et: {
        title: 'Hindamine',
        explanation: 'Mudeli testimine andmetel, mida see pole varem näinud.',
        metaphor: 'Lõpueksam.',
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
