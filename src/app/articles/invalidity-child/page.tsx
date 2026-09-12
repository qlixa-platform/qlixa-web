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
    metaTime: '🕐 10 хв читання', metaParents: '👨‍👩‍👧 Для батьків', metaForeigners: '🌍 Для іноземців',
    toc: [
      ['#step1', 'Behindertenpass'], ['#step2', 'Підвищена Familienbeihilfe'],
      ['#step3', 'Pflegegeld'], ['#step4', 'Податкові пільги'],
    ],
    backLink: '← Всі статті',
    disclaimer: 'Матеріал має інформаційний характер і не є юридичною, податковою чи соціально-правовою консультацією. Умови залежать від конкретної ситуації та можуть змінюватися. Перед поданням заяви перевір актуальні вимоги у Sozialministeriumservice, Finanzamt Österreich або відповідного страхового органу.',
    introP1: 'Якщо у дитини є інвалідність або тривалі обмеження за станом здоров’я, в Австрії можуть бути доступні різні види підтримки.',
    introP2: 'Якщо інвалідність була встановлена в іншій країні, австрійські органи можуть проводити власну оцінку відповідно до місцевих правил.',
    step1Title: 'Австрійський Behindertenpass',
    step1P: <>Документ про інвалідність, виданий в іншій країні, сам по собі не замінює австрійське встановлення ступеня інвалідності для Behindertenpass. Водночас іноземні медичні документи можуть бути важливими під час оцінювання.<br /><br /><strong>Behindertenpass</strong> — це офіційний документ із фотографією, який слугує єдиним федеральним підтвердженням інвалідності в Австрії.</>,
    step1NoteInfo: <>Він, як правило, доступний за встановленого ступеня інвалідності (<strong>Grad der Behinderung / Minderung der Erwerbsfähigkeit</strong>) від 50% і вище, за умови проживання або постійного перебування в Австрії.</>,
    step1NoteNoBenefit: 'Сам Behindertenpass не означає автоматичного призначення Familienbeihilfe, Pflegegeld або інших виплат — для кожної з них діють окремі умови.',
    whereLabel: 'Куди звертатися',
    whereP: <>Усіма питаннями займається <strong>Sozialministeriumservice</strong>. Подати заяву можна трьома способами:</>,
    whereItems: [
      { icon: '💻', title: 'Онлайн', desc: 'через sozialministeriumservice.gv.at (потрібна ID Austria)', link: 'https://www.sozialministeriumservice.at' },
      { icon: '📬', title: 'Поштою', desc: 'надіслати заповнений паперовий формуляр', link: null },
      { icon: '🏢', title: 'Особисто', desc: 'у відповідному відділенні Sozialministeriumservice', link: null },
    ],
    docsLabel: 'Які документи можуть знадобитися',
    step1Docs: [
      'Заява на видачу Behindertenpass',
      'Актуальні медичні документи (висновки, довідки, результати обстежень) — зазвичай не старші 2 років',
      'Підтвердження місця проживання в Австрії (наприклад, Meldezettel)',
      'Актуальне паспортне фото — за потреби, якщо придатне фото ще не наявне в державних реєстрах',
      'Для громадян країн поза ЄС/ЄЕП — чинний документ, що підтверджує право на проживання в Австрії',
    ],
    step1TranslationNote: 'Переклад документів, виданих за межами Австрії, може знадобитися залежно від конкретного випадку — це варто уточнити в Sozialministeriumservice заздалегідь.',
    step1Tip: 'Важливо подати актуальні та змістовні медичні документи, з яких зрозумілі діагнози, функціональні обмеження, лікування та актуальний стан дитини.',
    step1InfoIdAustria: <>Для онлайн-заяви потрібна <strong>ID Austria</strong>.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>Як її отримати — читайте у нашій статті →</Link></>,
    whatNextLabel: 'Що відбувається далі',
    step1WhatNext: <>Якщо ступінь інвалідності ще не встановлено іншим офіційним австрійським рішенням, оцінку проводить лікар-експерт <strong>Sozialministeriumservice</strong>. За можливості оцінка ґрунтується на поданих медичних документах без особистого огляду; за потреби можуть запросити додаткові документи або призначити огляд. У разі негативного рішення можна подати <strong>Beschwerde</strong> до <strong>Bundesverwaltungsgericht</strong> протягом <strong>шести тижнів</strong> з моменту вручення рішення.</>,
    step2Title: 'Підвищена Familienbeihilfe (додатково до звичайної)',
    step2P1: 'За ступеня інвалідності щонайменше 50% або за встановленої тривалої нездатності самостійно себе утримувати може виникнути право на підвищену Familienbeihilfe — за умови, що загальні умови Familienbeihilfe також виконуються.',
    step2P2: <>Ця виплата <strong>додається до звичайної Familienbeihilfe (Kinderbeihilfe)</strong>, яку ви отримуєте на дитину, і триває, доки виплачується звичайна Familienbeihilfe.</>,
    step2Cards: [
      { amount: '189,20 €', label: 'на місяць', desc: 'підвищена Familienbeihilfe (2026)' },
      { amount: '70,90 €', label: 'на місяць', desc: 'Kinderabsetzbetrag — не пов’язаний з інвалідністю' },
    ],
    step2NoteInfo: <><strong>Kinderabsetzbetrag</strong> (70,90 €/міс) виплачується автоматично разом із Familienbeihilfe для кожної дитини — його не потрібно запитувати окремо, і він не є частиною підвищеної Familienbeihilfe через інвалідність.</>,
    step2NoteBehindertenpass: 'Для дітей до 18 років дані з процедури отримання Behindertenpass можуть використовуватися як підтвердження для підвищеної Familienbeihilfe — це може дозволити уникнути окремого медичного оцінювання. Однак сам факт наявності Behindertenpass автоматично не гарантує право на підвищену Familienbeihilfe.',
    step2NoteRetro: 'Підвищену Familienbeihilfe за відповідних умов можна отримати заднім числом, але максимум за п’ять років від місяця подання заяви.',
    step2P3: <>Заяву на підвищену Familienbeihilfe подають до <strong>Finanzamt Österreich</strong> — через FinanzOnline або поштою.</>,
    step3Title: 'Pflegegeld — допомога по догляду',
    step3P: <>Якщо дитина потребує постійного догляду — є ще одна виплата. <strong>Pflegegeld</strong> не залежить від доходу і призначена на покриття витрат, пов&apos;язаних безпосередньо з доглядом.</>,
    step3NoteInfo: 'Догляд має бути потрібним щонайменше 6 місяців. Понад 65 годин догляду на місяць — це базова умова для можливого призначення Pflegegeld. Розмір виплати залежить від встановленого рівня потреби в догляді — рівнів декілька.',
    step3Procedure: 'Процедура зазвичай включає: подання заяви, надання наявної медичної документації, оцінку потреби в догляді (часто через візит лікаря або кваліфікованого медичного працівника додому) та письмове рішення (Bescheid).',
    step3P2: 'Заяву подають до відповідного страхового органу (zuständiger Versicherungsträger). Для дітей та багатьох інших випадків це Pensionsversicherung.',
    step3CaregiverTitle: 'Ще одна можливість для батьків',
    step3CaregiverBody: 'Якщо догляд за дитиною значною мірою займає твій час, за певних умов можна безкоштовно застрахувати цей період у системі пенсійного страхування — внески сплачує держава. Умови включають, зокрема, Hauptwohnsitz в Австрії, отримання підвищеної Familienbeihilfe на дитину та вік дитини до 40 років; скористатися цим може лише одна особа.',
    step3CaregiverLinkText: 'oesterreich.gv.at — Пенсійне страхування під час догляду за дитиною з інвалідністю',
    step4Title: 'Податкові пільги',
    step4P: 'Якщо ви платите податки в Австрії, для дитини з інвалідністю передбачені окремі податкові Freibeträge та можливість урахування фактичних витрат.',
    step4Items: [
      { range: '25–34%', text: 'Фіксований річний Freibetrag 124 €, без зменшення на Selbstbehalt.' },
      { range: '35–44%', text: 'Фіксований річний Freibetrag 164 €, без зменшення на Selbstbehalt.' },
      { range: '45–49%', text: 'Фіксований річний Freibetrag 401 €, без зменшення на Selbstbehalt.' },
      { range: 'від 50%', text: 'За умови отримання підвищеної Familienbeihilfe та якщо на дитину не виплачується Pflegegeld — щомісячний паушальний Freibetrag 262 €. Він зменшується на суму отриманого Pflegegeld; якщо Pflegegeld перевищує 262 €, паушал не застосовується.' },
    ],
    step4AlsoLabel: 'Додатково, незалежно від отримання Pflegegeld і без жодного Selbstbehalt, за наявності підтвердних документів можна врахувати фактичні витрати, зокрема:',
    step4Docs: [
      'Разові витрати на допоміжні засоби (Hilfsmittel) — наприклад, інвалідний візок, слуховий апарат, засоби для зору, адаптація житла',
      'Витрати на лікування (Heilbehandlung)',
      'Оплата навчання у спеціальній школі чи Pflegeschule або перебування у Behindertenwerkstätte',
      'Витрати на транспорт між домом дитини та відповідним закладом, якщо використання громадського транспорту є нерозумним',
    ],
    step4Tip: <>Такі Freibeträge та витрати можуть враховуватися в <strong>Arbeitnehmerveranlagung</strong> або <strong>Einkommensteuererklärung</strong> за відповідних умов.</>,
    summaryH2Before: 'З чого ', summaryH2Em: 'можна почати',
    summarySteps: [
      'Зібрати актуальні медичні документи та перевірити вимоги до документів, виданих за межами Австрії.',
      'Перевірити умови Behindertenpass і за потреби подати заяву до Sozialministeriumservice.',
      'Окремо перевірити право на Familienbeihilfe та підвищену Familienbeihilfe.',
      'Якщо дитина потребує тривалого догляду — перевірити умови Pflegegeld.',
      'Перевірити податкові Freibeträge та фактичні витрати, які можуть враховуватися в Arbeitnehmerveranlagung або Einkommensteuererklärung.',
    ],
    summaryFooter: 'Ці процедури мають різні умови — один документ або одна виплата не означають автоматичного права на інші.',
    sourcesLabel: 'Офіційні джерела',
    sources: [
      { label: 'oesterreich.gv.at — Behindertenpass', href: 'https://www.oesterreich.gv.at/de/lexicon/B/Seite.991719' },
      { label: 'Sozialministeriumservice — Behindertenpass', href: 'https://www.sozialministeriumservice.gv.at/Menschen_mit_Behinderung/Behindertenpass_und_Parkausweis/Behindertenpass/Behindertenpass.de.html' },
      { label: 'oesterreich.gv.at — Erhöhte Familienbeihilfe', href: 'https://www.oesterreich.gv.at/de/themen/familie_und_partnerschaft/familienbeihilfe/Seite.1220330' },
      { label: 'oesterreich.gv.at — Höhe der Familienbeihilfe', href: 'https://www.oesterreich.gv.at/de/themen/familie_und_partnerschaft/familienbeihilfe/Seite.080714' },
      { label: 'oesterreich.gv.at — Antrag auf Pflegegeld', href: 'https://www.oesterreich.gv.at/de/themen/pflege/4/1/Seite.360517' },
      { label: 'oesterreich.gv.at — Zuständigkeit für Pflegegeld', href: 'https://www.oesterreich.gv.at/de/themen/pflege/4/Seite.360515' },
      { label: 'BMF — Außergewöhnliche Belastungen für behinderte Kinder', href: 'https://www.bmf.gv.at/themen/steuern/arbeitnehmerveranlagung/was-kann-ich-geltend-machen/aussergewoehnliche-belastungen/aussergewoehnliche-belastungen-fuer-behinderte-kinder.html' },
      { label: 'oesterreich.gv.at — Pensionsversicherung während der Pflege eines behinderten Kindes', href: 'https://www.oesterreich.gv.at/themen/pflege/5/2/Seite.360556.html' },
    ],
    footerNote: 'Цей матеріал має інформаційний характер і ґрунтується на публічно доступних офіційних джерелах. Актуальність інформації рекомендуємо перевіряти на офіційних державних сайтах Австрії.',
  },
  RU: {
    tag1: 'Семья · Льготы', tag2: '4 шага', tag3: 'Для родителей',
    titleLine1: 'Инвалидность ребёнка в Австрии:', titleEm: 'выплаты, льготы и с чего начать',
    metaTime: '🕐 10 мин чтения', metaParents: '👨‍👩‍👧 Для родителей', metaForeigners: '🌍 Для иностранцев',
    toc: [
      ['#step1', 'Behindertenpass'], ['#step2', 'Повышенная Familienbeihilfe'],
      ['#step3', 'Pflegegeld'], ['#step4', 'Налоговые льготы'],
    ],
    backLink: '← Все статьи',
    disclaimer: 'Материал имеет информационный характер и не является юридической, налоговой или социально-правовой консультацией. Условия зависят от конкретной ситуации и могут меняться. Перед подачей заявления проверьте актуальные требования в Sozialministeriumservice, Finanzamt Österreich или соответствующем страховом органе.',
    introP1: 'Если у ребёнка есть инвалидность или длительные ограничения по состоянию здоровья, в Австрии могут быть доступны разные виды поддержки.',
    introP2: 'Если инвалидность была установлена в другой стране, австрийские органы могут проводить собственную оценку в соответствии с местными правилами.',
    step1Title: 'Австрийский Behindertenpass',
    step1P: <>Документ об инвалидности, выданный в другой стране, сам по себе не заменяет австрийское установление степени инвалидности для Behindertenpass. В то же время иностранные медицинские документы могут быть важны при оценке.<br /><br /><strong>Behindertenpass</strong> — это официальный документ с фотографией, который служит единым федеральным подтверждением инвалидности в Австрии.</>,
    step1NoteInfo: <>Он, как правило, доступен при установленной степени инвалидности (<strong>Grad der Behinderung / Minderung der Erwerbsfähigkeit</strong>) от 50% и выше, при условии проживания или постоянного пребывания в Австрии.</>,
    step1NoteNoBenefit: 'Сам Behindertenpass не означает автоматического назначения Familienbeihilfe, Pflegegeld или других выплат — для каждой из них действуют отдельные условия.',
    whereLabel: 'Куда обращаться',
    whereP: <>Всеми вопросами занимается <strong>Sozialministeriumservice</strong>. Подать заявление можно тремя способами:</>,
    whereItems: [
      { icon: '💻', title: 'Онлайн', desc: 'через sozialministeriumservice.gv.at (нужна ID Austria)', link: 'https://www.sozialministeriumservice.at' },
      { icon: '📬', title: 'Почтой', desc: 'отправить заполненный бумажный формуляр', link: null },
      { icon: '🏢', title: 'Лично', desc: 'в соответствующем отделении Sozialministeriumservice', link: null },
    ],
    docsLabel: 'Какие документы могут понадобиться',
    step1Docs: [
      'Заявление на выдачу Behindertenpass',
      'Актуальные медицинские документы (заключения, справки, результаты обследований) — обычно не старше 2 лет',
      'Подтверждение места жительства в Австрии (например, Meldezettel)',
      'Актуальное паспортное фото — при необходимости, если подходящее фото ещё не имеется в государственных реестрах',
      'Для граждан стран вне ЕС/ЕЭП — действующий документ, подтверждающий право на проживание в Австрии',
    ],
    step1TranslationNote: 'Перевод документов, выданных за пределами Австрии, может понадобиться в зависимости от конкретного случая — это стоит уточнить в Sozialministeriumservice заранее.',
    step1Tip: 'Важно подать актуальные и содержательные медицинские документы, из которых понятны диагнозы, функциональные ограничения, лечение и текущее состояние ребёнка.',
    step1InfoIdAustria: <>Для онлайн-заявления нужна <strong>ID Austria</strong>.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>Как её получить — читайте в нашей статье →</Link></>,
    whatNextLabel: 'Что происходит дальше',
    step1WhatNext: <>Если степень инвалидности ещё не установлена другим официальным австрийским решением, оценку проводит врач-эксперт <strong>Sozialministeriumservice</strong>. По возможности оценка основывается на поданных медицинских документах без личного осмотра; при необходимости могут запросить дополнительные документы или назначить осмотр. В случае отрицательного решения можно подать <strong>Beschwerde</strong> в <strong>Bundesverwaltungsgericht</strong> в течение <strong>шести недель</strong> с момента вручения решения.</>,
    step2Title: 'Повышенная Familienbeihilfe (дополнительно к обычной)',
    step2P1: 'При степени инвалидности не менее 50% или при установленной длительной неспособности самостоятельно себя обеспечивать может возникнуть право на повышенную Familienbeihilfe — при условии, что общие условия Familienbeihilfe также выполняются.',
    step2P2: <>Эта выплата <strong>добавляется к обычной Familienbeihilfe (Kinderbeihilfe)</strong>, которую вы получаете на ребёнка, и продолжается, пока выплачивается обычная Familienbeihilfe.</>,
    step2Cards: [
      { amount: '189,20 €', label: 'на месяц', desc: 'повышенная Familienbeihilfe (2026)' },
      { amount: '70,90 €', label: 'на месяц', desc: 'Kinderabsetzbetrag — не связан с инвалидностью' },
    ],
    step2NoteInfo: <><strong>Kinderabsetzbetrag</strong> (70,90 €/мес) выплачивается автоматически вместе с Familienbeihilfe на каждого ребёнка — его не нужно запрашивать отдельно, и он не является частью повышенной Familienbeihilfe из-за инвалидности.</>,
    step2NoteBehindertenpass: 'Для детей до 18 лет данные из процедуры получения Behindertenpass могут использоваться как подтверждение для повышенной Familienbeihilfe — это может позволить избежать отдельной медицинской оценки. Однако сам факт наличия Behindertenpass автоматически не гарантирует право на повышенную Familienbeihilfe.',
    step2NoteRetro: 'Повышенную Familienbeihilfe при соответствующих условиях можно получить задним числом, но максимум за пять лет от месяца подачи заявления.',
    step2P3: <>Заявление на повышенную Familienbeihilfe подают в <strong>Finanzamt Österreich</strong> — через FinanzOnline или почтой.</>,
    step3Title: 'Pflegegeld — пособие по уходу',
    step3P: <>Если ребёнку требуется постоянный уход — есть ещё одна выплата. <strong>Pflegegeld</strong> не зависит от дохода и предназначена для покрытия расходов, связанных непосредственно с уходом.</>,
    step3NoteInfo: 'Уход должен требоваться минимум 6 месяцев. Более 65 часов ухода в месяц — это базовое условие для возможного назначения Pflegegeld. Размер выплаты зависит от установленного уровня потребности в уходе — уровней несколько.',
    step3Procedure: 'Процедура обычно включает: подачу заявления, предоставление имеющейся медицинской документации, оценку потребности в уходе (часто через визит врача или квалифицированного медицинского работника на дом) и письменное решение (Bescheid).',
    step3P2: 'Заявление подают в соответствующий страховой орган (zuständiger Versicherungsträger). Для детей и многих других случаев это Pensionsversicherung.',
    step3CaregiverTitle: 'Ещё одна возможность для родителей',
    step3CaregiverBody: 'Если уход за ребёнком в значительной мере занимает ваше время, при определённых условиях можно бесплатно застраховать этот период в системе пенсионного страхования — взносы платит государство. Условия включают, в частности, Hauptwohnsitz в Австрии, получение повышенной Familienbeihilfe на ребёнка и возраст ребёнка до 40 лет; воспользоваться этим может только один человек.',
    step3CaregiverLinkText: 'oesterreich.gv.at — Пенсионное страхование во время ухода за ребёнком с инвалидностью',
    step4Title: 'Налоговые льготы',
    step4P: 'Если вы платите налоги в Австрии, для ребёнка с инвалидностью предусмотрены отдельные налоговые Freibeträge и возможность учёта фактических расходов.',
    step4Items: [
      { range: '25–34%', text: 'Фиксированный годовой Freibetrag 124 €, без уменьшения на Selbstbehalt.' },
      { range: '35–44%', text: 'Фиксированный годовой Freibetrag 164 €, без уменьшения на Selbstbehalt.' },
      { range: '45–49%', text: 'Фиксированный годовой Freibetrag 401 €, без уменьшения на Selbstbehalt.' },
      { range: 'от 50%', text: 'При получении повышенной Familienbeihilfe и если на ребёнка не выплачивается Pflegegeld — ежемесячный паушальный Freibetrag 262 €. Он уменьшается на сумму полученного Pflegegeld; если Pflegegeld превышает 262 €, паушал не применяется.' },
    ],
    step4AlsoLabel: 'Дополнительно, независимо от получения Pflegegeld и без какого-либо Selbstbehalt, при наличии подтверждающих документов можно учесть фактические расходы, в частности:',
    step4Docs: [
      'Разовые расходы на вспомогательные средства (Hilfsmittel) — например, инвалидная коляска, слуховой аппарат, средства для зрения, адаптация жилья',
      'Расходы на лечение (Heilbehandlung)',
      'Оплата обучения в специальной школе или Pflegeschule либо пребывание в Behindertenwerkstätte',
      'Расходы на транспорт между домом ребёнка и соответствующим учреждением, если использование общественного транспорта неразумно',
    ],
    step4Tip: <>Такие Freibeträge и расходы могут учитываться в <strong>Arbeitnehmerveranlagung</strong> или <strong>Einkommensteuererklärung</strong> при соответствующих условиях.</>,
    summaryH2Before: 'С чего ', summaryH2Em: 'можно начать',
    summarySteps: [
      'Собрать актуальные медицинские документы и проверить требования к документам, выданным за пределами Австрии.',
      'Проверить условия Behindertenpass и при необходимости подать заявление в Sozialministeriumservice.',
      'Отдельно проверить право на Familienbeihilfe и повышенную Familienbeihilfe.',
      'Если ребёнку требуется длительный уход — проверить условия Pflegegeld.',
      'Проверить налоговые Freibeträge и фактические расходы, которые могут учитываться в Arbeitnehmerveranlagung или Einkommensteuererklärung.',
    ],
    summaryFooter: 'Эти процедуры имеют разные условия — один документ или одна выплата не означают автоматического права на другие.',
    sourcesLabel: 'Официальные источники',
    sources: [
      { label: 'oesterreich.gv.at — Behindertenpass', href: 'https://www.oesterreich.gv.at/de/lexicon/B/Seite.991719' },
      { label: 'Sozialministeriumservice — Behindertenpass', href: 'https://www.sozialministeriumservice.gv.at/Menschen_mit_Behinderung/Behindertenpass_und_Parkausweis/Behindertenpass/Behindertenpass.de.html' },
      { label: 'oesterreich.gv.at — Erhöhte Familienbeihilfe', href: 'https://www.oesterreich.gv.at/de/themen/familie_und_partnerschaft/familienbeihilfe/Seite.1220330' },
      { label: 'oesterreich.gv.at — Höhe der Familienbeihilfe', href: 'https://www.oesterreich.gv.at/de/themen/familie_und_partnerschaft/familienbeihilfe/Seite.080714' },
      { label: 'oesterreich.gv.at — Antrag auf Pflegegeld', href: 'https://www.oesterreich.gv.at/de/themen/pflege/4/1/Seite.360517' },
      { label: 'oesterreich.gv.at — Zuständigkeit für Pflegegeld', href: 'https://www.oesterreich.gv.at/de/themen/pflege/4/Seite.360515' },
      { label: 'BMF — Außergewöhnliche Belastungen für behinderte Kinder', href: 'https://www.bmf.gv.at/themen/steuern/arbeitnehmerveranlagung/was-kann-ich-geltend-machen/aussergewoehnliche-belastungen/aussergewoehnliche-belastungen-fuer-behinderte-kinder.html' },
      { label: 'oesterreich.gv.at — Pensionsversicherung während der Pflege eines behinderten Kindes', href: 'https://www.oesterreich.gv.at/themen/pflege/5/2/Seite.360556.html' },
    ],
    footerNote: 'Этот материал носит информационный характер и основан на публично доступных официальных источниках. Актуальность информации рекомендуем проверять на официальных государственных сайтах Австрии.',
  },
  EN: {
    tag1: 'Family · Benefits', tag2: '4 Steps', tag3: 'For Parents',
    titleLine1: 'Child Disability in Austria:', titleEm: 'payments, benefits, and where to start',
    metaTime: '🕐 10 min read', metaParents: '👨‍👩‍👧 For parents', metaForeigners: '🌍 For foreigners',
    toc: [
      ['#step1', 'Behindertenpass'], ['#step2', 'Increased Familienbeihilfe'],
      ['#step3', 'Pflegegeld'], ['#step4', 'Tax Benefits'],
    ],
    backLink: '← All Articles',
    disclaimer: 'This material is for informational purposes only and does not constitute legal, tax, or social-law advice. Conditions depend on the specific situation and may change. Before applying, check the current requirements with the Sozialministeriumservice, Finanzamt Österreich, or the relevant insurance institution.',
    introP1: "If a child has a disability or long-term health limitations, various kinds of support may be available in Austria.",
    introP2: 'If the disability was established in another country, Austrian authorities may carry out their own assessment according to local rules.',
    step1Title: 'The Austrian Behindertenpass',
    step1P: <>A disability document issued in another country does not itself replace the Austrian assessment of the degree of disability for a Behindertenpass. At the same time, foreign medical documents can be important during the assessment.<br /><br />The <strong>Behindertenpass</strong> is an official photo ID document that serves as the single federal proof of disability in Austria.</>,
    step1NoteInfo: <>It is generally available once a degree of disability (<strong>Grad der Behinderung / Minderung der Erwerbsfähigkeit</strong>) of 50% or higher has been established, provided the person lives or habitually stays in Austria.</>,
    step1NoteNoBenefit: 'Having a Behindertenpass does not itself mean automatic entitlement to Familienbeihilfe, Pflegegeld, or other payments — separate conditions apply to each.',
    whereLabel: 'Where to apply',
    whereP: <>The <strong>Sozialministeriumservice</strong> handles all these matters. You can submit an application three ways:</>,
    whereItems: [
      { icon: '💻', title: 'Online', desc: 'via sozialministeriumservice.gv.at (requires ID Austria)', link: 'https://www.sozialministeriumservice.at' },
      { icon: '📬', title: 'By mail', desc: 'send a completed paper form', link: null },
      { icon: '🏢', title: 'In person', desc: 'at the relevant Sozialministeriumservice office', link: null },
    ],
    docsLabel: 'Documents that may be needed',
    step1Docs: [
      'Application for a Behindertenpass',
      'Current medical documents (findings, reports, test results) — usually no older than 2 years',
      'Proof of residence in Austria (e.g. a Meldezettel)',
      'A current passport photo — if needed, when a suitable photo is not already on file in Austrian registries',
      'For citizens of non-EU/EEA countries — a valid document confirming the right of residence in Austria',
    ],
    step1TranslationNote: 'A translation of documents issued outside Austria may be required depending on the specific case — it is worth checking this with the Sozialministeriumservice in advance.',
    step1Tip: "It's important to submit current, substantive medical documents that clearly show the diagnoses, functional limitations, treatment, and the child's current condition.",
    step1InfoIdAustria: <>You need an <strong>ID Austria</strong> for the online application.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>Read our article on how to get one →</Link></>,
    whatNextLabel: 'What happens next',
    step1WhatNext: <>If the degree of disability has not already been established by another official Austrian decision, a medical expert of the <strong>Sozialministeriumservice</strong> carries out the assessment. Where possible, the assessment is based on the submitted medical documents without a personal examination; additional documents may be requested or an examination scheduled if needed. If the decision is negative, you can file a <strong>Beschwerde</strong> with the <strong>Bundesverwaltungsgericht</strong> within <strong>six weeks</strong> of the decision being served.</>,
    step2Title: 'Increased Familienbeihilfe (in addition to the regular one)',
    step2P1: 'Entitlement to increased Familienbeihilfe may arise where the degree of disability is at least 50%, or where a permanent inability to support oneself has been established — provided the general conditions for Familienbeihilfe are also met.',
    step2P2: <>This payment is <strong>added to the regular Familienbeihilfe (Kinderbeihilfe)</strong> you already receive for your child, and continues for as long as regular Familienbeihilfe is paid.</>,
    step2Cards: [
      { amount: '189,20 €', label: 'per month', desc: 'increased Familienbeihilfe (2026)' },
      { amount: '70,90 €', label: 'per month', desc: 'Kinderabsetzbetrag — unrelated to disability' },
    ],
    step2NoteInfo: <><strong>Kinderabsetzbetrag</strong> (€70.90/month) is paid automatically together with Familienbeihilfe for every child — you don&apos;t need to request it separately, and it is not part of the disability-related increased Familienbeihilfe.</>,
    step2NoteBehindertenpass: "For children under 18, data from the Behindertenpass procedure can be used as evidence for increased Familienbeihilfe, which can avoid a separate medical assessment. However, having a Behindertenpass does not by itself guarantee entitlement to increased Familienbeihilfe.",
    step2NoteRetro: 'Where the conditions are met, increased Familienbeihilfe can be granted retroactively, but for a maximum of five years from the month of application.',
    step2P3: <>The application for increased Familienbeihilfe is submitted to the <strong>Finanzamt Österreich</strong> — via FinanzOnline or by mail.</>,
    step3Title: 'Pflegegeld — care allowance',
    step3P: <>If your child needs constant care, there&apos;s another payment available. <strong>Pflegegeld</strong> doesn&apos;t depend on income and is intended to cover expenses directly related to care.</>,
    step3NoteInfo: "The care needed must be expected to last at least 6 months. More than 65 hours of care per month is the basic condition for a possible Pflegegeld award. The amount depends on the assessed level of care need — there are several levels.",
    step3Procedure: 'The process typically involves: submitting an application, providing any available medical documentation, an assessment of the care need (often via a home visit by a doctor or qualified nursing professional), and a written decision (Bescheid).',
    step3P2: 'The application is submitted to the competent insurance institution (zuständiger Versicherungsträger). For children and many other cases, this is the Pensionsversicherung.',
    step3CaregiverTitle: 'Another option for parents',
    step3CaregiverBody: "If caring for your child substantially occupies your time, under certain conditions you may be able to insure this period for free within the pension insurance system — the state finances the contributions. Conditions include, among others, having your Hauptwohnsitz in Austria, receiving increased Familienbeihilfe for the child, and the child being under 40; only one person can use this insurance.",
    step3CaregiverLinkText: 'oesterreich.gv.at — Pension insurance while caring for a child with a disability',
    step4Title: 'Tax benefits',
    step4P: "If you pay taxes in Austria, separate tax Freibeträge and the option to claim actual expenses are available for a child with a disability.",
    step4Items: [
      { range: '25–34%', text: 'A fixed annual Freibetrag of €124, not reduced by the Selbstbehalt.' },
      { range: '35–44%', text: 'A fixed annual Freibetrag of €164, not reduced by the Selbstbehalt.' },
      { range: '45–49%', text: 'A fixed annual Freibetrag of €401, not reduced by the Selbstbehalt.' },
      { range: '50% and above', text: "Where increased Familienbeihilfe is received and no Pflegegeld is paid for the child — a monthly flat-rate Freibetrag of €262. It is reduced by any Pflegegeld received; if Pflegegeld exceeds €262, no flat-rate amount remains available." },
    ],
    step4AlsoLabel: 'Additionally, regardless of whether Pflegegeld is received and without any Selbstbehalt, actual expenses can be taken into account with supporting documents, including:',
    step4Docs: [
      'One-off expenses for assistive devices (Hilfsmittel) — for example a wheelchair, hearing aid, visual aids, or adapting the home',
      'Costs of medical treatment (Heilbehandlung)',
      'Fees for instruction at a special school or Pflegeschule, or attending a Behindertenwerkstätte',
      'Transport costs between the child\'s home and the relevant facility, where using public transport is not reasonable',
    ],
    step4Tip: <>Such Freibeträge and expenses can be taken into account in an <strong>Arbeitnehmerveranlagung</strong> or <strong>Einkommensteuererklärung</strong>, subject to the applicable conditions.</>,
    summaryH2Before: 'Where ', summaryH2Em: 'you can start',
    summarySteps: [
      'Gather current medical documents and check the requirements for documents issued outside Austria.',
      'Check the Behindertenpass conditions and, if needed, submit an application to the Sozialministeriumservice.',
      'Separately check eligibility for Familienbeihilfe and increased Familienbeihilfe.',
      'If your child needs long-term care, check the conditions for Pflegegeld.',
      'Check the tax Freibeträge and actual expenses that can be taken into account in an Arbeitnehmerveranlagung or Einkommensteuererklärung.',
    ],
    summaryFooter: "These procedures each have different conditions — one document or one payment does not automatically create entitlement to the others.",
    sourcesLabel: 'Official sources',
    sources: [
      { label: 'oesterreich.gv.at — Behindertenpass', href: 'https://www.oesterreich.gv.at/de/lexicon/B/Seite.991719' },
      { label: 'Sozialministeriumservice — Behindertenpass', href: 'https://www.sozialministeriumservice.gv.at/Menschen_mit_Behinderung/Behindertenpass_und_Parkausweis/Behindertenpass/Behindertenpass.de.html' },
      { label: 'oesterreich.gv.at — Erhöhte Familienbeihilfe', href: 'https://www.oesterreich.gv.at/de/themen/familie_und_partnerschaft/familienbeihilfe/Seite.1220330' },
      { label: 'oesterreich.gv.at — Höhe der Familienbeihilfe', href: 'https://www.oesterreich.gv.at/de/themen/familie_und_partnerschaft/familienbeihilfe/Seite.080714' },
      { label: 'oesterreich.gv.at — Antrag auf Pflegegeld', href: 'https://www.oesterreich.gv.at/de/themen/pflege/4/1/Seite.360517' },
      { label: 'oesterreich.gv.at — Zuständigkeit für Pflegegeld', href: 'https://www.oesterreich.gv.at/de/themen/pflege/4/Seite.360515' },
      { label: 'BMF — Außergewöhnliche Belastungen für behinderte Kinder', href: 'https://www.bmf.gv.at/themen/steuern/arbeitnehmerveranlagung/was-kann-ich-geltend-machen/aussergewoehnliche-belastungen/aussergewoehnliche-belastungen-fuer-behinderte-kinder.html' },
      { label: 'oesterreich.gv.at — Pensionsversicherung während der Pflege eines behinderten Kindes', href: 'https://www.oesterreich.gv.at/themen/pflege/5/2/Seite.360556.html' },
    ],
    footerNote: 'This material is for informational purposes and is based on publicly available official sources. We recommend checking the current information on official Austrian government websites.',
  },
  DE: {
    tag1: 'Familie · Leistungen', tag2: '4 Schritte', tag3: 'Für Eltern',
    titleLine1: 'Kindesbehinderung in Österreich:', titleEm: 'Leistungen, Vergünstigungen und erste Schritte',
    metaTime: '🕐 10 Min. Lesezeit', metaParents: '👨‍👩‍👧 Für Eltern', metaForeigners: '🌍 Für Ausländer',
    toc: [
      ['#step1', 'Behindertenpass'], ['#step2', 'Erhöhte Familienbeihilfe'],
      ['#step3', 'Pflegegeld'], ['#step4', 'Steuervorteile'],
    ],
    backLink: '← Alle Artikel',
    disclaimer: 'Dieses Material dient nur zu Informationszwecken und stellt keine Rechts-, Steuer- oder sozialrechtliche Beratung dar. Die Voraussetzungen hängen vom konkreten Einzelfall ab und können sich ändern. Überprüfe vor der Antragstellung die aktuellen Anforderungen beim Sozialministeriumservice, beim Finanzamt Österreich oder beim zuständigen Versicherungsträger.',
    introP1: 'Wenn ein Kind eine Behinderung oder länger andauernde gesundheitliche Einschränkungen hat, können in Österreich verschiedene Formen der Unterstützung verfügbar sein.',
    introP2: 'Wurde die Behinderung in einem anderen Land festgestellt, können die österreichischen Behörden eine eigene Begutachtung nach den örtlichen Regeln durchführen.',
    step1Title: 'Der österreichische Behindertenpass',
    step1P: <>Ein im Ausland ausgestelltes Dokument über eine Behinderung ersetzt für sich allein nicht die österreichische Feststellung des Behinderungsgrades für den Behindertenpass. Gleichzeitig können ausländische medizinische Unterlagen bei der Begutachtung wichtig sein.<br /><br />Der <strong>Behindertenpass</strong> ist ein amtliches Lichtbilddokument, das als einheitlicher bundesweiter Nachweis einer Behinderung in Österreich dient.</>,
    step1NoteInfo: <>Er ist in der Regel ab einem festgestellten <strong>Grad der Behinderung / einer Minderung der Erwerbsfähigkeit</strong> von 50% oder mehr verfügbar, sofern die Person in Österreich wohnt oder sich dauerhaft aufhält.</>,
    step1NoteNoBenefit: 'Der Behindertenpass allein bedeutet nicht automatisch einen Anspruch auf Familienbeihilfe, Pflegegeld oder andere Leistungen — dafür gelten jeweils eigene Voraussetzungen.',
    whereLabel: 'Wohin wenden',
    whereP: <>Für alle Fragen ist das <strong>Sozialministeriumservice</strong> zuständig. Du kannst den Antrag auf drei Wegen einreichen:</>,
    whereItems: [
      { icon: '💻', title: 'Online', desc: 'über sozialministeriumservice.gv.at (ID Austria erforderlich)', link: 'https://www.sozialministeriumservice.at' },
      { icon: '📬', title: 'Per Post', desc: 'ausgefülltes Papierformular einsenden', link: null },
      { icon: '🏢', title: 'Persönlich', desc: 'bei der zuständigen Dienststelle des Sozialministeriumservice', link: null },
    ],
    docsLabel: 'Welche Dokumente benötigt werden können',
    step1Docs: [
      'Antrag auf Ausstellung eines Behindertenpasses',
      'Aktuelle medizinische Unterlagen (Befunde, Atteste, Untersuchungsergebnisse) — in der Regel nicht älter als 2 Jahre',
      'Nachweis des Wohnsitzes in Österreich (z. B. Meldezettel)',
      'Ein aktuelles Passfoto — falls erforderlich, wenn noch kein geeignetes Foto in österreichischen Registern vorliegt',
      'Für Staatsangehörige von Nicht-EU-/EWR-Staaten — ein gültiges Dokument zum Nachweis des Aufenthaltsrechts in Österreich',
    ],
    step1TranslationNote: 'Eine Übersetzung von im Ausland ausgestellten Unterlagen kann je nach Einzelfall erforderlich sein — das solltest du vorab beim Sozialministeriumservice klären.',
    step1Tip: 'Wichtig ist, aktuelle und aussagekräftige medizinische Unterlagen einzureichen, aus denen Diagnosen, funktionelle Einschränkungen, Behandlung und der aktuelle Zustand des Kindes klar hervorgehen.',
    step1InfoIdAustria: <>Für den Online-Antrag wird eine <strong>ID Austria</strong> benötigt.{' '}<Link href="/articles/austria-id" style={{ color: '#038390', fontWeight: 600 }}>Wie du sie bekommst — lies in unserem Artikel →</Link></>,
    whatNextLabel: 'Was als Nächstes passiert',
    step1WhatNext: <>Wurde der Behinderungsgrad noch nicht durch eine andere amtliche österreichische Entscheidung festgestellt, nimmt eine ärztliche Sachverständige/ein ärztlicher Sachverständiger des <strong>Sozialministeriumservice</strong> die Begutachtung vor. Nach Möglichkeit stützt sich die Begutachtung auf die eingereichten medizinischen Unterlagen ohne persönliche Untersuchung; bei Bedarf können weitere Unterlagen angefordert oder eine Untersuchung anberaumt werden. Bei einer negativen Entscheidung kannst du innerhalb von <strong>sechs Wochen</strong> nach Zustellung <strong>Beschwerde</strong> beim <strong>Bundesverwaltungsgericht</strong> einbringen.</>,
    step2Title: 'Erhöhte Familienbeihilfe (zusätzlich zur regulären)',
    step2P1: 'Bei einem Behinderungsgrad von mindestens 50% oder bei festgestellter dauernder Unfähigkeit, sich selbst den Unterhalt zu verschaffen, kann ein Anspruch auf die erhöhte Familienbeihilfe entstehen — sofern auch die allgemeinen Voraussetzungen der Familienbeihilfe erfüllt sind.',
    step2P2: <>Diese Zahlung wird <strong>zur regulären Familienbeihilfe (Kinderbeihilfe) hinzugefügt</strong>, die du für dein Kind erhältst, und besteht so lange, wie die reguläre Familienbeihilfe zusteht.</>,
    step2Cards: [
      { amount: '189,20 €', label: 'pro Monat', desc: 'erhöhte Familienbeihilfe (2026)' },
      { amount: '70,90 €', label: 'pro Monat', desc: 'Kinderabsetzbetrag — unabhängig von der Behinderung' },
    ],
    step2NoteInfo: <>Der <strong>Kinderabsetzbetrag</strong> (70,90 €/Monat) wird automatisch zusammen mit der Familienbeihilfe für jedes Kind ausgezahlt — er muss nicht separat beantragt werden und ist nicht Teil der behinderungsbedingten erhöhten Familienbeihilfe.</>,
    step2NoteBehindertenpass: 'Für Kinder unter 18 Jahren können die Daten aus dem Behindertenpass-Verfahren als Nachweis für die erhöhte Familienbeihilfe dienen, wodurch eine separate ärztliche Begutachtung entfallen kann. Der bloße Besitz eines Behindertenpasses garantiert jedoch nicht automatisch den Anspruch auf die erhöhte Familienbeihilfe.',
    step2NoteRetro: 'Die erhöhte Familienbeihilfe kann bei Vorliegen der Voraussetzungen rückwirkend gewährt werden, höchstens jedoch für fünf Jahre ab dem Monat der Antragstellung.',
    step2P3: <>Der Antrag auf erhöhte Familienbeihilfe wird beim <strong>Finanzamt Österreich</strong> eingereicht — über FinanzOnline oder per Post.</>,
    step3Title: 'Pflegegeld — Unterstützung bei der Pflege',
    step3P: <>Wenn dein Kind dauerhafte Pflege benötigt, gibt es eine weitere Leistung. Das <strong>Pflegegeld</strong> ist einkommensunabhängig und dient der Deckung von Kosten, die unmittelbar mit der Pflege zusammenhängen.</>,
    step3NoteInfo: 'Der Pflegebedarf muss voraussichtlich mindestens 6 Monate andauern. Mehr als 65 Stunden Pflegeaufwand im Monat sind die Grundvoraussetzung für eine mögliche Zuerkennung von Pflegegeld. Die Höhe richtet sich nach der festgestellten Pflegestufe — davon gibt es mehrere.',
    step3Procedure: 'Das Verfahren umfasst in der Regel: die Antragstellung, die Vorlage vorhandener medizinischer Unterlagen, die Begutachtung des Pflegebedarfs (häufig durch einen Hausbesuch einer Ärztin/eines Arztes oder einer qualifizierten Pflegefachkraft) und einen schriftlichen Bescheid.',
    step3P2: 'Der Antrag wird beim zuständigen Versicherungsträger eingereicht. Für Kinder und viele andere Fälle ist das die Pensionsversicherung.',
    step3CaregiverTitle: 'Eine weitere Möglichkeit für Eltern',
    step3CaregiverBody: 'Wenn die Pflege deines Kindes deine Arbeitskraft überwiegend beansprucht, kannst du dich unter bestimmten Voraussetzungen kostenlos in der Pensionsversicherung selbst versichern — die Beiträge trägt der Staat. Voraussetzungen sind unter anderem der Hauptwohnsitz in Österreich, der Bezug der erhöhten Familienbeihilfe für das Kind und ein Kindesalter bis 40 Jahre; nur eine Person kann diese Selbstversicherung nutzen.',
    step3CaregiverLinkText: 'oesterreich.gv.at — Pensionsversicherung während der Pflege eines behinderten Kindes',
    step4Title: 'Steuervorteile',
    step4P: 'Wenn du in Österreich Steuern zahlst, gibt es für ein Kind mit Behinderung eigene steuerliche Freibeträge und die Möglichkeit, tatsächliche Kosten zu berücksichtigen.',
    step4Items: [
      { range: '25–34%', text: 'Fixer Jahresfreibetrag von 124 €, ohne Kürzung um den Selbstbehalt.' },
      { range: '35–44%', text: 'Fixer Jahresfreibetrag von 164 €, ohne Kürzung um den Selbstbehalt.' },
      { range: '45–49%', text: 'Fixer Jahresfreibetrag von 401 €, ohne Kürzung um den Selbstbehalt.' },
      { range: 'ab 50%', text: 'Bei Bezug der erhöhten Familienbeihilfe und wenn für das Kind kein Pflegegeld bezogen wird — ein monatlicher Pauschbetrag von 262 €. Dieser wird um das bezogene Pflegegeld gekürzt; übersteigt das Pflegegeld 262 €, steht der Pauschbetrag nicht mehr zu.' },
    ],
    step4AlsoLabel: 'Zusätzlich können, unabhängig vom Bezug von Pflegegeld und ohne jeden Selbstbehalt, bei entsprechenden Nachweisen tatsächliche Kosten berücksichtigt werden, unter anderem:',
    step4Docs: [
      'Nicht regelmäßig anfallende Aufwendungen für Hilfsmittel — z. B. Rollstuhl, Hörgerät, Sehhilfe, behindertengerechte Adaptierung der Wohnung',
      'Kosten der Heilbehandlung',
      'Entgelt für die Unterrichtserteilung in einer Sonder- oder Pflegeschule oder die Tätigkeit in einer Behindertenwerkstätte',
      'Transportkosten zwischen der Wohnung des Kindes und der jeweiligen Einrichtung, wenn die Benützung öffentlicher Verkehrsmittel unzumutbar ist',
    ],
    step4Tip: <>Solche Freibeträge und Kosten können unter den jeweiligen Voraussetzungen in der <strong>Arbeitnehmerveranlagung</strong> oder <strong>Einkommensteuererklärung</strong> berücksichtigt werden.</>,
    summaryH2Before: 'Womit du ', summaryH2Em: 'beginnen kannst',
    summarySteps: [
      'Sammle aktuelle medizinische Unterlagen und prüfe die Anforderungen an im Ausland ausgestellte Unterlagen.',
      'Prüfe die Voraussetzungen für den Behindertenpass und reiche bei Bedarf einen Antrag beim Sozialministeriumservice ein.',
      'Prüfe gesondert den Anspruch auf Familienbeihilfe und auf erhöhte Familienbeihilfe.',
      'Wenn dein Kind dauerhafte Pflege benötigt, prüfe die Voraussetzungen für Pflegegeld.',
      'Prüfe die steuerlichen Freibeträge und tatsächlichen Kosten, die in der Arbeitnehmerveranlagung oder Einkommensteuererklärung berücksichtigt werden können.',
    ],
    summaryFooter: 'Diese Verfahren haben jeweils eigene Voraussetzungen — ein Dokument oder eine Leistung begründet nicht automatisch den Anspruch auf die anderen.',
    sourcesLabel: 'Offizielle Quellen',
    sources: [
      { label: 'oesterreich.gv.at — Behindertenpass', href: 'https://www.oesterreich.gv.at/de/lexicon/B/Seite.991719' },
      { label: 'Sozialministeriumservice — Behindertenpass', href: 'https://www.sozialministeriumservice.gv.at/Menschen_mit_Behinderung/Behindertenpass_und_Parkausweis/Behindertenpass/Behindertenpass.de.html' },
      { label: 'oesterreich.gv.at — Erhöhte Familienbeihilfe', href: 'https://www.oesterreich.gv.at/de/themen/familie_und_partnerschaft/familienbeihilfe/Seite.1220330' },
      { label: 'oesterreich.gv.at — Höhe der Familienbeihilfe', href: 'https://www.oesterreich.gv.at/de/themen/familie_und_partnerschaft/familienbeihilfe/Seite.080714' },
      { label: 'oesterreich.gv.at — Antrag auf Pflegegeld', href: 'https://www.oesterreich.gv.at/de/themen/pflege/4/1/Seite.360517' },
      { label: 'oesterreich.gv.at — Zuständigkeit für Pflegegeld', href: 'https://www.oesterreich.gv.at/de/themen/pflege/4/Seite.360515' },
      { label: 'BMF — Außergewöhnliche Belastungen für behinderte Kinder', href: 'https://www.bmf.gv.at/themen/steuern/arbeitnehmerveranlagung/was-kann-ich-geltend-machen/aussergewoehnliche-belastungen/aussergewoehnliche-belastungen-fuer-behinderte-kinder.html' },
      { label: 'oesterreich.gv.at — Pensionsversicherung während der Pflege eines behinderten Kindes', href: 'https://www.oesterreich.gv.at/themen/pflege/5/2/Seite.360556.html' },
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
            <NoteBox type="warning">
              {t.step1NoteNoBenefit}
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
            <NoteBox type="info">
              {t.step1TranslationNote}
            </NoteBox>

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
            <NoteBox type="info">
              {t.step2NoteBehindertenpass}
            </NoteBox>
            <NoteBox type="tip">
              {t.step2NoteRetro}
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
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 4 }}>
              {t.step3Procedure}
            </p>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginTop: 12 }}>
              {t.step3P2}
            </p>
            <NoteBox type="tip">
              <strong>{t.step3CaregiverTitle}</strong><br />
              {t.step3CaregiverBody}{' '}
              <ExtLink href="https://www.oesterreich.gv.at/themen/pflege/5/2/Seite.360556.html">{t.step3CaregiverLinkText}</ExtLink>
            </NoteBox>
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
