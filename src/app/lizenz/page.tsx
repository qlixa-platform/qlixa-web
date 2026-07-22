import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LegalLayout from '@/components/layout/LegalLayout'

export default function LizenzPage() {
  return (
    <>
      <Navbar />
      <LegalLayout>
        <main style={{ background: '#ffffff', minHeight: '100vh' }}>
          <section style={{ background: '#F0F7F8', padding: '64px clamp(20px,6vw,80px) 48px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 20 }}>Правове</div>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 12 }}>Ліцензійні умови</h1>
              <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.6 }}>Умови використання платформи, її компонентів та інтелектуальної власності QLIXA</p>
            </div>
          </section>

          <section style={{ padding: '56px clamp(20px,6vw,80px)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column' as const, gap: 40 }}>

              <div style={{ background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.2)', borderRadius: 10, padding: '12px 20px', fontSize: 13, color: '#CC0000' }}>
                ⚠️ Робочий шаблон — буде оновлено після реєстрації GmbH та запуску платформи.
              </div>

              {/* 1 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>1. Загальні положення</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Ці Ліцензійні умови регулюють порядок використання цифрової платформи QLIXA та всіх її компонентів.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Використовуючи платформу, користувач погоджується з цими умовами.
                </p>
              </div>

              {/* 2 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>2. Надання ліцензії</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Після оформлення підписки QLIXA надає користувачу невиключну, відкличну, непередавану та обмежену ліцензію на використання платформи відповідно до цих Умов.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Ліцензія надається виключно для особистого або внутрішнього використання користувачем у межах його професійної діяльності.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Право власності на платформу або її окремі компоненти користувачу не передається.
                </p>
              </div>

              {/* 3 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>3. На що поширюється ліцензія</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 12 }}>Ліцензія поширюється на всі цифрові компоненти платформи, зокрема:</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  {['KPI Dashboard', 'фінансові модулі', 'калькулятори', 'шаблони документів', 'систему управління клієнтами', 'модулі виставлення рахунків', 'модулі складського обліку', 'чек-листи', 'інструкції', 'базу знань', 'програмний код', 'інтерфейс користувача', 'документацію', 'оновлення платформи'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#1A1A1A', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
              </div>

              {/* 4 */}
              <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '28px 32px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12 }}>4. Що дозволено користувачу</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 12 }}>У межах дії ліцензії користувач має право:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
                  {['користуватися платформою відповідно до обраного тарифного плану', 'вводити власні дані', 'створювати документи для власної діяльності', 'використовувати шаблони у власному бізнесі', 'експортувати власні дані', 'друкувати результати своєї роботи', 'використовувати матеріали платформи виключно для власних внутрішніх потреб'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#038390', fontWeight: 500 }}>✓ {item}</div>
                  ))}
                </div>
              </div>

              {/* 5 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>5. Що заборонено</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 12 }}>Без письмової згоди QLIXA користувачу забороняється:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
                  {['копіювати платформу або її окремі модулі', 'продавати або передавати доступ третім особам', 'перепродавати шаблони', 'поширювати матеріали платформи', 'копіювати дизайн або інтерфейс', 'копіювати алгоритми розрахунків', 'створювати аналогічний сервіс на основі матеріалів QLIXA', 'здійснювати reverse engineering, декомпіляцію або модифікацію програмного забезпечення', 'використовувати автоматичні засоби для копіювання інформації (scraping)', 'використовувати платформу з порушенням чинного законодавства'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#CC0000' }}>✕ {item}</div>
                  ))}
                </div>
              </div>

              {/* 6 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>6. Авторські права</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 12 }}>
                  Усі права інтелектуальної власності на платформу QLIXA належать QLIXA GmbH або використовуються на законних підставах. Це стосується, зокрема:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
                  {['програмного коду', 'дизайну', 'структури платформи', 'інтерфейсу', 'шаблонів', 'калькуляторів', 'алгоритмів', 'KPI Dashboard', 'документації', 'текстів', 'графічних матеріалів', 'бази знань', 'інших цифрових матеріалів'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#1A1A1A', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Будь-яке використання поза межами наданої ліцензії можливе лише за письмовою згодою QLIXA.
                </p>
              </div>

              {/* 7 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>7. Торговельна марка</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Назва QLIXA, логотип компанії та інші позначення є об&apos;єктами інтелектуальної власності.
                </p>
                <p style={{ fontSize: 15, color: '#CC0000', fontStyle: 'italic', marginBottom: 10 }}>
                  ⚠️ Реєстрація торговельної марки буде здійснена після завершення реєстрації QLIXA GmbH.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Використання назви або логотипу без письмового дозволу забороняється.
                </p>
              </div>

              {/* 8 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>8. Дані користувача</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Усі персональні дані та інформація, які користувач завантажує або вводить у платформу, залишаються власністю користувача.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  QLIXA не набуває права власності на ці дані.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Обробка персональних даних здійснюється відповідно до Політики конфіденційності.
                </p>
              </div>

              {/* 9 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>9. Алгоритми та автоматизація</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Алгоритми розрахунків, автоматизовані процеси, структура роботи модулів, логіка KPI Dashboard та інші внутрішні механізми платформи є власністю QLIXA.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Користувач отримує право користування результатами роботи цих алгоритмів, але не набуває жодних прав на самі алгоритми або принципи їхньої роботи.
                </p>
              </div>

              {/* 10 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>10. Оновлення платформи</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>QLIXA постійно вдосконалює платформу. Ми можемо:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4, marginBottom: 12 }}>
                  {['додавати нові модулі', 'змінювати існуючі функції', 'виправляти помилки', 'покращувати інтерфейс', 'припиняти підтримку окремих функцій'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#595959', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Такі зміни можуть здійснюватися без окремого погодження з користувачем.
                </p>
              </div>

              {/* 11 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>11. Припинення дії ліцензії</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>Ліцензія припиняє свою дію:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4, marginBottom: 12 }}>
                  {['після завершення оплаченої підписки', 'після видалення акаунта користувачем', 'у разі порушення цих Ліцензійних умов', 'у разі припинення роботи платформи'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#595959', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Після припинення дії ліцензії користувач втрачає право користування сервісами QLIXA.
                </p>
              </div>

              {/* 12 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>12. Порушення ліцензії</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>У разі виявлення порушення цих умов QLIXA має право:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
                  {['тимчасово обмежити доступ до платформи', 'заблокувати акаунт', 'припинити дію ліцензії', 'вимагати припинення неправомірного використання матеріалів', 'звернутися до суду для захисту своїх прав'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#595959', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
              </div>

              {/* 13 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>13. Обмеження гарантій</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Платформа надається за принципом &quot;як є&quot; (as is).
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  QLIXA докладає всіх зусиль для забезпечення стабільної роботи сервісу, однак не гарантує:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
                  {['абсолютної безперервності роботи', 'повної відсутності технічних помилок', 'відповідності результатів індивідуальним очікуванням користувача'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#595959', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
              </div>

              {/* 14 */}
              <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '28px 32px', borderLeft: '4px solid #038390' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#1A1A1A', marginBottom: 12 }}>14. Відсутність штучного інтелекту</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 10 }}>
                  На поточному етапі автоматичні розрахунки та функції платформи виконуються відповідно до закладених алгоритмів і правил.
                </p>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75 }}>
                  QLIXA не використовує генеративний штучний інтелект для прийняття рішень або формування фінансових чи податкових рекомендацій.
                </p>
              </div>

              {/* 15 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>15. Законодавство</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  До цих Ліцензійних умов застосовується законодавство Австрії.
                </p>
                <p style={{ fontSize: 15, color: '#CC0000', fontStyle: 'italic' }}>
                  ⚠️ Судова юрисдикція буде уточнена після завершення реєстрації QLIXA GmbH.
                </p>
              </div>

              {/* 16 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>16. Використання відгуків та пропозицій</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Якщо користувач добровільно надсилає QLIXA ідеї, пропозиції щодо покращення або відгуки про платформу, QLIXA має право використовувати їх для розвитку сервісу без виплати винагороди, якщо інше не погоджено сторонами письмово.
                </p>
              </div>

              {/* 17 */}
              <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '28px 32px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12 }}>17. Контакт</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 12 }}>
                  З усіх питань щодо використання платформи або цих Ліцензійних умов звертайтесь:
                </p>
                <a href="mailto:info@qlixa.eu" style={{ fontSize: 15, color: '#038390', fontWeight: 600 }}>info@qlixa.eu</a>
              </div>

              {/* Підвал */}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 12 }}>
                <p style={{ fontSize: 12, color: '#aaa' }}>Станом на: липень 2026 — буде оновлено після реєстрації GmbH та запуску платформи.</p>
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
