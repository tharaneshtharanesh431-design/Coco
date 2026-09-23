import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GoogleAnalytics } from '@/components/common/GoogleAnalytics';
import { PageTransitionProvider } from '@/components/animations/PageTransitionProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'VERDECOCO | Premium Coconut Export',
    template: '%s | VERDECOCO',
  },
  description: 'Premium coconut products sourced with care and delivered through reliable global supply chains. Verified international B2B export from Gandhipuram, Dharapuram.',
  openGraph: {
    title: 'VERDECOCO',
    description: 'Premium coconut products sourced with care and delivered through reliable global supply chains.',
    url: siteUrl,
    siteName: 'VERDECOCO',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VERDECOCO',
    description: 'Premium coconut products sourced with care and delivered through reliable global supply chains.',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VERDECOCO',
  url: siteUrl,
  email: 'tharaneeshm2416@gmail.com',
  telephone: '+91 8124173993',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gandhipuram, Dharapuram',
    addressCountry: 'IN'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91 8124173993',
    contactType: 'customer service',
    email: 'tharaneeshm2416@gmail.com'
  }
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'VERDECOCO',
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-ivory text-teal-900 font-sans flex flex-col min-h-screen`}>
        <GoogleAnalytics />
        <Navbar />
        <PageTransitionProvider>
          <main className="flex-grow">
            {children}
          </main>
        </PageTransitionProvider>
        <Footer />
      </body>
    </html>
  );
}


