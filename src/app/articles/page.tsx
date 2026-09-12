'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// Фіксовані частини (href/cover не залежать від мови)
const PUBLISHED_META = [
  { href: '/articles/rwr-karte', cover: '/articles/rwr-karte-cover.jpg' },
  { href: '/articles/gewerbeanmeldung', cover: '/articles/gewerbeanmeldung-cover.jpg' },
  { href: '/articles/austria-id', cover: '/articles/austria-id-cover.jpg' },
  { href: '/articles/invalidity-child', cover: '/articles/invalidity-cover.jpg' },
  { href: '/articles/gisa-formular', cover: '/articles/gisa-cover.jpg' },
]
const UPCOMING_HREFS = ['/articles/svs-formular', '/articles/finanz-online', '/articles/mvk-pension']

// Переклади сторінки "Статті" — всі 4 мови
const ARTICLES_PAGE_TEXT: Record<string, any> = {
  UA: {
    badge: 'Статті',
    h1Before: 'Гайди та ',
    h1Em: 'ресурси',
    subheading: 'Практичні матеріали про податки, документи, роботу, самозайнятість та життя в Австрії.',
    publishedLabel: 'Опубліковано',
    upcomingLabel: 'Незабаром',
    readMore: 'Читати →',
    soon: 'Скоро',
    published: [
      { tag: 'Гайд', date: '2026-07-21', title: 'Як підготуватися до подачі на RWR+ карту', desc: 'Покроковий огляд підготовки до подачі: документи, фінансові вимоги та чеклісти для різних робочих ситуацій.', readTime: '~15 хвилин' },
      { tag: 'Реєстрація бізнесу', date: 'Червень 2026', title: 'Gewerbeanmeldung в Австрії: покрокова реєстрація самозайнятості', desc: 'Покроковий огляд Gewerbeanmeldung: які документи можуть знадобитися, куди подавати заяву та на що звернути увагу під час реєстрації.', readTime: '15 хв читання' },
      { tag: 'Австрія · Документи', date: 'Червень 2026', title: 'Як оформити ID Austria: покроковий гайд для іноземців', desc: 'Як оформити ID Austria та використовувати її для доступу до цифрових державних сервісів, зокрема FinanzOnline.', readTime: '8 хв читання' },
      { tag: "Сім'я · Пільги", date: 'Червень 2026', title: 'Інвалідність дитини в Австрії: виплати, пільги та з чого почати', desc: 'Огляд основних тем для батьків: Behindertenpass, підвищена Familienbeihilfe, Pflegegeld та можливі податкові пільги.', readTime: '10 хв читання' },
      { tag: 'GISA · Реєстрація', date: 'Червень 2026', title: 'Реєстрація на сайті GISA: покрокова інструкція', desc: 'Покрокова інструкція з онлайн-подання Gewerbeanmeldung через GISA з поясненням основних полів і етапів.', readTime: '15 хв читання' },
    ],
    upcoming: [
      { tag: 'SVS', title: 'Як заповнити формуляр SVS', desc: "Соціальне страхування самозайнятих — що вказати, щоб не переплатити і підключити сім'ю." },
      { tag: 'FinanzOnline', title: 'Як заповнити формуляр FinanzOnline', desc: 'Реєстрація в податковій онлайн — покроково, що вказати і як не помилитись з КВЕДом.' },
      { tag: 'MVK', title: 'Як обрати пенсійний фонд MVK', desc: 'Що таке Mitarbeitervorsorgekasse, навіщо потрібен і як не пропустити дедлайн 6 місяців.' },
    ],
  },
  RU: {
    badge: 'Статьи',
    h1Before: 'Гайды и ',
    h1Em: 'ресурсы',
    subheading: 'Практические материалы о налогах, документах, работе, самозанятости и жизни в Австрии.',
    publishedLabel: 'Опубликовано',
    upcomingLabel: 'Скоро',
    readMore: 'Читать →',
    soon: 'Скоро',
    published: [
      { tag: 'Гайд', date: '2026-07-21', title: 'Как подготовиться к подаче на RWR+ карту', desc: 'Пошаговый обзор подготовки к подаче: документы, финансовые требования и чек-листы для разных рабочих ситуаций.', readTime: '~15 минут' },
      { tag: 'Регистрация бизнеса', date: 'Июнь 2026', title: 'Gewerbeanmeldung в Австрии: пошаговая регистрация самозанятости', desc: 'Пошаговый обзор Gewerbeanmeldung: какие документы могут понадобиться, куда подавать заявление и на что обратить внимание при регистрации.', readTime: '15 мин чтения' },
      { tag: 'Австрия · Документы', date: 'Июнь 2026', title: 'Как оформить ID Austria: пошаговый гайд для иностранцев', desc: 'Как оформить ID Austria и использовать её для доступа к цифровым государственным сервисам, включая FinanzOnline.', readTime: '8 мин чтения' },
      { tag: 'Семья · Льготы', date: 'Июнь 2026', title: 'Инвалидность ребёнка в Австрии: выплаты, льготы и с чего начать', desc: 'Обзор основных тем для родителей: Behindertenpass, повышенная Familienbeihilfe, Pflegegeld и возможные налоговые льготы.', readTime: '10 мин чтения' },
      { tag: 'GISA · Регистрация', date: 'Июнь 2026', title: 'Регистрация на сайте GISA: пошаговая инструкция', desc: 'Пошаговая инструкция по онлайн-подаче Gewerbeanmeldung через GISA с пояснением основных полей и этапов.', readTime: '15 мин чтения' },
    ],
    upcoming: [
      { tag: 'SVS', title: 'Как заполнить формуляр SVS', desc: 'Социальное страхование самозанятых — что указать, чтобы не переплатить и подключить семью.' },
      { tag: 'FinanzOnline', title: 'Как заполнить формуляр FinanzOnline', desc: 'Регистрация в налоговой онлайн — пошагово, что указать и как не ошибиться с КВЕДом.' },
      { tag: 'MVK', title: 'Как выбрать пенсионный фонд MVK', desc: 'Что такое Mitarbeitervorsorgekasse, зачем нужен и как не пропустить дедлайн 6 месяцев.' },
    ],
  },
  EN: {
    badge: 'Articles',
    h1Before: 'Guides & ',
    h1Em: 'Resources',
    subheading: 'Practical resources about taxes, documents, work, self-employment and life in Austria.',
    publishedLabel: 'Published',
    upcomingLabel: 'Coming Soon',
    readMore: 'Read →',
    soon: 'Soon',
    published: [
      { tag: 'Guide', date: '2026-07-21', title: 'How to prepare your RWR+ card application', desc: 'A step-by-step overview of how to prepare: documents, financial requirements and checklists for different work situations.', readTime: '~15 min' },
      { tag: 'Business registration', date: 'June 2026', title: 'Gewerbeanmeldung in Austria: step-by-step self-employment registration', desc: 'A step-by-step overview of Gewerbeanmeldung: which documents may be needed, where to submit the application and what to consider during registration.', readTime: '15 min read' },
      { tag: 'Austria · Documents', date: 'June 2026', title: 'How to get ID Austria: step-by-step guide for foreigners', desc: 'How to set up ID Austria and use it to access digital government services, including FinanzOnline.', readTime: '8 min read' },
      { tag: 'Family · Benefits', date: 'June 2026', title: 'Child disability in Austria: payments, benefits, and where to start', desc: 'An overview of key topics for parents: Behindertenpass, increased Familienbeihilfe, Pflegegeld and possible tax benefits.', readTime: '10 min read' },
      { tag: 'GISA · Registration', date: 'June 2026', title: 'Registering on the GISA website: step-by-step instructions', desc: 'A step-by-step guide to submitting a Gewerbeanmeldung online via GISA, with explanations of the main fields and stages.', readTime: '15 min read' },
    ],
    upcoming: [
      { tag: 'SVS', title: 'How to fill out the SVS form', desc: 'Social insurance for the self-employed — what to specify to avoid overpaying and add family members.' },
      { tag: 'FinanzOnline', title: 'How to fill out the FinanzOnline form', desc: 'Registering with the tax office online — step by step, what to fill in and how to avoid mistakes with the KVED code.' },
      { tag: 'MVK', title: 'How to choose an MVK pension fund', desc: 'What Mitarbeitervorsorgekasse is, why you need it, and how not to miss the 6-month deadline.' },
    ],
  },
  DE: {
    badge: 'Artikel',
    h1Before: 'Anleitungen & ',
    h1Em: 'Ressourcen',
    subheading: 'Praktische Informationen zu Steuern, Dokumenten, Arbeit, Selbstständigkeit und dem Leben in Österreich.',
    publishedLabel: 'Veröffentlicht',
    upcomingLabel: 'Demnächst',
    readMore: 'Lesen →',
    soon: 'Bald',
    published: [
      { tag: 'Anleitung', date: '2026-07-21', title: 'Wie du dich auf die RWR+ Karte vorbereitest', desc: 'Ein Schritt-für-Schritt-Überblick zur Vorbereitung: Dokumente, finanzielle Voraussetzungen und Checklisten für unterschiedliche Arbeitssituationen.', readTime: '~15 Min.' },
      { tag: 'Gewerbeanmeldung', date: 'Juni 2026', title: 'Gewerbeanmeldung in Österreich: Schritt-für-Schritt zur Selbstständigkeit', desc: 'Ein Schritt-für-Schritt-Überblick zur Gewerbeanmeldung: welche Unterlagen benötigt werden können, wo die Anmeldung erfolgt und worauf bei der Registrierung zu achten ist.', readTime: '15 Min. Lesezeit' },
      { tag: 'Österreich · Dokumente', date: 'Juni 2026', title: 'ID Austria beantragen: Schritt-für-Schritt-Anleitung für Ausländer', desc: 'So richtest du die ID Austria ein und nutzt sie für den Zugang zu digitalen Behördenservices, darunter FinanzOnline.', readTime: '8 Min. Lesezeit' },
      { tag: 'Familie · Leistungen', date: 'Juni 2026', title: 'Kindesbehinderung in Österreich: Leistungen, Vergünstigungen und erste Schritte', desc: 'Ein Überblick über wichtige Themen für Eltern: Behindertenpass, erhöhte Familienbeihilfe, Pflegegeld und mögliche steuerliche Begünstigungen.', readTime: '10 Min. Lesezeit' },
      { tag: 'GISA · Anmeldung', date: 'Juni 2026', title: 'Registrierung auf GISA: Schritt-für-Schritt-Anleitung', desc: 'Eine Schritt-für-Schritt-Anleitung zur Online-Gewerbeanmeldung über GISA mit Erklärungen zu den wichtigsten Feldern und Schritten.', readTime: '15 Min. Lesezeit' },
    ],
    upcoming: [
      { tag: 'SVS', title: 'Das SVS-Formular ausfüllen', desc: 'Sozialversicherung für Selbstständige — was du angeben musst, um nicht zu viel zu zahlen und Familienmitglieder mitzuversichern.' },
      { tag: 'FinanzOnline', title: 'Das FinanzOnline-Formular ausfüllen', desc: 'Registrierung beim Finanzamt online — Schritt für Schritt, was auszufüllen ist und wie du Fehler beim ÖNACE-Code vermeidest.' },
      { tag: 'MVK', title: 'Die richtige MVK-Pensionskasse wählen', desc: 'Was die Mitarbeitervorsorgekasse ist, wozu sie dient und wie du die 6-Monats-Frist nicht verpasst.' },
    ],
  },
}

export default function ArticlesPage() {
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

  const t = ARTICLES_PAGE_TEXT[lang] || ARTICLES_PAGE_TEXT.UA
  const published = t.published.map((item: any, i: number) => ({ ...item, ...PUBLISHED_META[i] }))
  const upcoming = t.upcoming.map((item: any, i: number) => ({ ...item, href: UPCOMING_HREFS[i] }))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

      <section style={{ maxWidth: 960, margin: '0 auto', padding: '64px 16px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '4px 12px', borderRadius: 6, marginBottom: 12,
            background: 'var(--peach-light)', color: 'var(--orange)',
          }}>
            {t.badge}
          </div>
          <h1 style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 'clamp(28px,5vw,40px)',
            color: 'var(--charcoal)', marginBottom: 10,
          }}>
            {t.h1Before}<em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>{t.h1Em}</em>
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 520 }}>
            {t.subheading}
          </p>
        </div>

        {/* Published articles */}
        <div style={{ marginBottom: 56 }}>
          <h2 style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 20,
          }}>
            {t.publishedLabel}
          </h2>
          <style>{`
            .card-img { transition: transform 0.4s cubic-bezier(.25,.46,.45,.94); }
            .card-link:hover .card-img { transform: scale(1.07); }
            .card-body-inner { transition: box-shadow 0.3s ease; }
            .card-link:hover .card-body-inner { box-shadow: 0 8px 32px rgba(53,52,52,0.13) !important; }
          `}</style>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 24, alignItems: 'start' }}>
            {published.map((art: any) => (
              <Link key={art.href} href={art.href} className="card-link" style={{ display: 'block', textDecoration: 'none', position: 'relative' }}>
                <div style={{ position: 'relative', width: '100%', height: 190, borderRadius: 14, overflow: 'hidden', zIndex: 1 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={art.cover} alt={art.title} className="card-img" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', display: 'block' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--orange)', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', padding: '4px 10px', borderRadius: 4, zIndex: 2 }}>
                    {art.tag}
                  </div>
                </div>
                <div className="card-body-inner" style={{ position: 'relative', zIndex: 2, background: '#fff', borderRadius: 14, padding: '20px 18px 18px', marginTop: -22, border: '1px solid var(--line)', boxShadow: '0 4px 16px rgba(53,52,52,0.07)', display: 'flex', flexDirection: 'column', minHeight: 200 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.4, marginBottom: 7, minHeight: 60, flex: 'none' }}>{art.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12, minHeight: 58, flex: 1 }}>{art.desc}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: 11, color: 'var(--text3)' }}>{art.date} · {art.readTime}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--orange)' }}>{t.readMore}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming articles */}
        <div>
          <h2 style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 20,
          }}>
            {t.upcomingLabel}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
            {upcoming.map((art: any) => (
              <Link key={art.href} href={art.href} style={{
                display: 'block', background: '#fff', borderRadius: 14,
                padding: 20, border: '1px solid var(--line)',
                textDecoration: 'none', opacity: 0.75,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{
                    display: 'inline-block', fontSize: 11, fontWeight: 700,
                    padding: '3px 10px', borderRadius: 5,
                    background: 'var(--gray)', color: 'var(--text3)',
                  }}>
                    {art.tag}
                  </div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                    textTransform: 'uppercase', color: 'var(--orange)',
                    background: 'var(--peach-light)', padding: '3px 8px', borderRadius: 4,
                  }}>
                    {t.soon}
                  </div>
                </div>
                <h3 style={{
                  fontSize: 14, fontWeight: 600, color: 'var(--charcoal)',
                  marginBottom: 6, lineHeight: 1.4,
                }}>
                  {art.title}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>
                  {art.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </div>
  )
}
