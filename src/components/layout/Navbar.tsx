'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type NavLink = { label: string; href: string }
type NavDropdown = { label: string; items: { label: string; href: string; desc: string; isSoon?: boolean }[] }
type NavItem = NavLink | NavDropdown

const HOW_ITEMS_HREFS = [
  '/for/naymanyy',
  '/for/biznes',
  '/pricing',
]

// Переклади навбару — всі 4 мови
const NAV_TEXT: Record<string, {
  dropdownLabel: string
  dropdownItems: [string, string, boolean?][] // [bold, small, isSoon?] пар, порядок відповідає HOW_ITEMS_HREFS
  soonLabel: string
  forWhom: string
  articles: string
  tools: string
  pricing: string
  login: string
  searchPlaceholder: string
  searching: (q: string) => string
  loginTitlePrefix: string // "Увійти до " + QLIXA (QLIXA завжди окремо, стилізовано)
  email: string
  password: string
  forgotPassword: string
  loginBtn: string
  noAccount: string
  signUp: string
}> = {
  UA: {
    dropdownLabel: 'Як працює',
    dropdownItems: [
      ['Огляд Платформи', 'Тариф Найманий'],
      ['Огляд Платформи', 'Тариф Самозайнятий', true],
      ['Огляд Платформи', 'Тариф Бізнес', true],
    ],
    soonLabel: 'Скоро',
    forWhom: 'Для кого',
    articles: 'Статті',
    tools: 'Інструменти',
    pricing: 'Тарифи',
    login: 'Кабінет',
    searchPlaceholder: 'Пошук статей, гайдів...',
    searching: (q) => `Шукаємо «${q}»...`,
    loginTitlePrefix: 'Увійти до ',
    email: 'Email',
    password: 'Пароль',
    forgotPassword: 'Забули пароль?',
    loginBtn: 'Увійти',
    noAccount: 'Немає акаунту?',
    signUp: 'Зареєструватись',
  },
  RU: {
    dropdownLabel: 'Как работает',
    dropdownItems: [
      ['Обзор платформы', 'Тариф Наёмный'],
      ['Обзор платформы', 'Тариф Самозанятый', true],
      ['Обзор платформы', 'Тариф Бизнес', true],
    ],
    soonLabel: 'Скоро',
    forWhom: 'Для кого',
    articles: 'Статьи',
    tools: 'Инструменты',
    pricing: 'Тарифы',
    login: 'Кабинет',
    searchPlaceholder: 'Поиск статей, гайдов...',
    searching: (q) => `Ищем «${q}»...`,
    loginTitlePrefix: 'Войти в ',
    email: 'Email',
    password: 'Пароль',
    forgotPassword: 'Забыли пароль?',
    loginBtn: 'Войти',
    noAccount: 'Нет аккаунта?',
    signUp: 'Зарегистрироваться',
  },
  EN: {
    dropdownLabel: 'How it works',
    dropdownItems: [
      ['Platform Overview', 'Employee plan'],
      ['Platform Overview', 'Self-employed plan', true],
      ['Platform Overview', 'Business plan', true],
    ],
    soonLabel: 'Coming soon',
    forWhom: 'For Whom',
    articles: 'Articles',
    tools: 'Tools',
    pricing: 'Pricing',
    login: 'Cabinet',
    searchPlaceholder: 'Search articles, guides...',
    searching: (q) => `Searching for "${q}"...`,
    loginTitlePrefix: 'Log in to ',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    loginBtn: 'Log in',
    noAccount: "Don't have an account?",
    signUp: 'Sign up',
  },
  DE: {
    dropdownLabel: 'So funktioniert’s',
    dropdownItems: [
      ['Plattform-Überblick', 'Tarif Angestellte'],
      ['Plattform-Überblick', 'Tarif Selbstständig', true],
      ['Plattform-Überblick', 'Tarif Business', true],
    ],
    soonLabel: 'Demnächst',
    forWhom: 'Für wen',
    articles: 'Artikel',
    tools: 'Tools',
    pricing: 'Preise',
    login: 'Kabinett',
    searchPlaceholder: 'Artikel, Anleitungen suchen...',
    searching: (q) => `Suche nach „${q}“...`,
    loginTitlePrefix: 'Bei ',
    email: 'E-Mail',
    password: 'Passwort',
    forgotPassword: 'Passwort vergessen?',
    loginBtn: 'Anmelden',
    noAccount: 'Noch kein Konto?',
    signUp: 'Registrieren',
  },
}

function getNavItems(lang: string): NavItem[] {
  const t = NAV_TEXT[lang] || NAV_TEXT.UA
  return [
    {
      label: t.dropdownLabel,
      items: t.dropdownItems.map(([label, desc, isSoon], i) => ({ label, desc, href: HOW_ITEMS_HREFS[i], isSoon: !!isSoon })),
    },
    { label: t.forWhom, href: '/#для-кого' },
    { label: t.articles, href: '/articles' },
    { label: t.tools, href: '/tools' },
  ]
}

function Dropdown({ item, isOpen, onToggle, soonLabel }: {
  item: NavDropdown
  isOpen: boolean
  onToggle: () => void
  soonLabel: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (isOpen) onToggle()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen, onToggle])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '8px 12px', borderRadius: 8, border: 'none', background: 'transparent',
          fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
          color: isOpen ? '#038390' : '#9D9D9D',
        }}
      >
        {item.label}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{ transition: 'transform 0.15s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown-menu" style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 8,
          width: 240, background: '#fff', borderRadius: 14,
          border: '1px solid var(--line)', boxShadow: 'var(--shadow2)', zIndex: 50,
        }}>
          <div style={{ padding: 8 }}>
            {item.items.map((sub, i) => (
              <Link key={`${sub.label}-${sub.desc}-${i}`} href={sub.href} onClick={onToggle} style={{
                display: 'flex', flexDirection: 'column', padding: '10px 12px',
                borderRadius: 8, textDecoration: 'none',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--peach-light)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--charcoal)' }}>{sub.label}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>{sub.desc}</span>
                  {sub.isSoon && (
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#026B76', background: '#F5E642', padding: '2px 8px', borderRadius: 999 }}>
                      {soonLabel}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SearchModal({ onClose, lang }: { onClose: () => void; lang: string }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const t = NAV_TEXT[lang] || NAV_TEXT.UA

  useEffect(() => {
    inputRef.current?.focus()
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      paddingTop: 96, paddingLeft: 16, paddingRight: 16,
      background: 'rgba(53,52,52,0.5)',
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-box" style={{
        width: '100%', maxWidth: 560, background: '#fff',
        borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow2)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px', borderBottom: '1px solid var(--line)',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: 'var(--text3)', flexShrink: 0 }}>
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            style={{ flex: 1, fontSize: 14, outline: 'none', background: 'transparent', color: 'var(--charcoal)', border: 'none', fontFamily: 'DM Sans, sans-serif' }}
          />
          <button onClick={onClose} style={{
            fontSize: 11, padding: '3px 8px', borderRadius: 5,
            border: '1px solid var(--line2)', color: 'var(--text3)',
            background: 'transparent', cursor: 'pointer',
          }}>ESC</button>
        </div>
        <div style={{ padding: '12px 16px' }}>
          {!query && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Gewerbeanmeldung', 'Austria ID', 'SVS', 'FinanzOnline'].map(tag => (
                <button key={tag} onClick={() => setQuery(tag)} style={{
                  fontSize: 12, padding: '6px 12px', borderRadius: 999,
                  border: '1px solid var(--line2)', color: 'var(--text2)',
                  background: 'transparent', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                }}>{tag}</button>
              ))}
            </div>
          )}
          {query && (
            <p style={{ fontSize: 13, color: 'var(--text3)' }}>
              {t.searching(query)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function LoginModal({ onClose, lang }: { onClose: () => void; lang: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const t = NAV_TEXT[lang] || NAV_TEXT.UA

  useEffect(() => {
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      background: 'rgba(53,52,52,0.5)',
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-box" style={{
        width: '100%', maxWidth: 360, background: '#fff',
        borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow2)',
      }}>
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: 'var(--charcoal)' }}>
              {t.loginTitlePrefix}<em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>QLIXA</em>
            </h2>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 4l10 10M14 4L4 14" stroke="var(--text3)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text2)', marginBottom: 6 }}>
              {t.email}
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 8, fontSize: 13,
                border: '1px solid var(--line2)', outline: 'none', fontFamily: 'DM Sans, sans-serif',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--orange)'}
              onBlur={e => e.target.style.borderColor = 'var(--line2)'}
            />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)' }}>{t.password}</label>
              <Link href="/forgot-password" style={{ fontSize: 12, color: 'var(--orange)' }}>{t.forgotPassword}</Link>
            </div>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 8, fontSize: 13,
                border: '1px solid var(--line2)', outline: 'none', fontFamily: 'DM Sans, sans-serif',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--orange)'}
              onBlur={e => e.target.style.borderColor = 'var(--line2)'}
            />
          </div>
          <button style={{
            width: '100%', padding: '11px', borderRadius: 999, fontSize: 14, fontWeight: 700,
            background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
          }}>
            {t.loginBtn}
          </button>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text3)' }}>
            {t.noAccount}{' '}
            <Link href="/register" style={{ color: 'var(--orange)', fontWeight: 600 }} onClick={onClose}>
              {t.signUp}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const [lang, setLang] = React.useState<string>('UA');

  useEffect(() => {
    const saved = localStorage.getItem('qlixa-lang');
    if (saved) setLang(saved);
  }, []);

  const handleLang = (l: string) => {
    setLang(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('qlixa-lang', l);
      window.dispatchEvent(new Event('qlixa-lang-change'));
    }
  };

  const navItems = getNavItems(lang);
  const t = NAV_TEXT[lang] || NAV_TEXT.UA;

  function toggleDropdown(label: string) {
    setOpenDropdown(prev => prev === label ? null : label)
  }

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 40, background: '#ffffff',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,60px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginLeft: '-12px' }}>
              <Image
                src="/logos/logo-name-slogan_planets_black.svg"
                alt="QLIXA — Reports in One Click"
                width={160}
                height={57}
                style={{ display: 'block' }}
              />
            </Link>

            {/* Desktop nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingLeft: '40px' }} className="hidden-mobile">
              {navItems.map(item => (
                'href' in item ? (
                  <Link key={item.label} href={(item as NavLink).href} style={{
                    padding: '8px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                    color: '#9D9D9D', textDecoration: 'none',
                  }}
                    onClick={(item as NavLink).href === '/#для-кого' ? () => { const el = document.getElementById('для-кого'); if (el) el.scrollIntoView({ behavior: 'smooth' }); } : undefined}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#9D9D9D'}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Dropdown key={item.label} item={item} soonLabel={t.soonLabel}
                    isOpen={openDropdown === item.label}
                    onToggle={() => toggleDropdown(item.label)}
                  />
                )
              ))}
              <Link href="/pricing" style={{
                padding: '8px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: '#9D9D9D', textDecoration: 'none',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#9D9D9D'}
              >
                {t.pricing}
              </Link>
            </div>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden-mobile">
              {/* Language switcher */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginRight: 8 }}>
                {(['UA', 'DE', 'EN', 'RU'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLang(l)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: lang === l ? 700 : 400,
                      color: lang === l ? '#038390' : '#9D9D9D',
                      padding: '2px 5px',
                      borderRadius: 4,
                      fontFamily: 'DM Sans, sans-serif',
                      transition: 'color 0.15s',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <button onClick={() => setShowSearch(true)} style={{
                padding: 8, borderRadius: 8, background: 'transparent',
                border: 'none', cursor: 'pointer',
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="8" cy="8" r="5.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                  <path d="M12.5 12.5L16 16" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <a href="https://cabinet-ten-lac.vercel.app/login" style={{
                padding: '8px 16px', borderRadius: 10, fontSize: 14, fontWeight: 500,
                color: '#9D9D9D', border: '1px solid #9D9D9D',
                background: 'transparent', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                textDecoration: 'none', display: 'inline-block',
              }}>
                {t.login}
              </a>
            </div>

          </div>
        </div>
      </nav>

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} lang={lang} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} lang={lang} />}
    </>
  )
}
