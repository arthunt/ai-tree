"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SeedHeroAnimation() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Generate random particles for "Data"
    const particles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100 - 50, // -50% to 50% relative spread
        y: Math.random() * 100 - 50,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 3,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Core (The Model) */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [0.9, 1.1, 1], opacity: 1 }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-amber-500/20 to-stone-900/40 blur-3xl"
                />

                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border border-amber-500/30 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-t border-amber-500/40"
                    />
                    <div className="w-12 h-12 rounded-full bg-amber-500/20" />
                </div>

                {/* Incoming Data Particles */}
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y}vh`, scale: 0.5 }}
                        animate={{
                            opacity: [0, 1, 0],
                            x: 0,
                            y: 0,
                            scale: [1, 0.2]
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "easeInOut", // Smooth compression
                        }}
                        style={{
                            width: p.size,
                            height: p.size,
                        }}
                        className="absolute rounded-full bg-amber-300/40 shadow-[0_0_8px_rgba(252,211,77,0.3)]"
                    />
                ))}
            </div>
        </div>
    );
}
