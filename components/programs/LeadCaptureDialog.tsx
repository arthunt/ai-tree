"use client";

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, ArrowRight, PartyPopper } from 'lucide-react';
import { submitLead, type LeadState } from '@/actions/submitLead';

export interface LeadLabels {
    title: string;
    subtitle: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    successClose: string;
    close: string;
}

interface LeadCaptureDialogProps {
    isOpen: boolean;
    onClose: () => void;
    programId: string;
    programName: string;
    color: string;
    labels: LeadLabels;
}

const initialState: LeadState = {};

function SubmitButton({ color, labels }: { color: string; labels: LeadLabels }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ backgroundColor: color, boxShadow: `0 8px 24px ${color}30` }}
        >
            {pending ? (
                <>
                    <Loader2 className="animate-spin" size={20} />
                    {labels.submitting}
                </>
            ) : (
                <>
                    {labels.submit}
                    <ArrowRight size={20} />
                </>
            )}
        </button>
    );
}

export function LeadCaptureDialog({ isOpen, onClose, programId, programName, color, labels }: LeadCaptureDialogProps) {
    const [state, formAction] = useActionState(submitLead, initialState);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-zinc-900 border border-white/10 w-full max-w-md rounded-3xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]">

                            {/* Header */}
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{labels.title}</h3>
                                    <p className="text-sm text-gray-400">{labels.subtitle}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    aria-label={labels.close}
                                    className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 overflow-y-auto">
                                {state?.success ? (
                                    /* Success State */
                                    <div className="text-center py-8">
                                        <motion.div
                                            initial={{ scale: 0, rotate: -20 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                                            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                                            style={{ backgroundColor: `${color}20`, color }}
                                        >
                                            <PartyPopper size={44} />
                                        </motion.div>

                                        <motion.h3
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-2xl font-bold text-white mb-3"
                                        >
                                            {labels.successTitle}
                                        </motion.h3>

                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.35 }}
                                            className="text-gray-400 mb-8 leading-relaxed"
                                        >
                                            {labels.successMessage}
                                        </motion.p>

                                        {/* Confetti dots */}
                                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                            {Array.from({ length: 20 }).map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{
                                                        opacity: 1,
                                                        x: '50%',
                                                        y: '40%',
                                                        scale: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 0,
                                                        x: `${15 + Math.random() * 70}%`,
                                                        y: `${Math.random() * 80}%`,
                                                        scale: 1,
                                                    }}
                                                    transition={{
                                                        duration: 0.8 + Math.random() * 0.6,
                                                        delay: 0.1 + Math.random() * 0.3,
                                                        ease: 'easeOut',
                                                    }}
                                                    className="absolute w-2 h-2 rounded-full"
                                                    style={{
                                                        backgroundColor: [color, '#fbbf24', '#34d399', '#818cf8', '#f472b6'][i % 5],
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            onClick={onClose}
                                            className="px-8 py-3 rounded-full font-bold text-white transition-all hover:brightness-110"
                                            style={{ backgroundColor: color }}
                                        >
                                            {labels.successClose}
                                        </motion.button>
                                    </div>
                                ) : (
                                    /* Form */
                                    <form action={formAction} className="space-y-4">
                                        <input type="hidden" name="programId" value={programId} />

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1.5">{labels.name}</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                placeholder={labels.namePlaceholder}
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                                            />
                                            {state?.errors?.name && (
                                                <p className="text-red-400 text-xs mt-1">{state.errors.name[0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1.5">{labels.email}</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder={labels.emailPlaceholder}
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                                            />
                                            {state?.errors?.email && (
                                                <p className="text-red-400 text-xs mt-1">{state.errors.email[0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1.5">{labels.phone}</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder={labels.phonePlaceholder}
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1.5">{labels.notes}</label>
                                            <textarea
                                                name="goals"
                                                rows={3}
                                                placeholder={labels.notesPlaceholder}
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all resize-none"
                                            />
                                        </div>

                                        {state?.errors?._form && (
                                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm">
                                                {state.errors._form[0]}
                                            </div>
                                        )}

                                        <div className="pt-2">
                                            <SubmitButton color={color} labels={labels} />
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
