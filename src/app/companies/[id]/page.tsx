'use client';

import { useParams } from 'next/navigation';
import { MOCK_JOBS } from '@/data/mock-jobs';
import { JobCard } from '@/components/jobs/JobCard';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Globe, Twitter, Github, Linkedin, Users, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function CompanyProfilePage() {
    const { id } = useParams();
    const companyJobs = MOCK_JOBS.filter(j => j.companyId === id);
    const company = companyJobs[0]?.company || MOCK_JOBS[0].company;

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-border/50 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />

                <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start md:items-center">
                    <div className="w-32 h-32 rounded-[2rem] border-4 border-white dark:border-slate-800 bg-white shadow-2xl overflow-hidden p-2">
                        <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                    </div>

                    <div className="flex-1 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{company.name}</h1>
                        <p className="text-xl text-muted-foreground font-medium">{company.tagline}</p>

                        <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-muted-foreground pt-2">
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-brand-primary" /> {company.website.replace('https://', '')}
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-brand-secondary" /> 1,000+ Employees
                            </div>
                            <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-emerald-500" /> Headquartered in San Francisco
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Link href="#" className="bg-brand-primary text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all active:scale-95">
                            Follow
                        </Link>
                        <div className="flex gap-2">
                            {company.socials.twitter && (
                                <Link href={`https://twitter.com/${company.socials.twitter}`} className="p-3 rounded-xl bg-card border border-border hover:border-brand-primary transition-colors">
                                    <Twitter className="w-5 h-5 text-muted-foreground" />
                                </Link>
                            )}
                            <Link href="#" className="p-3 rounded-xl bg-card border border-border hover:border-brand-primary transition-colors">
                                <Linkedin className="w-5 h-5 text-muted-foreground" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6">About the company</h2>
                        <p className="text-lg leading-relaxed text-muted-foreground prose dark:prose-invert">
                            {company.description}
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">Open Roles</h2>
                            <Badge variant="secondary">{companyJobs.length} active jobs</Badge>
                        </div>
                        <div className="grid gap-6">
                            {companyJobs.map(job => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <div className="p-8 rounded-3xl bg-card border border-border">
                        <h3 className="text-xl font-bold mb-6">Company Culture</h3>
                        <div className="space-y-6">
                            {[
                                "Remote-first work options",
                                "Unlimited PTO & Sick Days",
                                "Annual learning stipend",
                                "Weekly engineering deep-dives"
                            ].map(item => (
                                <div key={item} className="flex gap-3 items-center text-muted-foreground font-medium">
                                    <div className="w-2 h-2 rounded-full bg-brand-primary" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-linear-to-br from-brand-primary to-brand-secondary text-white shadow-xl shadow-brand-primary/10">
                        <h3 className="text-xl font-bold mb-4">Want to work at {company.name}?</h3>
                        <p className="text-white/80 mb-8 leading-relaxed">
                            We're always looking for talented engineers and designers to join our growing team.
                        </p>
                        <button className="w-full py-4 bg-white text-brand-primary rounded-2xl font-extrabold hover:shadow-xl transition-all active:scale-95">
                            Contact Hiring Team
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
