"use client";

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { TreeContentSimple } from '@/actions/getTreeContent';

interface TreeViewProps {
    data: TreeContentSimple[];
    onNodeClick?: (node: TreeContentSimple) => void;
    intent?: string | null;
}

export function TreeView({ data, onNodeClick, intent }: TreeViewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const gRef = useRef<SVGGElement>(null); // Group for zoom
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

    // Zoom/Pan Logic
    useEffect(() => {
        if (!svgRef.current || !gRef.current) return;

        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 3])
            .on('zoom', (event) => {
                d3.select(gRef.current).attr('transform', event.transform);
            });

        d3.select(svgRef.current).call(zoom);

        // Center initial view
        const initialTransform = d3.zoomIdentity.translate(dimensions.width / 2, 50).scale(1);
        d3.select(svgRef.current).call(zoom.transform, initialTransform);

    }, [dimensions]);

    // Process D3 Hierarchy
    if (!data.length) return null;

    const root = d3.stratify<TreeContentSimple>()
        .id(d => d.id)
        .parentId(d => d.parentId)
        (data);

    // Use Cluster for leaf alignment or Tree for hierarchy?
    // Tree is better for "Phylogenetic" usually.
    const treeLayout = d3.tree<TreeContentSimple>()
        .nodeSize([60, 100]) // Fixed node size ensures consistency
        // .size([dimensions.width, dimensions.height]) // Don't restrict size, let zoom handle it
        ;

    treeLayout(root);

    // --- GUIDED PATHS LOGIC ---
    const highlightedIds = new Set<string>();
    const matchedLeafIds = new Set<string>(); // Direct matches (not ancestors)

    // Helper to walk up ancestors
    const addAncestors = (node: d3.HierarchyNode<TreeContentSimple>) => {
        let current: d3.HierarchyNode<TreeContentSimple> | null = node;
        while (current) {
            highlightedIds.add(current.data.id);
            current = current.parent;
        }
    };

    const hasIntent = intent && ['builder', 'thinker'].includes(intent);

    if (hasIntent) {
        root.descendants().forEach(node => {
            const isMatch = (() => {
                if (intent === 'builder') {
                    return node.data.relatedProgramId === 'aivo' ||
                        node.data.relatedProgramId === 'aime' ||
                        ['gpt4', 'transformer'].includes(node.data.id);
                }
                if (intent === 'thinker') {
                    return node.data.relatedProgramId === 'aiki' ||
                        ['neural', 'attention-paper'].includes(node.data.id);
                }
                return false;
            })();

            if (isMatch) {
                matchedLeafIds.add(node.data.id);
                addAncestors(node);
            }
        });

        if (highlightedIds.size === 0) {
            root.descendants().forEach(d => highlightedIds.add(d.data.id));
        }
    } else {
        root.descendants().forEach(d => highlightedIds.add(d.data.id));
    }

    // --- GUIDE PULSE: pick the "start here" node ---
    // For explorer/no intent: pulse root. For builder/thinker: pulse first matched leaf.
    let guidePulseId: string | null = null;
    if (!hasIntent) {
        guidePulseId = root.data.id; // Root node
    } else {
        // Find the shallowest matched leaf (closest to root = best starting point)
        let shallowest: d3.HierarchyNode<TreeContentSimple> | null = null;
        root.descendants().forEach(node => {
            if (matchedLeafIds.has(node.data.id)) {
                if (!shallowest || node.depth < shallowest.depth) {
                    shallowest = node;
                }
            }
        });
        guidePulseId = shallowest?.data.id ?? root.data.id;
    }


    return (
        <div ref={containerRef} className="w-full h-[600px] bg-black/50 border border-white/10 rounded-xl overflow-hidden relative cursor-move">
            <svg ref={svgRef} width={dimensions.width} height={dimensions.height}>
                <defs>
                    <linearGradient id="link-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#818CF8" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="link-gradient-dim" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#818CF8" stopOpacity="0.15" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="guide-glow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <g ref={gRef}>
                    {/* Links */}
                    {root.links().map((link, i) => {
                        const isDimmed = !highlightedIds.has(link.target.data.id);
                        return (
                            <motion.path
                                key={`link-${i}`}
                                d={d3.linkVertical()
                                    .x((d: any) => d.x)
                                    .y((d: any) => d.y)
                                    (link as any) || ""}
                                stroke="url(#link-gradient)"
                                strokeWidth="2"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: 1,
                                    opacity: isDimmed ? 0.1 : 1
                                }}
                                transition={{ duration: 1.5, delay: i * 0.02, ease: "easeInOut" }}
                            />
                        );
                    })}

                    {/* Nodes */}
                    {root.descendants().map((node, i) => {
                        const isDimmed = !highlightedIds.has(node.data.id);

                        return (
                            <motion.g
                                key={`node-${node.data.id}`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: isDimmed ? 0.2 : 1,
                                    scale: 1,
                                    x: node.x,
                                    y: node.y,
                                    filter: isDimmed ? 'grayscale(100%)' : 'none'
                                }}
                                transition={{ duration: 0.5, delay: i * 0.02, type: 'spring' }}
                                className={`cursor-pointer pointer-events-auto ${isDimmed ? '' : 'hover:brightness-125'}`}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent zoom drag start if possible
                                    onNodeClick?.(node.data);
                                }}
                            >
                                {/* Halo for Root/Trunk OR Highlighted Leaf */}
                                {(['root', 'trunk'].includes(node.data.type) || (intent && !isDimmed && node.data.type === 'leaf')) && (
                                    <circle r={node.data.type === 'root' ? 20 : 12} fill="rgba(45, 212, 191, 0.2)" filter="url(#glow)">
                                        <animate attributeName="r" values={node.data.type === 'root' ? "20;25;20" : "12;15;12"} dur="3s" repeatCount="indefinite" />
                                    </circle>
                                )}

                                {/* Main Circle */}
                                <circle
                                    r={node.data.type === 'root' ? 12 : node.data.type === 'trunk' ? 8 : 5}
                                    fill={node.data.type === 'root' ? '#F472B6' : '#2DD4BF'}
                                    stroke="#fff"
                                    strokeWidth="2"
                                />

                                {/* Label */}
                                <text
                                    y={node.children ? -20 : 20}
                                    x={0}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize={node.data.type === 'root' ? "14px" : "10px"}
                                    fontWeight={node.data.type === 'root' ? "bold" : "normal"}
                                    className="font-mono uppercase tracking-widest pointer-events-none drop-shadow-md"
                                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                                >
                                    {node.data.title}
                                </text>
                            </motion.g>
                        );
                    })}
                </g>
            </svg>

            {/* Zoom Controls Overlay */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button className="bg-white/10 p-2 rounded hover:bg-white/20 text-white" onClick={() => {
                    d3.select(svgRef.current).transition().call(d3.zoom().transform as any, d3.zoomIdentity.translate(dimensions.width / 2, 50).scale(1));
                }}>
                    Reset
                </button>
            </div>
        </div>
    );
}
