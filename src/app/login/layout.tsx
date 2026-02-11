import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | FrontHire',
    description: 'Log in to your FrontHire account to manage job postings and saved jobs.',
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
