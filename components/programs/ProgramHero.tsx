import { Program } from '@/lib/types';
import * as LucideIcons from 'lucide-react';

interface ProgramHeroProps {
    program: Program;
    labels: {
        apply: string;
        weeks: string;
        hours: string;
    };
}

function getIcon(name: string): React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }> {
    const key = name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    const Icon = (LucideIcons as Record<string, unknown>)[key] as React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }> | undefined;
    return Icon || LucideIcons.Sparkles;
}

export function ProgramHero({ program, labels }: ProgramHeroProps) {
    const Icon = getIcon(program.icon || 'sparkles');
    const price = new Intl.NumberFormat('et-EE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(program.price_cents / 100);

    return (
        <section className="relative overflow-hidden py-24 md:py-32">
            {/* Background glow */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${program.color}40, transparent)`,
                }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ backgroundColor: program.color }}
            />

            <div className="relative container mx-auto px-4 max-w-5xl text-center">
                {/* Icon */}
                <div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 backdrop-blur-sm"
                    style={{
                        background: `${program.color}15`,
                        border: `2px solid ${program.color}40`,
                    }}
                >
                    <Icon size={40} style={{ color: program.color }} />
                </div>

                {/* Code badge */}
                <div className="mb-4">
                    <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase"
                        style={{
                            color: program.color,
                            backgroundColor: `${program.color}15`,
                            border: `1px solid ${program.color}30`,
                        }}
                    >
                        {program.code}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                    {program.full_name || program.name}
                </h1>

                {/* Tagline */}
                <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
                    {program.tagline}
                </p>

                {/* Meta badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm text-white/50">
                    <span className="flex items-center gap-1.5">
                        <LucideIcons.Calendar className="w-4 h-4" />
                        {program.duration_weeks} {labels.weeks}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="flex items-center gap-1.5">
                        <LucideIcons.Clock className="w-4 h-4" />
                        {program.academic_hours} {labels.hours}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="font-mono text-white/70">{price}</span>
                </div>

                {/* CTA */}
                <a
                    href="#pricing"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl"
                    style={{
                        background: `linear-gradient(135deg, ${program.color}, ${program.color}cc)`,
                        boxShadow: `0 8px 32px ${program.color}40`,
                    }}
                >
                    {labels.apply}
                    <LucideIcons.ArrowRight className="w-5 h-5" />
                </a>
            </div>
        </section>
    );
}
