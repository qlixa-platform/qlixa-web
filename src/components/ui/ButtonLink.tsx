'use client'

import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react'

type ButtonLinkVariant = 'primary'

// Visual contract for each variant. Only 'primary' exists today — the
// exact, verified appearance of the two Tax Return CTAs it replaces
// (padding, background, color, radius, font-size, font-weight). Do not
// add variants speculatively — extend this map only when a real, verified
// repository pattern justifies it.
const VARIANT_STYLES: Record<ButtonLinkVariant, CSSProperties> = {
  primary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '15px 30px',
    background: '#038390',
    color: '#fff',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    textDecoration: 'none',
  },
}

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  LinkProps & {
    variant?: ButtonLinkVariant
    children: ReactNode
  }

// Renders a real Next.js <Link> (not a polymorphic "as" abstraction).
// href/route/query behavior is untouched — callers pass it through exactly
// as they always did, including fully external URLs (Next's <Link>
// renders a plain <a> for those, same as the raw <a> tags it replaces).
export default function ButtonLink({ variant = 'primary', style, children, ...rest }: ButtonLinkProps) {
  return (
    <Link {...rest} style={{ ...VARIANT_STYLES[variant], ...style }}>
      {children}
    </Link>
  )
}
