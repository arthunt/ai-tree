"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { DNAComponentType } from '@/lib/supabase';
import { visualTokenize } from './TokenizationSlicer';

// The steps of the simulation
export type DNAStep = 'idle' | 'tokenization' | 'vectorizing' | 'attention' | 'prediction';

interface DNAContextType {
    // Input State
    inputText: string;
    setInputText: (text: string) => void;

    // Simulation State
    currentStep: DNAStep;
    isPlaying: boolean;
    isPaused: boolean;
    playbackSpeed: number; // 1.0 = Normal, 0.1 = Slow via Lens, 0.0 = Paused
    activeLesson: DNAStep | null; // If set, overlay is shown

    // Data State (Mock or Real)
    tokens: string[];        // Whitespace-split words (used by attention/vectors)
    subTokens: string[];     // BPE-like visual sub-tokens (used by tokenization slicer)
    vectors: number[][]; // Simplified 2D representation for visualization
    attentionWeights: { fromIndex: number; toIndex: number; strength: number }[];
    predictions: { token: string; probability: number }[];

    // Derived State
    isComplete: boolean;       // True when simulation finished (ran through all steps)
    hasData: boolean;          // True when tokens/vectors/etc. are populated

    // Actions
    runSimulation: () => void;
    resetSimulation: () => void;
    nextStep: () => void;
    prevStep: () => void;
    jumpToStep: (step: DNAStep) => void;
    setPlaybackSpeed: (speed: number) => void;
    togglePause: () => void;
    openLesson: (step: DNAStep) => void;
    closeLesson: () => void;
}

const DNAContext = createContext<DNAContextType | undefined>(undefined);

const STEP_ORDER: DNAStep[] = ['tokenization', 'vectorizing', 'attention', 'prediction', 'idle'];
const BASE_STEP_DURATION = 6000; // 6 seconds per step to allow full animations (Text -> Cut -> Grid -> Matrix)

// Active simulation steps (without terminal 'idle')
const ACTIVE_STEPS: DNAStep[] = ['tokenization', 'vectorizing', 'attention', 'prediction'];

export function DNAProvider({ children }: { children: React.ReactNode }) {
    const [inputText, setInputText] = useState("");
    const [currentStep, setCurrentStep] = useState<DNAStep>('idle');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(0.5); // Default to slower 0.5x as per US-152
    const [activeLesson, setActiveLesson] = useState<DNAStep | null>(null);
    const [isComplete, setIsComplete] = useState(false);

    const [tokens, setTokens] = useState<string[]>([]);
    const [subTokens, setSubTokens] = useState<string[]>([]);
    const [vectors, setVectors] = useState<number[][]>([]);
    const [predictions, setPredictions] = useState<{ token: string; probability: number }[]>([]);
    const [attentionWeights, setAttentionWeights] = useState<{ fromIndex: number; toIndex: number; strength: number }[]>([]);

    // Timer ref to manage clearing
    const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Simple "Toy" Tokenizer
    const tokenize = useCallback((text: string) => {
        return text.trim().split(/\s+/).filter(t => t.length > 0);
    }, []);

    // Smart Mock Vectorizer
    const vectorize = useCallback((tokens: string[]) => {
        return tokens.map(t => {
            const lower = t.toLowerCase();
            // Cluster 1: Royalty
            if (['king', 'queen', 'prince', 'princess', 'royal'].some(k => lower.includes(k))) {
                return [0.7 + (Math.random() * 0.1), 0.7 + (Math.random() * 0.1)];
            }
            // Cluster 2: Fruit/Nature
            if (['apple', 'banana', 'fruit', 'tree', 'forest'].some(k => lower.includes(k))) {
                return [0.2 + (Math.random() * 0.1), 0.2 + (Math.random() * 0.1)];
            }
            // Cluster 3: AI
            if (['ai', 'intelligence', 'robot', 'future'].some(k => lower.includes(k))) {
                return [0.8 + (Math.random() * 0.1), 0.2 + (Math.random() * 0.1)];
            }
            // Random scatter
            return [Math.random(), Math.random()];
        });
    }, []);

    // Smart Mock Attention
    const calculateAttention = useCallback((tokens: string[]) => {
        const weights = [];
        for (let i = 1; i < tokens.length; i++) {
            const current = tokens[i].toLowerCase();
            for (let j = Math.max(0, i - 3); j < i; j++) {
                const prev = tokens[j].toLowerCase();
                let strength = Math.random() * 0.3; // Low base noise

                // Strong Connections
                if (prev === 'artificial' && current === 'intelligence') strength = 0.95;
                if (prev === 'machine' && current === 'learning') strength = 0.95;
                if (prev === 'large' && current === 'language') strength = 0.95;
                if (prev === 'neural' && current === 'network') strength = 0.95;
                if (prev === 'bank' && (current === 'account' || current === 'river')) strength = 0.8;

                if (strength > 0.4) {
                    weights.push({ fromIndex: i, toIndex: j, strength });
                }
            }
        }
        return weights.sort((a, b) => b.strength - a.strength); // Strongest first
    }, []);

    // Smart Mock Predictor
    const predict = useCallback(() => {
        // Context-aware predictions based on last token (mock)
        const lastToken = tokens.length > 0 ? tokens[tokens.length - 1].toLowerCase() : "";
        let candidates = [
            { token: 'and', probability: 0.1 },
            { token: 'the', probability: 0.1 },
            { token: 'is', probability: 0.1 },
            { token: 'future', probability: 0.05 }
        ];

        // Override for specific contexts
        if (lastToken === 'artificial') {
            candidates = [
                { token: 'intelligence', probability: 0.92 },
                { token: 'flower', probability: 0.02 },
                { token: 'flavor', probability: 0.01 },
                { token: 'selection', probability: 0.05 }
            ];
        } else if (lastToken === 'machine') {
            candidates = [
                { token: 'learning', probability: 0.88 },
                { token: 'gun', probability: 0.05 },
                { token: 'turning', probability: 0.02 },
                { token: 'washable', probability: 0.05 }
            ];
        } else if (lastToken === 'jingle') {
            candidates = [
                { token: 'bells', probability: 0.99 },
                { token: 'balls', probability: 0.005 },
                { token: 'smells', probability: 0.005 }
            ];
        }

        return candidates.sort((a, b) => b.probability - a.probability);
    }, [tokens]);

    const runSimulation = useCallback(() => {
        if (!inputText) return;

        setIsPlaying(true);
        setCurrentStep('tokenization');
        setIsPaused(false);
        setIsComplete(false);

        // Process Data
        const t = tokenize(inputText);
        setTokens(t);
        setSubTokens(visualTokenize(inputText));
        setVectors(vectorize(t));
        setAttentionWeights(calculateAttention(t));
        setPredictions(predict());
    }, [inputText, tokenize, vectorize, calculateAttention, predict]);

    // Derived state
    const hasData = tokens.length > 0;

    // Manual Step Advance
    const nextStep = useCallback(() => {
        const nextIndex = STEP_ORDER.indexOf(currentStep) + 1;
        if (nextIndex < STEP_ORDER.length) {
            const next = STEP_ORDER[nextIndex];
            setCurrentStep(next);
            if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
            if (next === 'idle') {
                setIsPlaying(false);
                setIsComplete(true);
            }
        } else {
            setIsPlaying(false);
            setIsComplete(true);
        }
    }, [currentStep]);

    // Step Back
    const prevStep = useCallback(() => {
        const idx = ACTIVE_STEPS.indexOf(currentStep);
        if (idx > 0) {
            setCurrentStep(ACTIVE_STEPS[idx - 1]);
            if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
        }
    }, [currentStep]);

    // Jump to any step directly (ensures data is populated)
    const jumpToStep = useCallback((step: DNAStep) => {
        if (step === 'idle') return;
        // If no data yet, run the simulation first then jump
        if (!hasData && inputText) {
            const t = tokenize(inputText);
            setTokens(t);
            setSubTokens(visualTokenize(inputText));
            setVectors(vectorize(t));
            setAttentionWeights(calculateAttention(t));
            setPredictions(predict());
        }
        setCurrentStep(step);
        setIsPlaying(true);
        setIsPaused(true); // Pause on the jumped-to step so user can explore
        setIsComplete(false);
        if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    }, [hasData, inputText, tokenize, vectorize, calculateAttention, predict]);

    // The Game Loop
    useEffect(() => {
        // Clear previous timer
        if (stepTimerRef.current) {
            clearTimeout(stepTimerRef.current);
        }

        if (!isPlaying) return;
        if (isPaused) return;
        if (activeLesson) return; // Pause if lesson is open
        if (currentStep === 'idle') return;

        const nextIndex = STEP_ORDER.indexOf(currentStep) + 1;
        if (nextIndex >= STEP_ORDER.length) {
            setIsPlaying(false);
            return;
        }

        // Calculate Next Step
        const nextStepName = STEP_ORDER[nextIndex];
        const duration = BASE_STEP_DURATION / playbackSpeed;

        stepTimerRef.current = setTimeout(() => {
            setCurrentStep(nextStepName);
            if (nextStepName === 'idle') {
                setIsPlaying(false);
                setIsComplete(true);
            }
        }, duration);

        return () => {
            if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
        };
    }, [currentStep, isPlaying, isPaused, activeLesson, playbackSpeed]);


    const resetSimulation = () => {
        setCurrentStep('idle');
        setIsPlaying(false);
        setIsPaused(false);
        setIsComplete(false);
        setTokens([]);
        setSubTokens([]);
        setVectors([]);
        setAttentionWeights([]);
        setPredictions([]);
    };

    const togglePause = () => setIsPaused(prev => !prev);
    const openLesson = (step: DNAStep) => {
        setActiveLesson(step);
        setIsPaused(true); // Auto-pause when opening lesson
    };
    const closeLesson = () => {
        setActiveLesson(null);
    };

    return (
        <DNAContext.Provider value={{
            inputText,
            setInputText,
            currentStep,
            isPlaying,
            isPaused,
            playbackSpeed,
            activeLesson,
            tokens,
            subTokens,
            vectors,
            attentionWeights,
            predictions,
            isComplete,
            hasData,
            runSimulation,
            resetSimulation,
            nextStep,
            prevStep,
            jumpToStep,
            setPlaybackSpeed,
            togglePause,
            openLesson,
            closeLesson
        }}>
            {children}
        </DNAContext.Provider>
    );
}

export function useDNA() {
    const context = useContext(DNAContext);
    if (context === undefined) {
        throw new Error('useDNA must be used within a DNAProvider');
    }
    return context;
}
