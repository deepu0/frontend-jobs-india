import { Loader2 } from 'lucide-react';

export default function DashboardLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
        </div>
    );
}
