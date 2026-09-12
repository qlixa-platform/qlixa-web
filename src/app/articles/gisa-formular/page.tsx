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
    titleLine1: 'Як зареєструвати підприємницьку діяльність через GISA:', titleEm: 'покрокова онлайн-інструкція',
    metaTime: '🕐 15 хв читання', metaSteps: '💻 6 кроків', metaForeigners: '🌍 Для іноземців',
    toc: [['#step1','Заходимо на сайт'],['#step2','Тип заявника'],['#step3','Персональні дані'],['#step4','Вид діяльності'],['#step5','Перевірка даних'],['#step6','Реєстрацію завершено'],['#summary','Підсумок']],
    backLink: '← Всі статті',
    disclaimer: 'Матеріал має інформаційний характер і не є юридичною, податковою чи бізнес-консультацією. Інтерфейс GISA та вимоги можуть змінюватися. Перед відправленням заяви перевір актуальні дані в GISA та на офіційних австрійських ресурсах.',
    introP1: <><strong>Gewerbeanmeldung</strong> — так в Австрії називається реєстрація діяльності, яка підпадає під <strong>Gewerbeordnung</strong> (австрійський закон про підприємницьку діяльність). У цій інструкції показано типовий онлайн-процес через <strong>GISA</strong>.</>,
    introP2: <>Ця інструкція показує типовий сценарій онлайн-Gewerbeanmeldung для фізичної особи на прикладі <strong>freies Gewerbe</strong> у сфері IT. Для <strong>reglementierte Gewerbe</strong>, компаній, випадків із <strong>gewerberechtliche Geschäftsführung</strong> або діяльності, що потребує додаткових дозволів, форма та необхідні документи можуть відрізнятися.</>,
    introP3: <>📌 <strong>Приклад:</strong> для прикладу розглянемо фізичну особу, яка реєструє <strong>freies Gewerbe</strong> — вид Gewerbe без обов’язкового <strong>Befähigungsnachweis</strong> (підтвердження професійної кваліфікації) — у сфері IT. Це не те саме, що <strong>freier Beruf</strong> (вільна професія) — це окрема правова категорія.</>,
    precheckTitle: 'Перш ніж почати',
    precheckP: <>Перед подачею заяви варто знати: чи підпадає ваша діяльність під Gewerbeordnung, чи це <strong>freies Gewerbe</strong> чи <strong>reglementiertes Gewerbe</strong>, точний <strong>Gewerbewortlaut</strong> (офіційна назва діяльності) та передбачуваний <strong>Gewerbestandort</strong> (адреса реєстрації діяльності). Для громадян країн поза ЄС/ЄЕП — чи дозволяє ваш статус перебування самозайняту діяльність.</>,
    precheckNote: <><strong>Gewerbeanmeldung сама по собі не створює ані право на проживання, ані право на самозайняту діяльність.</strong> Для громадян третіх країн (Drittstaatsangehörige) для реєстрації Gewerbe зазвичай потрібен відповідний австрійський дозвіл на проживання, який допускає самозайняту діяльність (наприклад, Rot-Weiß-Rot – Karte для самозайнятих ключових фахівців, Daueraufenthalt – EU тощо).</>,
    step1Title: 'Заходимо на сайт',
    step1LinkLabel: 'Перейдіть за посиланням:',
    step1LinkText: '🔗 https://www.gisa.gv.at/online-gewerbeanmeldung',
    step1P1: <>Ви бачите першу сторінку системи <strong>GISA</strong>.</>,
    step1H3_1: 'Детальний розбір першої сторінки',
    step1Opt1: { de: 'GISA Gewerbeinformationssystem Austria', tr: 'Що це?', desc: 'GISA (Gewerbeinformationssystem Austria) — офіційний австрійський реєстр Gewerbeberechtigungen, тобто зареєстрованих прав на здійснення Gewerbe. Через GISA можна, зокрема, подати Gewerbeanmeldung онлайн та перевірити зареєстровані Gewerbe.' },
    step1Opt2: { de: 'Gewerbeanmeldung', tr: 'Що це означає?', desc: 'Це <strong>заява на реєстрацію підприємницької діяльності</strong>. Саме цю заяву ми зараз заповнюємо.' },
    step1H3_2: 'Два способи подання заяви „Mit ID Austria/EU-Login beantragen“ / „Ohne ID Austria/EU-Login beantragen“ — найважливіший вибір',
    step1Way1Title: '„Mit ID Austria/EU-Login beantragen“', step1Way1Tr: 'Переклад: «Подати заяву через ID Austria / EU-Login»',
    step1Way1Desc: <>Подача через <strong>ID Austria / EU-Login</strong> може дозволити безпосередній електронний запис у GISA (GISA-Express), якщо всі необхідні умови можуть бути автоматично перевірені — це стосується особистих заяв без завантаження документів. Якщо це неможливо, заяву передають на опрацювання компетентному <strong>Gewerbebehörde</strong> (компетентному органу).</>,
    step1Way2Title: '„Ohne ID Austria/EU-Login beantragen“', step1Way2Tr: 'Переклад: «Подати заяву без ID Austria / EU-Login»',
    step1Way2Desc: 'Дані вводяться вручну, а безпосередній автоматичний запис у GISA недоступний. Заяву перевірятиме працівник компетентного органу.',
    step1H3_3: 'Що обираємо ми?',
    step1P2: <>Для Ірини обираємо перший варіант — <strong>„Mit ID Austria/EU-Login beantragen“</strong>. Після натискання система перенаправить вас на авторизацію через <strong>ID Austria</strong>.</>,
    step1Tip: <>Подача через ID Austria / EU-Login не є обов’язковою, але дає доступ до варіанту з безпосереднім електронним записом, якщо всі умови автоматично перевіряються. Якщо у вас ще немає ID Austria, її можна оформити заздалегідь.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>📖 Як оформити ID Austria: покроковий гайд →</Link></>,
    step1Footer: 'Готово для першої сторінки. Переходимо на другу сторінку.',
    step2Title: 'Вибір типу заявника',
    step2P1: <>Після натискання <strong>«mit ID Austria beantragen»</strong> і авторизації відкривається друга сторінка.</>,
    step2H3_1: 'Прогрес-бар вгорі сторінки',
    step2ProgressLabel: 'Gewerbeanmeldung → Fortschrittsanzeige',
    step2ProgressSteps: ['1 Einstieg', '2 Person', '3 Daten', '4 Optional', '5 Beilagen', '6 Kontrolle', '7 Abschluss'],
    step2ProgressExplain: 'Einstieg — початок · Person — заявник · Daten — дані · Optional — додаткові дані · Beilagen — додатки / документи · Kontrolle — перевірка · Abschluss — завершення',
    step2P2: <>Це етапи заповнення заяви. Зараз ви на кроці <strong>2 Person</strong> (Дані про особу).</>,
    step2H3_2: 'Головне питання: Wer stellt den Antrag?',
    step2P3: 'Переклад: «Хто подає заяву?» Тут потрібно обрати, від кого саме йде реєстрація.',
    step2Opt1: { de: '1. Natürliche Person (auch e.U. = im Firmenbuch eingetragenes Einzelunternehmen)', tr: 'Фізична особа (в тому числі e.U. — одноосібне підприємство)', desc: '<strong>Natürliche Person</strong> — фізична особа. Це типовий варіант, коли людина реєструє Gewerbe від власного імені, і саме він підходить у нашому прикладі.<br /><br /><strong>e.U.</strong> — eingetragene Unternehmerin / eingetragener Unternehmer, тобто підприємець чи підприємиця, чиє Einzelunternehmen внесене до <strong>Firmenbuch</strong> — австрійського реєстру компаній і зареєстрованих підприємців. Звичайна Gewerbeanmeldung сама по собі не робить підприємця e.U.' },
    step2Opt2: { de: '2. Natürliche Person mit Geschäftsführungsbestellung', tr: 'Фізична особа з призначенням керівника', desc: 'Використовується, коли ви є <strong>gewerberechtliche Geschäftsführung</strong> — відповідальною особою, яка офіційно забезпечує виконання професійних вимог для певного Gewerbe — в уже існуючій компанії (наприклад, GmbH). <strong>Нам це не підходить.</strong>' },
    step2Opt3: { de: '3. Juristische Person (AG, GmbH, KG, OG, etc.)', tr: 'Юридична особа', desc: 'Цей варіант стосується компаній, товариств та об’єднань, а не окремої фізичної особи. <strong>Нам не потрібно.</strong>' },
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
    step3P3: <><strong>Österreichische Sozialversicherungsnummer</strong> — австрійський номер соціального страхування. У багатьох випадках він підтягується автоматично, але так буває не завжди. Якщо поле порожнє — номер можна знайти на вашій <strong>e-card</strong> або в документах від <strong>ÖGK</strong> чи <strong>SVS</strong>.</>,
    step3H3_3: 'Einzelunternehmen im Firmenbuch eingetragen',
    step3P4: <>Нижче ви побачите блок, пов'язаний із реєстрацією у <strong>Firmenbuch</strong> — австрійському реєстрі компаній та підприємців, які підлягають або добровільно пройшли реєстрацію в ньому.</>,
    step3Info2: <>Якщо ви відкриваєте підприємницьку діяльність вперше — цей блок <strong>залишайте порожнім</strong>. Система сама вказує:<br /><em>„Bitte nur ausfüllen, wenn bereits eine Firmenbucheintragung besteht."</em><br /><span style={{ color: 'var(--text2)' }}>Заповнюйте лише якщо підприємство вже зареєстроване у Firmenbuch. Для більшості самозайнятих цей розділ не заповнюється.</span></>,
    step3Tip: <>Переконайтеся, що <strong>електронна пошта</strong> вказана правильно — саме на неї надходитимуть повідомлення щодо вашої заяви.</>,
    step3P5: <>Після перевірки даних натискаємо <strong>Weiter</strong> і переходимо до найважливішого етапу — вибору виду діяльності (Gewerbe).</>,
    step3Footer: 'Готово для третьої сторінки! Переходимо на четверту сторінку.',
    step4Title: 'Вибір виду діяльності та адреси бізнесу',
    step4P1: <>Відкривається сторінка <strong>Angaben zum Gewerbe</strong> (Відомості про підприємницьку діяльність). Саме тут ми повідомляємо державі: чим будемо займатися, з якої дати починаємо, де знаходиться наш бізнес.</>,
    step4P2: 'Для прикладу продовжимо реєстрацію для Ірини, яка працюватиме як самозайнята IT-фахівчиня.',
    step4H3_1: 'Gewerbewortlaut — вид діяльності',
    step4P3: <><strong>Gewerbewortlaut</strong> — офіційна назва виду діяльності, яка буде зазначена у Gewerbeberechtigung. У верхній частині сторінки знаходиться поле: <strong>Suche nach Gewerbewortlaut</strong>. Введіть ключове слово та натисніть <strong>«Gewerbewortlaut suchen»</strong>.</>,
    step4P4: 'Для багатьох видів IT-діяльності може підходити такий Gewerbewortlaut:',
    step4BoxTitle: 'Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik',
    step4BoxDesc: <>«Послуги у сфері автоматизованої обробки даних та інформаційних технологій» • <strong>Freies Gewerbe</strong>. Точний Gewerbewortlaut має відповідати фактичним послугам, які ти надаєш.</>,
    step4P5: <>Після вибору назва діяльності з'явиться у полі <strong>«Gefundene Gewerbewortlaute»</strong>.</>,
    step4H3_2: 'Чи потрібно обмежувати вид діяльності?',
    step4Quote: { de: 'Möchten Sie den Umfang des Gewerbes einschränken?', tr: '«Чи бажаєте ви обмежити обсяг своєї діяльності?»' },
    step4P6: 'Ірина не хоче свідомо звужувати обраний Gewerbewortlaut, тому в цьому прикладі обирається:',
    step4YesLabel1: 'Якщо свідомо хочете звузити перелік послуг', step4NoLabel1: 'У цьому прикладі — Ірина не обмежує обсяг діяльності',
    step4H3_3: 'Anmeldung gültig ab — дата початку діяльності',
    step4P7: <>За замовчуванням система пропонує <strong>поточну дату</strong>. У нашому прикладі: <strong>04.06.2026</strong>. Оберіть фактичну заплановану дату початку — <strong>Gewerbeanmeldung заднім числом неможлива</strong>. Для звичайного Anmeldungsgewerbe (Gewerbe, що реєструється простою заявою) діяльність зазвичай можна розпочинати вже з моменту дійсної реєстрації за виконання всіх умов; для окремих регламентованих видів діяльності потрібно дочекатися відповідного рішення органу.</>,
    step4H3_4: 'Industriebetrieb — Промислове підприємство',
    step4P8: 'Для нашого прикладу IT-Einzelunternehmen це не Industriebetrieb, тому обираємо:',
    step4YesLabel2: 'Виробництво, промисловість', step4NoLabel2: 'У цьому прикладі — не Industriebetrieb. Для інших видів діяльності відповідь залежить від фактичного підприємства.',
    step4H3_5: 'Angaben zum Standort — Gewerbestandort',
    step4Ok: <><strong>Standortadresse erfassen (mit Adressprüfung)</strong> — система перевіряє адресу через державний реєстр (перевірка адреси).</>,
    step4P9: <><strong>Gewerbestandort</strong> — офіційна адреса, за якою зареєстроване Gewerbe. Заповнюємо поля адреси ведення діяльності:</>,
    step4Fields: [{label:'Postleitzahl', value:'Поштовий індекс'},{label:'Ort', value:'Населений пункт'},{label:'Straße', value:'Назва вулиці'},{label:'Hausnummer', value:'Номер будинку'},{label:'Tür', value:'Номер квартири (за наявності)'}],
    step4Info: <>Gewerbestandort може збігатися з домашньою адресою, якщо це допускають вид діяльності, правила використання приміщення та договір оренди або власності. Окремий офіс потрібен не для кожного Gewerbe. Оскільки Ірина працює віддалено з дому — вона вказує свою фактичну адресу проживання в Австрії.</>,
    step4P10: 'Перевіряємо:',
    step4CheckItems: ['Правильність обраного Gewerbe', 'Дату початку діяльності', 'Адресу бізнесу'],
    step4P11: <>Після цього натискаємо <strong>Weiter</strong>.</>,
    step4H3_6: 'Підтвердження відсутності обмежень',
    step4Opt1: { de: 'Gegen mich liegen keine Gewerbeausschlussgründe vor', tr: 'Щодо мене не існує Gewerbeausschlussgründe', desc: '<strong>Gewerbeausschlussgründe</strong> — передбачені законом обставини, через які особа не може отримати або здійснювати Gewerbe. Для нашого прикладу обираємо цей варіант.' },
    step4Opt2: { de: 'Mir wurde eine Nachsicht erteilt', desc: 'Використовується лише в особливих випадках, коли людина раніше мала Gewerbeausschlussgründe, але отримала офіційний дозвіл (Nachsicht). <strong>Не наш варіант.</strong>' },
    step4H3_7: 'Eidesstattliche Erklärung',
    step4P12: <><strong>Eidesstattliche Erklärung</strong> — офіційна декларація під особисту відповідальність, якою заявник підтверджує відсутність Gewerbeausschlussgründe. На цьому етапі система пропонує подати таку декларацію.</>,
    step4Opt3: { de: 'Ich gebe die Eidesstattliche Erklärung ab', tr: 'Я подаю Eidesstattliche Erklärung', desc: 'Дійсна Eidesstattliche Erklärung може слугувати підтвердженням відсутності Gewerbeausschlussgründe за § 13 GewO і за певних умов може замінити окремі документи про несудимість, які інакше знадобилися б для цього підтвердження — але не замінює всі можливі додатки до заяви.' },
    step4Warning: <>Також поставте галочку біля пункту:<br /><em>„Ich nehme die Aufklärung über den Inhalt der Eidesstattlichen Erklärung und die Konsequenzen von falschen Angaben zur Kenntnis."</em><br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>Це означає, що ви ознайомилися зі змістом декларації та розумієте відповідальність за надання неправдивої інформації. <strong>Для продовження реєстрації цей пункт необхідно підтвердити.</strong></span></>,
    step4FalseDeclarationWarning: <>Подавати Eidesstattliche Erklärung слід лише тоді, коли зазначені дані точно відповідають дійсності. Неправдива декларація може мати серйозні правові наслідки: анулювання Gewerbeberechtigung, п’ятирічну заборону на ведення Gewerbe без можливості Nachsicht, а також можливу кримінальну відповідальність.</>,
    step4H3_8: 'Введення імені та прізвища',
    step4P13: <>Наприкінці потрібно ввести своє ім'я та прізвище так, як цього вимагає форма для підтвердження декларації.</>,
    step4FieldVorname: { label: 'Vorname', value: 'Ірина' }, step4FieldFamilienname: { label: 'Familienname', value: 'Müller' },
    step4P14: <>Після цього натискаємо <strong>Weiter</strong> та переходимо до наступного етапу реєстрації.</>,
    step5Title: 'Перевірка даних та відправка заяви',
    step5P1: <>На цій сторінці система показує <strong>підсумок усіх даних</strong>, які ви внесли під час реєстрації. Уважно перевірте:</>,
    step5CheckItems: ['Особисті дані та контактну інформацію', 'Обраний вид діяльності (Gewerbe)', 'Адресу ведення діяльності', 'Дату початку діяльності'],
    step5Info: <>Якщо потрібно щось виправити, повертайтеся за допомогою кнопки <strong>Zurück</strong> («Назад») або <strong>Daten bearbeiten</strong> («Редагувати дані»).</>,
    step5P2: <>Якщо всі дані вказані правильно, натискаємо <strong>Senden</strong> («Надіслати»). Після цього заява буде надіслана до компетентного органу для обробки.</>,
    step5H3: 'Важливо щодо додаткових документів',
    step5Ok: <><strong>Beilagen</strong> — додатки або документи до заяви. У нашому прикладі система може показати <strong>„Es müssen keine Beilagen übermittelt werden.“</strong> — «Додаткові документи подавати не потрібно».<br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>Це стосується саме цієї заяви на цьому етапі. Для іншого Gewerbe, статусу перебування або іншої ситуації перелік документів може відрізнятися.</span></>,
    step5Warning: <>Якщо ви проживаєте в Австрії <strong>менше 5 років</strong>, австрійські органи можуть запросити додаткові документи. Найчастіше це:<ul style={{ margin: '8px 0 0 16px', lineHeight: 1.8 }}><li><strong>Strafregisterbescheinigung</strong> (довідка про наявність / відсутність судимостей) з країни попереднього проживання — зазвичай не старша трьох місяців;</li><li>документи, що підтверджують особу або місце проживання.</li></ul>Рекомендуємо заздалегідь підготувати ці документи; переклад окремих документів може знадобитися залежно від конкретного випадку.</>,
    step6Title: 'Заяву надіслано — що далі?',
    step6P1: <>Після натискання кнопки <strong>Senden</strong> система показує, чи відбувся безпосередній електронний запис у GISA, чи заяву передано на опрацювання компетентному <strong>Gewerbebehörde</strong> (компетентному органу, який опрацьовує Gewerbeanmeldung). Якщо реєстрація підтверджена, ви отримаєте свій <strong>GISA-Zahl</strong> — реєстраційний номер Gewerbe у системі GISA.</>,
    step6P2: <>Після успішної реєстрації ваша діяльність з'явиться в державному реєстрі <strong>GISA (Gewerbeinformationssystem Austria)</strong>.</>,
    step6H3: 'Як перевірити реєстрацію онлайн?',
    step6P3: <>Інформацію можна безкоштовно перевірити через офіційний публічний GISA-Abfrage — пошук за назвою підприємства, GISA-Zahl або Gewerbewortlaut. Результат — це, по суті, <strong>GISA-Auszug</strong>, офіційний витяг із реєстру GISA.</>,
    step6LinkText: '🔍 GISA Abfrage — перевірити реєстрацію',
    congratsTitle: <>Вітаємо з реєстрацією <em style={{ fontStyle: 'italic', color: '#FFB899' }}>Gewerbe! 🎉</em></>,
    congratsP: 'Для багатьох Gewerbeanmeldungen процес можна пройти онлайн через GISA. Чи знадобляться додаткові документи або опрацювання компетентним органом, залежить від виду Gewerbe та конкретної ситуації.',
    tipFinal: <>Після Gewerbeanmeldung варто перевірити подальші податкові та соціально-страхові кроки, зокрема свої дані у <strong>SVS</strong> та <strong>Finanzamt Österreich</strong> — податки, рахунки-фактури, бухгалтерія, Kleinunternehmerregelung та інші питання.<br /><br />Саме тому ми підготували серію практичних статей про самозайнятість в Австрії.</>,
    nextArticleTitle: '📖 Читайте також → Gewerbeanmeldung в Австрії: повний покроковий гайд',
    nextArticleSub: 'Все про реєстрацію самозайнятості — з чого починати',
    summaryTitle: 'Підсумок: що ми зробили',
    summarySteps: ['Відкрили актуальну форму Gewerbeanmeldung у GISA','Обрали подачу через ID Austria / EU-Login («Mit ID Austria/EU-Login beantragen»)','Обрали правильний тип заявника (Natürliche Person)','Перевірили особисті дані та питання щодо проживання в Австрії','Обрали точний Gewerbewortlaut, дату початку та Gewerbestandort','Заповнили Eidesstattliche Erklärung та перевірили заяву','Надіслали заяву та перевірили, чи відбувся безпосередній запис у GISA або заяву передано компетентному органу'],
    sourcesLabel: 'Офіційні джерела',
    sources: [
      {label:'GISA — Online-Gewerbeanmeldung', href:'https://www.gisa.gv.at/online-gewerbeanmeldung'},
      {label:'GISA — публічна GISA-Abfrage', href:'https://www.gisa.gv.at/abfrage'},
      {label:'oesterreich.gv.at — GISA / Gewerbeinformationssystem Austria', href:'https://www.oesterreich.gv.at/de/lexicon/G/Seite.991380'},
      {label:'USP — Gewerbeanmeldung', href:'https://www.usp.gv.at/gruendung/EAP/gewerbeanmeldung.html'},
      {label:'WKO — Gewerbeanmeldung', href:'https://www.wko.at/gruendung/gewerbeanmeldung'},
      {label:'WKO — Voraussetzungen für die Gewerbeberechtigung', href:'https://www.wko.at/gruendung/voraussetzungen-faq'},
      {label:'WKO — Eidesstattliche Erklärung im Gewerbeverfahren', href:'https://www.wko.at/gewerberecht/eidesstattliche-erklaerung-im-gewerbeverfahren'},
      {label:'USP — Firmenbuch-Eintragung Einzelunternehmen', href:'https://startup.usp.gv.at/gruendung/gruendungsfahrplan/weitere-informationen/firmenbuch-eintragung-einzelunternehmen'},
    ],
    footerNote: 'Цей матеріал має інформаційний характер і ґрунтується на публічно доступних офіційних джерелах. Актуальність інформації рекомендуємо перевіряти на офіційних державних сайтах Австрії.',
    translationLabel: 'Переклад',
  },
  RU: {
    tag1: 'GISA · Регистрация', tag2: '6 шагов', tag3: 'Для иностранцев',
    titleLine1: 'Как зарегистрировать предпринимательскую деятельность через GISA:', titleEm: 'пошаговая онлайн-инструкция',
    metaTime: '🕐 15 мин чтения', metaSteps: '💻 6 шагов', metaForeigners: '🌍 Для иностранцев',
    toc: [['#step1','Заходим на сайт'],['#step2','Тип заявителя'],['#step3','Персональные данные'],['#step4','Вид деятельности'],['#step5','Проверка данных'],['#step6','Регистрация завершена'],['#summary','Итог']],
    backLink: '← Все статьи',
    disclaimer: 'Материал носит информационный характер и не является юридической, налоговой или бизнес-консультацией. Интерфейс GISA и требования могут меняться. Перед отправкой заявления проверь актуальную информацию в GISA и на официальных австрийских ресурсах.',
    introP1: <><strong>Gewerbeanmeldung</strong> — так в Австрии называется регистрация деятельности, которая подпадает под <strong>Gewerbeordnung</strong> (австрийский закон о предпринимательской деятельности). В этой инструкции показан типичный онлайн-процесс через <strong>GISA</strong>.</>,
    introP2: <>Эта инструкция показывает типичный процесс онлайн-Gewerbeanmeldung для физического лица на примере <strong>freies Gewerbe</strong> в сфере IT. Для <strong>регламентированных Gewerbe</strong>, компаний, случаев с <strong>gewerberechtliche Geschäftsführung</strong> или деятельности, требующей дополнительных разрешений, форма и необходимые документы могут отличаться.</>,
    introP3: <>📌 <strong>Пример:</strong> для примера рассмотрим физическое лицо, которое регистрирует <strong>freies Gewerbe</strong> — вид Gewerbe без обязательного <strong>Befähigungsnachweis</strong> (подтверждения профессиональной квалификации) — в сфере IT. Это не то же самое, что <strong>freier Beruf</strong> (свободная профессия) — это отдельная правовая категория.</>,
    precheckTitle: 'Прежде чем начать',
    precheckP: <>Перед подачей заявления стоит знать: подпадает ли ваша деятельность под Gewerbeordnung, это <strong>freies Gewerbe</strong> или <strong>reglementiertes Gewerbe</strong>, точный <strong>Gewerbewortlaut</strong> (официальное название деятельности) и предполагаемый <strong>Gewerbestandort</strong> (адрес регистрации деятельности). Для граждан стран вне ЕС/ЕЭП — допускает ли ваш статус пребывания самозанятую деятельность.</>,
    precheckNote: <><strong>Gewerbeanmeldung сама по себе не создаёт ни право на проживание, ни право на самозанятую деятельность.</strong> Для граждан третьих стран (Drittstaatsangehörige) для регистрации Gewerbe обычно нужен соответствующий австрийский вид на жительство, допускающий самозанятую деятельность (например, Rot-Weiß-Rot – Karte для самозанятых ключевых специалистов, Daueraufenthalt – EU и т. д.).</>,
    step1Title: 'Заходим на сайт',
    step1LinkLabel: 'Перейдите по ссылке:',
    step1LinkText: '🔗 https://www.gisa.gv.at/online-gewerbeanmeldung',
    step1P1: <>Вы видите первую страницу системы <strong>GISA</strong>.</>,
    step1H3_1: 'Подробный разбор первой страницы',
    step1Opt1: { de: 'GISA Gewerbeinformationssystem Austria', tr: 'Что это?', desc: 'GISA (Gewerbeinformationssystem Austria) — официальный австрийский реестр Gewerbeberechtigungen, то есть зарегистрированных прав на ведение Gewerbe. Через GISA можно, в частности, подать Gewerbeanmeldung онлайн и проверить зарегистрированные Gewerbe.' },
    step1Opt2: { de: 'Gewerbeanmeldung', tr: 'Что это означает?', desc: 'Это <strong>заявление на регистрацию предпринимательской деятельности</strong>. Именно это заявление мы сейчас заполняем.' },
    step1H3_2: 'Два способа подачи заявления „Mit ID Austria/EU-Login beantragen“ / „Ohne ID Austria/EU-Login beantragen“ — самый важный выбор',
    step1Way1Title: '„Mit ID Austria/EU-Login beantragen“', step1Way1Tr: 'Перевод: «Подать заявление через ID Austria / EU-Login»',
    step1Way1Desc: <>Подача через <strong>ID Austria / EU-Login</strong> может позволить непосредственную электронную запись в GISA (GISA-Express), если все необходимые условия могут быть автоматически проверены — это касается личных заявлений без загрузки документов. Если это невозможно, заявление передают на рассмотрение компетентному <strong>Gewerbebehörde</strong> (компетентному органу).</>,
    step1Way2Title: '„Ohne ID Austria/EU-Login beantragen“', step1Way2Tr: 'Перевод: «Подать заявление без ID Austria / EU-Login»',
    step1Way2Desc: 'Данные вводятся вручную, а непосредственная автоматическая запись в GISA недоступна. Заявление будет проверять сотрудник компетентного органа.',
    step1H3_3: 'Что выбираем мы?',
    step1P2: <>Для Ирины выбираем первый вариант — <strong>„Mit ID Austria/EU-Login beantragen“</strong>. После нажатия система перенаправит вас на авторизацию через <strong>ID Austria</strong>.</>,
    step1Tip: <>Подача через ID Austria / EU-Login не обязательна, но даёт доступ к варианту с непосредственной электронной записью, если все условия проверяются автоматически. Если у вас ещё нет ID Austria, её можно оформить заранее.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>📖 Как оформить ID Austria: пошаговый гайд →</Link></>,
    step1Footer: 'Готово с первой страницей. Переходим ко второй странице.',
    step2Title: 'Выбор типа заявителя',
    step2P1: <>После нажатия <strong>«mit ID Austria beantragen»</strong> и авторизации открывается вторая страница.</>,
    step2H3_1: 'Прогресс-бар вверху страницы',
    step2ProgressLabel: 'Gewerbeanmeldung → Fortschrittsanzeige',
    step2ProgressSteps: ['1 Einstieg', '2 Person', '3 Daten', '4 Optional', '5 Beilagen', '6 Kontrolle', '7 Abschluss'],
    step2ProgressExplain: 'Einstieg — начало · Person — заявитель · Daten — данные · Optional — дополнительные данные · Beilagen — приложения / документы · Kontrolle — проверка · Abschluss — завершение',
    step2P2: <>Это этапы заполнения заявления. Сейчас вы на шаге <strong>2 Person</strong> (Данные о лице).</>,
    step2H3_2: 'Главный вопрос: Wer stellt den Antrag?',
    step2P3: 'Перевод: «Кто подаёт заявление?» Здесь нужно выбрать, от кого именно идёт регистрация.',
    step2Opt1: { de: '1. Natürliche Person (auch e.U. = im Firmenbuch eingetragenes Einzelunternehmen)', tr: 'Физическое лицо (в том числе e.U. — единоличное предприятие)', desc: '<strong>Natürliche Person</strong> — физическое лицо. Это типичный вариант, когда человек регистрирует Gewerbe от собственного имени, и именно он подходит в нашем примере.<br /><br /><strong>e.U.</strong> — eingetragene Unternehmerin / eingetragener Unternehmer, то есть предприниматель или предпринимательница, чьё Einzelunternehmen внесено в <strong>Firmenbuch</strong> — австрийский реестр компаний и зарегистрированных предпринимателей. Обычная Gewerbeanmeldung сама по себе не делает предпринимателя e.U.' },
    step2Opt2: { de: '2. Natürliche Person mit Geschäftsführungsbestellung', tr: 'Физическое лицо с назначением руководителя', desc: 'Используется, когда вы являетесь <strong>gewerberechtliche Geschäftsführung</strong> — ответственным лицом, которое официально обеспечивает выполнение профессиональных требований для определённого Gewerbe — в уже существующей компании (например, GmbH). <strong>Нам это не подходит.</strong>' },
    step2Opt3: { de: '3. Juristische Person (AG, GmbH, KG, OG, etc.)', tr: 'Юридическое лицо', desc: 'Этот вариант касается компаний, товариществ и объединений, а не отдельного физического лица. <strong>Нам не нужно.</strong>' },
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
    step3P3: <><strong>Österreichische Sozialversicherungsnummer</strong> — австрийский номер социального страхования. Во многих случаях он подтягивается автоматически, но так бывает не всегда. Если поле пустое — номер можно найти на вашей <strong>e-card</strong> или в документах от <strong>ÖGK</strong> или <strong>SVS</strong>.</>,
    step3H3_3: 'Einzelunternehmen im Firmenbuch eingetragen',
    step3P4: <>Ниже вы увидите блок, связанный с регистрацией в <strong>Firmenbuch</strong> — австрийском реестре компаний и предпринимателей, которые подлежат или добровольно прошли регистрацию в нём.</>,
    step3Info2: <>Если вы открываете предпринимательскую деятельность впервые — этот блок <strong>оставляйте пустым</strong>. Система сама указывает:<br /><em>„Bitte nur ausfüllen, wenn bereits eine Firmenbucheintragung besteht."</em><br /><span style={{ color: 'var(--text2)' }}>Заполняйте только если предприятие уже зарегистрировано в Firmenbuch. Для большинства самозанятых этот раздел не заполняется.</span></>,
    step3Tip: <>Убедитесь, что <strong>электронная почта</strong> указана правильно — именно на неё будут приходить уведомления по вашему заявлению.</>,
    step3P5: <>После проверки данных нажимаем <strong>Weiter</strong> и переходим к самому важному этапу — выбору вида деятельности (Gewerbe).</>,
    step3Footer: 'Готово с третьей страницей! Переходим к четвёртой странице.',
    step4Title: 'Выбор вида деятельности и адреса бизнеса',
    step4P1: <>Открывается страница <strong>Angaben zum Gewerbe</strong> (Сведения о предпринимательской деятельности). Именно здесь мы сообщаем государству: чем будем заниматься, с какой даты начинаем, где находится наш бизнес.</>,
    step4P2: 'Для примера продолжим регистрацию для Ирины, которая будет работать как самозанятая IT-специалистка.',
    step4H3_1: 'Gewerbewortlaut — вид деятельности',
    step4P3: <><strong>Gewerbewortlaut</strong> — официальная формулировка зарегистрированного вида деятельности, которая будет указана в Gewerbeberechtigung. В верхней части страницы находится поле: <strong>Suche nach Gewerbewortlaut</strong>. Введите ключевое слово и нажмите <strong>«Gewerbewortlaut suchen»</strong>.</>,
    step4P4: 'Для многих видов IT-деятельности может подходить такой Gewerbewortlaut:',
    step4BoxTitle: 'Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik',
    step4BoxDesc: <>«Услуги в сфере автоматизированной обработки данных и информационных технологий» • <strong>Freies Gewerbe</strong>. Точный Gewerbewortlaut должен соответствовать фактически оказываемым услугам.</>,
    step4P5: <>После выбора название деятельности появится в поле <strong>«Gefundene Gewerbewortlaute»</strong>.</>,
    step4H3_2: 'Нужно ли ограничивать вид деятельности?',
    step4Quote: { de: 'Möchten Sie den Umfang des Gewerbes einschränken?', tr: '«Хотите ли вы ограничить объём своей деятельности?»' },
    step4P6: 'Ирина не хочет сознательно сужать выбранный Gewerbewortlaut, поэтому в этом примере выбираем:',
    step4YesLabel1: 'Если сознательно хотите сузить перечень услуг', step4NoLabel1: 'В этом примере — Ирина не ограничивает объём деятельности',
    step4H3_3: 'Anmeldung gültig ab — дата начала деятельности',
    step4P7: <>По умолчанию система предлагает <strong>текущую дату</strong>. В нашем примере: <strong>04.06.2026</strong>. Укажи фактическую планируемую дату начала — <strong>зарегистрировать Gewerbe задним числом нельзя</strong>. Для обычного Anmeldungsgewerbe (Gewerbe, регистрируемого простым заявлением) деятельность обычно можно начинать уже с момента действительной регистрации при выполнении всех условий; для отдельных регламентированных видов деятельности нужно дождаться соответствующего решения органа.</>,
    step4H3_4: 'Industriebetrieb — Промышленное предприятие',
    step4P8: 'Для нашего примера IT-Einzelunternehmen это не Industriebetrieb, поэтому выбираем:',
    step4YesLabel2: 'Производство, промышленность', step4NoLabel2: 'В этом примере — не Industriebetrieb. Для других видов деятельности ответ зависит от фактического предприятия.',
    step4H3_5: 'Angaben zum Standort — Gewerbestandort',
    step4Ok: <><strong>Standortadresse erfassen (mit Adressprüfung)</strong> — система проверяет адрес через государственный реестр (проверка адреса).</>,
    step4P9: <><strong>Gewerbestandort</strong> — официальный адрес, по которому зарегистрировано Gewerbe. Заполняем поля адреса ведения деятельности:</>,
    step4Fields: [{label:'Postleitzahl', value:'Почтовый индекс'},{label:'Ort', value:'Населённый пункт'},{label:'Straße', value:'Название улицы'},{label:'Hausnummer', value:'Номер дома'},{label:'Tür', value:'Номер квартиры (при наличии)'}],
    step4Info: <>Gewerbestandort может совпадать с домашним адресом, если это допускают вид деятельности, правила использования помещения и договор аренды или собственности. Отдельный офис требуется не для каждого Gewerbe. Поскольку Ирина работает удалённо из дома — она указывает свой фактический адрес проживания в Австрии.</>,
    step4P10: 'Проверяем:',
    step4CheckItems: ['Правильность выбранного Gewerbe', 'Дату начала деятельности', 'Адрес бизнеса'],
    step4P11: <>После этого нажимаем <strong>Weiter</strong>.</>,
    step4H3_6: 'Подтверждение отсутствия ограничений',
    step4Opt1: { de: 'Gegen mich liegen keine Gewerbeausschlussgründe vor', tr: 'В отношении меня не существует Gewerbeausschlussgründe', desc: '<strong>Gewerbeausschlussgründe</strong> — предусмотренные законом обстоятельства, из-за которых лицо не может получить или вести Gewerbe. Для нашего примера выбираем этот вариант.' },
    step4Opt2: { de: 'Mir wurde eine Nachsicht erteilt', desc: 'Используется только в особых случаях, когда у человека ранее были Gewerbeausschlussgründe, но он получил официальное разрешение (Nachsicht). <strong>Не наш вариант.</strong>' },
    step4H3_7: 'Eidesstattliche Erklärung',
    step4P12: <><strong>Eidesstattliche Erklärung</strong> — официальная декларация под личную ответственность, которой заявитель подтверждает отсутствие Gewerbeausschlussgründe. На этом этапе система предлагает подать такую декларацию.</>,
    step4Opt3: { de: 'Ich gebe die Eidesstattliche Erklärung ab', tr: 'Я подаю Eidesstattliche Erklärung', desc: 'Действительная Eidesstattliche Erklärung может служить подтверждением отсутствия Gewerbeausschlussgründe по § 13 GewO и при определённых условиях может заменить отдельные документы о несудимости, которые иначе понадобились бы для этого подтверждения — но не заменяет все возможные приложения к заявлению.' },
    step4Warning: <>Также поставьте галочку рядом с пунктом:<br /><em>„Ich nehme die Aufklärung über den Inhalt der Eidesstattlichen Erklärung und die Konsequenzen von falschen Angaben zur Kenntnis."</em><br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>Это означает, что вы ознакомились с содержанием декларации и понимаете ответственность за предоставление ложной информации. <strong>Для продолжения регистрации этот пункт необходимо подтвердить.</strong></span></>,
    step4FalseDeclarationWarning: <>Подавать Eidesstattliche Erklärung следует только тогда, когда указанные данные точно соответствуют действительности. Ложная декларация может иметь серьёзные правовые последствия: аннулирование Gewerbeberechtigung, пятилетний запрет на ведение Gewerbe без возможности Nachsicht, а также возможную уголовную ответственность.</>,
    step4H3_8: 'Ввод имени и фамилии',
    step4P13: <>В конце нужно ввести своё имя и фамилию так, как этого требует форма для подтверждения декларации.</>,
    step4FieldVorname: { label: 'Vorname', value: 'Ирина' }, step4FieldFamilienname: { label: 'Familienname', value: 'Müller' },
    step4P14: <>После этого нажимаем <strong>Weiter</strong> и переходим к следующему этапу регистрации.</>,
    step5Title: 'Проверка данных и отправка заявления',
    step5P1: <>На этой странице система показывает <strong>итог всех данных</strong>, которые вы внесли во время регистрации. Внимательно проверьте:</>,
    step5CheckItems: ['Личные данные и контактную информацию', 'Выбранный вид деятельности (Gewerbe)', 'Адрес ведения деятельности', 'Дату начала деятельности'],
    step5Info: <>Если нужно что-то исправить, возвращайтесь с помощью кнопки <strong>Zurück</strong> («Назад») или <strong>Daten bearbeiten</strong> («Редактировать данные»).</>,
    step5P2: <>Если все данные указаны правильно, нажимаем <strong>Senden</strong> («Отправить»). После этого заявление будет отправлено в компетентный орган для обработки.</>,
    step5H3: 'Важно насчёт дополнительных документов',
    step5Ok: <><strong>Beilagen</strong> — приложения или документы к заявлению. В нашем примере система может показать <strong>„Es müssen keine Beilagen übermittelt werden.“</strong> — «Дополнительные документы подавать не нужно».<br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>Это касается именно этого заявления на этом этапе. Для другого Gewerbe, статуса пребывания или иной ситуации перечень документов может отличаться.</span></>,
    step5Warning: <>Если вы проживаете в Австрии <strong>менее 5 лет</strong>, австрийские органы могут запросить дополнительные документы. Чаще всего это:<ul style={{ margin: '8px 0 0 16px', lineHeight: 1.8 }}><li><strong>Strafregisterbescheinigung</strong> (справка о наличии / отсутствии судимости) из страны предыдущего проживания — обычно не старше трёх месяцев;</li><li>документы, подтверждающие личность или место жительства.</li></ul>Рекомендуем заранее подготовить эти документы; перевод отдельных документов может понадобиться в зависимости от конкретного случая.</>,
    step6Title: 'Заявление отправлено — что дальше?',
    step6P1: <>После нажатия кнопки <strong>Senden</strong> система показывает, произошла ли непосредственная электронная запись в GISA, или заявление передано на рассмотрение компетентному <strong>Gewerbebehörde</strong> (компетентному органу, который рассматривает Gewerbeanmeldung). Если регистрация подтверждена, вы получите свой <strong>GISA-Zahl</strong> — регистрационный номер Gewerbe в системе GISA.</>,
    step6P2: <>После успешной регистрации ваша деятельность появится в государственном реестре <strong>GISA (Gewerbeinformationssystem Austria)</strong>.</>,
    step6H3: 'Как проверить регистрацию онлайн?',
    step6P3: <>Информацию можно бесплатно проверить через официальную публичную GISA-Abfrage — поиск по названию предприятия, GISA-Zahl или Gewerbewortlaut. Результат — это, по сути, <strong>GISA-Auszug</strong>, официальная выписка из реестра GISA.</>,
    step6LinkText: '🔍 GISA Abfrage — проверить регистрацию',
    congratsTitle: <>Поздравляем с регистрацией <em style={{ fontStyle: 'italic', color: '#FFB899' }}>Gewerbe! 🎉</em></>,
    congratsP: 'Для многих Gewerbeanmeldungen процесс можно пройти онлайн через GISA. Нужны ли дополнительные документы или обработка компетентным органом, зависит от вида Gewerbe и конкретной ситуации.',
    tipFinal: <>После Gewerbeanmeldung стоит проверить дальнейшие налоговые и социально-страховые шаги, в том числе свои данные в <strong>SVS</strong> и <strong>Finanzamt Österreich</strong> — налоги, счета-фактуры, бухгалтерия, Kleinunternehmerregelung и другие вопросы.<br /><br />Именно поэтому мы подготовили серию практических статей о самозанятости в Австрии.</>,
    nextArticleTitle: '📖 Читайте также → Gewerbeanmeldung в Австрии: полный пошаговый гайд',
    nextArticleSub: 'Всё о регистрации самозанятости — с чего начинать',
    summaryTitle: 'Итог: что мы сделали',
    summarySteps: ['Открыли актуальную форму Gewerbeanmeldung в GISA','Выбрали подачу через ID Austria / EU-Login («Mit ID Austria/EU-Login beantragen»)','Выбрали правильный тип заявителя (Natürliche Person)','Проверили личные данные и вопрос о проживании в Австрии','Выбрали точный Gewerbewortlaut, дату начала и Gewerbestandort','Заполнили Eidesstattliche Erklärung и проверили заявление','Отправили заявление и проверили, произошла ли непосредственная запись в GISA или заявление передано компетентному органу'],
    sourcesLabel: 'Официальные источники',
    sources: [
      {label:'GISA — Online-Gewerbeanmeldung', href:'https://www.gisa.gv.at/online-gewerbeanmeldung'},
      {label:'GISA — публичная GISA-Abfrage', href:'https://www.gisa.gv.at/abfrage'},
      {label:'oesterreich.gv.at — GISA / Gewerbeinformationssystem Austria', href:'https://www.oesterreich.gv.at/de/lexicon/G/Seite.991380'},
      {label:'USP — Gewerbeanmeldung', href:'https://www.usp.gv.at/gruendung/EAP/gewerbeanmeldung.html'},
      {label:'WKO — Gewerbeanmeldung', href:'https://www.wko.at/gruendung/gewerbeanmeldung'},
      {label:'WKO — Voraussetzungen für die Gewerbeberechtigung', href:'https://www.wko.at/gruendung/voraussetzungen-faq'},
      {label:'WKO — Eidesstattliche Erklärung im Gewerbeverfahren', href:'https://www.wko.at/gewerberecht/eidesstattliche-erklaerung-im-gewerbeverfahren'},
      {label:'USP — Firmenbuch-Eintragung Einzelunternehmen', href:'https://startup.usp.gv.at/gruendung/gruendungsfahrplan/weitere-informationen/firmenbuch-eintragung-einzelunternehmen'},
    ],
    footerNote: 'Этот материал носит информационный характер и основан на публично доступных официальных источниках. Актуальность информации рекомендуем проверять на официальных государственных сайтах Австрии.',
    translationLabel: 'Перевод',
  },
  EN: {
    tag1: 'GISA · Registration', tag2: '6 steps', tag3: 'For foreigners',
    titleLine1: 'How to Register a Business Activity via GISA:', titleEm: 'Step-by-Step Online Guide',
    metaTime: '🕐 15 min read', metaSteps: '💻 6 steps', metaForeigners: '🌍 For foreigners',
    toc: [['#step1','Go to the website'],['#step2','Applicant type'],['#step3','Personal data'],['#step4','Type of activity'],['#step5','Reviewing your data'],['#step6','Registration complete'],['#summary','Summary']],
    backLink: '← All articles',
    disclaimer: 'This material is for informational purposes only and does not constitute legal, tax or business advice. The GISA interface and requirements may change. Before submitting an application, check the current information in GISA and on official Austrian sources.',
    introP1: <><strong>Gewerbeanmeldung</strong> is the Austrian procedure for registering an activity that is subject to the <strong>Gewerbeordnung</strong> (the Austrian trade code). This guide shows a typical online process through <strong>GISA</strong>.</>,
    introP2: <>This guide shows a typical online Gewerbeanmeldung for a natural person using an IT <strong>freies Gewerbe</strong> as an example. The form and required documents may differ for <strong>regulated trades</strong>, companies, cases involving a <strong>gewerberechtliche Geschäftsführung</strong>, or activities requiring additional permits.</>,
    introP3: <>📌 <strong>Example:</strong> for this example, we use a natural person registering an IT <strong>freies Gewerbe</strong> — a trade that does not require a specific <strong>Befähigungsnachweis</strong> (proof of professional qualification). This is not the same as a <strong>freier Beruf</strong> (liberal profession) — that is a separate legal category.</>,
    precheckTitle: 'Before you start',
    precheckP: <>Before submitting an application, it helps to know: whether your activity is subject to the Gewerbeordnung, whether it\u2019s a <strong>freies Gewerbe</strong> or a <strong>reglementiertes Gewerbe</strong>, the exact <strong>Gewerbewortlaut</strong> (official wording of the activity), and the intended <strong>Gewerbestandort</strong> (registered business address). For citizens of non-EU/EEA countries: whether your residence status permits self-employed activity.</>,
    precheckNote: <><strong>Gewerbeanmeldung itself does not create a right of residence or a right to be self-employed.</strong> For third-country nationals (Drittstaatsangehörige), registering a Gewerbe usually requires an appropriate Austrian residence authorization that permits self-employment (for example, a Rot-Weiß-Rot – Karte for self-employed key workers, Daueraufenthalt – EU, etc.).</>,
    step1Title: 'Go to the website',
    step1LinkLabel: 'Follow this link:',
    step1LinkText: '🔗 https://www.gisa.gv.at/online-gewerbeanmeldung',
    step1P1: <>You\u2019ll see the first page of the <strong>GISA</strong> system.</>,
    step1H3_1: 'A closer look at the first page',
    step1Opt1: { de: 'GISA Gewerbeinformationssystem Austria', tr: 'What is this?', desc: 'GISA (Gewerbeinformationssystem Austria) is Austria\u2019s official register of Gewerbeberechtigungen \u2014 registered trade licences. Among other things, it can be used to submit a Gewerbeanmeldung online and check registered trades.' },
    step1Opt2: { de: 'Gewerbeanmeldung', tr: 'What does this mean?', desc: 'This is the <strong>business registration application</strong>. This is exactly the application we are filling out now.' },
    step1H3_2: 'Two ways to submit the application \u2014 \u201eMit ID Austria/EU-Login beantragen\u201c / \u201eOhne ID Austria/EU-Login beantragen\u201c \u2014 the most important choice',
    step1Way1Title: '\u201eMit ID Austria/EU-Login beantragen\u201c', step1Way1Tr: 'Translation: \u201cApply using ID Austria / EU-Login\u201d',
    step1Way1Desc: <>Applying via <strong>ID Austria / EU-Login</strong> may allow immediate electronic entry in GISA (GISA-Express) if all statutory requirements can be checked automatically \u2014 this applies to personal applications without document uploads. If not, the application is forwarded to the competent <strong>Gewerbebehörde</strong> (competent authority).</>,
    step1Way2Title: '\u201eOhne ID Austria/EU-Login beantragen\u201c', step1Way2Tr: 'Translation: \u201cApply without ID Austria / EU-Login\u201d',
    step1Way2Desc: 'You fill everything in manually, and immediate automatic entry in GISA is not available. The application will be reviewed by the competent authority.',
    step1H3_3: 'What do we choose?',
    step1P2: <>For Iryna we choose the first option \u2014 <strong>\u201eMit ID Austria/EU-Login beantragen\u201c</strong>. After clicking, the system will redirect you to sign in via <strong>ID Austria</strong>.</>,
    step1Tip: <>Applying via ID Austria / EU-Login is not mandatory, but it unlocks the option of immediate electronic entry when all requirements can be checked automatically. If you don\u2019t have ID Austria yet, you can set it up in advance.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>📖 How to get ID Austria: step-by-step guide →</Link></>,
    step1Footer: 'Done with the first page. Moving on to the second page.',
    step2Title: 'Choosing the applicant type',
    step2P1: <>After clicking <strong>\u201cmit ID Austria beantragen\u201d</strong> and signing in, the second page opens.</>,
    step2H3_1: 'The progress bar at the top of the page',
    step2ProgressLabel: 'Gewerbeanmeldung → Fortschrittsanzeige',
    step2ProgressSteps: ['1 Einstieg', '2 Person', '3 Daten', '4 Optional', '5 Beilagen', '6 Kontrolle', '7 Abschluss'],
    step2ProgressExplain: 'Einstieg — start · Person — applicant · Daten — data · Optional — additional data · Beilagen — attachments / documents · Kontrolle — review · Abschluss — completion',
    step2P2: <>These are the stages of filling out the application. You\u2019re currently on step <strong>2 Person</strong> (personal data).</>,
    step2H3_2: 'The key question: Wer stellt den Antrag?',
    step2P3: 'Translation: \u201cWho is submitting the application?\u201d Here you need to choose on whose behalf the registration is being made.',
    step2Opt1: { de: '1. Natürliche Person (auch e.U. = im Firmenbuch eingetragenes Einzelunternehmen)', tr: 'Natural person (including e.U. — a sole proprietorship)', desc: '<strong>Natürliche Person</strong> — a natural person (individual applicant). This is the typical option when a person registers a Gewerbe in their own name, and it\u2019s the one that fits our example.<br /><br /><strong>e.U.</strong> stands for eingetragene Unternehmerin / eingetragener Unternehmer — an entrepreneur whose Einzelunternehmen is entered in the <strong>Firmenbuch</strong>, Austria\u2019s register of companies and registered entrepreneurs. An ordinary Gewerbeanmeldung does not by itself make someone an e.U.' },
    step2Opt2: { de: '2. Natürliche Person mit Geschäftsführungsbestellung', tr: 'Natural person appointed as managing director', desc: 'Used when you act as the <strong>gewerberechtliche Geschäftsführung</strong> — the person officially responsible for ensuring the professional requirements for a given Gewerbe are met — in an already existing company (e.g. a GmbH). <strong>This doesn\u2019t apply to us.</strong>' },
    step2Opt3: { de: '3. Juristische Person (AG, GmbH, KG, OG, etc.)', tr: 'Legal entity', desc: 'This option is for companies, partnerships and associations, not for an individual. <strong>We don\u2019t need this.</strong>' },
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
    step3P3: <><strong>Österreichische Sozialversicherungsnummer</strong> — the Austrian social insurance number. In many cases it\u2019s pulled in automatically, though not always. If the field is empty — you can find the number on your <strong>e-card</strong> or in documents from <strong>ÖGK</strong> or <strong>SVS</strong>.</>,
    step3H3_3: 'Einzelunternehmen im Firmenbuch eingetragen',
    step3P4: <>Below you\u2019ll see a block related to registration in the <strong>Firmenbuch</strong> — Austria\u2019s register of companies and entrepreneurs who are required or have voluntarily chosen to register there.</>,
    step3Info2: <>If you\u2019re opening a business activity for the first time — <strong>leave this block empty</strong>. The system itself notes:<br /><em>„Bitte nur ausfüllen, wenn bereits eine Firmenbucheintragung besteht."</em><br /><span style={{ color: 'var(--text2)' }}>Fill it in only if the business is already registered in the Firmenbuch. For most self-employed people this section is left blank.</span></>,
    step3Tip: <>Make sure your <strong>email address</strong> is correct — that\u2019s where notifications about your application will be sent.</>,
    step3P5: <>After checking the data we click <strong>Weiter</strong> and move on to the most important stage — choosing the type of activity (Gewerbe).</>,
    step3Footer: 'Done with the third page! Moving on to the fourth page.',
    step4Title: 'Choosing the type of activity and business address',
    step4P1: <>The <strong>Angaben zum Gewerbe</strong> (business activity details) page opens. This is where we tell the state: what we\u2019ll be doing, from what date we\u2019re starting, and where our business is located.</>,
    step4P2: 'As an example, let\u2019s continue Iryna\u2019s registration as a self-employed IT specialist.',
    step4H3_1: 'Gewerbewortlaut — type of activity',
    step4P3: <>The <strong>Gewerbewortlaut</strong> is the official wording of the trade/activity being registered, as it will appear on the Gewerbeberechtigung. At the top of the page is the field: <strong>Suche nach Gewerbewortlaut</strong>. Enter a keyword and click <strong>\u201cGewerbewortlaut suchen\u201d</strong>.</>,
    step4P4: 'For many IT activities, this Gewerbewortlaut may be suitable:',
    step4BoxTitle: 'Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik',
    step4BoxDesc: <>\u201cServices in automatic data processing and information technology\u201d • <strong>Freies Gewerbe</strong>. The exact Gewerbewortlaut must match the services actually provided.</>,
    step4P5: <>After selecting it, the activity name will appear in the <strong>\u201cGefundene Gewerbewortlaute\u201d</strong> field.</>,
    step4H3_2: 'Do you need to restrict the scope of activity?',
    step4Quote: { de: 'Möchten Sie den Umfang des Gewerbes einschränken?', tr: '\u201cDo you want to restrict the scope of your activity?\u201d' },
    step4P6: 'Iryna does not want to deliberately narrow her chosen Gewerbewortlaut, so in this example we choose:',
    step4YesLabel1: 'If you deliberately want to narrow the list of services', step4NoLabel1: 'In this example — Iryna does not restrict the scope of her activity',
    step4H3_3: 'Anmeldung gültig ab — activity start date',
    step4P7: <>By default the system suggests the <strong>current date</strong>. In our example: <strong>04.06.2026</strong>. Choose the actual planned start date — <strong>a Gewerbeanmeldung cannot be made retroactively</strong>. For an ordinary Anmeldungsgewerbe (a Gewerbe registered by simple notification), the activity can generally be carried out once the registration is legally effective and all requirements are met; certain regulated activities require waiting for the relevant decision.</>,
    step4H3_4: 'Industriebetrieb — industrial business',
    step4P8: 'For our example, this IT Einzelunternehmen is not an Industriebetrieb, so we choose:',
    step4YesLabel2: 'Manufacturing, industry', step4NoLabel2: 'In this example — not an Industriebetrieb. For other activities, the answer depends on the actual business.',
    step4H3_5: 'Angaben zum Standort — Gewerbestandort',
    step4Ok: <><strong>Standortadresse erfassen (mit Adressprüfung)</strong> — the system checks the address against the state register (address validation).</>,
    step4P9: <>The <strong>Gewerbestandort</strong> is the official address where the Gewerbe is registered. We fill in the business activity address fields:</>,
    step4Fields: [{label:'Postleitzahl', value:'Postal code'},{label:'Ort', value:'City/town'},{label:'Straße', value:'Street name'},{label:'Hausnummer', value:'House number'},{label:'Tür', value:'Apartment number (if applicable)'}],
    step4Info: <>The Gewerbestandort may be the same as the home address if this is compatible with the activity, applicable use/zoning rules and the rental or ownership agreement. A separate office is not required for every trade. Since Iryna works remotely from home, she provides her actual place of residence in Austria.</>,
    step4P10: 'We check:',
    step4CheckItems: ['That the chosen Gewerbe is correct', 'The activity start date', 'The business address'],
    step4P11: <>After that we click <strong>Weiter</strong>.</>,
    step4H3_6: 'Confirming there are no restrictions',
    step4Opt1: { de: 'Gegen mich liegen keine Gewerbeausschlussgründe vor', tr: 'There are no Gewerbeausschlussgründe against me', desc: '<strong>Gewerbeausschlussgründe</strong> are circumstances, defined by law, that prevent a person from obtaining or exercising a Gewerbe. For our example we choose this option.' },
    step4Opt2: { de: 'Mir wurde eine Nachsicht erteilt', desc: 'Used only in special cases, when a person previously had a Gewerbeausschlussgrund but was granted an official waiver (Nachsicht). <strong>Not our option.</strong>' },
    step4H3_7: 'Eidesstattliche Erklärung',
    step4P12: <>An <strong>Eidesstattliche Erklärung</strong> is a formal declaration made under personal responsibility confirming that no Gewerbeausschlussgründe apply. At this stage the system offers to submit such a declaration.</>,
    step4Opt3: { de: 'Ich gebe die Eidesstattliche Erklärung ab', tr: 'I am submitting the Eidesstattliche Erklärung', desc: 'A valid Eidesstattliche Erklärung can serve as proof that no Gewerbeausschlussgründe under § 13 GewO exist, and under certain conditions can replace certain criminal-record documents that would otherwise be needed for this proof — but it does not replace every possible attachment to the application.' },
    step4Warning: <>Also tick the checkbox next to:<br /><em>„Ich nehme die Aufklärung über den Inhalt der Eidesstattlichen Erklärung und die Konsequenzen von falschen Angaben zur Kenntnis."</em><br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>This means you have read the content of the declaration and understand the responsibility for providing false information. <strong>This point must be confirmed to continue registration.</strong></span></>,
    step4FalseDeclarationWarning: <>Only submit an Eidesstattliche Erklärung when the statements it contains are exactly true. A false declaration can have serious legal consequences: withdrawal of the Gewerbeberechtigung, a five-year exclusion from conducting a Gewerbe with no possibility of a waiver, and possible criminal-law consequences.</>,
    step4H3_8: 'Entering your first and last name',
    step4P13: <>At the end you need to enter your first and last name as required by the form to confirm the declaration.</>,
    step4FieldVorname: { label: 'Vorname', value: 'Iryna' }, step4FieldFamilienname: { label: 'Familienname', value: 'Müller' },
    step4P14: <>After that we click <strong>Weiter</strong> and move on to the next stage of registration.</>,
    step5Title: 'Reviewing the data and submitting the application',
    step5P1: <>On this page the system shows a <strong>summary of all the data</strong> you entered during registration. Carefully check:</>,
    step5CheckItems: ['Personal data and contact information', 'The chosen type of activity (Gewerbe)', 'The business address', 'The activity start date'],
    step5Info: <>If something needs correcting, go back using the <strong>Zurück</strong> (\u201cBack\u201d) button or <strong>Daten bearbeiten</strong> (\u201cEdit data\u201d).</>,
    step5P2: <>If all the data is correct, we click <strong>Senden</strong> (\u201cSubmit\u201d). After that, the application will be sent to the competent authority for processing.</>,
    step5H3: 'Important note on additional documents',
    step5Ok: <><strong>Beilagen</strong> are attachments or documents submitted with the application. In our example the system may show: <strong>\u201cEs müssen keine Beilagen übermittelt werden.\u201d</strong> — \u201cNo additional documents need to be submitted.\u201d<br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>This applies to this specific application at this stage. For a different Gewerbe, residence status, or other situation, the list of documents may differ.</span></>,
    step5Warning: <>If you\u2019ve lived in Austria <strong>less than 5 years</strong>, the Austrian authorities may request additional documents. Most often these are:<ul style={{ margin: '8px 0 0 16px', lineHeight: 1.8 }}><li>a <strong>Strafregisterbescheinigung</strong> (criminal-record certificate) from your previous country of residence — usually no older than three months;</li><li>documents confirming your identity or place of residence.</li></ul>We recommend preparing these documents in advance; a translation of individual documents may be needed depending on the specific case.</>,
    step6Title: 'Application submitted — what\u2019s next?',
    step6P1: <>After clicking <strong>Senden</strong>, the system shows whether immediate electronic entry in GISA has taken place, or whether the application has been forwarded to the competent <strong>Gewerbebehörde</strong> (the competent authority responsible for processing the Gewerbeanmeldung). If the registration is confirmed, you\u2019ll receive your <strong>GISA-Zahl</strong> — the registration number of the Gewerbe entry in GISA.</>,
    step6P2: <>After successful registration, your activity will appear in the state register <strong>GISA (Gewerbeinformationssystem Austria)</strong>.</>,
    step6H3: 'How to check the registration online?',
    step6P3: <>You can check the information for free via the official public GISA-Abfrage — searching by company name, GISA-Zahl, or Gewerbewortlaut. The result is, in effect, a <strong>GISA-Auszug</strong>, an official extract from the GISA register.</>,
    step6LinkText: '🔍 GISA Abfrage — check your registration',
    congratsTitle: <>Congratulations on registering your <em style={{ fontStyle: 'italic', color: '#FFB899' }}>Gewerbe! 🎉</em></>,
    congratsP: 'For many Gewerbeanmeldungen, the process can be completed online through GISA. Whether additional documents or processing by the competent authority are required depends on the type of trade and the individual case.',
    tipFinal: <>After the Gewerbeanmeldung, check the next tax and social-insurance steps, including your data with <strong>SVS</strong> and <strong>Finanzamt Österreich</strong> — taxes, invoices, bookkeeping, Kleinunternehmerregelung and other matters.<br /><br />That\u2019s why we\u2019ve prepared a series of practical articles about self-employment in Austria.</>,
    nextArticleTitle: '📖 Also read → Gewerbeanmeldung in Austria: the complete step-by-step guide',
    nextArticleSub: 'Everything about registering self-employment — where to start',
    summaryTitle: 'Summary: what we did',
    summarySteps: ['Opened the current Gewerbeanmeldung form in GISA','Chose to apply via ID Austria / EU-Login (\u201cMit ID Austria/EU-Login beantragen\u201d)','Chose the correct applicant type (Natürliche Person)','Checked personal data and the question about residence in Austria','Chose the exact Gewerbewortlaut, start date and Gewerbestandort','Filled in the Eidesstattliche Erklärung and reviewed the application','Submitted the application and checked whether immediate entry in GISA occurred or the application was forwarded to the competent authority'],
    sourcesLabel: 'Official sources',
    sources: [
      {label:'GISA — Online-Gewerbeanmeldung', href:'https://www.gisa.gv.at/online-gewerbeanmeldung'},
      {label:'GISA — public GISA-Abfrage', href:'https://www.gisa.gv.at/abfrage'},
      {label:'oesterreich.gv.at — GISA / Gewerbeinformationssystem Austria', href:'https://www.oesterreich.gv.at/de/lexicon/G/Seite.991380'},
      {label:'USP — Gewerbeanmeldung', href:'https://www.usp.gv.at/gruendung/EAP/gewerbeanmeldung.html'},
      {label:'WKO — Gewerbeanmeldung', href:'https://www.wko.at/gruendung/gewerbeanmeldung'},
      {label:'WKO — Voraussetzungen für die Gewerbeberechtigung', href:'https://www.wko.at/gruendung/voraussetzungen-faq'},
      {label:'WKO — Eidesstattliche Erklärung im Gewerbeverfahren', href:'https://www.wko.at/gewerberecht/eidesstattliche-erklaerung-im-gewerbeverfahren'},
      {label:'USP — Firmenbuch registration for sole proprietors', href:'https://startup.usp.gv.at/gruendung/gruendungsfahrplan/weitere-informationen/firmenbuch-eintragung-einzelunternehmen'},
    ],
    footerNote: 'This material is for informational purposes and is based on publicly available official sources. We recommend checking the current information on official Austrian government websites.',
    translationLabel: 'Translation',
  },
  DE: {
    tag1: 'GISA · Anmeldung', tag2: '6 Schritte', tag3: 'Für Ausländer',
    titleLine1: 'Gewerbe über GISA anmelden:', titleEm: 'Schritt-für-Schritt-Online-Anleitung',
    metaTime: '🕐 15 Min. Lesezeit', metaSteps: '💻 6 Schritte', metaForeigners: '🌍 Für Ausländer',
    toc: [['#step1','Zur Website gehen'],['#step2','Art des Antragstellers'],['#step3','Persönliche Daten'],['#step4','Art der Tätigkeit'],['#step5','Daten überprüfen'],['#step6','Anmeldung abgeschlossen'],['#summary','Zusammenfassung']],
    backLink: '← Alle Artikel',
    disclaimer: 'Dieser Beitrag dient ausschließlich Informationszwecken und stellt keine Rechts-, Steuer- oder Unternehmensberatung dar. Die GISA-Oberfläche und die Anforderungen können sich ändern. Prüfe vor dem Absenden die aktuellen Angaben in GISA und auf offiziellen österreichischen Seiten.',
    introP1: <>Die <strong>Gewerbeanmeldung</strong> ist die Anmeldung einer Tätigkeit, die der <strong>Gewerbeordnung</strong> unterliegt. Diese Anleitung zeigt einen typischen Online-Ablauf über <strong>GISA</strong>.</>,
    introP2: <>Diese Anleitung zeigt einen typischen Ablauf der Online-Gewerbeanmeldung für eine natürliche Person am Beispiel eines <strong>freien Gewerbes</strong> im IT-Bereich. Bei <strong>reglementierten Gewerben</strong>, Gesellschaften, Fällen mit <strong>gewerberechtlicher Geschäftsführung</strong> oder Tätigkeiten mit zusätzlichen Bewilligungen können Formular und erforderliche Unterlagen abweichen.</>,
    introP3: <>📌 <strong>Beispiel:</strong> Als Beispiel verwenden wir eine natürliche Person, die ein <strong>freies Gewerbe</strong> im IT-Bereich anmeldet. Für ein freies Gewerbe ist grundsätzlich kein besonderer <strong>Befähigungsnachweis</strong> erforderlich. Das ist nicht dasselbe wie ein <strong>freier Beruf</strong> — das ist eine eigene rechtliche Kategorie.</>,
    precheckTitle: 'Bevor du beginnst',
    precheckP: <>Vor der Antragstellung ist es hilfreich zu wissen: ob deine Tätigkeit der Gewerbeordnung unterliegt, ob es ein <strong>freies Gewerbe</strong> oder ein <strong>reglementiertes Gewerbe</strong> ist, der genaue <strong>Gewerbewortlaut</strong> (die offizielle Bezeichnung der Tätigkeit) und der geplante <strong>Gewerbestandort</strong>. Für Staatsangehörige von Nicht-EU-/EWR-Staaten: ob dein Aufenthaltsstatus eine selbstständige Tätigkeit erlaubt.</>,
    precheckNote: <><strong>Die Gewerbeanmeldung selbst begründet weder ein Aufenthaltsrecht noch ein Recht auf selbstständige Tätigkeit.</strong> Für Drittstaatsangehörige ist für die Gewerbeanmeldung in der Regel ein entsprechender österreichischer Aufenthaltstitel erforderlich, der eine selbstständige Tätigkeit erlaubt (z. B. eine Rot-Weiß-Rot – Karte für selbstständige Schlüsselkräfte, Daueraufenthalt – EU usw.).</>,
    step1Title: 'Zur Website gehen',
    step1LinkLabel: 'Folge diesem Link:',
    step1LinkText: '🔗 https://www.gisa.gv.at/online-gewerbeanmeldung',
    step1P1: <>Du siehst die erste Seite des <strong>GISA</strong>-Systems.</>,
    step1H3_1: 'Die erste Seite im Detail',
    step1Opt1: { de: 'GISA Gewerbeinformationssystem Austria', tr: 'Was ist das?', desc: 'GISA (Gewerbeinformationssystem Austria) ist das österreichische Register für Gewerbeberechtigungen. Darüber können unter anderem Gewerbeanmeldungen online eingebracht und eingetragene Gewerbe abgefragt werden.' },
    step1Opt2: { de: 'Gewerbeanmeldung', tr: 'Was bedeutet das?', desc: 'Das ist der <strong>Antrag auf Anmeldung einer Gewerbetätigkeit</strong>. Genau diesen Antrag füllen wir gerade aus.' },
    step1H3_2: 'Zwei Wege der Antragstellung „Mit ID Austria/EU-Login beantragen“ / „Ohne ID Austria/EU-Login beantragen“ — die wichtigste Entscheidung',
    step1Way1Title: '„Mit ID Austria/EU-Login beantragen“', step1Way1Tr: 'Antrag mit ID Austria / EU-Login stellen',
    step1Way1Desc: <>Die Antragstellung über <strong>ID Austria / EU-Login</strong> kann eine unmittelbare elektronische Eintragung ins GISA (GISA-Express) ermöglichen, wenn alle erforderlichen Voraussetzungen automatisiert geprüft werden können — das betrifft persönliche Anträge ohne Dokumenten-Upload. Ist das nicht möglich, wird der Antrag zur Bearbeitung an die zuständige <strong>Gewerbebehörde</strong> weitergeleitet.</>,
    step1Way2Title: '„Ohne ID Austria/EU-Login beantragen“', step1Way2Tr: 'Antrag ohne ID Austria / EU-Login stellen',
    step1Way2Desc: 'Du gibst alle Daten manuell ein, eine unmittelbare automatische Eintragung ins GISA ist dabei nicht möglich. Der Antrag wird von der zuständigen Behörde geprüft.',
    step1H3_3: 'Was wählen wir?',
    step1P2: <>Für Iryna wählen wir die erste Option — <strong>„Mit ID Austria/EU-Login beantragen“</strong>. Nach dem Klick leitet dich das System zur Anmeldung über <strong>ID Austria</strong> weiter.</>,
    step1Tip: <>Die Antragstellung über ID Austria / EU-Login ist nicht verpflichtend, eröffnet aber die Möglichkeit einer unmittelbaren elektronischen Eintragung, wenn alle Voraussetzungen automatisiert geprüft werden können. Falls du noch keine ID Austria hast, kannst du sie im Voraus beantragen.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>📖 Wie man die ID Austria beantragt: Schritt-für-Schritt-Anleitung →</Link></>,
    step1Footer: 'Erste Seite erledigt. Weiter zur zweiten Seite.',
    step2Title: 'Auswahl der Art des Antragstellers',
    step2P1: <>Nach dem Klick auf <strong>„mit ID Austria beantragen"</strong> und der Anmeldung öffnet sich die zweite Seite.</>,
    step2H3_1: 'Fortschrittsanzeige oben auf der Seite',
    step2ProgressLabel: 'Gewerbeanmeldung → Fortschrittsanzeige',
    step2ProgressSteps: ['1 Einstieg', '2 Person', '3 Daten', '4 Optional', '5 Beilagen', '6 Kontrolle', '7 Abschluss'],
    step2ProgressExplain: 'Einstieg — Start · Person — antragstellende Person · Daten — Angaben · Optional — weitere Angaben · Beilagen — Anhänge / Unterlagen · Kontrolle — Überprüfung · Abschluss — Fertigstellung',
    step2P2: <>Das sind die Etappen beim Ausfüllen des Antrags. Du befindest dich gerade bei Schritt <strong>2 Person</strong> (Personendaten).</>,
    step2H3_2: 'Die Hauptfrage: Wer stellt den Antrag?',
    step2P3: 'Hier musst du auswählen, in wessen Namen die Anmeldung erfolgt.',
    step2Opt1: { de: '1. Natürliche Person (auch e.U. = im Firmenbuch eingetragenes Einzelunternehmen)', tr: 'Natürliche Person (auch e.U. — eingetragenes Einzelunternehmen)', desc: '<strong>Natürliche Person</strong> — das ist der typische Fall, wenn jemand ein Gewerbe im eigenen Namen anmeldet, und genau das trifft auf unser Beispiel zu.<br /><br /><strong>e.U.</strong> steht für eingetragene Unternehmerin / eingetragener Unternehmer, also eine Person, deren Einzelunternehmen im <strong>Firmenbuch</strong> — dem österreichischen Register für Unternehmen und eingetragene Unternehmer:innen — eingetragen ist. Eine gewöhnliche Gewerbeanmeldung macht jemanden nicht automatisch zum e.U.' },
    step2Opt2: { de: '2. Natürliche Person mit Geschäftsführungsbestellung', tr: 'Natürliche Person mit Bestellung zur Geschäftsführung', desc: 'Wird verwendet, wenn du als <strong>gewerberechtliche Geschäftsführung</strong> — also als Person, die offiziell für die Erfüllung der fachlichen Voraussetzungen eines Gewerbes verantwortlich ist — in einem bereits bestehenden Unternehmen tätig bist (z. B. einer GmbH). <strong>Das trifft auf uns nicht zu.</strong>' },
    step2Opt3: { de: '3. Juristische Person (AG, GmbH, KG, OG, etc.)', tr: 'Juristische Person', desc: 'Diese Option betrifft Unternehmen, Personengesellschaften und Vereinigungen, nicht eine Einzelperson. <strong>Das brauchen wir nicht.</strong>' },
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
    step3P3: <>Die <strong>österreichische Sozialversicherungsnummer</strong>. In vielen Fällen wird sie automatisch übernommen, aber nicht immer. Ist das Feld leer, findest du die Nummer auf deiner <strong>e-card</strong> oder in Unterlagen der <strong>ÖGK</strong> oder <strong>SVS</strong>.</>,
    step3H3_3: 'Einzelunternehmen im Firmenbuch eingetragen',
    step3P4: <>Weiter unten siehst du einen Block zur Eintragung im <strong>Firmenbuch</strong> — dem österreichischen Register für Unternehmen und Unternehmer:innen, die dazu verpflichtet sind oder sich freiwillig eintragen lassen.</>,
    step3Info2: <>Wenn du deine Gewerbetätigkeit zum ersten Mal aufnimmst — <strong>lass diesen Block leer</strong>. Das System weist selbst darauf hin:<br /><em>„Bitte nur ausfüllen, wenn bereits eine Firmenbucheintragung besteht."</em><br /><span style={{ color: 'var(--text2)' }}>Fülle ihn nur aus, wenn das Unternehmen bereits im Firmenbuch eingetragen ist. Für die meisten Selbstständigen bleibt dieser Bereich leer.</span></>,
    step3Tip: <>Stelle sicher, dass deine <strong>E-Mail-Adresse</strong> korrekt angegeben ist — dorthin werden Mitteilungen zu deinem Antrag gesendet.</>,
    step3P5: <>Nach der Überprüfung der Daten klicken wir auf <strong>Weiter</strong> und gelangen zum wichtigsten Schritt — der Auswahl der Tätigkeitsart (Gewerbe).</>,
    step3Footer: 'Dritte Seite erledigt! Weiter zur vierten Seite.',
    step4Title: 'Auswahl der Tätigkeitsart und der Geschäftsadresse',
    step4P1: <>Die Seite <strong>Angaben zum Gewerbe</strong> öffnet sich. Genau hier teilen wir dem Staat mit: womit wir uns beschäftigen, ab wann wir beginnen und wo sich unser Unternehmen befindet.</>,
    step4P2: 'Als Beispiel setzen wir die Anmeldung für Iryna fort, die als selbstständige IT-Spezialistin tätig sein wird.',
    step4H3_1: 'Gewerbewortlaut — Art der Tätigkeit',
    step4P3: <>Der <strong>Gewerbewortlaut</strong> ist die offizielle Bezeichnung der angemeldeten Tätigkeit, wie sie in der Gewerbeberechtigung aufscheint. Oben auf der Seite befindet sich das Feld: <strong>Suche nach Gewerbewortlaut</strong>. Gib ein Stichwort ein und klicke auf <strong>„Gewerbewortlaut suchen"</strong>.</>,
    step4P4: 'Für viele IT-Tätigkeiten kann dieser Gewerbewortlaut passen:',
    step4BoxTitle: 'Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik',
    step4BoxDesc: <><strong>Freies Gewerbe</strong>. Der genaue Gewerbewortlaut muss jedoch der tatsächlich ausgeübten Tätigkeit entsprechen.</>,
    step4P5: <>Nach der Auswahl erscheint die Bezeichnung der Tätigkeit im Feld <strong>„Gefundene Gewerbewortlaute"</strong>.</>,
    step4H3_2: 'Muss die Tätigkeit eingeschränkt werden?',
    step4Quote: { de: 'Möchten Sie den Umfang des Gewerbes einschränken?', tr: '„Möchtest du den Umfang deiner Tätigkeit einschränken?"' },
    step4P6: 'Iryna möchte ihren gewählten Gewerbewortlaut nicht bewusst einschränken. Daher wählen wir in diesem Beispiel:',
    step4YesLabel1: 'Wenn du das Leistungsspektrum bewusst einschränken möchtest', step4NoLabel1: 'In diesem Beispiel — Iryna schränkt den Umfang ihrer Tätigkeit nicht ein',
    step4H3_3: 'Anmeldung gültig ab — Beginn der Tätigkeit',
    step4P7: <>Standardmäßig schlägt das System das <strong>aktuelle Datum</strong> vor. In unserem Beispiel: <strong>04.06.2026</strong>. Wähle das tatsächliche geplante Startdatum — <strong>eine rückwirkende Gewerbeanmeldung ist nicht möglich</strong>. Bei einem gewöhnlichen Anmeldungsgewerbe (einem Gewerbe, das durch einfache Anmeldung entsteht) kann die Tätigkeit grundsätzlich ab dem Zeitpunkt der rechtswirksamen Anmeldung ausgeübt werden, sofern alle Voraussetzungen erfüllt sind; für einzelne reglementierte Tätigkeiten muss die entsprechende behördliche Entscheidung abgewartet werden.</>,
    step4H3_4: 'Industriebetrieb',
    step4P8: 'Für unser Beispiel — ein IT-Einzelunternehmen — handelt es sich nicht um einen Industriebetrieb, daher wählen wir:',
    step4YesLabel2: 'Produktion, Industrie', step4NoLabel2: 'In diesem Beispiel — kein Industriebetrieb. Für andere Tätigkeiten hängt die Antwort vom tatsächlichen Betrieb ab.',
    step4H3_5: 'Angaben zum Standort — Gewerbestandort',
    step4Ok: <><strong>Standortadresse erfassen (mit Adressprüfung)</strong> — das System prüft die Adresse anhand des staatlichen Registers (Adressprüfung).</>,
    step4P9: <>Der <strong>Gewerbestandort</strong> ist die offizielle Adresse, unter der das Gewerbe angemeldet ist. Wir füllen die Adressfelder für den Sitz der Tätigkeit aus:</>,
    step4Fields: [{label:'Postleitzahl', value:'Postleitzahl'},{label:'Ort', value:'Ort'},{label:'Straße', value:'Straßenname'},{label:'Hausnummer', value:'Hausnummer'},{label:'Tür', value:'Wohnungsnummer (falls vorhanden)'}],
    step4Info: <>Der Gewerbestandort kann mit der Wohnadresse übereinstimmen, sofern dies mit der Tätigkeit, den einschlägigen Nutzungs- bzw. Widmungsvorschriften und dem Miet- oder Wohnungseigentumsvertrag vereinbar ist. Ein separates Büro ist nicht für jedes Gewerbe erforderlich. Da Iryna von zu Hause aus remote arbeitet, gibt sie ihre tatsächliche Wohnadresse in Österreich an.</>,
    step4P10: 'Wir überprüfen:',
    step4CheckItems: ['Die Richtigkeit des gewählten Gewerbes', 'Das Datum des Tätigkeitsbeginns', 'Die Geschäftsadresse'],
    step4P11: <>Danach klicken wir auf <strong>Weiter</strong>.</>,
    step4H3_6: 'Bestätigung, dass keine Ausschlussgründe vorliegen',
    step4Opt1: { de: 'Gegen mich liegen keine Gewerbeausschlussgründe vor', tr: 'Gegen mich liegen keine Gewerbeausschlussgründe vor', desc: '<strong>Gewerbeausschlussgründe</strong> sind gesetzlich vorgesehene Umstände, aufgrund derer eine Person ein Gewerbe nicht erlangen oder ausüben darf. Für unser Beispiel wählen wir diese Option.' },
    step4Opt2: { de: 'Mir wurde eine Nachsicht erteilt', desc: 'Wird nur in besonderen Fällen verwendet, wenn eine Person zuvor einen Gewerbeausschlussgrund hatte, aber eine offizielle Nachsicht erhalten hat. <strong>Nicht unsere Option.</strong>' },
    step4H3_7: 'Eidesstattliche Erklärung',
    step4P12: <>Mit einer <strong>Eidesstattlichen Erklärung</strong> bestätigt die antragstellende Person unter persönlicher Verantwortung, dass keine Gewerbeausschlussgründe vorliegen. An dieser Stelle bietet das System an, eine solche Erklärung abzugeben.</>,
    step4Opt3: { de: 'Ich gebe die Eidesstattliche Erklärung ab', tr: 'Ich gebe die Eidesstattliche Erklärung ab', desc: 'Eine gültige Eidesstattliche Erklärung kann als Nachweis dafür dienen, dass keine Gewerbeausschlussgründe nach § 13 GewO vorliegen, und kann unter bestimmten Voraussetzungen einzelne Strafregisterunterlagen ersetzen, die andernfalls für diesen Nachweis erforderlich wären — sie ersetzt aber nicht jede mögliche Beilage zum Antrag.' },
    step4Warning: <>Setze außerdem ein Häkchen bei:<br /><em>„Ich nehme die Aufklärung über den Inhalt der Eidesstattlichen Erklärung und die Konsequenzen von falschen Angaben zur Kenntnis."</em><br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>Das bedeutet, dass du dich über den Inhalt der Erklärung informiert hast und die Verantwortung für falsche Angaben verstehst. <strong>Dieser Punkt muss zur Fortsetzung der Anmeldung bestätigt werden.</strong></span></>,
    step4FalseDeclarationWarning: <>Gib die Eidesstattliche Erklärung nur ab, wenn die darin enthaltenen Angaben tatsächlich der Wahrheit entsprechen. Eine falsche Erklärung kann ernste rechtliche Folgen haben: Entziehung der Gewerbeberechtigung, einen fünfjährigen Gewerbeausschluss ohne Möglichkeit der Nachsicht sowie mögliche strafrechtliche Konsequenzen.</>,
    step4H3_8: 'Eingabe von Vor- und Nachname',
    step4P13: <>Am Ende musst du deinen Vor- und Nachnamen so eingeben, wie es das Formular zur Bestätigung der Erklärung verlangt.</>,
    step4FieldVorname: { label: 'Vorname', value: 'Iryna' }, step4FieldFamilienname: { label: 'Familienname', value: 'Müller' },
    step4P14: <>Danach klicken wir auf <strong>Weiter</strong> und gelangen zum nächsten Schritt der Anmeldung.</>,
    step5Title: 'Daten überprüfen und Antrag absenden',
    step5P1: <>Auf dieser Seite zeigt das System eine <strong>Zusammenfassung aller Daten</strong>, die du bei der Anmeldung eingegeben hast. Überprüfe sorgfältig:</>,
    step5CheckItems: ['Persönliche Daten und Kontaktinformationen', 'Die gewählte Tätigkeitsart (Gewerbe)', 'Die Geschäftsadresse', 'Das Datum des Tätigkeitsbeginns'],
    step5Info: <>Falls etwas korrigiert werden muss, gehe über den Button <strong>Zurück</strong> oder <strong>Daten bearbeiten</strong> zurück.</>,
    step5P2: <>Sind alle Daten korrekt, klicken wir auf <strong>Senden</strong>. Danach wird der Antrag zur Bearbeitung an die zuständige Behörde übermittelt.</>,
    step5H3: 'Wichtiger Hinweis zu zusätzlichen Unterlagen',
    step5Ok: <><strong>Beilagen</strong> sind Anhänge bzw. Unterlagen zum Antrag. In unserem Beispiel zeigt das System möglicherweise: <strong>„Es müssen keine Beilagen übermittelt werden."</strong><br /><span style={{ color: 'var(--text2)', fontSize: 15 }}>Das gilt für diesen konkreten Antrag in diesem Schritt. Bei einem anderen Gewerbe, Aufenthaltsstatus oder einer anderen Situation kann die Liste der erforderlichen Unterlagen abweichen.</span></>,
    step5Warning: <>Wenn du <strong>weniger als 5 Jahre</strong> in Österreich lebst, können die österreichischen Behörden zusätzliche Unterlagen anfordern. Meistens sind das:<ul style={{ margin: '8px 0 0 16px', lineHeight: 1.8 }}><li>ein <strong>Strafregisterauszug</strong> aus dem vorherigen Wohnsitzland — in der Regel nicht älter als drei Monate;</li><li>Dokumente zur Bestätigung der Identität oder des Wohnsitzes.</li></ul>Wir empfehlen, diese Unterlagen im Voraus vorzubereiten; eine Übersetzung einzelner Dokumente kann je nach Einzelfall erforderlich sein.</>,
    step6Title: 'Antrag abgesendet — was nun?',
    step6P1: <>Nach dem Klick auf <strong>Senden</strong> zeigt das System, ob eine unmittelbare elektronische Eintragung ins GISA erfolgt ist oder ob der Antrag zur Bearbeitung an die zuständige <strong>Gewerbebehörde</strong> weitergeleitet wurde. Ist die Anmeldung bestätigt, erhältst du deine <strong>GISA-Zahl</strong> — die eindeutige Nummer des Gewerbeeintrags im GISA.</>,
    step6P2: <>Nach erfolgreicher Anmeldung erscheint deine Tätigkeit im staatlichen Register <strong>GISA (Gewerbeinformationssystem Austria)</strong>.</>,
    step6H3: 'Wie kann ich die Anmeldung online überprüfen?',
    step6P3: <>Du kannst die Informationen kostenlos über die offizielle öffentliche GISA-Abfrage überprüfen — Suche nach Firma/Bezeichnung, GISA-Zahl oder Gewerbewortlaut. Das Ergebnis ist im Wesentlichen ein <strong>GISA-Auszug</strong>, ein offizieller Auszug aus dem GISA-Register.</>,
    step6LinkText: '🔍 GISA Abfrage — Anmeldung überprüfen',
    congratsTitle: <>Herzlichen Glückwunsch zur Anmeldung deines <em style={{ fontStyle: 'italic', color: '#FFB899' }}>Gewerbes! 🎉</em></>,
    congratsP: 'Viele Gewerbeanmeldungen können online über GISA durchgeführt werden. Ob zusätzliche Unterlagen oder eine Bearbeitung durch die zuständige Gewerbebehörde erforderlich sind, hängt vom Gewerbe und vom konkreten Fall ab.',
    tipFinal: <>Nach der Gewerbeanmeldung solltest du die weiteren steuerlichen und sozialversicherungsrechtlichen Schritte prüfen, insbesondere deine Daten bei <strong>SVS</strong> und <strong>Finanzamt Österreich</strong> — Steuern, Rechnungen, Buchhaltung, Kleinunternehmerregelung und weitere Fragen.<br /><br />Deshalb haben wir eine Reihe praktischer Artikel über Selbstständigkeit in Österreich vorbereitet.</>,
    nextArticleTitle: '📖 Lies auch → Gewerbeanmeldung in Österreich: die komplette Schritt-für-Schritt-Anleitung',
    nextArticleSub: 'Alles zur Anmeldung der Selbstständigkeit — womit du beginnen solltest',
    summaryTitle: 'Zusammenfassung: was wir gemacht haben',
    summarySteps: ['Das aktuelle Gewerbeanmeldung-Formular in GISA geöffnet','Antragstellung über ID Austria / EU-Login gewählt („Mit ID Austria/EU-Login beantragen")','Den richtigen Antragstellertyp gewählt (Natürliche Person)','Persönliche Daten und die Frage zum Wohnsitz in Österreich geprüft','Den genauen Gewerbewortlaut, das Startdatum und den Gewerbestandort gewählt','Die Eidesstattliche Erklärung ausgefüllt und den Antrag überprüft','Den Antrag abgesendet und geprüft, ob eine unmittelbare Eintragung im GISA erfolgt ist oder der Antrag an die zuständige Behörde weitergeleitet wurde'],
    sourcesLabel: 'Offizielle Quellen',
    sources: [
      {label:'GISA — Online-Gewerbeanmeldung', href:'https://www.gisa.gv.at/online-gewerbeanmeldung'},
      {label:'GISA — öffentliche GISA-Abfrage', href:'https://www.gisa.gv.at/abfrage'},
      {label:'oesterreich.gv.at — GISA / Gewerbeinformationssystem Austria', href:'https://www.oesterreich.gv.at/de/lexicon/G/Seite.991380'},
      {label:'USP — Gewerbeanmeldung', href:'https://www.usp.gv.at/gruendung/EAP/gewerbeanmeldung.html'},
      {label:'WKO — Gewerbeanmeldung', href:'https://www.wko.at/gruendung/gewerbeanmeldung'},
      {label:'WKO — Voraussetzungen für die Gewerbeberechtigung', href:'https://www.wko.at/gruendung/voraussetzungen-faq'},
      {label:'WKO — Eidesstattliche Erklärung im Gewerbeverfahren', href:'https://www.wko.at/gewerberecht/eidesstattliche-erklaerung-im-gewerbeverfahren'},
      {label:'USP — Firmenbuch-Eintragung Einzelunternehmen', href:'https://startup.usp.gv.at/gruendung/gruendungsfahrplan/weitere-informationen/firmenbuch-eintragung-einzelunternehmen'},
    ],
    footerNote: 'Dieses Material dient nur zu Informationszwecken und basiert auf öffentlich zugänglichen offiziellen Quellen. Wir empfehlen, die Aktualität der Informationen auf offiziellen staatlichen Websites Österreichs zu überprüfen.',
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
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--charcoal)', marginBottom: 10 }}>{t.introP2}</p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--charcoal)' }}>{t.introP3}</p>
          </div>

          {/* Pre-check callout */}
          <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 10 }}>{t.precheckTitle}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--charcoal)', marginBottom: 12 }}>{t.precheckP}</p>
            <NoteBox type="warning">{t.precheckNote}</NoteBox>
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
              <p style={{ fontSize: 15, color: 'var(--text3)', fontStyle: 'italic', marginBottom: 10 }}>{t.step2ProgressExplain}</p>
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
              <NoteBox type="warning">{t.step4FalseDeclarationWarning}</NoteBox>

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
