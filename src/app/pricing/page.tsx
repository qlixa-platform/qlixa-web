'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import NotifyMeButton from '@/components/NotifyMeButton'

const CABINET_URL = 'https://cabinet-ten-lac.vercel.app/login'

// ————————————————————————————————————————————————————————————————
// UA /pricing was redesigned around the current 3-product commercial model
// (QLIXA Free / QLIXA Tax Return €24,90 one-time / QLIXA Business coming
// soon). RU/EN/DE still use the ORIGINAL 2-card €19.90/year model below
// (PRICING_TEXT) — untouched, so those locales keep rendering exactly as
// before until they're translated to the new model in a follow-up task.
// UA's new copy lives in the separate PRICING_UA object + its own JSX
// branch further down.
// ————————————————————————————————————————————————————————————————

const PRICING_TEXT: Record<string, any> = {
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

// Dynamic VAT line for the OLD RU/EN/DE model only (price varies: 19.90).
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

// ————————————————————————————————————————————————————————————————
// New UA pricing content — 3-product model (Free / Tax Return €24,90
// one-time / Business coming soon). See task spec for the exact approved
// wording; nothing here is invented.
// ————————————————————————————————————————————————————————————————
const PRICING_UA = {
  eyebrow: 'ТАРИФИ QLIXA',
  h1: 'Обери те, що потрібно саме тобі',
  subtitle: 'Почни безкоштовно, пройди податкову анкету та вирішуй про оплату лише тоді, коли захочеш отримати готову декларацію.',

  free: {
    label: 'ПОЧНИ БЕЗКОШТОВНО',
    title: 'QLIXA Free',
    desc: 'Спробуй QLIXA та пройди основний шлях до податкової декларації без оплати.',
    price: '€0',
    priceNote: 'без підписки · без оплати',
    features: [
      'QLIXA Кабінет',
      'Повна податкова анкета QLIXA',
      'Попередній розрахунок можливого повернення',
    ],
    // Star insight now lives INSIDE the Free card (not a standalone section
    // below the pricing row) — see task update. Same wording as before.
    starHeading: '★ Перевір і попередні податкові роки',
    starBody1: 'Можливо, у попередніх роках у тебе були витрати або обставини, які могли бути релевантними для податкової декларації.',
    starBody2: 'Пройди анкету за підтримуваний податковий рік і подивись попередній результат.',
    cta: 'Почати безкоштовно →',
    ctaNote: 'Оплата не потрібна для проходження анкети.',
  },

  taxReturn: {
    label: 'ГОТОВА ДЕКЛАРАЦІЯ',
    title: 'QLIXA Tax Return',
    desc: 'Отримай готову податкову декларацію за обраний податковий рік.',
    price: '24.90',
    // "Усі введені тобою дані можна переглянути..." removed per task update —
    // keep this list to exactly these 3 clear result items.
    features: [
      'Готова податкова декларація за обраний рік',
      'Додаткові податкові форми, якщо вони потрібні на основі твоїх відповідей в анкеті',
      'Готові документи для самостійного подання через FinanzOnline',
    ],
    cta: 'Підготувати декларацію →',
  },

  // Matches the existing homepage "Що таке QLIXA" Business card copy/status
  // exactly — no separate Coming-Soon wording invented for this page.
  business: {
    badge: 'Скоро',
    title: 'QLIXA Business',
    desc: 'Окремий продукт для GmbH та бізнесу — зараз у розробці.',
    cta: 'Дізнатися першими →',
  },

  multiYear: 'Кожен податковий рік — окрема декларація. Якщо ти готуєш декларації за кілька років, кожна готова декларація оплачується окремо.',

  prelimNote: 'Попередній розрахунок базується на введених тобою даних і не гарантує конкретну суму повернення. Остаточний результат визначає Finanzamt.',

  selfServiceNote: 'QLIXA — автоматизований інструмент для самостійної підготовки податкової декларації та не надає індивідуальних податкових консультацій.',
}

// €24,90 gross → net + VAT breakdown, computed from the real price (never
// hardcoded twice) so the numbers can never drift out of sync with it.
function uaVatBreakdown(grossStr: string): string {
  const gross = parseFloat(grossStr)
  const net = gross / 1.2
  const vat = gross - net
  const fmt = (n: number) => n.toFixed(2).replace('.', ',')
  return `€${fmt(net)} + 20% ПДВ (€${fmt(vat)})`
}
function uaPrice(str: string): string {
  return `€${parseFloat(str).toFixed(2).replace('.', ',')}`
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

  const isUA = lang === 'UA'
  const t = PRICING_TEXT[lang] || PRICING_TEXT.RU
  const u = PRICING_UA

  // Shared row styles for the OLD RU/EN/DE cards — used identically across
  // both cards so badge/price/button always line up.
  const rowBadge: React.CSSProperties = { fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: 10, minHeight: 15, display: 'flex', alignItems: 'center', gap: 8 }
  const rowDesc: React.CSSProperties = { fontSize: 15, lineHeight: 1.5, marginBottom: 18, minHeight: 68 }
  const rowPrice: React.CSSProperties = { marginBottom: 2, minHeight: 56, display: 'flex', alignItems: 'baseline' }
  const rowPeriodNote: React.CSSProperties = { fontSize: 12, color: '#9D9D9D', marginBottom: 18, minHeight: 40 }
  const rowCta: React.CSSProperties = { display: 'block', textAlign: 'center' as const, padding: '12px 22px', borderRadius: 11, fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 20 }

  // Shared row styles for the NEW UA Free/Tax Return cards — identical
  // min-heights on both cards so label/title/description/price rows align
  // horizontally regardless of each card's own color theme or content length.
  const uaLabel: React.CSSProperties = { fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, marginBottom: 10, minHeight: 15 }
  const uaTitle: React.CSSProperties = { fontFamily: 'DM Serif Display, serif', fontSize: 26, fontWeight: 700, marginBottom: 10, minHeight: 32 }
  const uaDesc: React.CSSProperties = { fontSize: 14, lineHeight: 1.55, marginBottom: 20, minHeight: 66 }
  const uaPriceArea: React.CSSProperties = { minHeight: 104, marginBottom: 18, display: 'flex', flexDirection: 'column' as const, justifyContent: 'flex-end' }
  const uaDivider: React.CSSProperties = { borderTop: '1px solid rgba(3,131,144,0.15)', paddingTop: 18, marginBottom: 4 }

  return (
    <div style={{ minHeight: '100vh', background: '#F0F7F8' }}>
      <Navbar />

      {isUA ? (
        <>
          {/* Hero — kept short on purpose: commercial model lives in the
              cards below, not in another explanatory paragraph. */}
          <section style={{ background: '#FFFFFF', padding: '40px clamp(20px,6vw,80px) 20px', textAlign: 'center' as const }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 16 }}>{u.eyebrow}</div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.2vw,40px)', fontWeight: 700, color: '#1A1A1A', marginBottom: 10, lineHeight: 1.15 }}>
              {u.h1}
            </h1>
            <p style={{ fontSize: 16, color: '#404040', maxWidth: 600, margin: '0 auto', lineHeight: 1.5 }}>
              {u.subtitle}
            </p>
          </section>

          {/* Three product cards — Free / Tax Return / Business, one row on
              desktop. Free + Tax Return share identical row min-heights
              (uaLabel/uaTitle/uaDesc/uaPriceArea) so their top sections line
              up exactly; both are flex-column with the CTA pushed to the
              bottom via marginTop:'auto', and the grid's default
              align-items:stretch makes them equal height, so the two CTAs
              land at the same Y position automatically — no hardcoded
              feature-list heights needed. Business uses the same top-row
              styles (so its top aligns too) but alignSelf:'start' keeps it
              visually shorter/secondary, as specified. */}
          <section style={{ background: '#FFFFFF', padding: '20px clamp(20px,4vw,60px) 40px' }}>
            <div style={{
              maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) minmax(240px,0.68fr)',
              gap: 18, alignItems: 'stretch',
            }}>

              {/* CARD 1 — QLIXA Free: light aqua, low-risk entry point */}
              <div style={{ display: 'flex', flexDirection: 'column' as const, background: '#FAFEFE', borderRadius: 20, border: '1px solid rgba(3,131,144,0.25)', padding: 28 }}>
                <div style={{ ...uaLabel, color: '#038390' }}>{u.free.label}</div>
                <div style={{ ...uaTitle, color: '#1A1A1A' }}>{u.free.title}</div>
                <p style={{ ...uaDesc, color: '#404040' }}>{u.free.desc}</p>

                <div style={uaPriceArea}>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 40, fontWeight: 800, color: '#1A1A1A', lineHeight: 1 }}>{u.free.price}</div>
                  <div style={{ fontSize: 12, color: '#9D9D9D', marginTop: 8 }}>{u.free.priceNote}</div>
                </div>

                <div style={uaDivider}>
                  <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                    {u.free.features.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ color: '#038390', fontWeight: 700, flexShrink: 0, fontSize: 14, marginTop: 1 }}>✓</span>
                        <span style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.4 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Star insight — lives INSIDE the Free card only (not a
                    standalone section below the pricing row). A small
                    highlighted inset, not a fourth section. */}
                <div style={{ background: 'rgba(3,131,144,0.06)', borderRadius: 13, padding: '14px 16px', marginTop: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 5 }}>{u.free.starHeading}</div>
                  <p style={{ fontSize: 12, color: '#595959', lineHeight: 1.5, margin: '0 0 4px' }}>{u.free.starBody1}</p>
                  <p style={{ fontSize: 12, color: '#595959', lineHeight: 1.5, margin: 0 }}>{u.free.starBody2}</p>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                  <a href={CABINET_URL} style={{ display: 'block', textAlign: 'center' as const, padding: '13px 22px', borderRadius: 11, fontSize: 15, fontWeight: 700, textDecoration: 'none', background: '#F0F7F8', color: '#038390', border: '1px solid rgba(3,131,144,0.3)', marginBottom: 10 }}>
                    {u.free.cta}
                  </a>
                  <p style={{ fontSize: 12, color: '#9D9D9D', textAlign: 'center' as const, margin: 0 }}>{u.free.ctaNote}</p>
                </div>
              </div>

              {/* CARD 2 — QLIXA Tax Return: strongest visual weight, deep teal */}
              <div style={{ display: 'flex', flexDirection: 'column' as const, background: 'linear-gradient(160deg, #038390 0%, #026B76 100%)', borderRadius: 20, boxShadow: '0 16px 40px rgba(3,131,144,0.28)', padding: 28 }}>
                <div style={{ ...uaLabel, color: 'rgba(255,255,255,0.85)' }}>{u.taxReturn.label}</div>
                <div style={{ ...uaTitle, color: '#fff' }}>{u.taxReturn.title}</div>
                <p style={{ ...uaDesc, color: 'rgba(255,255,255,0.85)' }}>{u.taxReturn.desc}</p>

                <div style={uaPriceArea}>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 56, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{uaPrice(u.taxReturn.price)}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>{uaVatBreakdown(u.taxReturn.price)}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: 2 }}>разова оплата · без підписки</div>
                </div>

                <div style={{ ...uaDivider, borderTop: '1px solid rgba(255,255,255,0.18)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                    {u.taxReturn.features.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ color: '#fff', fontWeight: 700, flexShrink: 0, fontSize: 14, marginTop: 1 }}>✓</span>
                        <span style={{ fontSize: 14, color: '#fff', lineHeight: 1.4 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                  <a href={`${CABINET_URL}?plan=employee`} style={{ display: 'block', textAlign: 'center' as const, padding: '13px 22px', borderRadius: 11, fontSize: 15, fontWeight: 700, textDecoration: 'none', background: '#fff', color: '#038390' }}>
                    {u.taxReturn.cta}
                  </a>
                </div>
              </div>

              {/* CARD 3 — QLIXA Business: narrower, quieter, coming soon.
                  alignSelf:'start' keeps it from stretching to match the
                  taller cards' height, while sharing the same top-row
                  styles so its title/description still line up with the
                  others. Badge reuses the EXACT yellow "Скоро" pill style
                  from the homepage "Що таке QLIXA" Business card (same
                  fontSize/weight/letterSpacing/colors/padding/radius) —
                  no separate Coming-Soon visual invented for this page. */}
              <div style={{ display: 'flex', flexDirection: 'column' as const, alignSelf: 'start' as const, background: '#EDF5F5', borderRadius: 20, border: '1px solid rgba(3,131,144,0.14)', padding: 26 }}>
                <div style={{ minHeight: 15, marginBottom: 14 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#026B76', background: '#F5E642', padding: '3px 9px', borderRadius: 999 }}>
                    {u.business.badge}
                  </span>
                </div>
                <div style={{ ...uaTitle, fontSize: 22, color: '#1A1A1A' }}>{u.business.title}</div>
                <p style={{ ...uaDesc, minHeight: 0, color: '#595959' }}>{u.business.desc}</p>

                <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                  <NotifyMeButton
                    label={u.business.cta}
                    source="pricing-business"
                    triggerStyle={{ display: 'block', width: '100%', boxSizing: 'border-box' as const, textAlign: 'center' as const, padding: '13px 22px', borderRadius: 11, fontSize: 15, fontWeight: 700, background: '#026B76', color: '#fff' }}
                  />
                </div>
              </div>

            </div>

            {/* Multiple-years rule — short, clear, no new section weight. */}
            <p style={{ maxWidth: 1200, margin: '18px auto 0', fontSize: 13, color: '#595959', lineHeight: 1.5, textAlign: 'center' as const }}>
              {u.multiYear}
            </p>

            {/* Preliminary-result note — subtle, not an alarming legal box. */}
            <p style={{ maxWidth: 700, margin: '16px auto 0', fontSize: 12, color: '#9D9D9D', lineHeight: 1.5, textAlign: 'center' as const }}>
              {u.prelimNote}
            </p>

            {/* Self-service note — one short line, no legal box. */}
            <p style={{ maxWidth: 700, margin: '10px auto 0', fontSize: 12, color: '#9D9D9D', lineHeight: 1.5, textAlign: 'center' as const }}>
              {u.selfServiceNote}
            </p>
          </section>
        </>
      ) : (
        <>
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
        </>
      )}

      <Footer />
    </div>
  )
}
