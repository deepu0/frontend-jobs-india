import { cn } from '@/lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'secondary' | 'accent' | 'success';
    className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
    const variants = {
        default: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
        outline: 'border-border text-muted-foreground',
        secondary: 'bg-muted text-muted-foreground border-transparent',
        accent: 'bg-brand-accent/10 text-brand-accent border-brand-accent/20',
        success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    };

    return (
        <span className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
}
