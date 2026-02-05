import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dendrix.ai';

export type ProgramSlug = 'aiki' | 'aivo' | 'aime';

interface ProgramMetadataTranslations {
  title: { en: string; et: string; ru: string };
  description: { en: string; et: string; ru: string };
  keywords: { en: string[]; et: string[]; ru: string[] };
}

/**
 * SEO-optimized metadata for all program pages.
 * Includes Ettevõtluskeskus branding for entity association.
 */
export const PROGRAM_METADATA: Record<ProgramSlug, ProgramMetadataTranslations> = {
  aiki: {
    title: {
      en: 'AIKI — AI Instructor Program | Dendrix.ai by Ettevõtluskeskus',
      et: 'AIKI — AI Koolitaja Programm | Dendrix.ai by Ettevõtluskeskus',
      ru: 'AIKI — Программа AI-инструктора | Dendrix.ai от Ettevõtluskeskus',
    },
    description: {
      en: 'Become an AI instructor in 6 weeks. 60 academic hours of practical training with certificate. HAKA quality label. Töötukassa training card eligible. By Ettevõtluskeskus OÜ.',
      et: 'Saa AI koolitajaks 6 nädalaga. 60 akadeemilist tundi praktilist õpet tunnistusega. HAKA kvaliteedimärgis. Töötukassa koolituskaardi partner. Ettevõtluskeskus OÜ programm.',
      ru: 'Станьте AI-инструктором за 6 недель. 60 академических часов практического обучения с сертификатом. Знак качества HAKA. Карта обучения Töötukassa. Программа Ettevõtluskeskus OÜ.',
    },
    keywords: {
      en: ['AI instructor course', 'AI training Estonia', 'AI certification', 'AI course for managers', 'AIKI program', 'Ettevõtluskeskus', 'Dendrix'],
      et: ['AI koolitaja programm', 'AI koolitus', 'tehisintellekt koolitus', 'AI sertifikaat', 'AIKI programm', 'Ettevõtluskeskus', 'Dendrix'],
      ru: ['курс AI инструктора', 'AI курсы Эстония', 'обучение ИИ для руководителей', 'сертификат ИИ', 'программа AIKI', 'Ettevõtluskeskus', 'Dendrix'],
    },
  },
  aivo: {
    title: {
      en: 'AIVO — AI Voice & Automation | Dendrix.ai by Ettevõtluskeskus',
      et: 'AIVO — AI Hääl ja Automatiseerimine | Dendrix.ai by Ettevõtluskeskus',
      ru: 'AIVO — AI Голос и Автоматизация | Dendrix.ai от Ettevõtluskeskus',
    },
    description: {
      en: 'Master AI automation and voice technologies in 4 weeks. 40 academic hours. Practical skills for business process automation. HAKA quality. By Ettevõtluskeskus OÜ.',
      et: 'Omanda AI automatiseerimise ja hääletehnoloogiad 4 nädalaga. 40 akadeemilist tundi. Praktilised äriprotsesside automatiseerimise oskused. HAKA kvaliteet. Ettevõtluskeskus OÜ.',
      ru: 'Освойте AI автоматизацию и голосовые технологии за 4 недели. 40 академических часов. Практические навыки автоматизации бизнес-процессов. Качество HAKA. Ettevõtluskeskus OÜ.',
    },
    keywords: {
      en: ['AI automation course', 'AI voice technology', 'business automation AI', 'AIVO program', 'AI training Estonia', 'Ettevõtluskeskus', 'Dendrix'],
      et: ['AI automatiseerimise kursus', 'AI hääletehnoloogia', 'äriprotsesside automatiseerimine', 'AIVO programm', 'AI koolitus', 'Ettevõtluskeskus', 'Dendrix'],
      ru: ['курс автоматизации AI', 'голосовые технологии AI', 'автоматизация бизнеса ИИ', 'программа AIVO', 'AI курсы Эстония', 'Ettevõtluskeskus', 'Dendrix'],
    },
  },
  aime: {
    title: {
      en: 'AIME — AI Master Bundle | Dendrix.ai by Ettevõtluskeskus',
      et: 'AIME — AI Meistri Pakett | Dendrix.ai by Ettevõtluskeskus',
      ru: 'AIME — Мастер-пакет AI | Dendrix.ai от Ettevõtluskeskus',
    },
    description: {
      en: 'Complete AI mastery bundle: AIKI + AIVO combined. 10 weeks, 100 academic hours. Best value for comprehensive AI training. HAKA quality. By Ettevõtluskeskus OÜ.',
      et: 'Täielik AI meistri pakett: AIKI + AIVO koos. 10 nädalat, 100 akadeemilist tundi. Parim hind terviklikuks AI koolituseks. HAKA kvaliteet. Ettevõtluskeskus OÜ.',
      ru: 'Полный мастер-пакет AI: AIKI + AIVO вместе. 10 недель, 100 академических часов. Лучшая цена за комплексное обучение AI. Качество HAKA. Ettevõtluskeskus OÜ.',
    },
    keywords: {
      en: ['AI master course', 'comprehensive AI training', 'AI bundle Estonia', 'AIME program', 'AI reskilling', 'Ettevõtluskeskus', 'Dendrix'],
      et: ['AI meistri kursus', 'terviklik AI koolitus', 'AI pakett', 'AIME programm', 'AI ümberõpe', 'Ettevõtluskeskus', 'Dendrix'],
      ru: ['мастер-курс AI', 'комплексное обучение AI', 'пакет AI Эстония', 'программа AIME', 'переквалификация AI', 'Ettevõtluskeskus', 'Dendrix'],
    },
  },
};

/** Programs catalog index page metadata */
export const PROGRAMS_INDEX_METADATA: { title: Record<string, string>; description: Record<string, string>; keywords: Record<string, string[]> } = {
  title: {
    en: 'AI Training Programs | Dendrix.ai by Ettevõtluskeskus',
    et: 'AI Koolitusprogrammid | Dendrix.ai by Ettevõtluskeskus',
    ru: 'Программы обучения AI | Dendrix.ai от Ettevõtluskeskus',
  },
  description: {
    en: 'Professional AI training programs by Ettevõtluskeskus OÜ. AIKI (AI Instructor), AIVO (AI Automation), AIME (Master Bundle). HAKA quality certified. Töötukassa eligible.',
    et: 'Professionaalsed AI koolitusprogrammid Ettevõtluskeskus OÜ-lt. AIKI (AI Koolitaja), AIVO (AI Automatiseerimine), AIME (Meistri Pakett). HAKA kvaliteedimärgis. Töötukassa partner.',
    ru: 'Профессиональные программы обучения AI от Ettevõtluskeskus OÜ. AIKI (AI-инструктор), AIVO (AI-автоматизация), AIME (Мастер-пакет). Сертификат качества HAKA. Партнёр Töötukassa.',
  },
  keywords: {
    en: ['AI programs', 'AI training Estonia', 'AI certification', 'AI courses for managers', 'reskilling AI', 'Ettevõtluskeskus', 'Dendrix'],
    et: ['AI programmid', 'AI koolitus', 'AI sertifikaat', 'AI kursus juhtidele', 'AI ümberõpe', 'Ettevõtluskeskus', 'Dendrix'],
    ru: ['AI программы', 'AI курсы Эстония', 'сертификат AI', 'AI курсы для руководителей', 'переквалификация AI', 'Ettevõtluskeskus', 'Dendrix'],
  },
};

/**
 * Generate fully localized metadata for the programs index page.
 */
export function generateProgramsIndexMetadata(locale: string): Metadata {
  const lang = (locale as 'en' | 'et' | 'ru') || 'en';

  const title = PROGRAMS_INDEX_METADATA.title[lang] || PROGRAMS_INDEX_METADATA.title.en;
  const description = PROGRAMS_INDEX_METADATA.description[lang] || PROGRAMS_INDEX_METADATA.description.en;
  const keywords = PROGRAMS_INDEX_METADATA.keywords[lang] || PROGRAMS_INDEX_METADATA.keywords.en;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/programs`,
      languages: {
        en: `${BASE_URL}/en/programs`,
        et: `${BASE_URL}/et/programs`,
        ru: `${BASE_URL}/ru/programs`,
        'x-default': `${BASE_URL}/en/programs`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'et' ? 'et_EE' : lang === 'ru' ? 'ru_RU' : 'en_US',
      url: `${BASE_URL}/${locale}/programs`,
      title,
      description,
      siteName: 'Dendrix.ai',
      images: [{
        url: `${BASE_URL}/${locale}/programs/opengraph-image`,
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    metadataBase: new URL(BASE_URL),
  };
}

/**
 * Generate fully localized metadata for an individual program page.
 */
export function generateProgramMetadata(
  slug: string,
  locale: string,
  fallback?: { name?: string; tagline?: string }
): Metadata {
  const lang = (locale as 'en' | 'et' | 'ru') || 'en';
  const meta = PROGRAM_METADATA[slug as ProgramSlug];

  // Use static metadata if available, otherwise fall back to dynamic program data
  const title = meta?.title[lang] || meta?.title.en || `${fallback?.name || slug.toUpperCase()} | Dendrix.ai`;
  const description = meta?.description[lang] || meta?.description.en || fallback?.tagline || '';
  const keywords = meta?.keywords[lang] || meta?.keywords.en || [];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/programs/${slug}`,
      languages: {
        en: `${BASE_URL}/en/programs/${slug}`,
        et: `${BASE_URL}/et/programs/${slug}`,
        ru: `${BASE_URL}/ru/programs/${slug}`,
        'x-default': `${BASE_URL}/en/programs/${slug}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'et' ? 'et_EE' : lang === 'ru' ? 'ru_RU' : 'en_US',
      url: `${BASE_URL}/${locale}/programs/${slug}`,
      title,
      description,
      siteName: 'Dendrix.ai',
      images: [{
        url: `${BASE_URL}/${locale}/programs/${slug}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    metadataBase: new URL(BASE_URL),
  };
}
