import { Suspense } from 'react';
import { SproutProvider } from '@/components/sprout/SproutContext';
import { SproutView } from '@/components/sprout/SproutView';
import { GlobalNav } from '@/components/GlobalNav';
import { Metadata } from 'next';
import { getStageContent } from '@/actions/getConcepts';
import { getRelatedConceptsForStage } from '@/lib/concepts/api';
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
    return generateStageMetadata('sprout', locale);
}

export default async function SproutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const [concepts, relatedConcepts] = await Promise.all([
        getStageContent('sprout', locale),
        getRelatedConceptsForStage('sprout', locale, 6),
    ]);

    return (
        <main className="min-h-screen bg-slate-900 text-white overflow-hidden relative selection:bg-brand-teal/30">
            {/* Global Navigation */}
            <GlobalNav />
            {/* Main Content */}
            <SproutProvider>
                <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading Foundations...</div>}>
                    <SproutView concepts={concepts} relatedConcepts={relatedConcepts} locale={locale} />
                </Suspense>
            </SproutProvider>
        </main>
    );
}
