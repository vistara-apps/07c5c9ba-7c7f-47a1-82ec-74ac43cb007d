import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RightsGuard - Your rights, simplified',
  description: 'Know what to say, when to say it. Mobile-optimized guides on user rights during police interactions.',
  keywords: 'legal rights, police interactions, civil rights, legal guidance, mobile app',
  authors: [{ name: 'RightsGuard Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#1e40af',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
