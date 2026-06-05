'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArticleSidebar, ArticlePrevNext } from '@/components/layout/ArticleNav'

function NoteBox({ type, children }: { type: 'warning' | 'info' | 'tip' | 'ok'; children: React.ReactNode }) {
  const s = {
    warning: { bg: '#FFF8E1', border: '#FFD54F', icon: '⚠️' },
    info:    { bg: '#E8F4FD', border: '#90CAF9', icon: 'ℹ️' },
    tip:     { bg: 'var(--peach-light)', border: 'var(--orange-mid)', icon: '💡' },
    ok:      { bg: '#EBF5EE', border: '#81C784', icon: '✅' },
  }[type]
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 12, padding: '13px 16px', margin: '12px 0', display: 'flex', gap: 11, alignItems: 'flex-start' }}>
      <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
      <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--charcoal)' }}>{children}</div>
    </div>
  )
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange)', fontWeight: 600, textDecoration: 'underline', textDecorationColor: 'var(--peach-mid)', textUnderlineOffset: 3, fontSize: 13 }}>
      {children} ↗
    </a>
  )
}

function QuoteBlock({ de, ua }: { de: string; ua: string }) {
  return (
    <div style={{ background: 'var(--gray)', borderRadius: 9, padding: '13px 16px', border: '1px solid var(--line)', margin: '10px 0' }}>
      <div style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--charcoal)', marginBottom: 4 }}>„{de}"</div>
      <div style={{ fontSize: 12, color: 'var(--text2)' }}>Переклад: {ua}</div>
    </div>
  )
}

function OptionItem({ selected, de, tr, desc }: { selected?: boolean; de: string; tr?: string; desc?: string }) {
  return (
    <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 9, background: selected ? 'var(--peach-light)' : 'var(--gray)', border: `1px solid ${selected ? 'var(--orange)' : 'var(--line)'}`, alignItems: 'flex-start', marginBottom: 8 }}>
      <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1, color: selected ? 'var(--orange)' : 'var(--text3)' }}>{selected ? '✅' : '○'}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: selected ? 'var(--orange)' : 'var(--charcoal)', marginBottom: 2 }}>{de}</div>
        {tr && <div style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', margin: '2px 0 4px' }}>{tr}</div>}
        {desc && <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: desc }} />}
      </div>
    </div>
  )
}

function YesNo({ yesLabel, noLabel, selected }: { yesLabel: string; noLabel: string; selected: 'ja' | 'nein' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '10px 0' }}>
      <div style={{ padding: '13px 14px', borderRadius: 9, border: `2px solid ${selected === 'ja' ? 'var(--orange)' : 'var(--line)'}`, background: selected === 'ja' ? 'var(--peach-light)' : 'var(--gray)', textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: selected === 'ja' ? 'var(--orange)' : 'var(--text3)' }}>{selected === 'ja' ? '✅ ' : ''}Ja</div>
        <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 4, lineHeight: 1.4 }}>{yesLabel}</div>
      </div>
      <div style={{ padding: '13px 14px', borderRadius: 9, border: `2px solid ${selected === 'nein' ? 'var(--orange)' : 'var(--line)'}`, background: selected === 'nein' ? 'var(--peach-light)' : 'var(--gray)', textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: selected === 'nein' ? 'var(--orange)' : 'var(--text3)' }}>{selected === 'nein' ? '✅ ' : ''}Nein</div>
        <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 4, lineHeight: 1.4 }}>{noLabel}</div>
      </div>
    </div>
  )
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: 10, padding: '10px 13px', borderRadius: 8, background: 'var(--gray)', border: '1px solid var(--line)', marginBottom: 7 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--charcoal)', minWidth: 140, flexShrink: 0 }}>{label}</div>
      <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{value}</div>
    </div>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, margin: '10px 0' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 13px', borderRadius: 8, background: '#EBF5EE', border: '1px solid #81C784', fontSize: 13, color: 'var(--charcoal)' }}>
          ✅ {item}
        </div>
      ))}
    </div>
  )
}

const summarySteps = [
  'Перейшли на gisa.gv.at/online-gewerbeanmeldung',
  'Обрали «mit ID Austria beantragen» — найшвидший спосіб',
  'Вибрали тип заявника: Natürliche Person + Ohne Vertretung',
  'Перевірили особисті дані, Sozialversicherungsnummer, адресу та пошту',
  'Обрали вид діяльності, дату початку, адресу бізнесу. Підтвердили Eidesstattliche Erklärung',
  'Перевірили всі дані та натиснули Senden',
  'Отримали підтвердження та номер GISA 🎉',
]

export default function GisaFormularPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ position: 'relative', height: 340, overflow: 'hidden' }}>
        <Image src="/articles/gisa-cover.jpg" alt="Реєстрація на сайті GISA" fill style={{ objectFit: 'cover', objectPosition: 'center 35%' }} priority />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.78) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px clamp(16px,4vw,40px)', maxWidth: 820, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ background: 'var(--orange)', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', padding: '4px 11px', borderRadius: 4 }}>GISA · Реєстрація</span>
            <span style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: 600, padding: '4px 11px', borderRadius: 4 }}>Покрокова інструкція</span>
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,3.5vw,32px)', color: '#fff', lineHeight: 1.2, marginBottom: 12, fontWeight: 400 }}>
            Реєстрація на сайті GISA:<br />
            <em style={{ color: '#FFB899', fontStyle: 'italic' }}>покрокова інструкція</em>
          </h1>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[{ icon: '🕐', text: '15 хв читання' }, { icon: '💻', text: '6 кроків' }, { icon: '🇺🇦', text: 'Для іноземців' }].map(m => (
              <span key={m.text} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>{m.icon} {m.text}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Body + sidebar */}
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '48px 16px 80px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <ArticleSidebar currentSlug="gisa-formular" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link href="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text3)', textDecoration: 'none', marginBottom: 32 }}>← Всі статті</Link>

          {/* Intro */}
          <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 28 }}>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 10 }}>
              У цій статті ми детально, простою мовою розберемо, як пройти <strong>реєстрацію на сайті GISA</strong> — подати заяву про відкриття підприємницької діяльності (<strong>Gewerbeanmeldung</strong>).
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)' }}>
              📌 <strong>Приклад:</strong> Iryna Müller, яка реєструється як самозайнята в сфері IT (вільна професія).
            </p>
          </div>

          {/* КРОК 1 */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>1</div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>Заходимо на сайт</h2>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
              <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 12 }}>Перейдіть за посиланням:</p>
              <ExtLink href="https://www.gisa.gv.at/online-gewerbeanmeldung">🔗 https://www.gisa.gv.at/online-gewerbeanmeldung</ExtLink>
              <p style={{ fontSize: 14, lineHeight: 1.85, margin: '12px 0 16px' }}>Ви бачите першу сторінку системи <strong>GISA</strong>.</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 10 }}>Детальний розбір першої сторінки</h3>
              <OptionItem de="GISA Gewerbeinformationssystem Austria" tr="Що це?" desc="GISA — це офіційна державна база даних Австрії, в якій реєструються всі підприємці. Тут зберігається інформація про всі діючі бізнеси в країні." />
              <OptionItem de="Gewerbeanmeldung" tr="Що це означає?" desc="Це <strong>заява на реєстрацію підприємницької діяльності</strong>. Саме цю заяву ми зараз заповнюємо." />

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--orange)', margin: '20px 0 10px' }}>Два способи подання заяви — найважливіший вибір</h3>
              <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr', marginBottom: 16 }}>
                <div style={{ padding: 14, borderRadius: 10, border: '2px solid var(--orange)', background: 'var(--peach-light)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)', marginBottom: 3 }}>1. mit ID Austria beantragen</div>
                  <div style={{ fontSize: 11, fontStyle: 'italic', color: 'var(--orange)', marginBottom: 5 }}>Переклад: Подати заяву за допомогою ID Austria</div>
                  <div style={{ fontSize: 12, color: 'var(--charcoal)', lineHeight: 1.6 }}><strong>Найкращий і найшвидший спосіб.</strong> Якщо у вас є ID Austria, система автоматично підтягне ваше прізвище, імя та дату народження. У більшості випадків заяву можуть схвалити <strong>автоматично і відразу</strong>.</div>
                </div>
                <div style={{ padding: 14, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--gray)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 3 }}>2. Ohne ID Austria/EU-Login beantragen</div>
                  <div style={{ fontSize: 11, fontStyle: 'italic', color: 'var(--text3)', marginBottom: 5 }}>Переклад: Подати без ID Austria / EU-Login</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>Ви заповнюєте все вручну. Заяву буде перевіряти працівник відомства — процес займає більше часу (від кількох днів до кількох тижнів).</div>
                </div>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 10 }}>Що обираємо ми?</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>Для Iryna Müller обираємо перший варіант — <strong>mit ID Austria beantragen</strong>. Після натискання система перенаправить вас на авторизацію через <strong>ID Austria</strong>.</p>
              <NoteBox type="tip">
                <strong>Важлива порада:</strong> якщо у вас ще немає ID Austria, обовязково отримайте її перед початком реєстрації. Без неї процес буде довшим і складнішим.{' '}
                <Link href="/articles/austria-id" style={{ color: 'var(--orange)', fontWeight: 600 }}>📖 Як оформити Austria ID: покроковий гайд →</Link>
              </NoteBox>
              <p style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic', marginTop: 14 }}>Готово для першої сторінки. Переходимо на другу сторінку.</p>
            </div>
          </div>

          {/* КРОК 2 */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>2</div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>Вибір типу заявника</h2>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
              <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>Після натискання <strong>«mit ID Austria beantragen»</strong> і авторизації відкривається друга сторінка.</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>Прогрес-бар вгорі сторінки</h3>
              <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 8 }}>Gewerbeanmeldung → Fortschrittsanzeige</p>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
                {['1 Einstieg', '2 Person', '3 Daten', '4 Optional', '5 Beilagen', '6 Kontrolle', '7 Abschluss'].map((s, i) => (
                  <span key={s} style={{ padding: '5px 10px', borderRadius: 5, fontSize: 11, fontWeight: 600, background: i === 1 ? 'var(--orange)' : 'var(--gray)', color: i === 1 ? '#fff' : 'var(--text3)', border: `1px solid ${i === 1 ? 'var(--orange)' : 'var(--line)'}` }}>{s}</span>
                ))}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 16 }}>Це етапи заповнення заяви. Зараз ви на кроці <strong>2 Person</strong> (Дані про особу).</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--orange)', marginBottom: 6 }}>Головне питання: Wer stellt den Antrag?</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12 }}>Переклад: «Хто подає заяву?» Тут потрібно обрати, від кого саме йде реєстрація.</p>

              <OptionItem selected de="1. Natürliche Person (auch e.U. = im Firmenbuch eingetragenes Einzelunternehmen)" tr="Фізична особа (в тому числі e.U. — одноосібне підприємство)" desc="<strong>Це ваш варіант.</strong> Ви реєструєтеся як звичайна людина, яка хоче працювати на себе. e.U. — це саме те, що буде у Iryna Müller після реєстрації (Einzelunternehmen — одноосібне підприємство)." />
              <OptionItem de="2. Natürliche Person mit Geschäftsführungsbestellung" tr="Фізична особа з призначенням керівника" desc="Використовується, коли ви є директором в уже існуючій компанії (наприклад, GmbH). <strong>Нам це не підходить.</strong>" />
              <OptionItem de="3. Juristische Person (AG, GmbH, KG, OG, etc.)" tr="Юридична особа (АТ, ТОВ, командитне товариство тощо)" desc="Це для компаній, а не для окремої людини. <strong>Нам не потрібно.</strong>" />

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 10px' }}>Vertretung — Представництво</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 10 }}>Чи подаєте ви заяву самостійно, чи через довірену особу?</p>
              <OptionItem selected de="Ohne Vertretung" desc="Без представника. <strong>Ви подаєте заяву самостійно.</strong> Оберіть цей варіант." />
              <OptionItem de="Mit Vertretung (Vollmacht)" desc="Через представника з довіреністю. <strong>Нам не потрібно.</strong>" />

              <NoteBox type="ok">Для Iryna Müller обираємо: <strong>Natürliche Person</strong> + <strong>Ohne Vertretung</strong>. Після вибору натискайте кнопку <strong>«Weiter»</strong> (Далі).</NoteBox>
              <NoteBox type="info">На цьому етапі система вже може автоматично підтягнути ваші дані (ПІБ, дата народження) завдяки ID Austria. Якщо щось не підтягнулося — перевірте.</NoteBox>
              <p style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic', marginTop: 14 }}>Готово для другої сторінки! Переходимо на третю сторінку.</p>
            </div>
          </div>

          {/* КРОК 3 */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>3</div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>Персональні дані підприємця</h2>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
              <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 10 }}>Після авторизації через ID Austria система автоматично відкриє розділ <strong>Daten</strong> (Дані). Більшість особистих даних вже підтягнулися автоматично. Вам залишається лише <strong>перевірити їх правильність</strong> та за потреби доповнити контактною інформацією.</p>
              <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 16 }}>На цій сторінці варто звернути увагу лише на кілька важливих пунктів.</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>Aufenthalt — Проживання в Австрії</h3>
              <QuoteBlock de="Die gewerbeberechtigte Person hat in den letzten fünf Jahren durchgehend in Österreich gewohnt." ua="«Чи проживала особа безперервно в Австрії протягом останніх п'яти років?»" />
              <YesNo yesLabel="Якщо ви проживаєте в Австрії понад 5 років" noLabel="Якщо ви переїхали менш ніж 5 років тому — наш випадок" selected="nein" />
              <NoteBox type="info">У нашому прикладі Iryna Müller проживає в Австрії менше 5 років — обираємо <strong>Nein</strong>. Це нормально і не є проблемою для реєстрації бізнесу. На наступних етапах система може попросити додаткові документи.</NoteBox>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 8px' }}>Österreichische Sozialversicherungsnummer</h3>
              <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 14 }}>Це ваш <strong>австрійський номер соціального страхування</strong>. У більшості випадків він підтягується автоматично. Якщо поле порожнє — номер можна знайти на вашій <strong>e-card</strong> або в документах від <strong>ÖGK</strong> чи <strong>SVS</strong>.</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 8px' }}>Einzelunternehmen im Firmenbuch eingetragen</h3>
              <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 10 }}>Нижче ви побачите блок, повязаний із реєстрацією у <strong>Firmenbuch</strong> (торговому реєстрі Австрії).</p>
              <NoteBox type="info">
                Якщо ви відкриваєте підприємницьку діяльність вперше — цей блок <strong>залишайте порожнім</strong>. Система сама вказує:<br />
                <em>„Bitte nur ausfüllen, wenn bereits eine Firmenbucheintragung besteht."</em><br />
                <span style={{ color: 'var(--text2)' }}>Заповнюйте лише якщо підприємство вже зареєстроване у Firmenbuch. Для більшості самозайнятих цей розділ не заповнюється.</span>
              </NoteBox>
              <NoteBox type="tip">Переконайтеся, що <strong>електронна пошта</strong> вказана правильно — саме на неї надходитимуть повідомлення щодо вашої заяви.</NoteBox>

              <p style={{ fontSize: 14, marginTop: 14, marginBottom: 8 }}>Після перевірки даних натискаємо <strong>Weiter</strong> і переходимо до найважливішого етапу — вибору виду діяльності (Gewerbe).</p>
              <p style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic' }}>Готово для третьої сторінки! Переходимо на четверту сторінку.</p>
            </div>
          </div>

          {/* КРОК 4 */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>4</div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>Вибір виду діяльності та адреси бізнесу</h2>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
              <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 10 }}>Відкривається сторінка <strong>Angaben zum Gewerbe</strong> (Відомості про підприємницьку діяльність). Саме тут ми повідомляємо державі: чим будемо займатися, з якої дати починаємо, де знаходиться наш бізнес.</p>
              <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 16 }}>Для прикладу продовжимо реєстрацію для Iryna Müller, яка працюватиме як самозайнята IT-фахівчиня.</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 10 }}>Gewerbewortlaut — вид діяльності</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>У верхній частині сторінки знаходиться поле: <strong>Suche nach Gewerbewortlaut</strong>. Введіть ключове слово та натисніть <strong>«Gewerbewortlaut suchen»</strong>.</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>Для більшості програмістів, веброзробників, IT-консультантів, UX/UI дизайнерів та фахівців з цифрових технологій підходить:</p>
              <div style={{ background: 'var(--peach-light)', borderRadius: 9, padding: '13px 16px', border: '1px solid var(--orange-mid)', marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--orange)', marginBottom: 4 }}>Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>Послуги у сфері автоматизованої обробки даних та інформаційних технологій • <strong>Freies Gewerbe</strong> — вільна діяльність, без ліцензії</div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 16 }}>Після вибору назва діяльності зявиться у полі <strong>«Gefundene Gewerbewortlaute»</strong>.</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>Чи потрібно обмежувати вид діяльності?</h3>
              <QuoteBlock de="Möchten Sie den Umfang des Gewerbes einschränken?" ua="«Чи бажаєте ви обмежити обсяг своєї діяльності?»" />
              <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>Для більшості нових підприємців робити цього не потрібно. Iryna Müller хоче мати можливість у майбутньому надавати різні IT-послуги без додаткових змін у реєстрації. Тому обираємо:</p>
              <YesNo yesLabel="Якщо хочете свідомо звузити перелік послуг" noLabel="Стандартний варіант для більшості фрилансерів та самозайнятих" selected="nein" />

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 8px' }}>Anmeldung gültig ab — дата початку діяльності</h3>
              <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 14 }}>За замовчуванням система пропонує <strong>поточну дату</strong>. У нашому прикладі: <strong>04.06.2026</strong>. Змінювати дату потрібно лише тоді, коли ви точно знаєте, що розпочнете діяльність пізніше.</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>Industriebetrieb — Промислове підприємство</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>Для IT-фахівців, фрилансерів, дизайнерів, консультантів та більшості самозайнятих осіб обираємо:</p>
              <YesNo yesLabel="Виробництво, промисловість" noLabel="Для фрилансерів та самозайнятих. Цей пункт стосується виробничих підприємств." selected="nein" />

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 8px' }}>Angaben zum Standort — адреса бізнесу</h3>
              <NoteBox type="ok"><strong>Standortadresse erfassen (mit Adressprüfung)</strong> — система автоматично перевіряє адресу через державний реєстр. Якщо адреса знайдена без помилок, заявка може бути оброблена значно швидше.</NoteBox>
              <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>Заповнюємо поля адреси ведення діяльності:</p>
              <FieldRow label="Postleitzahl" value="Поштовий індекс" />
              <FieldRow label="Ort" value="Населений пункт" />
              <FieldRow label="Straße" value="Назва вулиці" />
              <FieldRow label="Hausnummer" value="Номер будинку" />
              <FieldRow label="Tür" value="Номер квартири (за наявності)" />
              <NoteBox type="info">Оскільки Iryna Müller працює віддалено з дому — вона вказує свою <strong>фактичну адресу проживання</strong> в Австрії. Для більшості фрилансерів це стандартна практика і <strong>не потребує окремого офісу</strong>.</NoteBox>

              <p style={{ fontSize: 14, marginTop: 14, marginBottom: 8 }}>Перевіряємо:</p>
              <CheckList items={['Правильність обраного Gewerbe', 'Дату початку діяльності', 'Адресу бізнесу']} />
              <p style={{ fontSize: 14, marginTop: 14 }}>Після цього натискаємо <strong>Weiter</strong>.</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 8px' }}>Підтвердження відсутності обмежень</h3>
              <OptionItem selected de="Gegen mich liegen keine Gewerbeausschlussgründe vor" tr="Щодо мене не існує підстав для заборони ведення підприємницької діяльності" desc="Для нашого прикладу з Iryna Müller обираємо цей варіант." />
              <OptionItem de="Mir wurde eine Nachsicht erteilt" desc="Використовується лише в особливих випадках, коли людина раніше мала обмеження для ведення бізнесу, але отримала офіційний дозвіл. <strong>Не наш варіант.</strong>" />

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 8px' }}>Eidesstattliche Erklärung — Заява під присягою</h3>
              <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 10 }}>На цьому етапі система пропонує подати офіційну заяву під присягою про відсутність обмежень для ведення підприємницької діяльності.</p>
              <OptionItem selected de="Ich gebe die Eidesstattliche Erklärung ab" tr="Я подаю заяву під присягою" desc="Рекомендуємо обрати цей варіант — він підтверджує відсутність обмежень без додаткових документів і <strong>пришвидшує розгляд заяви</strong>." />
              <NoteBox type="warning">
                Також поставте галочку біля пункту:<br />
                <em>„Ich nehme die Aufklärung über den Inhalt der Eidesstattlichen Erklärung und die Konsequenzen von falschen Angaben zur Kenntnis."</em><br />
                <span style={{ color: 'var(--text2)', fontSize: 12 }}>Це означає, що ви ознайомилися зі змістом декларації та розумієте відповідальність за надання неправдивої інформації. <strong>Для продовження реєстрації цей пункт необхідно підтвердити.</strong></span>
              </NoteBox>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '18px 0 8px' }}>Введення імені та прізвища — електронний підпис</h3>
              <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 10 }}>Наприкінці потрібно ввести своє імя та прізвище. Це прирівнюється до <strong>електронного підпису декларації</strong>.</p>
              <FieldRow label="Vorname" value="Iryna" />
              <FieldRow label="Familienname" value="Müller" />
              <p style={{ fontSize: 14, marginTop: 12 }}>Після цього натискаємо <strong>Weiter</strong> та переходимо до наступного етапу реєстрації.</p>
            </div>
          </div>

          {/* КРОК 5–6 */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: 11, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>5–6</div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>Перевірка даних та відправка заяви</h2>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
              <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 14 }}>На цій сторінці система показує <strong>підсумок усіх даних</strong>, які ви внесли під час реєстрації. Уважно перевірте:</p>
              <CheckList items={['Особисті дані та контактну інформацію', 'Обраний вид діяльності (Gewerbe)', 'Адресу ведення діяльності', 'Дату початку діяльності']} />
              <NoteBox type="info">Якщо потрібно щось виправити, повертайтеся за допомогою кнопки <strong>Zurück</strong> (назад) або <strong>Daten bearbeiten</strong> (редагувати дані).</NoteBox>
              <p style={{ fontSize: 14, marginTop: 14, marginBottom: 8 }}>Якщо всі дані вказані правильно, натискаємо <strong>Senden</strong>. Після цього заява буде надіслана до компетентного органу для обробки.</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 10 }}>Важливо щодо додаткових документів</h3>
              <NoteBox type="ok">Оскільки ми подавали заяву через ID Austria, система відображає: <strong>«Es müssen keine Beilagen übermittelt werden.»</strong><br /><span style={{ color: 'var(--text2)', fontSize: 12 }}>Переклад: Додаткові документи подавати не потрібно.</span></NoteBox>
              <NoteBox type="warning">
                Однак якщо ви проживаєте в Австрії <strong>менше 5 років</strong>, австрійські органи можуть запросити додаткові документи. Найчастіше це:
                <ul style={{ margin: '8px 0 0 16px', lineHeight: 1.8 }}>
                  <li>довідка про несудимість з країни попереднього проживання;</li>
                  <li>документи, що підтверджують особу або місце проживання.</li>
                </ul>
                Рекомендуємо заздалегідь підготувати ці документи та мати їхній <strong>офіційний переклад німецькою</strong>.
              </NoteBox>
            </div>
          </div>

          {/* Завершення */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: 16, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>✓</div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>Реєстрацію завершено — що далі?</h2>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
              <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 12 }}>Після натискання кнопки <strong>Senden</strong> ваша заява буде передана до компетентного органу. Якщо всі дані заповнені правильно та не потрібні додаткові документи, зазвичай протягом кількох днів ви отримаєте електронний лист із підтвердженням реєстрації та вашим <strong>номером GISA</strong>.</p>
              <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 16 }}>Після успішної реєстрації ваша діяльність зявиться в державному реєстрі <strong>GISA (Gewerbeinformationssystem Austria)</strong>.</p>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>Як перевірити реєстрацію онлайн?</h3>
              <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 10 }}>Після обробки заяви інформацію можна безкоштовно перевірити через офіційний реєстр GISA. Пошук доступний без реєстрації — за прізвищем, GISA-номером або видом діяльності.</p>
              <ExtLink href="https://www.gisa.gv.at/abfrage">🔍 GISA Abfrage — перевірити реєстрацію</ExtLink>
            </div>
          </div>

          {/* Вітання */}
          <div style={{ background: 'var(--charcoal)', borderRadius: 16, padding: '32px 28px', textAlign: 'center', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'var(--orange)', opacity: 0.07, top: -40, right: -40 }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 26, color: '#fff', marginBottom: 14, fontWeight: 400 }}>
                Вітаємо з реєстрацією <em style={{ fontStyle: 'italic', color: '#FFB899' }}>Gewerbe! 🎉</em>
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 500, margin: '0 auto' }}>
                Як бачите, зареєструвати підприємницьку діяльність в Австрії через GISA можна повністю онлайн, без відвідування установ та паперової бюрократії. Сподіваємося, що ця покрокова інструкція допомогла вам пройти весь процес без стресу та непорозумінь.
              </p>
            </div>
          </div>

          <NoteBox type="tip">
            Реєстрація Gewerbe — це лише перший крок. Після відкриття діяльності на вас чекають: реєстрація в SVS, листи від Finanzamt, податки, рахунки-фактури, бухгалтерія, Kleinunternehmerregelung, внески до соціального страхування та багато інших питань.<br /><br />
            Саме тому ми підготували цілу серію практичних статей про самозайнятість в Австрії. <strong>Зберігайте наш сайт у закладки — ми регулярно публікуємо нові практичні інструкції та пояснюємо складні австрійські правила простою мовою.</strong>
          </NoteBox>

          <Link href="/articles/gewerbeanmeldung" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 18px', borderRadius: 12, border: '1.5px solid var(--orange)', background: 'var(--peach-light)', textDecoration: 'none', margin: '16px 0' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)' }}>📖 Читайте також → Gewerbeanmeldung в Австрії: повний покроковий гайд</div>
              <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>Все про реєстрацію самозайнятості — з чого починати</div>
            </div>
            <span style={{ fontSize: 18, color: 'var(--orange)', fontWeight: 700 }}>→</span>
          </Link>

          {/* Підсумок */}
          <div style={{ background: 'var(--peach-light)', borderRadius: 14, padding: 22, border: '1px solid var(--orange-mid)', marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: 'var(--charcoal)', marginBottom: 16 }}>Підсумок: що ми зробили</h2>
            {summarySteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--orange)', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.6 }}>{step}</span>
              </div>
            ))}
          </div>

          {/* Джерела */}
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 22 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>Офіційні джерела</p>
            {[
              { label: 'GISA — Online-Gewerbeanmeldung', href: 'https://www.gisa.gv.at/online-gewerbeanmeldung' },
              { label: 'GISA — Перевірка реєстрації', href: 'https://www.gisa.gv.at/abfrage' },
              { label: 'WKO — Gewerbeanmeldung', href: 'https://www.wko.at/gruendung/gewerbeanmeldung' },
            ].map(s => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: 13, color: 'var(--orange)', textDecoration: 'none', marginBottom: 6 }}>↗ {s.label}</a>
            ))}
          </div>
          <div style={{ background: 'var(--gray)', borderRadius: 10, padding: '13px 16px', fontSize: 12, color: 'var(--text3)', lineHeight: 1.6, marginTop: 24, border: '1px solid var(--line)' }}>
            Цей матеріал має інформаційний характер і грунтується на особистому досвіді команди QLIXA. Актуальність інформації рекомендуємо перевіряти на офіційних державних сайтах Австрії. Бажаємо успіхів у вашій підприємницькій діяльності та багато задоволених клієнтів!
          </div>

          <ArticlePrevNext currentSlug="gisa-formular" />
        </div>
      </div>
      <Footer />
    </div>
  )
}
