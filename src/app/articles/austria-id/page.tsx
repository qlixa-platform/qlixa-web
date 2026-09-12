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

// Переклади статті "ID Austria" — UA / RU / EN / DE
const AID_TEXT: Record<string, any> = {
  UA: {
    tag1: 'Австрія · Документи', tag2: '5 кроків', tag3: 'Для іноземців',
    titleLine1: 'Як оформити ID Austria:', titleEm: 'покроковий гайд для іноземців',
    metaTime: '🕐 8 хв читання', metaSteps: '📱 5 кроків', metaForeigners: '🇺🇦 Для іноземців',
    toc: [
      ['#what', 'Що таке ID Austria'], ['#why', 'Навіщо іноземцю'], ['#nongradients', 'Для не-громадян'],
      ['#steps', 'Покрокова інструкція'], ['#next', 'Що далі'],
    ],
    backLink: '← Всі статті',
    disclaimer: 'Матеріал має інформаційний характер і не є юридичною консультацією. Процедура, доступні місця реєстрації та технічні способи можуть змінюватися. Перед візитом перевір актуальну інформацію на офіційному сайті ID Austria та сторінці обраного органу.',
    whatH2Before: 'Що таке ID Austria і навіщо вона ', whatH2Em: 'потрібна?',
    idAustriaDesc: 'Електронне підтвердження особи в Австрії',
    whatP1: 'ID Austria — це електронний засіб ідентифікації, який дозволяє підтверджувати особу онлайн, входити до цифрових державних сервісів та підписувати документи електронно.',
    whatP2: 'Раніше в Австрії для цього використовувалась Handy-Signatur (і Bürgerkarte). ID Austria — це їхня оновлена версія, яка замінила ці старі системи.',
    whyH2Before: 'Навіщо вона потрібна ', whyH2Em: 'іноземцю?',
    whyP: <>ID Austria дає зручний доступ до багатьох цифрових державних сервісів. Її можна використовувати для електронної ідентифікації, входу до онлайн-сервісів та електронного підпису документів. Наприклад:</>,
    whyItems: [
      { icon: '💼', text: 'Роботи з FinanzOnline — податковим кабінетом' },
      { icon: '🏥', text: 'Входу до MeineSV — особистого кабінету соціального страхування' },
      { icon: '✍️', text: 'Підписання документів онлайн — юридично дійсний електронний підпис' },
      { icon: '🌐', text: 'Доступу до oesterreich.gv.at та інших цифрових державних сервісів' },
    ],
    nonCitizensH2Before: 'Важливо для ', nonCitizensH2Em: 'не-громадян Австрії',
    eligibilityP: 'ID Austria доступна не лише громадянам Австрії. Іноземці також можуть її зареєструвати, якщо мають достатній зв’язок з Австрією — наприклад, проживають, навчаються, працюють або ведуть діяльність в Австрії. Реєстрація можлива з 14 років.',
    warningBox: <>Якщо ти не громадянин Австрії, для реєстрації ID Austria потрібно підтвердити достатній зв&apos;язок з Австрією (Bezug zum Inland) — наприклад, Meldebestätigung, студентський квиток або підтвердження від роботодавця. Іноземні громадяни можуть пройти реєстрацію у <strong>Landespolizeidirektion</strong> (провінційному поліцейському управлінні) або у відповідному відділенні <strong>Finanzamt Österreich</strong>.<br /><br />Доступність конкретних термінів і відділень може відрізнятися залежно від регіону — актуальний перелік органів реєстрації дивись за посиланням нижче.</>,
    regAuthorityLinkText: '📍 Офіційний перелік органів реєстрації — oesterreich.gv.at',
    rwrCaption: 'Rot-Weiß-Rot Karte Plus',
    stepsH2Before: 'Покрокова інструкція: як ', stepsH2Em: 'оформити ID Austria',
    steps: [
      { title: 'Встанови застосунок ID Austria заздалегідь', body: <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>Якщо плануєш користуватися ID Austria зі смартфона, встанови актуальну версію застосунку <strong>ID Austria</strong> заздалегідь. Він доступний для iOS та Android і знадобиться прямо на місці під час реєстрації.</p> },
      { title: 'Запишіться на термін до органу реєстрації', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Іноземні громадяни можуть зареєструвати ID Austria особисто в <strong>Landespolizeidirektion</strong> (провінційному поліцейському управлінні) або у відповідному відділенні <strong>Finanzamt Österreich</strong> — за умови підтвердження достатнього зв&apos;язку з Австрією.</p>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}><ExtLink href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung">📅 Записатися на термін до Landespolizeidirektion — citizen.bmi.gv.at</ExtLink></p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6 }}>Загальний порядок запису:</p>
          <NumberedList dark items={['Обери зручний орган реєстрації у своїй федеральній землі', 'Знайди розділ запису на реєстрацію ID Austria', 'Обери дату й час, які тобі підходять']} />
          <NoteBox type="warning">За практичним досвідом, один запис зазвичай оформлюється на одну особу — якщо плануєш оформити ID Austria для кількох членів сім&apos;ї, уточни в обраному органі, чи потрібен окремий запис для кожного. Мінімальний вік для отримання ID Austria — 14 років.</NoteBox>
        </> },
      { title: 'Підготуйте документи', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Точний перелік може відрізнятися залежно від органу. Орієнтовний набір:</p>
          <NumberedList items={['Дійсний паспорт або інше офіційне фото-посвідчення особи', 'Актуальне паспортне фото — за потреби (може не знадобитися, якщо придатне фото вже є в австрійських системах)', 'Підтвердження достатнього зв’язку з Австрією — наприклад, Meldebestätigung, студентський квиток, підтвердження від роботодавця або інший рівнозначний документ', 'Смартфон із застосунком ID Austria — якщо плануєш автентифікацію через застосунок', 'Активний номер мобільного телефону — якщо використовується реєстрація через SMS-TAN']} />
        </> },
      { title: 'Прийдіть до органу у призначений час', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Співробітник перевірить твою особу та проведе офіційну частину реєстрації. Тривалість візиту залежить від органу та конкретної ситуації.</p>
          <NoteBox type="tip">Після цього ти отримаєш <strong>ID Austria-Ausdruck</strong> із <strong>Freischaltcode</strong> та <strong>Widerrufs-Passwort</strong> — збережи їх, вони знадобляться для завершення реєстрації вдома.</NoteBox>
        </> },
      { title: 'Завершіть реєстрацію вдома', body: <>
          <NumberedList dark items={['Зайди на сайт: a-trust.at/id-austria-registrierung', 'Введи отриманий Freischaltcode і Widerrufs-Passwort', 'Заверши реєстрацію та прив’яжи обраний спосіб автентифікації — наприклад, застосунок ID Austria']} />
          <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--success-bg)', border: '1px solid var(--success)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)' }}>Готово — ID Austria активована та готова до використання.</span>
          </div>
        </> },
    ],
    nextH2Before: 'Що можна робити з ID Austria ', nextH2Em: 'далі?',
    nextP: 'Після активації ID Austria можна використовувати для входу до багатьох цифрових державних сервісів, електронної ідентифікації та підписання документів онлайн. Наприклад:',
    nextItems: [
      { icon: '💼', text: 'Робота з FinanzOnline — податковим кабінетом' },
      { icon: '🏥', text: 'Вхід до MeineSV — особистого кабінету соціального страхування' },
      { icon: '✍️', text: 'Електронний підпис документів онлайн' },
      { icon: '🌐', text: 'Доступ до інших сервісів на oesterreich.gv.at' },
    ],
    nextArticleLead: 'Плануєш реєструвати Gewerbe?',
    nextArticleTitle: 'Читайте детально → Gewerbeanmeldung в Австрії: покрокова реєстрація',
    nextArticleSub: 'Повний гайд по реєстрації самозайнятості',
    sourcesLabel: 'Джерела',
    sources: [
      { label: 'Офіційний сайт ID Austria: id-austria.gv.at', href: 'https://www.id-austria.gv.at' },
      { label: 'oesterreich.gv.at — розділ ID Austria', href: 'https://www.oesterreich.gv.at/id-austria/' },
      { label: 'Офіційний перелік органів реєстрації', href: 'https://www.oesterreich.gv.at/id-austria/registrierungsbehoerden.html' },
      { label: 'Запис на термін (Landespolizeidirektion): citizen.bmi.gv.at', href: 'https://citizen.bmi.gv.at' },
    ],
  },
  RU: {
    tag1: 'Австрия · Документы', tag2: '5 шагов', tag3: 'Для иностранцев',
    titleLine1: 'Как оформить ID Austria:', titleEm: 'пошаговый гайд для иностранцев',
    metaTime: '🕐 8 мин чтения', metaSteps: '📱 5 шагов', metaForeigners: '🇺🇦 Для иностранцев',
    toc: [
      ['#what', 'Что такое ID Austria'], ['#why', 'Зачем иностранцу'], ['#nongradients', 'Для неграждан'],
      ['#steps', 'Пошаговая инструкция'], ['#next', 'Что дальше'],
    ],
    backLink: '← Все статьи',
    disclaimer: 'Материал имеет информационный характер и не является юридической консультацией. Процедура, доступные места регистрации и технические способы могут меняться. Перед визитом проверьте актуальную информацию на официальном сайте ID Austria и странице выбранного органа.',
    whatH2Before: 'Что такое ID Austria и зачем она ', whatH2Em: 'нужна?',
    idAustriaDesc: 'Электронное подтверждение личности в Австрии',
    whatP1: 'ID Austria — это электронное средство идентификации, которое позволяет подтверждать личность онлайн, входить в цифровые государственные сервисы и подписывать документы электронно.',
    whatP2: 'Раньше в Австрии для этого использовалась Handy-Signatur (и Bürgerkarte). ID Austria — это их обновлённая версия, которая заменила эти старые системы.',
    whyH2Before: 'Зачем она нужна ', whyH2Em: 'иностранцу?',
    whyP: <>ID Austria даёт удобный доступ ко многим цифровым государственным сервисам. Её можно использовать для электронной идентификации, входа в онлайн-сервисы и электронной подписи документов. Например:</>,
    whyItems: [
      { icon: '💼', text: 'Работы с FinanzOnline — налоговым кабинетом' },
      { icon: '🏥', text: 'Входа в MeineSV — личный кабинет социального страхования' },
      { icon: '✍️', text: 'Подписания документов онлайн — юридически действительная электронная подпись' },
      { icon: '🌐', text: 'Доступа к oesterreich.gv.at и другим цифровым госсервисам' },
    ],
    nonCitizensH2Before: 'Важно для ', nonCitizensH2Em: 'неграждан Австрии',
    eligibilityP: 'ID Austria доступна не только гражданам Австрии. Иностранцы также могут её зарегистрировать, если имеют достаточную связь с Австрией — например, проживают, учатся, работают или ведут деятельность в Австрии. Регистрация возможна с 14 лет.',
    warningBox: <>Если вы не гражданин Австрии, для регистрации ID Austria нужно подтвердить достаточную связь с Австрией (Bezug zum Inland) — например, Meldebestätigung, студенческий билет или подтверждение от работодателя. Иностранные граждане могут пройти регистрацию в <strong>Landespolizeidirektion</strong> (провинциальном полицейском управлении) или в соответствующем отделении <strong>Finanzamt Österreich</strong>.<br /><br />Доступность конкретных приёмных дней и отделений может отличаться в зависимости от региона — актуальный перечень органов регистрации смотрите по ссылке ниже.</>,
    regAuthorityLinkText: '📍 Официальный перечень органов регистрации — oesterreich.gv.at',
    rwrCaption: 'Rot-Weiß-Rot Karte Plus',
    stepsH2Before: 'Пошаговая инструкция: как ', stepsH2Em: 'оформить ID Austria',
    steps: [
      { title: 'Установите приложение ID Austria заранее', body: <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>Если планируете пользоваться ID Austria со смартфона, установите актуальную версию приложения <strong>ID Austria</strong> заранее. Оно доступно для iOS и Android и понадобится прямо на месте во время регистрации.</p> },
      { title: 'Запишитесь на приём в орган регистрации', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Иностранные граждане могут зарегистрировать ID Austria лично в <strong>Landespolizeidirektion</strong> (провинциальном полицейском управлении) или в соответствующем отделении <strong>Finanzamt Österreich</strong> — при условии подтверждения достаточной связи с Австрией.</p>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}><ExtLink href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung">📅 Записаться на приём в Landespolizeidirektion — citizen.bmi.gv.at</ExtLink></p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6 }}>Общий порядок записи:</p>
          <NumberedList dark items={['Выберите удобный орган регистрации в вашей федеральной земле', 'Найдите раздел записи на регистрацию ID Austria', 'Выберите дату и время, которые вам подходят']} />
          <NoteBox type="warning">По практическому опыту, одна запись обычно оформляется на одного человека — если планируете оформить ID Austria для нескольких членов семьи, уточните в выбранном органе, нужна ли отдельная запись для каждого. Минимальный возраст для получения ID Austria — 14 лет.</NoteBox>
        </> },
      { title: 'Подготовьте документы', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Точный перечень может отличаться в зависимости от органа. Примерный набор:</p>
          <NumberedList items={['Действующий паспорт или другое официальное фотоудостоверение личности', 'Актуальное паспортное фото — при необходимости (может не понадобиться, если подходящее фото уже есть в австрийских системах)', 'Подтверждение достаточной связи с Австрией — например, Meldebestätigung, студенческий билет, подтверждение от работодателя или другой равнозначный документ', 'Смартфон с приложением ID Austria — если планируете аутентификацию через приложение', 'Активный номер мобильного телефона — если используется регистрация через SMS-TAN']} />
        </> },
      { title: 'Придите в орган в назначенное время', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Сотрудник проверит вашу личность и проведёт официальную часть регистрации. Длительность визита зависит от органа и конкретной ситуации.</p>
          <NoteBox type="tip">После этого вы получите <strong>ID Austria-Ausdruck</strong> с <strong>Freischaltcode</strong> и <strong>Widerrufs-Passwort</strong> — сохраните их, они понадобятся для завершения регистрации дома.</NoteBox>
        </> },
      { title: 'Завершите регистрацию дома', body: <>
          <NumberedList dark items={['Зайдите на сайт: a-trust.at/id-austria-registrierung', 'Введите полученный Freischaltcode и Widerrufs-Passwort', 'Завершите регистрацию и привяжите выбранный способ аутентификации — например, приложение ID Austria']} />
          <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--success-bg)', border: '1px solid var(--success)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)' }}>Готово — ID Austria активирована и готова к использованию.</span>
          </div>
        </> },
    ],
    nextH2Before: 'Что можно делать с ID Austria ', nextH2Em: 'дальше?',
    nextP: 'После активации ID Austria можно использовать для входа в многие цифровые государственные сервисы, электронной идентификации и подписания документов онлайн. Например:',
    nextItems: [
      { icon: '💼', text: 'Работа с FinanzOnline — налоговым кабинетом' },
      { icon: '🏥', text: 'Вход в MeineSV — личный кабинет социального страхования' },
      { icon: '✍️', text: 'Электронная подпись документов онлайн' },
      { icon: '🌐', text: 'Доступ к другим сервисам на oesterreich.gv.at' },
    ],
    nextArticleLead: 'Планируете регистрировать Gewerbe?',
    nextArticleTitle: 'Читайте подробно → Gewerbeanmeldung в Австрии: пошаговая регистрация',
    nextArticleSub: 'Полный гайд по регистрации самозанятости',
    sourcesLabel: 'Источники',
    sources: [
      { label: 'Официальный сайт ID Austria: id-austria.gv.at', href: 'https://www.id-austria.gv.at' },
      { label: 'oesterreich.gv.at — раздел ID Austria', href: 'https://www.oesterreich.gv.at/id-austria/' },
      { label: 'Официальный перечень органов регистрации', href: 'https://www.oesterreich.gv.at/id-austria/registrierungsbehoerden.html' },
      { label: 'Запись на приём (Landespolizeidirektion): citizen.bmi.gv.at', href: 'https://citizen.bmi.gv.at' },
    ],
  },
  EN: {
    tag1: 'Austria · Documents', tag2: '5 Steps', tag3: 'For Foreigners',
    titleLine1: 'How to set up ID Austria:', titleEm: 'a step-by-step guide for foreigners',
    metaTime: '🕐 8 min read', metaSteps: '📱 5 steps', metaForeigners: '🇺🇦 For foreigners',
    toc: [
      ['#what', 'What is ID Austria'], ['#why', 'Why foreigners need it'], ['#nongradients', 'For Non-Citizens'],
      ['#steps', 'Step-by-Step Instructions'], ['#next', "What's Next"],
    ],
    backLink: '← All Articles',
    disclaimer: 'This material is for informational purposes only and does not constitute legal advice. The procedure, available registration locations, and technical methods may change. Before your visit, check the current information on the official ID Austria website and the page of your chosen authority.',
    whatH2Before: 'What is ID Austria and why is it ', whatH2Em: 'needed?',
    idAustriaDesc: 'Electronic proof of identity in Austria',
    whatP1: "ID Austria is an electronic means of identification that lets you verify your identity online, log in to digital government services, and sign documents electronically.",
    whatP2: 'Austria previously used Handy-Signatur (and Bürgerkarte) for this. ID Austria is their updated version, which replaced these older systems.',
    whyH2Before: 'Why do foreigners ', whyH2Em: 'need it?',
    whyP: <>ID Austria gives you convenient access to many digital government services. It can be used for electronic identification, logging in to online services, and electronically signing documents. For example:</>,
    whyItems: [
      { icon: '💼', text: 'Working with FinanzOnline — the tax portal' },
      { icon: '🏥', text: 'Logging in to MeineSV — the social insurance self-service portal' },
      { icon: '✍️', text: 'Signing documents online — a legally valid electronic signature' },
      { icon: '🌐', text: 'Accessing oesterreich.gv.at and other digital government services' },
    ],
    nonCitizensH2Before: 'Important for ', nonCitizensH2Em: 'non-Austrian citizens',
    eligibilityP: "ID Austria isn't only available to Austrian citizens. Foreigners can also register for it if they have a sufficient connection to Austria — for example, they live, study, work, or run a business in Austria. Registration is possible from age 14.",
    warningBox: <>If you&apos;re not an Austrian citizen, registering for ID Austria requires demonstrating a sufficient connection to Austria (Bezug zum Inland) — for example, a Meldebestätigung, a student ID, or an employer confirmation. Foreign nationals can register at a <strong>Landespolizeidirektion</strong> (provincial police headquarters) or at the relevant <strong>Finanzamt Österreich</strong> office.<br /><br />The availability of specific appointments and offices can vary by region — check the current directory of registration authorities via the link below.</>,
    regAuthorityLinkText: '📍 Official directory of registration authorities — oesterreich.gv.at',
    rwrCaption: 'Rot-Weiß-Rot Karte Plus',
    stepsH2Before: 'Step-by-Step Instructions: How to ', stepsH2Em: 'Set Up ID Austria',
    steps: [
      { title: 'Install the ID Austria app in advance', body: <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>If you plan to use ID Austria from your smartphone, install the current version of the <strong>ID Austria</strong> app in advance. It&apos;s available for iOS and Android and you&apos;ll need it on the spot during registration.</p> },
      { title: 'Book an appointment at a registration authority', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Foreign nationals can register for ID Austria in person at a <strong>Landespolizeidirektion</strong> (provincial police headquarters) or at the relevant <strong>Finanzamt Österreich</strong> office — provided they can demonstrate a sufficient connection to Austria.</p>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}><ExtLink href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung">📅 Book an appointment at a Landespolizeidirektion — citizen.bmi.gv.at</ExtLink></p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6 }}>General booking steps:</p>
          <NumberedList dark items={['Choose a convenient registration authority in your federal state', 'Find the section for booking ID Austria registration', 'Choose a date and time that works for you']} />
          <NoteBox type="warning">Based on practical experience, one appointment is usually booked per person — if you plan to get ID Austria for several family members, check with your chosen authority whether each person needs a separate appointment. The minimum age for ID Austria is 14.</NoteBox>
        </> },
      { title: 'Prepare your documents', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>The exact list can vary by authority. A typical set includes:</p>
          <NumberedList items={['A valid passport or other official photo ID', 'A current passport photo — if needed (may not be required if a suitable photo is already on file in Austrian systems)', 'Proof of a sufficient connection to Austria — for example, a Meldebestätigung, student ID, employer confirmation, or other equivalent document', 'A smartphone with the ID Austria app — if you plan to authenticate via the app', 'An active mobile phone number — if you register via SMS-TAN']} />
        </> },
      { title: 'Come to the authority at your scheduled time', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>A staff member will verify your identity and carry out the official part of the registration. How long the visit takes depends on the authority and your specific situation.</p>
          <NoteBox type="tip">You&apos;ll then receive an <strong>ID Austria-Ausdruck</strong> (printout) with your <strong>Freischaltcode</strong> and <strong>Widerrufs-Passwort</strong> — save them, you&apos;ll need them to complete registration at home.</NoteBox>
        </> },
      { title: 'Complete registration at home', body: <>
          <NumberedList dark items={['Go to: a-trust.at/id-austria-registrierung', 'Enter the Freischaltcode and Widerrufs-Passwort you received', 'Complete registration and link your chosen authentication method — for example, the ID Austria app']} />
          <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--success-bg)', border: '1px solid var(--success)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)' }}>Done — ID Austria is activated and ready to use.</span>
          </div>
        </> },
    ],
    nextH2Before: 'What can you do with ID Austria ', nextH2Em: 'next?',
    nextP: 'Once ID Austria is activated, you can use it to log in to many digital government services, verify your identity electronically, and sign documents online. For example:',
    nextItems: [
      { icon: '💼', text: 'Working with FinanzOnline — the tax portal' },
      { icon: '🏥', text: 'Logging in to MeineSV — the social insurance self-service portal' },
      { icon: '✍️', text: 'Signing documents electronically' },
      { icon: '🌐', text: 'Accessing other services on oesterreich.gv.at' },
    ],
    nextArticleLead: 'Planning to register a Gewerbe?',
    nextArticleTitle: 'Read more → Gewerbeanmeldung in Austria: step-by-step registration',
    nextArticleSub: 'Complete guide to self-employment registration',
    sourcesLabel: 'Sources',
    sources: [
      { label: 'Official ID Austria website: id-austria.gv.at', href: 'https://www.id-austria.gv.at' },
      { label: 'oesterreich.gv.at — ID Austria section', href: 'https://www.oesterreich.gv.at/id-austria/' },
      { label: 'Official directory of registration authorities', href: 'https://www.oesterreich.gv.at/id-austria/registrierungsbehoerden.html' },
      { label: 'Book an appointment (Landespolizeidirektion): citizen.bmi.gv.at', href: 'https://citizen.bmi.gv.at' },
    ],
  },
  DE: {
    tag1: 'Österreich · Dokumente', tag2: '5 Schritte', tag3: 'Für Ausländer',
    titleLine1: 'ID Austria einrichten:', titleEm: 'Schritt-für-Schritt-Anleitung für ausländische Staatsangehörige',
    metaTime: '🕐 8 Min. Lesezeit', metaSteps: '📱 5 Schritte', metaForeigners: '🇺🇦 Für Ausländer',
    toc: [
      ['#what', 'Was ist ID Austria'], ['#why', 'Warum Ausländer sie brauchen'], ['#nongradients', 'Für Nicht-Staatsbürger'],
      ['#steps', 'Schritt-für-Schritt-Anleitung'], ['#next', 'Was als Nächstes'],
    ],
    backLink: '← Alle Artikel',
    disclaimer: 'Dieses Material dient nur zu Informationszwecken und stellt keine Rechtsberatung dar. Das Verfahren, die verfügbaren Registrierungsstellen und die technischen Methoden können sich ändern. Überprüfe vor deinem Besuch die aktuellen Informationen auf der offiziellen ID-Austria-Website und der Seite der gewählten Behörde.',
    whatH2Before: 'Was ist ID Austria und wozu wird sie ', whatH2Em: 'gebraucht?',
    idAustriaDesc: 'Elektronischer Identitätsnachweis in Österreich',
    whatP1: 'ID Austria ist ein elektronisches Identifizierungsmittel, mit dem du deine Identität online bestätigen, dich bei digitalen staatlichen Diensten anmelden und Dokumente elektronisch unterschreiben kannst.',
    whatP2: 'Früher wurde in Österreich dafür die Handy-Signatur (und die Bürgerkarte) verwendet. ID Austria ist deren aktualisierte Version, die diese älteren Systeme ersetzt hat.',
    whyH2Before: 'Wozu brauchen sie ', whyH2Em: 'Ausländer?',
    whyP: <>ID Austria bietet bequemen Zugang zu vielen digitalen staatlichen Diensten. Sie kann für die elektronische Identifizierung, die Anmeldung bei Online-Diensten und die elektronische Unterschrift von Dokumenten verwendet werden. Zum Beispiel für:</>,
    whyItems: [
      { icon: '💼', text: 'Arbeit mit FinanzOnline — dem Steuerportal' },
      { icon: '🏥', text: 'Anmeldung bei MeineSV — dem Selbstbedienungsportal der Sozialversicherung' },
      { icon: '✍️', text: 'Online-Unterschrift von Dokumenten — rechtsgültige elektronische Signatur' },
      { icon: '🌐', text: 'Zugang zu oesterreich.gv.at und weiteren digitalen staatlichen Diensten' },
    ],
    nonCitizensH2Before: 'Wichtig für ', nonCitizensH2Em: 'Nicht-Österreicher:innen',
    eligibilityP: 'ID Austria steht nicht nur österreichischen Staatsbürger:innen zur Verfügung. Auch Ausländer:innen können sie beantragen, wenn sie einen ausreichenden Bezug zu Österreich haben — zum Beispiel, weil sie in Österreich leben, studieren, arbeiten oder eine Tätigkeit ausüben. Die Registrierung ist ab 14 Jahren möglich.',
    warningBox: <>Wenn du keine österreichische Staatsbürgerschaft hast, musst du für die Registrierung von ID Austria einen ausreichenden Bezug zu Österreich nachweisen (Bezug zum Inland) — zum Beispiel durch eine Meldebestätigung, einen Studierendenausweis oder eine Arbeitgeberbestätigung. Ausländische Staatsangehörige können sich bei einer <strong>Landespolizeidirektion</strong> oder bei einer zuständigen Dienststelle des <strong>Finanzamtes Österreich</strong> registrieren.<br /><br />Die Verfügbarkeit konkreter Termine und Dienststellen kann je nach Region unterschiedlich sein — das aktuelle Verzeichnis der Registrierungsbehörden findest du über den Link unten.</>,
    regAuthorityLinkText: '📍 Offizielles Verzeichnis der Registrierungsbehörden — oesterreich.gv.at',
    rwrCaption: 'Rot-Weiß-Rot Karte Plus',
    stepsH2Before: 'Schritt-für-Schritt-Anleitung: Wie du ', stepsH2Em: 'ID Austria einrichtest',
    steps: [
      { title: 'Installiere die ID Austria App im Voraus', body: <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>Wenn du ID Austria über dein Smartphone nutzen möchtest, installiere die aktuelle Version der App <strong>ID Austria</strong> im Voraus. Sie ist für iOS und Android verfügbar und wird direkt vor Ort bei der Registrierung benötigt.</p> },
      { title: 'Vereinbare einen Termin bei einer Registrierungsbehörde', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Ausländische Staatsangehörige können sich persönlich bei einer <strong>Landespolizeidirektion</strong> oder bei der zuständigen Dienststelle des <strong>Finanzamtes Österreich</strong> für ID Austria registrieren — sofern sie einen ausreichenden Bezug zu Österreich nachweisen können.</p>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}><ExtLink href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung">📅 Termin bei einer Landespolizeidirektion vereinbaren — citizen.bmi.gv.at</ExtLink></p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6 }}>Allgemeiner Ablauf der Terminvereinbarung:</p>
          <NumberedList dark items={['Wähle eine passende Registrierungsbehörde in deinem Bundesland', 'Suche den Bereich für die Terminvereinbarung zur ID-Austria-Registrierung', 'Wähle ein Datum und eine Uhrzeit, die dir passen']} />
          <NoteBox type="warning">Nach praktischer Erfahrung wird meist ein Termin pro Person gebucht — wenn du ID Austria für mehrere Familienmitglieder beantragen möchtest, kläre bei der gewählten Behörde, ob für jede Person ein eigener Termin nötig ist. Das Mindestalter für ID Austria beträgt 14 Jahre.</NoteBox>
        </> },
      { title: 'Bereite deine Dokumente vor', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Die genaue Liste kann je nach Behörde variieren. Übliche Unterlagen:</p>
          <NumberedList items={['Gültiger Reisepass oder ein anderer amtlicher Lichtbildausweis', 'Aktuelles Passfoto — falls erforderlich (unter Umständen nicht nötig, wenn bereits ein geeignetes Foto in österreichischen Systemen vorliegt)', 'Nachweis eines ausreichenden Bezugs zu Österreich — z. B. Meldebestätigung, Studierendenausweis, Arbeitgeberbestätigung oder ein gleichwertiges Dokument', 'Smartphone mit der App ID Austria — falls du dich über die App authentifizieren möchtest', 'Aktive Mobiltelefonnummer — falls die Registrierung per SMS-TAN erfolgt']} />
        </> },
      { title: 'Erscheine zur vereinbarten Zeit bei der Behörde', body: <>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>Ein:e Mitarbeiter:in überprüft deine Identität und führt den offiziellen Teil der Registrierung durch. Wie lange der Besuch dauert, hängt von der Behörde und deiner konkreten Situation ab.</p>
          <NoteBox type="tip">Danach erhältst du einen <strong>ID Austria-Ausdruck</strong> mit <strong>Freischaltcode</strong> und <strong>Widerrufs-Passwort</strong> — bewahre sie auf, du brauchst sie, um die Registrierung zu Hause abzuschließen.</NoteBox>
        </> },
      { title: 'Schließe die Registrierung zu Hause ab', body: <>
          <NumberedList dark items={['Gehe auf: a-trust.at/id-austria-registrierung', 'Gib den erhaltenen Freischaltcode und das Widerrufs-Passwort ein', 'Schließe die Registrierung ab und verknüpfe deine gewählte Authentifizierungsmethode — zum Beispiel die App ID Austria']} />
          <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--success-bg)', border: '1px solid var(--success)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)' }}>Fertig — ID Austria ist aktiviert und einsatzbereit.</span>
          </div>
        </> },
    ],
    nextH2Before: 'Was kannst du mit ID Austria als ', nextH2Em: 'Nächstes tun?',
    nextP: 'Nach der Aktivierung kannst du ID Austria nutzen, um dich bei vielen digitalen staatlichen Diensten anzumelden, dich elektronisch zu identifizieren und Dokumente online zu unterschreiben. Zum Beispiel:',
    nextItems: [
      { icon: '💼', text: 'Arbeit mit FinanzOnline — dem Steuerportal' },
      { icon: '🏥', text: 'Anmeldung bei MeineSV — dem Selbstbedienungsportal der Sozialversicherung' },
      { icon: '✍️', text: 'Elektronische Unterschrift von Dokumenten' },
      { icon: '🌐', text: 'Zugang zu weiteren Diensten auf oesterreich.gv.at' },
    ],
    nextArticleLead: 'Planst du, ein Gewerbe anzumelden?',
    nextArticleTitle: 'Mehr lesen → Gewerbeanmeldung in Österreich: Schritt-für-Schritt-Registrierung',
    nextArticleSub: 'Vollständiger Leitfaden zur Selbstständigkeitsregistrierung',
    sourcesLabel: 'Quellen',
    sources: [
      { label: 'Offizielle ID Austria Website: id-austria.gv.at', href: 'https://www.id-austria.gv.at' },
      { label: 'oesterreich.gv.at — Bereich ID Austria', href: 'https://www.oesterreich.gv.at/id-austria/' },
      { label: 'Offizielles Verzeichnis der Registrierungsbehörden', href: 'https://www.oesterreich.gv.at/id-austria/registrierungsbehoerden.html' },
      { label: 'Termin vereinbaren (Landespolizeidirektion): citizen.bmi.gv.at', href: 'https://citizen.bmi.gv.at' },
    ],
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
              <img src="/articles/austria-id-cover.jpg" alt="ID Austria" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
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

        {/* What is ID Austria */}
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

        <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--charcoal)', marginBottom: 16 }}>{t.eligibilityP}</p>

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

        <p style={{ marginTop: 10 }}><ExtLink href="https://www.oesterreich.gv.at/id-austria/registrierungsbehoerden.html">{t.regAuthorityLinkText}</ExtLink></p>

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
          <p style={{ fontSize: 12, color: 'var(--text3)', marginTop: 16, marginBottom: 6 }}>{t.nextArticleLead}</p>
          <Link href="/articles/gewerbeanmeldung" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 18px', borderRadius: 12, border: '1.5px solid #038390', background: 'var(--peach-light)', textDecoration: 'none' }}>
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

        {/* Prev / Next navigation */}
        <ArticlePrevNext currentSlug="austria-id" />

        </div>{/* end main content */}
      </div>{/* end flex wrapper */}
      <Footer />
    </div>
  )
}
