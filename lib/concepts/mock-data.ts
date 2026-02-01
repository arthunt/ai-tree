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
      ru: {
        title: 'Токенизация',
        explanation:
          'Входной текст разбивается на маленькие фрагменты — токены. Это базовые единицы смысла для ИИ — как кусочки пазла, которые вместе складываются в полную картину.',
        metaphor:
          'Как нарезка овощей для рагу — целые ингредиенты превращаются в кусочки, с которыми можно работать по рецепту.',
        question: 'Как машина начинает читать?',
        completion_message: 'Текст токенизирован! У каждого фрагмента есть уникальный ID.',
        hint: 'Попробуйте ввести предложение, чтобы увидеть, как оно разбивается на токены.',
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
      ru: {
        title: 'Векторные представления',
        explanation:
          'Каждый токен преобразуется в список чисел, отражающих его значение в многомерном пространстве. Слова с похожими значениями оказываются рядом, формируя карту языка.',
        metaphor:
          'Как GPS-координаты для идей — «король» и «королева» рядом, а «король» и «банан» — на разных континентах.',
        question: 'Как ИИ понимает значение слов?',
        completion_message: 'Векторы построены! Слова теперь имеют координаты в пространстве смыслов.',
        hint: 'Посмотрите, как токены превращаются в массивы чисел.',
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
      ru: {
        title: 'Механизм внимания',
        explanation:
          'Модель анализирует связь каждого токена с каждым другим токеном во входных данных. Это позволяет понимать контекст — знать, что «коса» означает разное в «русая коса» и «речная коса».',
        metaphor:
          'Как прожектор в тёмной комнате — он подсвечивает связи между словами, показывая, какие из них важнее всего друг для друга.',
        question: 'Как модель понимает контекст?',
        completion_message: 'Внимание рассчитано! Модель видит, как слова связаны между собой.',
        hint: 'Посмотрите, какие слова обращают внимание друг на друга.',
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
      ru: {
        title: 'Предсказание',
        explanation:
          'На основе всего собранного контекста модель вычисляет вероятность каждого возможного следующего токена. Она выбирает наиболее вероятный (или «творчески» пробует) и повторяет — по одному токену выстраивая ответ.',
        metaphor:
          'Как автодополнение на максимуме — вместо одного слова взвешиваются тысячи вариантов на основе всего изученного.',
        question: 'Как ИИ генерирует текст?',
        completion_message: 'Предсказание завершено! ИИ сгенерировал свой ответ.',
        hint: 'Посмотрите вероятности для каждого следующего слова.',
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
      ru: {
        title: 'Обобщение',
        subtitle: 'Эмерджентное свойство',
        explanation: 'После обучения на миллионах примеров модель развивает способность справляться с ситуациями, которых никогда не видела. Это эмерджентное свойство — применение изученных паттернов в новых контекстах — делает ИИ по-настоящему полезным, а не просто справочной таблицей.',
        metaphor: 'Как научиться готовить по 1000 рецептам, а потом импровизировать из того, что есть в холодильнике.',
        question: 'Как ИИ отвечает на вопросы, которых не было в обучении?',
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
      ru: {
        title: 'Контекстное окно',
        subtitle: 'Рабочая память',
        explanation: 'Контекстное окно — это объём текста, который модель может учитывать одновременно, её рабочая память. Всё за пределами окна забывается. Большее окно позволяет вести более связные разговоры, но требует больше вычислений.',
        metaphor: 'Как кратковременная память во время разговора — если собеседник говорит часами, вы начинаете забывать, что было сказано вначале.',
        question: 'Почему ИИ иногда забывает, что вы сказали ранее?',
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
      ru: {
        title: 'Галлюцинация',
        subtitle: 'Уверенные ошибки',
        explanation: 'Иногда модель генерирует текст, который звучит авторитетно, но фактически неверен. Это происходит потому, что модель предсказывает вероятные следующие токены, а не проверенные факты. У неё нет понятия истины — только правдоподобия.',
        metaphor: 'Как сон, в котором всё выглядит реальным, но таковым не является — модель предсказывает слова, а не проверяет факты.',
        question: 'Почему ИИ иногда выдумывает?',
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
      ru: {
        title: 'Температура и сэмплирование',
        subtitle: 'Управление креативностью',
        explanation: 'Температура контролирует, насколько «дерзко» модель выбирает следующее слово. Низкая температура (0,1) заставляет выбирать наиболее вероятный вариант — безопасно и предсказуемо. Высокая температура (1,5) позволяет исследовать маловероятные варианты — творчески, но рискованно.',
        metaphor: 'Как регулировка «дикости» импровизации музыканта — убавьте для точного кавера, прибавьте для экспериментального джаза.',
        question: 'Как управлять тем, насколько креативен или точен ИИ?',
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
      ru: {
        title: 'Внутренние представления',
        subtitle: 'Скрытое понимание',
        explanation: 'Внутри своих слоёв модель строит абстрактные представления понятий — не просто слова, а связи, категории и иерархии. Эти внутренние карты позволяют ей «понимать», что Париж относится к Франции так же, как Токио к Японии.',
        metaphor: 'Как ваш мозг не хранит фото друга — он хранит абстрактное ощущение того, кто этот человек, его характер, его голос.',
        question: 'Что модель на самом деле «знает» внутри?',
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
      ru: {
        title: 'Промптинг',
        subtitle: 'Управление моделью',
        explanation: 'Промптинг — это искусство составления входных данных, которые направляют модель к нужному результату. Чёткая структура, назначение ролей и примеры значительно улучшают качество ответов. Одна и та же модель может быть гениальной или бесполезной в зависимости от промпта.',
        metaphor: 'Как давать инструкции блестящему стажёру — чем яснее и конкретнее задание, тем лучше результат.',
        question: 'Как получить от ИИ наилучшие результаты?',
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
      ru: {
        title: 'Обучающий набор данных',
        explanation: 'Огромная коллекция текстов для обучения модели ИИ, содержащая триллионы слов из книг, веб-сайтов и кода.',
        metaphor: 'Библиотека всех человеческих знаний.',
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
      ru: {
        title: 'Common Crawl',
        explanation: 'Открытый архив веб-данных, составляющий значительную часть обучающих данных для языковых моделей.',
        metaphor: 'Снимок всего интернета.',
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
      ru: {
        title: 'The Pile',
        explanation: 'Разнообразный курируемый набор данных, созданный для улучшения способности модели к обобщению в разных областях.',
        metaphor: 'Тщательно сбалансированный рацион.',
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
      ru: {
        title: 'Очистка данных',
        explanation: 'Процесс удаления дубликатов, ошибок форматирования и низкокачественного текста из набора данных.',
        metaphor: 'Фильтрация воды перед розливом.',
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
      ru: {
        title: 'Предвзятость данных',
        explanation: 'Исторические и социальные предрассудки в обучающих данных, которые модель может научиться воспроизводить.',
        metaphor: 'Если в библиотеке только старые книги, студент усвоит устаревшие идеи.',
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
      ru: {
        title: 'Функция потерь',
        explanation: 'Математический способ вычислить, насколько предсказание модели отличается от правильного ответа.',
        metaphor: 'Обратная связь в игре «горячо-холодно».',
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
      ru: {
        title: 'Обратное распространение',
        explanation: 'Алгоритм, который обновляет веса модели на основе ошибки, вычисленной функцией потерь.',
        metaphor: 'Корректировка удара после промаха.',
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
      ru: {
        title: 'Вычислительный кластер',
        explanation: 'Тысячи GPU, работающих параллельно для обработки огромного набора данных и обновления модели.',
        metaphor: 'Фабрика суперразумов.',
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
      ru: {
        title: 'Эпохи',
        explanation: 'Один полный проход по всему обучающему набору данных.',
        metaphor: 'Прочитать учебник от корки до корки один раз.',
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
      ru: {
        title: 'Переобучение',
        explanation: 'Когда модель запоминает обучающие данные вместо того, чтобы учиться обобщать, и плохо работает на новых данных.',
        metaphor: 'Зубрить ответы вместо понимания предмета.',
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
      ru: {
        title: 'Веса (параметры)',
        explanation: 'Настраиваемые числа внутри модели, которые определяют, как обрабатываются входные сигналы.',
        metaphor: 'Регуляторы на сложной машине.',
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
      ru: {
        title: 'Базовая модель',
        explanation: 'Необработанная предобученная модель до тонкой настройки для конкретных задач вроде чата или программирования.',
        metaphor: 'Блестящий студент, знающий факты, но не умеющий общаться.',
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
      ru: {
        title: 'Контрольные точки',
        explanation: 'Снимки состояния модели, сохраняемые на разных этапах обучения для предотвращения потери данных.',
        metaphor: 'Автосохранение в видеоигре.',
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
      ru: {
        title: 'Оценка',
        explanation: 'Тестирование модели на отложенном наборе данных, которых она раньше не видела, для измерения реальной производительности.',
        metaphor: 'Выпускной экзамен.',
      },
    },
  },

  // ── Sapling Stage (Nursery / Puukool) ────────────────────
  {
    id: 'first-prompt',
    stage: 'sapling',
    category: 'practice',
    complexity_level: 1,
    sort_order: 0,
    visual_type: 'sandbox',
    icon: 'MessageSquare',
    color: '#34D399',
    parent_id: null,
    translations: {
      en: {
        title: 'First Prompt',
        subtitle: 'Module 1',
        explanation: 'Type your first prompt to an AI model and see the output. Understand the direct cause-and-effect relationship between input and output.',
        metaphor: 'Like planting your first seed — you provide the instructions, the model provides the growth.',
        question: 'What happens when you ask an AI something?',
        hint: 'Try a simple question first, then try something more complex.',
      },
      et: {
        title: 'Esimene Viip',
        subtitle: 'Moodul 1',
        explanation: 'Sisesta oma esimene viip tehisintellekti mudelile ja vaata väljundit. Mõista otsest põhjus-tagajärg seost sisendi ja väljundi vahel.',
        metaphor: 'Nagu esimese seemne istutamine — sina annad juhised, mudel annab kasvu.',
        question: 'Mis juhtub, kui sa AI-lt midagi küsid?',
        hint: 'Proovi kõigepealt lihtsat küsimust, seejärel midagi keerulisemat.',
      },
      ru: {
        title: 'Первый промпт',
        subtitle: 'Модуль 1',
        explanation: 'Введите свой первый запрос к ИИ и посмотрите на результат. Поймите прямую причинно-следственную связь между вводом и выводом.',
        metaphor: 'Как посадить первое семя — вы даёте инструкции, модель обеспечивает рост.',
        question: 'Что происходит, когда вы спрашиваете ИИ?',
        hint: 'Начните с простого вопроса, потом попробуйте что-то сложнее.',
      },
    },
  },
  {
    id: 'prompt-refinement',
    stage: 'sapling',
    category: 'practice',
    complexity_level: 1,
    sort_order: 1,
    visual_type: 'sandbox',
    icon: 'RefreshCw',
    color: '#34D399',
    parent_id: null,
    translations: {
      en: {
        title: 'Prompt Refinement',
        subtitle: 'Module 2',
        explanation: 'Same task, three attempts. Watch how iterating on your prompt improves the result — adding context, structure, and examples.',
        metaphor: 'Like sculpting clay — each pass refines the shape until it matches your vision.',
        question: 'How do small changes to a prompt lead to big changes in output?',
        hint: 'Try adding "step by step" or "in the style of" to see the difference.',
      },
      et: {
        title: 'Viiba Täiustamine',
        subtitle: 'Moodul 2',
        explanation: 'Sama ülesanne, kolm katset. Jälgi, kuidas viiba itereerimine parandab tulemust — konteksti, struktuuri ja näidete lisamine.',
        metaphor: 'Nagu savi vormimine — iga läbimine täiustab kuju, kuni see vastab sinu visioonile.',
        question: 'Kuidas väikesed muutused viibas viivad suurte muutusteni väljundis?',
        hint: 'Proovi lisada "samm-sammult" või "stiilis", et näha erinevust.',
      },
      ru: {
        title: 'Улучшение промпта',
        subtitle: 'Модуль 2',
        explanation: 'Одна задача, три попытки. Посмотрите, как итерация промпта улучшает результат — добавление контекста, структуры и примеров.',
        metaphor: 'Как лепка из глины — каждый проход уточняет форму, пока она не совпадёт с вашим замыслом.',
        question: 'Как маленькие изменения в промпте приводят к большим изменениям в результате?',
        hint: 'Попробуйте добавить «пошагово» или «в стиле», чтобы увидеть разницу.',
      },
    },
  },
  {
    id: 'temperature-control',
    stage: 'sapling',
    category: 'practice',
    complexity_level: 2,
    sort_order: 2,
    visual_type: 'sandbox',
    icon: 'Thermometer',
    color: '#34D399',
    parent_id: null,
    translations: {
      en: {
        title: 'Temperature & Control',
        subtitle: 'Module 3',
        explanation: 'Adjust temperature, top-p, and max tokens. See how parameters change the creativity, focus, and length of AI output in real time.',
        metaphor: 'Like mixing a cocktail — the proportions of each ingredient completely change the taste.',
        question: 'What happens when you turn up the creativity dial?',
        hint: 'Try temperature 0.1 vs 1.5 on the same prompt.',
      },
      et: {
        title: 'Temperatuur ja Juhtimine',
        subtitle: 'Moodul 3',
        explanation: 'Reguleeri temperatuuri, top-p ja max tokeneid. Vaata, kuidas parameetrid muudavad AI väljundi loovust, fookust ja pikkust reaalajas.',
        metaphor: 'Nagu kokteili segamine — iga koostisosa proportsioonid muudavad täielikult maitset.',
        question: 'Mis juhtub, kui keeread loovuse nuppu üles?',
        hint: 'Proovi temperatuuri 0,1 vs 1,5 sama viibaga.',
      },
      ru: {
        title: 'Температура и управление',
        subtitle: 'Модуль 3',
        explanation: 'Настройте температуру, top-p и максимальное число токенов. Посмотрите, как параметры меняют креативность, фокус и длину вывода ИИ в реальном времени.',
        metaphor: 'Как смешивание коктейля — пропорции ингредиентов полностью меняют вкус.',
        question: 'Что происходит, когда вы повышаете креативность?',
        hint: 'Попробуйте температуру 0,1 против 1,5 на одном и том же промпте.',
      },
    },
  },
  {
    id: 'output-evaluation',
    stage: 'sapling',
    category: 'practice',
    complexity_level: 2,
    sort_order: 3,
    visual_type: 'sandbox',
    icon: 'CheckCircle',
    color: '#34D399',
    parent_id: null,
    translations: {
      en: {
        title: 'Evaluation',
        subtitle: 'Module 4',
        explanation: 'Learn to judge AI output quality across three dimensions: accuracy (is it correct?), relevance (does it answer the question?), and safety (is it appropriate?).',
        metaphor: 'Like a food critic — you learn to taste critically, not just eat everything served.',
        question: 'How do you tell good AI output from bad?',
        hint: 'Look for hedging language, unsupported claims, and missing context.',
      },
      et: {
        title: 'Hindamine',
        subtitle: 'Moodul 4',
        explanation: 'Õpi hindama AI väljundi kvaliteeti kolmes mõõtmes: täpsus (kas on õige?), asjakohasus (kas vastab küsimusele?) ja ohutus (kas on sobiv?).',
        metaphor: 'Nagu toidukriitik — sa õpid maitsma kriitiliselt, mitte lihtsalt sööma kõike, mida pakutakse.',
        question: 'Kuidas eristada head AI väljundit halvast?',
        hint: 'Otsi kõhklevat keelt, põhjendamata väiteid ja puuduvat konteksti.',
      },
      ru: {
        title: 'Оценка результата',
        subtitle: 'Модуль 4',
        explanation: 'Научитесь оценивать качество вывода ИИ по трём измерениям: точность (верно ли это?), релевантность (отвечает ли на вопрос?) и безопасность (уместно ли это?).',
        metaphor: 'Как ресторанный критик — вы учитесь пробовать критически, а не просто есть всё, что подают.',
        question: 'Как отличить хороший вывод ИИ от плохого?',
        hint: 'Ищите уклончивые формулировки, необоснованные утверждения и недостаток контекста.',
      },
    },
  },

  // ── Tree Stage (Deep Knowledge) ─────────────────────────
  {
    id: 'history-of-ai',
    stage: 'tree',
    category: 'roots',
    complexity_level: 2,
    sort_order: 0,
    visual_type: 'card',
    icon: 'Clock',
    color: '#059669',
    parent_id: null,
    translations: {
      en: {
        title: 'History of AI',
        subtitle: 'Roots',
        explanation: 'From Turing\'s 1950 paper to modern transformers — the key milestones, winters, and breakthroughs that shaped the field.',
        metaphor: 'The rings of the tree trunk — each layer tells the story of a different era.',
        question: 'Why did AI take 70 years to become useful?',
      },
      et: {
        title: 'AI Ajalugu',
        subtitle: 'Juured',
        explanation: 'Turingi 1950. aasta artiklist kaasaegsete transformeriteni — peamised verstapostid, talved ja läbimurded, mis kujundasid valdkonda.',
        metaphor: 'Puutüve aastarõngad — iga kiht räägib erineva ajastu lugu.',
        question: 'Miks kulus AI-l 70 aastat, et kasulikuks saada?',
      },
      ru: {
        title: 'История ИИ',
        subtitle: 'Корни',
        explanation: 'От статьи Тьюринга 1950 года до современных трансформеров — ключевые вехи, «зимы» и прорывы, сформировавшие область.',
        metaphor: 'Годичные кольца ствола — каждый слой рассказывает историю своей эпохи.',
        question: 'Почему ИИ понадобилось 70 лет, чтобы стать полезным?',
      },
    },
  },
  {
    id: 'transformer-architecture',
    stage: 'tree',
    category: 'trunk',
    complexity_level: 3,
    sort_order: 1,
    visual_type: 'diagram',
    icon: 'GitBranch',
    color: '#059669',
    parent_id: null,
    translations: {
      en: {
        title: 'Transformer Architecture',
        subtitle: 'Trunk',
        explanation: 'The "Attention is All You Need" architecture that revolutionized NLP. Encoder-decoder structure with multi-head attention and positional encoding.',
        metaphor: 'The trunk that supports every branch — without it, modern AI would not exist.',
        question: 'What makes transformers better than previous approaches?',
      },
      et: {
        title: 'Transformeri Arhitektuur',
        subtitle: 'Tüvi',
        explanation: '"Attention is All You Need" arhitektuur, mis revolutsiooniliselt muutis keeletöötlust. Kodeerija-dekodeerija struktuur mitmepeamise tähelepanu ja positsiooniline kodeeringuga.',
        metaphor: 'Tüvi, mis toetab iga oksa — ilma selleta poleks kaasaegset AI-d.',
        question: 'Mis teeb transformerid paremaks varasematest lähenemistest?',
      },
      ru: {
        title: 'Архитектура трансформера',
        subtitle: 'Ствол',
        explanation: 'Архитектура «Attention is All You Need», совершившая революцию в обработке языка. Структура кодер-декодер с многоголовым вниманием и позиционным кодированием.',
        metaphor: 'Ствол, поддерживающий каждую ветвь — без него не было бы современного ИИ.',
        question: 'Что делает трансформеры лучше предыдущих подходов?',
      },
    },
  },
  {
    id: 'rag',
    stage: 'tree',
    category: 'branches',
    complexity_level: 3,
    sort_order: 2,
    visual_type: 'card',
    icon: 'Search',
    color: '#059669',
    parent_id: null,
    translations: {
      en: {
        title: 'RAG (Retrieval-Augmented Generation)',
        subtitle: 'Branches',
        explanation: 'Combining a language model with external knowledge retrieval — the model searches a database before generating, grounding its response in real data.',
        metaphor: 'Like a student who checks their notes before answering — reducing hallucination by anchoring to facts.',
        question: 'How can you make AI answers more reliable?',
      },
      et: {
        title: 'RAG (Otsing-Täiendatud Genereerimine)',
        subtitle: 'Oksad',
        explanation: 'Keele mudeli ja välise teadmiste otsingu kombineerimine — mudel otsib andmebaasist enne genereerimist, ankurdades vastuse reaalsetes andmetes.',
        metaphor: 'Nagu tudeng, kes kontrollib oma märkmeid enne vastamist — vähendades hallutsinatsioone faktidele toetudes.',
        question: 'Kuidas muuta AI vastused usaldusväärsemaks?',
      },
      ru: {
        title: 'RAG (генерация с поиском)',
        subtitle: 'Ветви',
        explanation: 'Сочетание языковой модели с поиском внешних знаний — модель ищет в базе данных перед генерацией, привязывая ответ к реальным данным.',
        metaphor: 'Как студент, проверяющий конспекты перед ответом — снижает галлюцинации, опираясь на факты.',
        question: 'Как сделать ответы ИИ более надёжными?',
      },
    },
  },
  {
    id: 'fine-tuning',
    stage: 'tree',
    category: 'branches',
    complexity_level: 3,
    sort_order: 3,
    visual_type: 'card',
    icon: 'Sliders',
    color: '#059669',
    parent_id: null,
    translations: {
      en: {
        title: 'Fine-Tuning',
        subtitle: 'Branches',
        explanation: 'Taking a pre-trained base model and training it further on domain-specific data. RLHF, LoRA, and instruction tuning are key techniques.',
        metaphor: 'Like sending a generalist doctor to specialize — same foundation, but now an expert in one area.',
        question: 'How do you make a general model expert in your field?',
      },
      et: {
        title: 'Peenhäälestamine',
        subtitle: 'Oksad',
        explanation: 'Eeltreenitud baasmudeli edasine treenimine domeenispetsiifiliste andmetega. RLHF, LoRA ja juhiste häälestamine on võtmetehnikad.',
        metaphor: 'Nagu üldlaarsti saatmine spetsialiseeruma — sama alus, aga nüüd ekspert ühes valdkonnas.',
        question: 'Kuidas muuta üldmudel oma valdkonna eksperdiks?',
      },
      ru: {
        title: 'Тонкая настройка',
        subtitle: 'Ветви',
        explanation: 'Дообучение предобученной базовой модели на данных конкретной области. RLHF, LoRA и настройка инструкций — ключевые техники.',
        metaphor: 'Как отправить терапевта на специализацию — та же основа, но теперь эксперт в одной области.',
        question: 'Как сделать общую модель экспертом в вашей области?',
      },
    },
  },
  {
    id: 'agents',
    stage: 'tree',
    category: 'branches',
    complexity_level: 4,
    sort_order: 4,
    visual_type: 'card',
    icon: 'Bot',
    color: '#059669',
    parent_id: null,
    translations: {
      en: {
        title: 'AI Agents',
        subtitle: 'Branches',
        explanation: 'Autonomous systems that use LLMs to plan, reason, and execute multi-step tasks. Tool use, memory, and self-correction are key capabilities.',
        metaphor: 'Like hiring an employee instead of a consultant — agents don\'t just advise, they take action.',
        question: 'What happens when AI can use tools and make decisions on its own?',
      },
      et: {
        title: 'AI Agendid',
        subtitle: 'Oksad',
        explanation: 'Autonoomsed süsteemid, mis kasutavad keelemudeleid planeerimiseks, arutlemiseks ja mitmeetapiliste ülesannete täitmiseks. Tööriistade kasutamine, mälu ja eneseparandamine on võtmevõimekused.',
        metaphor: 'Nagu töötaja palkamine konsultandi asemel — agendid ei nõusta ainult, vaid tegutsevad.',
        question: 'Mis juhtub, kui AI saab kasutada tööriistu ja otsuseid iseseisvalt vastu võtta?',
      },
      ru: {
        title: 'ИИ-агенты',
        subtitle: 'Ветви',
        explanation: 'Автономные системы, использующие языковые модели для планирования, рассуждения и выполнения многоэтапных задач. Использование инструментов, память и самокоррекция — ключевые возможности.',
        metaphor: 'Как нанять сотрудника вместо консультанта — агенты не просто советуют, а действуют.',
        question: 'Что происходит, когда ИИ может использовать инструменты и принимать решения самостоятельно?',
      },
    },
  },
  {
    id: 'multi-model-systems',
    stage: 'tree',
    category: 'leaves',
    complexity_level: 4,
    sort_order: 5,
    visual_type: 'card',
    icon: 'Network',
    color: '#059669',
    parent_id: null,
    translations: {
      en: {
        title: 'Multi-Model Systems',
        subtitle: 'Leaves',
        explanation: 'Combining multiple specialized models — one for text, one for images, one for code — into a unified pipeline that\'s greater than the sum of its parts.',
        metaphor: 'Like a jazz ensemble — each instrument plays its part, but together they create something no solo could achieve.',
        question: 'Why use many models instead of one?',
      },
      et: {
        title: 'Mitme Mudeli Süsteemid',
        subtitle: 'Lehed',
        explanation: 'Mitme spetsialiseeritud mudeli kombineerimine — üks teksti, üks piltide, üks koodi jaoks — ühtseks torujuhtmeks, mis on suurem kui osade summa.',
        metaphor: 'Nagu džässiansambel — iga pill mängib oma osa, aga koos loovad nad midagi, mida ükski soolo ei suudaks.',
        question: 'Miks kasutada mitut mudelit ühe asemel?',
      },
      ru: {
        title: 'Мультимодельные системы',
        subtitle: 'Листья',
        explanation: 'Объединение нескольких специализированных моделей — одна для текста, одна для изображений, одна для кода — в единый конвейер, который мощнее суммы частей.',
        metaphor: 'Как джазовый ансамбль — каждый инструмент играет свою партию, но вместе они создают то, чего не достичь соло.',
        question: 'Зачем использовать несколько моделей вместо одной?',
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
      ru: {
        title: 'AIKI',
        subtitle: 'Творчество',
        explanation: 'Творческий помощник для написания текстов на базе ИИ. Генерирует истории, стихи и сценарии с контекстно-зависимыми предложениями.',
        metaphor: 'Как соавтор, у которого никогда не заканчиваются идеи — вы ведёте, а он заполняет творческие пробелы.',
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
      ru: {
        title: 'AIVO',
        subtitle: 'Аудио',
        explanation: 'Движок синтеза речи и генерации звука. Создаёт реалистичную речь из текста на нескольких языках.',
        metaphor: 'Как актёр озвучки, говорящий на любом языке — превращает любой текст в естественную выразительную речь.',
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
      ru: {
        title: 'CodeGen',
        subtitle: 'Разработка',
        explanation: 'Интеллектуальный инструмент для автодополнения и рефакторинга кода. Поддерживает TypeScript, Python и Rust.',
        metaphor: 'Как парное программирование с экспертом — он читает ваш замысел и пишет реализацию.',
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
      ru: {
        title: 'Visionary',
        subtitle: 'Визуал',
        explanation: 'Конвейер генерации изображений из текста. Создавайте потрясающие визуалы из описаний на естественном языке.',
        metaphor: 'Как художник, понимающий слова — опишите то, что видите мысленно, и оно появится на холсте.',
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
      ru: {
        title: 'Инженер ИИ',
        subtitle: 'Инженерия',
        explanation: 'Создание и развёртывание моделей для интеллектуальных приложений. Требуется Python, PyTorch/TensorFlow.',
        metaphor: 'Как главный инженер, конструирующий мозг — вы проектируете нейронную архитектуру, которая думает.',
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
      ru: {
        title: 'Архитектор промптов',
        subtitle: 'Дизайн / Логика',
        explanation: 'Создание и оптимизация инструкций, направляющих языковые модели к нужному результату. Требуется высокая креативность.',
        metaphor: 'Как дирижёр, управляющий оркестром — правильные инструкции извлекают гармонию из сложности.',
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
      ru: {
        title: 'Специалист по данным',
        subtitle: 'Наука',
        explanation: 'Анализ огромных наборов данных для поиска закономерностей и обучения прогнозных моделей.',
        metaphor: 'Как археолог, просеивающий слои — закономерности проступают из гор необработанных данных.',
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
      ru: {
        title: 'Этик ИИ',
        subtitle: 'Политика',
        explanation: 'Обеспечение справедливости, непредвзятости и безопасности систем ИИ для человечества.',
        metaphor: 'Как хранитель сада — следит, чтобы каждый выращенный плод был здоровым и полезным.',
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
      ru: {
        title: 'Специалист ML Ops',
        subtitle: 'Операции',
        explanation: 'Управление инфраструктурой и конвейерами, обеспечивающими работу моделей ИИ в продакшене.',
        metaphor: 'Как главный инженер электростанции — модели полезны, только если работают непрерывно.',
        hint: '$130k - $240k',
      },
    },
  },
];
