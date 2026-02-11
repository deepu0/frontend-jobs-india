'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { JobCard } from '@/components/jobs/JobCard';
import {
    Building2, MapPin, DollarSign, Briefcase,
    Type, FileText, Image as ImageIcon, Send, Sparkles, AlertCircle, Loader2
} from 'lucide-react';

export default function PostJobPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: 'Senior React Developer',
        companyName: 'Acme Corp',
        location: 'Remote',
        salaryRange: '$120k - $160k',
        type: 'Full-time',
        seniority: 'Senior',
        tags: 'React, TypeScript, Next.js',
        description: 'We are looking for a talented React developer to join our team...',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop&q=80',
        applyUrl: 'https://acme.com/jobs'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            router.push('/login');
            return;
        }
        setLoading(true);

        try {
            // 1. Create or get company
            // For simplicity in this demo, we'll just create a company record or use a dummy one
            const { data: companyData, error: companyError } = await supabase
                .from('companies')
                .insert({
                    name: formData.companyName,
                    logo: formData.logo,
                    tagline: 'Leading innovators in tech.',
                    user_id: user.id
                })
                .select()
                .single();

            if (companyError) throw companyError;

            // 2. Create job
            const { error: jobError } = await supabase
                .from('jobs')
                .insert({
                    title: formData.title,
                    company_id: companyData.id,
                    location: formData.location,
                    location_type: 'Remote',
                    salary_range: formData.salaryRange,
                    job_type: formData.type,
                    seniority: formData.seniority,
                    description: formData.description,
                    tags: formData.tags.split(',').map(t => t.trim()),
                    apply_url: formData.applyUrl,
                    user_id: user.id,
                    is_featured: true // Forced for demo
                });

            if (jobError) throw jobError;

            router.push('/');
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const previewJob = {
        id: 'preview',
        title: formData.title,
        companyId: 'acme',
        company: {
            id: 'acme',
            name: formData.companyName,
            logo: formData.logo,
            tagline: 'Leading innovators in tech.',
            description: 'Acme Corp is a global company focused on innovation.',
            website: 'https://acme.com',
            socials: {}
        },
        location: formData.location,
        locationType: 'Remote' as any,
        salaryRange: formData.salaryRange,
        type: formData.type,
        seniority: formData.seniority,
        postedAt: 'Just now',
        tags: formData.tags.split(',').map(t => t.trim()),
        description: formData.description,
        responsibilities: [],
        requirements: [],
        benefits: [],
        isFeatured: true,
        isVerified: true,
        applyUrl: '#'
    };

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Form Column */}
                <div className="space-y-10">
                    <header className="space-y-4">
                        <Badge variant="accent" className="px-4 py-1.5 text-sm uppercase font-bold">Employer Hub</Badge>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Hire the best <span className="text-gradient">frontend talent.</span></h1>
                        <p className="text-xl text-muted-foreground">Post your job to reach over 1M+ professional frontend developers.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-8 glass p-8 md:p-10 rounded-[2.5rem] border border-border/50">
                        {!user && (
                            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 text-sm font-bold">
                                You must be logged in to post a job. <Link href="/login" className="underline">Log in here</Link>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Job Title" icon={<Type className="w-5 h-5" />}>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-transparent outline-none font-medium h-12 px-2 text-foreground"
                                />
                            </FormField>
                            <FormField label="Company Name" icon={<Building2 className="w-5 h-5" />}>
                                <input
                                    type="text"
                                    value={formData.companyName}
                                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                    className="w-full bg-transparent outline-none font-medium h-12 px-2 text-foreground"
                                />
                            </FormField>
                            <FormField label="Location" icon={<MapPin className="w-5 h-5" />}>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full bg-transparent outline-none font-medium h-12 px-2 text-foreground"
                                />
                            </FormField>
                            <FormField label="Salary Range" icon={<DollarSign className="w-5 h-5" />}>
                                <input
                                    type="text"
                                    value={formData.salaryRange}
                                    onChange={e => setFormData({ ...formData, salaryRange: e.target.value })}
                                    className="w-full bg-transparent outline-none font-medium h-12 px-2 text-foreground"
                                />
                            </FormField>
                        </div>

                        <FormField label="Job Tags (comma separated)" icon={<Sparkles className="w-5 h-5" />}>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                className="w-full bg-transparent outline-none font-medium h-12 px-2 text-foreground"
                            />
                        </FormField>

                        <FormField label="Job Description" icon={<FileText className="w-5 h-5" />}>
                            <textarea
                                rows={5}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-transparent outline-none font-medium py-4 px-2 resize-none text-foreground"
                            />
                        </FormField>

                        <div className="p-6 rounded-2xl bg-brand-primary/5 border border-brand-primary/20 flex gap-4 items-start">
                            <AlertCircle className="w-6 h-6 text-brand-primary flex-shrink-0" />
                            <div className="space-y-1">
                                <p className="font-bold text-brand-primary">Premium Placement</p>
                                <p className="text-sm text-brand-primary/80">Your job will be featured at the top of the board and highlighted for 30 days ($299 value included).</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Post Job Now <Send className="w-5 h-5" /></>}
                        </button>
                    </form>
                </div>

                {/* Preview Column */}
                <div className="hidden lg:block space-y-8">
                    <div className="sticky top-32 space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-extrabold flex items-center gap-2 text-foreground">
                                <span className="w-2 h-8 bg-brand-primary rounded-full" />
                                Live Preview
                            </h3>
                            <span className="text-sm font-bold text-muted-foreground italic">Updating in real-time...</span>
                        </div>

                        <div className="scale-105 origin-top">
                            <JobCard job={previewJob as any} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FormField({ label, icon, children }: { label: string, icon: React.ReactNode, children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-muted-foreground flex items-center gap-2 px-1">
                {icon} {label}
            </label>
            <div className="bg-background/50 border border-border rounded-xl focus-within:border-brand-primary transition-colors flex items-center px-4">
                {children}
            </div>
        </div>
    );
}
