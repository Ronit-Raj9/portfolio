import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FaGithub } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { allProjects, getProjectBySlug } from "@/data"

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.id }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: "Project not found" }
  return {
    title: `${project.title} - ${project.subtitle}`,
    description: project.caseStudy?.problem ?? project.subtitle,
  }
}

const TRACK_LABEL: Record<string, string> = {
  ml: "ML",
  "full-stack-ai": "Full-Stack AI",
  web3: "Web3",
}

const TRACK_PILL: Record<string, string> = {
  ml: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30",
  "full-stack-ai": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  web3: "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30",
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const cs = project.caseStudy

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 md:pb-16">
      <div className="container px-4 max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          ← All projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {project.badge && (
              <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-foreground text-background">
                {project.badge}
              </span>
            )}
            {project.track && (
              <span className={cn(
                "px-2.5 py-1 text-[11px] font-medium rounded-full border",
                TRACK_PILL[project.track],
              )}>
                {TRACK_LABEL[project.track]}
              </span>
            )}
            <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-accent/60 text-foreground/80 border border-border">
              {project.category}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {project.title}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">{project.subtitle}</p>
        </div>

        {/* Hero image */}
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border bg-accent/10 mb-10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* If we have a full case study, render rich content. Otherwise show highlights as fallback. */}
        {cs ? (
          <div className="space-y-10">
            {/* Problem */}
            <section>
              <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                Problem
              </h2>
              <p className="text-[15px] leading-relaxed text-foreground/85">{cs.problem}</p>
            </section>

            {/* Approach */}
            <section>
              <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                Approach
              </h2>
              <p className="text-[15px] leading-relaxed text-foreground/85">{cs.approach}</p>
            </section>

            {/* Metrics */}
            {cs.metrics.length > 0 && (
              <section>
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                  At a glance
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {cs.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="border border-border rounded-lg p-3 bg-background"
                    >
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                        {m.label}
                      </p>
                      <p className="text-sm font-semibold">{m.value}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tech decisions */}
            {cs.techDecisions.length > 0 && (
              <section>
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                  Tech decisions
                </h2>
                <ul className="space-y-3">
                  {cs.techDecisions.map((d) => (
                    <li key={d.decision} className="border-l-2 border-[#8b5cf6]/40 pl-4">
                      <p className="text-sm font-medium mb-0.5">{d.decision}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{d.why}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Architecture image (optional) */}
            {cs.architectureImage && (
              <section>
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                  Architecture
                </h2>
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border bg-accent/10">
                  <Image
                    src={cs.architectureImage}
                    alt={`${project.title} architecture`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <section>
              <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                Highlights
              </h2>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[15px] text-foreground/85 leading-relaxed"
                  >
                    <span className="text-muted-foreground/50 mt-1">-</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {/* Tech stack */}
        <section className="mt-10">
          <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
            Stack
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[10px] font-medium rounded bg-accent/80 text-foreground border border-border"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* CTAs */}
        <section className="mt-10 flex flex-wrap gap-2">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              Live demo
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md border border-foreground/20 hover:bg-accent/50 transition-colors"
            >
              <FaGithub className="w-4 h-4" />
              GitHub
            </a>
          )}
        </section>
      </div>
    </div>
  )
}
