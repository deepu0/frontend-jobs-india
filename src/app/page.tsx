'use client';

import { useState } from 'react';
import { Hero } from '@/components/home/Hero';
import { JobCard } from '@/components/jobs/JobCard';
import { FilterBar } from '@/components/jobs/FilterBar';
import { PremiumUpsell } from '@/components/home/PremiumUpsell';
import { useJobs } from '@/hooks/useJobs';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2 } from 'lucide-react';

export default function Home() {
  const [showBanner, setShowBanner] = useState(true);
  const { jobs, loading, error } = useJobs();

  const featuredJobs = jobs.filter(job => job.isFeatured);
  const regularJobs = jobs.filter(job => !job.isFeatured);

  return (
    <div className="flex flex-col gap-0">
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-brand-primary text-white py-2 px-4 relative z-[60] text-center text-sm font-bold flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            Hiring? Reach 1M+ professional frontend developers.
            <button className="underline ml-1">Post a job for free</button>
            <button
              onClick={() => setShowBanner(false)}
              className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 w-full pb-20">
        <FilterBar />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground font-medium">
            <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
            Searching for the best frontend roles...
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-bold">
            Failed to load jobs. Please try again later.
          </div>
        ) : (
          <>
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
            <div className="grid gap-6 mb-12">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
                Recent Postings
              </h2>
              {regularJobs.length > 0 ? (
                regularJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="p-12 text-center glass rounded-2xl border-dashed border-2 border-border text-muted-foreground">
                  No regular jobs found. Be the first to post!
                </div>
              )}
            </div>
          </>
        )}

        {/* Premium Section */}
        <div className="my-20">
          <PremiumUpsell />
        </div>

        {/* Pagination Placeholder */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 rounded-xl border border-border font-bold hover:bg-muted transition-all text-muted-foreground active:scale-95">
            Load more jobs
          </button>
        </div>
      </section>
    </div>
  );
}
