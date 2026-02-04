import { Metadata } from 'next';
import { DNAView } from '@/components/dna/DNAView';
import { getStageContent } from '@/actions/getConcepts';
import { availableLanguageTags } from '@/paraglide/runtime';
import { generateStageMetadata } from '@/lib/seo/stage-metadata';

export const revalidate = 60;

export function generateStaticParams() {
    return availableLanguageTags.map(locale => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return generateStageMetadata('dna', locale);
}

export default async function DNAPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const content = await getStageContent('dna', locale);
    return <DNAView content={content} />;
}
