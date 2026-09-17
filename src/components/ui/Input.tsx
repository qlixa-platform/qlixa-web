'use client'

import { InputHTMLAttributes, CSSProperties } from 'react'

type InputVariant = 'default'

// Visual contract for each variant. Only 'default' exists today, matching
// the one verified visual cluster found in Footer.tsx's modal fields. Do
// not add variants speculatively — extend this map only when a real,
// verified repository pattern justifies it.
const VARIANT_STYLES: Record<InputVariant, CSSProperties> = {
  default: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: 10,
    border: '1px solid #E6F4F5',
    fontSize: 14,
    fontFamily: 'DM Sans, sans-serif',
    boxSizing: 'border-box',
  },
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant
}

// Renders a real native <input>. All standard input attributes pass
// through untouched via {...rest}.
export default function Input({ variant = 'default', style, ...rest }: InputProps) {
  return <input {...rest} style={{ ...VARIANT_STYLES[variant], ...style }} />
}
