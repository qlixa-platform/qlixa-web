'use client'

import { useEffect } from 'react'

// Maps QLIXA's stored language codes to valid HTML/BCP-47 lang values.
// Mirrors the exact same mapping already used elsewhere in the codebase
// (e.g. Navbar's cabinet-URL `lang` query param, RWRCalculator's
// Intl locale map): UA -> uk, DE -> de, EN -> en, RU -> ru.
const LANG_MAP: Record<string, string> = { UA: 'uk', DE: 'de', EN: 'en', RU: 'ru' }

// Fallback consistent with the root layout's static `<html lang="en">` —
// does not introduce a second language-detection system.
const FALLBACK = 'en'

// Renders no visible UI. Keeps `document.documentElement.lang` in sync
// with the existing `qlixa-lang` localStorage value, reusing the exact
// same `qlixa-lang-change` event every page already dispatches/listens
// for. Does not read/write localStorage or dispatch any new event of
// its own, and does not touch Navbar's language-selection logic.
export default function LangSync() {
  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem('qlixa-lang')
      const mapped = stored ? LANG_MAP[stored.toUpperCase()] : undefined
      document.documentElement.lang = mapped || FALLBACK
    }
    sync()
    window.addEventListener('qlixa-lang-change', sync)
    return () => window.removeEventListener('qlixa-lang-change', sync)
  }, [])

  return null
}
