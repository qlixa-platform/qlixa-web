import type { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LegalLayout from '@/components/layout/LegalLayout'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <LegalLayout>
        <main style={{ background: '#ffffff', minHeight: '100vh' }}>
          <section style={{ background: '#F0F7F8', padding: '64px clamp(20px,6vw,80px) 48px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 20 }}>Правове</div>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 12 }}>Політика конфіденційності</h1>
              <p style={{ fontSize: 14, color: '#595959' }}>Відповідно до GDPR (DSGVO) та австрійського законодавства про захист даних</p>
            </div>
          </section>

          <section style={{ padding: '56px clamp(20px,6vw,80px)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column' as const, gap: 40 }}>

              <div style={{ background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.2)', borderRadius: 10, padding: '12px 20px', fontSize: 13, color: '#CC0000' }}>
                ⚠️ Робочий шаблон — буде оновлено після реєстрації GmbH та підключення всіх сервісів
              </div>

              {/* Вступ */}
              <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '28px 32px', borderLeft: '4px solid #038390' }}>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75 }}>
                  Ми серйозно ставимося до захисту ваших персональних даних та обробляємо їх відповідно до GDPR (DSGVO) та австрійського законодавства. Ми збираємо лише ті дані, які дійсно необхідні для роботи платформи.
                </p>
              </div>

              {/* 1. Відповідальний */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>1. Хто відповідає за обробку даних</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
                  <tbody>
                    {([
                      ['Компанія', <span key="co" style={{ color: '#CC0000', fontStyle: 'italic', textDecoration: 'underline', textDecorationStyle: 'dashed' as const }}>QLIXA GmbH (в процесі реєстрації) ⚠️</span>],
                      ['Адреса', <span key="addr" style={{ color: '#CC0000', fontStyle: 'italic', textDecoration: 'underline', textDecorationStyle: 'dashed' as const }}>St. Ruprechter Straße 90, 9020 Klagenfurt, Austria ⚠️</span>],
                      ['Email', 'info@qlixa.eu'],
                    ] as [string, ReactNode][]).map(([label, value], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                        <td style={{ padding: '10px 20px 10px 0', color: '#595959', fontWeight: 600, fontSize: 14, width: '38%', verticalAlign: 'top' as const }}>{label}</td>
                        <td style={{ padding: '10px 0', color: '#1A1A1A', fontSize: 14 }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 2. Які дані збираємо */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>2. Які дані ми збираємо</h2>

                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>Дані, які ви надаєте самі:</h3>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6, marginBottom: 24 }}>
                  {[
                    'Ім\'я та прізвище',
                    'Електронна адреса (email)',
                    'Пароль (у зашифрованому вигляді)',
                    'Дані профілю',
                    'Інформація, яку ви вводите під час використання функцій платформи (наприклад, фінансових модулів, KPI Dashboard, рахунків, клієнтів, складського обліку та інших сервісів)',
                  ].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#1A1A1A', paddingLeft: 8 }}>• {item}</div>
                  ))}
                </div>

                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>Дані, що збираються автоматично (анонімно):</h3>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6, marginBottom: 12 }}>
                  {[
                    'IP-адреса (анонімізована)',
                    'Тип браузера та пристрою',
                    'Операційна система',
                    'Мова браузера',
                    'Сторінки, які ви відвідуєте',
                    'Час відвідування',
                  ].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#1A1A1A', paddingLeft: 8 }}>• {item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: '#038390', fontStyle: 'italic' }}>
                  ✓ Для аналітики ми використовуємо Plausible Analytics — налаштований відповідно до принципу мінімізації даних та не використовує cookies для аналітики.
                </p>
              </div>

              {/* 3. Для чого використовуємо */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>3. Для чого ми використовуємо ці дані</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
                  <thead>
                    <tr style={{ background: '#F0F7F8' }}>
                      <th style={{ padding: '10px 16px', textAlign: 'left' as const, fontSize: 13, fontWeight: 700, color: '#038390', borderRadius: '8px 0 0 0' }}>Дані</th>
                      <th style={{ padding: '10px 16px', textAlign: 'left' as const, fontSize: 13, fontWeight: 700, color: '#038390' }}>Для чого</th>
                      <th style={{ padding: '10px 16px', textAlign: 'left' as const, fontSize: 13, fontWeight: 700, color: '#038390', borderRadius: '0 8px 0 0' }}>Правова підстава</th>
                    </tr>
                  </thead>
                  <tbody>
                    {([
                      ['Email', 'Реєстрація та вхід в акаунт', 'Виконання договору'],
                      ['Ім\'я', 'Відображення в профілі', 'Виконання договору'],
                      ['Дані профілю', 'Персоналізація платформи', 'Виконання договору'],
                      ['Дані, введені користувачем у функції платформи', 'Надання послуг платформи', 'Виконання договору'],
                      ['Платіжні дані', 'Оформлення підписки (через Stripe та/або PayPal)', 'Виконання договору'],
                      ['Аналітика', 'Покращення платформи (анонімно)', 'Законний інтерес'],
                      ['Email розсилка', <span key="email-send" style={{ color: '#CC0000', fontStyle: 'italic' }}>⚠️ [після вибору сервісу]</span>, 'Згода користувача'],
                      ['Технічні журнали (logs)', 'Захист платформи та виявлення технічних помилок', 'Законний інтерес'],
                    ] as [string, ReactNode, ReactNode][]).map(([data, purpose, basis], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                        <td style={{ padding: '10px 16px', fontSize: 14, color: '#1A1A1A', fontWeight: 500 }}>{data}</td>
                        <td style={{ padding: '10px 16px', fontSize: 14, color: '#595959' }}>{purpose}</td>
                        <td style={{ padding: '10px 16px', fontSize: 13, color: '#038390' }}>{basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 4. Технічна архітектура */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>4. Де зберігаються ваші дані</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 16 }}>
                  Ми використовуємо лише європейські або GDPR-сумісні сервіси:
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
                  <thead>
                    <tr style={{ background: '#F0F7F8' }}>
                      <th style={{ padding: '10px 16px', textAlign: 'left' as const, fontSize: 13, fontWeight: 700, color: '#038390' }}>Сервіс</th>
                      <th style={{ padding: '10px 16px', textAlign: 'left' as const, fontSize: 13, fontWeight: 700, color: '#038390' }}>Призначення</th>
                      <th style={{ padding: '10px 16px', textAlign: 'left' as const, fontSize: 13, fontWeight: 700, color: '#038390' }}>Розташування</th>
                    </tr>
                  </thead>
                  <tbody>
                    {([
                      ['Vercel', 'Хостинг платформи', 'EU'],
                      ['Supabase', 'База даних та авторизація', 'EU'],
                      ['Stripe', 'Платежі', 'EU'],
                      ['PayPal', 'Платежі', <span key="paypal-loc" style={{ color: '#CC0000', fontStyle: 'italic' }}>GDPR-сумісний ⚠️ [підтвердити]</span>],
                      ['Plausible Analytics', 'Аналітика (без cookies)', 'EU (Литва)'],
                      ['Email-сервіс', 'Email розсилка (буде визначено після запуску платформи)', <span key="resend-l" style={{ color: '#CC0000', fontStyle: 'italic' }}>⚠️</span>],
                    ] as [string, ReactNode, ReactNode][]).map(([service, purpose, location], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                        <td style={{ padding: '10px 16px', fontSize: 14, color: '#1A1A1A', fontWeight: 500 }}>{service}</td>
                        <td style={{ padding: '10px 16px', fontSize: 14, color: '#595959' }}>{purpose}</td>
                        <td style={{ padding: '10px 16px', fontSize: 13, color: '#038390' }}>{location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 5. Cookies */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>5. Cookies</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 8 }}>
                  Ми використовуємо лише технічно необхідні cookies (наприклад, для авторизації). Ми не використовуємо рекламні або відстежувальні cookies.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Наша аналітика (Plausible) працює <strong>без cookies</strong> і не потребує вашої згоди. У разі підключення додаткових сервісів (наприклад відео, карт або маркетингових інструментів) ця політика буде оновлена.
                </p>
              </div>

              {/* 6. Передача третім особам */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>6. Передача даних третім особам</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 12 }}>
                  Ми не продаємо, не передаємо та не обмінюємо персональні дані користувачів у маркетингових цілях. Передача можлива лише:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                  {[
                    '— платіжній системі (Stripe та/або PayPal) для обробки оплати',
                    '— хостинг-провайдеру (Vercel) для роботи платформи',
                    '— Supabase для зберігання даних платформи',
                    '— якщо це вимагає закон або рішення суду',
                  ].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#595959', paddingLeft: 8 }}>{item}</div>
                  ))}
                </div>
              </div>

              {/* 7. Термін зберігання */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>7. Термін зберігання даних</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Дані зберігаються лише стільки, скільки це необхідно для надання послуг або вимагається законом. Після видалення акаунту ваші персональні дані видаляються протягом <span style={{ color: '#CC0000', fontStyle: 'italic' }}>⚠️ [термін — уточнити]</span>, окрім випадків, коли закон вимагає довшого строку зберігання (наприклад, податкове законодавство).
                </p>
              </div>

              {/* 8. Ваші права */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 20, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>8. Ваші права</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { icon: '📋', title: 'Право на доступ', desc: 'Отримати копію своїх даних' },
                    { icon: '✏️', title: 'Право на виправлення', desc: 'Змінити неточні дані' },
                    { icon: '🗑️', title: 'Право на видалення', desc: 'Видалити свої дані' },
                    { icon: '⏸️', title: 'Право на обмеження', desc: 'Обмежити обробку даних' },
                    { icon: '↩️', title: 'Право на відкликання', desc: 'Відкликати згоду в будь-який час' },
                    { icon: '📥', title: 'Право на перенесення даних', desc: 'Отримати свої дані у машиночитаному форматі (Data Portability)' },
                    { icon: '🏛️', title: 'Право на скаргу', desc: 'Звернутись до DSB (австрійський орган захисту даних)' },
                  ].map(item => (
                    <div key={item.title} style={{ background: '#F0F7F8', borderRadius: 12, padding: '16px 20px' }}>
                      <div style={{ fontSize: 20, marginBottom: 8 }}>{item.icon}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: '#595959' }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: '#595959', marginTop: 16, lineHeight: 1.65 }}>
                  Для реалізації своїх прав звертайтесь: <a href="mailto:info@qlixa.eu" style={{ color: '#038390' }}>info@qlixa.eu</a>
                </p>
              </div>

              {/* 9. Безпека */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>9. Безпека даних</h2>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                  {[
                    '✓ SSL/TLS шифрування всіх з\'єднань',
                    '✓ Шифрування паролів',
                    '✓ Обмежений доступ до даних',
                    '✓ Регулярні оновлення безпеки',
                    '✓ Хостинг на захищених EU-серверах',
                  ].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#1A1A1A' }}>{item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.75, marginTop: 16 }}>
                  Ми регулярно переглядаємо заходи безпеки та впроваджуємо сучасні технічні рішення для захисту персональних даних.
                </p>
              </div>

              {/* 10. Зміни */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>10. Зміни політики конфіденційності</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Ми можемо оновлювати цю політику. Про суттєві зміни ми повідомимо вас електронною поштою або через повідомлення на платформі. Дата останнього оновлення вказана внизу сторінки.
                </p>
              </div>

              {/* Дані, які ми НЕ збираємо */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>Дані, які ми НЕ збираємо</h2>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                  {[
                    '✓ Рекламні профілі',
                    '✓ Історія перегляду інших сайтів',
                    '✓ Дані для персоналізованої реклами',
                    '✓ Інформація про ваше місцезнаходження',
                    '✓ Зайві персональні дані',
                  ].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#1A1A1A' }}>{item}</div>
                  ))}
                </div>
              </div>

              {/* Наш підхід до конфіденційності */}
              <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '32px 36px', borderLeft: '4px solid #038390' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>Наш підхід до конфіденційності</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 12 }}>
                  Ми переконані, що для якісної роботи сервісу не потрібно збирати більше даних, ніж це дійсно необхідно.
                </p>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 12 }}>
                  Саме тому QLIXA працює за принципом <strong>Data Minimization</strong> — одного з основних принципів GDPR.
                </p>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75 }}>
                  Платформа надає доступ до цифрових сервісів за моделлю підписки. Ми збираємо лише ті дані, які необхідні для надання цих сервісів.
                </p>
              </div>

              {/* 11. Контакт */}
              <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '28px 32px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12 }}>11. Контакт</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 16 }}>
                  Якщо у вас виникли запитання щодо обробки персональних даних, зв&apos;яжіться з нами:
                </p>
                <a href="mailto:info@qlixa.eu" style={{ fontSize: 15, color: '#038390', fontWeight: 600 }}>info@qlixa.eu</a>
                <p style={{ fontSize: 14, color: '#595959', marginTop: 20, lineHeight: 1.65 }}>
                  Ви також маєте право подати скаргу до австрійського органу захисту даних:<br/>
                  <strong>Österreichische Datenschutzbehörde (DSB)</strong><br/>
                  <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" style={{ color: '#038390' }}>www.dsb.gv.at</a>
                </p>
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
