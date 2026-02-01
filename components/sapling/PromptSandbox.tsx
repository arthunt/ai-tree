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

// Context-aware mock LLM response generator
const generateMockResponse = (prompt: string, temperature: number): string => {
    const lower = prompt.toLowerCase();

    // Topic detection — match prompt keywords to AI concepts
    const topics: { keywords: string[]; low: string; mid: string; high: string }[] = [
        {
            keywords: ['neural', 'network', 'neuron', 'layer'],
            low: "A neural network processes data through layers of interconnected nodes. Each node applies a weight and activation function to transform the input signal.",
            mid: "Think of a neural network like a team of specialists — each layer extracts different features. The first layer might detect edges, the next shapes, and deeper layers recognize entire objects.",
            high: "Imagine a magical forest where each tree whispers part of a story to the next. By the time the message reaches the last tree, it has transformed into a complete understanding of the world!"
        },
        {
            keywords: ['token', 'tokeniz', 'word', 'text', 'split'],
            low: "Tokenization breaks text into smaller units (tokens) that the model can process. Common approaches include word-level, subword (BPE), and character-level tokenization.",
            mid: "Tokenization is like cutting a sentence into puzzle pieces. 'Understanding' might become ['Under', 'stand', 'ing'] — the model learns what each piece means and how they connect.",
            high: "Picture a chef slicing ingredients before cooking — you can't make a meal from a whole potato! Similarly, AI 'slices' your words into bite-sized tokens before it can cook up a response."
        },
        {
            keywords: ['temperature', 'random', 'creative', 'deterministic'],
            low: "Temperature controls the randomness of the output distribution. At 0, the model always picks the most probable token. Higher values flatten the distribution, increasing diversity.",
            mid: "Temperature is like a creativity dial. Low temperature = predictable, focused answers. High temperature = surprising, varied responses. Try adjusting the slider to see the difference!",
            high: "Imagine temperature as the mood of a storyteller: at 0 they read from a script, at 0.7 they improvise a little, and at 1.5 they're wildly freestyling poetry about electric sheep!"
        },
        {
            keywords: ['train', 'learning', 'gradient', 'backprop', 'epoch', 'loss'],
            low: "Training adjusts model weights to minimize a loss function. Each epoch processes the full dataset, computing gradients via backpropagation to update parameters.",
            mid: "Training is like studying for an exam — each epoch is one pass through the textbook. The model checks its answers (loss), then adjusts its understanding (weights) to do better next time.",
            high: "Picture a student who reads the same book over and over, but each time they highlight different parts. After enough re-reads (epochs), they can practically recite it — that's how AI learns!"
        },
        {
            keywords: ['prompt', 'instruction', 'context', 'system'],
            low: "Prompt engineering structures input to guide model behavior. System prompts set the context, while user prompts provide specific instructions for the desired output.",
            mid: "A good prompt is like giving clear directions — instead of 'write something about dogs', try 'explain three benefits of adopting rescue dogs in a friendly, conversational tone'.",
            high: "Prompting an AI is like ordering at a restaurant: 'food please' gets you something random, but 'a medium-rare steak with garlic butter and roasted vegetables' gets exactly what you want!"
        },
        {
            keywords: ['attention', 'transformer', 'self-attention'],
            low: "Self-attention allows each token to attend to every other token in the sequence, computing relevance scores to weight the contribution of each position.",
            mid: "Attention is how AI decides which words matter most. In 'The cat sat on the mat because it was tired', attention helps the model know 'it' refers to 'cat', not 'mat'.",
            high: "Imagine reading a mystery novel — attention is your brain's spotlight, jumping between clues scattered across pages to piece together who did it!"
        }
    ];

    // Find best matching topic
    const matched = topics.find(t => t.keywords.some(k => lower.includes(k)));

    // Fallback generic responses
    const fallbacks = [
        {
            low: "Based on the data patterns, the most statistically significant finding is that the input correlates with established computational models.",
            mid: "That's a great question! AI works by finding patterns in data. The more examples it sees, the better it understands — much like how you learn from experience.",
            high: "What a fascinating thought! Let me paint you a picture: imagine all the world's knowledge as a vast ocean, and AI is learning to surf its waves — sometimes gracefully, sometimes wiping out spectacularly!"
        },
        {
            low: "The model processes this query by decomposing it into semantic components and mapping them to learned representations in the embedding space.",
            mid: "To answer your question, the AI looks at how similar ideas are connected in its training data. It's like having read millions of books and now connecting the dots between them.",
            high: "Ooh, interesting! Think of me as a parrot who's read the entire internet — I don't truly 'understand', but I'm really good at predicting what word comes next. It's pattern matching all the way down!"
        }
    ];

    const pick = matched ?? fallbacks[prompt.length % fallbacks.length];

    // Select response based on temperature band
    if (temperature < 0.3) return pick.low;
    if (temperature < 0.8) return pick.mid;
    return pick.high;
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

    const [showSettings, setShowSettings] = useState(false); // Mobile settings toggle
    const [keyboardOffset, setKeyboardOffset] = useState(0);

    // Effect to handle prop updates (from Module selection)
    useEffect(() => {
        if (initialPrompt) setInput(initialPrompt);
        if (initialTemp !== undefined) setTemperature(initialTemp);
    }, [initialPrompt, initialTemp]);

    // Detect virtual keyboard via visualViewport API and adjust layout
    useEffect(() => {
        const vv = typeof window !== 'undefined' ? window.visualViewport : null;
        if (!vv) return;
        const handleResize = () => {
            // When keyboard opens, visualViewport.height shrinks
            const offset = window.innerHeight - vv.height;
            setKeyboardOffset(offset > 50 ? offset : 0);
        };
        vv.addEventListener('resize', handleResize);
        return () => vv.removeEventListener('resize', handleResize);
    }, []);

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
        <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 lg:h-[700px] h-auto", className)}>

            {/* LEFT PANEL: Controls & History */}
            <div
                className="lg:col-span-4 flex flex-col gap-4 h-full overflow-hidden order-2 lg:order-1 sticky bottom-0 z-30 lg:static lg:bottom-auto transition-all"
                style={keyboardOffset > 0 ? { bottom: `${keyboardOffset}px` } : undefined}
            >
                <GlassCard className="p-4 lg:p-5 bg-emerald-950/90 lg:bg-emerald-950/40 backdrop-blur-xl lg:backdrop-blur-none border-t lg:border border-emerald-800/30 flex flex-col h-full lg:h-full lg:rounded-2xl rounded-t-2xl rounded-b-none lg:shadow-none shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                    <div className="flex justify-between items-center mb-3 lg:mb-4">
                        <h3 className="text-emerald-400 font-bold flex items-center gap-2">
                            <User size={18} />
                            {t('promptSandbox.yourPrompt')}
                        </h3>
                        {/* Mobile Settings Toggle */}
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="lg:hidden text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1 bg-emerald-900/30 px-2 py-1 rounded"
                        >
                            {showSettings ? 'Hide' : 'Settings'}
                            {history.length > 0 && <span className="bg-emerald-500/20 px-1 rounded text-[10px]">{history.length}</span>}
                            <Thermometer size={12} />
                        </button>
                    </div>

                    {/* Collapsible Area (Temp + History) on Mobile */}
                    <AnimatePresence>
                        {(showSettings || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden flex flex-col shrink-0"
                            >
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

                                {/* Iteration History (Moved here on mobile) */}
                                {history.length > 0 && (
                                    <div className="mb-4 lg:mt-2 lg:pt-4 lg:border-t border-emerald-800/30 flex flex-col max-h-[150px] lg:max-h-none overflow-hidden">
                                        <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <RotateCcw size={12} />
                                            {t('promptSandbox.iterations')}
                                        </h4>
                                        <div className="overflow-y-auto space-y-2 pr-2 custom-scrollbar lg:flex-1 min-h-[60px]">
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
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Input Area — compact on mobile with inline Run button */}
                    <div className="flex-1 flex flex-col min-h-[80px] lg:min-h-[150px]">
                        <div className="flex-1 relative">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={t('promptSandbox.placeholder')}
                                className="w-full h-full min-h-[60px] lg:min-h-[100px] bg-black/20 text-white placeholder-emerald-700/50 p-3 pr-14 lg:p-4 rounded-xl border border-emerald-800/30 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 resize-none font-mono text-sm leading-relaxed"
                            />
                            {/* Inline send button on mobile — always visible inside textarea */}
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isTyping}
                                className="lg:hidden absolute right-2 bottom-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed text-white min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center transition-all shadow-lg shadow-emerald-900/20"
                                aria-label={t('promptSandbox.runPrompt')}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                        {/* Full-width Run button on desktop only */}
                        <div className="mt-3 hidden lg:flex justify-end">
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
                </GlassCard>
            </div>

            {/* RIGHT PANEL: Output / Chat Area */}
            <div className="lg:col-span-8 h-full order-1 lg:order-2">
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
                            <div className="h-full flex flex-col items-center justify-center text-emerald-800/40 select-none px-4 text-center">
                                <Bot size={48} className="mb-4 opacity-30" />
                                <p className="text-sm font-medium mb-2">{t('promptSandbox.readyMessage')}</p>
                                <p className="text-xs text-emerald-800/30 max-w-xs">{t('promptSandbox.emptyHint')}</p>
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
