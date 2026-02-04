import { Metadata } from 'next';
import SaplingView from '@/components/sapling/SaplingView';
import { GlobalNav } from '@/components/GlobalNav';
import { availableLanguageTags } from '@/paraglide/runtime';
import { generateStageMetadata } from '@/lib/seo/stage-metadata';

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
    return generateStageMetadata('sapling', locale);
}

export default async function SaplingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <>
            <GlobalNav transparent />
            <SaplingView locale={locale} />
        </>
    );
}
