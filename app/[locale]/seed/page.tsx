import SeedView from '@/components/seed/SeedView';
import { GlobalNav } from '@/components/GlobalNav';
import { availableLanguageTags } from '@/paraglide/runtime';

// ISR: revalidate every 60s so new concepts appear quickly
export const revalidate = 60;

export function generateStaticParams() {
    return availableLanguageTags.map(locale => ({ locale }));
}

export const metadata = {
    title: 'The Seed (Training) - AI Tree',
    description: 'Explore how raw data is compressed into intelligence through training.',
};

export default async function SeedPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <>
            <GlobalNav transparent />
            <SeedView locale={locale} />
        </>
    );
}
