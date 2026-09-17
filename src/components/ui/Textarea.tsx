'use client'

import { TextareaHTMLAttributes, CSSProperties } from 'react'

type TextareaVariant = 'default'

// Visual contract for each variant. Only 'default' exists today, matching
// the one verified visual cluster found in Footer.tsx's modal textarea
// (same family as Input.tsx's 'default', plus resize behavior). Do not
// add variants speculatively — extend this map only when a real, verified
// repository pattern justifies it.
const VARIANT_STYLES: Record<TextareaVariant, CSSProperties> = {
  default: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: 10,
    border: '1px solid #E6F4F5',
    fontSize: 14,
    fontFamily: 'DM Sans, sans-serif',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: TextareaVariant
}

// Renders a real native <textarea>. All standard textarea attributes pass
// through untouched via {...rest}.
export default function Textarea({ variant = 'default', style, ...rest }: TextareaProps) {
  return <textarea {...rest} style={{ ...VARIANT_STYLES[variant], ...style }} />
}
