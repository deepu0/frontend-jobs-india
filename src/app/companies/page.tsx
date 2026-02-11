'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Company } from '@/types/job';
import { Building2, Loader2, Search, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CompanyWithJobCount extends Company {
    jobCount: number;
}

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<CompanyWithJobCount[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCompanies();
    }, []);

    async function fetchCompanies() {
        setLoading(true);
        try {
            // Get companies with job count
            const { data: companiesData, error: companiesError } = await supabase
                .from('companies')
                .select('*')
                .order('name');

            if (companiesError) throw companiesError;

            // Get job counts for each company
            const { data: jobsData, error: jobsError } = await supabase
                .from('jobs')
                .select('company_id');

            if (jobsError) throw jobsError;

            // Count jobs per company
            const jobCounts: Record<string, number> = {};
            jobsData?.forEach(job => {
                jobCounts[job.company_id] = (jobCounts[job.company_id] || 0) + 1;
            });

            // Merge data
            const companiesWithCounts = companiesData.map(company => ({
                ...company,
                jobCount: jobCounts[company.id] || 0,
            }));

            setCompanies(companiesWithCounts);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load companies';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.tagline?.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            Top Companies Hiring
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Discover {companies.length}+ companies actively hiring frontend developers
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Search */}
            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
                <div className="bg-card border border-border rounded-2xl shadow-lg p-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-14 pl-12 pr-4 bg-background border border-border rounded-xl outline-none focus:border-brand-primary transition-colors font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* Companies Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground font-medium">
                        <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
                        Loading companies...
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500 font-bold">
                        Failed to load companies. Please try again later.
                    </div>
                ) : filteredCompanies.length === 0 ? (
                    <div className="text-center py-20">
                        <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">No companies found</h3>
                        <p className="text-muted-foreground">Try a different search term</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 text-sm text-muted-foreground">
                            Showing {filteredCompanies.length} companies
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCompanies.map((company, index) => (
                                <motion.div
                                    key={company.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link href={`/companies/${company.id}`}>
                                        <div className="group bg-card border border-border rounded-2xl p-6 hover:border-brand-primary/50 hover:shadow-lg transition-all h-full">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-16 h-16 rounded-xl bg-white border border-border flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                    {company.logo ? (
                                                        <img
                                                            src={company.logo}
                                                            alt={company.name}
                                                            className="w-full h-full object-contain p-2"
                                                        />
                                                    ) : (
                                                        <Building2 className="w-8 h-8 text-muted-foreground" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-lg truncate group-hover:text-brand-primary transition-colors">
                                                        {company.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <span className="bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full font-semibold">
                                                            {company.jobCount} {company.jobCount === 1 ? 'job' : 'jobs'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                                {company.tagline || company.description || 'No description available'}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                                <div className="flex gap-2">
                                                    {company.website && (
                                                        <a
                                                            href={company.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                                                            title="Website"
                                                        >
                                                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                                        </a>
                                                    )}
                                                </div>
                                                <span className="text-sm font-semibold text-brand-primary flex items-center gap-1">
                                                    View jobs
                                                    <ExternalLink className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
