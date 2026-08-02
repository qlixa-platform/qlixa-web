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

### 9.1 Точні пропорції логотипу — обов'язково

Реальний viewBox логотипу: `0 0 479 143`
Співвідношення сторін: 479:143 (≈ 3.35:1)

⚠️ **НЕ покладатись на `img.width` / `img.height`** при конвертації SVG → canvas —
браузер ненадійно визначає натуральний розмір SVG, якщо корінь має
`width="100%" height="100%"` (як у нашому логотипі). Це призводить до
спотвореного/розтягнутого логотипу в PDF.

**Правильно (canvas):**
```js
const LOGO_VB_WIDTH = 479
const LOGO_VB_HEIGHT = 143
const SCALE = 3 // для чіткості на екранах з високим PPI
canvas.width = LOGO_VB_WIDTH * SCALE
canvas.height = LOGO_VB_HEIGHT * SCALE
ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
```

Якщо логотип вставляється як звичайний `<img>` (не через canvas,
наприклад в html2canvas-рендерингу) — завжди:

- або `height: auto` (браузер сам збереже пропорції)
- або задавати `width`/`height` у точному співвідношенні 479:143
  (наприклад `width:140px` → `height:41.8px`, `width:100px` → `height:29.9px`)
- завжди додавати `object-fit: contain` як подвійний захист від спотворення

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
