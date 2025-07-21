import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DocsLayout } from "@/components/layout/docs-layout";
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data";
import { DraftModeBanner } from "@/components/preview/draft-mode-banner";
import { draftMode } from "next/headers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://directorium.com'),
  title: {
    default: 'Directorium - Curated Directory & Platform Documentation',
    template: '%s | Directorium',
  },
  description: 'Discover curated resources across technology, business, education, and more. Access comprehensive API documentation and integration guides for the Directorium platform.',
  keywords: [
    'directory',
    'resources',
    'technology',
    'business',
    'education',
    'API',
    'documentation',
    'platform',
    'curated',
    'tools',
  ],
  authors: [{ name: 'Directorium Team' }],
  creator: 'Directorium',
  publisher: 'Directorium',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://directorium.com',
    siteName: 'Directorium',
    title: 'Directorium - Curated Directory & Platform Documentation',
    description: 'Discover curated resources across technology, business, education, and more. Access comprehensive API documentation and integration guides.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Directorium - Curated Directory Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Directorium - Curated Directory & Platform Documentation',
    description: 'Discover curated resources across technology, business, education, and more. Access comprehensive API documentation and integration guides.',
    images: ['/og-image.png'],
    creator: '@directorium',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://directorium.com',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <WebsiteStructuredData />
        <OrganizationStructuredData />
        {isDraftMode && <DraftModeBanner />}
        <DocsLayout>{children}</DocsLayout>
      </body>
    </html>
  );
}
