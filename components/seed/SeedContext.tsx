"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type SeedPhase = 'selection' | 'processing' | 'training' | 'complete';

export type DataSourceId = 'common-crawl' | 'github' | 'wikipedia' | 'books' | 'arxiv';

interface DataSource {
    id: DataSourceId;
    label: string;
    size: string;
    description: string;
    color: string;
}

export const DATA_SOURCES: DataSource[] = [
    { id: 'common-crawl', label: 'Common Crawl', size: '3 PB', description: 'Raw web data', color: '#10b981' }, // Emerald
    { id: 'github', label: 'GitHub Code', size: '200 TB', description: 'Programming logic', color: '#3b82f6' }, // Blue
    { id: 'wikipedia', label: 'Wikipedia', size: '50 GB', description: 'Fact-based knowledge', color: '#f59e0b' }, // Amber
    { id: 'books', label: 'Books3', size: '800 GB', description: 'Narrative structure', color: '#8b5cf6' }, // Purple
    { id: 'arxiv', label: 'ArXiv Papers', size: '2 TB', description: 'Scientific reasoning', color: '#ef4444' }, // Red
];

interface SeedContextType {
    phase: SeedPhase;
    setPhase: (phase: SeedPhase) => void;

    // Selection Phase
    selectedSources: Set<DataSourceId>;
    toggleSource: (id: DataSourceId) => void;

    // Training Phase
    progress: number; // 0-100
    epoch: number;
    loss: number;

    // Actions
    startProcessing: () => void;
    startTraining: () => void;
    reset: () => void;
}

const SeedContext = createContext<SeedContextType | undefined>(undefined);

export function SeedProvider({ children }: { children: ReactNode }) {
    const [phase, setPhase] = useState<SeedPhase>('selection');
    const [selectedSources, setSelectedSources] = useState<Set<DataSourceId>>(new Set());

    // Training State
    const [progress, setProgress] = useState(0);
    const [epoch, setEpoch] = useState(0);
    const [loss, setLoss] = useState(4.5); // Starting loss

    const toggleSource = useCallback((id: DataSourceId) => {
        if (phase !== 'selection') return;

        setSelectedSources(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }, [phase]);

    const startProcessing = useCallback(() => {
        if (selectedSources.size === 0) return;
        setPhase('processing');

        // Simulate data cleaning/compression (2 seconds)
        setTimeout(() => {
            setPhase('training');
        }, 2000);
    }, [selectedSources]);

    const startTraining = useCallback(() => {
        setPhase('training');
    }, []);

    const reset = useCallback(() => {
        setPhase('selection');
        setSelectedSources(new Set());
        setProgress(0);
        setEpoch(0);
        setLoss(4.5);
    }, []);

    // Training Loop Simulation
    useEffect(() => {
        if (phase !== 'training') return;

        const totalSteps = 100;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const pct = (currentStep / totalSteps) * 100;

            setProgress(pct);
            setEpoch(Math.floor(currentStep / 10)); // 10 epochs total

            // Simulate Loss Curve (Exponential decay with noise)
            setLoss(prev => {
                const target = 0.5; // Final loss
                const decay = 0.95;
                const noise = (Math.random() - 0.5) * 0.1;
                return Math.max(0.1, (prev * decay) + noise);
            });

            if (currentStep >= totalSteps) {
                clearInterval(interval);
                setPhase('complete');
            }
        }, 50); // 5 seconds total training time

        return () => clearInterval(interval);
    }, [phase]);

    return (
        <SeedContext.Provider value={{
            phase,
            setPhase,
            selectedSources,
            toggleSource,
            progress,
            epoch,
            loss,
            startProcessing,
            startTraining,
            reset
        }}>
            {children}
        </SeedContext.Provider>
    );
}

export function useSeed() {
    const context = useContext(SeedContext);
    if (context === undefined) {
        throw new Error('useSeed must be used within a SeedProvider');
    }
    return context;
}
