import { DNAView } from '@/components/dna/DNAView';
import { getDNAContent } from '@/actions/getDNAContent';

export const metadata = {
    title: 'AI DNA | Dendrix',
    description: 'Explore the fundamental building blocks of Artificial Intelligence.',
};

export default async function DNAPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const content = await getDNAContent(locale);
    return <DNAView content={content} />;
}
