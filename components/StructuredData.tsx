'use client';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dendrix.ai';

interface StructuredDataProps {
  locale: string;
  conceptCount: number;
}

// ============================================================================
// BREADCRUMB SCHEMA - For navigation structure
// ============================================================================

type StageKey = 'dna' | 'seed' | 'sprout' | 'sapling' | 'fruits' | 'orchard' | 'tree-view' | 'learn' | 'concept';

interface BreadcrumbItem {
  name: string;
  url: string;
}

const STAGE_NAMES: Record<StageKey, { en: string; et: string; ru: string }> = {
  dna: { en: 'AI DNA', et: 'AI DNA', ru: 'ДНК ИИ' },
  seed: { en: 'The Seed', et: 'Seeme', ru: 'Семя' },
  sprout: { en: 'The Sprout', et: 'Võrse', ru: 'Росток' },
  sapling: { en: 'The Sapling', et: 'Istik', ru: 'Саженец' },
  fruits: { en: 'The Fruits', et: 'Viljad', ru: 'Плоды' },
  orchard: { en: 'The Orchard', et: 'Viljapuuaed', ru: 'Сад' },
  'tree-view': { en: 'Knowledge Tree', et: 'Teadmiste Puu', ru: 'Дерево Знаний' },
  learn: { en: 'Learning Paths', et: 'Õppeteed', ru: 'Пути обучения' },
  concept: { en: 'Concept', et: 'Kontseptsioon', ru: 'Концепция' },
};

const HOME_NAMES = {
  en: 'AI Knowledge Tree',
  et: 'AI Teadmiste Puu',
  ru: 'Дерево Знаний ИИ',
};

interface BreadcrumbStructuredDataProps {
  locale: string;
  stage?: StageKey;
  conceptTitle?: string;
  conceptId?: string;
}

export function BreadcrumbStructuredData({
  locale,
  stage,
  conceptTitle,
  conceptId,
}: BreadcrumbStructuredDataProps) {
  const lang = (locale as 'en' | 'et' | 'ru') || 'en';
  const items: BreadcrumbItem[] = [];

  // Home
  items.push({
    name: HOME_NAMES[lang],
    url: `${BASE_URL}/${locale}`,
  });

  // Stage
  if (stage) {
    const stageName = STAGE_NAMES[stage]?.[lang] || stage;
    items.push({
      name: stageName,
      url: `${BASE_URL}/${locale}/${stage}`,
    });
  }

  // Concept (if provided)
  if (conceptTitle && conceptId) {
    items.push({
      name: conceptTitle,
      url: `${BASE_URL}/${locale}/concept/${conceptId}`,
    });
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ============================================================================
// FAQ SCHEMA - For common questions
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  locale: string;
  faqs?: FAQItem[];
}

const DEFAULT_FAQS: Record<string, FAQItem[]> = {
  en: [
    {
      question: 'How long does it take to learn AI fundamentals?',
      answer: 'With Dendrix.ai, you can understand the core concepts of how AI works in about 2 hours. The interactive DNA visualization shows you tokenization, vectors, attention, and prediction in action.',
    },
    {
      question: 'What is tokenization in AI?',
      answer: 'Tokenization is the first step in how AI processes text. It breaks text into smaller pieces called tokens (usually words or parts of words), then converts each token into a number that the AI can work with.',
    },
    {
      question: 'How does the attention mechanism work?',
      answer: 'The attention mechanism helps AI understand context by calculating how relevant each word is to every other word in the input. It\'s like a spotlight that shows which words are most important for understanding the meaning.',
    },
    {
      question: 'What is a vector embedding?',
      answer: 'A vector embedding is a way to represent words as coordinates in a mathematical space. Words with similar meanings end up close together, like "king" and "queen" being neighbors while "banana" is far away.',
    },
    {
      question: 'Is Dendrix.ai free to use?',
      answer: 'Yes, Dendrix.ai is completely free. No registration required. All interactive learning content is accessible without any barriers.',
    },
  ],
  et: [
    {
      question: 'Kui kaua võtab aega AI põhitõdede õppimine?',
      answer: 'Dendrix.ai-ga saad mõista AI töötamise põhiprintsiipe umbes 2 tunniga. Interaktiivne DNA visualiseering näitab tokeniseerimist, vektoreid, tähelepanu ja ennustamist tegevuses.',
    },
    {
      question: 'Mis on tokeniseerimine AI-s?',
      answer: 'Tokeniseerimine on esimene samm, kuidas AI teksti töötleb. See lõikab teksti väiksemateks tükkideks ehk tokeniteks (tavaliselt sõnad või sõnaosad), seejärel teisendab iga tokeni numbriks.',
    },
    {
      question: 'Kuidas töötab tähelepanu mehhanism?',
      answer: 'Tähelepanu mehhanism aitab AI-l mõista konteksti, arvutades kui oluline on iga sõna kõigi teiste sisendi sõnade jaoks. See on nagu prožektor, mis näitab millistel sõnadel on kõige suurem tähtsus.',
    },
    {
      question: 'Mis on vektor-embedding?',
      answer: 'Vektor-embedding on viis esitada sõnu koordinaatidena matemaatilises ruumis. Sarnase tähendusega sõnad satuvad lähestikku, nagu "kuningas" ja "kuninganna" on naabrid, samas kui "banaan" on kaugel.',
    },
    {
      question: 'Kas Dendrix.ai on tasuta?',
      answer: 'Jah, Dendrix.ai on täiesti tasuta. Registreerimist pole vaja. Kogu interaktiivne õppesisu on kättesaadav ilma piiranguteta.',
    },
  ],
  ru: [
    {
      question: 'Сколько времени нужно, чтобы изучить основы ИИ?',
      answer: 'С Dendrix.ai вы можете понять основные концепции работы ИИ примерно за 2 часа. Интерактивная визуализация ДНК показывает токенизацию, векторы, внимание и предсказание в действии.',
    },
    {
      question: 'Что такое токенизация в ИИ?',
      answer: 'Токенизация — это первый шаг обработки текста ИИ. Она разбивает текст на меньшие части, называемые токенами (обычно слова или части слов), затем преобразует каждый токен в число.',
    },
    {
      question: 'Как работает механизм внимания?',
      answer: 'Механизм внимания помогает ИИ понимать контекст, вычисляя насколько релевантно каждое слово по отношению к другим словам во входных данных. Это как прожектор, показывающий какие слова наиболее важны.',
    },
    {
      question: 'Что такое векторное представление?',
      answer: 'Векторное представление — это способ представить слова как координаты в математическом пространстве. Слова с похожим значением оказываются рядом, как "король" и "королева" — соседи, а "банан" — далеко.',
    },
    {
      question: 'Бесплатен ли Dendrix.ai?',
      answer: 'Да, Dendrix.ai полностью бесплатен. Регистрация не требуется. Весь интерактивный обучающий контент доступен без каких-либо ограничений.',
    },
  ],
};

export function FAQStructuredData({ locale, faqs }: FAQStructuredDataProps) {
  const lang = (locale as 'en' | 'et' | 'ru') || 'en';
  const questions = faqs || DEFAULT_FAQS[lang] || DEFAULT_FAQS.en;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ============================================================================
// ORGANIZATION SCHEMA - For site-wide organization info
// ============================================================================

interface OrganizationStructuredDataProps {
  locale: string;
}

export function OrganizationStructuredData({ locale }: OrganizationStructuredDataProps) {
  const lang = (locale as 'en' | 'et' | 'ru') || 'en';

  const descriptions = {
    en: 'Interactive AI learning platform that teaches how AI works through visual explanations and hands-on practice.',
    et: 'Interaktiivne AI õppeplatvorm, mis õpetab kuidas AI töötab visuaalsete selgituste ja praktiliste harjutuste kaudu.',
    ru: 'Интерактивная платформа для изучения ИИ, которая обучает работе ИИ через визуальные объяснения и практику.',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dendrix.ai',
    alternateName: ['AI Knowledge Tree', 'AI Teadmiste Puu', 'Дерево Знаний ИИ'],
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: descriptions[lang],
    sameAs: [
      // Add social media URLs when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['English', 'Estonian', 'Russian'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ============================================================================
// WEBSITE SCHEMA - For sitelinks search box
// ============================================================================

export function WebsiteStructuredData({ locale }: { locale: string }) {
  const lang = (locale as 'en' | 'et' | 'ru') || 'en';
  const names = {
    en: 'AI Knowledge Tree',
    et: 'AI Teadmiste Puu',
    ru: 'Дерево Знаний ИИ',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: names[lang],
    alternateName: 'Dendrix.ai',
    url: `${BASE_URL}/${locale}`,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/${locale}/tree-view?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CourseStructuredData({ locale, conceptCount }: StructuredDataProps) {
  const lang = (locale as 'en' | 'et' | 'ru') || 'en';
  const isEt = locale === 'et';
  const isRu = locale === 'ru';

  const names = {
    en: 'AI Knowledge Tree',
    et: 'AI Teadmiste Puu',
    ru: 'Дерево Знаний ИИ',
  };
  const descriptions = {
    en: 'Comprehensive interactive framework for teaching and understanding AI concepts.',
    et: 'Terviklik interaktiivne raamistik AI kontseptside õpetamiseks ja mõistmiseks.',
    ru: 'Комплексная интерактивная платформа для изучения и понимания концепций ИИ.',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: names[lang],
    description: descriptions[lang],
    provider: {
      '@type': 'Organization',
      name: 'Dendrix.ai',
      url: BASE_URL,
    },
    url: `${BASE_URL}/${locale}`,
    inLanguage: locale,
    isAccessibleForFree: true,
    numberOfCredits: conceptCount,
    educationalLevel: 'Beginner to Advanced',
    teaches: [
      'Tokens', 'Vectors', 'Embeddings', 'Attention Mechanism',
      'Transformers', 'Context Windows', 'RAG', 'AI Agents',
      'Prompt Engineering', 'Fine-tuning', 'AI Security',
    ],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      duration: 'PT2H',
      inLanguage: [locale],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ConceptStructuredDataProps {
  locale: string;
  conceptId: string;
  title: string;
  description: string;
  level: string;
  complexity: number;
}

export function ConceptStructuredData({
  locale,
  conceptId,
  title,
  description,
  level,
  complexity,
}: ConceptStructuredDataProps) {
  const levelMap: Record<string, string> = {
    roots: 'Beginner',
    trunk: 'Intermediate',
    branches: 'Advanced',
    leaves: 'Expert',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: title,
    description,
    url: `${BASE_URL}/${locale}/concept/${conceptId}`,
    inLanguage: locale,
    learningResourceType: 'Interactive Tutorial',
    educationalLevel: levelMap[level] || 'Beginner',
    interactivityType: 'active',
    isAccessibleForFree: true,
    author: {
      '@type': 'Organization',
      name: 'Dendrix.ai',
      url: BASE_URL,
    },
    isPartOf: {
      '@type': 'Course',
      name: locale === 'et' ? 'AI Teadmiste Puu' : 'AI Knowledge Tree',
      url: `${BASE_URL}/${locale}`,
    },
    educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'complexity',
      targetName: `Level ${complexity}/3`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
