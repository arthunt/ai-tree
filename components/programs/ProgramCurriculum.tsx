import { ProgramCurriculum } from '@/lib/types';
import { Clock } from 'lucide-react';

interface ProgramCurriculumListProps {
    curriculum: ProgramCurriculum[];
    color: string;
    labels: {
        heading: string;
        subtitle: string;
        week: string;
    };
}

export function ProgramCurriculumList({ curriculum, color, labels }: ProgramCurriculumListProps) {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {labels.heading}
                    </h2>
                    <p className="text-gray-400">{labels.subtitle}</p>
                </div>

                <div className="space-y-4">
                    {curriculum.map((week, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors"
                        >
                            <div
                                className="absolute left-0 top-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ backgroundColor: color }}
                            />

                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0 md:w-48 flex flex-col justify-center md:border-r border-white/5 md:pr-6">
                                    <span
                                        className="text-xs font-bold uppercase tracking-wider mb-1"
                                        style={{ color }}
                                    >
                                        {labels.week} {week.week_number}
                                    </span>
                                    <div className="flex items-center gap-2 text-white/50 text-sm mt-2">
                                        <Clock size={14} />
                                        <span>{week.hours}h</span>
                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                        <span className="capitalize">{week.type}</span>
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {week.title}
                                    </h3>
                                    {week.subtitle && (
                                        <p className="text-sm text-gray-400 mb-4 italic">
                                            {week.subtitle}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        {week.topics?.map((topic, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-black/30 rounded-full text-xs text-white/60 border border-white/5"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
