import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'AI/ML, full-stack & web3 projects by Ronit Raj - PM-JAY claim adjudication, PARAM blockchain credentials, SHAKTI vision-language RAG, and more.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
