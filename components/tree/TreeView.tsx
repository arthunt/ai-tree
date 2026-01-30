"use client";

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { TreeContentSimple } from '@/actions/getTreeContent';

interface TreeViewProps {
    data: TreeContentSimple[];
}

export function TreeView({ data }: TreeViewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!containerRef.current) return;
        const resize = () => {
            setDimensions({
                width: containerRef.current?.offsetWidth || 800,
                height: containerRef.current?.offsetHeight || 600
            });
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    // Process D3 Hierarchy
    const root = d3.stratify<TreeContentSimple>()
        .id(d => d.id)
        .parentId(d => d.parentId)
        (data);

    // Layout configuration
    // Use a "Tree" layout (Top-Down) or "Cluster".
    // Or "Force" for organic? "Phylogenetic" usually implies hierarchy.
    // Let's go with a vertical tree first.
    const treeLayout = d3.tree<TreeContentSimple>()
        .size([dimensions.width - 100, dimensions.height - 100]);

    treeLayout(root);

    return (
        <div ref={containerRef} className="w-full h-[600px] bg-black/50 border border-white/10 rounded-xl overflow-hidden relative">
            <svg width={dimensions.width} height={dimensions.height} className="pointer-events-none">
                <g transform={`translate(50, 50)`}>
                    {/* Links */}
                    {root.links().map((link, i) => (
                        <motion.path
                            key={`link-${i}`}
                            d={d3.linkVertical()
                                .x((d: any) => d.x)
                                .y((d: any) => d.y)
                                (link as any) || ""}
                            stroke="rgba(255,255,255,0.2)"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                        />
                    ))}

                    {/* Nodes */}
                    {root.descendants().map((node, i) => (
                        <motion.g
                            key={`node-${node.data.id}`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1, x: node.x, y: node.y }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className="cursor-pointer pointer-events-auto"
                            onClick={() => console.log('Clicked', node.data)}
                        >
                            <circle r={node.data.type === 'root' ? 10 : 5} fill="var(--brand-teal)" />
                            <text
                                y={node.children ? -15 : 15}
                                textAnchor="middle"
                                fill="white"
                                fontSize="10px"
                                className="font-mono uppercase tracking-widest bg-black/50"
                            >
                                {node.data.title}
                            </text>
                        </motion.g>
                    ))}
                </g>
            </svg>
        </div>
    );
}
