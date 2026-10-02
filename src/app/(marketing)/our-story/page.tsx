'use client'

import { useState, useEffect } from 'react'
import OurStoryContent from '@/components/OurStoryContent'
import type { InternalLangKey } from '@/lib/locale'

// ————————————————————————————————————————————————————————————————
// /our-story — legacy compatibility wrapper (QLIXA_I18N_MIGRATION_PLAN.md,
// Phase 5). All actual content/translations/JSX now live in
// OurStoryContent, the single shared implementation also rendered by
// src/app/[locale]/our-story/page.tsx. This wrapper's only job is to keep
// this un-prefixed route's EXISTING client-side language selection
// (localStorage + qlixa-lang-change) byte-for-byte unchanged — it
// deliberately omits the `locale` prop, which keeps Navbar/Footer in
// legacy mode here (see OurStoryContent's own doc comment).
// ————————————————————————————————————————————————————————————————

export default function OurStoryPage() {
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

  return <OurStoryContent lang={lang as InternalLangKey} />
}
