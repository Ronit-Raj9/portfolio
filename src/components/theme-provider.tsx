"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"
import { type ThemeProviderProps } from "next-themes"
import { themeConfig, getThemeColors, getSceneColors, getGitHubColors, type ThemeMode } from "@/config/theme.config"

// ============================================================================
// THEME CONTEXT
// ============================================================================

interface ThemeContextValue {
  theme: ThemeMode
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
  isDark: boolean
  isLight: boolean
  colors: ReturnType<typeof getThemeColors>
  sceneColors: ReturnType<typeof getSceneColors>
  githubColors: ReturnType<typeof getGitHubColors>
  config: typeof themeConfig
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

// ============================================================================
// THEME CONTEXT PROVIDER (Internal)
// ============================================================================

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme, setTheme, systemTheme } = useNextTheme()
  
  // Determine the actual theme being displayed
  const actualTheme = React.useMemo(() => {
    if (theme === 'system') {
      return systemTheme || 'light'
    }
    return resolvedTheme || theme || 'light'
  }, [theme, systemTheme, resolvedTheme]) as 'light' | 'dark'
  
  // Toggle between light and dark
  const toggleTheme = React.useCallback(() => {
    setTheme(actualTheme === 'dark' ? 'light' : 'dark')
  }, [actualTheme, setTheme])
  
  // Get theme-specific values
  const colors = React.useMemo(() => getThemeColors(actualTheme), [actualTheme])
  const sceneColors = React.useMemo(() => getSceneColors(actualTheme), [actualTheme])
  const githubColors = React.useMemo(() => getGitHubColors(actualTheme), [actualTheme])
  
  const value: ThemeContextValue = React.useMemo(() => ({
    theme: (theme || 'light') as ThemeMode,
    resolvedTheme: actualTheme,
    setTheme,
    toggleTheme,
    isDark: actualTheme === 'dark',
    isLight: actualTheme === 'light',
    colors,
    sceneColors,
    githubColors,
    config: themeConfig,
  }), [theme, actualTheme, setTheme, toggleTheme, colors, sceneColors, githubColors])
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// ============================================================================
// THEME PROVIDER (Main Export)
// ============================================================================

export function ThemeProvider({ 
  children, 
  ...props 
}: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render with light theme placeholder to match SSR
    // This prevents hydration mismatch
    return (
      <div className="min-h-screen bg-white text-gray-900">
        {children}
      </div>
    )
  }

  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      enableColorScheme
      disableTransitionOnChange={false}
      storageKey="portfolio-theme"
    >
      <ThemeContextProvider>
        {children}
      </ThemeContextProvider>
    </NextThemesProvider>
  )
}

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

/**
 * Hook to access the theme context with all utilities
 * @returns ThemeContextValue with theme state and helpers
 */
export function useThemeConfig(): ThemeContextValue {
  const context = React.useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useThemeConfig must be used within a ThemeProvider')
  }
  
  return context
}

/**
 * Hook to get current theme colors
 * @returns Theme colors for the current theme
 */
export function useThemeColors() {
  const { colors } = useThemeConfig()
  return colors
}

/**
 * Hook to get 3D scene colors
 * @returns Scene colors for the current theme
 */
export function useSceneColors() {
  const { sceneColors } = useThemeConfig()
  return sceneColors
}

/**
 * Hook to get GitHub calendar colors
 * @returns GitHub colors for the current theme
 */
export function useGitHubColors() {
  const { githubColors } = useThemeConfig()
  return githubColors
}

/**
 * Hook for simple theme toggle
 * @returns [isDark, toggleTheme]
 */
export function useThemeToggle(): [boolean, () => void] {
  const { isDark, toggleTheme } = useThemeConfig()
  return [isDark, toggleTheme]
}

// Re-export useTheme from next-themes for backward compatibility
export { useTheme } from "next-themes" 