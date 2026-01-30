"use client";

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom'; // Using standard hook for server actions
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { submitLead } from '@/actions/submitLead';

interface LeadCaptureDialogProps {
    isOpen: boolean;
    onClose: () => void;
    programId: string;
    programName: string;
    color: string;
}

const initialState = {
    errors: {},
    success: false
};

function SubmitButton({ color }: { color: string }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ backgroundColor: color }}
        >
            {pending ? (
                <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                </>
            ) : (
                <>
                    Submit Application
                    <ArrowRight size={20} />
                </>
            )}
        </button>
    );
}

export function LeadCaptureDialog({ isOpen, onClose, programId, programName, color }: LeadCaptureDialogProps) {
    const [state, formAction] = useFormState(submitLead, initialState);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (state?.success) {
            setShowConfetti(true);
            // Optional: Auto close after a few seconds? No, let user read the success message.
        }
    }, [state?.success]);

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
                                    <h3 className="text-xl font-bold text-white">Apply for {programName}</h3>
                                    <p className="text-sm text-gray-400">Secure your spot in the next cohort.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 overflow-y-auto">
                                {state?.success ? (
                                    <div className="text-center py-10">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            type="spring"
                                            className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                                        >
                                            <CheckCircle size={48} />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                                        <p className="text-gray-400 mb-8">
                                            We check applications daily. Detailed next steps have been sent to your email.
                                        </p>
                                        <button
                                            onClick={onClose}
                                            className="px-8 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                ) : (
                                    <form action={formAction} className="space-y-4">
                                        <input type="hidden" name="programId" value={programId} />

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="John Doe"
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                                            />
                                            {state?.errors?.name && (
                                                <p className="text-red-400 text-xs mt-1">{state.errors.name[0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="john@example.com"
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                                            />
                                            {state?.errors?.email && (
                                                <p className="text-red-400 text-xs mt-1">{state.errors.email[0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Phone (Optional)</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="+372 5555 5555"
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Goals / Questions (Optional)</label>
                                            <textarea
                                                name="goals"
                                                rows={3}
                                                placeholder="I want to learn AI because..."
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all resize-none"
                                            />
                                        </div>

                                        {state?.errors?._form && (
                                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm">
                                                {state.errors._form[0]}
                                            </div>
                                        )}

                                        <div className="pt-2">
                                            <SubmitButton color={color} />
                                        </div>

                                        <p className="text-xs text-center text-gray-500 mt-4">
                                            By submitting, you agree to our privacy policy. Your data is stored securely in the EU.
                                        </p>
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
