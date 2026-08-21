'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const CABINET_URL = 'https://cabinet-ten-lac.vercel.app/login'

// Переклади сторінки "Тарифи" — UA / RU / EN / DE
const PRICING_TEXT: Record<string, any> = {
  UA: {
    h1: 'Обери тариф під свою ситуацію',
    subtitle: 'Простий доступ до інструментів QLIXA — для найманих працівників, самозайнятих та бізнесу.',

    employee: {
      badge: 'Найманий працівник',
      desc: 'Для тих, хто працює за наймом в Австрії та хоче самостійно розібратися зі своїм податковим поверненням.',
      price: '19.90',
      currency: '€',
      period: '/ рік',
      periodNote: 'Разова оплата за тарифний період',
      featurePairs: [
        ['Особистий кабінет', 'Журнал інших доходів'],
        ['Журнал витрат за категоріями', 'Панель аналізу вашої ситуації'],
        ['Журнал поїздок', null],
      ],
      resultTitle: '★ 1× Розрахунок можливого повернення + генерація декларації',
      resultNote: 'Потрібна декларація за попередній рік? Додаткові генерації можна придбати окремо.',
      validUntil: 'Доступ до 30 червня наступного року',
      validNote: 'Заповнюйте все одразу або додавайте дані протягом року.',
      howItWorksLabel: 'Як це працює?',
      howItWorksTitle: 'Як це працює?',
      howItWorksSteps: [
        { title: 'Збирайте дані', desc: 'Заповнюйте інформацію про доходи, витрати, навчання, обладнання, поїздки та інші обставини протягом року в журналах особистого кабінету.' },
        { title: 'Заповніть спеціальну анкету QLIXA', desc: 'QLIXA аналізує введені дані та допомагає визначити, які категорії можуть бути важливими саме у вашій ситуації.' },
        { title: 'Отримайте результат', desc: 'Після перевірки даних можна виконати орієнтовний розрахунок можливого повернення та сформувати податкову декларацію. Остаточне рішення приймає Finanzamt.' },
      ],
      howItWorksFooter: 'Можна зробити все одразу або вести дані протягом року — як вам зручно.',
      disclaimer: 'QLIXA не гарантує конкретну суму повернення. Результат залежить від вашої індивідуальної ситуації та остаточного рішення Finanzamt.',
      cta: 'Обрати тариф',
    },

    selfEmployed: {
      badge: 'Самозайнятий',
      status: 'Скоро',
      desc: 'Для тих, хто веде власну справу і хоче тримати фінанси в порядку.',
      currency: '€',
      monthlyPrice: '9.90',
      monthlyPeriod: '/ місяць',
      annualPrice: '89',
      annualPeriod: '/ рік',
      annualBadge: 'Вигідніше',
      toggleMonthly: 'Місячно',
      toggleAnnual: 'Річно',
      periodNote: 'Оплата за обраний період',
      comingSoonText: 'Команда розробляє зручні інструменти для ведення бізнесу: облік доходів і витрат, клієнти та рахунки, KPI та звітність.',
      ctaComingSoon: 'Дізнатися першими',
    },

    business: {
      badge: 'Бізнес',
      status: 'Скоро',
      desc: 'Для компаній та команд, яким потрібні спільні фінансові інструменти.',
      comingSoonText: 'Ми вже працюємо над інструментами QLIXA для бізнесу — командний доступ, спільна звітність, керування співробітниками.',
      cta: 'Дізнатися першими',
    },
  },

  RU: {
    h1: 'Выбери тариф под свою ситуацию',
    subtitle: 'Простой доступ к инструментам QLIXA — для наёмных работников, самозанятых и бизнеса.',

    employee: {
      badge: 'Наёмный работник',
      desc: 'Для тех, кто работает по найму в Австрии и хочет самостоятельно разобраться со своим налоговым возвратом.',
      price: '19.90',
      currency: '€',
      period: '/ год',
      periodNote: 'Разовая оплата за тарифный период',
      featurePairs: [
        ['Личный кабинет', 'Журнал других доходов'],
        ['Журнал расходов по категориям', 'Панель анализа вашей ситуации'],
        ['Журнал поездок', null],
      ],
      resultTitle: '★ 1× Расчёт возможного возврата + генерация декларации',
      resultNote: 'Нужна декларация за прошлый год? Дополнительные генерации можно приобрести отдельно.',
      validUntil: 'Доступ до 30 июня следующего года',
      validNote: 'Заполняйте всё сразу или добавляйте данные в течение года.',
      howItWorksLabel: 'Как это работает?',
      howItWorksTitle: 'Как это работает?',
      howItWorksSteps: [
        { title: 'Собирайте данные', desc: 'Заполняйте информацию о доходах, расходах, обучении, оборудовании, поездках и других обстоятельствах в течение года в журналах личного кабинета.' },
        { title: 'Заполните специальную анкету QLIXA', desc: 'QLIXA анализирует введённые данные и помогает определить, какие категории могут быть важны именно в вашей ситуации.' },
        { title: 'Получите результат', desc: 'После проверки данных можно выполнить ориентировочный расчёт возможного возврата и сформировать налоговую декларацию. Окончательное решение принимает Finanzamt.' },
      ],
      howItWorksFooter: 'Можно сделать всё сразу или вести данные в течение года — как вам удобно.',
      disclaimer: 'QLIXA не гарантирует конкретную сумму возврата. Результат зависит от вашей индивидуальной ситуации и окончательного решения Finanzamt.',
      cta: 'Выбрать тариф',
    },

    selfEmployed: {
      badge: 'Самозанятый',
      status: 'Скоро',
      desc: 'Для тех, кто ведёт собственное дело и хочет держать финансы в порядке.',
      currency: '€',
      monthlyPrice: '9.90',
      monthlyPeriod: '/ месяц',
      annualPrice: '89',
      annualPeriod: '/ год',
      annualBadge: 'Выгоднее',
      toggleMonthly: 'Помесячно',
      toggleAnnual: 'Ежегодно',
      periodNote: 'Оплата за выбранный период',
      comingSoonText: 'Команда разрабатывает удобные инструменты для ведения бизнеса: учёт доходов и расходов, клиенты и счета, KPI и отчётность.',
      ctaComingSoon: 'Узнать первыми',
    },

    business: {
      badge: 'Бизнес',
      status: 'Скоро',
      desc: 'Для компаний и команд, которым нужны общие финансовые инструменты.',
      comingSoonText: 'Мы уже работаем над инструментами QLIXA для бизнеса — командный доступ, общая отчётность, управление сотрудниками.',
      cta: 'Узнать первыми',
    },
  },

  EN: {
    h1: 'Choose the plan that fits your situation',
    subtitle: 'Simple access to QLIXA tools — for employees, self-employed people, and businesses.',

    employee: {
      badge: 'Employee',
      desc: 'For people working as an employee in Austria who want to sort out their tax refund themselves.',
      price: '19.90',
      currency: '€',
      period: '/ year',
      periodNote: 'One-time payment for the plan period',
      featurePairs: [
        ['Personal dashboard', 'Other income log'],
        ['Expense log by category', 'Situation analysis panel'],
        ['Travel log', null],
      ],
      resultTitle: '★ 1× Refund calculation + tax return generation',
      resultNote: 'Need a return for a previous year? Extra generations can be purchased separately.',
      validUntil: 'Access until June 30 of the following year',
      validNote: 'Fill it in all at once, or add data throughout the year.',
      howItWorksLabel: 'How does it work?',
      howItWorksTitle: 'How does it work?',
      howItWorksSteps: [
        { title: 'Collect your data', desc: 'Enter information about income, expenses, training, equipment, trips and other circumstances throughout the year in the dashboard logs.' },
        { title: 'Fill out the QLIXA questionnaire', desc: 'QLIXA analyzes the data you entered and helps identify which categories may matter for your specific situation.' },
        { title: 'Get your result', desc: 'After checking your data, you can run an estimated refund calculation and generate a tax return. The final decision is made by the Finanzamt.' },
      ],
      howItWorksFooter: 'You can do it all at once or add data throughout the year — whatever works for you.',
      disclaimer: 'QLIXA does not guarantee a specific refund amount. The result depends on your individual situation and the Finanzamt\u2019s final decision.',
      cta: 'Choose plan',
    },

    selfEmployed: {
      badge: 'Self-employed',
      status: 'Coming soon',
      desc: 'For people running their own business who want to keep their finances organized.',
      currency: '€',
      monthlyPrice: '9.90',
      monthlyPeriod: '/ month',
      annualPrice: '89',
      annualPeriod: '/ year',
      annualBadge: 'Better value',
      toggleMonthly: 'Monthly',
      toggleAnnual: 'Annual',
      periodNote: 'Payment for the chosen period',
      comingSoonText: 'Our team is building convenient tools for running your business: income and expense tracking, clients and invoices, KPIs and reporting.',
      ctaComingSoon: 'Be the first to know',
    },

    business: {
      badge: 'Business',
      status: 'Coming soon',
      desc: 'For companies and teams who need shared financial tools.',
      comingSoonText: 'We are already working on QLIXA tools for business — team access, shared reporting, employee management.',
      cta: 'Be the first to know',
    },
  },

  DE: {
    h1: 'Wähle den Tarif für deine Situation',
    subtitle: 'Einfacher Zugang zu QLIXA-Tools — für Angestellte, Selbstständige und Unternehmen.',

    employee: {
      badge: 'Angestellte:r',
      desc: 'Für alle, die in Österreich angestellt arbeiten und ihre Steuerrückerstattung selbst in die Hand nehmen möchten.',
      price: '19.90',
      currency: '€',
      period: '/ Jahr',
      periodNote: 'Einmalige Zahlung für den Tarifzeitraum',
      featurePairs: [
        ['Persönliches Konto', 'Journal für sonstige Einkünfte'],
        ['Ausgaben-Journal nach Kategorien', 'Analyse-Panel deiner Situation'],
        ['Reise-Journal', null],
      ],
      resultTitle: '★ 1× Berechnung der Rückerstattung + Erstellung der Steuererklärung',
      resultNote: 'Brauchst du eine Erklärung für ein Vorjahr? Zusätzliche Erstellungen kannst du separat dazukaufen.',
      validUntil: 'Zugang bis 30. Juni des Folgejahres',
      validNote: 'Alles auf einmal ausfüllen oder Daten übers Jahr verteilt ergänzen.',
      howItWorksLabel: 'Wie funktioniert das?',
      howItWorksTitle: 'Wie funktioniert das?',
      howItWorksSteps: [
        { title: 'Daten sammeln', desc: 'Trage Informationen zu Einkommen, Ausgaben, Weiterbildung, Ausstattung, Reisen und anderen Umständen im Laufe des Jahres in den Journalen deines Kontos ein.' },
        { title: 'QLIXA-Fragebogen ausfüllen', desc: 'QLIXA analysiert die eingegebenen Daten und hilft zu erkennen, welche Kategorien für deine Situation relevant sein könnten.' },
        { title: 'Ergebnis erhalten', desc: 'Nach der Datenprüfung kannst du eine geschätzte Rückerstattung berechnen und eine Steuererklärung erstellen. Die endgültige Entscheidung trifft das Finanzamt.' },
      ],
      howItWorksFooter: 'Du kannst alles auf einmal erledigen oder die Daten übers Jahr verteilt eintragen — ganz wie es dir passt.',
      disclaimer: 'QLIXA garantiert keinen bestimmten Rückerstattungsbetrag. Das Ergebnis hängt von deiner individuellen Situation und der endgültigen Entscheidung des Finanzamts ab.',
      cta: 'Tarif wählen',
    },

    selfEmployed: {
      badge: 'Selbstständig',
      status: 'Demnächst',
      desc: 'Für alle, die ihr eigenes Unternehmen führen und ihre Finanzen im Griff behalten möchten.',
      currency: '€',
      monthlyPrice: '9.90',
      monthlyPeriod: '/ Monat',
      annualPrice: '89',
      annualPeriod: '/ Jahr',
      annualBadge: 'Günstiger',
      toggleMonthly: 'Monatlich',
      toggleAnnual: 'Jährlich',
      periodNote: 'Zahlung für den gewählten Zeitraum',
      comingSoonText: 'Unser Team entwickelt praktische Tools für die Unternehmensführung: Einnahmen- und Ausgabenverfolgung, Kunden und Rechnungen, KPIs und Berichte.',
      ctaComingSoon: 'Als Erste:r erfahren',
    },

    business: {
      badge: 'Business',
      status: 'Demnächst',
      desc: 'Für Unternehmen und Teams, die gemeinsame Finanz-Tools benötigen.',
      comingSoonText: 'Wir arbeiten bereits an QLIXA-Tools für Unternehmen — Team-Zugriff, gemeinsame Berichte, Mitarbeiterverwaltung.',
      cta: 'Als Erste:r erfahren',
    },
  },
}

export default function PricingPage() {
  const [lang, setLang] = useState('UA')
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual')
  const [showHowItWorks, setShowHowItWorks] = useState(false)

  useEffect(() => {
    const updateLang = () => {
      const l = localStorage.getItem('qlixa-lang')
      if (l) setLang(l.toUpperCase())
    }
    updateLang()
    window.addEventListener('qlixa-lang-change', updateLang)
    return () => window.removeEventListener('qlixa-lang-change', updateLang)
  }, [])

  const langData = PRICING_TEXT[lang] || PRICING_TEXT.UA
  const t = { ...langData, employee: { ...PRICING_TEXT.UA.employee, ...langData.employee } }

  // Shared row styles — used identically across all 3 cards so badge/price/button always line up
  const rowBadge: React.CSSProperties = { fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: 10, minHeight: 15, display: 'flex', alignItems: 'center', gap: 8 }
  const rowDesc: React.CSSProperties = { fontSize: 15, lineHeight: 1.5, marginBottom: 18, minHeight: 68 }
  const rowPrice: React.CSSProperties = { marginBottom: 2, minHeight: 56, display: 'flex', alignItems: 'baseline' }
  const rowPeriodNote: React.CSSProperties = { fontSize: 12, color: '#9D9D9D', marginBottom: 18, minHeight: 40 }
  const rowCta: React.CSSProperties = { display: 'block', textAlign: 'center' as const, padding: '12px 22px', borderRadius: 11, fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 20 }

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

      {/* Pricing cards — all 3 use the exact same row structure/sizes, so badge/price/button always align */}
      <section style={{ background: '#FFFFFF', padding: '24px clamp(20px,4vw,60px) 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'stretch' }}>

          {/* Card 1 — Employee */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, background: '#FFFFFF', borderRadius: 18, border: '1px solid #E6F4F5', padding: 26, position: 'relative' as const }}>
            <div style={{ ...rowBadge, color: '#038390' }}>{t.employee.badge}</div>
            <p style={{ ...rowDesc, color: '#404040' }}>{t.employee.desc}</p>

            <div style={rowPrice}>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 34, fontWeight: 700, color: '#1A1A1A' }}>{t.employee.currency}{t.employee.price}</span>
              <span style={{ fontSize: 15, color: '#595959', marginLeft: 6 }}>{t.employee.period}</span>
            </div>
            <p style={rowPeriodNote}>{t.employee.periodNote}</p>

            <a href={`${CABINET_URL}?plan=employee`} style={{ ...rowCta, background: '#038390', color: '#fff' }}>
              {t.employee.cta}
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 12, rowGap: 10, marginBottom: 18 }}>
              {t.employee.featurePairs.map((pair: [string, string | null], i: number) => (
                <React.Fragment key={i}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    <span style={{ color: '#038390', fontWeight: 700, flexShrink: 0, fontSize: 14, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.35 }}>{pair[0]}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    {pair[1] && (
                      <>
                        <span style={{ color: '#038390', fontWeight: 700, flexShrink: 0, fontSize: 14, marginTop: 1 }}>✓</span>
                        <span style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.35 }}>{pair[1]}</span>
                      </>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #E6F4F5', paddingTop: 16, marginBottom: 16 }}>
              <div style={{ background: '#F0F7F8', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.4, marginBottom: 4 }}>{t.employee.resultTitle}</div>
                <div style={{ fontSize: 12, color: '#9D9D9D', lineHeight: 1.4 }}>{t.employee.resultNote}</div>
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 3 }}>{t.employee.validUntil}</div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.4 }}>{t.employee.validNote}</div>
            </div>

            <div
              style={{ position: 'relative' as const, display: 'inline-block', marginBottom: 14 }}
              onMouseEnter={() => setShowHowItWorks(true)}
              onMouseLeave={() => setShowHowItWorks(false)}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, color: '#038390', cursor: 'default' }}>
                <span style={{ width: 15, height: 15, borderRadius: '50%', border: '1.5px solid #038390', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>i</span>
                {t.employee.howItWorksLabel}
              </div>

              {showHowItWorks && (
                <div style={{
                  position: 'absolute' as const, bottom: '100%', left: 0, marginBottom: 8, width: 620, zIndex: 10,
                  background: '#FFFFFF', border: '1px solid #E6F4F5', borderRadius: 14, boxShadow: '0 12px 32px rgba(3,131,144,0.18)', padding: 18,
                }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>{t.employee.howItWorksTitle}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 12 }}>
                    {t.employee.howItWorksSteps.map((step: { title: string; desc: string }, i: number) => (
                      <div key={i}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#038390', marginBottom: 4 }}>{i + 1}. {step.title}</div>
                        <div style={{ fontSize: 12, color: '#404040', lineHeight: 1.45 }}>{step.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: '#9D9D9D', lineHeight: 1.4, borderTop: '1px solid #E6F4F5', paddingTop: 10 }}>
                    {t.employee.howItWorksFooter}
                  </div>
                </div>
              )}
            </div>

            <p style={{ fontSize: 11, color: '#9D9D9D', lineHeight: 1.4 }}>
              {t.employee.disclaimer}
            </p>
          </div>

          {/* Card 2 — Self-employed (Coming soon, price/toggle visible) — mirrors Employee's row structure exactly */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, background: '#F0F7F8', borderRadius: 18, border: '2px solid #038390', padding: 26 }}>
            <div style={{ ...rowBadge, color: '#038390' }}>
              {t.selfEmployed.badge}
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#026B76', background: '#F5E642', padding: '2px 8px', borderRadius: 999 }}>{t.selfEmployed.status}</span>
            </div>
            <p style={{ ...rowDesc, color: '#404040' }}>{t.selfEmployed.desc}</p>

            <div style={rowPrice}>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 34, fontWeight: 700, color: '#1A1A1A' }}>
                {t.selfEmployed.currency}{billing === 'monthly' ? t.selfEmployed.monthlyPrice : t.selfEmployed.annualPrice}
              </span>
              <span style={{ fontSize: 15, color: '#595959', marginLeft: 6 }}>
                {billing === 'monthly' ? t.selfEmployed.monthlyPeriod : t.selfEmployed.annualPeriod}
              </span>
            </div>
            <div style={rowPeriodNote}>
              <div style={{ display: 'inline-flex', background: '#fff', borderRadius: 999, padding: 3, border: '1px solid #E6F4F5' }}>
                <button onClick={() => setBilling('monthly')} style={{
                  padding: '5px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  background: billing === 'monthly' ? '#038390' : 'transparent',
                  color: billing === 'monthly' ? '#fff' : '#595959',
                  fontSize: 12, fontWeight: 700, fontFamily: 'DM Sans, sans-serif',
                }}>
                  {t.selfEmployed.toggleMonthly}
                </button>
                <button onClick={() => setBilling('annual')} style={{
                  padding: '5px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  background: billing === 'annual' ? '#038390' : 'transparent',
                  color: billing === 'annual' ? '#fff' : '#595959',
                  fontSize: 12, fontWeight: 700, fontFamily: 'DM Sans, sans-serif',
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                }}>
                  {t.selfEmployed.toggleAnnual}
                  <span style={{ fontSize: 9, fontWeight: 800, background: billing === 'annual' ? 'rgba(255,255,255,0.25)' : '#E6F4F5', color: billing === 'annual' ? '#fff' : '#038390', padding: '1px 6px', borderRadius: 999 }}>
                    {t.selfEmployed.annualBadge}
                  </span>
                </button>
              </div>
            </div>

            <a href="mailto:info@qlixa.eu?subject=Self-employed%20plan" style={{ ...rowCta, background: '#038390', color: '#fff' }}>
              {t.selfEmployed.ctaComingSoon}
            </a>

            <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.55 }}>
              {t.selfEmployed.comingSoonText}
            </p>
          </div>

          {/* Card 3 — Business (Coming soon, no price) — mirrors Employee's row structure with empty spacers where price/period would be */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, background: '#E6F4F5', borderRadius: 18, padding: 26 }}>
            <div style={{ ...rowBadge, color: '#026B76' }}>
              {t.business.badge}
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#026B76', background: '#F5E642', padding: '2px 8px', borderRadius: 999 }}>{t.business.status}</span>
            </div>
            <p style={{ ...rowDesc, color: '#1A1A1A' }}>{t.business.desc}</p>

            <div style={rowPrice} />
            <div style={rowPeriodNote} />

            <a href="mailto:info@qlixa.eu?subject=Business%20plan" style={{ ...rowCta, background: '#038390', color: '#fff' }}>
              {t.business.cta}
            </a>

            <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.55 }}>
              {t.business.comingSoonText}
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
