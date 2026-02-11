'use client';

import { Star, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';

export function PremiumUpsell() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-12"
        >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary rounded-full blur-[100px] opacity-20 -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary rounded-full blur-[100px] opacity-20 -ml-32 -mb-32" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 text-center md:text-left">
                    <Badge className="bg-brand-accent/20 text-brand-accent border-brand-accent/30 mb-6">
                        <Zap className="w-3 h-3 fill-brand-accent mr-1" /> Premium Access
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                        Get hired 3x faster with <br />
                        <span className="text-brand-secondary">FrontHire Plus</span>
                    </h2>

                    <ul className="space-y-4 mb-10">
                        {[
                            "Early access to new jobs (24h before others)",
                            "Highlight your profile to top companies",
                            "Direct messaging with hiring managers",
                            "Personalized career coaching sessions"
                        ].map(item => (
                            <li key={item} className="flex items-center gap-3 text-slate-300">
                                <CheckCircle2 className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                                <span className="font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button className="bg-brand-primary hover:bg-indigo-600 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-brand-primary/20">
                            Get Instant Access <ArrowRight className="w-5 h-5" />
                        </button>
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
                                ))}
                            </div>
                            <span>Trusted by 5,000+ devs</span>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-80 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 rotate-2 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-slate-700 rounded-full animate-pulse" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-slate-700 rounded w-2/3 animate-pulse" />
                            <div className="h-3 bg-slate-700 rounded w-1/2 animate-pulse" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="h-4 bg-slate-700 rounded w-full animate-pulse" />
                        <div className="h-4 bg-slate-700 rounded w-full animate-pulse" />
                        <div className="h-4 bg-slate-700 rounded w-4/5 animate-pulse" />
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-700 flex justify-between items-center">
                        <div className="h-8 bg-brand-primary/20 rounded-lg w-24 animate-pulse" />
                        <div className="w-8 h-8 rounded-full border-2 border-brand-secondary border-t-transparent animate-spin" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
