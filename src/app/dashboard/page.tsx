'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Job, Company } from '@/types/job';
import { 
    Briefcase, Building2, Plus, Loader2, Trash2, Edit2, 
    ExternalLink, Eye, TrendingUp, Calendar, LogOut, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface JobWithCompany extends Job {
    company: Company;
}

export default function DashboardPage() {
    const { user, signOut, loading: authLoading, isAdmin } = useAuth();
    const router = useRouter();
    const [jobs, setJobs] = useState<JobWithCompany[]>([]);
    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }
        if (user) {
            fetchUserData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, authLoading]);

    async function fetchUserData() {
        setLoading(true);
        try {
            // For admin: fetch ALL jobs, for regular user: fetch only their jobs
            const jobsQuery = isAdmin
                ? supabase.from('jobs').select('*, company:companies(*)').order('created_at', { ascending: false })
                : supabase.from('jobs').select('*, company:companies(*)').eq('user_id', user?.id).order('created_at', { ascending: false });

            const { data: jobsData, error: jobsError } = await jobsQuery;

            if (jobsError) throw jobsError;
            setJobs(jobsData as unknown as JobWithCompany[]);

            // Fetch user's company (or first company for admin)
            const companyQuery = isAdmin
                ? supabase.from('companies').select('*').limit(1).maybeSingle()
                : supabase.from('companies').select('*').eq('user_id', user?.id).maybeSingle();

            const { data: companyData, error: companyError } = await companyQuery;

            if (companyError && companyError.code !== 'PGRST116') throw companyError;
            setCompany(companyData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            console.error('Error fetching user data:', errorMessage);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteJob(jobId: string) {
        if (!confirm('Are you sure you want to delete this job?')) return;

        setDeleteLoading(jobId);
        try {
            // Admin can delete any job, regular user can only delete their own
            const deleteQuery = isAdmin
                ? supabase.from('jobs').delete().eq('id', jobId)
                : supabase.from('jobs').delete().eq('id', jobId).eq('user_id', user?.id);

            const { error } = await deleteQuery;

            if (error) throw error;

            setJobs(jobs.filter(job => job.id !== jobId));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete job';
            alert('Failed to delete job: ' + errorMessage);
        } finally {
            setDeleteLoading(null);
        }
    }

    async function handleSignOut() {
        await signOut();
        router.push('/');
    }

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
            </div>
        );
    }

    const stats = [
        { label: isAdmin ? 'Total Jobs' : 'Active Jobs', value: jobs.length, icon: Briefcase },
        { label: 'Total Views', value: '0', icon: Eye },
        { label: 'Applications', value: '0', icon: TrendingUp },
        { label: 'Days Active', value: company?.created_at ? Math.ceil((Date.now() - new Date(company.created_at).getTime()) / (1000 * 60 * 60 * 24)) : 0, icon: Calendar },
    ];

    return (
        <div className="pt-24 pb-20 min-h-screen bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
                                {isAdmin && (
                                    <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                        <Shield className="w-3 h-3" />
                                        ADMIN
                                    </span>
                                )}
                            </div>
                            <p className="text-muted-foreground mt-1">Welcome back, {user?.email}</p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/post-job"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-brand-primary/25 transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                Post New Job
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="inline-flex items-center gap-2 px-6 py-3 border border-border font-bold rounded-xl hover:bg-muted transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white border border-border rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-brand-primary/10 rounded-lg">
                                    <stat.icon className="w-5 h-5 text-brand-primary" />
                                </div>
                            </div>
                            <p className="text-2xl font-black">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - My Jobs */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-border rounded-2xl overflow-hidden">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-brand-primary" />
                                    {isAdmin ? 'All Job Listings' : 'My Job Listings'}
                                    {isAdmin && (
                                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                                            (Admin View)
                                        </span>
                                    )}
                                </h2>
                            </div>

                            <div className="divide-y divide-border">
                                {jobs.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                        <h3 className="font-bold mb-2">No jobs posted yet</h3>
                                        <p className="text-muted-foreground mb-4">Start hiring by posting your first job</p>
                                        <Link
                                            href="/post-job"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-xl"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Post a Job
                                        </Link>
                                    </div>
                                ) : (
                                    jobs.map((job) => (
                                        <div key={job.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center flex-shrink-0">
                                                    {job.company?.logo ? (
                                                        <img
                                                            src={job.company.logo}
                                                            alt={job.company.name}
                                                            className="w-full h-full object-contain p-2"
                                                        />
                                                    ) : (
                                                        <Building2 className="w-6 h-6 text-muted-foreground" />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <Link href={`/jobs/${job.id}`}>
                                                                <h3 className="font-bold text-lg hover:text-brand-primary transition-colors">
                                                                    {job.title}
                                                                </h3>
                                                            </Link>
                                                            <p className="text-sm text-muted-foreground">
                                                                {job.company?.name} • Posted {new Date(job.postedAt).toLocaleDateString()}
                                                            </p>
                                                            <div className="flex flex-wrap gap-2 mt-2">
                                                                <span className="text-xs px-2 py-1 bg-slate-100 rounded-full font-medium">
                                                                    {job.type}
                                                                </span>
                                                                <span className="text-xs px-2 py-1 bg-slate-100 rounded-full font-medium">
                                                                    {job.location}
                                                                </span>
                                                                <span className="text-xs px-2 py-1 bg-slate-100 rounded-full font-medium">
                                                                    {job.salaryRange}
                                                                </span>
                                                                {job.isFeatured && (
                                                                    <span className="text-xs px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-full font-medium">
                                                                        Featured
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-2">
                                                            <Link
                                                                href={`/jobs/${job.id}`}
                                                                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                                                                title="View"
                                                            >
                                                                <ExternalLink className="w-4 h-4" />
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDeleteJob(job.id)}
                                                                disabled={deleteLoading === job.id}
                                                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors disabled:opacity-50"
                                                                title="Delete"
                                                            >
                                                                {deleteLoading === job.id ? (
                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                ) : (
                                                                    <Trash2 className="w-4 h-4" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Company Profile */}
                    <div>
                        <div className="bg-white border border-border rounded-2xl overflow-hidden sticky top-24">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Building2 className="w-5 h-5 text-brand-primary" />
                                    Company Profile
                                </h2>
                            </div>

                            <div className="p-6">
                                {company ? (
                                    <div className="text-center">
                                        <div className="w-20 h-20 rounded-2xl bg-white border border-border mx-auto mb-4 flex items-center justify-center overflow-hidden">
                                            {company.logo ? (
                                                <img
                                                    src={company.logo}
                                                    alt={company.name}
                                                    className="w-full h-full object-contain p-2"
                                                />
                                            ) : (
                                                <Building2 className="w-10 h-10 text-muted-foreground" />
                                            )}
                                        </div>

                                        <h3 className="font-bold text-lg">{company.name}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {company.tagline || 'No tagline set'}
                                        </p>

                                        <div className="mt-4 space-y-2">
                                            {company.website && (
                                                <a
                                                    href={company.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm text-brand-primary hover:underline"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    {company.website.replace(/^https?:\/\//, '')}
                                                </a>
                                            )}
                                        </div>

                                        <button className="mt-6 w-full py-3 border border-border rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            Edit Profile
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                        <h3 className="font-bold mb-2">No company profile</h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Create a company profile when you post your first job
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
