'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import NotifyMeButton from '@/components/NotifyMeButton'

const CABINET_URL = 'https://cabinet-ten-lac.vercel.app/login'

// Переклади сторінки "Продукти QLIXA" — UA / RU / EN / DE
const PRICING_TEXT: Record<string, any> = {
  UA: {
    h1: 'Обери свій продукт QLIXA',
    subtitle: 'Просто відповідай на питання — QLIXA допоможе підготувати твою податкову декларацію в Австрії.',

    taxReturn: {
      badge: 'QLIXA Tax Return',
      desc: 'Для тих, хто хоче самостійно підготувати податкову декларацію в Австрії — незалежно від того, працюєш ти за наймом, самозайнятий чи маєш кілька джерел доходу.',
      price: '19.90',
      currency: '€',
      period: '/ рік',
      periodNote: 'Разова оплата за тарифний період',
      features: [
        'Особистий кабінет',
        'Персональна автоматизована анкета QLIXA',
        'Аналіз твоєї ситуації',
        'Перевірка можливих категорій списань',
        'Попередній розрахунок можливого повернення',
        'Повністю заповнена податкова декларація',
        'Підготовка для подання через FinanzOnline',
      ],
      highlightTitle: '★ Анкета QLIXA детально розбирає саме твою ситуацію',
      highlightText: 'Ти просто відповідаєш на зрозумілі питання. QLIXA аналізує відповіді, перевіряє можливі категорії списань, показує попередній розрахунок та готує повністю заповнену декларацію.',
      validUntil: 'Доступ до 30 червня наступного року',
      validNote: 'Пройди анкету одразу або повертайся до неї частинами — як тобі зручно.',
      howItWorksLabel: 'Як це працює?',
      howItWorksTitle: 'Як це працює?',
      howItWorksSteps: [
        { title: 'Відповідай на питання', desc: 'Персональна анкета QLIXA ставить зрозумілі питання про твою ситуацію: роботу, доходи, витрати та інші обставини.' },
        { title: 'QLIXA аналізує відповіді', desc: 'Система перевіряє можливі категорії списань саме для твоєї ситуації та робить попередній розрахунок можливого повернення.' },
        { title: 'Отримай декларацію', desc: 'QLIXA готує повністю заповнену податкову декларацію для перевірки та подання через FinanzOnline. Остаточне рішення приймає Finanzamt.' },
      ],
      howItWorksFooter: 'Можна пройти анкету за один раз або повертатися до неї частинами — як тобі зручно.',
      disclaimer: 'QLIXA не гарантує конкретну суму повернення. Результат залежить від твоєї індивідуальної ситуації та остаточного рішення Finanzamt.',
      cta: 'Підготувати декларацію →',
    },

    business: {
      badge: 'QLIXA Business',
      status: 'Скоро',
      desc: 'Для GmbH та бізнесу, яким потрібні окремі інструменти для управління бізнесом.',
      cta: 'Дізнатися першими',
    },
  },

  RU: {
    h1: 'Выбери свой продукт QLIXA',
    subtitle: 'Просто отвечай на вопросы — QLIXA поможет подготовить твою налоговую декларацию в Австрии.',

    taxReturn: {
      badge: 'QLIXA Tax Return',
      desc: 'Для тех, кто хочет самостоятельно подготовить налоговую декларацию в Австрии — независимо от того, работаешь ты по найму, самозанятый или имеешь несколько источников дохода.',
      price: '19.90',
      currency: '€',
      period: '/ год',
      periodNote: 'Разовая оплата за тарифный период',
      features: [
        'Личный кабинет',
        'Персональная автоматизированная анкета QLIXA',
        'Анализ твоей ситуации',
        'Проверка возможных категорий списаний',
        'Предварительный расчёт возможного возврата',
        'Полностью заполненная налоговая декларация',
        'Подготовка к подаче через FinanzOnline',
      ],
      highlightTitle: '★ Анкета QLIXA детально разбирает именно твою ситуацию',
      highlightText: 'Ты просто отвечаешь на понятные вопросы. QLIXA анализирует ответы, проверяет возможные категории списаний, показывает предварительный расчёт и готовит полностью заполненную декларацию.',
      validUntil: 'Доступ до 30 июня следующего года',
      validNote: 'Пройди анкету сразу или возвращайся к ней частями — как тебе удобно.',
      howItWorksLabel: 'Как это работает?',
      howItWorksTitle: 'Как это работает?',
      howItWorksSteps: [
        { title: 'Отвечай на вопросы', desc: 'Персональная анкета QLIXA задаёт понятные вопросы о твоей ситуации: работа, доходы, расходы и другие обстоятельства.' },
        { title: 'QLIXA анализирует ответы', desc: 'Система проверяет возможные категории списаний именно для твоей ситуации и делает предварительный расчёт возможного возврата.' },
        { title: 'Получи декларацию', desc: 'QLIXA готовит полностью заполненную налоговую декларацию для проверки и подачи через FinanzOnline. Окончательное решение принимает Finanzamt.' },
      ],
      howItWorksFooter: 'Можно пройти анкету за один раз или возвращаться к ней частями — как тебе удобно.',
      disclaimer: 'QLIXA не гарантирует конкретную сумму возврата. Результат зависит от твоей индивидуальной ситуации и окончательного решения Finanzamt.',
      cta: 'Подготовить декларацию →',
    },

    business: {
      badge: 'QLIXA Business',
      status: 'Скоро',
      desc: 'Для GmbH и бизнеса, которым нужны отдельные инструменты для управления бизнесом.',
      cta: 'Узнать первыми',
    },
  },

  EN: {
    h1: 'Choose your QLIXA product',
    subtitle: 'Just answer the questions — QLIXA will help prepare your tax return in Austria.',

    taxReturn: {
      badge: 'QLIXA Tax Return',
      desc: 'For anyone who wants to prepare their Austrian tax return themselves — whether you are employed, self-employed, or have several sources of income.',
      price: '19.90',
      currency: '€',
      period: '/ year',
      periodNote: 'One-time payment for the plan period',
      features: [
        'Personal dashboard',
        'Personal automated QLIXA questionnaire',
        'Analysis of your situation',
        'Check of possible deduction categories',
        'Preliminary estimate of your possible refund',
        'Fully completed tax return',
        'Ready to submit via FinanzOnline',
      ],
      highlightTitle: '★ The QLIXA questionnaire looks closely at your specific situation',
      highlightText: 'You simply answer clear questions. QLIXA analyzes your answers, checks possible deduction categories, shows a preliminary estimate, and prepares a fully completed tax return.',
      validUntil: 'Access until June 30 of the following year',
      validNote: 'Go through the questionnaire at once or come back to it in parts — whatever works for you.',
      howItWorksLabel: 'How does it work?',
      howItWorksTitle: 'How does it work?',
      howItWorksSteps: [
        { title: 'Answer the questions', desc: 'The personal QLIXA questionnaire asks clear questions about your situation: work, income, expenses and other circumstances.' },
        { title: 'QLIXA analyzes your answers', desc: 'It checks possible deduction categories for your specific situation and produces a preliminary estimate of your possible refund.' },
        { title: 'Get your tax return', desc: 'QLIXA prepares a fully completed tax return for you to review and submit via FinanzOnline. The final decision is made by the Finanzamt.' },
      ],
      howItWorksFooter: 'You can go through the questionnaire in one sitting or come back to it in parts — whatever works for you.',
      disclaimer: 'QLIXA does not guarantee a specific refund amount. The result depends on your individual situation and the Finanzamt’s final decision.',
      cta: 'Prepare my tax return →',
    },

    business: {
      badge: 'QLIXA Business',
      status: 'Coming soon',
      desc: 'For GmbHs and businesses that need dedicated tools to run their business.',
      cta: 'Be the first to know',
    },
  },

  DE: {
    h1: 'Wähle dein QLIXA-Produkt',
    subtitle: 'Beantworte einfach die Fragen — QLIXA hilft dir, deine Steuererklärung in Österreich vorzubereiten.',

    taxReturn: {
      badge: 'QLIXA Tax Return',
      desc: 'Für alle, die ihre österreichische Steuererklärung selbst vorbereiten möchten — egal ob angestellt, selbstständig oder mit mehreren Einkommensquellen.',
      price: '19.90',
      currency: '€',
      period: '/ Jahr',
      periodNote: 'Einmalige Zahlung für den Tarifzeitraum',
      features: [
        'Persönliches Konto',
        'Persönlicher automatisierter QLIXA-Fragebogen',
        'Analyse deiner Situation',
        'Prüfung möglicher Absetzkategorien',
        'Vorläufige Berechnung deiner möglichen Rückerstattung',
        'Vollständig ausgefüllte Steuererklärung',
        'Bereit zur Übermittlung über FinanzOnline',
      ],
      highlightTitle: '★ Der QLIXA-Fragebogen betrachtet genau deine Situation im Detail',
      highlightText: 'Du beantwortest einfach klare Fragen. QLIXA analysiert deine Antworten, prüft mögliche Absetzkategorien, zeigt eine vorläufige Berechnung und erstellt eine vollständig ausgefüllte Steuererklärung.',
      validUntil: 'Zugang bis 30. Juni des Folgejahres',
      validNote: 'Den Fragebogen auf einmal ausfüllen oder in Teilen dazu zurückkehren — ganz wie es dir passt.',
      howItWorksLabel: 'Wie funktioniert das?',
      howItWorksTitle: 'Wie funktioniert das?',
      howItWorksSteps: [
        { title: 'Beantworte die Fragen', desc: 'Der persönliche QLIXA-Fragebogen stellt klare Fragen zu deiner Situation: Arbeit, Einkommen, Ausgaben und weitere Umstände.' },
        { title: 'QLIXA analysiert deine Antworten', desc: 'Er prüft mögliche Absetzkategorien für deine konkrete Situation und erstellt eine vorläufige Berechnung deiner möglichen Rückerstattung.' },
        { title: 'Erhalte deine Steuererklärung', desc: 'QLIXA erstellt eine vollständig ausgefüllte Steuererklärung zur Prüfung und Übermittlung über FinanzOnline. Die endgültige Entscheidung trifft das Finanzamt.' },
      ],
      howItWorksFooter: 'Du kannst den Fragebogen auf einmal ausfüllen oder in Teilen dazu zurückkehren — ganz wie es dir passt.',
      disclaimer: 'QLIXA garantiert keinen bestimmten Rückerstattungsbetrag. Das Ergebnis hängt von deiner individuellen Situation und der endgültigen Entscheidung des Finanzamts ab.',
      cta: 'Steuererklärung vorbereiten →',
    },

    business: {
      badge: 'QLIXA Business',
      status: 'Demnächst',
      desc: 'Für GmbHs und Unternehmen, die eigene Tools für die Unternehmensführung benötigen.',
      cta: 'Als Erste:r erfahren',
    },
  },
}

// Динамічний розрахунок ПДВ 20% — рахується з реальної ціни, ніколи не хардкодиться,
// щоб числа завжди збігались, навіть якщо ціна колись зміниться.
function vatLine(priceStr: string, lang: string): string {
  const price = parseFloat(priceStr)
  const vat = price * 0.2
  const total = price * 1.2
  const fmt = (n: number) => n.toFixed(2)
  switch (lang) {
    case 'RU': return `+ НДС 20% (€${fmt(vat)}) = €${fmt(total)} Итого с НДС`
    case 'EN': return `+ VAT 20% (€${fmt(vat)}) = €${fmt(total)} total incl. VAT`
    case 'DE': return `+ USt 20% (€${fmt(vat)}) = €${fmt(total)} gesamt inkl. USt`
    default: return `+ ПДВ 20% (€${fmt(vat)}) = €${fmt(total)} Разом з ПДВ`
  }
}

export default function PricingPage() {
  const [lang, setLang] = useState('UA')
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
  const t = { ...langData, taxReturn: { ...PRICING_TEXT.UA.taxReturn, ...langData.taxReturn } }

  // Shared row styles — used identically across both cards so badge/price/button always line up
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

      {/* Product cards — both use the exact same row structure/sizes, so badge/price/button always align */}
      <section style={{ background: '#FFFFFF', padding: '24px clamp(20px,4vw,60px) 56px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, alignItems: 'stretch' }}>

          {/* Card 1 — QLIXA Tax Return (active paid product) */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, background: '#FFFFFF', borderRadius: 18, border: '2px solid #038390', padding: 26, position: 'relative' as const }}>
            <div style={{ ...rowBadge, color: '#038390' }}>{t.taxReturn.badge}</div>
            <p style={{ ...rowDesc, color: '#404040' }}>{t.taxReturn.desc}</p>

            <div style={rowPrice}>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 34, fontWeight: 700, color: '#1A1A1A' }}>{t.taxReturn.currency}{t.taxReturn.price}</span>
              <span style={{ fontSize: 15, color: '#595959', marginLeft: 6 }}>{t.taxReturn.period}</span>
            </div>
            <p style={{ fontSize: 12, color: '#9D9D9D', marginBottom: 4 }}>{vatLine(t.taxReturn.price, lang)}</p>
            <p style={rowPeriodNote}>{t.taxReturn.periodNote}</p>

            <a href={`${CABINET_URL}?plan=employee`} style={{ ...rowCta, background: '#038390', color: '#fff' }}>
              {t.taxReturn.cta}
            </a>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginBottom: 18 }}>
              {t.taxReturn.features.map((item: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                  <span style={{ color: '#038390', fontWeight: 700, flexShrink: 0, fontSize: 14, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.35 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #E6F4F5', paddingTop: 16, marginBottom: 16 }}>
              <div style={{ background: '#F0F7F8', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.4, marginBottom: 4 }}>{t.taxReturn.highlightTitle}</div>
                <div style={{ fontSize: 12, color: '#595959', lineHeight: 1.45 }}>{t.taxReturn.highlightText}</div>
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 3 }}>{t.taxReturn.validUntil}</div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.4 }}>{t.taxReturn.validNote}</div>
            </div>

            <div
              style={{ position: 'relative' as const, display: 'inline-block', marginBottom: 14 }}
              onMouseEnter={() => setShowHowItWorks(true)}
              onMouseLeave={() => setShowHowItWorks(false)}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, color: '#038390', cursor: 'default' }}>
                <span style={{ width: 15, height: 15, borderRadius: '50%', border: '1.5px solid #038390', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>i</span>
                {t.taxReturn.howItWorksLabel}
              </div>

              {showHowItWorks && (
                <div style={{
                  position: 'absolute' as const, bottom: '100%', left: 0, marginBottom: 8, width: 620, zIndex: 10,
                  background: '#FFFFFF', border: '1px solid #E6F4F5', borderRadius: 14, boxShadow: '0 12px 32px rgba(3,131,144,0.18)', padding: 18,
                }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>{t.taxReturn.howItWorksTitle}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 12 }}>
                    {t.taxReturn.howItWorksSteps.map((step: { title: string; desc: string }, i: number) => (
                      <div key={i}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#038390', marginBottom: 4 }}>{i + 1}. {step.title}</div>
                        <div style={{ fontSize: 12, color: '#404040', lineHeight: 1.45 }}>{step.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: '#9D9D9D', lineHeight: 1.4, borderTop: '1px solid #E6F4F5', paddingTop: 10 }}>
                    {t.taxReturn.howItWorksFooter}
                  </div>
                </div>
              )}
            </div>

            <p style={{ fontSize: 12, color: '#595959', lineHeight: 1.45 }}>
              {t.taxReturn.disclaimer}
            </p>
          </div>

          {/* Card 2 — QLIXA Business (Coming soon, no price) — mirrors Card 1's row structure with empty spacers where price/period would be */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, background: '#E6F4F5', borderRadius: 18, padding: 26 }}>
            <div style={{ ...rowBadge, color: '#026B76' }}>
              {t.business.badge}
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#026B76', background: '#F5E642', padding: '2px 8px', borderRadius: 999 }}>{t.business.status}</span>
            </div>
            <p style={{ ...rowDesc, color: '#1A1A1A' }}>{t.business.desc}</p>

            <div style={rowPrice} />
            <div style={rowPeriodNote} />

            <NotifyMeButton
              label={t.business.cta}
              source="pricing-business"
              triggerStyle={{ ...rowCta, width: '100%', boxSizing: 'border-box' as const }}
            />
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
