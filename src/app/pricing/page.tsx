'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const CABINET_URL = 'https://cabinet-ten-lac.vercel.app'

// Переклади сторінки "Тарифи" — UA (RU/EN/DE додамо наступним кроком)
const PRICING_TEXT: Record<string, any> = {
  UA: {
    h1: 'Обери тариф під свою ситуацію',
    subtitle: 'Простий доступ до інструментів QLIXA — для найманих працівників, самозайнятих та бізнесу.',

    employee: {
      badge: 'Найманий працівник',
      desc: 'Для тих, хто працює за наймом і хоче зрозуміти можливе податкове повернення.',
      price: '19.90',
      currency: '€',
      period: '/ рік',
      periodNote: 'Одноразова оплата за тарифний період',
      features: [
        'Особистий кабінет',
        'Ведення витрат протягом року',
        'Категорії витрат',
        'Збереження чеків і підтверджувальних документів',
        'Професійне навчання, курси, робоче обладнання',
        'Інші потенційно релевантні витрати',
        'Персоналізований аналіз ситуації',
        'Орієнтовний розрахунок можливої суми повернення',
        'Підсумковий звіт',
        'Підказки та наступні кроки',
      ],
      disclaimer: 'QLIXA не гарантує конкретну суму повернення — лише аналіз твоєї ситуації та орієнтовний розрахунок.',
      cta: 'Обрати тариф',
    },

    selfEmployed: {
      badge: 'Самозайнятий',
      desc: 'Для тих, хто веде власну справу і хоче тримати фінанси в порядку.',
      currency: '€',
      monthlyPrice: '9.90',
      monthlyPeriod: '/ місяць',
      annualPrice: '89',
      annualPeriod: '/ рік',
      annualBadge: 'Вигідніше',
      toggleMonthly: 'Місячно',
      toggleAnnual: 'Річно',
      features: [
        'Особистий кабінет',
        'Доходи та витрати',
        'Клієнти та рахунки',
        'Склад і категорії',
        'Документи та чеки',
        'KPI та основні показники',
        'Прогнозні розрахунки',
        'Орієнтовний розрахунок можливого повернення',
        'Підготовка структурованих даних для річної звітності',
        'Звіти та історія даних',
        'Багатомовний інтерфейс',
      ],
      disclaimer: 'QLIXA допомагає організувати дані, зробити розрахунки та підготувати інформацію. Фінальне рішення, перевірка та подання — за тобою.',
      ctaMonthly: 'Обрати місячний',
      ctaAnnual: 'Обрати річний',
    },

    business: {
      badge: 'Бізнес',
      status: 'Скоро',
      desc: 'Інструменти QLIXA для компаній та команд — ми вже працюємо над ними.',
      cta: 'Дізнатися першими',
    },
  },
}

export default function PricingPage() {
  const [lang, setLang] = useState('UA')
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual')

  useEffect(() => {
    const updateLang = () => {
      const l = localStorage.getItem('qlixa-lang')
      if (l) setLang(l.toUpperCase())
    }
    updateLang()
    window.addEventListener('qlixa-lang-change', updateLang)
    return () => window.removeEventListener('qlixa-lang-change', updateLang)
  }, [])

  const t = PRICING_TEXT[lang] || PRICING_TEXT.UA

  return (
    <div style={{ minHeight: '100vh', background: '#F0F7F8' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: '#FFFFFF', padding: '72px clamp(20px,6vw,80px) 40px', textAlign: 'center' as const }}>
        <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(30px,3.4vw,46px)', fontWeight: 700, color: '#1A1A1A', marginBottom: 16, lineHeight: 1.15 }}>
          {t.h1}
        </h1>
        <p style={{ fontSize: 17, color: '#404040', maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>
          {t.subtitle}
        </p>
      </section>

      {/* Pricing cards */}
      <section style={{ background: '#FFFFFF', padding: '20px clamp(20px,6vw,80px) 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, alignItems: 'stretch' }}>

          {/* Card 1 — Employee */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, background: '#F0F7F8', borderRadius: 20, border: '1px solid rgba(3,131,144,0.10)', padding: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 12 }}>
              {t.employee.badge}
            </div>
            <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.6, marginBottom: 24, minHeight: 48 }}>
              {t.employee.desc}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 40, fontWeight: 700, color: '#1A1A1A' }}>{t.employee.currency}{t.employee.price}</span>
              <span style={{ fontSize: 15, color: '#595959' }}>{t.employee.period}</span>
            </div>
            <p style={{ fontSize: 13, color: '#9D9D9D', marginBottom: 24 }}>{t.employee.periodNote}</p>

            <a href={`${CABINET_URL}?plan=employee`} style={{
              display: 'block', textAlign: 'center' as const, padding: '13px 24px', background: '#038390', color: '#fff',
              borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 28,
            }}>
              {t.employee.cta}
            </a>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginBottom: 20, flex: 1 }}>
              {t.employee.features.map((f: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                  <span style={{ color: '#038390', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 13, color: '#9D9D9D', lineHeight: 1.6, borderTop: '1px solid #E6F4F5', paddingTop: 16 }}>
              {t.employee.disclaimer}
            </p>
          </div>

          {/* Card 2 — Self-employed */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, background: '#F0F7F8', borderRadius: 20, border: '2px solid #038390', padding: 32, position: 'relative' as const }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 12 }}>
              {t.selfEmployed.badge}
            </div>
            <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.6, marginBottom: 20, minHeight: 48 }}>
              {t.selfEmployed.desc}
            </p>

            {/* Billing toggle */}
            <div style={{ display: 'inline-flex', background: '#fff', borderRadius: 999, padding: 4, marginBottom: 20, border: '1px solid #E6F4F5', width: 'fit-content' }}>
              <button onClick={() => setBilling('monthly')} style={{
                padding: '7px 16px', borderRadius: 999, border: 'none', cursor: 'pointer',
                background: billing === 'monthly' ? '#038390' : 'transparent',
                color: billing === 'monthly' ? '#fff' : '#595959',
                fontSize: 14, fontWeight: 700, fontFamily: 'DM Sans, sans-serif',
              }}>
                {t.selfEmployed.toggleMonthly}
              </button>
              <button onClick={() => setBilling('annual')} style={{
                padding: '7px 16px', borderRadius: 999, border: 'none', cursor: 'pointer',
                background: billing === 'annual' ? '#038390' : 'transparent',
                color: billing === 'annual' ? '#fff' : '#595959',
                fontSize: 14, fontWeight: 700, fontFamily: 'DM Sans, sans-serif',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                {t.selfEmployed.toggleAnnual}
                <span style={{ fontSize: 10, fontWeight: 800, background: billing === 'annual' ? 'rgba(255,255,255,0.25)' : '#E6F4F5', color: billing === 'annual' ? '#fff' : '#038390', padding: '2px 7px', borderRadius: 999 }}>
                  {t.selfEmployed.annualBadge}
                </span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 24 }}>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 40, fontWeight: 700, color: '#1A1A1A' }}>
                {t.selfEmployed.currency}{billing === 'monthly' ? t.selfEmployed.monthlyPrice : t.selfEmployed.annualPrice}
              </span>
              <span style={{ fontSize: 15, color: '#595959' }}>
                {billing === 'monthly' ? t.selfEmployed.monthlyPeriod : t.selfEmployed.annualPeriod}
              </span>
            </div>

            <a href={`${CABINET_URL}?plan=self-employed&billing=${billing}`} style={{
              display: 'block', textAlign: 'center' as const, padding: '13px 24px', background: '#038390', color: '#fff',
              borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 28,
            }}>
              {billing === 'monthly' ? t.selfEmployed.ctaMonthly : t.selfEmployed.ctaAnnual}
            </a>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginBottom: 20, flex: 1 }}>
              {t.selfEmployed.features.map((f: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                  <span style={{ color: '#038390', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 13, color: '#9D9D9D', lineHeight: 1.6, borderTop: '1px solid #E6F4F5', paddingTop: 16 }}>
              {t.selfEmployed.disclaimer}
            </p>
          </div>

          {/* Card 3 — Business (Coming soon) */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, background: '#1A1A1A', borderRadius: 20, padding: 32, color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#fff' }}>
                {t.business.badge}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#1A1A1A', background: '#F5E642', padding: '3px 10px', borderRadius: 999 }}>
                {t.business.status}
              </span>
            </div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: 32, flex: 1 }}>
              {t.business.desc}
            </p>
            <a href="mailto:info@qlixa.eu?subject=Business%20plan" style={{
              display: 'block', textAlign: 'center' as const, padding: '13px 24px', background: '#038390', color: '#fff',
              borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: 'none',
            }}>
              {t.business.cta}
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
