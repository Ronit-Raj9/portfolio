"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GitHubStats {
  todayCommits: number
  weekCommits: number
  yearContributions: number
  streak: number
  loading: boolean
}

const GITHUB_USERNAME = 'Ronit-Raj9'

export default function GitHubActivityBadge() {
  const [stats, setStats] = useState<GitHubStats>({
    todayCommits: 0,
    weekCommits: 0,
    yearContributions: 0,
    streak: 0,
    loading: true
  })
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const badgeRef = useRef<HTMLDivElement>(null)

  const fetchGitHubStats = async () => {
    try {
      console.log('[GitHub Badge] Fetching GitHub activity...')
      
      // Use the existing API route which has proper GraphQL data
      const response = await fetch('/api/github?year=all', { cache: 'no-store' })
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      console.log('[GitHub Badge] API Response:', data)

      // Get today's date
      const today = new Date().toISOString().split('T')[0]
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

      // Calculate today's commits from contribution calendar
      let todayCommits = 0
      let weekCommits = 0
      let streak = 0

      if (data.contributionCalendar?.days) {
        const days = data.contributionCalendar.days

        // Find today's contributions
        const todayData = days.find((d: { date: string }) => d.date === today)
        todayCommits = todayData?.count || 0
        console.log('[GitHub Badge] Today commits:', todayCommits)

        // Calculate week's contributions
        weekCommits = days
          .filter((d: { date: string }) => d.date >= oneWeekAgo && d.date <= today)
          .reduce((sum: number, d: { count: number }) => sum + d.count, 0)
        console.log('[GitHub Badge] Week commits:', weekCommits)

        // Calculate streak - count consecutive days with contributions going backwards from today
        const sortedDays = [...days].sort((a: { date: string }, b: { date: string }) => 
          b.date.localeCompare(a.date)
        )
        
        for (const day of sortedDays) {
          if (day.count > 0) {
            streak++
          } else {
            // Allow skipping today if no commits yet
            if (day.date === today) continue
            break
          }
        }
        console.log('[GitHub Badge] Streak:', streak, 'days')
      }

      // Year contributions from API
      const yearContributions = data.contributions?.total || data.contributionCalendar?.totalContributions || 0
      console.log('[GitHub Badge] Year contributions:', yearContributions)

      setStats({
        todayCommits,
        weekCommits,
        yearContributions,
        streak,
        loading: false
      })

    } catch (error) {
      console.error('[GitHub Badge] Error fetching stats:', error)
      setStats(prev => ({ ...prev, loading: false }))
    }
  }

  useEffect(() => {
    // Check if mobile on mount and on resize - use 768px to match when bottom navbar appears
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    fetchGitHubStats()
    
    // Auto-update every 5 minutes
    const interval = setInterval(fetchGitHubStats, 300000)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Close tooltip/expanded when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (badgeRef.current && !badgeRef.current.contains(event.target as Node)) {
        setIsTooltipOpen(false)
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleBadgeClick = () => {
    // On mobile, first expand, then show tooltip
    if (isMobile) {
      if (!isExpanded) {
        setIsExpanded(true)
      } else {
        setIsTooltipOpen(!isTooltipOpen)
      }
    } else {
      setIsTooltipOpen(!isTooltipOpen)
    }
  }

  return (
    <>
      <style jsx global>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <motion.div
        ref={badgeRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        className="fixed z-[100] bottom-[100px] right-4 md:bottom-[120px] md:right-8 pointer-events-auto"
        style={{ isolation: 'isolate' }}
      >
        <motion.div
          onClick={handleBadgeClick}
          layout
          className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            boxShadow: isTooltipOpen || isExpanded
              ? '0 6px 28px rgba(16, 185, 129, 0.5)' 
              : '0 4px 20px rgba(16, 185, 129, 0.4)',
            padding: isExpanded || !isMobile ? '10px 16px' : '0',
            width: isExpanded || !isMobile ? 'auto' : '44px',
            height: isExpanded || !isMobile ? 'auto' : '44px',
            minWidth: '44px',
            minHeight: '44px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          aria-label={`GitHub activity: ${stats.loading ? 0 : stats.todayCommits} commits today`}
          role="button"
        >
          {/* Compact Mobile View - Just number in circle */}
          <div className={`md:hidden ${isExpanded ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
            <span className="text-base font-bold">
              {stats.loading ? '-' : stats.todayCommits}
            </span>
          </div>

          {/* Expanded/Desktop View */}
          <div className={`${isExpanded ? 'flex' : 'hidden'} md:flex items-center gap-2`}>
            {/* Pulsing Dot */}
            <div className="relative w-2.5 h-2.5 flex-shrink-0">
              <div className="absolute inset-0 bg-white rounded-full z-[2]" />
              <div className="absolute inset-0 bg-white rounded-full pulse-ring" />
            </div>

            {/* Text Content */}
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold whitespace-nowrap">
                {stats.loading ? '-' : stats.todayCommits} commits
              </span>
              <span className="text-[11px] opacity-90">today</span>
            </div>
          </div>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {isTooltipOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 w-52 md:w-56 bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#374151] rounded-xl p-3 md:p-4 shadow-lg"
              style={{
                bottom: 'calc(100% + 12px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              }}
            >
              {/* Tooltip Rows */}
              <div className="flex justify-between items-center mb-2 text-xs sm:text-[13px]">
                <span className="text-muted-foreground">This Week</span>
                <span className="font-medium text-foreground">
                  {stats.loading ? '-' : stats.weekCommits} commits
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-2 text-xs sm:text-[13px]">
                <span className="text-muted-foreground">This Year</span>
                <span className="font-medium text-foreground">
                  {stats.loading ? '-' : `${stats.yearContributions}+`} contributions
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-3 text-xs sm:text-[13px]">
                <span className="text-muted-foreground">🔥 Streak</span>
                <span className="font-medium text-foreground">
                  {stats.loading ? '-' : stats.streak} days
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-border mb-3" />

              {/* Link */}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-[13px] font-medium hover:underline transition-colors"
                style={{ color: '#8b5cf6' }}
              >
                View Full Profile →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
