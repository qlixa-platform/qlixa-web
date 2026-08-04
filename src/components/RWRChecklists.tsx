'use client'
import { loadPDFScripts, fetchLogoAsDataUrl } from '@/utils/generatePDF'

type ChecklistType = 'employed' | 'self' | 'kids'

// Переклади PDF-чеклістів — UA + RU (EN/DE додамо наступними кроками)
const CHECKLIST_TEXT: Record<string, any> = {
  UA: {
    uiIntro: 'Підготовка документів для подачі на RWR+ карту',
    uiDescBox: 'Використовуйте цей чекліст під час підготовки документів для подачі на RWR+ карту. Відмічайте готові документи та робіть власні нотатки.',
    uiDateReceived: 'Дата отримання',
    uiValidUntil: 'Строк дії',
    uiNotesLine: 'Нотатки: ________________________________________',
    uiKidsNotesTitle: 'Нотатки щодо документів дитини',
    uiStartDate: 'Дата початку підготовки: ___________',
    uiSubmitDate: 'Дата подачі документів: ___________',
    uiMyNotes: 'Мої нотатки:',
    footerTagline: 'Твій цифровий бізнес-помічник в Австрії',
    configs: {
      employed: {
        title: 'Чекліст документів', subtitle: 'Для найманих працівників', filename: 'QLIXA_Checklist_Naymanyi.pdf',
        sections: [
          { header: 'ОСНОВНІ ДОКУМЕНТИ', items: [
            { name: 'Посвідчення переміщеної особи (блакитна картка)', note: '' },
            { name: 'Закордонний паспорт', note: 'всі сторінки, копії + оригінал' },
            { name: 'Копії всіх попередніх Blau Card', note: 'за всі роки' },
            { name: 'Свідоцтво про народження', note: 'оригінал + переклад + апостиль' },
            { name: 'Довідка про несудимість України', note: 'переклад нім., апостиль не потрібен' },
            { name: 'Австрійська довідка про несудимість', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'оригінал + копія' },
            { name: 'Паспортне фото', note: '45 × 35 мм, не старше 6 місяців' },
            { name: 'Meldezettel', note: 'оригінал + копія' },
            { name: 'Договір оренди / підтвердження житла', note: 'оригінал + копія' },
            { name: 'Підтвердження знання німецької мови', note: 'або документи для Integrationsvereinbarung' },
            { name: 'Selbstauskunft KSV', note: 'безкоштовна довідка' },
          ]},
          { header: 'ПІДТВЕРДЖЕННЯ ДОХОДУ', items: [
            { name: 'Трудовий договір', note: '' },
            { name: 'Останні розрахункові листки (Lohnzettel)', note: '' },
            { name: 'Підтвердження заробітної плати від роботодавця', note: '' },
            { name: 'Банківська виписка', note: 'за потреби' },
            { name: 'Підтвердження оплати оренди та комунальних', note: 'за потреби, виписка за 3 місяці' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'якщо запитують' },
          ]},
        ],
      },
      self: {
        title: 'Чекліст документів', subtitle: 'Для самозайнятих', filename: 'QLIXA_Checklist_Samozaynyati.pdf',
        sections: [
          { header: 'ОСНОВНІ ДОКУМЕНТИ', items: [
            { name: 'Посвідчення переміщеної особи (блакитна картка)', note: '' },
            { name: 'Закордонний паспорт', note: 'всі сторінки, копії + оригінал' },
            { name: 'Копії всіх попередніх Blau Card', note: 'за всі роки' },
            { name: 'Свідоцтво про народження', note: 'оригінал + переклад + апостиль' },
            { name: 'Довідка про несудимість України', note: 'переклад нім., апостиль не потрібен' },
            { name: 'Австрійська довідка про несудимість', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'оригінал + копія' },
            { name: 'Паспортне фото', note: '45 × 35 мм, не старше 6 місяців' },
            { name: 'Meldezettel', note: 'оригінал + копія' },
            { name: 'Договір оренди / підтвердження житла', note: 'оригінал + копія' },
            { name: 'Підтвердження знання німецької мови', note: 'або документи для Integrationsvereinbarung' },
            { name: 'Selbstauskunft KSV', note: 'безкоштовна довідка' },
          ]},
          { header: 'ПІДТВЕРДЖЕННЯ ДОХОДУ', items: [
            { name: 'Einkommensteuerbescheid', note: 'якщо вже отриманий — з FinanzOnline' },
            { name: 'Unbedenklichkeitsbescheinigung Finanzamt', note: 'довідка про відсутність заборгованостей' },
            { name: 'Unbedenklichkeitsbescheinigung SVS', note: 'довідка від соціального страхування' },
            { name: 'Власна довідка про дохід (Gewinnbestätigung)', note: 'якщо Einkommensteuerbescheid відсутній' },
            { name: 'Банківська виписка — фінансова подушка', note: '' },
            { name: 'Банківська виписка — оренда та комунальні', note: 'за потреби, за 3 місяці' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'якщо запитують' },
          ]},
        ],
      },
      kids: {
        title: 'Чекліст документів', subtitle: 'Документи для дитини', filename: 'QLIXA_Checklist_Dity.pdf',
        sections: [
          { header: 'ДОКУМЕНТИ НА ДИТИНУ', items: [
            { name: 'Свідоцтво про народження', note: 'оригінал + переклад + апостиль' },
            { name: 'Закордонний паспорт', note: 'всі сторінки, копії + оригінал' },
            { name: 'Посвідчення переміщеної особи (блакитна картка)', note: 'всі попередні за всі роки' },
            { name: 'Паспортне фото', note: '45 × 35 мм, не старше 6 місяців' },
            { name: 'Meldezettel', note: 'оригінал + копія' },
            { name: 'E-card', note: 'оригінал + копія' },
            { name: 'Schulbesuchsbestätigung', note: 'довідка про відвідування школи' },
            { name: 'Останній шкільний табель (Zeugnis)', note: 'оцінка з нім. мови: 4 і нижче' },
            { name: "Документи що підтверджують родинні зв'язки", note: 'якщо необхідно — ориг. + перекл. + апостиль' },
          ]},
        ],
      },
    },
  },
  RU: {
    uiIntro: 'Подготовка документов для подачи на RWR+ карту',
    uiDescBox: 'Используйте этот чек-лист при подготовке документов для подачи на RWR+ карту. Отмечайте готовые документы и делайте собственные заметки.',
    uiDateReceived: 'Дата получения',
    uiValidUntil: 'Срок действия',
    uiNotesLine: 'Заметки: ________________________________________',
    uiKidsNotesTitle: 'Заметки по документам ребёнка',
    uiStartDate: 'Дата начала подготовки: ___________',
    uiSubmitDate: 'Дата подачи документов: ___________',
    uiMyNotes: 'Мои заметки:',
    footerTagline: 'Твой цифровой бизнес-помощник в Австрии',
    configs: {
      employed: {
        title: 'Чек-лист документов', subtitle: 'Для наёмных работников', filename: 'QLIXA_Checklist_Naymanyi.pdf',
        sections: [
          { header: 'ОСНОВНЫЕ ДОКУМЕНТЫ', items: [
            { name: 'Удостоверение перемещённого лица (голубая карта)', note: '' },
            { name: 'Загранпаспорт', note: 'все страницы, копии + оригинал' },
            { name: 'Копии всех предыдущих Blau Card', note: 'за все годы' },
            { name: 'Свидетельство о рождении', note: 'оригинал + перевод + апостиль' },
            { name: 'Справка о несудимости Украины', note: 'перевод на нем., апостиль не нужен' },
            { name: 'Австрийская справка о несудимости', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'оригинал + копия' },
            { name: 'Фото на документы', note: '45 × 35 мм, не старше 6 месяцев' },
            { name: 'Meldezettel', note: 'оригинал + копия' },
            { name: 'Договор аренды / подтверждение жилья', note: 'оригинал + копия' },
            { name: 'Подтверждение знания немецкого языка', note: 'или документы для Integrationsvereinbarung' },
            { name: 'Selbstauskunft KSV', note: 'бесплатная справка' },
          ]},
          { header: 'ПОДТВЕРЖДЕНИЕ ДОХОДА', items: [
            { name: 'Трудовой договор', note: '' },
            { name: 'Последние расчётные листки (Lohnzettel)', note: '' },
            { name: 'Подтверждение зарплаты от работодателя', note: '' },
            { name: 'Банковская выписка', note: 'при необходимости' },
            { name: 'Подтверждение оплаты аренды и коммунальных', note: 'при необходимости, выписка за 3 месяца' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'если запрашивают' },
          ]},
        ],
      },
      self: {
        title: 'Чек-лист документов', subtitle: 'Для самозанятых', filename: 'QLIXA_Checklist_Samozaynyati.pdf',
        sections: [
          { header: 'ОСНОВНЫЕ ДОКУМЕНТЫ', items: [
            { name: 'Удостоверение перемещённого лица (голубая карта)', note: '' },
            { name: 'Загранпаспорт', note: 'все страницы, копии + оригинал' },
            { name: 'Копии всех предыдущих Blau Card', note: 'за все годы' },
            { name: 'Свидетельство о рождении', note: 'оригинал + перевод + апостиль' },
            { name: 'Справка о несудимости Украины', note: 'перевод на нем., апостиль не нужен' },
            { name: 'Австрийская справка о несудимости', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'оригинал + копия' },
            { name: 'Фото на документы', note: '45 × 35 мм, не старше 6 месяцев' },
            { name: 'Meldezettel', note: 'оригинал + копия' },
            { name: 'Договор аренды / подтверждение жилья', note: 'оригинал + копия' },
            { name: 'Подтверждение знания немецкого языка', note: 'или документы для Integrationsvereinbarung' },
            { name: 'Selbstauskunft KSV', note: 'бесплатная справка' },
          ]},
          { header: 'ПОДТВЕРЖДЕНИЕ ДОХОДА', items: [
            { name: 'Einkommensteuerbescheid', note: 'если уже получен — из FinanzOnline' },
            { name: 'Unbedenklichkeitsbescheinigung Finanzamt', note: 'справка об отсутствии задолженностей' },
            { name: 'Unbedenklichkeitsbescheinigung SVS', note: 'справка от социального страхования' },
            { name: 'Собственная справка о доходе (Gewinnbestätigung)', note: 'если Einkommensteuerbescheid отсутствует' },
            { name: 'Банковская выписка — финансовая подушка', note: '' },
            { name: 'Банковская выписка — аренда и коммунальные', note: 'при необходимости, за 3 месяца' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'если запрашивают' },
          ]},
        ],
      },
      kids: {
        title: 'Чек-лист документов', subtitle: 'Документы для ребёнка', filename: 'QLIXA_Checklist_Dity.pdf',
        sections: [
          { header: 'ДОКУМЕНТЫ НА РЕБЁНКА', items: [
            { name: 'Свидетельство о рождении', note: 'оригинал + перевод + апостиль' },
            { name: 'Загранпаспорт', note: 'все страницы, копии + оригинал' },
            { name: 'Удостоверение перемещённого лица (голубая карта)', note: 'все предыдущие за все годы' },
            { name: 'Фото на документы', note: '45 × 35 мм, не старше 6 месяцев' },
            { name: 'Meldezettel', note: 'оригинал + копия' },
            { name: 'E-card', note: 'оригинал + копия' },
            { name: 'Schulbesuchsbestätigung', note: 'справка о посещении школы' },
            { name: 'Последний школьный табель (Zeugnis)', note: 'оценка по нем. языку: 4 и ниже' },
            { name: 'Документы, подтверждающие родственные связи', note: 'если необходимо — ориг. + перевод + апостиль' },
          ]},
        ],
      },
    },
  },
  EN: {
    uiIntro: 'Preparing documents for your RWR+ card application',
    uiDescBox: 'Use this checklist while preparing documents for your RWR+ card application. Check off completed documents and add your own notes.',
    uiDateReceived: 'Date received',
    uiValidUntil: 'Valid until',
    uiNotesLine: 'Notes: ________________________________________',
    uiKidsNotesTitle: "Notes on the child's documents",
    uiStartDate: 'Preparation start date: ___________',
    uiSubmitDate: 'Submission date: ___________',
    uiMyNotes: 'My notes:',
    footerTagline: 'Your digital business assistant in Austria',
    configs: {
      employed: {
        title: 'Document Checklist', subtitle: 'For Employees', filename: 'QLIXA_Checklist_Employees.pdf',
        sections: [
          { header: 'MAIN DOCUMENTS', items: [
            { name: 'Displaced persons ID (Blue Card)', note: '' },
            { name: 'Passport', note: 'all pages, copies + original' },
            { name: 'Copies of all previous Blau Cards', note: 'for every year' },
            { name: 'Birth certificate', note: 'original + translation + apostille' },
            { name: 'Ukrainian criminal record certificate', note: 'German translation, no apostille needed' },
            { name: 'Austrian criminal record certificate', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'original + copy' },
            { name: 'Passport photo', note: '45 × 35 mm, no older than 6 months' },
            { name: 'Meldezettel', note: 'original + copy' },
            { name: 'Rental agreement / proof of housing', note: 'original + copy' },
            { name: 'Proof of German language skills', note: 'or documents for Integrationsvereinbarung' },
            { name: 'Selbstauskunft KSV', note: 'free certificate' },
          ]},
          { header: 'INCOME CONFIRMATION', items: [
            { name: 'Employment contract', note: '' },
            { name: 'Latest payslips (Lohnzettel)', note: '' },
            { name: 'Salary confirmation from employer', note: '' },
            { name: 'Bank statement', note: 'if needed' },
            { name: 'Confirmation of rent and utility payments', note: 'if needed, statement for 3 months' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'if requested' },
          ]},
        ],
      },
      self: {
        title: 'Document Checklist', subtitle: 'For the Self-Employed', filename: 'QLIXA_Checklist_SelfEmployed.pdf',
        sections: [
          { header: 'MAIN DOCUMENTS', items: [
            { name: 'Displaced persons ID (Blue Card)', note: '' },
            { name: 'Passport', note: 'all pages, copies + original' },
            { name: 'Copies of all previous Blau Cards', note: 'for every year' },
            { name: 'Birth certificate', note: 'original + translation + apostille' },
            { name: 'Ukrainian criminal record certificate', note: 'German translation, no apostille needed' },
            { name: 'Austrian criminal record certificate', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'original + copy' },
            { name: 'Passport photo', note: '45 × 35 mm, no older than 6 months' },
            { name: 'Meldezettel', note: 'original + copy' },
            { name: 'Rental agreement / proof of housing', note: 'original + copy' },
            { name: 'Proof of German language skills', note: 'or documents for Integrationsvereinbarung' },
            { name: 'Selbstauskunft KSV', note: 'free certificate' },
          ]},
          { header: 'INCOME CONFIRMATION', items: [
            { name: 'Einkommensteuerbescheid', note: 'if already received — from FinanzOnline' },
            { name: 'Unbedenklichkeitsbescheinigung Finanzamt', note: 'certificate of no outstanding debts' },
            { name: 'Unbedenklichkeitsbescheinigung SVS', note: 'certificate from social insurance' },
            { name: 'Self-prepared income statement (Gewinnbestätigung)', note: 'if Einkommensteuerbescheid is not available' },
            { name: 'Bank statement — financial cushion', note: '' },
            { name: 'Bank statement — rent and utilities', note: 'if needed, for 3 months' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'if requested' },
          ]},
        ],
      },
      kids: {
        title: 'Document Checklist', subtitle: "Documents for the Child", filename: 'QLIXA_Checklist_Children.pdf',
        sections: [
          { header: "CHILD'S DOCUMENTS", items: [
            { name: 'Birth certificate', note: 'original + translation + apostille' },
            { name: 'Passport', note: 'all pages, copies + original' },
            { name: 'Displaced persons ID (Blue Card)', note: 'all previous, for every year' },
            { name: 'Passport photo', note: '45 × 35 mm, no older than 6 months' },
            { name: 'Meldezettel', note: 'original + copy' },
            { name: 'E-card', note: 'original + copy' },
            { name: 'Schulbesuchsbestätigung', note: 'school attendance confirmation' },
            { name: 'Latest school report card (Zeugnis)', note: 'German grade: 4 or lower' },
            { name: 'Documents confirming family relationship', note: 'if needed — original + translation + apostille' },
          ]},
        ],
      },
    },
  },
  DE: {
    uiIntro: 'Vorbereitung der Dokumente für die RWR+ Kartenantragstellung',
    uiDescBox: 'Nutze diese Checkliste bei der Vorbereitung der Dokumente für die RWR+ Antragstellung. Hake fertige Dokumente ab und mache eigene Notizen.',
    uiDateReceived: 'Erhalten am',
    uiValidUntil: 'Gültig bis',
    uiNotesLine: 'Notizen: ________________________________________',
    uiKidsNotesTitle: 'Notizen zu den Dokumenten des Kindes',
    uiStartDate: 'Beginn der Vorbereitung: ___________',
    uiSubmitDate: 'Datum der Antragstellung: ___________',
    uiMyNotes: 'Meine Notizen:',
    footerTagline: 'Dein digitaler Business-Assistent in Österreich',
    configs: {
      employed: {
        title: 'Dokumenten-Checkliste', subtitle: 'Für Angestellte', filename: 'QLIXA_Checklist_Angestellte.pdf',
        sections: [
          { header: 'GRUNDDOKUMENTE', items: [
            { name: 'Ausweis für Vertriebene (Blau Card)', note: '' },
            { name: 'Reisepass', note: 'alle Seiten, Kopien + Original' },
            { name: 'Kopien aller vorherigen Blau Cards', note: 'für jedes Jahr' },
            { name: 'Geburtsurkunde', note: 'Original + Übersetzung + Apostille' },
            { name: 'Ukrainischer Strafregisterauszug', note: 'deutsche Übersetzung, keine Apostille nötig' },
            { name: 'Österreichischer Strafregisterauszug', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'Original + Kopie' },
            { name: 'Passfoto', note: '45 × 35 mm, nicht älter als 6 Monate' },
            { name: 'Meldezettel', note: 'Original + Kopie' },
            { name: 'Mietvertrag / Wohnrechtsnachweis', note: 'Original + Kopie' },
            { name: 'Nachweis über deutsche Sprachkenntnisse', note: 'oder Unterlagen für die Integrationsvereinbarung' },
            { name: 'Selbstauskunft KSV', note: 'kostenlose Bestätigung' },
          ]},
          { header: 'EINKOMMENSNACHWEIS', items: [
            { name: 'Arbeitsvertrag', note: '' },
            { name: 'Letzte Lohnzettel', note: '' },
            { name: 'Gehaltsbestätigung vom Arbeitgeber', note: '' },
            { name: 'Kontoauszug', note: 'falls erforderlich' },
            { name: 'Bestätigung der Miet- und Betriebskostenzahlungen', note: 'falls erforderlich, Auszug über 3 Monate' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'falls angefragt' },
          ]},
        ],
      },
      self: {
        title: 'Dokumenten-Checkliste', subtitle: 'Für Selbstständige', filename: 'QLIXA_Checklist_Selbststaendige.pdf',
        sections: [
          { header: 'GRUNDDOKUMENTE', items: [
            { name: 'Ausweis für Vertriebene (Blau Card)', note: '' },
            { name: 'Reisepass', note: 'alle Seiten, Kopien + Original' },
            { name: 'Kopien aller vorherigen Blau Cards', note: 'für jedes Jahr' },
            { name: 'Geburtsurkunde', note: 'Original + Übersetzung + Apostille' },
            { name: 'Ukrainischer Strafregisterauszug', note: 'deutsche Übersetzung, keine Apostille nötig' },
            { name: 'Österreichischer Strafregisterauszug', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'Original + Kopie' },
            { name: 'Passfoto', note: '45 × 35 mm, nicht älter als 6 Monate' },
            { name: 'Meldezettel', note: 'Original + Kopie' },
            { name: 'Mietvertrag / Wohnrechtsnachweis', note: 'Original + Kopie' },
            { name: 'Nachweis über deutsche Sprachkenntnisse', note: 'oder Unterlagen für die Integrationsvereinbarung' },
            { name: 'Selbstauskunft KSV', note: 'kostenlose Bestätigung' },
          ]},
          { header: 'EINKOMMENSNACHWEIS', items: [
            { name: 'Einkommensteuerbescheid', note: 'falls bereits erhalten — aus FinanzOnline' },
            { name: 'Unbedenklichkeitsbescheinigung Finanzamt', note: 'Bestätigung ohne offene Forderungen' },
            { name: 'Unbedenklichkeitsbescheinigung SVS', note: 'Bestätigung der Sozialversicherung' },
            { name: 'Eigene Einkommensbestätigung (Gewinnbestätigung)', note: 'falls kein Einkommensteuerbescheid vorhanden' },
            { name: 'Kontoauszug — finanzielles Polster', note: '' },
            { name: 'Kontoauszug — Miete und Betriebskosten', note: 'falls erforderlich, für 3 Monate' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'falls angefragt' },
          ]},
        ],
      },
      kids: {
        title: 'Dokumenten-Checkliste', subtitle: 'Dokumente für das Kind', filename: 'QLIXA_Checklist_Kinder.pdf',
        sections: [
          { header: 'DOKUMENTE FÜR DAS KIND', items: [
            { name: 'Geburtsurkunde', note: 'Original + Übersetzung + Apostille' },
            { name: 'Reisepass', note: 'alle Seiten, Kopien + Original' },
            { name: 'Ausweis für Vertriebene (Blau Card)', note: 'alle vorherigen, für jedes Jahr' },
            { name: 'Passfoto', note: '45 × 35 mm, nicht älter als 6 Monate' },
            { name: 'Meldezettel', note: 'Original + Kopie' },
            { name: 'E-card', note: 'Original + Kopie' },
            { name: 'Schulbesuchsbestätigung', note: 'Bestätigung des Schulbesuchs' },
            { name: 'Letztes Schulzeugnis (Zeugnis)', note: 'Deutschnote: 4 oder besser' },
            { name: 'Nachweis über Verwandtschaftsverhältnisse', note: 'falls nötig — Original + Übersetzung + Apostille' },
          ]},
        ],
      },
    },
  },
}

function getLang() {
  if (typeof window === 'undefined') return 'UA'
  const l = localStorage.getItem('qlixa-lang')
  return l ? l.toUpperCase() : 'UA'
}

async function generateChecklistPDF(type: ChecklistType) {
  const lang = getLang()
  const t = CHECKLIST_TEXT[lang] || CHECKLIST_TEXT.UA
  const config = t.configs[type]

  await loadPDFScripts()
  const logoSrc = await fetchLogoAsDataUrl()

  const h2c = (window as any).html2canvas
  const { jsPDF } = (window as any).jspdf
  const pdf = new jsPDF({ format: 'a4', unit: 'mm' })
  const PW = 210

  const renderBlock = async (html: string, width = 794): Promise<HTMLCanvasElement> => {
    const el = document.createElement('div')
    el.style.cssText = `position:fixed;left:-9999px;top:0;width:${width}px;background:#fff;font-family:Arial,sans-serif`
    el.innerHTML = html
    document.body.appendChild(el)
    const canvas = await h2c(el, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff', logging: false })
    document.body.removeChild(el)
    return canvas
  }

  const addCanvasToPdf = (canvas: HTMLCanvasElement, isFirst: boolean) => {
    if (!isFirst) pdf.addPage()
    const imgData = canvas.toDataURL('image/png')
    const H = (canvas.height * PW) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, PW, H)
  }

  const headerFooterHTML = (title: string, subtitle: string) => `
    <div style="background:#fff;padding:14px 28px 12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #E6F4F5">
      <img src="${logoSrc}" style="width:140px;height:41.8px;object-fit:contain;object-position:left center;display:block" alt="QLIXA"/>
      <div style="text-align:right">
        <div style="font-size:10px;color:#595959">${subtitle}</div>
        <div style="font-size:10px;color:#038390;font-weight:700">qlixa.eu</div>
      </div>
    </div>
    <div style="height:2px;background:#038390"></div>
  `

  const footerHTML = () => `
    <div style="background:#fff;padding:10px 28px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid #E6F4F5;margin-top:12px">
      <img src="${logoSrc}" style="width:100px;height:29.9px;object-fit:contain;object-position:left center;display:block" alt="QLIXA"/>
      <div style="font-size:10px;color:#595959">${t.footerTagline} &nbsp;|&nbsp; qlixa.eu</div>
    </div>
  `

  const itemsHTML = (items: {name:string;note:string}[]) => items.map((item, i) => `
    <div style="background:${i%2===0?'#F0F7F8':'#fff'};padding:10px 14px;border-bottom:1px solid #E6F4F5;display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
      <div style="flex:1">
        <div style="font-size:12px;font-weight:700;color:#1A1A1A;margin-bottom:3px">☐ &nbsp;${item.name}${item.note ? `<span style="font-weight:400;color:#595959;font-size:11px"> (${item.note})</span>` : ''}</div>
        <div style="font-size:10px;color:#888">${t.uiNotesLine}</div>
      </div>
      <div style="flex-shrink:0;font-size:10px;color:#595959">
        <table style="border-collapse:collapse">
          <tr>
            <td style="border:1px solid #E6F4F5;padding:3px 10px;background:#fff;font-size:9px">${t.uiDateReceived}</td>
            <td style="border:1px solid #E6F4F5;padding:3px 10px;background:#fff;font-size:9px">${t.uiValidUntil}</td>
          </tr>
          <tr>
            <td style="border:1px solid #E6F4F5;padding:8px 10px;background:#fff;min-width:80px">&nbsp;</td>
            <td style="border:1px solid #E6F4F5;padding:8px 10px;background:#fff;min-width:80px">&nbsp;</td>
          </tr>
        </table>
      </div>
    </div>
  `).join('')

  // PAGE 1 — header + title + first section
  const page1 = headerFooterHTML(config.title, config.subtitle) + `
    <div style="padding:20px 28px 0">
      <div style="font-size:20px;font-weight:700;color:#1A1A1A;margin-bottom:4px">${config.title}</div>
      <div style="font-size:14px;font-weight:700;color:#038390;margin-bottom:4px">${config.subtitle}</div>
      <div style="font-size:10px;color:#595959;margin-bottom:8px">${t.uiIntro}</div>
      <div style="font-size:10px;color:#888;line-height:1.5;margin-bottom:14px;padding:8px 12px;background:#F0F7F8;border-radius:6px">
        ${t.uiDescBox}
      </div>
      <div style="background:#038390;color:#fff;font-size:10px;font-weight:700;letter-spacing:1px;padding:8px 12px;margin-bottom:0">${config.sections[0].header}</div>
      ${itemsHTML(config.sections[0].items)}
    </div>
  `

  const canvas1 = await renderBlock(page1)
  addCanvasToPdf(canvas1, true)

  // Remaining sections
  for (let i = 1; i < config.sections.length; i++) {
    const section = config.sections[i]
    const pageN = headerFooterHTML(config.title, config.subtitle) + `
      <div style="padding:20px 28px 0">
        <div style="background:#038390;color:#fff;font-size:10px;font-weight:700;letter-spacing:1px;padding:8px 12px;margin-bottom:0">${section.header}</div>
        ${itemsHTML(section.items)}
      </div>
    `
    const canvasN = await renderBlock(pageN)
    addCanvasToPdf(canvasN, false)
  }

  // Kids extra notes page
  if (type === 'kids') {
    const kidsPage = headerFooterHTML(config.title, config.subtitle) + `
      <div style="padding:20px 28px">
        <div style="font-size:13px;font-weight:700;color:#038390;margin-bottom:14px">${t.uiKidsNotesTitle}</div>
        ${Array(6).fill('<div style="border-bottom:1px solid #E6F4F5;margin-bottom:18px;padding-bottom:2px">&nbsp;</div>').join('')}
      </div>
    `
    const kidsCanvas = await renderBlock(kidsPage)
    addCanvasToPdf(kidsCanvas, false)
  }

  // Last page — bottom block
  const lastPage = headerFooterHTML(config.title, config.subtitle) + `
    <div style="padding:20px 28px">
      <div style="border-top:1px solid #E6F4F5;padding-top:14px;font-size:10px;color:#888;line-height:1.8">
        <div style="margin-bottom:12px">${t.uiStartDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${t.uiSubmitDate}</div>
        <div style="font-weight:700;color:#595959;margin-bottom:8px">${t.uiMyNotes}</div>
        ${Array(5).fill('<div style="border-bottom:1px solid #E6F4F5;margin-bottom:16px">&nbsp;</div>').join('')}
      </div>
    </div>
    ${footerHTML()}
  `
  const lastCanvas = await renderBlock(lastPage)
  addCanvasToPdf(lastCanvas, false)

  pdf.save(config.filename)
}

export default function RWRChecklists() {
  return null
}

export { generateChecklistPDF }
