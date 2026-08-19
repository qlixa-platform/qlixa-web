'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const CABINET_URL = 'https://cabinet-ten-lac.vercel.app'

// Переклади сторінки "Тарифи" — UA / RU / EN / DE
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
        'Особистий кабінет', 'Витрати за рік', 'Категорії витрат', 'Збереження чеків',
        'Навчання й обладнання', 'Інші витрати', 'Аналіз ситуації', 'Розрахунок повернення',
        'Підсумковий звіт', 'Наступні кроки',
      ],
      disclaimer: 'QLIXA не гарантує конкретну суму повернення — лише аналіз твоєї ситуації та орієнтовний розрахунок.',
      cta: 'Обрати тариф',
    },

    selfEmployed: {
      badge: 'Самозайнятий',
      status: 'Скоро',
      desc: 'Для тих, хто веде власну справу і хоче тримати фінанси в порядку.',
      comingSoonText: 'Команда розробляє зручні інструменти для ведення бізнесу: облік доходів і витрат, клієнти та рахунки, KPI та звітність.',
      currency: '€',
      monthlyPrice: '9.90',
      monthlyPeriod: '/ місяць',
      annualPrice: '89',
      annualPeriod: '/ рік',
      annualBadge: 'Вигідніше',
      toggleMonthly: 'Місячно',
      toggleAnnual: 'Річно',
      ctaComingSoon: 'Дізнатися першими',
    },

    business: {
      badge: 'Бізнес',
      status: 'Скоро',
      desc: 'Спільні фінансові інструменти для команд.',
      comingSoonText: 'Ми вже працюємо над інструментами QLIXA для бізнесу — командний доступ, спільна звітність, керування співробітниками.',
      cta: 'Дізнатися першими',
    },
  },

  RU: {
    h1: 'Выбери тариф под свою ситуацию',
    subtitle: 'Простой доступ к инструментам QLIXA — для наёмных работников, самозанятых и бизнеса.',

    employee: {
      badge: 'Наёмный работник',
      desc: 'Для тех, кто работает по найму и хочет понять возможный налоговый возврат.',
      price: '19.90',
      currency: '€',
      period: '/ год',
      periodNote: 'Разовая оплата за тарифный период',
      features: [
        'Личный кабинет', 'Расходы за год', 'Категории расходов', 'Хранение чеков',
        'Обучение и оборудование', 'Другие расходы', 'Анализ ситуации', 'Расчёт возврата',
        'Итоговый отчёт', 'Следующие шаги',
      ],
      disclaimer: 'QLIXA не гарантирует конкретную сумму возврата — только анализ твоей ситуации и ориентировочный расчёт.',
      cta: 'Выбрать тариф',
    },

    selfEmployed: {
      badge: 'Самозанятый',
      status: 'Скоро',
      desc: 'Для тех, кто ведёт собственное дело и хочет держать финансы в порядке.',
      comingSoonText: 'Команда разрабатывает удобные инструменты для ведения бизнеса: учёт доходов и расходов, клиенты и счета, KPI и отчётность.',
      currency: '€',
      monthlyPrice: '9.90',
      monthlyPeriod: '/ месяц',
      annualPrice: '89',
      annualPeriod: '/ год',
      annualBadge: 'Выгоднее',
      toggleMonthly: 'Помесячно',
      toggleAnnual: 'Ежегодно',
      ctaComingSoon: 'Узнать первыми',
    },

    business: {
      badge: 'Бизнес',
      status: 'Скоро',
      desc: 'Общие финансовые инструменты для команд.',
      comingSoonText: 'Мы уже работаем над инструментами QLIXA для бизнеса — командный доступ, общая отчётность, управление сотрудниками.',
      cta: 'Узнать первыми',
    },
  },

  EN: {
    h1: 'Choose the plan that fits your situation',
    subtitle: 'Simple access to QLIXA tools — for employees, self-employed people, and businesses.',

    employee: {
      badge: 'Employee',
      desc: 'For people working as an employee who want to understand their possible tax refund.',
      price: '19.90',
      currency: '€',
      period: '/ year',
      periodNote: 'One-time payment for the plan period',
      features: [
        'Personal dashboard', 'Expenses for the year', 'Expense categories', 'Store your receipts',
        'Training & equipment', 'Other expenses', 'Situation analysis', 'Refund calculation',
        'Final report', 'Next steps',
      ],
      disclaimer: 'QLIXA does not guarantee a specific refund amount — only an analysis of your situation and an estimated calculation.',
      cta: 'Choose plan',
    },

    selfEmployed: {
      badge: 'Self-employed',
      status: 'Coming soon',
      desc: 'For people running their own business who want to keep their finances organized.',
      comingSoonText: 'Our team is building convenient tools for running your business: income and expense tracking, clients and invoices, KPIs and reporting.',
      currency: '€',
      monthlyPrice: '9.90',
      monthlyPeriod: '/ month',
      annualPrice: '89',
      annualPeriod: '/ year',
      annualBadge: 'Better value',
      toggleMonthly: 'Monthly',
      toggleAnnual: 'Annual',
      ctaComingSoon: 'Be the first to know',
    },

    business: {
      badge: 'Business',
      status: 'Coming soon',
      desc: 'Shared financial tools for teams.',
      comingSoonText: 'We are already working on QLIXA tools for business — team access, shared reporting, employee management.',
      cta: 'Be the first to know',
    },
  },

  DE: {
    h1: 'Wähle den Tarif für deine Situation',
    subtitle: 'Einfacher Zugang zu QLIXA-Tools — für Angestellte, Selbstständige und Unternehmen.',

    employee: {
      badge: 'Angestellte:r',
      desc: 'Für alle, die angestellt arbeiten und ihre mögliche Steuerrückerstattung verstehen möchten.',
      price: '19.90',
      currency: '€',
      period: '/ Jahr',
      periodNote: 'Einmalige Zahlung für den Tarifzeitraum',
      features: [
        'Persönliches Konto', 'Ausgaben im Jahr', 'Ausgabenkategorien', 'Belege speichern',
        'Weiterbildung & Ausstattung', 'Weitere Ausgaben', 'Analyse der Situation', 'Berechnung der Rückerstattung',
        'Abschlussbericht', 'Nächste Schritte',
      ],
      disclaimer: 'QLIXA garantiert keinen bestimmten Rückerstattungsbetrag — nur eine Analyse deiner Situation und eine Schätzung.',
      cta: 'Tarif wählen',
    },

    selfEmployed: {
      badge: 'Selbstständig',
      status: 'Demnächst',
      desc: 'Für alle, die ihr eigenes Unternehmen führen und ihre Finanzen im Griff behalten möchten.',
      comingSoonText: 'Unser Team entwickelt praktische Tools für die Unternehmensführung: Einnahmen- und Ausgabenverfolgung, Kunden und Rechnungen, KPIs und Berichte.',
      currency: '€',
      monthlyPrice: '9.90',
      monthlyPeriod: '/ Monat',
      annualPrice: '89',
      annualPeriod: '/ Jahr',
      annualBadge: 'Günstiger',
      toggleMonthly: 'Monatlich',
      toggleAnnual: 'Jährlich',
      ctaComingSoon: 'Als Erste:r erfahren',
    },

    business: {
      badge: 'Business',
      status: 'Demnächst',
      desc: 'Gemeinsame Finanz-Tools für Teams.',
      comingSoonText: 'Wir arbeiten bereits an QLIXA-Tools für Unternehmen — Team-Zugriff, gemeinsame Berichte, Mitarbeiterverwaltung.',
      cta: 'Als Erste:r erfahren',
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
      <section style={{ background: '#FFFFFF', padding: '40px clamp(20px,6vw,80px) 24px', textAlign: 'center' as const }}>
        <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.2vw,40px)', fontWeight: 700, color: '#1A1A1A', marginBottom: 10, lineHeight: 1.15 }}>
          {t.h1}
        </h1>
        <p style={{ fontSize: 16, color: '#404040', maxWidth: 600, margin: '0 auto', lineHeight: 1.5 }}>
          {t.subtitle}
        </p>
      </section>

      {/* Pricing cards — one shared grid, three columns, every row aligned across all three cards */}
      <section style={{ background: '#FFFFFF', padding: '24px clamp(20px,4vw,60px) 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr 0.62fr', gap: 20, alignItems: 'stretch' }}>

          {/* Card 1 — Employee (active, purchasable) */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, background: '#FFFFFF', borderRadius: 18, border: '1px solid #E6F4F5', padding: 26 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 10, minHeight: 15 }}>
              {t.employee.badge}
            </div>
            <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.5, marginBottom: 14, minHeight: 44 }}>
              {t.employee.desc}
            </p>
            <div data-row="toggle-slot" style={{ minHeight: 40, marginBottom: 12 }} />
            <div data-row="price" style={{ marginBottom: 4, minHeight: 44, display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 34, fontWeight: 700, color: '#1A1A1A' }}>{t.employee.currency}{t.employee.price}</span>
              <span style={{ fontSize: 15, color: '#595959', marginLeft: 6 }}>{t.employee.period}</span>
            </div>
            <p data-row="periodnote" style={{ fontSize: 12, color: '#9D9D9D', marginBottom: 16, minHeight: 15 }}>{t.employee.periodNote}</p>
            <a data-row="cta" href={`${CABINET_URL}?plan=employee`} style={{
              display: 'block', textAlign: 'center' as const, padding: '12px 22px', background: '#038390', color: '#fff',
              borderRadius: 11, fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 18,
            }}>
              {t.employee.cta}
            </a>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 12, rowGap: 10, flex: 1, alignContent: 'start' as const, marginBottom: 16 }}>
              {t.employee.features.map((f: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                  <span style={{ color: '#038390', fontWeight: 700, flexShrink: 0, fontSize: 14, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.35 }}>{f}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#9D9D9D', lineHeight: 1.45, borderTop: '1px solid #E6F4F5', paddingTop: 12 }}>
              {t.employee.disclaimer}
            </p>
          </div>

          {/* Card 2 — Self-employed (Coming soon — price/toggle visible, no purchase yet) */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, background: '#F0F7F8', borderRadius: 18, border: '2px solid #038390', padding: 26 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, minHeight: 15 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390' }}>
                {t.selfEmployed.badge}
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#026B76', background: '#F5E642', padding: '2px 8px', borderRadius: 999 }}>
                {t.selfEmployed.status}
              </span>
            </div>
            <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.5, marginBottom: 14, minHeight: 44 }}>
              {t.selfEmployed.desc}
            </p>
            <div data-row="toggle-slot" style={{ minHeight: 40, marginBottom: 12, display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'inline-flex', background: '#fff', borderRadius: 999, padding: 3, border: '1px solid #E6F4F5', width: 'fit-content' }}>
                <button onClick={() => setBilling('monthly')} style={{
                  padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  background: billing === 'monthly' ? '#038390' : 'transparent',
                  color: billing === 'monthly' ? '#fff' : '#595959',
                  fontSize: 14, fontWeight: 700, fontFamily: 'DM Sans, sans-serif',
                }}>
                  {t.selfEmployed.toggleMonthly}
                </button>
                <button onClick={() => setBilling('annual')} style={{
                  padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
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
            </div>
            <div data-row="price" style={{ marginBottom: 4, minHeight: 44, display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 34, fontWeight: 700, color: '#1A1A1A' }}>
                {t.selfEmployed.currency}{billing === 'monthly' ? t.selfEmployed.monthlyPrice : t.selfEmployed.annualPrice}
              </span>
              <span style={{ fontSize: 15, color: '#595959', marginLeft: 6 }}>
                {billing === 'monthly' ? t.selfEmployed.monthlyPeriod : t.selfEmployed.annualPeriod}
              </span>
            </div>
            <p data-row="periodnote" style={{ fontSize: 12, color: '#9D9D9D', marginBottom: 16, minHeight: 15 }}>&nbsp;</p>
            <a data-row="cta" href="mailto:info@qlixa.eu?subject=Self-employed%20plan" style={{
              display: 'block', textAlign: 'center' as const, padding: '12px 22px', background: '#038390', color: '#fff',
              borderRadius: 11, fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 18,
            }}>
              {t.selfEmployed.ctaComingSoon}
            </a>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start' as const }}>
              <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.55 }}>
                {t.selfEmployed.comingSoonText}
              </p>
            </div>
          </div>

          {/* Card 3 — Business (same row structure: badge, desc, empty toggle-slot, empty price, empty periodnote, cta — matches rows 1:1 with the other two cards) */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, background: '#E6F4F5', borderRadius: 18, padding: 26 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, minHeight: 15 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#026B76' }}>
                {t.business.badge}
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#026B76', background: '#F5E642', padding: '2px 8px', borderRadius: 999 }}>
                {t.business.status}
              </span>
            </div>
            <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.5, marginBottom: 14, minHeight: 44 }}>
              {t.business.desc}
            </p>
            <div data-row="toggle-slot" style={{ minHeight: 40, marginBottom: 12 }} />
            <div data-row="price" style={{ marginBottom: 4, minHeight: 56 }} />
            <p data-row="periodnote" style={{ fontSize: 12, marginBottom: 16, minHeight: 15 }}>&nbsp;</p>
            <a data-row="cta" href="mailto:info@qlixa.eu?subject=Business%20plan" style={{
              display: 'block', textAlign: 'center' as const, padding: '12px 22px', background: '#038390', color: '#fff',
              borderRadius: 11, fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 18,
            }}>
              {t.business.cta}
            </a>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start' as const }}>
              <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.55 }}>
                {t.business.comingSoonText}
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
