'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, signOut } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
            isScrolled ? 'bg-black/90 backdrop-blur-3xl border-b border-white/10' : 'bg-transparent'
        )}>
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center transform rotate-12 group hover:rotate-0 transition-transform duration-300">
                            <span className="text-white text-2xl font-black italic">H</span>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white uppercase italic">FrontHire</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 text-xs font-black uppercase tracking-[0.2em] text-white/60">
                        <Link href="/jobs" className="hover:text-brand-primary transition-colors">Find Jobs</Link>
                        <Link href="/companies" className="hover:text-brand-primary transition-colors">Companies</Link>
                        <Link href="/salaries" className="hover:text-brand-primary transition-colors">Salaries</Link>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    {user ? (
                        <div className="flex items-center gap-6">
                            <Link href="/dashboard" className="text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                                Dashboard
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
                            >
                                Sign Out
                            </button>
                            <Link
                                href="/post-job"
                                className="bg-white text-black px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all active:scale-95 shadow-xl"
                            >
                                Post a Job
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                                Log In
                            </Link>
                            <Link
                                href="/post-job"
                                className="bg-brand-primary text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(255,0,102,0.4)] transition-all active:scale-95"
                            >
                                Post a Job
                            </Link>
                        </>
                    )}
                </div>

                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-[80px] bg-black z-40 p-8 flex flex-col gap-8 md:hidden">
                    <Link href="/jobs" className="text-4xl font-black uppercase tracking-tighter italic">Find Jobs</Link>
                    <Link href="/companies" className="text-4xl font-black uppercase tracking-tighter italic">Companies</Link>
                    <Link href="/salaries" className="text-4xl font-black uppercase tracking-tighter italic">Salaries</Link>
                    <div className="mt-auto flex flex-col gap-4">
                        <Link href="/login" className="text-center py-6 text-xl font-black uppercase tracking-widest border border-white/10 rounded-2xl">Log In</Link>
                        <Link href="/post-job" className="bg-brand-primary text-white text-center py-6 text-xl font-black uppercase tracking-widest rounded-2xl">Post a Job</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
