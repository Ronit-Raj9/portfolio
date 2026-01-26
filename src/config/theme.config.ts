/**
 * Centralized Theme Configuration
 * ================================
 * This file serves as the single source of truth for all theme-related values.
 * Modify this file to change colors across the entire website.
 * 
 * Usage:
 * - Import themeConfig to access all theme values
 * - Use getThemeColors(theme) to get theme-specific colors
 * - Use useThemeConfig() hook for reactive theme access in components
 */

// ============================================================================
// THEME COLOR DEFINITIONS
// ============================================================================

export const themeConfig = {
  // Brand Colors (used across both themes)
  brand: {
    primary: '#0a0a0a',           // Primary brand color (dark)
    primaryLight: '#fafafa',      // Primary for light theme
    purple: '#9333ea',            // Accent purple
    purpleLight: '#a855f7',       // Lighter purple
    purpleDark: '#7c3aed',        // Darker purple
    indigo: '#6366f1',            // Indigo accent
    gradient: 'from-primary to-purple-600',
    gradientHover: 'from-primary/90 to-purple-600/90',
  },

  // ============================================================================
  // LIGHT THEME
  // ============================================================================
  light: {
    // Base Colors (HSL format for CSS variables)
    colors: {
      background: { h: 0, s: 0, l: 100 },      // #ffffff - Pure white
      foreground: { h: 0, s: 0, l: 3.9 },      // Near black text
      card: { h: 0, s: 0, l: 100 },            // White cards
      cardForeground: { h: 0, s: 0, l: 3.9 },
      popover: { h: 0, s: 0, l: 100 },
      popoverForeground: { h: 0, s: 0, l: 3.9 },
      primary: { h: 0, s: 0, l: 9 },           // Dark primary
      primaryForeground: { h: 0, s: 0, l: 98 },
      secondary: { h: 0, s: 0, l: 96.1 },      // Light gray
      secondaryForeground: { h: 0, s: 0, l: 9 },
      muted: { h: 0, s: 0, l: 96.1 },
      mutedForeground: { h: 0, s: 0, l: 45.1 },
      accent: { h: 0, s: 0, l: 96.1 },
      accentForeground: { h: 0, s: 0, l: 9 },
      destructive: { h: 0, s: 84.2, l: 60.2 },
      destructiveForeground: { h: 0, s: 0, l: 98 },
      border: { h: 0, s: 0, l: 89.8 },
      input: { h: 0, s: 0, l: 89.8 },
      ring: { h: 0, s: 0, l: 3.9 },
    },
    
    // 3D Scene Colors
    scene: {
      floor: '#f8fafc',                        // Light floor
      floorMetalness: 0.2,
      floorRoughness: 0.8,
      rings: '#6d28d9',                        // Purple rings
      ringsEmissive: '#5b21b6',
      ringsEmissiveIntensity: 0.5,
      particles: {
        color1: '#7c3aed',                     // Violet
        color2: '#6366f1',                     // Indigo
        opacity: 0.7,
      },
      ambientLight: 0.5,
      directionalLight: 0.6,
      pointLight: '#8b5cf6',
    },
    
    // GitHub Calendar Colors
    github: {
      empty: '#ebedf0',
      level1: '#9be9a8',
      level2: '#40c463',
      level3: '#30a14e',
      level4: '#216e39',
    },
    
    // Shadows
    shadows: {
      card: '0 4px 12px rgba(0, 0, 0, 0.05)',
      cardHover: '0 8px 24px rgba(0, 0, 0, 0.1)',
      button: '0 2px 8px rgba(0, 0, 0, 0.08)',
    },
    
    // Glass/Blur Effects
    glass: {
      background: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(0, 0, 0, 0.05)',
      blur: 'blur(12px)',
    },
  },

  // ============================================================================
  // DARK THEME
  // ============================================================================
  dark: {
    // Base Colors (HSL format for CSS variables)
    colors: {
      background: { h: 0, s: 0, l: 3.9 },      // Near black
      foreground: { h: 0, s: 0, l: 98 },       // Near white text
      card: { h: 0, s: 0, l: 3.9 },
      cardForeground: { h: 0, s: 0, l: 98 },
      popover: { h: 0, s: 0, l: 3.9 },
      popoverForeground: { h: 0, s: 0, l: 98 },
      primary: { h: 0, s: 0, l: 98 },          // Light primary
      primaryForeground: { h: 0, s: 0, l: 9 },
      secondary: { h: 0, s: 0, l: 14.9 },
      secondaryForeground: { h: 0, s: 0, l: 98 },
      muted: { h: 0, s: 0, l: 14.9 },
      mutedForeground: { h: 0, s: 0, l: 63.9 },
      accent: { h: 0, s: 0, l: 14.9 },
      accentForeground: { h: 0, s: 0, l: 98 },
      destructive: { h: 0, s: 62.8, l: 30.6 },
      destructiveForeground: { h: 0, s: 0, l: 98 },
      border: { h: 0, s: 0, l: 14.9 },
      input: { h: 0, s: 0, l: 14.9 },
      ring: { h: 0, s: 0, l: 83.1 },
    },
    
    // 3D Scene Colors
    scene: {
      floor: '#020617',                        // Dark floor
      floorMetalness: 0.8,
      floorRoughness: 0.5,
      rings: '#4338ca',                        // Indigo rings
      ringsEmissive: '#3730a3',
      ringsEmissiveIntensity: 0.4,
      particles: {
        color1: '#4338ca',                     // Indigo
        color2: '#6d28d9',                     // Violet
        opacity: 0.6,
      },
      ambientLight: 0.2,
      directionalLight: 0.5,
      pointLight: '#8b5cf6',
    },
    
    // GitHub Calendar Colors
    github: {
      empty: '#161b22',
      level1: '#0e4429',
      level2: '#006d32',
      level3: '#26a641',
      level4: '#39d353',
    },
    
    // Shadows
    shadows: {
      card: '0 4px 12px rgba(0, 0, 0, 0.3)',
      cardHover: '0 8px 24px rgba(0, 0, 0, 0.4)',
      button: '0 2px 8px rgba(0, 0, 0, 0.3)',
    },
    
    // Glass/Blur Effects
    glass: {
      background: 'rgba(0, 0, 0, 0.5)',
      border: 'rgba(255, 255, 255, 0.1)',
      blur: 'blur(12px)',
    },
  },

  // ============================================================================
  // ANIMATION SETTINGS
  // ============================================================================
  animations: {
    // Theme transition duration
    themeTransition: {
      duration: '0.3s',
      timing: 'ease-in-out',
      full: '0.3s ease-in-out',
    },
    
    // Hover effects
    hover: {
      scale: 1.05,
      duration: '0.2s',
    },
    
    // Spring animations (for framer-motion)
    spring: {
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
    
    // Reduced motion alternative
    reducedMotion: {
      duration: '0s',
    },
  },

  // ============================================================================
  // COMPONENT-SPECIFIC SETTINGS
  // ============================================================================
  components: {
    navbar: {
      height: '64px',
      blur: 'backdrop-blur-md',
      borderBottom: '1px solid',
    },
    
    cards: {
      borderRadius: '0.75rem',
      padding: '1.5rem',
    },
    
    buttons: {
      borderRadius: '0.5rem',
      paddingX: '1rem',
      paddingY: '0.5rem',
    },
    
    themeToggle: {
      size: '36px',
      iconSize: '18px',
      borderRadius: '0.5rem',
    },
  },

  // ============================================================================
  // BREAKPOINTS (matching Tailwind defaults)
  // ============================================================================
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
  },
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert HSL object to CSS variable format
 */
export function hslToVar(hsl: { h: number; s: number; l: number }): string {
  return `${hsl.h} ${hsl.s}% ${hsl.l}%`
}

/**
 * Convert HSL to hex color
 */
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

/**
 * Get theme-specific colors
 */
export function getThemeColors(theme: 'light' | 'dark') {
  return themeConfig[theme]
}

/**
 * Get scene colors for 3D components
 */
export function getSceneColors(theme: 'light' | 'dark') {
  return themeConfig[theme].scene
}

/**
 * Get GitHub calendar colors
 */
export function getGitHubColors(theme: 'light' | 'dark') {
  return themeConfig[theme].github
}

/**
 * Get a nested theme value by path
 * @example getThemeValue('light', 'scene.rings') // returns '#6d28d9'
 */
export function getThemeValue<T>(
  theme: 'light' | 'dark',
  path: string
): T | undefined {
  const keys = path.split('.')
  let value: unknown = themeConfig[theme]
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = (value as Record<string, unknown>)[key]
    } else {
      return undefined
    }
  }
  
  return value as T
}

// ============================================================================
// TYPES
// ============================================================================

export type ThemeMode = 'light' | 'dark' | 'system'

export interface HSLColor {
  h: number
  s: number
  l: number
}

export interface SceneColors {
  floor: string
  floorMetalness: number
  floorRoughness: number
  rings: string
  ringsEmissive: string
  ringsEmissiveIntensity: number
  particles: {
    color1: string
    color2: string
    opacity: number
  }
  ambientLight: number
  directionalLight: number
  pointLight: string
}

export interface GitHubColors {
  empty: string
  level1: string
  level2: string
  level3: string
  level4: string
}

export default themeConfig
