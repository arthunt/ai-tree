"use client";

import React, { useState } from 'react';
import { OrganicTreeDiagram } from '@/components/OrganicTreeDiagram';
import type { TreeLevel, Concept } from '@/lib/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const MOCK_LEVELS: TreeLevel[] = [
    { id: 'leaves', name: 'Leaves', subtitle: 'Applications', description: 'Real-world uses', color: '#7c3aed', order: 4 },
    { id: 'branches', name: 'Branches', subtitle: 'Capabilities', description: 'What models can do', color: '#2563eb', order: 3 },
    { id: 'trunk', name: 'Trunk', subtitle: 'Techniques', description: 'Core methods', color: '#d97706', order: 2 },
    { id: 'roots', name: 'Roots', subtitle: 'Foundations', description: 'Basic building blocks', color: '#059669', order: 1 },
];

const MOCK_CONCEPTS: Concept[] = [
    // ROOTS
    {
        id: "tokens",
        level: "roots",
        title: "Tokens",
        simpleName: "Tokens",
        explanation: "Small chunks of text.",
        metaphor: "Puzzle pieces.",
        icon: "Grid",
        complexity: 1
    },
    {
        id: "vectors",
        level: "roots",
        title: "Vectors",
        simpleName: "Numbers",
        explanation: "Meaning as numbers.",
        metaphor: "Map coordinates.",
        icon: "Network",
        complexity: 1
    },
    {
        id: "attention",
        level: "roots",
        title: "Attention",
        simpleName: "Focus",
        explanation: "Connecting related words.",
        metaphor: "Spotlight.",
        icon: "Eye",
        complexity: 2
    },
    {
        id: "prefill-decode",
        level: "roots",
        title: "Prefill & Decode",
        simpleName: "Processing",
        explanation: "Reading input vs generating output.",
        metaphor: "Reading vs Writing.",
        icon: "Cpu",
        complexity: 3
    },

    // TRUNK
    {
        id: "security",
        level: "trunk",
        title: "AI Security",
        simpleName: "Safety",
        explanation: "Protecting models from misuse.",
        metaphor: "Firewall.",
        icon: "Shield",
        complexity: 2
    },
    {
        id: "lora",
        level: "trunk",
        title: "LoRA",
        simpleName: "Adapters",
        explanation: "Efficient fine-tuning.",
        metaphor: "Post-it notes in a textbook.",
        icon: "Layers",
        complexity: 3
    },
    {
        id: "memory",
        level: "trunk",
        title: "Memory",
        simpleName: "Recall",
        explanation: "Remembering past interactions.",
        metaphor: "Notebook.",
        icon: "HardDrive",
        complexity: 2
    },
    {
        id: "rag",
        level: "trunk",
        title: "RAG",
        simpleName: "Reference",
        explanation: "Retrieval Augmented Generation.",
        metaphor: "Open book test.",
        icon: "Library",
        complexity: 2
    },
    {
        id: "context-engineering",
        level: "trunk",
        title: "Context Eng.",
        simpleName: "Context",
        explanation: "Optimizing input for the model.",
        metaphor: "Setting the stage.",
        icon: "Maximize",
        complexity: 2
    },

    // BRANCHES
    {
        id: "complexity-levels",
        level: "branches",
        title: "Complexity",
        simpleName: "Depth",
        explanation: "Handling complex tasks.",
        metaphor: "Skill levels.",
        icon: "BarChart",
        complexity: 1
    },
    {
        id: "ai-agents",
        level: "branches",
        title: "AI Agents",
        simpleName: "Agents",
        explanation: "Autonomous AI systems.",
        metaphor: "Digital employees.",
        icon: "Bot",
        complexity: 2
    },
    {
        id: "mcp",
        level: "branches",
        title: "MCP",
        simpleName: "Protocol",
        explanation: "Model Context Protocol.",
        metaphor: "Universal adapter.",
        icon: "Plug",
        complexity: 3
    },

    // LEAVES
    {
        id: "green-ai",
        level: "leaves",
        title: "Green AI",
        simpleName: "Efficiency",
        explanation: "Sustainable AI computing.",
        metaphor: "Electric car.",
        icon: "Leaf",
        complexity: 1
    },
    {
        id: "moe",
        level: "leaves",
        title: "MoE",
        simpleName: "Experts",
        explanation: "Mixture of Experts.",
        metaphor: "Team of specialists.",
        icon: "Users",
        complexity: 3
    },
    {
        id: "reasoning-models",
        level: "leaves",
        title: "Reasoning",
        simpleName: "Thinking",
        explanation: "Models that think before speaking.",
        metaphor: "Show your work.",
        icon: "Brain",
        complexity: 3
    },
    {
        id: "agi-asi",
        level: "leaves",
        title: "AGI / ASI",
        simpleName: "Superintel.",
        explanation: "Artificial General Intelligence.",
        metaphor: "Human-level mind.",
        icon: "Zap",
        complexity: 3
    }
];

export default function FirstPrototypePage() {
    const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 relative">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors z-50">
                <ArrowLeft size={20} />
                <span className="font-medium">Back to App</span>
            </Link>

            <div className="max-w-7xl w-full">
                <div className="text-center mb-12">
                    <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-mono mb-4 uppercase tracking-wider">
                        Restored Prototype v0.9
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">The First Tree</h1>
                    <p className="max-w-2xl mx-auto text-gray-600">
                        This was the original static visualization concept. It uses an organic image approach
                        rather than the generated D3 structure.
                    </p>
                </div>

                <OrganicTreeDiagram
                    levels={MOCK_LEVELS}
                    concepts={MOCK_CONCEPTS}
                    onConceptClick={setSelectedConcept}
                    showSimpleNames={false}
                />
            </div>

            {/* Basic Popup for Concept Details */}
            {selectedConcept && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedConcept(null)}>
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedConcept(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                        <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-gray-100`}>
                            <span className="text-2xl">🌱</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{selectedConcept.title}</h2>
                        <p className="text-gray-500 italic mb-4">"{selectedConcept.metaphor}"</p>
                        <p className="text-gray-700 leading-relaxed">{selectedConcept.explanation}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
