'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Job } from '@/types/job';

export function useJobs() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const { data, error } = await supabase
                    .from('jobs')
                    .select('*, company:companies(*)')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                // Map snake_case from DB to camelCase for the frontend types if necessary
                // In our schema they mostly match or we can just use the DB data directly
                setJobs(data as unknown as Job[]);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, []);

    return { jobs, loading, error };
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
