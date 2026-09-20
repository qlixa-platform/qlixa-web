'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import NotifyMeButton from '@/components/NotifyMeButton'
import Badge from '@/components/ui/Badge'

const CABINET_URL = 'https://cabinet-ten-lac.vercel.app/login'

// ————————————————————————————————————————————————————————————————
// /pricing — one shared 3-card structure/JSX for all 4 locales, matching
// the approved UA layout exactly (same grid, widths, heights, alignment,
// colors, radii). Only the text differs by locale. UA's copy below is the
// final approved source of truth — untouched by this translation pass.
// ————————————————————————————————————————————————————————————————

type PricingFeatureList = string[]
type PricingContent = {
  eyebrow: string
  h1: string
  subtitle: string

  free: {
    label: string
    title: string
    desc: string
    priceNote: string
    features: PricingFeatureList
    // Star insight — "check previous tax years" — lives INSIDE this card
    // only, in every locale. Never a standalone section.
    starHeading: string
    starBody1: string
    starBody2: string
    cta: string
    ctaNote: string
  }

  taxReturn: {
    label: string
    title: string
    desc: string
    price: string // raw parseable number, e.g. '24.90' — formatted per locale at render time
    paymentLine: string
    features: PricingFeatureList
    cta: string
  }

  business: {
    badge: string
    title: string
    desc: string
    cta: string
  }

  multiYear: string
  prelimNote: string
  selfServiceNote: string
}

const PRICING_TEXT: Record<'UA' | 'DE' | 'EN' | 'RU', PricingContent> = {
  UA: {
    eyebrow: 'ТАРИФИ QLIXA',
    h1: 'Обери те, що потрібно саме тобі',
    subtitle: 'Почни безкоштовно, пройди податкову анкету та вирішуй про оплату лише тоді, коли захочеш отримати готову декларацію.',

    free: {
      label: 'ПОЧНИ БЕЗКОШТОВНО',
      title: 'QLIXA Free',
      desc: 'Спробуй QLIXA та пройди основний шлях до податкової декларації без оплати.',
      priceNote: 'без підписки · без оплати',
      features: [
        'QLIXA Кабінет',
        'Повна податкова анкета QLIXA',
        'Попередній розрахунок можливого повернення',
      ],
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
      paymentLine: 'разова оплата · без підписки',
      features: [
        'Готова податкова декларація за обраний рік',
        'Додаткові податкові форми, якщо вони потрібні на основі твоїх відповідей в анкеті',
        'Готові документи для самостійного подання через FinanzOnline',
      ],
      cta: 'Підготувати декларацію →',
    },

    business: {
      badge: 'Скоро',
      title: 'QLIXA Business',
      desc: 'Окремий продукт для GmbH та бізнесу — зараз у розробці.',
      cta: 'Дізнатися першими →',
    },

    multiYear: 'Кожен податковий рік — окрема декларація. Якщо ти готуєш декларації за кілька років, кожна готова декларація оплачується окремо.',
    prelimNote: 'Попередній розрахунок базується на введених тобою даних і не гарантує конкретну суму повернення. Остаточний результат визначає Finanzamt.',
    selfServiceNote: 'QLIXA — автоматизований інструмент для самостійної підготовки податкової декларації та не надає індивідуальних податкових консультацій.',
  },

  DE: {
    eyebrow: 'QLIXA TARIFE',
    h1: 'Eine Erklärung. Eine Zahlung.',
    subtitle: 'Fülle den Fragebogen aus und sieh dir die vorläufige Berechnung kostenlos an. Du zahlst erst, wenn du deine fertige Steuererklärung erhalten möchtest.',

    free: {
      label: 'KOSTENLOS STARTEN',
      title: 'QLIXA Free',
      desc: 'Probiere QLIXA aus und gehe den wichtigsten Weg zur Steuererklärung kostenlos durch.',
      priceNote: 'ohne Abo · kostenlos',
      features: [
        'QLIXA Account',
        'Vollständiger QLIXA Steuerfragebogen',
        'Vorläufige Berechnung einer möglichen Rückerstattung',
      ],
      starHeading: '★ Prüfe auch frühere Steuerjahre',
      starBody1: 'Vielleicht gab es in früheren Jahren Ausgaben oder Umstände, die für deine Steuererklärung relevant gewesen sein könnten.',
      starBody2: 'Fülle den Fragebogen für ein unterstütztes Steuerjahr aus und sieh dir das vorläufige Ergebnis an.',
      cta: 'Kostenlos starten →',
      ctaNote: 'Für das Ausfüllen des Fragebogens ist keine Zahlung erforderlich.',
    },

    taxReturn: {
      label: 'FERTIGE STEUERERKLÄRUNG',
      title: 'QLIXA Tax Return',
      desc: 'Erhalte deine fertige Steuererklärung für das ausgewählte Steuerjahr.',
      price: '24.90',
      paymentLine: 'einmalige Zahlung · ohne Abo',
      features: [
        'Fertige Steuererklärung für das ausgewählte Jahr',
        'Zusätzliche Steuerformulare, falls sie aufgrund deiner Antworten im Fragebogen erforderlich sind',
        'Fertige Unterlagen zur selbstständigen Einreichung über FinanzOnline',
      ],
      cta: 'Steuererklärung vorbereiten →',
    },

    business: {
      badge: 'Demnächst',
      title: 'QLIXA Business',
      desc: 'Ein separates Produkt für GmbHs und Unternehmen — derzeit in Entwicklung.',
      cta: 'Als Erste erfahren →',
    },

    multiYear: 'Jedes Steuerjahr = eine separate Steuererklärung. Wenn du Steuererklärungen für mehrere Jahre vorbereitest, wird jede fertige Steuererklärung separat bezahlt.',
    prelimNote: 'Die vorläufige Berechnung basiert auf den von dir eingegebenen Daten und garantiert keinen bestimmten Rückerstattungsbetrag. Das endgültige Ergebnis wird vom Finanzamt festgelegt.',
    selfServiceNote: 'QLIXA ist ein automatisiertes Tool zur selbstständigen Vorbereitung der Steuererklärung und bietet keine individuelle Steuerberatung an.',
  },

  EN: {
    eyebrow: 'QLIXA PLANS',
    h1: 'One return. One payment.',
    subtitle: 'Complete the questionnaire and see your preliminary estimate for free. You only pay when you want to receive your completed tax return.',

    free: {
      label: 'START FOR FREE',
      title: 'QLIXA Free',
      desc: 'Try QLIXA and go through the main steps towards your tax return for free.',
      priceNote: 'no subscription · free',
      features: [
        'QLIXA Account',
        'Full QLIXA tax questionnaire',
        'Preliminary estimate of a possible refund',
      ],
      starHeading: '★ Check previous tax years too',
      starBody1: 'In previous years, you may have had expenses or circumstances that could have been relevant to your tax return.',
      starBody2: 'Complete the questionnaire for a supported tax year and see the preliminary result.',
      cta: 'Start for free →',
      ctaNote: 'No payment is required to complete the questionnaire.',
    },

    taxReturn: {
      label: 'COMPLETED TAX RETURN',
      title: 'QLIXA Tax Return',
      desc: 'Get your completed tax return for the selected tax year.',
      price: '24.90',
      paymentLine: 'one-time payment · no subscription',
      features: [
        'Completed tax return for the selected year',
        'Additional tax forms, if required based on your questionnaire answers',
        'Completed documents for you to submit through FinanzOnline',
      ],
      cta: 'Prepare my tax return →',
    },

    business: {
      badge: 'Coming soon',
      title: 'QLIXA Business',
      desc: 'A separate product for GmbHs and businesses — currently in development.',
      cta: 'Be the first to know →',
    },

    multiYear: 'Each tax year = one separate tax return. If you prepare tax returns for several years, each completed tax return is paid for separately.',
    prelimNote: 'The preliminary estimate is based on the information you enter and does not guarantee a specific refund amount. The final result is determined by the Finanzamt.',
    selfServiceNote: 'QLIXA is an automated tool for preparing your tax return yourself and does not provide individual tax advice.',
  },

  RU: {
    eyebrow: 'ТАРИФЫ QLIXA',
    h1: 'Одна декларация. Одна оплата.',
    subtitle: 'Заполни анкету и посмотри предварительный расчёт бесплатно. Платишь только тогда, когда хочешь получить готовую декларацию.',

    free: {
      label: 'НАЧНИ БЕСПЛАТНО',
      title: 'QLIXA Free',
      desc: 'Попробуй QLIXA и пройди основной путь к налоговой декларации бесплатно.',
      priceNote: 'без подписки · бесплатно',
      features: [
        'QLIXA Кабинет',
        'Полная налоговая анкета QLIXA',
        'Предварительный расчёт возможного возврата',
      ],
      starHeading: '★ Проверь и предыдущие налоговые годы',
      starBody1: 'Возможно, в предыдущие годы у тебя были расходы или обстоятельства, которые могли быть релевантны для налоговой декларации.',
      starBody2: 'Пройди анкету за поддерживаемый налоговый год и посмотри предварительный результат.',
      cta: 'Начать бесплатно →',
      ctaNote: 'Для прохождения анкеты оплата не требуется.',
    },

    taxReturn: {
      label: 'ГОТОВАЯ ДЕКЛАРАЦИЯ',
      title: 'QLIXA Tax Return',
      desc: 'Получи готовую налоговую декларацию за выбранный налоговый год.',
      price: '24.90',
      paymentLine: 'разовая оплата · без подписки',
      features: [
        'Готовая налоговая декларация за выбранный год',
        'Дополнительные налоговые формы, если они нужны на основании твоих ответов в анкете',
        'Готовые документы для самостоятельной подачи через FinanzOnline',
      ],
      cta: 'Подготовить декларацию →',
    },

    business: {
      badge: 'Скоро',
      title: 'QLIXA Business',
      desc: 'Отдельный продукт для GmbH и бизнеса — сейчас в разработке.',
      cta: 'Узнать первыми →',
    },

    multiYear: 'Каждый налоговый год = отдельная декларация. Если ты готовишь декларации за несколько лет, каждая готовая декларация оплачивается отдельно.',
    prelimNote: 'Предварительный расчёт основан на введённых тобой данных и не гарантирует конкретную сумму возврата. Окончательный результат определяет Finanzamt.',
    selfServiceNote: 'QLIXA — автоматизированный инструмент для самостоятельной подготовки налоговой декларации и не предоставляет индивидуальных налоговых консультаций.',
  },
}

// €24,90 gross → net + VAT breakdown, computed from the real price (never
// hardcoded twice) so the numbers can never drift out of sync with it.
// Locale-aware: comma decimal separator everywhere except EN (period),
// German "20 %" (with a space) vs "20%" elsewhere, and the correct VAT
// abbreviation per language.
function formatEuro(n: number, lang: string): string {
  const fixed = n.toFixed(2)
  return `€${lang === 'EN' ? fixed : fixed.replace('.', ',')}`
}
function mainPrice(priceStr: string, lang: string): string {
  return formatEuro(parseFloat(priceStr), lang)
}
function vatBreakdown(grossStr: string, lang: string): string {
  const gross = parseFloat(grossStr)
  const net = gross / 1.2
  const vat = gross - net
  const pct = lang === 'DE' ? '20 %' : '20%'
  const label = lang === 'DE' ? 'USt.' : lang === 'EN' ? 'VAT' : lang === 'RU' ? 'НДС' : 'ПДВ'
  return `${formatEuro(net, lang)} + ${pct} ${label} (${formatEuro(vat, lang)})`
}

export default function PricingPage() {
  const [lang, setLang] = useState('UA')

  // Mobile-only: which of the 3 pricing cards the horizontal swipe rail
  // currently has in view, tracked cheaply from the rail's own native
  // scroll position (no carousel library, no extra state machine —
  // there's no existing slider infrastructure on this page to reuse,
  // and 3 cards don't justify building one). Drives the small ● ○ ○
  // position indicator only; the rail's native scroll/snap remains the
  // actual navigation. Completely inert at desktop (>=901px), where the
  // rail CSS that makes this scrollable never applies.
  const [activeCard, setActiveCard] = useState(0)
  function handleRailScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget
    const slot = el.scrollWidth / 3
    const idx = Math.round(el.scrollLeft / slot)
    setActiveCard(Math.max(0, Math.min(2, idx)))
  }

  useEffect(() => {
    const updateLang = () => {
      const l = localStorage.getItem('qlixa-lang')
      if (l) setLang(l.toUpperCase())
    }
    updateLang()
    window.addEventListener('qlixa-lang-change', updateLang)
    return () => window.removeEventListener('qlixa-lang-change', updateLang)
  }, [])

  const t = PRICING_TEXT[lang as keyof typeof PRICING_TEXT] || PRICING_TEXT.UA

  // Shared row styles for the Free/Tax Return cards — identical min-heights
  // on both cards so label/title/description/price rows align horizontally
  // regardless of each card's own color theme, content length, or locale.
  const rowLabel: React.CSSProperties = { fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, marginBottom: 10, minHeight: 15 }
  const rowTitle: React.CSSProperties = { fontFamily: 'DM Serif Display, serif', fontSize: 26, fontWeight: 700, marginBottom: 10, minHeight: 32 }
  const rowDesc: React.CSSProperties = { fontSize: 14, lineHeight: 1.55, marginBottom: 20, minHeight: 66 }
  const rowPriceArea: React.CSSProperties = { minHeight: 104, marginBottom: 18, display: 'flex', flexDirection: 'column' as const, justifyContent: 'flex-end' }
  const rowDivider: React.CSSProperties = { borderTop: '1px solid rgba(3,131,144,0.15)', paddingTop: 18, marginBottom: 4 }

  return (
    <div style={{ minHeight: '100vh', background: '#F0F7F8' }}>
      <Navbar />

      {/* Hero — kept short on purpose: commercial model lives in the cards
          below, not in another explanatory paragraph. */}
      <section style={{ background: '#FFFFFF', padding: '40px clamp(20px,6vw,80px) 20px', textAlign: 'center' as const }}>
        <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#026B76', marginBottom: 16 }}>{t.eyebrow}</div>
        <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.2vw,40px)', fontWeight: 700, color: '#1A1A1A', marginBottom: 10, lineHeight: 1.15 }}>
          {t.h1}
        </h1>
        <p style={{ fontSize: 16, color: '#404040', maxWidth: 600, margin: '0 auto', lineHeight: 1.5 }}>
          {t.subtitle}
        </p>
      </section>

      {/* Three product cards — Free / Tax Return / Business, one row on
          desktop. Free + Tax Return share identical row min-heights
          (rowLabel/rowTitle/rowDesc/rowPriceArea) so their top sections line
          up exactly; both are flex-column with the CTA pushed to the bottom
          via marginTop:'auto', and the grid's default align-items:stretch
          makes them equal height, so the two CTAs land at the same Y
          position automatically — no hardcoded feature-list heights
          needed. Business uses the same top-row styles (so its top aligns
          too) but alignSelf:'start' keeps it visually shorter/secondary. */}
      <section style={{ background: '#FFFFFF', padding: '20px clamp(20px,4vw,60px) 40px' }}>
        <div
          className="pricing-cards-grid"
          onScroll={handleRailScroll}
          style={{
            maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) minmax(240px,0.68fr)',
            gap: 18, alignItems: 'stretch',
          }}>

          {/* CARD 1 — QLIXA Free: light aqua, low-risk entry point */}
          <div className="pricing-card" style={{ display: 'flex', flexDirection: 'column' as const, background: '#FAFEFE', borderRadius: 20, border: '1px solid rgba(3,131,144,0.25)', padding: 28 }}>
            <div style={{ ...rowLabel, color: '#038390' }}>{t.free.label}</div>
            <div style={{ ...rowTitle, color: '#1A1A1A' }}>{t.free.title}</div>
            <p style={{ ...rowDesc, color: '#404040' }}>{t.free.desc}</p>

            <div style={rowPriceArea}>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 40, fontWeight: 800, color: '#1A1A1A', lineHeight: 1 }}>€0</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 8 }}>{t.free.priceNote}</div>
            </div>

            <div style={rowDivider}>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                {t.free.features.map((item, i) => (
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
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 5 }}>{t.free.starHeading}</div>
              <p style={{ fontSize: 12, color: '#595959', lineHeight: 1.5, margin: '0 0 4px' }}>{t.free.starBody1}</p>
              <p style={{ fontSize: 12, color: '#595959', lineHeight: 1.5, margin: 0 }}>{t.free.starBody2}</p>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 20 }}>
              <a href={CABINET_URL} style={{ display: 'block', textAlign: 'center' as const, padding: '13px 22px', borderRadius: 11, fontSize: 15, fontWeight: 700, textDecoration: 'none', background: '#F0F7F8', color: '#038390', border: '1px solid rgba(3,131,144,0.3)', marginBottom: 10 }}>
                {t.free.cta}
              </a>
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', textAlign: 'center' as const, margin: 0 }}>{t.free.ctaNote}</p>
            </div>
          </div>

          {/* CARD 2 — QLIXA Tax Return: strongest visual weight, deep teal */}
          <div className="pricing-card" style={{ display: 'flex', flexDirection: 'column' as const, background: 'linear-gradient(160deg, #038390 0%, #026B76 100%)', borderRadius: 20, boxShadow: '0 16px 40px rgba(3,131,144,0.28)', padding: 28 }}>
            <div style={{ ...rowLabel, color: 'rgba(255,255,255,0.85)' }}>{t.taxReturn.label}</div>
            <div style={{ ...rowTitle, color: '#fff' }}>{t.taxReturn.title}</div>
            <p style={{ ...rowDesc, color: 'rgba(255,255,255,0.85)' }}>{t.taxReturn.desc}</p>

            <div style={rowPriceArea}>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 56, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{mainPrice(t.taxReturn.price, lang)}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>{vatBreakdown(t.taxReturn.price, lang)}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: 2 }}>{t.taxReturn.paymentLine}</div>
            </div>

            <div style={{ ...rowDivider, borderTop: '1px solid rgba(255,255,255,0.18)' }}>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                {t.taxReturn.features.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: '#fff', fontWeight: 700, flexShrink: 0, fontSize: 14, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 14, color: '#fff', lineHeight: 1.4 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 20 }}>
              <a href={`${CABINET_URL}?plan=employee`} style={{ display: 'block', textAlign: 'center' as const, padding: '13px 22px', borderRadius: 11, fontSize: 15, fontWeight: 700, textDecoration: 'none', background: '#fff', color: '#038390' }}>
                {t.taxReturn.cta}
              </a>
            </div>
          </div>

          {/* CARD 3 — QLIXA Business: narrower, quieter, coming soon.
              alignSelf:'start' keeps it from stretching to match the taller
              cards' height, while sharing the same top-row styles so its
              title/description still line up with the others. Badge reuses
              the EXACT yellow "Скоро" pill style from the homepage "Що таке
              QLIXA" Business card (same fontSize/weight/letterSpacing/
              colors/padding/radius) in every locale — only the badge TEXT
              changes, never the yellow color. */}
          <div className="pricing-card" style={{ display: 'flex', flexDirection: 'column' as const, alignSelf: 'start' as const, background: '#EDF5F5', borderRadius: 20, border: '1px solid rgba(3,131,144,0.14)', padding: 26 }}>
            <div style={{ minHeight: 15, marginBottom: 14 }}>
              <Badge variant="comingSoon">
                {t.business.badge}
              </Badge>
            </div>
            <div style={{ ...rowTitle, fontSize: 22, color: '#1A1A1A' }}>{t.business.title}</div>
            <p style={{ ...rowDesc, minHeight: 0, color: '#595959' }}>{t.business.desc}</p>

            <div style={{ marginTop: 'auto', paddingTop: 20 }}>
              <NotifyMeButton
                label={t.business.cta}
                source="pricing-business"
                triggerStyle={{ display: 'block', width: '100%', boxSizing: 'border-box' as const, textAlign: 'center' as const, padding: '13px 22px', borderRadius: 11, fontSize: 15, fontWeight: 700, background: '#026B76', color: '#fff' }}
              />
            </div>
          </div>

        </div>

        {/* Mobile-only swipe position indicator — purely visual (the rail's
            own native scroll/snap is the real navigation), so these are
            plain aria-hidden spans, not fake interactive buttons. */}
        <div className="pricing-dots-mobile-only" aria-hidden="true">
          {[0, 1, 2].map(i => (
            <span key={i} className="pricing-dot" style={{ background: activeCard === i ? '#038390' : 'rgba(3,131,144,0.25)' }} />
          ))}
        </div>

        {/* Multiple-years rule — short, clear, no new section weight. */}
        <p style={{ maxWidth: 1200, margin: '18px auto 0', fontSize: 13, color: '#595959', lineHeight: 1.5, textAlign: 'center' as const }}>
          {t.multiYear}
        </p>

        {/* Preliminary-result note — subtle, not an alarming legal box. */}
        <p style={{ maxWidth: 700, margin: '16px auto 0', fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.5, textAlign: 'center' as const }}>
          {t.prelimNote}
        </p>

        {/* Self-service note — one short line, no legal box. */}
        <p style={{ maxWidth: 700, margin: '10px auto 0', fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.5, textAlign: 'center' as const }}>
          {t.selfServiceNote}
        </p>
      </section>

      <Footer />
    </div>
  )
}
