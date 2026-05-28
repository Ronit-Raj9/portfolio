export interface EmailComposeOptions {
  email: string
  subject?: string
  body?: string
}

export function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function getMailtoUrl({ email, subject, body }: EmailComposeOptions): string {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString()
  return query ? `mailto:${email}?${query}` : `mailto:${email}`
}

/** Gmail web compose - works on desktop/Linux without a local mail client */
export function getGmailComposeUrl({ email, subject, body }: EmailComposeOptions): string {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: email,
  })
  if (subject) params.set('su', subject)
  if (body) params.set('body', body)
  return `https://mail.google.com/mail/?${params.toString()}`
}

/**
 * Opens email compose: mailto on mobile, Gmail web on desktop (no local mail app required).
 */
export function openEmailClient(options: EmailComposeOptions): void {
  if (isMobileDevice()) {
    window.location.href = getMailtoUrl(options)
    return
  }

  const gmailUrl = getGmailComposeUrl(options)
  const tab = window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  if (!tab) {
    window.location.href = gmailUrl
  }
}
