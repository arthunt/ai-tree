import { MetadataRoute } from 'next';
import { availableLanguageTags as locales } from '@/paraglide/runtime';
import treeData from '@/data/tree-concepts.json';
import pathsData from '@/data/learning-paths.json';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dendrix.ai';

// Stage pages with their SEO priorities
const STAGE_PAGES = [
  { path: 'dna', priority: 0.95, changeFrequency: 'weekly' as const },
  { path: 'seed', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'sprout', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'sapling', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'fruits', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: 'orchard', priority: 0.85, changeFrequency: 'weekly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Home pages per locale (highest priority)
  const homePages = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
  }));

  // Stage pages (DNA, Seed, Sprout, Sapling, Fruits, Orchard) - high priority for SEO
  const stagePages = STAGE_PAGES.flatMap((stage) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/${stage.path}`,
      lastModified: now,
      changeFrequency: stage.changeFrequency,
      priority: stage.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/${stage.path}`])
        ),
      },
    }))
  );

  // Tree view pages per locale
  const treeViewPages = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}/tree-view`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}/tree-view`])
      ),
    },
  }));

  // Learning paths index per locale
  const learnIndexPages = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}/learn`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}/learn`])
      ),
    },
  }));

  // Individual learning path pages
  const learnPathPages = pathsData.paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/learn/${path.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/learn/${path.id}`])
        ),
      },
    }))
  );

  // Concept pages: all concepts × all locales
  const conceptPages = treeData.concepts.flatMap((concept) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/concept/${concept.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/concept/${concept.id}`])
        ),
      },
    }))
  );

  // Programs index page per locale
  const programsIndexPages = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}/programs`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}/programs`])
      ),
    },
  }));

  // Individual program pages
  const PROGRAM_SLUGS = ['aiki', 'aivo', 'aime'];
  const programPages = PROGRAM_SLUGS.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/programs/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/programs/${slug}`])
        ),
      },
    }))
  );

  return [
    ...homePages,
    ...stagePages,
    ...treeViewPages,
    ...learnIndexPages,
    ...learnPathPages,
    ...conceptPages,
    ...programsIndexPages,
    ...programPages,
  ];
}
