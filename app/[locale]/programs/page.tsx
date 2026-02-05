import { getPrograms } from '@/actions/getPrograms';
import { GlobalNav } from '@/components/GlobalNav';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import enMessages from '@/messages/en.json';
import etMessages from '@/messages/et.json';
import ruMessages from '@/messages/ru.json';
import { Metadata } from 'next';
import { generateProgramsIndexMetadata } from '@/lib/seo/program-metadata';

const allMessages: Record<string, typeof enMessages> = { en: enMessages, et: etMessages, ru: ruMessages };

function getIcon(name?: string): React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }> {
    if (!name) return LucideIcons.Sparkles;
    const key = name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    const Icon = (LucideIcons as Record<string, unknown>)[key] as React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }> | undefined;
    return Icon || LucideIcons.Sparkles;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return generateProgramsIndexMetadata(locale);
}

export default async function ProgramsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const programs = await getPrograms(locale);
    const t = allMessages[locale] ?? allMessages.en;
    const p = t.programs.catalog;

    const formatMoney = (cents: number) =>
        new Intl.NumberFormat('et-EE', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
        }).format(cents / 100);

    return (
        <main className="min-h-screen bg-black text-white">
            <GlobalNav transparent />

            {/* Hero */}
            <div className="pt-32 pb-20 container mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    {p.title}
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16">
                    {p.subtitle}
                </p>

                {/* Program Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {programs.map((program) => {
                        const Icon = getIcon(program.icon);

                        return (
                            <Link
                                key={program.id}
                                href={`/${locale}/programs/${program.slug}`}
                                className="group relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all hover:-translate-y-2"
                            >
                                {/* Top Glow */}
                                <div
                                    className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ backgroundColor: program.color }}
                                />

                                <div className="p-8 flex flex-col h-full">
                                    <div className="mb-6 flex justify-between items-start">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center bg-black/50 border border-white/10"
                                            style={{ color: program.color }}
                                        >
                                            <Icon size={32} />
                                        </div>
                                        {program.is_bundle && (
                                            <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                {p.bestValue}
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="text-3xl font-bold text-white mb-2 text-left">
                                        {program.code}
                                    </h2>
                                    <p className="text-gray-400 text-left text-sm mb-6 flex-grow">
                                        {program.full_name}
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-8 text-left border-t border-white/10 pt-6">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold">{p.duration}</p>
                                            <p className="text-white">{program.duration_weeks} {p.weeks}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold">{p.effort}</p>
                                            <p className="text-white">{program.academic_hours}{p.totalHours}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto group-hover:text-white transition-colors text-gray-400 font-medium">
                                        {p.viewDetails}
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Compare Section */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">
                        {p.compare}
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="py-4 px-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                                        {p.compareFeature}
                                    </th>
                                    {programs.map((prog) => (
                                        <th
                                            key={prog.id}
                                            className="py-4 px-4 text-center"
                                        >
                                            <span
                                                className="text-lg font-bold"
                                                style={{ color: prog.color }}
                                            >
                                                {prog.code}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr className="hover:bg-white/5">
                                    <td className="py-4 px-4 text-sm text-gray-400 font-medium">
                                        {p.comparePrice}
                                    </td>
                                    {programs.map((prog) => (
                                        <td key={prog.id} className="py-4 px-4 text-center text-white font-bold">
                                            {prog.price_cents ? formatMoney(prog.price_cents) : '—'}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="hover:bg-white/5">
                                    <td className="py-4 px-4 text-sm text-gray-400 font-medium">
                                        {p.compareDuration}
                                    </td>
                                    {programs.map((prog) => (
                                        <td key={prog.id} className="py-4 px-4 text-center text-white">
                                            {prog.duration_weeks} {p.weeks}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="hover:bg-white/5">
                                    <td className="py-4 px-4 text-sm text-gray-400 font-medium">
                                        {p.compareHours}
                                    </td>
                                    {programs.map((prog) => (
                                        <td key={prog.id} className="py-4 px-4 text-center text-white">
                                            {prog.academic_hours}{p.totalHours}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    );
}
