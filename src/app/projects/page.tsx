"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaGithub, FaSearch } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { trackProjectDemo, trackGitHubClick } from "@/lib/analytics"
import { allProjects, type Project } from "@/data"

// Get unique categories from projects
const CATEGORIES = ["All", ...Array.from(new Set(allProjects.map(p => p.category).filter(Boolean)))]

// ============================================================================
// COMPONENTS - Matching home page featured projects style
// ============================================================================

function ProjectCard({ project, index, isExpanded, onToggle }: { 
  project: Project, 
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
        <div className="relative w-full lg:w-1/3 h-20 lg:h-auto lg:min-h-[100px] overflow-hidden bg-accent/10">
          <div className="absolute top-2 left-2 z-20 flex gap-1.5 flex-wrap">
            {project.badge && (
              <span 
                className="px-2.5 py-1 text-[11px] font-semibold rounded-full border-2 backdrop-blur-xl shadow-lg"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  color: '#1f2937',
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                }}
              >
                {project.badge}
              </span>
            )}
            {!project.completeness && (
              <span 
                className="px-2.5 py-1 text-[11px] font-semibold rounded-full border-2 backdrop-blur-xl shadow-lg"
                style={{
                  backgroundColor: 'rgba(255, 237, 213, 0.98)',
                  color: '#c2410c',
                  borderColor: 'rgba(234, 88, 12, 0.3)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                }}
              >
                In Progress
              </span>
            )}
          </div>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-3">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <h3 className="text-base font-medium flex-1">{project.title}</h3>
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-accent/60 text-foreground/80 border border-border shrink-0">
              {project.category}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{project.subtitle}</p>

          {/* Highlights */}
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
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.tech.map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-[10px] font-medium rounded bg-accent/80 text-foreground border border-border">
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2">
            {project.links.demo && project.links.demo !== "" && (
              <a
                href={project.links.demo}
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
            {project.links.github && project.links.github !== "" && (
              <a
                href={project.links.github}
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
    if (!allProjects || allProjects.length === 0) return []
    
    return allProjects.filter(project => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
      const matchesSearch = searchQuery === "" || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Sort: Featured first, then complete before incomplete
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      // First sort by featured status
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      // Then sort by completeness (complete projects first)
      if (a.completeness && !b.completeness) return -1
      if (!a.completeness && b.completeness) return 1
      
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
                    ({allProjects.filter(p => p.category === category).length})
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
              className="space-y-3"
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

