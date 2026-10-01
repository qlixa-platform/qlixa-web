'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { type InternalLangKey, type Locale, localeHref } from '@/lib/locale'

// Фіксовані частини (href/cover не залежать від мови)
const PUBLISHED_META = [
  { href: '/articles/rwr-karte', cover: '/articles/rwr-karte-cover.jpg' },
  { href: '/articles/gewerbeanmeldung', cover: '/articles/gewerbeanmeldung-cover.jpg' },
  { href: '/articles/austria-id', cover: '/articles/austria-id-cover.jpg' },
  { href: '/articles/invalidity-child', cover: '/articles/invalidity-cover.jpg' },
  { href: '/articles/gisa-formular', cover: '/articles/gisa-cover.jpg' },
  // Index 5 — now has a matching 6th entry in all 4 `published` arrays
  // below (EN/UA/RU added alongside their article translations).
  // `cover: null` (not a path) — no real photo exists yet for this
  // article in any locale; the card renders the CSS-based
  // <CoverPlaceholder> below instead of an <img> that would 404. Swap
  // this back to a real path once an approved cover exists — the
  // render logic below already handles both cases.
  { href: '/articles/steuererklaerung-selbst-vorbereiten', cover: null as string | null },
]

// Переклади сторінки "Статті" — всі 4 мови
const ARTICLES_PAGE_TEXT: Record<string, any> = {
  UA: {
    badge: 'Статті',
    h1Before: 'Гайди та ',
    h1Em: 'ресурси',
    subheading: 'Практичні матеріали про податки, документи, роботу, самозайнятість та життя в Австрії.',
    publishedLabel: 'Опубліковано',
    readMore: 'Читати →',
    published: [
      { tag: 'Гайд', date: '2026-07-21', title: 'Як підготуватися до подачі на RWR+ карту', desc: 'Покроковий огляд підготовки до подачі: документи, фінансові вимоги та чеклісти для різних робочих ситуацій.', readTime: '~15 хвилин' },
      { tag: 'Реєстрація бізнесу', date: 'Червень 2026', title: 'Gewerbeanmeldung в Австрії: покрокова реєстрація самозайнятості', desc: 'Покроковий огляд Gewerbeanmeldung: які документи можуть знадобитися, куди подавати заяву та на що звернути увагу під час реєстрації.', readTime: '15 хв читання' },
      { tag: 'Австрія · Документи', date: 'Червень 2026', title: 'Як оформити ID Austria: покроковий гайд для іноземців', desc: 'Як оформити ID Austria та використовувати її для доступу до цифрових державних сервісів, зокрема FinanzOnline.', readTime: '8 хв читання' },
      { tag: "Сім'я · Пільги", date: 'Червень 2026', title: 'Інвалідність дитини в Австрії: виплати, пільги та з чого почати', desc: 'Огляд основних тем для батьків: Behindertenpass, підвищена Familienbeihilfe, Pflegegeld та можливі податкові пільги.', readTime: '10 хв читання' },
      { tag: 'GISA · Реєстрація', date: 'Червень 2026', title: 'Реєстрація на сайті GISA: покрокова інструкція', desc: 'Покрокова інструкція з онлайн-подання Gewerbeanmeldung через GISA з поясненням основних полів і етапів.', readTime: '15 хв читання' },
      // New (Phase 8 EN/UA/RU localization brief). Title is the exact
      // approved UA title from that brief; desc reuses the approved UA
      // meta description (section 2 of the same brief) rather than
      // inventing separate card copy.
      { tag: 'Податкова декларація', date: 'Жовтень 2026', title: 'Як самостійно підготувати податкову декларацію в Австрії: крок за кроком', desc: 'Як самостійно підготувати податкову декларацію в Австрії без вивчення податкових форм. QLIXA проводить крок за кроком через зрозумілі запитання.', readTime: '~5 хв читання' },
    ],
  },
  RU: {
    badge: 'Статьи',
    h1Before: 'Гайды и ',
    h1Em: 'ресурсы',
    subheading: 'Практические материалы о налогах, документах, работе, самозанятости и жизни в Австрии.',
    publishedLabel: 'Опубликовано',
    readMore: 'Читать →',
    published: [
      { tag: 'Гайд', date: '2026-07-21', title: 'Как подготовиться к подаче на RWR+ карту', desc: 'Пошаговый обзор подготовки к подаче: документы, финансовые требования и чек-листы для разных рабочих ситуаций.', readTime: '~15 минут' },
      { tag: 'Регистрация бизнеса', date: 'Июнь 2026', title: 'Gewerbeanmeldung в Австрии: пошаговая регистрация самозанятости', desc: 'Пошаговый обзор Gewerbeanmeldung: какие документы могут понадобиться, куда подавать заявление и на что обратить внимание при регистрации.', readTime: '15 мин чтения' },
      { tag: 'Австрия · Документы', date: 'Июнь 2026', title: 'Как оформить ID Austria: пошаговый гайд для иностранцев', desc: 'Как оформить ID Austria и использовать её для доступа к цифровым государственным сервисам, включая FinanzOnline.', readTime: '8 мин чтения' },
      { tag: 'Семья · Льготы', date: 'Июнь 2026', title: 'Инвалидность ребёнка в Австрии: выплаты, льготы и с чего начать', desc: 'Обзор основных тем для родителей: Behindertenpass, повышенная Familienbeihilfe, Pflegegeld и возможные налоговые льготы.', readTime: '10 мин чтения' },
      { tag: 'GISA · Регистрация', date: 'Июнь 2026', title: 'Регистрация на сайте GISA: пошаговая инструкция', desc: 'Пошаговая инструкция по онлайн-подаче Gewerbeanmeldung через GISA с пояснением основных полей и этапов.', readTime: '15 мин чтения' },
      // New (Phase 8 EN/UA/RU localization brief). Title is the exact
      // approved RU title from that brief; desc reuses the approved RU
      // meta description (section 2 of the same brief).
      { tag: 'Налоговая декларация', date: 'Октябрь 2026', title: 'Как самостоятельно подготовить налоговую декларацию в Австрии: пошагово', desc: 'Как самостоятельно подготовить налоговую декларацию в Австрии без изучения налоговых форм. QLIXA шаг за шагом проводит вас через понятные вопросы.', readTime: '~5 мин чтения' },
    ],
  },
  EN: {
    badge: 'Articles',
    h1Before: 'Guides & ',
    h1Em: 'Resources',
    subheading: 'Practical resources about taxes, documents, work, self-employment and life in Austria.',
    publishedLabel: 'Published',
    readMore: 'Read →',
    published: [
      { tag: 'Guide', date: '2026-07-21', title: 'How to prepare your RWR+ card application', desc: 'A step-by-step overview of how to prepare: documents, financial requirements and checklists for different work situations.', readTime: '~15 min' },
      { tag: 'Business registration', date: 'June 2026', title: 'Gewerbeanmeldung in Austria: step-by-step self-employment registration', desc: 'A step-by-step overview of Gewerbeanmeldung: which documents may be needed, where to submit the application and what to consider during registration.', readTime: '15 min read' },
      { tag: 'Austria · Documents', date: 'June 2026', title: 'How to get ID Austria: step-by-step guide for foreigners', desc: 'How to set up ID Austria and use it to access digital government services, including FinanzOnline.', readTime: '8 min read' },
      { tag: 'Family · Benefits', date: 'June 2026', title: 'Child disability in Austria: payments, benefits, and where to start', desc: 'An overview of key topics for parents: Behindertenpass, increased Familienbeihilfe, Pflegegeld and possible tax benefits.', readTime: '10 min read' },
      { tag: 'GISA · Registration', date: 'June 2026', title: 'Registering on the GISA website: step-by-step instructions', desc: 'A step-by-step guide to submitting a Gewerbeanmeldung online via GISA, with explanations of the main fields and stages.', readTime: '15 min read' },
      // New (Phase 8 EN/UA/RU localization brief). Title is the exact
      // approved EN title from that brief; desc reuses the approved EN
      // meta description (section 2 of the same brief).
      { tag: 'Tax Return', date: 'October 2026', title: 'How to Prepare Your Tax Return in Austria: Step by Step', desc: 'Prepare your tax return in Austria without having to understand every tax form first. QLIXA guides you through your situation with clear, step-by-step questions.', readTime: '~6 min read' },
    ],
  },
  DE: {
    badge: 'Artikel',
    h1Before: 'Anleitungen & ',
    h1Em: 'Ressourcen',
    subheading: 'Praktische Informationen zu Steuern, Dokumenten, Arbeit, Selbstständigkeit und dem Leben in Österreich.',
    publishedLabel: 'Veröffentlicht',
    readMore: 'Lesen →',
    published: [
      { tag: 'Anleitung', date: '2026-07-21', title: 'Wie du dich auf die RWR+ Karte vorbereitest', desc: 'Ein Schritt-für-Schritt-Überblick zur Vorbereitung: Dokumente, finanzielle Voraussetzungen und Checklisten für unterschiedliche Arbeitssituationen.', readTime: '~15 Min.' },
      { tag: 'Gewerbeanmeldung', date: 'Juni 2026', title: 'Gewerbeanmeldung in Österreich: Schritt-für-Schritt zur Selbstständigkeit', desc: 'Ein Schritt-für-Schritt-Überblick zur Gewerbeanmeldung: welche Unterlagen benötigt werden können, wo die Anmeldung erfolgt und worauf bei der Registrierung zu achten ist.', readTime: '15 Min. Lesezeit' },
      { tag: 'Österreich · Dokumente', date: 'Juni 2026', title: 'ID Austria beantragen: Schritt-für-Schritt-Anleitung für Ausländer', desc: 'So richtest du die ID Austria ein und nutzt sie für den Zugang zu digitalen Behördenservices, darunter FinanzOnline.', readTime: '8 Min. Lesezeit' },
      { tag: 'Familie · Leistungen', date: 'Juni 2026', title: 'Kindesbehinderung in Österreich: Leistungen, Vergünstigungen und erste Schritte', desc: 'Ein Überblick über wichtige Themen für Eltern: Behindertenpass, erhöhte Familienbeihilfe, Pflegegeld und mögliche steuerliche Begünstigungen.', readTime: '10 Min. Lesezeit' },
      { tag: 'GISA · Anmeldung', date: 'Juni 2026', title: 'Registrierung auf GISA: Schritt-für-Schritt-Anleitung', desc: 'Eine Schritt-für-Schritt-Anleitung zur Online-Gewerbeanmeldung über GISA mit Erklärungen zu den wichtigsten Feldern und Schritten.', readTime: '15 Min. Lesezeit' },
      // New (Phase 8 new-article brief; EN/UA/RU added in the follow-up
      // localization brief — all 4 `published` arrays now carry this
      // 6th entry).
      { tag: 'Steuererklärung', date: 'Oktober 2026', title: 'Steuererklärung in Österreich selbst vorbereiten: Schritt für Schritt', desc: 'Steuererklärung in Österreich selbst vorbereiten – auch ohne Steuerformulare zu kennen. QLIXA führt dich mit verständlichen Fragen Schritt für Schritt durch deine Situation.', readTime: '~5 Min. Lesezeit' },
    ],
  },
}

// Localized main word for the placeholder cover below — the only part
// of it that changes per language (Phase 8 EN/UA/RU localization brief:
// "localize the main word appropriately while keeping tax form labels
// E1 · L1 · L1k unchanged"). "QLIXA" also stays unchanged — it's a
// brand name, not a translatable word.
const COVER_PLACEHOLDER_LABEL: Record<string, string> = {
  DE: 'Steuererklärung',
  EN: 'Tax Return',
  UA: 'Податкова декларація',
  RU: 'Налоговая декларация',
}

// Temporary cover placeholder — used ONLY for the one card whose
// PUBLISHED_META entry has `cover: null` (currently just the new
// Steuererklärung/Tax Return article, in all 4 locales). The 5 existing
// covers are untouched real photos; this never renders for them.
// Minimal CSS/typography only — no image request, no new dependency —
// fills the exact same 190px-tall box the real <img> covers use, so
// it's responsive at the same dimensions automatically. Swap
// PUBLISHED_META's `cover: null` back to a real path once an approved
// photo exists; this component can then be deleted.
function CoverPlaceholder({ lang }: { lang: InternalLangKey }) {
  const label = COVER_PLACEHOLDER_LABEL[lang] || COVER_PLACEHOLDER_LABEL.DE
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(135deg, #038390 0%, #026B76 100%)',
      display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center',
      gap: 4, color: '#fff', textAlign: 'center' as const,
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.3px' }}>{label}</span>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.5px' }}>E1 · L1 · L1k</span>
      <span style={{ fontSize: 15, margin: '2px 0' }}>→</span>
      <span style={{ fontFamily: 'DM Serif Display, serif', fontStyle: 'italic' as const, fontSize: 16 }}>QLIXA</span>
    </div>
  )
}

// `locale` is an EXPLICIT, separately-passed prop — deliberately not
// derived from `lang` here. ArticlesContent is shared by both the old,
// un-prefixed "/articles" route (src/app/articles/page.tsx, which only
// ever passes `lang`) and the new localized "/[locale]/articles" route
// (which passes both). Deriving `locale` from `lang` internally would
// make the old "/articles" route's Navbar/Footer switch into localized
// mode too, which must not happen during this coexistence phase — see
// QLIXA_I18N_MIGRATION_PLAN.md, Phase 6.
//
// Card links: every article-card href below stays a plain, unprefixed
// "/articles/<slug>" path in BOTH modes — individual localized article
// routes do not exist yet (Phase 6, Batch A scope). Do not wrap these in
// localeHref() until the corresponding /[locale]/articles/<slug> routes
// actually exist.
export default function ArticlesContent({ lang, locale }: { lang: InternalLangKey; locale?: Locale }) {
  const t = ARTICLES_PAGE_TEXT[lang] || ARTICLES_PAGE_TEXT.UA
  const rawPublished = t.published.map((item: any, i: number) => ({ ...item, ...PUBLISHED_META[i] }))
  // The newest article only has a localized route
  // (/[locale]/articles/steuererklaerung-selbst-vorbereiten) — no flat,
  // un-prefixed /articles/steuererklaerung-selbst-vorbereiten page
  // exists. Hide its card entirely on the flat/legacy route (locale
  // undefined) so this index never links to a route that 404s; the
  // card shows normally on every /[locale]/articles route.
  const published = locale ? rawPublished : rawPublished.filter((art: any) => art.href !== '/articles/steuererklaerung-selbst-vorbereiten')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar locale={locale} />

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
              <Link key={art.href} href={locale ? localeHref(locale, art.href) : art.href} className="card-link" style={{ display: 'block', textDecoration: 'none', position: 'relative' }}>
                <div style={{ position: 'relative', width: '100%', height: 190, borderRadius: 14, overflow: 'hidden', zIndex: 1 }}>
                  {art.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={art.cover} alt={art.title} className="card-img" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', display: 'block' }} />
                  ) : (
                    <CoverPlaceholder lang={lang} />
                  )}
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

      </section>

      <Footer locale={locale} />
    </div>
  )
}
