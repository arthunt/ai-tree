"use client";

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlobalNavProps {
    extraControls?: React.ReactNode;
    transparent?: boolean;
}

export function GlobalNav({ extraControls, transparent = false }: GlobalNavProps) {
    const t = useTranslations('nav');
    const params = useParams();
    const locale = params.locale as string;
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = [
        { href: `/${locale}/tree-view`, label: t('tree'), id: 'tree' },
        { href: `/${locale}/dna`, label: t('mechanism'), id: 'dna' },
        { href: `/${locale}/learn`, label: t('learn'), id: 'learn' },
        { href: `/${locale}/proto`, label: t('proto'), id: 'proto' },
    ];

    const isActive = (href: string) => pathname?.includes(href);

    // Dynamic classes based on transparency
    const headerClass = transparent
        ? "fixed top-0 z-50 w-full transition-colors duration-300 hover:bg-black/80 bg-gradient-to-b from-black/50 to-transparent"
        : "sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700";

    const textClass = transparent ? "text-white hover:text-brand-cyan" : "text-gray-600 dark:text-gray-300 hover:text-brand-teal dark:hover:text-brand-cyan";
    const activeClass = transparent ? "text-brand-cyan font-bold" : "text-brand-teal dark:text-brand-cyan font-bold bg-brand-teal/5 dark:bg-brand-cyan/10 rounded-md";

    return (
        <header className={headerClass}>
            <div className="container mx-auto px-4 py-4 max-w-7xl flex items-center justify-between">

                {/* Left: Branding & Back */}
                <div className="flex items-center gap-6">
                    <Link
                        href={`/${locale}`}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium hidden sm:inline">{t('back')}</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-2">
                        {links.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 transition-all ${isActive(link.href) ? activeClass : textClass}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right: Controls */}
                <div className="flex items-center gap-3">
                    {/* Extra controls (like NameToggle) */}
                    <div className="hidden md:flex items-center gap-3">
                        {extraControls}
                    </div>

                    <div className="hidden sm:flex items-center gap-3">
                        <LanguageSwitcher />
                        <DarkModeToggle />
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden p-2 rounded-lg ${transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100'}`}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
                    >
                        <nav className="flex flex-col p-4 gap-2">
                            {links.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-4 py-3 rounded-lg text-lg ${isActive(link.href)
                                        ? 'bg-brand-teal/10 text-brand-teal font-bold'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
                            <div className="flex items-center justify-between px-2">
                                <span className="text-sm text-gray-500">Settings</span>
                                <div className="flex gap-2">
                                    <LanguageSwitcher />
                                    <DarkModeToggle />
                                </div>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
