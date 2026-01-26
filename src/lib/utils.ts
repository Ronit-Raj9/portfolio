import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getGitHubColors } from "@/config/theme.config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get GitHub contribution level class based on count
 * Uses CSS variables for theme-aware colors
 */
export function getContributionLevelClass(count: number): string {
  // Use CSS variables that change with theme
  if (count === 0) return "bg-[var(--github-empty)] border border-[var(--github-empty)]"
  if (count <= 3) return "bg-[var(--github-level-1)] border border-[var(--github-level-1)]"
  if (count <= 6) return "bg-[var(--github-level-2)] border border-[var(--github-level-2)]"
  if (count <= 9) return "bg-[var(--github-level-3)] border border-[var(--github-level-3)]"
  return "bg-[var(--github-level-4)] border border-[var(--github-level-4)]"
}

/**
 * Get GitHub contribution colors for a specific theme
 * @param theme - 'light' or 'dark'
 * @param count - contribution count
 */
export function getGitHubContributionColor(theme: 'light' | 'dark', count: number): string {
  const colors = getGitHubColors(theme)
  
  if (count === 0) return colors.empty
  if (count <= 3) return colors.level1
  if (count <= 6) return colors.level2
  if (count <= 9) return colors.level3
  return colors.level4
}

/**
 * Organize GitHub contribution data into a calendar format
 */
export function formatGitHubCalendarData(days: Array<{count: number; date: string; weekday: number}>) {
  // Group days by week
  const weeks: Array<Array<{count: number; date: string; weekday: number}>> = []
  let currentWeek: Array<{count: number; date: string; weekday: number}> = []
  
  // Initialize with empty days for the first week if needed
  const firstDay = days[0]
  if (firstDay && firstDay.weekday > 0) {
    for (let i = 0; i < firstDay.weekday; i++) {
      currentWeek.push({ count: 0, date: '', weekday: i })
    }
  }
  
  // Organize by weeks
  days.forEach(day => {
    currentWeek.push(day)
    
    if (day.weekday === 6) {
      weeks.push([...currentWeek])
      currentWeek = []
    }
  })
  
  // Add the last week if it's not complete
  if (currentWeek.length > 0) {
    weeks.push([...currentWeek])
  }
  
  return weeks
}

/**
 * Get months for GitHub contribution calendar
 * Returns an array of month names with their starting column position
 */
export function getCalendarMonths(days: Array<{count: number; date: string; weekday: number}>) {
  if (!days || days.length === 0) return []
  
  const months: Array<{name: string; position: number}> = []
  let currentMonth = ''
  let column = 0
  
  days.forEach(day => {
    if (!day.date) return
    
    const month = day.date.substring(5, 7) // Get month from YYYY-MM-DD
    if (month !== currentMonth) {
      currentMonth = month
      const monthName = new Date(day.date).toLocaleString('default', { month: 'short' })
      months.push({ name: monthName, position: column })
    }
    
    if (day.weekday === 6) {
      column++
    }
  })
  
  return months
}
