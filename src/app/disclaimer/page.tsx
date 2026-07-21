import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LegalLayout from '@/components/layout/LegalLayout'

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <LegalLayout>
        <main style={{ background: '#ffffff', minHeight: '100vh' }}>
          <section style={{ background: '#F0F7F8', padding: '64px clamp(20px,6vw,80px) 48px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 20 }}>Правове</div>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 12 }}>Відмова від відповідальності</h1>
              <p style={{ fontSize: 14, color: '#595959' }}>Застереження щодо відповідальності та умов використання платформи QLIXA</p>
            </div>
          </section>

          <section style={{ padding: '56px clamp(20px,6vw,80px)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column' as const, gap: 40 }}>

              <div style={{ background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.2)', borderRadius: 10, padding: '12px 20px', fontSize: 13, color: '#CC0000' }}>
                ⚠️ Робочий шаблон — потребує перевірки юриста після реєстрації GmbH
              </div>

              {/* 1. Призначення платформи */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>1. Призначення платформи</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75 }}>
                  QLIXA — це цифрова платформа самообслуговування для організації фінансових та адміністративних процесів в Австрії. Платформа надає цифрові інструменти, шаблони, калькулятори, чек-листи та автоматизацію робочих процесів.
                </p>
              </div>

              {/* 2. Для кого */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>2. Для кого призначена QLIXA</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 12 }}>QLIXA призначена для:</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                  {['✔ Індивідуальних підприємців', '✔ Самозайнятих', '✔ Малого бізнесу', '✔ Найманих працівників'].map(item => (
                    <div key={item} style={{ background: '#F0F7F8', borderRadius: 10, padding: '10px 16px', fontSize: 14, color: '#1A1A1A', fontWeight: 500 }}>{item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.7 }}>
                  Платформа <strong>не призначена</strong> для великих підприємств зі складним бухгалтерським обліком. Відповідний функціонал перебуває в розробці.
                </p>
              </div>

              {/* 3. Не є податковим консультантом */}
              <div style={{ background: '#FFF8E7', border: '1px solid rgba(245,166,35,0.35)', borderRadius: 16, padding: '32px 36px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>3. Не є податковим консультантом</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 12 }}>
                  QLIXA <strong>не є</strong> податковим консультантом та не надає послуг як:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, marginBottom: 16 }}>
                  {['✗ Steuerberater (податковий консультант)', '✗ Wirtschaftsprüfer (аудитор)', '✗ Rechtsanwalt (юрист)'].map(item => (
                    <div key={item} style={{ fontSize: 15, color: '#CC0000', fontWeight: 600 }}>{item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75 }}>
                  Індивідуальне консультування не здійснюється. Використання платформи не замінює самостійну перевірку документів та професійну консультацію.
                </p>
              </div>

              {/* 4. Що надає платформа */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>4. Що надає платформа</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 12 }}>Платформа надає:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, marginBottom: 16 }}>
                  {[
                    '✅ Шаблони та форми',
                    '✅ Калькулятори та допоміжні розрахунки',
                    '✅ Чек-листи та нагадування про дедлайни',
                    '✅ Автоматизацію робочих процесів',
                    '✅ Загальну інформацію про австрійську систему',
                  ].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#1A1A1A' }}>{item}</div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Платформа <strong>не аналізує індивідуальну ситуацію</strong> користувача і не надає персональних рекомендацій.
                </p>
              </div>

              {/* 5. Наша відповідальність */}
              <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '32px 36px', borderLeft: '4px solid #038390' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>5. Наша відповідальність</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 12 }}>
                  Ми розробляємо шаблони, калькулятори та автоматизації з максимальною уважністю та регулярно оновлюємо їх відповідно до відомих нам змін законодавства.
                </p>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75 }}>
                  Водночас кожне підприємницьке та податкове рішення залишається відповідальністю самого користувача.
                </p>
              </div>

              {/* 6. Відповідальність користувача */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>6. Відповідальність користувача</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Усі рішення користувач приймає самостійно та на власну відповідальність. Перед поданням будь-яких документів до державних органів користувач зобов&apos;язаний самостійно перевірити всі дані. Використання платформи не замінює самостійну перевірку документів та професійну консультацію.
                </p>
              </div>

              {/* 7. Актуальність інформації */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>7. Актуальність інформації</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Незважаючи на регулярне оновлення, законодавство може змінюватись. QLIXA оновлює платформу регулярно, проте не може гарантувати миттєве відображення всіх змін. Користувач самостійно несе відповідальність за перевірку актуальності інформації.
                </p>
              </div>

              {/* 8. Автоматичні розрахунки */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>8. Автоматичні розрахунки</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Всі розрахунки платформи є допоміжними і слугують виключно для орієнтування. Вони не замінюють професійний податковий розрахунок. Перед використанням усі результати мають бути самостійно перевірені користувачем.
                </p>
              </div>

              {/* 9. Обмеження відповідальності */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>9. Обмеження відповідальності</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 12 }}>QLIXA GmbH не несе відповідальності за:</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, marginBottom: 12 }}>
                  {[
                    '— податкові наслідки рішень користувача',
                    '— штрафи або санкції з боку державних органів',
                    '— помилки через неправильно введені дані',
                    '— пропущені дедлайни через технічні збої платформи',
                    '— зміни законодавства після публікації матеріалів',
                  ].map(item => (
                    <div key={item} style={{ fontSize: 14, color: '#595959', paddingLeft: 8 }}>{item}</div>
                  ))}
                </div>
              </div>

              {/* 10. Зовнішні джерела */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>10. Зовнішні джерела</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  QLIXA може посилатись на зовнішні ресурси (FinanzOnline, BMF, WKO, SVS). QLIXA GmbH не несе відповідальності за їх зміст та актуальність.
                </p>
              </div>

              {/* 11. Доступність */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>11. Доступність платформи</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  QLIXA прагне до високої доступності платформи, проте не може гарантувати 100% безперебійну роботу. Технічні роботи та збої можливі.
                </p>
              </div>

              {/* 12. Зміни */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>12. Зміни платформи</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  QLIXA GmbH залишає за собою право оновлювати, змінювати або видаляти шаблони, калькулятори, функції та контент без попереднього повідомлення.
                </p>
              </div>

              {/* 13. Інтелектуальна власність */}
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E6F4F5' }}>13. Інтелектуальна власність</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>
                  Весь контент, функції, концепції, інтерфейси, алгоритми, калькулятори, шаблони та робочі процеси платформи є власністю QLIXA GmbH™ та захищені авторським правом відповідно до австрійського та європейського законодавства.
                </p>
              </div>

              {/* 14. Контакт */}
              <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '28px 32px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#038390', marginBottom: 12 }}>14. Контакт</h2>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.75 }}>
                  З питань щодо цього документу звертайтесь:<br/>
                  <strong>QLIXA GmbH</strong><br/>
                  St. Ruprechter Straße 90, 9020 Klagenfurt, Austria<br/>
                  <a href="mailto:info@qlixa.eu" style={{ color: '#038390' }}>info@qlixa.eu</a>
                </p>
              </div>

              {/* Підвал */}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 12 }}>
                <p style={{ fontSize: 12, color: '#aaa' }}>Станом на: липень 2026 — документ буде перевірено юристом після реєстрації GmbH.</p>
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
