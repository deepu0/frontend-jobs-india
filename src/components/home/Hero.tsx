'use client';

import { Search, MapPin, TrendingUp, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';

export function Hero() {
    const popularTags = ['React', 'Next.js', 'Typescript', 'Tailwind', 'Senior', 'Full-time'];

    return (
        <section className="relative pt-40 pb-20 overflow-hidden bg-black text-white min-h-[70vh] flex items-center">
            {/* Massive Background Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5 select-none overflow-hidden">
                <span className="text-[20rem] font-black leading-none whitespace-nowrap">REMOTE JOBS</span>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/20 rounded-full blur-[120px] -ml-64 -mb-64 animate-pulse delay-1000" />

            <div className="max-w-7xl mx-auto px-4 text-center relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-12"
                >
                    <Sparkles className="w-4 h-4 text-brand-primary animate-spin-slow" />
                    <span className="text-sm font-black tracking-widest">#1 CURATED JOB BOARD</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-giant mb-8"
                >
                    FIND THE BEST<br />
                    <span className="text-gradient">REMOTE JOBS</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-3xl mx-auto text-xl md:text-2xl text-white/60 font-black mb-16 italic tracking-tight"
                >
                    JOIN 2,000,000+ DEVELOPERS HIRING AT WORLD-CLASS TECHNOLOGY COMPANIES.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto p-4 bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(255,0,102,0.1)]"
                >
                    <div className="flex flex-col lg:flex-row gap-3">
                        <div className="flex-1 flex items-center px-8 gap-4 bg-white/5 rounded-[2rem] border border-white/10 focus-within:border-brand-primary transition-all">
                            <Search className="w-6 h-6 text-white/40" />
                            <input
                                type="text"
                                placeholder="ROLE, SKILL, OR COMPANY..."
                                className="w-full py-6 bg-transparent outline-none font-black text-xl placeholder:text-white/20 uppercase"
                            />
                        </div>
                        <div className="flex-1 flex items-center px-8 gap-4 bg-white/5 rounded-[2rem] border border-white/10 lg:w-72">
                            <MapPin className="w-6 h-6 text-white/40" />
                            <select className="flex-1 py-6 bg-transparent outline-none font-black text-xl text-white cursor-pointer uppercase appearance-none">
                                <option value="anywhere">🌍 ANYWHERE</option>
                                <option value="usa">🇺🇸 USA</option>
                                <option value="europe">🇪🇺 EUROPE</option>
                            </select>
                        </div>
                        <button className="bg-brand-primary text-white px-12 py-6 rounded-[2rem] font-black text-2xl hover:scale-105 transition-all active:scale-95 shadow-2xl shadow-brand-primary/50">
                            SEARCH
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 flex flex-wrap justify-center items-center gap-4"
                >
                    <span className="text-xs font-black text-white/40 uppercase tracking-[0.3em]">Trending Now:</span>
                    {popularTags.map(tag => (
                        <button key={tag} className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-black hover:bg-white/20 hover:border-white/40 transition-all uppercase tracking-widest text-white/80">
                            {tag}
                        </button>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
