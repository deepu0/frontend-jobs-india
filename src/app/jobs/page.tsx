'use client';

import { useState, Suspense } from 'react';
import { JobCard } from '@/components/jobs/JobCard';
import { FilterBar, FilterState } from '@/components/jobs/FilterBar';
import { usePaginatedJobs } from '@/hooks/useJobs';
import { Loader2, Briefcase, SearchX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

const JOBS_PER_PAGE = 10;

function JobsContent() {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);

    // Get filters from URL params
    const filters: FilterState = {
        search: searchParams.get('search') || '',
        location: searchParams.getAll('location'),
        salary: searchParams.getAll('salary'),
        type: searchParams.getAll('type'),
        seniority: searchParams.getAll('seniority'),
    };

    const { 
        jobs, 
        featuredJobs, 
        regularJobs, 
        loading, 
        error, 
        totalJobs, 
        totalPages 
    } = usePaginatedJobs(filters, currentPage, JOBS_PER_PAGE);

    // Reset to page 1 when filters change
    useState(() => {
        setCurrentPage(1);
    });

    const hasActiveFilters = 
        filters.search ||
        filters.location.length > 0 ||
        filters.salary.length > 0 ||
        filters.type.length > 0 ||
        filters.seniority.length > 0;

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
                            Discover {loading ? '...' : totalJobs}+ opportunities at top companies hiring frontend developers in India
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
                        <SearchX className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">No jobs found</h3>
                        <p className="text-muted-foreground mb-4">
                            {hasActiveFilters 
                                ? "Try adjusting your filters to see more results" 
                                : "Be the first to post a job!"}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Results count */}
                        <div className="mb-6 text-sm text-muted-foreground">
                            Showing {jobs.length} of {totalJobs} jobs
                            {hasActiveFilters && <span className="ml-2 text-brand-primary">(filtered)</span>}
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
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        // Show pages around current page
                                        let pageNum = i + 1;
                                        if (totalPages > 5) {
                                            if (currentPage > 3) {
                                                pageNum = currentPage - 3 + i;
                                            }
                                            if (pageNum > totalPages) {
                                                pageNum = totalPages - (4 - i);
                                            }
                                        }
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`w-10 h-10 rounded-xl font-bold transition-all ${
                                                    currentPage === pageNum
                                                        ? 'bg-brand-primary text-white'
                                                        : 'border border-border hover:bg-muted'
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
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

export default function JobsPage() {
    return (
        <Suspense fallback={
            <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
            </div>
        }>
            <JobsContent />
        </Suspense>
    );
}
