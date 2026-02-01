import { Suspense } from 'react';
import { TreeViewContent } from './TreeViewContent';
import { TreeDiagramSkeleton } from '@/components/TreeDiagramSkeleton';
import { Metadata } from 'next';
import { getTreeContent } from '@/actions/getTreeContent';
import { availableLanguageTags } from '@/paraglide/runtime';

export const revalidate = 60;

export function generateStaticParams() {
    return availableLanguageTags.map(locale => ({ locale }));
}

export const metadata: Metadata = {
  title: 'AI Tree | Dendrix',
  description: 'Explore the full AI knowledge tree from roots to leaves.',
};

export default async function TreeViewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = await getTreeContent(locale);

  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-8"><TreeDiagramSkeleton /></div>}>
      <TreeViewContent initialData={content} />
    </Suspense>
  );
}
