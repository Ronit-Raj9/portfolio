import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ronit Raj - AI/ML Developer & Open Source Enthusiast',
  description: 'Personal portfolio of Ronit Raj, AI/ML Developer and Open Source Contributor specializing in machine learning, scientific computing, and web development.',
  keywords: ['portfolio', 'developer', 'machine learning', 'AI', 'web development', 'scientific computing', 'Ronit Raj'],
  authors: [{ name: 'Ronit Raj' }],
  creator: 'Ronit Raj',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <Script
          src="https://app.rybbit.io/api/script.js"
          data-site-id="1758"
          defer
          strategy="afterInteractive"
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