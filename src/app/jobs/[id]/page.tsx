'use client';

import { useParams } from 'next/navigation';
import { useJob } from '@/hooks/useJobs';
import { Badge } from '@/components/ui/Badge';
import { JobCard } from '@/components/jobs/JobCard';
import { Job } from '@/types/job';
import {
    MapPin, Clock, DollarSign, ExternalLink, ShieldCheck,
    ArrowLeft, Share2, Bookmark, Globe, Twitter, Github, Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function JobDetailPage() {
    const { id } = useParams();
    const { job, loading, error } = useJob(id as string);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
                <span className="font-medium text-muted-foreground">Loading job details...</span>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen pt-32 text-center text-red-500 font-bold">
                Job not found. <Link href="/" className="underline text-brand-primary ml-2">Back to home</Link>
            </div>
        );
    }

    // Note: In real app, you'd fetch related jobs from Supabase too
    const relatedJobs: Job[] = [];

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-brand-primary transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" /> Back to job board
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Job Info */}
                <div className="lg:col-span-2 space-y-10">
                    <header className="space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="default" className="bg-brand-primary text-white border-none py-1">New</Badge>
                            <Badge variant="secondary">{job.type}</Badge>
                            <Badge variant="secondary">{job.seniority}</Badge>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{job.title}</h1>

                        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-lg font-medium text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-brand-primary" /> {job.location}
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-emerald-500" /> {job.salaryRange}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" /> Posted {job.postedAt} ago
                            </div>
                        </div>
                    </header>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <h2 className="text-2xl font-bold mb-4">About the role</h2>
                        <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                            {job.description}
                        </p>

                        <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
                        <ul className="space-y-3 mb-8">
                            {job.responsibilities.map((res, i) => (
                                <li key={i} className="flex gap-3 text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 flex-shrink-0" />
                                    {res}
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                        <ul className="space-y-3 mb-8">
                            {job.requirements.map((req, i) => (
                                <li key={i} className="flex gap-3 text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary mt-2.5 flex-shrink-0" />
                                    {req}
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-2xl font-bold mb-4">Benefits & Perks</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {job.benefits.map((ben, i) => (
                                <div key={i} className="p-4 rounded-xl bg-muted/50 border border-border flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                    <span className="font-medium">{ben}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="border-border" />

                    <section>
                        <h2 className="text-2xl font-bold mb-8 text-gradient">Related Jobs</h2>
                        <div className="grid gap-6">
                            {relatedJobs.map(j => (
                                <JobCard key={j.id} job={j} />
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Sticky Sidebar */}
                <div className="space-y-8">
                    <div className="sticky top-24 space-y-8">
                        {/* Apply Card */}
                        <div className="glass p-8 rounded-3xl border-2 border-brand-primary/20 shadow-xl shadow-brand-primary/5">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl border border-border bg-white p-2">
                                    <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{job.company.name}</h3>
                                    <Link href={`/companies/${job.companyId}`} className="text-sm text-brand-primary font-bold hover:underline">
                                        View profile
                                    </Link>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href={job.applyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-brand-primary text-white font-bold text-lg hover:shadow-lg hover:shadow-brand-primary/20 transition-all active:scale-95"
                                >
                                    Apply Now <ExternalLink className="w-5 h-5" />
                                </a>
                                <button className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-border font-bold hover:bg-muted transition-all active:scale-95">
                                    <Bookmark className="w-5 h-5" /> Save Job
                                </button>
                            </div>

                            <div className="mt-8 pt-8 border-t border-border flex justify-between">
                                <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground">
                                    <Share2 className="w-4 h-4" /> Share
                                </button>
                                <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground">
                                    Report job
                                </button>
                            </div>
                        </div>

                        {/* Company Info */}
                        <div className="p-8 rounded-3xl bg-card border border-border space-y-6">
                            <h3 className="text-xl font-bold">About {job.company.name}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {job.company.tagline}
                            </p>
                            <div className="flex gap-3">
                                <Link href={job.company.website} target="_blank" className="p-2 rounded-lg bg-muted hover:text-brand-primary transition-colors">
                                    <Globe className="w-5 h-5" />
                                </Link>
                                {job.company.socials.twitter && (
                                    <Link href={`https://twitter.com/${job.company.socials.twitter}`} target="_blank" className="p-2 rounded-lg bg-muted hover:text-brand-primary transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </Link>
                                )}
                                {job.company.socials.github && (
                                    <Link href={`https://github.com/${job.company.socials.github}`} target="_blank" className="p-2 rounded-lg bg-muted hover:text-brand-primary transition-colors">
                                        <Github className="w-5 h-5" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
