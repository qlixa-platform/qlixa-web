# QLIXA i18n Migration Plan — Client-Side Language Switching → URL-Based Server-Rendered Locales

Status: **PLANNING ONLY.** No files were modified to produce this document. All findings below are backed by direct repository inspection (file paths, line numbers, and grep evidence are cited throughout); where a Next.js 15 framework mechanic could not be confirmed from this repository alone, it is explicitly marked **VERIFY AT IMPLEMENTATION TIME**.

---

## 1. Current Architecture — What Was Found

### 1.1 Every file currently involved in language selection

**Pages that independently hold their own `useState('UA')` language state** (15 files, confirmed via `grep -rn "useState('UA')" src/app src/components`):

| # | File | Line |
|---|---|---|
| 1 | `src/app/page.tsx` | 782 |
| 2 | `src/app/pricing/page.tsx` | 277 |
| 3 | `src/app/about/page.tsx` | 276 |
| 4 | `src/app/our-story/page.tsx` | 579 |
| 5 | `src/app/tax-return/page.tsx` | 861 |
| 6 | `src/app/tools/page.tsx` | 104 |
| 7 | `src/app/articles/page.tsx` | 82 |
| 8 | `src/app/articles/rwr-karte/page.tsx` | 579 |
| 9 | `src/app/articles/gewerbeanmeldung/page.tsx` | 314 |
| 10 | `src/app/articles/austria-id/page.tsx` | 339 |
| 11 | `src/app/articles/invalidity-child/page.tsx` | 452 |
| 12 | `src/app/articles/gisa-formular/page.tsx` | 621 |
| 13 | `src/components/layout/Footer.tsx` | 156 |
| 14 | `src/components/layout/ArticleNav.tsx` | 55 |
| 15 | `src/components/RWRCalculator.tsx` | 17 |

Plus `src/components/layout/Navbar.tsx:70` — same pattern, written as `React.useState<string>('UA')`.

**Every one of these 16 files repeats the identical shape independently:**
```
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
```
This is the single most important structural fact for this migration: **there is no shared hook or provider** — the read-side of language state is copy-pasted 16 times. `Navbar.tsx` additionally owns the *write* side (detection + the switcher UI) and is the only place `localStorage.setItem('qlixa-lang', …)` and `window.dispatchEvent(new Event('qlixa-lang-change'))` are called (`src/components/layout/Navbar.tsx:114-116`).

**Files referencing the `qlixa-lang` localStorage key at all** (18 files, `grep -rln "qlixa-lang"`): all 16 above, plus:
- `src/components/layout/LangSync.tsx` — syncs `document.documentElement.lang` from the same key, client-side only, `useEffect`-driven (`src/components/layout/LangSync.tsx:20-26`).
- `src/components/RWRChecklists.tsx:416` — reads `localStorage.getItem('qlixa-lang')` directly, once, at the moment a PDF-download button is clicked (not tied to page render at all).

**`navigator.language` / `navigator.languages` (browser-language auto-detection):** exactly one location — `src/components/layout/Navbar.tsx:84-110`, inside a `useEffect` that only runs for first-time visitors (no stored `qlixa-lang` value yet). It builds a small `LANG_MAP` (`uk→UA, de→DE, en→EN, ru→RU`) and falls back to `EN` if nothing matches.

**`LangSync.tsx`:** a single-purpose component (`src/components/layout/LangSync.tsx`, rendered once in `src/app/layout.tsx:33`) whose only job is keeping `document.documentElement.lang` in sync with `qlixa-lang` after mount. It duplicates the exact same `uk/de/en/ru` mapping already present in `Navbar.tsx`'s Cabinet-link construction (see below) — this is the second of two places the same mapping is hand-maintained.

**Language switcher UI (write side):** entirely inside `src/components/layout/Navbar.tsx`. Three separate render sites map over `(['UA','DE','EN','RU'] as const)` and call `handleLang(l)` on click:
- Desktop switcher: line 240.
- Mobile compact dropdown: line 311 (`handleLang(l); closeLang()`).
- Mobile full nav panel: line 396 (`handleLangAndClose(l)`).

`handleLang` (`Navbar.tsx:111-116`) does exactly three things: `setLang(l)`, `localStorage.setItem('qlixa-lang', l)`, `window.dispatchEvent(new Event('qlixa-lang-change'))`. It never touches the URL.

**Translated text objects:** every page/component above defines its own `Record<'UA'|'RU'|'EN'|'DE', ...>` object inline, ranging from small (Footer's `FOOTER_TEXT`, ~100 lines) to very large (`RWR_TEXT` in `src/app/articles/rwr-karte/page.tsx` spans lines 11–577, all four locale blocks in one file; `GISA_TEXT` in `src/app/articles/gisa-formular/page.tsx` is comparably large). **Some of these values are JSX, not plain strings** — e.g. `src/app/articles/gisa-formular/page.tsx:101-106` embeds `<><strong>Gewerbeanmeldung</strong> — так в Австрії...</>` as a translation value, not a template string. This fact directly shapes the "should we use next-intl" recommendation in Section 3.

**Language-dependent links found:**
- Cabinet login links (5 construction sites, all using the identical `lang === 'UA' ? 'uk' : lang.toLowerCase()` expression): `src/components/layout/Navbar.tsx:263`, `:413`; `src/app/tax-return/page.tsx:875` (via `CABINET_BASE` at line 8); `src/app/articles/invalidity-child/page.tsx:465`. **Inconsistency found:** `src/app/pricing/page.tsx:426,479` and the base `CABINET_URL` (`pricing/page.tsx:9`) do **not** append a `?lang=` parameter at all — two of the five Cabinet CTA sites already omit locale information today, pre-existing, not something this migration introduces.
- Internal navigation links with a literal locale-less `href="/…"` (10 files, `grep -rlE 'href=(\{`)?"?/[a-z#]'`): `src/app/about/page.tsx`, `src/app/page.tsx`, all 5 article pages, `src/components/layout/ArticleNav.tsx`, `src/components/layout/ArticlesSlider.tsx`, `src/components/layout/Navbar.tsx`.
- Internal navigation links stored as **data**, i.e. `href: '/…'` inside an array/object rather than a literal JSX attribute (7 files, `grep -rlE "href:\s*'/[a-z]"`): `src/app/articles/page.tsx`, `src/app/page.tsx`, `src/app/tools/page.tsx`, `src/components/layout/Footer.tsx` (4 locale blocks each with their own nav-column `href`s), `src/components/layout/LegalLayout.tsx` (`legalLinks` array), `src/components/layout/Navbar.tsx`, `src/lib/articles.ts` (the `href` field on every article object).

### 1.2 Which `page.tsx` files are Client Components, and why

Confirmed by reading the first lines of every `page.tsx` in `src/app`:

| Category | Files | Reason |
|---|---|---|
| **`'use client'`** | `page.tsx` (home), `pricing`, `about`, `our-story`, `tax-return`, `tools`, `articles/page.tsx`, all 5 `articles/*/page.tsx` | Every one of these needs `useState`+`useEffect` for the client-side language pattern described above. This is the *entire* reason they're Client Components — none of them have any other genuine client-only requirement at the outer-page level (their *interactive pieces* — accordions, the calculator, modals — are what actually need to be interactive, not the outer page shell). |
| **Server Components already** | `impressum`, `privacy`, `agb`, `cookies` | Confirmed via `grep -n "useState\|'use client'"` returning **zero matches** in all four files. These pages are hardcoded, single-language (Ukrainian) content with no lang-switching logic of any kind — they already render server-side today. (This is itself a finding: these 4 pages currently have no DE/EN/RU translation to serve at all — see Section 8, "Content Preservation Constraint.") |
| **Redirect-only, Server Components** | `datenschutz`, `terms`, `how-it-works/tax-return`, all 6 `for/*` | Pure `redirect()` calls from `next/navigation`, no rendered content. |

### 1.3 Components that genuinely need to remain Client Components

Based on actual interactive behavior found in the code (state that changes in response to user interaction, browser-only APIs, or event listeners):

- **`Navbar.tsx`** — burger menu / language-dropdown open state, `mousedown`/`touchstart`/`keydown` listeners, focus trap. Must stay client.
- **`Footer.tsx`** — error-report modal (`showModal`, form fields, focus trap, body-scroll lock via `document.body.style`). Must stay client.
- **`RWRCalculator.tsx`** — multi-step form state (`step`, `income`, etc.), PDF generation. Must stay client.
- **`RWRChecklists.tsx`** — triggered PDF generation on click. Must stay client (it's a function module invoked from a client event handler, not a rendered component, so this is really about the *caller* staying client).
- **`ArticleNav.tsx`'s `ArticleTOC`** — accordion open/close state (`open`, from this session's earlier mobile work). Must stay client.
- **`ArticlesSlider.tsx`** — carousel position state, touch/scroll handling. Must stay client.
- **`WhatIsQlixaFeatureGrid.tsx`, `ForWhomExpandableGrid.tsx`** — expand/collapse state. Must stay client.
- **`NotifyMeButton.tsx`** — modal state + Supabase submission. Must stay client.
- **`ScrollArrows.tsx`** — `window.scrollTo` on click. Must stay client (trivially small).
- **Pricing page's mobile accordion** (`expandedPlan` state, from this session's earlier Pricing V2 work) — currently lives inside the page component itself, which is exactly the kind of state that should be isolated into a small Client child once the outer page becomes a Server Component.

**`LangSync.tsx` becomes structurally obsolete** once `<html lang>` is set correctly server-side from the URL (see Section 4). It should be retired as part of this migration, not carried forward unchanged.

### 1.4 Which pages could become Server Components

**All of them, at the outer-shell level**, once locale is sourced from the URL segment instead of `useState`+`localStorage`. Concretely: `src/app/[locale]/pricing/page.tsx` can be an `async function Page({ params })` Server Component that looks up `PRICING_TEXT[locale]` (the exact same object, unchanged) and renders the mostly-static JSX directly — no hook needed for language at all in the outer shell. The genuinely interactive fragments (accordion, calculator, modal) get extracted as small Client child components that *receive their locale-appropriate text as props* from the Server Component parent, rather than each independently re-deriving language from `localStorage`.

This is not a cosmetic distinction — it is the actual fix for the SEO problem: a Server Component reading `params.locale` produces the correct language in the very first byte of HTML sent to Googlebot, with no dependency on hydration, `localStorage`, or `navigator.languages` ever running.

### 1.5 How the existing translation objects should be handled

**Recommendation: leave every translation object's *content* exactly where it is and exactly as-is.** Do not extract them into JSON message files, do not rewrite any string, do not touch punctuation or JSX children. The only change is *how the correct locale key is selected*: today it's `PRICING_TEXT[lang]` where `lang` comes from `useState`+`localStorage`; after migration it's `PRICING_TEXT[internalKeyFor(params.locale)]` where the key comes from the URL. This is a one-line change per file, and it is the single biggest reason this migration does not need to "rewrite marketing text" — the text never moves.

The one small addition needed: a shared mapping between the **public URL locale code** (`de`/`en`/`uk`/`ru`) and the **existing internal object key** (`DE`/`EN`/`UA`/`RU` — note `UA`, not `UK`, matching the current codebase's internal convention, which the user has explicitly said may remain). This mapping already exists, duplicated, in `LangSync.tsx:9` and implicitly in the five Cabinet-link construction sites — it should be consolidated into one shared utility (Section 6, Phase 1) rather than left duplicated a third and fourth time.

---

## 2. Root Domain Redirect Evaluation (`/` → `/de/`)

**Is a permanent redirect from `/` to `/de/` technically appropriate? Yes, as a baseline — with one recommended refinement.**

A bare, unprefixed `/` cannot be allowed to *also* independently serve content once locale-prefixed URLs exist — that would create exactly the kind of duplicate-content/ambiguous-canonical problem the SEO audit already flagged. Redirecting `/` somewhere is the correct baseline. Two variants:

- **Variant A — always redirect to `/de/`, unconditionally.** Simplest, fully deterministic, trivially cacheable, and matches "German is the primary market" literally. Downside: a first-time visitor whose browser strongly prefers Ukrainian or Russian — very plausible for this specific product's audience, per the articles/founder-story content — is forced through German before finding the switcher.
- **Variant B (recommended) — redirect `/` based on the request's `Accept-Language` header, resolved against the 4 supported locales, falling back to `/de/` when nothing matches.** This still always lands on one of the 4 fixed locale URLs (never invents a 5th "auto" experience, never serves ambiguous content at `/` itself), still uses `/de/` as the deterministic fallback/`x-default` target, and better respects a first-time Ukrainian- or Russian-preferring visitor's actual browser signal — which is philosophically consistent with the *existing* product's own `navigator.languages` detection logic in `Navbar.tsx:84-107`, just moved to the server/edge where it can actually affect the first-rendered HTML instead of only affecting a client-side state update after the fact.

Either variant is a **permanent (308) redirect issued from middleware**, not a page component — this is a routing decision made before Next.js's file-based router matches anything, which is exactly what `middleware.ts` is for (see Section 4). This is a product/business call as much as a technical one (does the team want to optimize for "matches primary SEO market" or "matches the visitor's actual language"); this plan recommends Variant B but flags it as a decision point in the Founders' Questions list at the end, since the task asked me to evaluate rather than decide.

---

## 3. Native Next.js Routing vs. a Third-Party Library (e.g. `next-intl`)

**Recommendation: native Next.js App Router `[locale]` dynamic-segment routing + a small hand-written `middleware.ts`. Do not add `next-intl` or any other i18n package for this migration.**

Reasoning, specific to this codebase (not a generic library review):

1. **The translation content is not a flat string catalog.** `next-intl` (and most i18n libraries) are built around message catalogs — typically JSON/ICU MessageFormat strings, with rich-text handled via a special `t.rich(...)` API. This codebase's translation objects routinely embed real JSX as values (confirmed: `src/app/articles/gisa-formular/page.tsx:101-106` and similar patterns elsewhere in every large article file). Migrating this content into a message-catalog format would require **rewriting how a large fraction of the site's copy is authored** — precisely the kind of content-touching refactor this task explicitly forbids ("do not rewrite marketing text," "do not change visual components unless technically necessary"). Keeping translation objects exactly where they are, indexed differently, avoids this entirely.
2. **The site's language-switcher and detection logic already exists and works** (`Navbar.tsx`'s browser-language detection + the three switcher UIs). `next-intl` wants to own locale negotiation via its own middleware and routing config; adopting it would mean either replacing this already-functional, already-tested UI logic, or running two parallel locale systems side by side — added complexity with no corresponding benefit here.
3. **The actual problem is architectural (no per-locale URL, no server-side locale resolution), not a missing-feature problem.** This site does not need ICU pluralization, lazy-loaded per-locale message bundles, or namespace-scoped translation loading — at 4 locales and ~16 content routes of mostly-static marketing/article copy, none of `next-intl`'s specific value-adds (bundle-splitting by locale, complex plural/format rules) apply. Everything this migration actually needs — a `[locale]` segment, `generateStaticParams`, reading `params.locale` in a Server Component, and `notFound()` for invalid locales — is built into Next.js 15 already.
4. **What `next-intl` would replace vs. what it would add:** it would replace the *lookup mechanism* (which is one line per file either way) and *could* provide hreflang-alternate helpers — but it would add a new dependency, its own middleware, a new message-loading convention, and a real migration cost for the JSX-bearing content described above. The cost clearly outweighs the benefit for this specific repository's shape.

**If circumstances change later** (e.g. QLIXA adds many more locales, moves to fully string-only content, or wants CMS-driven translations), revisiting `next-intl` at that point would be reasonable — but not as part of this migration.

---

## 4. Recommended Architecture — Detailed Design

### 4.1 Route structure

```
src/app/
  layout.tsx                     — minimal top-level shell (see 4.4 for exact fate)
  middleware.ts (at repo root, alongside src/ or inside src/ per Next.js convention — VERIFY AT IMPLEMENTATION TIME which location this Next.js 15 project expects)
  [locale]/
    layout.tsx                   — the real <html lang> owner; validates params.locale
    page.tsx                     — homepage
    pricing/page.tsx
    about/page.tsx
    our-story/page.tsx
    tax-return/page.tsx
    tools/page.tsx
    articles/
      page.tsx
      rwr-karte/page.tsx
      gewerbeanmeldung/page.tsx
      austria-id/page.tsx
      invalidity-child/page.tsx
      gisa-formular/page.tsx
    impressum/page.tsx
    privacy/page.tsx
    agb/page.tsx
    cookies/page.tsx
```

Supported locales: `de`, `en`, `uk`, `ru` (URL-facing, all lowercase, `uk` not `ua` — per the explicit instruction). Internal object keys remain `DE`/`EN`/`UA`/`RU`, unchanged, mapped via one small utility (Phase 1 below).

### 4.2 Locale validation

`src/app/[locale]/layout.tsx` checks `params.locale` against the 4 supported values at the top of the component; anything else calls Next.js's `notFound()`, producing a real 404 — not a redirect, not a soft-404, not a silent fallback to German. This directly answers "handling of invalid locales": `/xx/pricing` → 404, `/DE/pricing` (wrong case) → 404 (locale codes should be treated as case-sensitive lowercase-only, matching standard practice; **VERIFY AT IMPLEMENTATION TIME** whether case-insensitive matching with a redirect to the canonical lowercase form is preferred instead — either is defensible, but should be a deliberate choice, not an accident).

### 4.3 Server-side locale resolution

`params.locale` (a plain string from the URL, provided to every Server Component under `[locale]/`) is the *only* source of truth for what language to render — no `localStorage`, no `navigator.languages`, no client `useEffect` is involved in producing the initial HTML. Each page's Server Component maps `params.locale` → the existing internal key (`uk→UA`, `de→DE`, `en→EN`, `ru→RU`) via the Phase-1 utility, then indexes into the *exact same, unmodified* translation object that exists in that file today.

### 4.4 `<html lang>`

Set once, server-side, in `src/app/[locale]/layout.tsx`, directly from `params.locale` (`de`/`en`/`uk`/`ru` — the real BCP-47-valid codes, exactly what should appear in `lang`). This requires `[locale]/layout.tsx` to be the component that owns `<html>` and `<body>`, which has a specific structural consequence: **VERIFY AT IMPLEMENTATION TIME** against current Next.js 15 docs, but the well-established pattern (matching Next.js's own official app-dir-i18n-routing example) is that when every real content route lives under a single top-level `[locale]` segment, `[locale]/layout.tsx` legitimately serves as the root layout, and a separate `src/app/layout.tsx` with its own `<html>` either does not exist or is reduced to a pass-through. Given this repository's 9 legacy redirect routes currently live *outside* `[locale]` as flat top-level pages, the cleanest resolution (detailed in Phase 7 below) is to move their redirect logic into `middleware.ts` instead of page components — meaning `[locale]` becomes the *only* top-level route-bearing folder in `src/app`, sidestepping any conflict about which layout owns `<html>` altogether. `LangSync.tsx` is deleted once this is in place (Section 1.3).

### 4.5 Language switcher behavior

`Navbar.tsx`'s `handleLang` changes from "update local state + localStorage" to "navigate to the equivalent page under the new locale prefix." Concretely: given the current pathname (available via `usePathname()`, which `Navbar.tsx` and `LegalLayout.tsx` already import and use today) and the current `locale` (now a prop passed down from the Server Component page, not client state), compute the new path by replacing the leading locale segment, then `router.push(newPath)` (via `useRouter` from `next/navigation`). Example: on `/de/pricing`, choosing English computes `/en/pricing` and navigates there — this directly satisfies the exact behavior described in the task ("If the visitor is on `/de/pricing` and chooses English: → `/en/pricing`"). `localStorage.setItem('qlixa-lang', …)` can still be kept as a **secondary UX convenience** (e.g. to pre-select a remembered preference the *next* time the visitor lands on the unprefixed `/`, feeding Variant B's Accept-Language-or-remembered-preference logic in middleware) — but it must never be what determines what a locale-prefixed URL server-renders. This is the precise distinction the task draws ("User language preference may still be remembered for UX purposes, but localStorage must NOT determine what language the server initially renders for a locale URL").

### 4.6 Root `/` behavior

Handled in `middleware.ts` per Section 2 (Variant B recommended) — never reaches a page component.

### 4.7 Preservation of the current page when switching languages

Covered in 4.5 — the switcher preserves the path *segment-for-segment*, not just "go to the target language's homepage." One nuance to flag: article slugs (`rwr-karte`, `gewerbeanmeldung`, etc.) are **not themselves translated** in the current codebase (confirmed: `src/lib/articles.ts`'s `href` field, e.g. `/articles/rwr-karte`, is identical regardless of which locale's `title`/`desc` is being displayed) — so `/de/articles/rwr-karte` ↔ `/en/articles/rwr-karte` is a simple locale-segment swap with the rest of the path untouched, which matches the existing architecture exactly and requires no slug-translation logic to be invented.

### 4.8 Existing internal links, article links, CTA links

All 17 files identified in Section 1.1 (10 with literal `href="/…"`, 7 with data-driven `href: '/…'`, with some overlap between the two lists) need their `<Link href="…">` call sites updated to prepend the current locale. **Recommendation: do not rewrite the stored href *data*** (e.g. `src/lib/articles.ts`'s `href: '/articles/rwr-karte'` stays exactly as-is; `Footer.tsx`'s per-locale `links: [{href:'/about',…}]` arrays stay exactly as-is). Instead, introduce one small helper (part of the Phase-1 utility) — e.g. `localeHref(locale, path)` — and wrap it at the point each `<Link>`/`<a>` is rendered: `<Link href={localeHref(locale, item.href)}>`. This keeps every existing data structure untouched and confines the actual code change to the render call sites, which is both lower-risk and easier to review one component at a time.

### 4.9 Cabinet links

The Cabinet is a separate deployment (`cabinet-ten-lac.vercel.app`) and is explicitly out of scope to modify. What *does* need attention on the public-site side: the existing `lang === 'UA' ? 'uk' : lang.toLowerCase()` expression at all 5 construction sites already produces the exact correct BCP-47-style codes (`uk`/`de`/`en`/`ru`) the Cabinet expects — this logic does not need to change in *substance*, only in *source*: `lang` currently comes from client state, and after migration should come from the page's `locale` prop (itself derived from `params.locale`, which is already the URL-facing code — meaning the mapping direction actually simplifies here: instead of mapping the internal key `UA→uk`, the page already *has* `uk` directly from the URL and can pass it straight through, only needing the reverse mapping when going the other way (URL code → internal object key for translation lookups). **Separately flagging** the pre-existing inconsistency (Section 1.1) that `pricing/page.tsx`'s two Cabinet links don't pass `?lang=` at all today — this migration does not need to fix that inconsistency, but it's a natural opportunity to do so while those two call sites are already being touched for the locale-prop change; noting it as a judgment call for whoever implements Phase 5, not a requirement of this plan.

### 4.10 Legacy redirects

Recommendation: **move all 9 legacy-redirect routes' logic into `middleware.ts`**, and delete the corresponding `page.tsx` files (`src/app/for/*/page.tsx` ×6, `src/app/datenschutz/page.tsx`, `src/app/terms/page.tsx`, `src/app/how-it-works/tax-return/page.tsx`). Each old flat path redirects, at the edge, to its target **prefixed with the default locale** (`de`), since these are low-traffic technical/legacy URLs that don't need per-visitor language negotiation — e.g. `/for/biznes` → `308 /de/pricing`, `/datenschutz` → `308 /de/privacy`, `/how-it-works/tax-return` → `308 /de/tax-return`. This both answers the task's explicit question and cleanly resolves the root-layout structural question in 4.4 by keeping `[locale]` as the sole top-level content-bearing segment. **Also fix, in the same phase, the pre-existing 307-vs-308 issue already flagged in the prior SEO audit** (these currently use `redirect()`, which issues a 307; middleware-based redirects should explicitly use a 308/301-equivalent permanent response) — since the routes are being touched anyway, doing both corrections together avoids a second, redundant change to the same routes later.

---

## 5. How This Enables the SEO Work (Not Implemented Now)

Once the above exists, the *previously blocked* SEO audit items become straightforward, small, additive changes on top of a stable foundation — none of this is being implemented now, but it's worth confirming the architecture actually unlocks them:

- **Canonical:** each `[locale]/*/page.tsx` can export `generateMetadata({ params })` returning `alternates.canonical: https://qlixa.eu/${params.locale}/pricing` — trivial once `params.locale` exists and is authoritative.
- **hreflang:** the same `generateMetadata` call can return `alternates.languages: { de: '.../de/pricing', en: '.../en/pricing', uk: '.../uk/pricing', ru: '.../ru/pricing' }` — every value is a real, independently-server-rendered URL post-migration, which is exactly what was missing before (a hreflang tag pointing at a URL that doesn't actually serve that language is worse than no hreflang at all).
- **`x-default`:** recommend pointing it at `/de/…` (matching the Section 2 recommendation for the root redirect's deterministic fallback), applied consistently.
- **`<html lang>`:** already covered in 4.4 — `de`/`en`/`uk`/`ru`, correct per-request, server-rendered, before any JavaScript runs.
- **Sitemap:** once every route is enumerable as `(route, locale)` pairs from a single static list, `src/app/sitemap.ts` can generate all `4 × N` URLs mechanically, including the `alternates` field Next.js's sitemap API supports natively for hreflang-in-sitemap.
- **robots.txt / structured data:** unaffected by this migration either way — still separate, still not implemented here.

---

## 6. Risk Analysis (Specific to This Codebase)

| Risk | Where it comes from | Mitigation |
|---|---|---|
| **Hydration mismatches** | If any Client child component initializes its own state from `localStorage`/`navigator` *independently* of the `locale` prop passed down from its Server Component parent, the client-rendered value could momentarily disagree with the server-rendered one. | Every Client child must receive its locale-derived text/label as **props**, never re-derive it from `localStorage` on mount. This is the core discipline the whole migration depends on — flagged explicitly per phase below. |
| **Duplicated translation state** | 16 files today already duplicate the *read* pattern independently (Section 1.1) — the migration touches all 16, so there's real risk of inconsistently converting some but not others, leaving a mixed-architecture site mid-migration. | The phased plan (Section 7) explicitly builds the new tree *alongside* the old one and only cuts over once every page is confirmed working — no page is left half-migrated in production. |
| **Broken internal links** | 17 files reference internal paths (Section 1.1); missing even one during the link-localization phase produces a working page that silently drops the visitor's locale context on next click. | Phase 8 (link localization) is scoped as its own dedicated, fully-enumerated phase with a file-by-file checklist (Section 7), not folded into page-by-page migration where it could be missed. |
| **Lost language preference** | If `localStorage` is dropped entirely instead of being kept as a secondary preference signal, a returning visitor typing the bare domain would always land on `/de/` (or Accept-Language) rather than their previously-chosen language. | Recommended: keep `localStorage['qlixa-lang']` write-side (Navbar's switcher can still set it) purely as an input to the root `/` redirect decision in middleware — never as an input to what a locale-prefixed URL renders. |
| **Redirect loops** | A bug in middleware's legacy-path handling could combine with the `[locale]` validation `notFound()` logic in a way that loops (e.g. redirecting `/for/biznes` to a path middleware itself then redirects again). | Each legacy path should redirect directly to its final `[locale]`-prefixed destination in one hop (mirroring the current architecture, which already confirmed zero redirect chains — see the earlier SEO audit's Section 18) — never to another redirect-only path. |
| **Accidental duplicate URLs** | If the old flat routes (`/pricing`, `/about`, etc.) are left in place *and* the new `/de/pricing` etc. also work, both would serve content at two different URLs with no canonical relationship. | The cutover phase (Section 7, Phase 9) explicitly removes/redirects the old flat routes — the migration is not complete until they 404 or redirect, not serve duplicate content indefinitely. |
| **Incorrect article routing** | Article slugs aren't translated (Section 4.7) — a bug that accidentally *does* try to translate them (e.g. someone adding a `de`-specific slug later) would break `ArticleNav.tsx`'s `getAdjacentArticles()` logic, which matches on `slug` directly (`src/lib/articles.ts:54-60`). | Explicitly do not introduce per-locale slugs as part of this migration — flagged as an anti-goal. |
| **Cabinet links** | Covered in 4.9 — low risk, since the existing mapping expression is already correct; the only risk is accidentally breaking the two Pricing call sites that currently work correctly (they just don't add `?lang=`) while touching that file for other reasons. | Treat as an explicit, deliberate change if made, not an accidental side effect. |
| **Static generation / build issues** | Converting `'use client'` pages to Server Components with `generateStaticParams` returning all 4 locales means the *entire* site becomes statically generated at build time (a change from today's fully-client-rendered approach). This is a net positive for performance/SEO but is a real build-time behavior change that should be verified doesn't break on any page with genuinely dynamic-per-request behavior. | **VERIFY AT IMPLEMENTATION TIME:** confirm no page currently relies on request-time-only data (none was found in this audit — no `searchParams` usage anywhere, no per-request personalization in any public page) before assuming full static generation is safe for every route. |
| **Client/Server Component boundary mistakes** | The biggest ongoing risk throughout Phases 3–7: accidentally leaving a `useState('UA')`+`localStorage` read inside what's meant to become a Server Component (this would silently just not compile, since hooks aren't valid in Server Components — a compile-time safety net, not a silent bug) vs. accidentally converting a genuinely-interactive component (e.g. `RWRCalculator`) to Server, which *would* be a silent, serious functional regression (the calculator would simply stop being interactive). | TypeScript/Next.js will hard-error on hooks-in-Server-Components (self-catching), but there's no automatic catch for "converted an interactive component to Server by mistake" — each phase's manual test list (Section 7) explicitly includes clicking/using the interactive pieces, not just checking that text renders. |
| **Legal pages have no DE/EN/RU translation today** | Confirmed in Section 1.2 — `impressum`/`privacy`/`agb`/`cookies` are 100% Ukrainian-only with zero locale-conditional logic. | This migration cannot invent translations (explicit constraint). Recommended interim approach: serve the *same* (Ukrainian) content at all 4 locale prefixes for these 4 routes specifically, clearly documented as a known, temporary content gap requiring a separate translation task — not silently pretending `/de/impressum` is "properly German" when it isn't yet. |

---

## 7. Dependency-Ordered Implementation Plan

Each phase below is sized to be given to Claude Code independently, in order. **Phases 1–8 build the new locale-aware tree *alongside* the existing site — nothing about the current live site changes or breaks until Phase 9 (cutover).** This means phases 1–8 can each be implemented, built, and reviewed safely without any risk of a broken intermediate deployment; only Phase 9 needs to be treated as a single, careful release.

### Phase 1 — Shared locale utility (foundation, no visible change)
- **Files affected:** 1 new file, e.g. `src/lib/locale.ts`.
- **What changes:** define `SUPPORTED_LOCALES = ['de','en','uk','ru'] as const`, `DEFAULT_LOCALE = 'de'`, a `LOCALE_TO_INTERNAL_KEY` map (`uk→'UA'`, `de→'DE'`, `en→'EN'`, `ru→'RU'`) and its reverse, plus a small `localeHref(locale, path)` helper that prefixes an existing locale-relative path with `/${locale}`.
- **Why:** consolidates the mapping currently duplicated in `LangSync.tsx:9` and the 5 Cabinet-link sites; gives every later phase one shared, testable source of truth instead of ad-hoc inline logic.
- **Risk:** Very low — pure addition, imported by nothing yet.
- **How to test:** `npx tsc --noEmit`; manually confirm the map's 4 entries exactly match the existing `LANG_MAP` values in `LangSync.tsx:9` and `Navbar.tsx:99`.
- **Must remain unchanged:** everything else — this file isn't referenced anywhere yet.

### Phase 2 — `[locale]` layout shell (foundation)
- **Files affected:** new `src/app/[locale]/layout.tsx`; read (not modified) `src/app/layout.tsx` to decide its eventual fate (actual restructuring of `src/app/layout.tsx` happens in Phase 9, not here, to avoid disturbing the still-live old routes early).
- **What changes:** create the new layout, validate `params.locale` against `SUPPORTED_LOCALES` (from Phase 1), call `notFound()` for anything else, render `<html lang={params.locale}><body>{children}</body></html>` **for now, as a standalone experimental branch** (it will not yet be reachable by real traffic, since no pages exist under `[locale]` yet).
- **Why:** establishes the html-lang-owning shell before any page is built on top of it.
- **Risk:** Low — new, unreferenced-by-users code path.
- **How to test:** `npm run build` succeeds; a temporary throwaway `src/app/[locale]/page.tsx` (deleted before committing, or replaced immediately by Phase 3) can confirm `/de/`, `/en/`, `/uk/`, `/ru/` 200 and `/xx/` 404 via local `curl`.
- **Must remain unchanged:** `src/app/layout.tsx` and every existing route.

### Phase 3 — Homepage under `[locale]` (proof of concept)
- **Files affected:** new `src/app/[locale]/page.tsx` (adapted copy of `src/app/page.tsx`'s content — same JSX, same `HERO_TEXT`/`QLIXA_TEXT`/etc. objects verbatim, only the `lang` source changed from `useState('UA')` to `params.locale` mapped via Phase 1's utility).
- **Why:** proves the whole pattern end-to-end on the single most complex page before repeating it 15 more times, and surfaces any Client/Server boundary issues (e.g. the homepage's interactive pieces — feature grids, sliders — must be isolated into Client children receiving text as props) while there's only one page to debug.
- **Risk:** Medium — first real test of the pattern; likely to surface the first genuine Client/Server boundary questions.
- **How to test:** `npm run build`; `curl http://localhost:3000/de` and confirm German text in raw HTML (no JS executed); repeat for `/en`, `/uk`, `/ru`; click-test every interactive homepage element (sliders, expandable cards) in a browser.
- **Must remain unchanged:** `src/app/page.tsx` (old route) keeps serving exactly as today — both coexist.

### Phase 4 — Navbar and Footer made locale-aware (shared, high-impact)
- **Files affected:** `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`.
- **What changes:** both accept a `locale` prop (instead of deriving it from `useState`+`localStorage`) for their *initial* render; the switcher (`handleLang`) changes from "set state" to "navigate to the equivalent path under the new locale" per Section 4.5; internal link `href`s wrapped with Phase 1's `localeHref()` helper; Cabinet links' existing mapping expression simplified per Section 4.9.
- **Why:** these two components render on every single page — getting this right once here, rather than per-page, is what makes Phases 5–7 mechanical repeats rather than novel work each time.
- **Risk:** High — highest-blast-radius files in the whole site; a mistake here affects every page simultaneously.
- **How to test:** on the Phase-3 homepage (the only page using the new Navbar/Footer at this point), verify: language switcher moves between `/de`, `/en`, `/uk`, `/ru` correctly and preserves the current path; burger menu and mobile language dropdown still open/close/trap focus correctly (regression check against this session's earlier Navbar accordion work); Cabinet links resolve to the correct `?lang=` value at each locale; Footer's error-report modal still opens/closes/submits correctly (regression check against the Footer modal work).
- **Must remain unchanged:** the OLD `src/app/page.tsx` and every other still-untouched old route must continue importing and rendering the *original* client-side-lang-reading behavior correctly — meaning this phase likely requires Navbar/Footer to support **both** modes temporarily (accept an optional `locale` prop; fall back to the existing `useState`+`localStorage` behavior when no prop is passed), so the old, not-yet-migrated routes don't break. This dual-mode support is removed in Phase 9 once nothing depends on the fallback anymore.

### Phase 5 — Remaining simple pages (Pricing, Tax Return, Tools, About, Our Story)
- **Files affected:** 5 new files under `src/app/[locale]/…`, mirroring each existing page's content and translation objects verbatim.
- **Why:** these pages share the same "outer shell becomes Server Component, interactive fragments become small Client children" pattern proven in Phase 3, with no additional novel architecture — Pricing's mobile accordion (`expandedPlan` state) is the one piece here needing explicit extraction into a Client child.
- **Risk:** Medium (repetition of a proven pattern, but 5 files at once — recommend splitting into 5 sub-commits/reviews even though listed as one phase here).
- **How to test:** for each of the 5, `curl` all 4 locale URLs and confirm correct language in raw HTML; click-test Pricing's accordion, Tax Return's questionnaire-entry CTA, and any other interactive element on each page.
- **Must remain unchanged:** the 5 old flat routes, still fully functional in parallel.

### Phase 6 — Articles (listing + 5 article pages + `ArticleNav.tsx`)
- **Files affected:** 6 new page files under `src/app/[locale]/articles/…`; `src/components/layout/ArticleNav.tsx` made locale-aware (same treatment as Navbar/Footer in Phase 4 — `ArticleSidebar`, `ArticleTOC`, `ArticlePrevNext` all currently do their own independent `useState('UA')`+`localStorage` read); `src/components/layout/ArticlesSlider.tsx` similarly updated for its internal article links.
- **Why:** the largest content phase (the 5 articles are the biggest files in the repo, e.g. `rwr-karte/page.tsx` at 918 lines), and the one place besides Navbar/Footer where a shared component (`ArticleNav.tsx`) needs the same dual-mode treatment as Phase 4.
- **Risk:** Medium-High — largest file sizes, and `ArticleNav.tsx`'s `getAdjacentArticles()` slug-matching logic (Section 6 risk table) needs to keep working unchanged.
- **How to test:** `curl` all 4 locale URLs for all 6 routes; confirm TOC accordion (mobile) still starts collapsed and expands correctly (regression check against the Articles mobile-adaptation work); confirm prev/next article links still point to the correct adjacent article at each locale; embedded `RWRCalculator` on `rwr-karte` still fully functional (regression check against the calculator anchor-scroll fix); confirm anchor-scroll (`#calculator`, `#eligibility`, etc.) still lands correctly below the Navbar at each locale.
- **Must remain unchanged:** RWRCalculator's own internals (Section 1.3 — it stays a Client Component; only *how it receives its initial language* is a candidate for adjustment, and only if convenient — not required for this migration's core goal, since it's a Client-only interactive tool, not SSR content).

### Phase 7 — Legal pages (Impressum, Privacy, AGB, Cookies) + `LegalLayout.tsx`
- **Files affected:** 4 new page files under `src/app/[locale]/…`; `src/components/layout/LegalLayout.tsx` made locale-aware for its sidebar/mobile-nav labels and links.
- **What changes, with an explicit caveat:** since these 4 pages currently have **zero** DE/EN/RU content (Section 1.2), this phase can only make the *routing* correct — `/de/impressum`, `/en/impressum`, `/uk/impressum`, `/ru/impressum` all become real, independently server-rendered URLs, but (per the interim recommendation in Section 6's risk table) all four currently serve the *same* Ukrainian legal text until real translations exist. This must be clearly labeled in code comments and in whatever tracking system the team uses — it is a deliberate, temporary, honestly-documented gap, not an oversight.
- **Why:** completes the route inventory; unblocks a future, separate translation task without inventing content now.
- **Risk:** Low technically (simplest content structure of any page — no interactivity beyond `LegalLayout`'s own nav), but flagged Medium for the content-gap communication risk (someone downstream could mistake "the URL exists" for "the translation exists").
- **How to test:** `curl` all 4 locale × 4 route combinations, confirm 200 and correct `<html lang>`; confirm `LegalLayout`'s sidebar/mobile-nav still correctly highlights the active document at each locale; confirm the (currently Ukrainian-only, unchanged) legal text itself is byte-identical to today's content at every locale prefix — this migration must not accidentally *summarize or shorten* the legal text while relocating it.
- **Must remain unchanged:** the actual legal wording, word-for-word, at every locale — this phase only changes where and how it's served, never what it says.

### Phase 8 — Internal link localization sweep
- **Files affected:** re-visit and finalize every file from Section 1.1's two link-pattern lists, confirming every `<Link>`/`<a href>` created or touched in Phases 3–7 correctly uses `localeHref()`; explicitly re-check `src/lib/articles.ts` consumers (should need zero changes to the data file itself, per Section 4.8).
- **Why:** a dedicated final pass specifically to catch anything Phases 3–7 might have missed while focused on page-by-page migration — internal links are exactly the kind of thing that's easy to get 90% right per-page and then discover one broken cross-link in review.
- **Risk:** Medium — the risk isn't in *making* this change (mechanical), it's in *verifying completeness*.
- **How to test:** from each of the 4 locale homepages, click through every visible internal link (Navbar items, Footer columns, homepage CTAs, article cross-links, legal-page nav) and confirm every single one stays within the same locale prefix unless the user explicitly used the language switcher.
- **Must remain unchanged:** nothing new here — this phase is verification-and-fixup of Phases 3–7's own output.

### Phase 9 — Cutover (the one phase that touches the live site's behavior)
- **Files affected:** delete `src/app/page.tsx`, `pricing/`, `about/`, `our-story/`, `tax-return/`, `tools/`, `articles/` (old versions), `impressum/`, `privacy/`, `agb/`, `cookies/` (all now superseded by their `[locale]` equivalents); delete all 9 legacy redirect `page.tsx` files (`for/*` ×6, `datenschutz`, `terms`, `how-it-works/tax-return`); add `middleware.ts` at the repository root implementing (a) the root `/` redirect (Section 2, Variant B recommended) and (b) the 9 legacy-path redirects to their `de`-prefixed targets (Section 4.10); simplify `src/app/layout.tsx` to no longer be the `<html>` owner (per Section 4.4's resolution — **VERIFY AT IMPLEMENTATION TIME** the exact minimal shape Next.js 15 requires here); delete `src/components/layout/LangSync.tsx`; remove the now-unused dual-mode fallback logic added to `Navbar.tsx`/`Footer.tsx` in Phase 4.
- **Why:** this is the moment the migration actually takes effect for real visitors — everything before this phase was additive and risk-free; this phase is where the old architecture is finally removed.
- **Risk:** **High** — this is the only phase where a mistake is user-visible in production immediately. Recommend deploying this phase to a staging/preview environment first, running the full Section 8 validation checklist there, and only then promoting to production — not merging directly to the production branch without a preview pass.
- **How to test:** the entire Section 8 checklist below, run in full, against a staging deployment before production.
- **Must remain unchanged:** the *content* of every page — this phase is pure deletion-of-superseded-files plus the new middleware; if any page's rendered output differs from what Phases 3–7 already validated, that's a bug introduced by the cutover itself (e.g. a stray import of a deleted file), not a new content change.

---

## 8. Rollback Strategy

Because Phases 1–8 never modify or remove anything from the currently-live site, **rollback for those phases is trivial: revert the commit(s), nothing about production changes.** This is the main reason this plan is structured as additive-first, cutover-last.

For **Phase 9 specifically** (the one phase with real production risk):
1. Deploy Phase 9 to a preview/staging environment first (this repository's existing deployment setup already supports preview deployments, based on the Cabinet's own `*.vercel.app` hosting pattern observed in this codebase).
2. Run the full Section 8 validation checklist against staging.
3. If production deployment reveals an unexpected problem: **revert the single Phase-9 commit** (not a partial hand-fix) — since Phase 9 is deletion-plus-middleware only, a clean git revert restores the exact old flat-route files and removes the new middleware in one atomic operation, immediately restoring the previously-working site.
4. Keep the `[locale]` tree itself intact during any Phase-9 rollback (don't delete it) — only the *cutover* (old-route removal + middleware) is reverted, so the next attempt doesn't need to redo Phases 1–8.
5. If a rollback is needed after the redirect middleware has already been live for some time (i.e., search engines or users may have already been redirected), be aware that reverting removes the 308 redirects — anyone who bookmarked a new `/de/…` URL during that window will still work fine (those pages aren't deleted by the revert, only the old-route removal and middleware are undone), but anyone still hitting an old bookmarked flat URL will see the pre-migration behavior return, which is the safe, expected outcome of a full revert.

---

## 9. Validation Plan (For the Eventual Implementation)

**Server-rendered language, verified before any JavaScript executes** (the core requirement):
```bash
curl -s http://localhost:3000/de/pricing | grep -oE '<html[^>]*>|<h1[^>]*>.*</h1>' 
curl -s http://localhost:3000/en/pricing | grep -oE '<html[^>]*>|<h1[^>]*>.*</h1>'
curl -s http://localhost:3000/uk/pricing | grep -oE '<html[^>]*>|<h1[^>]*>.*</h1>'
curl -s http://localhost:3000/ru/pricing | grep -oE '<html[^>]*>|<h1[^>]*>.*</h1>'
```
Confirm: (a) `<html lang="de">` / `en` / `uk` / `ru` respectively, and (b) the H1/visible text is in the correct language — both from the *raw* `curl` output, with zero JavaScript execution involved, exactly mirroring the verification method already used in the prior SEO audit.

**Repeat the above for every route** in the Section 4.1 tree (16 content routes × 4 locales = 64 checks, or scripted as a loop).

**Language switching:**
- Open `/de/pricing` in a browser, use the switcher to select English → confirm URL becomes `/en/pricing` and content is English, without a full page reload feeling broken (client-side navigation should still work).
- Repeat starting from each of the other 3 locales.

**Direct URL visits (no prior navigation):**
- Directly load `/uk/articles/rwr-karte` (simulating someone clicking a shared link or a search result) → confirm correct language, no flash of Ukrainian-then-correct-language, no flash of wrong language at all.

**Refresh:**
- On `/en/about`, hit browser refresh → confirm still English (this specifically catches any regression where a Client Component's `localStorage` read could override the URL-derived locale after a hard reload).

**Internal navigation:**
- From `/ru/`, click through Navbar items, Footer links, homepage CTAs → confirm every destination stays under `/ru/…` unless the switcher was used.

**Articles:**
- Confirm prev/next article navigation (`ArticlePrevNext`) stays within the current locale.
- Confirm the mobile TOC accordion (starts collapsed, expands, closes on link tap) still works at every locale.
- Confirm the embedded `RWRCalculator` on `/de/articles/rwr-karte` is fully interactive and the `#calculator` anchor still lands correctly below the Navbar (regression check against the earlier anchor-scroll fix).

**Legal pages:**
- Confirm all 4 locale × 4 legal-route combinations return 200 with the correct (currently Ukrainian-only, per Phase 7's documented interim state) content, and that `LegalLayout`'s active-document highlighting still works correctly at each locale.

**Mobile navigation:**
- Re-run the mobile Navbar burger/language-dropdown regression check (focus trap, Escape, outside-tap-close) at `/de/` on a narrow viewport — this is the single highest-risk shared component from Phase 4.

**Cabinet links:**
- From each locale, click through to the Cabinet login CTA and confirm the resulting URL's `?lang=` parameter is `de`/`en`/`uk`/`ru` as appropriate (never `ua`).

**Old redirect routes (post-cutover, Phase 9):**
```bash
curl -s -o /dev/null -D - http://localhost:3000/for/biznes | head -1     # expect 308 → /de/pricing
curl -s -o /dev/null -D - http://localhost:3000/datenschutz | head -1   # expect 308 → /de/privacy
curl -s -o /dev/null -D - http://localhost:3000/terms | head -1         # expect 308 → /de/agb
curl -s -o /dev/null -D - http://localhost:3000/how-it-works/tax-return | head -1  # expect 308 → /de/tax-return
curl -s -o /dev/null -D - http://localhost:3000/ | head -1              # expect 308 → /de/ (or Accept-Language target)
```

**Invalid locale URLs:**
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/xx/pricing   # expect 404
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/DE/pricing   # expect 404 or a deliberate redirect — confirm which was chosen (Section 4.2)
```

**`npm run build`:**
- Confirm the build succeeds with no new TypeScript errors.
- Confirm the route list in the build output shows all 64 `(route × locale)` combinations as statically generated (○ Static), not dynamically rendered — this is the concrete, checkable signal that `generateStaticParams` is working and the SEO/performance benefit described in Section 5 is actually being realized.
- The known pre-existing `nextVitals is not iterable` ESLint warning is expected and unrelated — do not treat it as a regression.

---

## Files Inspected (for this planning task)

`package.json`, `next.config.js`, `src/app/layout.tsx`, every `page.tsx` under `src/app` (traversed in full: home, pricing, about, our-story, tax-return, tools, articles listing + 5 articles, impressum, privacy, agb, cookies, all 6 `for/*`, datenschutz, terms, how-it-works/tax-return), `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/LangSync.tsx`, `src/components/layout/LegalLayout.tsx`, `src/components/layout/ArticleNav.tsx`, `src/components/layout/ArticlesSlider.tsx`, `src/components/RWRCalculator.tsx`, `src/components/RWRChecklists.tsx`, `src/lib/articles.ts`, plus repository-wide `grep` sweeps for `useState('UA')`, `qlixa-lang`, `navigator.language(s)`, internal `href` patterns (both literal JSX attributes and data-object properties), and `cabinet-ten-lac` link construction.

## Questions / Decisions Needed From the Team (Not Answerable From Code Alone)

1. **Root `/` redirect:** Variant A (always `/de/`) or Variant B (Accept-Language-negotiated, `/de/` fallback) — Section 2. This plan recommends B but it's ultimately a product call.
2. **Legal-page translations:** who/when will DE/EN/RU Impressum/Privacy/AGB/Cookies content be produced? Phase 7 can only fix routing, not create this content (Section 1.2, Section 6).
3. **Invalid-locale-URL casing:** should `/DE/pricing` 404, or redirect to `/de/pricing`? (Section 4.2) — a small decision but worth making deliberately.
4. **Cabinet `?lang=` consistency:** should Pricing's two Cabinet CTAs (currently missing `?lang=`) be brought in line with the other 3 call sites while Phase 5 touches that file anyway? (Section 4.9) Not required by this migration, but a natural opportunity.
5. **Deployment/staging environment:** confirm a preview/staging deployment path exists for safely validating Phase 9 before it reaches production (Section 8, Rollback Strategy assumes this is available).

---

# Summary

1. **Recommended architecture:** native Next.js 15 App Router `[locale]` dynamic-segment routing (`de`/`en`/`uk`/`ru`), with a small hand-written `middleware.ts` handling the root `/` redirect and the 9 legacy-path redirects, `params.locale` as the sole source of truth for server-rendered language (no `localStorage`/`navigator` involved in initial render), and every existing translation object kept exactly as-is, just re-indexed by the URL-derived locale instead of client state.
2. **Files likely affected:** approximately **35–40 files** — roughly 16 page routes moved into the new tree, 6 shared components made locale-aware (Navbar, Footer, ArticleNav, ArticlesSlider, LegalLayout, and optionally RWRCalculator), 9 legacy redirect files replaced by one middleware file, 1 new locale-utility file, `src/app/layout.tsx` simplified, and `LangSync.tsx` deleted.
3. **Native Next.js routing vs. i18n library:** native Next.js App Router routing is recommended; `next-intl` is explicitly not recommended for this codebase, primarily because a meaningful share of the existing translation content is JSX (not plain strings), and migrating it into a message-catalog format would force exactly the kind of content-rewriting this task prohibits.
4. **Three highest migration risks:** (1) the Client/Server Component boundary — accidentally leaving a genuinely-interactive component server-rendered, or a Server-intended page still reading `localStorage`, would silently break either interactivity or the SEO goal; (2) the internal-link localization sweep — 17 files reference internal paths, and missing even one leaves a working page that silently drops locale context on the next click; (3) the Phase-9 cutover itself — the only phase with real production-visible risk, since everything before it is additive and reversible by a simple commit revert.
5. **`QLIXA_I18N_MIGRATION_PLAN.md` was created** at the repository root.
6. **No production or code files were modified** — confirmed via `git status` showing only the new planning document as an untracked addition.
