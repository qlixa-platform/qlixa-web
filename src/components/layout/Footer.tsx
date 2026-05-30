'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const faqs = [
  {
    q: 'Do I need to speak German to use QLIXA?',
    a: 'No! QLIXA is available in English, Ukrainian, Russian and German. All tax terms are explained in simple words — no jargon.',
  },
  {
    q: 'I just registered my Gewerbe. Can I start immediately?',
    a: 'Yes. You can start adding clients, creating invoices and tracking income from day one. QLIXA will guide you through the first steps.',
  },
  {
    q: 'Does QLIXA calculate taxes automatically?',
    a: 'Yes — USt (VAT), ESt (income tax) and SVS contributions are calculated automatically based on your income and expenses.',
  },
  {
    q: 'Is my data secure?',
    a: 'All data is stored securely in the EU (Austria/Germany). We use bank-level encryption and comply with GDPR.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. No contracts, no hidden fees. Cancel your subscription any time with one click.',
  },
  {
    q: 'What languages is the platform available in?',
    a: 'English, German (Deutsch), Ukrainian (Українська) and Russian (Русский). Switch language at any time in settings.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: 'var(--line)' }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-4 gap-4">
        <span className="text-sm font-medium" style={{ color: 'var(--charcoal)' }}>{q}</span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path d="M3 6l5 5 5-5" stroke="var(--text3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {open && (
        <div className="pb-4 text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
          {a}
        </div>
      )}
    </div>
  )
}

const socials = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@qlixa_eu',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="4" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M7 6.5l5 2.5-5 2.5V6.5z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/qlixa_eu/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="13" cy="5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61590172723729',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M10 16V9.5h2l.5-2H10V6.5c0-.6.3-1 1-1h1.5V4H11c-1.7 0-2.5 1-2.5 2.5V7.5H7v2h1.5V16H10z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/123154282',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M5.5 7.5V13M5.5 5.5v.01M8.5 13V10c0-1.1.9-2 2-2s2 .9 2 2v3M8.5 7.5V13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer>
      {/* FAQ Section */}
      <div style={{ background: 'var(--white)', borderTop: '1px solid var(--line)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded"
              style={{ background: 'var(--peach-light)', color: 'var(--orange)' }}
            >
              FAQ
            </div>
            <h2
              className="text-3xl"
              style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--charcoal)' }}
            >
              Frequently asked <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>questions</em>
            </h2>
          </div>
          <div>
            {faqs.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: 'var(--charcoal)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

            {/* Brand col */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8">
                  <Image src="/logos/logo-white.svg" alt="QLIXA" width={32} height={32} className="w-full h-full"/>
                </div>
                <span
                  className="text-lg tracking-wide text-white"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>Q</em>LIXA
                </span>
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Reports in one click.<br/>
                Smart accounting for foreigners in Austria.
              </p>
              <div className="flex items-center gap-3">
                {socials.map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    title={s.name}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--orange)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Products
              </div>
              <div className="space-y-2.5">
                {['Templates', 'Guides', 'Calculators', 'Dashboards', 'Pricing'].map(item => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="block text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'white'}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Company
              </div>
              <div className="space-y-2.5">
                {['About', 'Blog', 'Contact'].map(item => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="block text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'white'}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Contact
              </div>
              <a
                href="mailto:info@qlixa.eu"
                className="block text-sm transition-colors"
                style={{ color: 'rgba(255,255,255,0.55)' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--orange)'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}
              >
                info@qlixa.eu
              </a>
              <div className="mt-4 space-y-2">
                {['Privacy', 'Terms', 'Impressum'].map(item => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="block text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'white'}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.25)' }}
          >
            <span>© 2025 QLIXA · info@qlixa.eu</span>
            <span>Made with ♥ in Austria 🇦🇹</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
