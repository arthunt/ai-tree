"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { DNAComponentType } from '@/lib/supabase';

// The steps of the simulation
export type DNAStep = 'idle' | 'tokenization' | 'vectorizing' | 'attention' | 'prediction';

interface DNAContextType {
    // Input State
    inputText: string;
    setInputText: (text: string) => void;

    // Simulation State
    currentStep: DNAStep;
    isPlaying: boolean;

    // Data State (Mock or Real)
    tokens: string[];
    vectors: number[][]; // Simplified 2D representation for visualization
    attentionWeights: { fromIndex: number; toIndex: number; strength: number }[];
    predictions: { token: string; probability: number }[];

    // Actions
    runSimulation: () => void;
    resetSimulation: () => void;
}

const DNAContext = createContext<DNAContextType | undefined>(undefined);

export function DNAProvider({ children }: { children: React.ReactNode }) {
    const [inputText, setInputText] = useState("");
    const [currentStep, setCurrentStep] = useState<DNAStep>('idle');
    const [isPlaying, setIsPlaying] = useState(false);
    const [tokens, setTokens] = useState<string[]>([]);
    const [vectors, setVectors] = useState<number[][]>([]);
    const [predictions, setPredictions] = useState<{ token: string; probability: number }[]>([]);
    const [attentionWeights, setAttentionWeights] = useState<{ fromIndex: number; toIndex: number; strength: number }[]>([]);

    // Simple "Toy" Tokenizer
    const tokenize = useCallback((text: string) => {
        // Split by space for simplicity, but keep punctuation
        return text.trim().split(/\s+/).filter(t => t.length > 0);
    }, []);

    // Simple "Toy" Vectorizer (Random numbers)
    const vectorize = useCallback((tokens: string[]) => {
        // Create a 3x3 matrix for each token just for visuals
        return tokens.map(() => [Math.random(), Math.random(), Math.random()]);
    }, []);

    // Simple "Toy" Attention (Random connections)
    const calculateAttention = useCallback((tokens: string[]) => {
        const weights = [];
        // Connect each token to 1-2 previous tokens
        for (let i = 1; i < tokens.length; i++) {
            // Look back
            for (let j = Math.max(0, i - 3); j < i; j++) {
                if (Math.random() > 0.3) {
                    weights.push({
                        fromIndex: i,
                        toIndex: j,
                        strength: Math.random() // 0-1 opacity
                    });
                }
            }
        }
        return weights;
    }, []);

    // Simple "Toy" Predictor
    const predict = useCallback(() => {
        // Return random "next word" candidates
        const candidates = ['sky', 'blue', 'future', 'dream', 'code', 'human', 'ai'];
        const probs = [];
        let remaining = 1.0;

        // Generate 4 random probabilities
        for (let i = 0; i < 4; i++) {
            const p = Math.random() * (remaining * 0.8);
            remaining -= p;
            probs.push({
                token: candidates[Math.floor(Math.random() * candidates.length)],
                probability: p
            });
        }
        // Add remaining to a final candidate
        probs.push({ token: "...", probability: remaining });
        return probs.sort((a, b) => b.probability - a.probability);
    }, []);

    const runSimulation = useCallback(() => {
        if (!inputText) return;

        setIsPlaying(true);
        setCurrentStep('tokenization');

        // Process Data
        const t = tokenize(inputText);
        setTokens(t);
        setVectors(vectorize(t));
        setAttentionWeights(calculateAttention(t));
        setPredictions(predict());

        // Timeline
        // 1. Tokenize (Show chunks)
        setTimeout(() => {
            setCurrentStep('vectorizing');
        }, 2000);

        // 2. Vectorize (Show numbers)
        setTimeout(() => {
            setCurrentStep('attention');
        }, 5000);

        // 3. Attention (Show lines)
        setTimeout(() => {
            setCurrentStep('prediction');
        }, 8000);

        // 4. Finish
        setTimeout(() => {
            setIsPlaying(false);
            // Stick on prediction or go back to idle? Stick for now.
        }, 11000);

    }, [inputText, tokenize, vectorize, calculateAttention, predict]);

    const resetSimulation = () => {
        setCurrentStep('idle');
        setIsPlaying(false);
        setTokens([]);
        setVectors([]);
        setAttentionWeights([]);
        setPredictions([]);
    };

    return (
        <DNAContext.Provider value={{
            inputText,
            setInputText,
            currentStep,
            isPlaying,
            tokens,
            vectors,
            attentionWeights,
            predictions,
            runSimulation,
            resetSimulation
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
