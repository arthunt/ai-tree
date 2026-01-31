import { Suspense } from 'react';
import { SproutView } from '@/components/sprout/SproutView';
import { GlobalNav } from '@/components/GlobalNav';
import { Metadata } from 'next';
import { getSproutContent } from '@/actions/getSproutContent';

export const metadata: Metadata = {
    title: 'Sprout | AI Knowledge Tree',
    description: 'The foundations of AI understanding.',
};

export default async function SproutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const content = await getSproutContent(locale);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden relative selection:bg-brand-teal/30">
            {/* Global Navigation */}
            <GlobalNav />
            {/* Main Content */}
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading Foundations...</div>}>
                <SproutView content={content} locale={locale} />
            </Suspense>
        </main>
    );
}
