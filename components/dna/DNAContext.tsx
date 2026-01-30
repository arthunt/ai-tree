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

    // Actions
    runSimulation: () => void;
    resetSimulation: () => void;
    nextStep: () => void;
    setPlaybackSpeed: (speed: number) => void;
    togglePause: () => void;
    openLesson: (step: DNAStep) => void;
    closeLesson: () => void;
}

const DNAContext = createContext<DNAContextType | undefined>(undefined);

const STEP_ORDER: DNAStep[] = ['tokenization', 'vectorizing', 'attention', 'prediction', 'idle'];
const BASE_STEP_DURATION = 4000; // 4 seconds per step at 1.0 speed

export function DNAProvider({ children }: { children: React.ReactNode }) {
    const [inputText, setInputText] = useState("");
    const [currentStep, setCurrentStep] = useState<DNAStep>('idle');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(0.5); // Default to slower 0.5x as per US-152
    const [activeLesson, setActiveLesson] = useState<DNAStep | null>(null);

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

    // Simple "Toy" Vectorizer (Random numbers)
    const vectorize = useCallback((tokens: string[]) => {
        return tokens.map(() => [Math.random(), Math.random(), Math.random()]);
    }, []);

    // Simple "Toy" Attention (Random connections)
    const calculateAttention = useCallback((tokens: string[]) => {
        const weights = [];
        for (let i = 1; i < tokens.length; i++) {
            for (let j = Math.max(0, i - 3); j < i; j++) {
                if (Math.random() > 0.3) {
                    weights.push({
                        fromIndex: i,
                        toIndex: j,
                        strength: Math.random()
                    });
                }
            }
        }
        return weights;
    }, []);

    // Simple "Toy" Predictor
    const predict = useCallback(() => {
        const candidates = ['sky', 'blue', 'future', 'dream', 'code', 'human', 'ai'];
        const probs = [];
        let remaining = 1.0;
        for (let i = 0; i < 4; i++) {
            const p = Math.random() * (remaining * 0.8);
            remaining -= p;
            probs.push({
                token: candidates[Math.floor(Math.random() * candidates.length)],
                probability: p
            });
        }
        probs.push({ token: "...", probability: remaining });
        return probs.sort((a, b) => b.probability - a.probability);
    }, []);

    const runSimulation = useCallback(() => {
        if (!inputText) return;

        setIsPlaying(true);
        setCurrentStep('tokenization');
        setIsPaused(false);

        // Process Data
        const t = tokenize(inputText);
        setTokens(t);
        setSubTokens(visualTokenize(inputText));
        setVectors(vectorize(t));
        setAttentionWeights(calculateAttention(t));
        setPredictions(predict());
    }, [inputText, tokenize, vectorize, calculateAttention, predict]);

    // Manual Step Advance
    const nextStep = useCallback(() => {
        const nextIndex = STEP_ORDER.indexOf(currentStep) + 1;
        if (nextIndex < STEP_ORDER.length) {
            setCurrentStep(STEP_ORDER[nextIndex]);
            // Reset timer loop
            if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
        } else {
            setIsPlaying(false);
        }
    }, [currentStep]);

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
            runSimulation,
            resetSimulation,
            nextStep,
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
