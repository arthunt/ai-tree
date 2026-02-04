import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import treeData from '@/data/tree-concepts.json';
import { TreeData } from '@/lib/types';
import { ConceptPageClient } from './ConceptPageClient';
import { availableLanguageTags } from '@/paraglide/runtime';

const data = treeData as TreeData;

interface Props {
  params: Promise<{ locale: string; conceptId: string }>;
}

// Generate static params for all concepts
export async function generateStaticParams() {
  const params: { locale: string; conceptId: string }[] = [];

  for (const locale of availableLanguageTags) {
    for (const concept of data.concepts) {
      params.push({ locale, conceptId: concept.id });
    }
  }

  return params;
}

// Generate metadata for social sharing
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, conceptId } = await params;
  const concept = data.concepts.find(c => c.id === conceptId);

  if (!concept) {
    return {
      title: 'Concept Not Found | AI Tree',
    };
  }

  const title = locale === 'et'
    ? `${concept.title} | AI Teadmiste Puu`
    : locale === 'ru'
    ? `${concept.title} | Дерево Знаний ИИ`
    : `${concept.title} | AI Knowledge Tree`;

  const description = concept.metaphor;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dendrix.ai';

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/concept/${conceptId}`,
      languages: {
        en: `${baseUrl}/en/concept/${conceptId}`,
        et: `${baseUrl}/et/concept/${conceptId}`,
        ru: `${baseUrl}/ru/concept/${conceptId}`,
        'x-default': `${baseUrl}/en/concept/${conceptId}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/concept/${conceptId}`,
      siteName: locale === 'et' ? 'AI Teadmiste Puu' : locale === 'ru' ? 'Дерево Знаний ИИ' : 'AI Knowledge Tree',
      locale: locale === 'et' ? 'et_EE' : locale === 'ru' ? 'ru_RU' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    metadataBase: new URL(baseUrl),
  };
}

export default async function ConceptPage({ params }: Props) {
  const { locale, conceptId } = await params;
  const concept = data.concepts.find(c => c.id === conceptId);

  if (!concept) {
    notFound();
  }

  return (
    <ConceptPageClient
      conceptId={conceptId}
      locale={locale}
      concepts={data.concepts}
      levels={data.levels}
    />
  );
}
