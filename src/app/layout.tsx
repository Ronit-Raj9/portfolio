import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'
import { GA_MEASUREMENT_ID, isGoogleAnalyticsEnabled } from '@/lib/ga-config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://roniii.vercel.app'),
  title: {
    default: 'Ronit Raj | AI/ML Engineer | SIH 2024 Winner',
    template: '%s | Ronit Raj'
  },
  description: 'AI/ML Engineer specializing in Graph Neural Networks and Multimodal LLMs. SIH 2024 National Winner. Building production AI systems at Garudex Labs.',
  keywords: [
    'AI/ML Engineer',
    'Graph Neural Networks',
    'Multimodal LLMs',
    'SIH 2024 Winner',
    'Smart India Hackathon',
    'Garudex Labs',
    'Full Stack Developer',
    'RAG Systems',
    'Vision-Language Models',
    'IIIT Gwalior',
    'Ronit Raj'
  ],
  authors: [{ name: 'Ronit Raj', url: 'https://roniii.vercel.app' }],
  creator: 'Ronit Raj',
  publisher: 'Ronit Raj',
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
    url: 'https://roniii.vercel.app',
    siteName: 'Ronit Raj Portfolio',
    title: 'Ronit Raj | AI/ML Engineer',
    description: 'SIH 2024 Winner building production AI systems with GNNs and Multimodal LLMs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ronit Raj | AI/ML Engineer',
    description: 'SIH 2024 Winner building production AI systems with GNNs and Multimodal LLMs',
    creator: '@ronit__raj',
  },
  alternates: {
    canonical: 'https://roniii.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Google tag (gtag.js) — GA4 */}
        {isGoogleAnalyticsEnabled && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {/* Rybbit Analytics */}
        <Script
          src="https://app.rybbit.io/api/script.js"
          data-site-id="1758"
          defer
          strategy="afterInteractive"
        />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ronit Raj',
              url: 'https://roniii.vercel.app',
              image: 'https://roniii.vercel.app/images/profile.jpeg',
              sameAs: [
                'https://github.com/Ronit-Raj9',
                'https://www.linkedin.com/in/ronitrajai/',
                'https://x.com/ronit__raj'
              ],
              jobTitle: 'AI/ML Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'Garudex Labs'
              },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'IIIT Gwalior'
              },
              knowsAbout: ['Graph Neural Networks', 'Multimodal LLMs', 'RAG Systems', 'Full Stack Development']
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
} 