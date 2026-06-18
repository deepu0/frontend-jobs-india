'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchAllJobs, fetchJobById as fetchJobByIdService } from '@/lib/services/jobs';
import { Job } from '@/types/job';
import { FilterState } from '@/components/jobs/FilterBar';

interface UseJobsReturn {
    jobs: Job[];
    allJobs: Job[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useJobs(filters?: FilterState): UseJobsReturn {
    const [allJobs, setAllJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAllJobs();
            setAllJobs(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch jobs';
            setError(errorMessage);
            console.error('Error fetching jobs:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

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

    return { jobs, allJobs, loading, error, refetch: fetchJobs };
}

interface UseJobReturn {
    job: Job | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useJob(id: string): UseJobReturn {
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchJob = useCallback(async () => {
        if (!id) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await fetchJobByIdService(id);
            setJob(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch job';
            setError(errorMessage);
            console.error('Error fetching job:', err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchJob();
    }, [fetchJob]);

    return { job, loading, error, refetch: fetchJob };
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
