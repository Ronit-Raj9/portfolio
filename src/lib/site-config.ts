/**
 * Canonical site URL for SEO (metadata, sitemap, JSON-LD, breadcrumbs).
 * Production: https://roniii.vercel.app
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://roniii.vercel.app'

export const SITE_HOST = new URL(SITE_URL).host
