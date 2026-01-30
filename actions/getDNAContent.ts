'use server';

import { supabase, DNA_IDS, ConceptTranslation } from '@/lib/supabase';

// Fallback mock data if DB is empty or connection fails
const MOCK_DNA_DATA: Record<string, ConceptTranslation> = {
    tokenization: {
        concept_id: 'tokenization',
        locale: 'en',
        title: 'Tokenization',
        explanation: 'The raw input text is broken down into small chunks called tokens. These are the basic units of meaning for the AI.',
        metaphor: 'Like breaking a sentence into individual Lego bricks.',
        question: 'How does the machine read?'
    },
    embeddings: {
        concept_id: 'embeddings',
        locale: 'en',
        title: 'Vector Embeddings',
        explanation: 'Each token is converted into a list of numbers representing its meaning in a multidimensional space.',
        metaphor: 'Like GPS coordinates for the meaning of a word.',
        question: 'How is meaning stored?'
    },
    attention: {
        concept_id: 'attention',
        locale: 'en',
        title: 'Self-Attention',
        explanation: 'The model analyzes the relationship between every token to understand context and nuance.',
        metaphor: 'Like a spotlight connecting related words across a sentence.',
        question: 'How does it understand context?'
    },
    prediction: {
        concept_id: 'prediction',
        locale: 'en',
        title: 'Prediction (Probabilities)',
        explanation: 'The model calculates the probability of the next likely token based on patterns it learned during training.',
        metaphor: 'Like guessing the next note in a familiar melody.',
        question: 'How does it generate text?'
    }
};

export async function getDNAContent(locale: string = 'en') {
    try {
        const { data, error } = await supabase
            .from('concept_translations')
            .select('*')
            .in('concept_id', DNA_IDS)
            .eq('locale', locale);

        if (error || !data || data.length === 0) {
            console.warn('⚠️ Supabase fetch failed or empty. Using mock data.', error);
            return Object.values(MOCK_DNA_DATA);
        }

        // Sort to ensure T -> V -> A -> P order
        const orderMap = { tokenization: 0, embeddings: 1, attention: 2, prediction: 3 };
        return data.sort((a, b) =>
            (orderMap[a.concept_id as keyof typeof orderMap] ?? 99) - (orderMap[b.concept_id as keyof typeof orderMap] ?? 99)
        );

    } catch (err) {
        console.error('SERVER ERROR: getDNAContent', err);
        return Object.values(MOCK_DNA_DATA);
    }
}
