"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeContentSimple } from '@/actions/getTreeContent';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface TreeViewProps {
    data: TreeContentSimple[];
    onNodeClick?: (node: TreeContentSimple) => void;
    intent?: string | null;
}

export function TreeView({ data, onNodeClick, intent }: TreeViewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const gRef = useRef<SVGGElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Collapsed nodes state
    const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

    // Initialize dimensions
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

    // Zoom Logic
    useEffect(() => {
        if (!svgRef.current || !gRef.current) return;

        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 4])
            .on('zoom', (event) => {
                d3.select(gRef.current).attr('transform', event.transform);
            });

        d3.select(svgRef.current).call(zoom);

        // Initial Center
        // Wait for dimensions to be set
        if (dimensions.width > 0) {
            const initialTransform = d3.zoomIdentity.translate(dimensions.width / 2, 80).scale(0.8);
            d3.select(svgRef.current).call(zoom.transform, initialTransform);
        }

    }, [dimensions]); // Zoom init depends on dimensions

    // --- HIERARCHY PROCESSING ---
    const { root, nodes, links } = useMemo(() => {
        if (!data.length) return { root: null, nodes: [], links: [] };

        // 1. Build Stratify
        const stratify = d3.stratify<TreeContentSimple>()
            .id(d => d.id)
            .parentId(d => d.parentId);

        const fullRoot = stratify(data);

        // 2. Filter Collapsed Nodes
        // Helper to check if any ancestor is collapsed
        const isHidden = (node: d3.HierarchyNode<TreeContentSimple>) => {
            let current = node.parent;
            while (current) {
                if (collapsedIds.has(current.data.id)) return true;
                current = current.parent;
            }
            return false;
        };

        // If a node is collapsed, its children should not be part of the layout? 
        // D3 Tree layout usually needs the full structure, but we can filter *descendants* manually?
        // Better pattern: Assign 'children' property manually based on collapsed state.

        // Let's re-build the hierarchy traversal
        // Actually, d3.stratify doesn't care about our collapse state.
        // We modify the resulting hierarchy object before passing to tree()

        fullRoot.each((node) => {
            // @ts-ignore - D3 types are strict about 'children' being readonly sometimes, but we can mutate for visualization
            if (collapsedIds.has(node.data.id)) {
                // Determine if this node HAS children originally
                if (node.children) {
                    // Stash them in _children so we know it CAN expand
                    // @ts-ignore
                    node._children = node.children;
                    node.children = undefined;
                }
            } else {
                // If expanding, restore children
                // @ts-ignore
                if (node._children) {
                    // @ts-ignore
                    node.children = node._children;
                    // @ts-ignore
                    node._children = undefined;
                }
            }
        });

        // 3. Layout
        // WIDER SPACING: x=220 (width), y=180 (height)
        const treeLayout = d3.tree<TreeContentSimple>()
            .nodeSize([220, 180]);

        treeLayout(fullRoot);

        return {
            root: fullRoot,
            nodes: fullRoot.descendants(),
            links: fullRoot.links()
        };

    }, [data, collapsedIds]);


    // --- INTERACTION ---
    const handleNodeClick = (node: d3.HierarchyNode<TreeContentSimple>) => {
        // Toggle collapse if it has children (or hidden children)
        // @ts-ignore
        const hasChildren = node.children || node._children;

        if (hasChildren) {
            setCollapsedIds(prev => {
                const next = new Set(prev);
                if (next.has(node.data.id)) {
                    next.delete(node.data.id);
                } else {
                    next.add(node.data.id);
                }
                return next;
            });
        } else {
            // Leaf node? Show detail
            onNodeClick?.(node.data);
        }
    };

    // --- VISUALIZATION HELPERS ---
    const highlightedIds = new Set<string>();
    if (root) {
        // Highlight logic (simplified from previous version for clarity first)
        // Default: everything visible is highlighted
        root.descendants().forEach(d => highlightedIds.add(d.data.id));
    }


    if (!root) return null;

    return (
        <div ref={containerRef} className="w-full h-[500px] sm:h-[700px] bg-void/50 border border-white/10 rounded-xl overflow-hidden relative cursor-move touch-manipulation">
            <svg ref={svgRef} width={dimensions.width} height={dimensions.height}>
                <defs>
                    <linearGradient id="link-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#818CF8" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <g ref={gRef}>
                    <AnimatePresence>
                        {/* Links */}
                        {links.map((link) => {
                            // Link Vertical
                            const sourceY = dimensions.height - (link.source.y || 0) - 100; // Flip Y
                            const targetY = dimensions.height - (link.target.y || 0) - 100;
                            const sourceX = link.source.x || 0;
                            const targetX = link.target.x || 0;

                            const d = d3.linkVertical()({
                                source: [sourceX, sourceY],
                                target: [targetX, targetY]
                            } as any);

                            return (
                                <motion.path
                                    key={`link-${link.source.data.id}-${link.target.data.id}`}
                                    d={d || ""}
                                    stroke="url(#link-gradient)"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ opacity: 0, pathLength: 0 }}
                                    animate={{ opacity: 1, pathLength: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            );
                        })}

                        {/* Nodes */}
                        {nodes.map((node) => {
                            // @ts-ignore
                            const hasChildren = node.children || node._children;
                            const isCollapsed = collapsedIds.has(node.data.id);

                            const radius = node.data.type === 'root' ? 20 : node.data.type === 'trunk' ? 12 : 8;
                            const flippedY = dimensions.height - (node.y || 0) - 100;

                            return (
                                <motion.g
                                    key={node.data.id}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        x: node.x,
                                        y: flippedY
                                    }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNodeClick(node);
                                    }}
                                >
                                    {/* Main Circle */}
                                    <circle
                                        r={radius}
                                        fill={node.data.type === 'root' ? '#F472B6' : hasChildren ? '#2DD4BF' : '#818CF8'}
                                        stroke="white"
                                        strokeWidth={2}
                                    />

                                    {/* Collapse Indicator (+/-) */}
                                    {hasChildren && (
                                        <circle
                                            r={6}
                                            cx={radius + 4}
                                            cy={-radius + 4}
                                            fill="white"
                                            stroke="#2DD4BF"
                                        />
                                    )}

                                    {/* Label: ALWAYS show below for clarity, larger text */}
                                    <text
                                        y={30}
                                        textAnchor="middle"
                                        className="font-mono text-[10px] sm:text-xs uppercase tracking-wide fill-white drop-shadow-md select-none"
                                        style={{
                                            textShadow: '0 2px 4px rgba(0,0,0,0.9)',
                                            fontWeight: node.data.type === 'root' ? 'bold' : 'normal'
                                        }}
                                    >
                                        {node.data.title}
                                    </text>

                                    {/* Subtitle (Year) */}
                                    {node.data.year && (
                                        <text
                                            y={42}
                                            textAnchor="middle"
                                            className="font-mono text-[8px] fill-white/50 select-none"
                                        >
                                            {node.data.year}
                                        </text>
                                    )}

                                    {/* Expand/Collapse Hint Icon */}
                                    {hasChildren && (
                                        <text x={radius + 4} y={-radius + 7} textAnchor="middle" fontSize={10} fill="#2DD4BF" fontWeight="bold">
                                            {isCollapsed ? '+' : '-'}
                                        </text>
                                    )}
                                </motion.g>
                            );
                        })}
                    </AnimatePresence>
                </g>
            </svg>

            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white backdrop-blur-md transition-colors"
                    onClick={() => {
                        d3.select(svgRef.current).transition().duration(750)
                            .call(d3.zoom().transform as any, d3.zoomIdentity.translate(dimensions.width / 2, 80).scale(0.8));
                    }}
                    title="Reset View"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            <div className="absolute top-4 left-4 text-white/50 text-xs font-mono uppercase tracking-widest pointer-events-none">
                {intent ? `Intent: ${intent}` : 'Mode: Explorer'}
            </div>
        </div>
    );
}
