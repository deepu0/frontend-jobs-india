export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
export type Seniority = 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Principal';
export type LocationType = 'Remote' | 'On-site' | 'Hybrid';

export interface Company {
    id: string;
    name: string;
    logo: string;
    tagline: string;
    description: string;
    website: string;
    socials: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
    created_at?: string;
    user_id?: string;
}

export interface Job {
    id: string;
    title: string;
    companyId: string;
    company: Company;
    location: string;
    locationType: LocationType;
    salaryRange: string;
    type: JobType;
    seniority: Seniority;
    postedAt: string;
    tags: string[];
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    isFeatured?: boolean;
    isVerified?: boolean;
    applyUrl: string;
}

export interface FilterState {
    search: string;
    role: string[];
    seniority: string[];
    tags: string[];
    location: string[];
    jobType: string[];
    salaryMin: number;
}
