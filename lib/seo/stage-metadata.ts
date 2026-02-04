import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dendrix.ai';

export type StageKey = 'dna' | 'seed' | 'sprout' | 'sapling' | 'fruits' | 'orchard' | 'tree-view' | 'learn';

interface StageMetadata {
  title: { en: string; et: string; ru: string };
  description: { en: string; et: string; ru: string };
  keywords: { en: string[]; et: string[]; ru: string[] };
}

/**
 * Comprehensive, SEO-optimized metadata for all stage pages.
 * Designed for maximum discoverability by search engines AND AI scrapers.
 */
export const STAGE_METADATA: Record<StageKey, StageMetadata> = {
  dna: {
    title: {
      en: 'AI DNA - How AI Processes Text in 4 Steps | Dendrix.ai',
      et: 'AI DNA - Kuidas AI teksti töötleb 4 sammuga | Dendrix.ai',
      ru: 'ДНК ИИ - Как ИИ обрабатывает текст за 4 шага | Dendrix.ai',
    },
    description: {
      en: 'Watch AI transform text into predictions: Tokenization → Vectorization → Attention → Prediction. Interactive visualization of the fundamental mechanism behind ChatGPT, Claude, and all language models.',
      et: 'Vaata, kuidas AI muudab teksti ennustusteks: Tokeniseerimine → Vektoriseerimine → Tähelepanu → Ennustamine. Interaktiivne visualiseering ChatGPT, Claude ja kõigi keelemudelite aluseks olevast mehhanismist.',
      ru: 'Смотрите, как ИИ превращает текст в предсказания: Токенизация → Векторизация → Внимание → Предсказание. Интерактивная визуализация фундаментального механизма ChatGPT, Claude и всех языковых моделей.',
    },
    keywords: {
      en: ['AI', 'tokenization', 'vectors', 'embeddings', 'attention mechanism', 'transformer', 'how AI works', 'language model', 'Dendrix'],
      et: ['AI', 'tehisintellekt', 'tokeniseerimine', 'vektorid', 'tähelepanu mehhanism', 'kuidas AI töötab', 'keelemudel', 'Dendrix'],
      ru: ['ИИ', 'токенизация', 'векторы', 'эмбеддинги', 'механизм внимания', 'трансформер', 'как работает ИИ', 'языковая модель', 'Dendrix'],
    },
  },
  seed: {
    title: {
      en: 'The Seed - How AI Learns from Data | Dendrix.ai',
      et: 'Seeme - Kuidas AI andmetest õpib | Dendrix.ai',
      ru: 'Семя - Как ИИ учится на данных | Dendrix.ai',
    },
    description: {
      en: 'Explore how raw data becomes AI intelligence through training. Understand neural network learning, weight adjustment, and how AI compresses human knowledge into mathematical patterns.',
      et: 'Avasta, kuidas toorandmed muutuvad AI intelligentsiks treenimise kaudu. Mõista närvivõrkude õppimist, kaalude kohandamist ja kuidas AI kompressib inimteadmisi matemaatilisteks mustriteks.',
      ru: 'Узнайте, как сырые данные становятся интеллектом ИИ через обучение. Понимание обучения нейронных сетей, настройки весов и как ИИ сжимает человеческие знания в математические паттерны.',
    },
    keywords: {
      en: ['AI training', 'machine learning', 'neural networks', 'deep learning', 'model training', 'AI education', 'Dendrix'],
      et: ['AI treenimine', 'masinõpe', 'närvivõrgud', 'süvaõpe', 'mudeli treenimine', 'AI haridus', 'Dendrix'],
      ru: ['обучение ИИ', 'машинное обучение', 'нейронные сети', 'глубокое обучение', 'тренировка модели', 'образование ИИ', 'Dendrix'],
    },
  },
  sprout: {
    title: {
      en: 'The Sprout - Core AI Capabilities | Dendrix.ai',
      et: 'Võrse - AI põhivõimed | Dendrix.ai',
      ru: 'Росток - Основные возможности ИИ | Dendrix.ai',
    },
    description: {
      en: 'Discover what emerges from AI training: reasoning, creativity, understanding context, and following instructions. Learn the foundational capabilities that make modern AI assistants possible.',
      et: 'Avasta, mis tekib AI treenimisest: arutlemine, loovus, konteksti mõistmine ja juhiste järgimine. Õpi tundma põhivõimeid, mis teevad kaasaegsed AI assistendid võimalikuks.',
      ru: 'Откройте для себя, что возникает из обучения ИИ: рассуждение, креативность, понимание контекста и следование инструкциям. Изучите фундаментальные возможности современных ИИ-ассистентов.',
    },
    keywords: {
      en: ['AI capabilities', 'reasoning', 'AI creativity', 'context understanding', 'AI assistant', 'emergent abilities', 'Dendrix'],
      et: ['AI võimed', 'arutlemine', 'AI loovus', 'konteksti mõistmine', 'AI assistent', 'tekkivad võimed', 'Dendrix'],
      ru: ['возможности ИИ', 'рассуждение', 'креативность ИИ', 'понимание контекста', 'ИИ ассистент', 'эмерджентные способности', 'Dendrix'],
    },
  },
  sapling: {
    title: {
      en: 'The Sapling - Practice Prompting AI | Dendrix.ai',
      et: 'Istik - Harjuta AI promptimist | Dendrix.ai',
      ru: 'Саженец - Практика промптинга ИИ | Dendrix.ai',
    },
    description: {
      en: 'Hands-on AI sandbox: experiment with prompts, temperature settings, and see real-time AI responses. Safe, guided practice environment to master prompt engineering skills.',
      et: 'Praktiline AI liivakast: katseta prompte, temperatuuri seadeid ja vaata reaalajas AI vastuseid. Turvaline, juhendatud keskkond promptimise oskuste omandamiseks.',
      ru: 'Практическая песочница ИИ: экспериментируйте с промптами, настройками температуры и смотрите ответы ИИ в реальном времени. Безопасная среда для освоения навыков промпт-инженерии.',
    },
    keywords: {
      en: ['prompt engineering', 'AI practice', 'temperature', 'AI sandbox', 'learn prompting', 'ChatGPT tutorial', 'Dendrix'],
      et: ['promptimine', 'AI harjutamine', 'temperatuur', 'AI liivakast', 'õpi promptimist', 'ChatGPT õpetus', 'Dendrix'],
      ru: ['промпт-инженерия', 'практика ИИ', 'температура', 'песочница ИИ', 'учиться промптингу', 'туториал ChatGPT', 'Dendrix'],
    },
  },
  fruits: {
    title: {
      en: 'The Fruits - AI Applications & Real-World Use Cases | Dendrix.ai',
      et: 'Viljad - AI rakendused ja praktilised kasutusjuhud | Dendrix.ai',
      ru: 'Плоды - Применение ИИ и реальные кейсы | Dendrix.ai',
    },
    description: {
      en: 'Explore practical AI applications: RAG systems, AI agents, code generation, content creation, and automation. Learn how businesses leverage AI to create real value.',
      et: 'Avasta praktilisi AI rakendusi: RAG süsteemid, AI agendid, koodi genereerimine, sisu loomine ja automatiseerimine. Õpi, kuidas ettevõtted AI-d kasutavad reaalse väärtuse loomiseks.',
      ru: 'Изучите практическое применение ИИ: RAG системы, ИИ агенты, генерация кода, создание контента и автоматизация. Узнайте, как бизнес использует ИИ для создания реальной ценности.',
    },
    keywords: {
      en: ['AI applications', 'RAG', 'AI agents', 'code generation', 'AI automation', 'business AI', 'use cases', 'Dendrix'],
      et: ['AI rakendused', 'RAG', 'AI agendid', 'koodi genereerimine', 'AI automatiseerimine', 'äri AI', 'kasutusjuhud', 'Dendrix'],
      ru: ['применение ИИ', 'RAG', 'ИИ агенты', 'генерация кода', 'автоматизация ИИ', 'бизнес ИИ', 'кейсы', 'Dendrix'],
    },
  },
  orchard: {
    title: {
      en: 'The Orchard - AI Career Paths & Professional Growth | Dendrix.ai',
      et: 'Viljapuuaed - AI karjääriteed ja professionaalne areng | Dendrix.ai',
      ru: 'Сад - Карьерные пути в ИИ и профессиональный рост | Dendrix.ai',
    },
    description: {
      en: 'Navigate AI career opportunities: prompt engineer, AI product manager, ML engineer, AI trainer. Discover skills, certifications, and paths to grow your career in the AI industry.',
      et: 'Navigeeri AI karjäärivõimalustes: promptija, AI tootejuht, ML insener, AI treener. Avasta oskused, sertifikaadid ja teed karjääri kasvuks AI tööstuses.',
      ru: 'Карьерные возможности в ИИ: промпт-инженер, продакт-менеджер ИИ, ML инженер, тренер ИИ. Откройте навыки, сертификации и пути роста в индустрии ИИ.',
    },
    keywords: {
      en: ['AI career', 'prompt engineer', 'ML engineer', 'AI jobs', 'AI certification', 'career growth', 'AI skills', 'Dendrix'],
      et: ['AI karjäär', 'promptija', 'ML insener', 'AI töökohad', 'AI sertifikaat', 'karjääri kasv', 'AI oskused', 'Dendrix'],
      ru: ['карьера в ИИ', 'промпт-инженер', 'ML инженер', 'работа в ИИ', 'сертификация ИИ', 'карьерный рост', 'навыки ИИ', 'Dendrix'],
    },
  },
  'tree-view': {
    title: {
      en: 'AI Knowledge Tree - Complete Concept Map | Dendrix.ai',
      et: 'AI Teadmiste Puu - Täielik kontseptsioonide kaart | Dendrix.ai',
      ru: 'Дерево Знаний ИИ - Полная карта концепций | Dendrix.ai',
    },
    description: {
      en: 'Visual map of all AI concepts: from tokens and vectors to RAG and AI agents. Interactive tree diagram showing how AI concepts connect and build upon each other.',
      et: 'Visuaalne kaart kõigist AI kontseptsioonidest: tokenitest ja vektoritest RAG-i ja AI agentideni. Interaktiivne puudiagramm, mis näitab kuidas AI kontseptsioonid ühenduvad ja üksteisele toetuvad.',
      ru: 'Визуальная карта всех концепций ИИ: от токенов и векторов до RAG и ИИ агентов. Интерактивная древовидная диаграмма, показывающая как концепции ИИ связаны друг с другом.',
    },
    keywords: {
      en: ['AI concepts', 'concept map', 'AI tree', 'visual learning', 'AI education', 'knowledge map', 'Dendrix'],
      et: ['AI kontseptsioonid', 'kontseptsioonide kaart', 'AI puu', 'visuaalne õpe', 'AI haridus', 'teadmiste kaart', 'Dendrix'],
      ru: ['концепции ИИ', 'карта концепций', 'дерево ИИ', 'визуальное обучение', 'образование ИИ', 'карта знаний', 'Dendrix'],
    },
  },
  learn: {
    title: {
      en: 'AI Learning Paths - Structured Courses | Dendrix.ai',
      et: 'AI õppeteed - struktureeritud kursused | Dendrix.ai',
      ru: 'Пути обучения ИИ - структурированные курсы | Dendrix.ai',
    },
    description: {
      en: 'Choose your AI learning journey: fundamentals, prompt engineering, RAG development, AI agents, or fine-tuning. Structured paths from beginner to advanced with progress tracking.',
      et: 'Vali oma AI õppeteekond: alused, promptimine, RAG arendus, AI agendid või peenhäälestus. Struktureeritud teed algajast edasijõudnuni koos edenemise jälgimisega.',
      ru: 'Выберите свой путь обучения ИИ: основы, промпт-инженерия, разработка RAG, ИИ агенты или дообучение. Структурированные курсы от начинающего до продвинутого с отслеживанием прогресса.',
    },
    keywords: {
      en: ['AI course', 'learning path', 'AI tutorial', 'prompt engineering course', 'RAG tutorial', 'AI training', 'Dendrix'],
      et: ['AI kursus', 'õppetee', 'AI õpetus', 'promptimise kursus', 'RAG õpetus', 'AI koolitus', 'Dendrix'],
      ru: ['курс ИИ', 'путь обучения', 'туториал ИИ', 'курс промпт-инженерии', 'туториал RAG', 'обучение ИИ', 'Dendrix'],
    },
  },
};

/**
 * Generate fully localized metadata for a stage page.
 */
export function generateStageMetadata(
  stage: StageKey,
  locale: string
): Metadata {
  const meta = STAGE_METADATA[stage];
  const lang = (locale as 'en' | 'et' | 'ru') || 'en';

  const title = meta.title[lang] || meta.title.en;
  const description = meta.description[lang] || meta.description.en;
  const keywords = meta.keywords[lang] || meta.keywords.en;

  const path = stage === 'tree-view' ? 'tree-view' : stage;
  const siteName = lang === 'et'
    ? 'AI Teadmiste Puu'
    : lang === 'ru'
    ? 'Дерево Знаний ИИ'
    : 'AI Knowledge Tree';

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/${path}`,
      languages: {
        en: `${BASE_URL}/en/${path}`,
        et: `${BASE_URL}/et/${path}`,
        ru: `${BASE_URL}/ru/${path}`,
        'x-default': `${BASE_URL}/en/${path}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'et' ? 'et_EE' : lang === 'ru' ? 'ru_RU' : 'en_US',
      url: `${BASE_URL}/${locale}/${path}`,
      title,
      description,
      siteName,
      images: [
        {
          url: `${BASE_URL}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    metadataBase: new URL(BASE_URL),
  };
}
