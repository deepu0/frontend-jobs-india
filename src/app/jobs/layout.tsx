import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Frontend Jobs | FrontHire',
    description: 'Browse 1000+ frontend developer jobs at top tech companies. Find React, Next.js, TypeScript, and UI/UX positions.',
    openGraph: {
        title: 'All Frontend Jobs | FrontHire',
        description: 'Browse 1000+ frontend developer jobs at top tech companies.',
        type: 'website',
    },
};

export default function JobsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
