"use client";

import { useState } from 'react';
import { LeadCaptureDialog, type LeadLabels } from './LeadCaptureDialog';

interface ApplyButtonProps {
    programId: string;
    programName: string;
    color: string;
    labels: LeadLabels;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}

export function ApplyButton({
    programId,
    programName,
    color,
    labels,
    className,
    style,
    children
}: ApplyButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={className}
                style={style}
            >
                {children}
            </button>

            <LeadCaptureDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                programId={programId}
                programName={programName}
                color={color}
                labels={labels}
            />
        </>
    );
}
