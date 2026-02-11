'use client';

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Job } from '@/types/job';
import { FilterState } from '@/components/jobs/FilterBar';

export function useJobs(filters?: FilterState) {
    const [allJobs, setAllJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const { data, error } = await supabase
                    .from('jobs')
                    .select('*, company:companies(*)')
                    .order('is_featured', { ascending: false })
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setAllJobs(data as unknown as Job[]);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, []);

    // Apply filters client-side
    const jobs = useMemo(() => {
        if (!filters) return allJobs;

        return allJobs.filter(job => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch = 
                    job.title.toLowerCase().includes(searchLower) ||
                    job.company?.name?.toLowerCase().includes(searchLower) ||
                    job.tags?.some(tag => tag.toLowerCase().includes(searchLower));
                if (!matchesSearch) return false;
            }

            // Location filter
            if (filters.location.length > 0) {
                const matchesLocation = filters.location.some(loc => {
                    if (loc === 'Remote') {
                        return job.locationType === 'Remote' || job.location?.toLowerCase().includes('remote');
                    }
                    return job.location?.toLowerCase().includes(loc.toLowerCase());
                });
                if (!matchesLocation) return false;
            }

            // Salary filter
            if (filters.salary.length > 0) {
                const matchesSalary = filters.salary.some(sal => {
                    // Extract min salary from range like "₹15L-₹45L" or "₹15 LPA"
                    const jobSalary = job.salaryRange?.toLowerCase() || '';
                    const minLakhs = parseInt(sal.replace(/[^0-9]/g, ''));
                    
                    // Extract numeric value from job salary
                    const jobMinMatch = jobSalary.match(/₹?(\d+)/);
                    const jobMinLakhs = jobMinMatch ? parseInt(jobMinMatch[1]) : 0;
                    
                    return jobMinLakhs >= minLakhs;
                });
                if (!matchesSalary) return false;
            }

            // Type filter
            if (filters.type.length > 0) {
                if (!filters.type.includes(job.type)) return false;
            }

            // Seniority filter
            if (filters.seniority.length > 0) {
                if (!filters.seniority.includes(job.seniority)) return false;
            }

            return true;
        });
    }, [allJobs, filters]);

    return { jobs, allJobs, loading, error };
}

export function useJob(id: string) {
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchJob() {
            if (!id) return;
            try {
                const { data, error } = await supabase
                    .from('jobs')
                    .select('*, company:companies(*)')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setJob(data as unknown as Job);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchJob();
    }, [id]);

    return { job, loading, error };
}

// Hook for paginated jobs with filters
export function usePaginatedJobs(
    filters: FilterState,
    page: number,
    pageSize: number = 10
) {
    const { jobs: allFilteredJobs, loading, error } = useJobs(filters);

    const totalJobs = allFilteredJobs.length;
    const totalPages = Math.ceil(totalJobs / pageSize);
    
    const jobs = useMemo(() => {
        const start = (page - 1) * pageSize;
        return allFilteredJobs.slice(start, start + pageSize);
    }, [allFilteredJobs, page, pageSize]);

    const featuredJobs = useMemo(() => 
        jobs.filter(job => job.isFeatured),
    [jobs]);

    const regularJobs = useMemo(() => 
        jobs.filter(job => !job.isFeatured),
    [jobs]);

    return { 
        jobs, 
        featuredJobs, 
        regularJobs, 
        loading, 
        error, 
        totalJobs, 
        totalPages 
    };
}
