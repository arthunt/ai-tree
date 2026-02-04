import { Metadata } from 'next';
import SeedView from '@/components/seed/SeedView';
import { GlobalNav } from '@/components/GlobalNav';
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
    return generateStageMetadata('seed', locale);
}

export default async function SeedPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <>
            <GlobalNav transparent />
            <SeedView locale={locale} />
        </>
    );
}
