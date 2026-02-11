import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Companies Hiring Frontend Developers | FrontHire',
    description: 'Discover top companies actively hiring frontend developers. View company profiles, culture, and open positions.',
    openGraph: {
        title: 'Companies Hiring Frontend Developers | FrontHire',
        description: 'Discover top companies actively hiring frontend developers.',
        type: 'website',
    },
};

export default function CompaniesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
