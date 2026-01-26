"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { FaGithub, FaLinkedin, FaTwitter, FaBrain, FaCode, FaDatabase, FaGraduationCap, FaRobot, FaTrophy, FaLaptopCode, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import { 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
  SiPytorch, 
  SiTensorflow, 
  SiMongodb, 
  SiReact,
  SiFastapi,
  SiOpenai,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiAmazon,
  SiDocker,
  SiKaggle,
  SiGooglecloud,
  SiNumpy,
  SiPandas
} from "react-icons/si"
import { BsGraphUp, BsLightningChargeFill, BsArrowRight, BsCheckCircleFill, BsStars } from "react-icons/bs"
import { HiOutlineDocumentDownload, HiOutlineMail, HiAcademicCap } from "react-icons/hi"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDistanceToNow, format } from 'date-fns'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip'

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false })

// ============================================================================
// DATA CONSTANTS
// ============================================================================

const SOCIAL_LINKS = [
  { name: "GitHub", url: "https://github.com/Ronit-Raj9", icon: FaGithub },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/ronit-raj-662485225/", icon: FaLinkedin },
  { name: "Twitter", url: "https://x.com/ronit__raj", icon: FaTwitter },
  { name: "Kaggle", url: "https://www.kaggle.com/ronitraj1", icon: SiKaggle },
]

const STATS = [
  { icon: FaTrophy, label: "SIH 2024 Winner", value: "PS1604", color: "text-yellow-500" },
  { icon: FaLaptopCode, label: "Projects Built", value: "15+", color: "text-blue-500" },
  { icon: BsCheckCircleFill, label: "OCR Accuracy", value: "85%", color: "text-green-500" },
  { icon: HiAcademicCap, label: "IIIT Gwalior", value: "B.Tech", color: "text-purple-500" },
]

const SKILLS_COMPACT = {
  core: ["Python", "TypeScript", "PyTorch", "Next.js", "FastAPI"],
  ai: ["GNNs", "LLMs", "RAG", "Vision-Language Models", "Diffusion"],
  infra: ["AWS", "Docker", "MongoDB", "GCP", "Blockchain"],
}

const PROJECTS = [
  {
    title: "LegalEase",
    description: "AI-powered legal compliance platform for Indian startups with automated contract generation, GST management, and blockchain notarization.",
    image: "/projects/legalease.png",
    tags: ["Next.js", "FastAPI", "AI Agents", "Blockchain"],
    demoLink: "https://legalease-new.vercel.app/",
    codeLink: "",
    type: "Legal Tech",
    metric: "Startup Focused",
    featured: true
  },
  {
    title: "GeneTrust AI Studio",
    description: "CRISPR intelligence platform using DNABERT model for complex genetic sequence analysis and ranking.",
    image: "/projects/genetrust.png",
    tags: ["Next.js", "PyTorch", "DNABERT"],
    demoLink: "https://genetrust.vercel.app/",
    codeLink: "https://github.com/Ronit-Raj9/hackhazard-project-genetrust",
    type: "AI / Bioinformatics",
    metric: "Featured Project",
    featured: true
  },
  {
    title: "Project SHAKTI",
    description: "Advanced multimodal LLM system for military tactical intelligence with vision-language models and RAG.",
    image: "/projects/ionia.png",
    tags: ["LLMs", "RAG", "Vision-Language"],
    demoLink: "https://www.ionia.sbs/",
    codeLink: "",
    type: "Military AI",
    metric: "SIH 2024 Winner",
    featured: true
  },
]

const EXPERIENCE = [
  {
    role: "Co-Founder & Lead Developer",
    company: "Garudex Labs",
    period: "Jan 2025 - Present",
    shortPeriod: "2025",
    description: "Leading AI solutions development for entrepreneurs and founders.",
    icon: BsStars
  },
  {
    role: "Full Stack Developer",
    company: "Ionia Platform",
    period: "Dec 2024 - Mar 2025",
    shortPeriod: "2024-25",
    description: "Built end-to-end JEE testing system with 1000+ users.",
    icon: FaCode
  },
  {
    role: "SIH 2024 Winner",
    company: "Team BeGANs",
    period: "December 2024",
    shortPeriod: "2024",
    description: "Won PS1604 with Project SHAKTI - 85% OCR accuracy.",
    icon: FaTrophy
  },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

// ============================================================================
// COMPONENTS
// ============================================================================

// Compact Project Card for Bento Grid
function ProjectCardCompact({ project, index }: { project: typeof PROJECTS[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col h-full bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Image Container */}
      <div className="relative h-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
        {project.featured && (
          <div className="absolute top-3 left-3 z-20">
            <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-primary text-primary-foreground">
              {project.metric}
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
      <div className="flex flex-col flex-grow p-5">
        <span className="text-xs font-medium text-primary mb-2">{project.type}</span>
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-accent/50 text-foreground/80">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Live Demo <BsArrowRight className="w-3 h-3" />
          </a>
          {project.codeLink && (
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/50 text-foreground hover:bg-accent transition-colors"
            >
              <FaGithub className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Horizontal Experience Card
function ExperienceCardHorizontal({ experience, index }: { experience: typeof EXPERIENCE[0], index: number }) {
  const Icon = experience.icon
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group relative flex-shrink-0 w-[280px] md:w-[320px] p-5 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground mb-1">{experience.shortPeriod}</p>
          <h4 className="font-semibold text-sm mb-1 truncate">{experience.role}</h4>
          <p className="text-xs text-primary font-medium mb-2">{experience.company}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{experience.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Sticky Hire Me Button
function StickyHireButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed right-6 bottom-6 z-50 flex flex-col gap-3"
        >
          <a
            href="mailto:ronitk964@gmail.com"
            className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all font-medium text-sm"
          >
            <HiOutlineMail className="w-4 h-4" />
            <span className="hidden sm:inline">Contact Me</span>
          </a>
          <a
            href="/resume_web.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-background border border-border text-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all font-medium text-sm"
          >
            <HiOutlineDocumentDownload className="w-4 h-4" />
            <span className="hidden sm:inline">Resume</span>
          </a>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// GitHub Section (simplified)
interface GitHubData {
  profile: {
    name: string
    avatarUrl: string
    followers: number
    following: number
    publicRepos: number
    totalStars: number
    url: string
    bio: string
    createdAt: string
  }
  availableYears: number[]
  selectedYear: number
  contributions: {
    total: number
    code: number
    issues: number
    prs: number
  }
  contributionCalendar: {
    totalContributions: number
    weeks: {
      firstDay: string
      days: { count: number; date: string; weekday: number }[]
    }[]
  }
  lastUpdated: string
}

async function getGitHubData(year?: number): Promise<GitHubData> {
  const params = year ? `?year=${year}` : ''
  const response = await fetch(`/api/github${params}`, { cache: 'no-store' })
  if (!response.ok) throw new Error('Failed to fetch GitHub data')
  return response.json()
}

function getColorLevel(count: number): string {
  if (count === 0) return 'bg-slate-100 dark:bg-slate-800'
  if (count < 5) return 'bg-green-100 dark:bg-green-900'
  if (count < 10) return 'bg-green-300 dark:bg-green-700'
  if (count < 20) return 'bg-green-500 dark:bg-green-500'
  return 'bg-green-700 dark:bg-green-300'
}

function GitHubSection() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const data = await getGitHubData(selectedYear || undefined)
        setGithubData(data)
        if (!selectedYear) setSelectedYear(data.selectedYear)
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedYear])

  if (loading || !githubData) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
    )
  }

  return (
    <section id="github" className="w-full py-16 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Open Source</span>
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              GitHub Activity
            </h2>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={githubData.profile.avatarUrl} alt={githubData.profile.name} />
                  <AvatarFallback>{githubData.profile.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{githubData.profile.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="secondary">{githubData.profile.followers} followers</Badge>
                    <Badge variant="secondary">{githubData.profile.publicRepos} repos</Badge>
                    <Badge variant="secondary">{githubData.profile.totalStars} stars</Badge>
                  </div>
                </div>
                <a 
                  href={githubData.profile.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <FaGithub className="h-4 w-4" />
                  View Profile
                </a>
              </div>

              {/* Contribution stats */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="bg-secondary/50 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-xl font-bold">{githubData.contributions.total}</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Code</p>
                  <p className="text-xl font-bold">{githubData.contributions.code}</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Issues</p>
                  <p className="text-xl font-bold">{githubData.contributions.issues}</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">PRs</p>
                  <p className="text-xl font-bold">{githubData.contributions.prs}</p>
                </div>
              </div>

              {/* Year buttons */}
              <div className="flex gap-2 mb-4">
                {githubData.availableYears.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      year === selectedYear
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Calendar */}
              <TooltipProvider>
                <div className="grid grid-cols-53 gap-[2px] overflow-x-auto">
                  {githubData.contributionCalendar.weeks.flatMap((week, weekIndex) => 
                    week.days.map((day, dayIndex) => (
                      <Tooltip key={`${weekIndex}-${dayIndex}`}>
                        <TooltipTrigger asChild>
                          <div 
                            className={`h-2.5 w-2.5 rounded-sm ${getColorLevel(day.count)} cursor-pointer`}
                            style={{ gridColumn: weekIndex + 1, gridRow: day.weekday + 1 }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs"><b>{day.count} contributions</b> on {format(new Date(day.date), 'MMM d, yyyy')}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))
                  )}
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98])

  return (
    <main ref={containerRef} className="relative flex min-h-screen flex-col items-center">
      {/* Sticky Hire Me Button */}
      <StickyHireButton />

      {/* ================================================================== */}
      {/* HERO SECTION - Screen 1 (65vh) */}
      {/* ================================================================== */}
      <section className="relative flex w-full flex-col items-center justify-center min-h-[65vh]">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-background to-background -z-10" />
        <Scene3D />
        
        <div className="container px-4 pt-24 md:pt-28 pb-8 flex flex-col items-center justify-center">
          <motion.div
            style={{ opacity, scale }}
            className="flex flex-col items-center gap-4 text-center max-w-4xl"
          >
            {/* Profile Image - Smaller */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl"
            >
              <Image
                src="/images/profile.jpeg"
                alt="Ronit Raj"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
            >
              RONIT RAJ
            </motion.h1>

            {/* Profession + Achievement + Institution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex flex-wrap items-center justify-center gap-2 text-base md:text-lg">
                <span className="font-semibold text-primary">AI/ML Engineer</span>
                <span className="text-muted-foreground">|</span>
                <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-500 font-medium">
                  <FaTrophy className="w-4 h-4" /> SIH 2024 Winner
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Co-Founder @ Garudex Labs</span>
                <span>|</span>
                <span className="flex items-center gap-1">
                  <HiAcademicCap className="w-4 h-4" /> IIIT Gwalior
                </span>
              </div>
            </motion.div>

            {/* Specific Expertise - 2 lines */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed"
            >
              Building production AI systems with Graph Neural Networks &amp; Multimodal LLMs.
              <br className="hidden md:block" />
              <span className="hidden md:inline">Led Team BeGANs to SIH 2024 victory with 85% OCR accuracy on military intelligence systems.</span>
            </motion.p>

            {/* Primary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 mt-4"
            >
              <Link href="#projects">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  View Projects <BsArrowRight />
                </motion.button>
              </Link>
              <a
                href="/resume_web.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-border bg-background/80 backdrop-blur-sm rounded-full font-medium hover:bg-accent/50 transition-all"
              >
                <HiOutlineDocumentDownload className="w-5 h-5" /> Download Resume
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Featured Work indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <span>↓ Featured Work</span>
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* STATS BAR */}
      {/* ================================================================== */}
      <section className="w-full py-6 border-y border-border/50 bg-accent/5">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex items-center gap-3 justify-center md:justify-start"
              >
                <stat.icon className={cn("w-5 h-5", stat.color)} />
                <div>
                  <p className="text-sm font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FEATURED PROJECTS - Bento Grid (Screen 2) */}
      {/* ================================================================== */}
      <section id="projects" className="w-full py-16">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            {/* Section Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">Featured Work</span>
                <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  Recent Projects
                </h2>
              </div>
              <Link href="/projects">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  View All <BsArrowRight />
                </motion.button>
              </Link>
            </div>
            
            {/* Bento Grid - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project, index) => (
                <ProjectCardCompact key={project.title} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* EXPERIENCE - Horizontal Timeline (Screen 3 top) */}
      {/* ================================================================== */}
      <section id="experience" className="w-full py-12 bg-accent/5">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">Career Path</span>
              <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Professional Journey
              </h2>
            </div>

            {/* Horizontal Scrollable Cards */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
              {EXPERIENCE.map((exp, index) => (
                <ExperienceCardHorizontal key={exp.company} experience={exp} index={index} />
              ))}
              
              {/* Education Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: EXPERIENCE.length * 0.1, duration: 0.4 }}
                className="flex-shrink-0 w-[280px] md:w-[320px] p-5 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 shrink-0">
                    <FaGraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">2023-2027</p>
                    <h4 className="font-semibold text-sm mb-1">B.Tech in Mathematics</h4>
                    <p className="text-xs text-primary font-medium mb-2">IIIT Gwalior</p>
                    <p className="text-xs text-muted-foreground">Scientific Computing specialization</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SKILLS - Compact Tags (Screen 3 bottom) */}
      {/* ================================================================== */}
      <section id="skills" className="w-full py-12">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">Tech Stack</span>
              <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Skills & Technologies
              </h2>
            </div>

            {/* Compact Skills Tags */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="text-sm font-semibold text-primary min-w-[100px]">Core Stack:</span>
                {SKILLS_COMPACT.core.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary">
                    {skill}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="text-sm font-semibold text-purple-500 min-w-[100px]">AI/ML:</span>
                {SKILLS_COMPACT.ai.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-sm font-medium rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    {skill}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="text-sm font-semibold text-blue-500 min-w-[100px]">Infrastructure:</span>
                {SKILLS_COMPACT.infra.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-sm font-medium rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {skill}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* View all skills link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-6"
            >
              <Link href="/skills" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                View all skills <BsArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* GITHUB ACTIVITY */}
      {/* ================================================================== */}
      <GitHubSection />

      {/* ================================================================== */}
      {/* CONTACT - Simplified */}
      {/* ================================================================== */}
      <section id="contact" className="w-full py-16 bg-accent/5">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Let's Work Together
            </h2>
            <p className="text-muted-foreground mb-8">
              Have a project in mind or just want to connect? I'm always open to discussing new opportunities.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="mailto:ronitk964@gmail.com"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <HiOutlineMail className="w-5 h-5" /> Send Email
              </a>
              <a
                href="https://www.linkedin.com/in/ronit-raj-662485225/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-border bg-background rounded-full font-medium hover:bg-accent/50 transition-all"
              >
                <FaLinkedin className="w-5 h-5" /> LinkedIn
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <FaEnvelope className="w-4 h-4" /> ronitk964@gmail.com
              </span>
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4" /> Gwalior, India
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" /> Available for projects
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
