'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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
  {
    tag: 'SVS',
    title: 'SVS contributions explained: how much will you actually pay?',
    desc: 'SVS is one of the biggest costs for solo entrepreneurs in Austria. Here is how it is calculated and when you pay.',
    date: 'Apr 2025',
    readTime: '6 min read',
    href: '/articles/svs-contributions',
  },
]

export default function ArticlesPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded"
            style={{ background: 'var(--peach-light)', color: 'var(--orange)' }}
          >
            Articles
          </div>
          <h1
            className="text-4xl"
            style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--charcoal)' }}
          >
            Guides & <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>resources</em>
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text2)' }}>
            Practical knowledge for foreigners running a business in Austria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {articles.map(art => (
            <a
              key={art.href}
              href={art.href}
              className="block bg-white rounded-qmd p-6 border group transition-shadow hover:shadow-md"
              style={{ border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}
            >
              <div
                className="inline-block text-xs font-bold px-2.5 py-1 rounded mb-3"
                style={{ background: 'var(--peach-light)', color: 'var(--orange)' }}
              >
                {art.tag}
              </div>
              <h2
                className="text-base font-semibold mb-2 group-hover:text-orange transition-colors"
                style={{ color: 'var(--charcoal)', lineHeight: 1.4 }}
              >
                {art.title}
              </h2>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text2)' }}>
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
