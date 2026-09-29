'use client'

import { useState, useEffect } from 'react'
import AboutContent from '@/components/AboutContent'
import type { InternalLangKey } from '@/lib/locale'

// ————————————————————————————————————————————————————————————————
// /about — legacy compatibility wrapper (QLIXA_I18N_MIGRATION_PLAN.md,
// Phase 5). All actual content/translations/JSX now live in AboutContent,
// the single shared implementation also rendered by
// src/app/[locale]/about/page.tsx. This wrapper's only job is to keep
// this un-prefixed route's EXISTING client-side language selection
// (localStorage + qlixa-lang-change) byte-for-byte unchanged — it
// deliberately omits the `locale` prop, which keeps Navbar/Footer AND the
// /our-story link in legacy mode here (see AboutContent's own doc
// comment).
// ————————————————————————————————————————————————————————————————

export default function AboutPage() {
  const [lang, setLang] = useState('UA')

  useEffect(() => {
    const updateLang = () => {
      const l = localStorage.getItem('qlixa-lang')
      if (l) setLang(l.toUpperCase())
    }
    updateLang()
    window.addEventListener('qlixa-lang-change', updateLang)
    return () => window.removeEventListener('qlixa-lang-change', updateLang)
  }, [])

  return <AboutContent lang={lang as InternalLangKey} />
}
