'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import RWRCalculator from '@/components/RWRCalculator'

export default function RWRKartePage() {
  return (
    <>
      <Navbar />
      <main style={{ background: '#ffffff', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ background: '#F0F7F8', padding: '56px clamp(20px,6vw,80px) 40px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' as const }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#038390', background: 'rgba(3,131,144,0.1)', padding: '4px 12px', borderRadius: 999 }}>Гайд</span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#595959', background: 'rgba(89,89,89,0.08)', padding: '4px 12px', borderRadius: 999 }}>RWR+ Karte</span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#595959', background: 'rgba(89,89,89,0.08)', padding: '4px 12px', borderRadius: 999 }}>Документи</span>
            </div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 16 }}>
              Як підготуватися до подачі на RWR+ карту
            </h1>
            <p style={{ fontSize: 16, color: '#595959', lineHeight: 1.75, marginBottom: 24, maxWidth: 680 }}>
              Сьогодні ми розберемо, як підготуватися до подачі на Rot-Weiß-Rot Karte Plus — на прикладі Iryna Muller — вигаданого персонажа нашого сайту, який супроводжує вас у всіх наших матеріалах. Вона з України, більше двох років живе в Австрії та вже рік як оформила самозайнятість.
            </p>

            {/* Meta */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const, fontSize: 13, color: '#888' }}>
              <span>📅 Липень 2026</span>
              <span>⏱ ~15 хвилин читання</span>
              <span>✍️ QLIXA</span>
            </div>
          </div>
        </section>

        {/* Photo placeholder */}
        <div style={{ height: 380, overflow: 'hidden' }}>
          <img src="/articles/rwr-karte-cover.png" alt="RWR+ Karte — підготовка документів" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}/>
        </div>

        {/* Content */}
        <section style={{ padding: '56px clamp(20px,6vw,80px)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'flex-start' }}>

            {/* Table of contents — sticky sidebar */}
            <aside style={{ flex: '0 0 220px', position: 'sticky' as const, top: 24, alignSelf: 'flex-start' as const, background: '#F0F7F8', borderRadius: 16, padding: '20px 20px', fontSize: 13 }}>
              <div style={{ fontWeight: 700, color: '#038390', marginBottom: 12, fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>Зміст</div>
              {[
                ['#start', 'З чого починає Ірина'],
                ['#docs', 'Список документів'],
                ['#income', 'Підтвердження доходу'],
                ['#language', 'Мовний сертифікат'],
                ['#family', 'Сімейні документи'],
                ['#kids', 'Документи для дітей'],
                ['#tips', 'Поради від людей'],
                ['#nesudymost', 'Довідка про несудимість'],
                ['#checklist', 'Завантажити чекліст'],
                ['#calculator', 'Калькулятор доходу'],
              ].map(([href, label]) => (
                <a key={href} href={href} style={{ display: 'block', color: '#595959', textDecoration: 'none', padding: '5px 0', borderBottom: '1px solid rgba(3,131,144,0.08)', lineHeight: 1.4 }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#595959'}>
                  {label}
                </a>
              ))}
            </aside>

            {/* Main article */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* Disclaimer */}
              <div style={{ background: '#FFF8E7', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 12, padding: '16px 20px', marginBottom: 32, fontSize: 13, color: '#595959', lineHeight: 1.6 }}>
                ⚠️ <strong>Важливо:</strong> Цей матеріал підготовлений на основі реального досвіду людей, які вже подавалися на RWR+ карту. QLIXA не є юридичним агентством і не надає індивідуальних консультацій. Завжди перевіряйте актуальні вимоги на офіційному сайті:{' '}
                <a href="https://www.bmi.gv.at/Ukraine/Informationen_zum_Umstieg_auf_eine_Rot-_Weiss_Rot_Karte_plus.aspx" target="_blank" rel="noopener noreferrer" style={{ color: '#038390' }}>bmi.gv.at</a>
              </div>

              {/* Section: Start */}
              <div id="start" style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>З чого починає Ірина</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 16 }}>
                  Ірина Мюллер — з України, в Австрії вже більше двох років. Рік тому вона оформила самозайнятість і тепер хоче перейти з тимчасового захисту на повноцінну Rot-Weiß-Rot Karte Plus.
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 16 }}>
                  Перше, що вона зробила — записалася на термін у магістраті за місцем прописки. У Клагенфурті це можна зробити через{' '}
                  <a href="https://timeacle.com/business/index/id/5277" target="_blank" rel="noopener noreferrer" style={{ color: '#038390' }}>timeacle.com</a>{' '}
                  → <strong>Fremdenrecht Erstantrag → Sonstige → E</strong>
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85 }}>
                  Але Ірина не стала чекати термін склавши руки. Вона почала збирати документи заздалегідь і запитала у знайомих, які вже подавалися, що можуть попросити додатково. Саме так і треба!
                </p>
              </div>

              {/* Timeline */}
              <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '24px 28px', marginBottom: 40 }}>
                <div style={{ fontWeight: 700, color: '#038390', marginBottom: 16, fontSize: 13, letterSpacing: '1px', textTransform: 'uppercase' as const }}>Таймлайн підготовки</div>
                {[
                  ['За 2–3 місяці', 'Записуємося на термін. Перевіряємо всі документи які потрібно оновити, замовити, перекласти або апостилювати: свідоцтва про народження, дипломи, атестати, довідки про несудимість (UA та AT). Перевіряємо термін дії закордонного паспорта.'],
                  ['За 1 місяць', 'Збираємо всі документи. Робимо переклади. Готуємо фінансову виписку.'],
                  ['За 2 тижні', 'Перевіряємо кожен документ. Робимо копії. Сортуємо по папках.'],
                  ['День термін', 'Приходимо з папкою оригіналів і папкою копій на кожного члена сім\'ї.'],
                  ['Після подачі', 'Чекаємо. Можуть зв\'язатися і попросити додаткові документи — це нормально!'],
                ].map(([time, desc], i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 4 ? 12 : 0 }}>
                    <div style={{ flex: '0 0 100px', fontSize: 12, fontWeight: 700, color: '#038390', paddingTop: 2 }}>{time}</div>
                    <div style={{ flex: 1, fontSize: 14, color: '#595959', lineHeight: 1.6, borderLeft: '2px solid rgba(3,131,144,0.2)', paddingLeft: 16 }}>{desc}</div>
                  </div>
                ))}
              </div>

              {/* Section: Docs */}
              <div id="docs" style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 8 }}>Список документів</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 20 }}>
                  Ірина підготувала <strong>дві папки</strong>: одна з оригіналами, одна з копіями. На кожного члена сім&apos;ї — своя папка з копіями. Так вона зробила відвідування максимально швидким — співробітник просто зібрав все і відсканував.
                </p>

                <div style={{ background: '#FFF0F0', border: '1px solid rgba(204,0,0,0.15)', borderRadius: 12, padding: '14px 18px', marginBottom: 20, fontSize: 13, color: '#595959' }}>
                  💡 <strong>Порада:</strong> нічим не скріплюйте документи — їх потім сканують. Просто покладіть у папку по порядку.
                </div>

                {[
                  {
                    title: 'Посвідчення переміщених осіб (Blau Card)',
                    text: 'Принесіть всі попередні Blau Card за всі роки, що ви тут. (оригінали + копії)',
                  },
                  {
                    title: 'Закордонний паспорт — всі сторінки',
                    text: 'Скопіюйте ВСІ сторінки закордонного паспорта, навіть порожні. Зверніть увагу: карту видають на термін до закінчення паспорта. Якщо закордонний паспорт закінчується через рік — карта теж буде на рік, навіть якщо вам належить 3 роки. Тому краще заздалегідь подбайте про новий закордонний паспорт.',
                    warning: 'Перевірте термін дії паспорта ДО записи на термін!'
                  },
                  {
                    title: 'Свідоцтво про народження',
                    text: 'Оригінал + переклад на німецьку + апостиль.',
                  },
                  {
                    title: 'Довідка про несудимість — українська',
                    text: 'Можна згенерувати в застосунку ДІЯ. Апостиль НЕ потрібен. Перекласти можна в будь-якому бюро перекладів. Термін дії — 3 місяці.',
                  },
                ].map((doc, i) => (
                  <div key={i} style={{ borderLeft: '3px solid #038390', paddingLeft: 16, marginBottom: 20 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>☐ {doc.title}</div>
                    <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.7 }}>{doc.text}</div>
                    {doc.warning && <div style={{ fontSize: 13, color: '#CC0000', marginTop: 4 }}>⚠️ {doc.warning}</div>}
                  </div>
                ))}

                <div style={{ borderLeft: '3px solid #038390', paddingLeft: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>☐ Довідка про несудимість — австрійська (Strafregisterbescheinigung)</div>
                  <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.7, marginBottom: 6 }}>Офіційна довідка про несудимість від BMI. Саме її потрібно подавати на RWR+. Запишіться на термін через офіційний сайт:</div>
                  <a href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung?locale=en" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#038390', fontWeight: 600 }}>citizen.bmi.gv.at →</a>
                </div>
                <div style={{ borderLeft: '3px solid rgba(89,89,89,0.3)', paddingLeft: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>☐ Довідка KSV (Auskunft nach Art. 15 DSGVO)</div>
                  <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.7, marginBottom: 6 }}>Це довідка про ваш кредитний рейтинг та дані KSV (кредитного бюро Австрії). Термін дії — 3 місяці. Замовити безкоштовно:</div>
                  <a href="https://digitalerantrag.ksv.at/Dip/?request=auskunft-nach-art-15-dsgvo" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#038390', fontWeight: 600 }}>digitalerantrag.ksv.at →</a>
                </div>

                {[
                  {
                    title: 'E-card',
                    text: 'Оригінал + копія.',
                  },
                  {
                    title: 'Паспортна фотографія (45×35 мм)',
                    text: 'Не старша 6 місяців. Приклеюється прямо в анкету-формуляр.',
                  },
                  {
                    title: 'Meldezettel (оригінал + копія)',
                    text: 'Це довідка про реєстрацію місця проживання в Австрії — аналог прописки. Якщо ви ще не маєте Meldezettel або переїхали — зверніться до місцевого магістрату. Оригінал + копія. Актуальний на момент подачі.',
                  },
                  {
                    title: 'Підтвердження права на житло',
                    text: 'Договір оренди або документ про власність. Ідеально, якщо в договорі вказані всі члени сім\'ї — це спростить процес. Оригінал + копія.',
                  },
                ].map((doc, i) => (
                  <div key={`b${i}`} style={{ borderLeft: '3px solid #038390', paddingLeft: 16, marginBottom: 20 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>☐ {doc.title}</div>
                    <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.7 }}>{doc.text}</div>
                  </div>
                ))}

                <div style={{ borderLeft: '3px solid #038390', paddingLeft: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>☐ Заповнений формуляр Antragsformulare — на кожного члена сім&apos;ї окремо</div>
                  <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.7, marginBottom: 8 }}>Завантажити бланк можна на офіційному сайті BMI:</div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
                    <a href="https://www.bmi.gv.at/312/60a/start.html" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#038390', fontWeight: 600, padding: '8px 16px', border: '1px solid #038390', borderRadius: 8, textDecoration: 'none' }}>⬇️ Завантажити формуляр (BMI)</a>
                    <a href="/articles/muller-antragsformular.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#595959', fontWeight: 600, padding: '8px 16px', border: '1px solid rgba(89,89,89,0.3)', borderRadius: 8, textDecoration: 'none' }}>📄 Приклад Iryna Muller (незабаром)</a>
                  </div>
                </div>
              </div>

              {/* Section: Income */}
              <div id="income" style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>Підтвердження доходу</h2>

                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 16 }}>
                  Підтвердження наявності надійних засобів до існування — один з ключових пунктів при подачі на RWR+. Залежно від того, ким ви працюєте, документи відрізняються.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                  <div style={{ background: '#F0F7F8', borderRadius: 12, padding: '20px' }}>
                    <div style={{ fontWeight: 700, color: '#1A1A1A', marginBottom: 10, fontSize: 14 }}>👔 Найманий працівник</div>
                    {['Відомості про заробітну плату (Lohnzettel)', 'Довідка про зарплату від роботодавця', 'Контракт з роботодавцем'].map(item => (
                      <div key={item} style={{ fontSize: 13, color: '#595959', paddingLeft: 8, marginBottom: 4 }}>☐ {item}</div>
                    ))}
                  </div>
                  <div style={{ background: '#F0F7F8', borderRadius: 12, padding: '20px' }}>
                    <div style={{ fontWeight: 700, color: '#038390', marginBottom: 10, fontSize: 14 }}>💼 Самозайнятий</div>
                    {[
                      'Einkommensteuerbescheid — офіційна довідка про доходи від Finanzamt (завантажується з FinanzOnline). Якщо ще не маєте — можна подати Gewinnbestätigung / Selbsterklärung, тобто самостійно складену декларацію про прибуток.',
                      'Unbedenklichkeitsbescheinigung з Finanzamt — довідка про відсутність податкових заборгованостей перед державою. Замовляється у вашому Finanzamt.',
                      'Unbedenklichkeitsbescheinigung з SVA — аналогічна довідка від SVA (Sozialversicherungsanstalt der Selbständigen) — страхового органу для самозайнятих. Підтверджує відсутність боргів по соціальному страхуванню.',
                    ].map(item => (
                      <div key={item} style={{ fontSize: 13, color: '#595959', paddingLeft: 8, marginBottom: 8, lineHeight: 1.6 }}>☐ {item}</div>
                    ))}
                  </div>
                </div>

                <div style={{ borderLeft: '3px solid #038390', paddingLeft: 20, marginBottom: 24 }}>
                  <div style={{ fontWeight: 700, color: '#1A1A1A', marginBottom: 8, fontSize: 15 }}>Як це вирішила Iryna Muller</div>
                  <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 12 }}>
                    Ірина подавалася на початку січня, тому офіційного Einkommensteuerbescheid з FinanzOnline у неї ще не було. Вона могла б звернутися до бухгалтера — але Ірина веде бухгалтерію сама. Тому вона заповнила <strong>Gewinnbestätigung / Selbsterklärung</strong> — самодекларацію про доходи — власноруч, вписала всі свої дані та прибуток за рік. Подала — і її прийняли без питань.
                  </p>
                  <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '20px 24px', marginBottom: 16, marginTop: 16 }}>
                    <div style={{ fontWeight: 700, color: '#1A1A1A', marginBottom: 8, fontSize: 14 }}>📄 Приклад довідки Iryna Muller</div>
                    <p style={{ fontSize: 13, color: '#595959', lineHeight: 1.6, marginBottom: 16 }}>
                      Нижче — приклад Gewinnbestätigung, яку Ірина підготувала самостійно і подала до магістрату. Це лише приклад для ознайомлення. Дані і цифри відносяться виключно до ситуації вигаданого персонажа Iryna Muller. Не використовуйте як шаблон.
                    </p>
                    <a href="/articles/muller-gewinnbestatigung.pdf" target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#038390', color: 'white', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                      📄 Переглянути приклад довідки (PDF)
                    </a>
                  </div>
                  <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 12 }}>
                    Прибуток у Ірини в цьому році невеликий — вона тільки починала свою діяльність і багато часу витратила на пошук клієнтів. Але у неї були кошти на рахунку. Саме це вона вирішила використати як фінансову подушку та підстрахувати себе для отримання RWR+.
                  </p>
                  <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85 }}>
                    Формула проста: <strong>(мінімально необхідна сума – ваш дохід нетто) × 12 = сума яку потрібно показати на рахунку</strong>. Недостатній дохід компенсуємо випискою з банку.
                  </p>
                </div>

                <div id="calculator" style={{ marginBottom: 20 }}>
                  <RWRCalculator />
                </div>

                <div style={{ background: '#F0F7F8', borderRadius: 12, padding: '16px 20px', fontSize: 13, color: '#595959', lineHeight: 1.65 }}>
                  💡 Іноді просять підтвердити точні суми оренди та комунальних — для цього просять виписку з банку за останні 3 місяці. Можна зробити вибірку лише по цих статтях в онлайн-банкінгу, щоб не друкувати тонни сторінок з покупками.
                </div>

                <div style={{ borderLeft: '3px solid #038390', paddingLeft: 20, marginTop: 24 }}>
                  <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85 }}>
                    Ірина порахувала все, підготувала виписки і склала повний пакет фінансових документів. Тепер залишалося вирішити ще одне питання — підтвердити знання мови.
                  </p>
                </div>
              </div>

              {/* Section: Language */}
              <div id="language" style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>Підтвердження знання німецької мови</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 16 }}>
                  Ірина ще не встигла добре вивчити мову — це знайоме багатьом. Але Австрія про це подумала і передбачила альтернативу.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12, marginBottom: 24 }}>
                  <div style={{ border: '1px solid rgba(3,131,144,0.25)', borderRadius: 12, padding: '16px 20px' }}>
                    <div style={{ fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Варіант 1 — мовний сертифікат</div>
                    <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.65 }}>
                      A1 — дійсний 1 рік<br/>
                      A2 — дійсний 1 рік (при A2 можуть видати карту на 3 роки)<br/>
                      B1 — дійсний 2 роки
                    </div>
                  </div>
                  <div style={{ border: '1px solid rgba(3,131,144,0.25)', borderRadius: 12, padding: '16px 20px', background: '#F0F7F8' }}>
                    <div style={{ fontWeight: 700, color: '#038390', marginBottom: 4 }}>Варіант 2 — університетський диплом (як у Ірини!)</div>
                    <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.65 }}>
                      Якщо ваш університет має статус <strong>H+</strong> у списку{' '}
                      <a href="https://anabin.kmk.org/db/institutionen" target="_blank" rel="noopener noreferrer" style={{ color: '#038390' }}>anabin.kmk.org</a>{' '}
                      — це рівнозначна альтернатива мовному сертифікату. Перевірте свій заклад!
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 16 }}>
                  Ірина обрала саме цей варіант. Для нього знадобилося підготувати:
                </p>
                {[
                  'Атестат про закінчену середню освіту + додаток з оцінками (ориг. + переклад + апостиль)',
                  'Диплом бакалавра + додаток з оцінками і годинами (ориг. + переклад + апостиль)',
                  'Диплом спеціаліста/магістра + додаток (ориг. + переклад + апостиль)',
                ].map((item, i) => (
                  <div key={i} style={{ borderLeft: '3px solid #038390', paddingLeft: 16, marginBottom: 12 }}>
                    <div style={{ fontSize: 14, color: '#1A1A1A' }}>☐ {item}</div>
                  </div>
                ))}
                <div style={{ background: '#FFF8E7', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#595959', marginTop: 12 }}>
                  ⚠️ Атестат у Ірини попросили по email вже через кілька днів після подачі. Це нормально! Можуть зв&apos;язуватися і просити документи ще довго після термін. Не переживайте — просто відповідайте.
                </div>
              </div>

              {/* Section: Family */}
              <div id="family" style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>Сімейні документи (якщо є)</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 16 }}>
                  Залежно від вашої унікальної ситуації можуть знадобитися:
                </p>
                {[
                  'Свідоцтво про шлюб / партнерство / усиновлення (ориг. + переклад + апостиль)',
                  'Довідка про родинні стосунки (ориг. + переклад + апостиль)',
                  'Bestätigung über den Bezug von Familienbeihilfe — підтвердження отримання сімейної допомоги (Familienbeihilfe). Якщо ви отримуєте цю виплату на дітей — цей документ може знадобитися. Витягнути можна з особистого кабінету FinanzOnline.',
                ].map((item, i) => (
                  <div key={i} style={{ borderLeft: '3px solid rgba(3,131,144,0.3)', paddingLeft: 16, marginBottom: 12 }}>
                    <div style={{ fontSize: 14, color: '#1A1A1A' }}>☐ {item}</div>
                  </div>
                ))}
              </div>

              {/* Section: Kids */}
              <div id="kids" style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>Документи для дітей</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 16 }}>
                  У Iryna Muller є син, якому 11 років. Вона заповнює на нього окрему анкету і збирає окремий пакет документів. На кожну дитину — своя папка з копіями.
                </p>
                {[
                  { text: 'Посвідчення переміщених осіб (блакитна картка / Ausweis für Vertriebene)', note: 'Копії + оригінали' },
                  { text: 'Дійсний закордонний паспорт дитини — всі сторінки', note: 'Зробіть копії або скани всіх сторінок заздалегідь' },
                  { text: 'Свідоцтво про народження або документ що підтверджує родинні стосунки', note: 'Оригінал + переклад на німецьку + апостиль' },
                  { text: 'Паспортна фотографія (45×35 мм, не старша 6 місяців)', note: 'Приклеюється в анкету' },
                  { text: 'E-card дитини', note: 'Оригінал + копія' },
                  { text: 'Meldezettel дитини', note: 'Оригінал + копія' },
                  { text: 'Schulbesuchsbestätigung — довідка про відвідування школи', note: 'Попросіть у секретаріаті школи' },
                  { text: 'Останній шкільний табель (Zeugnis)', note: '⚠️ Важливо: за умовами RWR+ потрібна задовільна оцінка з німецької мови (4 і нижче за австрійською шкалою (1 — відмінно, 5 — незадовільно))' },
                ].map((item, i) => (
                  <div key={i} style={{ borderLeft: '3px solid rgba(3,131,144,0.3)', paddingLeft: 16, marginBottom: 12 }}>
                    <div style={{ fontSize: 14, color: '#1A1A1A', fontWeight: 500, marginBottom: 4 }}>☐ {item.text}</div>
                    <div style={{ fontSize: 13, color: '#595959' }}>{item.note}</div>
                  </div>
                ))}
                <div style={{ borderLeft: '3px solid rgba(3,131,144,0.3)', paddingLeft: 16, marginBottom: 12 }}>
                  <div style={{ fontSize: 14, color: '#1A1A1A', fontWeight: 500, marginBottom: 4 }}>☐ Заповнений формуляр Antragsformulare на дитину</div>
                  <div style={{ fontSize: 13, color: '#595959', marginBottom: 6 }}>На кожну дитину — окремий формуляр. Завантажити:</div>
                  <a href="https://www.bmi.gv.at/312/60a/start.html" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#038390', fontWeight: 600 }}>bmi.gv.at/312/60a/start.html →</a>
                </div>
              </div>

              {/* Section: Tips */}
              <div id="tips" style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>Поради від людей, які вже подавалися і отримали карту</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 20 }}>
                  Не факт, що у вашому випадку буде саме так — але краще бути готовими:
                </p>
                {[
                  ['Нічим не скріплюйте документи', 'Їх потім сканують. Просто покладіть у папку по порядку.'],
                  ['Суму оренди вказуйте тільки у головного заявника', 'Якщо решта членів сім\'ї подаються разом — у них цього поля не заповнюємо.'],
                  ['Дохід вказуємо НЕТТО', 'Не брутто.'],
                  ['Blau Card не вилучають', 'При подачі на RWR+ ваша діюча блакитна картка залишається у вас (пункт 14 формуляра).'],
                  ['Після подачі можуть запитати ще документи', 'Це нормально. Відповідайте і надсилайте. Інколи не зв\'яжуться взагалі — залежить від конкретного працівника.'],
                  ['Виписка з банку', 'Іноді просять підтвердити суми оренди та комунальних за 3 місяці. Зробіть вибірку в онлайн-банкінгу.'],
                  ['Bestätigung Familienbeihilfe', 'Іноді просять. Можна витягнути з особистого кабінету FinanzOnline.'],
                ].map(([title, desc], i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, background: '#F0F7F8', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ fontSize: 18, flexShrink: 0 }}>💡</div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 14, marginBottom: 4 }}>{title}</div>
                      <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.6 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checklist CTA */}
              <div id="checklist" style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 8 }}>Завантажте чекліст підготовки документів</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 20 }}>Оберіть свій варіант — чекліст з квадратиками для відміток:</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <div style={{ background: '#038390', borderRadius: 16, padding: '24px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Безкоштовно від QLIXA</div>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: 'white', marginBottom: 8 }}>Для найманих працівників</div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 16 }}>Чекліст документів для тих, хто працює за наймом в Австрії.</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'white', color: '#038390', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'not-allowed', opacity: 0.7 }}>
                      ⬇️ Незабаром
                    </div>
                  </div>
                  <div style={{ background: '#038390', borderRadius: 16, padding: '24px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Безкоштовно від QLIXA</div>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: 'white', marginBottom: 8 }}>Для самозайнятих</div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 16 }}>Чекліст документів для самозайнятих та підприємців в Австрії.</p>
                    <a href="/articles/QLIXA_RWR_Checklist.pdf" download
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'white', color: '#038390', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                      ⬇️ Завантажити PDF
                    </a>
                  </div>
                  <div style={{ background: '#026B76', borderRadius: 16, padding: '24px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Безкоштовно від QLIXA</div>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: 'white', marginBottom: 8 }}>Для дітей</div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 16 }}>Чекліст документів на кожну дитину — окремо.</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'white', color: '#026B76', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'not-allowed', opacity: 0.7 }}>
                      ⬇️ Незабаром
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive checklist banner */}
              <div style={{ border: '2px dashed rgba(3,131,144,0.3)', borderRadius: 20, padding: '32px 36px', marginBottom: 40, textAlign: 'center' as const }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, fontWeight: 400, color: '#1A1A1A', marginBottom: 8 }}>
                  Інтерактивний чекліст RWR+ — незабаром
                </h3>
                <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.7, marginBottom: 20, maxWidth: 480, margin: '0 auto 20px' }}>
                  Зареєструйтеся в QLIXA — і ви зможете відмічати готові документи, додавати власні нотатки, зберігати дати отримання довідок та повертатися до підготовки у будь-який момент.
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#038390', color: 'white', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'not-allowed', opacity: 0.6 }}>
                  Отримати доступ — незабаром
                </div>
              </div>

              {/* Back to articles */}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24 }}>
                <Link href="/articles" style={{ fontSize: 14, color: '#038390', textDecoration: 'none', fontWeight: 600 }}>
                  ← Повернутися до всіх статей
                </Link>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
