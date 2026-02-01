import { OrchardView } from '@/components/orchard/OrchardView';
import { GlobalNav } from '@/components/GlobalNav';
import { getStageContent } from '@/actions/getConcepts';
import { getRelatedConceptsForStage } from '@/lib/concepts/api';
import { availableLanguageTags } from '@/paraglide/runtime';

// ISR: revalidate every 60s so new concepts appear quickly
export const revalidate = 60;

export function generateStaticParams() {
    return availableLanguageTags.map(locale => ({ locale }));
}

export const metadata = {
    title: 'Orchard (Careers) - AI Tree',
    description: 'Explore career paths and professional opportunities in AI.'
};

export default async function OrchardPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const [concepts, relatedConcepts] = await Promise.all([
        getStageContent('orchard', locale),
        getRelatedConceptsForStage('orchard', locale, 6),
    ]);
    return (
        <>
            <GlobalNav />
            <OrchardView concepts={concepts} relatedConcepts={relatedConcepts} locale={locale} />
        </>
    );
}
