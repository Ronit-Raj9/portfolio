"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { HiOutlineMail, HiOutlineDocumentDownload } from 'react-icons/hi'
import {
  RiHome5Line,
  RiFileTextLine,
  RiBriefcaseLine,
  RiBookOpenLine,
  RiCodeSSlashLine,
  RiGraduationCapLine,
  RiApps2Line,
  RiAwardLine
} from 'react-icons/ri'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { socialLinks as SOCIAL_LINKS_DATA, navItems as NAV_ITEMS_DATA } from '@/data'

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  HiOutlineMail,
  RiHome5Line,
  RiFileTextLine,
  RiBriefcaseLine,
  RiBookOpenLine,
  RiCodeSSlashLine,
  RiGraduationCapLine,
  RiApps2Line,
  RiAwardLine,
}

// Convert JSON data to component-ready format
const SOCIAL_LINKS = SOCIAL_LINKS_DATA.map(link => ({
  ...link,
  icon: iconMap[link.icon] || FaGithub,
}))

const MOBILE_NAV_ITEMS = NAV_ITEMS_DATA.map(item => ({
  ...item,
  icon: iconMap[item.icon] || RiHome5Line,
}))

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'work', 'education', 'featured', 'achievements', 'projects']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Desktop Floating Navbar - Navigation Links with Icons */}
      <header className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-5 duration-500">
        <nav className="flex items-center gap-2 px-4 py-2.5 bg-background/90 backdrop-blur-md border border-border rounded-full shadow-lg shadow-black/5">
          {/* Navigation Links with Icons */}
          <div className="flex items-center gap-1">
            {MOBILE_NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.split('#')[1]
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all",
                    isActive
                      ? "text-foreground bg-accent/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Theme Toggle */}
          <div className="ml-1">
            <ThemeToggle size="sm" variant="ghost" />
          </div>
        </nav>
      </header>

      {/* Mobile Floating Bottom Navigation */}
      <nav
        className="md:hidden fixed bottom-3 left-0 right-0 z-[100] px-4 pb-[env(safe-area-inset-bottom)]"
        style={{
          transform: 'translateZ(0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <div className="flex items-center justify-center gap-1 px-3 py-2.5 bg-background/95 backdrop-blur-md border border-border rounded-full shadow-lg shadow-black/10 max-w-fit mx-auto">
          {MOBILE_NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.split('#')[1]
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "p-2.5 rounded-full transition-all",
                  isActive
                    ? "text-foreground bg-accent/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                )}
                aria-label={item.name}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            )
          })}

          {/* Divider */}
          <div className="h-5 w-px bg-border mx-1" />

          {/* Theme Toggle */}
          <div className="p-0.5">
            <ThemeToggle size="sm" variant="ghost" />
          </div>
        </div>
      </nav>
    </>
  )
} 