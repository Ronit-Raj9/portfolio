// Analytics utility functions for tracking events

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX', {
      page_path: url,
    })
  }
}

// Track custom events
type EventName = 
  | 'download'
  | 'contact'
  | 'view_demo'
  | 'view_github'
  | 'view_project'
  | 'click_social'
  | 'copy_email'

interface EventParams {
  file?: string
  method?: string
  project?: string
  platform?: string
  link?: string
}

export const trackEvent = (eventName: EventName, params?: EventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

// Specific tracking functions for common actions
export const trackResumeDownload = () => {
  trackEvent('download', { file: 'resume_pdf' })
}

export const trackEmailClick = () => {
  trackEvent('contact', { method: 'email' })
}

export const trackProjectDemo = (projectName: string) => {
  trackEvent('view_demo', { project: projectName })
}

export const trackGitHubClick = (projectName?: string) => {
  trackEvent('view_github', { project: projectName || 'profile' })
}

export const trackSocialClick = (platform: string) => {
  trackEvent('click_social', { platform })
}

export const trackProjectView = (projectName: string) => {
  trackEvent('view_project', { project: projectName })
}
