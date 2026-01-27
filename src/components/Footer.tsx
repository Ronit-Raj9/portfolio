"use client"

import { FaGithub, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SiKaggle } from "react-icons/si"
import Link from "next/link"
import { footerData } from "@/data"

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  SiKaggle,
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright & Email - Minimal */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm text-muted-foreground">
            <span>© {currentYear} {footerData.copyright}</span>
            <a 
              href={`mailto:${footerData.email}`} 
              className="hover:text-foreground transition-colors"
            >
              {footerData.email}
            </a>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {footerData.socialLinks.map((social) => {
              const IconComponent = iconMap[social.icon]
              return (
                <a 
                  key={social.label}
                  href={social.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  {IconComponent && <IconComponent className="h-4 w-4" />}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
} 