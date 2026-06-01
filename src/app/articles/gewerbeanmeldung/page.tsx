'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'

function StepBadge({ n }: { n: number }) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%', background: 'var(--orange)',
      color: '#fff', fontWeight: 700, fontSize: 15, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {n}
    </div>
  )
}

function NoteBox({ type, children }: { type: 'warning' | 'info' | 'tip'; children: React.ReactNode }) {
  const s = {
    warning: { bg: '#FFF8E1', border: '#FFD54F', icon: '⚠️' },
    info:    { bg: '#E8F4FD', border: '#90CAF9', icon: 'ℹ️' },
    tip:     { bg: 'var(--peach-light)', border: 'var(--orange-mid)', icon: '💡' },
  }[type]
  return (
    <div style={{
      background: s.bg, border: `1px solid ${s.border}`,
      borderRadius: 12, padding: '13px 16px', margin: '14px 0',
      display: 'flex', gap: 11, alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
      <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--charcoal)' }}>{children}</div>
    </div>
  )
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      color: 'var(--orange)', fontWeight: 600,
      textDecoration: 'underline', textDecorationColor: 'var(--peach-mid)',
      textUnderlineOffset: 3, fontSize: 13,
    }}>
      {children} ↗
    </a>
  )
}

function ArticleLink({ href, title, sub }: { href: string; title: string; sub: string }) {
  return (
    <Link href={href} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      padding: '14px 18px', borderRadius: 12,
      border: '1.5px solid var(--orange)', background: 'var(--peach-light)',
      textDecoration: 'none', margin: '16px 0',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>📖</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)' }}>{title}</div>
          <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>{sub}</div>
        </div>
      </div>
      <span style={{ fontSize: 18, color: 'var(--orange)', fontWeight: 700 }}>→</span>
    </Link>
  )
}

function CostTable() {
  const rows = [
    { type: 'Einzelunternehmen — freies Gewerbe', cost: '0 €', free: true, note: 'Безкоштовно з 2017 р.' },
    { type: 'Einzelunternehmen — reglementiert', cost: '~14–100 €', free: false, note: 'Залежно від виду діяльності' },
    { type: 'GmbH (нотаріус + Firmenbuch)', cost: '~2 000–4 000 €', free: false, note: '+ мін. капітал 35 000 €' },
    { type: 'FlexCo (нотаріус + Firmenbuch)', cost: '~1 200–2 500 €', free: false, note: '+ мін. капітал 10 000 €' },
  ]
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'var(--charcoal)' }}>
            {['Форма / тип бізнесу', 'Вартість', 'Примітка'].map(h => (
              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#fff', fontSize: 12, fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : 'var(--gray)' }}>
              <td style={{ padding: '10px 14px', color: 'var(--charcoal)', fontWeight: 500 }}>{r.type}</td>
              <td style={{ padding: '10px 14px' }}>
                <span style={{
                  padding: '2px 9px', borderRadius: 5, fontWeight: 700, fontSize: 12,
                  background: r.free ? 'var(--success-bg)' : 'var(--peach-light)',
                  color: r.free ? 'var(--success)' : 'var(--orange)',
                }}>{r.cost}</span>
              </td>
              <td style={{ padding: '10px 14px', color: 'var(--text2)', fontSize: 12 }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function QlixaPromo() {
  return (
    <div style={{
      background: 'var(--charcoal)', borderRadius: 20, padding: '40px 28px',
      margin: '48px 0', textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', width: 180, height: 180, borderRadius: '50%',
        background: 'var(--orange)', opacity: 0.07, top: -40, right: -40,
      }} />
      <div style={{
        position: 'absolute', width: 180, height: 180, borderRadius: '50%',
        background: 'var(--orange)', opacity: 0.07, bottom: -60, left: -40,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Image src="/logos/logo-mascot.svg" alt="QLIXA" width={72} height={72}
          style={{ margin: '0 auto 16px', display: 'block' }} />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--orange)', marginBottom: 12,
        }}>
          Reports in one click
        </div>
        <h3 style={{
          fontFamily: 'DM Serif Display, serif', fontSize: 26, color: '#fff',
          marginBottom: 14, lineHeight: 1.3,
        }}>
          Тримай фінанси під контролем <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>легко</em>
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, maxWidth: 460, margin: '0 auto 24px', lineHeight: 1.75 }}>
          Автоматичний розрахунок SVS, USt, ESt. Рахунки за кілька секунд. Звіти одним кліком.
          Чотири мови: 🇺🇦 🇩🇪 🇬🇧 🇷🇺
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/free-test" style={{
            padding: '13px 26px', borderRadius: 999, fontSize: 13, fontWeight: 700,
            background: 'var(--orange)', color: '#fff', border: '2px solid var(--orange)',
            textDecoration: 'none', display: 'inline-block',
          }}>
            Спробувати безкоштовно →
          </Link>
          <Link href="/pricing" style={{
            padding: '13px 26px', borderRadius: 999, fontSize: 13, fontWeight: 700,
            background: 'transparent', color: '#fff', border: '2px solid #fff',
            textDecoration: 'none', display: 'inline-block',
          }}>
            Дивитись тарифи
          </Link>
        </div>
      </div>
    </div>
  )
}

function TranslationForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <input type="text" placeholder="Ім'я (латиницею)" style={{
          padding: '10px 13px', borderRadius: 8, border: '1px solid var(--line2)',
          fontSize: 13, outline: 'none', fontFamily: 'DM Sans, sans-serif',
        }} />
        <input type="text" placeholder="Прізвище (латиницею)" style={{
          padding: '10px 13px', borderRadius: 8, border: '1px solid var(--line2)',
          fontSize: 13, outline: 'none', fontFamily: 'DM Sans, sans-serif',
        }} />
      </div>
      <input type="email" placeholder="Email для зв'язку" style={{
        width: '100%', padding: '10px 13px', borderRadius: 8, border: '1px solid var(--line2)',
        fontSize: 13, outline: 'none', fontFamily: 'DM Sans, sans-serif',
      }} />
      <div style={{
        padding: '12px 13px', borderRadius: 8, border: '2px dashed var(--line2)',
        fontSize: 13, color: 'var(--text3)', background: '#fff', textAlign: 'center', cursor: 'pointer',
      }}>
        📎 Завантажити файл з ДІЯ (PDF або JPG)
      </div>
      <button style={{
        padding: '11px', borderRadius: 999, fontSize: 13, fontWeight: 700,
        background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer',
        fontFamily: 'DM Sans, sans-serif',
      }}>
        Надіслати заявку →
      </button>
    </div>
  )
}

export default function GewerbeanmeldungPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--charcoal)', padding: '56px 16px 44px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            <span style={{
              background: 'var(--orange)', color: '#fff',
              fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999,
            }}>Реєстрація бізнесу</span>
            <span style={{
              background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)',
              fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999,
            }}>9 кроків · Повний гайд</span>
          </div>
          <h1 style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 'clamp(26px,4.5vw,40px)',
            color: '#fff', lineHeight: 1.2, marginBottom: 16,
          }}>
            Gewerbeanmeldung в Австрії:<br />
            <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>покрокова реєстрація самозайнятості</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.7, maxWidth: 580, marginBottom: 22 }}>
            Іноземці в Австрії платять юристам €300–500 за типові питання. Ми зібрали всю інформацію
            безкоштовно — щоб ти міг зробити все сам, крок за кроком.
          </p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[{ icon: '🕐', text: '15 хв читання' }, { icon: '🆓', text: 'Freies Gewerbe — 0 €' }, { icon: '🇺🇦', text: 'Для іноземців' }].map(m => (
              <span key={m.text} style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                {m.icon} {m.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Article body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 16px 80px' }}>

        {/* Intro */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: 24,
          border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 40,
        }}>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--charcoal)', marginBottom: 14 }}>
            Українці, румуни, серби та інші іноземці в Австрії часто не розуміють: яка форма підходить,
            чи потрібна ліцензія, куди йти, які документи нести, скільки коштує і що буде з податками.
            У цьому гайді — реєстрація <strong>онлайн крок за кроком</strong>.
          </p>
          <div style={{
            padding: '13px 16px', background: 'var(--peach-light)',
            borderRadius: 9, borderLeft: '3px solid var(--orange)', fontSize: 13, color: 'var(--charcoal)',
          }}>
            <strong style={{ color: 'var(--orange)' }}>Спосіб подачі:</strong> онлайн або особисто.
            Цей гайд — про <strong>онлайн</strong>. Для офлайн —{' '}
            <ExtLink href="https://www.wko.at/gruendung/gewerbeanmeldung">запишіться у WKO</ExtLink> — там безкоштовно консультують.
          </div>
        </div>

        {/* STEP 1 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={1} />
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>
              Визначитися з видом діяльності
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>Спочатку потрібно зрозуміти — яка у вас діяльність:</p>
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', marginBottom: 20 }}>
              {[
                { title: 'Freies Gewerbe', sub: 'Вільна діяльність без ліцензії', desc: 'Більшість IT, дизайн, консалтинг, фотографія, переклади. Реєстрація безкоштовна з 2017 року.', featured: true },
                { title: 'Reglementiertes Gewerbe', sub: 'Потрібен Befähigungsnachweis', desc: 'Лікарі, архітектори, електрики тощо. Необхідно підтвердити кваліфікацію.', featured: false },
              ].map(c => (
                <div key={c.title} style={{
                  padding: 15, borderRadius: 11,
                  border: `2px solid ${c.featured ? 'var(--orange)' : 'var(--line)'}`,
                  background: c.featured ? 'var(--peach-light)' : 'var(--gray)',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: c.featured ? 'var(--orange)' : 'var(--charcoal)', marginBottom: 3 }}>{c.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text2)', marginBottom: 8 }}>{c.sub}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--charcoal)' }}>{c.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 10 }}>Вартість реєстрації (§ 13 GewO, GebG):</p>
            <CostTable />
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 14 }}>
              <ExtLink href="https://www.wko.at/statistik/oenace/oenace2008.pdf">📋 Список КВЕДів (ÖNACE 2008)</ExtLink>
              <ExtLink href="https://www.gisa.gv.at/abfrage">🔍 Перевірка в GISA</ExtLink>
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={2} />
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>
              Підготувати документи заздалегідь
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>Ці документи знадобляться на різних етапах — готуйте одразу всі:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {['Скан паспорта (закордонного)', 'Meldezettel — довідка про прописку в Австрії', 'Ausweis — посвідчення особи', 'Дійсний австрійський банківський рахунок', 'Довідка про несудимість (після 3 років перебування)'].map((doc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 13px', borderRadius: 9, background: 'var(--gray)', border: '1px solid var(--line)' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--peach-light)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 13, color: 'var(--charcoal)' }}>{doc}</span>
                </div>
              ))}
            </div>
            <NoteBox type="info">
              <strong>Банківський рахунок:</strong> для Einzelunternehmen окремий рахунок не обов&apos;язковий, але рекомендований. Для GmbH / FlexCo — обов&apos;язковий.
            </NoteBox>
            <NoteBox type="warning">
              <strong>Довідка з ДІЯ:</strong> для реєстрації в GISA підходить згенерований у ДІЯ+ переклад на німецьку. QLIXA може допомогти з автоперекладом через наших партнерів.{' '}
              Замовити австрійську довідку: <ExtLink href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung?locale=en">bmi.gv.at</ExtLink>
            </NoteBox>
            <div style={{ marginTop: 20, padding: 18, borderRadius: 12, border: '2px dashed var(--orange)', background: 'var(--peach-light)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--orange)', marginBottom: 4 }}>🔄 Потрібен переклад довідки з ДІЯ?</div>
              <p style={{ fontSize: 13, color: 'var(--charcoal)', marginBottom: 14, lineHeight: 1.6 }}>
                Залиште заявку — наші партнери зроблять переклад швидко і точно.
              </p>
              <TranslationForm />
            </div>
          </div>
        </div>

        {/* STEP 3 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={3} />
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>
              Оформити Austria ID
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>
              Austria ID — ваш цифровий підпис для входу в державні сервіси (GISA, FinanzOnline, SVS). Без нього онлайн реєстрація неможлива.
            </p>
            <NoteBox type="warning">
              Для негромадян Австрії зробити Austria ID онлайн може не вийти — залежить від землі. Будьте готові до особистого відвідування.
            </NoteBox>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '14px 0' }}>
              {[
                'Запишіться на термін у поліцейське управління вашої землі',
                'Вкажіть: ID Austria – Registration',
                'Підготуйте всі документи (список прийде на пошту після запису)',
                'Прийдіть особисто у вказану дату (для кожного члена сім\'ї — окремо)',
                'Майте доступ до австрійського номера телефону',
                'Заздалегідь завантажте застосунок Austria ID',
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '10px 13px', borderRadius: 9, background: 'var(--gray)' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--charcoal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                  <span style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--charcoal)' }}>{s}</span>
                </div>
              ))}
            </div>
            <ExtLink href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung">
              📅 Записатися на термін — bmi.gv.at
            </ExtLink>
            <ArticleLink
              href="/articles/austria-id"
              title="Читайте детально → Як оформити Austria ID: покроковий гайд"
              sub="Відкривається в новому вікні · Повна інструкція"
            />
          </div>
        </div>

        {/* QLIXA PROMO */}
        <QlixaPromo />

        {/* STEP 4 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={4} />
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>
              Реєстрація на сайті GISA
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>
              GISA — Gewerbeinformationssystem Austria — офіційний портал для реєстрації Gewerbe.
            </p>
            <ExtLink href="https://www.gisa.gv.at/online-gewerbeanmeldung">🌐 Перейти на GISA — Online-Gewerbeanmeldung</ExtLink>
            <NoteBox type="info">
              Після реєстрації чекайте кілька днів — дані з GISA знадобляться для заповнення форми у FinanzOnline.
            </NoteBox>
            <ArticleLink
              href="/articles/gisa-formular"
              title="Читайте детально → Як заповнити формуляр GISA"
              sub="Покроковий гайд з поясненнями кожного поля"
            />
          </div>
        </div>

        {/* STEP 5 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={5} />
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>
              Реєстрація в SVS
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8 }}>
              SVS (Sozialversicherungsanstalt der Selbständigen) — соціальне страхування самозайнятих. Вхід через Austria ID.
            </p>
            <NoteBox type="tip">
              До страхування SVS можна підключити всіх членів сім&apos;ї та навіть найближчих родичів.
            </NoteBox>
            <ArticleLink
              href="/articles/svs-formular"
              title="Читайте детально → Як заповнити формуляр SVS"
              sub="Що вказати, щоб не переплатити та підключити сім'ю"
            />
          </div>
        </div>

        {/* STEP 6 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={6} />
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>
              Реєстрація у FinanzOnline
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>
              Вхід через Austria ID. До цього моменту вам вже має прийти лист від GISA, і ви повинні спрогнозувати оборот — бо SVS одразу почне нараховувати внески.
            </p>
            <NoteBox type="tip">
              Не знаєте скільки платити SVS?{' '}
              <ExtLink href="https://www.svs.at/sva-beitrag/?contentid=10007.906048&portal=svsportal">SVS Beitragsrechner</ExtLink>
              {' '}— а якщо там нічого не зрозуміло, саме тому ми створили QLIXA 😉
            </NoteBox>
            <NoteBox type="warning">
              Обов&apos;язково потрібна <strong>фізична адреса</strong> для отримання листа від FinanzOnline — туди приходять логіни та паролі.
            </NoteBox>
            <NoteBox type="info">
              При реєстрації можна додати лише <strong>один КВЕД</strong>. Щоб додати ще — напишіть лист у вільній формі та відправте на email вашого Bezirkshauptmannschaft.
            </NoteBox>
            <ArticleLink
              href="/articles/finanz-online"
              title="Читайте детально → Як заповнити формуляр FinanzOnline"
              sub="Покроковий гайд — що вказати і як не помилитись"
            />
          </div>
        </div>

        {/* STEP 7 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={7} />
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>
              Налаштувати SEPA-Lastschriftmandat
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8 }}>
              У кабінеті FinanzOnline знайдіть через пошук <strong>«SEPA-Lastschriftmandat»</strong> і заповніть форму для автоматичного списання SVS та інших платежів з вашого рахунку.
            </p>
          </div>
        </div>

        {/* STEP 8 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={8} />
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>
              Вибір пенсійного фонду MVK
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>
              Протягом <strong>6 місяців</strong> після реєстрації оберіть Mitarbeitervorsorgekasse (MVK) — § 6 BMSVG.
              Це 1.53% від доходу щомісяця — ваш пенсійний накопичувальний рахунок.
            </p>
            <ArticleLink
              href="/articles/mvk-pension"
              title="Читайте детально → Як обрати пенсійний фонд MVK"
              sub="Що таке MVK і як не пропустити дедлайн 6 місяців"
            />
          </div>
        </div>

        {/* STEP 9 */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={9} />
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4 }}>
              Зареєструватися у WKO вашого району
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>
              WKO (Wirtschaftskammer Österreich) — торгово-промислова палата. У вашому районному відділенні
              можуть бути <strong>безкоштовні консультації</strong>, вебінари та зустрічі.
            </p>
            <ExtLink href="https://www.wko.at/gruendung/gewerbeanmeldung">🏢 WKO — інформація про реєстрацію</ExtLink>
          </div>
        </div>

        {/* Final CTA */}
        <div style={{
          background: 'var(--charcoal)', borderRadius: 20, padding: '40px 28px',
          textAlign: 'center', marginBottom: 48, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'var(--orange)', opacity: 0.07, top: -40, right: -40 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Image src="/logos/logo-mascot.svg" alt="QLIXA" width={80} height={80}
              style={{ margin: '0 auto 18px', display: 'block' }} />
            <h2 style={{
              fontFamily: 'DM Serif Display, serif', fontSize: 28, color: '#fff',
              marginBottom: 16, lineHeight: 1.3,
            }}>
              Ну шо — погнали! 🚀<br />
              <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>Починай заробляти!</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, maxWidth: 500, margin: '0 auto 28px', lineHeight: 1.8 }}>
              А найкращий спосіб тримати фінанси під контролем — це <strong style={{ color: '#fff' }}>QLIXA</strong>.
              За один клік, твоєю мовою: рахунки, склад, клієнти, прогнози SVS, повернення податків і автоматична звітність.
              Ти будеш готовий до кінця року — <strong style={{ color: 'var(--orange)' }}>автоматично</strong>.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/free-test" style={{
                padding: '14px 28px', borderRadius: 999, fontSize: 14, fontWeight: 700,
                background: 'var(--orange)', color: '#fff', border: '2px solid var(--orange)',
                textDecoration: 'none', display: 'inline-block',
              }}>
                Спробувати QLIXA безкоштовно →
              </Link>
              <Link href="/pricing" style={{
                padding: '14px 28px', borderRadius: 999, fontSize: 14, fontWeight: 700,
                background: 'transparent', color: '#fff', border: '2px solid #fff',
                textDecoration: 'none', display: 'inline-block',
              }}>
                QLIXA — твоя бухгалтерія в Австрії
              </Link>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, marginTop: 16 }}>
              Reports in one click — і спокій у голові.
            </p>
          </div>
        </div>

        {/* Sources */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 22 }}>
          <p style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
            Офіційні джерела
          </p>
          {[
            { label: 'GISA — Online-Gewerbeanmeldung', href: 'https://www.gisa.gv.at/online-gewerbeanmeldung' },
            { label: 'WKO — Gewerbeanmeldung', href: 'https://www.wko.at/gruendung/gewerbeanmeldung' },
            { label: 'BMWET — Gewerbeanmeldung', href: 'https://www.bmwet.gv.at/Themen/Unternehmen/Gewerbe/Gewerbeanmeldung.html' },
            { label: 'SVS — Beitragsrechner', href: 'https://www.svs.at/sva-beitrag/?contentid=10007.906048&portal=svsportal' },
          ].map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', fontSize: 13, color: 'var(--orange)', textDecoration: 'none', marginBottom: 6 }}>
              ↗ {s.label}
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
