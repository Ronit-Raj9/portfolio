"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { trackResumeDownload, trackProjectDemo, trackGitHubClick, trackSocialClick } from "@/lib/analytics"
import { FaGithub, FaLinkedin, FaGraduationCap, FaTrophy, FaEnvelope, FaMapMarkerAlt, FaQuoteLeft, FaExternalLinkAlt } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SiKaggle } from "react-icons/si"
import { BsArrowRight, BsStars, BsLightningChargeFill, BsGraphUp, BsCodeSlash, BsCheckCircleFill } from "react-icons/bs"
import { HiOutlineDocumentDownload, HiOutlineMail, HiAcademicCap, HiCode, HiLightningBolt } from "react-icons/hi"
import Image from "next/image"
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDistanceToNow, format } from 'date-fns'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import GitHubActivityBadge from '@/components/GitHubActivityBadge'
import { EmailLink } from '@/components/EmailLink'

// Import centralized data
import {
  profile,
  experience as WORK_EXPERIENCE,
  achievementGroups as ACHIEVEMENT_GROUPS,
  featuredProjects as FEATURED_PROJECTS,
  moreProjects as MORE_PROJECTS,
  technicalSkills as TECHNICAL_SKILLS,
  allSkills as ALL_SKILLS,
  type Project,
  type Achievement
} from '@/data'

// ============================================================================
// COMPONENTS - Adithya-style minimalist approach
// ============================================================================

// Sticky Contact Button - bottom-right FAB, above mobile nav
function StickyContactButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed z-[95] right-4 md:right-6",
            "bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-6"
          )}
        >
          <EmailLink
            email={profile.email}
            aria-label={`Email ${profile.name}`}
            className={cn(
              "flex items-center justify-center gap-2 bg-foreground text-background",
              "hover:opacity-90 active:scale-95 transition-all text-sm font-medium shadow-lg",
              "rounded-full md:rounded-md",
              "h-12 w-12 md:h-auto md:w-auto md:px-4 md:py-2.5"
            )}
          >
            <HiOutlineMail className="w-5 h-5 md:w-4 md:h-4 shrink-0" />
            <span className="hidden md:inline">Email Me</span>
          </EmailLink>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Compact project card - rectangular thumb, tags, all link buttons
function ProjectCardCompact({ project, index }: { project: Project; index: number }) {
  const trackLabel =
    project.track === 'ml' ? 'ML' : project.track === 'full-stack-ai' ? 'Full-Stack AI' : project.track === 'web3' ? 'Web3' : null

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.25) }}
      className="group flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md hover:border-foreground/25 transition-all duration-200"
    >
      {/* Rectangular preview */}
      <div className="relative w-full aspect-[2.1/1] shrink-0 overflow-hidden bg-muted/40">
        <Image
          src={project.image}
          alt={`${project.title} - ${project.subtitle}`}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2.5">
          {project.badge ? (
            <span
              className="px-2 py-0.5 text-[10px] font-semibold rounded-md border border-white/30 bg-black/75 text-white backdrop-blur-md max-w-[85%] truncate shadow-sm"
            >
              {project.badge}
            </span>
          ) : (
            <span />
          )}
          {(!project.completeness || project.wip) && (
            <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-orange-500/90 text-white shrink-0">
              In Progress
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        {/* Title + meta */}
        <div className="mb-2">
          <h3 className="text-[15px] font-semibold leading-snug text-foreground mb-1.5 group-hover:text-foreground/90">
            {project.title}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5">
            {trackLabel && (
              <span className={cn(
                "px-2 py-0.5 text-[10px] font-medium rounded-full border",
                project.track === 'ml' && "bg-violet-500/12 text-violet-700 dark:text-violet-300 border-violet-500/25",
                project.track === 'full-stack-ai' && "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
                project.track === 'web3' && "bg-slate-500/12 text-slate-700 dark:text-slate-300 border-slate-500/25",
              )}>
                {trackLabel}
              </span>
            )}
            {project.category && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-muted text-muted-foreground border border-border">
                {project.category}
              </span>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3 flex-1">
          {project.subtitle}
        </p>

        {/* Tech stack */}
        <div className="rounded-lg bg-muted/40 border border-border/60 px-2.5 py-2 mb-3">
          <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-1.5">Stack</p>
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-background text-foreground/80 border border-border/80"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Actions - pinned to bottom */}
        <div className="flex flex-wrap gap-1.5 pt-3 mt-auto border-t border-border/70">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackProjectDemo(project.title)}
              className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-[11px] font-medium rounded-md bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              Demo
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGitHubClick(project.title)}
              className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-[11px] font-medium rounded-md border border-border bg-background hover:bg-muted/60 transition-colors"
            >
              <FaGithub className="w-3 h-3" />
              GitHub
            </a>
          )}
          {project.links.caseStudy && (
            <Link
              href={project.links.caseStudy}
              className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-[11px] font-medium rounded-md border border-violet-500/40 text-violet-600 dark:text-violet-400 bg-violet-500/5 hover:bg-violet-500/10 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Case Study
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  )
}

// Collapsible achievement row
function AchievementRow({
  achievement,
  index,
  isExpanded,
  onToggle,
}: {
  achievement: Achievement
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.03, 0.2) }}
      className="rounded-lg border border-border bg-background overflow-hidden hover:border-foreground/20 transition-colors"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left"
      >
        <span className="text-xs text-muted-foreground shrink-0 w-9 tabular-nums">{achievement.year}</span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-sm font-medium">{achievement.title}</span>
            {achievement.prize && (
              <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                {achievement.prize}
              </span>
            )}
          </div>
          {!isExpanded && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">{achievement.subtitle}</p>
          )}
        </div>
        <svg
          className={cn("w-4 h-4 shrink-0 text-muted-foreground transition-transform", isExpanded && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-0 border-t border-border/50">
              <p className="text-xs text-muted-foreground mt-2 mb-1.5">{achievement.subtitle}</p>
              <p className="text-sm text-foreground/70 leading-relaxed">{achievement.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// GitHub Section
interface ArcticCodeVault {
  unlocked: boolean
  unlockedDate?: string
  repoName?: string
  repoUrl?: string
  contributingRepos?: number
  badgeUrl?: string
  programUrl?: string
  verifyUrl?: string
}

interface GitHubData {
  profile: { name: string; avatarUrl: string; followers: number; publicRepos: number; totalStars: number; url: string; bio: string; createdAt: string }
  availableYears: number[]
  selectedYear: number | 'all'
  contributions: { total: number; code: number; issues: number; prs: number }
  contributionCalendar: { weeks: { days: { count: number; date: string; weekday: number }[] }[] }
  achievements?: { arcticCodeVault?: ArcticCodeVault }
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
  const [error, setError] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all')

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(false)
      try {
        const params = selectedYear === 'all' ? '?year=all' : `?year=${selectedYear}`
        const response = await fetch(`/api/github${params}`, { cache: 'no-store' })
        if (response.ok) {
          const data = await response.json()
          setGithubData(data)
        } else {
          setError(true)
        }
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedYear])

  if (loading) return <Skeleton className="h-48 w-full rounded-lg max-w-5xl mx-auto" />

  if (error || !githubData) return (
    <Card className="max-w-5xl mx-auto">
      <CardContent className="p-6 flex flex-col items-center text-center gap-3">
        <p className="text-sm text-muted-foreground">GitHub stats unavailable right now</p>
        <a
          href="https://github.com/Ronit-Raj9"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <FaGithub className="h-4 w-4" /> View GitHub Profile
        </a>
      </CardContent>
    </Card>
  )

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

          {/* Arctic Code Vault Badge - Compact */}
          {githubData.achievements?.arcticCodeVault?.unlocked && (
            <a
              href={githubData.achievements.arcticCodeVault.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 border border-blue-500/20 hover:border-blue-500/40 transition-colors"
              title="Arctic Code Vault Contributor · Verify on GitHub"
            >
              <img
                src={githubData.achievements.arcticCodeVault.badgeUrl}
                alt="Arctic Code Vault"
                className="w-8 h-8"
              />
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-foreground leading-tight">Arctic Code Vault</p>
                <p className="text-xs text-muted-foreground">Contributor</p>
              </div>
            </a>
          )}

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

        <div className="flex gap-2 mb-4 flex-wrap">
          <button onClick={() => setSelectedYear('all')}
            className={`px-3 py-1 text-sm rounded-md ${selectedYear === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
            All
          </button>
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
  const [showAllExperiences, setShowAllExperiences] = useState(false)
  const [expandedExperiences, setExpandedExperiences] = useState<{ [key: string]: boolean }>({})
  const [expandedAchievements, setExpandedAchievements] = useState<{ [key: string]: boolean }>({})
  const [showAllFeaturedProjects, setShowAllFeaturedProjects] = useState(false)
  const [showAllAchievements, setShowAllAchievements] = useState(false)
  const otherAchievements = ACHIEVEMENT_GROUPS.find((g) => g.key === 'other')?.items ?? []
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>("All Skills")
  const [showMoreAbout, setShowMoreAbout] = useState(false)

  const toggleExperience = (company: string) => {
    setExpandedExperiences(prev => ({
      ...prev,
      [company]: !prev[company]
    }))
  }

  const toggleAchievement = (id: string) => {
    setExpandedAchievements(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <main ref={containerRef} className="relative flex min-h-screen flex-col pb-8 md:pb-0">
      <StickyContactButton />
      <GitHubActivityBadge />

      {/* ================================================================== */}
      {/* 1. HERO - Adithya style: Name/Socials left, Image right, About below */}
      {/* ================================================================== */}
      <section id="hero" className="relative flex items-start pt-16 md:pt-32 pb-8">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            {/* Top Row: Name/Socials left, Image right */}
            <div className="flex gap-6 md:gap-10 items-start mb-6">
              {/* Left Side - Name, Title, Socials */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1"
              >
                {/* Name */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-1.5 md:mb-2">
                  {profile.name}
                </h1>
                {/* Title */}
                <p className="text-sm md:text-base font-medium text-muted-foreground mb-2 md:mb-3">
                  {profile.title}
                </p>
                {/* Location */}
                <p className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                  <FaMapMarkerAlt className="w-3 h-3" /> {profile.location} · Remote
                </p>
                {/* Social Links */}
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  <EmailLink
                    email={profile.email}
                    className="p-2 md:p-2.5 border border-border rounded-lg hover:bg-accent/30 transition-colors"
                    aria-label="Email"
                  >
                    <HiOutlineMail className="w-4 h-4 md:w-5 md:h-5" />
                  </EmailLink>
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackSocialClick('GitHub')}
                    className="p-2 md:p-2.5 border border-border rounded-lg hover:bg-accent/30 transition-colors"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackSocialClick('LinkedIn')}
                    className="p-2 md:p-2.5 border border-border rounded-lg hover:bg-accent/30 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackSocialClick('Twitter')}
                    className="p-2 md:p-2.5 border border-border rounded-lg hover:bg-accent/30 transition-colors"
                    aria-label="X (Twitter)"
                  >
                    <FaXTwitter className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackResumeDownload}
                    className="flex items-center gap-1.5 md:gap-2 px-3 md:px-3.5 py-2 md:py-2.5 rounded-lg bg-foreground text-background font-semibold shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
                    aria-label="Download resume PDF"
                  >
                    <HiOutlineDocumentDownload className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm font-semibold">CV</span>
                  </a>
                </div>
              </motion.div>

              {/* Right Side - Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-shrink-0"
              >
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-border">
                  <Image
                    src={profile.profileImage}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>

            {/* Tagline + Proof Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-6 md:mb-8"
            >
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-3 md:mb-4">
                {profile.tagline}
              </p>
              {profile.proofPoints && profile.proofPoints.length > 0 && (
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {profile.proofPoints.map((point) => (
                    <span
                      key={point}
                      className="px-2.5 py-1 text-xs md:text-xs font-medium rounded-full border border-border bg-accent/30 text-foreground/80"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* About Section - Full Width Below */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h2 className="text-lg md:text-xl font-medium tracking-tight mb-3 md:mb-4">About</h2>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {profile.about.summary}
                  </p>
                </div>

                <button
                  onClick={() => setShowMoreAbout(!showMoreAbout)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent/30 transition-colors"
                >
                  {showMoreAbout ? 'Show Less' : 'More About Me'}
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: showMoreAbout ? 'auto' : 0, opacity: showMoreAbout ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 md:space-y-6 overflow-hidden"
                  aria-hidden={!showMoreAbout}
                >
                  {profile.about.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-base font-medium mb-2">{section.title}</h3>
                      {section.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-sm text-foreground/70 leading-relaxed mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* WORK EXPERIENCE - Vertical Timeline Design */}
      {/* ================================================================== */}
      <section id="work" className="w-full py-12 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[32px] font-bold mb-12">Work Experience</h2>

          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-[30px] top-[30px] bottom-[30px] w-[2px] bg-[#e5e5e5] md:block hidden" />
            <div className="absolute left-[20px] top-[20px] bottom-[20px] w-[1px] bg-[#e5e5e5] md:hidden block" />

            {/* Experience Items */}
            <div className="space-y-6">
              {WORK_EXPERIENCE.slice(0, showAllExperiences ? undefined : 3).map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Item Container */}
                  <div className="flex items-start gap-4 md:gap-0">
                    {/* Logo Circle on Timeline */}
                    <div className="relative z-10 shrink-0 md:absolute md:left-0">
                      <div className={cn(
                        "w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full bg-white border-2 flex items-center justify-center",
                        exp.current ? "border-[#8b5cf6] shadow-[0_2px_8px_rgba(139,92,246,0.2)]" : "border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                      )}>
                        {exp.icon ? (
                          <Image
                            src={exp.icon}
                            alt={exp.company}
                            width={40}
                            height={40}
                            className="w-[28px] h-[28px] md:w-[40px] md:h-[40px] object-contain"
                          />
                        ) : (
                          <span className="text-base md:text-xl font-semibold text-gray-600">
                            {exp.company.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={cn(
                      "flex-1 md:ml-[100px] relative border rounded-lg p-4",
                      exp.current
                        ? "bg-[#fafafa] dark:bg-[#1a1a1a] border-2 border-[#8b5cf6] shadow-[0_4px_12px_rgba(139,92,246,0.1)]"
                        : "border-[#e5e5e5] dark:border-[#374151] bg-white dark:bg-[#1a1a1a]"
                    )}>
                      {/* External Link for Current Role */}
                      {exp.current && exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white hover:bg-[#7c3aed] transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}

                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                        {/* Left Content */}
                        <div className="flex-1 min-w-0">
                          {/* Company Name & Badge */}
                          <div className="flex flex-wrap items-center gap-2 mb-0.5">
                            <h3 className="text-base font-semibold text-foreground">{exp.company}</h3>
                            {exp.badge && (
                              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#dbeafe] text-[#1e40af] dark:bg-[#1e40af]/20 dark:text-[#93c5fd]">
                                {exp.badge}
                              </span>
                            )}
                          </div>

                          {/* Job Title */}
                          <p className="text-sm font-medium font-mono text-muted-foreground mb-1">
                            {exp.role}
                          </p>

                          {/* Description */}
                          <p className="text-sm leading-relaxed text-[#444444] dark:text-[#a1a1aa]">
                            {exp.description}
                          </p>

                          {/* Expanded Highlights */}
                          {expandedExperiences[exp.company] && exp.highlights.length > 0 && (
                            <ul className="mt-3 space-y-1.5">
                              {exp.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-[#666666] dark:text-[#a1a1aa]">
                                  <span className="text-[#8b5cf6]">•</span> {h}
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Read More Button */}
                          {exp.highlights.length > 0 && (
                            <button
                              onClick={() => toggleExperience(exp.company)}
                              className="mt-2 text-xs text-[#8b5cf6] hover:text-[#7c3aed] transition-colors font-medium"
                            >
                              {expandedExperiences[exp.company] ? '← Show less' : 'Read more →'}
                            </button>
                          )}
                        </div>

                        {/* Right Side - Date & Location */}
                        <div className="shrink-0 md:text-right flex md:flex-col items-center md:items-end gap-2 md:gap-1">
                          <span className="text-xs text-[#666666] whitespace-nowrap">{exp.period}</span>
                          {exp.locationType && (
                            <span className="px-2 py-0.5 text-xs font-bold rounded border border-[#e5e5e5] dark:border-[#374151] text-foreground">
                              {exp.locationType}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Show More Button */}
          {WORK_EXPERIENCE.length > 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <button
                onClick={() => setShowAllExperiences(!showAllExperiences)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mx-auto"
              >
                {showAllExperiences ? (
                  <>
                    Show less experiences
                    <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                ) : (
                  <>
                    Show more experiences
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ================================================================== */}
      {/* EDUCATION */}
      {/* ================================================================== */}
      <section id="education" className="w-full py-12 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[32px] font-bold mb-12">Education</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-start gap-4 md:gap-0">
              {/* Logo Circle */}
              <div className="relative z-10 shrink-0">
                <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full bg-white dark:bg-[#1a1a1a] border-2 border-[#e5e5e5] dark:border-[#374151] shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center">
                  <HiAcademicCap className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] text-foreground" />
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1 md:ml-[100px] relative border border-[#e5e5e5] dark:border-[#374151] rounded-lg p-4 bg-white dark:bg-[#1a1a1a]">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                  {/* Left Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground mb-0.5">
                      Indian Institute of Information Technology and Management, Gwalior
                    </h3>
                    <p className="text-sm font-medium font-mono text-muted-foreground mb-1">
                      B.Tech in Mathematics and Scientific Computing
                    </p>
                    <p className="text-sm leading-relaxed text-[#444444] dark:text-[#a1a1aa]">
                      Specializing in AI/ML and Data Science
                    </p>
                  </div>

                  {/* Right Side - Date & CGPA */}
                  <div className="shrink-0 md:text-right flex md:flex-col items-center md:items-end gap-2 md:gap-1">
                    <span className="text-xs text-[#666666] whitespace-nowrap">2023 - 2027</span>
                    <span className="px-2 py-0.5 text-xs font-bold rounded border border-[#e5e5e5] dark:border-[#374151] text-foreground">
                      CGPA: 8.35
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. FEATURED PROJECTS - Minimal detailed format */}
      {/* ================================================================== */}
      <section id="featured" className="w-full py-12 md:py-14">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-8">
              <div>
                <h2 className="text-[28px] md:text-[32px] font-bold tracking-tight">Featured Projects</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Production AI, full-stack apps, and on-chain systems - with demos and case studies.
                </p>
              </div>
              <Link
                href="/projects"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {FEATURED_PROJECTS.slice(0, showAllFeaturedProjects ? undefined : 6).map((project, index) => (
                <div
                  key={project.id}
                  className={!showAllFeaturedProjects && index >= 3 ? "hidden sm:block" : ""}
                >
                  <ProjectCardCompact project={project} index={index} />
                </div>
              ))}
            </div>

            {FEATURED_PROJECTS.length > 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <button
                  onClick={() => setShowAllFeaturedProjects(!showAllFeaturedProjects)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mx-auto"
                >
                  {showAllFeaturedProjects ? (
                    <>
                      Show less projects
                      <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Show more projects
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. ACHIEVEMENTS - Minimal clean format */}
      {/* ================================================================== */}
      <section id="achievements" className="w-full py-16">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto">
            <h2 className="text-[32px] font-bold mb-12">
              Achievements
            </h2>

            <div className="space-y-8">
              {ACHIEVEMENT_GROUPS.filter((group) => group.key !== 'other').map((group) => (
                <div key={group.key}>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      {group.label}
                    </h3>
                    {group.key === 'featured' && group.items.length > 0 && (
                      <>
                        <span
                          className="inline-flex items-center justify-center min-w-[2.25rem] px-2.5 py-1 text-sm font-bold leading-none rounded-lg bg-foreground text-background tabular-nums"
                          aria-label={`${group.items.length} hackathon wins`}
                        >
                          {group.items.length}×
                        </span>
                        <span
                          className="inline-flex items-center px-2.5 py-1 text-sm font-semibold leading-none rounded-lg border border-border text-foreground tabular-nums"
                          aria-label="Total hackathon prize money"
                        >
                          $5,000+
                        </span>
                      </>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    {group.items.map((achievement, index) => (
                      <AchievementRow
                        key={achievement.id}
                        achievement={achievement}
                        index={index}
                        isExpanded={expandedAchievements[achievement.id] || false}
                        onToggle={() => toggleAchievement(achievement.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {otherAchievements.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    More Achievements
                  </h3>
                  <div className="space-y-1.5">
                    {(showAllAchievements ? otherAchievements : otherAchievements.slice(0, 3)).map((achievement, index) => (
                      <AchievementRow
                        key={achievement.id}
                        achievement={achievement}
                        index={index}
                        isExpanded={expandedAchievements[achievement.id] || false}
                        onToggle={() => toggleAchievement(achievement.id)}
                      />
                    ))}
                  </div>

                  {otherAchievements.length > 3 && (
                    <div className="text-center mt-8">
                      <button
                        onClick={() => setShowAllAchievements(!showAllAchievements)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 mx-auto"
                      >
                        {showAllAchievements
                          ? 'Show fewer achievements'
                          : `Show all ${otherAchievements.length} more achievements`}
                        <svg className={cn("w-4 h-4 transition-transform", showAllAchievements && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. TECHNICAL SKILLS - Minimal filter tabs with skill badges */}
      {/* ================================================================== */}
      <section id="skills" className="w-full py-16">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto">
            <h2 className="text-[32px] font-bold mb-12">
              Skills
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { name: "All Skills", count: ALL_SKILLS.length },
                { name: "AI/ML/DL", count: ALL_SKILLS.filter(s => s.category === "AI/ML/DL").length },
                { name: "AI Infra & MLOps", count: ALL_SKILLS.filter(s => s.category === "AI Infra & MLOps").length },
                { name: "Python Libs", count: ALL_SKILLS.filter(s => s.category === "Python Libs").length },
                { name: "Web", count: ALL_SKILLS.filter(s => s.category === "Web").length },
                { name: "Databases", count: ALL_SKILLS.filter(s => s.category === "Databases").length },
                { name: "Blockchain", count: ALL_SKILLS.filter(s => s.category === "Blockchain").length },
                { name: "Cloud", count: ALL_SKILLS.filter(s => s.category === "Cloud").length },
                { name: "Languages", count: ALL_SKILLS.filter(s => s.category === "Languages").length },
              ].map((category, index) => (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedSkillFilter(category.name)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border",
                    selectedSkillFilter === category.name
                      ? "bg-foreground text-background border-foreground shadow-sm"
                      : "bg-background hover:border-foreground/30 hover:shadow-sm border-border"
                  )}
                >
                  {category.name}
                  <span className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full font-medium",
                    selectedSkillFilter === category.name
                      ? "bg-background/20 text-background"
                      : "bg-accent/50 text-muted-foreground"
                  )}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Skills Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-6 bg-card/50 rounded-xl border border-border/50"
            >
              <div className="flex flex-wrap gap-2 justify-center">
                <AnimatePresence mode="popLayout">
                  {(selectedSkillFilter === "All Skills"
                    ? ALL_SKILLS
                    : ALL_SKILLS.filter(skill => skill.category === selectedSkillFilter)
                  ).map((skill, index) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.02 }}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-background border border-border hover:border-foreground/30 hover:shadow-sm transition-all cursor-default flex items-center gap-1.5"
                    >
                      <span className="text-muted-foreground/40 text-xs">◇</span>
                      {skill.name}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>

              {/* Count Footer */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                Showing {selectedSkillFilter === "All Skills"
                  ? ALL_SKILLS.length
                  : ALL_SKILLS.filter(s => s.category === selectedSkillFilter).length
                } total skills
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. MORE PROJECTS - Same card design as Featured */}
      {/* ================================================================== */}
      <section id="projects" className="w-full py-12 md:py-14">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-[28px] md:text-[32px] font-bold tracking-tight">More Projects</h2>
              <p className="text-sm text-muted-foreground mt-1">Additional builds across legal tech, web3, and early experiments.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {MORE_PROJECTS.map((project, index) => (
                <ProjectCardCompact
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>

            {/* View All Projects CTA */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-center mt-12">
              <Link href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-sm font-medium hover:border-foreground/30 hover:shadow-sm transition-all">
                View All Projects →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. GITHUB ACTIVITY */}
      {/* ================================================================== */}
      <section className="w-full py-16">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto">
            <h2 className="text-[32px] font-bold mb-12">Open Source Contributions</h2>
            <GitHubSection />
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. CONTACT - Simplified with email prominent */}
      {/* ================================================================== */}
      <section id="contact" className="w-full py-12 bg-accent/5">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center">
            <h2 className="text-[32px] font-bold mb-4">Let's Work Together</h2>
            <p className="text-muted-foreground mb-8">
              Open to discussing AI/ML projects, full-stack development, or startup collaborations.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <EmailLink
                email={profile.email}
                className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-md font-medium hover:opacity-90 transition-all"
              >
                <HiOutlineMail className="w-5 h-5" /> {profile.email}
              </EmailLink>
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer"
                onClick={() => trackSocialClick('github')}
                className="flex items-center gap-2 px-6 py-3 border border-border bg-background hover:bg-accent/50 transition-all rounded-md font-medium">
                <FaGithub className="w-5 h-5" /> GitHub
              </a>
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer"
                onClick={() => trackSocialClick('linkedin')}
                className="flex items-center gap-2 px-6 py-3 border border-border bg-background hover:bg-accent/50 transition-all rounded-md font-medium">
                <FaLinkedin className="w-5 h-5" /> LinkedIn
              </a>
              <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer"
                onClick={() => trackSocialClick('twitter')}
                className="flex items-center gap-2 px-6 py-3 border border-border bg-background hover:bg-accent/50 transition-all rounded-md font-medium">
                <FaXTwitter className="w-5 h-5" /> X
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
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
