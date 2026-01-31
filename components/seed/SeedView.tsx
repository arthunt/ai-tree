import { getConceptsByStage } from '@/lib/concepts/api';
import { UnifiedConceptCard } from '@/components/ui/UnifiedConceptCard';
import { StageSelector } from '@/components/StageSelector';

// Separate section component for cleaner layout
function SeedSection({ title, concepts }: { title: string; concepts: any[] }) {
    if (concepts.length === 0) return null;

    return (
        <div className="mb-12 last:mb-0">
            <h3 className="text-xl font-bold text-amber-500/80 mb-6 uppercase tracking-wider pl-1 border-l-4 border-amber-900/50">
                {title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {concepts.map((concept, idx) => (
                    <div key={concept.id} className="h-[280px]">
                        <UnifiedConceptCard
                            variant="seed"
                            index={concept.sort_order}
                            title={concept.title}
                            description={concept.explanation}
                        // Deep Dive could be enabled here later
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default async function SeedView({ locale }: { locale: string }) {
    const concepts = await getConceptsByStage('seed', locale);

    // Group by category (Phase 1, 2, 3) relative to the backlog logic
    // 'data' = Phase 1: The Dataset
    // 'training' = Phase 2: Training
    // 'model' = Phase 3: The Model

    const datasetConcepts = concepts.filter(c => c.category === 'data').sort((a, b) => a.sort_order - b.sort_order);
    const trainingConcepts = concepts.filter(c => c.category === 'training').sort((a, b) => a.sort_order - b.sort_order);
    const modelConcepts = concepts.filter(c => c.category === 'model').sort((a, b) => a.sort_order - b.sort_order);

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-950 to-amber-950 pb-20">
            {/* Hero Section */}
            <div className="relative pt-32 pb-16 px-6 text-center z-10">
                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-100 to-amber-600 mb-4 drop-shadow-sm">
                    {locale === 'et' ? 'Treening' : 'Training'}
                </h1>
                <p className="text-lg md:text-xl text-stone-400 max-w-2xl mx-auto leading-relaxed">
                    {locale === 'et'
                        ? 'Kuidas toorandmetest saab intelligentne mudel.'
                        : 'How raw data becomes an intelligent model.'}
                </p>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <SeedSection title={locale === 'et' ? '1. Andmestik' : '1. The Dataset'} concepts={datasetConcepts} />
                <SeedSection title={locale === 'et' ? '2. Treening' : '2. Training'} concepts={trainingConcepts} />
                <SeedSection title={locale === 'et' ? '3. Mudel' : '3. The Model'} concepts={modelConcepts} />
            </div>

            {/* Navigation */}
            <StageSelector />
        </div>
    );
}
