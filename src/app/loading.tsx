import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-brand-primary" />
            <p className="text-muted-foreground font-medium">Loading...</p>
        </div>
    );
}
