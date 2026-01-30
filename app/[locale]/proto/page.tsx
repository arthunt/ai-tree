"use client";

import { useState } from 'react';
import { GlobalNav } from '@/components/GlobalNav';
import { OrganicTreeDiagram } from '@/components/OrganicTreeDiagram';
import { ConceptLightbox } from '@/components/ConceptLightbox';
import treeConceptsData from '@/data/tree-concepts.json';
import { Concept, TreeLevel } from '@/lib/types';

// Cast data to types
const levels = treeConceptsData.levels as unknown as TreeLevel[];
const concepts = treeConceptsData.concepts as unknown as Concept[];

export default function ProtoPage() {
    const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <GlobalNav />
            <main className="container mx-auto px-4 py-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Proto View</h1>
                <div className="w-full max-w-7xl">
                    <OrganicTreeDiagram
                        levels={levels}
                        concepts={concepts}
                        onConceptClick={setSelectedConcept}
                        showSimpleNames={true}
                    />
                </div>
            </main>

            <ConceptLightbox
                concept={selectedConcept}
                onClose={() => setSelectedConcept(null)}
                allConcepts={concepts}
                levels={levels}
                onNavigate={(id) => {
                    const found = concepts.find(c => c.id === id);
                    if (found) setSelectedConcept(found);
                }}
            />
        </div>
    );
}
