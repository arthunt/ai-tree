import * as LucideIcons from 'lucide-react';
import { ProgramFeature } from '@/lib/types';

interface ProgramFeaturesProps {
    features: ProgramFeature[];
    color: string;
    heading?: string;
}

function getIcon(name: string): React.ComponentType<{ size?: number; className?: string }> {
    const key = name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    const Icon = (LucideIcons as Record<string, unknown>)[key] as React.ComponentType<{ size?: number; className?: string }> | undefined;
    return Icon || LucideIcons.Star;
}

export function ProgramFeatures({ features, color, heading }: ProgramFeaturesProps) {
    return (
        <section className="py-20 bg-black/20">
            <div className="container mx-auto px-4 max-w-6xl">
                {heading && (
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                        {heading}
                    </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const Icon = getIcon(feature.icon);

                        return (
                            <div
                                key={feature.id || index}
                                className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-white/10"
                                    style={{ color }}
                                >
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
