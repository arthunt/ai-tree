import SaplingView from '@/components/sapling/SaplingView';

export default function SaplingPage({ params }: { params: { locale: string } }) {
    return <SaplingView locale={params.locale} />;
}
