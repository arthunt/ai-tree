import SaplingView from '@/components/sapling/SaplingView';
import { GlobalNav } from '@/components/GlobalNav';
import { availableLanguageTags } from '@/paraglide/runtime';

export const revalidate = 60;

export function generateStaticParams() {
    return availableLanguageTags.map(locale => ({ locale }));
}

export const metadata = {
    title: 'Sapling (The Nursery) - AI Tree',
    description: 'Hands-on practice with AI in a guided nursery environment.',
};

export default async function SaplingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <>
            <GlobalNav transparent />
            <SaplingView locale={locale} />
        </>
    );
}
