'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArticleSidebar, ArticlePrevNext, ArticleTOC } from '@/components/layout/ArticleNav'

function StepBadge({ n }: { n: number }) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%', background: '#038390',
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
      color: '#038390', fontWeight: 600,
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
      border: '1.5px solid #038390', background: 'var(--peach-light)',
      textDecoration: 'none', margin: '16px 0',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>📖</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#038390' }}>{title}</div>
          <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>{sub}</div>
        </div>
      </div>
      <span style={{ fontSize: 18, color: '#038390', fontWeight: 700 }}>→</span>
    </Link>
  )
}

// Переклади статті "Gewerbeanmeldung в Австрії" — UA / RU / EN / DE
const GA_TEXT: Record<string, any> = {
  UA: {
    tag1: 'Реєстрація бізнесу', tag2: '9 кроків', tag3: 'Повний гайд',
    titleLine1: 'Gewerbeanmeldung в Австрії:', titleEm: 'покрокова реєстрація самозайнятості',
    metaTime: '🕐 15 хв читання', metaFree: '🆓 Freies Gewerbe — 0 €', metaForeigners: '🇺🇦 Для іноземців',
    toc: [
      ['#step1', 'Вид діяльності'], ['#step2', 'Документи'], ['#step3', 'ID Austria'],
      ['#step4', 'Реєстрація GISA'], ['#step5', 'SVS'], ['#step6', 'FinanzOnline'],
      ['#step7', 'SEPA'], ['#step8', 'Пенсійний фонд MVK'], ['#step9', 'WKO'],
    ],
    disclaimer: 'Матеріал має інформаційний характер і не є юридичною, податковою або бізнес-консультацією. Вимоги та процедури можуть змінюватися й залежати від конкретної діяльності та ситуації. Перед поданням перевір актуальну інформацію на офіційних сайтах WKO, USP та GISA або у компетентному органі.',
    introP: 'Українці, румуни, серби та інші іноземці в Австрії часто не розуміють: яка форма підходить, чи потрібна ліцензія, куди йти, які документи нести, скільки коштує і що буде з податками. У цьому гайді — реєстрація онлайн крок за кроком.',
    submissionLabel: 'Спосіб подачі:', submissionText: 'онлайн або особисто. Цей гайд — про онлайн. Для офлайн — ',
    offlineLinkText: 'зверніться до WKO Gründerservice', offlineAfter: ' у вашому районі.',
    step1H2: 'Визначитися з видом діяльності', step1P: 'Спочатку потрібно зрозуміти — яка у вас діяльність:',
    step1Cards: [
      { title: 'Freies Gewerbe', sub: 'Вільна діяльність без ліцензії', desc: 'Не потребує підтвердження кваліфікації (Befähigungsnachweis). Реєстрація безкоштовна з 2017 року.', featured: true },
      { title: 'Reglementiertes Gewerbe', sub: 'Потрібен Befähigungsnachweis', desc: 'Потребує підтвердження кваліфікації саме для вашого виду діяльності.', featured: false },
    ],
    step1Direction: 'Чи потрібна Gewerbeberechtigung і чи діяльність вільна або регламентована — залежить від точного виду діяльності (Gewerbewortlaut). Перед реєстрацією перевір точну назву та вид діяльності через WKO або офіційні сервіси GISA.',
    costLabel: 'Вартість реєстрації (§ 13 GewO):',
    costCoreText: 'Сама Gewerbeanmeldung за Gewerbeordnung зазвичай не має реєстраційного збору.',
    costExtraText: 'Додаткові витрати можуть виникнути залежно від виду діяльності, необхідних підтверджень, перекладів або інших процедур.',
    step1Link1: '📋 Список КВЕДів (ÖNACE 2008)', step1Link2: '🔍 Перевірка в GISA',
    step2H2: 'Підготувати документи заздалегідь',
    step2P: 'Ці документи можуть знадобитися на різних етапах — але не кожен документ обов’язковий для кожного випадку: конкретний перелік залежить від громадянства, статусу проживання, тривалості перебування в Австрії, зміни імені та того, чи діяльність регламентована.',
    step2Docs: ['Скан паспорта (закордонного)', 'Meldezettel — довідка про прописку в Австрії', 'Ausweis — посвідчення особи', 'Дійсний австрійський банківський рахунок', 'Довідка про несудимість (за певних умов, див. нижче)'],
    step2NoteInfo: <> <strong>Банківський рахунок:</strong> для Einzelunternehmen окремий рахунок не обов&apos;язковий, але рекомендований.</>,
    step2NoteWarning: 'Особи, які не проживають в Австрії або проживають тут менше п’яти років, за загальним правилом мають подати довідку про несудимість країни громадянства чи попередньої країни тривалого проживання — оригінал із завіреним перекладом на німецьку мову, не старшу за три місяці на момент подання. Ця вимога знімається, якщо натомість подається присяжна заява (eidesstattliche Erklärung). Для громадян України цю довідку можна, зокрема, отримати онлайн через «Дію» — але формат документа та вимоги до перекладу варто уточнити в компетентному органі перед подачею.',
    orderLinkText: '📅 Записатися на прийом — bmi.gv.at ↗',
    step3H2: 'Оформити ID Austria',
    step3P: 'ID Austria — засіб електронної ідентифікації, який використовується для доступу до багатьох державних цифрових сервісів в Австрії (зокрема GISA, FinanzOnline, SVS) і може використовуватися для онлайн-процедур.',
    step3NoteWarning: 'Для деяких негромадян Австрії оформлення ID Austria повністю онлайн може бути недоступне — це залежить від землі (Bundesland). Будьте готові до особистого відвідування.',
    step3AppointmentLink: '📅 Записатися на термін — bmi.gv.at',
    step3ArticleTitle: 'Читайте детально → Як оформити ID Austria: покроковий гайд', step3ArticleSub: 'Відкривається в новому вікні · Повна інструкція',
    step4H2: 'Реєстрація на сайті GISA',
    step4P: 'GISA — Gewerbeinformationssystem Austria — офіційний портал для реєстрації Gewerbe.',
    step4GisaLink: '🌐 Перейти на GISA — Online-Gewerbeanmeldung',
    step4NoteInfo: 'Якщо всі умови виконано, для більшості видів Gewerbe діяльність можна розпочинати вже з моменту дійсної реєстрації. Для окремих регламентованих видів діяльності можуть діяти інші строки. Дані з GISA також знадобляться для наступних кроків, зокрема для форми у FinanzOnline.',
    step4ArticleTitle: 'Читайте детально → Як заповнити формуляр GISA', step4ArticleSub: 'Покроковий гайд з поясненнями кожного поля',
    step5H2: 'Перевірити реєстрацію та дані в SVS',
    step5P: 'SVS (Sozialversicherungsanstalt der Selbständigen) — соціальне страхування самозайнятих. Після Gewerbeanmeldung орган, що реєструє Gewerbe, зазвичай сам передає дані до SVS — окрема ручна реєстрація в SVS для Gewerbetreibende, як правило, не потрібна. Перевірте свій статус страхування та дані в кабінеті SVS (вхід через ID Austria) і за потреби доповніть інформацію. Зверніть увагу: логіка повідомлення SVS для Neue Selbständige (нової самозайнятості без Gewerbe) інша.',
    step5NoteTip: 'За певних умов до медичного страхування SVS можуть бути співзастраховані окремі члени сім’ї (наприклад, чоловік/дружина, зареєстрований партнер, діти) — точні умови співстрахування варто перевірити безпосередньо в SVS.',
    step5ArticleTitle: 'Читайте детально → Як заповнити формуляр SVS', step5ArticleSub: 'Що потрібно вказати та як працює реєстрація в SVS',
    step6H2: 'Реєстрація у FinanzOnline',
    step6P: 'Вхід через ID Austria (або через окрему реєстрацію FinanzOnline, якщо ID Austria ще немає). У Fragebogen zur Betriebseröffnung потрібно вказати очікуваний оборот — ця оцінка потрібна Finanzamt, щоб визначити, чи перевищується поріг ПДВ (55 000 € на рік), і встановити попередні податкові платежі. Це не пов’язано з внесками SVS.',
    step6TipBefore: 'Внески SVS для нових Gewerbetreibende спочатку розраховуються від мінімальної бази автоматично, незалежно від прогнозу обороту у FinanzOnline.', step6TipLink: 'SVS Beitragsrechner', step6TipAfter: ' допоможе орієнтовно оцінити суму внесків.',
    step6NoteWarning: <>Якщо ви реєструєтесь у FinanzOnline <strong>без ID Austria</strong>, початкові логін і пароль надсилаються поштовим листом — тому знадобиться адреса, за якою ви можете отримати кореспонденцію. З <strong>ID Austria</strong> можна увійти одразу, без очікування листа.</>,
    step6NoteInfo: 'Якщо пізніше потрібно додати або змінити код діяльності (ÖNACE) чи інші дані реєстрації, актуальну процедуру уточнюйте безпосередньо у вашому Finanzamt або Gewerbebehörde — точний порядок може відрізнятися залежно від відомства.',
    step7H2: 'Налаштувати SEPA-Lastschriftmandat (за бажанням)',
    step7P: <>У кабінеті FinanzOnline можна налаштувати <strong>SEPA-Lastschriftmandat</strong> для автоматичного списання платежів, які адмініструє Finanzamt (наприклад, авансових платежів з податку на прибуток). Це не поширюється на внески SVS — SVS адмініструє власний, окремий процес прямого дебетування, який налаштовується окремо в кабінеті SVS.</>,
    step8H2: 'Вибір MVK (Selbständigenvorsorge)',
    step8P: <>Протягом <strong>6 місяців</strong> після реєстрації потрібно обрати Mitarbeitervorsorgekasse (MVK) — § 6 BMSVG. Внесок становить 1,53% від доходу щомісяця і накопичується на вашому рахунку Selbständigenvorsorge. Якщо фонд не обрано самостійно, вас приєднають до одного з фондів автоматично.</>,
    step8ArticleTitle: 'Читайте детально → Як обрати MVK', step8ArticleSub: 'Що таке MVK та які строки потрібно знати',
    step9H2: 'Скористатися сервісами WKO',
    step9P: <>WKO (Wirtschaftskammer Österreich) — торгово-промислова палата. Членство в WKO зазвичай виникає автоматично разом з отриманням Gewerbeberechtigung — окремо реєструватися для цього не потрібно. У вашому районному відділенні можуть бути <strong>консультації для початківців (Gründerservice)</strong>, вебінари та зустрічі.</>,
    step9Link: '🏢 WKO — інформація про реєстрацію',
    ctaH2: 'Продовжуй розбиратися крок за кроком',
    ctaP: 'У QLIXA можна знайти безкоштовні гайди, чеклисти, інструкції та інструменти про податки, документи, самозайнятість і життя в Австрії.',
    ctaLinkText: 'Переглянути безкоштовні матеріали →',
    sourcesLabel: 'Офіційні джерела',
  },
  RU: {
    tag1: 'Регистрация бизнеса', tag2: '9 шагов', tag3: 'Полный гайд',
    titleLine1: 'Gewerbeanmeldung в Австрии:', titleEm: 'пошаговая регистрация самозанятости',
    metaTime: '🕐 15 мин чтения', metaFree: '🆓 Freies Gewerbe — 0 €', metaForeigners: '🇺🇦 Для иностранцев',
    toc: [
      ['#step1', 'Вид деятельности'], ['#step2', 'Документы'], ['#step3', 'ID Austria'],
      ['#step4', 'Регистрация GISA'], ['#step5', 'SVS'], ['#step6', 'FinanzOnline'],
      ['#step7', 'SEPA'], ['#step8', 'Пенсионный фонд MVK'], ['#step9', 'WKO'],
    ],
    disclaimer: 'Материал имеет информационный характер и не является юридической, налоговой или бизнес-консультацией. Требования и процедуры могут меняться и зависеть от конкретной деятельности и ситуации. Перед подачей проверьте актуальную информацию на официальных сайтах WKO, USP и GISA или в компетентном органе.',
    introP: 'Украинцы, румыны, сербы и другие иностранцы в Австрии часто не понимают: какая форма подходит, нужна ли лицензия, куда идти, какие документы нести, сколько это стоит и что будет с налогами. В этом гайде — регистрация онлайн шаг за шагом.',
    submissionLabel: 'Способ подачи:', submissionText: 'онлайн или лично. Этот гайд — про онлайн. Для офлайн — ',
    offlineLinkText: 'обратитесь в WKO Gründerservice', offlineAfter: ' в вашем районе.',
    step1H2: 'Определиться с видом деятельности', step1P: 'Сначала нужно понять — какая у вас деятельность:',
    step1Cards: [
      { title: 'Freies Gewerbe', sub: 'Свободная деятельность без лицензии', desc: 'Не требует подтверждения квалификации (Befähigungsnachweis). Регистрация бесплатна с 2017 года.', featured: true },
      { title: 'Reglementiertes Gewerbe', sub: 'Нужен Befähigungsnachweis', desc: 'Требует подтверждения квалификации именно для вашего вида деятельности.', featured: false },
    ],
    step1Direction: 'Нужна ли Gewerbeberechtigung и является ли деятельность свободной или регламентированной, зависит от точного вида деятельности (Gewerbewortlaut). Перед регистрацией проверьте точное название и вид деятельности через WKO или официальные сервисы GISA.',
    costLabel: 'Стоимость регистрации (§ 13 GewO):',
    costCoreText: 'Сама Gewerbeanmeldung согласно Gewerbeordnung обычно не облагается регистрационным сбором.',
    costExtraText: 'Дополнительные расходы могут возникнуть в зависимости от вида деятельности, необходимых подтверждений, переводов или других процедур.',
    step1Link1: '📋 Список кодов ÖNACE (ÖNACE 2008)', step1Link2: '🔍 Проверка в GISA',
    step2H2: 'Подготовить документы заранее',
    step2P: 'Эти документы могут понадобиться на разных этапах — но не каждый документ обязателен в каждом случае: конкретный перечень зависит от гражданства, статуса проживания, длительности пребывания в Австрии, смены имени и того, регламентирована ли деятельность.',
    step2Docs: ['Скан паспорта (загранпаспорта)', 'Meldezettel — справка о прописке в Австрии', 'Ausweis — удостоверение личности', 'Действующий австрийский банковский счёт', 'Справка о несудимости (при определённых условиях, см. ниже)'],
    step2NoteInfo: <><strong>Банковский счёт:</strong> для Einzelunternehmen отдельный счёт не обязателен, но рекомендован.</>,
    step2NoteWarning: 'Лица, которые не проживают в Австрии или проживают здесь менее пяти лет, как правило, должны предоставить справку о несудимости страны гражданства или предыдущей страны длительного проживания — оригинал с заверенным переводом на немецкий язык, не старше трёх месяцев на момент подачи. Это требование снимается, если вместо этого подаётся присяжное заявление (eidesstattliche Erklärung). Для граждан Украины эту справку можно, в частности, получить онлайн через «Дию» — но формат документа и требования к переводу стоит уточнить в компетентном органе перед подачей.',
    orderLinkText: '📅 Записаться на приём — bmi.gv.at ↗',
    step3H2: 'Оформить ID Austria',
    step3P: 'ID Austria — средство электронной идентификации, которое используется для доступа ко многим государственным цифровым сервисам в Австрии (в том числе GISA, FinanzOnline, SVS) и может использоваться для онлайн-процедур.',
    step3NoteWarning: 'Для некоторых неграждан Австрии оформление ID Austria полностью онлайн может быть недоступно — это зависит от земли (Bundesland). Будьте готовы к личному визиту.',
    step3AppointmentLink: '📅 Записаться на приём — bmi.gv.at',
    step3ArticleTitle: 'Читайте подробно → Как оформить ID Austria: пошаговый гайд', step3ArticleSub: 'Открывается в новом окне · Полная инструкция',
    step4H2: 'Регистрация на сайте GISA',
    step4P: 'GISA — Gewerbeinformationssystem Austria — официальный портал для регистрации Gewerbe.',
    step4GisaLink: '🌐 Перейти на GISA — Online-Gewerbeanmeldung',
    step4NoteInfo: 'Если все условия выполнены, для большинства видов Gewerbe деятельность можно начинать уже с момента действительной регистрации. Для отдельных регламентированных видов деятельности могут действовать другие сроки. Данные из GISA также понадобятся для следующих шагов, в частности для формы в FinanzOnline.',
    step4ArticleTitle: 'Читайте подробно → Как заполнить формуляр GISA', step4ArticleSub: 'Пошаговый гайд с объяснением каждого поля',
    step5H2: 'Проверить регистрацию и данные в SVS',
    step5P: 'SVS (Sozialversicherungsanstalt der Selbständigen) — социальное страхование самозанятых. После Gewerbeanmeldung орган, регистрирующий Gewerbe, как правило, сам передаёт данные в SVS — отдельная ручная регистрация в SVS для Gewerbetreibende обычно не требуется. Проверьте свой статус страхования и данные в кабинете SVS (вход через ID Austria) и при необходимости дополните информацию. Обратите внимание: логика уведомления SVS для Neue Selbständige (новой самозанятости без Gewerbe) отличается.',
    step5NoteTip: 'При определённых условиях к медицинскому страхованию SVS могут быть присоединены отдельные члены семьи (например, супруг/супруга, зарегистрированный партнёр, дети) — точные условия совместного страхования стоит уточнить непосредственно в SVS.',
    step5ArticleTitle: 'Читайте подробно → Как заполнить формуляр SVS', step5ArticleSub: 'Какие данные нужно указать и как работает регистрация в SVS',
    step6H2: 'Регистрация в FinanzOnline',
    step6P: 'Вход через ID Austria (или через отдельную регистрацию в FinanzOnline, если ID Austria ещё нет). В Fragebogen zur Betriebseröffnung нужно указать ожидаемый оборот — эта оценка нужна Finanzamt, чтобы определить, превышается ли порог НДС (55 000 € в год), и установить предварительные налоговые платежи. Это не связано со взносами SVS.',
    step6TipBefore: 'Взносы SVS для новых Gewerbetreibende изначально рассчитываются от минимальной базы автоматически, независимо от прогноза оборота в FinanzOnline.', step6TipLink: 'SVS Beitragsrechner', step6TipAfter: ' поможет ориентировочно оценить сумму взносов.',
    step6NoteWarning: <>Если вы регистрируетесь в FinanzOnline <strong>без ID Austria</strong>, первоначальные логин и пароль присылаются письмом по почте — поэтому понадобится адрес, по которому вы можете получить корреспонденцию. С <strong>ID Austria</strong> можно войти сразу, не дожидаясь письма.</>,
    step6NoteInfo: 'Если позже нужно добавить или изменить код деятельности (ÖNACE) или другие регистрационные данные, актуальную процедуру уточняйте непосредственно в вашем Finanzamt или Gewerbebehörde — точный порядок может отличаться в зависимости от ведомства.',
    step7H2: 'Настроить SEPA-Lastschriftmandat (по желанию)',
    step7P: <>В кабинете FinanzOnline можно настроить <strong>SEPA-Lastschriftmandat</strong> для автоматического списания платежей, которые администрирует Finanzamt (например, авансовых платежей по налогу на прибыль). Это не распространяется на взносы SVS — SVS администрирует собственный, отдельный процесс прямого дебетования, который настраивается отдельно в кабинете SVS.</>,
    step8H2: 'Выбор MVK (Selbständigenvorsorge)',
    step8P: <>В течение <strong>6 месяцев</strong> после регистрации нужно выбрать Mitarbeitervorsorgekasse (MVK) — § 6 BMSVG. Взнос составляет 1,53% от дохода ежемесячно и накапливается на вашем счёте Selbständigenvorsorge. Если фонд не выбран самостоятельно, вас присоединят к одному из фондов автоматически.</>,
    step8ArticleTitle: 'Читайте подробно → Как выбрать MVK', step8ArticleSub: 'Что такое MVK и какие сроки нужно знать',
    step9H2: 'Воспользоваться сервисами WKO',
    step9P: <>WKO (Wirtschaftskammer Österreich) — торгово-промышленная палата. Членство в WKO обычно возникает автоматически вместе с получением Gewerbeberechtigung — отдельно регистрироваться для этого не нужно. В вашем районном отделении могут быть <strong>консультации для начинающих (Gründerservice)</strong>, вебинары и встречи.</>,
    step9Link: '🏢 WKO — информация о регистрации',
    ctaH2: 'Продолжай разбираться шаг за шагом',
    ctaP: 'В QLIXA можно найти бесплатные гайды, чеклисты, инструкции и инструменты о налогах, документах, самозанятости и жизни в Австрии.',
    ctaLinkText: 'Посмотреть бесплатные материалы →',
    sourcesLabel: 'Официальные источники',
  },
  EN: {
    tag1: 'Business Registration', tag2: '9 Steps', tag3: 'Full Guide',
    titleLine1: 'Gewerbeanmeldung in Austria:', titleEm: 'step-by-step self-employment registration',
    metaTime: '🕐 15 min read', metaFree: '🆓 Freies Gewerbe — €0', metaForeigners: '🇺🇦 For foreigners',
    toc: [
      ['#step1', 'Type of Activity'], ['#step2', 'Documents'], ['#step3', 'ID Austria'],
      ['#step4', 'GISA Registration'], ['#step5', 'SVS'], ['#step6', 'FinanzOnline'],
      ['#step7', 'SEPA'], ['#step8', 'MVK Pension Fund'], ['#step9', 'WKO'],
    ],
    disclaimer: 'This material is for informational purposes only and does not constitute legal, tax, or business advice. Requirements and procedures may change and depend on the specific activity and situation. Before submitting, check the current information on the official WKO, USP, and GISA websites or with the competent authority.',
    introP: "Ukrainians, Romanians, Serbians, and other foreigners in Austria often don't understand: which form fits, whether a license is needed, where to go, which documents to bring, how much it costs, and what happens with taxes. This guide covers registration online, step by step.",
    submissionLabel: 'How to apply:', submissionText: 'online or in person. This guide covers online. For offline — ',
    offlineLinkText: 'contact the WKO Gründerservice', offlineAfter: ' in your district.',
    step1H2: 'Decide on your type of activity', step1P: 'First, you need to understand what kind of activity you have:',
    step1Cards: [
      { title: 'Freies Gewerbe', sub: 'Free activity, no license needed', desc: 'Does not require proof of qualification (Befähigungsnachweis). Registration has been free since 2017.', featured: true },
      { title: 'Reglementiertes Gewerbe', sub: 'Requires a Befähigungsnachweis', desc: 'Requires proof of qualification for your specific activity.', featured: false },
    ],
    step1Direction: 'Whether a Gewerbeberechtigung is required, and whether an activity is free or regulated, depends on the exact activity (Gewerbewortlaut). Before registering, check the exact name and type of your activity via WKO or the official GISA services.',
    costLabel: 'Registration cost (§ 13 GewO):',
    costCoreText: 'Gewerbeanmeldung itself, under the Gewerbeordnung, generally does not carry a registration fee.',
    costExtraText: 'Additional costs may arise depending on the type of activity, required proof documents, translations, or other procedures.',
    step1Link1: '📋 List of activity codes (ÖNACE 2008)', step1Link2: '🔍 Check in GISA',
    step2H2: 'Prepare your documents in advance',
    step2P: "You may need these documents at various stages — but not every document is required in every case: the exact list depends on citizenship, residence status, length of residence in Austria, name changes, and whether the activity is regulated.",
    step2Docs: ['Scanned passport (international)', 'Meldezettel — proof of registration in Austria', 'Ausweis — identity document', 'A valid Austrian bank account', 'Criminal record certificate (under certain conditions, see below)'],
    step2NoteInfo: <> <strong>Bank account:</strong> for Einzelunternehmen a separate account isn&apos;t mandatory but is recommended.</>,
    step2NoteWarning: "People who don't live in Austria, or have lived there for less than five years, generally must submit a criminal record certificate from their country of citizenship or last country of long-term residence — the original with a certified German translation, no older than three months at the time of submission. This requirement is waived if a sworn statement (eidesstattliche Erklärung) is submitted instead. For Ukrainian citizens, this certificate can, among other options, be obtained online via Diia — but the document format and translation requirements should be confirmed with the competent authority before submission.",
    orderLinkText: '📅 Book an appointment — bmi.gv.at ↗',
    step3H2: 'Get your ID Austria',
    step3P: 'ID Austria is an electronic identification means used to access many Austrian government digital services (including GISA, FinanzOnline, SVS) and may be used for online procedures.',
    step3NoteWarning: 'For some non-Austrian citizens, getting an ID Austria fully online may not be possible — it depends on the state (Bundesland). Be prepared for an in-person visit.',
    step3AppointmentLink: '📅 Book an appointment — bmi.gv.at',
    step3ArticleTitle: 'Read more → How to get an ID Austria: step-by-step guide', step3ArticleSub: 'Opens in a new window · Full instructions',
    step4H2: 'Register on the GISA website',
    step4P: 'GISA — Gewerbeinformationssystem Austria — the official portal for registering a Gewerbe.',
    step4GisaLink: '🌐 Go to GISA — Online-Gewerbeanmeldung',
    step4NoteInfo: 'If all requirements are met, for most Gewerbe types the activity can generally be carried out from the date of valid registration. Different timelines may apply for certain regulated activities. The data from GISA will also be needed for later steps, including the FinanzOnline form.',
    step4ArticleTitle: 'Read more → How to fill out the GISA form', step4ArticleSub: 'Step-by-step guide explaining each field',
    step5H2: 'Check your SVS registration and details',
    step5P: "SVS (Sozialversicherungsanstalt der Selbständigen) is social insurance for the self-employed. After Gewerbeanmeldung, the authority that registers the Gewerbe generally forwards the relevant data to SVS itself — a separate manual SVS registration is usually not needed for Gewerbetreibende. Check your insurance status and details in your SVS account (log in via ID Austria) and provide additional information if required. Note: the SVS notification logic differs for Neue Selbständige (new self-employment without a Gewerbe).",
    step5NoteTip: 'Under certain conditions, specific family members (such as a spouse, registered partner, or children) may be co-insured under SVS health insurance — check the exact eligibility conditions directly with SVS.',
    step5ArticleTitle: 'Read more → How to fill out the SVS form', step5ArticleSub: 'What information is required and how SVS registration works',
    step6H2: 'Register with FinanzOnline',
    step6P: "Log in via ID Austria (or via a separate FinanzOnline registration if you don't have ID Austria yet). In the Fragebogen zur Betriebseröffnung, you need to state your expected turnover — this estimate is used by the Finanzamt to check whether the VAT threshold (€55,000/year) is exceeded and to set advance tax payments. This is unrelated to SVS contributions.",
    step6TipBefore: "SVS contributions for new Gewerbetreibende are initially calculated automatically from the minimum contribution base, regardless of the turnover forecast in FinanzOnline.", step6TipLink: 'SVS Beitragsrechner', step6TipAfter: ' can help you estimate the approximate amount.',
    step6NoteWarning: <>If you register with FinanzOnline <strong>without ID Austria</strong>, your initial login and password are sent by post — so you&apos;ll need an address where you can receive mail. With <strong>ID Austria</strong>, you can log in immediately, without waiting for a letter.</>,
    step6NoteInfo: "If you need to add or change an activity code (ÖNACE) or other registration details later, check the current procedure directly with your Finanzamt or Gewerbebehörde — the exact process may vary by authority.",
    step7H2: 'Set up a SEPA-Lastschriftmandat (optional)',
    step7P: <>In your FinanzOnline account, you can set up a <strong>SEPA-Lastschriftmandat</strong> for automatic payment of charges administered by the Finanzamt (such as income tax advance payments). This does not cover SVS contributions — SVS runs its own, separate direct-debit process, set up separately in your SVS account.</>,
    step8H2: 'Choosing your MVK (Selbständigenvorsorge)',
    step8P: <>Within <strong>6 months</strong> of registering, you need to choose a Mitarbeitervorsorgekasse (MVK) — § 6 BMSVG. The contribution is 1.53% of your income each month, paid into your Selbständigenvorsorge account. If you don&apos;t choose a fund yourself, you&apos;ll be assigned to one automatically.</>,
    step8ArticleTitle: 'Read more → How to choose an MVK', step8ArticleSub: 'What MVK is and which deadlines you should know',
    step9H2: 'Use WKO services',
    step9P: <>WKO (Wirtschaftskammer Österreich) is the chamber of commerce. Membership in WKO generally arises automatically together with obtaining a Gewerbeberechtigung — you don&apos;t need to register separately for it. Your local branch may offer <strong>consultations for founders (Gründerservice)</strong>, webinars, and meetups.</>,
    step9Link: '🏢 WKO — registration information',
    ctaH2: 'Keep going, step by step',
    ctaP: 'QLIXA has free guides, checklists, instructions, and tools about taxes, documents, self-employment, and life in Austria.',
    ctaLinkText: 'Browse free resources →',
    sourcesLabel: 'Official sources',
  },
  DE: {
    tag1: 'Geschäftsregistrierung', tag2: '9 Schritte', tag3: 'Kompletter Leitfaden',
    titleLine1: 'Gewerbeanmeldung in Österreich:', titleEm: 'Schritt-für-Schritt-Registrierung der Selbstständigkeit',
    metaTime: '🕐 15 Min. Lesezeit', metaFree: '🆓 Freies Gewerbe — 0 €', metaForeigners: '🇺🇦 Für Ausländer',
    toc: [
      ['#step1', 'Tätigkeitsart'], ['#step2', 'Dokumente'], ['#step3', 'ID Austria'],
      ['#step4', 'GISA-Anmeldung'], ['#step5', 'SVS'], ['#step6', 'FinanzOnline'],
      ['#step7', 'SEPA'], ['#step8', 'MVK-Pensionskasse'], ['#step9', 'WKO'],
    ],
    disclaimer: 'Dieses Material dient nur zu Informationszwecken und stellt keine Rechts-, Steuer- oder Unternehmensberatung dar. Anforderungen und Verfahren können sich ändern und hängen von der konkreten Tätigkeit und Situation ab. Überprüfe vor der Einreichung die aktuellen Informationen auf den offiziellen Websites von WKO, USP und GISA oder bei der zuständigen Behörde.',
    introP: 'Ukrainer, Rumänen, Serben und andere Ausländer in Österreich verstehen oft nicht: welche Form passt, ob eine Lizenz nötig ist, wohin man gehen muss, welche Dokumente man mitbringen muss, wie viel es kostet und was mit den Steuern passiert. In diesem Leitfaden geht es um die Online-Registrierung Schritt für Schritt.',
    submissionLabel: 'Art der Antragstellung:', submissionText: 'online oder persönlich. Dieser Leitfaden behandelt online. Für offline — ',
    offlineLinkText: 'wende dich an das WKO Gründerservice', offlineAfter: ' in deinem Bezirk.',
    step1H2: 'Die Tätigkeitsart bestimmen', step1P: 'Zuerst musst du verstehen, welche Tätigkeit du hast:',
    step1Cards: [
      { title: 'Freies Gewerbe', sub: 'Freie Tätigkeit ohne Lizenz', desc: 'Erfordert keinen Befähigungsnachweis. Die Anmeldung ist seit 2017 kostenlos.', featured: true },
      { title: 'Reglementiertes Gewerbe', sub: 'Befähigungsnachweis erforderlich', desc: 'Erfordert einen Befähigungsnachweis für deine konkrete Tätigkeit.', featured: false },
    ],
    step1Direction: 'Ob eine Gewerbeberechtigung erforderlich ist und ob eine Tätigkeit frei oder reglementiert ist, hängt vom genauen Gewerbewortlaut ab. Prüfe vor der Anmeldung die genaue Bezeichnung und Art deiner Tätigkeit über die WKO oder die offiziellen GISA-Dienste.',
    costLabel: 'Registrierungskosten (§ 13 GewO):',
    costCoreText: 'Die Gewerbeanmeldung selbst ist nach der Gewerbeordnung in der Regel gebührenfrei.',
    costExtraText: 'Zusätzliche Kosten können je nach Tätigkeitsart, erforderlichen Nachweisen, Übersetzungen oder anderen Verfahren entstehen.',
    step1Link1: '📋 Liste der ÖNACE-Codes (ÖNACE 2008)', step1Link2: '🔍 Prüfung in GISA',
    step2H2: 'Dokumente frühzeitig vorbereiten',
    step2P: 'Diese Dokumente werden möglicherweise in verschiedenen Phasen benötigt — aber nicht jedes Dokument ist in jedem Fall erforderlich: Die genaue Liste hängt von Staatsbürgerschaft, Aufenthaltsstatus, Aufenthaltsdauer in Österreich, Namensänderungen und davon ab, ob die Tätigkeit reglementiert ist.',
    step2Docs: ['Scan des Reisepasses (Auslandsreisepass)', 'Meldezettel — Bestätigung der Meldung in Österreich', 'Ausweis — Personalausweis', 'Ein gültiges österreichisches Bankkonto', 'Strafregisterauszug (unter bestimmten Voraussetzungen, siehe unten)'],
    step2NoteInfo: <> <strong>Bankkonto:</strong> Für Einzelunternehmen ist ein separates Konto nicht verpflichtend, aber empfohlen.</>,
    step2NoteWarning: 'Personen, die nicht in Österreich wohnhaft sind oder weniger als fünf Jahre hier wohnhaft sind, müssen in der Regel einen Strafregisterauszug ihres Herkunfts- bzw. bisherigen Aufenthaltsstaates vorlegen — im Original mit beglaubigter deutscher Übersetzung, nicht älter als drei Monate zum Zeitpunkt der Einreichung. Diese Anforderung entfällt, wenn stattdessen eine eidesstattliche Erklärung abgegeben wird. Für ukrainische Staatsbürger:innen kann dieser Auszug unter anderem online über Diia bezogen werden — das genaue Format und die Übersetzungsanforderungen sollten aber vorab bei der zuständigen Behörde geklärt werden.',
    orderLinkText: '📅 Termin vereinbaren — bmi.gv.at ↗',
    step3H2: 'ID Austria beantragen',
    step3P: 'Die ID Austria ist ein elektronisches Identifizierungsmittel für den Zugang zu vielen staatlichen digitalen Diensten in Österreich (u. a. GISA, FinanzOnline, SVS) und kann für Online-Verfahren verwendet werden.',
    step3NoteWarning: 'Für manche Nicht-Österreicher:innen ist die vollständige Online-Beantragung der ID Austria möglicherweise nicht möglich — das hängt vom Bundesland ab. Sei auf einen persönlichen Besuch vorbereitet.',
    step3AppointmentLink: '📅 Termin vereinbaren — bmi.gv.at',
    step3ArticleTitle: 'Mehr lesen → ID Austria beantragen: Schritt-für-Schritt-Anleitung', step3ArticleSub: 'Öffnet sich in einem neuen Fenster · Vollständige Anleitung',
    step4H2: 'Registrierung auf der GISA-Website',
    step4P: 'GISA — Gewerbeinformationssystem Austria — das offizielle Portal für die Gewerbeanmeldung.',
    step4GisaLink: '🌐 Zu GISA — Online-Gewerbeanmeldung',
    step4NoteInfo: 'Wenn alle Voraussetzungen erfüllt sind, kann die Tätigkeit bei den meisten Gewerbearten grundsätzlich ab dem Zeitpunkt der rechtswirksamen Anmeldung ausgeübt werden. Für einzelne reglementierte Tätigkeiten können andere Fristen gelten. Die Daten aus GISA werden außerdem für die nächsten Schritte benötigt, unter anderem für das Formular bei FinanzOnline.',
    step4ArticleTitle: 'Mehr lesen → Wie man das GISA-Formular ausfüllt', step4ArticleSub: 'Schritt-für-Schritt-Anleitung mit Erklärung jedes Feldes',
    step5H2: 'Anmeldung und Daten bei der SVS prüfen',
    step5P: 'SVS (Sozialversicherungsanstalt der Selbständigen) — Sozialversicherung für Selbstständige. Nach der Gewerbeanmeldung übermittelt die Behörde, die das Gewerbe registriert, die relevanten Daten in der Regel selbst an die SVS — eine separate manuelle Anmeldung bei der SVS ist für Gewerbetreibende meist nicht nötig. Prüfe deinen Versicherungsstatus und deine Daten im SVS-Kundenportal (Anmeldung über ID Austria) und ergänze bei Bedarf Angaben. Beachte: Die Meldelogik der SVS unterscheidet sich für Neue Selbständige (neue Selbstständigkeit ohne Gewerbe).',
    step5NoteTip: 'Unter bestimmten Voraussetzungen können einzelne Angehörige (z. B. Ehepartner:in, eingetragene:r Partner:in, Kinder) in der SVS-Krankenversicherung mitversichert werden — die genauen Voraussetzungen solltest du direkt bei der SVS prüfen.',
    step5ArticleTitle: 'Mehr lesen → Wie man das SVS-Formular ausfüllt', step5ArticleSub: 'Welche Angaben erforderlich sind und wie die Anmeldung bei der SVS funktioniert',
    step6H2: 'Registrierung bei FinanzOnline',
    step6P: 'Anmeldung über ID Austria (oder über eine separate FinanzOnline-Registrierung, falls du noch keine ID Austria hast). Im Fragebogen zur Betriebseröffnung musst du deinen erwarteten Umsatz angeben — diese Schätzung dient dem Finanzamt dazu, zu prüfen, ob die Umsatzsteuergrenze (55.000 € pro Jahr) überschritten wird, und Vorauszahlungen festzulegen. Das hat nichts mit den SVS-Beiträgen zu tun.',
    step6TipBefore: 'Die SVS-Beiträge für neue Gewerbetreibende werden anfangs automatisch von der Mindestbeitragsgrundlage berechnet, unabhängig von der Umsatzprognose in FinanzOnline.', step6TipLink: 'SVS Beitragsrechner', step6TipAfter: ' hilft dir, die ungefähre Beitragshöhe einzuschätzen.',
    step6NoteWarning: <>Wenn du dich bei FinanzOnline <strong>ohne ID Austria</strong> anmeldest, werden dein erstes Login und Passwort per Post zugesendet — dafür brauchst du eine Adresse, an der du Post empfangen kannst. Mit <strong>ID Austria</strong> kannst du dich sofort anmelden, ohne auf den Brief zu warten.</>,
    step6NoteInfo: 'Wenn du später einen Tätigkeitscode (ÖNACE) hinzufügen oder ändern musst oder andere Anmeldedaten aktualisieren möchtest, kläre das aktuelle Verfahren direkt mit deinem Finanzamt oder deiner Gewerbebehörde — der genaue Ablauf kann je nach Behörde unterschiedlich sein.',
    step7H2: 'SEPA-Lastschriftmandat einrichten (optional)',
    step7P: <>In deinem FinanzOnline-Konto kannst du ein <strong>SEPA-Lastschriftmandat</strong> einrichten, um vom Finanzamt verwaltete Zahlungen (z. B. Einkommensteuer-Vorauszahlungen) automatisch abbuchen zu lassen. Das gilt nicht für SVS-Beiträge — die SVS hat einen eigenen, separaten Lastschriftprozess, den du gesondert in deinem SVS-Konto einrichtest.</>,
    step8H2: 'Wahl der MVK (Selbständigenvorsorge)',
    step8P: <>Wähle innerhalb von <strong>6 Monaten</strong> nach der Anmeldung eine Mitarbeitervorsorgekasse (MVK) — § 6 BMSVG. Der Beitrag beträgt 1,53 % deines Einkommens monatlich und wird auf deinem Selbständigenvorsorge-Konto angespart. Wenn du selbst keine Kasse wählst, wirst du automatisch einer zugeteilt.</>,
    step8ArticleTitle: 'Mehr lesen → Wie man eine MVK wählt', step8ArticleSub: 'Was eine MVK ist und welche Fristen wichtig sind',
    step9H2: 'WKO-Services nutzen',
    step9P: <>WKO (Wirtschaftskammer Österreich) — die Wirtschaftskammer. Die Mitgliedschaft in der WKO entsteht in der Regel automatisch mit dem Erwerb der Gewerbeberechtigung — eine gesonderte Anmeldung dafür ist nicht nötig. In deiner Bezirksstelle gibt es möglicherweise <strong>Beratungen für Gründer:innen (Gründerservice)</strong>, Webinare und Treffen.</>,
    step9Link: '🏢 WKO — Informationen zur Anmeldung',
    ctaH2: 'Schritt für Schritt weitermachen',
    ctaP: 'Bei QLIXA findest du kostenlose Leitfäden, Checklisten, Anleitungen und Tools zu Steuern, Dokumenten, Selbstständigkeit und dem Leben in Österreich.',
    ctaLinkText: 'Kostenlose Materialien ansehen →',
    sourcesLabel: 'Offizielle Quellen',
  },
}

export default function GewerbeanmeldungPage() {
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

  const t = GA_TEXT[lang] || GA_TEXT.UA

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
                <span>{t.metaFree}</span>
                <span>{t.metaForeigners}</span>
              </div>
            </div>
            <div style={{ flex: '0 0 340px', borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/articles/gewerbeanmeldung-cover.jpg" alt="Gewerbeanmeldung в Австрії" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
            </div>
          </div>
        </section>

      {/* Article body + sidebar */}
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '48px 16px 80px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>

        {/* Sidebar */}
        <ArticleSidebar currentSlug="gewerbeanmeldung" />

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          <ArticleTOC items={t.toc} />

        {/* Disclaimer */}
          <div style={{ background: '#FFF8E7', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 12, padding: '16px 20px', marginBottom: 32, fontSize: 13, color: '#595959', lineHeight: 1.6 }}>
            ⚠️ <strong>{lang === 'UA' ? 'Важливо:' : lang === 'RU' ? 'Важно:' : lang === 'DE' ? 'Wichtig:' : 'Important:'}</strong> {t.disclaimer}
          </div>

        {/* Intro */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: 24,
          border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 40,
        }}>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--charcoal)', marginBottom: 14 }}>
            {t.introP}
          </p>
          <div style={{
            padding: '13px 16px', background: 'var(--peach-light)',
            borderRadius: 9, borderLeft: '3px solid #038390', fontSize: 13, color: 'var(--charcoal)',
          }}>
            <strong style={{ color: '#038390' }}>{t.submissionLabel}</strong> {t.submissionText}
            <ExtLink href="https://www.wko.at/gruendung/gewerbeanmeldung">{t.offlineLinkText}</ExtLink>{t.offlineAfter}
          </div>
        </div>

        {/* STEP 1 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={1} />
            <h2 id="step1" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>
              {t.step1H2}
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>{t.step1P}</p>
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', marginBottom: 20 }}>
              {t.step1Cards.map((c: any) => (
                <div key={c.title} style={{
                  padding: 15, borderRadius: 11,
                  border: `2px solid ${c.featured ? '#038390' : 'var(--line)'}`,
                  background: c.featured ? 'var(--peach-light)' : 'var(--gray)',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: c.featured ? '#038390' : 'var(--charcoal)', marginBottom: 3 }}>{c.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text2)', marginBottom: 8 }}>{c.sub}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--charcoal)' }}>{c.desc}</div>
                </div>
              ))}
            </div>
            <NoteBox type="info">{t.step1Direction}</NoteBox>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6 }}>{t.costLabel}</p>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text2)', marginBottom: 14 }}>
              {t.costCoreText} {t.costExtraText}
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 14 }}>
              <ExtLink href="https://www.wko.at/statistik/oenace/oenace2008.pdf">{t.step1Link1}</ExtLink>
              <ExtLink href="https://www.gisa.gv.at/abfrage">{t.step1Link2}</ExtLink>
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={2} />
            <h2 id="step2" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>
              {t.step2H2}
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>{t.step2P}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {t.step2Docs.map((doc: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 13px', borderRadius: 9, background: 'var(--gray)', border: '1px solid var(--line)' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--peach-light)', color: '#038390', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 13, color: 'var(--charcoal)' }}>{doc}</span>
                </div>
              ))}
            </div>
            <NoteBox type="info">{t.step2NoteInfo}</NoteBox>
            <NoteBox type="warning">{t.step2NoteWarning}</NoteBox>
            <a href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung?locale=en"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 18px', borderRadius: 999, marginBottom: 16,
                background: 'var(--peach-light)', border: '1.5px solid #038390',
                fontSize: 13, fontWeight: 700, color: '#038390', textDecoration: 'none',
              }}>
              {t.orderLinkText}
            </a>
          </div>
        </div>

        {/* STEP 3 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={3} />
            <h2 id="step3" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>
              {t.step3H2}
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>
              {t.step3P}
            </p>
            <NoteBox type="warning">{t.step3NoteWarning}</NoteBox>
            <ExtLink href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung">
              {t.step3AppointmentLink}
            </ExtLink>
            <ArticleLink
              href="/articles/austria-id"
              title={t.step3ArticleTitle}
              sub={t.step3ArticleSub}
            />
          </div>
        </div>

        {/* STEP 4 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={4} />
            <h2 id="step4" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>
              {t.step4H2}
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>
              {t.step4P}
            </p>
            <ExtLink href="https://www.gisa.gv.at/online-gewerbeanmeldung">{t.step4GisaLink}</ExtLink>
            <NoteBox type="info">{t.step4NoteInfo}</NoteBox>
            <ArticleLink
              href="/articles/gisa-formular"
              title={t.step4ArticleTitle}
              sub={t.step4ArticleSub}
            />
          </div>
        </div>

        {/* STEP 5 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={5} />
            <h2 id="step5" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>
              {t.step5H2}
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8 }}>
              {t.step5P}
            </p>
            <NoteBox type="tip">{t.step5NoteTip}</NoteBox>
            <ArticleLink
              href="/articles/svs-formular"
              title={t.step5ArticleTitle}
              sub={t.step5ArticleSub}
            />
          </div>
        </div>

        {/* STEP 6 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={6} />
            <h2 id="step6" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>
              {t.step6H2}
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>
              {t.step6P}
            </p>
            <NoteBox type="tip">
              {t.step6TipBefore}{' '}
              <ExtLink href="https://www.svs.at/sva-beitrag/?contentid=10007.906048&portal=svsportal">{t.step6TipLink}</ExtLink>
              {t.step6TipAfter}
            </NoteBox>
            <NoteBox type="warning">{t.step6NoteWarning}</NoteBox>
            <NoteBox type="info">{t.step6NoteInfo}</NoteBox>
          </div>
        </div>

        {/* STEP 7 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={7} />
            <h2 id="step7" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>
              {t.step7H2}
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8 }}>
              {t.step7P}
            </p>
          </div>
        </div>

        {/* STEP 8 */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={8} />
            <h2 id="step8" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>
              {t.step8H2}
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>
              {t.step8P}
            </p>
            <ArticleLink
              href="/articles/mvk-pension"
              title={t.step8ArticleTitle}
              sub={t.step8ArticleSub}
            />
          </div>
        </div>

        {/* STEP 9 */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
            <StepBadge n={9} />
            <h2 id="step9" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: 0, paddingTop: 4, scrollMarginTop: '80px' }}>
              {t.step9H2}
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>
              {t.step9P}
            </p>
            <ExtLink href="https://www.wko.at/gruendung/gewerbeanmeldung">{t.step9Link}</ExtLink>
          </div>
        </div>

        {/* Final CTA */}
        <div style={{
          background: 'var(--peach-light)', borderRadius: 20, padding: '40px 28px',
          textAlign: 'center', marginBottom: 48, position: 'relative', overflow: 'hidden',
          border: '1px solid var(--orange-mid)',
        }}>
          <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: '#038390', opacity: 0.08, top: -40, right: -40 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/favicon-planet-black.svg" alt="QLIXA" style={{ width: 40, height: 40, objectFit: 'contain', margin: '0 auto 18px', display: 'block' }} />
            <h2 style={{
              fontFamily: 'DM Serif Display, serif', fontSize: 30, color: 'var(--charcoal)',
              marginBottom: 16, lineHeight: 1.3,
            }}>
              {t.ctaH2}
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: 16, maxWidth: 500, margin: '0 auto 28px', lineHeight: 1.8 }}>
              {t.ctaP}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/tools" style={{
                padding: '14px 28px', borderRadius: 999, fontSize: 14, fontWeight: 700,
                background: 'transparent', color: 'var(--charcoal)', border: '2px solid var(--charcoal)',
                textDecoration: 'none', display: 'inline-block',
              }}>
                {t.ctaLinkText}
              </Link>
            </div>
          </div>
        </div>

        {/* Sources */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 22 }}>
          <p style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
            {t.sourcesLabel}
          </p>
          {[
            { label: 'GISA — Online-Gewerbeanmeldung', href: 'https://www.gisa.gv.at/online-gewerbeanmeldung' },
            { label: 'WKO — Gewerbeanmeldung', href: 'https://www.wko.at/gruendung/gewerbeanmeldung' },
            { label: 'USP — Gewerbeanmeldung', href: 'https://www.usp.gv.at/gruendung/EAP/gewerbeanmeldung.html' },
            { label: 'BMWET — Gewerbeanmeldung', href: 'https://www.bmwet.gv.at/Themen/Unternehmen/Gewerbe/Gewerbeanmeldung.html' },
            { label: 'SVS — Beitragsrechner', href: 'https://www.svs.at/sva-beitrag/?contentid=10007.906048&portal=svsportal' },
            { label: 'BMF — FinanzOnline: Anmeldung', href: 'https://www.bmf.gv.at/services/finanzonline/informationen-fuer-unternehmer-und-gemeinden/anmeldung-unternehmer-gemeinden.html' },
          ].map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', fontSize: 13, color: '#038390', textDecoration: 'none', marginBottom: 6 }}>
              ↗ {s.label}
            </a>
          ))}
        </div>

        {/* Prev / Next navigation */}
        <ArticlePrevNext currentSlug="gewerbeanmeldung" />

        </div>{/* end main content */}
      </div>{/* end flex wrapper */}

      <Footer />
    </div>
  )
}
