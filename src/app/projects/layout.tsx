import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'AI/ML, full-stack & web3 projects by Ronit Raj — PM-JAY claim adjudication (Top 3 runner-up), ClauseMark regulatory evidence, PARAM blockchain credentials, InferenceGym LLM serving, SHAKTI vision-language RAG, and more.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
