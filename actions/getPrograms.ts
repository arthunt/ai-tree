import { supabase } from '@/lib/supabase';
import { Program, ProgramFeature, ProgramCurriculum, ProgramFAQ } from '@/lib/types';

/**
 * Fetches all active programs for listings (cards)
 */
export async function getPrograms(locale: string = 'et'): Promise<Partial<Program>[]> {
    const { data, error } = await supabase.rpc('get_active_programs', { p_locale: locale });

    if (error) {
        console.error('Error fetching programs:', error);
        return [];
    }

    return data;
}

/**
 * Fetches full details for a single program
 */
export async function getProgram(slug: string, locale: string = 'et'): Promise<Program | null> {
    // 1. Get Core Data
    const { data: programData, error: programError } = await supabase
        .rpc('get_program_with_translations', { p_slug: slug, p_locale: locale })
        .single();

    if (programError || !programData) {
        console.error('Error fetching program:', programError);
        return null;
    }

    const programId = programData.id;

    // 2. Fetch Features
    const { data: featuresData } = await supabase
        .from('program_features')
        .select(`
      id, icon, sort_order,
      translations:feature_translations!inner(title, description)
    `)
        .eq('program_id', programId)
        .eq('translations.locale', locale)
        .order('sort_order');

    // 3. Fetch Curriculum
    const { data: curriculumData } = await supabase
        .from('program_curriculum')
        .select(`
      id, week_number, hours, type, sort_order,
      translations:curriculum_translations!inner(title, subtitle, topics)
    `)
        .eq('program_id', programId)
        .eq('translations.locale', locale)
        .order('sort_order');

    // 4. Fetch FAQ
    const { data: faqData } = await supabase
        .from('program_faq')
        .select(`
      id, sort_order,
      translations:faq_translations!inner(question, answer)
    `)
        .eq('program_id', programId)
        .eq('translations.locale', locale)
        .order('sort_order');

    // Transform nested translations into flat objects
    const features: ProgramFeature[] = (featuresData || []).map((f: any) => ({
        id: f.id,
        icon: f.icon,
        title: f.translations[0]?.title || '',
        description: f.translations[0]?.description || '',
    }));

    const curriculum: ProgramCurriculum[] = (curriculumData || []).map((c: any) => ({
        week_number: c.week_number,
        hours: c.hours,
        type: c.type,
        title: c.translations[0]?.title || '',
        subtitle: c.translations[0]?.subtitle || '',
        topics: c.translations[0]?.topics || [],
    }));

    const faq: ProgramFAQ[] = (faqData || []).map((f: any) => ({
        question: f.translations[0]?.question || '',
        answer: f.translations[0]?.answer || '',
    }));

    return {
        ...programData,
        features,
        curriculum,
        faq,
    };
}
