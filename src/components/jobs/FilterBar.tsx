'use client';

import { Search, SlidersHorizontal, ChevronDown, X, MapPin, DollarSign, Briefcase, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterBarProps {
    onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
    search: string;
    location: string[];
    salary: string[];
    type: string[];
    seniority: string[];
}

const FILTER_OPTIONS = {
    location: ['Remote', 'Bangalore', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai'],
    salary: ['₹5L+', '₹10L+', '₹15L+', '₹25L+', '₹35L+'],
    type: ['Full-time', 'Part-time', 'Contract', 'Freelance'],
    seniority: ['Junior', 'Mid', 'Senior', 'Lead', 'Principal'],
};

export function FilterBar({ onFilterChange }: FilterBarProps = {}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isExpanded, setIsExpanded] = useState(false);

    // Initialize filters from URL params
    const [filters, setFilters] = useState<FilterState>({
        search: searchParams.get('search') || '',
        location: searchParams.getAll('location'),
        salary: searchParams.getAll('salary'),
        type: searchParams.getAll('type'),
        seniority: searchParams.getAll('seniority'),
    });

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        
        if (filters.search) params.set('search', filters.search);
        filters.location.forEach(v => params.append('location', v));
        filters.salary.forEach(v => params.append('salary', v));
        filters.type.forEach(v => params.append('type', v));
        filters.seniority.forEach(v => params.append('seniority', v));

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.push(newUrl, { scroll: false });

        // Notify parent component
        onFilterChange?.(filters);
    }, [filters, router, onFilterChange]);

    const toggleFilter = (category: keyof FilterState, value: string) => {
        setFilters(prev => {
            const current = prev[category] as string[];
            const updated = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return { ...prev, [category]: updated };
        });
    };

    const removeFilter = (category: keyof FilterState, value: string) => {
        setFilters(prev => ({
            ...prev,
            [category]: (prev[category] as string[]).filter(v => v !== value),
        }));
    };

    const clearAll = () => {
        setFilters({
            search: '',
            location: [],
            salary: [],
            type: [],
            seniority: [],
        });
    };

    const hasActiveFilters = 
        filters.location.length > 0 ||
        filters.salary.length > 0 ||
        filters.type.length > 0 ||
        filters.seniority.length > 0 ||
        filters.search;

    const activeFilterCount = 
        filters.location.length +
        filters.salary.length +
        filters.type.length +
        filters.seniority.length +
        (filters.search ? 1 : 0);

    return (
        <div className="sticky top-20 z-30 py-4 mb-8">
            <div className="glass p-4 rounded-2xl shadow-sm border border-border/50">
                {/* Search Row */}
                <div className="flex flex-col lg:flex-row gap-4 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search jobs, companies, skills..."
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            className="w-full h-12 pl-12 pr-4 bg-background border border-border rounded-xl outline-none focus:border-brand-primary transition-colors font-medium"
                        />
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Active Filters */}
                    <div className="flex-1 flex flex-wrap items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-muted-foreground mr-2" />
                        
                        {filters.search && (
                            <Badge variant="default" className="bg-brand-primary/5 text-brand-primary border-brand-primary/20 pr-1 py-1">
                                Search: {filters.search}
                                <button onClick={() => setFilters(prev => ({ ...prev, search: '' }))} className="ml-1.5 hover:bg-brand-primary/10 rounded-full p-0.5">
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        )}

                        {filters.location.map(filter => (
                            <Badge key={`loc-${filter}`} variant="default" className="bg-blue-500/10 text-blue-600 border-blue-500/20 pr-1 py-1">
                                <MapPin className="w-3 h-3 mr-1" />
                                {filter}
                                <button onClick={() => removeFilter('location', filter)} className="ml-1.5 hover:bg-blue-500/10 rounded-full p-0.5">
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}

                        {filters.salary.map(filter => (
                            <Badge key={`sal-${filter}`} variant="default" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 pr-1 py-1">
                                <DollarSign className="w-3 h-3 mr-1" />
                                {filter}
                                <button onClick={() => removeFilter('salary', filter)} className="ml-1.5 hover:bg-emerald-500/10 rounded-full p-0.5">
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}

                        {filters.type.map(filter => (
                            <Badge key={`type-${filter}`} variant="default" className="bg-purple-500/10 text-purple-600 border-purple-500/20 pr-1 py-1">
                                <Briefcase className="w-3 h-3 mr-1" />
                                {filter}
                                <button onClick={() => removeFilter('type', filter)} className="ml-1.5 hover:bg-purple-500/10 rounded-full p-0.5">
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}

                        {filters.seniority.map(filter => (
                            <Badge key={`sen-${filter}`} variant="default" className="bg-orange-500/10 text-orange-600 border-orange-500/20 pr-1 py-1">
                                <Layers className="w-3 h-3 mr-1" />
                                {filter}
                                <button onClick={() => removeFilter('seniority', filter)} className="ml-1.5 hover:bg-orange-500/10 rounded-full p-0.5">
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}

                        {hasActiveFilters && (
                            <button onClick={clearAll} className="text-sm font-semibold text-brand-primary hover:underline ml-2">
                                Clear all
                            </button>
                        )}
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="flex flex-wrap items-center gap-3">
                        <FilterDropdown 
                            label="Location" 
                            icon={<MapPin className="w-4 h-4" />}
                            options={FILTER_OPTIONS.location}
                            selected={filters.location}
                            onSelect={(v) => toggleFilter('location', v)}
                        />
                        <FilterDropdown 
                            label="Salary" 
                            icon={<DollarSign className="w-4 h-4" />}
                            options={FILTER_OPTIONS.salary}
                            selected={filters.salary}
                            onSelect={(v) => toggleFilter('salary', v)}
                        />
                        <FilterDropdown 
                            label="Type" 
                            icon={<Briefcase className="w-4 h-4" />}
                            options={FILTER_OPTIONS.type}
                            selected={filters.type}
                            onSelect={(v) => toggleFilter('type', v)}
                        />
                        <FilterDropdown 
                            label="Seniority" 
                            icon={<Layers className="w-4 h-4" />}
                            options={FILTER_OPTIONS.seniority}
                            selected={filters.seniority}
                            onSelect={(v) => toggleFilter('seniority', v)}
                        />

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={cn(
                                "px-4 py-2 rounded-xl border font-bold transition-all flex items-center gap-2",
                                activeFilterCount > 0 
                                    ? "bg-brand-primary text-white border-brand-primary" 
                                    : "border-border hover:bg-muted"
                            )}
                        >
                            All Filters 
                            {activeFilterCount > 0 && (
                                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                    {activeFilterCount}
                                </span>
                            )}
                            <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
                        </button>
                    </div>
                </div>

                {/* Expanded Filter Panel */}
                {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <FilterSection 
                                title="Location"
                                options={FILTER_OPTIONS.location}
                                selected={filters.location}
                                onSelect={(v) => toggleFilter('location', v)}
                            />
                            <FilterSection 
                                title="Salary Range"
                                options={FILTER_OPTIONS.salary}
                                selected={filters.salary}
                                onSelect={(v) => toggleFilter('salary', v)}
                            />
                            <FilterSection 
                                title="Job Type"
                                options={FILTER_OPTIONS.type}
                                selected={filters.type}
                                onSelect={(v) => toggleFilter('type', v)}
                            />
                            <FilterSection 
                                title="Seniority"
                                options={FILTER_OPTIONS.seniority}
                                selected={filters.seniority}
                                onSelect={(v) => toggleFilter('seniority', v)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

interface FilterDropdownProps {
    label: string;
    icon: React.ReactNode;
    options: string[];
    selected: string[];
    onSelect: (value: string) => void;
}

function FilterDropdown({ label, icon, options, selected, onSelect }: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedCount = selected.length;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "px-4 py-2 rounded-xl border font-medium transition-all flex items-center gap-2",
                    selectedCount > 0 
                        ? "bg-brand-primary/10 border-brand-primary text-brand-primary" 
                        : "border-border hover:border-brand-primary bg-card"
                )}
            >
                {icon}
                {label}
                {selectedCount > 0 && (
                    <span className="bg-brand-primary text-white px-1.5 py-0.5 rounded-full text-xs min-w-[20px]">
                        {selectedCount}
                    </span>
                )}
                <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-2xl z-50 p-2 ring-1 ring-black/5">
                        {options.map(opt => {
                            const isSelected = selected.includes(opt);
                            return (
                                <button
                                    key={opt}
                                    onClick={() => onSelect(opt)}
                                    className={cn(
                                        "w-full text-left px-3 py-2.5 rounded-lg transition-colors text-sm font-medium flex items-center justify-between",
                                        isSelected 
                                            ? "bg-brand-primary/10 text-brand-primary" 
                                            : "hover:bg-muted"
                                    )}
                                >
                                    {opt}
                                    {isSelected && <div className="w-2 h-2 rounded-full bg-brand-primary" />}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

interface FilterSectionProps {
    title: string;
    options: string[];
    selected: string[];
    onSelect: (value: string) => void;
}

function FilterSection({ title, options, selected, onSelect }: FilterSectionProps) {
    return (
        <div>
            <h4 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">{title}</h4>
            <div className="space-y-2">
                {options.map(opt => {
                    const isSelected = selected.includes(opt);
                    return (
                        <button
                            key={opt}
                            onClick={() => onSelect(opt)}
                            className={cn(
                                "w-full text-left px-3 py-2 rounded-lg transition-all text-sm font-medium flex items-center justify-between",
                                isSelected 
                                    ? "bg-brand-primary text-white shadow-md" 
                                    : "bg-muted hover:bg-muted-foreground/20"
                            )}
                        >
                            {opt}
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
