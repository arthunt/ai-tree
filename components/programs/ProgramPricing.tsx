"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';
import { Program } from '@/lib/types';
import { LeadCaptureDialog } from './LeadCaptureDialog';

interface ProgramPricingProps {
    program: Program;
    color: string;
}

export function ProgramPricing({ program, color }: ProgramPricingProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const formatMoney = (cents: number) =>
        new Intl.NumberFormat(program.price_cents > 100000 ? 'et-EE' : 'en-US', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(cents / 100);

    return (
        <div id="apply" className="py-24 relative overflow-hidden">
            {/* Glow */}
            <div
                className="absolute bottom-0 right-0 w-full h-full opacity-10 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 100% 100%, ${color}, transparent 70%)`
                }}
            />

            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left: Value Proposition */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Invest in your <span style={{ color }}>Future</span>.
                        </h2>
                        <ul className="space-y-4 mb-10">
                            {[
                                'Lifetime access to course materials',
                                'Private community of AI experts',
                                'Direct feedback on your projects',
                                'Certificate of completion'
                            ].map((item, i) => (
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
                            <ShieldCheck size={32} className="text-green-400" />
                            <div>
                                <h4 className="text-white font-bold">14-Day Money Back Guarantee</h4>
                                <p className="text-sm text-gray-400">Not satisfied? Get a full refund, no questions asked.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Pricing Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative p-8 rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl"
                    >
                        {program.graduate_discount_percent && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                {program.graduate_discount_percent}% Graduate Discount
                            </div>
                        )}

                        <div className="text-center mb-8">
                            <p className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-2">Total Investment</p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-5xl font-bold text-white">{formatMoney(program.price_cents)}</span>
                                <span className="text-xl text-gray-500 line-through hidden">€2000</span> {/* Placeholder for fake strikethrough if needed */}
                            </div>
                            <p className="text-sm text-gray-500 mt-2">VAT included (if applicable)</p>
                        </div>

                        {/* Installment Option */}
                        {program.installment_count && program.installment_amount_cents && (
                            <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                                <p className="text-sm text-gray-300 mb-1">Flexible Payment Plan</p>
                                <p className="text-xl font-bold text-white">
                                    {program.installment_count} x {formatMoney(program.installment_amount_cents)}
                                </p>
                            </div>
                        )}

                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="w-full py-4 rounded-xl font-bold text-lg mb-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/20"
                            style={{ backgroundColor: color, color: 'white' }}
                        >
                            Secure Your Spot
                        </button>

                        <p className="text-xs text-center text-gray-500">
                            Secure payment via Stripe (coming soon). Instant access to pre-work.
                        </p>
                    </motion.div>
                </div>
            </div>

            <LeadCaptureDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                programId={program.id}
                programName={program.code}
                color={color}
            />
        </div>
    );
}
