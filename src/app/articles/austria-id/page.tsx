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
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#038390', fontWeight: 600, textDecoration: 'underline', textDecorationColor: 'var(--peach-mid)', textUnderlineOffset: 3, fontSize: 13 }}>
      {children} ↗
    </a>
  )
}

const steps = [
  {
    n: 1,
    title: 'Завантажте застосунок Austria ID заздалегідь',
    content: (
      <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
        Перед візитом до відділку встановіть застосунок <strong>ID Austria</strong> на свій смартфон. Він доступний для iOS та Android. Це важливо зробити заздалегідь — застосунок знадобиться прямо на місці під час реєстрації.
      </p>
    ),
  },
  {
    n: 2,
    title: 'Запишіться на термін до поліцейського управління',
    content: (
      <>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>
          Для не-громадян реєстрація Austria ID відбувається особисто в провінційному поліцейському управлінні (Landespolizeidirektion) вашої землі.
        </p>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>
          <ExtLink href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung">
            📅 Записатися на термін — citizen.bmi.gv.at
          </ExtLink>
        </p>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6 }}>Як записатися:</p>
        {['Оберіть вашу федеральну землю', 'У пошуку вкажіть: ID Austria – Registration', 'Оберіть зручну дату і час'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 12px', borderRadius: 8, background: 'var(--gray)', marginBottom: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--charcoal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
            <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
        <NoteBox type="warning">
          Термін можна записати лише на <strong>одну особу</strong>. Якщо плануєте оформити Austria ID на всю сім&apos;ю — кожен член сім&apos;ї записується і приходить окремо.
        </NoteBox>
      </>
    ),
  },
  {
    n: 3,
    title: 'Підготуйте документи',
    content: (
      <>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>
          Після запису вам прийде лист зі списком. Стандартний набір:
        </p>
        {[
          'Діючий паспорт (оригінал)',
          'Meldezettel — реєстрація за місцем проживання в Австрії',
          'Вид на проживання або документ, що підтверджує ваш статус',
          'Смартфон із встановленим застосунком ID Austria',
          'Австрійський номер телефону — обов\'язковий для SMS-коду',
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, background: 'var(--gray)', marginBottom: 6, border: '1px solid var(--line)' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--peach-light)', color: '#038390', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <span style={{ fontSize: 13, color: 'var(--charcoal)' }}>{item}</span>
          </div>
        ))}
      </>
    ),
  },
  {
    n: 4,
    title: 'Прийдіть до відділку у призначений час',
    content: (
      <>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>
          Співробітник перевірить ваші документи та активує Austria ID прямо на вашому смартфоні. Весь процес займає близько <strong>20–30 хвилин</strong>.
        </p>
        <NoteBox type="tip">
          Ви отримаєте роздруківку з <strong>Freischaltcode</strong> і <strong>Widerrufs-Passwort</strong> — збережіть їх, вони знадобляться для завершення реєстрації вдома.
        </NoteBox>
      </>
    ),
  },
  {
    n: 5,
    title: 'Завершіть реєстрацію вдома',
    content: (
      <>
        {[
          'Зайдіть на сайт: a-trust.at/id-austria-registrierung',
          'Введіть отриманий Freischaltcode і Widerrufs-Passwort',
          'Прив\'яжіть застосунок ID Austria до вашого акаунту',
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 12px', borderRadius: 8, background: 'var(--gray)', marginBottom: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--charcoal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
            <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
        <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--success-bg)', border: '1px solid var(--success)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 18 }}>✅</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)' }}>Готово — Austria ID активована і готова до використання!</span>
        </div>
      </>
    ),
  },
]

export default function AustriaIdPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

        {/* Hero */}
        <section style={{ background: '#F0F7F8', padding: '56px clamp(20px,6vw,80px) 40px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' as const }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#038390', background: 'rgba(3,131,144,0.1)', padding: '4px 12px', borderRadius: 999 }}>Австрія · Документи</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#595959', background: 'rgba(89,89,89,0.08)', padding: '4px 12px', borderRadius: 999 }}>5 кроків</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#595959', background: 'rgba(89,89,89,0.08)', padding: '4px 12px', borderRadius: 999 }}>Для іноземців</span>
              </div>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 16 }}>
                Як оформити Austria ID:<br />
                <em style={{ color: '#038390', fontStyle: 'italic' }}>покроковий гайд для іноземців</em>
              </h1>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const, fontSize: 13, color: '#888' }}>
                <span>🕐 8 хв читання</span>
                <span>📱 5 кроків</span>
                <span>🇺🇦 Для іноземців</span>
              </div>
            </div>
            <div style={{ flex: '0 0 340px', borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/articles/austria-id-cover.jpg" alt="Austria ID" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
            </div>
          </div>
        </section>

      {/* Article body + sidebar */}
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '48px 16px 80px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>

        {/* Sidebar */}
        <ArticleSidebar currentSlug="austria-id" />
        <aside style={{ flex: '0 0 200px', position: 'sticky' as const, top: 24, alignSelf: 'flex-start' as const, background: '#F0F7F8', borderRadius: 16, padding: '20px', fontSize: 13 }}>
          <div style={{ fontWeight: 700, color: '#038390', marginBottom: 12, fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>Зміст</div>
          {[
            ['#what', 'Що таке Austria ID'],
            ['#why', 'Навіщо іноземцю'],
            ['#nongradients', 'Для не-громадян'],
            ['#steps', 'Покрокова інструкція'],
            ['#next', 'Що далі'],
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

        {/* Disclaimer */}
        <div style={{ background: '#FFF8E7', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 12, padding: '16px 20px', marginBottom: 32, fontSize: 13, color: '#595959', lineHeight: 1.6 }}>
          ⚠️ <strong>Важливо:</strong> Цей матеріал підготовлено на основі публічно доступних офіційних джерел та досвіду людей, які пройшли цей процес. QLIXA не є юридичним агентством і не надає індивідуальних консультацій. Процедура оформлення може відрізнятися залежно від вашого відділення поліції — завжди перевіряйте актуальну інформацію на офіційних сайтах Австрії.
        </div>

        {/* What is Austria ID */}
        <h2 id="what" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
          Що таке Austria ID і навіщо вона <em style={{ fontStyle: 'italic', color: '#038390' }}>потрібна?</em>
        </h2>

        {/* ID Austria logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 12, padding: '14px 18px', border: '1px solid var(--line)', marginBottom: 16 }}>
          <Image src="/articles/id-austria-logo.svg" alt="ID Austria" width={120} height={32} style={{ objectFit: 'contain', height: 28, width: 'auto', background: 'transparent' }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--charcoal)' }}>ID Austria</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Цифровий паспорт в Австрії</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 24 }}>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>
            Austria ID (офіційна назва — <strong>ID Austria</strong>) — це ваш цифровий паспорт в Австрії. Простими словами — це електронне посвідчення особи, яке дозволяє підтверджувати вашу особистість онлайн і користуватися державними та приватними сервісами прямо зі смартфона.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)' }}>
            Раніше в Австрії для онлайн-підписів використовувалась <strong>Handy-Signatur</strong>. Austria ID — це її оновлена і розширена версія, яка замінила стару систему.
          </p>
        </div>

        {/* For whom */}
        <h2 id="why" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
          Навіщо вона потрібна <em style={{ fontStyle: 'italic', color: '#038390' }}>іноземцю?</em>
        </h2>
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: 'var(--charcoal)', marginBottom: 14 }}>Без Austria ID ви не зможете зареєструватися на багатьох держплатформах. Зокрема, вона обов&apos;язкова для:</p>
          {[
            { icon: '🏢', text: 'Реєстрації бізнесу на GISA (Gewerbeanmeldung)' },
            { icon: '💼', text: 'Роботи з FinanzOnline — податковим кабінетом' },
            { icon: '🏥', text: 'Реєстрації в SVS — соціальне страхування для самозайнятих' },
            { icon: '✍️', text: 'Підписання документів онлайн — юридично дійсний електронний підпис' },
            { icon: '🌐', text: 'Доступу до oesterreich.gv.at і десятків інших держсервісів' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--gray)', borderRadius: 10, padding: '11px 14px', marginBottom: 8, border: '1px solid var(--line)' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Warning for non-citizens */}
        <h2 id="nongradients" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
          Важливо для <em style={{ fontStyle: 'italic', color: '#038390' }}>не-громадян Австрії</em>
        </h2>

        {/* RWR card small inline */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <NoteBox type="warning">
              Якщо ви громадянин іншої країни — українець, румун, серб або будь-який інший іноземець з видом на проживання — онлайн-реєстрація Austria ID для вас може бути <strong>недоступна</strong>. Це залежить від вашої федеральної землі (Bundesland).<br /><br />
              Не засмучуйтесь — це нормальна ситуація. Просто будьте готові до того, що вам доведеться особисто прийти до поліцейського управління. Процедура нескладна і займає близько <strong>20–30 хвилин</strong>.
            </NoteBox>
          </div>
          <div style={{ flexShrink: 0 }}>
            <Image
              src="/articles/austria-rwr-card.jpg"
              alt="RWR Karte Plus Austria"
              width={160} height={100}
              style={{ borderRadius: 8, border: '1px solid var(--line)', objectFit: 'cover' }}
            />
            <p style={{ fontSize: 10, color: 'var(--text3)', textAlign: 'center', marginTop: 5, maxWidth: 160 }}>
              Rot-Weiß-Rot Karte Plus
            </p>
          </div>
        </div>

        {/* Steps */}
        <h2 id="steps" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: '32px 0 16px', scrollMarginTop: '80px' }}>
          Покрокова інструкція: як <em style={{ fontStyle: 'italic', color: '#038390' }}>оформити Austria ID</em>
        </h2>
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 24 }}>
          {steps.map((step, i) => (
            <div key={step.n} style={{ display: 'flex', gap: 16, paddingBottom: i < steps.length - 1 ? 20 : 0, marginBottom: i < steps.length - 1 ? 20 : 0, borderBottom: i < steps.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#038390', color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                {step.n}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 10 }}>{step.title}</h3>
                {step.content}
              </div>
            </div>
          ))}
        </div>

        {/* What next */}
        <h2 id="next" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
          Що робити <em style={{ fontStyle: 'italic', color: '#038390' }}>далі?</em>
        </h2>
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: 'var(--charcoal)', marginBottom: 14 }}>Після того як Austria ID оформлена — ви готові до наступних кроків реєстрації бізнесу:</p>
          {[
            { icon: '🏢', text: 'Зареєструвати Gewerbe на GISA' },
            { icon: '💰', text: 'Увійти до FinanzOnline і налаштувати податковий кабінет' },
            { icon: '🏥', text: 'Зареєструватися в SVS — страхування для самозайнятих' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--gray)', borderRadius: 10, padding: '11px 14px', marginBottom: 8, border: '1px solid var(--line)' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: 'var(--charcoal)' }}>{item.text}</span>
            </div>
          ))}
          <Link href="/articles/gewerbeanmeldung" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 18px', borderRadius: 12, border: '1.5px solid #038390', background: 'var(--peach-light)', textDecoration: 'none', marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>📖</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#038390' }}>Читайте детально → Gewerbeanmeldung в Австрії: покрокова реєстрація</div>
                <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>Повний гайд по реєстрації самозайнятості</div>
              </div>
            </div>
            <span style={{ fontSize: 18, color: '#038390', fontWeight: 700 }}>→</span>
          </Link>
        </div>

        {/* Sources */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 22 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>
            Джерела
          </p>
          {[
            { label: 'Офіційний сайт ID Austria: id-austria.gv.at', href: 'https://www.id-austria.gv.at' },
            { label: 'Портал держпослуг Австрії: oesterreich.gv.at', href: 'https://www.oesterreich.gv.at' },
            { label: 'Запис на термін: citizen.bmi.gv.at', href: 'https://citizen.bmi.gv.at' },
          ].map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: 13, color: '#038390', textDecoration: 'none', marginBottom: 6 }}>
              ↗ {s.label}
            </a>
          ))}
        </div>

        <div style={{ background: 'var(--gray)', borderRadius: 10, padding: '13px 16px', fontSize: 12, color: 'var(--text3)', lineHeight: 1.6, marginTop: 24, border: '1px solid var(--line)' }}>
          Цей матеріал має інформаційний характер і ґрунтується на особистому досвіді команди QLIXA. Актуальність інформації рекомендуємо перевіряти на офіційних державних сайтах.
        </div>

        {/* Prev / Next navigation */}
        <ArticlePrevNext currentSlug="austria-id" />

        </div>{/* end main content */}
      </div>{/* end flex wrapper */}
      <Footer />
    </div>
  )
}
