"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SaplingHeroAnimation() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Generate rising particles (spores/mist)
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // 0-100% width
        y: Math.random() * 100 + 20, // Start lower
        size: Math.random() * 4 + 1,
        duration: Math.random() * 10 + 10, // Slow rising
        delay: Math.random() * 5,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
            {/* Background Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

            {/* Rising Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: `${p.y}%`, x: `${p.x}%` }}
                    animate={{
                        opacity: [0, 0.6, 0],
                        y: [`${p.y}%`, `${p.y - 40}%`], // Rise up
                        x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`] // Slight drift
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                    style={{
                        width: p.size,
                        height: p.size,
                    }}
                    className="absolute rounded-full bg-emerald-300/30 blur-[1px]"
                />
            ))}
        </div>
    );
}
