import { getProgram } from '@/actions/getPrograms';
import { GlobalNav } from '@/components/GlobalNav';
import { ProgramHero } from '@/components/programs/ProgramHero';
import { ProgramFeatures } from '@/components/programs/ProgramFeatures';
import { ProgramCurriculumList } from '@/components/programs/ProgramCurriculum';
import { ProgramPricing } from '@/components/programs/ProgramPricing';
import { ProgramFAQList } from '@/components/programs/ProgramFAQ';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
    params: {
        slug: string;
        locale: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const program = await getProgram(params.slug, params.locale);
    if (!program) return { title: 'Program Not Found' };

    return {
        title: `${program.name} | AI Tree`,
        description: program.tagline,
    };
}

export default async function ProgramPage({ params }: Props) {
    const program = await getProgram(params.slug, params.locale);

    if (!program) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white selection:bg-brand-purple/30 selection:text-white">
            <GlobalNav locale={params.locale} />

            <ProgramHero
                title={program.code} // Using "AIKI" / "AIVO" as the big title
                tagline={program.full_name} // "Rakenduslik AI..."
                description={program.tagline || ''}
                price={(program.price_cents / 100).toLocaleString('et-EE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                color={program.color}
                programId={program.id}
                slug={program.slug}
            />

            {/* Features Grid */}
            {program.features && (
                <ProgramFeatures
                    features={program.features}
                    color={program.color}
                />
            )}

            {/* Detailed Outcomes/Description Area could go here */}

            {/* Curriculum */}
            {program.curriculum && (
                <ProgramCurriculumList
                    curriculum={program.curriculum}
                    color={program.color}
                />
            )}

            {/* Pricing / CTA */}
            <ProgramPricing
                program={program}
                color={program.color}
            />

            {/* FAQ */}
            {program.faq && (
                <ProgramFAQList
                    faq={program.faq}
                />
            )}
        </main>
    );
}
