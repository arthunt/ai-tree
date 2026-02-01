"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SproutContextType {
    growthLevel: number; // 0 to 100
    connectedNodes: string[]; // IDs of "Context Bubbles" successfully connected
    isComplete: boolean;
    connectNode: (nodeId: string) => void;
    reset: () => void;
}

const SproutContext = createContext<SproutContextType | undefined>(undefined);

export function SproutProvider({ children }: { children: ReactNode }) {
    const [connectedNodes, setConnectedNodes] = useState<string[]>([]);

    // Each node adds 33% growth. 3 nodes = 100% (roughly)
    const growthLevel = Math.min(connectedNodes.length * 34, 100);
    const isComplete = growthLevel >= 100;

    const connectNode = (nodeId: string) => {
        if (!connectedNodes.includes(nodeId)) {
            setConnectedNodes(prev => [...prev, nodeId]);
            // TODO: Trigger haptic feedback here if available
        }
    };

    const reset = () => {
        setConnectedNodes([]);
    };

    return (
        <SproutContext.Provider value={{ growthLevel, connectedNodes, isComplete, connectNode, reset }}>
            {children}
        </SproutContext.Provider>
    );
}

export function useSproutContext() {
    const context = useContext(SproutContext);
    if (context === undefined) {
        throw new Error('useSproutContext must be used within a SproutProvider');
    }
    return context;
}
