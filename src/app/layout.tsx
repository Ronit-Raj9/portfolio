import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

// Google Analytics Measurement ID - Replace with your actual ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

export const metadata: Metadata = {
  metadataBase: new URL('https://ronitraj.me'),
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
  authors: [{ name: 'Ronit Raj', url: 'https://ronitraj.me' }],
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
    url: 'https://ronitraj.me',
    siteName: 'Ronit Raj Portfolio',
    title: 'Ronit Raj | AI/ML Engineer',
    description: 'SIH 2024 Winner building production AI systems with GNNs and Multimodal LLMs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ronit Raj - AI/ML Engineer | SIH 2024 Winner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ronit Raj | AI/ML Engineer',
    description: 'SIH 2024 Winner building production AI systems with GNNs and Multimodal LLMs',
    images: ['/twitter-card.jpg'],
    creator: '@ronit__raj',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://ronitraj.me',
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
        {/* Google Analytics */}
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
              url: 'https://ronitraj.me',
              image: 'https://ronitraj.me/images/profile.jpeg',
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
      </body>
    </html>
  )
} 