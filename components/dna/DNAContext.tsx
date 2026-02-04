"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { DNAComponentType } from '@/lib/supabase';
import { visualTokenize } from './TokenizationSlicer';

// The steps of the simulation
export type DNAStep = 'idle' | 'tokenization' | 'vectorizing' | 'attention' | 'prediction';

// Card states for vertical accordion pattern (Phase 10)
export type CardState = 'locked' | 'active' | 'collapsed';

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
    completedSteps: Set<DNAStep>; // Steps that have been visited/completed

    // Phase 10: Vertical Accordion Card States
    cardStates: Record<DNAStep, CardState>;
    showOrientation: boolean;
    deepDiveStep: DNAStep | null;

    // Actions
    runSimulation: (overrideText?: string) => void;
    resetSimulation: () => void;
    nextStep: () => void;
    prevStep: () => void;
    jumpToStep: (step: DNAStep) => void;
    setPlaybackSpeed: (speed: number) => void;
    togglePause: () => void;
    openLesson: (step: DNAStep) => void;
    closeLesson: () => void;

    // Phase 10: Card State Actions
    expandCard: (step: DNAStep) => void;
    collapseCard: (step: DNAStep) => void;
    openDeepDive: (step: DNAStep) => void;
    closeDeepDive: () => void;
    dismissOrientation: () => void;

    // View Mode
    viewMode: 'stack' | 'grid';
    toggleViewMode: () => void;
}

const DNAContext = createContext<DNAContextType | undefined>(undefined);

const STEP_ORDER: DNAStep[] = ['tokenization', 'vectorizing', 'attention', 'prediction', 'idle'];
const BASE_STEP_DURATION = 5000; // 5 seconds per step at 1x speed (slower for learning)

// Active simulation steps (without terminal 'idle')
const ACTIVE_STEPS: DNAStep[] = ['tokenization', 'vectorizing', 'attention', 'prediction'];

// Initial card states: all locked except idle
const INITIAL_CARD_STATES: Record<DNAStep, CardState> = {
    idle: 'locked',
    tokenization: 'locked',
    vectorizing: 'locked',
    attention: 'locked',
    prediction: 'locked'
};

export function DNAProvider({ children }: { children: React.ReactNode }) {
    const [inputText, setInputText] = useState("");
    const [currentStep, setCurrentStep] = useState<DNAStep>('idle');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0); // Default 1x speed (4 seconds per step)
    const [activeLesson, setActiveLesson] = useState<DNAStep | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [completedSteps, setCompletedSteps] = useState<Set<DNAStep>>(new Set());

    // Phase 10: Vertical Accordion States
    const [cardStates, setCardStates] = useState<Record<DNAStep, CardState>>(INITIAL_CARD_STATES);
    const [showOrientation, setShowOrientation] = useState(true);
    const [deepDiveStep, setDeepDiveStep] = useState<DNAStep | null>(null);
    const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');

    const toggleViewMode = () => {
        setViewMode(prev => {
            const next = prev === 'stack' ? 'grid' : 'stack';
            localStorage.setItem('dna-view-mode', next);
            return next;
        });
    };

    // Initialize view mode from local storage
    useEffect(() => {
        const saved = localStorage.getItem('dna-view-mode');
        if (saved === 'grid') setViewMode('grid');
    }, []);

    const params = useParams();
    const locale = (params?.locale as string) || 'en';

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
            const isEt = locale === 'et';
            const isRu = locale === 'ru';

            // Cluster 1: Nature/Forest (Legacy) + Animals (New)
            const nature = isEt
                ? ['mets', 'puu', 'juur', 'seen', 'sammal', 'koer', 'kass', 'loom']
                : isRu
                    ? ['лес', 'дерево', 'корень', 'гриб', 'собака']
                    : ['forest', 'tree', 'root', 'mushroom', 'moss', 'dog'];

            if (nature.some(k => lower.includes(k))) {
                return [0.75 + (Math.random() * 0.1), 0.75 + (Math.random() * 0.1)];
            }

            // Cluster 2: Technology/AI
            const tech = isEt
                ? ['ai', 'tehisintellekt', 'robot', 'arvuti', 'kood']
                : isRu
                    ? ['ии', 'интеллект', 'робот', 'компьютер']
                    : ['ai', 'intelligence', 'robot', 'computer', 'code'];

            if (tech.some(k => lower.includes(k))) {
                return [0.25 + (Math.random() * 0.1), 0.25 + (Math.random() * 0.1)];
            }

            // Cluster 3: Human/Social (New for "inimese parim")
            const human = isEt
                ? ['inimene', 'inimese', 'naine', 'mees', 'laps', 'parim', 'sõber']
                : isRu
                    ? ['человек', 'друг', 'лучший']
                    : ['human', 'friend', 'best', 'man', 'woman'];

            if (human.some(k => lower.includes(k))) {
                return [0.45 + (Math.random() * 0.1), 0.72 + (Math.random() * 0.1)];
            }

            // Special Case: "on" (Function word) - Move to top-left
            if (lower === 'on' || lower === 'is' || lower === 'the') {
                return [0.15, 0.20]; // Far top-left
            }

            // Random scatter
            return [Math.random(), Math.random()];
        });
    }, [locale]);

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
                if (prev === 'tehis' && current === 'intellekt') strength = 0.98; // Estonian compound split
                if (prev === 'machine' && current === 'learning') strength = 0.95;
                if (prev === 'masin' && current === 'õpe') strength = 0.95;

                // Nature metaphors
                if ((prev === 'mets' || prev === 'puu') && (current === 'kohiseb' || current === 'kasvab')) strength = 0.85;
                if (prev === 'mets' && current === 'puu') strength = 0.90;
                if (prev === 'puu' && current === 'elu') strength = 0.80;

                if (strength > 0.4) {
                    weights.push({ fromIndex: i, toIndex: j, strength });
                }
            }
        }

        // Fallback: If no strong connections found, add a few random ones to illustrate the concept
        if (weights.length < 2 && tokens.length > 2) {
            for (let i = 1; i < tokens.length; i++) {
                // Force a connection to the previous word
                weights.push({
                    fromIndex: i,
                    toIndex: Math.max(0, i - 1),
                    strength: 0.45 + (Math.random() * 0.2)
                });
            }
        }

        return weights.sort((a, b) => b.strength - a.strength); // Strongest first
    }, []);

    // Smart Mock Predictor
    const predict = useCallback((currentTokens?: string[]) => {
        // Context-aware predictions based on last token (mock)
        const tokensToUse = currentTokens || tokens;
        const lastToken = tokensToUse.length > 0 ? tokensToUse[tokensToUse.length - 1].toLowerCase() : "";
        const isEt = locale === 'et';

        // Default Candidates
        let candidates = isEt
            ? [
                { token: 'on', probability: 0.15 },
                { token: 'ja', probability: 0.12 },
                { token: 'kui', probability: 0.10 },
                { token: 'mis', probability: 0.08 }
            ]
            : [
                { token: 'and', probability: 0.1 },
                { token: 'the', probability: 0.1 },
                { token: 'is', probability: 0.1 },
                { token: 'future', probability: 0.05 }
            ];

        // Override for specific contexts
        if (lastToken === 'tehisintellekt') {
            if (isEt) {
                candidates = [
                    { token: 'on', probability: 0.65 },
                    { token: 'suudab', probability: 0.20 },
                    { token: 'muudab', probability: 0.10 }
                ];
            }
        } else if (lastToken === 'mets' || lastToken === 'puu') {
            if (isEt) {
                candidates = [
                    { token: 'kohiseb', probability: 0.55 },
                    { token: 'kasvab', probability: 0.35 },
                    { token: 'on', probability: 0.08 }
                ];
            }
        } else if (lastToken === 'parim' || lastToken === 'koer') { // New sentence context
            if (isEt) {
                candidates = [
                    { token: 'sõber', probability: 0.78 },
                    { token: 'kaaslane', probability: 0.09 },
                    { token: 'semu', probability: 0.07 },
                    { token: 'lemmik', probability: 0.06 }
                ];
            }
        } else if (lastToken === 'machine') {
            if (!isEt) {
                candidates = [
                    { token: 'learning', probability: 0.88 },
                    { token: 'gun', probability: 0.05 },
                    { token: 'turning', probability: 0.02 }
                ];
            }
        }

        return candidates.sort((a, b) => b.probability - a.probability);
    }, [tokens, locale]);

    const runSimulation = useCallback((overrideText?: string) => {
        const textToUse = overrideText ?? inputText;
        if (!textToUse) return;

        // If override text provided, also update the input field
        if (overrideText) {
            setInputText(overrideText);
        }

        setIsPlaying(true);
        setCurrentStep('tokenization');
        setIsPaused(false);
        setIsComplete(false);
        setShowOrientation(false);

        // Phase 10: Update card states - first card active, rest locked
        setCardStates({
            idle: 'locked',
            tokenization: 'active',
            vectorizing: 'locked',
            attention: 'locked',
            prediction: 'locked'
        });

        // Process Data
        const t = tokenize(textToUse);
        setTokens(t);
        // NEW-4 Simplification: Use whole words (4 tokens) instead of BPE sub-tokens (8)
        setSubTokens(t);
        setVectors(vectorize(t));
        setAttentionWeights(calculateAttention(t));
        setPredictions(predict(t));
    }, [inputText, tokenize, vectorize, calculateAttention, predict]);

    // Derived state
    const hasData = tokens.length > 0;

    // Manual Step Advance
    const nextStep = useCallback(() => {
        const nextIndex = STEP_ORDER.indexOf(currentStep) + 1;
        if (nextIndex < STEP_ORDER.length) {
            const next = STEP_ORDER[nextIndex];
            setCompletedSteps(prev => new Set(prev).add(currentStep));

            // Phase 10: Update card states - collapse current, activate next
            setCardStates(prev => ({
                ...prev,
                [currentStep]: 'collapsed',
                [next]: next === 'idle' ? 'collapsed' : 'active'
            }));

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

        // Phase 11: Dynamic Step Durations (Slower for educational pacing)
        const STEP_DURATIONS: Record<DNAStep, number> = {
            idle: 1000,
            tokenization: 10000, // 8s animation + 2s pause
            vectorizing: 8000,   // ~5s animation + 3s pause
            attention: 8000,     // ~5s animation + 3s pause
            prediction: 9000     // ~6s animation + 3s pause
        };

        const baseDuration = STEP_DURATIONS[currentStep] || BASE_STEP_DURATION;
        const duration = baseDuration / playbackSpeed;

        stepTimerRef.current = setTimeout(() => {
            // Mark current step as completed before advancing
            setCompletedSteps(prev => new Set(prev).add(currentStep));

            // Phase 10: Update card states - collapse current, activate next
            setCardStates(prev => ({
                ...prev,
                [currentStep]: 'collapsed',
                [nextStepName]: nextStepName === 'idle' ? 'collapsed' : 'active'
            }));

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
        setCompletedSteps(new Set());
        setTokens([]);
        setSubTokens([]);
        setVectors([]);
        setAttentionWeights([]);
        setPredictions([]);
        // Phase 10: Reset card states and show orientation
        setCardStates(INITIAL_CARD_STATES);
        setShowOrientation(true);
        setDeepDiveStep(null);
    };

    const togglePause = () => setIsPaused(prev => !prev);
    const openLesson = (step: DNAStep) => {
        setActiveLesson(step);
        setIsPaused(true); // Auto-pause when opening lesson
    };
    const closeLesson = () => {
        setActiveLesson(null);
    };

    // Phase 10: Card State Actions
    const expandCard = useCallback((step: DNAStep) => {
        if (step === 'idle') return;
        // Can only expand completed or active cards, not locked
        if (cardStates[step] === 'locked') return;

        setCardStates(prev => {
            const newStates = { ...prev };
            // Collapse all other active cards
            ACTIVE_STEPS.forEach(s => {
                if (newStates[s] === 'active' && s !== step) {
                    newStates[s] = 'collapsed';
                }
            });
            // Expand the target card
            newStates[step] = 'active';
            return newStates;
        });

        // Jump to this step and resume playback
        setCurrentStep(step);
        setIsPlaying(true);
        setIsPaused(false);

        // Clear any existing timer so the game loop restarts cleanly
        if (stepTimerRef.current) {
            clearTimeout(stepTimerRef.current);
        }
    }, [cardStates]);

    const collapseCard = useCallback((step: DNAStep) => {
        if (step === 'idle') return;
        setCardStates(prev => ({
            ...prev,
            [step]: 'collapsed'
        }));
    }, []);

    const openDeepDive = useCallback((step: DNAStep) => {
        if (step === 'idle') return;
        setDeepDiveStep(step);
        setIsPaused(true); // Auto-pause when opening deep dive
    }, []);

    const closeDeepDive = useCallback(() => {
        setDeepDiveStep(null);
    }, []);

    const dismissOrientation = useCallback(() => {
        setShowOrientation(false);
    }, []);

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
            completedSteps,
            // Phase 10: Vertical Accordion States
            cardStates,
            showOrientation,
            deepDiveStep,
            // Actions
            runSimulation,
            resetSimulation,
            nextStep,
            prevStep,
            jumpToStep,
            setPlaybackSpeed,
            togglePause,
            openLesson,
            closeLesson,
            // Phase 10: Card State Actions
            expandCard,
            collapseCard,
            openDeepDive,
            closeDeepDive,
            dismissOrientation,
            // Desktop View Mode
            viewMode,
            toggleViewMode
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
