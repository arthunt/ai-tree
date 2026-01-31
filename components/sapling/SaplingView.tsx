import { getConceptsByStage } from '@/lib/concepts/api';
import { UnifiedConceptCard } from '@/components/ui/UnifiedConceptCard';
import { PromptSandbox } from '@/components/sapling/PromptSandbox';
import { StageSelector } from '@/components/StageSelector';
import { Info, Leaf } from 'lucide-react';

export default async function SaplingView({ locale }: { locale: string }) {
    // Currently we might not have 'sapling' concepts in DB yet, but that's fine.
    // We will render the Sandbox as the primary feature.
    const concepts = await getConceptsByStage('sapling', locale);

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-green-950 to-stone-950 pb-20">
            {/* Hero Section */}
            <div className="relative pt-32 pb-12 px-6 text-center z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-800/50 mb-6 text-emerald-400 text-xs font-mono uppercase tracking-widest">
                    <Leaf size={12} />
                    {locale === 'et' ? 'Juhendatud Praktika' : 'Guided Practice'}
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-100 to-emerald-600 mb-4 drop-shadow-sm">
                    {locale === 'et' ? 'Nursery' : 'The Nursery'}
                </h1>

                <p className="text-lg md:text-xl text-emerald-100/60 max-w-2xl mx-auto leading-relaxed">
                    {locale === 'et'
                        ? 'Siin saavad abstraktsed mudelid reaalseks. Katseta ja vaata ise.'
                        : 'Where abstract models become real. Experiment and see for yourself.'}
                </p>
            </div>

            {/* Main Interaction Area: The Sandbox */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 mb-20">
                <PromptSandbox locale={locale} />
            </div>

            {/* Concepts Grid (If any are added later) */}
            {concepts.length > 0 && (
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <h2 className="text-2xl font-bold text-emerald-500 mb-8 flex items-center gap-2">
                        <Info size={24} />
                        {locale === 'et' ? 'Mõisted' : 'Key Concepts'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {concepts.map((concept) => (
                            <div key={concept.id} className="h-[240px]">
                                <UnifiedConceptCard
                                    variant="sapling"
                                    index={concept.sort_order}
                                    title={concept.title}
                                    description={concept.explanation}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Navigation */}
            <StageSelector />
        </div>
    );
}
