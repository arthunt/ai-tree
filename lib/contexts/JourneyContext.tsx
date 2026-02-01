"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { STAGES, STAGE_HREF_MAP } from '@/lib/stages';
import type { EvolutionStage } from '@/lib/stages';
export type { EvolutionStage } from '@/lib/stages';

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

    // Deduce initial stage from URL using centralized STAGES registry
    const getStageFromUrl = (): EvolutionStage => {
        if (!pathname) return 'dna';
        for (const stage of STAGES) {
            if (pathname.includes(stage.href)) return stage.id;
        }
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

        const href = STAGE_HREF_MAP[stage];
        if (href && !pathname?.includes(href)) {
            const intentParam = stage === 'tree' && intent ? `?intent=${intent}` : '';
            router.push(`/${locale}${href}${intentParam}`);
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
