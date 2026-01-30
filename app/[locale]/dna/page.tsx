import { DNAView } from '@/components/dna/DNAView';
import { getDNAContent } from '@/actions/getDNAContent';

export const metadata = {
    title: 'AI DNA | Dendrix',
    description: 'Explore the fundamental building blocks of Artificial Intelligence.',
};

interface PageProps {
    params: { locale: string };
}

export default async function DNAPage({ params }: PageProps) {
    const content = await getDNAContent(params.locale);
    return <DNAView content={content} />;
}
