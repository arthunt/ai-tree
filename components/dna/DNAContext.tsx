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

    const runSimulation = useCallback(() => {
        if (!inputText) return;

        setIsPlaying(true);
        setCurrentStep('tokenization');

        // Process Data
        const t = tokenize(inputText);
        setTokens(t);
        setVectors(vectorize(t));

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

    }, [inputText, tokenize, vectorize]);

    const resetSimulation = () => {
        setCurrentStep('idle');
        setIsPlaying(false);
        setTokens([]);
        setVectors([]);
    };

    return (
        <DNAContext.Provider value={{
            inputText,
            setInputText,
            currentStep,
            isPlaying,
            tokens,
            vectors,
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
