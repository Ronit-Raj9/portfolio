import Link from 'next/link'
import {
  profile,
  experience,
  achievements,
  featuredProjects,
  allSkills,
} from '@/data'
import { EmailLink } from '@/components/EmailLink'

export const metadata = {
  title: 'Resume',
  description:
    'Resume of Ronit Raj — Full-Stack AI & ML Engineer. Experience, projects, skills, education, and awards.',
  alternates: { canonical: '/resume' },
}

// Skill category groups, rendered in this order.
const SKILL_CATEGORIES = [
  'AI/ML/DL',
  'Python Libs',
  'Web',
  'Cloud',
  'Databases',
  'Languages',
] as const

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold tracking-tight border-b border-border pb-2 mb-4">
      {children}
    </h2>
  )
}

export default function ResumePage() {
  const selectedProjects = featuredProjects.slice(0, 6)

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 md:pb-16 bg-background text-foreground">
      <div className="container px-4 max-w-4xl mx-auto">
        {/* ============================================================== */}
        {/* HEADER */}
        {/* ============================================================== */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-1 text-base md:text-lg text-muted-foreground">
            {profile.title}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.location}
          </p>

          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <li>
              <EmailLink
                email={profile.email}
                className="text-foreground hover:underline underline-offset-4"
              >
                {profile.email}
              </EmailLink>
            </li>
            <li>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline underline-offset-4"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline underline-offset-4"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={profile.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline underline-offset-4"
              >
                X
              </a>
            </li>
            <li>
              <a
                href={profile.social.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline underline-offset-4"
              >
                Kaggle
              </a>
            </li>
            <li>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline underline-offset-4"
              >
                Download PDF
              </a>
            </li>
          </ul>
        </header>

        {/* ============================================================== */}
        {/* SUMMARY */}
        {/* ============================================================== */}
        <section className="mb-10">
          <SectionHeading>Summary</SectionHeading>
          <p className="text-sm md:text-base leading-relaxed text-foreground/80">
            {profile.about.summary}
          </p>
        </section>

        {/* ============================================================== */}
        {/* EXPERIENCE */}
        {/* ============================================================== */}
        <section className="mb-10">
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-6">
            {experience.map((job) => (
              <article key={job.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-base md:text-lg font-semibold">
                    {job.role}
                    <span className="font-normal text-muted-foreground">
                      {' '}
                      · {job.company}
                    </span>
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {job.period}
                  </span>
                </div>
                {job.locationType && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {job.locationType}
                  </p>
                )}
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {job.description}
                </p>
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1 list-disc pl-5">
                    {job.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-sm leading-relaxed text-foreground/80"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* SELECTED PROJECTS */}
        {/* ============================================================== */}
        <section className="mb-10">
          <SectionHeading>Selected Projects</SectionHeading>
          <div className="space-y-5">
            {selectedProjects.map((project) => (
              <article key={project.id}>
                <h3 className="text-base md:text-lg font-semibold">
                  <Link
                    href={`/projects/${project.id}`}
                    className="hover:underline underline-offset-4"
                  >
                    {project.title}
                  </Link>
                  <span className="font-normal text-muted-foreground">
                    {' '}
                    · {project.subtitle}
                  </span>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.tech.join(', ')}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* SKILLS */}
        {/* ============================================================== */}
        <section className="mb-10">
          <SectionHeading>Skills</SectionHeading>
          <dl className="space-y-3">
            {SKILL_CATEGORIES.map((category) => {
              const items = allSkills
                .filter((skill) => skill.category === category)
                .map((skill) => skill.name)
              if (items.length === 0) return null
              return (
                <div
                  key={category}
                  className="flex flex-col sm:flex-row sm:gap-3"
                >
                  <dt className="text-sm font-semibold sm:w-40 shrink-0">
                    {category}
                  </dt>
                  <dd className="text-sm text-foreground/80">
                    {items.join(', ')}
                  </dd>
                </div>
              )
            })}
          </dl>
        </section>

        {/* ============================================================== */}
        {/* EDUCATION */}
        {/* ============================================================== */}
        <section className="mb-10">
          <SectionHeading>Education</SectionHeading>
          <article>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="text-base md:text-lg font-semibold">
                Indian Institute of Information Technology Gwalior
              </h3>
              <span className="text-sm text-muted-foreground">2023 - 2027</span>
            </div>
            <p className="mt-1 text-sm text-foreground/80">
              B.Tech in Mathematics and Scientific Computing
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">CGPA: 8.35</p>
          </article>
        </section>

        {/* ============================================================== */}
        {/* AWARDS */}
        {/* ============================================================== */}
        <section className="mb-10">
          <SectionHeading>Awards &amp; Achievements</SectionHeading>
          <ul className="space-y-3">
            {achievements.map((award) => (
              <li key={award.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-sm md:text-base font-semibold">
                    {award.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {award.year}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {award.subtitle}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ============================================================== */}
        {/* BACK HOME */}
        {/* ============================================================== */}
        <div className="mt-12">
          <Link
            href="/"
            className="text-sm text-foreground hover:underline underline-offset-4"
          >
            ← Back home
          </Link>
        </div>
      </div>
    </div>
  )
}
