'use client';

import { Job } from '@/types/job';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Clock, DollarSign, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface JobCardProps {
    job: Job;
}

export function JobCard({ job }: JobCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={cn(
                "group relative bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300",
                job.isFeatured ? "border-l-8 border-brand-primary ring-2 ring-brand-primary/10" : "border-l-8 border-transparent border-b border-border"
            )}
        >
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
                {/* Logo Section */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden bg-white shadow-xl border border-border group-hover:scale-105 transition-transform duration-500 flex-shrink-0">
                    <img
                        src={job.company.logo}
                        alt={job.company.name}
                        className="w-full h-full object-contain p-4"
                    />
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center md:text-left space-y-4">
                    <div className="space-y-1">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <Link href={`/companies/${job.companyId}`} className="text-xl font-bold text-brand-primary hover:underline">
                                {job.company.name}
                            </Link>
                            {job.isVerified && (
                                <ShieldCheck className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                            )}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-foreground group-hover:text-brand-primary transition-colors">
                            <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                        </h3>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-lg font-bold text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-5 h-5 text-slate-400" />
                            {job.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                            <DollarSign className="w-5 h-5" />
                            {job.salaryRange}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-5 h-5" />
                            {job.postedAt}
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <Badge variant="default" className="bg-slate-950 text-white dark:bg-slate-800 font-black px-4 py-1.5 rounded-xl uppercase text-xs tracking-widest">{job.type}</Badge>
                        <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-black px-4 py-1.5 rounded-xl uppercase text-xs tracking-widest">{job.seniority}</Badge>
                        {job.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="border-border text-muted-foreground font-bold px-4 py-1.5 rounded-xl text-xs uppercase tracking-widest">{tag}</Badge>
                        ))}
                    </div>
                </div>

                {/* Action Section */}
                <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3">
                    <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-12 py-5 rounded-2xl bg-brand-primary text-white font-black text-xl hover:shadow-2xl hover:shadow-brand-primary/30 transition-all active:scale-[0.97] group-hover:bg-brand-primary/90"
                    >
                        APPLY <ExternalLink className="w-5 h-5" />
                    </a>
                    <Link
                        href={`/jobs/${job.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-12 py-5 rounded-2xl border-4 border-slate-950 dark:border-white text-slate-950 dark:text-white font-black text-xl hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all active:scale-[0.97]"
                    >
                        INFO
                    </Link>
                </div>
            </div>

            <div className="absolute top-4 right-4 md:hidden">
                <button className="p-2 bg-muted rounded-full">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </motion.div>
    );
}
