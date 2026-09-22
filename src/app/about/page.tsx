'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// ————————————————————————————————————————————————————————————————
// /about — product/company profile for QLIXA itself (not a founder
// story). The founder story previously here now lives at /our-story,
// completely unchanged — see that route. This page speaks from the
// product's perspective ("QLIXA helps...", never "ми/we"), reuses the
// exact approved pricing figures/labels and audience-segment language
// already live on the Homepage and Pricing page, and follows the same
// claim-safety rules used everywhere else on the site (no "maximum
// refund", no "QLIXA submits your return", etc.).
// ————————————————————————————————————————————————————————————————

type AboutContent = {
  eyebrow: string
  h1: string
  heroSub: string

  whatH2: string
  whatP1: string
  whatP2: string
  whatP3: string

  whyH2: string
  whyP: string

  whoH2: string
  whoIntro: string
  whoList: string[]
  whoNote: string

  howH2: string
  howSteps: { title: string; desc: string }[]

  priceH2: string
  priceItems: { title: string; price: string; note: string }[]
  priceLink: string

  boundH2: string
  boundP1: string
  boundP2: string

  ctaH2: string
  ctaPrimary: string
  ctaSecondary: string
  storyLink: string
}

const ABOUT: Record<'UA' | 'RU' | 'EN' | 'DE', AboutContent> = {
  UA: {
    eyebrow: 'ПРО QLIXA',
    h1: 'QLIXA — автоматизований інструмент для самостійної підготовки податкової декларації в Австрії.',
    heroSub: 'QLIXA перетворює складний процес на послідовність зрозумілих запитань — від першої відповіді до документа, готового до перевірки та подання.',

    whatH2: 'Що таке QLIXA',
    whatP1: 'QLIXA — автоматизований інструмент для самостійної підготовки податкової декларації в Австрії. Замість заповнення складних податкових форм вручну, ти відповідаєш на зрозумілі запитання про особисту ситуацію, сім’ю, роботу та дохід.',
    whatP2: 'Анкета підлаштовується під твої відповіді та за потреби заглиблюється, щоб уточнити важливі деталі. На основі введеної інформації QLIXA перевіряє можливі категорії, що можуть бути релевантними для декларації, і показує попередній розрахунок можливого повернення.',
    whatP3: 'Після цього QLIXA готує податкову декларацію з необхідними додатками — для твоєї перевірки та самостійного подання.',

    whyH2: 'Чому існує QLIXA',
    whyP: 'Самостійна підготовка податкової декларації в Австрії часто означає розбиратися в незнайомих формах, німецькій податковій термінології та розуміти, яка інформація релевантна і куди її вносити. QLIXA перетворює цей процес на послідовність зрозумілих запитань, щоб потрібна інформація опинилася у правильному місці.',

    whoH2: 'Кому підходить QLIXA Tax Return',
    whoIntro: 'QLIXA Tax Return створена не лише для найманих працівників. Анкета може враховувати різні ситуації, зокрема:',
    whoList: [
      'Роботу за наймом',
      'Самозайнятість, Gewerbe або Neue Selbstständige',
      'Пенсію з додатковим доходом',
      'Дохід від оренди нерухомості',
      'Доходи від інвестицій або з-за кордону (де це підтримується)',
      'Поєднання кількох джерел доходу',
    ],
    whoNote: 'Деякі податкові ситуації складніші за інші. Анкета орієнтується на введені відповіді та показує, яка інформація релевантна саме для твоєї ситуації.',

    howH2: 'Як це працює',
    howSteps: [
      { title: 'Розкажи QLIXA про свою ситуацію', desc: 'Дай прості відповіді про себе, свою сім’ю та робочу ситуацію.' },
      { title: 'Пройди адаптивну анкету', desc: 'Анкета підлаштовується під твої відповіді та за потреби заглиблюється в деталі.' },
      { title: 'Побач попередній розрахунок', desc: 'Після анкети ти побачиш попередній розрахунок можливого повернення.' },
      { title: 'Отримай готову декларацію', desc: 'QLIXA готує податкову декларацію з необхідними додатками — для твоєї перевірки та самостійного подання.' },
    ],

    priceH2: 'Від безкоштовного початку до готової декларації',
    priceItems: [
      { title: 'QLIXA Кабінет', price: '€0', note: 'безкоштовний кабінет' },
      { title: 'Податкова анкета', price: '€0', note: 'без оплати' },
      { title: 'Попередній розрахунок', price: '€0', note: 'можливий результат' },
      { title: 'Готова декларація', price: '€24,90', note: 'разово · без підписки' },
    ],
    priceLink: 'Детальніше про тарифи →',

    boundH2: 'Самообслуговування, прозоро',
    boundP1: 'QLIXA — автоматизований інструмент для самостійної підготовки податкової декларації. Це не Steuerberater, бухгалтер, юрист чи індивідуальний фінансовий консультант, і QLIXA не приймає особисті податкові рішення за тебе.',
    boundP2: 'QLIXA не подає декларацію за тебе. Ти самостійно перевіряєш підготовлену інформацію та відповідаєш за її подання.',

    ctaH2: 'Готовий побачити свою ситуацію?',
    ctaPrimary: 'Почати безкоштовно →',
    ctaSecondary: 'Переглянути тарифи',
    storyLink: 'Цікаво, як з’явилася QLIXA? Прочитати історію →',
  },

  RU: {
    eyebrow: 'О QLIXA',
    h1: 'QLIXA — автоматизированный инструмент для самостоятельной подготовки налоговой декларации в Австрии.',
    heroSub: 'QLIXA превращает сложный процесс в последовательность понятных вопросов — от первого ответа до документа, готового к проверке и подаче.',

    whatH2: 'Что такое QLIXA',
    whatP1: 'QLIXA — автоматизированный инструмент для самостоятельной подготовки налоговой декларации в Австрии. Вместо заполнения сложных налоговых форм вручную, ты отвечаешь на понятные вопросы о личной ситуации, семье, работе и доходе.',
    whatP2: 'Анкета подстраивается под твои ответы и при необходимости уточняет важные детали. На основе введённой информации QLIXA проверяет возможные категории, которые могут быть релевантны для декларации, и показывает предварительный расчёт возможного возврата.',
    whatP3: 'После этого QLIXA готовит налоговую декларацию с необходимыми приложениями — для твоей проверки и самостоятельной подачи.',

    whyH2: 'Почему существует QLIXA',
    whyP: 'Самостоятельная подготовка налоговой декларации в Австрии часто означает разбираться в незнакомых формах, немецкой налоговой терминологии и понимать, какая информация релевантна и куда её вносить. QLIXA превращает этот процесс в последовательность понятных вопросов, чтобы нужная информация оказалась в правильном месте.',

    whoH2: 'Кому подходит QLIXA Tax Return',
    whoIntro: 'QLIXA Tax Return создана не только для наёмных работников. Анкета может учитывать разные ситуации, в том числе:',
    whoList: [
      'Работу по найму',
      'Самозанятость, Gewerbe или Neue Selbstständige',
      'Пенсию с дополнительным доходом',
      'Доход от аренды недвижимости',
      'Доходы от инвестиций или из-за границы (где это поддерживается)',
      'Сочетание нескольких источников дохода',
    ],
    whoNote: 'Некоторые налоговые ситуации сложнее других. Анкета ориентируется на введённые ответы и показывает, какая информация релевантна именно для твоей ситуации.',

    howH2: 'Как это работает',
    howSteps: [
      { title: 'Расскажи QLIXA о своей ситуации', desc: 'Дай простые ответы о себе, своей семье и рабочей ситуации.' },
      { title: 'Пройди адаптивную анкету', desc: 'Анкета подстраивается под твои ответы и при необходимости уточняет детали.' },
      { title: 'Увидь предварительный расчёт', desc: 'После анкеты ты увидишь предварительный расчёт возможного возврата.' },
      { title: 'Получи готовую декларацию', desc: 'QLIXA готовит налоговую декларацию с необходимыми приложениями — для твоей проверки и самостоятельной подачи.' },
    ],

    priceH2: 'От бесплатного старта до готовой декларации',
    priceItems: [
      { title: 'QLIXA Кабинет', price: '€0', note: 'бесплатный кабинет' },
      { title: 'Налоговая анкета', price: '€0', note: 'без оплаты' },
      { title: 'Предварительный расчёт', price: '€0', note: 'возможный результат' },
      { title: 'Готовая декларация', price: '€24,90', note: 'разово · без подписки' },
    ],
    priceLink: 'Подробнее о тарифах →',

    boundH2: 'Самообслуживание, прозрачно',
    boundP1: 'QLIXA — автоматизированный инструмент для самостоятельной подготовки налоговой декларации. Это не Steuerberater, бухгалтер, юрист или индивидуальный финансовый консультант, и QLIXA не принимает личные налоговые решения за тебя.',
    boundP2: 'QLIXA не подаёт декларацию за тебя. Ты самостоятельно проверяешь подготовленную информацию и несёшь ответственность за её подачу.',

    ctaH2: 'Готов увидеть свою ситуацию?',
    ctaPrimary: 'Начать бесплатно →',
    ctaSecondary: 'Посмотреть тарифы',
    storyLink: 'Хочешь узнать, как появилась QLIXA? Прочитать историю →',
  },

  EN: {
    eyebrow: 'ABOUT QLIXA',
    h1: 'QLIXA is an automated tool for self-service preparation of Austrian tax returns.',
    heroSub: 'QLIXA turns a complex process into a guided sequence of understandable questions — from your first answer to a document ready for review and submission.',

    whatH2: 'What is QLIXA',
    whatP1: 'QLIXA is an automated tool for independently preparing a tax return in Austria. Instead of filling in complicated tax forms manually, you answer clear questions about your personal situation, family, work and income.',
    whatP2: 'The questionnaire adapts to your answers and asks for more detail where it matters. Based on the information you provide, QLIXA checks possible categories that may be relevant to your declaration and shows a preliminary estimate of a possible refund.',
    whatP3: 'QLIXA then prepares the tax return with the necessary applicable attachments for you to review and submit yourself.',

    whyH2: 'Why QLIXA exists',
    whyP: 'Preparing an Austrian tax return independently can mean navigating unfamiliar forms, German tax terminology, and figuring out which information is relevant and where it belongs. QLIXA turns that process into a guided sequence of understandable questions, so the right information ends up in the right place.',

    whoH2: 'Who QLIXA Tax Return is for',
    whoIntro: 'QLIXA Tax Return is not only for employees. The questionnaire can cover a range of situations, including:',
    whoList: [
      'Employment',
      'Self-employment, a Gewerbe or Neue Selbständige status',
      'A pension with additional income',
      'Rental income',
      'Investment or foreign income (where supported)',
      'Combinations of several income sources',
    ],
    whoNote: 'Some tax situations are more complex than others. The questionnaire is guided by your own answers and shows which information is relevant to your specific situation.',

    howH2: 'How it works',
    howSteps: [
      { title: 'Tell QLIXA about your situation', desc: 'Answer simple questions about yourself, your family and your work situation.' },
      { title: 'Complete the adaptive questionnaire', desc: 'The questionnaire adapts to your answers and asks for more detail where it matters.' },
      { title: 'See the preliminary estimate', desc: 'Once the questionnaire is complete, you see a preliminary estimate of a possible refund.' },
      { title: 'Get your prepared tax return', desc: 'QLIXA prepares your tax return with the necessary attachments — ready for your review and self-submission.' },
    ],

    priceH2: 'From a free start to your prepared tax return',
    priceItems: [
      { title: 'QLIXA Account', price: '€0', note: 'free account' },
      { title: 'Tax questionnaire', price: '€0', note: 'no payment' },
      { title: 'Preliminary estimate', price: '€0', note: 'possible result' },
      { title: 'Prepared tax return', price: '€24.90', note: 'one-time · no subscription' },
    ],
    priceLink: 'See full pricing details →',

    boundH2: 'Self-service, transparently',
    boundP1: 'QLIXA is an automated self-service tool for preparing a tax return. It is not a Steuerberater, accountant, lawyer or individual financial adviser, and it does not make personal tax decisions on your behalf.',
    boundP2: 'QLIXA does not submit your tax return for you. You review the prepared information yourself and remain responsible for its submission.',

    ctaH2: 'Ready to see your situation?',
    ctaPrimary: 'Start for free →',
    ctaSecondary: 'View pricing',
    storyLink: 'Curious how QLIXA came to be? Read the story →',
  },

  DE: {
    eyebrow: 'ÜBER QLIXA',
    h1: 'QLIXA ist ein automatisiertes Tool zur selbstständigen Vorbereitung der Steuererklärung in Österreich.',
    heroSub: 'QLIXA macht aus einem komplexen Prozess eine geführte Abfolge verständlicher Fragen — von deiner ersten Antwort bis zu einem Dokument, das bereit zur Prüfung und Einreichung ist.',

    whatH2: 'Was ist QLIXA',
    whatP1: 'QLIXA ist ein automatisiertes Tool zur selbstständigen Vorbereitung der Steuererklärung in Österreich. Anstatt komplizierte Steuerformulare manuell auszufüllen, beantwortest du verständliche Fragen zu deiner persönlichen Situation, Familie, Arbeit und deinem Einkommen.',
    whatP2: 'Der Fragebogen passt sich deinen Antworten an und fragt bei Bedarf genauer nach, um wichtige Details zu klären. Basierend auf den eingegebenen Angaben prüft QLIXA mögliche Kategorien, die für deine Erklärung relevant sein könnten, und zeigt eine vorläufige Berechnung einer möglichen Rückerstattung.',
    whatP3: 'Anschließend bereitet QLIXA die Steuererklärung mit den erforderlichen Zusatzformularen vor — zur Prüfung und eigenständigen Einreichung durch dich.',

    whyH2: 'Warum es QLIXA gibt',
    whyP: 'Eine Steuererklärung in Österreich selbstständig vorzubereiten bedeutet oft, sich mit unbekannten Formularen und deutscher Steuerterminologie auseinanderzusetzen und herauszufinden, welche Angaben relevant sind und wohin sie gehören. QLIXA macht daraus eine geführte Abfolge verständlicher Fragen, damit die richtigen Angaben am richtigen Ort landen.',

    whoH2: 'Für wen QLIXA Tax Return geeignet ist',
    whoIntro: 'QLIXA Tax Return ist nicht nur für Angestellte gedacht. Der Fragebogen kann verschiedene Situationen berücksichtigen, unter anderem:',
    whoList: [
      'Angestellte Tätigkeit',
      'Selbstständigkeit, Gewerbe oder Neue Selbstständige',
      'Pension mit Zusatzeinkommen',
      'Mieteinkünfte',
      'Kapital- oder Auslandseinkünfte (soweit unterstützt)',
      'Kombinationen mehrerer Einkommensquellen',
    ],
    whoNote: 'Manche Steuersituationen sind komplexer als andere. Der Fragebogen orientiert sich an deinen eigenen Antworten und zeigt dir, welche Angaben für deine Situation relevant sind.',

    howH2: 'So funktioniert es',
    howSteps: [
      { title: 'Erzähl QLIXA von deiner Situation', desc: 'Beantworte einfache Fragen zu dir, deiner Familie und deiner beruflichen Situation.' },
      { title: 'Beantworte den adaptiven Fragebogen', desc: 'Der Fragebogen passt sich deinen Antworten an und fragt bei Bedarf genauer nach.' },
      { title: 'Sieh die vorläufige Berechnung', desc: 'Nach dem Fragebogen siehst du eine vorläufige Berechnung einer möglichen Rückerstattung.' },
      { title: 'Erhalte deine fertige Steuererklärung', desc: 'QLIXA bereitet deine Steuererklärung mit den erforderlichen Zusatzformularen vor — zur Prüfung und eigenständigen Einreichung.' },
    ],

    priceH2: 'Vom kostenlosen Start zur fertigen Steuererklärung',
    priceItems: [
      { title: 'QLIXA-Bereich', price: '€0', note: 'kostenloser Zugang' },
      { title: 'Steuerfragebogen', price: '€0', note: 'ohne Zahlung' },
      { title: 'Vorläufige Berechnung', price: '€0', note: 'mögliches Ergebnis' },
      { title: 'Fertige Steuererklärung', price: '€24,90', note: 'einmalig · kein Abo' },
    ],
    priceLink: 'Alle Tarifdetails ansehen →',

    boundH2: 'Self-Service, transparent',
    boundP1: 'QLIXA ist ein automatisiertes Self-Service-Tool zur Vorbereitung einer Steuererklärung. QLIXA ist kein Steuerberater, keine Buchhaltung, kein Rechtsanwalt und keine individuelle Finanzberatung und trifft keine persönlichen steuerlichen Entscheidungen für dich.',
    boundP2: 'QLIXA reicht deine Steuererklärung nicht für dich ein. Du prüfst die vorbereiteten Angaben selbst und bist für die Einreichung verantwortlich.',

    ctaH2: 'Bereit, deine Situation zu sehen?',
    ctaPrimary: 'Kostenlos starten →',
    ctaSecondary: 'Tarife ansehen',
    storyLink: 'Neugierig, wie QLIXA entstanden ist? Geschichte lesen →',
  },
}

// Shared small "number circle" step marker — reuses the exact visual
// pattern already established across the site (Homepage hero steps,
// GISA Formular steps): a solid teal circle with a white index number.
function StepNumber({ n }: { n: number }) {
  return (
    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#038390', color: '#fff', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {n}
    </div>
  )
}

export default function AboutPage() {
  const [lang, setLang] = useState('UA')

  useEffect(() => {
    const updateLang = () => {
      const l = localStorage.getItem('qlixa-lang')
      if (l) setLang(l.toUpperCase())
    }
    updateLang()
    window.addEventListener('qlixa-lang-change', updateLang)
    return () => window.removeEventListener('qlixa-lang-change', updateLang)
  }, [])

  const c = ABOUT[lang as keyof typeof ABOUT] || ABOUT.UA

  // Shared section wrapper widths — a single readable column throughout,
  // so mobile never has to squeeze a desktop-only layout: there is no
  // multi-column geometry anywhere on this page to break in the first
  // place. Grids below use repeat(auto-fit,minmax(...)) so they collapse
  // to fewer columns automatically at narrow widths, with no separate
  // mobile override needed.
  const narrowCol: React.CSSProperties = { maxWidth: 720, margin: '0 auto' }
  const wideCol: React.CSSProperties = { maxWidth: 1000, margin: '0 auto' }
  const sectionPad: React.CSSProperties = { padding: 'clamp(40px,7vw,72px) clamp(20px,6vw,80px)' }
  const h2Style: React.CSSProperties = { fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(24px,2.8vw,32px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.2, marginBottom: 16 }
  const bodyStyle: React.CSSProperties = { fontSize: 'clamp(15px,1.1vw,16px)', color: '#404040', lineHeight: 1.65 }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ background: '#ffffff', minHeight: '100vh' }}>

        {/* ── HERO ── */}
        <section style={{ background: '#F0F7F8', ...sectionPad, paddingBottom: 'clamp(40px,6vw,56px)', textAlign: 'center' as const }}>
          <div style={narrowCol}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#026B76', marginBottom: 20 }}>
              {c.eyebrow}
            </div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(30px,4vw,42px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-0.5px', marginBottom: 16 }}>
              {c.h1}
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.3vw,18px)', color: '#404040', lineHeight: 1.6 }}>
              {c.heroSub}
            </p>
          </div>
        </section>

        {/* ── WHAT IS QLIXA ── */}
        <section style={{ background: '#ffffff', ...sectionPad }}>
          <div style={narrowCol}>
            <h2 style={h2Style}>{c.whatH2}</h2>
            <p style={{ ...bodyStyle, marginBottom: 14 }}>{c.whatP1}</p>
            <p style={{ ...bodyStyle, marginBottom: 14 }}>{c.whatP2}</p>
            <p style={bodyStyle}>{c.whatP3}</p>
          </div>
        </section>

        {/* ── WHY QLIXA EXISTS ── */}
        <section style={{ background: '#F0F7F8', ...sectionPad }}>
          <div style={narrowCol}>
            <h2 style={h2Style}>{c.whyH2}</h2>
            <p style={bodyStyle}>{c.whyP}</p>
          </div>
        </section>

        {/* ── WHO IT'S FOR ── */}
        <section style={{ background: '#ffffff', ...sectionPad }}>
          <div style={narrowCol}>
            <h2 style={h2Style}>{c.whoH2}</h2>
            <p style={{ ...bodyStyle, marginBottom: 18 }}>{c.whoIntro}</p>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginBottom: 18 }}>
              {c.whoList.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ color: '#038390', fontWeight: 700, flexShrink: 0, fontSize: 15, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: '#737373', lineHeight: 1.6 }}>{c.whoNote}</p>
          </div>
        </section>

        {/* ── HOW IT WORKS — 4 steps ── */}
        <section style={{ background: '#F0F7F8', ...sectionPad }}>
          <div style={wideCol}>
            <h2 style={{ ...h2Style, textAlign: 'center' as const }}>{c.howH2}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 28 }}>
              {c.howSteps.map((step, i) => (
                <div key={step.title} style={{ background: '#ffffff', border: '1px solid rgba(3,131,144,0.12)', borderRadius: 16, padding: '22px 20px' }}>
                  <div style={{ marginBottom: 12 }}><StepNumber n={i + 1} /></div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, lineHeight: 1.3 }}>{step.title}</div>
                  <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.55 }}>{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING MODEL ── */}
        <section style={{ background: '#ffffff', ...sectionPad }}>
          <div style={wideCol}>
            <h2 style={{ ...h2Style, textAlign: 'center' as const }}>{c.priceH2}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginTop: 28, marginBottom: 20 }}>
              {c.priceItems.map(item => (
                <div key={item.title} style={{ background: '#F0F7F8', borderRadius: 14, padding: '20px 16px', textAlign: 'center' as const }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#595959', marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 26, color: '#038390', marginBottom: 4 }}>{item.price}</div>
                  <div style={{ fontSize: 11, color: '#737373' }}>{item.note}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center' as const }}>
              <Link href="/pricing" style={{ fontSize: 14, color: '#038390', fontWeight: 700, textDecoration: 'none' }}>
                {c.priceLink}
              </Link>
            </div>
          </div>
        </section>

        {/* ── SELF-SERVICE / BOUNDARIES ── */}
        <section style={{ background: '#F0F7F8', ...sectionPad }}>
          <div style={{ ...narrowCol, background: '#ffffff', border: '1px solid rgba(3,131,144,0.15)', borderRadius: 16, padding: 'clamp(20px,4vw,32px)' }}>
            <h2 style={{ ...h2Style, fontSize: 'clamp(20px,2.2vw,24px)' }}>{c.boundH2}</h2>
            <p style={{ ...bodyStyle, fontSize: 14, marginBottom: 10 }}>{c.boundP1}</p>
            <p style={{ ...bodyStyle, fontSize: 14 }}>{c.boundP2}</p>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ background: '#ffffff', ...sectionPad, textAlign: 'center' as const }}>
          <div style={narrowCol}>
            <h2 style={h2Style}>{c.ctaH2}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12, justifyContent: 'center', marginTop: 20, marginBottom: 28 }}>
              <Link href="/tax-return" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 50, padding: '13px 28px', borderRadius: 12, background: '#038390', color: '#ffffff', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
                {c.ctaPrimary}
              </Link>
              <Link href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 50, padding: '13px 28px', borderRadius: 12, background: '#F0F7F8', color: '#038390', border: '1px solid rgba(3,131,144,0.3)', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
                {c.ctaSecondary}
              </Link>
            </div>
            <Link href="/our-story" style={{ fontSize: 13, color: '#737373', textDecoration: 'underline' }}>
              {c.storyLink}
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
