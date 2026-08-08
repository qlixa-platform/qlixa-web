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

function CostTable({ headers, rows }: { headers: string[]; rows: { type: string; cost: string; free: boolean; note: string }[] }) {
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'var(--charcoal)' }}>
            {headers.map(h => (
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
                  color: r.free ? 'var(--success)' : '#038390',
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

function TranslationForm({ t }: { t: any }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <input type="text" placeholder={t.formFirstName} style={{
          padding: '10px 13px', borderRadius: 8, border: '1px solid var(--line2)',
          fontSize: 13, outline: 'none', fontFamily: 'DM Sans, sans-serif',
        }} />
        <input type="text" placeholder={t.formLastName} style={{
          padding: '10px 13px', borderRadius: 8, border: '1px solid var(--line2)',
          fontSize: 13, outline: 'none', fontFamily: 'DM Sans, sans-serif',
        }} />
      </div>
      <input type="email" placeholder={t.formEmail} style={{
        width: '100%', padding: '10px 13px', borderRadius: 8, border: '1px solid var(--line2)',
        fontSize: 13, outline: 'none', fontFamily: 'DM Sans, sans-serif',
      }} />
      <div style={{
        padding: '12px 13px', borderRadius: 8, border: '2px dashed var(--line2)',
        fontSize: 13, color: 'var(--text3)', background: '#fff', textAlign: 'center', cursor: 'pointer',
      }}>
        {t.formUpload}
      </div>
      <button style={{
        padding: '11px', borderRadius: 999, fontSize: 13, fontWeight: 700,
        background: '#038390', color: '#fff', border: 'none', cursor: 'pointer',
        fontFamily: 'DM Sans, sans-serif',
      }}>
        {t.formSubmit}
      </button>
    </div>
  )
}

// Переклади статті "Gewerbeanmeldung в Австрії" — UA + RU (EN/DE додамо наступними кроками)
const GA_TEXT: Record<string, any> = {
  UA: {
    tag1: 'Реєстрація бізнесу', tag2: '9 кроків', tag3: 'Повний гайд',
    titleLine1: 'Gewerbeanmeldung в Австрії:', titleEm: 'покрокова реєстрація самозайнятості',
    metaTime: '🕐 15 хв читання', metaFree: '🆓 Freies Gewerbe — 0 €', metaForeigners: '🇺🇦 Для іноземців',
    toc: [
      ['#step1', 'Вид діяльності'], ['#step2', 'Документи'], ['#step3', 'Austria ID'],
      ['#step4', 'Реєстрація GISA'], ['#step5', 'Реєстрація SVS'], ['#step6', 'FinanzOnline'],
      ['#step7', 'SEPA'], ['#step8', 'Пенсійний фонд MVK'], ['#step9', 'WKO'],
    ],
    disclaimer: 'Цей матеріал підготовлено на основі публічно доступних офіційних джерел та досвіду людей, які пройшли цей процес. QLIXA не є юридичним агентством і не надає індивідуальних консультацій. Вимоги та процедури можуть змінюватися — завжди перевіряйте актуальну інформацію на офіційних сайтах WKO та GISA.',
    introP: 'Українці, румуни, серби та інші іноземці в Австрії часто не розуміють: яка форма підходить, чи потрібна ліцензія, куди йти, які документи нести, скільки коштує і що буде з податками. У цьому гайді — реєстрація онлайн крок за кроком.',
    submissionLabel: 'Спосіб подачі:', submissionText: 'онлайн або особисто. Цей гайд — про онлайн. Для офлайн — ',
    offlineLinkText: 'запишіться у WKO', offlineAfter: ' — там безкоштовно консультують.',
    step1H2: 'Визначитися з видом діяльності', step1P: 'Спочатку потрібно зрозуміти — яка у вас діяльність:',
    step1Cards: [
      { title: 'Freies Gewerbe', sub: 'Вільна діяльність без ліцензії', desc: 'Більшість IT, дизайн, консалтинг, фотографія, переклади. Реєстрація безкоштовна з 2017 року.', featured: true },
      { title: 'Reglementiertes Gewerbe', sub: 'Потрібен Befähigungsnachweis', desc: 'Лікарі, архітектори, електрики тощо. Необхідно підтвердити кваліфікацію.', featured: false },
    ],
    costLabel: 'Вартість реєстрації (§ 13 GewO, GebG):',
    costHeaders: ['Форма / тип бізнесу', 'Вартість', 'Примітка'],
    costRows: [
      { type: 'Einzelunternehmen — freies Gewerbe', cost: '0 €', free: true, note: 'Безкоштовно з 2017 р.' },
      { type: 'Einzelunternehmen — reglementiert', cost: '~14–100 €', free: false, note: 'Залежно від виду діяльності' },
      { type: 'GmbH (нотаріус + Firmenbuch)', cost: '~2 000–4 000 €', free: false, note: '+ мін. капітал 35 000 €' },
      { type: 'FlexCo (нотаріус + Firmenbuch)', cost: '~1 200–2 500 €', free: false, note: '+ мін. капітал 10 000 €' },
    ],
    step1Link1: '📋 Список КВЕДів (ÖNACE 2008)', step1Link2: '🔍 Перевірка в GISA',
    step2H2: 'Підготувати документи заздалегідь', step2P: 'Ці документи знадобляться на різних етапах — готуйте одразу всі:',
    step2Docs: ['Скан паспорта (закордонного)', 'Meldezettel — довідка про прописку в Австрії', 'Ausweis — посвідчення особи', 'Дійсний австрійський банківський рахунок', 'Довідка про несудимість'],
    step2NoteInfo: <> <strong>Банківський рахунок:</strong> для Einzelunternehmen окремий рахунок не обов&apos;язковий, але рекомендований. Для GmbH / FlexCo — обов&apos;язковий.</>,
    step2NoteWarning: 'Якщо ви проживаєте в Австрії менше 5 років, при реєстрації Gewerbe майже завжди вимагають довідку про несудимість. Довідка видається країною вашого громадянства або останньої країни довготривалого проживання. Вона має бути не старше 3 місяців на момент подачі. Обов’язковий офіційний переклад на німецьку мову, виконаний присяжним перекладачем. Для українців — довідку можна згенерувати онлайн через «Дія». QLIXA може допомогти з автоперекладом через наших партнерів.',
    orderLinkText: '📅 Замовити австрійську довідку — bmi.gv.at ↗',
    translationBoxTitle: '🔄 Потрібен переклад довідки з ДІЯ?',
    translationBoxText: 'Залиште заявку — наші партнери з вами зв’яжуться.',
    formFirstName: 'Ім’я (латиницею)', formLastName: 'Прізвище (латиницею)', formEmail: 'Email для зв’язку',
    formUpload: '📎 Завантажити файл з ДІЯ (PDF або JPG)', formSubmit: 'Надіслати заявку →',
    step3H2: 'Оформити Austria ID',
    step3P: 'Austria ID — ваш цифровий підпис для входу в державні сервіси (GISA, FinanzOnline, SVS). Без нього онлайн реєстрація неможлива.',
    step3NoteWarning: 'Для негромадян Австрії зробити Austria ID онлайн може не вийти — залежить від землі. Будьте готові до особистого відвідування.',
    step3AppointmentLink: '📅 Записатися на термін — bmi.gv.at',
    step3ArticleTitle: 'Читайте детально → Як оформити Austria ID: покроковий гайд', step3ArticleSub: 'Відкривається в новому вікні · Повна інструкція',
    step4H2: 'Реєстрація на сайті GISA',
    step4P: 'GISA — Gewerbeinformationssystem Austria — офіційний портал для реєстрації Gewerbe.',
    step4GisaLink: '🌐 Перейти на GISA — Online-Gewerbeanmeldung',
    step4NoteInfo: 'Після реєстрації чекайте кілька днів — дані з GISA знадобляться для заповнення форми у FinanzOnline.',
    step4ArticleTitle: 'Читайте детально → Як заповнити формуляр GISA', step4ArticleSub: 'Покроковий гайд з поясненнями кожного поля',
    step5H2: 'Реєстрація в SVS',
    step5P: 'SVS (Sozialversicherungsanstalt der Selbständigen) — соціальне страхування самозайнятих. Вхід через Austria ID.',
    step5NoteTip: 'До страхування SVS можна підключити всіх членів сім’ї та навіть найближчих родичів.',
    step5ArticleTitle: 'Читайте детально → Як заповнити формуляр SVS', step5ArticleSub: 'Що вказати, щоб не переплатити та підключити сім’ю',
    step6H2: 'Реєстрація у FinanzOnline',
    step6P: 'Вхід через Austria ID. До цього моменту вам вже має прийти лист від GISA, і ви повинні спрогнозувати оборот — бо SVS одразу почне нараховувати внески.',
    step6TipBefore: 'Не знаєте скільки платити SVS?', step6TipLink: 'SVS Beitragsrechner', step6TipAfter: ' — а якщо там нічого не зрозуміло, саме тому ми створили QLIXA 😉',
    step6NoteWarning: <>Обов&apos;язково потрібна <strong>фізична адреса</strong> для отримання листа від FinanzOnline — туди приходять логіни та паролі.</>,
    step6NoteInfo: <>При реєстрації можна додати лише <strong>один КВЕД</strong>. Щоб додати ще — напишіть лист у вільній формі та відправте на email вашого Bezirkshauptmannschaft.</>,
    step7H2: 'Налаштувати SEPA-Lastschriftmandat',
    step7P: <>У кабінеті FinanzOnline знайдіть через пошук <strong>«SEPA-Lastschriftmandat»</strong> і заповніть форму для автоматичного списання SVS та інших платежів з вашого рахунку.</>,
    step8H2: 'Вибір пенсійного фонду MVK',
    step8P: <>Протягом <strong>6 місяців</strong> після реєстрації оберіть Mitarbeitervorsorgekasse (MVK) — § 6 BMSVG. Це 1.53% від доходу щомісяця — ваш пенсійний накопичувальний рахунок.</>,
    step8ArticleTitle: 'Читайте детально → Як обрати пенсійний фонд MVK', step8ArticleSub: 'Що таке MVK і як не пропустити дедлайн 6 місяців',
    step9H2: 'Зареєструватися у WKO вашого району',
    step9P: <>WKO (Wirtschaftskammer Österreich) — торгово-промислова палата. У вашому районному відділенні можуть бути <strong>безкоштовні консультації</strong>, вебінари та зустрічі.</>,
    step9Link: '🏢 WKO — інформація про реєстрацію',
    ctaH2: 'А тепер — починай заробляти! 🚀',
    ctaP: <>А про організацію цифр подбає <strong style={{ color: 'var(--charcoal)' }}>QLIXA</strong>. Рахунки, клієнти, склад, прогнози внесків і податків, звіти та інші цифрові інструменти — усе в одному місці, зрозумілою мовою і без зайвої бюрократії.</>,
    ctaLinkText: 'QLIXA — твій цифровий помічник для бізнесу в Австрії.',
    ctaTagline: 'Reports in one click — і спокій у голові.',
    sourcesLabel: 'Офіційні джерела',
  },
  RU: {
    tag1: 'Регистрация бизнеса', tag2: '9 шагов', tag3: 'Полный гайд',
    titleLine1: 'Gewerbeanmeldung в Австрии:', titleEm: 'пошаговая регистрация самозанятости',
    metaTime: '🕐 15 мин чтения', metaFree: '🆓 Freies Gewerbe — 0 €', metaForeigners: '🇺🇦 Для иностранцев',
    toc: [
      ['#step1', 'Вид деятельности'], ['#step2', 'Документы'], ['#step3', 'Austria ID'],
      ['#step4', 'Регистрация GISA'], ['#step5', 'Регистрация SVS'], ['#step6', 'FinanzOnline'],
      ['#step7', 'SEPA'], ['#step8', 'Пенсионный фонд MVK'], ['#step9', 'WKO'],
    ],
    disclaimer: 'Этот материал подготовлен на основе публично доступных официальных источников и опыта людей, которые прошли этот процесс. QLIXA не является юридическим агентством и не предоставляет индивидуальных консультаций. Требования и процедуры могут меняться — всегда проверяйте актуальную информацию на официальных сайтах WKO и GISA.',
    introP: 'Украинцы, румыны, сербы и другие иностранцы в Австрии часто не понимают: какая форма подходит, нужна ли лицензия, куда идти, какие документы нести, сколько это стоит и что будет с налогами. В этом гайде — регистрация онлайн шаг за шагом.',
    submissionLabel: 'Способ подачи:', submissionText: 'онлайн или лично. Этот гайд — про онлайн. Для офлайн — ',
    offlineLinkText: 'запишитесь в WKO', offlineAfter: ' — там бесплатно консультируют.',
    step1H2: 'Определиться с видом деятельности', step1P: 'Сначала нужно понять — какая у вас деятельность:',
    step1Cards: [
      { title: 'Freies Gewerbe', sub: 'Свободная деятельность без лицензии', desc: 'Большинство IT, дизайн, консалтинг, фотография, переводы. Регистрация бесплатна с 2017 года.', featured: true },
      { title: 'Reglementiertes Gewerbe', sub: 'Нужен Befähigungsnachweis', desc: 'Врачи, архитекторы, электрики и т.д. Необходимо подтвердить квалификацию.', featured: false },
    ],
    costLabel: 'Стоимость регистрации (§ 13 GewO, GebG):',
    costHeaders: ['Форма / тип бизнеса', 'Стоимость', 'Примечание'],
    costRows: [
      { type: 'Einzelunternehmen — freies Gewerbe', cost: '0 €', free: true, note: 'Бесплатно с 2017 г.' },
      { type: 'Einzelunternehmen — reglementiert', cost: '~14–100 €', free: false, note: 'В зависимости от вида деятельности' },
      { type: 'GmbH (нотариус + Firmenbuch)', cost: '~2 000–4 000 €', free: false, note: '+ мин. капитал 35 000 €' },
      { type: 'FlexCo (нотариус + Firmenbuch)', cost: '~1 200–2 500 €', free: false, note: '+ мин. капитал 10 000 €' },
    ],
    step1Link1: '📋 Список кодов ÖNACE (ÖNACE 2008)', step1Link2: '🔍 Проверка в GISA',
    step2H2: 'Подготовить документы заранее', step2P: 'Эти документы понадобятся на разных этапах — готовьте сразу все:',
    step2Docs: ['Скан паспорта (загранпаспорта)', 'Meldezettel — справка о прописке в Австрии', 'Ausweis — удостоверение личности', 'Действующий австрийский банковский счёт', 'Справка о несудимости'],
    step2NoteInfo: <><strong>Банковский счёт:</strong> для Einzelunternehmen отдельный счёт не обязателен, но рекомендован. Для GmbH / FlexCo — обязателен.</>,
    step2NoteWarning: 'Если вы проживаете в Австрии менее 5 лет, при регистрации Gewerbe почти всегда требуют справку о несудимости. Справка выдаётся страной вашего гражданства или последней страны долгосрочного проживания. Она должна быть не старше 3 месяцев на момент подачи. Обязателен официальный перевод на немецкий язык, выполненный присяжным переводчиком. Для украинцев — справку можно сгенерировать онлайн через «Дию». QLIXA может помочь с переводом через наших партнёров.',
    orderLinkText: '📅 Заказать австрийскую справку — bmi.gv.at ↗',
    translationBoxTitle: '🔄 Нужен перевод справки из Дії?',
    translationBoxText: 'Оставьте заявку — наши партнёры с вами свяжутся.',
    formFirstName: 'Имя (латиницей)', formLastName: 'Фамилия (латиницей)', formEmail: 'Email для связи',
    formUpload: '📎 Загрузить файл из Дії (PDF или JPG)', formSubmit: 'Отправить заявку →',
    step3H2: 'Оформить Austria ID',
    step3P: 'Austria ID — ваша цифровая подпись для входа в государственные сервисы (GISA, FinanzOnline, SVS). Без неё онлайн-регистрация невозможна.',
    step3NoteWarning: 'Для неграждан Австрии сделать Austria ID онлайн может не получиться — зависит от земли. Будьте готовы к личному визиту.',
    step3AppointmentLink: '📅 Записаться на приём — bmi.gv.at',
    step3ArticleTitle: 'Читайте подробно → Как оформить Austria ID: пошаговый гайд', step3ArticleSub: 'Открывается в новом окне · Полная инструкция',
    step4H2: 'Регистрация на сайте GISA',
    step4P: 'GISA — Gewerbeinformationssystem Austria — официальный портал для регистрации Gewerbe.',
    step4GisaLink: '🌐 Перейти на GISA — Online-Gewerbeanmeldung',
    step4NoteInfo: 'После регистрации подождите несколько дней — данные из GISA понадобятся для заполнения формы в FinanzOnline.',
    step4ArticleTitle: 'Читайте подробно → Как заполнить формуляр GISA', step4ArticleSub: 'Пошаговый гайд с объяснением каждого поля',
    step5H2: 'Регистрация в SVS',
    step5P: 'SVS (Sozialversicherungsanstalt der Selbständigen) — социальное страхование самозанятых. Вход через Austria ID.',
    step5NoteTip: 'К страхованию SVS можно подключить всех членов семьи и даже ближайших родственников.',
    step5ArticleTitle: 'Читайте подробно → Как заполнить формуляр SVS', step5ArticleSub: 'Что указать, чтобы не переплатить и подключить семью',
    step6H2: 'Регистрация в FinanzOnline',
    step6P: 'Вход через Austria ID. К этому моменту вам уже должно прийти письмо от GISA, и вы должны спрогнозировать оборот — потому что SVS сразу начнёт начислять взносы.',
    step6TipBefore: 'Не знаете, сколько платить SVS?', step6TipLink: 'SVS Beitragsrechner', step6TipAfter: ' — а если там ничего не понятно, именно поэтому мы создали QLIXA 😉',
    step6NoteWarning: <>Обязательно нужен <strong>физический адрес</strong> для получения письма от FinanzOnline — туда приходят логины и пароли.</>,
    step6NoteInfo: <>При регистрации можно добавить только <strong>один код деятельности (ÖNACE)</strong>. Чтобы добавить ещё — напишите письмо в свободной форме и отправьте на email вашего Bezirkshauptmannschaft.</>,
    step7H2: 'Настроить SEPA-Lastschriftmandat',
    step7P: <>В кабинете FinanzOnline найдите через поиск <strong>«SEPA-Lastschriftmandat»</strong> и заполните форму для автоматического списания SVS и других платежей с вашего счёта.</>,
    step8H2: 'Выбор пенсионного фонда MVK',
    step8P: <>В течение <strong>6 месяцев</strong> после регистрации выберите Mitarbeitervorsorgekasse (MVK) — § 6 BMSVG. Это 1.53% от дохода ежемесячно — ваш пенсионный накопительный счёт.</>,
    step8ArticleTitle: 'Читайте подробно → Как выбрать пенсионный фонд MVK', step8ArticleSub: 'Что такое MVK и как не пропустить дедлайн 6 месяцев',
    step9H2: 'Зарегистрироваться в WKO вашего района',
    step9P: <>WKO (Wirtschaftskammer Österreich) — торгово-промышленная палата. В вашем районном отделении могут быть <strong>бесплатные консультации</strong>, вебинары и встречи.</>,
    step9Link: '🏢 WKO — информация о регистрации',
    ctaH2: 'А теперь — начинай зарабатывать! 🚀',
    ctaP: <>А об организации цифр позаботится <strong style={{ color: 'var(--charcoal)' }}>QLIXA</strong>. Счета, клиенты, склад, прогнозы взносов и налогов, отчёты и другие цифровые инструменты — всё в одном месте, понятным языком и без лишней бюрократии.</>,
    ctaLinkText: 'QLIXA — твой цифровой помощник для бизнеса в Австрии.',
    ctaTagline: 'Reports in one click — и спокойствие в голове.',
    sourcesLabel: 'Официальные источники',
  },
  EN: {
    tag1: 'Business Registration', tag2: '9 Steps', tag3: 'Full Guide',
    titleLine1: 'Gewerbeanmeldung in Austria:', titleEm: 'step-by-step self-employment registration',
    metaTime: '🕐 15 min read', metaFree: '🆓 Freies Gewerbe — €0', metaForeigners: '🇺🇦 For foreigners',
    toc: [
      ['#step1', 'Type of Activity'], ['#step2', 'Documents'], ['#step3', 'Austria ID'],
      ['#step4', 'GISA Registration'], ['#step5', 'SVS Registration'], ['#step6', 'FinanzOnline'],
      ['#step7', 'SEPA'], ['#step8', 'MVK Pension Fund'], ['#step9', 'WKO'],
    ],
    disclaimer: 'This material is based on publicly available official sources and the experience of people who have gone through this process. QLIXA is not a legal agency and does not provide individual consultations. Requirements and procedures may change — always check the current information on the official WKO and GISA websites.',
    introP: "Ukrainians, Romanians, Serbians, and other foreigners in Austria often don't understand: which form fits, whether a license is needed, where to go, which documents to bring, how much it costs, and what happens with taxes. This guide covers registration online, step by step.",
    submissionLabel: 'How to apply:', submissionText: 'online or in person. This guide covers online. For offline — ',
    offlineLinkText: 'book an appointment at WKO', offlineAfter: ' — they offer free consultations there.',
    step1H2: 'Decide on your type of activity', step1P: 'First, you need to understand what kind of activity you have:',
    step1Cards: [
      { title: 'Freies Gewerbe', sub: 'Free activity, no license needed', desc: 'Most IT, design, consulting, photography, translation. Registration has been free since 2017.', featured: true },
      { title: 'Reglementiertes Gewerbe', sub: 'Requires a Befähigungsnachweis', desc: 'Doctors, architects, electricians, etc. You need to prove your qualification.', featured: false },
    ],
    costLabel: 'Registration cost (§ 13 GewO, GebG):',
    costHeaders: ['Form / Business Type', 'Cost', 'Note'],
    costRows: [
      { type: 'Einzelunternehmen — freies Gewerbe', cost: '€0', free: true, note: 'Free since 2017' },
      { type: 'Einzelunternehmen — reglementiert', cost: '~€14–100', free: false, note: 'Depends on activity type' },
      { type: 'GmbH (notary + Firmenbuch)', cost: '~€2,000–4,000', free: false, note: '+ min. capital €35,000' },
      { type: 'FlexCo (notary + Firmenbuch)', cost: '~€1,200–2,500', free: false, note: '+ min. capital €10,000' },
    ],
    step1Link1: '📋 List of activity codes (ÖNACE 2008)', step1Link2: '🔍 Check in GISA',
    step2H2: 'Prepare your documents in advance', step2P: "You'll need these documents at various stages — prepare them all at once:",
    step2Docs: ['Scanned passport (international)', 'Meldezettel — proof of registration in Austria', 'Ausweis — identity document', 'A valid Austrian bank account', 'Criminal record certificate'],
    step2NoteInfo: <> <strong>Bank account:</strong> for Einzelunternehmen a separate account isn&apos;t mandatory but is recommended. For GmbH / FlexCo — it is mandatory.</>,
    step2NoteWarning: "If you've lived in Austria for less than 5 years, a criminal record certificate is almost always required when registering a Gewerbe. The certificate is issued by your country of citizenship or your last country of long-term residence. It must be no older than 3 months at the time of submission. An official German translation by a certified translator is required. For Ukrainians, the certificate can be generated online through Diia. QLIXA can help with translation through our partners.",
    orderLinkText: '📅 Order the Austrian certificate — bmi.gv.at ↗',
    translationBoxTitle: '🔄 Need a translation of your Diia certificate?',
    translationBoxText: 'Leave a request — our partners will contact you.',
    formFirstName: 'First name (in Latin letters)', formLastName: 'Last name (in Latin letters)', formEmail: 'Email for contact',
    formUpload: '📎 Upload your Diia file (PDF or JPG)', formSubmit: 'Submit request →',
    step3H2: 'Get your Austria ID',
    step3P: 'Austria ID is your digital signature for accessing government services (GISA, FinanzOnline, SVS). Online registration is impossible without it.',
    step3NoteWarning: 'For non-Austrian citizens, getting an Austria ID online may not be possible — it depends on the state (Bundesland). Be prepared for an in-person visit.',
    step3AppointmentLink: '📅 Book an appointment — bmi.gv.at',
    step3ArticleTitle: 'Read more → How to get an Austria ID: step-by-step guide', step3ArticleSub: 'Opens in a new window · Full instructions',
    step4H2: 'Register on the GISA website',
    step4P: 'GISA — Gewerbeinformationssystem Austria — the official portal for registering a Gewerbe.',
    step4GisaLink: '🌐 Go to GISA — Online-Gewerbeanmeldung',
    step4NoteInfo: 'After registering, wait a few days — the data from GISA will be needed to fill out the FinanzOnline form.',
    step4ArticleTitle: 'Read more → How to fill out the GISA form', step4ArticleSub: 'Step-by-step guide explaining each field',
    step5H2: 'Register with SVS',
    step5P: 'SVS (Sozialversicherungsanstalt der Selbständigen) is social insurance for the self-employed. Log in via Austria ID.',
    step5NoteTip: 'You can add all your family members, and even close relatives, to SVS insurance.',
    step5ArticleTitle: 'Read more → How to fill out the SVS form', step5ArticleSub: 'What to specify to avoid overpaying and to add your family',
    step6H2: 'Register with FinanzOnline',
    step6P: "Log in via Austria ID. By this point you should have already received a letter from GISA, and you'll need to forecast your turnover — because SVS will start charging contributions right away.",
    step6TipBefore: "Don't know how much to pay SVS?", step6TipLink: 'SVS Beitragsrechner', step6TipAfter: " — and if you can't make sense of it, that's exactly why we built QLIXA 😉",
    step6NoteWarning: <>You definitely need a <strong>physical address</strong> to receive the letter from FinanzOnline — your login and password are sent there.</>,
    step6NoteInfo: <>You can only add <strong>one activity code (ÖNACE)</strong> at registration. To add more, write a free-form letter and send it to your Bezirkshauptmannschaft&apos;s email.</>,
    step7H2: 'Set up your SEPA-Lastschriftmandat',
    step7P: <>In your FinanzOnline account, search for <strong>&quot;SEPA-Lastschriftmandat&quot;</strong> and fill out the form to enable automatic payment of SVS and other charges from your account.</>,
    step8H2: 'Choose your MVK pension fund',
    step8P: <>Within <strong>6 months</strong> of registering, choose a Mitarbeitervorsorgekasse (MVK) — § 6 BMSVG. This is 1.53% of your income each month — your pension savings account.</>,
    step8ArticleTitle: 'Read more → How to choose an MVK pension fund', step8ArticleSub: 'What MVK is and how not to miss the 6-month deadline',
    step9H2: 'Register with your local WKO',
    step9P: <>WKO (Wirtschaftskammer Österreich) is the chamber of commerce. Your local branch may offer <strong>free consultations</strong>, webinars, and meetups.</>,
    step9Link: '🏢 WKO — registration information',
    ctaH2: 'Now — start earning! 🚀',
    ctaP: <>And QLIXA will take care of organizing the numbers. Invoices, clients, inventory, contribution and tax forecasts, reports, and other digital tools — all in one place, in plain language, without unnecessary bureaucracy.</>,
    ctaLinkText: 'QLIXA — your digital business assistant in Austria.',
    ctaTagline: 'Reports in one click — and peace of mind.',
    sourcesLabel: 'Official sources',
  },
  DE: {
    tag1: 'Geschäftsregistrierung', tag2: '9 Schritte', tag3: 'Kompletter Leitfaden',
    titleLine1: 'Gewerbeanmeldung in Österreich:', titleEm: 'Schritt-für-Schritt-Registrierung der Selbstständigkeit',
    metaTime: '🕐 15 Min. Lesezeit', metaFree: '🆓 Freies Gewerbe — 0 €', metaForeigners: '🇺🇦 Für Ausländer',
    toc: [
      ['#step1', 'Tätigkeitsart'], ['#step2', 'Dokumente'], ['#step3', 'Austria ID'],
      ['#step4', 'GISA-Anmeldung'], ['#step5', 'SVS-Anmeldung'], ['#step6', 'FinanzOnline'],
      ['#step7', 'SEPA'], ['#step8', 'MVK-Pensionskasse'], ['#step9', 'WKO'],
    ],
    disclaimer: 'Dieses Material basiert auf öffentlich zugänglichen offiziellen Quellen und den Erfahrungen von Menschen, die diesen Prozess durchlaufen haben. QLIXA ist keine Rechtsberatung und bietet keine individuelle Beratung. Anforderungen und Verfahren können sich ändern — überprüfe immer die aktuellen Informationen auf den offiziellen Websites von WKO und GISA.',
    introP: 'Ukrainer, Rumänen, Serben und andere Ausländer in Österreich verstehen oft nicht: welche Form passt, ob eine Lizenz nötig ist, wohin man gehen muss, welche Dokumente man mitbringen muss, wie viel es kostet und was mit den Steuern passiert. In diesem Leitfaden geht es um die Online-Registrierung Schritt für Schritt.',
    submissionLabel: 'Art der Antragstellung:', submissionText: 'online oder persönlich. Dieser Leitfaden behandelt online. Für offline — ',
    offlineLinkText: 'vereinbare einen Termin bei der WKO', offlineAfter: ' — dort wird kostenlos beraten.',
    step1H2: 'Die Tätigkeitsart bestimmen', step1P: 'Zuerst musst du verstehen, welche Tätigkeit du hast:',
    step1Cards: [
      { title: 'Freies Gewerbe', sub: 'Freie Tätigkeit ohne Lizenz', desc: 'Die meisten IT-, Design-, Beratungs-, Foto- und Übersetzungstätigkeiten. Die Anmeldung ist seit 2017 kostenlos.', featured: true },
      { title: 'Reglementiertes Gewerbe', sub: 'Befähigungsnachweis erforderlich', desc: 'Ärzte, Architekten, Elektriker usw. Die Qualifikation muss nachgewiesen werden.', featured: false },
    ],
    costLabel: 'Registrierungskosten (§ 13 GewO, GebG):',
    costHeaders: ['Form / Unternehmenstyp', 'Kosten', 'Anmerkung'],
    costRows: [
      { type: 'Einzelunternehmen — freies Gewerbe', cost: '0 €', free: true, note: 'Kostenlos seit 2017' },
      { type: 'Einzelunternehmen — reglementiert', cost: '~14–100 €', free: false, note: 'Abhängig von der Tätigkeitsart' },
      { type: 'GmbH (Notar + Firmenbuch)', cost: '~2.000–4.000 €', free: false, note: '+ Mindestkapital 35.000 €' },
      { type: 'FlexCo (Notar + Firmenbuch)', cost: '~1.200–2.500 €', free: false, note: '+ Mindestkapital 10.000 €' },
    ],
    step1Link1: '📋 Liste der ÖNACE-Codes (ÖNACE 2008)', step1Link2: '🔍 Prüfung in GISA',
    step2H2: 'Dokumente frühzeitig vorbereiten', step2P: 'Diese Dokumente werden in verschiedenen Phasen benötigt — bereite gleich alle vor:',
    step2Docs: ['Scan des Reisepasses (Auslandsreisepass)', 'Meldezettel — Bestätigung der Meldung in Österreich', 'Ausweis — Personalausweis', 'Ein gültiges österreichisches Bankkonto', 'Strafregisterauszug'],
    step2NoteInfo: <> <strong>Bankkonto:</strong> Für Einzelunternehmen ist ein separates Konto nicht verpflichtend, aber empfohlen. Für GmbH / FlexCo — verpflichtend.</>,
    step2NoteWarning: 'Wenn du weniger als 5 Jahre in Österreich lebst, wird bei der Gewerbeanmeldung fast immer ein Strafregisterauszug verlangt. Der Auszug wird vom Land deiner Staatsbürgerschaft oder deinem letzten Land des langfristigen Aufenthalts ausgestellt. Er darf zum Zeitpunkt der Einreichung nicht älter als 3 Monate sein. Eine offizielle deutsche Übersetzung durch einen beeidigten Übersetzer ist erforderlich. Für Ukrainer kann der Auszug online über Diia generiert werden. QLIXA kann bei der Übersetzung über unsere Partner helfen.',
    orderLinkText: '📅 Österreichischen Auszug bestellen — bmi.gv.at ↗',
    translationBoxTitle: '🔄 Brauchst du eine Übersetzung deines Diia-Auszugs?',
    translationBoxText: 'Hinterlasse eine Anfrage — unsere Partner melden sich bei dir.',
    formFirstName: 'Vorname (in lateinischer Schrift)', formLastName: 'Nachname (in lateinischer Schrift)', formEmail: 'E-Mail für Kontakt',
    formUpload: '📎 Diia-Datei hochladen (PDF oder JPG)', formSubmit: 'Anfrage senden →',
    step3H2: 'Austria ID beantragen',
    step3P: 'Die Austria ID ist deine digitale Signatur für den Zugang zu staatlichen Diensten (GISA, FinanzOnline, SVS). Ohne sie ist eine Online-Anmeldung nicht möglich.',
    step3NoteWarning: 'Für Nicht-Österreicher:innen kann die Austria ID online möglicherweise nicht funktionieren — abhängig vom Bundesland. Sei auf einen persönlichen Besuch vorbereitet.',
    step3AppointmentLink: '📅 Termin vereinbaren — bmi.gv.at',
    step3ArticleTitle: 'Mehr lesen → Austria ID beantragen: Schritt-für-Schritt-Anleitung', step3ArticleSub: 'Öffnet sich in einem neuen Fenster · Vollständige Anleitung',
    step4H2: 'Registrierung auf der GISA-Website',
    step4P: 'GISA — Gewerbeinformationssystem Austria — das offizielle Portal für die Gewerbeanmeldung.',
    step4GisaLink: '🌐 Zu GISA — Online-Gewerbeanmeldung',
    step4NoteInfo: 'Warte nach der Anmeldung ein paar Tage — die Daten von GISA werden benötigt, um das Formular bei FinanzOnline auszufüllen.',
    step4ArticleTitle: 'Mehr lesen → Wie man das GISA-Formular ausfüllt', step4ArticleSub: 'Schritt-für-Schritt-Anleitung mit Erklärung jedes Feldes',
    step5H2: 'Anmeldung bei der SVS',
    step5P: 'SVS (Sozialversicherungsanstalt der Selbständigen) — Sozialversicherung für Selbstständige. Anmeldung über Austria ID.',
    step5NoteTip: 'Du kannst alle Familienmitglieder und sogar nahe Verwandte in die SVS-Versicherung aufnehmen.',
    step5ArticleTitle: 'Mehr lesen → Wie man das SVS-Formular ausfüllt', step5ArticleSub: 'Was anzugeben ist, um nicht zu viel zu zahlen und die Familie mitzuversichern',
    step6H2: 'Registrierung bei FinanzOnline',
    step6P: 'Anmeldung über Austria ID. Zu diesem Zeitpunkt solltest du bereits einen Brief von GISA erhalten haben, und du musst deinen Umsatz prognostizieren — denn SVS beginnt sofort mit der Beitragsberechnung.',
    step6TipBefore: 'Weißt du nicht, wie viel SVS zu zahlen ist?', step6TipLink: 'SVS Beitragsrechner', step6TipAfter: ' — und wenn du dort nichts verstehst, genau deshalb haben wir QLIXA entwickelt 😉',
    step6NoteWarning: <>Du brauchst unbedingt eine <strong>physische Adresse</strong>, um den Brief von FinanzOnline zu erhalten — dorthin kommen Logins und Passwörter.</>,
    step6NoteInfo: <>Bei der Anmeldung kann nur <strong>ein ÖNACE-Code</strong> hinzugefügt werden. Um weitere hinzuzufügen, schreibe einen formlosen Brief und sende ihn an die E-Mail deiner Bezirkshauptmannschaft.</>,
    step7H2: 'SEPA-Lastschriftmandat einrichten',
    step7P: <>Suche im FinanzOnline-Konto nach <strong>&#8222;SEPA-Lastschriftmandat&#8220;</strong> und fülle das Formular aus, um SVS und andere Zahlungen automatisch von deinem Konto abbuchen zu lassen.</>,
    step8H2: 'Wahl der MVK-Pensionskasse',
    step8P: <>Wähle innerhalb von <strong>6 Monaten</strong> nach der Anmeldung eine Mitarbeitervorsorgekasse (MVK) — § 6 BMSVG. Das sind 1,53% deines Einkommens monatlich — dein Pensionsvorsorgekonto.</>,
    step8ArticleTitle: 'Mehr lesen → Wie man eine MVK-Pensionskasse wählt', step8ArticleSub: 'Was MVK ist und wie du die 6-Monats-Frist nicht verpasst',
    step9H2: 'Bei der WKO deines Bezirks registrieren',
    step9P: <>WKO (Wirtschaftskammer Österreich) — die Wirtschaftskammer. In deiner Bezirksstelle gibt es möglicherweise <strong>kostenlose Beratungen</strong>, Webinare und Treffen.</>,
    step9Link: '🏢 WKO — Informationen zur Anmeldung',
    ctaH2: 'Und jetzt — fang an zu verdienen! 🚀',
    ctaP: <>Um die Organisation der Zahlen kümmert sich QLIXA. Rechnungen, Kunden, Lager, Prognosen für Beiträge und Steuern, Berichte und andere digitale Tools — alles an einem Ort, in klarer Sprache und ohne unnötige Bürokratie.</>,
    ctaLinkText: 'QLIXA — dein digitaler Business-Assistent in Österreich.',
    ctaTagline: 'Reports in one click — und Ruhe im Kopf.',
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
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 10 }}>{t.costLabel}</p>
            <CostTable headers={t.costHeaders} rows={t.costRows} />
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
            <div style={{ marginTop: 20, padding: 18, borderRadius: 12, border: '2px dashed #038390', background: 'var(--peach-light)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#038390', marginBottom: 4 }}>{t.translationBoxTitle}</div>
              <p style={{ fontSize: 13, color: 'var(--charcoal)', marginBottom: 14, lineHeight: 1.6 }}>
                {t.translationBoxText}
              </p>
              <TranslationForm t={t} />
            </div>
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
              <Link href="/pricing" style={{
                padding: '14px 28px', borderRadius: 999, fontSize: 14, fontWeight: 700,
                background: 'transparent', color: 'var(--charcoal)', border: '2px solid var(--charcoal)',
                textDecoration: 'none', display: 'inline-block',
              }}>
                {t.ctaLinkText}
              </Link>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, marginTop: 16 }}>
              {t.ctaTagline}
            </p>
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
            { label: 'BMWET — Gewerbeanmeldung', href: 'https://www.bmwet.gv.at/Themen/Unternehmen/Gewerbe/Gewerbeanmeldung.html' },
            { label: 'SVS — Beitragsrechner', href: 'https://www.svs.at/sva-beitrag/?contentid=10007.906048&portal=svsportal' },
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
