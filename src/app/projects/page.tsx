"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaGithub, FaExternalLinkAlt, FaSearch, FaFilter } from "react-icons/fa"
import { BsArrowRight, BsGrid, BsList } from "react-icons/bs"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { trackProjectDemo, trackGitHubClick } from "@/lib/analytics"

// ============================================================================
// ALL PROJECTS DATA - Tier 3: Complete Archive
// ============================================================================

const ALL_PROJECTS = [
  // TIER 1 - Featured (shown first)
  {
    title: "Project SHAKTI",
    subtitle: "Military AI Intelligence System",
    description: "Vision-language RAG with memory retrieval architecture. 85% OCR accuracy on scanned military documents. Led Team BeGANs to SIH 2024 victory.",
    image: "/projects/ionia.png",
    tech: ["PyTorch", "RAG", "Vision-Language Models", "OCR", "LangChain"],
    category: "AI/ML",
    status: "Production",
    year: 2024,
    featured: true,
    badge: "🏆 SIH 2024 Winner",
    demoLink: "https://www.ionia.sbs/",
    githubLink: "",
    metrics: "85% OCR accuracy"
  },
  {
    title: "GeneTrust AI Studio",
    subtitle: "AI-Powered CRISPR Intelligence Platform",
    description: "DNABERT model integration for genetic sequence analysis. Real-time ranking and prediction system for CRISPR targets.",
    image: "/projects/genetrust.png",
    tech: ["Next.js", "TypeScript", "PyTorch", "FastAPI", "DNABERT"],
    category: "AI/ML",
    status: "Production",
    year: 2024,
    featured: true,
    badge: "⭐ Featured",
    demoLink: "https://genetrust.vercel.app/",
    githubLink: "https://github.com/Ronit-Raj9/hackhazard-project-genetrust",
    metrics: "Featured project"
  },
  {
    title: "EverydayApp",
    subtitle: "Starknet DeFi Platform",
    description: "Building decentralized finance tools on Starknet. Cairo smart contract development with React frontend.",
    image: "/projects/legalease.png",
    tech: ["Cairo", "Starknet", "React", "TypeScript", "Web3"],
    category: "Blockchain",
    status: "In Development",
    year: 2025,
    featured: true,
    badge: "🚀 Building",
    demoLink: "#",
    githubLink: "https://github.com/Ronit-Raj9",
    metrics: "Active development"
  },
  // TIER 2 - More Projects
  {
    title: "Ionia Testing Platform",
    subtitle: "End-to-end JEE Testing System",
    description: "Comprehensive JEE testing platform with real-time analytics, admin panel, and detailed performance tracking for 1000+ students.",
    image: "/projects/ionia.png",
    tech: ["Next.js", "Express.js", "MongoDB", "Cloudinary", "TailwindCSS"],
    category: "EdTech",
    status: "Production",
    year: 2024,
    featured: false,
    badge: "💼 Production",
    demoLink: "https://www.ionia.sbs/",
    githubLink: "https://github.com/Ronit-Raj9/ionia-next",
    metrics: "1000+ users • 99.9% uptime"
  },
  {
    title: "LegalEase",
    subtitle: "AI-Powered Legal Compliance Platform",
    description: "Automated contract generation for Indian startups with GST management and blockchain notarization. AI agents for legal workflow automation.",
    image: "/projects/legalease.png",
    tech: ["Next.js", "FastAPI", "AI Agents", "Blockchain", "Playwright"],
    category: "LegalTech",
    status: "Production",
    year: 2024,
    featured: false,
    badge: "🏢 Startup",
    demoLink: "https://legalease-new.vercel.app/",
    githubLink: "",
    metrics: "Startup focused"
  },
  {
    title: "E-Cell IIIT Gwalior",
    subtitle: "Entrepreneurship Cell Website",
    description: "Official website for IIIT Gwalior's Entrepreneurship Cell with event management and analytics dashboard.",
    image: "/projects/ecell.png",
    tech: ["Next.js", "MongoDB", "Chart.js", "Tailwind CSS"],
    category: "Web Dev",
    status: "Production",
    year: 2024,
    featured: false,
    badge: "🎓 Academic",
    demoLink: "https://ecell-puce.vercel.app/",
    githubLink: "https://github.com/Ronit-Raj9/Ecell",
    metrics: "College project"
  },
  {
    title: "Graph Neural Networks Research",
    subtitle: "Document Understanding with GNNs",
    description: "PyTorch Geometric implementations for document layout analysis and understanding using graph neural networks.",
    image: "/projects/graphml.png",
    tech: ["PyTorch", "Python", "PyTorch Geometric", "GNNs"],
    category: "Research",
    status: "Research",
    year: 2024,
    featured: false,
    badge: "🔬 Research",
    demoLink: "https://github.com/Ronit-Raj9",
    githubLink: "https://github.com/Ronit-Raj9",
    metrics: "Research project"
  },
  {
    title: "Token Analytics Dashboard",
    subtitle: "Real-time Crypto Analytics",
    description: "Data visualization platform for cryptocurrency analytics with real-time price tracking and portfolio management.",
    image: "/projects/graphml.png",
    tech: ["React", "D3.js", "Web3.js", "Chart.js"],
    category: "Blockchain",
    status: "Demo",
    year: 2024,
    featured: false,
    badge: "📊 Analytics",
    demoLink: "https://github.com/Ronit-Raj9",
    githubLink: "https://github.com/Ronit-Raj9",
    metrics: "Data visualization"
  },
  {
    title: "Portfolio Website",
    subtitle: "This very site!",
    description: "Next.js 14 portfolio with 3D elements, dark mode, and comprehensive SEO. Built with React Three Fiber and Framer Motion.",
    image: "/projects/genetrust.png",
    tech: ["Next.js", "Three.js", "Tailwind", "Framer Motion"],
    category: "Web Dev",
    status: "Production",
    year: 2025,
    featured: false,
    badge: "✨ Meta",
    demoLink: "https://www.ronitraj.me/",
    githubLink: "https://github.com/Ronit-Raj9/portfolio",
    metrics: "You're looking at it!"
  }
]

const CATEGORIES = ["All", "AI/ML", "Blockchain", "EdTech", "LegalTech", "Web Dev", "Research"]
const STATUSES = ["All", "Production", "In Development", "Research", "Demo"]

// ============================================================================
// COMPONENTS
// ============================================================================

function ProjectCard({ project, index, isGridView }: { 
  project: typeof ALL_PROJECTS[0], 
  index: number,
  isGridView: boolean 
}) {
  if (isGridView) {
    // Grid view - compact cards
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        className="group relative bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          {project.badge && (
            <div className="absolute top-3 left-3 z-20">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-background/80 backdrop-blur-sm border border-border/50">
                {project.badge}
              </span>
            </div>
          )}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              {project.category}
            </span>
            <span className="text-xs text-muted-foreground">{project.year}</span>
          </div>
          
          <h3 className="font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1 mb-3">
            {project.tech.slice(0, 3).map(t => (
              <span key={t} className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-accent/30">{t}</span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-[10px] text-muted-foreground">+{project.tech.length - 3}</span>
            )}
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-3">
            {project.demoLink && project.demoLink !== "#" && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                onClick={() => trackProjectDemo(project.title)}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                Demo <FaExternalLinkAlt className="w-2 h-2" />
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                onClick={() => trackGitHubClick(project.title)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <FaGithub className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  // List view - horizontal cards
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group flex flex-col md:flex-row gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
        {project.badge && (
          <div className="absolute top-2 left-2 z-20">
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-background/80 backdrop-blur-sm">
              {project.badge}
            </span>
          </div>
        )}
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="200px"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {project.category}
          </span>
          <span className="text-xs text-muted-foreground">{project.year}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/30">{project.status}</span>
        </div>
        
        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-primary font-medium mb-1">{project.subtitle}</p>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/30">{t}</span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs text-muted-foreground">+{project.tech.length - 4}</span>
            )}
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-3">
            {project.demoLink && project.demoLink !== "#" && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                onClick={() => trackProjectDemo(project.title)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Live Demo <BsArrowRight className="w-3 h-3" />
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                onClick={() => trackGitHubClick(project.title)}
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <FaGithub className="w-4 h-4" />
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
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isGridView, setIsGridView] = useState(true)

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter(project => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
      const matchesStatus = selectedStatus === "All" || project.status === selectedStatus
      const matchesSearch = searchQuery === "" || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesCategory && matchesStatus && matchesSearch
    })
  }, [selectedCategory, selectedStatus, searchQuery])

  // Sort: Featured first, then by year
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return b.year - a.year
    })
  }, [filteredProjects])

  return (
    <div className="min-h-screen py-20">
      <div className="container px-4 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Projects</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
          {/* Search & View Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{sortedProjects.length} projects</span>
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setIsGridView(true)}
                  className={cn("p-2 transition-colors", isGridView ? "bg-primary text-primary-foreground" : "hover:bg-accent/50")}
                >
                  <BsGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsGridView(false)}
                  className={cn("p-2 transition-colors", !isGridView ? "bg-primary text-primary-foreground" : "hover:bg-accent/50")}
                >
                  <BsList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-full transition-all",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent/30 hover:bg-accent/50 text-foreground/80"
                )}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-1 text-xs opacity-70">
                    ({ALL_PROJECTS.filter(p => p.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            <FaFilter className="w-4 h-4 text-muted-foreground self-center mr-1" />
            {STATUSES.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={cn(
                  "px-2.5 py-1 text-xs font-medium rounded-full transition-all",
                  selectedStatus === status
                    ? "bg-foreground text-background"
                    : "bg-accent/20 hover:bg-accent/40 text-foreground/70"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          {sortedProjects.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${selectedStatus}-${isGridView}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                isGridView 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "flex flex-col gap-4"
              )}
            >
              {sortedProjects.map((project, index) => (
                <ProjectCard 
                  key={project.title} 
                  project={project} 
                  index={index}
                  isGridView={isGridView}
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
                  setSelectedStatus("All")
                  setSearchQuery("")
                }}
                className="mt-4 text-primary hover:underline"
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
          className="text-center mt-16"
        >
          <Link href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent/50 hover:bg-accent rounded-full text-sm font-medium transition-colors">
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
