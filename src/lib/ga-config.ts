/** Google Analytics 4 measurement ID (public, client-side). Override via NEXT_PUBLIC_GA_ID. */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? 'G-KCHS1YQVWE'

export const isGoogleAnalyticsEnabled = Boolean(GA_MEASUREMENT_ID)
