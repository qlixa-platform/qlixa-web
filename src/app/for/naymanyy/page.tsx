'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const CABINET_CTA = 'https://cabinet-ten-lac.vercel.app/login?plan=employee'

const T: Record<string, any> = {
  UA: {
    badge: 'Для найманих працівників',
    heroQ: 'Працюєш за наймом в Австрії?',
    relatedLinks: [
      { label: 'Маєш капітальні та закордонні доходи', href: '/for/samostiynyy' },
      { label: 'Здаєш нерухомість', href: '/for/nerukhomist' },
      { label: 'Або маєш дохід з кількох джерел', href: '/for/nerukhomist' },
      { label: 'Пенсіонер з доходом', href: '/for/pensioner' },
    ],
    heroDesc: 'Цей тариф для тебе, якщо ти хочеш самостійно подати декларацію, не знаєш, які витрати можна врахувати, маєш сім\u2019ю, дітей або інші обставини, що можуть впливати на податкове повернення.',
    heroNote: 'Не потрібно бути бухгалтером — QLIXA проведе тебе крок за кроком.',
    h1Before: 'Розрахуй своє податкове повернення ',
    h1Emphasis: 'в Австрії',
    heroSubtext: 'QLIXA проведе тебе через персональну податкову анкету, знайде можливі відрахування та покаже орієнтовну суму повернення.',
    price: '19,90', period: '/ рік',
    priceNote: 'Разова оплата · доступ протягом податкового року',
    ctaMain: 'Почати розрахунок →',
    features: ['Без щомісячної підписки', 'Доступ одразу після оплати', 'Можна заповнювати протягом року', 'Підходить для більшості працівників по найму'],

    block3H2: 'Не потрібно знати, що можна списати',
    block3Sub: 'QLIXA сама поставить правильні запитання.',
    block3P1: 'Тобі не потрібно пам\u2019ятати всі можливі податкові витрати або знати австрійські податкові правила.',
    block3P2: 'Ти просто відповідаєш на зрозумілі запитання — QLIXA аналізує твою ситуацію та визначає, що може бути релевантним саме тобі.',
    quoteQ: 'Не знаєш, що можна списати?',
    quoteA: 'Тобі не потрібно знати. QLIXA запитає.',

    questionsLabel: 'QLIXA питає',
    questions: ['Чи маєш ти витрати, пов\u2019язані з дорогою до роботи?', 'Ти працюєш частково з дому?', 'У тебе є діти?'],
    yes: 'Так', no: 'Ні',
    relevantLabel: 'QLIXA додає наступні релевантні питання',
    relevantItems: ['Витрати на дітей', 'Сімейні бонуси', 'Додаткові відрахування'],
    resultLabel: 'Твій результат',
    resultDesc: 'Можливе повернення податку',
    resultAmount: '€1 248',
    flow1: 'Ти відповідаєш', flow2: 'QLIXA аналізує', flow3: 'Отримуєш результат',

    block5H2: 'Не потрібно згадувати все в останній день',
    block5Sub: 'Можеш вести свої дані протягом року — або пройти все одразу.',
    card1Label: 'Протягом року',
    card1Desc: 'Додавай витрати та важливі обставини поступово, щоб нічого не забути.',
    card1Tag: 'Зручно для планування',
    middleText1: 'Обидва сценарії →', middleText2: 'один результат',
    card2Label: 'За один раз',
    card2Desc1: 'Все вже під рукою?',
    card2Desc2: 'Пройди анкету та отримай розрахунок за один раз.',
    card2Tag: 'Зручно перед поданням декларації',

    block6H2: 'QLIXA дивиться на твою ситуацію в цілому',
    categories: [
      { icon: '💼', title: 'Робота', desc: 'Витрати та обставини, пов\u2019язані з роботою.' },
      { icon: '🚗', title: 'Дорога', desc: 'Витрати та обставини, пов\u2019язані з дорогою до роботи.' },
      { icon: '🏠', title: 'Житло', desc: 'Релевантні витрати, пов\u2019язані з роботою та житлом.' },
      { icon: '👨‍👩‍👧', title: 'Сім\u2019я', desc: 'Діти, сімейний статус та інші важливі обставини.' },
      { icon: '🎓', title: 'Навчання', desc: 'Професійне навчання та розвиток.' },
      { icon: '⋯', title: 'Інші обставини', desc: 'QLIXA поставить додаткові питання, якщо вони можуть впливати на результат.' },
    ],
    block6Footer1: 'Тобі не потрібно самостійно визначати податкову категорію — ',
    block6Footer2: 'QLIXA перетворює складні правила на прості запитання',

    block7H2: 'Що буде в результаті?',
    steps: [
      { n: '01', title: 'Персональна податкова анкета', desc: 'QLIXA збирає інформацію про твою ситуацію.' },
      { n: '02', title: 'Можливі податкові відрахування', desc: 'Побачиш, що може бути враховано саме у твоєму випадку.' },
      { n: '03', title: 'Розрахунок', desc: 'Отримаєш орієнтовний розрахунок можливого повернення.' },
      { n: '04', title: 'Готові дані для FinanzOnline', desc: 'Зможеш використати підготовлений результат під час подання декларації.' },
    ],

    block8H2: 'Готовий перевірити своє податкове повернення?',
    block8Sub: 'Відповідай на прості запитання. QLIXA зробить складну частину за тебе.',
    underCta: 'Після оплати ти одразу можеш перейти до персональної податкової анкети.',

    faqH2: 'Поширені питання',
    faq: [
      { q: 'Чи потрібно знати австрійські податкові правила?', a: 'Ні. QLIXA проводить тебе через анкету простою мовою.' },
      { q: 'Чи можна заповнювати анкету поступово?', a: 'Так. Дані можна додавати протягом року.' },
      { q: 'Чи можна пройти все одразу?', a: 'Так. Якщо інформація вже під рукою, можна пройти анкету за один раз.' },
      { q: 'Чи є щомісячна підписка?', a: 'Ні. Тариф «Найманий працівник» оплачується один раз — €19,90 за податковий рік.' },
    ],

    block10H2: 'Перевір, скільки можеш повернути',
    block10P1: 'Відповідай на прості запитання.', block10P2: 'QLIXA зробить складну частину за тебе.',
    footNote: '€19,90 / рік · разова оплата',
  },

  RU: {
    badge: 'Для наёмных работников',
    heroQ: 'Работаешь по найму в Австрии?',
    relatedLinks: [
      { label: 'Есть капитальные и заграничные доходы', href: '/for/samostiynyy' },
      { label: 'Сдаёшь недвижимость', href: '/for/nerukhomist' },
      { label: 'Или доход из нескольких источников', href: '/for/nerukhomist' },
      { label: 'Пенсионер с доходом', href: '/for/pensioner' },
    ],
    heroDesc: 'Этот тариф для тебя, если ты хочешь самостоятельно подать декларацию, не знаешь, какие расходы можно учесть, имеешь семью, детей или другие обстоятельства, которые могут влиять на налоговый возврат.',
    heroNote: 'Не нужно быть бухгалтером — QLIXA проведёт тебя шаг за шагом.',
    h1Before: 'Рассчитай свой налоговый возврат ',
    h1Emphasis: 'в Австрии',
    heroSubtext: 'QLIXA проведёт тебя через персональную налоговую анкету, найдёт возможные вычеты и покажет ориентировочную сумму возврата.',
    price: '19,90', period: '/ год',
    priceNote: 'Разовая оплата · доступ в течение налогового года',
    ctaMain: 'Начать расчёт →',
    features: ['Без ежемесячной подписки', 'Доступ сразу после оплаты', 'Можно заполнять в течение года', 'Подходит для большинства наёмных работников'],

    block3H2: 'Не нужно знать, что можно списать',
    block3Sub: 'QLIXA сама задаст правильные вопросы.',
    block3P1: 'Тебе не нужно помнить все возможные налоговые расходы или знать австрийские налоговые правила.',
    block3P2: 'Ты просто отвечаешь на понятные вопросы — QLIXA анализирует твою ситуацию и определяет, что может быть релевантным именно тебе.',
    quoteQ: 'Не знаешь, что можно списать?',
    quoteA: 'Тебе не нужно знать. QLIXA спросит.',

    questionsLabel: 'QLIXA спрашивает',
    questions: ['Есть ли у тебя расходы, связанные с дорогой на работу?', 'Ты работаешь частично из дома?', 'У тебя есть дети?'],
    yes: 'Да', no: 'Нет',
    relevantLabel: 'QLIXA добавляет следующие релевантные вопросы',
    relevantItems: ['Расходы на детей', 'Семейные бонусы', 'Дополнительные вычеты'],
    resultLabel: 'Твой результат',
    resultDesc: 'Возможный налоговый возврат',
    resultAmount: '€1 248',
    flow1: 'Ты отвечаешь', flow2: 'QLIXA анализирует', flow3: 'Получаешь результат',

    block5H2: 'Не нужно вспоминать всё в последний день',
    block5Sub: 'Можешь вести свои данные в течение года — или пройти всё сразу.',
    card1Label: 'В течение года',
    card1Desc: 'Добавляй расходы и важные обстоятельства постепенно, чтобы ничего не забыть.',
    card1Tag: 'Удобно для планирования',
    middleText1: 'Оба сценария →', middleText2: 'один результат',
    card2Label: 'За один раз',
    card2Desc1: 'Всё уже под рукой?',
    card2Desc2: 'Пройди анкету и получи расчёт за один раз.',
    card2Tag: 'Удобно перед подачей декларации',

    block6H2: 'QLIXA смотрит на твою ситуацию в целом',
    categories: [
      { icon: '💼', title: 'Работа', desc: 'Расходы и обстоятельства, связанные с работой.' },
      { icon: '🚗', title: 'Дорога', desc: 'Расходы и обстоятельства, связанные с дорогой на работу.' },
      { icon: '🏠', title: 'Жильё', desc: 'Релевантные расходы, связанные с работой и жильём.' },
      { icon: '👨‍👩‍👧', title: 'Семья', desc: 'Дети, семейный статус и другие важные обстоятельства.' },
      { icon: '🎓', title: 'Обучение', desc: 'Профессиональное обучение и развитие.' },
      { icon: '⋯', title: 'Другие обстоятельства', desc: 'QLIXA задаст дополнительные вопросы, если они могут влиять на результат.' },
    ],
    block6Footer1: 'Тебе не нужно самостоятельно определять налоговую категорию — ',
    block6Footer2: 'QLIXA превращает сложные правила в простые вопросы',

    block7H2: 'Что будет в результате?',
    steps: [
      { n: '01', title: 'Персональная налоговая анкета', desc: 'QLIXA собирает информацию о твоей ситуации.' },
      { n: '02', title: 'Возможные налоговые вычеты', desc: 'Увидишь, что может быть учтено именно в твоём случае.' },
      { n: '03', title: 'Расчёт', desc: 'Получишь ориентировочный расчёт возможного возврата.' },
      { n: '04', title: 'Готовые данные для FinanzOnline', desc: 'Сможешь использовать подготовленный результат при подаче декларации.' },
    ],

    block8H2: 'Готов проверить свой налоговый возврат?',
    block8Sub: 'Отвечай на простые вопросы. QLIXA сделает сложную часть за тебя.',
    underCta: 'После оплаты ты сразу можешь перейти к персональной налоговой анкете.',

    faqH2: 'Частые вопросы',
    faq: [
      { q: 'Нужно ли знать австрийские налоговые правила?', a: 'Нет. QLIXA проведёт тебя через анкету простым языком.' },
      { q: 'Можно ли заполнять анкету постепенно?', a: 'Да. Данные можно добавлять в течение года.' },
      { q: 'Можно ли пройти всё сразу?', a: 'Да. Если информация уже под рукой, можно пройти анкету за один раз.' },
      { q: 'Есть ли ежемесячная подписка?', a: 'Нет. Тариф «Наёмный работник» оплачивается один раз — €19,90 за налоговый год.' },
    ],

    block10H2: 'Проверь, сколько можешь вернуть',
    block10P1: 'Отвечай на простые вопросы.', block10P2: 'QLIXA сделает сложную часть за тебя.',
    footNote: '€19,90 / год · разовая оплата',
  },

  DE: {
    badge: 'Für Angestellte',
    heroQ: 'Arbeitest du angestellt in Österreich?',
    relatedLinks: [
      { label: 'Hast Kapital- oder Auslandseinkünfte', href: '/for/samostiynyy' },
      { label: 'Vermietest eine Immobilie', href: '/for/nerukhomist' },
      { label: 'Oder hast Einkünfte aus mehreren Quellen', href: '/for/nerukhomist' },
      { label: 'Pensionist:in mit Einkommen', href: '/for/pensioner' },
    ],
    heroDesc: 'Dieser Tarif ist für dich, wenn du deine Steuererklärung selbst einreichen möchtest, nicht weißt, welche Ausgaben du geltend machen kannst, eine Familie, Kinder oder andere Umstände hast, die deine Steuerrückerstattung beeinflussen können.',
    heroNote: 'Du musst kein:e Buchhalter:in sein — QLIXA führt dich Schritt für Schritt.',
    h1Before: 'Berechne deine Steuerrückerstattung ',
    h1Emphasis: 'in Österreich',
    heroSubtext: 'QLIXA führt dich durch einen persönlichen Steuerfragebogen, findet mögliche Abzüge und zeigt dir eine geschätzte Rückerstattungssumme.',
    price: '19,90', period: '/ Jahr',
    priceNote: 'Einmalige Zahlung · Zugang für das gesamte Steuerjahr',
    ctaMain: 'Berechnung starten →',
    features: ['Kein monatliches Abo', 'Zugang sofort nach der Zahlung', 'Du kannst übers Jahr verteilt ausfüllen', 'Passt für die meisten Angestellten'],

    block3H2: 'Du musst nicht wissen, was du absetzen kannst',
    block3Sub: 'QLIXA stellt dir selbst die richtigen Fragen.',
    block3P1: 'Du musst dir nicht alle möglichen Steuerausgaben merken oder die österreichischen Steuerregeln kennen.',
    block3P2: 'Du beantwortest einfach verständliche Fragen — QLIXA analysiert deine Situation und ermittelt, was für dich relevant sein könnte.',
    quoteQ: 'Weißt du nicht, was du absetzen kannst?',
    quoteA: 'Du musst es nicht wissen. QLIXA fragt nach.',

    questionsLabel: 'QLIXA fragt',
    questions: ['Hast du Ausgaben, die mit dem Arbeitsweg zu tun haben?', 'Arbeitest du teilweise von zu Hause?', 'Hast du Kinder?'],
    yes: 'Ja', no: 'Nein',
    relevantLabel: 'QLIXA fügt die folgenden relevanten Fragen hinzu',
    relevantItems: ['Ausgaben für Kinder', 'Familienboni', 'Zusätzliche Abzüge'],
    resultLabel: 'Dein Ergebnis',
    resultDesc: 'Mögliche Steuerrückerstattung',
    resultAmount: '€1.248',
    flow1: 'Du antwortest', flow2: 'QLIXA analysiert', flow3: 'Du erhältst dein Ergebnis',

    block5H2: 'Du musst dich nicht am letzten Tag an alles erinnern',
    block5Sub: 'Du kannst deine Daten übers Jahr verteilt eintragen — oder alles auf einmal erledigen.',
    card1Label: 'Übers Jahr verteilt',
    card1Desc: 'Trage Ausgaben und wichtige Umstände nach und nach ein, damit nichts vergessen wird.',
    card1Tag: 'Praktisch zum Planen',
    middleText1: 'Beide Wege →', middleText2: 'ein Ergebnis',
    card2Label: 'Auf einmal',
    card2Desc1: 'Hast du schon alles zur Hand?',
    card2Desc2: 'Fülle den Fragebogen aus und erhalte die Berechnung auf einmal.',
    card2Tag: 'Praktisch vor der Abgabe',

    block6H2: 'QLIXA betrachtet deine Situation als Ganzes',
    categories: [
      { icon: '💼', title: 'Arbeit', desc: 'Ausgaben und Umstände im Zusammenhang mit deiner Arbeit.' },
      { icon: '🚗', title: 'Arbeitsweg', desc: 'Ausgaben und Umstände im Zusammenhang mit dem Weg zur Arbeit.' },
      { icon: '🏠', title: 'Wohnen', desc: 'Relevante Ausgaben im Zusammenhang mit Arbeit und Wohnen.' },
      { icon: '👨‍👩‍👧', title: 'Familie', desc: 'Kinder, Familienstand und andere wichtige Umstände.' },
      { icon: '🎓', title: 'Weiterbildung', desc: 'Berufliche Weiterbildung und Entwicklung.' },
      { icon: '⋯', title: 'Sonstige Umstände', desc: 'QLIXA stellt zusätzliche Fragen, wenn sie das Ergebnis beeinflussen könnten.' },
    ],
    block6Footer1: 'Du musst deine Steuerkategorie nicht selbst bestimmen — ',
    block6Footer2: 'QLIXA verwandelt komplizierte Regeln in einfache Fragen',

    block7H2: 'Was bekommst du am Ende?',
    steps: [
      { n: '01', title: 'Persönlicher Steuerfragebogen', desc: 'QLIXA sammelt Informationen zu deiner Situation.' },
      { n: '02', title: 'Mögliche Steuerabzüge', desc: 'Du siehst, was in deinem Fall berücksichtigt werden könnte.' },
      { n: '03', title: 'Berechnung', desc: 'Du erhältst eine geschätzte Berechnung deiner möglichen Rückerstattung.' },
      { n: '04', title: 'Fertige Daten für FinanzOnline', desc: 'Du kannst das vorbereitete Ergebnis bei der Abgabe deiner Erklärung nutzen.' },
    ],

    block8H2: 'Bereit, deine Steuerrückerstattung zu prüfen?',
    block8Sub: 'Beantworte einfache Fragen. QLIXA übernimmt den komplizierten Teil für dich.',
    underCta: 'Nach der Zahlung kannst du sofort zum persönlichen Steuerfragebogen wechseln.',

    faqH2: 'Häufige Fragen',
    faq: [
      { q: 'Muss ich die österreichischen Steuerregeln kennen?', a: 'Nein. QLIXA führt dich in einfacher Sprache durch den Fragebogen.' },
      { q: 'Kann ich den Fragebogen nach und nach ausfüllen?', a: 'Ja. Du kannst Daten übers Jahr verteilt hinzufügen.' },
      { q: 'Kann ich alles auf einmal erledigen?', a: 'Ja. Wenn deine Informationen bereits vorliegen, kannst du den Fragebogen auf einmal ausfüllen.' },
      { q: 'Gibt es ein monatliches Abo?', a: 'Nein. Der Tarif „Angestellte" wird einmalig bezahlt — €19,90 für das Steuerjahr.' },
    ],

    block10H2: 'Prüfe, wie viel du zurückbekommen kannst',
    block10P1: 'Beantworte einfache Fragen.', block10P2: 'QLIXA übernimmt den komplizierten Teil für dich.',
    footNote: '€19,90 / Jahr · einmalige Zahlung',
  },

  EN: {
    badge: 'For employees',
    heroQ: 'Working as an employee in Austria?',
    relatedLinks: [
      { label: 'Have capital or foreign income', href: '/for/samostiynyy' },
      { label: 'Rent out property', href: '/for/nerukhomist' },
      { label: 'Or have income from multiple sources', href: '/for/nerukhomist' },
      { label: 'Retiree with income', href: '/for/pensioner' },
    ],
    heroDesc: 'This plan is for you if you want to file your tax return yourself, aren\u2019t sure which expenses you can claim, have a family, children, or other circumstances that could affect your tax refund.',
    heroNote: 'You don\u2019t need to be an accountant — QLIXA guides you step by step.',
    h1Before: 'Calculate your tax refund ',
    h1Emphasis: 'in Austria',
    heroSubtext: 'QLIXA guides you through a personal tax questionnaire, finds possible deductions, and shows you an estimated refund amount.',
    price: '19.90', period: '/ year',
    priceNote: 'One-time payment · access for the whole tax year',
    ctaMain: 'Start my calculation →',
    features: ['No monthly subscription', 'Access right after payment', 'You can fill it in throughout the year', 'Fits most people working as employees'],

    block3H2: 'You don\u2019t need to know what you can deduct',
    block3Sub: 'QLIXA asks you the right questions itself.',
    block3P1: 'You don\u2019t need to remember every possible tax expense or know Austrian tax rules.',
    block3P2: 'You just answer simple questions — QLIXA analyzes your situation and works out what might be relevant to you.',
    quoteQ: 'Not sure what you can deduct?',
    quoteA: 'You don\u2019t need to know. QLIXA will ask.',

    questionsLabel: 'QLIXA asks',
    questions: ['Do you have expenses related to your commute to work?', 'Do you work from home part of the time?', 'Do you have children?'],
    yes: 'Yes', no: 'No',
    relevantLabel: 'QLIXA adds the following relevant questions',
    relevantItems: ['Child-related expenses', 'Family bonuses', 'Extra deductions'],
    resultLabel: 'Your result',
    resultDesc: 'Possible tax refund',
    resultAmount: '€1,248',
    flow1: 'You answer', flow2: 'QLIXA analyzes', flow3: 'You get your result',

    block5H2: 'You don\u2019t need to remember everything at the last minute',
    block5Sub: 'You can enter your data throughout the year — or do it all at once.',
    card1Label: 'Throughout the year',
    card1Desc: 'Add expenses and important circumstances gradually, so nothing gets forgotten.',
    card1Tag: 'Great for planning ahead',
    middleText1: 'Both scenarios →', middleText2: 'one result',
    card2Label: 'All at once',
    card2Desc1: 'Already have everything on hand?',
    card2Desc2: 'Fill in the questionnaire and get your calculation in one go.',
    card2Tag: 'Great right before filing',

    block6H2: 'QLIXA looks at your situation as a whole',
    categories: [
      { icon: '💼', title: 'Work', desc: 'Expenses and circumstances related to your job.' },
      { icon: '🚗', title: 'Commute', desc: 'Expenses and circumstances related to getting to work.' },
      { icon: '🏠', title: 'Housing', desc: 'Relevant expenses related to work and housing.' },
      { icon: '👨‍👩‍👧', title: 'Family', desc: 'Children, family status, and other important circumstances.' },
      { icon: '🎓', title: 'Education', desc: 'Professional training and development.' },
      { icon: '⋯', title: 'Other circumstances', desc: 'QLIXA will ask extra questions if they could affect your result.' },
    ],
    block6Footer1: 'You don\u2019t need to figure out the tax category yourself — ',
    block6Footer2: 'QLIXA turns complicated rules into simple questions',

    block7H2: 'What will you end up with?',
    steps: [
      { n: '01', title: 'Personal tax questionnaire', desc: 'QLIXA collects information about your situation.' },
      { n: '02', title: 'Possible tax deductions', desc: 'You\u2019ll see what could be applied in your specific case.' },
      { n: '03', title: 'Calculation', desc: 'You get an estimated calculation of your possible refund.' },
      { n: '04', title: 'Ready data for FinanzOnline', desc: 'You can use the prepared result when filing your return.' },
    ],

    block8H2: 'Ready to check your tax refund?',
    block8Sub: 'Answer simple questions. QLIXA handles the complicated part for you.',
    underCta: 'Right after payment, you can move straight to your personal tax questionnaire.',

    faqH2: 'Frequently asked questions',
    faq: [
      { q: 'Do I need to know Austrian tax rules?', a: 'No. QLIXA guides you through the questionnaire in plain language.' },
      { q: 'Can I fill in the questionnaire gradually?', a: 'Yes. You can add data throughout the year.' },
      { q: 'Can I do it all at once?', a: 'Yes. If you already have the information on hand, you can complete the questionnaire in one go.' },
      { q: 'Is there a monthly subscription?', a: 'No. The "Employee" plan is a one-time payment — €19.90 for the tax year.' },
    ],

    block10H2: 'Check how much you could get back',
    block10P1: 'Answer simple questions.', block10P2: 'QLIXA handles the complicated part for you.',
    footNote: '€19.90 / year · one-time payment',
  },
}

function CTAButton({ children, href, big = false }: { children: React.ReactNode; href: string; big?: boolean }) {
  return (
    <a href={href} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      padding: big ? '16px 32px' : '13px 26px', background: '#038390', color: '#fff',
      borderRadius: 12, fontSize: big ? 17 : 15, fontWeight: 700, textDecoration: 'none',
    }}>
      {children}
    </a>
  )
}

export default function Page() {
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

  const t = T[lang] || T.UA

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <Navbar />

      {/* ── 1+2. HERO ── */}
      <section style={{ background: '#FFFFFF', padding: '56px clamp(20px,6vw,80px) 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'stretch' }}>

            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(34px,4.6vw,54px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.12, letterSpacing: '-1px', marginBottom: 18 }}>
                {t.h1Before}<span style={{ color: '#038390' }}>{t.h1Emphasis}</span>
              </h1>
              <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 16, width: 'fit-content' }}>
                {t.badge}
              </div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>{t.heroQ}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 14 }}>
                {t.relatedLinks.map((link: { label: string; href: string }, i: number) => (
                  <Link key={i} href={link.href} style={{
                    fontSize: 13, fontWeight: 600, color: '#038390', background: 'rgba(3,131,144,0.08)',
                    border: '1px solid rgba(3,131,144,0.2)', padding: '5px 12px', borderRadius: 999,
                    textDecoration: 'none',
                  }}>
                    {link.label}
                  </Link>
                ))}
              </div>
              <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.6, marginBottom: 6, maxWidth: 520 }}>
                {t.heroDesc}
              </p>
              <p style={{ fontSize: 15, color: '#595959' }}>
                {t.heroNote}
              </p>
            </div>

            {/* Pricing card */}
            <div style={{ background: '#F0F7F8', border: '2px solid #038390', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column' as const }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 40, fontWeight: 700, color: '#1A1A1A' }}>€{t.price}</span>
                <span style={{ fontSize: 16, color: '#595959' }}>{t.period}</span>
              </div>
              <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.5, marginBottom: 22 }}>
                {t.priceNote}
              </p>
              <CTAButton href={CABINET_CTA} big>{t.ctaMain}</CTAButton>
              <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                {t.features.map((f: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: '#038390', fontWeight: 700, fontSize: 15, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Full-width subtext below both columns */}
          <p style={{ fontSize: 17, color: '#404040', lineHeight: 1.5, marginTop: 32, whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' as const }}>
            {t.heroSubtext}
          </p>
        </div>
      </section>

      {/* ── 3. КЛЮЧОВИЙ БЛОК ── */}
      <section style={{ background: '#F0F7F8', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' as const }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: 8 }}>
            {t.block3H2}
          </h2>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#038390', marginBottom: 20 }}>
            {t.block3Sub}
          </p>
          <p style={{ fontSize: 16, color: '#404040', lineHeight: 1.65, marginBottom: 12 }}>
            {t.block3P1}
          </p>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.65, marginBottom: 32 }}>
            {t.block3P2}
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 12, background: '#FFFFFF', border: '1px solid rgba(3,131,144,0.2)', borderLeft: '4px solid #038390', borderRadius: 12, padding: '18px 24px', textAlign: 'left' as const, maxWidth: 560 }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.45 }}>{t.quoteQ}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#038390', lineHeight: 1.45 }}>{t.quoteA}</div>
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
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 16 }}>{t.questionsLabel}</div>
              {t.questions.map((q: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: '#FFFFFF', borderRadius: 10, padding: '12px 16px', marginBottom: i < 2 ? 10 : 0 }}>
                  <span style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.4 }}>{q}</span>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#038390', background: 'rgba(3,131,144,0.1)', padding: '5px 12px', borderRadius: 999 }}>{t.yes}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#9D9D9D', background: '#F0F7F8', padding: '5px 12px', borderRadius: 999 }}>{t.no}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow */}
            <div style={{ fontSize: 28, color: '#038390', fontWeight: 700 }}>→</div>

            {/* Right — adaptive questions + result */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
              <div style={{ background: '#F0F7F8', borderRadius: 18, padding: 20, border: '1px solid rgba(3,131,144,0.12)' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 10 }}>{t.relevantLabel}</div>
                {t.relevantItems.map((f: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: '#404040', marginBottom: i < 2 ? 6 : 0 }}>
                    <span style={{ color: '#038390' }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <div style={{ background: '#1A1A1A', borderRadius: 18, padding: 20 }}>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{t.resultLabel}</div>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 8 }}>{t.resultDesc}</div>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 30, fontWeight: 700, color: '#fff' }}>{t.resultAmount}</div>
              </div>
            </div>

          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 32, flexWrap: 'wrap' as const }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>{t.flow1}</span>
            <span style={{ color: '#038390' }}>→</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>{t.flow2}</span>
            <span style={{ color: '#038390' }}>→</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#038390' }}>{t.flow3}</span>
          </div>
        </div>
      </section>

      {/* ── 5. КОЛИ ЗРУЧНО ── */}
      <section style={{ background: '#F0F7F8', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' as const }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 700, color: '#1A1A1A', marginBottom: 10 }}>
            {t.block5H2}
          </h2>
          <p style={{ fontSize: 16, color: '#595959', marginBottom: 40 }}>
            {t.block5Sub}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 20, alignItems: 'center', textAlign: 'left' as const }}>
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, border: '1px solid #E6F4F5' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 10 }}>{t.card1Label}</div>
              <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.5, marginBottom: 14 }}>{t.card1Desc}</p>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#038390', background: 'rgba(3,131,144,0.1)', padding: '4px 12px', borderRadius: 999 }}>{t.card1Tag}</span>
            </div>

            <div style={{ textAlign: 'center' as const, fontSize: 15, fontWeight: 700, color: '#595959', lineHeight: 1.4 }}>
              {t.middleText1}<br/>{t.middleText2}
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, border: '1px solid #E6F4F5' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 10 }}>{t.card2Label}</div>
              <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.5, marginBottom: 4 }}>{t.card2Desc1}</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.5, marginBottom: 14 }}>{t.card2Desc2}</p>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#038390', background: 'rgba(3,131,144,0.1)', padding: '4px 12px', borderRadius: 999 }}>{t.card2Tag}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. ЩО QLIXA ВРАХОВУЄ ── */}
      <section style={{ background: '#FFFFFF', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' as const }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 700, color: '#1A1A1A', marginBottom: 36 }}>
            {t.block6H2}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, textAlign: 'left' as const, marginBottom: 28 }}>
            {t.categories.map((c: { icon: string; title: string; desc: string }, i: number) => (
              <div key={i} style={{ background: '#F0F7F8', borderRadius: 12, padding: 14, border: '1px solid rgba(3,131,144,0.10)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 2, lineHeight: 1.3 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.4 }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 15, fontWeight: 600, color: '#404040', maxWidth: 620, margin: '0 auto' }}>
            {t.block6Footer1}<span style={{ color: '#038390' }}>{t.block6Footer2}</span>.
          </p>
        </div>
      </section>

      {/* ── 7. ЩО ТИ ОТРИМАЄШ ── */}
      <section style={{ background: '#F0F7F8', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 700, color: '#1A1A1A', textAlign: 'center' as const, marginBottom: 40 }}>
            {t.block7H2}
          </h2>

          {t.steps.map((step: { n: string; title: string; desc: string }, i: number) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, background: '#FFFFFF', borderRadius: 16, padding: 22, border: '1px solid #E6F4F5' }}>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 26, fontWeight: 700, color: '#038390', flexShrink: 0, width: 44 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{step.title}</div>
                  <div style={{ fontSize: 15, color: '#595959', lineHeight: 1.5 }}>{step.desc}</div>
                </div>
              </div>
              {i < t.steps.length - 1 && <div style={{ textAlign: 'center' as const, fontSize: 20, color: '#038390', padding: '8px 0' }}>↓</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. CTA-ПОВТОР ── */}
      <section style={{ background: 'linear-gradient(135deg, #038390 0%, #026B76 100%)', padding: '56px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' as const }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(24px,2.8vw,34px)', fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.25 }}>
            {t.block8H2}
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, marginBottom: 24, whiteSpace: 'nowrap' as const }}>
            {t.block8Sub}
          </p>
          <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 2 }}>€{t.price} <span style={{ fontSize: 15, fontWeight: 400 }}>{t.period}</span></div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', marginBottom: 18, whiteSpace: 'nowrap' as const }}>{t.priceNote}</div>
          <a href={CABINET_CTA} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#fff', color: '#038390',
            borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 14,
          }}>
            {t.ctaMain}
          </a>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap' as const }}>
            {t.underCta}
          </div>
        </div>
      </section>

      {/* ── 9. MINI FAQ ── */}
      <section style={{ background: '#FFFFFF', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(24px,2.8vw,34px)', fontWeight: 700, color: '#1A1A1A', textAlign: 'center' as const, marginBottom: 32 }}>
            {t.faqH2}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {t.faq.map((f: { q: string; a: string }, i: number) => (
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
          {t.block10H2}
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 24 }}>
          {t.block10P1}<br/>{t.block10P2}
        </p>
        <CTAButton href={CABINET_CTA} big>{t.ctaMain}</CTAButton>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginTop: 14 }}>
          {t.footNote}
        </div>
      </section>

      <Footer />
    </div>
  )
}
