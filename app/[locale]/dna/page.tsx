import { DNAView } from '@/components/dna/DNAView';
import { getStageContent } from '@/actions/getConcepts';
import { availableLanguageTags } from '@/paraglide/runtime';

export const revalidate = 60;

export function generateStaticParams() {
    return availableLanguageTags.map(locale => ({ locale }));
}

export const metadata = {
    title: 'AI DNA | Dendrix',
    description: 'Explore the fundamental building blocks of Artificial Intelligence.',
};

export default async function DNAPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const content = await getStageContent('dna', locale);
    return <DNAView content={content} />;
}
