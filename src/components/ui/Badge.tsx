'use client'

import { HTMLAttributes, CSSProperties } from 'react'

type BadgeVariant = 'comingSoon' | 'tagPrimary' | 'tagSecondary'

// Visual contract for each variant — each maps to one verified, byte-exact
// repeated shell found in the repository (Foundation #4D audit). Do not
// add variants speculatively — extend this map only when a real, verified
// repository pattern justifies it. Positioning (e.g. the Homepage's
// absolutely-positioned Coming Soon instance) belongs to the consuming
// composition via the `style` override, not to this shell.
const VARIANT_STYLES: Record<BadgeVariant, CSSProperties> = {
  comingSoon: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '1px',
    color: '#026B76',
    background: '#F5E642',
    padding: '3px 9px',
    borderRadius: 999,
  },
  tagPrimary: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: '#038390',
    background: 'rgba(3,131,144,0.1)',
    padding: '4px 12px',
    borderRadius: 999,
  },
  tagSecondary: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: '#595959',
    background: 'rgba(89,89,89,0.08)',
    padding: '4px 12px',
    borderRadius: 999,
  },
}

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant: BadgeVariant
}

// Renders a real native <span>. Static text only — no interaction
// behavior is added (no onClick, href, role, tabIndex, or hover/active
// states). Standard span attributes pass through untouched via {...rest}.
export default function Badge({ variant, style, ...rest }: BadgeProps) {
  return <span {...rest} style={{ ...VARIANT_STYLES[variant], ...style }} />
}
