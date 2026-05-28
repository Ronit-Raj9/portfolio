'use client'

import { getMailtoUrl, openEmailClient, type EmailComposeOptions } from '@/lib/email'
import { trackEmailClick } from '@/lib/analytics'

type EmailLinkProps = React.ComponentProps<'a'> & EmailComposeOptions

export function EmailLink({
  email,
  subject,
  body,
  onClick,
  children,
  ...props
}: EmailLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    trackEmailClick()
    onClick?.(event)
    openEmailClient({ email, subject, body })
  }

  return (
    <a
      href={getMailtoUrl({ email, subject, body })}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  )
}
