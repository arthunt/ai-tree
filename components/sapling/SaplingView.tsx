import { getConceptsByStage } from '@/lib/concepts/api';
import { UnifiedConceptCard } from '@/components/ui/UnifiedConceptCard';
import { SaplingWorkspace } from '@/components/sapling/SaplingWorkspace';
import { RelatedConceptsPanel } from '@/components/concept/RelatedConceptsPanel';
import { StageSelector } from '@/components/StageSelector';
import { SaplingHeroAnimation } from './SaplingHeroAnimation';
import { Info, Leaf } from 'lucide-react';

export default async function SaplingView({ locale }: { locale: string }) {
    // Fetch seed concepts to show as "Related Fundamentals"
    const seedConcepts = await getConceptsByStage('seed', locale);
    // Use first 3 concepts, default to empty array if undefined
    const relatedConcepts = (seedConcepts || []).slice(0, 3);

    // Currently we might not have 'sapling' concepts in DB yet, but that's fine.
    // We will render the Sandbox as the primary feature.
    const concepts = await getConceptsByStage('sapling', locale);

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-green-950 to-stone-950 pb-20">
            {/* Hero Section */}
            <div className="relative pt-32 pb-12 px-6 text-center z-10 overflow-hidden">
                <SaplingHeroAnimation />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/30 mb-6 text-emerald-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md relative z-20 shadow-lg shadow-emerald-900/20">
                    <Leaf size={12} />
                    {locale === 'et' ? 'Juhendatud Praktika' : 'Guided Practice'}
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-100 via-emerald-200 to-teal-500 mb-4 drop-shadow-sm relative z-20">
                    {locale === 'et' ? 'Nursery' : 'The Nursery'}
                </h1>

                <p className="text-lg md:text-xl text-emerald-100/70 max-w-2xl mx-auto leading-relaxed relative z-20">
                    {locale === 'et'
                        ? 'Siin saavad abstraktsed mudelid reaalseks. Katseta ja vaata ise.'
                        : 'Where abstract models become real. Experiment and see for yourself.'}
                </p>
            </div>

            {/* Main Interaction Area: The Workspace */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 mb-20">
                <SaplingWorkspace locale={locale} />
            </div>

            {/* Related Concepts (Fundamentals) */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 pb-10">
                <RelatedConceptsPanel
                    concepts={relatedConcepts}
                    locale={locale}
                />
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
