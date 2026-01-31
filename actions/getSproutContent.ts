'use server';

import { supabase } from '@/lib/supabase';

// Fallback Mock Data
const MOCK_SPROUT_DATA = [
    {
        slug: 'tokens',
        title: { en: 'Tokens', et: 'Tokenid' },
        description: { en: 'The basic units of text processing.', et: 'Teksti töötlemise põhiüksused.' },
        analogy: { en: 'Like Lego bricks.', et: 'Nagu Lego klotsid.' },
        visual_type: 'component',
        order_index: 1
    },
    {
        slug: 'vectors',
        title: { en: 'Vectors', et: 'Vektorid' },
        description: { en: 'Numbers that represent meaning.', et: 'Numbrid, mis esindavad tähendust.' },
        analogy: { en: 'Like GPS coordinates.', et: 'Nagu GPS-koordinaadid.' },
        visual_type: 'component',
        order_index: 2
    },
    // ... minimal mock set
];

export async function getSproutContent(locale: string) {
    try {
        const { data, error } = await supabase
            .from('sprout_lessons')
            .select('*')
            .order('order_index', { ascending: true });

        if (error || !data || data.length === 0) {
            console.warn('⚠️ Supabase sprout fetch failed. Using mock data.', error);
            return MOCK_SPROUT_DATA;
        }

        return data;

    } catch (err) {
        console.error('SERVER ERROR: getSproutContent', err);
        return MOCK_SPROUT_DATA;
    }
}
