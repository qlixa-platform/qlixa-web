'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArticleSidebar, ArticlePrevNext, ArticleTOC } from '@/components/layout/ArticleNav'

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

function StepCard({ n, title, children, id }: { n: number; title: string; children: React.ReactNode; id?: string }) {
  return (
    <div id={id} style={{ marginBottom: 32, scrollMarginTop: '80px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#038390', color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
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
      <span style={{ color: '#038390', fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 1 }}>·</span>
      <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.55 }}>{text}</span>
    </div>
  )
}

const IC_TEXT: Record<string, any> = {
  UA: {
    tag1: "Сім'я · Пільги", tag2: '4 кроки', tag3: 'Для батьків',
    titleLine1: 'Інвалідність дитини в Австрії:', titleEm: 'виплати, пільги та з чого почати',
    metaTime: '🕐 10 хв читання', metaParents: '👨‍👩‍👧 Для батьків', metaForeigners: '🇺🇦 Для іноземців',
    toc: [
      ['#step1', 'Behindertenpass'], ['#step2', 'Підвищена Familienbeihilfe'],
      ['#step3', 'Pflegegeld'], ['#step4', 'Податкові пільги'],
    ],
    backLink: '← Всі статті',
    disclaimer: 'Цей матеріал підготовлено на основі публічно доступних офіційних джерел та досвіду людей, які пройшли цей процес. QLIXA не є юридичним агентством і не надає індивідуальних консультацій. Кожен випадок розглядається індивідуально — рекомендуємо також звернутися до Sozialministeriumservice для отримання персональної консультації.',
    introP1: 'Ви приїхали до Австрії з дитиною, якій в Україні встановили інвалідність. Нова країна, нова система, нова мова — і купа запитань.',
    introP2: <><strong>Хороша новина:</strong> Австрія справді передбачила підтримку для таких сімей.{' '}<strong>Погана:</strong> це не відбувається автоматично.</>,
    step1Title: 'Австрійський Behindertenpass',
    step1P: <>Українське посвідчення інваліда в Австрії юридично не діє. Кожна країна ЄС проводить власну оцінку. Тож перший крок — отримати австрійський <strong>Behindertenpass</strong> — офіційну картку з фотографією, відсотком інвалідності та додатковими позначками.</>,
    step1NoteInfo: <>Право на Behindertenpass мають особи зі ступенем інвалідності <strong>(Grad der Behinderung) від 50% і вище</strong>, які проживають або постійно перебувають в Австрії.</>,
    whereLabel: 'Куди звертатися',
    whereP: <>Усіма питаннями займається <strong>Sozialministeriumservice</strong>. Подати заяву можна трьома способами:</>,
    whereItems: [
      { icon: '💻', title: 'Онлайн', desc: 'через sozialministeriumservice.gv.at (потрібна ID Austria)', link: 'https://www.sozialministeriumservice.at' },
      { icon: '📬', title: 'Поштою', desc: 'надіслати заповнений паперовий формуляр', link: null },
      { icon: '🏢', title: 'Особисто', desc: 'без попереднього запису в будь-яке відділення', link: null },
    ],
    docsLabel: 'Які документи потрібні',
    step1Docs: [
      'Паспорт або ID-картка (для українців зі статусом переміщеної особи — «Ausweis für Vertriebene»)',
      'Українське посвідчення інвалідності з нотаріально завіреним перекладом на німецьку',
      'Медичні документи з України (діагнози, висновки, результати обстежень) — також у перекладі',
      'Австрійські медичні висновки, якщо дитина вже спостерігалась у місцевих лікарів',
    ],
    step1Tip: 'Чим більше медичної документації — тим швидше пройде процедура. Важливо, щоб із документів чітко були видні діагнози та захворювання.',
    step1InfoIdAustria: <>Для онлайн-заяви потрібна <strong>ID Austria</strong>.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>Як її отримати — читайте у нашій статті →</Link></>,
    whatNextLabel: 'Що відбувається далі',
    step1WhatNext: <>Після подачі заяви розпочинається <strong>«Feststellungsverfahren»</strong> — процедура встановлення ступеня інвалідності. Лікарі-експерти вивчають усі надані документи й визначають відсоток за австрійською шкалою. Якщо рішення вас не влаштовує — протягом <strong>шести тижнів</strong> можна подати заперечення.</>,
    step2Title: 'Підвищена Familienbeihilfe (додатково до звичайної)',
    step2P1: 'Після підтвердження ступеня інвалідності від 50% відкривається право на підвищену Familienbeihilfe.',
    step2P2: <>Ця виплата <strong>додається до звичайної Familienbeihilfe (Kinderbeihilfe)</strong>, яку ви отримуєте на дитину.</>,
    step2Cards: [
      { amount: '189,20 €', label: 'на місяць', desc: 'підвищена Familienbeihilfe (2026)' },
      { amount: '70,90 €', label: 'на місяць', desc: 'Kinderabsetzbetrag (автоматично)' },
    ],
    step2NoteInfo: <><strong>Kinderabsetzbetrag</strong> (70,90 €/міс) виплачується автоматично разом із Familienbeihilfe — його не потрібно запитувати окремо.</>,
    step2NoteWarning: <><strong>Для українських сімей:</strong> з листопада 2025 по червень 2026 Familienbeihilfe отримують лише батьки, які або працюють, або зареєстровані в AMS. <strong>Але є виняток:</strong> батьки, які доглядають за дитиною зі значною інвалідністю, звільнені від цієї вимоги.</>,
    step2P3: <>Заява на підвищену Familienbeihilfe подається до <strong>Finanzamt Österreich</strong> — через FinanzOnline або поштою. З березня 2023 року як підтвердження достатньо даних із процедури Behindertenpass.</>,
    step3Title: 'Pflegegeld — допомога по догляду',
    step3P: <>Якщо дитина потребує постійного догляду — є ще одна виплата. <strong>Pflegegeld</strong> не залежить від доходу і призначена на покриття витрат, пов&apos;язаних безпосередньо з доглядом.</>,
    step3NoteInfo: <>Право виникає, якщо дитина потребує постійного догляду щонайменше <strong>6 місяців</strong>, і цей догляд становить понад <strong>65 годин на місяць</strong> — це перша, найнижча ступінь.</>,
    step3NoteTip: <>За рішенням австрійського Верховного суду від серпня 2023 року, українські переміщені особи з посвідченням <strong>«Ausweis für Vertriebene»</strong> мають право на Pflegegeld на підставі Директиви ЄС про масовий приплив осіб.</>,
    step3P2: <>Заяву подають до <strong>Pensionsversicherungsanstalt</strong>.</>,
    step4Title: 'Податкові пільги',
    step4P: 'Якщо ви платите податки в Австрії — є суттєвий плюс: податкові відрахування на дитину з інвалідністю.',
    step4Items: [
      { range: '25–49%', text: 'Витрати на лікування, пов\'язані з інвалідністю дитини, можна включати до декларації без утримання «самостійної частини» (Selbstbehalt).' },
      { range: '50% і вище', text: 'Право на щомісячний фіксований вирахування у розмірі 262 євро. Якщо реальні витрати вищі — можна задекларувати їх із підтвердними документами.' },
    ],
    step4AlsoLabel: 'Додатково і без жодного Selbstbehalt можна включити до декларації:',
    step4Docs: [
      'Разові витрати на допоміжні засоби (інвалідний візок, слуховий апарат, адаптацію квартири)',
      'Витрати на лікування',
      'Навчання у спеціальній або реабілітаційній школі чи відвідування майстерні',
    ],
    step4Tip: <>Усе це відображається у щорічній декларації <strong>Einkommensteuererklärung</strong> або <strong>Arbeitnehmerveranlagung</strong>. Навіть за невеликих доходів декларація може повернути частину сплаченого податку.</>,
    summaryH2Before: 'Підсумуємо: ', summaryH2Em: 'що і в якому порядку',
    summarySteps: [
      'Збираємо усі медичні документи з України та замовляємо завірений переклад на німецьку.',
      'Подаємо заяву до Sozialministeriumservice на встановлення ступеня інвалідності та отримання Behindertenpass.',
      'Після отримання Behindertenpass — звертаємося до Finanzamt Österreich щодо підвищеної Familienbeihilfe.',
      'Якщо дитина потребує постійного догляду — подаємо заяву до Pensionsversicherungsanstalt на Pflegegeld.',
      'Щороку подаємо декларацію про доходи — Finanzamt рідко нагадує, що вам щось належить, тож тут ініціатива має бути вашою.',
    ],
    summaryFooter: 'Австрійська бюрократія — це, звичайно, окремий вид спорту. Але в цьому випадку фінішна стрічка коштує того, щоб пробігти дистанцію.',
    sourcesLabel: 'Офіційні джерела',
    sources: [
      { label: 'Sozialministeriumservice — Behindertenpass', href: 'https://www.sozialministeriumservice.at' },
      { label: 'Bundeskanzleramt — Familienbeihilfe', href: 'https://www.bundeskanzleramt.gv.at' },
      { label: 'Pensionsversicherungsanstalt — Pflegegeld', href: 'https://www.pensionsversicherung.at' },
      { label: 'oesterreich.gv.at — податкові пільги', href: 'https://www.oesterreich.gv.at' },
    ],
    footerNote: 'Цей матеріал має інформаційний характер і ґрунтується на публічно доступних офіційних джерелах. Актуальність інформації рекомендуємо перевіряти на офіційних державних сайтах Австрії.',
  },
  RU: {
    tag1: 'Семья · Льготы', tag2: '4 шага', tag3: 'Для родителей',
    titleLine1: 'Инвалидность ребёнка в Австрии:', titleEm: 'выплаты, льготы и с чего начать',
    metaTime: '🕐 10 мин чтения', metaParents: '👨‍👩‍👧 Для родителей', metaForeigners: '🇺🇦 Для иностранцев',
    toc: [
      ['#step1', 'Behindertenpass'], ['#step2', 'Повышенная Familienbeihilfe'],
      ['#step3', 'Pflegegeld'], ['#step4', 'Налоговые льготы'],
    ],
    backLink: '← Все статьи',
    disclaimer: 'Этот материал подготовлен на основе публично доступных официальных источников и опыта людей, которые прошли этот процесс. QLIXA не является юридическим агентством и не предоставляет индивидуальных консультаций. Каждый случай рассматривается индивидуально — рекомендуем также обратиться в Sozialministeriumservice для получения персональной консультации.',
    introP1: 'Вы приехали в Австрию с ребёнком, которому в Украине установили инвалидность. Новая страна, новая система, новый язык — и куча вопросов.',
    introP2: <><strong>Хорошая новость:</strong> Австрия действительно предусмотрела поддержку для таких семей.{' '}<strong>Плохая:</strong> это не происходит автоматически.</>,
    step1Title: 'Австрийский Behindertenpass',
    step1P: <>Украинское удостоверение инвалида в Австрии юридически не действует. Каждая страна ЕС проводит собственную оценку. Поэтому первый шаг — получить австрийский <strong>Behindertenpass</strong> — официальную карту с фотографией, процентом инвалидности и дополнительными отметками.</>,
    step1NoteInfo: <>Право на Behindertenpass имеют лица со степенью инвалидности <strong>(Grad der Behinderung) от 50% и выше</strong>, проживающие или постоянно находящиеся в Австрии.</>,
    whereLabel: 'Куда обращаться',
    whereP: <>Всеми вопросами занимается <strong>Sozialministeriumservice</strong>. Подать заявление можно тремя способами:</>,
    whereItems: [
      { icon: '💻', title: 'Онлайн', desc: 'через sozialministeriumservice.gv.at (нужна ID Austria)', link: 'https://www.sozialministeriumservice.at' },
      { icon: '📬', title: 'Почтой', desc: 'отправить заполненный бумажный формуляр', link: null },
      { icon: '🏢', title: 'Лично', desc: 'без предварительной записи в любое отделение', link: null },
    ],
    docsLabel: 'Какие документы нужны',
    step1Docs: [
      'Паспорт или ID-карта (для украинцев со статусом перемещённого лица — «Ausweis für Vertriebene»)',
      'Украинское удостоверение инвалидности с нотариально заверенным переводом на немецкий',
      'Медицинские документы из Украины (диагнозы, заключения, результаты обследований) — также в переводе',
      'Австрийские медицинские заключения, если ребёнок уже наблюдался у местных врачей',
    ],
    step1Tip: 'Чем больше медицинской документации — тем быстрее пройдёт процедура. Важно, чтобы из документов чётко были видны диагнозы и заболевания.',
    step1InfoIdAustria: <>Для онлайн-заявления нужна <strong>ID Austria</strong>.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>Как её получить — читайте в нашей статье →</Link></>,
    whatNextLabel: 'Что происходит дальше',
    step1WhatNext: <>После подачи заявления начинается <strong>«Feststellungsverfahren»</strong> — процедура установления степени инвалидности. Врачи-эксперты изучают все предоставленные документы и определяют процент по австрийской шкале. Если решение вас не устраивает — в течение <strong>шести недель</strong> можно подать возражение.</>,
    step2Title: 'Повышенная Familienbeihilfe (дополнительно к обычной)',
    step2P1: 'После подтверждения степени инвалидности от 50% открывается право на повышенную Familienbeihilfe.',
    step2P2: <>Эта выплата <strong>добавляется к обычной Familienbeihilfe (Kinderbeihilfe)</strong>, которую вы получаете на ребёнка.</>,
    step2Cards: [
      { amount: '189,20 €', label: 'на месяц', desc: 'повышенная Familienbeihilfe (2026)' },
      { amount: '70,90 €', label: 'на месяц', desc: 'Kinderabsetzbetrag (автоматически)' },
    ],
    step2NoteInfo: <><strong>Kinderabsetzbetrag</strong> (70,90 €/мес) выплачивается автоматически вместе с Familienbeihilfe — его не нужно запрашивать отдельно.</>,
    step2NoteWarning: <><strong>Для украинских семей:</strong> с ноября 2025 по июнь 2026 Familienbeihilfe получают только родители, которые либо работают, либо зарегистрированы в AMS. <strong>Но есть исключение:</strong> родители, ухаживающие за ребёнком со значительной инвалидностью, освобождены от этого требования.</>,
    step2P3: <>Заявление на повышенную Familienbeihilfe подаётся в <strong>Finanzamt Österreich</strong> — через FinanzOnline или почтой. С марта 2023 года в качестве подтверждения достаточно данных из процедуры Behindertenpass.</>,
    step3Title: 'Pflegegeld — пособие по уходу',
    step3P: <>Если ребёнку требуется постоянный уход — есть ещё одна выплата. <strong>Pflegegeld</strong> не зависит от дохода и предназначена для покрытия расходов, связанных непосредственно с уходом.</>,
    step3NoteInfo: <>Право возникает, если ребёнку требуется постоянный уход минимум <strong>6 месяцев</strong>, и этот уход составляет более <strong>65 часов в месяц</strong> — это первая, самая низкая степень.</>,
    step3NoteTip: <>По решению австрийского Верховного суда от августа 2023 года, украинские перемещённые лица с удостоверением <strong>«Ausweis für Vertriebene»</strong> имеют право на Pflegegeld на основании Директивы ЕС о массовом притоке лиц.</>,
    step3P2: <>Заявление подают в <strong>Pensionsversicherungsanstalt</strong>.</>,
    step4Title: 'Налоговые льготы',
    step4P: 'Если вы платите налоги в Австрии — есть существенный плюс: налоговые вычеты на ребёнка с инвалидностью.',
    step4Items: [
      { range: '25–49%', text: 'Расходы на лечение, связанные с инвалидностью ребёнка, можно включать в декларацию без удержания «самостоятельной части» (Selbstbehalt).' },
      { range: '50% и выше', text: 'Право на ежемесячный фиксированный вычет в размере 262 евро. Если реальные расходы выше — можно задекларировать их с подтверждающими документами.' },
    ],
    step4AlsoLabel: 'Дополнительно и без какого-либо Selbstbehalt можно включить в декларацию:',
    step4Docs: [
      'Разовые расходы на вспомогательные средства (инвалидная коляска, слуховой аппарат, адаптация квартиры)',
      'Расходы на лечение',
      'Обучение в специальной или реабилитационной школе или посещение мастерской',
    ],
    step4Tip: <>Всё это отражается в ежегодной декларации <strong>Einkommensteuererklärung</strong> или <strong>Arbeitnehmerveranlagung</strong>. Даже при небольших доходах декларация может вернуть часть уплаченного налога.</>,
    summaryH2Before: 'Подведём итог: ', summaryH2Em: 'что и в каком порядке',
    summarySteps: [
      'Собираем все медицинские документы из Украины и заказываем заверенный перевод на немецкий.',
      'Подаём заявление в Sozialministeriumservice на установление степени инвалидности и получение Behindertenpass.',
      'После получения Behindertenpass — обращаемся в Finanzamt Österreich по поводу повышенной Familienbeihilfe.',
      'Если ребёнку требуется постоянный уход — подаём заявление в Pensionsversicherungsanstalt на Pflegegeld.',
      'Ежегодно подаём декларацию о доходах — Finanzamt редко напоминает, что вам что-то причитается, поэтому тут инициатива должна быть вашей.',
    ],
    summaryFooter: 'Австрийская бюрократия — это, конечно, отдельный вид спорта. Но в этом случае финишная лента стоит того, чтобы пробежать дистанцию.',
    sourcesLabel: 'Официальные источники',
    sources: [
      { label: 'Sozialministeriumservice — Behindertenpass', href: 'https://www.sozialministeriumservice.at' },
      { label: 'Bundeskanzleramt — Familienbeihilfe', href: 'https://www.bundeskanzleramt.gv.at' },
      { label: 'Pensionsversicherungsanstalt — Pflegegeld', href: 'https://www.pensionsversicherung.at' },
      { label: 'oesterreich.gv.at — налоговые льготы', href: 'https://www.oesterreich.gv.at' },
    ],
    footerNote: 'Этот материал носит информационный характер и основан на публично доступных официальных источниках. Актуальность информации рекомендуем проверять на официальных государственных сайтах Австрии.',
  },
  EN: {
    tag1: 'Family · Benefits', tag2: '4 Steps', tag3: 'For Parents',
    titleLine1: 'Child Disability in Austria:', titleEm: 'payments, benefits, and where to start',
    metaTime: '🕐 10 min read', metaParents: '👨‍👩‍👧 For parents', metaForeigners: '🇺🇦 For foreigners',
    toc: [
      ['#step1', 'Behindertenpass'], ['#step2', 'Increased Familienbeihilfe'],
      ['#step3', 'Pflegegeld'], ['#step4', 'Tax Benefits'],
    ],
    backLink: '← All Articles',
    disclaimer: 'This material is based on publicly available official sources and the experience of people who have gone through this process. QLIXA is not a legal agency and does not provide individual consultations. Each case is considered individually — we also recommend contacting the Sozialministeriumservice for a personal consultation.',
    introP1: 'You came to Austria with a child who was diagnosed with a disability in Ukraine. A new country, a new system, a new language — and a ton of questions.',
    introP2: <><strong>Good news:</strong> Austria does provide support for such families.{' '}<strong>Bad news:</strong> it doesn&apos;t happen automatically.</>,
    step1Title: 'The Austrian Behindertenpass',
    step1P: <>A Ukrainian disability certificate is not legally valid in Austria. Every EU country conducts its own assessment. So the first step is to get the Austrian <strong>Behindertenpass</strong> — an official card with a photo, disability percentage, and additional markings.</>,
    step1NoteInfo: <>The right to a Behindertenpass belongs to people with a degree of disability <strong>(Grad der Behinderung) of 50% or higher</strong> who live or permanently reside in Austria.</>,
    whereLabel: 'Where to apply',
    whereP: <>The <strong>Sozialministeriumservice</strong> handles all these matters. You can submit an application three ways:</>,
    whereItems: [
      { icon: '💻', title: 'Online', desc: 'via sozialministeriumservice.gv.at (requires ID Austria)', link: 'https://www.sozialministeriumservice.at' },
      { icon: '📬', title: 'By mail', desc: 'send a completed paper form', link: null },
      { icon: '🏢', title: 'In person', desc: 'no appointment needed, at any office', link: null },
    ],
    docsLabel: 'Required documents',
    step1Docs: [
      'Passport or ID card (for Ukrainians with displaced person status — "Ausweis für Vertriebene")',
      'Ukrainian disability certificate with a notarized German translation',
      'Medical documents from Ukraine (diagnoses, findings, test results) — also translated',
      'Austrian medical reports, if the child has already been seen by local doctors',
    ],
    step1Tip: "The more medical documentation you have, the faster the process will go. It's important that the diagnoses and conditions are clearly visible in the documents.",
    step1InfoIdAustria: <>You need an <strong>ID Austria</strong> for the online application.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>Read our article on how to get one →</Link></>,
    whatNextLabel: 'What happens next',
    step1WhatNext: <>After submitting the application, the <strong>&quot;Feststellungsverfahren&quot;</strong> begins — the procedure for establishing the degree of disability. Medical experts review all submitted documents and determine the percentage on the Austrian scale. If you disagree with the decision, you can file an objection within <strong>six weeks</strong>.</>,
    step2Title: 'Increased Familienbeihilfe (in addition to the regular one)',
    step2P1: 'Once a disability level of 50% or higher is confirmed, you become eligible for increased Familienbeihilfe.',
    step2P2: <>This payment is <strong>added to the regular Familienbeihilfe (Kinderbeihilfe)</strong> you already receive for your child.</>,
    step2Cards: [
      { amount: '189,20 €', label: 'per month', desc: 'increased Familienbeihilfe (2026)' },
      { amount: '70,90 €', label: 'per month', desc: 'Kinderabsetzbetrag (automatic)' },
    ],
    step2NoteInfo: <><strong>Kinderabsetzbetrag</strong> (€70.90/month) is paid automatically together with Familienbeihilfe — you don&apos;t need to request it separately.</>,
    step2NoteWarning: <><strong>For Ukrainian families:</strong> from November 2025 to June 2026, Familienbeihilfe is only paid to parents who either work or are registered with AMS. <strong>But there&apos;s an exception:</strong> parents caring for a child with a significant disability are exempt from this requirement.</>,
    step2P3: <>The application for increased Familienbeihilfe is submitted to the <strong>Finanzamt Österreich</strong> — via FinanzOnline or by mail. Since March 2023, the data from the Behindertenpass procedure is sufficient as confirmation.</>,
    step3Title: 'Pflegegeld — care allowance',
    step3P: <>If your child needs constant care, there&apos;s another payment available. <strong>Pflegegeld</strong> doesn&apos;t depend on income and is intended to cover expenses directly related to care.</>,
    step3NoteInfo: <>The right arises if the child needs constant care for at least <strong>6 months</strong>, and this care amounts to more than <strong>65 hours per month</strong> — this is the first, lowest level.</>,
    step3NoteTip: <>Following a ruling by the Austrian Supreme Court from August 2023, Ukrainian displaced persons with an <strong>&quot;Ausweis für Vertriebene&quot;</strong> are entitled to Pflegegeld under the EU Mass Influx Directive.</>,
    step3P2: <>The application is submitted to the <strong>Pensionsversicherungsanstalt</strong>.</>,
    step4Title: 'Tax benefits',
    step4P: "If you pay taxes in Austria, there's a significant advantage: tax deductions for a child with a disability.",
    step4Items: [
      { range: '25–49%', text: 'Treatment costs related to the child\'s disability can be included in the tax return without deducting the "personal contribution" (Selbstbehalt).' },
      { range: '50% and above', text: 'Right to a monthly fixed deduction of €262. If actual costs are higher, you can declare them with supporting documents.' },
    ],
    step4AlsoLabel: 'Additionally, and without any Selbstbehalt, you can include in your tax return:',
    step4Docs: [
      'One-time expenses for assistive devices (wheelchair, hearing aid, apartment adaptation)',
      'Treatment costs',
      'Education at a special or rehabilitation school, or attending a workshop',
    ],
    step4Tip: <>All of this is reflected in the annual <strong>Einkommensteuererklärung</strong> or <strong>Arbeitnehmerveranlagung</strong>. Even with a small income, the declaration can refund part of the taxes paid.</>,
    summaryH2Before: 'Summary: ', summaryH2Em: 'what to do and in what order',
    summarySteps: [
      'Gather all medical documents from Ukraine and order a certified German translation.',
      'Submit an application to the Sozialministeriumservice to establish the degree of disability and get the Behindertenpass.',
      'After receiving the Behindertenpass, contact the Finanzamt Österreich about increased Familienbeihilfe.',
      'If your child needs constant care, submit an application to the Pensionsversicherungsanstalt for Pflegegeld.',
      "File an income tax return every year — the Finanzamt rarely reminds you that you're owed something, so the initiative has to be yours.",
    ],
    summaryFooter: "Austrian bureaucracy is, of course, its own sport. But in this case, the finish line is worth running the distance for.",
    sourcesLabel: 'Official sources',
    sources: [
      { label: 'Sozialministeriumservice — Behindertenpass', href: 'https://www.sozialministeriumservice.at' },
      { label: 'Bundeskanzleramt — Familienbeihilfe', href: 'https://www.bundeskanzleramt.gv.at' },
      { label: 'Pensionsversicherungsanstalt — Pflegegeld', href: 'https://www.pensionsversicherung.at' },
      { label: 'oesterreich.gv.at — tax benefits', href: 'https://www.oesterreich.gv.at' },
    ],
    footerNote: 'This material is for informational purposes and is based on publicly available official sources. We recommend checking the current information on official Austrian government websites.',
  },
  DE: {
    tag1: 'Familie · Leistungen', tag2: '4 Schritte', tag3: 'Für Eltern',
    titleLine1: 'Kindesbehinderung in Österreich:', titleEm: 'Leistungen, Vergünstigungen und erste Schritte',
    metaTime: '🕐 10 Min. Lesezeit', metaParents: '👨‍👩‍👧 Für Eltern', metaForeigners: '🇺🇦 Für Ausländer',
    toc: [
      ['#step1', 'Behindertenpass'], ['#step2', 'Erhöhte Familienbeihilfe'],
      ['#step3', 'Pflegegeld'], ['#step4', 'Steuervorteile'],
    ],
    backLink: '← Alle Artikel',
    disclaimer: 'Dieses Material basiert auf öffentlich zugänglichen offiziellen Quellen und den Erfahrungen von Menschen, die diesen Prozess durchlaufen haben. QLIXA ist keine Rechtsberatung und bietet keine individuelle Beratung. Jeder Fall wird individuell betrachtet — wir empfehlen außerdem, sich für eine persönliche Beratung an das Sozialministeriumservice zu wenden.',
    introP1: 'Du bist mit einem Kind nach Österreich gekommen, dem in der Ukraine eine Behinderung festgestellt wurde. Neues Land, neues System, neue Sprache — und jede Menge Fragen.',
    introP2: <><strong>Gute Nachricht:</strong> Österreich hat tatsächlich Unterstützung für solche Familien vorgesehen.{' '}<strong>Schlechte:</strong> Das passiert nicht automatisch.</>,
    step1Title: 'Der österreichische Behindertenpass',
    step1P: <>Ein ukrainischer Behindertenausweis gilt in Österreich rechtlich nicht. Jedes EU-Land führt eine eigene Begutachtung durch. Der erste Schritt ist daher, den österreichischen <strong>Behindertenpass</strong> zu erhalten — eine offizielle Karte mit Foto, Behinderungsgrad und zusätzlichen Vermerken.</>,
    step1NoteInfo: <>Anspruch auf den Behindertenpass haben Personen mit einem <strong>Grad der Behinderung von 50% oder mehr</strong>, die in Österreich wohnen oder sich dauerhaft aufhalten.</>,
    whereLabel: 'Wohin wenden',
    whereP: <>Für alle Fragen ist das <strong>Sozialministeriumservice</strong> zuständig. Du kannst den Antrag auf drei Wegen einreichen:</>,
    whereItems: [
      { icon: '💻', title: 'Online', desc: 'über sozialministeriumservice.gv.at (ID Austria erforderlich)', link: 'https://www.sozialministeriumservice.at' },
      { icon: '📬', title: 'Per Post', desc: 'ausgefülltes Papierformular einsenden', link: null },
      { icon: '🏢', title: 'Persönlich', desc: 'ohne vorherige Terminvereinbarung bei jeder Dienststelle', link: null },
    ],
    docsLabel: 'Welche Dokumente benötigt werden',
    step1Docs: [
      'Reisepass oder Personalausweis (für Ukrainer:innen mit dem Status vertriebener Person — „Ausweis für Vertriebene“)',
      'Ukrainischer Behindertenausweis mit notariell beglaubigter deutscher Übersetzung',
      'Medizinische Unterlagen aus der Ukraine (Diagnosen, Befunde, Untersuchungsergebnisse) — ebenfalls übersetzt',
      'Österreichische ärztliche Befunde, falls das Kind bereits bei lokalen Ärzt:innen in Behandlung war',
    ],
    step1Tip: 'Je mehr medizinische Unterlagen vorhanden sind, desto schneller läuft das Verfahren. Wichtig ist, dass Diagnosen und Erkrankungen aus den Unterlagen klar hervorgehen.',
    step1InfoIdAustria: <>Für den Online-Antrag wird eine <strong>ID Austria</strong> benötigt.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>Wie du sie bekommst — lies in unserem Artikel →</Link></>,
    whatNextLabel: 'Was als Nächstes passiert',
    step1WhatNext: <>Nach Einreichung des Antrags beginnt das <strong>&#8222;Feststellungsverfahren&#8220;</strong> — das Verfahren zur Feststellung des Behinderungsgrades. Ärztliche Sachverständige prüfen alle eingereichten Unterlagen und ermitteln den Prozentsatz nach der österreichischen Skala. Wenn dir die Entscheidung nicht zusagt, kannst du innerhalb von <strong>sechs Wochen</strong> Einspruch erheben.</>,
    step2Title: 'Erhöhte Familienbeihilfe (zusätzlich zur regulären)',
    step2P1: 'Nach Bestätigung eines Behinderungsgrades ab 50% besteht Anspruch auf die erhöhte Familienbeihilfe.',
    step2P2: <>Diese Zahlung wird <strong>zur regulären Familienbeihilfe (Kinderbeihilfe) hinzugefügt</strong>, die du für dein Kind erhältst.</>,
    step2Cards: [
      { amount: '189,20 €', label: 'pro Monat', desc: 'erhöhte Familienbeihilfe (2026)' },
      { amount: '70,90 €', label: 'pro Monat', desc: 'Kinderabsetzbetrag (automatisch)' },
    ],
    step2NoteInfo: <>Der <strong>Kinderabsetzbetrag</strong> (70,90 €/Monat) wird automatisch zusammen mit der Familienbeihilfe ausgezahlt — er muss nicht separat beantragt werden.</>,
    step2NoteWarning: <><strong>Für ukrainische Familien:</strong> Von November 2025 bis Juni 2026 erhalten nur Eltern Familienbeihilfe, die entweder arbeiten oder beim AMS gemeldet sind. <strong>Es gibt jedoch eine Ausnahme:</strong> Eltern, die ein Kind mit erheblicher Behinderung betreuen, sind von dieser Voraussetzung befreit.</>,
    step2P3: <>Der Antrag auf erhöhte Familienbeihilfe wird beim <strong>Finanzamt Österreich</strong> eingereicht — über FinanzOnline oder per Post. Seit März 2023 genügen als Nachweis die Daten aus dem Behindertenpass-Verfahren.</>,
    step3Title: 'Pflegegeld — Unterstützung bei der Pflege',
    step3P: <>Wenn dein Kind dauerhafte Pflege benötigt, gibt es eine weitere Leistung. Das <strong>Pflegegeld</strong> ist einkommensunabhängig und dient der Deckung von Kosten, die unmittelbar mit der Pflege zusammenhängen.</>,
    step3NoteInfo: <>Der Anspruch entsteht, wenn das Kind mindestens <strong>6 Monate</strong> lang dauerhafte Pflege benötigt und dieser Pflegeaufwand mehr als <strong>65 Stunden im Monat</strong> beträgt — das ist die erste, niedrigste Stufe.</>,
    step3NoteTip: <>Laut einer Entscheidung des österreichischen Verwaltungsgerichtshofs vom August 2023 haben ukrainische Vertriebene mit dem Ausweis <strong>&#8222;Ausweis für Vertriebene&#8220;</strong> auf Grundlage der EU-Massenzustrom-Richtlinie Anspruch auf Pflegegeld.</>,
    step3P2: <>Der Antrag wird bei der <strong>Pensionsversicherungsanstalt</strong> eingereicht.</>,
    step4Title: 'Steuervorteile',
    step4P: 'Wenn du in Österreich Steuern zahlst, gibt es einen wesentlichen Vorteil: Steuerabsetzungen für ein Kind mit Behinderung.',
    step4Items: [
      { range: '25–49%', text: 'Behandlungskosten im Zusammenhang mit der Behinderung des Kindes können ohne Abzug des „Selbstbehalts“ in die Steuererklärung aufgenommen werden.' },
      { range: '50% und mehr', text: 'Anspruch auf einen monatlichen Pauschalabzug von 262 Euro. Sind die tatsächlichen Kosten höher, können sie mit Belegen geltend gemacht werden.' },
    ],
    step4AlsoLabel: 'Zusätzlich und ohne jeden Selbstbehalt können in die Steuererklärung aufgenommen werden:',
    step4Docs: [
      'Einmalige Kosten für Hilfsmittel (Rollstuhl, Hörgerät, Wohnungsanpassung)',
      'Behandlungskosten',
      'Schulbesuch in einer Sonder- oder Rehabilitationsschule oder Besuch einer Werkstatt',
    ],
    step4Tip: <>All das wird in der jährlichen <strong>Einkommensteuererklärung</strong> oder <strong>Arbeitnehmerveranlagung</strong> berücksichtigt. Auch bei geringem Einkommen kann die Erklärung einen Teil der gezahlten Steuer zurückbringen.</>,
    summaryH2Before: 'Zusammenfassung: ', summaryH2Em: 'was und in welcher Reihenfolge',
    summarySteps: [
      'Sammle alle medizinischen Unterlagen aus der Ukraine und bestelle eine beglaubigte deutsche Übersetzung.',
      'Reiche beim Sozialministeriumservice einen Antrag auf Feststellung des Behinderungsgrades und Erhalt des Behindertenpasses ein.',
      'Nach Erhalt des Behindertenpasses wende dich wegen der erhöhten Familienbeihilfe an das Finanzamt Österreich.',
      'Wenn dein Kind dauerhafte Pflege benötigt, reiche bei der Pensionsversicherungsanstalt einen Antrag auf Pflegegeld ein.',
      'Reiche jedes Jahr eine Steuererklärung ein — das Finanzamt erinnert selten daran, dass dir etwas zusteht, daher liegt die Initiative bei dir.',
    ],
    summaryFooter: 'Die österreichische Bürokratie ist natürlich eine eigene Sportart. Aber in diesem Fall lohnt sich das Ziel, die Strecke zu laufen.',
    sourcesLabel: 'Offizielle Quellen',
    sources: [
      { label: 'Sozialministeriumservice — Behindertenpass', href: 'https://www.sozialministeriumservice.at' },
      { label: 'Bundeskanzleramt — Familienbeihilfe', href: 'https://www.bundeskanzleramt.gv.at' },
      { label: 'Pensionsversicherungsanstalt — Pflegegeld', href: 'https://www.pensionsversicherung.at' },
      { label: 'oesterreich.gv.at — Steuervorteile', href: 'https://www.oesterreich.gv.at' },
    ],
    footerNote: 'Dieses Material dient nur zu Informationszwecken und basiert auf öffentlich zugänglichen offiziellen Quellen. Wir empfehlen, die Aktualität der Informationen auf offiziellen staatlichen Websites Österreichs zu überprüfen.',
  },
}

export default function InvalidityChildPage() {
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

  const t = IC_TEXT[lang] || IC_TEXT.UA

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
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const, fontSize: 13, color: '#888' }}>
                <span>{t.metaTime}</span>
                <span>{t.metaParents}</span>
                <span>{t.metaForeigners}</span>
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

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          <ArticleTOC items={t.toc} />

          {/* Back link */}
          <Link href="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text3)', textDecoration: 'none', marginBottom: 32 }}>
            {t.backLink}
          </Link>

          {/* Disclaimer */}
          <div style={{ background: '#FFF8E7', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 12, padding: '16px 20px', marginBottom: 32, fontSize: 13, color: '#595959', lineHeight: 1.6 }}>
            ⚠️ <strong>{lang === 'UA' ? 'Важливо:' : lang === 'RU' ? 'Важно:' : lang === 'DE' ? 'Wichtig:' : 'Important:'}</strong> {t.disclaimer}
          </div>

          {/* Intro */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>
              {t.introP1}
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)' }}>
              {t.introP2}
            </p>
          </div>

          {/* STEP 1 */}
          <StepCard id="step1" n={1} title={t.step1Title}>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--charcoal)', marginBottom: 14 }}>
              {t.step1P}
            </p>
            <NoteBox type="info">
              {t.step1NoteInfo}
            </NoteBox>

            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 12px' }}>{t.whereLabel}</h3>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 12 }}>
              {t.whereP}
            </p>
            {t.whereItems.map((item: any, i: number) => (
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

            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 12px' }}>{t.docsLabel}</h3>
            {t.step1Docs.map((doc: string, i: number) => <DocItem key={i} text={doc} />)}

            <NoteBox type="tip">
              {t.step1Tip}
            </NoteBox>
            <NoteBox type="info">
              {t.step1InfoIdAustria}
            </NoteBox>

            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '20px 0 10px' }}>{t.whatNextLabel}</h3>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
              {t.step1WhatNext}
            </p>
          </StepCard>

          {/* STEP 2 */}
          <StepCard id="step2" n={2} title={t.step2Title}>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--charcoal)', marginBottom: 10 }}>
              {t.step2P1}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--charcoal)', marginBottom: 16 }}>
              {t.step2P2}
            </p>

            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', marginBottom: 16 }}>
              {t.step2Cards.map((card: any) => (
                <div key={card.desc} style={{ background: 'var(--peach-light)', borderRadius: 12, padding: '16px 18px', border: '1px solid var(--orange-mid)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 28, color: '#038390', lineHeight: 1 }}>{card.amount}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>{card.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--charcoal)', marginTop: 6, fontWeight: 500 }}>{card.desc}</div>
                </div>
              ))}
            </div>

            <NoteBox type="info">
              {t.step2NoteInfo}
            </NoteBox>
            <NoteBox type="warning">
              {t.step2NoteWarning}
            </NoteBox>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginTop: 12 }}>
              {t.step2P3}
            </p>
          </StepCard>

          {/* STEP 3 */}
          <StepCard id="step3" n={3} title={t.step3Title}>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--charcoal)', marginBottom: 14 }}>
              {t.step3P}
            </p>
            <NoteBox type="info">
              {t.step3NoteInfo}
            </NoteBox>
            <NoteBox type="tip">
              {t.step3NoteTip}
            </NoteBox>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginTop: 12 }}>
              {t.step3P2}
            </p>
          </StepCard>

          {/* STEP 4 */}
          <StepCard id="step4" n={4} title={t.step4Title}>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--charcoal)', marginBottom: 16 }}>
              {t.step4P}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {t.step4Items.map((item: any, i: number) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 16px', borderRadius: 12, background: 'var(--gray)', border: '1px solid var(--line)' }}>
                  <div style={{ padding: '4px 10px', borderRadius: 6, background: '#038390', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0, height: 'fit-content' }}>
                    {item.range}
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.6 }}>{item.text}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>
              {t.step4AlsoLabel}
            </p>
            {t.step4Docs.map((doc: string, i: number) => <DocItem key={i} text={doc} />)}

            <NoteBox type="tip">
              {t.step4Tip}
            </NoteBox>
          </StepCard>

          {/* Summary */}
          <div style={{ background: 'var(--peach-light)', borderRadius: 16, padding: 24, border: '1px solid var(--orange-mid)', marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 20 }}>
              {t.summaryH2Before}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.summaryH2Em}</em>
            </h2>
            {t.summarySteps.map((step: string, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#038390', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.65 }}>{step}</span>
              </div>
            ))}
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginTop: 16, fontStyle: 'italic' }}>
              {t.summaryFooter}
            </p>
          </div>

          {/* Sources */}
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 22 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>
              {t.sourcesLabel}
            </p>
            {t.sources.map((s: any) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', fontSize: 13, color: '#038390', textDecoration: 'none', marginBottom: 6 }}>
                ↗ {s.label}
              </a>
            ))}
          </div>

          <div style={{ background: 'var(--gray)', borderRadius: 10, padding: '13px 16px', fontSize: 12, color: 'var(--text3)', lineHeight: 1.6, marginTop: 24, border: '1px solid var(--line)' }}>
            {t.footerNote}
          </div>

          {/* Prev / Next */}
          <ArticlePrevNext currentSlug="invalidity-child" />

        </div>{/* end main content */}
      </div>{/* end flex wrapper */}

      <Footer />
    </div>
  )
}
