import { OrchardView } from '@/components/orchard/OrchardView';
import { getStageContent } from '@/actions/getConcepts';

// ISR: revalidate every 60s so new concepts appear quickly
export const revalidate = 60;

export function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'et' }
    ];
}

export const metadata = {
    title: 'Orchard (Careers) - AI Tree',
    description: 'Explore career paths and professional opportunities in AI.'
};

export default async function OrchardPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const concepts = await getStageContent('orchard', locale);
    return <OrchardView concepts={concepts} locale={locale} />;
}
