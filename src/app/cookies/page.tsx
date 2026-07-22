import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LegalLayout from '@/components/layout/LegalLayout'

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <LegalLayout>
        <main style={{ background: '#ffffff', minHeight: '100vh' }}>
          <section style={{ background: '#F0F7F8', padding: '64px clamp(20px,6vw,80px) 48px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 20 }}>Правове</div>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 12 }}>Політика використання Cookies</h1>
              <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.6 }}>Відповідно до GDPR (DSGVO) та австрійського законодавства про захист даних</p>
            </div>
          </section>

          <section style={{ padding: '56px clamp(20px,6vw,80px)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column' as const, gap: 40 }}>

              <div style={{ background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.2)', borderRadius: 10, padding: '12px 20px', fontSize: 13, color: '#CC0000' }}>
                ⚠️ Робочий шаблон — буде оновлено після реєстрації QLIXA GmbH та підключення всіх сервісів.
              </div>

              {/* Вступ */}
              <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '28px 32px', borderLeft: '4px solid #038390' }}>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 10 }}>
                  Ми прагнемо максимально поважати вашу конфіденційність. Саме тому QLIXA використовує лише ті cookies та технології, які дійсно необхідні для роботи платформи.
                </p>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75 }}>
                  Ми свідомо не використовуємо рекламні або маркетингові інструменти відстеження та не створюємо рекламні профілі користувачів.
                </p>
              </div>

              {/* 1 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>1. Що таке Cookies</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Cookies — це невеликі текстові файли, які зберігаються у вашому браузері під час відвідування вебсайту.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Вони допомагають забезпечити коректну роботу платформи, підтримувати авторизацію користувача та підвищувати безпеку.
                </p>
              </div>

              {/* 2 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>2. Які Cookies використовує QLIXA</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 12 }}>
                  На даний момент QLIXA використовує лише технічно необхідні cookies. Вони забезпечують:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6, marginBottom: 12 }}>
                  {['авторизацію користувача', 'підтримку активної сесії', 'захист від несанкціонованого доступу', 'стабільну роботу платформи'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#1A1A1A', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Без цих cookies окремі функції сервісу можуть працювати некоректно або бути недоступними.
                </p>
              </div>

              {/* 3 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>3. Аналітика</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 12 }}>
                  Для аналізу роботи платформи ми використовуємо Plausible Analytics. Plausible працює відповідно до принципу мінімізації даних та:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6, marginBottom: 12 }}>
                  {['не використовує рекламні cookies', 'не створює профілі користувачів', 'не відстежує вашу активність на інших сайтах', 'не збирає персональні дані для маркетингових цілей'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#038390' }}>✓ {item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Аналітика використовується виключно для покращення роботи платформи.
                </p>
              </div>

              {/* 4 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>4. Платіжні сервіси</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 12 }}>
                  Для оформлення підписки можуть використовуватися сторонні платіжні провайдери, зокрема:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6, marginBottom: 12 }}>
                  {['Stripe', 'PayPal'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#1A1A1A', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Під час переходу на сторінки цих сервісів вони можуть використовувати власні cookies відповідно до своїх політик конфіденційності.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  QLIXA не контролює роботу cookies сторонніх платіжних сервісів.
                </p>
              </div>

              {/* 5 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>5. Соціальні мережі</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  На платформі можуть бути розміщені посилання на наші офіційні сторінки у соціальних мережах (наприклад LinkedIn, YouTube, Instagram, Facebook та інших).
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Такі посилання є звичайними зовнішніми посиланнями та самі по собі не встановлюють cookies сторонніх сервісів.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Лише після переходу на відповідну платформу застосовуються правила та політики конфіденційності відповідного сервісу.
                </p>
              </div>

              {/* 6 */}
              <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '28px 32px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 16 }}>6. Які Cookies ми НЕ використовуємо</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 12 }}>
                  На момент публікації цієї Політики QLIXA не використовує:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                  {['рекламні cookies', 'cookies для персоналізованої реклами', 'cookies ремаркетингу', 'сторонні рекламні мережі', 'технології міжсайтового відстеження (cross-site tracking)', 'інструменти поведінкового профілювання користувачів'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#038390', fontWeight: 500 }}>✓ {item}</div>
                  ))}
                </div>
              </div>

              {/* 7 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>7. Керування Cookies</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 12 }}>Більшість браузерів дозволяють:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6, marginBottom: 12 }}>
                  {['переглядати збережені cookies', 'видаляти cookies', 'блокувати їх використання', 'налаштовувати автоматичне видалення'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#1A1A1A', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Звертаємо увагу, що відключення технічно необхідних cookies може вплинути на роботу окремих функцій платформи.
                </p>
              </div>

              {/* 8 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>8. Майбутні зміни</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  У разі підключення нових сервісів або технологій, що використовують додаткові cookies, ця Політика буде оновлена.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Про суттєві зміни ми повідомимо користувачів через платформу або іншими доступними способами.
                </p>
              </div>

              {/* 9 */}
              <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '28px 32px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12 }}>9. Контакт</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 12 }}>
                  Якщо у вас виникли запитання щодо використання cookies, звертайтесь:
                </p>
                <a href="mailto:info@qlixa.eu" style={{ fontSize: 15, color: '#038390', fontWeight: 600 }}>info@qlixa.eu</a>
              </div>

              {/* Підвал */}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 12 }}>
                <p style={{ fontSize: 12, color: '#aaa' }}>Станом на: липень 2026 — буде оновлено після реєстрації GmbH та підключення всіх сервісів.</p>
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
