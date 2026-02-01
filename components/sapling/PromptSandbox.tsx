"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, RotateCcw, Thermometer, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    metrics?: {
        tokens: number;
        cost?: number;
    };
}

interface PromptSandboxProps {
    locale?: string;
    className?: string;
    initialPrompt?: string;
    initialTemp?: number;
    onPromptRun?: (prompt: string) => void;
    onTempChange?: (temp: number) => void;
    onRating?: () => void;
}

// Mock LLM Response generator
const generateMockResponse = (prompt: string, temperature: number): string => {
    const responses = [
        "That's an interesting perspective. Based on the patterns I've learned, I can tell you that...",
        "Here's a simpler way to think about it: imagine a garden where every idea is a seed...",
        "I'm not sure I understand. Could you rephrase that using more specific keywords?",
        "To answer that, we need to look at the underlying data distribution...",
        "Sure! Here is a creative variation: The sky wasn't just blue, it was a deep, electric azure..."
    ];
    // Simple hash
    const index = (prompt.length + Math.floor(temperature * 10)) % responses.length;
    return responses[index];
};

export function PromptSandbox({
    locale,
    className,
    initialPrompt,
    initialTemp,
    onPromptRun,
    onTempChange,
    onRating
}: PromptSandboxProps) {
    const t = useTranslations();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [temperature, setTemperature] = useState(0.7);
    const [history, setHistory] = useState<{ id: string; prompt: string; score: number; attempt: number }[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Effect to handle prop updates (from Module selection)
    useEffect(() => {
        if (initialPrompt) setInput(initialPrompt);
        if (initialTemp !== undefined) setTemperature(initialTemp);
    }, [initialPrompt, initialTemp]);

    // Report temperature changes
    const handleTempChange = (val: number) => {
        setTemperature(val);
        onTempChange?.(val);
    };

    // Auto-scroll needs to be here...



    const calculateScore = (text: string, temp: number) => {
        // Mock scoring logic: rewards length and varying temperature
        const lengthScore = Math.min(60, text.length / 2);
        const tempBonus = (temp > 0.5 && temp < 0.9) ? 20 : 10;
        const varietyScore = Math.floor(Math.random() * 20); // Simulating nuance
        return Math.min(98, lengthScore + tempBonus + varietyScore);
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        // Trigger external event
        onPromptRun?.(input);

        const score = calculateScore(input, temperature);
        const attemptNumber = history.length + 1;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            metrics: { tokens: input.split(' ').length * 1.3 }
        };

        const newHistoryItem = {
            id: userMsg.id,
            prompt: input,
            score,
            attempt: attemptNumber
        };

        setMessages(prev => [...prev, userMsg]);
        setHistory(prev => [newHistoryItem, ...prev]); // Newest first
        setInput('');
        setIsTyping(true);

        // Simulate network delay
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: generateMockResponse(userMsg.content, temperature),
                metrics: { tokens: 20 + Math.random() * 30, cost: score } // Using cost field to pass score for now
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-6 h-[700px]", className)}>

            {/* LEFT PANEL: Controls & History */}
            <div className="lg:col-span-4 flex flex-col gap-4 h-full overflow-hidden">
                <GlassCard className="p-5 bg-emerald-950/40 border-emerald-800/30 flex flex-col h-full">
                    <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
                        <User size={18} />
                        {t('promptSandbox.yourPrompt')}
                    </h3>

                    {/* Temperature */}
                    <div className="mb-4 p-4 rounded-lg bg-emerald-900/20 border border-emerald-800/30">
                        <div className="flex justify-between text-xs text-emerald-200 mb-2">
                            <span className="flex items-center gap-1"><Thermometer size={12} /> {t('promptSandbox.temperature')}</span>
                            <span className="font-mono text-emerald-400">{temperature.toFixed(1)}</span>
                        </div>
                        <input
                            type="range"
                            min="0" max="1" step="0.1"
                            value={temperature}
                            onChange={(e) => handleTempChange(parseFloat(e.target.value))}
                            className="w-full accent-emerald-500 h-1 bg-emerald-900 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Input Area */}
                    <div className="flex-1 flex flex-col min-h-[150px]">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={t('promptSandbox.placeholder')}
                            className="flex-1 w-full bg-black/20 text-white placeholder-emerald-700/50 p-4 rounded-xl border border-emerald-800/30 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 resize-none font-mono text-sm leading-relaxed"
                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isTyping}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-bold text-sm tracking-wide transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
                            >
                                {t('promptSandbox.runPrompt')}
                                <Send size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Iteration History */}
                    {history.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-emerald-800/30 flex-1 overflow-hidden flex flex-col">
                            <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <RotateCcw size={12} />
                                {t('promptSandbox.iterations')}
                            </h4>
                            <div className="overflow-y-auto space-y-2 pr-2 custom-scrollbar flex-1 min-h-[100px]">
                                {history.map((item) => (
                                    <div key={item.id} className="p-3 rounded-lg bg-emerald-900/10 border border-emerald-800/20 hover:bg-emerald-900/20 transition-colors text-xs cursor-pointer group">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-emerald-400 font-mono">#{item.attempt}</span>
                                            <span className={cn(
                                                "px-1.5 py-0.5 rounded text-[10px] font-bold",
                                                item.score > 80 ? "bg-emerald-500/20 text-emerald-300" : "bg-emerald-900/40 text-emerald-500"
                                            )}>
                                                {item.score}%
                                            </span>
                                        </div>
                                        <p className="text-emerald-100/60 line-clamp-2 font-mono group-hover:text-emerald-100/90">{item.prompt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </GlassCard>
            </div>

            {/* RIGHT PANEL: Output / Chat Area */}
            <div className="lg:col-span-8 h-full">
                <GlassCard className="h-full bg-black/20 border-emerald-800/20 flex flex-col overflow-hidden relative">
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-emerald-950/60 border-b border-emerald-800/30 flex items-center px-4 justify-between z-10 backdrop-blur-md">
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                            <Bot size={14} /> {t('promptSandbox.aiOutput')}
                        </span>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500/40"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500/40"></div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 pt-16 space-y-6 scroll-smooth">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-emerald-800/40 select-none">
                                <Bot size={48} className="mb-4 opacity-30" />
                                <p className="text-sm font-medium">{t('promptSandbox.readyMessage')}</p>
                            </div>
                        )}

                        <AnimatePresence>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex gap-4 max-w-3xl",
                                        msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border mt-1",
                                        msg.role === 'user'
                                            ? "bg-stone-800 border-stone-700 text-stone-400"
                                            : "bg-emerald-900 border-emerald-700 text-emerald-400"
                                    )}>
                                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                    </div>

                                    <div className="flex flex-col gap-1 max-w-[85%]">
                                        <div className={cn(
                                            "p-4 rounded-2xl text-sm leading-relaxed",
                                            msg.role === 'user'
                                                ? "bg-stone-800/80 text-stone-200 rounded-tr-none border border-stone-700/50"
                                                : "bg-emerald-900/30 text-emerald-100 border border-emerald-800/30 rounded-tl-none shadow-sm"
                                        )}>
                                            {msg.content}
                                        </div>

                                        {/* Metrics / Score Footer */}
                                        {msg.role === 'assistant' && msg.metrics && msg.metrics.cost && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="self-start flex flex-wrap items-center gap-3 px-2"
                                            >
                                                <div className="flex items-center gap-1.5 text-[10px] text-emerald-500/70 font-mono uppercase tracking-wider bg-emerald-900/20 px-2 py-0.5 rounded-full border border-emerald-500/10">
                                                    <span>{t('promptSandbox.qualityScore')}</span>
                                                    <span className={cn(
                                                        "font-bold",
                                                        msg.metrics.cost > 75 ? "text-emerald-400" : "text-emerald-600"
                                                    )}>{msg.metrics.cost}/100</span>
                                                </div>

                                                {/* Interaction Buttons (New) */}
                                                {onRating && (
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={onRating}
                                                            className="p-1 hover:bg-emerald-500/20 rounded text-emerald-600 hover:text-emerald-300 transition-colors"
                                                            aria-label={t('promptSandbox.ratePositive')}
                                                        >
                                                            <CheckCircle2 size={14} />
                                                        </button>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isTyping && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-emerald-900 border border-emerald-700 text-emerald-400 flex items-center justify-center shrink-0">
                                    <Bot size={14} />
                                </div>
                                <div className="bg-emerald-900/10 border border-emerald-800/20 p-4 rounded-2xl rounded-tl-none flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
