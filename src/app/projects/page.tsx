"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaGithub, FaSearch } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { trackProjectDemo, trackGitHubClick } from "@/lib/analytics"
import { featuredProjects, moreProjects, type FeaturedProject, type MoreProject } from "@/data"

// Combine all projects into a unified type for display
interface DisplayProject {
  id: string
  title: string
  subtitle: string
  description?: string
  highlights?: string[]
  badge?: string
  tech: string[]
  image?: string
  category: string
  demoLink?: string
  githubLink?: string
  isFeatured: boolean
}

// Convert featured projects to display format
const convertFeaturedToDisplay = (projects: FeaturedProject[]): DisplayProject[] => {
  if (!projects) return []
  return projects.map(p => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    description: p.highlights?.[0] || p.subtitle,
    highlights: p.highlights || [],
    badge: p.badge,
    tech: p.tech || [],
    image: p.image,
    category: p.category || "Other",
    demoLink: p.links?.demo,
    githubLink: p.links?.github,
    isFeatured: true
  }))
}

// Convert more projects to display format
const convertMoreToDisplay = (projects: MoreProject[]): DisplayProject[] => {
  if (!projects) return []
  return projects.map(p => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    description: p.description || p.subtitle,
    highlights: p.description ? [p.description] : [],
    badge: p.badge,
    tech: p.tech || [],
    image: undefined,
    category: p.category || "Other",
    demoLink: p.link,
    githubLink: p.github,
    isFeatured: false
  }))
}

// Combine all projects
const ALL_PROJECTS: DisplayProject[] = [
  ...convertFeaturedToDisplay(featuredProjects),
  ...convertMoreToDisplay(moreProjects)
]

// Get unique categories from projects
const CATEGORIES = ["All", ...Array.from(new Set(ALL_PROJECTS.map(p => p.category).filter(Boolean)))]

// ============================================================================
// COMPONENTS - Matching home page featured projects style
// ============================================================================

function ProjectCard({ project, index, isExpanded, onToggle }: { 
  project: DisplayProject, 
  index: number,
  isExpanded: boolean,
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="group relative bg-background rounded-lg overflow-hidden border border-border hover:border-foreground/20 transition-colors"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image */}
        {project.image ? (
          <div className="relative w-full lg:w-1/3 h-28 lg:h-auto lg:min-h-[120px] overflow-hidden bg-accent/10">
            {project.badge && (
              <div className="absolute top-2 left-2 z-20">
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-background/90 backdrop-blur-sm border border-border text-foreground">
                  {project.badge}
                </span>
              </div>
            )}
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ) : null}

        {/* Content */}
        <div className={cn("flex-1 p-4", !project.image && "lg:pl-0")}>
          {!project.image && project.badge && (
            <span className="inline-block px-2 py-0.5 text-[10px] rounded-full bg-accent/30 border border-border text-foreground mb-2">
              {project.badge}
            </span>
          )}
          
          <h3 className="text-base font-medium mb-0.5">{project.title}</h3>
          <p className="text-xs text-muted-foreground mb-2">{project.subtitle}</p>

          {/* Highlights/Description */}
          {project.highlights && project.highlights.length > 0 && (
            <>
              <ul className="space-y-0.5 mb-2">
                {(isExpanded ? project.highlights : project.highlights.slice(0, 1)).map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground/70">
                    <span className="text-muted-foreground/50">—</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {project.highlights.length > 1 && (
                <div className="mb-2">
                  <button
                    onClick={onToggle}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isExpanded ? '← Show less' : 'Read more →'}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tech.map((tech) => (
              <span key={tech} className="px-3 py-1.5 text-xs font-medium rounded-md bg-gradient-to-r from-[#f9fafb] to-[#f3f4f6] dark:from-[#374151] dark:to-[#4b5563] text-foreground border border-[#e5e5e5] dark:border-[#4b5563] shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2">
            {project.demoLink && project.demoLink !== "#" && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProjectDemo(project.title)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Demo
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGitHubClick(project.title)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-foreground/20 hover:bg-accent/50 transition-colors"
              >
                <FaGithub className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({})

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }))
  }

  const filteredProjects = useMemo(() => {
    if (!ALL_PROJECTS || ALL_PROJECTS.length === 0) return []
    
    return ALL_PROJECTS.filter(project => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
      const matchesSearch = searchQuery === "" || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Sort: Featured first
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1
      if (!a.isFeatured && b.isFeatured) return 1
      return 0
    })
  }, [filteredProjects])

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 md:pb-16">
      <div className="container px-4 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-[32px] font-bold mb-4">All Projects</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Complete archive of my work across AI/ML, blockchain, web development, and research. 
            Filter by category or search for specific technologies.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-[#e5e5e5] dark:border-[#374151] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30 transition-all"
              />
            </div>
            
            <span className="text-xs text-muted-foreground">{sortedProjects.length} projects</span>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-lg transition-all border",
                  selectedCategory === category
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background border-[#e5e5e5] dark:border-[#374151] hover:border-foreground/30"
                )}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-1 text-[10px] opacity-70">
                    ({ALL_PROJECTS.filter(p => p.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects List - Same style as Featured Projects */}
        <AnimatePresence mode="wait">
          {sortedProjects.length > 0 ? (
            <motion.div
              key={`${selectedCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {sortedProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  isExpanded={expandedProjects[project.id] || false}
                  onToggle={() => toggleProject(project.id)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
                className="mt-4 text-sm text-foreground hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <Link href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#e5e5e5] dark:border-[#374151] rounded-lg text-sm font-medium hover:bg-accent/50 transition-colors">
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

