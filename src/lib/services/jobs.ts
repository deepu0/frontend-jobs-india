import { supabase } from '@/lib/supabase';
import { Job } from '@/types/job';

/**
 * Fetch all jobs with their associated company data.
 * Results are ordered by featured status and creation date.
 */
export async function fetchAllJobs(): Promise<Job[]> {
    const { data, error } = await supabase
        .from('jobs')
        .select('*, company:companies(*)')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as unknown as Job[]) || [];
}

/**
 * Fetch a single job by ID with its associated company data.
 */
export async function fetchJobById(id: string): Promise<Job> {
    const { data, error } = await supabase
        .from('jobs')
        .select('*, company:companies(*)')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data as unknown as Job;
}

/**
 * Fetch jobs for a specific user (used in dashboard).
 */
export async function fetchJobsByUserId(userId: string): Promise<Job[]> {
    const { data, error } = await supabase
        .from('jobs')
        .select('*, company:companies(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as unknown as Job[]) || [];
}

/**
 * Delete a job by ID. Optionally scoped to a specific user.
 */
export async function deleteJob(jobId: string, userId?: string): Promise<void> {
    let query = supabase.from('jobs').delete().eq('id', jobId);

    if (userId) {
        query = query.eq('user_id', userId);
    }

    const { error } = await query;
    if (error) throw error;
}

/**
 * Fetch job IDs grouped by company (for counting).
 */
export async function fetchJobCompanyIds(): Promise<{ company_id: string }[]> {
    const { data, error } = await supabase
        .from('jobs')
        .select('company_id');

    if (error) throw error;
    return data || [];
}
