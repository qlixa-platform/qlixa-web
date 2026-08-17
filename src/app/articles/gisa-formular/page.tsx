'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArticleSidebar, ArticlePrevNext, ArticleTOC } from '@/components/layout/ArticleNav'

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
      <div style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--charcoal)' }}>{children}</div>
    </div>
  )
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#038390', fontWeight: 600, textDecoration: 'underline', textDecorationColor: 'var(--peach-mid)', textUnderlineOffset: 3, fontSize: 15 }}>
      {children} ↗
    </a>
  )
}

function QuoteBlock({ de, tr, label }: { de: string; tr: string; label: string }) {
  return (
    <div style={{ background: 'var(--gray)', borderRadius: 9, padding: '13px 16px', border: '1px solid var(--line)', margin: '10px 0' }}>
      <div style={{ fontSize: 15, fontStyle: 'italic', color: 'var(--charcoal)', marginBottom: 4 }}>„{de}"</div>
      <div style={{ fontSize: 15, color: 'var(--text2)' }}>{label}: {tr}</div>
    </div>
  )
}

function OptionItem({ selected, de, tr, desc }: { selected?: boolean; de: string; tr?: string; desc?: string }) {
  return (
    <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 9, background: selected ? 'var(--peach-light)' : 'var(--gray)', border: `1px solid ${selected ? '#038390' : 'var(--line)'}`, alignItems: 'flex-start', marginBottom: 8 }}>
      <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1, color: selected ? '#038390' : 'var(--text3)' }}>{selected ? '✅' : '○'}</span>
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: selected ? '#038390' : 'var(--charcoal)', marginBottom: 2 }}>{de}</div>
        {tr && <div style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', margin: '2px 0 4px' }}>{tr}</div>}
        {desc && <div style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: desc }} />}
      </div>
    </div>
  )
}

function YesNo({ yesLabel, noLabel, selected }: { yesLabel: string; noLabel: string; selected: 'ja' | 'nein' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '10px 0' }}>
      <div style={{ padding: '13px 14px', borderRadius: 9, border: `2px solid ${selected === 'ja' ? '#038390' : 'var(--line)'}`, background: selected === 'ja' ? 'var(--peach-light)' : 'var(--gray)', textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: selected === 'ja' ? '#038390' : 'var(--text3)' }}>{selected === 'ja' ? '✅ ' : ''}Ja</div>
        <div style={{ fontSize: 15, color: 'var(--text2)', marginTop: 4, lineHeight: 1.4 }}>{yesLabel}</div>
      </div>
      <div style={{ padding: '13px 14px', borderRadius: 9, border: `2px solid ${selected === 'nein' ? '#038390' : 'var(--line)'}`, background: selected === 'nein' ? 'var(--peach-light)' : 'var(--gray)', textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: selected === 'nein' ? '#038390' : 'var(--text3)' }}>{selected === 'nein' ? '✅ ' : ''}Nein</div>
        <div style={{ fontSize: 15, color: 'var(--text2)', marginTop: 4, lineHeight: 1.4 }}>{noLabel}</div>
      </div>
    </div>
  )
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: 10, padding: '10px 13px', borderRadius: 8, background: 'var(--gray)', border: '1px solid var(--line)', marginBottom: 7 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', minWidth: 140, flexShrink: 0 }}>{label}</div>
      <div style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.5 }}>{value}</div>
    </div>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, margin: '10px 0' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 13px', borderRadius: 8, background: '#EBF5EE', border: '1px solid #81C784', fontSize: 15, color: 'var(--charcoal)' }}>
          ✅ {item}
        </div>
      ))}
    </div>
  )
}

// Переклади статті "Реєстрація на сайті GISA" — UA + RU + EN + DE
const GISA_TEXT: Record<string, any> = {
  UA: {
    tag1: 'GISA · Реєстрація', tag2: '6 кроків', tag3: 'Для іноземців',
    titleLine1: 'Реєстрація на сайті GISA:', titleEm: 'покрокова інструкція',
    metaTime: '🕐 15 хв читання', metaSteps: '💻 6 кроків', metaForeigners: '🇺🇦 Для іноземців',
    toc: [['#step1','Заходимо на сайт'],['#step2','Тип заявника'],['#step3','Персональні дані'],['#step4','Вид діяльності'],['#step5','Перевірка даних'],['#step6','Реєстрацію завершено'],['#summary','Підсумок']],
    backLink: '← Всі статті',
    disclaimer: 'Цей матеріал підготовлено на основі публічно доступних офіційних джерел та досвіду людей, які пройшли цей процес. QLIXA не є юридичним агентством і не надає індивідуальних консультацій. Інтерфейс GISA може оновлюватися — завжди перевіряйте актуальну версію на gisa.gv.at.',
    introP1: <>У цій статті ми детально, простою мовою розберемо, як пройти <strong>реєстрацію на сайті GISA</strong> — подати заяву про відкриття підприємницької діяльності (<strong>Gewerbeanmeldung</strong>).</>,
    introP2: <>📌 <strong>Приклад:</strong> Ірина, яка реєструється як самозайнята в сфері IT (вільна професія).</>,
    step1Title: 'Заходимо на сайт',
    step1LinkLabel: 'Перейдіть за посиланням:',
    step1LinkText: '🔗 https://www.gisa.gv.at/online-gewerbeanmeldung',
    step1P1: <>Ви бачите першу сторінку системи <strong>GISA</strong>.</>,
    step1H3_1: 'Детальний розбір першої сторінки',
    step1Opt1: { de: 'GISA Gewerbeinformationssystem Austria', tr: 'Що це?', desc: 'GISA — це офіційна державна база даних Австрії, в якій реєструються всі підприємці. Тут зберігається інформація про всі діючі бізнеси в країні.' },
    step1Opt2: { de: 'Gewerbeanmeldung', tr: 'Що це означає?', desc: 'Це <strong>заява на реєстрацію підприємницької діяльності</strong>. Саме цю заяву ми зараз заповнюємо.' },
    step1H3_2: 'Два способи подання заяви — найважливіший вибір',
    step1Way1Title: '1. mit ID Austria beantragen', step1Way1Tr: 'Переклад: Подати заяву за допомогою ID Austria',
    step1Way1Desc: <><strong>Найкращий і найшвидший спосіб.</strong> Якщо у вас є ID Austria, система автоматично підтягне ваше прізвище, ім'я та дату народження. У більшості випадків заяву можуть схвалити <strong>автоматично і відразу</strong>.</>,
    step1Way2Title: '2. Ohne ID Austria/EU-Login beantragen', step1Way2Tr: 'Переклад: Подати без ID Austria / EU-Login',
    step1Way2Desc: 'Ви заповнюєте все вручну. Заяву буде перевіряти працівник відомства — процес займає більше часу (від кількох днів до кількох тижнів).',
    step1H3_3: 'Що обираємо ми?',
    step1P2: <>Для Ірини обираємо перший варіант — <strong>mit ID Austria beantragen</strong>. Після натискання система перенаправить вас на авторизацію через <strong>ID Austria</strong>.</>,
    step1Tip: <><strong>Важлива порада:</strong> якщо у вас ще немає ID Austria, обов'язково отримайте її перед початком реєстрації. Без неї процес буде довшим і складнішим.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>📖 Як оформити Austria ID: покроковий гайд →</Link></>,
    step1Footer: 'Готово для першої сторінки. Переходимо на другу сторінку.',
    step2Title: 'Вибір типу заявника',
    step2P1: <>Після натискання <strong>«mit ID Austria beantragen»</strong> і авторизації відкривається друга сторінка.</>,
    step2H3_1: 'Прогрес-бар вгорі сторінки',
    step2ProgressLabel: 'Gewerbeanmeldung → Fortschrittsanzeige',
    step2ProgressSteps: ['1 Einstieg', '2 Person', '3 Daten', '4 Optional', '5 Beilagen', '6 Kontrolle', '7 Abschluss'],
    step2P2: <>Це етапи заповнення заяви. Зараз ви на кроці <strong>2 Person</strong> (Дані про особу).</>,
    step2H3_2: 'Головне питання: Wer stellt den Antrag?',
    step2P3: 'Переклад: «Хто подає заяву?» Тут потрібно обрати, від кого саме йде реєстрація.',
    step2Opt1: { de: '1. Natürliche Person (auch e.U. = im Firmenbuch eingetragenes Einzelunternehmen)', tr: 'Фізична особа (в тому числі e.U. — одноосібне підприємство)', desc: '<strong>Це ваш варіант.</strong> Ви реєструєтеся як звичайна людина, яка хоче працювати на себе. e.U. — це саме те, що буде у Ірини після реєстрації (Einzelunternehmen — одноосібне підприємство).' },
    step2Opt2: { de: '2. Natürliche Person mit Geschäftsführungsbestellung', tr: 'Фізична особа з призначенням керівника', desc: 'Використовується, коли ви є директором в уже існуючій компанії (наприклад, GmbH). <strong>Нам це не підходить.</strong>' },
    step2Opt3: { de: '3. Juristische Person (AG, GmbH, KG, OG, etc.)', tr: 'Юридична особа (АТ, ТОВ, командитне товариство тощо)', desc: 'Це для компаній, а не для окремої людини. <strong>Нам не потрібно.</strong>' },
    step2Info: <>На цьому етапі система вже може автоматично підтягнути ваші дані (ПІБ, дата народження) завдяки ID Austria. Якщо щось не підтягнулося — перевірте.</>,
    step2Footer: 'Готово для другої сторінки! Переходимо на третю сторінку.',
    step3Title: 'Персональні дані підприємця',
    step3P1: <>Після авторизації через ID Austria система автоматично відкриє розділ <strong>Daten</strong> (Дані). Більшість особистих даних вже підтягнулися автоматично. Вам залишається лише <strong>перевірити їх правильність</strong> та за потреби доповнити контактною інформацією.</>,
    step3P2: 'На цій сторінці варто звернути увагу лише на кілька важливих пунктів.',
    step3H3_1: 'Aufenthalt — Проживання в Австрії',
    step3Quote1: { de: 'Die gewerbeberechtigte Person hat in den letzten fünf Jahren durchgehend in Österreich gewohnt.', tr: '«Чи проживала особа безперервно в Австрії протягом останніх п\u2019яти років?»' },
    step3YesLabel: 'Якщо ви проживаєте в Австрії понад 5 років', step3NoLabel: 'Якщо ви переїхали менш ніж 5 років тому — наш випадок',
    step3Info1: <>У нашому прикладі Ірина проживає в Австрії менше 5 років — обираємо <strong>Nein</strong>. Це нормально і не є проблемою для реєстрації бізнесу. На наступних етапах система може попросити додаткові документи.</>,
    step3H3_2: 'Österreichische Sozialversicherungsnummer',
    step3P3: <>Це ваш <strong>австрійський номер соціального страхування</strong>. У більшості випадків він підтягується автоматично. Якщо поле порожнє — номер можна знайти на вашій <strong>e-card</strong> або в документах від <strong>ÖGK</strong> чи <strong>SVS</strong>.</>,
    step3H3_3: 'Einzelunternehmen im Firmenbuch eingetragen',
    step3P4: <>Нижче ви побачите блок, пов'язаний із реєстрацією у <strong>Firmenbuch</strong> (торговому реєстрі Австрії).</>,
    step3Info2: <>Якщо ви відкриваєте підприємницьку діяльність вперше — цей блок <strong>залишайте порожнім</strong>. Система сама вказує:<br /><em>„Bitte nur ausfüllen, wenn bereits eine Firmenbucheintragung besteht."</em><br /><span style={{ color: 'var(--text2)' }}>Заповнюйте лише якщо підприємство вже зареєстроване у Firmenbuch. Для більшості самозайнятих цей розділ не заповнюється.</span></>,
    step3Tip: <>Переконайтеся, що <strong>електронна пошта</strong> вказана правильно — саме на неї надходитимуть повідомлення щодо вашої заяви.</>,
    step3P5: <>Після перевірки даних натискаємо <strong>Weiter</strong> і переходимо до найважливішого етапу — вибору виду діяльності (Gewerbe).</>,
    step3Footer: 'Готово для третьої сторінки! Переходимо на четверту сторінку.',
    step4Title: 'Вибір виду діяльності та адреси бізнесу',
    step4P1: <>Відкривається сторінка <strong>Angaben zum Gewerbe</strong> (Відомості про підприємницьку діяльність). Саме тут ми повідомляємо державі: чим будемо займатися, з якої дати починаємо, де знаходиться наш бізнес.</>,
    step4P2: 'Для прикладу продовжимо реєстрацію для Ірини, яка працюватиме як самозайнята IT-фахівчиня.',
    step4H3_1: 'Gewerbewortlaut — вид діяльності',
    step4P3: <>У верхній частині сторінки знаходиться поле: <strong>Suche nach Gewerbewortlaut</strong>. Введіть ключове слово та натисніть <strong>«Gewerbewortlaut suchen»</strong>.</>,
    step4P4: 'Для більшості програмістів, веброзробників, IT-консультантів, UX/UI дизайнерів та фахівців з цифрових технологій підходить:',
    step4BoxTitle: 'Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik',
    step4BoxDesc: <>Послуги у сфері автоматизованої обробки даних та інформаційних технологій • <strong>Freies Gewerbe</strong> — вільна діяльність, без ліцензії</>,
    step4P5: <>Після вибору назва діяльності з'явиться у полі <strong>«Gefundene Gewerbewortlaute»</strong>.</>,
    step4H3_2: 'Чи потрібно обмежувати вид діяльності?',
    step4Quote: { de: 'Möchten Sie den Umfang des Gewerbes einschränken?', tr: '«Чи бажаєте ви обмежити обсяг своєї діяльності?»' },
    step4P6: 'Для більшості нових підприємців робити цього не потрібно. Ірина хоче мати можливість у майбутньому надавати різні IT-послуги без додаткових змін у реєстрації. Тому обираємо:',
    step4YesLabel1: 'Якщо хочете свідомо звузити перелік послуг', step4NoLabel1: 'Стандартний варіант для більшості фрилансерів та самозайнятих',
    step4H3_3: 'Anmeldung gültig ab — дата початку діяльності',
    step4P7: <>За замовчуванням система пропонує <strong>поточну дату</strong>. У нашому прикладі: <strong>04.06.2026</strong>. Змінювати дату потрібно лише тоді, коли ви точно знаєте, що розпочнете діяльність пізніше.</>,
    step4H3_4: 'Industriebetrieb — Промислове підприємство',
    step4P8: 'Для IT-фахівців, фрилансерів, дизайнерів, консультантів та більшості самозайнятих осіб обираємо:',
    step4YesLabel2: 'Виробництво, промисловість', step4NoLabel2: 'Для фрилансерів та самозайнятих. Цей пункт стосується виробничих підприємств.',
    step4H3_5: 'Angaben zum Standort — адреса бізнесу',
    step4Ok: <><strong>Standortadresse erfassen (mit Adressprüfung)</strong> — система автоматично перевіряє адресу через державний реєстр. Якщо адреса знайдена без помилок, заявка може бути оброблена значно швидше.</>,
    step4P9: 'Заповнюємо поля адреси ведення діяльності:',
    step4Fields: [{label:'Postleitzahl', value:'Поштовий індекс'},{label:'Ort', value:'Населений пункт'},{label:'Straße', value:'Назва вулиці'},{label:'Hausnummer', value:'Номер будинку'},{label:'Tür', value:'Номер квартири (за наявності)'}],
    step4Info: <>Оскільки Ірина працює віддалено з дому — вона вказує свою <strong>фактичну адресу проживання</strong> в Австрії. Для більшості фрилансерів це стандартна практика і <strong>не потребує окремого офісу</strong>.</>,
    step4P10: 'Перевіряємо:',
    step4CheckItems: ['Правильність обраного Gewerbe', 'Дату початку діяльності', 'Адресу бізнесу'],
    step4P11: <>Після цього натискаємо <strong>Weiter</strong>.</>,
    step4H3_6: 'Підтвердження відсутності обмежень',
    step4Opt1: { de: 'Gegen mich liegen keine Gewerbeausschlussgründe vor', tr: 'Щодо мене не існує підстав для заборони ведення підприємницької діяльності', desc: 'Для нашого прикладу обираємо цей варіант.' },
    step4Opt2: { de: 'Mir wurde eine Nachsicht erteilt', desc: 'Використовується лише в особливих випадках, коли людина раніше мала обмеження для ведення бізнесу, але отримала офіційний дозвіл. <strong>Не наш варіант.</strong>' },
    step4H3_7: 'Eidesstattliche Erklärung — Заява під присягою',
    step4P12: 'На цьому етапі система пропонує подати офіційну заяву під присягою про відсутність обмежень для ведення підприємницької діяльності.',
    step4Opt3: { de: 'Ich gebe die Eidesstattliche Erklärung ab', tr: 'Я подаю заяву під присягою', desc: 'Рекомендуємо обрати цей варіант — він підтверджує відсутність обмежень без додаткових документів і <strong>пришвидшує розгляд заяви</strong>.' },
    step4Warning: <>Також поставте галочку біля пункту:<br /><em>„Ich nehme die Aufklärung über den Inhalt der Eidesstattlichen Erklärung und die Konsequenzen von falschen Angaben zur Kenntnis."</em><br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>Це означає, що ви ознайомилися зі змістом декларації та розумієте відповідальність за надання неправдивої інформації. <strong>Для продовження реєстрації цей пункт необхідно підтвердити.</strong></span></>,
    step4H3_8: 'Введення імені та прізвища — електронний підпис',
    step4P13: <>Наприкінці потрібно ввести своє ім'я та прізвище. Це прирівнюється до <strong>електронного підпису декларації</strong>.</>,
    step4FieldVorname: { label: 'Vorname', value: 'Ірина' }, step4FieldFamilienname: { label: 'Familienname', value: 'Müller' },
    step4P14: <>Після цього натискаємо <strong>Weiter</strong> та переходимо до наступного етапу реєстрації.</>,
    step5Title: 'Перевірка даних та відправка заяви',
    step5P1: <>На цій сторінці система показує <strong>підсумок усіх даних</strong>, які ви внесли під час реєстрації. Уважно перевірте:</>,
    step5CheckItems: ['Особисті дані та контактну інформацію', 'Обраний вид діяльності (Gewerbe)', 'Адресу ведення діяльності', 'Дату початку діяльності'],
    step5Info: <>Якщо потрібно щось виправити, повертайтеся за допомогою кнопки <strong>Zurück</strong> (назад) або <strong>Daten bearbeiten</strong> (редагувати дані).</>,
    step5P2: <>Якщо всі дані вказані правильно, натискаємо <strong>Senden</strong>. Після цього заява буде надіслана до компетентного органу для обробки.</>,
    step5H3: 'Важливо щодо додаткових документів',
    step5Ok: <>Оскільки ми подавали заяву через ID Austria, система відображає: <strong>«Es müssen keine Beilagen übermittelt werden.»</strong><br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>Переклад: Додаткові документи подавати не потрібно.</span></>,
    step5Warning: <>Однак якщо ви проживаєте в Австрії <strong>менше 5 років</strong>, австрійські органи можуть запросити додаткові документи. Найчастіше це:<ul style={{ margin: '8px 0 0 16px', lineHeight: 1.8 }}><li>довідка про несудимість з країни попереднього проживання;</li><li>документи, що підтверджують особу або місце проживання.</li></ul>Рекомендуємо заздалегідь підготувати ці документи та мати їхній <strong>офіційний переклад німецькою</strong>.</>,
    step6Title: 'Реєстрацію завершено — що далі?',
    step6P1: <>Після натискання кнопки <strong>Senden</strong> ваша заява буде передана до компетентного органу. Якщо всі дані заповнені правильно та не потрібні додаткові документи, зазвичай протягом кількох днів ви отримаєте електронний лист із підтвердженням реєстрації та вашим <strong>номером GISA</strong>.</>,
    step6P2: <>Після успішної реєстрації ваша діяльність з'явиться в державному реєстрі <strong>GISA (Gewerbeinformationssystem Austria)</strong>.</>,
    step6H3: 'Як перевірити реєстрацію онлайн?',
    step6P3: 'Після обробки заяви інформацію можна безкоштовно перевірити через офіційний реєстр GISA. Пошук доступний без реєстрації — за прізвищем, GISA-номером або видом діяльності.',
    step6LinkText: '🔍 GISA Abfrage — перевірити реєстрацію',
    congratsTitle: <>Вітаємо з реєстрацією <em style={{ fontStyle: 'italic', color: '#FFB899' }}>Gewerbe! 🎉</em></>,
    congratsP: 'Як бачите, зареєструвати підприємницьку діяльність в Австрії через GISA можна повністю онлайн, без відвідування установ та паперової бюрократії. Сподіваємося, що ця покрокова інструкція допомогла вам пройти весь процес без стресу та непорозумінь.',
    tipFinal: <>Реєстрація Gewerbe — це лише перший крок. Після відкриття діяльності на вас чекають: реєстрація в SVS, листи від Finanzamt, податки, рахунки-фактури, бухгалтерія, Kleinunternehmerregelung, внески до соціального страхування та багато інших питань.<br /><br />Саме тому ми підготували цілу серію практичних статей про самозайнятість в Австрії. <strong>Зберігайте наш сайт у закладки — ми регулярно публікуємо нові практичні інструкції та пояснюємо складні австрійські правила простою мовою.</strong></>,
    nextArticleTitle: '📖 Читайте також → Gewerbeanmeldung в Австрії: повний покроковий гайд',
    nextArticleSub: 'Все про реєстрацію самозайнятості — з чого починати',
    summaryTitle: 'Підсумок: що ми зробили',
    summarySteps: ['Перейшли на gisa.gv.at/online-gewerbeanmeldung','Обрали «mit ID Austria beantragen» — найшвидший спосіб','Вибрали тип заявника: Natürliche Person + Ohne Vertretung','Перевірили особисті дані, Sozialversicherungsnummer, адресу та пошту','Обрали вид діяльності, дату початку, адресу бізнесу. Підтвердили Eidesstattliche Erklärung','Перевірили всі дані та натиснули Senden','Отримали підтвердження та номер GISA 🎉'],
    sourcesLabel: 'Офіційні джерела',
    sources: [{label:'GISA — Online-Gewerbeanmeldung', href:'https://www.gisa.gv.at/online-gewerbeanmeldung'},{label:'GISA — Перевірка реєстрації', href:'https://www.gisa.gv.at/abfrage'},{label:'WKO — Gewerbeanmeldung', href:'https://www.wko.at/gruendung/gewerbeanmeldung'}],
    footerNote: 'Цей матеріал має інформаційний характер і ґрунтується на особистому досвіді команди QLIXA. Актуальність інформації рекомендуємо перевіряти на офіційних державних сайтах Австрії. Бажаємо успіхів у вашій підприємницькій діяльності та багато задоволених клієнтів!',
    translationLabel: 'Переклад',
  },
  RU: {
    tag1: 'GISA · Регистрация', tag2: '6 шагов', tag3: 'Для иностранцев',
    titleLine1: 'Регистрация на сайте GISA:', titleEm: 'пошаговая инструкция',
    metaTime: '🕐 15 мин чтения', metaSteps: '💻 6 шагов', metaForeigners: '🇺🇦 Для иностранцев',
    toc: [['#step1','Заходим на сайт'],['#step2','Тип заявителя'],['#step3','Персональные данные'],['#step4','Вид деятельности'],['#step5','Проверка данных'],['#step6','Регистрация завершена'],['#summary','Итог']],
    backLink: '← Все статьи',
    disclaimer: 'Этот материал подготовлен на основе публично доступных официальных источников и опыта людей, которые прошли этот процесс. QLIXA не является юридическим агентством и не предоставляет индивидуальных консультаций. Интерфейс GISA может обновляться — всегда проверяйте актуальную версию на gisa.gv.at.',
    introP1: <>В этой статье мы подробно, простым языком разберём, как пройти <strong>регистрацию на сайте GISA</strong> — подать заявление об открытии предпринимательской деятельности (<strong>Gewerbeanmeldung</strong>).</>,
    introP2: <>📌 <strong>Пример:</strong> Ирина, которая регистрируется как самозанятая в сфере IT (свободная профессия).</>,
    step1Title: 'Заходим на сайт',
    step1LinkLabel: 'Перейдите по ссылке:',
    step1LinkText: '🔗 https://www.gisa.gv.at/online-gewerbeanmeldung',
    step1P1: <>Вы видите первую страницу системы <strong>GISA</strong>.</>,
    step1H3_1: 'Подробный разбор первой страницы',
    step1Opt1: { de: 'GISA Gewerbeinformationssystem Austria', tr: 'Что это?', desc: 'GISA — это официальная государственная база данных Австрии, в которой регистрируются все предприниматели. Здесь хранится информация обо всех действующих бизнесах в стране.' },
    step1Opt2: { de: 'Gewerbeanmeldung', tr: 'Что это означает?', desc: 'Это <strong>заявление на регистрацию предпринимательской деятельности</strong>. Именно это заявление мы сейчас заполняем.' },
    step1H3_2: 'Два способа подачи заявления — самый важный выбор',
    step1Way1Title: '1. mit ID Austria beantragen', step1Way1Tr: 'Перевод: Подать заявление с помощью ID Austria',
    step1Way1Desc: <><strong>Лучший и самый быстрый способ.</strong> Если у вас есть ID Austria, система автоматически подтянет вашу фамилию, имя и дату рождения. В большинстве случаев заявление могут одобрить <strong>автоматически и сразу</strong>.</>,
    step1Way2Title: '2. Ohne ID Austria/EU-Login beantragen', step1Way2Tr: 'Перевод: Подать без ID Austria / EU-Login',
    step1Way2Desc: 'Вы заполняете всё вручную. Заявление будет проверять сотрудник ведомства — процесс занимает больше времени (от нескольких дней до нескольких недель).',
    step1H3_3: 'Что выбираем мы?',
    step1P2: <>Для Ирины выбираем первый вариант — <strong>mit ID Austria beantragen</strong>. После нажатия система перенаправит вас на авторизацию через <strong>ID Austria</strong>.</>,
    step1Tip: <><strong>Важный совет:</strong> если у вас ещё нет ID Austria, обязательно получите её перед началом регистрации. Без неё процесс будет дольше и сложнее.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>📖 Как оформить Austria ID: пошаговый гайд →</Link></>,
    step1Footer: 'Готово с первой страницей. Переходим ко второй странице.',
    step2Title: 'Выбор типа заявителя',
    step2P1: <>После нажатия <strong>«mit ID Austria beantragen»</strong> и авторизации открывается вторая страница.</>,
    step2H3_1: 'Прогресс-бар вверху страницы',
    step2ProgressLabel: 'Gewerbeanmeldung → Fortschrittsanzeige',
    step2ProgressSteps: ['1 Einstieg', '2 Person', '3 Daten', '4 Optional', '5 Beilagen', '6 Kontrolle', '7 Abschluss'],
    step2P2: <>Это этапы заполнения заявления. Сейчас вы на шаге <strong>2 Person</strong> (Данные о лице).</>,
    step2H3_2: 'Главный вопрос: Wer stellt den Antrag?',
    step2P3: 'Перевод: «Кто подаёт заявление?» Здесь нужно выбрать, от кого именно идёт регистрация.',
    step2Opt1: { de: '1. Natürliche Person (auch e.U. = im Firmenbuch eingetragenes Einzelunternehmen)', tr: 'Физическое лицо (в том числе e.U. — единоличное предприятие)', desc: '<strong>Это ваш вариант.</strong> Вы регистрируетесь как обычный человек, который хочет работать на себя. e.U. — это именно то, что будет у Ирины после регистрации (Einzelunternehmen — единоличное предприятие).' },
    step2Opt2: { de: '2. Natürliche Person mit Geschäftsführungsbestellung', tr: 'Физическое лицо с назначением руководителя', desc: 'Используется, когда вы являетесь директором в уже существующей компании (например, GmbH). <strong>Нам это не подходит.</strong>' },
    step2Opt3: { de: '3. Juristische Person (AG, GmbH, KG, OG, etc.)', tr: 'Юридическое лицо (АО, ООО, коммандитное товарищество и т.д.)', desc: 'Это для компаний, а не для отдельного человека. <strong>Нам не нужно.</strong>' },
    step2Info: <>На этом этапе система уже может автоматически подтянуть ваши данные (ФИО, дата рождения) благодаря ID Austria. Если что-то не подтянулось — проверьте.</>,
    step2Footer: 'Готово со второй страницей! Переходим к третьей странице.',
    step3Title: 'Персональные данные предпринимателя',
    step3P1: <>После авторизации через ID Austria система автоматически откроет раздел <strong>Daten</strong> (Данные). Большинство личных данных уже подтянулись автоматически. Вам остаётся лишь <strong>проверить их правильность</strong> и при необходимости дополнить контактной информацией.</>,
    step3P2: 'На этой странице стоит обратить внимание лишь на несколько важных пунктов.',
    step3H3_1: 'Aufenthalt — Проживание в Австрии',
    step3Quote1: { de: 'Die gewerbeberechtigte Person hat in den letzten fünf Jahren durchgehend in Österreich gewohnt.', tr: '«Проживало ли лицо непрерывно в Австрии на протяжении последних пяти лет?»' },
    step3YesLabel: 'Если вы проживаете в Австрии более 5 лет', step3NoLabel: 'Если вы переехали менее 5 лет назад — наш случай',
    step3Info1: <>В нашем примере Ирина проживает в Австрии менее 5 лет — выбираем <strong>Nein</strong>. Это нормально и не является проблемой для регистрации бизнеса. На следующих этапах система может попросить дополнительные документы.</>,
    step3H3_2: 'Österreichische Sozialversicherungsnummer',
    step3P3: <>Это ваш <strong>австрийский номер социального страхования</strong>. В большинстве случаев он подтягивается автоматически. Если поле пустое — номер можно найти на вашей <strong>e-card</strong> или в документах от <strong>ÖGK</strong> или <strong>SVS</strong>.</>,
    step3H3_3: 'Einzelunternehmen im Firmenbuch eingetragen',
    step3P4: <>Ниже вы увидите блок, связанный с регистрацией в <strong>Firmenbuch</strong> (торговом реестре Австрии).</>,
    step3Info2: <>Если вы открываете предпринимательскую деятельность впервые — этот блок <strong>оставляйте пустым</strong>. Система сама указывает:<br /><em>„Bitte nur ausfüllen, wenn bereits eine Firmenbucheintragung besteht."</em><br /><span style={{ color: 'var(--text2)' }}>Заполняйте только если предприятие уже зарегистрировано в Firmenbuch. Для большинства самозанятых этот раздел не заполняется.</span></>,
    step3Tip: <>Убедитесь, что <strong>электронная почта</strong> указана правильно — именно на неё будут приходить уведомления по вашему заявлению.</>,
    step3P5: <>После проверки данных нажимаем <strong>Weiter</strong> и переходим к самому важному этапу — выбору вида деятельности (Gewerbe).</>,
    step3Footer: 'Готово с третьей страницей! Переходим к четвёртой странице.',
    step4Title: 'Выбор вида деятельности и адреса бизнеса',
    step4P1: <>Открывается страница <strong>Angaben zum Gewerbe</strong> (Сведения о предпринимательской деятельности). Именно здесь мы сообщаем государству: чем будем заниматься, с какой даты начинаем, где находится наш бизнес.</>,
    step4P2: 'Для примера продолжим регистрацию для Ирины, которая будет работать как самозанятая IT-специалистка.',
    step4H3_1: 'Gewerbewortlaut — вид деятельности',
    step4P3: <>В верхней части страницы находится поле: <strong>Suche nach Gewerbewortlaut</strong>. Введите ключевое слово и нажмите <strong>«Gewerbewortlaut suchen»</strong>.</>,
    step4P4: 'Для большинства программистов, веб-разработчиков, IT-консультантов, UX/UI дизайнеров и специалистов по цифровым технологиям подходит:',
    step4BoxTitle: 'Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik',
    step4BoxDesc: <>Услуги в сфере автоматизированной обработки данных и информационных технологий • <strong>Freies Gewerbe</strong> — свободная деятельность, без лицензии</>,
    step4P5: <>После выбора название деятельности появится в поле <strong>«Gefundene Gewerbewortlaute»</strong>.</>,
    step4H3_2: 'Нужно ли ограничивать вид деятельности?',
    step4Quote: { de: 'Möchten Sie den Umfang des Gewerbes einschränken?', tr: '«Хотите ли вы ограничить объём своей деятельности?»' },
    step4P6: 'Для большинства новых предпринимателей делать этого не нужно. Ирина хочет иметь возможность в будущем предоставлять разные IT-услуги без дополнительных изменений в регистрации. Поэтому выбираем:',
    step4YesLabel1: 'Если хотите сознательно сузить перечень услуг', step4NoLabel1: 'Стандартный вариант для большинства фрилансеров и самозанятых',
    step4H3_3: 'Anmeldung gültig ab — дата начала деятельности',
    step4P7: <>По умолчанию система предлагает <strong>текущую дату</strong>. В нашем примере: <strong>04.06.2026</strong>. Менять дату нужно только тогда, когда вы точно знаете, что начнёте деятельность позже.</>,
    step4H3_4: 'Industriebetrieb — Промышленное предприятие',
    step4P8: 'Для IT-специалистов, фрилансеров, дизайнеров, консультантов и большинства самозанятых лиц выбираем:',
    step4YesLabel2: 'Производство, промышленность', step4NoLabel2: 'Для фрилансеров и самозанятых. Этот пункт касается производственных предприятий.',
    step4H3_5: 'Angaben zum Standort — адрес бизнеса',
    step4Ok: <><strong>Standortadresse erfassen (mit Adressprüfung)</strong> — система автоматически проверяет адрес через государственный реестр. Если адрес найден без ошибок, заявка может быть обработана значительно быстрее.</>,
    step4P9: 'Заполняем поля адреса ведения деятельности:',
    step4Fields: [{label:'Postleitzahl', value:'Почтовый индекс'},{label:'Ort', value:'Населённый пункт'},{label:'Straße', value:'Название улицы'},{label:'Hausnummer', value:'Номер дома'},{label:'Tür', value:'Номер квартиры (при наличии)'}],
    step4Info: <>Поскольку Ирина работает удалённо из дома — она указывает свой <strong>фактический адрес проживания</strong> в Австрии. Для большинства фрилансеров это стандартная практика и <strong>не требует отдельного офиса</strong>.</>,
    step4P10: 'Проверяем:',
    step4CheckItems: ['Правильность выбранного Gewerbe', 'Дату начала деятельности', 'Адрес бизнеса'],
    step4P11: <>После этого нажимаем <strong>Weiter</strong>.</>,
    step4H3_6: 'Подтверждение отсутствия ограничений',
    step4Opt1: { de: 'Gegen mich liegen keine Gewerbeausschlussgründe vor', tr: 'В отношении меня не существует оснований для запрета ведения предпринимательской деятельности', desc: 'Для нашего примера выбираем этот вариант.' },
    step4Opt2: { de: 'Mir wurde eine Nachsicht erteilt', desc: 'Используется только в особых случаях, когда у человека ранее были ограничения для ведения бизнеса, но он получил официальное разрешение. <strong>Не наш вариант.</strong>' },
    step4H3_7: 'Eidesstattliche Erklärung — Заявление под присягой',
    step4P12: 'На этом этапе система предлагает подать официальное заявление под присягой об отсутствии ограничений для ведения предпринимательской деятельности.',
    step4Opt3: { de: 'Ich gebe die Eidesstattliche Erklärung ab', tr: 'Я подаю заявление под присягой', desc: 'Рекомендуем выбрать этот вариант — он подтверждает отсутствие ограничений без дополнительных документов и <strong>ускоряет рассмотрение заявления</strong>.' },
    step4Warning: <>Также поставьте галочку рядом с пунктом:<br /><em>„Ich nehme die Aufklärung über den Inhalt der Eidesstattlichen Erklärung und die Konsequenzen von falschen Angaben zur Kenntnis."</em><br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>Это означает, что вы ознакомились с содержанием декларации и понимаете ответственность за предоставление ложной информации. <strong>Для продолжения регистрации этот пункт необходимо подтвердить.</strong></span></>,
    step4H3_8: 'Ввод имени и фамилии — электронная подпись',
    step4P13: <>В конце нужно ввести своё имя и фамилию. Это приравнивается к <strong>электронной подписи декларации</strong>.</>,
    step4FieldVorname: { label: 'Vorname', value: 'Ирина' }, step4FieldFamilienname: { label: 'Familienname', value: 'Müller' },
    step4P14: <>После этого нажимаем <strong>Weiter</strong> и переходим к следующему этапу регистрации.</>,
    step5Title: 'Проверка данных и отправка заявления',
    step5P1: <>На этой странице система показывает <strong>итог всех данных</strong>, которые вы внесли во время регистрации. Внимательно проверьте:</>,
    step5CheckItems: ['Личные данные и контактную информацию', 'Выбранный вид деятельности (Gewerbe)', 'Адрес ведения деятельности', 'Дату начала деятельности'],
    step5Info: <>Если нужно что-то исправить, возвращайтесь с помощью кнопки <strong>Zurück</strong> (назад) или <strong>Daten bearbeiten</strong> (редактировать данные).</>,
    step5P2: <>Если все данные указаны правильно, нажимаем <strong>Senden</strong>. После этого заявление будет отправлено в компетентный орган для обработки.</>,
    step5H3: 'Важно насчёт дополнительных документов',
    step5Ok: <>Поскольку мы подавали заявление через ID Austria, система отображает: <strong>«Es müssen keine Beilagen übermittelt werden.»</strong><br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>Перевод: Дополнительные документы подавать не нужно.</span></>,
    step5Warning: <>Однако если вы проживаете в Австрии <strong>менее 5 лет</strong>, австрийские органы могут запросить дополнительные документы. Чаще всего это:<ul style={{ margin: '8px 0 0 16px', lineHeight: 1.8 }}><li>справка о несудимости из страны предыдущего проживания;</li><li>документы, подтверждающие личность или место жительства.</li></ul>Рекомендуем заранее подготовить эти документы и иметь их <strong>официальный перевод на немецкий</strong>.</>,
    step6Title: 'Регистрация завершена — что дальше?',
    step6P1: <>После нажатия кнопки <strong>Senden</strong> ваше заявление будет передано в компетентный орган. Если все данные заполнены правильно и не нужны дополнительные документы, обычно в течение нескольких дней вы получите электронное письмо с подтверждением регистрации и вашим <strong>номером GISA</strong>.</>,
    step6P2: <>После успешной регистрации ваша деятельность появится в государственном реестре <strong>GISA (Gewerbeinformationssystem Austria)</strong>.</>,
    step6H3: 'Как проверить регистрацию онлайн?',
    step6P3: 'После обработки заявления информацию можно бесплатно проверить через официальный реестр GISA. Поиск доступен без регистрации — по фамилии, GISA-номеру или виду деятельности.',
    step6LinkText: '🔍 GISA Abfrage — проверить регистрацию',
    congratsTitle: <>Поздравляем с регистрацией <em style={{ fontStyle: 'italic', color: '#FFB899' }}>Gewerbe! 🎉</em></>,
    congratsP: 'Как видите, зарегистрировать предпринимательскую деятельность в Австрии через GISA можно полностью онлайн, без посещения учреждений и бумажной бюрократии. Надеемся, что эта пошаговая инструкция помогла вам пройти весь процесс без стресса и недопонимания.',
    tipFinal: <>Регистрация Gewerbe — это лишь первый шаг. После открытия деятельности вас ждут: регистрация в SVS, письма от Finanzamt, налоги, счета-фактуры, бухгалтерия, Kleinunternehmerregelung, взносы в социальное страхование и много других вопросов.<br /><br />Именно поэтому мы подготовили целую серию практических статей о самозанятости в Австрии. <strong>Сохраняйте наш сайт в закладки — мы регулярно публикуем новые практические инструкции и объясняем сложные австрийские правила простым языком.</strong></>,
    nextArticleTitle: '📖 Читайте также → Gewerbeanmeldung в Австрии: полный пошаговый гайд',
    nextArticleSub: 'Всё о регистрации самозанятости — с чего начинать',
    summaryTitle: 'Итог: что мы сделали',
    summarySteps: ['Перешли на gisa.gv.at/online-gewerbeanmeldung','Выбрали «mit ID Austria beantragen» — самый быстрый способ','Выбрали тип заявителя: Natürliche Person + Ohne Vertretung','Проверили личные данные, Sozialversicherungsnummer, адрес и почту','Выбрали вид деятельности, дату начала, адрес бизнеса. Подтвердили Eidesstattliche Erklärung','Проверили все данные и нажали Senden','Получили подтверждение и номер GISA 🎉'],
    sourcesLabel: 'Официальные источники',
    sources: [{label:'GISA — Online-Gewerbeanmeldung', href:'https://www.gisa.gv.at/online-gewerbeanmeldung'},{label:'GISA — Проверка регистрации', href:'https://www.gisa.gv.at/abfrage'},{label:'WKO — Gewerbeanmeldung', href:'https://www.wko.at/gruendung/gewerbeanmeldung'}],
    footerNote: 'Этот материал носит информационный характер и основан на личном опыте команды QLIXA. Актуальность информации рекомендуем проверять на официальных государственных сайтах Австрии. Желаем успехов в вашей предпринимательской деятельности и много довольных клиентов!',
    translationLabel: 'Перевод',
  },
  EN: {
    tag1: 'GISA · Registration', tag2: '6 steps', tag3: 'For foreigners',
    titleLine1: 'Registering on the GISA website:', titleEm: 'a step-by-step guide',
    metaTime: '🕐 15 min read', metaSteps: '💻 6 steps', metaForeigners: '🇺🇦 For foreigners',
    toc: [['#step1','Go to the website'],['#step2','Applicant type'],['#step3','Personal data'],['#step4','Type of activity'],['#step5','Reviewing your data'],['#step6','Registration complete'],['#summary','Summary']],
    backLink: '← All articles',
    disclaimer: 'This material is based on publicly available official sources and the experience of people who have gone through this process. QLIXA is not a legal agency and does not provide individual consultations. The GISA interface may be updated — always check the current version at gisa.gv.at.',
    introP1: <>In this article we\u2019ll walk through, in plain language, how to complete <strong>registration on the GISA website</strong> — submitting a business registration application (<strong>Gewerbeanmeldung</strong>).</>,
    introP2: <>📌 <strong>Example:</strong> Iryna, who is registering as self-employed in IT (a liberal profession).</>,
    step1Title: 'Go to the website',
    step1LinkLabel: 'Follow this link:',
    step1LinkText: '🔗 https://www.gisa.gv.at/online-gewerbeanmeldung',
    step1P1: <>You\u2019ll see the first page of the <strong>GISA</strong> system.</>,
    step1H3_1: 'A closer look at the first page',
    step1Opt1: { de: 'GISA Gewerbeinformationssystem Austria', tr: 'What is this?', desc: 'GISA is Austria\u2019s official state database where all entrepreneurs are registered. It holds information on every active business in the country.' },
    step1Opt2: { de: 'Gewerbeanmeldung', tr: 'What does this mean?', desc: 'This is the <strong>business registration application</strong>. This is exactly the application we are filling out now.' },
    step1H3_2: 'Two ways to submit the application — the most important choice',
    step1Way1Title: '1. mit ID Austria beantragen', step1Way1Tr: 'Translation: Apply using ID Austria',
    step1Way1Desc: <><strong>The best and fastest way.</strong> If you have ID Austria, the system will automatically pull in your last name, first name and date of birth. In most cases the application can be approved <strong>automatically and immediately</strong>.</>,
    step1Way2Title: '2. Ohne ID Austria/EU-Login beantragen', step1Way2Tr: 'Translation: Apply without ID Austria / EU-Login',
    step1Way2Desc: 'You fill everything in manually. The application will be reviewed by an official — the process takes longer (from a few days to a few weeks).',
    step1H3_3: 'What do we choose?',
    step1P2: <>For Iryna we choose the first option — <strong>mit ID Austria beantragen</strong>. After clicking, the system will redirect you to sign in via <strong>ID Austria</strong>.</>,
    step1Tip: <><strong>Important tip:</strong> if you don\u2019t have ID Austria yet, be sure to get it before starting registration. Without it, the process will be longer and more complicated.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>📖 How to get Austria ID: step-by-step guide →</Link></>,
    step1Footer: 'Done with the first page. Moving on to the second page.',
    step2Title: 'Choosing the applicant type',
    step2P1: <>After clicking <strong>\u201cmit ID Austria beantragen\u201d</strong> and signing in, the second page opens.</>,
    step2H3_1: 'The progress bar at the top of the page',
    step2ProgressLabel: 'Gewerbeanmeldung → Fortschrittsanzeige',
    step2ProgressSteps: ['1 Einstieg', '2 Person', '3 Daten', '4 Optional', '5 Beilagen', '6 Kontrolle', '7 Abschluss'],
    step2P2: <>These are the stages of filling out the application. You\u2019re currently on step <strong>2 Person</strong> (personal data).</>,
    step2H3_2: 'The key question: Wer stellt den Antrag?',
    step2P3: 'Translation: \u201cWho is submitting the application?\u201d Here you need to choose on whose behalf the registration is being made.',
    step2Opt1: { de: '1. Natürliche Person (auch e.U. = im Firmenbuch eingetragenes Einzelunternehmen)', tr: 'Natural person (including e.U. — a sole proprietorship)', desc: '<strong>This is your option.</strong> You are registering as a private individual who wants to work for themselves. e.U. is exactly what Iryna will have after registering (Einzelunternehmen — sole proprietorship).' },
    step2Opt2: { de: '2. Natürliche Person mit Geschäftsführungsbestellung', tr: 'Natural person appointed as managing director', desc: 'Used when you are a director in an already existing company (e.g. a GmbH). <strong>This doesn\u2019t apply to us.</strong>' },
    step2Opt3: { de: '3. Juristische Person (AG, GmbH, KG, OG, etc.)', tr: 'Legal entity (AG, GmbH, KG, OG, etc.)', desc: 'This is for companies, not for an individual. <strong>We don\u2019t need this.</strong>' },
    step2Info: <>At this stage the system can already automatically pull in your data (full name, date of birth) thanks to ID Austria. If something wasn\u2019t pulled in — check it.</>,
    step2Footer: 'Done with the second page! Moving on to the third page.',
    step3Title: 'The entrepreneur\u2019s personal data',
    step3P1: <>After signing in via ID Austria, the system automatically opens the <strong>Daten</strong> (data) section. Most personal data is already pulled in automatically. All that\u2019s left is to <strong>check it\u2019s correct</strong> and add contact information if needed.</>,
    step3P2: 'On this page, only a few important points are worth paying attention to.',
    step3H3_1: 'Aufenthalt — residence in Austria',
    step3Quote1: { de: 'Die gewerbeberechtigte Person hat in den letzten fünf Jahren durchgehend in Österreich gewohnt.', tr: '\u201cHas the person lived continuously in Austria for the last five years?\u201d' },
    step3YesLabel: 'If you have lived in Austria for more than 5 years', step3NoLabel: 'If you moved less than 5 years ago — our case',
    step3Info1: <>In our example, Iryna has lived in Austria for less than 5 years — we choose <strong>Nein</strong>. This is normal and not a problem for registering a business. At later stages the system may ask for additional documents.</>,
    step3H3_2: 'Österreichische Sozialversicherungsnummer',
    step3P3: <>This is your <strong>Austrian social insurance number</strong>. In most cases it\u2019s pulled in automatically. If the field is empty — you can find the number on your <strong>e-card</strong> or in documents from <strong>ÖGK</strong> or <strong>SVS</strong>.</>,
    step3H3_3: 'Einzelunternehmen im Firmenbuch eingetragen',
    step3P4: <>Below you\u2019ll see a block related to registration in the <strong>Firmenbuch</strong> (Austria\u2019s commercial register).</>,
    step3Info2: <>If you\u2019re opening a business activity for the first time — <strong>leave this block empty</strong>. The system itself notes:<br /><em>„Bitte nur ausfüllen, wenn bereits eine Firmenbucheintragung besteht."</em><br /><span style={{ color: 'var(--text2)' }}>Fill it in only if the business is already registered in the Firmenbuch. For most self-employed people this section is left blank.</span></>,
    step3Tip: <>Make sure your <strong>email address</strong> is correct — that\u2019s where notifications about your application will be sent.</>,
    step3P5: <>After checking the data we click <strong>Weiter</strong> and move on to the most important stage — choosing the type of activity (Gewerbe).</>,
    step3Footer: 'Done with the third page! Moving on to the fourth page.',
    step4Title: 'Choosing the type of activity and business address',
    step4P1: <>The <strong>Angaben zum Gewerbe</strong> (business activity details) page opens. This is where we tell the state: what we\u2019ll be doing, from what date we\u2019re starting, and where our business is located.</>,
    step4P2: 'As an example, let\u2019s continue Iryna\u2019s registration as a self-employed IT specialist.',
    step4H3_1: 'Gewerbewortlaut — type of activity',
    step4P3: <>At the top of the page is the field: <strong>Suche nach Gewerbewortlaut</strong>. Enter a keyword and click <strong>\u201cGewerbewortlaut suchen\u201d</strong>.</>,
    step4P4: 'For most programmers, web developers, IT consultants, UX/UI designers and digital technology specialists, this fits:',
    step4BoxTitle: 'Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik',
    step4BoxDesc: <>Services in automated data processing and information technology • <strong>Freies Gewerbe</strong> — an unregulated trade, no license required</>,
    step4P5: <>After selecting it, the activity name will appear in the <strong>\u201cGefundene Gewerbewortlaute\u201d</strong> field.</>,
    step4H3_2: 'Do you need to restrict the scope of activity?',
    step4Quote: { de: 'Möchten Sie den Umfang des Gewerbes einschränken?', tr: '\u201cDo you want to restrict the scope of your activity?\u201d' },
    step4P6: 'Most new entrepreneurs don\u2019t need to do this. Iryna wants the option to offer various IT services in the future without additional changes to her registration. So we choose:',
    step4YesLabel1: 'If you want to deliberately narrow the list of services', step4NoLabel1: 'The standard option for most freelancers and self-employed people',
    step4H3_3: 'Anmeldung gültig ab — activity start date',
    step4P7: <>By default the system suggests the <strong>current date</strong>. In our example: <strong>04.06.2026</strong>. You only need to change the date if you know for certain you\u2019ll start the activity later.</>,
    step4H3_4: 'Industriebetrieb — industrial business',
    step4P8: 'For IT specialists, freelancers, designers, consultants and most self-employed people, we choose:',
    step4YesLabel2: 'Manufacturing, industry', step4NoLabel2: 'For freelancers and self-employed people. This point concerns manufacturing businesses.',
    step4H3_5: 'Angaben zum Standort — business address',
    step4Ok: <><strong>Standortadresse erfassen (mit Adressprüfung)</strong> — the system automatically checks the address against the state register. If the address is found without errors, the application can be processed much faster.</>,
    step4P9: 'We fill in the business activity address fields:',
    step4Fields: [{label:'Postleitzahl', value:'Postal code'},{label:'Ort', value:'City/town'},{label:'Straße', value:'Street name'},{label:'Hausnummer', value:'House number'},{label:'Tür', value:'Apartment number (if applicable)'}],
    step4Info: <>Since Iryna works remotely from home — she provides her <strong>actual place of residence</strong> in Austria. For most freelancers this is standard practice and <strong>doesn\u2019t require a separate office</strong>.</>,
    step4P10: 'We check:',
    step4CheckItems: ['That the chosen Gewerbe is correct', 'The activity start date', 'The business address'],
    step4P11: <>After that we click <strong>Weiter</strong>.</>,
    step4H3_6: 'Confirming there are no restrictions',
    step4Opt1: { de: 'Gegen mich liegen keine Gewerbeausschlussgründe vor', tr: 'There are no grounds preventing me from conducting business activity', desc: 'For our example we choose this option.' },
    step4Opt2: { de: 'Mir wurde eine Nachsicht erteilt', desc: 'Used only in special cases, when a person previously had restrictions on running a business but received official permission. <strong>Not our option.</strong>' },
    step4H3_7: 'Eidesstattliche Erklärung — sworn statement',
    step4P12: 'At this stage the system offers to submit an official sworn statement confirming there are no restrictions on conducting business activity.',
    step4Opt3: { de: 'Ich gebe die Eidesstattliche Erklärung ab', tr: 'I am submitting the sworn statement', desc: 'We recommend choosing this option — it confirms there are no restrictions without extra documents and <strong>speeds up the review of the application</strong>.' },
    step4Warning: <>Also tick the checkbox next to:<br /><em>„Ich nehme die Aufklärung über den Inhalt der Eidesstattlichen Erklärung und die Konsequenzen von falschen Angaben zur Kenntnis."</em><br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>This means you have read the content of the declaration and understand the responsibility for providing false information. <strong>This point must be confirmed to continue registration.</strong></span></>,
    step4H3_8: 'Entering your first and last name — electronic signature',
    step4P13: <>At the end you need to enter your first and last name. This is equivalent to an <strong>electronic signature of the declaration</strong>.</>,
    step4FieldVorname: { label: 'Vorname', value: 'Iryna' }, step4FieldFamilienname: { label: 'Familienname', value: 'Müller' },
    step4P14: <>After that we click <strong>Weiter</strong> and move on to the next stage of registration.</>,
    step5Title: 'Reviewing the data and submitting the application',
    step5P1: <>On this page the system shows a <strong>summary of all the data</strong> you entered during registration. Carefully check:</>,
    step5CheckItems: ['Personal data and contact information', 'The chosen type of activity (Gewerbe)', 'The business address', 'The activity start date'],
    step5Info: <>If something needs correcting, go back using the <strong>Zurück</strong> (back) button or <strong>Daten bearbeiten</strong> (edit data).</>,
    step5P2: <>If all the data is correct, we click <strong>Senden</strong>. After that, the application will be sent to the competent authority for processing.</>,
    step5H3: 'Important note on additional documents',
    step5Ok: <>Since we submitted the application via ID Austria, the system shows: <strong>\u201cEs müssen keine Beilagen übermittelt werden.\u201d</strong><br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>Translation: No additional documents need to be submitted.</span></>,
    step5Warning: <>However, if you\u2019ve lived in Austria <strong>less than 5 years</strong>, the Austrian authorities may request additional documents. Most often these are:<ul style={{ margin: '8px 0 0 16px', lineHeight: 1.8 }}><li>a certificate of no criminal record from your previous country of residence;</li><li>documents confirming your identity or place of residence.</li></ul>We recommend preparing these documents in advance and having their <strong>official German translation</strong>.</>,
    step6Title: 'Registration complete — what\u2019s next?',
    step6P1: <>After clicking the <strong>Senden</strong> button, your application will be forwarded to the competent authority. If all the data is filled in correctly and no additional documents are needed, you\u2019ll usually receive a confirmation email with your <strong>GISA number</strong> within a few days.</>,
    step6P2: <>After successful registration, your activity will appear in the state register <strong>GISA (Gewerbeinformationssystem Austria)</strong>.</>,
    step6H3: 'How to check the registration online?',
    step6P3: 'After the application is processed, you can check the information for free via the official GISA register. Search is available without registration — by last name, GISA number, or type of activity.',
    step6LinkText: '🔍 GISA Abfrage — check your registration',
    congratsTitle: <>Congratulations on registering your <em style={{ fontStyle: 'italic', color: '#FFB899' }}>Gewerbe! 🎉</em></>,
    congratsP: 'As you can see, registering a business activity in Austria via GISA can be done entirely online, without visiting offices or paper bureaucracy. We hope this step-by-step guide helped you get through the whole process without stress or confusion.',
    tipFinal: <>Registering the Gewerbe is just the first step. After opening your activity, you\u2019ll also need to deal with: SVS registration, letters from the Finanzamt, taxes, invoices, bookkeeping, Kleinunternehmerregelung, social insurance contributions and many other matters.<br /><br />That\u2019s why we\u2019ve prepared a whole series of practical articles about self-employment in Austria. <strong>Bookmark our site — we regularly publish new practical guides and explain complex Austrian rules in plain language.</strong></>,
    nextArticleTitle: '📖 Also read → Gewerbeanmeldung in Austria: the complete step-by-step guide',
    nextArticleSub: 'Everything about registering self-employment — where to start',
    summaryTitle: 'Summary: what we did',
    summarySteps: ['Went to gisa.gv.at/online-gewerbeanmeldung','Chose \u201cmit ID Austria beantragen\u201d — the fastest way','Chose the applicant type: Natürliche Person + Ohne Vertretung','Checked personal data, Sozialversicherungsnummer, address and email','Chose the type of activity, start date, business address. Confirmed the Eidesstattliche Erklärung','Checked all the data and clicked Senden','Received confirmation and a GISA number 🎉'],
    sourcesLabel: 'Official sources',
    sources: [{label:'GISA — Online-Gewerbeanmeldung', href:'https://www.gisa.gv.at/online-gewerbeanmeldung'},{label:'GISA — Check registration', href:'https://www.gisa.gv.at/abfrage'},{label:'WKO — Gewerbeanmeldung', href:'https://www.wko.at/gruendung/gewerbeanmeldung'}],
    footerNote: 'This material is for informational purposes and is based on the personal experience of the QLIXA team. We recommend checking the current information on official Austrian government websites. We wish you success in your business activity and many happy clients!',
    translationLabel: 'Translation',
  },
  DE: {
    tag1: 'GISA · Anmeldung', tag2: '6 Schritte', tag3: 'Für Ausländer',
    titleLine1: 'Anmeldung auf der GISA-Website:', titleEm: 'Schritt-für-Schritt-Anleitung',
    metaTime: '🕐 15 Min. Lesezeit', metaSteps: '💻 6 Schritte', metaForeigners: '🇺🇦 Für Ausländer',
    toc: [['#step1','Zur Website gehen'],['#step2','Art des Antragstellers'],['#step3','Persönliche Daten'],['#step4','Art der Tätigkeit'],['#step5','Daten überprüfen'],['#step6','Anmeldung abgeschlossen'],['#summary','Zusammenfassung']],
    backLink: '← Alle Artikel',
    disclaimer: 'Dieses Material basiert auf öffentlich zugänglichen offiziellen Quellen und den Erfahrungen von Menschen, die diesen Prozess durchlaufen haben. QLIXA ist keine Rechtsberatung und bietet keine individuelle Beratung. Die GISA-Oberfläche kann aktualisiert werden — überprüfe daher immer die aktuelle Version auf gisa.gv.at.',
    introP1: <>In diesem Artikel gehen wir ausführlich und in einfacher Sprache durch, wie du die <strong>Anmeldung auf der GISA-Website</strong> durchführst — also einen Antrag auf Aufnahme einer Gewerbetätigkeit (<strong>Gewerbeanmeldung</strong>) stellst.</>,
    introP2: <>📌 <strong>Beispiel:</strong> Iryna, die sich als Selbstständige im IT-Bereich (freier Beruf) anmeldet.</>,
    step1Title: 'Zur Website gehen',
    step1LinkLabel: 'Folge diesem Link:',
    step1LinkText: '🔗 https://www.gisa.gv.at/online-gewerbeanmeldung',
    step1P1: <>Du siehst die erste Seite des <strong>GISA</strong>-Systems.</>,
    step1H3_1: 'Die erste Seite im Detail',
    step1Opt1: { de: 'GISA Gewerbeinformationssystem Austria', tr: 'Was ist das?', desc: 'GISA ist Österreichs offizielle staatliche Datenbank, in der alle Unternehmer:innen registriert werden. Hier werden Informationen zu allen aktiven Unternehmen im Land gespeichert.' },
    step1Opt2: { de: 'Gewerbeanmeldung', tr: 'Was bedeutet das?', desc: 'Das ist der <strong>Antrag auf Anmeldung einer Gewerbetätigkeit</strong>. Genau diesen Antrag füllen wir gerade aus.' },
    step1H3_2: 'Zwei Wege der Antragstellung — die wichtigste Entscheidung',
    step1Way1Title: '1. mit ID Austria beantragen', step1Way1Tr: 'Übersetzung: Antrag mit ID Austria stellen',
    step1Way1Desc: <><strong>Der beste und schnellste Weg.</strong> Wenn du eine ID Austria hast, zieht das System automatisch deinen Nachnamen, Vornamen und dein Geburtsdatum. In den meisten Fällen kann der Antrag <strong>automatisch und sofort</strong> genehmigt werden.</>,
    step1Way2Title: '2. Ohne ID Austria/EU-Login beantragen', step1Way2Tr: 'Übersetzung: Antrag ohne ID Austria / EU-Login stellen',
    step1Way2Desc: 'Du füllst alles manuell aus. Der Antrag wird von einer Sachbearbeiterin bzw. einem Sachbearbeiter geprüft — der Prozess dauert länger (von einigen Tagen bis zu mehreren Wochen).',
    step1H3_3: 'Was wählen wir?',
    step1P2: <>Für Iryna wählen wir die erste Option — <strong>mit ID Austria beantragen</strong>. Nach dem Klick leitet dich das System zur Anmeldung über <strong>ID Austria</strong> weiter.</>,
    step1Tip: <><strong>Wichtiger Tipp:</strong> Falls du noch keine ID Austria hast, hol sie dir unbedingt vor Beginn der Anmeldung. Ohne sie wird der Prozess länger und komplizierter.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>📖 Wie man die Austria ID beantragt: Schritt-für-Schritt-Anleitung →</Link></>,
    step1Footer: 'Erste Seite erledigt. Weiter zur zweiten Seite.',
    step2Title: 'Auswahl der Art des Antragstellers',
    step2P1: <>Nach dem Klick auf <strong>„mit ID Austria beantragen"</strong> und der Anmeldung öffnet sich die zweite Seite.</>,
    step2H3_1: 'Fortschrittsanzeige oben auf der Seite',
    step2ProgressLabel: 'Gewerbeanmeldung → Fortschrittsanzeige',
    step2ProgressSteps: ['1 Einstieg', '2 Person', '3 Daten', '4 Optional', '5 Beilagen', '6 Kontrolle', '7 Abschluss'],
    step2P2: <>Das sind die Etappen beim Ausfüllen des Antrags. Du befindest dich gerade bei Schritt <strong>2 Person</strong> (Personendaten).</>,
    step2H3_2: 'Die Hauptfrage: Wer stellt den Antrag?',
    step2P3: 'Hier musst du auswählen, in wessen Namen die Anmeldung erfolgt.',
    step2Opt1: { de: '1. Natürliche Person (auch e.U. = im Firmenbuch eingetragenes Einzelunternehmen)', tr: 'Natürliche Person (auch e.U. — eingetragenes Einzelunternehmen)', desc: '<strong>Das ist deine Option.</strong> Du meldest dich als Privatperson an, die für sich selbst arbeiten möchte. e.U. ist genau das, was Iryna nach der Anmeldung haben wird (Einzelunternehmen).' },
    step2Opt2: { de: '2. Natürliche Person mit Geschäftsführungsbestellung', tr: 'Natürliche Person mit Bestellung zur Geschäftsführung', desc: 'Wird verwendet, wenn du Geschäftsführer:in in einem bereits bestehenden Unternehmen bist (z. B. einer GmbH). <strong>Das trifft auf uns nicht zu.</strong>' },
    step2Opt3: { de: '3. Juristische Person (AG, GmbH, KG, OG, etc.)', tr: 'Juristische Person (AG, GmbH, KG, OG usw.)', desc: 'Das ist für Unternehmen, nicht für eine Einzelperson. <strong>Das brauchen wir nicht.</strong>' },
    step2Info: <>An dieser Stelle kann das System deine Daten (Name, Geburtsdatum) dank ID Austria bereits automatisch übernehmen. Falls etwas nicht übernommen wurde — überprüfe es.</>,
    step2Footer: 'Zweite Seite erledigt! Weiter zur dritten Seite.',
    step3Title: 'Persönliche Daten der Unternehmerin / des Unternehmers',
    step3P1: <>Nach der Anmeldung über ID Austria öffnet das System automatisch den Bereich <strong>Daten</strong>. Die meisten persönlichen Daten sind bereits automatisch übernommen. Du musst sie nur noch <strong>auf Richtigkeit prüfen</strong> und bei Bedarf mit Kontaktinformationen ergänzen.</>,
    step3P2: 'Auf dieser Seite lohnt es sich, nur auf einige wichtige Punkte zu achten.',
    step3H3_1: 'Aufenthalt — Wohnsitz in Österreich',
    step3Quote1: { de: 'Die gewerbeberechtigte Person hat in den letzten fünf Jahren durchgehend in Österreich gewohnt.', tr: '„Hat die Person in den letzten fünf Jahren durchgehend in Österreich gewohnt?"' },
    step3YesLabel: 'Wenn du seit mehr als 5 Jahren in Österreich lebst', step3NoLabel: 'Wenn du vor weniger als 5 Jahren zugezogen bist — unser Fall',
    step3Info1: <>In unserem Beispiel lebt Iryna seit weniger als 5 Jahren in Österreich — wir wählen <strong>Nein</strong>. Das ist normal und kein Problem für die Gewerbeanmeldung. In späteren Schritten kann das System zusätzliche Dokumente verlangen.</>,
    step3H3_2: 'Österreichische Sozialversicherungsnummer',
    step3P3: <>Das ist deine <strong>österreichische Sozialversicherungsnummer</strong>. In den meisten Fällen wird sie automatisch übernommen. Ist das Feld leer, findest du die Nummer auf deiner <strong>e-card</strong> oder in Unterlagen der <strong>ÖGK</strong> oder <strong>SVS</strong>.</>,
    step3H3_3: 'Einzelunternehmen im Firmenbuch eingetragen',
    step3P4: <>Weiter unten siehst du einen Block zur Eintragung im <strong>Firmenbuch</strong> (dem österreichischen Handelsregister).</>,
    step3Info2: <>Wenn du deine Gewerbetätigkeit zum ersten Mal aufnimmst — <strong>lass diesen Block leer</strong>. Das System weist selbst darauf hin:<br /><em>„Bitte nur ausfüllen, wenn bereits eine Firmenbucheintragung besteht."</em><br /><span style={{ color: 'var(--text2)' }}>Fülle ihn nur aus, wenn das Unternehmen bereits im Firmenbuch eingetragen ist. Für die meisten Selbstständigen bleibt dieser Bereich leer.</span></>,
    step3Tip: <>Stelle sicher, dass deine <strong>E-Mail-Adresse</strong> korrekt angegeben ist — dorthin werden Mitteilungen zu deinem Antrag gesendet.</>,
    step3P5: <>Nach der Überprüfung der Daten klicken wir auf <strong>Weiter</strong> und gelangen zum wichtigsten Schritt — der Auswahl der Tätigkeitsart (Gewerbe).</>,
    step3Footer: 'Dritte Seite erledigt! Weiter zur vierten Seite.',
    step4Title: 'Auswahl der Tätigkeitsart und der Geschäftsadresse',
    step4P1: <>Die Seite <strong>Angaben zum Gewerbe</strong> öffnet sich. Genau hier teilen wir dem Staat mit: womit wir uns beschäftigen, ab wann wir beginnen und wo sich unser Unternehmen befindet.</>,
    step4P2: 'Als Beispiel setzen wir die Anmeldung für Iryna fort, die als selbstständige IT-Spezialistin tätig sein wird.',
    step4H3_1: 'Gewerbewortlaut — Art der Tätigkeit',
    step4P3: <>Oben auf der Seite befindet sich das Feld: <strong>Suche nach Gewerbewortlaut</strong>. Gib ein Stichwort ein und klicke auf <strong>„Gewerbewortlaut suchen"</strong>.</>,
    step4P4: 'Für die meisten Programmierer:innen, Webentwickler:innen, IT-Berater:innen, UX/UI-Designer:innen und Fachleute für digitale Technologien passt:',
    step4BoxTitle: 'Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik',
    step4BoxDesc: <>Dienstleistungen im Bereich automatisierte Datenverarbeitung und Informationstechnik • <strong>Freies Gewerbe</strong> — keine Befähigungsprüfung notwendig</>,
    step4P5: <>Nach der Auswahl erscheint die Bezeichnung der Tätigkeit im Feld <strong>„Gefundene Gewerbewortlaute"</strong>.</>,
    step4H3_2: 'Muss die Tätigkeit eingeschränkt werden?',
    step4Quote: { de: 'Möchten Sie den Umfang des Gewerbes einschränken?', tr: '„Möchtest du den Umfang deiner Tätigkeit einschränken?"' },
    step4P6: 'Für die meisten neuen Unternehmer:innen ist das nicht nötig. Iryna möchte künftig verschiedene IT-Dienstleistungen anbieten können, ohne zusätzliche Änderungen an der Anmeldung vorzunehmen. Daher wählen wir:',
    step4YesLabel1: 'Wenn du das Leistungsspektrum bewusst einschränken möchtest', step4NoLabel1: 'Die Standardoption für die meisten Freelancer:innen und Selbstständigen',
    step4H3_3: 'Anmeldung gültig ab — Beginn der Tätigkeit',
    step4P7: <>Standardmäßig schlägt das System das <strong>aktuelle Datum</strong> vor. In unserem Beispiel: <strong>04.06.2026</strong>. Das Datum solltest du nur ändern, wenn du sicher weißt, dass du die Tätigkeit später beginnst.</>,
    step4H3_4: 'Industriebetrieb',
    step4P8: 'Für IT-Spezialist:innen, Freelancer:innen, Designer:innen, Berater:innen und die meisten Selbstständigen wählen wir:',
    step4YesLabel2: 'Produktion, Industrie', step4NoLabel2: 'Für Freelancer:innen und Selbstständige. Dieser Punkt betrifft produzierende Betriebe.',
    step4H3_5: 'Angaben zum Standort — Geschäftsadresse',
    step4Ok: <><strong>Standortadresse erfassen (mit Adressprüfung)</strong> — das System prüft die Adresse automatisch anhand des staatlichen Registers. Wird die Adresse fehlerfrei gefunden, kann der Antrag deutlich schneller bearbeitet werden.</>,
    step4P9: 'Wir füllen die Adressfelder für den Sitz der Tätigkeit aus:',
    step4Fields: [{label:'Postleitzahl', value:'Postleitzahl'},{label:'Ort', value:'Ort'},{label:'Straße', value:'Straßenname'},{label:'Hausnummer', value:'Hausnummer'},{label:'Tür', value:'Wohnungsnummer (falls vorhanden)'}],
    step4Info: <>Da Iryna von zu Hause aus remote arbeitet, gibt sie ihre <strong>tatsächliche Wohnadresse</strong> in Österreich an. Für die meisten Freelancer:innen ist das gängige Praxis und <strong>erfordert kein separates Büro</strong>.</>,
    step4P10: 'Wir überprüfen:',
    step4CheckItems: ['Die Richtigkeit des gewählten Gewerbes', 'Das Datum des Tätigkeitsbeginns', 'Die Geschäftsadresse'],
    step4P11: <>Danach klicken wir auf <strong>Weiter</strong>.</>,
    step4H3_6: 'Bestätigung, dass keine Ausschlussgründe vorliegen',
    step4Opt1: { de: 'Gegen mich liegen keine Gewerbeausschlussgründe vor', tr: 'Es gibt keine Gründe, die mich von der Ausübung einer Gewerbetätigkeit ausschließen', desc: 'Für unser Beispiel wählen wir diese Option.' },
    step4Opt2: { de: 'Mir wurde eine Nachsicht erteilt', desc: 'Wird nur in besonderen Fällen verwendet, wenn eine Person zuvor Einschränkungen bei der Gewerbeausübung hatte, aber eine offizielle Genehmigung erhalten hat. <strong>Nicht unsere Option.</strong>' },
    step4H3_7: 'Eidesstattliche Erklärung',
    step4P12: 'An dieser Stelle bietet das System an, eine offizielle eidesstattliche Erklärung über das Fehlen von Ausschlussgründen für die Gewerbeausübung abzugeben.',
    step4Opt3: { de: 'Ich gebe die Eidesstattliche Erklärung ab', tr: 'Ich gebe die eidesstattliche Erklärung ab', desc: 'Wir empfehlen diese Option — sie bestätigt das Fehlen von Ausschlussgründen ohne zusätzliche Dokumente und <strong>beschleunigt die Bearbeitung des Antrags</strong>.' },
    step4Warning: <>Setze außerdem ein Häkchen bei:<br /><em>„Ich nehme die Aufklärung über den Inhalt der Eidesstattlichen Erklärung und die Konsequenzen von falschen Angaben zur Kenntnis."</em><br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>Das bedeutet, dass du dich über den Inhalt der Erklärung informiert hast und die Verantwortung für falsche Angaben verstehst. <strong>Dieser Punkt muss zur Fortsetzung der Anmeldung bestätigt werden.</strong></span></>,
    step4H3_8: 'Eingabe von Vor- und Nachname — elektronische Unterschrift',
    step4P13: <>Am Ende musst du deinen Vor- und Nachnamen eingeben. Das entspricht einer <strong>elektronischen Unterschrift der Erklärung</strong>.</>,
    step4FieldVorname: { label: 'Vorname', value: 'Iryna' }, step4FieldFamilienname: { label: 'Familienname', value: 'Müller' },
    step4P14: <>Danach klicken wir auf <strong>Weiter</strong> und gelangen zum nächsten Schritt der Anmeldung.</>,
    step5Title: 'Daten überprüfen und Antrag absenden',
    step5P1: <>Auf dieser Seite zeigt das System eine <strong>Zusammenfassung aller Daten</strong>, die du bei der Anmeldung eingegeben hast. Überprüfe sorgfältig:</>,
    step5CheckItems: ['Persönliche Daten und Kontaktinformationen', 'Die gewählte Tätigkeitsart (Gewerbe)', 'Die Geschäftsadresse', 'Das Datum des Tätigkeitsbeginns'],
    step5Info: <>Falls etwas korrigiert werden muss, gehe über den Button <strong>Zurück</strong> oder <strong>Daten bearbeiten</strong> zurück.</>,
    step5P2: <>Sind alle Daten korrekt, klicken wir auf <strong>Senden</strong>. Danach wird der Antrag zur Bearbeitung an die zuständige Behörde übermittelt.</>,
    step5H3: 'Wichtiger Hinweis zu zusätzlichen Unterlagen',
    step5Ok: <>Da wir den Antrag über ID Austria gestellt haben, zeigt das System: <strong>„Es müssen keine Beilagen übermittelt werden."</strong><br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>Das bedeutet: Es müssen keine zusätzlichen Dokumente eingereicht werden.</span></>,
    step5Warning: <>Wenn du jedoch <strong>weniger als 5 Jahre</strong> in Österreich lebst, können die österreichischen Behörden zusätzliche Unterlagen anfordern. Meistens sind das:<ul style={{ margin: '8px 0 0 16px', lineHeight: 1.8 }}><li>ein Führungszeugnis aus dem vorherigen Wohnsitzland;</li><li>Dokumente zur Bestätigung der Identität oder des Wohnsitzes.</li></ul>Wir empfehlen, diese Unterlagen im Voraus vorzubereiten und eine <strong>offizielle deutsche Übersetzung</strong> davon zu haben.</>,
    step6Title: 'Anmeldung abgeschlossen — was nun?',
    step6P1: <>Nach dem Klick auf <strong>Senden</strong> wird dein Antrag an die zuständige Behörde weitergeleitet. Sind alle Daten korrekt ausgefüllt und keine zusätzlichen Unterlagen erforderlich, erhältst du üblicherweise innerhalb weniger Tage eine E-Mail mit der Anmeldebestätigung und deiner <strong>GISA-Nummer</strong>.</>,
    step6P2: <>Nach erfolgreicher Anmeldung erscheint deine Tätigkeit im staatlichen Register <strong>GISA (Gewerbeinformationssystem Austria)</strong>.</>,
    step6H3: 'Wie kann ich die Anmeldung online überprüfen?',
    step6P3: 'Nach der Bearbeitung des Antrags kannst du die Informationen kostenlos über das offizielle GISA-Register überprüfen. Die Suche ist ohne Anmeldung möglich — nach Nachname, GISA-Nummer oder Tätigkeitsart.',
    step6LinkText: '🔍 GISA Abfrage — Anmeldung überprüfen',
    congratsTitle: <>Herzlichen Glückwunsch zur Anmeldung deines <em style={{ fontStyle: 'italic', color: '#FFB899' }}>Gewerbes! 🎉</em></>,
    congratsP: 'Wie du siehst, kannst du eine Gewerbetätigkeit in Österreich über GISA vollständig online anmelden, ohne Behördengänge und Papierkram. Wir hoffen, dass dir diese Schritt-für-Schritt-Anleitung geholfen hat, den gesamten Prozess ohne Stress und Missverständnisse zu durchlaufen.',
    tipFinal: <>Die Gewerbeanmeldung ist nur der erste Schritt. Nach der Aufnahme deiner Tätigkeit erwarten dich: Anmeldung bei der SVS, Schreiben vom Finanzamt, Steuern, Rechnungen, Buchhaltung, Kleinunternehmerregelung, Sozialversicherungsbeiträge und viele weitere Fragen.<br /><br />Deshalb haben wir eine ganze Reihe praktischer Artikel über Selbstständigkeit in Österreich vorbereitet. <strong>Speichere unsere Website als Lesezeichen — wir veröffentlichen regelmäßig neue praktische Anleitungen und erklären komplexe österreichische Regeln in einfacher Sprache.</strong></>,
    nextArticleTitle: '📖 Lies auch → Gewerbeanmeldung in Österreich: die komplette Schritt-für-Schritt-Anleitung',
    nextArticleSub: 'Alles zur Anmeldung der Selbstständigkeit — womit du beginnen solltest',
    summaryTitle: 'Zusammenfassung: was wir gemacht haben',
    summarySteps: ['Auf gisa.gv.at/online-gewerbeanmeldung gegangen','„mit ID Austria beantragen" gewählt — der schnellste Weg','Art des Antragstellers gewählt: Natürliche Person + Ohne Vertretung','Persönliche Daten, Sozialversicherungsnummer, Adresse und E-Mail geprüft','Tätigkeitsart, Startdatum und Geschäftsadresse gewählt. Eidesstattliche Erklärung bestätigt','Alle Daten überprüft und auf Senden geklickt','Bestätigung und GISA-Nummer erhalten 🎉'],
    sourcesLabel: 'Offizielle Quellen',
    sources: [{label:'GISA — Online-Gewerbeanmeldung', href:'https://www.gisa.gv.at/online-gewerbeanmeldung'},{label:'GISA — Anmeldung überprüfen', href:'https://www.gisa.gv.at/abfrage'},{label:'WKO — Gewerbeanmeldung', href:'https://www.wko.at/gruendung/gewerbeanmeldung'}],
    footerNote: 'Dieses Material dient nur zu Informationszwecken und basiert auf den persönlichen Erfahrungen des QLIXA-Teams. Wir empfehlen, die Aktualität der Informationen auf offiziellen staatlichen Websites Österreichs zu überprüfen. Wir wünschen dir viel Erfolg bei deiner Gewerbetätigkeit und viele zufriedene Kund:innen!',
    translationLabel: 'Übersetzung',
  },
}

export default function GisaFormularPage() {
  const [lang, setLang] = useState('UA')

  useEffect(() => {
    const updateLang = () => {
      const l = localStorage.getItem('qlixa-lang')
      if (l) setLang(l.toUpperCase())
    }
    updateLang()
    window.addEventListener('qlixa-lang-change', updateLang)
    return () => window.removeEventListener('qlixa-lang-change', updateLang)
  }, [])

  const t = GISA_TEXT[lang] || GISA_TEXT.UA

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

        {/* Hero */}
        <section style={{ background: '#F0F7F8', padding: '56px clamp(20px,6vw,80px) 40px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' as const }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#038390', background: 'rgba(3,131,144,0.1)', padding: '4px 12px', borderRadius: 999 }}>{t.tag1}</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#595959', background: 'rgba(89,89,89,0.08)', padding: '4px 12px', borderRadius: 999 }}>{t.tag2}</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#595959', background: 'rgba(89,89,89,0.08)', padding: '4px 12px', borderRadius: 999 }}>{t.tag3}</span>
              </div>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 16 }}>
                {t.titleLine1}<br />
                <em style={{ color: '#038390', fontStyle: 'italic' }}>{t.titleEm}</em>
              </h1>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const, fontSize: 15, color: '#595959' }}>
                <span>{t.metaTime}</span>
                <span>{t.metaSteps}</span>
                <span>{t.metaForeigners}</span>
              </div>
            </div>
            <div style={{ flex: '0 0 340px', borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/articles/gisa-cover.jpg" alt="GISA" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
            </div>
          </div>
        </section>

      {/* Body + sidebar */}
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '48px 16px 80px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <ArticleSidebar currentSlug="gisa-formular" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link href="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, color: 'var(--text3)', textDecoration: 'none', marginBottom: 32 }}>{t.backLink}</Link>

          <ArticleTOC items={t.toc} />

          {/* Disclaimer */}
          <div style={{ background: '#FFF8E7', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 12, padding: '16px 20px', marginBottom: 32, fontSize: 15, color: '#404040', lineHeight: 1.6 }}>
            ⚠️ <strong>{lang === 'UA' ? 'Важливо:' : lang === 'RU' ? 'Важно:' : lang === 'DE' ? 'Wichtig:' : 'Important:'}</strong> {t.disclaimer}
          </div>

          {/* Intro */}
          <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 28 }}>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--charcoal)', marginBottom: 10 }}>{t.introP1}</p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--charcoal)' }}>{t.introP2}</p>
          </div>

          {/* STEP 1 */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#038390', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>1</div>
              <h2 id="step1" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>{t.step1Title}</h2>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 12 }}>{t.step1LinkLabel}</p>
              <ExtLink href="https://www.gisa.gv.at/online-gewerbeanmeldung">{t.step1LinkText}</ExtLink>
              <p style={{ fontSize: 15, lineHeight: 1.75, margin: '12px 0 16px' }}>{t.step1P1}</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 10 }}>{t.step1H3_1}</h3>
              <OptionItem {...t.step1Opt1} />
              <OptionItem {...t.step1Opt2} />

              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#038390', margin: '20px 0 10px' }}>{t.step1H3_2}</h3>
              <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr', marginBottom: 16 }}>
                <div style={{ padding: 14, borderRadius: 10, border: '2px solid #038390', background: 'var(--peach-light)' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#038390', marginBottom: 3 }}>{t.step1Way1Title}</div>
                  <div style={{ fontSize: 11, fontStyle: 'italic', color: '#038390', marginBottom: 5 }}>{t.step1Way1Tr}</div>
                  <div style={{ fontSize: 15, color: 'var(--charcoal)', lineHeight: 1.55 }}>{t.step1Way1Desc}</div>
                </div>
                <div style={{ padding: 14, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--gray)' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 3 }}>{t.step1Way2Title}</div>
                  <div style={{ fontSize: 11, fontStyle: 'italic', color: 'var(--text3)', marginBottom: 5 }}>{t.step1Way2Tr}</div>
                  <div style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.55 }}>{t.step1Way2Desc}</div>
                </div>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 10 }}>{t.step1H3_3}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 10 }}>{t.step1P2}</p>
              <NoteBox type="tip">{t.step1Tip}</NoteBox>
              <p style={{ fontSize: 15, color: 'var(--text3)', fontStyle: 'italic', marginTop: 14 }}>{t.step1Footer}</p>
            </div>
          </div>

          {/* STEP 2 */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#038390', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>2</div>
              <h2 id="step2" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>{t.step2Title}</h2>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>{t.step2P1}</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>{t.step2H3_1}</h3>
              <p style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 8 }}>{t.step2ProgressLabel}</p>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' as const, marginBottom: 10 }}>
                {t.step2ProgressSteps.map((s: string, i: number) => (
                  <span key={s} style={{ padding: '5px 10px', borderRadius: 5, fontSize: 11, fontWeight: 600, background: i === 1 ? '#038390' : 'var(--gray)', color: i === 1 ? '#fff' : 'var(--text3)', border: `1px solid ${i === 1 ? '#038390' : 'var(--line)'}` }}>{s}</span>
                ))}
              </div>
              <p style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 16 }}>{t.step2P2}</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#038390', marginBottom: 6 }}>{t.step2H3_2}</h3>
              <p style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 12 }}>{t.step2P3}</p>

              <OptionItem selected {...t.step2Opt1} />
              <OptionItem {...t.step2Opt2} />
              <OptionItem {...t.step2Opt3} />

              <NoteBox type="info">{t.step2Info}</NoteBox>
              <p style={{ fontSize: 15, color: 'var(--text3)', fontStyle: 'italic', marginTop: 14 }}>{t.step2Footer}</p>
            </div>
          </div>

          {/* STEP 3 */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#038390', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>3</div>
              <h2 id="step3" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>{t.step3Title}</h2>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 10 }}>{t.step3P1}</p>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>{t.step3P2}</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>{t.step3H3_1}</h3>
              <QuoteBlock de={t.step3Quote1.de} tr={t.step3Quote1.tr} label={t.translationLabel} />
              <YesNo yesLabel={t.step3YesLabel} noLabel={t.step3NoLabel} selected="nein" />
              <NoteBox type="info">{t.step3Info1}</NoteBox>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 8px' }}>{t.step3H3_2}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 14 }}>{t.step3P3}</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 8px' }}>{t.step3H3_3}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 10 }}>{t.step3P4}</p>
              <NoteBox type="info">{t.step3Info2}</NoteBox>
              <NoteBox type="tip">{t.step3Tip}</NoteBox>

              <p style={{ fontSize: 15, marginTop: 14, marginBottom: 8 }}>{t.step3P5}</p>
              <p style={{ fontSize: 15, color: 'var(--text3)', fontStyle: 'italic' }}>{t.step3Footer}</p>
            </div>
          </div>

          {/* STEP 4 */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#038390', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>4</div>
              <h2 id="step4" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>{t.step4Title}</h2>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 10 }}>{t.step4P1}</p>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>{t.step4P2}</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 10 }}>{t.step4H3_1}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 10 }}>{t.step4P3}</p>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 10 }}>{t.step4P4}</p>
              <div style={{ background: 'var(--peach-light)', borderRadius: 9, padding: '13px 16px', border: '1px solid var(--orange-mid)', marginBottom: 10 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#038390', marginBottom: 4 }}>{t.step4BoxTitle}</div>
                <div style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.5 }}>{t.step4BoxDesc}</div>
              </div>
              <p style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 16 }}>{t.step4P5}</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>{t.step4H3_2}</h3>
              <QuoteBlock de={t.step4Quote.de} tr={t.step4Quote.tr} label={t.translationLabel} />
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 10 }}>{t.step4P6}</p>
              <YesNo yesLabel={t.step4YesLabel1} noLabel={t.step4NoLabel1} selected="nein" />

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 8px' }}>{t.step4H3_3}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 14 }}>{t.step4P7}</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>{t.step4H3_4}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 10 }}>{t.step4P8}</p>
              <YesNo yesLabel={t.step4YesLabel2} noLabel={t.step4NoLabel2} selected="nein" />

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 8px' }}>{t.step4H3_5}</h3>
              <NoteBox type="ok">{t.step4Ok}</NoteBox>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 10 }}>{t.step4P9}</p>
              {t.step4Fields.map((f: any) => <FieldRow key={f.label} label={f.label} value={f.value} />)}
              <NoteBox type="info">{t.step4Info}</NoteBox>

              <p style={{ fontSize: 15, marginTop: 14, marginBottom: 8 }}>{t.step4P10}</p>
              <CheckList items={t.step4CheckItems} />
              <p style={{ fontSize: 15, marginTop: 14 }}>{t.step4P11}</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 8px' }}>{t.step4H3_6}</h3>
              <OptionItem selected {...t.step4Opt1} />
              <OptionItem {...t.step4Opt2} />

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 8px' }}>{t.step4H3_7}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 10 }}>{t.step4P12}</p>
              <OptionItem selected {...t.step4Opt3} />
              <NoteBox type="warning">{t.step4Warning}</NoteBox>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '18px 0 8px' }}>{t.step4H3_8}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 10 }}>{t.step4P13}</p>
              <FieldRow label={t.step4FieldVorname.label} value={t.step4FieldVorname.value} />
              <FieldRow label={t.step4FieldFamilienname.label} value={t.step4FieldFamilienname.value} />
              <p style={{ fontSize: 15, marginTop: 12 }}>{t.step4P14}</p>
            </div>
          </div>

          {/* STEP 5–6 */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#038390', color: '#fff', fontWeight: 700, fontSize: 11, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>5–6</div>
              <h2 id="step5" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>{t.step5Title}</h2>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 14 }}>{t.step5P1}</p>
              <CheckList items={t.step5CheckItems} />
              <NoteBox type="info">{t.step5Info}</NoteBox>
              <p style={{ fontSize: 15, marginTop: 14, marginBottom: 8 }}>{t.step5P2}</p>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 10 }}>{t.step5H3}</h3>
              <NoteBox type="ok">{t.step5Ok}</NoteBox>
              <NoteBox type="warning">{t.step5Warning}</NoteBox>
            </div>
          </div>

          {/* STEP 6 finish */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#038390', color: '#fff', fontWeight: 700, fontSize: 16, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>✓</div>
              <h2 id="step6" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>{t.step6Title}</h2>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 12 }}>{t.step6P1}</p>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>{t.step6P2}</p>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>{t.step6H3}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 10 }}>{t.step6P3}</p>
              <ExtLink href="https://www.gisa.gv.at/abfrage">{t.step6LinkText}</ExtLink>
            </div>
          </div>

          {/* Congrats */}
          <div style={{ background: 'var(--charcoal)', borderRadius: 16, padding: '32px 28px', textAlign: 'center' as const, marginBottom: 24, position: 'relative' as const, overflow: 'hidden' }}>
            <div style={{ position: 'absolute' as const, width: 180, height: 180, borderRadius: '50%', background: '#038390', opacity: 0.07, top: -40, right: -40 }} />
            <div style={{ position: 'relative' as const, zIndex: 1 }}>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 26, color: '#fff', marginBottom: 14, fontWeight: 400 }}>{t.congratsTitle}</h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 500, margin: '0 auto' }}>{t.congratsP}</p>
            </div>
          </div>

          <NoteBox type="tip">{t.tipFinal}</NoteBox>

          <Link href="/articles/gewerbeanmeldung" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 18px', borderRadius: 12, border: '1.5px solid #038390', background: 'var(--peach-light)', textDecoration: 'none', margin: '16px 0' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#038390' }}>{t.nextArticleTitle}</div>
              <div style={{ fontSize: 15, color: 'var(--text2)', marginTop: 2 }}>{t.nextArticleSub}</div>
            </div>
            <span style={{ fontSize: 18, color: '#038390', fontWeight: 700 }}>→</span>
          </Link>

          {/* Summary */}
          <div style={{ background: 'var(--peach-light)', borderRadius: 14, padding: 22, border: '1px solid var(--orange-mid)', marginBottom: 32 }}>
            <h2 id="summary" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>{t.summaryTitle}</h2>
            {t.summarySteps.map((step: string, i: number) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#038390', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                <span style={{ fontSize: 15, color: 'var(--charcoal)', lineHeight: 1.6 }}>{step}</span>
              </div>
            ))}
          </div>

          {/* Sources */}
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 22 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--text3)', marginBottom: 10 }}>{t.sourcesLabel}</p>
            {t.sources.map((s: any) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: 15, color: '#038390', textDecoration: 'none', marginBottom: 6 }}>↗ {s.label}</a>
            ))}
          </div>
          <div style={{ background: 'var(--gray)', borderRadius: 10, padding: '13px 16px', fontSize: 15, color: 'var(--text3)', lineHeight: 1.6, marginTop: 24, border: '1px solid var(--line)' }}>
            {t.footerNote}
          </div>

          <ArticlePrevNext currentSlug="gisa-formular" />
        </div>
      </div>
      <Footer />
    </div>
  )
}
