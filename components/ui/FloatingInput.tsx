"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, CornerDownLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps {
    value?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
    placeholder?: string;
    position?: 'top' | 'bottom';
    className?: string;
    loading?: boolean;
}

/**
 * FloatingInput — Context-Aware Input System
 * 
 * Fits the strategy:
 * - "DNA Page" logic: Can be used at TOP (or stick to relative).
 * - "Tree/Explorer" logic: Fixed at BOTTOM.
 */
export function FloatingInput({
    value = "",
    onChange,
    onSubmit,
    placeholder = "Ask the Living System...",
    position = 'bottom',
    className,
    loading = false
}: FloatingInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync with external value if provided
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setLocalValue(val);
        onChange?.(val);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (localValue.trim()) {
                onSubmit?.(localValue);
            }
        }
    };

    const handleSubmit = () => {
        if (localValue.trim()) {
            onSubmit?.(localValue);
        }
    };

    // Position Styles
    const positionStyles = position === 'bottom'
        ? "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4"
        : "relative z-30 w-full max-w-2xl mx-auto"; // Top/Relative mode

    return (
        <motion.div
            initial={{ opacity: 0, y: position === 'bottom' ? 20 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(positionStyles, className)}
        >
            <div
                className={cn(
                    "relative group transition-all duration-300",
                    isFocused ? "scale-[1.02]" : "scale-100"
                )}
            >
                {/* Ambient Glow */}
                <div
                    className={cn(
                        "absolute -inset-0.5 bg-gradient-to-r from-brand-teal to-brand-cyan rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500",
                        isFocused ? "opacity-60" : ""
                    )}
                />

                {/* Glass Container */}
                <div className="relative flex items-center bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden min-h-[56px]">

                    {/* Icon / Loader */}
                    <div className="pl-4 text-brand-teal shrink-0">
                        {loading ? (
                            <Sparkles size={20} className="animate-spin-slow" />
                        ) : (
                            <Sparkles size={20} className={cn("transition-opacity", isFocused ? "opacity-100" : "opacity-70")} />
                        )}
                    </div>

                    {/* Input Field */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={localValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/30 text-lg py-3 px-4 outline-none"
                    />

                    {/* Submit Button (Visible when typing) */}
                    <AnimatePresence>
                        {localValue.trim() && (
                            <motion.button
                                initial={{ scale: 0.8, opacity: 0, width: 0 }}
                                animate={{ scale: 1, opacity: 1, width: 'auto' }}
                                exit={{ scale: 0.8, opacity: 0, width: 0 }}
                                onClick={handleSubmit}
                                className="pr-2 mr-2"
                            >
                                <div className="bg-brand-teal/20 hover:bg-brand-teal/30 text-brand-teal p-2 rounded-xl transition-colors">
                                    <CornerDownLeft size={18} />
                                </div>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {/* Keyboard Hint (Desktop only) */}
                <div className="absolute -bottom-6 right-4 text-[10px] text-white/20 font-mono hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                    PRESS ENTER
                </div>
            </div>
        </motion.div>
    );
}
