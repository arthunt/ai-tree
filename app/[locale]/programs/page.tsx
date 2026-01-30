import { getPrograms } from '@/actions/getPrograms';
import { GlobalNav } from '@/components/GlobalNav';
import Link from 'next/link';
import { ArrowRight, Brain, Zap, Crown, Check } from 'lucide-react';

export const metadata = {
    title: 'Programs | AI Tree',
    description: 'Master AI with our specialized training programs.',
};

export default async function ProgramsIndexPage({ params }: { params: { locale: string } }) {
    const programs = await getPrograms(params.locale);

    const Icons: Record<string, any> = {
        aiki: Brain,
        aivo: Zap,
        aime: Crown
    };

    return (
        <main className="min-h-screen bg-black text-white">
            <GlobalNav locale={params.locale} />

            <div className="pt-32 pb-20 container mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    Choose Your Path
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16">
                    From understanding the mechanism to building automation.
                    Select the program that fits your goals.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {programs.map((program) => {
                        const Icon = Icons[program.id!] || Brain;

                        return (
                            <Link
                                key={program.id}
                                href={`/${params.locale}/programs/${program.slug}`}
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
                                                Best Value
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
                                            <p className="text-xs text-gray-500 uppercase font-bold">Duration</p>
                                            <p className="text-white">{program.duration_weeks} Weeks</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold">Effort</p>
                                            <p className="text-white">{program.academic_hours}h Total</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto group-hover:text-white transition-colors text-gray-400 font-medium">
                                        View Details
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
