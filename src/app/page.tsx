'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Placeholder article cards — replace with real data later
const articles = [
  {
    tag: 'Getting Started',
    title: 'How to register your Gewerbe in Austria as a foreigner',
    desc: 'A complete step-by-step guide to Gewerbeanmeldung — what documents you need, how much it costs and how long it takes.',
    date: 'Jan 2025',
    readTime: '7 min read',
    href: '/articles/gewerbeanmeldung',
  },
  {
    tag: 'Taxes',
    title: 'Understanding USt (VAT) for small businesses in Austria',
    desc: 'When do you need to charge VAT? What is the Kleinunternehmerregelung? All your USt questions answered simply.',
    date: 'Feb 2025',
    readTime: '5 min read',
    href: '/articles/ust-vat',
  },
  {
    tag: 'Invoicing',
    title: 'What must be on an Austrian invoice? The complete checklist',
    desc: 'Missing one field can invalidate your invoice. Here is exactly what Austrian law requires you to include.',
    date: 'Mar 2025',
    readTime: '4 min read',
    href: '/articles/invoice-checklist',
  },
]

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

      {/* Hero */}
      <section
        className="py-20 px-4"
        style={{ background: 'var(--charcoal)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6 px-4 py-1.5 rounded-full border"
            style={{ color: 'var(--peach)', borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)' }}
          >
            Smart accounting for Austria
          </div>
          <h1
            className="text-5xl sm:text-6xl leading-tight mb-6"
            style={{ fontFamily: 'DM Serif Display, serif', color: 'white' }}
          >
            Reports in <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>one click.</em>
          </h1>
          <p className="text-base max-w-xl mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
            The simplest accounting platform for foreigners in Austria. Invoices, taxes, reports — all in your language.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="px-7 py-3 rounded-full text-sm font-semibold text-white transition-colors"
              style={{ background: 'var(--orange)' }}
              onMouseEnter={e => (e.target as HTMLElement).style.background = 'var(--orange2)'}
              onMouseLeave={e => (e.target as HTMLElement).style.background = 'var(--orange)'}
            >
              Try free — no credit card
            </button>
            <button
              className="px-7 py-3 rounded-full text-sm font-semibold border transition-colors"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.25)' }}
              onMouseEnter={e => {
                const el = e.target as HTMLElement
                el.style.borderColor = 'var(--orange)'
                el.style.color = 'var(--orange)'
              }}
              onMouseLeave={e => {
                const el = e.target as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.25)'
                el.style.color = 'white'
              }}
            >
              See how it works →
            </button>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-2xl"
            style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--charcoal)' }}
          >
            Latest <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>articles</em>
          </h2>
          <a
            href="/articles"
            className="text-sm font-medium transition-colors"
            style={{ color: 'var(--orange)' }}
          >
            View all →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {articles.map(art => (
            <a
              key={art.href}
              href={art.href}
              className="block bg-white rounded-qmd p-6 border transition-shadow hover:shadow-md group"
              style={{ border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}
            >
              <div
                className="inline-block text-xs font-bold px-2.5 py-1 rounded mb-3"
                style={{ background: 'var(--peach-light)', color: 'var(--orange)' }}
              >
                {art.tag}
              </div>
              <h3
                className="text-base font-semibold mb-2 group-hover:text-orange transition-colors"
                style={{ color: 'var(--charcoal)', lineHeight: 1.4 }}
              >
                {art.title}
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text2)', lineHeight: 1.6 }}>
                {art.desc}
              </p>
              <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text3)' }}>
                <span>{art.date}</span>
                <span>·</span>
                <span>{art.readTime}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
