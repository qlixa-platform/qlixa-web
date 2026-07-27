'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArticleSidebar, ArticlePrevNext } from '@/components/layout/ArticleNav'

function NoteBox({ type, children }: { type: 'warning' | 'info' | 'tip'; children: React.ReactNode }) {
  const s = {
    warning: { bg: '#FFF8E1', border: '#FFD54F', icon: '⚠️' },
    info:    { bg: '#E8F4FD', border: '#90CAF9', icon: 'ℹ️' },
    tip:     { bg: 'var(--peach-light)', border: 'var(--orange-mid)', icon: '💡' },
  }[type]
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 12, padding: '13px 16px', margin: '14px 0', display: 'flex', gap: 11, alignItems: 'flex-start' }}>
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

function StepCard({ n, title, children, id }: { n: number; title: string; children: React.ReactNode; id?: string }) {
  return (
    <div id={id} style={{ marginBottom: 32, scrollMarginTop: '80px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
          {n}
        </div>
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>
          {title}
        </h2>
      </div>
      <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
        {children}
      </div>
    </div>
  )
}

function DocItem({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '9px 13px', borderRadius: 8, background: 'var(--gray)', marginBottom: 7, border: '1px solid var(--line)' }}>
      <span style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 1 }}>·</span>
      <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.55 }}>{text}</span>
    </div>
  )
}

const summarySteps = [
  'Збираємо усі медичні документи з України та замовляємо завірений переклад на німецьку.',
  'Подаємо заяву до Sozialministeriumservice на встановлення ступеня інвалідності та отримання Behindertenpass.',
  'Після отримання Behindertenpass — звертаємося до Finanzamt Österreich щодо підвищеної Familienbeihilfe.',
  'Якщо дитина потребує постійного догляду — подаємо заяву до Pensionsversicherungsanstalt на Pflegegeld.',
  'Щороку подаємо декларацію про доходи — Finanzamt рідко нагадує, що вам щось належить, тож тут ініціатива має бути вашою.',
]

export default function InvalidityChildPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

        {/* Hero */}
        <section style={{ background: '#F0F7F8', padding: '56px clamp(20px,6vw,80px) 40px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' as const }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#038390', background: 'rgba(3,131,144,0.1)', padding: '4px 12px', borderRadius: 999 }}>Сім&apos;я · Пільги</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#595959', background: 'rgba(89,89,89,0.08)', padding: '4px 12px', borderRadius: 999 }}>4 кроки</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#595959', background: 'rgba(89,89,89,0.08)', padding: '4px 12px', borderRadius: 999 }}>Для батьків</span>
              </div>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 16 }}>
                Інвалідність дитини в Австрії:<br />
                <em style={{ color: '#038390', fontStyle: 'italic' }}>виплати, пільги та з чого почати</em>
              </h1>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const, fontSize: 13, color: '#888' }}>
                <span>🕐 10 хв читання</span>
                <span>👨‍👩‍👧 Для батьків</span>
                <span>🇺🇦 Для іноземців</span>
              </div>
            </div>
            <div style={{ flex: '0 0 340px', borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/articles/invalidity-cover.jpg" alt="Інвалідність дитини в Австрії" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
            </div>
          </div>
        </section>

      {/* Article body + sidebar */}
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '48px 16px 80px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>

        {/* Sidebar */}
        <ArticleSidebar currentSlug="invalidity-child" />
        <aside style={{ flex: '0 0 200px', position: 'sticky' as const, top: 24, alignSelf: 'flex-start' as const, background: '#F0F7F8', borderRadius: 16, padding: '20px', fontSize: 13 }}>
          <div style={{ fontWeight: 700, color: '#038390', marginBottom: 12, fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>Зміст</div>
          {[
            ['#step1', 'Behindertenpass'],
            ['#step2', 'Підвищена Familienbeihilfe'],
            ['#step3', 'Pflegegeld'],
            ['#step4', 'Податкові пільги'],
          ].map(([href, label]) => (
            <a key={href} href={href} style={{ display: 'block', color: '#595959', textDecoration: 'none', padding: '5px 0', borderBottom: '1px solid rgba(3,131,144,0.08)', lineHeight: 1.4 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#595959'}>
              {label}
            </a>
          ))}
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Back link */}
          <Link href="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text3)', textDecoration: 'none', marginBottom: 32 }}>
            ← Всі статті
          </Link>

          {/* Intro */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>
              Ви приїхали до Австрії з дитиною, якій в Україні встановили інвалідність. Нова країна, нова система, нова мова — і купа запитань.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)' }}>
              <strong>Хороша новина:</strong> Австрія справді передбачила підтримку для таких сімей.{' '}
              <strong>Погана:</strong> це не відбувається автоматично.
            </p>
          </div>

          {/* STEP 1 */}
          <StepCard id="step1" n={1} title="Австрійський Behindertenpass">
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--charcoal)', marginBottom: 14 }}>
              Українське посвідчення інваліда в Австрії юридично не діє. Кожна країна ЄС проводить власну оцінку. Тож перший крок — отримати австрійський <strong>Behindertenpass</strong> — офіційну картку з фотографією, відсотком інвалідності та додатковими позначками.
            </p>
            <NoteBox type="info">
              Право на Behindertenpass мають особи зі ступенем інвалідності <strong>(Grad der Behinderung) від 50% і вище</strong>, які проживають або постійно перебувають в Австрії.
            </NoteBox>

            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 12px' }}>Куди звертатися</h3>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 12 }}>
              Усіма питаннями займається <strong>Sozialministeriumservice</strong>. Подати заяву можна трьома способами:
            </p>
            {[
              { icon: '💻', title: 'Онлайн', desc: 'через sozialministeriumservice.gv.at (потрібна ID Austria)', link: 'https://www.sozialministeriumservice.at' },
              { icon: '📬', title: 'Поштою', desc: 'надіслати заповнений паперовий формуляр', link: null },
              { icon: '🏢', title: 'Особисто', desc: 'без попереднього запису в будь-яке відділення', link: null },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 14px', borderRadius: 10, background: 'var(--gray)', marginBottom: 8, border: '1px solid var(--line)' }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>
                    {item.desc}
                    {item.link && <> — <ExtLink href={item.link}>sozialministeriumservice.at</ExtLink></>}
                  </div>
                </div>
              </div>
            ))}

            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 12px' }}>Які документи потрібні</h3>
            <DocItem text="Паспорт або ID-картка (для українців зі статусом переміщеної особи — «Ausweis für Vertriebene»)" />
            <DocItem text="Українське посвідчення інвалідності з нотаріально завіреним перекладом на німецьку" />
            <DocItem text="Медичні документи з України (діагнози, висновки, результати обстежень) — також у перекладі" />
            <DocItem text="Австрійські медичні висновки, якщо дитина вже спостерігалась у місцевих лікарів" />

            <NoteBox type="tip">
              Чим більше медичної документації — тим швидше пройде процедура. Важливо, щоб із документів чітко були видні діагнози та захворювання.
            </NoteBox>
            <NoteBox type="info">
              Для онлайн-заяви потрібна <strong>ID Austria</strong>.{' '}
              <Link href="/articles/austria-id" style={{ color: 'var(--orange)', fontWeight: 600 }}>
                Як її отримати — читайте у нашій статті →
              </Link>
            </NoteBox>

            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 10px' }}>Що відбувається далі</h3>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
              Після подачі заяви розпочинається <strong>«Feststellungsverfahren»</strong> — процедура встановлення ступеня інвалідності. Лікарі-експерти вивчають усі надані документи й визначають відсоток за австрійською шкалою. Якщо рішення вас не влаштовує — протягом <strong>шести тижнів</strong> можна подати заперечення.
            </p>
          </StepCard>

          {/* STEP 2 */}
          <StepCard id="step2" n={2} title="Підвищена Familienbeihilfe (додатково до звичайної)">
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--charcoal)', marginBottom: 10 }}>
              Після підтвердження ступеня інвалідності від 50% відкривається право на підвищену Familienbeihilfe.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--charcoal)', marginBottom: 16 }}>
              Ця виплата <strong>додається до звичайної Familienbeihilfe (Kinderbeihilfe)</strong>, яку ви отримуєте на дитину.
            </p>

            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', marginBottom: 16 }}>
              {[
                { amount: '189,20 €', label: 'на місяць', desc: 'підвищена Familienbeihilfe (2026)' },
                { amount: '70,90 €', label: 'на місяць', desc: 'Kinderabsetzbetrag (автоматично)' },
              ].map(card => (
                <div key={card.desc} style={{ background: 'var(--peach-light)', borderRadius: 12, padding: '16px 18px', border: '1px solid var(--orange-mid)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 28, color: 'var(--orange)', lineHeight: 1 }}>{card.amount}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>{card.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--charcoal)', marginTop: 6, fontWeight: 500 }}>{card.desc}</div>
                </div>
              ))}
            </div>

            <NoteBox type="info">
              <strong>Kinderabsetzbetrag</strong> (70,90 €/міс) виплачується автоматично разом із Familienbeihilfe — його не потрібно запитувати окремо.
            </NoteBox>
            <NoteBox type="warning">
              <strong>Для українських сімей:</strong> з листопада 2025 по червень 2026 Familienbeihilfe отримують лише батьки, які або працюють, або зареєстровані в AMS. <strong>Але є виняток:</strong> батьки, які доглядають за дитиною зі значною інвалідністю, звільнені від цієї вимоги.
            </NoteBox>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginTop: 12 }}>
              Заява на підвищену Familienbeihilfe подається до <strong>Finanzamt Österreich</strong> — через FinanzOnline або поштою. З березня 2023 року як підтвердження достатньо даних із процедури Behindertenpass.
            </p>
          </StepCard>

          {/* STEP 3 */}
          <StepCard id="step3" n={3} title="Pflegegeld — допомога по догляду">
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--charcoal)', marginBottom: 14 }}>
              Якщо дитина потребує постійного догляду — є ще одна виплата. <strong>Pflegegeld</strong> не залежить від доходу і призначена на покриття витрат, пов&apos;язаних безпосередньо з доглядом.
            </p>
            <NoteBox type="info">
              Право виникає, якщо дитина потребує постійного догляду щонайменше <strong>6 місяців</strong>, і цей догляд становить понад <strong>65 годин на місяць</strong> — це перша, найнижча ступінь.
            </NoteBox>
            <NoteBox type="tip">
              За рішенням австрійського Верховного суду від серпня 2023 року, українські переміщені особи з посвідченням <strong>«Ausweis für Vertriebene»</strong> мають право на Pflegegeld на підставі Директиви ЄС про масовий приплив осіб.
            </NoteBox>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginTop: 12 }}>
              Заяву подають до <strong>Pensionsversicherungsanstalt</strong>.
            </p>
          </StepCard>

          {/* STEP 4 */}
          <StepCard id="step4" n={4} title="Податкові пільги">
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--charcoal)', marginBottom: 16 }}>
              Якщо ви платите податки в Австрії — є суттєвий плюс: податкові відрахування на дитину з інвалідністю.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {[
                {
                  range: '25–49%',
                  text: 'Витрати на лікування, пов\'язані з інвалідністю дитини, можна включати до декларації без утримання «самостійної частини» (Selbstbehalt).',
                },
                {
                  range: '50% і вище',
                  text: 'Право на щомісячний фіксований вирахування у розмірі 262 євро. Якщо реальні витрати вищі — можна задекларувати їх із підтвердними документами.',
                },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 16px', borderRadius: 12, background: 'var(--gray)', border: '1px solid var(--line)' }}>
                  <div style={{ padding: '4px 10px', borderRadius: 6, background: 'var(--orange)', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0, height: 'fit-content' }}>
                    {item.range}
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.6 }}>{item.text}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>
              Додатково і без жодного Selbstbehalt можна включити до декларації:
            </p>
            <DocItem text="Разові витрати на допоміжні засоби (інвалідний візок, слуховий апарат, адаптацію квартири)" />
            <DocItem text="Витрати на лікування" />
            <DocItem text="Навчання у спеціальній або реабілітаційній школі чи відвідування майстерні" />

            <NoteBox type="tip">
              Усе це відображається у щорічній декларації <strong>Einkommensteuererklärung</strong> або <strong>Arbeitnehmerveranlagung</strong>. Навіть за невеликих доходів декларація може повернути частину сплаченого податку.
            </NoteBox>
          </StepCard>

          {/* Summary */}
          <div style={{ background: 'var(--peach-light)', borderRadius: 16, padding: 24, border: '1px solid var(--orange-mid)', marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 20 }}>
              Підсумуємо: <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>що і в якому порядку</em>
            </h2>
            {summarySteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--orange)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.65 }}>{step}</span>
              </div>
            ))}
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginTop: 16, fontStyle: 'italic' }}>
              Австрійська бюрократія — це, звичайно, окремий вид спорту. Але в цьому випадку фінішна стрічка коштує того, щоб пробігти дистанцію.
            </p>
          </div>

          {/* Sources */}
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 22 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>
              Офіційні джерела
            </p>
            {[
              { label: 'Sozialministeriumservice — Behindertenpass', href: 'https://www.sozialministeriumservice.at' },
              { label: 'Bundeskanzleramt — Familienbeihilfe', href: 'https://www.bundeskanzleramt.gv.at' },
              { label: 'Pensionsversicherungsanstalt — Pflegegeld', href: 'https://www.pensionsversicherung.at' },
              { label: 'oesterreich.gv.at — податкові пільги', href: 'https://www.oesterreich.gv.at' },
            ].map(s => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', fontSize: 13, color: 'var(--orange)', textDecoration: 'none', marginBottom: 6 }}>
                ↗ {s.label}
              </a>
            ))}
          </div>

          <div style={{ background: 'var(--gray)', borderRadius: 10, padding: '13px 16px', fontSize: 12, color: 'var(--text3)', lineHeight: 1.6, marginTop: 24, border: '1px solid var(--line)' }}>
            Цей матеріал має інформаційний характер і ґрунтується на публічно доступних офіційних джерелах. Актуальність інформації рекомендуємо перевіряти на офіційних державних сайтах Австрії.
          </div>

          {/* Prev / Next */}
          <ArticlePrevNext currentSlug="invalidity-child" />

        </div>{/* end main content */}
      </div>{/* end flex wrapper */}

      <Footer />
    </div>
  )
}
