"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, RotateCcw, Thermometer, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';

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
    locale: string;
    className?: string;
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

    // Simple deterministic hash for "randomness" aimed at stable demos
    const index = (prompt.length + Math.floor(temperature * 10)) % responses.length;
    return responses[index];
};

export function PromptSandbox({ locale, className }: PromptSandboxProps) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [temperature, setTemperature] = useState(0.7);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            metrics: { tokens: input.split(' ').length * 1.3 } // Rough estimate
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate network delay
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: generateMockResponse(userMsg.content, temperature),
                metrics: { tokens: 20 + Math.random() * 30 }
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
        <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px]", className)}>

            {/* LEFT PANEL: Controls & Input */}
            <div className="lg:col-span-4 flex flex-col gap-4">
                <GlassCard className="p-6 bg-emerald-950/30 border-emerald-800/30 flex-1 flex flex-col">
                    <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
                        <User size={18} />
                        {locale === 'et' ? 'Sinu Viip' : 'Your Prompt'}
                    </h3>

                    {/* Temperature Control */}
                    <div className="mb-6 p-4 rounded-lg bg-emerald-900/20 border border-emerald-800/30">
                        <div className="flex justify-between text-xs text-emerald-200 mb-2">
                            <span className="flex items-center gap-1"><Thermometer size={12} /> Temperature</span>
                            <span className="font-mono">{temperature.toFixed(1)}</span>
                        </div>
                        <input
                            type="range"
                            min="0" max="1" step="0.1"
                            value={temperature}
                            onChange={(e) => setTemperature(parseFloat(e.target.value))}
                            className="w-full accent-emerald-500 h-1 bg-emerald-900 rounded-lg appearance-none cursor-pointer"
                        />
                        <p className="text-[10px] text-emerald-400/60 mt-2 leading-tight">
                            {locale === 'et'
                                ? 'Madalam = Täpsem, Kõrgem = Loovam'
                                : 'Lower = More Precise, Higher = More Creative'}
                        </p>
                    </div>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={locale === 'et' ? 'Kirjuta siia...' : 'Type your prompt here...'}
                        className="flex-1 w-full bg-black/20 text-white placeholder-emerald-700/50 p-4 rounded-xl border border-emerald-800/30 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 resize-none font-mono text-sm leading-relaxed"
                    />

                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={() => setMessages([])}
                            className="p-2 text-emerald-600 hover:text-emerald-400 transition-colors"
                            title="Clear Chat"
                        >
                            <RotateCcw size={18} />
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2"
                        >
                            {locale === 'et' ? 'Saada' : 'Run'}
                            <Send size={14} />
                        </button>
                    </div>
                </GlassCard>
            </div>

            {/* RIGHT PANEL: Output / Chat Area */}
            <div className="lg:col-span-8 h-full">
                <GlassCard className="h-full bg-black/20 border-emerald-800/20 flex flex-col overflow-hidden relative">

                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-emerald-950/40 border-b border-emerald-800/30 flex items-center px-4 justify-between z-10 backdrop-blur-sm">
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                            <Bot size={14} /> AI Output
                        </span>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500/40"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500/40"></div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-4 sm:p-6 pt-16 space-y-6 scroll-smooth"
                    >
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-emerald-800/40 select-none">
                                <Bot size={48} className="mb-4 opacity-50" />
                                <p className="text-sm font-medium">Ready for input</p>
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
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                                        msg.role === 'user'
                                            ? "bg-stone-800 border-stone-700 text-stone-400"
                                            : "bg-emerald-900 border-emerald-700 text-emerald-400"
                                    )}>
                                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                    </div>

                                    <div className={cn(
                                        "p-4 rounded-2xl text-sm leading-relaxed",
                                        msg.role === 'user'
                                            ? "bg-stone-800/50 text-stone-200 rounded-tr-none"
                                            : "bg-emerald-900/20 text-emerald-100 border border-emerald-800/30 rounded-tl-none"
                                    )}>
                                        {msg.content}
                                        {msg.metrics && (
                                            <div className="mt-2 pt-2 border-t border-white/5 flex gap-3 text-[10px] font-mono opacity-50">
                                                <span>{Math.round(msg.metrics.tokens)} tokens</span>
                                                {msg.role === 'assistant' && <span>~{(msg.metrics.tokens * 0.0002).toFixed(5)}$</span>}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex gap-4"
                            >
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
