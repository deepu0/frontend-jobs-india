import { Loader2 } from 'lucide-react';

export default function JobsLoading() {
    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="h-12 w-64 bg-white/10 rounded-xl mx-auto mb-4 animate-pulse" />
                    <div className="h-6 w-96 bg-white/10 rounded-lg mx-auto animate-pulse" />
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground font-medium">
                    <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
                    Loading jobs...
                </div>
            </div>
        </div>
    );
}
