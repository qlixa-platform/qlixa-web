'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ background: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: '#F0F7F8', padding: '72px clamp(20px,6vw,80px) 56px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 52 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 24 }}>Про нас</div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 24 }}>
              Привіт!<br/>Ми — Іра та Іра. 👋
            </h1>
            <p style={{ fontSize: 'clamp(16px,1.5vw,20px)', color: '#595959', lineHeight: 1.8, maxWidth: 480 }}>
              Ми дві мами, які переїхали з України до Австрії у 2022 році. Як і тисячі інших людей, ми починали все з нуля. Нова країна, нові правила, нова мова, нова податкова система. Ми хотіли працювати, розвивати власну справу та бути впевненими, що робимо все правильно.
            </p>
          </div>
          <div style={{ flex: '0 0 320px', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about/ira-and-ira.png" alt="Іра та Іра — засновниці QLIXA" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}/>
          </div>
        </div>
      </section>

      <section style={{ padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column' as const, gap: 56 }}>

          {/* Block 1 — бюрократія */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85, marginBottom: 16 }}>
                Але дуже швидко зрозуміли: австрійська бюрократія — це майже окремий вид спорту. 😄
              </p>
              <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85 }}>
                Як відкрити Gewerbe? Коли потрібно реєструватися в SVS? Як працює FinanzOnline? Які звіти потрібно подавати? Що можна списати на витрати? Як не пропустити важливий дедлайн? І найголовніше — чому все це не можна було написати простими словами?
              </p>
            </div>
            <div style={{ flex: '0 0 260px', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/confused-moms.png" alt="" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}/>
            </div>
          </div>

          {/* Block 2 — шукали відповіді */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            <div style={{ flex: '0 0 260px', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/studying-moms.png" alt="" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}/>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85 }}>
                Ми шукали відповіді всюди. Читали офіційні сайти, відвідували семінари, спілкувалися зі спеціалістами, вивчали закони, перекладали документи, перевіряли інформацію з різних джерел і крок за кроком будували власне розуміння австрійської системи.
              </p>
            </div>
          </div>

          {/* Quote block */}
          <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '36px 40px', borderLeft: '4px solid #038390' }}>
            <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(18px,2vw,24px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 16 }}>
              Паралельно ми відкрили самозайнятість в Австрії, працювали, подавали звітність, вчилися вести облік, планувати податки та не пропускати важливі дати. Ми добре знаємо, як це — коли в поштовій скриньці з&apos;являється лист від Finanzamt, а ти відкриваєш його з думкою: «Сподіваємося, цього разу нічого страшного...» 😅
            </p>
            <p style={{ fontSize: 17, color: '#595959', lineHeight: 1.8 }}>
              Ми знаємо, як це — годинами шукати відповідь на одне просте запитання. Як десять хвилин читати один абзац німецькою і все одно не зрозуміти, що саме від тебе хочуть.
            </p>
          </div>

          {/* Block 3 — познайомилися */}
          <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85 }}>
            Саме тоді ми випадково познайомилися. Нас об&apos;єднало бажання розібратися в системі та зробити її зрозумілішою. Ми почали допомагати одна одній, ділитися знахідками, створювати власні таблиці, чек-листи, нагадування та шаблони, які спрощували щоденну роботу.
          </p>

          {/* Block 4 — для друзів */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85, marginBottom: 12 }}>Спочатку ми робили все це лише для себе.</p>
              <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85, marginBottom: 12 }}>Потім для друзів.</p>
              <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85, marginBottom: 12 }}>Потім для знайомих.</p>
              <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85 }}>
                А потім зрозуміли, що таких, як ми, — тисячі. Щороку нові підприємці, фрилансери, самозайняті, наймані працівники та люди, які тільки починають свій шлях в Австрії, ставлять одні й ті самі запитання, губляться серед десятків офіційних сайтів і витрачають години на пошук інформації.
              </p>
            </div>
            <div style={{ flex: '0 0 260px', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/helping-friends.png" alt="" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}/>
            </div>
          </div>

          {/* QLIXA born */}
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3vw,42px)', fontWeight: 400, color: '#1A1A1A' }}>
              Так народилася <em style={{ color: '#038390', fontStyle: 'italic' }}>QLIXA.</em>
            </h2>
          </div>

          {/* Mission */}
          <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85 }}>
            Ми створюємо не бухгалтерську програму і не замінюємо податкового консультанта. Ми створюємо зрозумілу автоматизовану платформу, яка допомагає підприємцям, самозайнятим та найманим працівникам організувати фінанси, не пропускати важливі дедлайни, користуватися готовими шаблонами, автоматизувати рутинні процеси та краще розуміти австрійську систему.
          </p>

          <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85 }}>
            Кожен шаблон, калькулятор, інструкцію та чек-лист ми створюємо так, ніби пояснюємо все своїй подрузі за чашкою кави. Просто. Людською мовою. Без зайвої бюрократії та складних термінів.
          </p>

          {/* Beliefs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '28px 32px', display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/stressed-accountant.png" alt="" style={{ width: 80, height: 80, objectFit: 'contain', flexShrink: 0 }}/>
              <p style={{ fontSize: 16, color: '#595959', lineHeight: 1.75 }}>
                Ми не віримо, що підприємець повинен бути бухгалтером, щоб успішно вести свою справу.
              </p>
            </div>
            <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '28px 32px', display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/relaxed-person.png" alt="" style={{ width: 80, height: 80, objectFit: 'contain', flexShrink: 0 }}/>
              <p style={{ fontSize: 16, color: '#595959', lineHeight: 1.75 }}>
                Ми віримо, що кожен повинен розуміти свої фінанси, знати свої обов&apos;язки, не боятися офіційних листів і почуватися впевнено.
              </p>
            </div>
          </div>

          <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85 }}>
            Ми продовжуємо навчатися щодня. Відвідуємо семінари, вивчаємо зміни в законодавстві, аналізуємо офіційні джерела, тестуємо власні рішення та постійно вдосконалюємо QLIXA. Бо австрійська система змінюється, а разом із нею змінюємося й ми.
          </p>

          {/* Dark block */}
          <div style={{ background: '#1A1A1A', borderRadius: 20, padding: '40px 44px' }}>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', lineHeight: 1.85, marginBottom: 20 }}>
              Ми щиро віримо, що бізнес має приносити задоволення, а не постійний стрес через документи та податки.
            </p>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', lineHeight: 1.85, marginBottom: 20 }}>
              Якщо завдяки QLIXA ви зможете витрачати менше часу на бюрократію і більше часу приділяти своїй справі, родині, дітям чи відпочинку — значить, ми створили цей проєкт недаремно.
            </p>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85 }}>
              І якщо одного дня лист від Finanzamt більше не викликатиме легку паніку, а стане просто ще одним повідомленням у вашому списку справ — ми будемо знати, що все було недарма. 😊
            </p>
          </div>

          {/* Sign-off */}
          <div style={{ textAlign: 'center', padding: '24px 0 12px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about/heart-moms.png" alt="" style={{ width: 200, height: 'auto', objectFit: 'contain', margin: '0 auto 24px', display: 'block' }}/>
            <p style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>
              Ласкаво просимо до QLIXA!
            </p>
            <p style={{ fontSize: 18, color: '#595959', marginBottom: 24 }}>
              Ми дуже раді, що ви тут.
            </p>
            <p style={{ fontFamily: 'Caveat, cursive', fontSize: 30, color: '#038390' }}>
              З любов&apos;ю, Іра &amp; Іра ❤️🤍❤️
            </p>
          </div>

        </div>
      </section>

    </main>
      <Footer />
    </div>
  )
}
