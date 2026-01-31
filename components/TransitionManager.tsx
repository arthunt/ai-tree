"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJourney, EvolutionStage } from '@/lib/contexts/JourneyContext';
import { Sprout } from 'lucide-react';

export function TransitionManager() {
    const { currentStage } = useJourney();
    const prevStage = useRef<EvolutionStage>(currentStage);
    const [activeTransition, setActiveTransition] = useState<string | null>(null);

    useEffect(() => {
        // DETECT TRANSITIONS
        if (prevStage.current !== currentStage) {
            if (prevStage.current === 'dna' && currentStage === 'seed') {
                setActiveTransition('dna-to-seed');
            } else if (prevStage.current === 'seed' && (currentStage === 'tree' || currentStage === 'sprout')) {
                setActiveTransition('seed-to-tree');
            }
            // Update ref
            prevStage.current = currentStage;
        }
    }, [currentStage]);

    // Clear function
    const clear = () => setActiveTransition(null);

    return (
        <AnimatePresence>
            {activeTransition === 'dna-to-seed' && (
                <DnaToSeedTransition key="dna-seed" onComplete={clear} />
            )}
            {/* Add more transitions here */}
        </AnimatePresence>
    );
}

function DnaToSeedTransition({ onComplete }: { onComplete: () => void }) {
    // This animation simulates the "Winner Token" (e.g. from DNA prediction)
    // flying to the center and transforming into the Seed.

    useEffect(() => {
        const timer = setTimeout(onComplete, 2000); // 2s duration
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* The Token Flying */}
            <motion.div
                initial={{ scale: 1, y: 0, opacity: 1 }}
                animate={{
                    scale: [1, 5, 20],
                    opacity: [1, 1, 0],
                    filter: ["blur(0px)", "blur(0px)", "blur(20px)"]
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute text-brand-teal font-bold text-4xl"
            >
                AI
            </motion.div>

            {/* The Flash */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute inset-0 bg-white"
            />
        </motion.div>
    );
}
