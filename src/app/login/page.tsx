'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/');
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setError("Registration successful! Check your email for verification.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[100px] -ml-32 -mb-32" />

            <div className="w-full max-w-md space-y-8 relative z-10">
                <div className="text-center space-y-2">
                    <Badge variant="default" className="px-4 py-1">Welcome back</Badge>
                    <h1 className="text-4xl font-extrabold tracking-tight">Join the community.</h1>
                    <p className="text-muted-foreground font-medium">Log in to manage your job postings and saved roles.</p>
                </div>

                <form className="glass p-8 rounded-[2.5rem] border border-border/50 space-y-6 shadow-2xl shadow-slate-200">
                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground px-1 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="w-full h-14 bg-background/50 border border-border rounded-2xl px-5 outline-none focus:border-brand-primary transition-colors font-medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground px-1 flex items-center gap-2">
                                <Lock className="w-4 h-4" /> Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-14 bg-background/50 border border-border rounded-2xl px-5 outline-none focus:border-brand-primary transition-colors font-medium"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full h-14 bg-slate-900 text-white rounded-2xl font-extrabold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log In"}
                            {!loading && <ArrowRight className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={handleSignUp}
                            disabled={loading}
                            className="w-full h-14 bg-white border border-border text-slate-900 rounded-2xl font-extrabold flex items-center justify-center gap-2 hover:bg-muted transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            Create Account
                        </button>
                    </div>

                    <div className="text-center">
                        <button className="text-sm font-bold text-brand-primary hover:underline">
                            Forgot your password?
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-muted-foreground font-medium">
                    By continuing, you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
}
