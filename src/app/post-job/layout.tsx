import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Post a Job | FrontHire',
    description: 'Post your frontend developer job to reach 1M+ professional developers. Get quality applications from React, Next.js, and TypeScript experts.',
    openGraph: {
        title: 'Post a Job | FrontHire',
        description: 'Post your frontend developer job to reach 1M+ professional developers.',
        type: 'website',
    },
};

export default function PostJobLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
