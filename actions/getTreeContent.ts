'use server';

import { supabase } from '@/lib/supabase';

// Type matching the `nodes` table
export interface TreeNodeDB {
    id: string;
    parent_id: string | null;
    status: 'active' | 'legacy' | 'deprecated';
    // We will join with concept_translations for titles
}

// Flat structure for D3 Stratify
export interface TreeContentSimple {
    id: string;
    parentId: string | null;
    title: string;
    description?: string;
    type: 'root' | 'trunk' | 'branch' | 'leaf'; // Derived from depth or manually set
}

// Fallback mock if needed
const MOCK_TREE: TreeContentSimple[] = [
    { id: 'algorithm', parentId: null, title: 'The Algorithm', type: 'root' },
    { id: 'neural', parentId: 'algorithm', title: 'Neural Networks', type: 'trunk' },
    { id: 'transformer', parentId: 'neural', title: 'Transformers', type: 'branch' },
    { id: 'gpt4', parentId: 'transformer', title: 'GPT-4', type: 'leaf' },
];

export async function getTreeContent(locale: string = 'en'): Promise<TreeContentSimple[]> {
    try {
        // Fetch nodes + translations
        // We assume valid structure from Swarm
        const { data: nodes, error } = await supabase
            .from('nodes')
            .select(`
                id,
                parent_id,
                type,
                concept_translations!inner (
                    title,
                    explanation
                )
            `)
            .eq('concept_translations.locale', locale);

        if (error || !nodes || nodes.length === 0) {
            console.warn('⚠️ Tree fetch failed/empty. Using mock.', error);
            // Return mock if production DB is empty during migration
            return MOCK_TREE;
        }

        // Map to flat structure
        return nodes.map((n: any) => ({
            id: n.id,
            parentId: n.parent_id,
            title: n.concept_translations[0]?.title || n.id,
            description: n.concept_translations[0]?.explanation,
            type: n.type || 'branch' // Fallback
        }));

    } catch (err) {
        console.error('SERVER ERROR: getTreeContent', err);
        return MOCK_TREE;
    }
}
