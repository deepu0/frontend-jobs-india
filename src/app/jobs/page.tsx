'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Job } from '@/types/job';
import { JobCard } from '@/components/jobs/JobCard';
import { FilterBar } from '@/components/jobs/FilterBar';
import { Loader2, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const JOBS_PER_PAGE = 10;

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);

    useEffect(() => {
        fetchJobs();
    }, [currentPage]);

    async function fetchJobs() {
        setLoading(true);
        try {
            // Get total count
            const { count } = await supabase
                .from('jobs')
                .select('*', { count: 'exact', head: true });
            
            setTotalJobs(count || 0);

            // Get paginated jobs
            const { data, error } = await supabase
                .from('jobs')
                .select('*, company:companies(*)')
                .order('is_featured', { ascending: false })
                .order('created_at', { ascending: false })
                .range((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE - 1);

            if (error) throw error;
            setJobs(data as unknown as Job[]);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);
    const featuredJobs = jobs.filter(job => job.isFeatured);
    const regularJobs = jobs.filter(job => !job.isFeatured);

    return (
        <div className="pt-24 pb-20 min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                            All Frontend Jobs
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Discover {totalJobs}+ opportunities at top companies hiring frontend developers in India
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
                <FilterBar />
            </div>

            {/* Job Listings */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground font-medium">
                        <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
                        Loading jobs...
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500 font-bold">
                        Failed to load jobs. Please try again later.
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20">
                        <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">No jobs found</h3>
                        <p className="text-muted-foreground">Be the first to post a job!</p>
                    </div>
                ) : (
                    <>
                        {/* Results count */}
                        <div className="mb-6 text-sm text-muted-foreground">
                            Showing {jobs.length} of {totalJobs} jobs
                        </div>

                        {/* Featured Jobs */}
                        {featuredJobs.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
                                    Featured Opportunities
                                </h2>
                                <div className="grid gap-6">
                                    {featuredJobs.map(job => (
                                        <JobCard key={job.id} job={job} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Regular Jobs */}
                        {regularJobs.length > 0 && (
                            <div className="grid gap-6">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
                                    All Opportunities
                                </h2>
                                {regularJobs.map(job => (
                                    <JobCard key={job.id} job={job} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-xl border border-border font-bold hover:bg-muted transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                
                                <div className="flex gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-10 h-10 rounded-xl font-bold transition-all ${
                                                currentPage === page
                                                    ? 'bg-brand-primary text-white'
                                                    : 'border border-border hover:bg-muted'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-xl border border-border font-bold hover:bg-muted transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
