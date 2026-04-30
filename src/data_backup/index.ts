// ============================================================================
// DATA TYPES - TypeScript interfaces for all portfolio data
// ============================================================================

export interface AboutSection {
  title: string
  paragraphs: string[]
}

export interface About {
  summary: string
  sections: AboutSection[]
}

export interface Profile {
  name: string
  title: string
  tagline: string
  credentials: string
  email: string
  location: string
  resumeUrl: string
  profileImage: string
  social: {
    github: string
    linkedin: string
    twitter: string
    kaggle: string
    website: string
  }
  availability: {
    status: 'available' | 'busy' | 'unavailable'
    message: string
  }
  about: About
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  description: string
  highlights: string[]
  current: boolean
  icon?: string
  badge?: string
  locationType?: 'On Site' | 'Remote' | 'Hybrid'
  link?: string
}

export interface Achievement {
  id: string
  year: string
  title: string
  subtitle: string
  description: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  badge: string
  badgeColor: string
  highlights: string[]
  tech: string[]
  links: {
    demo?: string
    github?: string
    caseStudy?: string
  }
  image: string
  category: string
  featured: boolean
  completeness: boolean
}

// Legacy types for backwards compatibility
export type FeaturedProject = Project
export type MoreProject = Project

export interface ArchiveProject {
  title: string
  subtitle: string
  description: string
  image: string
  tech: string[]
  category: string
  status: string
  year: number
  featured: boolean
  badge: string
  demoLink: string
  githubLink: string
  metrics: string
}

export interface Projects {
  all: Project[]
  archive?: ArchiveProject[]
}

export interface Skill {
  name: string
  category: string
}

export interface Skills {
  technical: Record<string, string[]>
  all: Skill[]
}

// ============================================================================
// CONTACT DATA TYPES
// ============================================================================

export interface ContactMethod {
  name: string
  value: string
  icon: string
  href: string
}

export interface ContactFormLabels {
  name: string
  namePlaceholder: string
  email: string
  emailPlaceholder: string
  message: string
  messagePlaceholder: string
  submitButton: string
}

export interface ContactPageContent {
  title: string
  description: string
}

export interface ContactData {
  methods: ContactMethod[]
  formLabels: ContactFormLabels
  pageContent: ContactPageContent
}

// ============================================================================
// BLOG DATA TYPES
// ============================================================================

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
}

export interface BlogData {
  posts: BlogPost[]
  pageContent: {
    title: string
  }
}

// ============================================================================
// NAVIGATION DATA TYPES
// ============================================================================

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface NavItem {
  name: string
  href: string
  icon: string
}

export interface FooterSocialLink {
  icon: string
  url: string
  label: string
}

export interface FooterData {
  copyright: string
  email: string
  socialLinks: FooterSocialLink[]
}

export interface NavigationData {
  socialLinks: SocialLink[]
  navItems: NavItem[]
  footer: FooterData
}

// ============================================================================
// DATA IMPORTS - Import JSON files with type safety
// ============================================================================

import profileData from './profile.json'
import experienceData from './experience.json'
import achievementsData from './achievements.json'
import projectsData from './projects.json'
import skillsData from './skills.json'
import contactData from './contact.json'
import blogData from './blog.json'
import navigationData from './navigation.json'

// ============================================================================
// TYPED EXPORTS - Export data with proper types
// ============================================================================

export const profile: Profile = profileData as Profile
export const experience: Experience[] = experienceData as Experience[]
export const achievements: Achievement[] = achievementsData as Achievement[]
export const allProjects: Project[] = projectsData as Project[]
export const skills: Skills = skillsData as Skills
export const contact: ContactData = contactData as ContactData
export const blog: BlogData = blogData as BlogData
export const navigation: NavigationData = navigationData as NavigationData

// Convenience exports for common use cases
export const featuredProjects = allProjects.filter(p => p.featured && p.completeness)
export const moreProjects = allProjects.filter(p => !p.featured && p.completeness)
export const technicalSkills = skills.technical
export const allSkills = skills.all
export const contactMethods = contact.methods
export const blogPosts = blog.posts
export const socialLinks = navigation.socialLinks
export const navItems = navigation.navItems
export const footerData = navigation.footer
