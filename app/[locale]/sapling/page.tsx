import SaplingView from '@/components/sapling/SaplingView';

export const revalidate = 60;

export default async function SaplingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <SaplingView locale={locale} />;
}
