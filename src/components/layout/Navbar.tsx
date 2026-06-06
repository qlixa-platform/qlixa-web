'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type NavLink = { label: string; href: string }
type NavDropdown = { label: string; items: { label: string; href: string; desc: string }[] }
type NavItem = NavLink | NavDropdown

const navItems: NavItem[] = [
  {
    label: 'Платформа',
    items: [
      { label: 'Огляд', href: '/platform/overview', desc: 'Що вміє QLIXA' },
      { label: 'Рахунки-фактури', href: '/platform/invoicing', desc: 'Виставляй рахунки швидко' },
      { label: 'Витрати', href: '/platform/expenses', desc: 'Відстежуй всі витрати' },
      { label: 'Звіти', href: '/platform/reports', desc: 'Звітність одним кліком' },
      { label: 'Клієнти', href: '/platform/clients', desc: 'Керуй контактами' },
    ],
  },
  {
    label: 'Для кого',
    items: [
      { label: 'Фрілансери', href: '/for/freelancers', desc: 'Проста самозайнятість' },
      { label: 'Малий бізнес', href: '/for/small-business', desc: 'Команди 1–10 осіб' },
      { label: 'Стартапи', href: '/for/startups', desc: 'Для швидкозростаючих' },
      { label: 'Іноземці в Австрії', href: '/for/expats', desc: 'Австрія — просто' },
      { label: 'Українці в Австрії', href: '/for/ukrainians', desc: 'Ми розуміємо тебе' },
    ],
  },
  {
    label: 'Статті',
    href: '/articles',
  },
]

function Dropdown({ item, isOpen, onToggle }: {
  item: NavDropdown
  isOpen: boolean
  onToggle: () => void
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
          color: isOpen ? 'var(--orange)' : 'var(--charcoal)',
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
            {item.items.map((sub) => (
              <Link key={sub.href} href={sub.href} onClick={onToggle} style={{
                display: 'flex', flexDirection: 'column', padding: '10px 12px',
                borderRadius: 8, textDecoration: 'none',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--peach-light)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--charcoal)' }}>{sub.label}</span>
                <span style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{sub.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

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
            placeholder="Пошук статей, гайдів..."
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
              {['Gewerbeanmeldung', 'Austria ID', 'SVS', 'FinanzOnline'].map(t => (
                <button key={t} onClick={() => setQuery(t)} style={{
                  fontSize: 12, padding: '6px 12px', borderRadius: 999,
                  border: '1px solid var(--line2)', color: 'var(--text2)',
                  background: 'transparent', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                }}>{t}</button>
              ))}
            </div>
          )}
          {query && (
            <p style={{ fontSize: 13, color: 'var(--text3)' }}>
              Шукаємо «{query}»...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
              Увійти до <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>QLIXA</em>
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
              Email
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
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)' }}>Пароль</label>
              <Link href="/forgot-password" style={{ fontSize: 12, color: 'var(--orange)' }}>Забули пароль?</Link>
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
            Увійти
          </button>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text3)' }}>
            Немає акаунту?{' '}
            <Link href="/register" style={{ color: 'var(--orange)', fontWeight: 600 }} onClick={onClose}>
              Зареєструватись
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function FreeTrialModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      background: 'rgba(53,52,52,0.5)',
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-box" style={{
        width: '100%', maxWidth: 380, background: '#fff',
        borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow2)',
      }}>
        {!sent ? (
          <>
            <div style={{ padding: '20px 24px 16px', background: 'var(--peach-light)', borderBottom: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 6 }}>
                    Безкоштовно
                  </div>
                  <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: 'var(--charcoal)' }}>
                    Спробувати <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>QLIXA</em>
                  </h2>
                </div>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 4l10 10M14 4L4 14" stroke="var(--text3)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text2)', marginBottom: 5 }}>Ім&apos;я</label>
                  <input required type="text" value={form.firstName}
                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                    placeholder="Anna"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, fontSize: 13, border: '1px solid var(--line2)', outline: 'none', fontFamily: 'DM Sans, sans-serif' }}
                    onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                    onBlur={e => e.target.style.borderColor = 'var(--line2)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text2)', marginBottom: 5 }}>Прізвище</label>
                  <input required type="text" value={form.lastName}
                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Müller"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, fontSize: 13, border: '1px solid var(--line2)', outline: 'none', fontFamily: 'DM Sans, sans-serif' }}
                    onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                    onBlur={e => e.target.style.borderColor = 'var(--line2)'}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text2)', marginBottom: 5 }}>Email</label>
                <input required type="email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, fontSize: 13, border: '1px solid var(--line2)', outline: 'none', fontFamily: 'DM Sans, sans-serif' }}
                  onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                  onBlur={e => e.target.style.borderColor = 'var(--line2)'}
                />
              </div>
              <button type="submit" style={{
                width: '100%', padding: '12px', borderRadius: 999, fontSize: 14, fontWeight: 700,
                background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', marginTop: 4,
              }}>
                Отримати доступ →
              </button>
              <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text3)' }}>
                Без спаму. Тільки дані для тестового доступу.
              </p>
            </form>
          </>
        ) : (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', background: 'var(--success-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14l6 6 10-10" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, marginBottom: 8 }}>
              Чудово, <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>{form.firstName}!</em>
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20, lineHeight: 1.6 }}>
              Ми надішлемо дані для доступу на <strong>{form.email}</strong> протягом 24 годин.
            </p>
            <button onClick={onClose} style={{
              padding: '10px 24px', borderRadius: 999, fontSize: 13, fontWeight: 700,
              background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer',
            }}>
              Закрити
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showTrial, setShowTrial] = useState(false)

  function toggleDropdown(label: string) {
    setOpenDropdown(prev => prev === label ? null : label)
  }

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 40, background: '#fff',
        borderBottom: '1px solid var(--line)', boxShadow: 'var(--shadow)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Image
                src="/logos/logo-light.svg"
                alt="QLIXA — Reports in one click"
                width={140}
                height={54}
                style={{ display: 'block' }}
              />
            </Link>

            {/* Desktop nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden-mobile">
              {navItems.map(item => (
                'href' in item ? (
                  <Link key={item.label} href={(item as NavLink).href} style={{
                    padding: '8px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                    color: 'var(--charcoal)', textDecoration: 'none',
                  }}>
                    {item.label}
                  </Link>
                ) : (
                  <Dropdown key={item.label} item={item}
                    isOpen={openDropdown === item.label}
                    onToggle={() => toggleDropdown(item.label)}
                  />
                )
              ))}
              <Link href="/pricing" style={{
                padding: '8px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: 'var(--charcoal)', textDecoration: 'none',
              }}>
                Ціни
              </Link>
            </div>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden-mobile">
              <button onClick={() => setShowSearch(true)} style={{
                padding: 8, borderRadius: 8, background: 'transparent',
                border: 'none', cursor: 'pointer',
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="8" cy="8" r="5.5" stroke="var(--text3)" strokeWidth="1.5"/>
                  <path d="M12.5 12.5L16 16" stroke="var(--text3)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <button onClick={() => setShowLogin(true)} style={{
                padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                color: 'var(--charcoal)', border: '1px solid var(--line2)',
                background: 'transparent', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              }}>
                Увійти
              </button>
              <button onClick={() => setShowTrial(true)} style={{
                padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700,
                background: 'var(--orange)', color: '#fff', border: 'none',
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              }}>
                Спробувати
              </button>
            </div>

          </div>
        </div>
      </nav>

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showTrial && <FreeTrialModal onClose={() => setShowTrial(false)} />}
    </>
  )
}
