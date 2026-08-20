'use client'

import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const CABINET_CTA = 'https://cabinet-ten-lac.vercel.app?plan=employee'

function CTAButton({ children, big = false }: { children: React.ReactNode; big?: boolean }) {
  return (
    <a href={CABINET_CTA} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      padding: big ? '16px 32px' : '13px 26px', background: '#038390', color: '#fff',
      borderRadius: 12, fontSize: big ? 17 : 15, fontWeight: 700, textDecoration: 'none',
    }}>
      {children}
    </a>
  )
}

export default function Page() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <Navbar />

      {/* ── 1+2. HERO ── */}
      <section style={{ background: '#FFFFFF', padding: '56px clamp(20px,6vw,80px) 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>

            <div>
              <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 16 }}>
                Для найманих працівників
              </div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>Працюєш за наймом в Австрії?</p>
              <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.6, marginBottom: 6, maxWidth: 520 }}>
                Цей тариф для тебе, якщо ти хочеш самостійно подати декларацію, не знаєш, які витрати можна врахувати, маєш сім'ю, дітей або інші обставини, що можуть впливати на податкове повернення.
              </p>
              <p style={{ fontSize: 15, color: '#595959', marginBottom: 28 }}>
                Не потрібно бути бухгалтером — QLIXA проведе тебе крок за кроком.
              </p>

              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,4.2vw,50px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 20 }}>
                Розрахуй своє податкове повернення <span style={{ color: '#038390' }}>в Австрії</span>
              </h1>
              <p style={{ fontSize: 17, color: '#404040', lineHeight: 1.6, maxWidth: 520 }}>
                QLIXA проведе тебе через персональну податкову анкету, знайде можливі відрахування та покаже орієнтовну суму повернення.
              </p>
            </div>

            {/* Pricing card */}
            <div style={{ background: '#F0F7F8', border: '2px solid #038390', borderRadius: 20, padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 40, fontWeight: 700, color: '#1A1A1A' }}>€19,90</span>
                <span style={{ fontSize: 16, color: '#595959' }}>/ рік</span>
              </div>
              <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.5, marginBottom: 22 }}>
                Разова оплата · доступ протягом податкового року
              </p>
              <CTAButton big>Почати розрахунок →</CTAButton>
              <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                {['Без щомісячної підписки', 'Доступ одразу після оплати', 'Можна заповнювати протягом року', 'Підходить для більшості працівників по найму'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: '#038390', fontWeight: 700, fontSize: 15, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. КЛЮЧОВИЙ БЛОК ── */}
      <section style={{ background: '#F0F7F8', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' as const }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: 8 }}>
            Не потрібно знати, що можна списати
          </h2>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#038390', marginBottom: 20 }}>
            QLIXA сама поставить правильні запитання.
          </p>
          <p style={{ fontSize: 16, color: '#404040', lineHeight: 1.65, marginBottom: 12 }}>
            Тобі не потрібно пам'ятати всі можливі податкові витрати або знати австрійські податкові правила.
          </p>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.65, marginBottom: 32 }}>
            Ти просто відповідаєш на зрозумілі запитання — QLIXA аналізує твою ситуацію та визначає, що може бути релевантним саме тобі.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 12, background: '#FFFFFF', border: '1px solid rgba(3,131,144,0.2)', borderLeft: '4px solid #038390', borderRadius: 12, padding: '18px 24px', textAlign: 'left' as const, maxWidth: 560 }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.45 }}>Не знаєш, що можна списати?</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#038390', lineHeight: 1.45 }}>Тобі не потрібно знати. QLIXA запитає.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. ВІЗУАЛІЗАЦІЯ АНКЕТИ ── */}
      <section style={{ background: '#FFFFFF', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'center' }}>

            {/* Left — questions demo */}
            <div style={{ background: '#F0F7F8', borderRadius: 18, padding: 24, border: '1px solid rgba(3,131,144,0.12)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 16 }}>QLIXA питає</div>
              {[
                'Чи маєш ти витрати, пов\u2019язані з дорогою до роботи?',
                'Ти працюєш частково з дому?',
                'У тебе є діти?',
              ].map((q, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: '#FFFFFF', borderRadius: 10, padding: '12px 16px', marginBottom: i < 2 ? 10 : 0 }}>
                  <span style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.4 }}>{q}</span>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#038390', background: 'rgba(3,131,144,0.1)', padding: '5px 12px', borderRadius: 999 }}>Так</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#9D9D9D', background: '#F0F7F8', padding: '5px 12px', borderRadius: 999 }}>Ні</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow */}
            <div style={{ fontSize: 28, color: '#038390', fontWeight: 700 }}>→</div>

            {/* Right — adaptive questions + result */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
              <div style={{ background: '#F0F7F8', borderRadius: 18, padding: 20, border: '1px solid rgba(3,131,144,0.12)' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 10 }}>QLIXA додає наступні релевантні питання</div>
                {['Витрати на дітей', 'Сімейні бонуси', 'Додаткові відрахування'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: '#404040', marginBottom: i < 2 ? 6 : 0 }}>
                    <span style={{ color: '#038390' }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <div style={{ background: '#1A1A1A', borderRadius: 18, padding: 20 }}>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Твій результат</div>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 8 }}>Можливе повернення податку</div>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 30, fontWeight: 700, color: '#fff' }}>€1 248</div>
              </div>
            </div>

          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 32, flexWrap: 'wrap' as const }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>Ти відповідаєш</span>
            <span style={{ color: '#038390' }}>→</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>QLIXA аналізує</span>
            <span style={{ color: '#038390' }}>→</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#038390' }}>Отримуєш результат</span>
          </div>
        </div>
      </section>

      {/* ── 5. КОЛИ ЗРУЧНО ── */}
      <section style={{ background: '#F0F7F8', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' as const }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 700, color: '#1A1A1A', marginBottom: 10 }}>
            Не потрібно згадувати все в останній день
          </h2>
          <p style={{ fontSize: 16, color: '#595959', marginBottom: 40 }}>
            Можеш вести свої дані протягом року — або пройти все одразу.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 20, alignItems: 'center', textAlign: 'left' as const }}>
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, border: '1px solid #E6F4F5' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 10 }}>Протягом року</div>
              <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.5, marginBottom: 14 }}>Додавай витрати та важливі обставини поступово, щоб нічого не забути.</p>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#038390', background: 'rgba(3,131,144,0.1)', padding: '4px 12px', borderRadius: 999 }}>Зручно для планування</span>
            </div>

            <div style={{ textAlign: 'center' as const, fontSize: 15, fontWeight: 700, color: '#595959', lineHeight: 1.4 }}>
              Обидва сценарії →<br/>один результат
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, border: '1px solid #E6F4F5' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 10 }}>За один раз</div>
              <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.5, marginBottom: 4 }}>Все вже під рукою?</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.5, marginBottom: 14 }}>Пройди анкету та отримай розрахунок за один раз.</p>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#038390', background: 'rgba(3,131,144,0.1)', padding: '4px 12px', borderRadius: 999 }}>Зручно перед поданням декларації</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. ЩО QLIXA ВРАХОВУЄ ── */}
      <section style={{ background: '#FFFFFF', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' as const }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 700, color: '#1A1A1A', marginBottom: 36 }}>
            QLIXA дивиться на твою ситуацію в цілому
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'left' as const, marginBottom: 28 }}>
            {[
              { icon: '💼', title: 'Робота', desc: 'Витрати та обставини, пов\u2019язані з роботою.' },
              { icon: '🚗', title: 'Дорога', desc: 'Витрати та обставини, пов\u2019язані з дорогою до роботи.' },
              { icon: '🏠', title: 'Житло', desc: 'Релевантні витрати, пов\u2019язані з роботою та житлом.' },
              { icon: '👨‍👩‍👧', title: 'Сім\u2019я', desc: 'Діти, сімейний статус та інші важливі обставини.' },
              { icon: '🎓', title: 'Навчання', desc: 'Професійне навчання та розвиток.' },
              { icon: '⋯', title: 'Інші обставини', desc: 'QLIXA поставить додаткові питання, якщо вони можуть впливати на результат.' },
            ].map((c, i) => (
              <div key={i} style={{ background: '#F0F7F8', borderRadius: 16, padding: 20, border: '1px solid rgba(3,131,144,0.10)' }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>{c.title}</div>
                <div style={{ fontSize: 15, color: '#595959', lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 15, fontWeight: 600, color: '#404040', maxWidth: 620, margin: '0 auto' }}>
            Тобі не потрібно самостійно визначати податкову категорію — <span style={{ color: '#038390' }}>QLIXA перетворює складні правила на прості запитання</span>.
          </p>
        </div>
      </section>

      {/* ── 7. ЩО ТИ ОТРИМАЄШ ── */}
      <section style={{ background: '#F0F7F8', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 700, color: '#1A1A1A', textAlign: 'center' as const, marginBottom: 40 }}>
            Що буде в результаті?
          </h2>

          {[
            { n: '01', title: 'Персональна податкова анкета', desc: 'QLIXA збирає інформацію про твою ситуацію.' },
            { n: '02', title: 'Можливі податкові відрахування', desc: 'Побачиш, що може бути враховано саме у твоєму випадку.' },
            { n: '03', title: 'Розрахунок', desc: 'Отримаєш орієнтовний розрахунок можливого повернення.' },
            { n: '04', title: 'Готові дані для FinanzOnline', desc: 'Зможеш використати підготовлений результат під час подання декларації.' },
          ].map((step, i) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, background: '#FFFFFF', borderRadius: 16, padding: 22, border: '1px solid #E6F4F5' }}>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 26, fontWeight: 700, color: '#038390', flexShrink: 0, width: 44 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{step.title}</div>
                  <div style={{ fontSize: 15, color: '#595959', lineHeight: 1.5 }}>{step.desc}</div>
                </div>
              </div>
              {i < 3 && <div style={{ textAlign: 'center' as const, fontSize: 20, color: '#038390', padding: '8px 0' }}>↓</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. CTA-ПОВТОР ── */}
      <section style={{ background: 'linear-gradient(135deg, #038390 0%, #026B76 100%)', padding: '48px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' as const }}>
          <div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(24px,2.8vw,34px)', fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.25 }}>
              Готовий перевірити своє податкове повернення?
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
              Відповідай на прості запитання. QLIXA зробить складну частину за тебе.
            </p>
          </div>
          <div style={{ textAlign: 'center' as const, flexShrink: 0 }}>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 2 }}>€19,90 <span style={{ fontSize: 15, fontWeight: 400 }}>/ рік</span></div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', marginBottom: 14 }}>Разова оплата · доступ протягом податкового року</div>
            <a href={CABINET_CTA} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#fff', color: '#038390',
              borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: 'none',
            }}>
              Почати розрахунок →
            </a>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', marginTop: 10, maxWidth: 260 }}>
              Після оплати ти одразу можеш перейти до персональної податкової анкети.
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. MINI FAQ ── */}
      <section style={{ background: '#FFFFFF', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(24px,2.8vw,34px)', fontWeight: 700, color: '#1A1A1A', textAlign: 'center' as const, marginBottom: 32 }}>
            Поширені питання
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {[
              { q: 'Чи потрібно знати австрійські податкові правила?', a: 'Ні. QLIXA проводить тебе через анкету простою мовою.' },
              { q: 'Чи можна заповнювати анкету поступово?', a: 'Так. Дані можна додавати протягом року.' },
              { q: 'Чи можна пройти все одразу?', a: 'Так. Якщо інформація вже під рукою, можна пройти анкету за один раз.' },
              { q: 'Чи є щомісячна підписка?', a: 'Ні. Тариф «Найманий працівник» оплачується один раз — €19,90 за податковий рік.' },
            ].map((f, i) => (
              <div key={i} style={{ background: '#F0F7F8', borderRadius: 14, padding: 20, border: '1px solid rgba(3,131,144,0.10)' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#038390', marginBottom: 8, lineHeight: 1.4 }}>{f.q}</div>
                <div style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.5 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. ФІНАЛЬНИЙ CTA ── */}
      <section style={{ background: '#1A1A1A', padding: '56px clamp(20px,6vw,80px)', textAlign: 'center' as const }}>
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
          Перевір, скільки можеш повернути
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 24 }}>
          Відповідай на прості запитання.<br/>QLIXA зробить складну частину за тебе.
        </p>
        <CTAButton big>Почати розрахунок →</CTAButton>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginTop: 14 }}>
          €19,90 / рік · разова оплата
        </div>
      </section>

      <Footer />
    </div>
  )
}
