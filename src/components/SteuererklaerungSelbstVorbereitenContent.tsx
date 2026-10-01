'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArticleSidebar, ArticleTOC } from '@/components/layout/ArticleNav'
import Badge from '@/components/ui/Badge'
import ButtonLink from '@/components/ui/ButtonLink'
import { type InternalLangKey, type Locale, localeHref } from '@/lib/locale'

// Local helpers, following the exact pattern already established in the
// 5 existing article components (AustriaIdContent.tsx etc.) — small,
// article-scoped presentational pieces rather than new shared/global
// components, since nothing outside this one article needs them yet.

// EMPHASIS — the brief's "key sentence" call-outs. Reuses the existing
// left-border highlight treatment already used repeatedly in
// RwrKarteContent.tsx (borderLeft 3px solid teal + paddingLeft) instead
// of inventing a new visual device.
function Emphasis({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      borderLeft: '3px solid #038390', paddingLeft: 16,
      margin: '20px 0', fontSize: 15, fontWeight: 600,
      color: 'var(--charcoal)', lineHeight: 1.7,
    }}>
      {children}
    </p>
  )
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#038390', fontWeight: 600, textDecoration: 'underline', textDecorationColor: 'var(--peach-mid)', textUnderlineOffset: 3, fontSize: 13 }}>
      {children} ↗
    </a>
  )
}

// Translations — DE ONLY for this step. Deliberately not a 4-language
// Record like the other article components: EN/UA/RU content has not
// been approved yet (QLIXA_I18N_MIGRATION_PLAN.md Phase 8 new-article
// brief — "Do not create placeholder translations"). The dispatcher
// (src/app/[locale]/articles/[slug]/page.tsx) only ever renders this
// component for locale === 'de', so `lang` is always 'DE' in practice;
// the `T.DE` fallback below exists only so this component never throws
// if that invariant is ever violated, not as a stand-in for real
// translations.
const T: Record<string, {
  tag1: string; tag2: string; tag3: string
  titleLine1: string; titleEm: string
  metaTime: string
  toc: [string, string][]
  backLink: string
  intro1: string; intro2: string
  emphasis1: string; intro3: string
  emphasis2: string; intro4: string

  h2AbgabeBefore: string; h2AbgabeEm: string
  abgabeP1: string; abgabeP2: string; abgabeP3: string; abgabeP4: string
  abgabeP5: string; abgabeP6: string; abgabeP7: string

  h2SituationBefore: string; h2SituationEm: string
  situationIntro: string
  fragen: string[]
  situationQuoteLead: string
  situationQuote: string
  situationP1: string
  emphasis3: string
  situationP2: string
  emphasis4: string

  ctaLabel: string

  h2FormulareBefore: string; h2FormulareEm: string
  formulareP1: string; formulareP2: string; formulareP3: string
  formulareQ: string
  formulareLeadIn: string
  formulareQuote: string
  formulareQuestions: string[]
  emphasis5: string
  formulareP4: string

  h2VorwissenBefore: string; h2VorwissenEm: string
  vorwissenP1: string; vorwissenP2: string; vorwissenP3: string; vorwissenP4: string
  emphasis6: string

  h2ErgebnisBefore: string; h2ErgebnisEm: string
  emphasis7: string
  ergebnisP1: string
  emphasis8: string
  ergebnisP2: string

  h2FinanzonlineBefore: string; h2FinanzonlineEm: string
  finanzP1: string
  emphasis9: string
  finanzP2: string
  finanzLinkLabel: string

  h2SelbstBefore: string; h2SelbstEm: string
  selbstP1: string
  selbstLeadIn: string
  flow: string[]
  selbstP2: string
  emphasis10: string

  finalHeading: string
  finalP1: string
  finalP2: string
  finalCta: string
}> = {
  DE: {
    tag1: 'Steuererklärung', tag2: 'Selbst vorbereiten', tag3: 'Österreich',
    titleLine1: 'Steuererklärung in Österreich selbst vorbereiten:', titleEm: 'Schritt für Schritt',
    metaTime: '🕐 ~5 Min. Lesezeit',
    toc: [
      ['#abgabe', 'Muss ich eine Steuererklärung abgeben?'],
      ['#situation', 'Fang mit deiner Situation an'],
      ['#formulare', 'E1, L1, L1k & Co.'],
      ['#vorwissen', 'Brauche ich Vorwissen?'],
      ['#ergebnis', 'Was bekomme ich am Ende?'],
      ['#finanzonline', 'Einreichung über FinanzOnline'],
      ['#selbst', 'Selbst vorbereiten – der Weg'],
    ],
    backLink: '← Alle Artikel',

    intro1: 'Du möchtest deine Steuererklärung in Österreich selbst vorbereiten, weißt aber nicht, wo du anfangen sollst?',
    intro2: 'E1, L1, L1k, FinanzOnline – all diese Begriffe können den Prozess komplizierter erscheinen lassen, als er sein muss.',
    emphasis1: 'Die gute Nachricht: Um deine Steuererklärung selbst vorzubereiten, musst du nicht zuerst alle Steuerformulare verstehen oder dich durch das österreichische Steuerrecht arbeiten.',
    intro3: 'Einfacher ist es, mit dem anzufangen, was du bereits weißt: Wo hast du gearbeitet? Welche Einkünfte hattest du? Gab es zusätzliche Ausgaben? Hast du Kinder? Und was war in diesem Steuerjahr sonst noch wichtig?',
    emphasis2: 'Genau hier setzt die Grundidee von QLIXA an.',
    intro4: 'Statt mit Steuerformularen beginnst du mit verständlichen Fragen zu deiner persönlichen Situation.',

    h2AbgabeBefore: 'Muss ich überhaupt eine ', h2AbgabeEm: 'Steuererklärung abgeben?',
    abgabeP1: 'Das hängt von deiner Situation ab.',
    abgabeP2: 'Wenn du angestellt bist, erhält das Finanzamt bereits einen Teil deiner Einkommensdaten über deinen Arbeitgeber – insbesondere über den Jahreslohnzettel.',
    abgabeP3: 'In bestimmten Fällen kann das Finanzamt sogar eine antragslose Arbeitnehmerveranlagung durchführen, ohne dass du selbst eine Steuererklärung eingereicht hast.',
    abgabeP4: 'Das bedeutet aber nicht, dass du selbst nichts mehr angeben kannst oder dass bereits alle persönlichen Umstände berücksichtigt wurden.',
    abgabeP5: 'Vielleicht hattest du zusätzliche berufliche Ausgaben. Vielleicht gibt es Aufwendungen oder Umstände im Zusammenhang mit deiner Familie oder deinen Kindern. Auch Werbungskosten, bestimmte Sonderausgaben oder außergewöhnliche Belastungen können bei einer Arbeitnehmerveranlagung relevant sein.',
    abgabeP6: 'Selbst wenn das Finanzamt bereits eine antragslose Arbeitnehmerveranlagung durchgeführt hat, kannst du innerhalb der vorgesehenen Fünfjahresfrist eine Arbeitnehmerveranlagung einreichen und zusätzliche Angaben machen. Das Finanzamt hebt dann den Bescheid aus der antragslosen Veranlagung auf und entscheidet auf Grundlage deiner eingereichten Steuererklärung neu.',
    abgabeP7: 'In anderen Situationen – zum Beispiel bei selbstständiger Tätigkeit oder bestimmten zusätzlichen Einkünften – kann eine Einkommensteuererklärung erforderlich sein. Aber bevor du herausfinden musst, welches Steuerformular zu welchem Fall gehört, kannst du viel einfacher anfangen.',

    h2SituationBefore: 'Fang nicht mit Steuerformularen an – ', h2SituationEm: 'fang mit deiner Situation an',
    situationIntro: 'Stell dir stattdessen einfachere Fragen zu deiner eigenen Situation:',
    fragen: [
      'Warst du angestellt?',
      'Warst du selbstständig?',
      'Oder vielleicht beides?',
      'Hast du Kinder?',
      'Gab es zusätzliche Einkünfte?',
      'Berufliche Ausgaben?',
      'Einkünfte aus dem Ausland oder aus Vermietung?',
    ],
    situationQuoteLead: 'Solche Fragen sind wesentlich leichter zu beantworten als:',
    situationQuote: 'Brauche ich E1, L1, L1k oder noch eine andere Beilage?',
    situationP1: 'Und genau so funktioniert QLIXA.',
    emphasis3: 'Die nächsten Fragen hängen von deinen vorherigen Antworten ab.',
    situationP2: 'Statt vor einem großen Steuerformular mit vielen unbekannten Feldern zu sitzen, gehst du Schritt für Schritt durch deine eigene Situation.',
    emphasis4: 'So werden nach und nach die Informationen erfasst, die für die Vorbereitung deiner Steuererklärung benötigt werden.',

    ctaLabel: 'So funktioniert QLIXA Tax Return →',

    h2FormulareBefore: 'Und was ist mit E1, L1, L1k und den ', h2FormulareEm: 'anderen Steuerformularen?',
    formulareP1: 'Ja, in Österreich gibt es unterschiedliche Steuerformulare und Beilagen.',
    formulareP2: 'Für die Arbeitnehmerveranlagung wird grundsätzlich L1 verwendet. Je nach Situation können zusätzliche Beilagen notwendig sein – zum Beispiel L1k für bestimmte Angaben im Zusammenhang mit Kindern, L1ab für außergewöhnliche Belastungen oder L1i für bestimmte internationale Sachverhalte.',
    formulareP3: 'Für eine Einkommensteuererklärung wird E1 verwendet; abhängig von den Einkünften und der persönlichen Situation können weitere Beilagen erforderlich sein.',
    formulareQ: 'Klingt kompliziert?',
    formulareLeadIn: 'Genau deshalb beginnt QLIXA nicht mit der Frage:',
    formulareQuote: 'Welches Steuerformular möchtest du ausfüllen?',
    formulareQuestions: [
      'Wie hast du gearbeitet?',
      'Welche Einkünfte hattest du?',
      'Hast du Kinder?',
      'Welche Ausgaben hattest du?',
    ],
    emphasis5: 'Wenn du QLIXA nutzt, musst du die Vorbereitung deiner Steuererklärung nicht damit beginnen, die Namen und Nummern der Steuerformulare zu lernen.',
    formulareP4: 'Du beantwortest verständliche Fragen zu deiner Situation. QLIXA nutzt deine Angaben anschließend für die Vorbereitung deiner Steuererklärung im Rahmen der unterstützten Fälle.',

    h2VorwissenBefore: 'Muss ich vorher wissen, welche ', h2VorwissenEm: 'Ausgaben und Angaben ich brauche?',
    vorwissenP1: 'Nein – genau das ist einer der Vorteile dieses Ansatzes.',
    vorwissenP2: 'Du musst nicht zuerst eine lange Liste von Steuerkategorien durchgehen und selbst herausfinden, in welches Feld eines Steuerformulars eine bestimmte Angabe gehört.',
    vorwissenP3: 'QLIXA stellt dir Schritt für Schritt passende Fragen auf Basis deiner vorherigen Antworten und hilft dabei, mögliche Kategorien zu prüfen, die zu deinen Angaben passen können.',
    vorwissenP4: 'Natürlich bedeutet das nicht, dass jede Ausgabe automatisch steuerlich berücksichtigt werden kann. Für unterschiedliche Kategorien gelten unterschiedliche Voraussetzungen.',
    emphasis6: 'Du musst nicht zuerst den Aufbau einer österreichischen Steuererklärung lernen, um mit der Vorbereitung deiner Steuererklärung zu beginnen.',

    h2ErgebnisBefore: 'Was bekomme ich ', h2ErgebnisEm: 'am Ende?',
    emphasis7: 'QLIXA ist nicht einfach ein Fragebogen, nach dem du nur eine Liste deiner Antworten erhältst.',
    ergebnisP1: 'Du gehst durch den adaptiven Fragebogen. Deine Angaben werden anschließend verwendet, um deine Steuererklärung und – soweit für den unterstützten Fall erforderlich – die entsprechenden Beilagen vorzubereiten.',
    emphasis8: 'Am Ende erhältst du eine vorbereitete Steuererklärung, die du selbst prüfen und anschließend einreichen kannst.',
    ergebnisP2: 'Damit führt der Weg nicht von einem Fragebogen zu noch mehr Formularen, sondern von deinen Antworten zu einer vorbereiteten Steuererklärung.',

    h2FinanzonlineBefore: 'Wie kommt meine Steuererklärung ', h2FinanzonlineEm: 'zum Finanzamt?',
    finanzP1: 'QLIXA reicht deine Steuererklärung nicht für dich beim Finanzamt ein.',
    emphasis9: 'QLIXA bereitet deine Steuererklärung vor. Du prüfst sie und reichst sie anschließend selbst ein.',
    finanzP2: 'Die Arbeitnehmerveranlagung kann beispielsweise elektronisch über FinanzOnline übermittelt werden. Das BMF nennt daneben auch die persönliche bzw. postalische Abgabe der entsprechenden Papierformulare.',
    finanzLinkLabel: 'Mehr über FinanzOnline erfahren',

    h2SelbstBefore: 'Kann ich meine Steuererklärung also wirklich ', h2SelbstEm: 'selbst vorbereiten?',
    selbstP1: 'Ja. Und du musst dafür nicht zuerst die Namen aller österreichischen Steuerformulare lernen.',
    selbstLeadIn: 'Mit QLIXA ist der Weg einfacher aufgebaut:',
    flow: ['Deine Situation', 'Verständliche Fragen', 'Relevante Angaben', 'Vorbereitete Steuererklärung', 'Deine Prüfung', 'Selbstständige Einreichung'],
    selbstP2: 'Du beginnst also nicht mit E1, L1 oder L1k.',
    emphasis10: 'Du beginnst mit dem, was du bereits kennst: deiner eigenen Situation.',

    finalHeading: 'Steuererklärung mit QLIXA vorbereiten',
    finalP1: 'Du musst nicht zuerst E1, L1 und zusätzliche Steuerformulare verstehen.',
    finalP2: 'Beantworte verständliche Fragen zu deiner Situation und geh mit QLIXA Schritt für Schritt bis zu deiner vorbereiteten Steuererklärung.',
    finalCta: 'Steuererklärung mit QLIXA vorbereiten →',
  },
}

// Official BMF/FinanzOnline destination only, per the Phase 8 new-
// article brief — no commercial tax-service link.
const FINANZONLINE_URL = 'https://finanzonline.bmf.gv.at/'

const CABINET_BASE = 'https://cabinet-ten-lac.vercel.app/login'

// `locale`, when provided, makes this page's own internal links
// locale-aware via localeHref — same dual-mode contract as every other
// *Content component (see AustriaIdContent.tsx's own doc comment). This
// component is currently only ever reached with locale === 'de' (see
// the dispatcher's own comment), but the prop is kept optional and
// handled generically rather than hardcoding '/de/...' paths, so it
// costs nothing to extend once EN/UA/RU content is approved.
export default function SteuererklaerungSelbstVorbereitenContent({ lang, locale }: { lang: InternalLangKey; locale?: Locale }) {
  const t = T[lang] || T.DE
  const cabinetUrl = `${CABINET_BASE}?lang=${lang === 'UA' ? 'uk' : lang.toLowerCase()}`

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar locale={locale} />

      {/* Hero — text-only: no cover photo exists yet for this article
          (unlike the 5 existing articles, which each have a dedicated
          photo). Omitting the image column keeps the hero honest rather
          than inventing or reusing an unrelated image; the two-column
          .article-hero-row/.article-hero-image pattern can be added
          later once a real cover exists. */}
      <section style={{ background: '#F0F7F8', padding: '56px clamp(20px,6vw,80px) 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' as const }}>
            <Badge variant="tagPrimary">{t.tag1}</Badge>
            <Badge variant="tagSecondary">{t.tag2}</Badge>
            <Badge variant="tagSecondary">{t.tag3}</Badge>
          </div>
          <h1 className="article-h1" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 16 }}>
            {t.titleLine1}<br />
            <em style={{ color: '#038390', fontStyle: 'italic' }}>{t.titleEm}</em>
          </h1>
          <div className="article-meta-row" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const, fontSize: 13, color: 'var(--color-gray)' }}>
            <span>{t.metaTime}</span>
          </div>
        </div>
      </section>

      {/* Article body + sidebar */}
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '48px 16px 80px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>

        {/* Sidebar — lists the 5 existing published articles (this new
            article is intentionally not yet registered in
            src/lib/articles.ts; see this task's final report for why),
            so it never highlights itself as "current" here. */}
        <ArticleSidebar currentSlug="steuererklaerung-selbst-vorbereiten" lang={lang} locale={locale} />

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          <ArticleTOC items={t.toc} lang={lang} />

          {/* Back link */}
          <Link href={locale ? localeHref(locale, '/articles') : '/articles'} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text3)', textDecoration: 'none', marginBottom: 32 }}>
            {t.backLink}
          </Link>

          {/* Intro */}
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.intro1}</p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.intro2}</p>
          <Emphasis>{t.emphasis1}</Emphasis>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.intro3}</p>
          <Emphasis>{t.emphasis2}</Emphasis>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 32 }}>{t.intro4}</p>

          {/* 1. Muss ich überhaupt eine Steuererklärung abgeben? */}
          <h2 id="abgabe" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
            {t.h2AbgabeBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.h2AbgabeEm}</em>
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.abgabeP1}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.abgabeP2}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.abgabeP3}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.abgabeP4}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.abgabeP5}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.abgabeP6}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)' }}>{t.abgabeP7}</p>
          </div>

          {/* 2. Fang nicht mit Steuerformularen an */}
          <h2 id="situation" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
            {t.h2SituationBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.h2SituationEm}</em>
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.situationIntro}</p>

            <div className="article-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
              {t.fragen.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--gray)', borderRadius: 10, padding: '11px 14px', border: '1px solid var(--line)' }}>
                  <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 10 }}>{t.situationQuoteLead}</p>
            <p style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--text2)', margin: '0 0 18px', paddingLeft: 14, borderLeft: '2px solid var(--line2)' }}>
              &ldquo;{t.situationQuote}&rdquo;
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.situationP1}</p>
            <Emphasis>{t.emphasis3}</Emphasis>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.situationP2}</p>
            <Emphasis>{t.emphasis4}</Emphasis>
          </div>

          {/* Inline product CTA — links to the current localized DE
              Tax Return page via localeHref, never a hardcoded /de/...
              path, so it never drops the locale. */}
          <Link href={localeHref(locale ?? 'de', '/tax-return')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 18px', borderRadius: 12, border: '1.5px solid #038390', background: 'var(--peach-light)', textDecoration: 'none', marginBottom: 32, flexWrap: 'wrap' as const }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#026B76' }}>{t.ctaLabel}</span>
          </Link>

          {/* 3. E1, L1, L1k und die anderen Steuerformulare */}
          <h2 id="formulare" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
            {t.h2FormulareBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.h2FormulareEm}</em>
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.formulareP1}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.formulareP2}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.formulareP3}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 10, fontWeight: 600 }}>{t.formulareQ}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 10 }}>{t.formulareLeadIn}</p>
            <p style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--text2)', margin: '0 0 18px', paddingLeft: 14, borderLeft: '2px solid var(--line2)' }}>
              &ldquo;{t.formulareQuote}&rdquo;
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 10 }}>Sondern mit Fragen wie:</p>
            <div className="article-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
              {t.formulareQuestions.map((q, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--gray)', borderRadius: 10, padding: '11px 14px', border: '1px solid var(--line)' }}>
                  <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>&ldquo;{q}&rdquo;</span>
                </div>
              ))}
            </div>
            <Emphasis>{t.emphasis5}</Emphasis>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)' }}>{t.formulareP4}</p>
          </div>

          {/* 4. Muss ich vorher wissen, welche Ausgaben ich brauche? */}
          <h2 id="vorwissen" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
            {t.h2VorwissenBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.h2VorwissenEm}</em>
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.vorwissenP1}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.vorwissenP2}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.vorwissenP3}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.vorwissenP4}</p>
            <Emphasis>{t.emphasis6}</Emphasis>
          </div>

          {/* 5. Was bekomme ich am Ende? */}
          <h2 id="ergebnis" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
            {t.h2ErgebnisBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.h2ErgebnisEm}</em>
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <Emphasis>{t.emphasis7}</Emphasis>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.ergebnisP1}</p>
            <Emphasis>{t.emphasis8}</Emphasis>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)' }}>{t.ergebnisP2}</p>
          </div>

          {/* 6. Wie kommt meine Steuererklärung zum Finanzamt? */}
          <h2 id="finanzonline" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
            {t.h2FinanzonlineBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.h2FinanzonlineEm}</em>
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.finanzP1}</p>
            <Emphasis>{t.emphasis9}</Emphasis>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.finanzP2}</p>
            <p><ExtLink href={FINANZONLINE_URL}>{t.finanzLinkLabel}</ExtLink></p>
          </div>

          {/* 7. Kann ich meine Steuererklärung also wirklich selbst vorbereiten? */}
          <h2 id="selbst" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
            {t.h2SelbstBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.h2SelbstEm}</em>
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.selbstP1}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.selbstLeadIn}</p>

            {/* Flow — flex-wrap only (no fixed-column grid), so it wraps
                naturally at any width instead of being forced into one
                horizontal row on small screens. */}
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: 8, marginBottom: 18 }}>
              {t.flow.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#026B76', background: 'rgba(3,131,144,0.1)', padding: '6px 12px', borderRadius: 999, whiteSpace: 'nowrap' as const }}>
                    {step}
                  </span>
                  {i < t.flow.length - 1 && <span style={{ color: '#038390', fontSize: 14 }}>→</span>}
                </div>
              ))}
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.selbstP2}</p>
            <Emphasis>{t.emphasis10}</Emphasis>
          </div>

          {/* Final product CTA */}
          <div style={{ background: 'linear-gradient(135deg, #038390 0%, #026B76 100%)', borderRadius: 16, padding: '32px 28px', marginBottom: 8, textAlign: 'center' as const }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.8vw,30px)', color: '#fff', marginBottom: 14, fontWeight: 400 }}>
              {t.finalHeading}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 8px' }}>{t.finalP1}</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 22px' }}>{t.finalP2}</p>
            <ButtonLink href={cabinetUrl} style={{ background: '#fff', color: '#026B76' }}>
              {t.finalCta}
            </ButtonLink>
          </div>

        </div>{/* end main content */}
      </div>{/* end flex wrapper */}
      <Footer locale={locale} />
    </div>
  )
}
