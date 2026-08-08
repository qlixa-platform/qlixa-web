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

function NumberedList({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 12px', borderRadius: 8, background: 'var(--gray)', marginBottom: 6 }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: dark ? 'var(--charcoal)' : 'var(--peach-light)', color: dark ? '#fff' : '#038390', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: dark ? 1 : 0 }}>{i + 1}</div>
          <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
    </>
  )
}

// Переклади статті "Austria ID" — UA + RU (EN/DE додамо наступними кроками)
const AID_TEXT: Record<string, any> = {
  UA: {
    tag1: 'Австрія · Документи', tag2: '5 кроків', tag3: 'Для іноземців',
    titleLine1: 'Як оформити Austria ID:', titleEm: 'покроковий гайд для іноземців',
    metaTime: '🕐 8 хв читання', metaSteps: '📱 5 кроків', metaForeigners: '🇺🇦 Для іноземців',
    toc: [
      ['#what', 'Що таке Austria ID'], ['#why', 'Навіщо іноземцю'], ['#nongradients', 'Для не-громадян'],
      ['#steps', 'Покрокова інструкція'], ['#next', 'Що далі'],
    ],
    backLink: '← Всі статті',
    disclaimer: 'Цей матеріал підготовлено на основі публічно доступних офіційних джерел та досвіду людей, які пройшли цей процес. QLIXA не є юридичним агентством і не надає індивідуальних консультацій. Процедура оформлення може відрізнятися залежно від вашого відділення поліції — завжди перевіряйте актуальну інформацію на офіційних сайтах Австрії.',
    whatH2Before: 'Що таке Austria ID і навіщо вона ', whatH2Em: 'потрібна?',
    idAustriaDesc: 'Цифровий паспорт в Австрії',
    whatP1: 'Austria ID (офіційна назва — ID Austria) — це ваш цифровий паспорт в Австрії. Простими словами — це електронне посвідчення особи, яке дозволяє підтверджувати вашу особистість онлайн і користуватися державними та приватними сервісами прямо зі смартфона.',
    whatP2: 'Раніше в Австрії для онлайн-підписів використовувалась Handy-Signatur. Austria ID — це її оновлена і розширена версія, яка замінила стару систему.',
    whyH2Before: 'Навіщо вона потрібна ', whyH2Em: 'іноземцю?',
    whyP: <>Без Austria ID ви не зможете зареєструватися на багатьох держплатформах. Зокрема, вона обов&apos;язкова для:</>,
    whyItems: [
      { icon: '🏢', text: 'Реєстрації бізнесу на GISA (Gewerbeanmeldung)' },
      { icon: '💼', text: 'Роботи з FinanzOnline — податковим кабінетом' },
      { icon: '🏥', text: 'Реєстрації в SVS — соціальне страхування для самозайнятих' },
      { icon: '✍️', text: 'Підписання документів онлайн — юридично дійсний електронний підпис' },
      { icon: '🌐', text: 'Доступу до oesterreich.gv.at і десятків інших держсервісів' },
    ],
    nonCitizensH2Before: 'Важливо для ', nonCitizensH2Em: 'не-громадян Австрії',
    warningBox: <>Якщо ви громадянин іншої країни — українець, румун, серб або будь-який інший іноземець з видом на проживання — онлайн-реєстрація Austria ID для вас може бути <strong>недоступна</strong>. Це залежить від вашої федеральної землі (Bundesland).<br /><br />Не засмучуйтесь — це нормальна ситуація. Просто будьте готові до того, що вам доведеться особисто прийти до поліцейського управління. Процедура нескладна і займає близько <strong>20–30 хвилин</strong>.</>,
    rwrCaption: 'Rot-Weiß-Rot Karte Plus',
    stepsH2Before: 'Покрокова інструкція: як ', stepsH2Em: 'оформити Austria ID',
    steps: [
      { title: 'Завантажте застосунок Austria ID заздалегідь', body: <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>Перед візитом до відділку встановіть застосунок <strong>ID Austria</strong> на свій смартфон. Він доступний для iOS та Android. Це важливо зробити заздалегідь — застосунок знадобиться прямо на місці під час реєстрації.</p> },
      { title: 'Запишіться на термін до поліцейського управління', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Для не-громадян реєстрація Austria ID відбувається особисто в провінційному поліцейському управлінні (Landespolizeidirektion) вашої землі.</p>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}><ExtLink href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung">📅 Записатися на термін — citizen.bmi.gv.at</ExtLink></p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6 }}>Як записатися:</p>
          <NumberedList dark items={['Оберіть вашу федеральну землю', 'У пошуку вкажіть: ID Austria – Registration', 'Оберіть зручну дату і час']} />
          <NoteBox type="warning">Термін можна записати лише на <strong>одну особу</strong>. Якщо плануєте оформити Austria ID на всю сім&apos;ю — кожен член сім&apos;ї записується і приходить окремо.</NoteBox>
        </> },
      { title: 'Підготуйте документи', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Після запису вам прийде лист зі списком. Стандартний набір:</p>
          <NumberedList items={['Діючий паспорт (оригінал)', 'Meldezettel — реєстрація за місцем проживання в Австрії', 'Вид на проживання або документ, що підтверджує ваш статус', 'Смартфон із встановленим застосунком ID Austria', 'Австрійський номер телефону — обов’язковий для SMS-коду']} />
        </> },
      { title: 'Прийдіть до відділку у призначений час', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Співробітник перевірить ваші документи та активує Austria ID прямо на вашому смартфоні. Весь процес займає близько <strong>20–30 хвилин</strong>.</p>
          <NoteBox type="tip">Ви отримаєте роздруківку з <strong>Freischaltcode</strong> і <strong>Widerrufs-Passwort</strong> — збережіть їх, вони знадобляться для завершення реєстрації вдома.</NoteBox>
        </> },
      { title: 'Завершіть реєстрацію вдома', body: <>
          <NumberedList dark items={['Зайдіть на сайт: a-trust.at/id-austria-registrierung', 'Введіть отриманий Freischaltcode і Widerrufs-Passwort', 'Прив’яжіть застосунок ID Austria до вашого акаунту']} />
          <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--success-bg)', border: '1px solid var(--success)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)' }}>Готово — Austria ID активована і готова до використання!</span>
          </div>
        </> },
    ],
    nextH2Before: 'Що робити ', nextH2Em: 'далі?',
    nextP: 'Після того як Austria ID оформлена — ви готові до наступних кроків реєстрації бізнесу:',
    nextItems: [
      { icon: '🏢', text: 'Зареєструвати Gewerbe на GISA' },
      { icon: '💰', text: 'Увійти до FinanzOnline і налаштувати податковий кабінет' },
      { icon: '🏥', text: 'Зареєструватися в SVS — страхування для самозайнятих' },
    ],
    nextArticleTitle: 'Читайте детально → Gewerbeanmeldung в Австрії: покрокова реєстрація',
    nextArticleSub: 'Повний гайд по реєстрації самозайнятості',
    sourcesLabel: 'Джерела',
    sources: [
      { label: 'Офіційний сайт ID Austria: id-austria.gv.at', href: 'https://www.id-austria.gv.at' },
      { label: 'Портал держпослуг Австрії: oesterreich.gv.at', href: 'https://www.oesterreich.gv.at' },
      { label: 'Запис на термін: citizen.bmi.gv.at', href: 'https://citizen.bmi.gv.at' },
    ],
    footerNote: 'Цей матеріал має інформаційний характер і ґрунтується на особистому досвіді команди QLIXA. Актуальність інформації рекомендуємо перевіряти на офіційних державних сайтах.',
  },
  RU: {
    tag1: 'Австрия · Документы', tag2: '5 шагов', tag3: 'Для иностранцев',
    titleLine1: 'Как оформить Austria ID:', titleEm: 'пошаговый гайд для иностранцев',
    metaTime: '🕐 8 мин чтения', metaSteps: '📱 5 шагов', metaForeigners: '🇺🇦 Для иностранцев',
    toc: [
      ['#what', 'Что такое Austria ID'], ['#why', 'Зачем иностранцу'], ['#nongradients', 'Для неграждан'],
      ['#steps', 'Пошаговая инструкция'], ['#next', 'Что дальше'],
    ],
    backLink: '← Все статьи',
    disclaimer: 'Этот материал подготовлен на основе публично доступных официальных источников и опыта людей, которые прошли этот процесс. QLIXA не является юридическим агентством и не предоставляет индивидуальных консультаций. Процедура оформления может отличаться в зависимости от вашего отделения полиции — всегда проверяйте актуальную информацию на официальных сайтах Австрии.',
    whatH2Before: 'Что такое Austria ID и зачем она ', whatH2Em: 'нужна?',
    idAustriaDesc: 'Цифровой паспорт в Австрии',
    whatP1: 'Austria ID (официальное название — ID Austria) — это ваш цифровой паспорт в Австрии. Простыми словами — это электронное удостоверение личности, которое позволяет подтверждать вашу личность онлайн и пользоваться государственными и частными сервисами прямо со смартфона.',
    whatP2: 'Раньше в Австрии для онлайн-подписей использовалась Handy-Signatur. Austria ID — это её обновлённая и расширенная версия, которая заменила старую систему.',
    whyH2Before: 'Зачем она нужна ', whyH2Em: 'иностранцу?',
    whyP: <>Без Austria ID вы не сможете зарегистрироваться на многих госплатформах. В частности, она обязательна для:</>,
    whyItems: [
      { icon: '🏢', text: 'Регистрации бизнеса на GISA (Gewerbeanmeldung)' },
      { icon: '💼', text: 'Работы с FinanzOnline — налоговым кабинетом' },
      { icon: '🏥', text: 'Регистрации в SVS — социальное страхование для самозанятых' },
      { icon: '✍️', text: 'Подписания документов онлайн — юридически действительная электронная подпись' },
      { icon: '🌐', text: 'Доступа к oesterreich.gv.at и десяткам других госсервисов' },
    ],
    nonCitizensH2Before: 'Важно для ', nonCitizensH2Em: 'неграждан Австрии',
    warningBox: <>Если вы гражданин другой страны — украинец, румын, серб или любой другой иностранец с видом на жительство — онлайн-регистрация Austria ID для вас может быть <strong>недоступна</strong>. Это зависит от вашей федеральной земли (Bundesland).<br /><br />Не расстраивайтесь — это нормальная ситуация. Просто будьте готовы к тому, что вам придётся лично прийти в полицейское управление. Процедура несложная и занимает около <strong>20–30 минут</strong>.</>,
    rwrCaption: 'Rot-Weiß-Rot Karte Plus',
    stepsH2Before: 'Пошаговая инструкция: как ', stepsH2Em: 'оформить Austria ID',
    steps: [
      { title: 'Скачайте приложение Austria ID заранее', body: <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>Перед визитом в отделение установите приложение <strong>ID Austria</strong> на свой смартфон. Оно доступно для iOS и Android. Это важно сделать заранее — приложение понадобится прямо на месте во время регистрации.</p> },
      { title: 'Запишитесь на приём в полицейское управление', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Для неграждан регистрация Austria ID происходит лично в провинциальном полицейском управлении (Landespolizeidirektion) вашей земли.</p>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}><ExtLink href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung">📅 Записаться на приём — citizen.bmi.gv.at</ExtLink></p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6 }}>Как записаться:</p>
          <NumberedList dark items={['Выберите вашу федеральную землю', 'В поиске укажите: ID Austria – Registration', 'Выберите удобную дату и время']} />
          <NoteBox type="warning">Приём можно записать только на <strong>одного человека</strong>. Если планируете оформить Austria ID на всю семью — каждый член семьи записывается и приходит отдельно.</NoteBox>
        </> },
      { title: 'Подготовьте документы', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>После записи вам придёт письмо со списком. Стандартный набор:</p>
          <NumberedList items={['Действующий паспорт (оригинал)', 'Meldezettel — регистрация по месту жительства в Австрии', 'Вид на жительство или документ, подтверждающий ваш статус', 'Смартфон с установленным приложением ID Austria', 'Австрийский номер телефона — обязателен для SMS-кода']} />
        </> },
      { title: 'Придите в отделение в назначенное время', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Сотрудник проверит ваши документы и активирует Austria ID прямо на вашем смартфоне. Весь процесс занимает около <strong>20–30 минут</strong>.</p>
          <NoteBox type="tip">Вы получите распечатку с <strong>Freischaltcode</strong> и <strong>Widerrufs-Passwort</strong> — сохраните их, они понадобятся для завершения регистрации дома.</NoteBox>
        </> },
      { title: 'Завершите регистрацию дома', body: <>
          <NumberedList dark items={['Зайдите на сайт: a-trust.at/id-austria-registrierung', 'Введите полученный Freischaltcode и Widerrufs-Passwort', 'Привяжите приложение ID Austria к вашему аккаунту']} />
          <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--success-bg)', border: '1px solid var(--success)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)' }}>Готово — Austria ID активирована и готова к использованию!</span>
          </div>
        </> },
    ],
    nextH2Before: 'Что делать ', nextH2Em: 'дальше?',
    nextP: 'После того как Austria ID оформлена — вы готовы к следующим шагам регистрации бизнеса:',
    nextItems: [
      { icon: '🏢', text: 'Зарегистрировать Gewerbe на GISA' },
      { icon: '💰', text: 'Войти в FinanzOnline и настроить налоговый кабинет' },
      { icon: '🏥', text: 'Зарегистрироваться в SVS — страхование для самозанятых' },
    ],
    nextArticleTitle: 'Читайте подробно → Gewerbeanmeldung в Австрии: пошаговая регистрация',
    nextArticleSub: 'Полный гайд по регистрации самозанятости',
    sourcesLabel: 'Источники',
    sources: [
      { label: 'Официальный сайт ID Austria: id-austria.gv.at', href: 'https://www.id-austria.gv.at' },
      { label: 'Портал госуслуг Австрии: oesterreich.gv.at', href: 'https://www.oesterreich.gv.at' },
      { label: 'Запись на приём: citizen.bmi.gv.at', href: 'https://citizen.bmi.gv.at' },
    ],
    footerNote: 'Этот материал носит информационный характер и основан на личном опыте команды QLIXA. Актуальность информации рекомендуем проверять на официальных государственных сайтах.',
  },
  EN: {
    tag1: 'Austria · Documents', tag2: '5 Steps', tag3: 'For Foreigners',
    titleLine1: 'How to Get an Austria ID:', titleEm: 'step-by-step guide for foreigners',
    metaTime: '🕐 8 min read', metaSteps: '📱 5 steps', metaForeigners: '🇺🇦 For foreigners',
    toc: [
      ['#what', 'What is Austria ID'], ['#why', 'Why foreigners need it'], ['#nongradients', 'For Non-Citizens'],
      ['#steps', 'Step-by-Step Instructions'], ['#next', "What's Next"],
    ],
    backLink: '← All Articles',
    disclaimer: 'This material is based on publicly available official sources and the experience of people who have gone through this process. QLIXA is not a legal agency and does not provide individual consultations. The registration procedure may vary depending on your police station — always check the current information on official Austrian websites.',
    whatH2Before: 'What is Austria ID and why is it ', whatH2Em: 'needed?',
    idAustriaDesc: 'Digital ID in Austria',
    whatP1: "Austria ID (official name — ID Austria) is your digital identity card in Austria. In simple terms, it's an electronic identification that lets you verify your identity online and use government and private services right from your smartphone.",
    whatP2: 'Previously, Austria used Handy-Signatur for online signatures. Austria ID is its updated, expanded version that replaced the old system.',
    whyH2Before: 'Why do foreigners ', whyH2Em: 'need it?',
    whyP: <>Without Austria ID, you won&apos;t be able to register on many government platforms. In particular, it&apos;s mandatory for:</>,
    whyItems: [
      { icon: '🏢', text: 'Registering a business on GISA (Gewerbeanmeldung)' },
      { icon: '💼', text: 'Working with FinanzOnline — the tax portal' },
      { icon: '🏥', text: 'Registering with SVS — social insurance for the self-employed' },
      { icon: '✍️', text: 'Signing documents online — a legally valid electronic signature' },
      { icon: '🌐', text: 'Accessing oesterreich.gv.at and dozens of other government services' },
    ],
    nonCitizensH2Before: 'Important for ', nonCitizensH2Em: 'non-Austrian citizens',
    warningBox: <>If you&apos;re a citizen of another country — Ukrainian, Romanian, Serbian, or any other foreigner with a residence permit — online registration for Austria ID may be <strong>unavailable</strong> to you. This depends on your federal state (Bundesland).<br /><br />Don&apos;t worry — this is a normal situation. Just be prepared to visit the police station in person. The procedure is simple and takes about <strong>20–30 minutes</strong>.</>,
    rwrCaption: 'Rot-Weiß-Rot Karte Plus',
    stepsH2Before: 'Step-by-Step Instructions: How to ', stepsH2Em: 'Get an Austria ID',
    steps: [
      { title: 'Download the Austria ID app in advance', body: <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>Before your visit to the police station, install the <strong>ID Austria</strong> app on your smartphone. It&apos;s available for iOS and Android. Doing this in advance is important — you&apos;ll need the app right there during registration.</p> },
      { title: 'Book an appointment at the police station', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>For non-citizens, Austria ID registration takes place in person at the provincial police headquarters (Landespolizeidirektion) of your state.</p>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}><ExtLink href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung">📅 Book an appointment — citizen.bmi.gv.at</ExtLink></p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6 }}>How to book:</p>
          <NumberedList dark items={['Select your federal state', 'In the search, enter: ID Austria – Registration', 'Choose a convenient date and time']} />
          <NoteBox type="warning">An appointment can only be booked for <strong>one person</strong>. If you plan to get Austria ID for your whole family — each family member books and attends separately.</NoteBox>
        </> },
      { title: 'Prepare your documents', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>After booking, you&apos;ll receive a letter with the list. Standard set:</p>
          <NumberedList items={['Valid passport (original)', 'Meldezettel — proof of registration in Austria', 'Residence permit or document confirming your status', 'A smartphone with the ID Austria app installed', 'An Austrian phone number — required for the SMS code']} />
        </> },
      { title: 'Come to the office at your scheduled time', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>A staff member will check your documents and activate Austria ID right on your smartphone. The whole process takes about <strong>20–30 minutes</strong>.</p>
          <NoteBox type="tip">You&apos;ll receive a printout with your <strong>Freischaltcode</strong> and <strong>Widerrufs-Passwort</strong> — save them, you&apos;ll need them to complete registration at home.</NoteBox>
        </> },
      { title: 'Complete registration at home', body: <>
          <NumberedList dark items={['Go to: a-trust.at/id-austria-registrierung', 'Enter the Freischaltcode and Widerrufs-Passwort you received', 'Link the ID Austria app to your account']} />
          <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--success-bg)', border: '1px solid var(--success)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)' }}>Done — Austria ID is activated and ready to use!</span>
          </div>
        </> },
    ],
    nextH2Before: 'What to do ', nextH2Em: 'next?',
    nextP: "Once Austria ID is set up, you're ready for the next steps of registering your business:",
    nextItems: [
      { icon: '🏢', text: 'Register a Gewerbe on GISA' },
      { icon: '💰', text: 'Log in to FinanzOnline and set up your tax portal' },
      { icon: '🏥', text: 'Register with SVS — insurance for the self-employed' },
    ],
    nextArticleTitle: 'Read more → Gewerbeanmeldung in Austria: step-by-step registration',
    nextArticleSub: 'Complete guide to self-employment registration',
    sourcesLabel: 'Sources',
    sources: [
      { label: 'Official ID Austria website: id-austria.gv.at', href: 'https://www.id-austria.gv.at' },
      { label: "Austria's government services portal: oesterreich.gv.at", href: 'https://www.oesterreich.gv.at' },
      { label: 'Book an appointment: citizen.bmi.gv.at', href: 'https://citizen.bmi.gv.at' },
    ],
    footerNote: 'This material is for informational purposes and is based on the personal experience of the QLIXA team. We recommend checking the current information on official government websites.',
  },
  DE: {
    tag1: 'Österreich · Dokumente', tag2: '5 Schritte', tag3: 'Für Ausländer',
    titleLine1: 'Austria ID beantragen:', titleEm: 'Schritt-für-Schritt-Anleitung für Ausländer',
    metaTime: '🕐 8 Min. Lesezeit', metaSteps: '📱 5 Schritte', metaForeigners: '🇺🇦 Für Ausländer',
    toc: [
      ['#what', 'Was ist Austria ID'], ['#why', 'Warum Ausländer sie brauchen'], ['#nongradients', 'Für Nicht-Staatsbürger'],
      ['#steps', 'Schritt-für-Schritt-Anleitung'], ['#next', 'Was als Nächstes'],
    ],
    backLink: '← Alle Artikel',
    disclaimer: 'Dieses Material basiert auf öffentlich zugänglichen offiziellen Quellen und den Erfahrungen von Menschen, die diesen Prozess durchlaufen haben. QLIXA ist keine Rechtsberatung und bietet keine individuelle Beratung. Das Anmeldeverfahren kann je nach Polizeidienststelle variieren — überprüfe immer die aktuellen Informationen auf den offiziellen österreichischen Websites.',
    whatH2Before: 'Was ist Austria ID und wozu wird sie ', whatH2Em: 'gebraucht?',
    idAustriaDesc: 'Digitaler Ausweis in Österreich',
    whatP1: 'Austria ID (offizieller Name — ID Austria) ist dein digitaler Ausweis in Österreich. Einfach gesagt — es ist ein elektronischer Identitätsnachweis, mit dem du deine Identität online bestätigen und staatliche sowie private Dienste direkt über dein Smartphone nutzen kannst.',
    whatP2: 'Früher wurde in Österreich für Online-Signaturen die Handy-Signatur verwendet. Austria ID ist ihre aktualisierte und erweiterte Version, die das alte System ersetzt hat.',
    whyH2Before: 'Wozu brauchen sie ', whyH2Em: 'Ausländer?',
    whyP: <>Ohne Austria ID kannst du dich auf vielen staatlichen Plattformen nicht registrieren. Sie ist insbesondere erforderlich für:</>,
    whyItems: [
      { icon: '🏢', text: 'Gewerbeanmeldung auf GISA' },
      { icon: '💼', text: 'Arbeit mit FinanzOnline — dem Steuerportal' },
      { icon: '🏥', text: 'Anmeldung bei der SVS — Sozialversicherung für Selbstständige' },
      { icon: '✍️', text: 'Online-Unterschrift von Dokumenten — rechtsgültige elektronische Signatur' },
      { icon: '🌐', text: 'Zugang zu oesterreich.gv.at und Dutzenden weiteren staatlichen Diensten' },
    ],
    nonCitizensH2Before: 'Wichtig für ', nonCitizensH2Em: 'Nicht-Österreicher:innen',
    warningBox: <>Wenn du Staatsbürger:in eines anderen Landes bist — Ukrainer:in, Rumän:in, Serb:in oder eine:e andere:r Ausländer:in mit Aufenthaltstitel — kann die Online-Registrierung für Austria ID für dich <strong>nicht verfügbar</strong> sein. Das hängt von deinem Bundesland ab.<br /><br />Mach dir keine Sorgen — das ist eine normale Situation. Sei einfach darauf vorbereitet, persönlich zur Polizeidienststelle zu gehen. Das Verfahren ist unkompliziert und dauert etwa <strong>20–30 Minuten</strong>.</>,
    rwrCaption: 'Rot-Weiß-Rot Karte Plus',
    stepsH2Before: 'Schritt-für-Schritt-Anleitung: Wie du ', stepsH2Em: 'Austria ID beantragst',
    steps: [
      { title: 'Lade die Austria ID App im Voraus herunter', body: <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>Installiere vor deinem Besuch bei der Dienststelle die App <strong>ID Austria</strong> auf deinem Smartphone. Sie ist für iOS und Android verfügbar. Das solltest du unbedingt im Voraus erledigen — die App wird direkt vor Ort bei der Registrierung benötigt.</p> },
      { title: 'Vereinbare einen Termin bei der Polizeidienststelle', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Für Nicht-Staatsbürger:innen erfolgt die Austria ID-Registrierung persönlich bei der Landespolizeidirektion deines Bundeslandes.</p>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}><ExtLink href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung">📅 Termin vereinbaren — citizen.bmi.gv.at</ExtLink></p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6 }}>So vereinbarst du einen Termin:</p>
          <NumberedList dark items={['Wähle dein Bundesland', 'Gib in der Suche ein: ID Austria – Registration', 'Wähle ein passendes Datum und eine Uhrzeit']} />
          <NoteBox type="warning">Ein Termin kann nur für <strong>eine Person</strong> gebucht werden. Wenn du Austria ID für die ganze Familie beantragen möchtest, muss sich jedes Familienmitglied separat anmelden und erscheinen.</NoteBox>
        </> },
      { title: 'Bereite deine Dokumente vor', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Nach der Anmeldung erhältst du einen Brief mit der Liste. Standardset:</p>
          <NumberedList items={['Gültiger Reisepass (Original)', 'Meldezettel — Meldebestätigung in Österreich', 'Aufenthaltstitel oder Dokument zum Nachweis deines Status', 'Smartphone mit installierter App ID Austria', 'Österreichische Telefonnummer — erforderlich für den SMS-Code']} />
        </> },
      { title: 'Komm zur vereinbarten Zeit zur Dienststelle', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Ein:e Mitarbeiter:in prüft deine Dokumente und aktiviert Austria ID direkt auf deinem Smartphone. Der ganze Vorgang dauert etwa <strong>20–30 Minuten</strong>.</p>
          <NoteBox type="tip">Du erhältst einen Ausdruck mit deinem <strong>Freischaltcode</strong> und <strong>Widerrufs-Passwort</strong> — bewahre sie auf, du brauchst sie, um die Registrierung zu Hause abzuschließen.</NoteBox>
        </> },
      { title: 'Schließe die Registrierung zu Hause ab', body: <>
          <NumberedList dark items={['Gehe auf: a-trust.at/id-austria-registrierung', 'Gib den erhaltenen Freischaltcode und das Widerrufs-Passwort ein', 'Verknüpfe die App ID Austria mit deinem Konto']} />
          <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--success-bg)', border: '1px solid var(--success)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)' }}>Fertig — Austria ID ist aktiviert und einsatzbereit!</span>
          </div>
        </> },
    ],
    nextH2Before: 'Was ist als ', nextH2Em: 'Nächstes zu tun?',
    nextP: 'Sobald Austria ID eingerichtet ist, bist du bereit für die nächsten Schritte der Unternehmensregistrierung:',
    nextItems: [
      { icon: '🏢', text: 'Gewerbe auf GISA anmelden' },
      { icon: '💰', text: 'Bei FinanzOnline anmelden und das Steuerkonto einrichten' },
      { icon: '🏥', text: 'Bei der SVS registrieren — Versicherung für Selbstständige' },
    ],
    nextArticleTitle: 'Mehr lesen → Gewerbeanmeldung in Österreich: Schritt-für-Schritt-Registrierung',
    nextArticleSub: 'Vollständiger Leitfaden zur Selbstständigkeitsregistrierung',
    sourcesLabel: 'Quellen',
    sources: [
      { label: 'Offizielle ID Austria Website: id-austria.gv.at', href: 'https://www.id-austria.gv.at' },
      { label: 'Österreichisches Serviceportal: oesterreich.gv.at', href: 'https://www.oesterreich.gv.at' },
      { label: 'Termin vereinbaren: citizen.bmi.gv.at', href: 'https://citizen.bmi.gv.at' },
    ],
    footerNote: 'Dieses Material dient nur zu Informationszwecken und basiert auf den persönlichen Erfahrungen des QLIXA-Teams. Wir empfehlen, die Aktualität der Informationen auf offiziellen staatlichen Websites zu überprüfen.',
  },
}

export default function AustriaIdPage() {
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

  const t = AID_TEXT[lang] || AID_TEXT.UA

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
                <span>{t.metaSteps}</span>
                <span>{t.metaForeigners}</span>
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

        {/* What is Austria ID */}
        <h2 id="what" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
          {t.whatH2Before}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.whatH2Em}</em>
        </h2>

        {/* ID Austria logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 12, padding: '14px 18px', border: '1px solid var(--line)', marginBottom: 16 }}>
          <Image src="/articles/id-austria-logo.svg" alt="ID Austria" width={120} height={32} style={{ objectFit: 'contain', height: 28, width: 'auto', background: 'transparent' }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--charcoal)' }}>ID Austria</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t.idAustriaDesc}</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 24 }}>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>
            {t.whatP1}
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)' }}>
            {t.whatP2}
          </p>
        </div>

        {/* For whom */}
        <h2 id="why" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
          {t.whyH2Before}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.whyH2Em}</em>
        </h2>
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: 'var(--charcoal)', marginBottom: 14 }}>{t.whyP}</p>
          {t.whyItems.map((item: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--gray)', borderRadius: 10, padding: '11px 14px', marginBottom: 8, border: '1px solid var(--line)' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Warning for non-citizens */}
        <h2 id="nongradients" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
          {t.nonCitizensH2Before}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.nonCitizensH2Em}</em>
        </h2>

        {/* RWR card small inline */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <NoteBox type="warning">{t.warningBox}</NoteBox>
          </div>
          <div style={{ flexShrink: 0 }}>
            <Image
              src="/articles/austria-rwr-card.jpg"
              alt="RWR Karte Plus Austria"
              width={160} height={100}
              style={{ borderRadius: 8, border: '1px solid var(--line)', objectFit: 'cover' }}
            />
            <p style={{ fontSize: 10, color: 'var(--text3)', textAlign: 'center', marginTop: 5, maxWidth: 160 }}>
              {t.rwrCaption}
            </p>
          </div>
        </div>

        {/* Steps */}
        <h2 id="steps" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: '32px 0 16px', scrollMarginTop: '80px' }}>
          {t.stepsH2Before}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.stepsH2Em}</em>
        </h2>
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 24 }}>
          {t.steps.map((step: any, i: number) => (
            <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: i < t.steps.length - 1 ? 20 : 0, marginBottom: i < t.steps.length - 1 ? 20 : 0, borderBottom: i < t.steps.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#038390', color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 10 }}>{step.title}</h3>
                {step.body}
              </div>
            </div>
          ))}
        </div>

        {/* What next */}
        <h2 id="next" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
          {t.nextH2Before}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.nextH2Em}</em>
        </h2>
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: 'var(--charcoal)', marginBottom: 14 }}>{t.nextP}</p>
          {t.nextItems.map((item: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--gray)', borderRadius: 10, padding: '11px 14px', marginBottom: 8, border: '1px solid var(--line)' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: 'var(--charcoal)' }}>{item.text}</span>
            </div>
          ))}
          <Link href="/articles/gewerbeanmeldung" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 18px', borderRadius: 12, border: '1.5px solid #038390', background: 'var(--peach-light)', textDecoration: 'none', marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>📖</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#038390' }}>{t.nextArticleTitle}</div>
                <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>{t.nextArticleSub}</div>
              </div>
            </div>
            <span style={{ fontSize: 18, color: '#038390', fontWeight: 700 }}>→</span>
          </Link>
        </div>

        {/* Sources */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 22 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>
            {t.sourcesLabel}
          </p>
          {t.sources.map((s: any) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: 13, color: '#038390', textDecoration: 'none', marginBottom: 6 }}>
              ↗ {s.label}
            </a>
          ))}
        </div>

        <div style={{ background: 'var(--gray)', borderRadius: 10, padding: '13px 16px', fontSize: 12, color: 'var(--text3)', lineHeight: 1.6, marginTop: 24, border: '1px solid var(--line)' }}>
          {t.footerNote}
        </div>

        {/* Prev / Next navigation */}
        <ArticlePrevNext currentSlug="austria-id" />

        </div>{/* end main content */}
      </div>{/* end flex wrapper */}
      <Footer />
    </div>
  )
}
