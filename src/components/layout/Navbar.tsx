'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navItems = [
  {
    label: 'Platform',
    items: [
      { label: 'Overview', href: '/platform', desc: 'What QLIXA can do' },
      { label: 'Invoicing', href: '/platform/invoicing', desc: 'Create & send invoices' },
      { label: 'Expenses', href: '/platform/expenses', desc: 'Track all your costs' },
      { label: 'Reports', href: '/platform/reports', desc: 'One-click tax reports' },
      { label: 'Clients', href: '/platform/clients', desc: 'Manage your contacts' },
    ],
  },
  {
    label: 'For whom',
    items: [
      { label: 'Freelancers', href: '/for/freelancers', desc: 'Simple solo accounting' },
      { label: 'Small Business', href: '/for/small-business', desc: 'For 1–10 person teams' },
      { label: 'Startups', href: '/for/startups', desc: 'Fast-growing companies' },
      { label: 'Expats & Foreigners', href: '/for/expats', desc: 'Austria made simple' },
      { label: 'Ukrainians in Austria', href: '/for/ukrainians', desc: 'Ми розуміємо тебе' },
    ],
  },
  {
    label: 'Articles',
    items: [
      { label: 'Getting started in Austria', href: '/articles/getting-started', desc: 'Gewerbeanmeldung & more' },
      { label: 'Tax guides', href: '/articles/taxes', desc: 'USt, ESt, SVS explained' },
      { label: 'Invoicing tips', href: '/articles/invoicing', desc: 'Best practices' },
      { label: 'Business setup', href: '/articles/setup', desc: 'Step-by-step guides' },
      { label: 'All articles', href: '/articles', desc: 'Browse everything' },
    ],
  },
]

function Dropdown({ item, isOpen, onToggle }: {
  item: typeof navItems[0]
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
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-charcoal hover:text-orange transition-colors"
        style={{ color: isOpen ? 'var(--orange)' : 'var(--charcoal)' }}
      >
        {item.label}
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{ transition: 'transform 0.15s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div
          className="dropdown-menu absolute top-full left-0 mt-2 w-64 bg-white rounded-qmd border shadow-lg z-50"
          style={{ border: '1px solid var(--line)', boxShadow: 'var(--shadow2)' }}
        >
          <div className="p-2">
            {item.items.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                onClick={onToggle}
                className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-orange-pale group transition-colors"
              >
                <span className="text-sm font-medium text-charcoal group-hover:text-orange transition-colors">
                  {sub.label}
                </span>
                <span className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>
                  {sub.desc}
                </span>
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
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
      style={{ background: 'rgba(53,52,52,0.5)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="modal-box w-full max-w-xl bg-white rounded-qmd overflow-hidden"
        style={{ boxShadow: 'var(--shadow2)' }}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b" style={{ borderColor: 'var(--line)' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: 'var(--text3)', flexShrink: 0 }}>
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search articles, guides, topics..."
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: 'var(--text)' }}
          />
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded border"
            style={{ color: 'var(--text3)', borderColor: 'var(--line2)' }}
          >
            ESC
          </button>
        </div>
        <div className="px-4 py-3">
          <p className="text-xs" style={{ color: 'var(--text3)' }}>
            {query ? `Searching for "${query}"...` : 'Start typing to search QLIXA articles and guides'}
          </p>
          {!query && (
            <div className="mt-3 flex flex-wrap gap-2">
              {['Gewerbeanmeldung', 'USt Voranmeldung', 'SVS payments', 'Invoice template'].map(t => (
                <button
                  key={t}
                  onClick={() => setQuery(t)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:border-orange hover:text-orange"
                  style={{ borderColor: 'var(--line2)', color: 'var(--text2)' }}
                >
                  {t}
                </button>
              ))}
            </div>
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
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(53,52,52,0.5)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="modal-box w-full max-w-sm bg-white rounded-qmd overflow-hidden"
        style={{ boxShadow: 'var(--shadow2)' }}
      >
        <div className="px-6 py-5 border-b" style={{ borderColor: 'var(--line)' }}>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>
              Sign in to <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>QLIXA</em>
            </h2>
            <button onClick={onClose} className="p-1 rounded hover:bg-qgray transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 4l10 10M14 4L4 14" stroke="var(--text3)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--text3)' }}>
            Enter your email and password to continue
          </p>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text2)' }}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 text-sm rounded-qsm border outline-none transition-colors"
              style={{
                border: '1px solid var(--line2)',
                color: 'var(--text)',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--orange)'}
              onBlur={e => e.target.style.borderColor = 'var(--line2)'}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--text2)' }}>
                Password
              </label>
              <Link href="/forgot-password" className="text-xs hover:underline" style={{ color: 'var(--orange)' }}>
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 text-sm rounded-qsm border outline-none transition-colors"
              style={{
                border: '1px solid var(--line2)',
                color: 'var(--text)',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--orange)'}
              onBlur={e => e.target.style.borderColor = 'var(--line2)'}
            />
          </div>

          <button
            className="w-full py-2.5 rounded-full text-sm font-semibold text-white transition-colors"
            style={{ background: 'var(--orange)' }}
            onMouseEnter={e => (e.target as HTMLElement).style.background = 'var(--orange2)'}
            onMouseLeave={e => (e.target as HTMLElement).style.background = 'var(--orange)'}
          >
            Sign in
          </button>

          <p className="text-center text-xs" style={{ color: 'var(--text3)' }}>
            No account yet?{' '}
            <Link href="/register" className="font-medium hover:underline" style={{ color: 'var(--orange)' }} onClick={onClose}>
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function FreeTrialModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(53,52,52,0.5)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="modal-box w-full max-w-sm bg-white rounded-qmd overflow-hidden"
        style={{ boxShadow: 'var(--shadow2)' }}
      >
        {!sent ? (
          <>
            <div className="px-6 py-5 border-b" style={{ borderColor: 'var(--line)', background: 'var(--peach-light)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--orange)' }}>
                    Free Trial
                  </div>
                  <h2 className="font-serif text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>
                    Try QLIXA <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>for free</em>
                  </h2>
                </div>
                <button onClick={onClose} className="p-1 rounded hover:bg-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 4l10 10M14 4L4 14" stroke="var(--text3)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--text2)' }}>
                Get access to our platform — no credit card needed
              </p>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text2)' }}>First name</label>
                  <input
                    required
                    type="text"
                    value={form.firstName}
                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                    placeholder="Anna"
                    className="w-full px-3 py-2.5 text-sm rounded-qsm border outline-none"
                    style={{ border: '1px solid var(--line2)', color: 'var(--text)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                    onBlur={e => e.target.style.borderColor = 'var(--line2)'}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text2)' }}>Last name</label>
                  <input
                    required
                    type="text"
                    value={form.lastName}
                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Müller"
                    className="w-full px-3 py-2.5 text-sm rounded-qsm border outline-none"
                    style={{ border: '1px solid var(--line2)', color: 'var(--text)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                    onBlur={e => e.target.style.borderColor = 'var(--line2)'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text2)' }}>Email address</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2.5 text-sm rounded-qsm border outline-none"
                  style={{ border: '1px solid var(--line2)', color: 'var(--text)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                  onBlur={e => e.target.style.borderColor = 'var(--line2)'}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text2)' }}>Phone number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="+43 123 456 7890"
                  className="w-full px-3 py-2.5 text-sm rounded-qsm border outline-none"
                  style={{ border: '1px solid var(--line2)', color: 'var(--text)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                  onBlur={e => e.target.style.borderColor = 'var(--line2)'}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full text-sm font-semibold text-white mt-1 transition-colors"
                style={{ background: 'var(--orange)' }}
                onMouseEnter={e => (e.target as HTMLElement).style.background = 'var(--orange2)'}
                onMouseLeave={e => (e.target as HTMLElement).style.background = 'var(--orange)'}
              >
                Get free access →
              </button>

              <p className="text-center text-xs" style={{ color: 'var(--text3)' }}>
                No spam. We&apos;ll only contact you about your trial.
              </p>
            </form>
          </>
        ) : (
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--success-bg)' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14l6 6 10-10" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-serif text-xl mb-2" style={{ fontFamily: 'DM Serif Display, serif' }}>
              You&apos;re <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>in!</em>
            </h3>
            <p className="text-sm mb-5" style={{ color: 'var(--text2)' }}>
              Thank you, {form.firstName}! We&apos;ll send your access details to <strong>{form.email}</strong> within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-white"
              style={{ background: 'var(--orange)' }}
            >
              Close
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
  const [mobileOpen, setMobileOpen] = useState(false)

  function toggleDropdown(label: string) {
    setOpenDropdown(prev => prev === label ? null : label)
  }

  return (
    <>
      <nav
        className="sticky top-0 z-40 bg-white"
        style={{ borderBottom: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9">
                <Image
                  src="/logos/logo-multi.svg"
                  alt="QLIXA logo"
                  width={36}
                  height={36}
                  className="w-full h-full"
                />
              </div>
              <span
                className="text-xl tracking-wide"
                style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--charcoal)' }}
              >
                <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>Q</em>LIXA
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <Dropdown
                  key={item.label}
                  item={item}
                  isOpen={openDropdown === item.label}
                  onToggle={() => toggleDropdown(item.label)}
                />
              ))}
              <Link
                href="/pricing"
                className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ color: 'var(--charcoal)' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--orange)'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--charcoal)'}
              >
                Pricing
              </Link>
            </div>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-lg transition-colors hover:bg-qgray"
                title="Search"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="8" cy="8" r="5.5" stroke="var(--text3)" strokeWidth="1.5"/>
                  <path d="M12.5 12.5L16 16" stroke="var(--text3)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Login */}
              <button
                onClick={() => setShowLogin(true)}
                className="px-4 py-2 rounded-full text-sm font-medium border transition-colors"
                style={{ color: 'var(--charcoal)', borderColor: 'var(--line2)' }}
                onMouseEnter={e => {
                  const el = e.target as HTMLElement
                  el.style.borderColor = 'var(--orange)'
                  el.style.color = 'var(--orange)'
                }}
                onMouseLeave={e => {
                  const el = e.target as HTMLElement
                  el.style.borderColor = 'var(--line2)'
                  el.style.color = 'var(--charcoal)'
                }}
              >
                Log in
              </button>

              {/* Free trial */}
              <button
                onClick={() => setShowTrial(true)}
                className="px-4 py-2 rounded-full text-sm font-semibold text-white transition-colors"
                style={{ background: 'var(--orange)' }}
                onMouseEnter={e => (e.target as HTMLElement).style.background = 'var(--orange2)'}
                onMouseLeave={e => (e.target as HTMLElement).style.background = 'var(--orange)'}
              >
                Try free
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {mobileOpen ? (
                  <path d="M4 4l12 12M16 4L4 16" stroke="var(--charcoal)" strokeWidth="1.5" strokeLinecap="round"/>
                ) : (
                  <>
                    <path d="M3 6h14M3 10h14M3 14h14" stroke="var(--charcoal)" strokeWidth="1.5" strokeLinecap="round"/>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white px-4 py-4" style={{ borderColor: 'var(--line)' }}>
            <div className="space-y-1">
              {navItems.map(item =>
                item.items.map(sub => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="block py-2 px-3 rounded-lg text-sm hover:bg-orange-pale"
                    style={{ color: 'var(--charcoal)' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {sub.label}
                  </Link>
                ))
              )}
              <Link
                href="/pricing"
                className="block py-2 px-3 rounded-lg text-sm"
                style={{ color: 'var(--charcoal)' }}
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t flex flex-col gap-2" style={{ borderColor: 'var(--line)' }}>
              <button
                onClick={() => { setShowLogin(true); setMobileOpen(false) }}
                className="w-full py-2.5 rounded-full text-sm font-medium border"
                style={{ color: 'var(--charcoal)', borderColor: 'var(--line2)' }}
              >
                Log in
              </button>
              <button
                onClick={() => { setShowTrial(true); setMobileOpen(false) }}
                className="w-full py-2.5 rounded-full text-sm font-semibold text-white"
                style={{ background: 'var(--orange)' }}
              >
                Try free
              </button>
            </div>
          </div>
        )}
      </nav>

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showTrial && <FreeTrialModal onClose={() => setShowTrial(false)} />}
    </>
  )
}
