"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeContentSimple } from '@/actions/getTreeContent';
import { RotateCcw } from 'lucide-react';
import { useJourney } from '@/lib/contexts/JourneyContext';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface TreeViewProps {
    data: TreeContentSimple[];
    onNodeClick?: (node: TreeContentSimple) => void;
    intent?: string | null;
}

export function TreeVisualization({ data, onNodeClick, intent }: TreeViewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const gRef = useRef<SVGGElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const { targetStage, setStage, currentStage } = useJourney();
    const t = useTranslations();

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

    // --- LOD 2 (SPROUT) INITIALIZATION ---
    // Default: Collapse everything except the Root.
    // Actually, let's Start with "Sprout": Trunk visible, Branches hidden.
    // To hide Branches, we must collapse the Trunk nodes.
    useEffect(() => {
        if (data.length > 0 && collapsedIds.size === 0) {
            const initialCollapsed = new Set<string>();
            data.forEach(node => {
                // Collapse Trunks (hides Branches) and Branches (hides Leaves)
                if (node.type === 'trunk' || node.type === 'branch') {
                    // Check if they actually have children in the full set?
                    // The simple check is just to add them. D3 won't care if a leaf is in the set.
                    initialCollapsed.add(node.id);
                }
            });
            setCollapsedIds(initialCollapsed);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.length]); // Only run once on data load

    // Data Ref for Zoom Closure
    const dataRef = useRef(data);
    useEffect(() => { dataRef.current = data; }, [data]);

    // Zoom Logic
    const zoomBehavior = useMemo(() => {
        return d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 4])
            .on('zoom', (event) => {
                if (gRef.current) {
                    d3.select(gRef.current).attr('transform', event.transform);
                }
            })
            .on('end', (event) => {
                const k = event.transform.k;

                // SEMANTIC ZOOM (LOD Triggers)
                if (k < 0.5) {
                    // Zoom Out -> Go to SPROUT (LOD 2)
                    // Collapse Trunks and Branches
                    const newSet = new Set<string>();
                    dataRef.current.forEach(node => {
                        if (node.type === 'trunk' || node.type === 'branch') {
                            newSet.add(node.id);
                        }
                    });

                    if (newSet.size > 0) {
                        setCollapsedIds(prev => {
                            if (prev.size === newSet.size) return prev;
                            // Sync with Navigation
                            setStage('sprout');
                            return newSet;
                        });
                    }

                } else if (k > 1.2) {
                    // Zoom In -> Go to TREE (LOD 3)
                    // Expand Trunks (so Branches are visible), but keep Branches collapsed (Leaves hidden)?
                    // Or Expand Trunks AND Branches? 
                    // "Auto-expand visible nodes to LOD 3" -> Show Branches. 
                    // So we must UNCLEAR 'trunk' nodes from the set.

                    setCollapsedIds(prev => {
                        const next = new Set(prev);
                        let changed = false;

                        dataRef.current.forEach(node => {
                            if (node.type === 'trunk') {
                                if (next.has(node.id)) {
                                    next.delete(node.id);
                                    changed = true;
                                }
                            }
                        });

                        // Sync with Navigation
                        setStage('tree');
                        return changed ? next : prev;
                    });
                }
            });
    }, []); // Empty deps to keep zoom instance stable

    useEffect(() => {
        if (!svgRef.current) return;
        d3.select(svgRef.current).call(zoomBehavior);

        // Initial Center
        if (dimensions.width > 0) {
            const initialTransform = d3.zoomIdentity.translate(dimensions.width / 2, 80).scale(0.8);
            d3.select(svgRef.current).call(zoomBehavior.transform, initialTransform);
        }
    }, [dimensions, zoomBehavior, setStage]);

    // --- JOURNEY STAGE LISTENER ---
    // If user clicks "Sprout" or "Tree" in the StageSelector, we animate there.
    useEffect(() => {
        if (!targetStage) return;
        if (!svgRef.current || dimensions.width === 0) return;

        if (targetStage === 'sprout') {
            // Collapse Trunks
            const newSet = new Set<string>();
            dataRef.current.forEach(node => {
                if (node.type === 'trunk' || node.type === 'branch') {
                    newSet.add(node.id);
                }
            });
            setCollapsedIds(newSet);

            // Zoom Out
            d3.select(svgRef.current).transition().duration(1000)
                // @ts-ignore
                .call(zoomBehavior.transform, d3.zoomIdentity.translate(dimensions.width / 2, 80).scale(0.4));

        } else if (targetStage === 'tree') {
            // Expand Trunks
            setCollapsedIds(prev => {
                const next = new Set(prev);
                dataRef.current.forEach(node => {
                    if (node.type === 'trunk') next.delete(node.id);
                });
                return next;
            });

            // Zoom In
            d3.select(svgRef.current).transition().duration(1000)
                // @ts-ignore
                .call(zoomBehavior.transform, d3.zoomIdentity.translate(dimensions.width / 2, 80).scale(1.0));
        }
    }, [targetStage, dimensions, zoomBehavior]);


    // --- HIERARCHY PROCESSING (ENCAPSULATION LOGIC) ---
    const { root, nodes, links } = useMemo(() => {
        if (!data.length) return { root: null, nodes: [], links: [] };

        const stratify = d3.stratify<TreeContentSimple>()
            .id(d => d.id)
            .parentId(d => d.parentId);

        const fullRoot = stratify(data);

        // Apply Collapsed State ("Encapsulation")
        // We traverse normally, but if a node is collapsed, we move children to _children
        // and do not recurse further for layout.
        fullRoot.each((node) => {
            // @ts-ignore
            if (collapsedIds.has(node.data.id)) {
                if (node.children) {
                    // @ts-ignore
                    node._children = node.children;
                    node.children = undefined;
                }
            } else {
                // @ts-ignore
                if (node._children) {
                    // @ts-ignore
                    node.children = node._children;
                    // @ts-ignore
                    node._children = undefined;
                }
            }
        });

        // Layout
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
    const handleNodeClick = useCallback((node: d3.HierarchyNode<TreeContentSimple>) => {
        // Toggle collapse
        // @ts-ignore
        const hasChildren = node.children || node._children;

        if (hasChildren) {
            // 1. Update State
            setCollapsedIds(prev => {
                const next = new Set(prev);
                const isCollapsing = !next.has(node.data.id); // If currently open, we are collapsing? No.
                // If not in set, it is Expanded. So adding it Collapses it.
                // If in set, it is Collapsed. So removing it Expands it.

                if (next.has(node.data.id)) {
                    // EXPANDING
                    next.delete(node.data.id);

                    // 2. Zoom to Fit (Focus on the expanding node)
                    // We need to wait for layout update? 
                    // We can approximate the new center. 
                    // Or just center THIS node.
                    if (svgRef.current && dimensions.width > 0) {
                        const targetScale = 1.2; // Zoom in a bit
                        const targetX = dimensions.width / 2 - (node.x || 0) * targetScale;
                        // Flip Y for target calculation too
                        const nodeY = dimensions.height - (node.y || 0) - 100;
                        const targetY = dimensions.height / 2 - nodeY * targetScale;

                        // Use transition
                        // @ts-ignore - D3 types are complex
                        d3.select(svgRef.current).transition().duration(750)
                            .call(zoomBehavior.transform, d3.zoomIdentity.translate(targetX, targetY).scale(targetScale));
                    }

                } else {
                    // COLLAPSING
                    next.add(node.data.id);
                }
                return next;
            });
        } else {
            // Leaf node -> Detail
            onNodeClick?.(node.data);
        }
    }, [dimensions, zoomBehavior, onNodeClick]);


    if (!root) return (
        <div ref={containerRef} className="w-full h-[500px] sm:h-[700px] bg-void/50 border border-white/10 rounded-xl overflow-hidden relative flex items-center justify-center">
            <div className="text-white/40 text-sm font-mono animate-pulse">{t('treeView.loading')}</div>
        </div>
    );

    return (
        <div
            ref={containerRef}
            className="w-full h-[500px] sm:h-[700px] bg-void/50 border border-white/10 rounded-xl overflow-hidden relative cursor-move touch-manipulation group"
            style={{ touchAction: 'none' }}
        >
            <svg ref={svgRef} width={dimensions.width} height={dimensions.height}>
                <defs>
                    <linearGradient id="link-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#818CF8" stopOpacity="0.8" />
                    </linearGradient>
                    {/* Encapsulated Node Glow */}
                    <filter id="encapsulated-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
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
                            const sourceY = dimensions.height - (link.source.y || 0) - 100;
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

                            const radius = node.data.type === 'root' ? 24 : node.data.type === 'trunk' ? 16 : 10;
                            const flippedY = dimensions.height - (node.y || 0) - 100;

                            // Encapsulation Visuals
                            const isEncapsulated = hasChildren && isCollapsed;

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
                                    {/* Encapsulation Pulse (Back) */}
                                    {isEncapsulated && (
                                        <circle
                                            r={radius + 8}
                                            fill="rgba(255, 255, 255, 0.1)"
                                            filter="url(#encapsulated-glow)"
                                        >
                                            <animate attributeName="r" values={`${radius + 5};${radius + 10};${radius + 5}`} dur="3s" repeatCount="indefinite" />
                                            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
                                        </circle>
                                    )}

                                    {/* Main Circle */}
                                    <circle
                                        r={radius}
                                        fill={node.data.type === 'root' ? '#F472B6' : (isEncapsulated ? '#FFFFFF' : (hasChildren ? '#2DD4BF' : '#818CF8'))}
                                        stroke={isEncapsulated ? '#2DD4BF' : 'white'}
                                        strokeWidth={isEncapsulated ? 3 : 2}
                                    />

                                    {/* Label */}
                                    <text
                                        y={radius + 15}
                                        textAnchor="middle"
                                        className="font-mono text-[10px] sm:text-xs uppercase tracking-wide fill-white drop-shadow-md select-none"
                                        style={{
                                            textShadow: '0 2px 4px rgba(0,0,0,0.9)',
                                            fontWeight: node.data.type === 'root' ? 'bold' : 'normal',
                                            opacity: isEncapsulated ? 1 : 0.9
                                        }}
                                    >
                                        {node.data.title}
                                    </text>

                                    {/* Interaction Hint (Only if children) */}
                                    {hasChildren && (
                                        <text x={0} y={4} textAnchor="middle" fontSize={10} fill={isEncapsulated ? "#2DD4BF" : "white"} fontWeight="bold" className="pointer-events-none">
                                            {isCollapsed ? '+' : ''}
                                        </text>
                                    )}
                                </motion.g>
                            );
                        })}
                    </AnimatePresence>
                </g>
            </svg>

            {/* Visual Title */}
            <div className="absolute top-4 left-4 pointer-events-none">
                <div className="text-white/30 text-xs font-mono uppercase tracking-widest mb-1">
                    {intent ? t('treeView.intentLabel').replace('{intent}', intent) : t('treeView.modeExploration')}
                </div>
                <div className="text-white/80 font-bold text-sm">
                    {collapsedIds.size > 10 ? t('treeView.lodSprout') : t('treeView.lodTree')}
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white backdrop-blur-md transition-colors"
                    onClick={() => {
                        d3.select(svgRef.current).transition().duration(750)
                            // @ts-ignore - D3 transition types are complex
                            .call(zoomBehavior.transform, d3.zoomIdentity.translate(dimensions.width / 2, 80).scale(0.8));
                    }}
                    title="Reset View"
                >
                    <RotateCcw size={20} />
                </button>
            </div>
        </div>
    );
}
