import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { AuthProvider } from "@/lib/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FrontHire | Curated Frontend Jobs",
  description: "The premier job board for frontend developers, UI engineers, and React experts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-card border-t border-border py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
              <p className="font-bold text-foreground mb-4">FrontHire</p>
              <p className="text-sm">© 2025 FrontHire Inc. Built with love for the frontend community.</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
