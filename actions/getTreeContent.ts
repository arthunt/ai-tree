'use server';

import { supabase } from '@/lib/supabase';

// Flat structure for D3 Stratify & UI
export interface TreeContentSimple {
    id: string;
    parentId: string | null;
    title: string;
    description?: string;
    type: 'root' | 'trunk' | 'branch' | 'leaf';

    // Metadata (Enrichment)
    year?: number;
    motif?: string;
    paper?: string;

    // Marketing (Swarm)
    relatedProgramId?: 'aiki' | 'aivo' | 'aime' | null;
    marketingHook?: string;
}

// Fallback mock
const MOCK_TREE: TreeContentSimple[] = [
    { id: 'algorithm', parentId: null, title: 'The Algorithm', type: 'root', year: 1950, motif: 'seed' },
    { id: 'neural', parentId: 'algorithm', title: 'Neural Networks', type: 'trunk', year: 1958, motif: 'neuron' },
    { id: 'transformer', parentId: 'neural', title: 'Transformers', type: 'branch', year: 2017, paper: 'Attention Is All You Need', motif: 'crystal', relatedProgramId: 'aiki', marketingHook: 'Master Transformers in Week 2.' },
    { id: 'gpt4', parentId: 'transformer', title: 'GPT-4', type: 'leaf', year: 2023, motif: 'star' },
];

export async function getTreeContent(locale: string = 'en'): Promise<TreeContentSimple[]> {
    try {
        // Fetch nodes + translations + metadata
        const { data: nodes, error } = await supabase
            .from('nodes')
            .select(`
                id,
                parent_id,
                type,
                node_translations!inner (
                    title,
                    explanation
                ),
                node_metadata (
                    year_introduced,
                    visual_motif,
                    key_paper_title,
                    related_program_id,
                    marketing_hook_en,
                    marketing_hook_et
                )
            `)
            .eq('node_translations.locale', locale);

        if (error || !nodes || nodes.length === 0) {
            console.warn('⚠️ Tree fetch failed/empty. Using mock.', error);
            return MOCK_TREE;
        }

        // Map to flat structure
        return nodes.map((n: any) => {
            const meta = n.node_metadata?.[0] || {};
            return {
                id: n.id,
                parentId: n.parent_id,
                title: n.node_translations[0]?.title || n.id,
                description: n.node_translations[0]?.explanation,
                type: n.type || 'branch',

                // Metadata
                year: meta.year_introduced,
                motif: meta.visual_motif,
                paper: meta.key_paper_title,

                // Marketing
                relatedProgramId: meta.related_program_id,
                marketingHook: locale === 'et' ? meta.marketing_hook_et : meta.marketing_hook_en
            };
        });

    } catch (err) {
        console.error('SERVER ERROR: getTreeContent', err);
        return MOCK_TREE;
    }
}
