import { OrchardView } from '@/components/orchard/OrchardView';

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

export default function OrchardPage({ params }: { params: { locale: string } }) {
    return <OrchardView locale={params.locale} />;
}
