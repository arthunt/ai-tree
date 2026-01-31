import { getConceptsByStage, getRelatedConceptsForStage } from '@/lib/concepts/api';
import { UnifiedConceptCard } from '@/components/ui/UnifiedConceptCard';
import { RelatedConceptsPanel } from '@/components/concept/RelatedConceptsPanel';
import { StageSelector } from '@/components/StageSelector';
import { SeedHeroAnimation } from './SeedHeroAnimation';

const i18n: Record<string, Record<string, string>> = {
    en: {
        title: 'Training',
        subtitle: 'How raw data becomes an intelligent model.',
        dataset: '1. The Dataset',
        training: '2. Training',
        model: '3. The Model',
    },
    et: {
        title: 'Treenimine',
        subtitle: 'Kuidas toorandmetest saab intelligentne mudel.',
        dataset: '1. Andmestik',
        training: '2. Treenimine',
        model: '3. Mudel',
    },
};

function SeedSection({ title, concepts }: { title: string; concepts: any[] }) {
    if (concepts.length === 0) return null;

    return (
        <div className="mb-12 last:mb-0">
            <h3 className="text-xl font-bold text-amber-500/80 mb-6 uppercase tracking-wider pl-1 border-l-4 border-amber-900/50">
                {title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {concepts.map((concept) => (
                    <div key={concept.id} className="h-[280px]">
                        <UnifiedConceptCard
                            variant="seed"
                            index={concept.sort_order}
                            title={concept.title}
                            description={concept.explanation}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default async function SeedView({ locale }: { locale: string }) {
    const [concepts, relatedConcepts] = await Promise.all([
        getConceptsByStage('seed', locale),
        getRelatedConceptsForStage('seed', locale, 6),
    ]);
    const t = i18n[locale] ?? i18n.en;

    const datasetConcepts = concepts.filter(c => c.category === 'data').sort((a, b) => a.sort_order - b.sort_order);
    const trainingConcepts = concepts.filter(c => c.category === 'training').sort((a, b) => a.sort_order - b.sort_order);
    const modelConcepts = concepts.filter(c => c.category === 'model').sort((a, b) => a.sort_order - b.sort_order);

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-950 to-amber-950 pb-20">
            {/* Hero Section */}
            <div className="relative pt-32 pb-16 px-6 text-center z-10 overflow-hidden">
                <SeedHeroAnimation />

                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-100 to-amber-600 mb-4 drop-shadow-sm relative z-20">
                    {t.title}
                </h1>
                <p className="text-lg md:text-xl text-stone-400 max-w-2xl mx-auto leading-relaxed relative z-20">
                    {t.subtitle}
                </p>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <SeedSection title={t.dataset} concepts={datasetConcepts} />
                <SeedSection title={t.training} concepts={trainingConcepts} />
                <SeedSection title={t.model} concepts={modelConcepts} />
            </div>

            {/* Related Concepts from Other Stages */}
            {relatedConcepts.length > 0 && (
                <div className="max-w-7xl mx-auto px-6 relative z-10 mt-16">
                    <RelatedConceptsPanel
                        concepts={relatedConcepts}
                        locale={locale}
                    />
                </div>
            )}

            {/* Navigation */}
            <StageSelector />
        </div>
    );
}
