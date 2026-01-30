"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Clock, ArrowRight } from 'lucide-react';
import { useDNA, DNAStep } from './DNAContext';

// Descriptions for the Micro-Lessons (Fallback if not provided via props)
const LESSON_CONTENT: Record<string, { title: string; body: string; metaphor: string }> = {
    tokenization: {
        title: "Tokenization",
        body: "Language models don't read words like we do. They break text into 'tokens'—chunks of characters. This is the first step of translation from human to machine.",
        metaphor: "Like chopping a sentence into LEGO bricks."
    },
    vectorizing: {
        title: "Embeddings (Vectors)",
        body: "Each token is converted into a long list of numbers (a vector). These numbers represent the *meaning* of the token in a multi-dimensional space.",
        metaphor: "Like giving each word a GPS coordinate in a universe of meaning."
    },
    attention: {
        title: "Attention",
        body: "The model looks at all tokens at once and decides which ones are related. It 'pays attention' to relevant context regardless of distance.",
        metaphor: "Like connecting dots with threads of varying thickness."
    },
    prediction: {
        title: "Prediction",
        body: "Based on all previous context, the model calculates the probability of the *next* token. It rolls the dice and picks one.",
        metaphor: "Like guessing the end of a sentence before it's spoken."
    }
};

export function MicroLesson() {
    const { activeLesson, closeLesson, togglePause } = useDNA();

    if (!activeLesson || activeLesson === 'idle') return null;

    // Use passed content or fallback
    // In a real app, this should come from the CMS/i18n
    const content = LESSON_CONTENT[activeLesson] || {
        title: "Concept",
        body: "Explanation pending.",
        metaphor: "..."
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLesson}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                layoutId={`card-${activeLesson}`} // Shared layout ID potential?
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-zinc-900 border border-white/10 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="h-32 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 relative overflow-hidden flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-white relative z-10">{content.title}</h2>
                    {/* Abstract BG shapes */}
                    <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[200%] bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                </div>

                <div className="p-8">
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        {content.body}
                    </p>

                    <div className="bg-white/5 border border-white/5 rounded-xl p-4 mb-8">
                        <p className="text-sm text-brand-teal font-mono uppercase tracking-widest mb-2">Metaphor</p>
                        <p className="text-gray-400 italic">"{content.metaphor}"</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                closeLesson();
                                togglePause(); // Resume play
                            }}
                            className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                        >
                            <Play size={18} fill="currentColor" />
                            Resume Flow
                        </button>
                        <button
                            onClick={closeLesson}
                            className="flex-1 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                        >
                            Explore More
                        </button>
                    </div>
                </div>

                <button
                    onClick={closeLesson}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/50 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </motion.div>
        </div>
    );
}
