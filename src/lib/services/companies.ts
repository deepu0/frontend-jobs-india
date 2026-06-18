import { supabase } from '@/lib/supabase';
import { Company } from '@/types/job';

/**
 * Fetch all companies ordered by name.
 */
export async function fetchAllCompanies(): Promise<Company[]> {
    const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('name');

    if (error) throw error;
    return data || [];
}

/**
 * Fetch a single company by user ID.
 */
export async function fetchCompanyByUserId(userId: string): Promise<Company | null> {
    const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
}

/**
 * Fetch the first company (admin use case).
 */
export async function fetchFirstCompany(): Promise<Company | null> {
    const { data, error } = await supabase
        .from('companies')
        .select('*')
        .limit(1)
        .maybeSingle();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
}
