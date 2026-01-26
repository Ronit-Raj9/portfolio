"use client"

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { SiKaggle } from "react-icons/si"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="w-full border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright & Email */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
            <span>© {currentYear} Ronit Raj</span>
            <span className="hidden sm:inline">•</span>
            <a 
              href="mailto:ronitk964@gmail.com" 
              className="hover:text-primary transition-colors"
            >
              ronitk964@gmail.com
            </a>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for consulting
            </span>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: FaGithub, url: "https://github.com/Ronit-Raj9", label: "GitHub" },
              { icon: FaLinkedin, url: "https://www.linkedin.com/in/ronit-raj-662485225/", label: "LinkedIn" },
              { icon: FaTwitter, url: "https://x.com/ronit__raj", label: "Twitter" },
              { icon: SiKaggle, url: "https://www.kaggle.com/ronitraj1", label: "Kaggle" }
            ].map((social) => (
              <a 
                key={social.label}
                href={social.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
} 