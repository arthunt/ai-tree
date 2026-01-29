import { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import treeData from '@/data/tree-concepts.json';
import pathsData from '@/data/learning-paths.json';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dendrix.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Home pages per locale
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

  // Tree view pages per locale
  const treeViewPages = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}/tree-view`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
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

  return [...homePages, ...treeViewPages, ...learnIndexPages, ...learnPathPages, ...conceptPages];
}
