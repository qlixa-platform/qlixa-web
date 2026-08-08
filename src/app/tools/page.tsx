'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { generateChecklistPDF } from '@/components/RWRChecklists'

// Переклади сторінки "Інструменти" — всі 4 мови
const TOOLS_PAGE_TEXT: Record<string, {
  badge: string
  toolsLabel: string
  checklistsLabel: string
  checklistSubtitle: string
  card1Title: string
  card2Title: string
  card3Title: string
}> = {
  UA: {
    badge: 'Безкоштовні інструменти і чеклісти',
    toolsLabel: 'Інструменти',
    checklistsLabel: 'Чеклісти',
    checklistSubtitle: 'Документи для подання на RWR+ карту',
    card1Title: 'Для найманих працівників',
    card2Title: 'Для самозайнятих',
    card3Title: 'Для дітей',
  },
  RU: {
    badge: 'Бесплатные инструменты и чек-листы',
    toolsLabel: 'Инструменты',
    checklistsLabel: 'Чек-листы',
    checklistSubtitle: 'Документы для подачи на RWR+ карту',
    card1Title: 'Для наёмных работников',
    card2Title: 'Для самозанятых',
    card3Title: 'Для детей',
  },
  EN: {
    badge: 'Free tools and checklists',
    toolsLabel: 'Tools',
    checklistsLabel: 'Checklists',
    checklistSubtitle: 'Documents for the RWR+ card application',
    card1Title: 'For Employees',
    card2Title: 'For the Self-Employed',
    card3Title: 'For Children',
  },
  DE: {
    badge: 'Kostenlose Tools und Checklisten',
    toolsLabel: 'Tools',
    checklistsLabel: 'Checklisten',
    checklistSubtitle: 'Dokumente für die RWR+ Kartenantragstellung',
    card1Title: 'Für Angestellte',
    card2Title: 'Für Selbstständige',
    card3Title: 'Für Kinder',
  },
}

// Картки інструментів — всі 4 мови (href однаковий для всіх мов)
const TOOLS_LIST: Record<string, { title: string; desc: string }[]> = {
  UA: [
    { title: 'RWR+ калькулятор доходу', desc: 'Перевір, чи вистачає доходу для подання на RWR+ карту' },
  ],
  RU: [
    { title: 'RWR+ калькулятор дохода', desc: 'Проверь, хватает ли дохода для подачи на RWR+ карту' },
  ],
  EN: [
    { title: 'RWR+ income calculator', desc: 'Check whether your income is enough for the RWR+ card application' },
  ],
  DE: [
    { title: 'RWR+ Einkommensrechner', desc: 'Prüfe, ob dein Einkommen für die RWR+ Kartenantragstellung ausreicht' },
  ],
}

const TOOLS_META = [
  { href: '/articles/rwr-karte#calculator' },
]

function CalculatorIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="2" width="14" height="16" rx="2" stroke="#038390" strokeWidth="1.5"/>
      <rect x="5.5" y="4.5" width="9" height="3" rx="0.5" fill="#038390"/>
      <circle cx="6.5" cy="10.5" r="1" fill="#038390"/>
      <circle cx="10" cy="10.5" r="1" fill="#038390"/>
      <circle cx="13.5" cy="10.5" r="1" fill="#038390"/>
      <circle cx="6.5" cy="14" r="1" fill="#038390"/>
      <circle cx="10" cy="14" r="1" fill="#038390"/>
      <circle cx="13.5" cy="14" r="1" fill="#038390"/>
    </svg>
  )
}

function ChecklistIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6 2h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="#038390" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M15 2v4h4" stroke="#038390" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="8" y="12" width="6" height="6" rx="1" stroke="#038390" strokeWidth="1.3"/>
      <path d="M9.3 15l1.2 1.2 2.2-2.4" stroke="#038390" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function ToolsPage() {
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

  const t = TOOLS_PAGE_TEXT[lang] || TOOLS_PAGE_TEXT.UA
  const tools = (TOOLS_LIST[lang] || TOOLS_LIST.UA).map((item, i) => ({ ...item, ...TOOLS_META[i] }))

  const checklists = [
    { title: t.card1Title, type: 'employed' as const },
    { title: t.card2Title, type: 'self' as const },
    { title: t.card3Title, type: 'kids' as const },
  ]

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ background: '#F0F7F8', minHeight: '80vh', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center' as const, marginBottom: 88 }}>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 400, color: '#1A1A1A', letterSpacing: '-1px' }}>
              {t.badge}
            </h1>
          </div>

          {/* Section label — Інструменти */}
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 14 }}>
            {t.toolsLabel}
          </div>

          {/* Tool rows */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(3,131,144,0.12)', overflow: 'hidden', marginBottom: 100 }}>
            {tools.map((tool, i) => (
              <Link key={tool.href} href={tool.href} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px',
                textDecoration: 'none',
                borderBottom: i < tools.length - 1 ? '1px solid rgba(3,131,144,0.08)' : 'none',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(3,131,144,0.04)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <div style={{ width: 52, height: 52, borderRadius: 10, background: '#F0F7F8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CalculatorIcon />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 15, color: '#1A1A1A', marginBottom: 3 }}>
                    {tool.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#595959', lineHeight: 1.4 }}>
                    {tool.desc}
                  </div>
                </div>
                <div style={{ fontSize: 16, color: '#038390', flexShrink: 0 }}>→</div>
              </Link>
            ))}
          </div>

          {/* Section label — Чеклісти */}
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 14 }}>
            {t.checklistsLabel}
          </div>

          {/* Checklist rows */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(3,131,144,0.12)', overflow: 'hidden' }}>
            {checklists.map((item, i) => (
              <button key={item.type} onClick={() => generateChecklistPDF(item.type)} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px', width: '100%',
                background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' as const,
                borderBottom: i < checklists.length - 1 ? '1px solid rgba(3,131,144,0.08)' : 'none',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(3,131,144,0.04)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#F0F7F8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ChecklistIcon />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 14, color: '#1A1A1A', marginBottom: 2 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 11, color: '#9D9D9D' }}>
                    {t.checklistSubtitle}
                  </div>
                </div>
                <div style={{ fontSize: 15, color: '#038390', flexShrink: 0 }}>⬇</div>
              </button>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
