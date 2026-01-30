"use client";

import { useState } from 'react';
import { LeadCaptureDialog, type LeadLabels } from './LeadCaptureDialog';

interface ApplyButtonProps {
    programId: string;
    programName: string;
    color: string;
    labels: LeadLabels;
    /** Button text (e.g. "Apply Now" or "Enroll Now") */
    children: React.ReactNode;
    /** Additional Tailwind classes */
    className?: string;
    /** Inline styles for the button */
    style?: React.CSSProperties;
}

export function ApplyButton({ programId, programName, color, labels, children, className, style }: ApplyButtonProps) {
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
