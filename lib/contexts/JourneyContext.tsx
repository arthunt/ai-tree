"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type EvolutionStage = 'dna' | 'seed' | 'sprout' | 'tree' | 'fruits' | 'orchard';

interface JourneyContextType {
    currentStage: EvolutionStage;
    targetStage: EvolutionStage | null; // For optimistic updates or transitions
    setStage: (stage: EvolutionStage) => void;
    intent: string | null;
    setIntent: (intent: string) => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export function JourneyProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Extract locale from pathname (simple heuristic: first segment)
    const locale = pathname?.split('/')[1] || 'en';

    // Deduce initial stage from URL
    const getStageFromUrl = (): EvolutionStage => {
        if (pathname?.includes('/dna')) return 'dna';
        if (pathname?.includes('/seed')) return 'seed';
        if (pathname?.includes('/sprout')) return 'sprout';
        if (pathname?.includes('/tree-view')) {
            // Check query params if we want to be specific, but for now default to 'tree'
            // and let the component logic decide based on zoom level if it wants to be 'sprout'
            return 'tree';
        }
        if (pathname?.includes('/fruits')) return 'fruits';
        if (pathname?.includes('/orchard')) return 'orchard';
        return 'dna'; // Default
    };

    const [currentStage, setCurrentStageState] = useState<EvolutionStage>(getStageFromUrl());
    const [targetStage, setTargetStage] = useState<EvolutionStage | null>(null);
    const [intent, setIntentState] = useState<string | null>(null);

    // Sync with URL changes
    useEffect(() => {
        const stage = getStageFromUrl();
        setCurrentStageState(stage);
        setTargetStage(null); // Clear target once we arrive
    }, [pathname]);

    // Initialize Intent from URL or LocalStorage
    useEffect(() => {
        const urlIntent = searchParams?.get('intent');
        if (urlIntent) {
            setIntentState(urlIntent);
            localStorage.setItem('dendrix_intent', urlIntent);
        } else {
            const stored = localStorage.getItem('dendrix_intent');
            if (stored) setIntentState(stored);
        }
    }, [searchParams]);

    const setIntent = (newIntent: string) => {
        setIntentState(newIntent);
        localStorage.setItem('dendrix_intent', newIntent);
    };

    /**
     * Main Navigation Function
     */
    const setStage = (stage: EvolutionStage) => {
        setTargetStage(stage);

        switch (stage) {
            case 'dna':
                if (!pathname?.includes('/dna')) router.push(`/${locale}/dna`);
                break;
            case 'seed':
                if (!pathname?.includes('/seed')) router.push(`/${locale}/seed`);
                break;
            case 'sprout':
                if (!pathname?.includes('/sprout')) router.push(`/${locale}/sprout`);
                break;
            case 'tree':
                if (!pathname?.includes('/tree-view')) {
                    const intentParam = intent ? `?intent=${intent}` : '';
                    router.push(`/${locale}/tree-view${intentParam}`);
                }
                // If we ARE on tree-view, we don't navigate.
                // The TreeView component listens to `targetStage` from this context 
                // and adjusts its Zoom/LOD accordingly.
                break;
            case 'fruits':
                if (!pathname?.includes('/fruits')) router.push(`/${locale}/fruits`);
                break;
            case 'orchard':
                if (!pathname?.includes('/orchard')) router.push(`/${locale}/orchard`);
                break;
        }

        setCurrentStageState(stage);
    };

    return (
        <JourneyContext.Provider value={{ currentStage, targetStage, setStage, intent, setIntent }}>
            {children}
        </JourneyContext.Provider>
    );
}

export function useJourney() {
    const context = useContext(JourneyContext);
    if (context === undefined) {
        throw new Error('useJourney must be used within a JourneyProvider');
    }
    return context;
}
