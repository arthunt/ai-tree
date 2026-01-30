import { Suspense } from 'react';
import { SeedPageContent } from './SeedPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Choose Your Path | AI Tree',
    description: 'Select your intent: Build, Think, or Explore. Your journey starts here.',
};

export default function SeedPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-void flex items-center justify-center text-brand-teal">Loading...</div>}>
            <SeedPageContent />
        </Suspense>
    );
}
