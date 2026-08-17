'use client'
import { useState, useEffect, type ReactNode } from 'react'
import { loadPDFScripts, fetchLogoAsDataUrl } from '@/utils/generatePDF'

const FREE_STATION = 386.43
const MIN_SINGLE = 1308.39
const MIN_COUPLE = 2064.12
const MIN_CHILD = 201.88

const LOCALE_MAP: Record<string, string> = { UA: 'uk-UA', RU: 'ru-RU', EN: 'en-US', DE: 'de-AT' }

function fmt(n: number, lang: string) {
  return n.toLocaleString(LOCALE_MAP[lang] || 'uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function useLang() {
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
  return lang
}

function IconCircle({ children }: { children: ReactNode }) {
  return (
    <div style={{
      width: 30, height: 30, borderRadius: '50%', background: 'rgba(3,131,144,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {children}
    </div>
  )
}

function CalculatorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="2" width="14" height="16" rx="2" stroke="#038390" strokeWidth="1.5"/>
      <rect x="5.5" y="4.5" width="9" height="3" rx="0.5" fill="#038390"/>
      <circle cx="6.5" cy="10.5" r="1" fill="#038390"/>
      <circle cx="10" cy="10.5" r="1" fill="#038390"/>
      <circle cx="13.5" cy="10.5" r="1" fill="#038390"/>
      <circle cx="6.5" cy="14" r="1" fill="#038390"/>
      <circle cx="10" cy="14" r="1" fill="#038390"/>
      <circle cx="13.5" cy="14" r="1" fill="#038390"/>
    </svg>
  )
}

function ShieldCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L17 4.5V9.5C17 13.5 14 16.5 10 18C6 16.5 3 13.5 3 9.5V4.5L10 2Z" stroke="#038390" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M7 10L9 12L13.5 7.5" stroke="#038390" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PieChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M10 2V10L16.5 6.5C15 3.7 12.7 2 10 2Z" fill="#038390"/>
      <path d="M10 10L16.5 6.5C17.5 8.3 18 9.9 18 10C18 14.4 14.4 18 10 18C5.6 18 2 14.4 2 10C2 5.6 5.6 2 10 2V10Z" stroke="#038390" strokeWidth="1.5"/>
    </svg>
  )
}

function adjIncome(amount: number, type: 'employed' | 'self') {
  return type === 'employed' ? amount * 14 / 12 : amount / 12
}

type Result = {
  ok: boolean
  total: number
  net: number
  required: number
  shortage: number
  savings: number
  adj: number
  adjP: number
  rentDed: number
  elec: number
  oth: number
}

const CALC_TEXT: Record<string, any> = {
  UA: {
    headerTitle: 'RWR+ КАЛЬКУЛЯТОР',
    sidebarTitle: 'Ваші відповіді',
    composition: 'Склад', onlyMe: 'Тільки я', withPartner: 'Я + партнер',
    childrenLabel: 'Діти', yourIncome: 'Ваш дохід', partnerIncome: 'Дохід партнера',
    rent: 'Оренда', electricity: 'Електрика', otherPayments: 'Інші платежі',
    fillForm: 'Заповніть форму',
    employedToggle: '👔 Найманий', selfToggle: '💼 Самозайнятий',
    back: '← Назад', next: 'Далі', stepWord: 'Крок',
    step0: {
      badge: 'Інструмент QLIXA', titleBefore: 'RWR+ калькулятор ', titleEm: 'доходу',
      f1t: 'Точний розрахунок', f1d: 'Попередній прорахунок на основі ставок BMI 2026 та наших рекомендацій.',
      f2t: 'Актуальні дані', f2d: 'Автоматичне оновлення показників.',
      f3t: 'Простий результат', f3d: 'Зрозуміло, швидко, без зайвого.',
      discLine1: 'Розрахунок базується на офіційних ставках BMI 2026.',
      discLine2: 'Є попереднім — остаточне рішення приймає компетентний орган.',
      startBtn: 'Почати розрахунок →',
    },
    step1: { title: 'Чи подаєтеся разом із партнером?', hint: 'Це впливає на мінімальний поріг доходу — для пари він інший.', onlyMe: 'Тільки я', withPartner: 'Я + партнер', min: (v: string) => `Мінімум € ${v}` },
    step2: { title: 'Скільки у вас дітей?', hint: (v: string) => `За кожну дитину до мінімуму додається € ${v} / міс.` },
    step3: { title: 'Як ви працюєте?', hintEmployed: 'Якщо зарплата 14 разів на рік — вводьте звичайну місячну суму. Ми перерахуємо × 14÷12 за формулою BMI.', hintSelf: 'Вводьте річний чистий прибуток після вирахування податків та внесків до SVS. Ми розрахуємо середньомісячний автоматично (÷ 12).' },
    step4: { title: 'Ваш чистий місячний дохід', placeholderSelf: 'напр. 12000 (річний)', placeholderEmployed: 'напр. 1400', hintEmployed: 'Вводьте звичайну місячну суму — перерахунок × 14÷12 відбудеться автоматично.', hintSelf: 'Вводьте річний чистий прибуток після вирахування податків та внесків до SVS. Ми розрахуємо середньомісячний автоматично (÷ 12).', alertMissing: 'Вкажіть дохід' },
    step5: { title: 'Дохід партнера', placeholderSelf: 'напр. 14400 (річний)', placeholderEmployed: 'напр. 1200', hintEmployed: 'Вводьте звичайну місячну суму — перерахунок × 14÷12 відбудеться автоматично.', hintSelf: 'Вводьте річний чистий прибуток після вирахування податків та внесків до SVS. Ми розрахуємо середньомісячний автоматично (÷ 12).', alertMissing: 'Вкажіть дохід партнера' },
    stepRent: { title: 'Щомісячна оренда', placeholder: 'напр. 700', hint: 'Оренда разом із Betriebskosten. Без електрики — її запитаємо окремо.', alertMissing: 'Вкажіть оренду' },
    stepElec: { title: 'Витрати на електроенергію', placeholder: 'напр. 80', hint: 'При подачі на RWR+ часто запитують рахунки за електрику окремо — тому враховуємо. Якщо немає — введіть 0.' },
    stepOther: { title: 'Інші регулярні платежі', placeholder: 'напр. 0', hint: 'Кредит, іпотека, аліменти тощо. Якщо немає — залиште 0.', calcBtn: 'Розрахувати' },
    result: {
      okTitle: 'Дохід достатній', notOkTitle: 'Дохід нижче мінімуму',
      okDesc: 'Умови BMI 2026 виконуються за попереднім розрахунком.', notOkDesc: 'Можна підтвердити заощадженнями на рахунку.',
      breakdown: 'Розбивка',
      yourIncomeEmployed: 'Ваш дохід (скоригований × 14÷12)', yourIncomeSelf: 'Ваш дохід (річний ÷ 12)',
      partnerIncomeEmployed: 'Дохід партнера (× 14÷12)', partnerIncomeSelf: 'Дохід партнера (річний ÷ 12)',
      rentDeduction: 'Оренда понад freie Station', electricityLabel: 'Електрика', otherLabel: 'Інші платежі',
      afterExpenses: 'Після витрат', minBmi: 'Мінімум BMI 2026',
      recommendedAmount: 'Рекомендована сума на рахунку', recommendedNote: 'недостача × 12 міс + 10% запас (рекомендація QLIXA)',
      downloadPdf: '⬇ Завантажити результат (PDF)', recalculate: 'Розрахувати знову',
    },
    pdf: {
      docTitle: 'Результат розрахунку RWR+', generatedOn: 'Сформовано:',
      statusOkTitle: 'Дохід достатній', statusOkDesc: 'За попереднім розрахунком умови BMI 2026 виконуються.',
      statusNotOkTitle: 'Дохід нижче мінімуму BMI', statusNotOkDesc: 'Можна підтвердити заощадженнями на рахунку.',
      breakdownLabel: 'РОЗБИВКА РОЗРАХУНКУ',
      yourIncomeEmployed: 'Ваш дохід (скоригований × 14÷12)', yourIncomeSelf: 'Ваш дохід (річний ÷ 12)',
      partnerIncomeEmployed: 'Дохід партнера (× 14÷12)', partnerIncomeSelf: 'Дохід партнера (річний ÷ 12)',
      rentDeduction: 'Оренда понад freie Station (€386,43)', electricityLabel: 'Електроенергія', otherLabel: 'Інші регулярні платежі',
      afterExpenses: 'Дохід після витрат', minBmiPrefix: 'Мінімум BMI 2026', coupleWord: 'пара', personWord: '1 особа', childWord: 'дит.',
      remainderOk: 'Залишок понад мінімум', remainderShort: 'Не вистачає',
      recommendedLabel: 'Рекомендована сума на рахунку', recommendedNote: 'недостача × 12 міс + 10% запас', recommendedNote2: '(рекомендація QLIXA)',
      disclaimer: 'Цей розрахунок виконано на основі офіційних ставок BMI 2026 і є попереднім. Остаточне рішення приймає компетентний орган. QLIXA не є податковим консультантом і не надає юридичних консультацій.',
      footerTagline: 'Твій цифровий бізнес-помічник в Австрії', filename: 'QLIXA_RWR_Rozrakhunok.pdf',
    },
  },
  RU: {
    headerTitle: 'RWR+ КАЛЬКУЛЯТОР',
    sidebarTitle: 'Твои ответы',
    composition: 'Состав', onlyMe: 'Только я', withPartner: 'Я + партнёр',
    childrenLabel: 'Дети', yourIncome: 'Твой доход', partnerIncome: 'Доход партнёра',
    rent: 'Аренда', electricity: 'Электричество', otherPayments: 'Другие платежи',
    fillForm: 'Заполните форму',
    employedToggle: '👔 Наёмный', selfToggle: '💼 Самозанятый',
    back: '← Назад', next: 'Далее', stepWord: 'Шаг',
    step0: {
      badge: 'Инструмент QLIXA', titleBefore: 'RWR+ калькулятор ', titleEm: 'дохода',
      f1t: 'Точный расчёт', f1d: 'Предварительный расчёт на основе ставок BMI 2026 и наших рекомендаций.',
      f2t: 'Актуальные данные', f2d: 'Автоматическое обновление показателей.',
      f3t: 'Простой результат', f3d: 'Понятно, быстро, без лишнего.',
      discLine1: 'Расчёт основан на официальных ставках BMI 2026.',
      discLine2: 'Является предварительным — окончательное решение принимает компетентный орган.',
      startBtn: 'Начать расчёт →',
    },
    step1: { title: 'Подаётесь вместе с партнёром?', hint: 'Это влияет на минимальный порог дохода — для пары он другой.', onlyMe: 'Только я', withPartner: 'Я + партнёр', min: (v: string) => `Минимум € ${v}` },
    step2: { title: 'Сколько у вас детей?', hint: (v: string) => `За каждого ребёнка к минимуму добавляется € ${v} / мес.` },
    step3: { title: 'Как вы работаете?', hintEmployed: 'Если зарплата выплачивается 14 раз в год — вводите обычную месячную сумму. Мы пересчитаем × 14÷12 по формуле BMI.', hintSelf: 'Вводите годовую чистую прибыль после вычета налогов и взносов в SVS. Мы рассчитаем среднемесячный доход автоматически (÷ 12).' },
    step4: { title: 'Ваш чистый месячный доход', placeholderSelf: 'напр. 12000 (годовой)', placeholderEmployed: 'напр. 1400', hintEmployed: 'Вводите обычную месячную сумму — пересчёт × 14÷12 произойдёт автоматически.', hintSelf: 'Вводите годовую чистую прибыль после вычета налогов и взносов в SVS. Мы рассчитаем среднемесячный доход автоматически (÷ 12).', alertMissing: 'Укажите доход' },
    step5: { title: 'Доход партнёра', placeholderSelf: 'напр. 14400 (годовой)', placeholderEmployed: 'напр. 1200', hintEmployed: 'Вводите обычную месячную сумму — пересчёт × 14÷12 произойдёт автоматически.', hintSelf: 'Вводите годовую чистую прибыль после вычета налогов и взносов в SVS. Мы рассчитаем среднемесячный доход автоматически (÷ 12).', alertMissing: 'Укажите доход партнёра' },
    stepRent: { title: 'Ежемесячная аренда', placeholder: 'напр. 700', hint: 'Аренда вместе с Betriebskosten. Без электричества — его спросим отдельно.', alertMissing: 'Укажите аренду' },
    stepElec: { title: 'Расходы на электроэнергию', placeholder: 'напр. 80', hint: 'При подаче на RWR+ часто запрашивают счета за электричество отдельно — поэтому учитываем. Если нет — введите 0.' },
    stepOther: { title: 'Другие регулярные платежи', placeholder: 'напр. 0', hint: 'Кредит, ипотека, алименты и т.д. Если нет — оставьте 0.', calcBtn: 'Рассчитать' },
    result: {
      okTitle: 'Дохода достаточно', notOkTitle: 'Доход ниже минимума',
      okDesc: 'Условия BMI 2026 выполняются по предварительному расчёту.', notOkDesc: 'Можно подтвердить накоплениями на счёте.',
      breakdown: 'Разбивка',
      yourIncomeEmployed: 'Ваш доход (скорректированный × 14÷12)', yourIncomeSelf: 'Ваш доход (годовой ÷ 12)',
      partnerIncomeEmployed: 'Доход партнёра (× 14÷12)', partnerIncomeSelf: 'Доход партнёра (годовой ÷ 12)',
      rentDeduction: 'Аренда сверх freie Station', electricityLabel: 'Электричество', otherLabel: 'Другие платежи',
      afterExpenses: 'После расходов', minBmi: 'Минимум BMI 2026',
      recommendedAmount: 'Рекомендуемая сумма на счёте', recommendedNote: 'нехватка × 12 мес + 10% запас (рекомендация QLIXA)',
      downloadPdf: '⬇ Скачать результат (PDF)', recalculate: 'Рассчитать заново',
    },
    pdf: {
      docTitle: 'Результат расчёта RWR+', generatedOn: 'Сформировано:',
      statusOkTitle: 'Дохода достаточно', statusOkDesc: 'По предварительному расчёту условия BMI 2026 выполняются.',
      statusNotOkTitle: 'Доход ниже минимума BMI', statusNotOkDesc: 'Можно подтвердить накоплениями на счёте.',
      breakdownLabel: 'РАЗБИВКА РАСЧЁТА',
      yourIncomeEmployed: 'Ваш доход (скорректированный × 14÷12)', yourIncomeSelf: 'Ваш доход (годовой ÷ 12)',
      partnerIncomeEmployed: 'Доход партнёра (× 14÷12)', partnerIncomeSelf: 'Доход партнёра (годовой ÷ 12)',
      rentDeduction: 'Аренда сверх freie Station (€386,43)', electricityLabel: 'Электроэнергия', otherLabel: 'Другие регулярные платежи',
      afterExpenses: 'Доход после расходов', minBmiPrefix: 'Минимум BMI 2026', coupleWord: 'пара', personWord: '1 человек', childWord: 'дет.',
      remainderOk: 'Остаток сверх минимума', remainderShort: 'Не хватает',
      recommendedLabel: 'Рекомендуемая сумма на счёте', recommendedNote: 'нехватка × 12 мес + 10% запас', recommendedNote2: '(рекомендация QLIXA)',
      disclaimer: 'Этот расчёт выполнен на основе официальных ставок BMI 2026 и является предварительным. Окончательное решение принимает компетентный орган. QLIXA не является налоговым консультантом и не предоставляет юридических консультаций.',
      footerTagline: 'Твой цифровой бизнес-помощник в Австрии', filename: 'QLIXA_RWR_Raschet.pdf',
    },
  },
  EN: {
    headerTitle: 'RWR+ CALCULATOR',
    sidebarTitle: 'Your answers',
    composition: 'Status', onlyMe: 'Just me', withPartner: 'Me + partner',
    childrenLabel: 'Children', yourIncome: 'Your income', partnerIncome: "Partner's income",
    rent: 'Rent', electricity: 'Electricity', otherPayments: 'Other payments',
    fillForm: 'Fill out the form',
    employedToggle: '👔 Employee', selfToggle: '💼 Self-employed',
    back: '← Back', next: 'Next', stepWord: 'Step',
    step0: {
      badge: 'QLIXA Tool', titleBefore: 'RWR+ income ', titleEm: 'calculator',
      f1t: 'Accurate calculation', f1d: 'A preliminary calculation based on BMI 2026 rates and our recommendations.',
      f2t: 'Up-to-date data', f2d: 'Automatic updates of the figures.',
      f3t: 'Simple result', f3d: 'Clear, fast, no clutter.',
      discLine1: 'The calculation is based on the official BMI 2026 rates.',
      discLine2: 'It is preliminary — the final decision is made by the competent authority.',
      startBtn: 'Start calculation →',
    },
    step1: { title: 'Are you applying together with a partner?', hint: "This affects the minimum income threshold — it's different for a couple.", onlyMe: 'Just me', withPartner: 'Me + partner', min: (v: string) => `Minimum € ${v}` },
    step2: { title: 'How many children do you have?', hint: (v: string) => `€ ${v} / month is added to the minimum for each child.` },
    step3: { title: 'How do you work?', hintEmployed: "If your salary is paid 14 times a year, enter your usual monthly amount. We'll recalculate × 14÷12 using the BMI formula.", hintSelf: "Enter your annual net profit after taxes and SVS contributions. We'll calculate the monthly average automatically (÷ 12)." },
    step4: { title: 'Your net monthly income', placeholderSelf: 'e.g. 12000 (annual)', placeholderEmployed: 'e.g. 1400', hintEmployed: 'Enter your usual monthly amount — the × 14÷12 recalculation happens automatically.', hintSelf: "Enter your annual net profit after taxes and SVS contributions. We'll calculate the monthly average automatically (÷ 12).", alertMissing: 'Please enter your income' },
    step5: { title: "Partner's income", placeholderSelf: 'e.g. 14400 (annual)', placeholderEmployed: 'e.g. 1200', hintEmployed: 'Enter your usual monthly amount — the × 14÷12 recalculation happens automatically.', hintSelf: "Enter your annual net profit after taxes and SVS contributions. We'll calculate the monthly average automatically (÷ 12).", alertMissing: "Please enter your partner's income" },
    stepRent: { title: 'Monthly rent', placeholder: 'e.g. 700', hint: "Rent including Betriebskosten. Not electricity — we'll ask about that separately.", alertMissing: 'Please enter your rent' },
    stepElec: { title: 'Electricity costs', placeholder: 'e.g. 80', hint: "When applying for RWR+, electricity bills are often requested separately — so we account for it. If you don't have one, enter 0." },
    stepOther: { title: 'Other regular payments', placeholder: 'e.g. 0', hint: 'Loans, mortgage, alimony, etc. If none, leave 0.', calcBtn: 'Calculate' },
    result: {
      okTitle: 'Income is sufficient', notOkTitle: 'Income below the minimum',
      okDesc: 'Based on the preliminary calculation, the BMI 2026 requirements are met.', notOkDesc: 'This can be confirmed with savings in your account.',
      breakdown: 'Breakdown',
      yourIncomeEmployed: 'Your income (adjusted × 14÷12)', yourIncomeSelf: 'Your income (annual ÷ 12)',
      partnerIncomeEmployed: "Partner's income (× 14÷12)", partnerIncomeSelf: "Partner's income (annual ÷ 12)",
      rentDeduction: 'Rent above freie Station', electricityLabel: 'Electricity', otherLabel: 'Other payments',
      afterExpenses: 'After expenses', minBmi: 'BMI 2026 minimum',
      recommendedAmount: 'Recommended amount in your account', recommendedNote: 'shortfall × 12 months + 10% buffer (QLIXA recommendation)',
      downloadPdf: '⬇ Download result (PDF)', recalculate: 'Calculate again',
    },
    pdf: {
      docTitle: 'RWR+ Calculation Result', generatedOn: 'Generated:',
      statusOkTitle: 'Income is sufficient', statusOkDesc: 'Based on the preliminary calculation, the BMI 2026 requirements are met.',
      statusNotOkTitle: 'Income below the BMI minimum', statusNotOkDesc: 'This can be confirmed with savings in your account.',
      breakdownLabel: 'CALCULATION BREAKDOWN',
      yourIncomeEmployed: 'Your income (adjusted × 14÷12)', yourIncomeSelf: 'Your income (annual ÷ 12)',
      partnerIncomeEmployed: "Partner's income (× 14÷12)", partnerIncomeSelf: "Partner's income (annual ÷ 12)",
      rentDeduction: 'Rent above freie Station (€386.43)', electricityLabel: 'Electricity', otherLabel: 'Other regular payments',
      afterExpenses: 'Income after expenses', minBmiPrefix: 'BMI 2026 minimum', coupleWord: 'couple', personWord: '1 person', childWord: 'child(ren)',
      remainderOk: 'Surplus above minimum', remainderShort: 'Shortfall',
      recommendedLabel: 'Recommended amount in your account', recommendedNote: 'shortfall × 12 months + 10% buffer', recommendedNote2: '(QLIXA recommendation)',
      disclaimer: 'This calculation is based on the official BMI 2026 rates and is preliminary. The final decision is made by the competent authority. QLIXA is not a tax advisor and does not provide legal advice.',
      footerTagline: 'Your digital business assistant in Austria', filename: 'QLIXA_RWR_Calculation.pdf',
    },
  },
  DE: {
    headerTitle: 'RWR+ RECHNER',
    sidebarTitle: 'Deine Antworten',
    composition: 'Zusammensetzung', onlyMe: 'Nur ich', withPartner: 'Ich + Partner',
    childrenLabel: 'Kinder', yourIncome: 'Dein Einkommen', partnerIncome: 'Einkommen des Partners',
    rent: 'Miete', electricity: 'Strom', otherPayments: 'Andere Zahlungen',
    fillForm: 'Formular ausfüllen',
    employedToggle: '👔 Angestellt', selfToggle: '💼 Selbstständig',
    back: '← Zurück', next: 'Weiter', stepWord: 'Schritt',
    step0: {
      badge: 'QLIXA-Tool', titleBefore: 'RWR+ ', titleEm: 'Einkommensrechner',
      f1t: 'Genaue Berechnung', f1d: 'Eine vorläufige Berechnung auf Basis der BMI-2026-Sätze und unserer Empfehlungen.',
      f2t: 'Aktuelle Daten', f2d: 'Automatische Aktualisierung der Werte.',
      f3t: 'Einfaches Ergebnis', f3d: 'Klar, schnell, ohne unnötigen Ballast.',
      discLine1: 'Die Berechnung basiert auf den offiziellen BMI-2026-Sätzen.',
      discLine2: 'Sie ist vorläufig — die endgültige Entscheidung trifft die zuständige Behörde.',
      startBtn: 'Berechnung starten →',
    },
    step1: { title: 'Beantragst du gemeinsam mit einem Partner?', hint: 'Das beeinflusst die Mindesteinkommensgrenze — für ein Paar ist sie anders.', onlyMe: 'Nur ich', withPartner: 'Ich + Partner', min: (v: string) => `Mindestens € ${v}` },
    step2: { title: 'Wie viele Kinder hast du?', hint: (v: string) => `Für jedes Kind kommen € ${v} / Monat zum Minimum hinzu.` },
    step3: { title: 'Wie arbeitest du?', hintEmployed: 'Wenn dein Gehalt 14 Mal im Jahr ausgezahlt wird, gib den üblichen Monatsbetrag ein. Wir rechnen automatisch × 14÷12 nach der BMI-Formel um.', hintSelf: 'Gib deinen jährlichen Nettogewinn nach Abzug von Steuern und SVS-Beiträgen ein. Wir berechnen den Monatsdurchschnitt automatisch (÷ 12).' },
    step4: { title: 'Dein monatliches Nettoeinkommen', placeholderSelf: 'z.B. 12000 (jährlich)', placeholderEmployed: 'z.B. 1400', hintEmployed: 'Gib den üblichen Monatsbetrag ein — die Umrechnung × 14÷12 erfolgt automatisch.', hintSelf: 'Gib deinen jährlichen Nettogewinn nach Abzug von Steuern und SVS-Beiträgen ein. Wir berechnen den Monatsdurchschnitt automatisch (÷ 12).', alertMissing: 'Bitte gib dein Einkommen an' },
    step5: { title: 'Einkommen des Partners', placeholderSelf: 'z.B. 14400 (jährlich)', placeholderEmployed: 'z.B. 1200', hintEmployed: 'Gib den üblichen Monatsbetrag ein — die Umrechnung × 14÷12 erfolgt automatisch.', hintSelf: 'Gib deinen jährlichen Nettogewinn nach Abzug von Steuern und SVS-Beiträgen ein. Wir berechnen den Monatsdurchschnitt automatisch (÷ 12).', alertMissing: 'Bitte gib das Einkommen deines Partners an' },
    stepRent: { title: 'Monatliche Miete', placeholder: 'z.B. 700', hint: 'Miete inklusive Betriebskosten. Ohne Strom — danach fragen wir separat.', alertMissing: 'Bitte gib deine Miete an' },
    stepElec: { title: 'Stromkosten', placeholder: 'z.B. 80', hint: 'Bei der RWR+ Antragstellung werden oft separate Stromrechnungen verlangt — deshalb berücksichtigen wir sie. Falls nicht vorhanden, gib 0 ein.' },
    stepOther: { title: 'Andere regelmäßige Zahlungen', placeholder: 'z.B. 0', hint: 'Kredit, Hypothek, Unterhalt usw. Falls nicht vorhanden, lass 0.', calcBtn: 'Berechnen' },
    result: {
      okTitle: 'Einkommen ausreichend', notOkTitle: 'Einkommen unter dem Minimum',
      okDesc: 'Laut vorläufiger Berechnung sind die BMI-2026-Bedingungen erfüllt.', notOkDesc: 'Kann durch Ersparnisse auf dem Konto bestätigt werden.',
      breakdown: 'Aufschlüsselung',
      yourIncomeEmployed: 'Dein Einkommen (angepasst × 14÷12)', yourIncomeSelf: 'Dein Einkommen (jährlich ÷ 12)',
      partnerIncomeEmployed: 'Einkommen des Partners (× 14÷12)', partnerIncomeSelf: 'Einkommen des Partners (jährlich ÷ 12)',
      rentDeduction: 'Miete über der freien Station', electricityLabel: 'Strom', otherLabel: 'Andere Zahlungen',
      afterExpenses: 'Nach Abzügen', minBmi: 'BMI-2026-Minimum',
      recommendedAmount: 'Empfohlener Betrag auf dem Konto', recommendedNote: 'Fehlbetrag × 12 Monate + 10% Puffer (QLIXA-Empfehlung)',
      downloadPdf: '⬇ Ergebnis herunterladen (PDF)', recalculate: 'Neu berechnen',
    },
    pdf: {
      docTitle: 'RWR+ Berechnungsergebnis', generatedOn: 'Erstellt am:',
      statusOkTitle: 'Einkommen ausreichend', statusOkDesc: 'Laut vorläufiger Berechnung sind die BMI-2026-Bedingungen erfüllt.',
      statusNotOkTitle: 'Einkommen unter dem BMI-Minimum', statusNotOkDesc: 'Kann durch Ersparnisse auf dem Konto bestätigt werden.',
      breakdownLabel: 'AUFSCHLÜSSELUNG DER BERECHNUNG',
      yourIncomeEmployed: 'Dein Einkommen (angepasst × 14÷12)', yourIncomeSelf: 'Dein Einkommen (jährlich ÷ 12)',
      partnerIncomeEmployed: 'Einkommen des Partners (× 14÷12)', partnerIncomeSelf: 'Einkommen des Partners (jährlich ÷ 12)',
      rentDeduction: 'Miete über der freien Station (€386,43)', electricityLabel: 'Strom', otherLabel: 'Andere regelmäßige Zahlungen',
      afterExpenses: 'Einkommen nach Abzügen', minBmiPrefix: 'BMI-2026-Minimum', coupleWord: 'Paar', personWord: '1 Person', childWord: 'Kind(er)',
      remainderOk: 'Überschuss über dem Minimum', remainderShort: 'Fehlbetrag',
      recommendedLabel: 'Empfohlener Betrag auf dem Konto', recommendedNote: 'Fehlbetrag × 12 Monate + 10% Puffer', recommendedNote2: '(QLIXA-Empfehlung)',
      disclaimer: 'Diese Berechnung basiert auf den offiziellen BMI-2026-Sätzen und ist vorläufig. Die endgültige Entscheidung trifft die zuständige Behörde. QLIXA ist kein Steuerberater und bietet keine Rechtsberatung.',
      footerTagline: 'Dein digitaler Business-Assistent in Österreich', filename: 'QLIXA_RWR_Berechnung.pdf',
    },
  },
}

export default function RWRCalculator() {
  const lang = useLang()
  const t = CALC_TEXT[lang] || CALC_TEXT.UA
  const [step, setStep] = useState(0)
  const [hasPartner, setHasPartner] = useState<boolean | null>(null)
  const [children, setChildren] = useState(0)
  const [incomeType, setIncomeType] = useState<'employed' | 'self'>('employed')
  const [income, setIncome] = useState('')
  const [partnerIncomeType, setPartnerIncomeType] = useState<'employed' | 'self'>('employed')
  const [partnerIncome, setPartnerIncome] = useState('')
  const [rent, setRent] = useState('')
  const [electricity, setElectricity] = useState('0')
  const [other, setOther] = useState('0')
  const [result, setResult] = useState<Result | null>(null)

  const TEAL = '#038390'
  const DARK = '#ffffff'
  const DARK2 = '#F0F7F8'

  const totalSteps = hasPartner ? 8 : 7

  const progress = (current: number) => (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i < current ? TEAL : 'rgba(255,255,255,0.15)', transition: 'background 0.3s' }} />
      ))}
    </div>
  )

  const answerBox = (label: string, value: string) => (
    <div key={label} style={{ background: '#ffffff', border: '1px solid rgba(3,131,144,0.15)', borderRadius: 10, padding: '10px 12px' }}>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' as const, letterSpacing: '0.8px', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 500 }}>{value}</div>
    </div>
  )

  const adjI = adjIncome(parseFloat(income) || 0, incomeType)
  const adjP = hasPartner ? adjIncome(parseFloat(partnerIncome) || 0, partnerIncomeType) : 0

  const sidebar = (
    <div style={{ width: 200, background: '#F0F7F8', borderLeft: '1.5px solid rgba(3,131,144,0.15)', padding: '20px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
      <div style={{ fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '1.5px', color: '#038390', marginBottom: 4 }}>{t.sidebarTitle}</div>
      {hasPartner !== null && answerBox(t.composition, hasPartner ? t.withPartner : t.onlyMe)}
      {children > 0 && answerBox(t.childrenLabel, String(children))}
      {income && answerBox(t.yourIncome, `€ ${fmt(adjI, lang)}`)}
      {hasPartner && partnerIncome && answerBox(t.partnerIncome, `€ ${fmt(adjP, lang)}`)}
      {rent && answerBox(t.rent, `€ ${rent}`)}
      {electricity && electricity !== '0' && answerBox(t.electricity, `€ ${electricity}`)}
      {other && other !== '0' && answerBox(t.otherPayments, `€ ${other}`)}
      {!hasPartner && !income && (
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 8 }}>{t.fillForm}</div>
      )}
    </div>
  )

  const typeToggle = (val: 'employed' | 'self', onChange: (v: 'employed' | 'self') => void) => (
    <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
      {(['employed', 'self'] as const).map(tt => (
        <button key={tt} onClick={() => onChange(tt)} style={{
          flex: 1, padding: '9px 12px', borderRadius: 10, fontSize: 12, cursor: 'pointer',
          background: val === tt ? '#038390' : '#F0F7F8', color: val === tt ? '#fff' : '#595959',
          border: `1px solid ${val === tt ? '#038390' : 'rgba(3,131,144,0.2)'}`,
          fontWeight: val === tt ? 600 : 400, transition: 'all 0.2s'
        }}>
          {tt === 'employed' ? t.employedToggle : t.selfToggle}
        </button>
      ))}
    </div>
  )

  const fieldInput = (value: string, onChange: (v: string) => void, placeholder: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#ffffff', border: '1.5px solid rgba(3,131,144,0.3)', borderRadius: 14, padding: '4px 16px', marginBottom: 10 }}>
      <span style={{ fontSize: 18, color: '#595959', fontWeight: 300 }}>€</span>
      <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} min={0}
        style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 22, fontWeight: 500, color: '#1A1A1A', width: '100%', padding: '13px 0' }} />
    </div>
  )

  const btnNext = (label: string, onClick: () => void) => (
    <button onClick={onClick} style={{ background: TEAL, color: '#fff', border: 'none', borderRadius: 12, padding: '13px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
      {label} →
    </button>
  )

  const btnBack = () => (
    <button onClick={() => setStep(s => s - 1)} style={{ background: '#F0F7F8', border: '1px solid rgba(3,131,144,0.2)', color: '#595959', borderRadius: 12, padding: '13px 20px', fontSize: 14, cursor: 'pointer' }}>
      {t.back}
    </button>
  )

  const hint = (txt: string) => (
    <div style={{ fontSize: 12, color: '#595959', lineHeight: 1.6, marginBottom: 20 }}>{txt}</div>
  )

  const stepLabel = (n: number, title: string) => (
    <>
      <div style={{ fontSize: 11, color: TEAL, textTransform: 'uppercase' as const, letterSpacing: '2px', fontWeight: 600, marginBottom: 8 }}>{t.stepWord} {n}</div>
      <div style={{ fontSize: 22, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.3, marginBottom: 8 }}>{title}</div>
    </>
  )

  const calculate = (): Result => {
    const inc = parseFloat(income) || 0
    const pInc = parseFloat(partnerIncome) || 0
    const ren = parseFloat(rent) || 0
    const elec = parseFloat(electricity) || 0
    const oth = parseFloat(other) || 0
    const adj = adjIncome(inc, incomeType)
    const adjPart = hasPartner ? adjIncome(pInc, partnerIncomeType) : 0
    const total = adj + adjPart
    const required = (hasPartner ? MIN_COUPLE : MIN_SINGLE) + children * MIN_CHILD
    const rentDed = Math.max(0, ren - FREE_STATION)
    const net = total - rentDed - elec - oth
    const ok = net >= required
    const shortage = Math.max(0, required - net)
    const savings = shortage * 12 * 1.1
    return { ok, total, net, required, shortage, savings, adj, adjP: adjPart, rentDed, elec, oth }
  }

  const generatePDF = async (r: Result) => {
    const p = t.pdf
    const date = new Date().toLocaleDateString(LOCALE_MAP[lang] || 'uk-UA', { day: '2-digit', month: 'long', year: 'numeric' })

    const logoSrc = await fetchLogoAsDataUrl()

    const el = document.createElement('div')
    el.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;font-family:Arial,sans-serif;padding:0'

    const compositionWord = hasPartner ? p.coupleWord : p.personWord
    const minBmiText = `${p.minBmiPrefix} (${compositionWord}${children > 0 ? ` + ${children} ${p.childWord}` : ''})`

    el.innerHTML = `
      <div style="background:#ffffff;padding:14px 28px 12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #E6F4F5">
        <img src="${logoSrc}" style="width:140px;height:41.8px;object-fit:contain;object-position:left center;display:block" alt="QLIXA"/>
        <div style="text-align:right">
          <div style="font-size:10px;color:#595959">${p.docTitle}</div>
          <div style="font-size:11px;color:#038390;font-weight:700">qlixa.eu</div>
        </div>
      </div>
      <div style="height:2px;background:#038390"></div>

      <div style="padding:24px 28px">
        <div style="font-size:20px;font-weight:700;color:#1A1A1A;margin-bottom:4px">${p.docTitle}</div>
        <div style="font-size:11px;color:#888;margin-bottom:20px">${p.generatedOn} ${date}</div>

        <div style="background:${r.ok ? '#E8F8F0' : '#FFF8E7'};border-radius:10px;padding:14px 18px;margin-bottom:20px;display:flex;align-items:center;gap:14px">
          <div style="width:36px;height:36px;border-radius:10px;background:${r.ok ? '#10B981' : '#F59E0B'};display:flex;align-items:center;justify-content:center;font-size:18px;color:#fff;font-weight:700;flex-shrink:0;line-height:1;padding-bottom:1px">${r.ok ? '✓' : '!'}</div>
          <div>
            <div style="font-size:15px;font-weight:700;color:${r.ok ? '#065F46' : '#92400E'}">${r.ok ? p.statusOkTitle : p.statusNotOkTitle}</div>
            <div style="font-size:11px;color:${r.ok ? '#047857' : '#B45309'};margin-top:2px">${r.ok ? p.statusOkDesc : p.statusNotOkDesc}</div>
          </div>
        </div>

        <div style="font-size:10px;font-weight:700;color:#038390;letter-spacing:1px;margin-bottom:8px">${p.breakdownLabel}</div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
          ${[
            [incomeType === 'employed' ? p.yourIncomeEmployed : p.yourIncomeSelf, `€ ${fmt(r.adj, lang)}`],
            ...(hasPartner && r.adjP > 0 ? [[partnerIncomeType === 'employed' ? p.partnerIncomeEmployed : p.partnerIncomeSelf, `€ ${fmt(r.adjP, lang)}`]] : []),
            [p.rentDeduction, `− € ${fmt(r.rentDed, lang)}`],
            ...(r.elec > 0 ? [[p.electricityLabel, `− € ${fmt(r.elec, lang)}`]] : []),
            ...(r.oth > 0 ? [[p.otherLabel, `− € ${fmt(r.oth, lang)}`]] : []),
          ].map(([l, v], i) => `
            <tr style="background:${i % 2 === 0 ? '#F0F7F8' : '#ffffff'}">
              <td style="padding:9px 12px;font-size:12px;color:#595959">${l}</td>
              <td style="padding:9px 12px;font-size:12px;font-weight:700;color:#1A1A1A;text-align:right">${v}</td>
            </tr>
          `).join('')}
          <tr style="background:#038390">
            <td style="padding:10px 12px;font-size:13px;font-weight:700;color:#fff">${p.afterExpenses}</td>
            <td style="padding:10px 12px;font-size:13px;font-weight:700;color:#fff;text-align:right">€ ${fmt(r.net, lang)}</td>
          </tr>
          <tr style="background:#F0F7F8">
            <td style="padding:9px 12px;font-size:12px;color:#595959">${minBmiText}</td>
            <td style="padding:9px 12px;font-size:12px;font-weight:700;color:#1A1A1A;text-align:right">€ ${fmt(r.required, lang)}</td>
          </tr>
          <tr style="background:${r.ok ? '#E8F8F0' : '#FFF8E7'}">
            <td style="padding:10px 12px;font-size:13px;font-weight:700;color:${r.ok ? '#065F46' : '#92400E'}">${r.ok ? p.remainderOk : p.remainderShort}</td>
            <td style="padding:10px 12px;font-size:13px;font-weight:700;color:${r.ok ? '#10B981' : '#F59E0B'};text-align:right">€ ${r.ok ? fmt(r.net - r.required, lang) : fmt(r.shortage, lang)}</td>
          </tr>
        </table>

        ${!r.ok ? `
        <div style="background:#FFF8E7;border:1px solid rgba(245,166,35,0.3);border-radius:10px;padding:20px 18px;margin-bottom:20px">
          <div style="font-size:10px;color:#B45309;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">${p.recommendedLabel}</div>
          <div style="font-size:26px;font-weight:700;color:#F59E0B;margin-bottom:8px;line-height:1.3">€ ${fmt(r.savings, lang)}</div>
          <div style="font-size:10px;color:#888;margin-top:6px;line-height:1.5">${p.recommendedNote}<br/>${p.recommendedNote2}</div>
        </div>` : ''}

        <div style="font-size:9px;color:#aaa;line-height:1.6;border-top:1px solid #E6F4F5;padding-top:14px">
          ${p.disclaimer}
        </div>
      </div>

    `

    document.body.appendChild(el)

    loadPDFScripts().then(() => {
      const h2c = (window as any).html2canvas
      const { jsPDF } = (window as any).jspdf

      h2c(el, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff', logging: false }).then((contentCanvas: HTMLCanvasElement) => {

        const footerEl = document.createElement('div')
        footerEl.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;font-family:Arial,sans-serif'
        footerEl.innerHTML = `
          <div style="background:#ffffff;padding:10px 28px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid #E6F4F5">
            <img src="${logoSrc}" style="width:100px;height:29.9px;object-fit:contain;object-position:left center;display:block" alt="QLIXA"/>
            <div style="font-size:10px;color:#595959">${p.footerTagline} &nbsp;|&nbsp; qlixa.eu</div>
          </div>
        `
        document.body.appendChild(footerEl)

        h2c(footerEl, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff', logging: false }).then((footerCanvas: HTMLCanvasElement) => {
          document.body.removeChild(el)
          document.body.removeChild(footerEl)

          const pdf = new jsPDF({ format: 'a4', unit: 'mm' })
          const PW = 210

          const contentImg = contentCanvas.toDataURL('image/png')
          const contentH = (contentCanvas.height * PW) / contentCanvas.width
          pdf.addImage(contentImg, 'PNG', 0, 0, PW, contentH)

          const footerImg = footerCanvas.toDataURL('image/png')
          const footerH = (footerCanvas.height * PW) / footerCanvas.width
          pdf.addImage(footerImg, 'PNG', 0, contentH, PW, footerH)

          pdf.save(p.filename)
        })
      })
    })
  }

  const rentStep = hasPartner ? 6 : 5
  const elecStep = hasPartner ? 7 : 6
  const otherStep = hasPartner ? 8 : 7

  const wrapStyle: React.CSSProperties = {
    background: '#ffffff', borderRadius: 20, overflow: 'hidden',
    border: '2px solid rgba(3,131,144,0.25)',
    boxShadow: '0 8px 40px rgba(3,131,144,0.12)',
    maxWidth: '75%', margin: '0 auto',
  }

  const headerStyle: React.CSSProperties = {
    background: '#F0F7F8', padding: '14px 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    borderBottom: '1.5px solid rgba(3,131,144,0.15)'
  }

  const mainStyle: React.CSSProperties = {
    padding: '32px', flex: 1, display: 'flex',
    flexDirection: 'column', justifyContent: 'center', minHeight: 340
  }

  const renderStep = () => {
    if (step === 0) return (
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' as const, marginBottom: 18 }}>
          <div style={{ flex: '1 1 200px', minWidth: 180 }}>
            <div style={{ fontSize: 10, color: TEAL, textTransform: 'uppercase' as const, letterSpacing: '1.5px', fontWeight: 600, marginBottom: 8 }}>{t.step0.badge}</div>
            <div style={{ fontSize: 'clamp(18px,2.2vw,24px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.15, marginBottom: 14 }}>
              {t.step0.titleBefore}<span style={{ color: TEAL }}>{t.step0.titleEm}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <IconCircle><CalculatorIcon /></IconCircle>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', marginBottom: 1 }}>{t.step0.f1t}</div>
                  <div style={{ fontSize: 11, color: '#595959' }}>{t.step0.f1d}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <IconCircle><ShieldCheckIcon /></IconCircle>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', marginBottom: 1 }}>{t.step0.f2t}</div>
                  <div style={{ fontSize: 11, color: '#595959' }}>{t.step0.f2d}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <IconCircle><PieChartIcon /></IconCircle>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', marginBottom: 1 }}>{t.step0.f3t}</div>
                  <div style={{ fontSize: 11, color: '#595959' }}>{t.step0.f3d}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: '0 0 130px', minWidth: 110, display: 'flex', justifyContent: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/rwr-karte/calculator-illustration.png" alt="RWR+" style={{ width: '100%', maxWidth: 130, height: 'auto', objectFit: 'contain' as const }} />
          </div>
        </div>

        <div style={{ background: '#FFF8E7', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#595959', lineHeight: 1.5, marginBottom: 20 }}>
          {t.step0.discLine1}<br />
          {t.step0.discLine2}
        </div>
        <button onClick={() => setStep(1)} style={{ width: '100%', background: TEAL, color: '#fff', border: 'none', borderRadius: 12, padding: '15px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          {t.step0.startBtn}
        </button>
      </div>
    )

    if (step === 1) return (
      <div style={mainStyle}>
        {stepLabel(1, t.step1.title)}
        {hint(t.step1.hint)}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {[
            { label: t.step1.onlyMe, sub: t.step1.min(fmt(MIN_SINGLE, lang)), val: false, icon: '🧑' },
            { label: t.step1.withPartner, sub: t.step1.min(fmt(MIN_COUPLE, lang)), val: true, icon: '👫' }
          ].map(opt => (
            <button key={String(opt.val)} onClick={() => { setHasPartner(opt.val); setStep(2) }}
              style={{ background: hasPartner === opt.val ? 'rgba(3,131,144,0.1)' : '#F0F7F8', border: `1px solid ${hasPartner === opt.val ? TEAL : 'rgba(3,131,144,0.2)'}`, borderRadius: 14, padding: 16, cursor: 'pointer', textAlign: 'left' as const, transition: 'all 0.2s' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{opt.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A', marginBottom: 4 }}>{opt.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{opt.sub}</div>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>{btnBack()}</div>
      </div>
    )

    if (step === 2) return (
      <div style={mainStyle}>
        {stepLabel(2, t.step2.title)}
        {hint(t.step2.hint(fmt(MIN_CHILD, lang)))}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 24 }}>
          {[0,1,2,3,4].map(n => (
            <button key={n} onClick={() => setChildren(n)}
              style={{ width: 52, height: 52, borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                background: children === n ? TEAL : '#F0F7F8',
                color: children === n ? '#fff' : '#1A1A1A', border: `1px solid ${children === n ? TEAL : 'rgba(3,131,144,0.2)'}` }}>
              {n === 0 ? '0' : n}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>{btnBack()}{btnNext(t.next, () => setStep(3))}</div>
      </div>
    )

    if (step === 3) return (
      <div style={mainStyle}>
        {stepLabel(3, t.step3.title)}
        {typeToggle(incomeType, setIncomeType)}
        {hint(incomeType === 'employed' ? t.step3.hintEmployed : t.step3.hintSelf)}
        <div style={{ display: 'flex', gap: 8 }}>{btnBack()}{btnNext(t.next, () => setStep(4))}</div>
      </div>
    )

    if (step === 4) return (
      <div style={mainStyle}>
        {stepLabel(4, t.step4.title)}
        {fieldInput(income, setIncome, incomeType === 'self' ? t.step4.placeholderSelf : t.step4.placeholderEmployed)}
        {hint(incomeType === 'employed' ? t.step4.hintEmployed : t.step4.hintSelf)}
        <div style={{ display: 'flex', gap: 8 }}>
          {btnBack()}
          {btnNext(t.next, () => {
            if (!income || parseFloat(income) <= 0) { alert(t.step4.alertMissing); return }
            setStep(hasPartner ? 5 : rentStep)
          })}
        </div>
      </div>
    )

    if (step === 5 && hasPartner) return (
      <div style={mainStyle}>
        {stepLabel(5, t.step5.title)}
        {typeToggle(partnerIncomeType, setPartnerIncomeType)}
        {fieldInput(partnerIncome, setPartnerIncome, partnerIncomeType === 'self' ? t.step5.placeholderSelf : t.step5.placeholderEmployed)}
        {hint(partnerIncomeType === 'employed' ? t.step5.hintEmployed : t.step5.hintSelf)}
        <div style={{ display: 'flex', gap: 8 }}>
          {btnBack()}
          {btnNext(t.next, () => {
            if (!partnerIncome || parseFloat(partnerIncome) <= 0) { alert(t.step5.alertMissing); return }
            setStep(rentStep)
          })}
        </div>
      </div>
    )

    if (step === rentStep) return (
      <div style={mainStyle}>
        {stepLabel(rentStep, t.stepRent.title)}
        {fieldInput(rent, setRent, t.stepRent.placeholder)}
        {hint(t.stepRent.hint)}
        <div style={{ display: 'flex', gap: 8 }}>
          {btnBack()}
          {btnNext(t.next, () => {
            if (rent === '') { alert(t.stepRent.alertMissing); return }
            setStep(elecStep)
          })}
        </div>
      </div>
    )

    if (step === elecStep) return (
      <div style={mainStyle}>
        {stepLabel(elecStep, t.stepElec.title)}
        {fieldInput(electricity, setElectricity, t.stepElec.placeholder)}
        {hint(t.stepElec.hint)}
        <div style={{ display: 'flex', gap: 8 }}>{btnBack()}{btnNext(t.next, () => setStep(otherStep))}</div>
      </div>
    )

    if (step === otherStep) return (
      <div style={mainStyle}>
        {stepLabel(otherStep, t.stepOther.title)}
        {fieldInput(other, setOther, t.stepOther.placeholder)}
        {hint(t.stepOther.hint)}
        <div style={{ display: 'flex', gap: 8 }}>
          {btnBack()}
          {btnNext(t.stepOther.calcBtn, () => { setResult(calculate()); setStep(99) })}
        </div>
      </div>
    )

    if (step === 99 && result) return (
      <div style={{ padding: 28, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: result.ok ? 'rgba(16,185,129,0.2)' : 'rgba(245,166,35,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
            {result.ok ? '✓' : '!'}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>{result.ok ? t.result.okTitle : t.result.notOkTitle}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
              {result.ok ? t.result.okDesc : t.result.notOkDesc}
            </div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid rgba(3,131,144,0.15)', borderRadius: 14, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '1.5px', color: '#038390', marginBottom: 12 }}>{t.result.breakdown}</div>
          {[
            [incomeType === 'employed' ? t.result.yourIncomeEmployed : t.result.yourIncomeSelf, `€ ${fmt(result.adj, lang)}`],
            ...(hasPartner && result.adjP > 0 ? [[partnerIncomeType === 'employed' ? t.result.partnerIncomeEmployed : t.result.partnerIncomeSelf, `€ ${fmt(result.adjP, lang)}`]] : []),
            [t.result.rentDeduction, `− € ${fmt(result.rentDed, lang)}`],
            ...(result.elec > 0 ? [[t.result.electricityLabel, `− € ${fmt(result.elec, lang)}`]] : []),
            ...(result.oth > 0 ? [[t.result.otherLabel, `− € ${fmt(result.oth, lang)}`]] : []),
          ].map(([l, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(3,131,144,0.1)', fontSize: 13 }}>
              <span style={{ color: '#595959' }}>{l}</span>
              <span style={{ color: '#1A1A1A', fontWeight: 500 }}>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 5px', fontSize: 13 }}>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{t.result.afterExpenses}</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: result.ok ? '#10B981' : '#F59E0B' }}>€ {fmt(result.net, lang)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span style={{ color: '#595959' }}>{t.result.minBmi}</span>
            <span style={{ color: '#595959' }}>€ {fmt(result.required, lang)}</span>
          </div>
        </div>

        {!result.ok && (
          <div style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 14, padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: 'rgba(245,166,35,0.7)', textTransform: 'uppercase' as const, letterSpacing: '1px', marginBottom: 4 }}>{t.result.recommendedAmount}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#F59E0B' }}>€ {fmt(result.savings, lang)}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{t.result.recommendedNote}</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
          <button onClick={() => { generatePDF(result) }}
            style={{ background: TEAL, color: '#fff', border: 'none', borderRadius: 10, padding: '11px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            {t.result.downloadPdf}
          </button>
          <button onClick={() => { setStep(0); setIncome(''); setPartnerIncome(''); setRent(''); setElectricity('0'); setOther('0'); setResult(null); setHasPartner(null); setChildren(0) }}
            style={{ background: '#F0F7F8', color: '#595959', border: '1px solid rgba(3,131,144,0.2)', borderRadius: 10, padding: '11px 18px', fontSize: 13, cursor: 'pointer' }}>
            {t.result.recalculate}
          </button>
        </div>
      </div>
    )

    return null
  }

  const showSidebar = step > 0 && step < 99

  return (
    <div style={wrapStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logos/favicon-planet-origin.svg" alt="QLIXA" style={{ width: 40, height: 40, objectFit: 'contain' as const }}/>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', letterSpacing: '0.5px', lineHeight: 1 }}>{t.headerTitle}</div>
        </div>
        {step > 0 && step < 99 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 160 }}>{progress(step)}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', minWidth: 32 }}>{step} / {totalSteps}</div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {renderStep()}
        {showSidebar && sidebar}
      </div>
    </div>
  )
}
