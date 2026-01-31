import SeedView from '@/components/seed/SeedView';

// ISR: revalidate every 60s so new concepts appear quickly
export const revalidate = 60;

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

export default async function SeedPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <SeedView locale={locale} />;
}
