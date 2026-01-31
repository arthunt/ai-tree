import { getConceptsByStage, getRelatedConceptsForStage } from '@/lib/concepts/api';
import { SeedWorkspace } from './SeedWorkspace';
import { RelatedConceptsPanel } from '@/components/concept/RelatedConceptsPanel';
import { StageSelector } from '@/components/StageSelector';

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
            {/* Interactive Workspace */}
            <div className="relative pt-32">
                <SeedWorkspace
                    locale={locale}
                    datasetConcepts={datasetConcepts}
                    trainingConcepts={trainingConcepts}
                    modelConcepts={modelConcepts}
                    i18n={t}
                />
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
