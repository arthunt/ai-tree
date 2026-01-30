import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    intensity?: 'low' | 'medium' | 'high';
}

export function GlassCard({
    children,
    className = '',
    intensity = 'medium'
}: GlassCardProps) {

    const bgIntensity = {
        low: 'bg-white/5',
        medium: 'bg-white/10',
        high: 'bg-white/20'
    };

    const backdropIntensity = {
        low: 'backdrop-blur-sm',
        medium: 'backdrop-blur-md',
        high: 'backdrop-blur-lg'
    };

    return (
        <div
            className={`
        relative rounded-2xl border border-white/10
        ${bgIntensity[intensity]}
        ${backdropIntensity[intensity]}
        shadow-xl
        transition-all duration-300
        hover:border-white/20 hover:bg-white/15
        ${className}
      `}
        >
            {/* Subtle top highlight for depth */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {children}
        </div>
    );
}
