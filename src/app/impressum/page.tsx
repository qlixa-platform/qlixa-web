'use client'

import type { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LegalLayout from '@/components/layout/LegalLayout'

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <LegalLayout>
      <main style={{ background: '#ffffff', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{ background: '#F0F7F8', padding: '64px clamp(20px,6vw,80px) 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 20 }}>Rechtliches</div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 12 }}>Impressum</h1>
          <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.6 }}>
            Angaben gemäß § 5 ECG (E-Commerce-Gesetz) und § 25 MedienG<br/>
            <span style={{ fontSize: 12, color: '#888' }}>Відповідно до § 5 ECG та § 25 MedienG (австрійське законодавство про електронну комерцію та медіа)</span>
          </p>
        </div>
      </section>

      <section style={{ padding: '56px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column' as const, gap: 48 }}>

          {/* Über QLIXA */}
          <div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Über QLIXA</h2>
            <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 8 }}>
              QLIXA entwickelt digitale Werkzeuge und automatisierte Lösungen, die Unternehmerinnen, Unternehmer, Selbständige und Arbeitnehmerinnen bei der Organisation ihrer finanziellen und administrativen Prozesse in Österreich unterstützen.
            </p>
            <p style={{ fontSize: 13, color: '#888', lineHeight: 1.65 }}>
              QLIXA розробляє цифрові інструменти та автоматизовані рішення, що допомагають підприємцям, самозайнятим та найманим працівникам організовувати фінансові та адміністративні процеси в Австрії.
            </p>
          </div>

          {/* Unternehmensdaten */}
          <div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Unternehmensdaten</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
              <tbody>
                {([
                  ['Unternehmensname', <span style={{ color: '#CC0000', textDecoration: 'underline', textDecorationStyle: 'dashed' as const, fontStyle: 'italic' }}>QLIXA GmbH (in Gründung) ⚠️</span>],
                  ['Rechtsform', 'Gesellschaft mit beschränkter Haftung (GmbH)'],
                  ['Geschäftsführerinnen', 'Iryna Shevchenko, Iryna Prykhodkina'],
                  ['Unternehmensgegenstand', 'Entwicklung, Betrieb und Vermarktung einer webbasierten Self-Service-Plattform sowie digitaler Automatisierungs- und Organisationslösungen für Unternehmer, Selbständige und Privatpersonen.'],
                  ['Geschäftsadresse', <span style={{ color: '#CC0000', textDecoration: 'underline', textDecorationStyle: 'dashed' as const, fontStyle: 'italic' }}>St. Ruprechter Straße 90, 9020 Klagenfurt, Austria ⚠️ [Regus — після підтвердження плану]</span>],
                  ['E-Mail', 'info@qlixa.eu'],
                  ['Website', 'www.qlixa.eu'],
                ] as [string, ReactNode][]).map(([label, value]) => (
                  <tr key={label} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '10px 20px 10px 0', color: '#595959', fontWeight: 600, fontSize: 14, width: '38%', verticalAlign: 'top' as const }}>{label}</td>
                    <td style={{ padding: '10px 0', color: '#1A1A1A', fontSize: 14, lineHeight: 1.5 }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Firmenbuch */}
          <div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Firmenbuch &amp; Registrierung</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
              <tbody>
                {([
                  ['Firmenbuchnummer', <span style={{ color: '#CC0000', textDecoration: 'underline', textDecorationStyle: 'dashed' as const, fontStyle: 'italic' }}>⚠️ [після реєстрації GmbH]</span>],
                  ['Firmenbuchgericht', <span style={{ color: '#CC0000', textDecoration: 'underline', textDecorationStyle: 'dashed' as const, fontStyle: 'italic' }}>Landesgericht Klagenfurt ⚠️ [підтвердити після реєстрації]</span>],
                  ['UID-Nummer', <span style={{ color: '#CC0000', textDecoration: 'underline', textDecorationStyle: 'dashed' as const, fontStyle: 'italic' }}>⚠️ [після реєстрації]</span>],
                ] as [string, ReactNode][]).map(([label, value]) => (
                  <tr key={label} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '10px 20px 10px 0', color: '#595959', fontWeight: 600, fontSize: 14, width: '38%', verticalAlign: 'top' as const }}>{label}</td>
                    <td style={{ padding: '10px 0', color: '#1A1A1A', fontSize: 14 }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mitgliedschaften & Aufsicht */}
          <div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Mitgliedschaften &amp; Aufsichtsbehörde</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
              <tbody>
                {([
                  ['Mitglied der', <span style={{ color: '#CC0000', textDecoration: 'underline', textDecorationStyle: 'dashed' as const, fontStyle: 'italic' }}>Wirtschaftskammer Kärnten, Fachgruppe UBIT ⚠️ [підтвердити]</span>],
                  ['Aufsichtsbehörde', <span style={{ color: '#CC0000', textDecoration: 'underline', textDecorationStyle: 'dashed' as const, fontStyle: 'italic' }}>Bezirkshauptmannschaft Klagenfurt-Land ⚠️ [підтвердити після реєстрації]</span>],
                  ['Anwendbare Rechtsvorschrift', 'Gewerbeordnung 1994 (GewO)'],
                ] as [string, ReactNode][]).map(([label, value]) => (
                  <tr key={label} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '10px 20px 10px 0', color: '#595959', fontWeight: 600, fontSize: 14, width: '38%', verticalAlign: 'top' as const }}>{label}</td>
                    <td style={{ padding: '10px 0', color: '#1A1A1A', fontSize: 14 }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Keine Steuerberatung */}
          <div style={{ background: '#FFF8E7', border: '1px solid rgba(245,166,35,0.35)', borderRadius: 16, padding: '32px 36px' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>Keine Steuerberatung</h2>
            <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 8 }}>
              QLIXA ist keine Steuerberatungskanzlei und erbringt keine Steuerberatung, Rechtsberatung oder Wirtschaftsprüfung.
            </p>
            <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 16 }}>
              Alle Inhalte der Plattform dienen ausschließlich Informations-, Organisations- und Automatisierungszwecken. Für individuelle steuerliche oder rechtliche Fragen empfehlen wir die Konsultation eines zugelassenen Steuerberaters oder Rechtsanwalts.
            </p>
            <p style={{ fontSize: 13, color: '#888', lineHeight: 1.65 }}>
              QLIXA не є податковою консультацією і не надає послуг з податкового, правового консультування або аудиту. Весь контент платформи слугує виключно інформаційним, організаційним та автоматизаційним цілям. Для індивідуальних питань рекомендуємо звернутись до ліцензованого Steuerberater або юриста.
            </p>
          </div>

          {/* Wichtige Hinweise */}
          <div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 20, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Wichtige Hinweise</h2>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 24 }}>

              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>Aktualität</h3>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 6 }}>
                  Trotz sorgfältiger Pflege können sich gesetzliche Regelungen ändern. Nutzerinnen und Nutzer sind verpflichtet, die Aktualität der Informationen eigenständig zu prüfen.
                </p>
                <p style={{ fontSize: 13, color: '#aaa', lineHeight: 1.6 }}>
                  Незважаючи на регулярне оновлення, законодавство може змінюватись. Користувач самостійно несе відповідальність за перевірку актуальності інформації.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>Haftungsbeschränkung</h3>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 6 }}>
                  Die Nutzung der Plattform erfolgt auf eigene Verantwortung. QLIXA GmbH haftet nicht für Entscheidungen, die auf Basis der bereitgestellten Inhalte, Kalkulationshilfen oder Vorlagen getroffen werden. Es erfolgt keine individuelle Beratung.
                </p>
                <p style={{ fontSize: 13, color: '#aaa', lineHeight: 1.6 }}>
                  Використання платформи здійснюється на власну відповідальність. QLIXA GmbH не несе відповідальності за рішення на основі наданих матеріалів, калькуляторів або шаблонів. Індивідуальне консультування не здійснюється.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>Externe Links</h3>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 6 }}>
                  Verweise auf externe Webseiten liegen außerhalb des Verantwortungsbereichs der QLIXA GmbH. Für den Inhalt verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich.
                </p>
                <p style={{ fontSize: 13, color: '#aaa', lineHeight: 1.6 }}>
                  Посилання на зовнішні сайти знаходяться поза зоною відповідальності QLIXA GmbH.
                </p>
              </div>

            </div>
          </div>

          {/* Urheberrecht */}
          <div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Urheberrecht</h2>
            <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 8 }}>
              Alle Inhalte dieser Plattform — Texte, Grafiken, Logos, Software, Vorlagen, Dashboards, Kalkulatoren, Algorithmen und Workflows — sind urheberrechtlich geschützt und Eigentum der QLIXA GmbH. Jede Nutzung außerhalb der gesetzlichen Grenzen bedarf der schriftlichen Zustimmung.
            </p>
            <p style={{ fontSize: 13, color: '#aaa', lineHeight: 1.65 }}>
              QLIXA™ є зареєстрованою торговою маркою QLIXA GmbH (заявка в процесі). Весь контент платформи захищений авторським правом.
            </p>
          </div>

          {/* Geistiges Eigentum */}
          <div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Geistiges Eigentum</h2>
            <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 8 }}>
              Alle Funktionen, Konzepte, Benutzeroberflächen, Automatisierungsprozesse, Kalkulationslogiken, Workflows und digitalen Lösungen der QLIXA-Plattform sind geistiges Eigentum der QLIXA GmbH und unterliegen dem Schutz des österreichischen und europäischen Rechts.
            </p>
            <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 16 }}>
              QLIXA ist eine cloudbasierte Self-Service-Plattform. Es erfolgt keine individuelle Beratung. Die Plattform stellt digitale Werkzeuge, Organisationslösungen, Kalkulationshilfen und Workflow-Automatisierung zur Verfügung.
            </p>
            <p style={{ fontSize: 13, color: '#aaa', lineHeight: 1.65 }}>
              Усі функції, концепції, інтерфейси, процеси автоматизації та цифрові рішення платформи QLIXA є інтелектуальною власністю QLIXA GmbH. QLIXA — хмарна self-service платформа. Індивідуальне консультування не здійснюється.
            </p>
          </div>

          {/* Stand */}
          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 12 }}>
            <p style={{ fontSize: 12, color: '#aaa' }}>
              Stand: Juli 2026 — Dokument wird nach GmbH-Gründung aktualisiert.
            </p>
            <p style={{ fontSize: 12, color: '#aaa' }}>
              © 2026 QLIXA GmbH. Alle Rechte vorbehalten.
            </p>
          </div>

        </div>
      </section>
    </main>
      </LegalLayout>
      <Footer />
    </>
  )
}
