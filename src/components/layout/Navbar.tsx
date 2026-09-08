'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type NavLink = { label: string; href: string }
type NavItem = NavLink

// Переклади навбару — всі 4 мови
const NAV_TEXT: Record<string, {
  howItWorksLabel: string
  taxReturn: string
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
    howItWorksLabel: 'Як працює',
    taxReturn: 'QLIXA Tax Return',
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
    howItWorksLabel: 'Как работает',
    taxReturn: 'QLIXA Tax Return',
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
    howItWorksLabel: 'How it works',
    taxReturn: 'QLIXA Tax Return',
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
    howItWorksLabel: 'So funktioniert’s',
    taxReturn: 'QLIXA Tax Return',
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
    { label: t.howItWorksLabel, href: '/#how-it-works' },
    { label: t.taxReturn, href: '/how-it-works/tax-return' },
    { label: t.forWhom, href: '/#для-кого' },
    { label: t.articles, href: '/articles' },
    { label: t.tools, href: '/tools' },
  ]
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

  function scrollToAnchor(id: string) {
    return () => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
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
                <Link key={item.label} href={item.href} style={{
                  padding: '8px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                  color: '#9D9D9D', textDecoration: 'none',
                }}
                  onClick={
                    item.href === '/#для-кого' ? scrollToAnchor('для-кого') :
                    item.href === '/#how-it-works' ? scrollToAnchor('how-it-works') :
                    undefined
                  }
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#9D9D9D'}
                >
                  {item.label}
                </Link>
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
