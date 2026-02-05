import { Check, ShieldCheck, BadgeCheck } from 'lucide-react';
import { Program } from '@/lib/types';
import { ApplyButton } from './ApplyButton';
import type { LeadLabels } from './LeadCaptureDialog';

interface ProgramPricingProps {
    program: Program;
    labels: {
        heading: string;
        headingAccent: string;
        benefits: string[];
        guarantee: string;
        guaranteeDesc: string;
        totalInvestment: string;
        vatNote: string;
        flexiblePayment: string;
        cta: string;
        paymentNote: string;
        graduateDiscount: string;
        tootukassaNote?: string;
    };
    leadLabels: LeadLabels;
}

export function ProgramPricing({ program, labels, leadLabels }: ProgramPricingProps) {
    const formatMoney = (cents: number) =>
        new Intl.NumberFormat('et-EE', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
        }).format(cents / 100);

    return (
        <section id="pricing" className="py-24 relative overflow-hidden">
            {/* Glow */}
            <div
                className="absolute bottom-0 right-0 w-full h-full opacity-10 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 100% 100%, ${program.color}, transparent 70%)`,
                }}
            />

            <div className="container mx-auto px-4 max-w-5xl relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left: Value Proposition */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            {labels.heading}{' '}
                            <span style={{ color: program.color }}>{labels.headingAccent}</span>
                        </h2>
                        <ul className="space-y-4 mb-10">
                            {labels.benefits.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-lg text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <Check size={14} className="text-white" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* Guarantee Badge */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 max-w-md">
                            <ShieldCheck size={32} className="text-green-400 flex-shrink-0" />
                            <div>
                                <h4 className="text-white font-bold">{labels.guarantee}</h4>
                                <p className="text-sm text-gray-400">{labels.guaranteeDesc}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Pricing Card */}
                    <div className="relative p-8 rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl">
                        {program.graduate_discount_percent && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                                {program.graduate_discount_percent}% {labels.graduateDiscount}
                            </div>
                        )}

                        {program.is_bundle && program.bundle_savings_cents && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                                Save {formatMoney(program.bundle_savings_cents)}
                            </div>
                        )}

                        <div className="text-center mb-8">
                            <p className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-2">
                                {labels.totalInvestment}
                            </p>
                            <span className="text-5xl font-bold text-white">
                                {formatMoney(program.price_cents)}
                            </span>
                            <p className="text-sm text-gray-500 mt-2">{labels.vatNote}</p>
                        </div>

                        {/* Installment Option */}
                        {program.installment_count && program.installment_amount_cents && (
                            <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                                <p className="text-sm text-gray-300 mb-1">{labels.flexiblePayment}</p>
                                <p className="text-xl font-bold text-white">
                                    {program.installment_count} x {formatMoney(program.installment_amount_cents)}
                                </p>
                            </div>
                        )}

                        <ApplyButton
                            programId={program.id}
                            programName={program.code}
                            color={program.color}
                            labels={leadLabels}
                            className="w-full py-4 rounded-xl font-bold text-lg mb-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg cursor-pointer"
                            style={{
                                backgroundColor: program.color,
                                color: 'white',
                                boxShadow: `0 8px 24px ${program.color}30`,
                            }}
                        >
                            {labels.cta}
                        </ApplyButton>

                        <p className="text-xs text-center text-gray-500">
                            {labels.paymentNote}
                        </p>

                        {labels.tootukassaNote && (
                            <div className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <BadgeCheck size={20} className="text-emerald-400 flex-shrink-0" />
                                <p className="text-xs text-emerald-300/90">
                                    {labels.tootukassaNote}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
