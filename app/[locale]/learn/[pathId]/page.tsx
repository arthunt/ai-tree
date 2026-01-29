import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import pathsData from '@/data/learning-paths.json';
import treeData from '@/data/tree-concepts.json';
import { TreeData } from '@/lib/types';
import { locales } from '@/i18n';
import { LearningPathClient } from './LearningPathClient';

const data = treeData as TreeData;

interface Props {
  params: Promise<{ locale: string; pathId: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; pathId: string }[] = [];
  for (const locale of locales) {
    for (const path of pathsData.paths) {
      params.push({ locale, pathId: path.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pathId } = await params;
  const path = pathsData.paths.find(p => p.id === pathId);

  if (!path) {
    return { title: 'Path Not Found | Dendrix.ai' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dendrix.ai';
  // We'll use the English title as fallback for metadata since messages aren't available in server components
  const titleMap: Record<string, { en: string; et: string }> = {
    'ai-fundamentals': { en: 'AI Fundamentals', et: 'AI alused' },
    'prompt-engineering': { en: 'Prompt Engineering', et: 'Promptimise kunst' },
    'build-rag-apps': { en: 'Build RAG Applications', et: 'Ehita RAG rakendusi' },
    'ai-agents-path': { en: 'AI Agents & Tools', et: 'AI agendid ja tööriistad' },
    'fine-tuning-path': { en: 'Fine-Tuning & Model Training', et: 'Peenhäälestus ja mudeli treenimine' },
  };
  const titles = titleMap[pathId] || { en: pathId, et: pathId };
  const title = locale === 'et'
    ? `${titles.et} | Dendrix.ai`
    : `${titles.en} | Dendrix.ai`;

  return {
    title,
    alternates: {
      canonical: `${baseUrl}/${locale}/learn/${pathId}`,
      languages: {
        et: `${baseUrl}/et/learn/${pathId}`,
        en: `${baseUrl}/en/learn/${pathId}`,
        'x-default': `${baseUrl}/et/learn/${pathId}`,
      },
    },
    openGraph: {
      title,
      url: `${baseUrl}/${locale}/learn/${pathId}`,
      siteName: 'Dendrix.ai',
      locale: locale === 'et' ? 'et_EE' : 'en_US',
      type: 'article',
    },
    metadataBase: new URL(baseUrl),
  };
}

export default async function LearningPathPage({ params }: Props) {
  const { locale, pathId } = await params;
  const path = pathsData.paths.find(p => p.id === pathId);

  if (!path) {
    notFound();
  }

  // Resolve concept details
  const concepts = path.concepts
    .map(id => data.concepts.find(c => c.id === id))
    .filter(Boolean) as typeof data.concepts;

  return (
    <LearningPathClient
      pathId={pathId}
      path={path}
      concepts={concepts}
      allConcepts={data.concepts}
      levels={data.levels}
      locale={locale}
    />
  );
}
