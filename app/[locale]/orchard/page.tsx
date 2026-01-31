import { OrchardView } from '@/components/orchard/OrchardView';
import { getStageContent } from '@/actions/getConcepts';

// Prerender params for SSG
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

export default async function OrchardPage({ params }: { params: { locale: string } }) {
    const concepts = await getStageContent('orchard', params.locale);
    return <OrchardView concepts={concepts} locale={params.locale} />;
}
