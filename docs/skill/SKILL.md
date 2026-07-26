---
name: qlixa-brand
description: >
  Apply this skill for ALL work on the QLIXA website and platform —
  creating pages, sections, articles, components, PDF documents, UI changes,
  or any design and content work. Contains the complete QLIXA brand system:
  colors, typography, logos, spacing, components, tone of voice, and PDF rules.
  ALWAYS trigger this skill before writing any code, UI, or content for QLIXA.
  Trigger on: new page, new section, new article, new component, PDF generation,
  color/font change, logo usage, style question, brand consistency check.
---

# QLIXA Brand Skill

## ⚠️ RULES BEFORE ANY ACTION

1. **Always explain** what you plan to do and ask for confirmation before writing code
2. **Never change** heights, paddings, margins, card layout without explicit permission
3. **Never change** text content — only fix errors or suggest alternatives
4. **Always propose** 2–3 options if design direction is unclear
5. **New article** = same parameters as existing ones (check first)
6. **Before PDF** = read PDF_MASTER_TEMPLATE.md then BRAND_STYLE_GUIDE.md

---

## Brand in 3 Words
**Простий. Спокійний. Свій.**

Character: молода подруга з чашкою чаю яка вже розібралась і спокійно пояснює.
Audience: українці в Австрії — самозайняті, підприємці, наймані працівники.

---

## Colors — ONLY THESE

```
#038390   Teal          — buttons, links, accents, section headers
#026B76   Teal Dark     — hover states
#1A1A1A   Charcoal      — headings, main text
#FFFFFF   White         — page backgrounds, cards
#F0F7F8   Powder        — section backgrounds, QLIXA-style cards
#E6F4F5   Light Teal    — borders, dividers
#595959   Gray          — secondary text
#9D9D9D   Gray Light    — muted text, navbar/footer links
#F5E642   Yellow        — text highlight marker
#CC0000   Red           — errors, unfilled placeholders
#F59E0B   Amber         — warnings, financial caution results
#10B981   Green         — success states
```

**Rules:**
- Dark `#1A1A1A` bg: max 1 section per page
- Default bg: Powder `#F0F7F8` or White `#FFFFFF`
- NEVER: corporate blue, aggressive red, dull gray as backgrounds

---

## Contrast Rule — ALWAYS FOLLOW

| Background | Text color | Logos to use |
|-----------|-----------|-------------|
| White `#FFFFFF` | `#1A1A1A` | `_black` versions |
| Powder `#F0F7F8` | `#1A1A1A` | `_black` versions |
| Dark `#1A1A1A` | `#FFFFFF` | `_white` versions |

---

## Logos — WHICH FILE WHEN

| File | Use when |
|------|---------|
| `logo-name-slogan_planets_black.svg` | Light bg — Navbar, Footer, PDF header |
| `logo-name-slogan_planets_white.svg` | Dark bg `#1A1A1A` |
| `qlixa-text_planet_black.svg` | Text-only accent, light bg |
| `qlixa-text_planet_white.svg` | Text-only accent, dark bg |
| `favicon-planet-black.svg` | Browser favicon, small icons on light bg |

**Logo sizes:**
- Navbar/Footer: height auto, ~40–50px
- PDF header: width 160px
- PDF footer: width 110px

**Logo in PDF — always fetch dynamically:**
```tsx
const res = await fetch('/logos/logo-name-slogan_planets_black.svg')
const svgText = await res.text()
const svgBlob = new Blob([svgText], { type: 'image/svg+xml' })
const svgUrl = URL.createObjectURL(svgBlob)
// convert SVG → PNG via canvas before jsPDF
```

---

## Typography — ONLY THESE FONTS

| Font | Use |
|------|-----|
| DM Serif Display | H1, H2, H3 — weight 400 only |
| DM Sans | All body, UI, buttons — 400/500/600/700 |
| Caveat | Accent captions, founder signatures |

**Key sizes:**
- H1: `clamp(32px, 4vw, 52px)` DM Serif, letter-spacing: -1px
- H2: `clamp(24px, 3vw, 42px)` DM Serif
- Body: `14–15px` DM Sans, line-height: `1.75–1.85`
- Captions: `10–11px` DM Sans, weight 700, UPPERCASE, letter-spacing: 1.5–2px

---

## Spacing

```
Section padding:     72px clamp(20px,6vw,80px)
Compact padding:     48px clamp(20px,6vw,80px)
Max container:       1200px (main), 860–900px (articles)
Card border-radius:  16–20px
Button border-radius: 10–14px
Badge border-radius: 999px
Card gap:            16–24px
```

---

## Components

### Primary Button
```tsx
background: '#038390', color: '#fff', borderRadius: 12,
padding: '13px 28px', fontWeight: 700, border: 'none'
// hover: background '#026B76', translateY(-2px)
```

### Ghost Button
```tsx
background: '#F0F7F8', border: '1px solid rgba(3,131,144,0.25)',
color: '#038390', borderRadius: 10
```

### QLIXA Card (main style)
```tsx
background: '#F0F7F8', borderRadius: 20,
border: '1px solid rgba(3,131,144,0.10)'
// hover: translateY(-4px), boxShadow: '0 12px 32px rgba(3,131,144,0.12)'
```

### White Card
```tsx
background: '#fff', border: '1px solid #E6F4F5',
borderRadius: 16, boxShadow: '0 4px 16px rgba(53,52,52,0.07)'
```

### Badge
```tsx
fontSize: 11, fontWeight: 700, letterSpacing: '2px',
textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999,
background: 'rgba(3,131,144,0.1)', color: '#038390'
```

### Article Cards
- Cover image: `height: 190px`, `borderRadius: 14`, `objectFit: cover`
- Body (grid page): `minHeight: 200px`, `display: flex`, `flexDirection: column`
- Body (slider): `minHeight: 230px`
- Title: `minHeight: 58–60px`, `flex: none`
- Desc: `flex: 1`

---

## PDF Generation Rules

**Before generating ANY PDF:**
1. Read `docs/PDF_MASTER_TEMPLATE.md` → architecture, components, rules
2. Read `docs/BRAND_STYLE_GUIDE.md` → colors, fonts, logos

**Every PDF must have:**
- Header: white bg | logo left (160px) | teal line 2px | doc title + qlixa.eu right
- Footer: white bg | logo left (110px) | disclaimer right | page number center
- Logo: always fetched dynamically (never hardcoded base64)
- Colors: from Brand Style Guide semantic tokens only
- Fonts: from Brand Style Guide only

**Standard disclaimer in every PDF footer:**
> Документ сформовано платформою QLIXA. Інформація має виключно інформаційний характер та створена автоматично на основі введених користувачем даних. Документ не є офіційним рішенням державного органу, юридичною консультацією або податковим висновком.

---

## Tone of Voice

✅ Write "ти" (not "Ви"), warm friendly tone, 1–2 emoji per block
✅ Simple sentences, no jargon without explanation
❌ Sarcasm, childish tone, legal guarantees, "ТЕРМІНОВО!"

---

## New Page/Section Checklist

- [ ] Background: Powder or White (never dark by default)
- [ ] Fonts: DM Serif Display + DM Sans + Caveat only
- [ ] Colors: from palette above only
- [ ] Spacing: matches table above
- [ ] Tone: friendly, simple
- [ ] Whitespace: enough between blocks
- [ ] CTA: clear next action
- [ ] Mobile: check responsive

---

## New Article Rules

Before adding a new article to any page:
1. Check existing article card parameters (cover height, body minHeight, title minHeight)
2. Match exactly — new article = same size as existing ones
3. Add to BOTH `src/app/page.tsx` AND `src/app/articles/page.tsx`

---

## Key Files

```
src/app/page.tsx                  — main landing (published articles array)
src/app/articles/page.tsx         — articles page (separate published array)
src/app/articles/[slug]/page.tsx  — individual articles
src/components/layout/Navbar.tsx  — navbar
src/components/layout/Footer.tsx  — footer
src/components/RWRCalculator.tsx  — RWR+ income calculator + PDF
src/components/RWRChecklists.tsx  — PDF checklists generator
public/logos/                     — all logos
public/articles/                  — article assets + PDFs
docs/BRAND_STYLE_GUIDE.md         — full brand reference
docs/PDF_MASTER_TEMPLATE.md       — PDF architecture rules
docs/CLAUDE.md                    — development workflow rules
```

---

## Forbidden in Design

- ❌ More than 1 dark section per page
- ❌ Emoji as main section icons
- ❌ Text without whitespace
- ❌ Corporate gray blocks
- ❌ Too many animations (subtle hover only)
- ❌ Physical address in contact sections (email only: info@qlixa.eu)
- ❌ Hardcoded HEX in PDF generation code
- ❌ Static base64 logo in PDF

## Legal

- Entity: QLIXA GmbH (in Gründung)
- Email: info@qlixa.eu (contacts — email only, no address)
- Trademark: QLIXA™ (registration in progress)
- Analytics: Plausible (no cookie banner needed)
---

## PDF Master Template
# PDF Master Template — QLIXA
*Специфікація системи генерації PDF-документів*
*Версія 1.1 — Липень 2026*
*Розміри виміряні з реального QLIXA_Checklist_Naymanyi.pdf*

---

## ⚠️ ГОЛОВНЕ ПРАВИЛО

Цей файл — архітектура. Не стилі.
Всі кольори, шрифти та розміри беруться ВИКЛЮЧНО з `BRAND_STYLE_GUIDE.md`.
PDF Master Template не знає жодного HEX-коду і жодного назви шрифту.
Він знає тільки семантичні токени.

---

## 1. Семантичні токени кольорів

```
COLOR.Primary         → основний акцент (teal #038390)
COLOR.PrimaryDark     → темніший акцент (hover #026B76)
COLOR.Background      → фон сторінки (white #FFFFFF)
COLOR.Surface         → фон карток, рядків (powder #F0F7F8)
COLOR.Border          → лінії, розділювачі (light teal #E6F4F5)
COLOR.TextPrimary     → основний текст (charcoal #1A1A1A)
COLOR.TextSecondary   → другорядний текст (gray #595959)
COLOR.TextMuted       → приглушений текст (gray light #9D9D9D)
COLOR.Success.Bg      → фон успіху (#E8F8F0)
COLOR.Success.Text    → текст успіху (#065F46)
COLOR.Warning.Bg      → фон попередження (#FFF8E7)
COLOR.Warning.Text    → текст попередження (#92400E)
COLOR.Error.Bg        → фон помилки (#FFF0F0)
COLOR.Error.Text      → текст помилки (#CC0000)
COLOR.Info.Bg         → фон інформації (powder #F0F7F8)
COLOR.Info.Text       → текст інформації (gray #595959)
COLOR.AccentLine      → акцентна лінія (Primary #038390)
COLOR.TableHeader.Bg  → фон шапки таблиці (Primary #038390)
COLOR.TableHeader.Text → текст шапки (white #FFFFFF)
COLOR.TableRow.Even   → парні рядки (Surface #F0F7F8)
COLOR.TableRow.Odd    → непарні рядки (Background #FFFFFF)
```

---

## 2. Семантичні токени типографіки

```
FONT.DocumentTitle    → назва документу в хедері
FONT.Heading1         → головний заголовок секції
FONT.Heading2         → підзаголовок секції
FONT.Heading3         → заголовок блоку
FONT.Body             → основний текст
FONT.BodySmall        → дрібніший текст
FONT.Caption          → підписи, мітки (UPPERCASE)
FONT.TableHeader      → шапка таблиці
FONT.TableCell        → вміст таблиці
FONT.Footnote         → виноски, disclaimer
FONT.KPI.Value        → велике число KPI
FONT.KPI.Label        → підпис KPI
FONT.ChecklistItem    → пункт чекліста
FONT.PageNumber       → номер сторінки
```

---

## 3. Формат сторінки — ТОЧНІ РОЗМІРИ

```
Стандарт:   A4 Portrait (210 × 297 мм)
Альтернатива: A4 Landscape — якщо таблиця > 6 колонок

Поля:
  Ліве:     18мм
  Праве:    18мм
  Верхнє:   22мм (хедер займає перші 20.7мм)
  Нижнє:    9мм (футер займає останні 6.9мм)
  Робоча ширина контенту: 174мм (210 - 18 - 18)
  Робоча висота контенту: ~265мм
```

---

## 4. HEADER — точні розміри з реального PDF

```
Позиція:    від 0 до ~21мм від верху сторінки
Висота:     ~21мм
Фон:        COLOR.Background (white)

Ліва частина:
  Логотип: logo-name-slogan_planets_black.svg
  Позиція: 18мм від лівого краю, 7мм від верху
  Розмір:  висота ~14мм, ширина auto (пропорційно)

Права частина:
  Рядок 1: Назва документу (FONT.DocumentTitle)
           Позиція: ~11.9мм від верху, правий край
  Рядок 2: qlixa.eu (FONT.BodySmall, COLOR.Primary)
           Позиція: ~20.7мм від верху, правий край

Розділювач під хедером:
  Лінія: COLOR.AccentLine, товщина 1.5–2px
  Позиція: ~21мм від верху, повна ширина сторінки

Опційні поля правої частини (якщо є):
  - Дата генерації
  - Номер документу
  - Звітний період
  - Ім'я користувача
```

---

## 5. FOOTER — точні розміри з реального PDF

```
Позиція:    від ~290мм до 297мм (низ сторінки)
Висота:     ~7мм
Фон:        COLOR.Background (white)

Розділювач над футером:
  Лінія: COLOR.Border, товщина 0.3–0.5px
  Позиція: ~290мм від верху

Ліва частина:
  Логотип: logo-name-slogan_planets_black.svg
  Розмір:  висота ~6мм, ширина auto

Права частина:
  "Твій цифровий бізнес-помічник в Австрії | qlixa.eu"
  Шрифт: FONT.Footnote, COLOR.TextMuted
  Позиція: ~290мм від верху, правий край

Номер сторінки (якщо потрібен):
  "Сторінка N із Total"
  Позиція: по центру, FONT.PageNumber, COLOR.TextMuted
```

**Стандартний disclaimer (для розрахункових PDF):**
```
Документ сформовано платформою QLIXA.
Інформація має виключно інформаційний характер та створена
автоматично на основі введених користувачем даних.
Документ не є офіційним рішенням державного органу,
юридичною консультацією або податковим висновком.
```

---

## 6. Блоки контенту — компоненти

### 6.1 Заголовок секції (Section Header)
```
Фон:       COLOR.TableHeader.Bg
Текст:     COLOR.TableHeader.Text, FONT.Caption (UPPERCASE)
Padding:   6–8мм вертикаль, 12мм горизонталь
Відступ після: 1мм
```

### 6.2 Інформаційний блок (Info)
```
Фон:      COLOR.Info.Bg, radius 8px
Текст:    COLOR.Info.Text, FONT.Body
Border:   1px COLOR.Border
Padding:  10–14мм
```

### 6.3 Warning блок
```
Фон:      COLOR.Warning.Bg, radius 8px
Текст:    COLOR.Warning.Text, FONT.Body
Border:   1px rgba(Warning.Text, 30%)
Іконка:   ⚠️
```

### 6.4 Success блок
```
Фон:      COLOR.Success.Bg, radius 8px
Текст:    COLOR.Success.Text, FONT.Body
Border:   1px rgba(Success.Text, 30%)
Іконка:   ✓
```

### 6.5 Error блок
```
Фон:      COLOR.Error.Bg, radius 8px
Текст:    COLOR.Error.Text, FONT.Body
Іконка:   ✕
```

### 6.6 KPI Картка
```
┌─────────────────┐
│ МІТКА           │  ← FONT.KPI.Label, COLOR.TextSecondary, UPPERCASE
│ 1 234,56 €      │  ← FONT.KPI.Value, COLOR.TextPrimary
│ підпис/деталь   │  ← FONT.Footnote, COLOR.TextMuted
└─────────────────┘
Фон:    COLOR.Surface, radius 8px
Border: 1px COLOR.Border
Grid:   2 або 3 картки в рядок
```

### 6.7 Таблиця
```
Шапка:   COLOR.TableHeader.Bg фон, COLOR.TableHeader.Text
Рядки:   чергування COLOR.TableRow.Even / COLOR.TableRow.Odd
Межі:    0.3px COLOR.Border між рядками
Числа:   вирівнювання праворуч
Текст:   вирівнювання ліворуч
Правило: шапка повторюється на новій сторінці
```

### 6.8 Чекліст — точний стиль з QLIXA PDF
```
Кожен пункт:
┌────────────────────────────────────────────────────────────┐
│ ☐  Назва документу (примітка в дужках)  │ Дата │ Строк дії│
│    Нотатки: _______________________________│      │          │
└────────────────────────────────────────────────────────────┘

Фон (чергування): COLOR.Surface / COLOR.Background
Чекбокс: ☐ для друку (порожній квадрат)
Шрифт назви: FONT.ChecklistItem, bold
Примітка: FONT.BodySmall, COLOR.TextSecondary
Поле дати: фіксована ширина ~33мм кожна колонка
Рядок нотаток: FONT.BodySmall, COLOR.TextMuted
Правило: пункт не розривається між сторінками
```

### 6.9 Блок підпису
```
____________________________    ____________________________
Підпис                          Дата
Лінія: COLOR.Border, 0.5px
```

### 6.10 Розділювач
```
Лінія: COLOR.Border, 0.5px, повна ширина
Відступ до і після: 6–8мм
```

---

## 7. Правила багатосторінковості

```
✅ Завжди:
  - Header на кожній сторінці
  - Footer на кожній сторінці (завжди внизу!)
  - Шапка таблиці повторюється на новій сторінці

❌ Ніколи:
  - Не розривати рядок таблиці між сторінками
  - Не залишати самотній заголовок внизу
    (мінімум 2 рядки після заголовку)
  - Не розривати пункт чекліста між сторінками
  - Не розривати KPI/Info/Warning блок між сторінками
```

---

## 8. Відступи між елементами

```
Після заголовку секції:     1мм
Між пунктами чекліста:      1мм
Між блоками (Info/Warning): 6–8мм
Між секціями:               10–14мм
Після хедера:               4–6мм
```

---

## 9. Логотип в PDF — технічне правило

```
ЗАВЖДИ завантажувати динамічно з сервера.
Не вбудовувати як base64 в код.

Алгоритм:
1. fetch('/logos/logo-name-slogan_planets_black.svg')
2. Отримати SVG текст
3. Конвертувати SVG → PNG через canvas
4. Використати PNG в jsPDF

Причина: якщо логотип зміниться на сервері —
всі PDF автоматично отримають новий логотип.
```

---

## 10. Типи документів

| Тип | Основні компоненти |
|-----|-------------------|
| Чекліст | Section Header + Checklist items + Bottom block |
| Розрахунок | KPI cards + Table + Success/Warning |
| Декларація | Text + Table + Signature |
| Звіт | Headings + Text + Table + Charts |
| KPI Dashboard | KPI cards + Charts + Table |
| Інструкція | Headings + Text + Numbered list |
| Результати калькулятора | KPI cards + Table + Success/Warning |

---

## 11. Чекліст якості перед генерацією

- [ ] Header є і правильний?
- [ ] Footer є і завжди внизу сторінки?
- [ ] Логотип завантажений динамічно?
- [ ] Всі кольори з Brand Style Guide (семантичні токени)?
- [ ] Таблиці/чеклісти не розриваються між сторінками?
- [ ] Disclaimer в футері є (для розрахункових PDF)?
- [ ] Розміри відповідають таблиці вище?

---

## 12. Як використовувати

**При генерації PDF:**
1. Відкрий `BRAND_STYLE_GUIDE.md` → кольори і шрифти
2. Відкрий цей файл → архітектура і розміри
3. Підстав контент
4. Перевір чекліст з пункту 11

**При зміні бренду:**
1. Оновити `BRAND_STYLE_GUIDE.md`
2. Всі PDF автоматично оновляться

---

*QLIXA PDF Master Template v1.1*
*Розміри верифіковані на QLIXA_Checklist_Naymanyi.pdf*
*Використовувати разом з BRAND_STYLE_GUIDE.md*
