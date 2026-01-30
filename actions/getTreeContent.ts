'use server';

import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/supabase/types';

// Flat structure for D3 Stratify & UI
export interface TreeContentSimple {
    id: string;
    parentId: string | null;
    title: string;
    description?: string;
    significance?: string;
    type: 'root' | 'trunk' | 'branch' | 'leaf';

    // Metadata (Enrichment)
    year?: number;
    motif?: string;
    paper?: string;
    paperUrl?: string;

    // Marketing (Swarm)
    relatedProgramId?: 'aiki' | 'aivo' | 'aime' | null;
    marketingHook?: string;
}

// Fallback mock
const MOCK_TREE: TreeContentSimple[] = [
    { id: 'algorithm', parentId: null, title: 'The Algorithm', type: 'root', year: 1950, motif: 'seed' },
    { id: 'neural', parentId: 'algorithm', title: 'Neural Networks', type: 'trunk', year: 1958, motif: 'neuron' },
    { id: 'tokenization-process', parentId: 'algorithm', title: 'Tokenization', type: 'branch', year: 2016, motif: 'scissors' },
    { id: 'word2vec', parentId: 'neural', title: 'Word2Vec', type: 'branch', year: 2013, motif: 'compass', relatedProgramId: 'aiki' },
    { id: 'transformer', parentId: 'neural', title: 'Transformers', type: 'branch', year: 2017, paper: 'Attention Is All You Need', motif: 'crystal', relatedProgramId: 'aiki', marketingHook: 'Master Transformers in Week 2.' },
    { id: 'attention-paper', parentId: 'transformer', title: 'Attention Mechanism', type: 'leaf', year: 2017, motif: 'focus' },
    { id: 'gpt-1', parentId: 'transformer', title: 'GPT-1', type: 'leaf', year: 2018, motif: 'spark' },
    { id: 'gpt4', parentId: 'transformer', title: 'GPT-4', type: 'leaf', year: 2023, motif: 'star' },
];

type NodeType = Database['public']['Tables']['nodes']['Row']['type'];
type NodeRow = Database['public']['Tables']['nodes']['Row'];
type TranslationRow = Database['public']['Tables']['node_translations']['Row'];
type MetadataRow = Database['public']['Tables']['node_metadata']['Row'];

// Type for the joined query result
interface JoinedNode extends Pick<NodeRow, 'id' | 'parent_id' | 'type'> {
    node_translations: Pick<TranslationRow, 'display_name' | 'description' | 'significance'>[];
    node_metadata: Pick<MetadataRow, 'year_introduced' | 'visual_motif' | 'key_paper_title' | 'key_paper_url' | 'related_program_id' | 'marketing_hook_en' | 'marketing_hook_et'>[];
}

export async function getTreeContent(locale: string = 'en'): Promise<TreeContentSimple[]> {
    try {
        // Fetch nodes + translations + metadata
        const { data, error } = await supabase
            .from('nodes')
            .select(`
                id,
                parent_id,
                type,
                node_translations!inner (
                    display_name,
                    description,
                    significance
                ),
                node_metadata (
                    year_introduced,
                    visual_motif,
                    key_paper_title,
                    key_paper_url,
                    related_program_id,
                    marketing_hook_en,
                    marketing_hook_et
                )
            `)
            .eq('node_translations.locale', locale)
            .returns<JoinedNode[]>();

        if (error || !data || data.length === 0) {
            console.warn('⚠️ Tree fetch failed/empty. Using mock.', error);
            return MOCK_TREE;
        }

        // DB type → UI type mapping
        const typeMap: Record<string, TreeContentSimple['type']> = {
            root: 'root',
            era: 'trunk',
            architecture: 'branch',
            model: 'leaf',
        };

        // Map to flat structure
        return data.map((n) => {
            const trans = n.node_translations[0] || {};
            const meta = n.node_metadata?.[0] || {};

            // Safe type casting with fallback
            const uiType = typeMap[n.type] || 'branch';

            return {
                id: n.id,
                parentId: n.parent_id,
                title: trans.display_name || n.id,
                description: trans.description || undefined,
                significance: trans.significance || undefined,
                type: uiType,

                // Metadata
                year: meta.year_introduced || undefined,
                motif: meta.visual_motif || undefined,
                paper: meta.key_paper_title || undefined,
                paperUrl: meta.key_paper_url || undefined,

                // Marketing
                relatedProgramId: meta.related_program_id || undefined,
                marketingHook: locale === 'et' ? (meta.marketing_hook_et || undefined) : (meta.marketing_hook_en || undefined)
            };
        });

    } catch (err) {
        console.error('SERVER ERROR: getTreeContent', err);
        return MOCK_TREE;
    }
}
