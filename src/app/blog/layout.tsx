import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on production AI, RAG, GRPO fine-tuning & open source by Ronit Raj. New posts coming soon.',
  alternates: { canonical: '/blog' },
  robots: { index: false, follow: true },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
