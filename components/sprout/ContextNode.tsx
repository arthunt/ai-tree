"use client";

import { motion, useAnimation } from 'framer-motion';
import { useSproutContext } from './SproutContext';
import { useEffect, useState } from 'react';

interface ContextNodeProps {
    id: string;
    label: string;
    initialX: number; // Offset from center
    initialY: number; // Offset from center
    // We don't strictly need targetRef if we assume center is (0,0)
}

export function ContextNode({ id, label, initialX, initialY }: ContextNodeProps) {
    const { connectNode, connectedNodes } = useSproutContext();
    const controls = useAnimation();
    const [isDragging, setIsDragging] = useState(false);

    const isConnected = connectedNodes.includes(id);

    useEffect(() => {
        if (isConnected) {
            // Animate to center (0,0 relative to parent center)
            controls.start({
                x: -initialX, // Move to true center
                y: -initialY,
                scale: 0,
                opacity: 0,
                transition: { duration: 0.5, ease: "backIn" }
            });
        }
    }, [isConnected, initialX, initialY, controls]);

    return (
        <motion.div
            drag={!isConnected}
            dragConstraints={{ left: -150 - initialX, right: 150 - initialX, top: -150 - initialY, bottom: 150 - initialY }}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
                setIsDragging(false);

                // Calculate position relative to the center (0,0)
                // Current Position = Initial Offset + Drag Delta
                const finalX = initialX + info.offset.x;
                const finalY = initialY + info.offset.y;

                const distanceToCenter = Math.sqrt(finalX ** 2 + finalY ** 2);

                // Seed radius (32px) + Node radius (20px) + Tolerance (~40px)
                if (distanceToCenter < 100) {
                    connectNode(id);
                } else {
                    controls.start({ x: initialX, y: initialY, transition: { type: "spring" } });
                }
            }}
            initial={{ x: initialX, y: initialY }} // Framer Motion uses translate transform
            animate={controls}
            whileHover={{ scale: 1.1, cursor: 'grab' }}
            whileTap={{ scale: 0.95, cursor: 'grabbing' }}
            className={`absolute top-1/2 left-1/2 -ml-10 -mt-10 w-20 h-20 rounded-full flex items-center justify-center text-xs text-center font-bold p-2 backdrop-blur-md border border-white/20 shadow-lg select-none
                ${isConnected ? 'bg-brand-teal' : 'bg-indigo-500/30'}
                ${isDragging ? 'z-50 ring-2 ring-white/50' : 'z-30'}
            `}
        >
            {label}
        </motion.div>
    );
}
