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
    default: 'Ronit Raj - Full-Stack AI & ML Engineer',
    template: '%s | Ronit Raj'
  },
  description: 'Full-stack AI & ML engineer. SIH 2024 winner, NHA PM-JAY runner-up, OSS India 2026 speaker, GitMesh maintainer. Production AI & on-chain systems.',
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
    title: 'Ronit Raj - Full-Stack AI & ML Engineer',
    description: 'Full-stack AI & ML engineer · SIH 2024 winner · NHA PM-JAY runner-up · OSS India 2026 speaker. Building production AI and on-chain systems.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ronit Raj - Full-Stack AI & ML Engineer',
    description: 'Full-stack AI & ML engineer · SIH 2024 winner · NHA PM-JAY runner-up · OSS India 2026 speaker. Building production AI and on-chain systems.',
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
              url: 'https://roniii.vercel.app',
              image: 'https://roniii.vercel.app/images/profile.jpeg',
              sameAs: [
                'https://github.com/Ronit-Raj9',
                'https://www.linkedin.com/in/ronitrajai/',
                'https://x.com/ronit__raj'
              ],
              jobTitle: 'Full-Stack AI & ML Engineer',
              description: 'Full-stack AI & ML engineer building production AI (GRPO on AMD MI300X, vision-language RAG) and on-chain systems. SIH 2024 winner, NHA PM-JAY runner-up, OSS India 2026 speaker, GitMesh maintainer.',
              worksFor: {
                '@type': 'Organization',
                name: 'Garudex Labs'
              },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'IIIT Gwalior'
              },
              knowsAbout: ['LLM Fine-tuning (GRPO, LoRA)', 'RAG Systems', 'AI Infrastructure & LLM Serving', 'Reinforcement Learning', 'Graph Neural Networks', 'Recommender Systems', 'Multimodal / Vision-Language Models', 'AI Agent Governance (MCP)', 'Full-Stack Development', 'Open Source'],
              award: [
                'Smart India Hackathon 2024 Winner',
                "HackHazards '25 Winner",
                "IDE'25 Innovation Development & Entrepreneurship Award (Government of India)",
                'NHA × IISc PM-JAY Healthcare Hackathon Runner-Up',
                'Trillion Dollar GenAI Hackathon 2nd Place (IIT Bhubaneswar)',
                'Monad Blitz New Delhi 4th Place',
                'AMD AI RL Hackathon Special Mention (IIT Delhi)',
                'META × Hugging Face RL Hackathon Finalist',
                'DSCI CSIC 1.0 Stage III Shortlist',
                'Open Source Summit India 2026 Speaker (Linux Foundation)'
              ],
              hasOccupation: {
                '@type': 'Occupation',
                name: 'Full-Stack AI & ML Engineer',
                occupationLocation: { '@type': 'Country', name: 'India' },
                skills: 'PyTorch, Transformers, RAG, LLM fine-tuning (GRPO/LoRA), vLLM, LangGraph, Graph Neural Networks, FastAPI, Next.js, Solidity'
              }
            })
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
              url: 'https://roniii.vercel.app',
              author: { '@type': 'Person', name: 'Ronit Raj', url: 'https://roniii.vercel.app' }
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