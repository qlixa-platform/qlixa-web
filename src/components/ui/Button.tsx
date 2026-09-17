'use client'

import { ButtonHTMLAttributes, CSSProperties } from 'react'

type ButtonVariant = 'primary'

// Visual contract for each variant. Only 'primary' exists today, matching
// the one CTA pattern actually migrated so far (see ButtonLink.tsx, which
// shares this same definition). Do not add variants speculatively —
// extend this map only when a real, verified repository pattern justifies it.
const VARIANT_STYLES: Record<ButtonVariant, CSSProperties> = {
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
    border: 'none',
    cursor: 'pointer',
  },
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

// Renders a real <button>. No existing <button> in the repo consumes this
// yet — it exists as the semantic sibling to ButtonLink, ready for future
// migrations, per Foundation #4A.
export default function Button({ variant = 'primary', style, children, ...rest }: ButtonProps) {
  return (
    <button {...rest} style={{ ...VARIANT_STYLES[variant], ...style }}>
      {children}
    </button>
  )
}
