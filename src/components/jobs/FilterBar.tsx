'use client';

import { Search, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function FilterBar() {
    const [activeFilters, setActiveFilters] = useState(['Remote', 'Senior', 'Full-time']);
    const [isExpanded, setIsExpanded] = useState(false);

    const removeFilter = (filter: string) => {
        setActiveFilters(activeFilters.filter(f => f !== filter));
    };

    return (
        <div className="sticky top-20 z-30 py-4 mb-8">
            <div className="glass p-4 rounded-2xl shadow-sm border border-border/50">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 flex flex-wrap items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-muted-foreground mr-2" />
                        {activeFilters.map(filter => (
                            <Badge
                                key={filter}
                                variant="default"
                                className="bg-brand-primary/5 text-brand-primary border-brand-primary/20 pr-1 py-1"
                            >
                                {filter}
                                <button
                                    onClick={() => removeFilter(filter)}
                                    className="ml-1.5 hover:bg-brand-primary/10 rounded-full p-0.5 transition-colors"
                                >
                                    <Check className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}
                        <button className="text-sm font-semibold text-brand-primary hover:underline ml-2">
                            Clear all
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <FilterDropdown label="Location" options={['Remote', 'USA', 'Europe', 'Worldwide']} />
                        <FilterDropdown label="Salary" options={['$50k+', '$100k+', '$150k+', '$200k+']} />
                        <FilterDropdown label="Role" options={['Frontend', 'Fullstack', 'UI/UX']} />
                        <FilterDropdown label="Type" options={['Full-time', 'Contract', 'Freelance']} />

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="px-4 py-2 rounded-xl border border-border font-bold hover:bg-muted transition-all flex items-center gap-2"
                        >
                            All Filters <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FilterDropdown({ label, options }: { label: string, options: string[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 rounded-xl border border-border font-medium hover:border-brand-primary transition-all flex items-center gap-2 bg-card"
            >
                {label} <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-2xl z-50 p-2 py-3 ring-1 ring-black/5">
                        {options.map(opt => (
                            <button
                                key={opt}
                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium flex items-center justify-between"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
