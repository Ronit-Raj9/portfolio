"use client"

import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineMail, HiOutlineDocumentDownload } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/Ronit-Raj9",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ronitrajai/",
    icon: FaLinkedin,
  },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40 theme-transition">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl flex items-center justify-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">RR</span>
            </span>
          </Link>
        </div>

        {/* Right side - Social links, CTAs, and theme toggle */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Social Links - Hidden on very small screens */}
          <div className="hidden sm:flex items-center space-x-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/60 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-border/50" />

          {/* Resume Button */}
          <a
            href="/resume_web.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            <HiOutlineDocumentDownload className="w-4 h-4" />
            <span>Resume</span>
          </a>

          {/* Email Button */}
          <a
            href="mailto:ronitk964@gmail.com"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            <HiOutlineMail className="w-4 h-4" />
            <span className="hidden sm:inline">Email</span>
          </a>

          {/* Theme Toggle */}
          <ThemeToggle size="md" variant="ghost" />
        </div>
      </div>
    </header>
  )
} 