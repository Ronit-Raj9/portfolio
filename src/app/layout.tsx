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
import { SITE_URL } from '@/lib/site-config'

const inter = Inter({ subsets: ['latin'] })

const SEO_DESCRIPTION =
  'Full-stack AI & ML engineer. SIH 2024 winner, NHA PM-JAY Top 3 runner-up, OSS India 2026 speaker, GitMesh maintainer (140+ stars). Production AI & infrastructure.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ronit Raj - Full-Stack AI & ML Engineer',
    template: '%s | Ronit Raj'
  },
  description: SEO_DESCRIPTION,
  authors: [{ name: 'Ronit Raj', url: SITE_URL }],
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
    url: SITE_URL,
    siteName: 'Ronit Raj Portfolio',
    title: 'Ronit Raj - Full-Stack AI & ML Engineer',
    description: SEO_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ronit Raj - Full-Stack AI & ML Engineer',
    description: SEO_DESCRIPTION,
    creator: '@ronit__raj',
  },
  alternates: {
    canonical: '/',
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
        {/* Google tag (gtag.js) - GA4 */}
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
              url: SITE_URL,
              image: `${SITE_URL}/images/profile.jpeg`,
              sameAs: [
                'https://github.com/Ronit-Raj9',
                'https://www.linkedin.com/in/ronitrajai/',
                'https://x.com/ronit__raj',
                'https://www.kaggle.com/ronitraj1',
              ],
              jobTitle: 'Full-Stack AI & ML Engineer',
              description:
                'Full-stack AI & ML engineer and open-source maintainer. Core Maintainer of GitMesh (LFDT, 140+ stars). PM-JAY Top 3 runner-up, OSS India 2026 speaker. Builds production AI (Gemma pipelines, LangGraph RAG, InferenceGym LLM serving) and blockchain credential systems (PARAM). Patent pending (Indian App No. 202521020743).',
              worksFor: {
                '@type': 'Organization',
                name: 'GitMesh',
                url: 'https://gitmesh.dev',
              },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Indian Institute of Information Technology and Management, Gwalior',
              },
              knowsAbout: [
                'LLM Fine-tuning (GRPO, LoRA)',
                'RAG Systems',
                'AI Infrastructure & LLM Serving',
                'Reinforcement Learning',
                'Vision-Language Models',
                'AI Agent Governance (MCP, OPA)',
                'Full-Stack Development',
                'Open Source',
              ],
              award: [
                '9× Hackathon Wins & Podiums ($5,000+ in prizes)',
                'Smart India Hackathon 2024 Winner',
                'NHA × IISc PM-JAY Healthcare Hackathon Top 3 Runner-Up',
                "HackHazards '25 Winner (1st Prize)",
                'LNMHacks 8.0 Winner',
                'Trillion Dollar GenAI Hackathon 2nd Place',
                'Monad Blitz New Delhi 4th Place',
                'Best Startup Pitch - AICTE IDE 2025',
                'Winner - CrftHQ Hackathon (iONIA)',
                'Open Source Summit India 2026 Speaker (Linux Foundation)',
                'AMD AI RL Hackathon Special Mention',
              ],
              hasOccupation: {
                '@type': 'Occupation',
                name: 'Full-Stack AI & ML Engineer',
                occupationLocation: { '@type': 'Country', name: 'India' },
                skills:
                  'PyTorch, Transformers, RAG, LLM fine-tuning (GRPO/LoRA), vLLM, LangGraph, FastAPI, Next.js, MCP, Kubernetes, Solidity',
              },
            }),
          }}
        />
        {/* WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Ronit Raj - Portfolio',
              url: SITE_URL,
              author: { '@type': 'Person', name: 'Ronit Raj', url: SITE_URL },
            }),
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