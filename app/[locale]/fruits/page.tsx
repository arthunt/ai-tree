import { Metadata } from 'next';
import { FruitsView } from '@/components/fruits/FruitsView';
import { GlobalNav } from '@/components/GlobalNav';
import { getStageContent } from '@/actions/getConcepts';
import { getRelatedConceptsForStage } from '@/lib/concepts/api';
import { availableLanguageTags } from '@/paraglide/runtime';
import { generateStageMetadata } from '@/lib/seo/stage-metadata';

// ISR: revalidate every 60s so new concepts appear quickly
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
    return generateStageMetadata('fruits', locale);
}

export default async function FruitsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const [concepts, relatedConcepts] = await Promise.all([
        getStageContent('fruits', locale),
        getRelatedConceptsForStage('fruits', locale, 6),
    ]);
    return (
        <>
            <GlobalNav />
            <FruitsView concepts={concepts} relatedConcepts={relatedConcepts} locale={locale} />
        </>
    );
}
