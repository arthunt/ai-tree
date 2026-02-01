import { Suspense } from 'react';
import { SproutView } from '@/components/sprout/SproutView';
import { GlobalNav } from '@/components/GlobalNav';
import { Metadata } from 'next';
import { getStageContent } from '@/actions/getConcepts';
import { getRelatedConceptsForStage } from '@/lib/concepts/api';
import { availableLanguageTags } from '@/paraglide/runtime';

export const revalidate = 60;

export function generateStaticParams() {
    return availableLanguageTags.map(locale => ({ locale }));
}

export const metadata: Metadata = {
    title: 'Sprout | AI Knowledge Tree',
    description: 'Emergent properties — what happens when the model comes alive.',
};

export default async function SproutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const [concepts, relatedConcepts] = await Promise.all([
        getStageContent('sprout', locale),
        getRelatedConceptsForStage('sprout', locale, 6),
    ]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden relative selection:bg-brand-teal/30">
            {/* Global Navigation */}
            <GlobalNav />
            {/* Main Content */}
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading Foundations...</div>}>
                <SproutView concepts={concepts} relatedConcepts={relatedConcepts} locale={locale} />
            </Suspense>
        </main>
    );
}
