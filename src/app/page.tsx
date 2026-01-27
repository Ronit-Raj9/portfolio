"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { trackResumeDownload, trackEmailClick, trackProjectDemo, trackGitHubClick, trackSocialClick } from "@/lib/analytics"
import { FaGithub, FaLinkedin, FaTwitter, FaGraduationCap, FaTrophy, FaEnvelope, FaMapMarkerAlt, FaQuoteLeft, FaExternalLinkAlt } from "react-icons/fa"
import { SiKaggle } from "react-icons/si"
import { BsArrowRight, BsStars, BsLightningChargeFill, BsGraphUp, BsCodeSlash, BsCheckCircleFill } from "react-icons/bs"
import { HiOutlineDocumentDownload, HiOutlineMail, HiAcademicCap, HiCode, HiLightningBolt } from "react-icons/hi"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDistanceToNow, format } from 'date-fns'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false })

// ============================================================================
// DATA - Following Adithya's quantified impact approach
// ============================================================================

const WORK_EXPERIENCE = [
  {
    role: "Co-Founder & Lead Developer",
    company: "Garudex Labs",
    period: "January 2025 - Present",
    description: "Building next-generation AI solutions for entrepreneurs",
    highlights: [
      "Leading product development and technical architecture",
      "Building AI-powered tools for startup founders",
      "Managing distributed team of developers"
    ],
    current: true
  },
  {
    role: "Full Stack Developer",
    company: "Ionia Platform",
    period: "December 2024 - March 2025",
    description: "End-to-end JEE testing system with 1000+ active users",
    highlights: [
      "Built complete testing platform from scratch",
      "Implemented real-time analytics dashboard",
      "Achieved 99.9% uptime in production"
    ],
    current: false
  }
]

const ACHIEVEMENTS = [
  {
    year: "2024",
    title: "Smart India Hackathon Winner",
    subtitle: "PS1604 RAG-MLLM",
    description: "Led Team BeGANs • 85% OCR accuracy • Military AI intelligence system"
  },
  {
    year: "2025",
    title: "Co-Founded Garudex Labs",
    subtitle: "AI Startup",
    description: "Building AI solutions for entrepreneurs and founders"
  },
  {
    year: "2024",
    title: "Built 15+ Production Projects",
    subtitle: "Full Stack & AI",
    description: "From EdTech to LegalTech to Bioinformatics"
  }
]

// Adithya-style project format with metrics
// TIER 1: FEATURED PROJECTS (Top 3 - Maximum detail, award-winning work)
const FEATURED_PROJECTS = [
  {
    title: "Project SHAKTI",
    subtitle: "Military AI Intelligence System",
    badge: "🏆 SIH 2024 Winner",
    badgeColor: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    highlights: [
      "Vision-language RAG with memory retrieval architecture",
      "85% OCR accuracy on scanned military documents",
      "Multimodal LLM integration for image conversational AI",
      "Team BeGANs leadership - 6 members, 48-hour hackathon"
    ],
    tech: ["PyTorch", "RAG", "Vision-Language Models", "OCR"],
    links: { demo: "https://www.ionia.sbs/", caseStudy: "/projects/shakti" },
    image: "/projects/ionia.png",
    category: "AI/ML"
  },
  {
    title: "GeneTrust AI Studio",
    subtitle: "AI-Powered CRISPR Intelligence Platform",
    badge: "⭐ Featured Project",
    badgeColor: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30",
    highlights: [
      "DNABERT model integration for genetic sequence analysis",
      "Next.js + TypeScript + PyTorch + FastAPI architecture",
      "Real-time ranking and prediction system",
      "Featured in AI/Bioinformatics portfolio"
    ],
    tech: ["Next.js", "TypeScript", "PyTorch", "FastAPI"],
    links: { demo: "https://genetrust.vercel.app/", github: "https://github.com/Ronit-Raj9/hackhazard-project-genetrust" },
    image: "/projects/genetrust.png",
    category: "AI/ML"
  },
  {
    title: "EverydayApp",
    subtitle: "Starknet DeFi Platform",
    badge: "🚀 In Development",
    badgeColor: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
    highlights: [
      "Building decentralized finance tools on Starknet",
      "Cairo smart contract development",
      "React + TypeScript frontend with Web3 integration",
      "Focus on user-friendly DeFi experience"
    ],
    tech: ["Cairo", "Starknet", "React", "TypeScript"],
    links: { demo: "#", github: "https://github.com/Ronit-Raj9" },
    image: "/projects/legalease.png",
    category: "Blockchain"
  }
]

// TIER 2: MORE PROJECTS (Next 6 - Condensed cards, show versatility)
const MORE_PROJECTS = [
  {
    title: "Ionia Testing Platform",
    subtitle: "1000+ active users • 99.9% uptime",
    description: "End-to-end JEE testing system with real-time analytics",
    tech: ["Next.js", "Express.js", "MongoDB"],
    link: "https://www.ionia.sbs/",
    github: "https://github.com/Ronit-Raj9/ionia-next",
    category: "EdTech",
    badge: "💼 Production"
  },
  {
    title: "LegalEase",
    subtitle: "AI-powered legal compliance",
    description: "Automated contract generation for Indian startups with GST management",
    tech: ["Next.js", "FastAPI", "AI Agents"],
    link: "https://legalease-new.vercel.app/",
    category: "LegalTech",
    badge: "🏢 Startup"
  },
  {
    title: "E-Cell IIIT Gwalior",
    subtitle: "College entrepreneurship platform",
    description: "Website with event management and analytics dashboard",
    tech: ["Next.js", "MongoDB", "Chart.js"],
    link: "https://ecell-puce.vercel.app/",
    github: "https://github.com/Ronit-Raj9/Ecell",
    category: "Web Dev",
    badge: "🎓 Academic"
  },
  {
    title: "Graph Neural Networks",
    subtitle: "Research implementations",
    description: "PyTorch Geometric implementations for document understanding",
    tech: ["PyTorch", "Python", "GNNs"],
    link: "https://github.com/Ronit-Raj9",
    category: "Research",
    badge: "🔬 Research"
  },
  {
    title: "Token Analytics Dashboard",
    subtitle: "Real-time crypto insights",
    description: "Data visualization platform for cryptocurrency analytics",
    tech: ["React", "D3.js", "Web3.js"],
    link: "https://github.com/Ronit-Raj9",
    category: "Blockchain",
    badge: "📊 Analytics"
  },
  {
    title: "Portfolio Website",
    subtitle: "This very site!",
    description: "Next.js 14 portfolio with 3D elements and dark mode",
    tech: ["Next.js", "Three.js", "Tailwind"],
    link: "https://www.ronitraj.me/",
    github: "https://github.com/Ronit-Raj9/portfolio",
    category: "Web Dev",
    badge: "✨ Meta"
  }
]

// Adithya-style specific skills (not generic categories)
const TECHNICAL_SKILLS = {
  "Vision-Language Models": ["PaliGemma", "CLIP", "ViT architectures", "Multi-modal fusion"],
  "Graph Neural Networks": ["PyTorch Geometric", "DGL", "Message passing algorithms"],
  "LLM Fine-tuning & RAG": ["Retrieval-Augmented Generation", "LoRA/QLoRA", "Vector databases"],
  "Production Infrastructure": ["FastAPI (99.9% uptime)", "Docker", "AWS/GCP", "CI/CD pipelines"]
}

const TESTIMONIALS = [
  {
    quote: "Ronit demonstrated exceptional problem-solving skills during SIH 2024. His ability to architect complex AI systems under pressure was remarkable.",
    author: "Team BeGANs Mentor",
    role: "SIH 2024 Judge Panel"
  },
  {
    quote: "A dedicated developer with deep understanding of both frontend and AI/ML. Delivered the Ionia platform ahead of schedule with excellent quality.",
    author: "Ionia Platform Stakeholder",
    role: "EdTech Startup"
  }
]

const BLOG_POSTS = [
  {
    title: "Building Production RAG Systems: Lessons from SIH 2024",
    readTime: "8 min read",
    date: "Jan 2025",
    link: "#"
  },
  {
    title: "Graph Neural Networks for Document Understanding",
    readTime: "12 min read",
    date: "Dec 2024",
    link: "#"
  }
]

// ============================================================================
// COMPONENTS - Adithya-style minimalist approach
// ============================================================================

// Sticky Contact Button
function StickyContactButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300)
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
          className="fixed right-6 bottom-6 z-50 flex flex-col gap-2"
        >
          <a
            href="mailto:ronitk964@gmail.com"
            onClick={trackEmailClick}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm font-medium"
          >
            <HiOutlineMail className="w-4 h-4" />
            <span className="hidden sm:inline">Email Me</span>
          </a>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 rounded-full text-xs font-medium justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Available
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Adithya-style Project Card with bullet points
function ProjectCardDetailed({ project, index }: { project: typeof FEATURED_PROJECTS[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="group relative bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image */}
        <div className="relative w-full lg:w-1/3 h-40 lg:h-auto lg:min-h-[200px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 lg:hidden" />
          {project.badge && (
            <div className="absolute top-3 left-3 z-20">
              <span className={cn("px-2 py-0.5 text-xs font-medium rounded-full border", project.badgeColor || "bg-primary text-primary-foreground")}>
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

        {/* Content - Adithya's bullet format */}
        <div className="flex-1 p-4 lg:p-5">
          <h3 className="text-lg lg:text-xl font-bold mb-0.5">{project.title}</h3>
          <p className="text-xs text-muted-foreground mb-3">{project.subtitle}</p>

          {/* Bullet points - Adithya style */}
          <ul className="space-y-1 mb-4">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                <span className="text-primary">↳</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/50 text-foreground/80">
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-2">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProjectDemo(project.title)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Live Demo <BsArrowRight className="w-3 h-3" />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGitHubClick(project.title)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <FaGithub className="w-3 h-3" /> GitHub
              </a>
            )}
            {project.links.caseStudy && (
              <a
                href={project.links.caseStudy}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                Case Study
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// GitHub Section
interface GitHubData {
  profile: { name: string; avatarUrl: string; followers: number; publicRepos: number; totalStars: number; url: string; bio: string; createdAt: string }
  availableYears: number[]
  selectedYear: number
  contributions: { total: number; code: number; issues: number; prs: number }
  contributionCalendar: { weeks: { days: { count: number; date: string; weekday: number }[] }[] }
  lastUpdated: string
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
        const params = selectedYear ? `?year=${selectedYear}` : ''
        const response = await fetch(`/api/github${params}`, { cache: 'no-store' })
        if (response.ok) {
          const data = await response.json()
          setGithubData(data)
          if (!selectedYear) setSelectedYear(data.selectedYear)
        }
      } catch (error) {
        console.error('GitHub fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedYear])

  if (loading || !githubData) return <Skeleton className="h-48 w-full rounded-lg max-w-5xl mx-auto" />

  return (
    <Card className="max-w-5xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <Avatar className="h-14 w-14">
            <AvatarImage src={githubData.profile.avatarUrl} alt={githubData.profile.name} />
            <AvatarFallback>RR</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-bold">{githubData.profile.name}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge variant="secondary">{githubData.profile.followers} followers</Badge>
              <Badge variant="secondary">{githubData.profile.publicRepos} repos</Badge>
              <Badge variant="secondary">{githubData.profile.totalStars} stars</Badge>
            </div>
          </div>
          <a href={githubData.profile.url} target="_blank" rel="noopener noreferrer"
            onClick={() => trackGitHubClick()}
            className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
            <FaGithub className="h-4 w-4" /> View Profile
          </a>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total", value: githubData.contributions.total },
            { label: "Code", value: githubData.contributions.code },
            { label: "Issues", value: githubData.contributions.issues },
            { label: "PRs", value: githubData.contributions.prs }
          ].map(stat => (
            <div key={stat.label} className="bg-secondary/50 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          {githubData.availableYears.map(year => (
            <button key={year} onClick={() => setSelectedYear(year)}
              className={`px-3 py-1 text-sm rounded-md ${year === selectedYear ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
              {year}
            </button>
          ))}
        </div>

        <TooltipProvider>
          <div className="grid grid-cols-53 gap-[2px] overflow-x-auto">
            {githubData.contributionCalendar.weeks.flatMap((week, wi) =>
              week.days.map((day, di) => (
                <Tooltip key={`${wi}-${di}`}>
                  <TooltipTrigger asChild>
                    <div className={`h-2.5 w-2.5 rounded-sm ${getColorLevel(day.count)} cursor-pointer`}
                      style={{ gridColumn: wi + 1, gridRow: day.weekday + 1 }} />
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
  )
}

// ============================================================================
// MAIN PAGE - Adithya's optimal ordering
// ============================================================================

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98])

  return (
    <main ref={containerRef} className="relative flex min-h-screen flex-col">
      <StickyContactButton />

      {/* ================================================================== */}
      {/* 1. HERO - Adithya's minimalist approach with email visible */}
      {/* ================================================================== */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-background to-background -z-10" />
        <Scene3D />

        <div className="container px-4 pt-24 pb-12">
          <motion.div style={{ opacity, scale }} className="max-w-4xl mx-auto text-center">
            {/* Profile */}
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <Image src="/images/profile.jpeg" alt="Ronit Raj" fill className="object-cover" priority />
            </motion.div>

            {/* Name */}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }} className="text-4xl md:text-5xl font-bold mb-4">
              Ronit Raj
            </motion.h1>

            {/* One-line value prop - Adithya style */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }} className="text-lg md:text-xl text-foreground/80 mb-4 leading-relaxed">
              AI/ML Engineer building production systems with Graph Neural Networks &amp; Multimodal LLMs
            </motion.p>

            {/* Credentials line with separators - Adithya style */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }} className="text-sm text-muted-foreground mb-6">
              SIH 2024 National Winner • Co-Founder @ Garudex Labs • IIIT Gwalior
            </motion.p>

            {/* Contact info visible - Adithya's key insight */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }} className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
              <a href="mailto:ronitk964@gmail.com" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <FaEnvelope className="w-4 h-4" /> ronitk964@gmail.com
              </a>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="w-4 h-4" /> Gwalior, India
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }} className="flex flex-wrap items-center justify-center gap-3">
              <Link href="#work">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-xl transition-all">
                  View Work <BsArrowRight />
                </motion.button>
              </Link>
              <a href="/resume_web.pdf" target="_blank" rel="noopener noreferrer"
                onClick={trackResumeDownload}
                className="flex items-center gap-2 px-6 py-3 border border-border bg-background/80 rounded-full font-medium hover:bg-accent/50 transition-all">
                <HiOutlineDocumentDownload className="w-5 h-5" /> Resume
              </a>
              <a href="mailto:ronitk964@gmail.com"
                onClick={trackEmailClick}
                className="flex items-center gap-2 px-6 py-3 border border-border bg-background/80 rounded-full font-medium hover:bg-accent/50 transition-all">
                <HiOutlineMail className="w-5 h-5" /> Email Me
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. WORK EXPERIENCE - Adithya's ordering (before projects) */}
      {/* ================================================================== */}
      <section id="work" className="w-full py-20 bg-accent/5">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">Work Experience</h2>

            <div className="space-y-8">
              {WORK_EXPERIENCE.map((exp, index) => (
                <motion.div key={exp.company} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="relative pl-8 border-l-2 border-primary/30">
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-primary" />
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold">{exp.role}</h3>
                    {exp.current && <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">Current</Badge>}
                  </div>
                  <p className="text-primary font-medium mb-1">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                  <p className="text-foreground/80 mb-3">{exp.description}</p>
                  <ul className="space-y-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">↳</span> {h}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. ACHIEVEMENTS - Yash's dedicated section format */}
      {/* ================================================================== */}
      <section className="w-full py-20">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">
              Achievements & Recognition
            </h2>

            <div className="space-y-6">
              {ACHIEVEMENTS.map((achievement, index) => (
                <motion.div key={achievement.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="p-5 bg-card/50 rounded-xl border border-border/50 hover:border-primary/30 transition-all">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-primary">{achievement.year}</span>
                      <span className="text-muted-foreground">•</span>
                      <h3 className="font-bold">{achievement.title}</h3>
                    </div>
                    <p className="text-sm text-primary font-medium mb-1">{achievement.subtitle}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. FEATURED PROJECTS - Adithya's detailed format with metrics */}
      {/* ================================================================== */}
      <section id="projects" className="w-full py-20 bg-accent/5">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
              <Link href="/projects" className="text-sm text-primary hover:underline flex items-center gap-1">
                View All <BsArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-8">
              {FEATURED_PROJECTS.map((project, index) => (
                <ProjectCardDetailed key={project.title} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. MORE PROJECTS - Tier 2: Condensed cards showing versatility */}
      {/* ================================================================== */}
      <section className="w-full py-16">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">More Projects</h2>
              <span className="text-xs text-muted-foreground">Showing versatility across domains</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MORE_PROJECTS.map((project, index) => (
                <motion.div key={project.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.08 }}
                  className="group p-5 bg-card/50 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  {/* Badge & Category */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/50 text-muted-foreground">
                      {project.category}
                    </span>
                    {project.badge && (
                      <span className="text-xs font-medium text-muted-foreground">
                        {project.badge}
                      </span>
                    )}
                  </div>
                  
                  {/* Title & Subtitle */}
                  <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-primary font-medium mb-2">{project.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map(t => (
                      <span key={t} className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/30">{t}</span>
                    ))}
                  </div>
                  
                  {/* Links */}
                  <div className="flex items-center gap-2">
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      onClick={() => trackProjectDemo(project.title)}
                      className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                      Live Demo <FaExternalLinkAlt className="w-2.5 h-2.5" />
                    </a>
                    {project.github && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          onClick={() => trackGitHubClick(project.title)}
                          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
                          <FaGithub className="w-3 h-3" /> GitHub
                        </a>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Projects CTA */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-center mt-10">
              <Link href="/projects" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent/50 hover:bg-accent rounded-full text-sm font-medium transition-colors">
                View All Projects <BsArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. TECHNICAL SKILLS - Adithya's specific format */}
      {/* ================================================================== */}
      <section id="skills" className="w-full py-20 bg-accent/5">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 flex items-center gap-3">
              <HiCode className="text-primary" /> Technical Expertise
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(TECHNICAL_SKILLS).map(([category, skills], index) => (
                <motion.div key={category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="p-5 bg-card/50 rounded-xl border border-border/50">
                  <h3 className="font-bold text-primary mb-3">{category}</h3>
                  <ul className="space-y-1.5">
                    {skills.map((skill, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="text-primary">↳</span> {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-center mt-8">
              <Link href="/skills" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                View all skills <BsArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. TESTIMONIALS - Yash's approach */}
      {/* ================================================================== */}
      <section className="w-full py-20">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 flex items-center gap-3">
              <FaQuoteLeft className="text-primary" /> What Others Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.div key={testimonial.author} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="p-6 bg-card/50 rounded-xl border border-border/50 relative">
                  <FaQuoteLeft className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
                  <p className="text-foreground/80 italic mb-4 leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold">— {testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. BLOG POSTS - Adithya's thought leadership */}
      {/* ================================================================== */}
      <section className="w-full py-16 bg-accent/5">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
              📝 Latest Writings
            </h2>

            <div className="space-y-4">
              {BLOG_POSTS.map((post, index) => (
                <motion.a key={post.title} href={post.link}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="group flex items-center justify-between p-4 bg-card/50 rounded-xl border border-border/50 hover:border-primary/30 transition-all">
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.readTime} • {post.date}</p>
                  </div>
                  <BsArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 9. GITHUB ACTIVITY */}
      {/* ================================================================== */}
      <section className="w-full py-20">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="text-center mb-10 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold">Open Source Contributions</h2>
            </div>
            <GitHubSection />
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 10. CONTACT - Simplified with email prominent */}
      {/* ================================================================== */}
      <section id="contact" className="w-full py-20 bg-accent/5">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-muted-foreground mb-8">
              Open to discussing AI/ML projects, full-stack development, or startup collaborations.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="mailto:ronitk964@gmail.com"
                onClick={trackEmailClick}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                <HiOutlineMail className="w-5 h-5" /> ronitk964@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/ronitrajai/" target="_blank" rel="noopener noreferrer"
                onClick={() => trackSocialClick('linkedin')}
                className="flex items-center gap-2 px-6 py-3 border border-border bg-background rounded-full font-medium hover:bg-accent/50 transition-all">
                <FaLinkedin className="w-5 h-5" /> LinkedIn
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4" /> Gwalior, India
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Available for projects
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
