"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { themeConfig } from "@/config/theme.config"

// ============================================================================
// THEME TOGGLE COMPONENT
// ============================================================================

interface ThemeToggleProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "ghost" | "outline"
  showLabel?: boolean
}

const sizeConfig = {
  sm: { button: "w-8 h-8", icon: "w-4 h-4" },
  md: { button: "w-9 h-9", icon: "w-5 h-5" },
  lg: { button: "w-10 h-10", icon: "w-6 h-6" },
}

const variantConfig = {
  default: "bg-secondary hover:bg-secondary/80",
  ghost: "hover:bg-accent/10",
  outline: "border border-border hover:bg-accent/10",
}

export function ThemeToggle({ 
  className,
  size = "md",
  variant = "ghost",
  showLabel = false,
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={cn(
        sizeConfig[size].button,
        "rounded-lg",
        variantConfig[variant],
        className
      )} />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center justify-center rounded-lg transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        sizeConfig[size].button,
        variantConfig[variant],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <SunIcon className={cn(sizeConfig[size].icon, "text-yellow-500")} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <MoonIcon className={cn(sizeConfig[size].icon, "text-slate-700 dark:text-slate-300")} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {showLabel && (
        <span className="ml-2 text-sm">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
      
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </motion.button>
  )
}

// ============================================================================
// THEME TOGGLE WITH SYSTEM OPTION
// ============================================================================

interface ThemeToggleWithSystemProps {
  className?: string
}

export function ThemeToggleWithSystem({ className }: ThemeToggleWithSystemProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={cn("w-9 h-9 rounded-lg", className)} />
  }

  const options = [
    { value: "light", label: "Light", icon: SunIcon },
    { value: "dark", label: "Dark", icon: MoonIcon },
    { value: "system", label: "System", icon: SystemIcon },
  ]

  return (
    <div className={cn("flex items-center gap-1 p-1 rounded-lg bg-secondary", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={cn(
            "p-2 rounded-md transition-colors",
            theme === option.value
              ? "bg-background shadow-sm"
              : "hover:bg-background/50"
          )}
          aria-label={option.label}
          title={option.label}
        >
          <option.icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  )
}

// ============================================================================
// ICON COMPONENTS
// ============================================================================

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66l-1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

function SystemIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  )
}

export default ThemeToggle
