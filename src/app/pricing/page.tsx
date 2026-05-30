'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const plans = [
  {
    name: 'Starter',
    price: '0',
    period: 'free forever',
    desc: 'Perfect for exploring QLIXA and getting your business set up.',
    features: [
      'Up to 5 invoices/month',
      'Basic income tracking',
      'Guides & articles access',
      'Email support',
    ],
    cta: 'Get started free',
    featured: false,
  },
  {
    name: 'Pro',
    price: '19',
    period: 'per month',
    desc: 'Everything you need to run your business and file taxes in Austria.',
    features: [
      'Unlimited invoices',
      'Automated USt / ESt / SVS',
      'E/A Rechnung (income & expenses)',
      'One-click reports',
      'Multi-language (EN / DE / UA / RU)',
      'Priority support',
    ],
    cta: 'Start 14-day trial',
    featured: true,
  },
  {
    name: 'Business',
    price: '39',
    period: 'per month',
    desc: 'For growing teams and businesses with multiple employees.',
    features: [
      'Everything in Pro',
      'Up to 5 team members',
      'Client portal',
      'API access',
      'Dedicated account manager',
    ],
    cta: 'Contact us',
    featured: false,
  },
]

export default function PricingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded"
            style={{ background: 'var(--peach-light)', color: 'var(--orange)' }}
          >
            Pricing
          </div>
          <h1
            className="text-4xl mb-3"
            style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--charcoal)' }}
          >
            Simple, transparent <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>pricing</em>
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text2)' }}>
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map(plan => (
            <div
              key={plan.name}
              className="bg-white rounded-qmd p-6 border"
              style={{
                border: plan.featured ? '2px solid var(--orange)' : '1px solid var(--line)',
                boxShadow: plan.featured ? 'var(--shadow2)' : 'var(--shadow)',
                position: 'relative',
              }}
            >
              {plan.featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ background: 'var(--orange)' }}
                >
                  Most popular
                </div>
              )}

              <div className="mb-5">
                <div className="text-sm font-semibold mb-1" style={{ color: 'var(--charcoal)' }}>
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    className="text-4xl font-bold"
                    style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--charcoal)' }}
                  >
                    €{plan.price}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text3)' }}>/ {plan.period}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mt-0.5 flex-shrink-0">
                      <circle cx="7.5" cy="7.5" r="7.5" fill={plan.featured ? 'var(--orange)' : 'var(--success-bg)'}/>
                      <path d="M4.5 7.5l2 2 4-4" stroke={plan.featured ? 'white' : 'var(--success)'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--text)' }}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-2.5 rounded-full text-sm font-semibold transition-colors"
                style={{
                  background: plan.featured ? 'var(--orange)' : 'transparent',
                  color: plan.featured ? 'white' : 'var(--orange)',
                  border: plan.featured ? 'none' : '2px solid var(--orange)',
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
