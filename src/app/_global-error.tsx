'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Global error:', error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
                    <div className="max-w-md w-full text-center">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-10 h-10 text-red-600" />
                        </div>
                        
                        <h1 className="text-3xl font-black mb-4">
                            Something went wrong
                        </h1>
                        
                        <p className="text-muted-foreground mb-8">
                            We apologize for the inconvenience. Our team has been notified and is working to fix the issue.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={reset}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:shadow-lg transition-all"
                            >
                                <RefreshCw className="w-5 h-5" />
                                Try Again
                            </button>
                            
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border font-bold rounded-xl hover:bg-muted transition-all"
                            >
                                <Home className="w-5 h-5" />
                                Go Home
                            </Link>
                        </div>
                        
                        {error.digest && (
                            <p className="mt-8 text-xs text-muted-foreground">
                                Error ID: {error.digest}
                            </p>
                        )}
                    </div>
                </div>
            </body>
        </html>
    );
}
