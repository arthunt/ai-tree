import { getProgram } from '@/actions/getPrograms';
import { GlobalNav } from '@/components/GlobalNav';
import { ProgramHero } from '@/components/programs/ProgramHero';
import { ProgramFeatures } from '@/components/programs/ProgramFeatures';
import { ProgramCurriculumList } from '@/components/programs/ProgramCurriculum';
import { ProgramPricing } from '@/components/programs/ProgramPricing';
import { ProgramFAQList } from '@/components/programs/ProgramFAQ';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import enMessages from '@/messages/en.json';
import etMessages from '@/messages/et.json';

type Props = {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
};

const messages: Record<string, typeof enMessages> = { en: enMessages, et: etMessages };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const program = await getProgram(slug, locale);
    if (!program) return { title: 'Program Not Found' };

    return {
        title: `${program.name} | AI Tree`,
        description: program.tagline,
    };
}

export default async function ProgramPage({ params }: Props) {
    const { slug, locale } = await params;
    const program = await getProgram(slug, locale);

    if (!program) {
        notFound();
    }

    const t = messages[locale] ?? messages.en;
    const p = t.programs;
    const leadLabels = p.lead;

    return (
        <main className="min-h-screen bg-black text-white selection:bg-brand-purple/30 selection:text-white">
            <GlobalNav transparent />

            <ProgramHero
                program={program}
                labels={{
                    apply: p.hero.apply,
                    weeks: p.hero.weeks,
                    hours: p.hero.hours,
                }}
                leadLabels={leadLabels}
            />

            {program.features && program.features.length > 0 && (
                <ProgramFeatures
                    features={program.features}
                    color={program.color}
                    heading={p.features.heading}
                />
            )}

            {program.curriculum && program.curriculum.length > 0 && (
                <ProgramCurriculumList
                    curriculum={program.curriculum}
                    color={program.color}
                    labels={{
                        heading: p.curriculum.heading,
                        subtitle: p.curriculum.subtitle,
                        week: p.curriculum.week,
                    }}
                />
            )}

            <ProgramPricing
                program={program}
                labels={{
                    heading: p.pricing.heading,
                    headingAccent: p.pricing.headingAccent,
                    benefits: p.pricing.benefits,
                    guarantee: p.pricing.guarantee,
                    guaranteeDesc: p.pricing.guaranteeDesc,
                    totalInvestment: p.pricing.totalInvestment,
                    vatNote: p.pricing.vatNote,
                    flexiblePayment: p.pricing.flexiblePayment,
                    cta: p.pricing.cta,
                    paymentNote: p.pricing.paymentNote,
                    graduateDiscount: p.pricing.graduateDiscount,
                }}
                leadLabels={leadLabels}
            />

            {program.faq && program.faq.length > 0 && (
                <ProgramFAQList
                    faq={program.faq}
                    heading={p.faq.heading}
                />
            )}
        </main>
    );
}
