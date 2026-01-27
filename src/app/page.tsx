"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { trackResumeDownload, trackEmailClick, trackProjectDemo, trackGitHubClick, trackSocialClick } from "@/lib/analytics"
import { FaGithub, FaLinkedin, FaGraduationCap, FaTrophy, FaEnvelope, FaMapMarkerAlt, FaQuoteLeft, FaExternalLinkAlt } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
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
import GitHubActivityBadge from '@/components/GitHubActivityBadge'

// Import centralized data
import {
  profile,
  experience as WORK_EXPERIENCE,
  achievements as ACHIEVEMENTS,
  featuredProjects as FEATURED_PROJECTS,
  moreProjects as MORE_PROJECTS,
  technicalSkills as TECHNICAL_SKILLS,
  allSkills as ALL_SKILLS,
  type FeaturedProject
} from '@/data'

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false })

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
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed left-6 top-6 md:left-auto md:right-6 md:top-auto md:bottom-6 z-50 flex flex-col gap-2"
        >
          <a
            href={`mailto:${profile.email}`}
            onClick={trackEmailClick}
            className="flex items-center gap-2 px-4 py-2.5 bg-foreground text-background rounded-md hover:opacity-90 transition-all text-sm font-medium shadow-lg"
          >
            <HiOutlineMail className="w-4 h-4" />
            <span className="hidden sm:inline">Email Me</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Adithya-style Project Card with bullet points
function ProjectCardDetailed({ project, index, isExpanded, onToggle }: {
  project: FeaturedProject,
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
        <div className="relative w-full lg:w-1/3 h-24 lg:h-auto lg:min-h-[100px] overflow-hidden bg-accent/10">
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

        {/* Content */}
        <div className="flex-1 p-4">
          <h3 className="text-base font-medium mb-0.5">{project.title}</h3>
          <p className="text-xs text-muted-foreground mb-2">{project.subtitle}</p>

          {/* Bullet points */}
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
            {project.links.demo && (
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
            {project.links.github && (
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
            {project.links.caseStudy && (
              <a
                href={project.links.caseStudy}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
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
  selectedYear: number | 'all'
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
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all')

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const params = selectedYear === 'all' ? '?year=all' : `?year=${selectedYear}`
        const response = await fetch(`/api/github${params}`, { cache: 'no-store' })
        if (response.ok) {
          const data = await response.json()
          setGithubData(data)
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
  const [expandedProjects, setExpandedProjects] = useState<{ [key: string]: boolean }>({})
  const [showAllFeaturedProjects, setShowAllFeaturedProjects] = useState(false)
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>("All Skills")
  const [showMoreAbout, setShowMoreAbout] = useState(false)

  const toggleExperience = (company: string) => {
    setExpandedExperiences(prev => ({
      ...prev,
      [company]: !prev[company]
    }))
  }

  const toggleProject = (title: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [title]: !prev[title]
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
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-2 md:mb-3">
                  {profile.name}
                </h1>

                {/* Title/Tagline */}
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                  {profile.title}, Building Generative AI solutions at Scale
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  <a
                    href={`mailto:${profile.email}`}
                    onClick={trackEmailClick}
                    className="p-2 md:p-2.5 border border-border rounded-lg hover:bg-accent/30 transition-colors"
                    aria-label="Email"
                  >
                    <HiOutlineMail className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
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
                    className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-2 md:py-2.5 border border-border rounded-lg hover:bg-accent/30 transition-colors"
                    aria-label="Resume"
                  >
                    <HiOutlineDocumentDownload className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm font-medium">CV</span>
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

                <AnimatePresence>
                  {showMoreAbout && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 md:space-y-6 overflow-hidden"
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
                  )}
                </AnimatePresence>
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
                              <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-[#dbeafe] text-[#1e40af] dark:bg-[#1e40af]/20 dark:text-[#93c5fd]">
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
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded border border-[#e5e5e5] dark:border-[#374151] text-foreground">
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
                      Indian Institute of Information Technology Gwalior
                    </h3>
                    <p className="text-sm font-medium font-mono text-muted-foreground mb-1">
                      B.Tech in Mathematics and Scientific Computing
                    </p>
                    <p className="text-sm leading-relaxed text-[#444444] dark:text-[#a1a1aa]">
                      Specializing in AI/ML, Data Science, and Mathematical Modeling
                    </p>
                  </div>

                  {/* Right Side - Date */}
                  <div className="shrink-0 md:text-right">
                    <span className="text-xs text-[#666666] whitespace-nowrap">2023 - 2027</span>
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
      <section id="featured" className="w-full py-12">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-[32px] font-bold">Featured Projects</h2>
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {FEATURED_PROJECTS.slice(0, showAllFeaturedProjects ? undefined : 3).map((project, index) => (
                <ProjectCardDetailed
                  key={project.title}
                  project={project}
                  index={index}
                  isExpanded={expandedProjects[project.title] || false}
                  onToggle={() => toggleProject(project.title)}
                />
              ))}
            </div>

            {FEATURED_PROJECTS.length > 3 && (
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

            <div className="space-y-4">
              {ACHIEVEMENTS.map((achievement, index) => (
                <motion.div key={achievement.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="p-5 rounded-lg border border-border bg-background hover:border-foreground/20 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-sm text-muted-foreground">{achievement.year}</span>
                    <span className="text-muted-foreground/30">—</span>
                    <h3 className="font-medium">{achievement.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{achievement.subtitle}</p>
                  <p className="text-sm text-foreground/70 leading-relaxed">{achievement.description}</p>
                </motion.div>
              ))}
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
                { name: "Python Libs", count: ALL_SKILLS.filter(s => s.category === "Python Libs").length },
                { name: "Web", count: ALL_SKILLS.filter(s => s.category === "Web").length },
                { name: "Cloud", count: ALL_SKILLS.filter(s => s.category === "Cloud").length },
                { name: "Big Data", count: ALL_SKILLS.filter(s => s.category === "Big Data").length },
                { name: "Databases", count: ALL_SKILLS.filter(s => s.category === "Databases").length },
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
                    "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
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
                      <span className="text-muted-foreground/40 text-[10px]">◇</span>
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
      {/* 6. MORE PROJECTS - Enhanced card design */}
      {/* ================================================================== */}
      <section id="projects" className="w-full py-16">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-[32px] font-bold">More Projects</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {MORE_PROJECTS.map((project, index) => (
                <motion.div key={project.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.08 }}
                  className="group p-6 rounded-xl border border-[#e5e5e5] dark:border-[#374151] bg-background hover:shadow-lg hover:border-foreground/20 transition-all duration-300">
                  {/* Category Badge */}
                  <div className="inline-block mb-3">
                    <span className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-accent/40 text-muted-foreground border border-border">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-foreground/80 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1 leading-relaxed">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-foreground/60 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack - Compact */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map(t => (
                      <span key={t} className="px-2 py-0.5 text-[11px] font-medium rounded bg-accent/50 text-muted-foreground border border-border">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons - Compact */}
                  <div className="flex items-center gap-2">
                    {project.link && project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                        onClick={() => trackProjectDemo(project.title)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-foreground text-background hover:opacity-90 transition-opacity">
                        Demo →
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        onClick={() => trackGitHubClick(project.title)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-background hover:bg-accent/50 transition-colors">
                        GitHub →
                      </a>
                    )}
                  </div>
                </motion.div>
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
              <a href="mailto:dev.ronitraj@gmail.com"
                onClick={trackEmailClick}
                className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-md font-medium hover:opacity-90 transition-all">
                <HiOutlineMail className="w-5 h-5" /> dev.ronitraj@gmail.com
              </a>
              <a href="https://github.com/Ronit-Raj9" target="_blank" rel="noopener noreferrer"
                onClick={() => trackSocialClick('github')}
                className="flex items-center gap-2 px-6 py-3 border border-border bg-background hover:bg-accent/50 transition-all rounded-md font-medium">
                <FaGithub className="w-5 h-5" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/ronitrajai/" target="_blank" rel="noopener noreferrer"
                onClick={() => trackSocialClick('linkedin')}
                className="flex items-center gap-2 px-6 py-3 border border-border bg-background hover:bg-accent/50 transition-all rounded-md font-medium">
                <FaLinkedin className="w-5 h-5" /> LinkedIn
              </a>
              <a href="https://x.com/ronit__raj" target="_blank" rel="noopener noreferrer"
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
