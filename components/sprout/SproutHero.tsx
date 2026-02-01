"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useSproutContext } from './SproutContext';
import { RootSystem } from './RootSystem';
import { ContextNode } from './ContextNode';
import { useRef, useState, useEffect } from 'react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { RotateCcw } from 'lucide-react';

const FEEDBACK_MAP: Record<string, string> = {
    'ctx-1': 'hero.feedbackContext',
    'ctx-2': 'hero.feedbackGrammar',
    'ctx-3': 'hero.feedbackFacts',
};

export function SproutHero() {
    const { growthLevel, connectedNodes, isComplete, reset } = useSproutContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('sprout');
    const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
    const prevConnectedCount = useRef(connectedNodes.length);

    // Show feedback toast when a new node connects
    useEffect(() => {
        if (connectedNodes.length > prevConnectedCount.current) {
            const lastNode = connectedNodes[connectedNodes.length - 1];
            const key = FEEDBACK_MAP[lastNode];
            if (key) {
                setFeedbackMsg(t(key));
                const timer = setTimeout(() => setFeedbackMsg(null), 2500);
                return () => clearTimeout(timer);
            }
        }
        prevConnectedCount.current = connectedNodes.length;
    }, [connectedNodes, t]);

    const totalNodes = 3;

    // Nodes to connect — labels from i18n
    const contextNodes = [
        { id: 'ctx-1', label: t('hero.context'), x: -120, y: -80 },
        { id: 'ctx-2', label: t('hero.grammar'), x: 120, y: -80 },
        { id: 'ctx-3', label: t('hero.facts'), x: 0, y: 140 },
    ];

    return (
        <div ref={containerRef} className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background Roots */}
            <RootSystem growthLevel={growthLevel} />

            {/* Central Seed (Drop Zone) */}
            <motion.div
                className="relative z-20 w-32 h-32 rounded-full bg-indigo-950 border-2 border-indigo-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.3)]"
                animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        "0 0 20px rgba(99,102,241,0.3)",
                        "0 0 40px rgba(99,102,241,0.6)",
                        "0 0 20px rgba(99,102,241,0.3)"
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                {isComplete ? (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-4xl"
                    >
                        🌱
                    </motion.div>
                ) : (
                    <div className="text-center text-xs text-indigo-300 font-mono">
                        <div>{t('hero.dormant')}</div>
                        <div className="opacity-50">{t('hero.seed')}</div>
                    </div>
                )}
            </motion.div>

            {/* Floating Context Nodes */}
            {contextNodes.map(node => (
                <ContextNode
                    key={node.id}
                    id={node.id}
                    label={node.label}
                    initialX={node.x}
                    initialY={node.y}
                />
            ))}

            {/* Progress Indicator */}
            {connectedNodes.length > 0 && !isComplete && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-6 text-center text-xs font-mono text-indigo-300/80 bg-indigo-950/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-indigo-500/20"
                >
                    {t('hero.progress')
                        .replace('{connected}', String(connectedNodes.length))
                        .replace('{total}', String(totalNodes))}
                </motion.div>
            )}

            {/* Feedback Toast */}
            <AnimatePresence>
                {feedbackMsg && (
                    <motion.div
                        key="feedback"
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute bottom-20 z-30 bg-indigo-900/80 backdrop-blur-md text-indigo-100 text-sm font-medium px-5 py-3 rounded-xl border border-indigo-400/30 shadow-lg shadow-indigo-900/40 max-w-xs text-center"
                    >
                        {feedbackMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Completion Message + Reset */}
            {isComplete && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-8 text-center flex flex-col items-center gap-3"
                >
                    <p className="text-sm text-indigo-200 font-medium bg-indigo-900/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-indigo-400/20">
                        {t('hero.complete')}
                    </p>
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-1.5 text-xs text-indigo-400/70 hover:text-indigo-300 transition-colors min-h-[44px] px-3"
                    >
                        <RotateCcw size={14} />
                        {t('hero.resetLabel')}
                    </button>
                </motion.div>
            )}

            {/* Guide Text */}
            {!isComplete && growthLevel === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
                    className="absolute bottom-10 text-center text-sm text-indigo-200/60"
                >
                    {t('hero.dragGuide')}
                </motion.div>
            )}
        </div>
    );
}
