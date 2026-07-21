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
          <section style={{ background: '#F0F7F8', padding: '64px clamp(20px,6vw,80px) 48px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 20 }}>Правове</div>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 12 }}>Імпресум</h1>
              <p style={{ fontSize: 14, color: '#595959' }}>Відповідно до § 5 ECG (австрійський Закон про електронну комерцію) та § 25 MedienG</p>
            </div>
          </section>

          <section style={{ padding: '56px clamp(20px,6vw,80px)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column' as const, gap: 40 }}>

              <div style={{ background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.2)', borderRadius: 10, padding: '12px 20px', fontSize: 13, color: '#CC0000' }}>
                ⚠️ Робочий шаблон — поля позначені червоним потребують заповнення після реєстрації GmbH
              </div>

              {/* Про QLIXA */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Про QLIXA</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75 }}>
                  QLIXA розробляє цифрові інструменти та автоматизовані рішення, що допомагають підприємцям, самозайнятим та найманим працівникам організовувати фінансові та адміністративні процеси в Австрії.
                </p>
              </div>

              {/* Дані компанії */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Дані компанії</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
                  <tbody>
                    {([
                      ['Назва компанії', <span key="name" style={{ color: '#CC0000', textDecoration: 'underline', textDecorationStyle: 'dashed' as const, fontStyle: 'italic' }}>QLIXA GmbH (в процесі реєстрації) ⚠️</span>],
                      ['Організаційно-правова форма', 'Товариство з обмеженою відповідальністю (GmbH)'],
                      ['Керівниці', 'Iryna Shevchenko, Iryna Prykhodkina'],
                      ['Предмет діяльності', 'IT-послуги та веб-сервіси — розробка та експлуатація цифрової self-service платформи для організації фінансових та адміністративних процесів'],
                      ['Адреса', <span key="addr" style={{ color: '#CC0000', textDecoration: 'underline', textDecorationStyle: 'dashed' as const, fontStyle: 'italic' }}>St. Ruprechter Straße 90, 9020 Klagenfurt, Austria ⚠️ [після підтвердження Regus]</span>],
                      ['Електронна пошта', 'info@qlixa.eu'],
                      ['Вебсайт', 'www.qlixa.eu'],
                    ] as [string, ReactNode][]).map(([label, value], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                        <td style={{ padding: '10px 20px 10px 0', color: '#595959', fontWeight: 600, fontSize: 14, width: '38%', verticalAlign: 'top' as const }}>{label}</td>
                        <td style={{ padding: '10px 0', color: '#1A1A1A', fontSize: 14, lineHeight: 1.5 }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Реєстраційні дані */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Реєстраційні дані</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
                  <tbody>
                    {([
                      ['Номер у реєстрі компаній', <span key="fn" style={{ color: '#CC0000', textDecoration: 'underline', textDecorationStyle: 'dashed' as const, fontStyle: 'italic' }}>⚠️ [після реєстрації GmbH]</span>],
                      ['Суд реєстрації', <span key="fg" style={{ color: '#CC0000', textDecoration: 'underline', textDecorationStyle: 'dashed' as const, fontStyle: 'italic' }}>Landesgericht Klagenfurt ⚠️ [підтвердити]</span>],
                      ['Ідентифікаційний номер платника ПДВ', <span key="uid" style={{ color: '#CC0000', textDecoration: 'underline', textDecorationStyle: 'dashed' as const, fontStyle: 'italic' }}>⚠️ [після реєстрації]</span>],
                    ] as [string, ReactNode][]).map(([label, value], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                        <td style={{ padding: '10px 20px 10px 0', color: '#595959', fontWeight: 600, fontSize: 14, width: '38%', verticalAlign: 'top' as const }}>{label}</td>
                        <td style={{ padding: '10px 0', color: '#1A1A1A', fontSize: 14 }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Членство та нагляд */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Членство та наглядовий орган</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
                  <tbody>
                    {([
                      ['Членство', <span key="wko" style={{ color: '#CC0000', textDecoration: 'underline', textDecorationStyle: 'dashed' as const, fontStyle: 'italic' }}>Wirtschaftskammer Kärnten, Fachgruppe UBIT ⚠️ [підтвердити]</span>],
                      ['Наглядовий орган', <span key="beh" style={{ color: '#CC0000', textDecoration: 'underline', textDecorationStyle: 'dashed' as const, fontStyle: 'italic' }}>Bezirkshauptmannschaft Klagenfurt-Land ⚠️ [підтвердити]</span>],
                      ['Застосовне законодавство', 'Gewerbeordnung 1994 (GewO)'],
                    ] as [string, ReactNode][]).map(([label, value], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                        <td style={{ padding: '10px 20px 10px 0', color: '#595959', fontWeight: 600, fontSize: 14, width: '38%', verticalAlign: 'top' as const }}>{label}</td>
                        <td style={{ padding: '10px 0', color: '#1A1A1A', fontSize: 14 }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Не є податковим консультантом */}
              <div style={{ background: '#FFF8E7', border: '1px solid rgba(245,166,35,0.35)', borderRadius: 16, padding: '32px 36px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>Не є податковим консультантом</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 12 }}>
                  QLIXA не є податковим консультантом та не надає послуг з податкового, правового консультування або аудиту.
                </p>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75 }}>
                  Весь контент платформи слугує виключно інформаційним, організаційним та автоматизаційним цілям. З індивідуальних податкових або правових питань рекомендуємо звернутись до ліцензованого Steuerberater або юриста.
                </p>
              </div>

              {/* Важливі застереження */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 20, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Важливі застереження</h2>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 24 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>Актуальність інформації</h3>
                    <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                      Незважаючи на регулярне оновлення, законодавство може змінюватись. Користувач самостійно несе відповідальність за перевірку актуальності інформації.
                    </p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>Обмеження відповідальності</h3>
                    <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                      Використання платформи здійснюється на власну відповідальність. QLIXA GmbH не несе відповідальності за рішення, прийняті на основі наданих матеріалів, калькуляторів або шаблонів. Індивідуальне консультування не здійснюється.
                    </p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>Зовнішні посилання</h3>
                    <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                      Посилання на зовнішні сайти знаходяться поза зоною відповідальності QLIXA GmbH. За їх зміст відповідають виключно їх власники.
                    </p>
                  </div>
                </div>
              </div>

              {/* Авторське право */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Авторське право</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Весь контент платформи — тексти, графіка, логотипи, програмне забезпечення, шаблони, дашборди, калькулятори, алгоритми та робочі процеси — захищений авторським правом і є власністю QLIXA GmbH™. Будь-яке використання поза межами закону потребує письмової згоди.
                </p>
              </div>

              {/* Інтелектуальна власність */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Інтелектуальна власність</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 12 }}>
                  Усі функції, концепції, інтерфейси, процеси автоматизації, калькуляційні логіки, робочі процеси та цифрові рішення платформи QLIXA є інтелектуальною власністю QLIXA GmbH™ і захищені австрійським та європейським законодавством.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  QLIXA — хмарна self-service платформа. Індивідуальне консультування не здійснюється. Платформа надає цифрові інструменти, організаційні рішення, калькулятори та автоматизацію робочих процесів.
                </p>
              </div>

              {/* Підвал */}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 12 }}>
                <p style={{ fontSize: 12, color: '#aaa' }}>Станом на: липень 2026 — документ буде оновлено після реєстрації GmbH.</p>
                <p style={{ fontSize: 12, color: '#aaa' }}>© 2026 QLIXA GmbH™. Усі права захищені.</p>
              </div>

            </div>
          </section>
        </main>
      </LegalLayout>
      <Footer />
    </>
  )
}
