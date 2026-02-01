"use client";

import { useSeed, DATA_SOURCES, DataSourceId } from './SeedContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Upload, Play, Check, Server, BrainCircuit } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SeedHeroI18n {
    selectData: string;
    ingestData: string;
    compressing: string;
    epoch: string;
    loss: string;
    modelReady: string;
    modelReadyDesc: string;
    finalLoss: string;
    parameters: string;
}

export function SeedHeroAnimation({ i18n }: { i18n: SeedHeroI18n }) {
    const { phase, selectedSources, toggleSource, startProcessing, startTraining, progress, loss, epoch } = useSeed();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Canvas Animation for Training Phase (Matrix/Particles)
    useEffect(() => {
        if (phase !== 'training' || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const particles: { x: number; y: number; speed: number; char: string }[] = [];
        const chars = "10";

        // Init particles
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: 1 + Math.random() * 3,
                char: chars[Math.floor(Math.random() * chars.length)]
            });
        }

        let frameId: number;

        const animate = () => {
            ctx.fillStyle = 'rgba(28, 25, 23, 0.2)'; // fade trail (stone-950)
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#f59e0b'; // amber-500
            ctx.font = '12px monospace';

            particles.forEach(p => {
                p.y += p.speed;
                if (p.y > canvas.height) p.y = 0;

                // Convergence effect based on progress
                const centerX = canvas.width / 2;
                const progressFactor = progress / 100;

                // Pull towards center as training progresses
                p.x += (centerX - p.x) * (progressFactor * 0.05);

                ctx.fillText(p.char, p.x, p.y);
            });

            frameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(frameId);
    }, [phase, progress]);

    return (
        <div className="relative w-full max-w-4xl mx-auto h-[400px] mb-8 rounded-2xl overflow-hidden bg-stone-900/50 border border-amber-900/30 shadow-2xl">

            {/* Background Canvas (active mainly during training) */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

            {/* PHASE 1: SELECTION DASHBOARD */}
            <AnimatePresence mode="wait">
                {phase === 'selection' && (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-6"
                    >
                        <h3 className="text-amber-500 font-mono text-xs uppercase tracking-widest mb-6">{i18n.selectData}</h3>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {DATA_SOURCES.map((source) => {
                                const isSelected = selectedSources.has(source.id);
                                return (
                                    <button
                                        key={source.id}
                                        onClick={() => toggleSource(source.id)}
                                        className={cn(
                                            "flex flex-col items-center justify-center w-28 h-28 rounded-xl border transition-all duration-300 group relative overflow-hidden",
                                            isSelected
                                                ? "bg-amber-900/40 border-amber-500 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.2)] transform scale-105"
                                                : "bg-stone-900/40 border-stone-800 text-stone-500 hover:border-amber-900/50 hover:bg-stone-800/60"
                                        )}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {isSelected && <div className="absolute top-2 right-2 text-amber-400"><Check size={14} /></div>}

                                        <Database size={24} className="mb-2" style={{ color: isSelected ? source.color : 'inherit' }} />
                                        <span className="text-xs font-bold">{source.label}</span>
                                        <span className="text-[10px] opacity-60 mt-1">{source.size}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={startProcessing}
                            disabled={selectedSources.size === 0}
                            className="flex items-center gap-2 px-8 py-3 rounded-full bg-amber-600 hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed text-stone-950 font-bold text-sm transition-all shadow-lg hover:shadow-amber-900/20 active:scale-95"
                        >
                            <Upload size={16} />
                            {i18n.ingestData}
                        </button>
                    </motion.div>
                )}

                {/* PHASE 2: PROCESSING / COMPRESSION */}
                {phase === 'processing' && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                        <div className="flex gap-2 mb-4">
                            {[0, 1, 2].map(i => (
                                <motion.div
                                    key={i}
                                    className="w-16 h-24 bg-stone-800 rounded border border-stone-700"
                                    animate={{
                                        x: [0, (i - 1) * -40, 0], // compress inward
                                        scale: [1, 0.5, 0],
                                        opacity: [1, 1, 0]
                                    }}
                                    transition={{ duration: 1.5, times: [0, 0.8, 1] }}
                                />
                            ))}
                        </div>
                        <p className="text-amber-500/80 font-mono text-sm animate-pulse">{i18n.compressing}</p>
                    </motion.div>
                )}

                {/* PHASE 2.5: TUNING (WEIGHTS / KNOBS) */}
                {phase === 'tuning' && (
                    <motion.div
                        key="tuning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/20"
                    >
                        <h3 className="text-amber-500 font-mono text-xs uppercase tracking-widest mb-6">Initialize Weights</h3>

                        <div className="flex gap-4 mb-8">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex flex-col items-center gap-2 group">
                                    <div className="w-2 h-24 bg-stone-800 rounded-full relative overflow-hidden group-hover:bg-stone-700 transition-colors">
                                        <motion.div
                                            className="absolute bottom-0 w-full bg-amber-600"
                                            initial={{ height: "30%" }}
                                            animate={{ height: ["30%", "70%", "50%"] }}
                                            transition={{
                                                duration: 2,
                                                delay: i * 0.1,
                                                repeat: Infinity,
                                                repeatType: "reverse"
                                            }}
                                        />
                                        {/* Knob Head */}
                                        <motion.div
                                            className="absolute w-4 h-4 bg-stone-300 rounded-full -ml-1 shadow-lg"
                                            animate={{ bottom: ["28%", "68%", "48%"] }}
                                            transition={{
                                                duration: 2,
                                                delay: i * 0.1,
                                                repeat: Infinity,
                                                repeatType: "reverse"
                                            }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-stone-500 font-mono">W{i}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-stone-400 text-sm max-w-sm text-center mb-6">
                            "Weights" are like volume knobs. Training adjusts billions of them to reduce noise and amplify meaning.
                        </p>

                        <button
                            onClick={startTraining}
                            className="flex items-center gap-2 px-8 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm transition-all shadow-lg hover:shadow-amber-900/20 active:scale-95"
                        >
                            <BrainCircuit size={16} />
                            Start Training Loop
                        </button>
                    </motion.div>
                )}

                {/* PHASE 3: TRAINING LOOP */}
                {phase === 'training' && (
                    <motion.div
                        key="training"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 p-8 flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex flex-col">
                                <span className="text-xs text-stone-500 uppercase tracking-wider">{i18n.epoch}</span>
                                <span className="text-3xl font-mono text-amber-500">{epoch}/10</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-stone-500 uppercase tracking-wider">{i18n.loss}</span>
                                <span className="text-3xl font-mono text-red-400">{loss.toFixed(4)}</span>
                            </div>
                        </div>

                        {/* Loss Curve Visualization */}
                        <div className="flex-1 relative border-l border-b border-stone-800 bg-stone-900/30 rounded-tr-lg overflow-hidden">
                            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                <motion.path
                                    d={`M 0,${(4.5 / 5) * 100}% Q 50,10 100,90`} // Simple quadratic bezier approximation of loss
                                    fill="none"
                                    stroke="#ef4444" // red-500
                                    strokeWidth="3"
                                    vectorEffect="non-scaling-stroke"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: progress / 100 }}
                                    transition={{ duration: 0.1, ease: 'linear' }}
                                />
                                {/* Grid lines */}
                                <line x1="0" y1="25%" x2="100%" y2="25%" stroke="rgba(255,255,255,0.05)" />
                                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.05)" />
                                <line x1="0" y1="75%" x2="100%" y2="75%" stroke="rgba(255,255,255,0.05)" />
                            </svg>

                            {/* Scanning line */}
                            <motion.div
                                className="absolute top-0 bottom-0 w-[1px] bg-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                style={{ left: `${progress}%` }}
                            />
                        </div>

                        {/* Text Evolution Visualization (NEW) */}
                        <div className="mt-4 p-4 bg-stone-900 rounded border border-stone-800 font-mono text-sm h-24 overflow-hidden relative">
                            <span className="text-[10px] text-stone-500 uppercase tracking-wider absolute top-2 right-2">Output Preview</span>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={epoch <= 3 ? 'chaos' : epoch <= 7 ? 'broken' : 'fluent'}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="pt-4"
                                >
                                    {epoch <= 3 && (
                                        <span className="text-stone-600 break-all">
                                            x7zn# m.q9^2 @lp! s_?k... {Math.random().toString(36).substring(7)}
                                        </span>
                                    )}
                                    {epoch > 3 && epoch <= 7 && (
                                        <span className="text-amber-700/70">
                                            the cat s@t on... {['th', 'chk', 'brr'][epoch % 3]}... predict_nxt
                                        </span>
                                    )}
                                    {epoch > 7 && (
                                        <span className="text-amber-400">
                                            "The neural network is learning to generate coherent text structure."
                                        </span>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}

                {/* PHASE 4: COMPLETE (MODEL) */}
                {phase === 'complete' && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-t from-amber-950/80 to-stone-900/80"
                    >
                        <div className="relative">
                            <motion.div
                                className="absolute inset-0 bg-amber-500 blur-2xl opacity-20"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <Server size={64} className="text-amber-400 relative z-10 mb-4 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                        </div>

                        <h2 className="text-2xl font-bold text-amber-100 mb-2">{i18n.modelReady}</h2>
                        <p className="text-stone-400 text-sm max-w-sm text-center mb-6">
                            {i18n.modelReadyDesc}
                        </p>

                        <div className="flex gap-4">
                            <div className="flex flex-col items-center p-3 bg-stone-900/50 rounded-lg border border-stone-800">
                                <span className="text-[10px] text-stone-500 uppercase">{i18n.finalLoss}</span>
                                <span className="text-lg font-mono text-green-400">0.4201</span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-stone-900/50 rounded-lg border border-stone-800">
                                <span className="text-[10px] text-stone-500 uppercase">{i18n.parameters}</span>
                                <span className="text-lg font-mono text-amber-400">7B</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
