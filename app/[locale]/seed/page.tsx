import SeedView from '@/components/seed/SeedView';

// Prerender params for SSG
export function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'et' }
    ];
}

export const metadata = {
    title: 'The Seed (Training) - AI Tree',
    description: 'Explore how raw data is compressed into intelligence through training.',
};

export default function SeedPage({ params }: { params: { locale: string } }) {
    return <SeedView locale={params.locale} />;
}
