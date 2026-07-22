import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LegalLayout from '@/components/layout/LegalLayout'

export default function AgbPage() {
  return (
    <>
      <Navbar />
      <LegalLayout>
        <main style={{ background: '#ffffff', minHeight: '100vh' }}>
          <section style={{ background: '#F0F7F8', padding: '64px clamp(20px,6vw,80px) 48px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 20 }}>Правове</div>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 12 }}>Умови використання (AGB)</h1>
              <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.6 }}>
                Загальні умови користування платформою QLIXA<br/>
                Відповідно до австрійського законодавства (ABGB, ECG, KSchG) та чинного законодавства Європейського Союзу.
              </p>
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
                  Ці Умови використання регулюють порядок користування цифровою платформою QLIXA та визначають права й обов&apos;язки між QLIXA GmbH (надалі — «QLIXA») та користувачами платформи.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Використовуючи платформу, користувач підтверджує, що ознайомився з цими Умовами та погоджується їх дотримуватися.
                </p>
              </div>

              {/* 2 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>2. Про платформу QLIXA</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 12 }}>
                  QLIXA — це автоматизована цифрова платформа, створена для допомоги підприємцям, самозайнятим особам та працівникам в організації фінансових і адміністративних процесів в Австрії.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>Платформа може містити:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4, marginBottom: 12 }}>
                  {['фінансові модулі', 'KPI Dashboard', 'калькулятори', 'шаблони документів', 'систему управління клієнтами', 'складський облік', 'виставлення рахунків', 'нагадування про дедлайни', 'інші цифрові інструменти'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#1A1A1A', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  QLIXA постійно розвивається, тому перелік функцій може змінюватися або доповнюватися.
                </p>
              </div>

              {/* 3 */}
              <div style={{ background: '#FFF8E7', border: '1px solid rgba(245,166,35,0.35)', borderRadius: 16, padding: '28px 32px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#1A1A1A', marginBottom: 12 }}>3. Важлива інформація</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 10 }}>
                  QLIXA не є податковою консультацією (Steuerberatung), юридичною консультацією або аудиторською компанією.
                </p>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 10 }}>
                  Платформа не надає індивідуальних податкових чи юридичних консультацій.
                </p>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 10 }}>
                  Усі сервіси платформи мають інформаційний, організаційний та автоматизаційний характер.
                </p>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75 }}>
                  У разі необхідності отримання професійної консультації користувачу рекомендується звернутися до ліцензованого Steuerberater або Rechtsanwalt.
                </p>
              </div>

              {/* 4 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>4. Хто може користуватися платформою</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>Користувачем платформи може бути особа, яка:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
                  {['досягла 18 років', 'має право укладати цивільно-правові договори', 'використовує платформу відповідно до чинного законодавства'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#1A1A1A', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
              </div>

              {/* 5 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>5. Реєстрація акаунта</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Для використання окремих функцій необхідно створити особистий акаунт.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>Користувач зобов&apos;язується:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4, marginBottom: 12 }}>
                  {['надавати достовірну інформацію', 'підтримувати актуальність своїх даних', 'зберігати конфіденційність пароля', 'не передавати доступ до акаунта третім особам'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#1A1A1A', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Користувач несе відповідальність за всі дії, виконані через його акаунт.
                </p>
              </div>

              {/* 6 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>6. Підписка</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Доступ до окремих функцій QLIXA надається за моделлю підписки.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Після оформлення підписки користувач отримує доступ до функцій відповідно до обраного тарифного плану.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Перелік функцій кожного тарифу публікується на сторінці «Тарифи» та може оновлюватися.
                </p>
              </div>

              {/* 7 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>7. Оплата</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Оплата здійснюється через сторонніх платіжних провайдерів (наприклад Stripe та/або PayPal).
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  QLIXA не зберігає повні реквізити банківських карток користувачів.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Усі платежі обробляються відповідно до умов платіжного провайдера.
                </p>
              </div>

              {/* 8 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>8. Скасування підписки</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Користувач може скасувати автоматичне продовження підписки у будь-який момент через свій акаунт.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Після скасування доступ до функцій платформи зберігається до завершення вже оплаченого періоду.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Сплачені кошти не повертаються, якщо інше не передбачено законодавством.
                </p>
              </div>

              {/* 9 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>9. Використання платформи</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Користувач має право використовувати платформу виключно для власних законних потреб.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>Забороняється:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
                  {['передавати акаунт третім особам', 'продавати доступ до платформи', 'копіювати або поширювати матеріали платформи', 'здійснювати спроби несанкціонованого доступу', 'втручатися в роботу сервісу', 'використовувати платформу з протиправною метою'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#CC0000', paddingLeft: 8 }}>✗ {item}</div>
                  ))}
                </div>
              </div>

              {/* 10 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>10. Інтелектуальна власність</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Усі матеріали платформи є власністю QLIXA GmbH або використовуються на законних підставах.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>Це стосується, зокрема:</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
                  {['дизайну', 'логотипів', 'програмного коду', 'бази знань', 'шаблонів', 'калькуляторів', 'алгоритмів', 'текстів', 'графіки', 'інтерфейсу', 'KPI Dashboard', 'інших цифрових матеріалів'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#1A1A1A', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Будь-яке використання без письмової згоди QLIXA заборонене.
                </p>
              </div>

              {/* 11 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>11. Відповідальність користувача</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Користувач самостійно відповідає за правильність інформації, яку він вводить у платформу.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Автоматичні розрахунки виконуються виключно на підставі введених користувачем даних.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Неправильно введені дані можуть призвести до некоректних результатів.
                </p>
              </div>

              {/* 12 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>12. Обмеження відповідальності</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  QLIXA докладає всіх зусиль для забезпечення актуальності інформації та коректної роботи сервісу.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>Разом з тим QLIXA не гарантує:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4, marginBottom: 12 }}>
                  {['абсолютну безперервність роботи платформи', 'відсутність технічних помилок', 'відповідність результатів очікуванням користувача', 'отримання податкових пільг, відшкодувань або інших фінансових результатів'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#595959', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Остаточні рішення щодо податкових, бухгалтерських чи юридичних питань користувач приймає самостійно.
                </p>
              </div>

              {/* 13 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>13. Доступність сервісу</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>Платформа може тимчасово бути недоступною у зв&apos;язку з:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
                  {['технічним обслуговуванням', 'оновленням програмного забезпечення', 'усуненням несправностей', 'обставинами, що не залежать від QLIXA'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#595959', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
              </div>

              {/* 14 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>14. Оновлення платформи</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>Ми постійно вдосконалюємо QLIXA. Ми можемо:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4, marginBottom: 12 }}>
                  {['додавати нові функції', 'змінювати існуючі модулі', 'припиняти підтримку окремих функцій', 'покращувати інтерфейс'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#595959', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Такі зміни можуть відбуватися без окремого погодження з користувачем.
                </p>
              </div>

              {/* 15 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>15. Законодавчі зміни</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  Австрійське законодавство може змінюватися.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Ми регулярно оновлюємо платформу відповідно до чинних вимог, однак окремі законодавчі зміни можуть набувати чинності раніше, ніж буде оновлено відповідний функціонал платформи.
                </p>
              </div>

              {/* 16 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>16. Припинення доступу</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  QLIXA має право тимчасово обмежити або повністю припинити доступ користувача до платформи у разі:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
                  {['порушення цих Умов', 'шахрайських дій', 'спроб злому або несанкціонованого доступу', 'використання сервісу з порушенням законодавства'].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#595959', paddingLeft: 8 }}>— {item}</div>
                  ))}
                </div>
              </div>

              {/* 17 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>17. Форс-мажор</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  QLIXA не несе відповідальності за невиконання своїх зобов&apos;язань у разі виникнення обставин непереборної сили, які знаходяться поза контролем компанії.
                </p>
              </div>

              {/* 18 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>18. Зміни цих Умов</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  QLIXA має право змінювати ці Умови використання.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  У разі суттєвих змін користувачі будуть повідомлені через платформу або електронною поштою.
                </p>
              </div>

              {/* 19 */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>19. Застосовне право</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 10 }}>
                  До цих Умов застосовується законодавство Австрії.
                </p>
                <p style={{ fontSize: 15, color: '#CC0000', fontStyle: 'italic', textDecoration: 'underline', textDecorationStyle: 'dashed' as const }}>
                  ⚠️ Судова юрисдикція буде уточнена після завершення реєстрації QLIXA GmbH.
                </p>
              </div>

              {/* 20 */}
              <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '28px 32px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12 }}>20. Контакт</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 16 }}>
                  Якщо у вас виникли запитання щодо цих Умов використання, зв&apos;яжіться з нами:
                </p>
                <a href="mailto:info@qlixa.eu" style={{ fontSize: 15, color: '#038390', fontWeight: 600 }}>info@qlixa.eu</a>
              </div>

              {/* Підвал */}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 12 }}>
                <p style={{ fontSize: 12, color: '#aaa' }}>Станом на: липень 2026 — буде оновлено після реєстрації GmbH.</p>
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
