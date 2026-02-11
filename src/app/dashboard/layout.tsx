import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard | FrontHire',
    description: 'Manage your job listings, company profile, and view applications.',
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
