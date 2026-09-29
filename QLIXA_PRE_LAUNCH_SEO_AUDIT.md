# QLIXA Pre-Launch SEO Audit

Audit date: 2026-09-28
Scope: static code audit of this repository only. No files were modified. All HTTP-status claims were verified by running `npm run build` + `npm run start` locally and inspecting the served output with `curl`; no other network access was used.

---

## 1. Executive Summary

**Overall technical SEO readiness: NOT READY for public launch in its current form.**

The site is a well-structured, content-rich Next.js 15 App Router application with genuinely good on-page content (5 real articles, a working RWR+ calculator, a clear pricing model). However, it currently has **no page-level metadata, no sitemap, no robots.txt, and no URL-based internationalization** — every single route serves the exact same `<title>`, meta description, Open Graph tags, and `<html lang="en">`, and the site's stated "primary SEO language" (German) has no crawlable URL anywhere. These are foundational technical-SEO gaps, not polish items.

**Biggest strengths**
- Real, substantial, non-thin editorial content (5 full articles with genuine step-by-step guidance).
- A single legitimate H1 per page, generally clean heading structure inside content sections.
- No `href="#"` placeholder links, no Lorem ipsum, no localhost/staging URL leaks found anywhere in the codebase.
- Clean separation of the authenticated app (hosted externally at `cabinet-ten-lac.vercel.app`) from this public marketing/content codebase — no private/session/dashboard routes exist inside this repository to accidentally leak into a sitemap.
- No query-parameter-driven pages anywhere (`searchParams`/`useSearchParams` unused), eliminating an entire class of duplicate-URL risk.

**Biggest launch risks**
1. No `sitemap.xml`, no `robots.txt` anywhere in the repository.
2. Every route shares one identical, generic `<title>` / meta description / OG tags — defined once in `src/app/layout.tsx` — and that shared description contains the word **"platform,"** which the project's own product-language rules explicitly forbid.
3. No canonical tags anywhere, and no `hreflang` implementation anywhere — combined with the fact that there is **no separate URL per language** (German/English/Russian content only appears after client-side JavaScript reads `localStorage`, and the server-rendered HTML is always Ukrainian by default), this means Googlebot has no reliable way to discover or rank the German-language content the project states is its **primary SEO language**.
4. All four legal/trust pages (Impressum, Privacy, AGB, Cookies) — currently live and indexable — contain a visible, Ukrainian-only placeholder banner stating the documents are a "working template" ("Робочий шаблон") pending GmbH registration. One of these banners (`/agb`) additionally uses the forbidden word "платформи" (platform).
5. All 8 legacy/redirect routes (`/for/*`, `/datenschutz`, `/terms`, `/how-it-works/tax-return`) return **307 Temporary Redirect**, verified against the actual production build — the conventional choice for a permanent URL change is a 301/308 permanent redirect.

**Finding counts**

| Severity | Count |
|---|---|
| Critical | 6 |
| High | 8 |
| Medium | 9 |
| Low | 7 |

(Full detail in sections 2–5 below; no numeric "SEO score" is given, per instructions.)

---

## 2. Critical Launch Blockers

### C1 — No sitemap.xml anywhere in the repository
**Severity:** Critical
**Area:** Sitemap
**Affected route(s):** all
**Affected file(s):** none exist — searched `src/app/**/sitemap*`, `public/sitemap*`, repo-wide `find . -iname "*sitemap*"` (excluding `node_modules`)
**Current behavior:** No `src/app/sitemap.ts`/`sitemap.xml` route handler, no static `public/sitemap.xml`.
**Why it matters:** Without a sitemap, Google Search Console has no authoritative list of URLs to prioritize crawling, and there is no mechanism to signal `lastmod`/`alternates` per page.
**Recommended fix:** Add `src/app/sitemap.ts` using Next.js's built-in `MetadataRoute.Sitemap` API, listing every route in Section 6's "SHOULD INCLUDE" list with absolute `https://qlixa.eu` URLs.

### C2 — No robots.txt anywhere in the repository
**Severity:** Critical
**Area:** Robots
**Affected route(s):** all
**Affected file(s):** none exist — searched `src/app/**/robots*`, `public/robots*` (both absent)
**Current behavior:** No robots file at all. Next.js will not serve `/robots.txt` unless one is explicitly added (statically in `public/` or via `src/app/robots.ts`).
**Why it matters:** Without a robots.txt, there is no sitemap declaration for crawlers to discover automatically, and no documented crawl policy.
**Recommended fix:** Add `src/app/robots.ts` (or `public/robots.txt`) allowing all public routes and pointing `Sitemap:` at `https://qlixa.eu/sitemap.xml`.

### C3 — Every route shares one identical, generic title/description, and it contains the forbidden word "platform"
**Severity:** Critical
**Area:** Metadata
**Affected route(s):** every route in the site (verified on `/`, `/pricing`, `/articles/rwr-karte` via `curl`)
**Affected file(s):** `src/app/layout.tsx:6-22`
**Current behavior (verified via production `curl`):**
```
<title>QLIXA — Reports in one click</title>
<meta name="description" content="Smart online accounting platform for foreigners in Austria. Buchhaltung made simple."/>
```
identical on every page tested, because no route in the entire `src/app` tree exports its own `metadata` — this is the sole, global `export const metadata` in the codebase.
**Why it matters:** (a) Duplicate titles/descriptions across dozens of indexable URLs is one of the most basic technical-SEO defects and actively suppresses ranking differentiation between pages; Search Console will flag this as "Duplicate, Google chose different canonical" or similar. (b) The description literally contains **"platform,"** which the project's explicit terminology rule forbids in public-facing copy — this is the single most-crawled, most user-visible string on the entire site (it's what shows in Google's search snippet and every browser tab).
**Recommended fix:** Add a `generateMetadata`/`metadata` export per route (this requires converting the relevant page or a thin wrapper to a Server Component, since all current pages are `'use client'` — see Section 21 for suggested copy per page that avoids "platform").

### C4 — No canonical tags and no hreflang anywhere, combined with no URL-based internationalization
**Severity:** Critical
**Area:** International SEO / Canonical
**Affected route(s):** all
**Affected file(s):** `src/app/layout.tsx` (no `alternates.canonical`, no `alternates.languages`); confirmed via repo-wide `grep -rn "canonical"` returning zero results in `src/`
**Current behavior:** No `<link rel="canonical">` is served on any page (verified via `curl`). No `hreflang` attributes exist anywhere. Language switching (UA/DE/EN/RU) happens entirely client-side via `localStorage['qlixa-lang']`, read in a `useEffect` inside ~15 separate page/component files (e.g. `src/app/page.tsx:782`, `src/components/layout/Navbar.tsx:84-110`). Every page's initial render state is hardcoded to `useState('UA')` (confirmed in 15 files, e.g. `src/app/pricing/page.tsx:277`, `src/app/page.tsx:782`). There is **one URL per page, not one URL per language** — e.g. there is no `/de/pricing`, no `?lang=de`, no `pricing.qlixa.eu/de` equivalent.
**Why it matters:** The project states German is the primary SEO/content language for the Austria market, but there is no crawlable German URL anywhere on the site. A crawler visiting `https://qlixa.eu/pricing` for the first time (no stored `localStorage` value) will always receive Ukrainian content in the raw server-rendered HTML, and after JavaScript executes, `Navbar.tsx`'s browser-language-detection logic (`navigator.languages`, `src/components/layout/Navbar.tsx:95-107`) will resolve to whatever language Googlebot's headless Chrome reports — commonly `en`, not `de` — meaning **Google most likely indexes the English or Ukrainian rendering of every page, and has no reliable path to the German content at all**, on any URL. Hreflang cannot be implemented meaningfully until each language has its own URL.
**Recommended fix:** This is an architectural decision, not a quick patch (see Section 8 and the Founders' Questions at the end). At minimum before launch: decide whether language will be URL-based (`/de/...`, `/en/...` etc. — enables hreflang and per-language indexing) or intentionally single-URL with only the default language indexed (in which case German should become the **default** render state instead of Ukrainian, given the stated market).

### C5 — All four legal/trust pages are publicly served with a visible "working template" placeholder banner
**Severity:** Critical
**Area:** Content / Legal / Trust
**Affected route(s):** `/impressum`, `/privacy`, `/agb`, `/cookies`
**Affected file(s):**
- `src/app/impressum/page.tsx:24` — "⚠️ Робочий шаблон — поля позначені червоним потребують заповнення після реєстрації GmbH"
- `src/app/privacy/page.tsx:24` — "⚠️ Робочий шаблон — буде оновлено після реєстрації GmbH та підключення всіх сервісів"
- `src/app/agb/page.tsx:26` — "⚠️ Робочий шаблон — буде оновлено після реєстрації GmbH та запуску **платформи**."
- `src/app/cookies/page.tsx:23` — "⚠️ Робочий шаблон — буде оновлено після реєстрації QLIXA GmbH та підключення всіх сервісів."
- Also present in the shared sidebar/mobile nav component: `src/components/layout/LegalLayout.tsx:42` and `:100`
**Current behavior:** Every legal page — including the Impressum, which is a legally required trust page in Austria/Germany — displays a visible admission that the document is an incomplete template, in Ukrainian only, on every device (desktop and mobile), regardless of the visitor's selected site language.
**Why it matters:** This is both a legal-trust and an SEO-trust concern: publishing a legal document that self-identifies as incomplete undermines the credibility signal these pages exist to provide, and — separately — the `agb` instance of this banner contains the forbidden "платформи" (platform) wording.
**Recommended fix:** This is a content decision for the founders (finalize the legal text and remove the banner) — not something this audit modifies. Flagging as a hard launch blocker: do not index/launch these four pages with this banner still present.

### C6 — Root `<html lang="en">` never reflects the page's actual served language, and is only corrected client-side
**Severity:** Critical
**Area:** International SEO / Accessibility
**Affected route(s):** all
**Affected file(s):** `src/app/layout.tsx:31` (`<html lang="en">`, hardcoded); corrected only client-side by `src/components/layout/LangSync.tsx:20-26` inside a `useEffect`
**Current behavior (verified via production `curl`, i.e. what a non-JS crawler/scraper receives):** `<html lang="en">` on every route, even though the actual server-rendered body content is Ukrainian by default (see C4).
**Why it matters:** The `lang` attribute is a primary language signal for search engines and assistive technology. As served, it is neither correct for the actual (Ukrainian) content nor for the stated primary market (German). This compounds C4 rather than being a separate root cause.
**Recommended fix:** Resolve together with C4 — once each language has a real URL, set `<html lang>` server-side per-locale instead of via a client `useEffect`.

---

## 3. High Priority Before Launch

### H1 — Legacy/redirect routes use temporary (307) redirects, verified in production build
**Severity:** High
**Area:** Redirects
**Affected route(s):** `/for/biznes`, `/for/frilanser`, `/for/naymanyy`, `/for/nerukhomist`, `/for/pensioner`, `/for/samostiynyy`, `/datenschutz`, `/terms`, `/how-it-works/tax-return`
**Affected file(s):** `src/app/for/*/page.tsx`, `src/app/datenschutz/page.tsx`, `src/app/terms/page.tsx`, `src/app/how-it-works/tax-return/page.tsx` — all use `redirect()` from `next/navigation`
**Current behavior (verified via `curl -D -` against the production build):**
```
/for/biznes    -> HTTP/1.1 307 Temporary Redirect
/for/frilanser -> HTTP/1.1 307 Temporary Redirect
/datenschutz   -> HTTP/1.1 307 Temporary Redirect
/terms         -> HTTP/1.1 307 Temporary Redirect
/how-it-works/tax-return -> HTTP/1.1 307 Temporary Redirect
```
**Why it matters:** `redirect()` from `next/navigation` issues a 307 by default. A 307 signals to search engines that the redirect may be temporary, so link-equity consolidation onto the target URL is less reliable than with a 301/308. These are clearly intentional, permanent URL changes (old locale-specific slugs → the unified `/tax-return` and `/pricing` pages), which is exactly the case a permanent redirect is for.
**Recommended fix:** Use `permanentRedirect()` from `next/navigation` (App Router equivalent that issues a 308) for all 9 of these routes, or implement them as `redirects()` entries in `next.config.js` with `permanent: true`.

### H2 — No Open Graph image configured anywhere; social shares fall back to a bare `summary` card with no visual
**Severity:** High
**Area:** Open Graph / Social
**Affected route(s):** all
**Affected file(s):** `src/app/layout.tsx:13-22` — `openGraph` object has `title`, `description`, `url`, `siteName`, `locale`, `type`, but no `images` key at all
**Current behavior (verified via `curl`):** No `<meta property="og:image">` is served on any page. `<meta name="twitter:card" content="summary">` is present (the smallest Twitter/X card format, which itself implies no image), but no `<meta name="twitter:image">` either.
**Why it matters:** Shared links on WhatsApp, Telegram, LinkedIn, Facebook, and X will render with title/description text only and no preview image — a materially weaker click-through experience, especially for WhatsApp/Telegram where a link with no image looks broken or untrustworthy to many users.
**Recommended fix:** Add a default OG image (1200×630px) to `openGraph.images` in `layout.tsx`, and set `metadataBase: new URL('https://qlixa.eu')` so relative image paths resolve correctly (currently `metadataBase` is not set at all — confirmed via `grep -n "metadataBase" src/app/layout.tsx` returning nothing).

### H3 — `og:locale` is `en_US`, inconsistent with the stated primary Austrian/German market
**Severity:** High
**Area:** Open Graph / International SEO
**Affected file(s):** `src/app/layout.tsx:19`
**Current behavior:** `locale: 'en_US'` (the only locale value present; no `alternateLocale` array).
**Why it matters:** `og:locale` should generally match the actual served/primary content language. Given the stated German-primary strategy, `en_US` is very likely the wrong default, and there is no `og:locale:alternate` for DE/EN/RU/UA either way.
**Recommended fix:** Decide together with C4 (this is the same underlying architecture question) — likely `de_AT` as primary once German has a real URL, with `alternateLocale` entries for the others.

### H4 — Article metadata source (`src/lib/articles.ts`) is Ukrainian-only and has no date fields
**Severity:** High
**Area:** Articles / Structured Data / Sitemap
**Affected file(s):** `src/lib/articles.ts:12-52`
**Current behavior:** The canonical article list (`title`, `desc`, `tag`) used by `/articles` and by `ArticleNav.tsx`'s shared sidebar is defined once, in Ukrainian, with no `publishedDate`/`updatedDate`/`lastModified` field of any kind. (Per-article page bodies do have their own separately-maintained `RWR_TEXT`/`GA_TEXT`-style translation objects with a free-text `date` string like `'Липень 2026'` — not a machine-readable date, and only present inside each article's own hero, not in the shared `articles.ts` source.)
**Why it matters:** (a) Without real `Date` values, `Article`/`BlogPosting` schema (`datePublished`/`dateModified`) cannot be implemented without inventing data, which the audit instructions explicitly prohibit — flagging this as the blocker. (b) A sitemap's `lastmod` field for these 5 article URLs cannot be populated from anything currently in the codebase without a manual, invented value.
**Recommended fix:** Add real `publishedAt`/`updatedAt` fields (ISO dates) to `src/lib/articles.ts` when the founders confirm actual publish dates.

### H5 — Google Fonts loaded via a render-blocking `@import`, not `next/font`
**Severity:** High
**Area:** Performance (code-level risk only)
**Affected file(s):** `src/styles/globals.css:1`
**Current behavior:**
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
```
Confirmed via repo-wide search: `next/font` is not imported anywhere (`grep -rn "next/font" src` returns nothing).
**Why it matters:** OBSERVED CODE RISK — a CSS `@import` for an external stylesheet is render-blocking and requires an extra round-trip (CSS file → then the font files it references) before text can paint in the correct font, which is a known contributor to layout shift and slower First Contentful Paint. `next/font` self-hosts and inlines font-loading metadata, eliminating this extra hop. REQUIRES PRODUCTION MEASUREMENT to quantify actual impact (Core Web Vitals field data is not available from a code audit).
**Recommended fix:** Migrate to `next/font/google` for DM Sans / DM Serif Display / DM Mono.

### H6 — `next.config.js` disables all image optimization site-wide
**Severity:** High
**Area:** Performance (code-level risk only)
**Affected file(s):** `next.config.js:3-5`
**Current behavior:**
```js
images: { unoptimized: true },
```
**Why it matters:** OBSERVED CODE RISK — with `unoptimized: true`, even the pages that do use `next/image` (`src/app/page.tsx`, `src/app/articles/*/page.tsx`, `Navbar.tsx`, `ArticlesSlider.tsx`, `Footer.tsx`) receive none of Next's automatic resizing/format-conversion (WebP/AVIF) benefits — images are served exactly as uploaded. Combined with the large number of raw `<img>` tags site-wide (17 in the homepage alone, per `grep -c "<img " src/app/page.tsx`), this is a real, code-verifiable performance risk, though actual impact REQUIRES PRODUCTION MEASUREMENT.
**Recommended fix:** If the hosting target supports Next's Image Optimization API (e.g. Vercel), remove `unoptimized: true`. If images are intentionally pre-optimized and served from a CDN that already handles this, note that reasoning in the config as a comment (NOT VERIFIED FROM CODE whether this is the actual reason — flagging for founder confirmation).

### H7 — No structured data (JSON-LD) anywhere on the site
**Severity:** High
**Area:** Structured Data
**Affected route(s):** all
**Affected file(s):** none exist — repo-wide `grep -rn "application/ld+json\|schema.org" src` returns zero results
**Current behavior:** No `WebSite`, `Organization`, `BreadcrumbList`, or `Article`/`BlogPosting` schema exists anywhere.
**Why it matters:** Structured data doesn't guarantee rich results, but `Organization`/`WebSite` schema is low-risk, low-effort, and helps Google understand brand identity and enables the sitelinks search box; `BreadcrumbList` helps search-result breadcrumb display on deep pages like articles.
**Recommended fix:** See Section 12 (Structured Data Audit) for a concrete, fact-only `Organization`/`WebSite` proposal that invents no ratings, reviews, counts, or addresses.

### H8 — No Search Console verification, no analytics implementation found in code, despite Privacy/Cookie pages stating Plausible Analytics is in use
**Severity:** High
**Area:** Analytics / Search Console Readiness
**Affected file(s):** `src/app/privacy/page.tsx:84,140,160`, `src/app/cookies/page.tsx:67` (prose claims); repo-wide search for any actual Plausible/GA/GTM script tag or npm dependency returns nothing (`package.json` dependencies are only `@supabase/supabase-js`, `next`, `react`, `react-dom`)
**Current behavior:** The Privacy Policy and Cookie Policy pages both state, in prose, that "Plausible Analytics" is used, is GDPR-minimal, and doesn't require cookie consent. No corresponding script, tag, or dependency exists anywhere in this repository.
**Why it matters:** If Plausible truly isn't wired in yet, the legal pages are describing a data-processing practice that isn't actually happening (or it's added at a layer outside this repo — **NOT VERIFIED FROM CODE**). Either way this needs founder confirmation before launch, since it affects both legal accuracy and analytics readiness. Separately: Search Console verification does not require Analytics — no verification meta tag or DNS-based verification evidence was found in this repo either.
**Recommended fix:** Confirm whether Plausible is added via the hosting platform (e.g. a Vercel-level script injection) outside this repo; if not, add it before launch to match the legal pages' claims, or amend the legal copy. Add a Search Console verification method independent of Analytics (see Section 20).

---

## 4. Medium Priority

### M1 — `/our-story` and `/about` may compete for overlapping search intent
**Severity:** Medium
**Area:** Content strategy / cannibalization
**Affected route(s):** `/about`, `/our-story`
**Affected file(s):** `src/app/about/page.tsx`, `src/app/our-story/page.tsx`
**Current behavior:** `/about` is a product-focused company profile (what is QLIXA, pricing model, who it's for); `/our-story` is the founders' personal narrative. `/about` links to `/our-story` once, near its footer CTA (`src/app/about/page.tsx`, `storyLink` field, `href="/our-story"`), but `/our-story` is not linked from the site's main navigation or Footer at all (confirmed: `src/components/layout/Footer.tsx`'s nav columns link only to `/about`, `/articles`, `/tools`).
**Why it matters:** This isn't classic keyword cannibalization (the two pages target different intents — "what is QLIXA" vs. "who built QLIXA") but `/our-story` is currently an orphan page reachable only via one small link from `/about` — worth confirming this is intentional before launch (see Section 6 classification: B, "should probably be indexed" but with weak internal linking).
**Recommended fix:** No code change required if the current single quiet link is the intended discoverability level; if not, add it to Footer or main nav deliberately.

### M2 — No custom 404/not-found page
**Severity:** Medium
**Area:** Error handling
**Affected file(s):** none exist — `find src/app -iname "*not-found*"` returns nothing
**Current behavior (verified):** `curl` against a nonexistent route returns a correct `404 Not Found` HTTP status (Next.js's default), but with Next's generic default 404 UI, not a branded QLIXA page.
**Why it matters:** The HTTP status itself is already correct (no soft-404 risk), so this is not a crawlability blocker — it's a UX/brand-consistency gap: a user who mistypes a URL or follows a dead link sees an unbranded page with no navigation back into the site.
**Recommended fix:** Add `src/app/not-found.tsx` with Navbar/Footer and a link home.

### M3 — Legacy `/for/*` redirect targets lose topical specificity
**Severity:** Medium
**Area:** Content / Redirects
**Affected route(s):** `/for/biznes` → `/pricing`; `/for/frilanser`, `/for/naymanyy`, `/for/nerukhomist`, `/for/pensioner`, `/for/samostiynyy` → `/tax-return`
**Affected file(s):** `src/app/for/*/page.tsx`
**Current behavior:** Five previously audience-specific URLs (freelancer, employee, real estate, pensioner, self-employed) now all redirect to the single generic `/tax-return` page, and one (`biznes`) to `/pricing`.
**Why it matters:** If any of these old URLs had accumulated external links or historical rankings for audience-specific queries, redirecting them all to one generic page dilutes that specificity. This is very likely an intentional, already-approved architecture decision (consistent with CLAUDE.md's note that `/tax-return` is "the unified consumer tax product canonical page") — flagging only so it's a conscious launch-day decision, not a surprise in Search Console's "Page with redirect" report.
**Recommended fix:** No action needed if this consolidation is intentional (it appears to be, per the codebase's own architecture notes) — pair with H1 (fixing the redirect type to permanent).

### M4 — `robots.txt`/metadata absence means no explicit exclusion for the external Cabinet domain, though it isn't in this repo
**Severity:** Medium
**Area:** Private-area indexation
**Affected route(s):** N/A within this repo — `cabinet-ten-lac.vercel.app` is a separate deployment
**Affected file(s):** referenced from `src/components/layout/Navbar.tsx:263,413`, `src/app/pricing/page.tsx:9`, `src/app/tax-return/page.tsx:8`, `src/app/articles/invalidity-child/page.tsx:465`
**Current behavior:** All "Cabinet"/login links point to `https://cabinet-ten-lac.vercel.app/login...` — a distinct Vercel deployment, outside this repository.
**Why it matters:** This repo cannot control that domain's robots.txt, metadata, or indexation. **NOT VERIFIED FROM CODE** whether that separate deployment has its own robots exclusions for authenticated areas, its own noindex tags, or is itself accidentally indexable. This is a real risk category (C18 in the task's own outline: "could private dashboard URLs enter sitemap?") that this repository simply cannot answer.
**Recommended fix:** Confirm with whoever maintains the `cabinet-ten-lac.vercel.app` codebase that authenticated routes there carry `noindex` and are excluded from any sitemap. Also worth considering a branded subdomain (e.g. `cabinet.qlixa.eu`) instead of a generic `*.vercel.app` URL for trust/brand consistency — a Low-priority brand note, not a technical SEO defect.

### M5 — No `manifest.json` / web app manifest, no `.ico` favicon
**Severity:** Medium
**Area:** Mobile / crawlability presentation
**Affected file(s):** `public/logos/` contains only `favicon-planet-black.svg` and `favicon-planet-origin.svg`; no `manifest.json`, no `favicon.ico` found anywhere in `public/`
**Current behavior:** `src/app/layout.tsx:9-13` references only SVG icons for `icon`/`shortcut`/`apple`.
**Why it matters:** Most modern browsers support SVG favicons, but a root `/favicon.ico` remains the most universally-compatible fallback (some contexts, including some search-result favicon displays and older browser paths, still request it specifically). A web manifest isn't required for SEO but affects "add to home screen" / mobile presentation quality.
**Recommended fix:** Add a `.ico` fallback favicon and consider a minimal `manifest.json` (both low-effort, low-risk additions).

### M6 — Homepage and 5 article pages mix `next/image` and raw `<img>` inconsistently
**Severity:** Medium
**Area:** Performance / code consistency
**Affected file(s):** `src/app/page.tsx` (17 raw `<img>`, confirmed via `grep -c "<img " src/app/page.tsx`), plus one or more raw `<img>` in every article page and in `WhatIsQlixaFeatureGrid.tsx`, `ForWhomExpandableGrid.tsx`, `RWRCalculator.tsx`, `RWRChecklists.tsx`
**Current behavior:** Some images use `next/image` (e.g. logo, hero cover in some places), most decorative/illustration images use plain `<img>` with an `eslint-disable-next-line @next/next/no-img-element` comment directly above each one — meaning this was each time a deliberate, individually-acknowledged choice, not an oversight.
**Why it matters:** OBSERVED CODE RISK only — since `images.unoptimized: true` is already set (H6), the *optimization* benefit of `next/image` is moot either way; the remaining benefit `next/image` would still provide is built-in lazy-loading and explicit layout-shift prevention via required width/height. Given each raw `<img>` was consciously flagged with a disable comment, this appears to be an intentional, already-reviewed pattern, not an accidental gap — downgraded to Medium rather than High for that reason.
**Recommended fix:** No urgent action; if the `unoptimized` config is ever removed (H6), revisit whether these raw `<img>` tags should migrate to `next/image` at that time.

### M7 — `og:type` is `website` on every page, including articles
**Severity:** Medium
**Area:** Open Graph
**Affected file(s):** `src/app/layout.tsx:20`
**Current behavior:** `type: 'website'`, inherited by every route since no page overrides it.
**Why it matters:** Article pages conventionally use `og:type = article` (with `article:published_time` etc.), which some platforms use to render a slightly different share-card treatment. Low-to-medium impact, dependent on the same per-page-metadata work needed for C3.
**Recommended fix:** Once per-page metadata exists (C3), set `type: 'article'` for the 5 article routes.

### M8 — No breadcrumb UI or `BreadcrumbList` schema on deep pages
**Severity:** Medium
**Area:** Content / Structured data
**Affected route(s):** `/articles/*` (5 routes)
**Current behavior:** Articles link back to `/articles` via a text link only (`ArticleNav.tsx`'s `ArticlePrevNext`/`ArticleSidebar`); there's no breadcrumb trail (`Home > Articles > [Article]`) in the UI or in schema.
**Why it matters:** Breadcrumbs help both users and Google understand site hierarchy and can produce breadcrumb rich results in search snippets for deep content.
**Recommended fix:** Optional, pairs well with the `BreadcrumbList` schema proposal in Section 12.

### M9 — RWRCalculator PDF-export table (not on-page) has no user-facing SEO impact, but confirm it isn't publicly addressable
**Severity:** Medium
**Area:** Private-area indexation (self-check)
**Affected file(s):** `src/components/RWRCalculator.tsx:427-456`
**Current behavior:** The PDF generation renders an off-screen (`position:fixed;left:-9999px`) HTML snapshot purely client-side, in-memory, to produce a downloadable PDF — it never creates a route or is server-rendered.
**Why it matters:** Confirmed via code inspection this creates no new crawlable URL and no server-side rendering of user-entered data — flagging as a verified non-issue (included here so the audit explicitly confirms it was checked, per Section 18's requirements) rather than leaving it as an open question.
**Recommended fix:** None needed.

---

## 5. Low Priority / Nice to Have

### L1 — `.DS_Store` files committed to the repository
**Severity:** Low
**Area:** Repo hygiene
**Affected file(s):** `src/.DS_Store`, `src/app/.DS_Store`, `src/components/.DS_Store`, `src/lib/.DS_Store`, `src/app/privacy/.DS_Store`, `src/app/articles/.DS_Store`, `src/app/for/.DS_Store`, `src/app/pricing/.DS_Store`, `src/app/articles/gisa-formular/.DS_Store`, `src/app/for/biznes/.DS_Store`, `src/app/for/naymanyy/.DS_Store`, `src/components/layout/.DS_Store`
**Current behavior:** macOS Finder metadata files tracked in git, all inside `src/` (not `public/`), so none are web-accessible or an SEO/security exposure.
**Why it matters:** Pure repository hygiene — no SEO or crawl impact since none are inside `public/`.
**Recommended fix:** Add `.DS_Store` to `.gitignore` and remove from tracking, at the team's convenience.

### L2 — No `Twitter:image` even if a card type upgrade is made
Covered by H2; listed here only as the specific missing tag name for implementation reference (`twitter:image`).

### L3 — `keywords` meta tag present in metadata
**Severity:** Low
**Area:** Metadata
**Affected file(s):** `src/app/layout.tsx:8`
**Current behavior:** `keywords: 'accounting austria, buchhaltung, foreigners austria, business austria, QLIXA'`
**Why it matters:** The meta keywords tag has had no effect on Google ranking for over a decade; it's harmless but pure dead weight, and also repeats the "accounting"/"Buchhaltung" framing the project's own rules discourage in favor of "automated tool"/"tax return."
**Recommended fix:** Optional removal or rewrite alongside the C3 metadata fix.

### L4 — `sourcesLabel`/sources sections in GISA article exist but no equivalent "last verified" date
**Severity:** Low
**Area:** Content freshness signal
**Affected file(s):** `src/app/articles/gisa-formular/page.tsx`
**Current behavior:** Sources/legal links exist (e.g. `src/app/articles/gisa-formular/page.tsx:220` linking to `startup.usp.gv.at`), but no "last checked" date accompanies them.
**Why it matters:** For process-heavy government-procedure articles, a visible "verified as of [date]" signal helps both users and Google trust freshness, especially since these procedures can change.
**Recommended fix:** Optional content enhancement, not a technical SEO defect.

### L5 — Free-text article `date`/`readTime` strings aren't machine-readable
Covered by H4; listed separately here only to note this also affects on-page freshness display, independent of the schema question.

### L6 — No `alternates.types` (RSS/Atom) for the articles collection
**Severity:** Low
**Area:** Content discovery
**Current behavior:** No RSS/Atom feed exists for the 5 articles.
**Why it matters:** Minor content-discovery nicety; not expected for a 5-article knowledge base at this stage.
**Recommended fix:** Not necessary before launch.

### L7 — External Cabinet domain uses a generic `*.vercel.app` host rather than a QLIXA subdomain
Covered by M4; listed here as the specific brand-consistency angle (separate from the SEO/indexation angle already noted in M4).

---

## 6. Public Route Inventory

All routes below exist in `src/app` as of this audit. "Index?" classifications: **A** = should be indexed, **B** = should probably be indexed, **C** = should not be indexed, **D** = private/authenticated, **E** = needs review.

| Route | Locale | Page purpose | Index? | Current Title | Current Description | H1 | Canonical | Hreflang | In sitemap? | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | UA (default render) | Homepage | A | *(global, see C3)* | *(global, see C3)* | Yes, 1 (hero headline, `src/app/page.tsx:875`) | None | None | No (no sitemap exists) | Duplicate global metadata (C3) |
| `/pricing` | UA (default) | Pricing / plans | A | *(global)* | *(global)* | Yes, 1 | None | None | No | Same |
| `/about` | UA (default) | Product/company profile | A | *(global)* | *(global)* | Yes, 1 | None | None | No | Same |
| `/our-story` | UA (default) | Founder story | B | *(global)* | *(global)* | Yes, 1 | None | None | No | Orphan-ish: linked only from `/about`, not from main nav/Footer (M1) |
| `/tax-return` | UA (default) | Main product page | A | *(global)* | *(global)* | Yes, 1 | None | None | No | Primary conversion page — highest-priority metadata fix |
| `/tools` | UA (default) | Tools hub (links to RWR+ calculator) | A | *(global)* | *(global)* | NOT VERIFIED FROM CODE (not individually checked for `<h1>` count) | None | None | No | |
| `/articles` | UA (default) | Article listing | A | *(global)* | *(global)* | NOT VERIFIED FROM CODE | None | None | No | |
| `/articles/rwr-karte` | UA (default) | Article: RWR+ card guide + calculator | A | *(global)* | *(global)* | Yes, 1 | None | None | No | Deepest, most substantial content page on the site |
| `/articles/gewerbeanmeldung` | UA (default) | Article: business registration guide | A | *(global)* | *(global)* | NOT VERIFIED FROM CODE (count not individually run) | None | None | No | |
| `/articles/austria-id` | UA (default) | Article: ID Austria guide | A | *(global)* | *(global)* | NOT VERIFIED FROM CODE | None | None | No | |
| `/articles/invalidity-child` | UA (default) | Article: child disability benefits guide | A | *(global)* | *(global)* | NOT VERIFIED FROM CODE | None | None | No | |
| `/articles/gisa-formular` | UA (default) | Article: GISA registration walkthrough | A | *(global)* | *(global)* | NOT VERIFIED FROM CODE | None | None | No | |
| `/impressum` | UA-only banner, page content UA (default) | Legal: Impressum | B | *(global)* | *(global)* | Yes, 1 | None | None | No | **Placeholder banner live (C5)** |
| `/privacy` | UA (default) | Legal: Privacy Policy | B | *(global)* | *(global)* | NOT VERIFIED FROM CODE | None | None | No | **Placeholder banner live (C5)**; claims Plausible Analytics in use (H8) |
| `/agb` | UA (default) | Legal: Terms of Use | B | *(global)* | *(global)* | NOT VERIFIED FROM CODE | None | None | No | **Placeholder banner + forbidden "платформи" wording (C5)** |
| `/cookies` | UA (default) | Legal: Cookie Policy | B | *(global)* | *(global)* | NOT VERIFIED FROM CODE | None | None | No | **Placeholder banner live (C5)** |
| `/for/biznes` | n/a | Legacy redirect → `/pricing` | C | n/a (redirect) | n/a | n/a | n/a | n/a | No | 307, should be permanent (H1) |
| `/for/frilanser` | n/a | Legacy redirect → `/tax-return` | C | n/a | n/a | n/a | n/a | n/a | No | 307 (H1) |
| `/for/naymanyy` | n/a | Legacy redirect → `/tax-return` | C | n/a | n/a | n/a | n/a | n/a | No | 307 (H1) |
| `/for/nerukhomist` | n/a | Legacy redirect → `/tax-return` | C | n/a | n/a | n/a | n/a | n/a | No | 307 (H1) |
| `/for/pensioner` | n/a | Legacy redirect → `/tax-return` | C | n/a | n/a | n/a | n/a | n/a | No | 307 (H1) |
| `/for/samostiynyy` | n/a | Legacy redirect → `/tax-return` | C | n/a | n/a | n/a | n/a | n/a | No | 307 (H1) |
| `/datenschutz` | n/a | Legacy redirect → `/privacy` | C | n/a | n/a | n/a | n/a | n/a | No | 307 (H1) |
| `/terms` | n/a | Legacy redirect → `/agb` | C | n/a | n/a | n/a | n/a | n/a | No | 307 (H1) |
| `/how-it-works/tax-return` | n/a | Legacy redirect → `/tax-return` | C | n/a | n/a | n/a | n/a | n/a | No | 307 (H1) |
| *(no `/account`, `/dashboard`, `/login`, `/api/*` routes exist in this repository)* | — | — | D | — | — | — | — | — | — | The authenticated app is a separate deployment (`cabinet-ten-lac.vercel.app`), outside this repo — see M4 |

---

## 7. Metadata Audit

**Route-by-route findings:** every single public route inherits the exact same metadata object from `src/app/layout.tsx:6-22` — no route in `src/app` exports its own `metadata` (confirmed by inspecting every `page.tsx` under `src/app`; none contain `export const metadata` or `generateMetadata`). This was independently verified for `/`, `/pricing`, and `/articles/rwr-karte` by running the production build and curling each route's raw HTML — all three returned byte-identical `<title>` and `<meta name="description">` tags.

This single root cause explains: duplicate titles (C3), duplicate descriptions (C3), duplicate OG tags (H2/H3/M7), absence of canonical tags (C4), absence of hreflang (C4), and the inability to implement per-article `Article` schema dates without first restructuring how metadata is generated (H4/H7).

**Current values (verified, from `src/app/layout.tsx`):**
```
title:       "QLIXA — Reports in one click"
description: "Smart online accounting platform for foreigners in Austria. Buchhaltung made simple."
keywords:    "accounting austria, buchhaltung, foreigners austria, business austria, QLIXA"
og:title:       "QLIXA — Reports in one click"
og:description: "Smart online accounting platform for foreigners in Austria."
og:url:         "https://qlixa.eu"
og:site_name:   "QLIXA"
og:locale:      "en_US"
og:type:        "website"
twitter:card:        "summary"
twitter:title:       "QLIXA — Reports in one click"
twitter:description: "Smart online accounting platform for foreigners in Austria."
```
No `metadataBase`, no `alternates` object of any kind.

---

## 8. International SEO / Hreflang Audit

**Actual locale mechanism (verified):** Client-side only. `localStorage.getItem('qlixa-lang')` (values `UA`/`DE`/`EN`/`RU`) is read in a `useEffect` inside every page component (e.g. `src/app/page.tsx:782-792`, `src/app/pricing/page.tsx:277-287`, and 13 more files — confirmed via `grep -rn "useState('UA')" src/app src/components` returning 15 matches). First-time visitors (no stored value) get browser-language auto-detection via `navigator.languages` inside `src/components/layout/Navbar.tsx:84-110`, which only runs after JavaScript executes — it cannot run during server rendering.

- **Actual locale URL structure:** none. One URL per page, serving all 4 languages via client-side state at the same address.
- **Every language its own crawlable URL?** No.
- **Server-rendered/crawlable per language?** No — the server always renders the `UA` (Ukrainian) default state (`useState('UA')` in every file), before any locale detection runs.
- **hreflang exists?** No (confirmed: zero `hreflang` occurrences anywhere in `src/`).
- **hreflang reciprocal?** N/A — doesn't exist.
- **Ukrainian hreflang code correctness:** N/A — doesn't exist, but noting for when it's implemented: the correct code is `uk` (not `ua` — `UA` is the ISO 3166-1 country code for Ukraine, while `uk` is the ISO 639-1 language code for Ukrainian; the codebase itself already knows this distinction correctly in a different context — `src/components/layout/LangSync.tsx:9` maps the internal `UA` app-state key to the valid BCP-47 value `uk`, and `Navbar.tsx`'s Cabinet-login links already convert `UA` → `uk` in the URL, e.g. `src/components/layout/Navbar.tsx:263`. Any future hreflang implementation should reuse this exact same `UA→uk` mapping rather than a new one.)
- **x-default exists?** No.
- **Canonical points to correct language URL?** N/A — no canonical exists at all (C4).
- **Canonicals collapsing languages together?** N/A — moot, since none exist.
- **Locale redirects interfering with Googlebot?** No locale-based redirects exist at all (confirmed: `next.config.js` has no `redirects()` function; no middleware exists).
- **Automatic locale detection causing crawl/indexing issues?** Yes, indirectly — see C4: Googlebot's own `navigator.languages` state (not a real user's) drives what content a fresh crawl sees, which is unpredictable and not controllable from this codebase.
- **Untranslated/fallback content creating duplicate pages?** Not literally duplicate *pages* (there's only one URL), but functionally the site can only ever present ONE language's content to an un-cached crawler visit per URL — see C4.
- **Sitemap includes language variants?** N/A — no sitemap exists at all (C1).

**Hreflang Matrix**

| Page | DE | EN | UK | RU | x-default | Canonical status | Issue |
|---|---|---|---|---|---|---|---|
| `/` | No separate URL | No separate URL | No separate URL | No separate URL | Not set | No canonical set | Single URL serves all 4 languages via client state; Google sees only whichever language `navigator.languages`/stored preference resolves to at crawl time |
| `/pricing` | Same | Same | Same | Same | Not set | No canonical set | Same |
| `/tax-return` | Same | Same | Same | Same | Not set | No canonical set | Same |
| `/about` | Same | Same | Same | Same | Not set | No canonical set | Same |
| `/articles/rwr-karte` | Same | Same | Same | Same | Not set | No canonical set | Same |
| *(all other routes)* | Same | Same | Same | Same | Not set | No canonical set | Same pattern applies uniformly across the entire site |

**Would x-default be useful?** Yes — once/if URL-based locales are introduced, `x-default` pointing at either the German URL (primary market) or a language-selector page would be the standard pattern.

---

## 9. Sitemap Audit

No sitemap exists (C1). The following lists what a future sitemap should contain, based purely on the routes verified to exist and return 200 in Section 6.

**SITEMAP — SHOULD INCLUDE**
`/`, `/pricing`, `/about`, `/our-story`, `/tax-return`, `/tools`, `/articles`, `/articles/rwr-karte`, `/articles/gewerbeanmeldung`, `/articles/austria-id`, `/articles/invalidity-child`, `/articles/gisa-formular`, `/impressum`, `/privacy`, `/agb`, `/cookies` — **conditional on C5 being resolved first** for the legal pages.

**SITEMAP — SHOULD EXCLUDE**
All 9 redirect-only routes (`/for/*` ×6, `/datenschutz`, `/terms`, `/how-it-works/tax-return`) — a sitemap should list canonical destinations, not redirect sources. Anything on the external `cabinet-ten-lac.vercel.app` deployment (out of this repo's scope entirely).

**SITEMAP — MISSING / NEEDS REVIEW**
The sitemap file itself (doesn't exist). `lastmod` values cannot be populated for the 5 articles without adding real date fields first (H4). No mechanism currently exists in the codebase to auto-generate this list from `src/lib/articles.ts` plus a static route list — would need to be written as part of implementing C1.

---

## 10. Robots / Noindex Audit

No `robots.txt` exists (C2). Repo-wide search for `noindex`, `nofollow`, `X-Robots-Tag`, and `Disallow` across all `.ts`/`.tsx`/`.js`/`.json`/`.txt` files (excluding `node_modules`) returned **zero results** — confirmed via `grep -rniE "noindex|nofollow|X-Robots-Tag|Disallow"`.

- **Static or generated?** N/A — doesn't exist.
- **Sitemap declaration?** N/A.
- **Public content accidentally blocked?** No — because nothing blocks anything; there is no robots file to accidentally over-restrict.
- **Private areas appropriately handled?** N/A within this repo (no private routes exist here at all — see M4 for the external Cabinet caveat).
- **Robots.txt relied on as security?** No evidence either way — moot since it doesn't exist yet, but worth stating as a principle for whoever writes it: robots.txt is not access control (see Section 19).
- **Assets required for rendering blocked?** N/A.

**This is a Critical finding (C2)** — the complete absence of a robots file, on a site about to launch, means there is no documented crawl policy at all.

---

## 11. Canonical Audit

Zero canonical tags exist anywhere in the codebase (confirmed via `grep -rn "canonical" src` returning nothing, and via `curl` inspection of served HTML on 3 separate routes finding no `<link rel="canonical">`). Every sub-item in this section is therefore the same root cause as C4:

- Missing canonical: **every route**.
- Self-referencing canonical problems: N/A (none exist to self-reference).
- Wrong domain / localhost / staging URLs in canonical: N/A.
- HTTP vs HTTPS: N/A — `og:url` is correctly `https://qlixa.eu` (the one absolute URL reference that does exist, in `src/app/layout.tsx:16`).
- Trailing slash inconsistencies: NOT VERIFIED FROM CODE — Next.js App Router's default `trailingSlash: false` behavior applies since `next.config.js` does not override it (confirmed: no `trailingSlash` key present).
- Query parameter duplication: not applicable — confirmed no page reads `searchParams`/`useSearchParams` anywhere (`grep -rln "searchParams\|useSearchParams" src/app` returns nothing), so there is no query-string-driven content to canonicalize away.
- Wrong locale canonical / all languages collapsing to German: N/A — moot until canonicals and locale URLs both exist.

---

## 12. Structured Data Audit

**CURRENT IMPLEMENTATION:** None. Confirmed via repo-wide search for `application/ld+json` and `schema.org` — zero matches in `src/`.

**RECOMMENDATION (fact-only, nothing fabricated):**

`Organization` / `WebSite` — a single instance in `layout.tsx`, using only verifiable facts already present in the codebase:
- `name`: "QLIXA" (from `src/app/layout.tsx:16`, `og:site_name`)
- `url`: `https://qlixa.eu` (from `src/app/layout.tsx:16`, `og:url`)
- `logo`: the existing SVG at `/logos/favicon-planet-black.svg` (from `src/app/layout.tsx:10`)
- Do **not** add `sameAs` social profile URLs, `aggregateRating`, `address`, or `contactPoint` unless the founders confirm those facts — none were found in this repository beyond a single `info@qlixa.eu` mailto link (`src/components/layout/Footer.tsx:301`, `src/app/impressum/page.tsx`), and this audit will not fabricate a physical address, phone number, or social profile list.

`BreadcrumbList` — optional, for the 5 article routes (`Home > Articles > [Article Title]`), using titles already present in `src/lib/articles.ts`.

`Article`/`BlogPosting` — **blocked by H4**: cannot be added without real `datePublished`/`dateModified` values, which do not currently exist in machine-readable form anywhere in the codebase. Do not fabricate these dates.

No malformed or duplicated JSON-LD was found, because none exists yet.

---

## 13. Open Graph / Social Audit

Covered in detail in C3/H2/H3/M7. Summary of what a share preview would currently look like on each platform, based on the verified served tags:

| Platform | Title shown | Description shown | Image shown |
|---|---|---|---|
| WhatsApp | "QLIXA — Reports in one click" | "Smart online accounting platform for foreigners in Austria." | None (no `og:image`) |
| Telegram | Same | Same | None |
| LinkedIn | Same | Same | None |
| Facebook | Same | Same | None |
| X (Twitter) | Same (`twitter:title`) | Same (`twitter:description`) | None (`summary` card, no `twitter:image`) |

Every platform would show the identical generic card regardless of which page was actually shared (homepage, an article, pricing) — a meaningfully worse experience than page-specific previews, and with no visual at all.

---

## 14. Content & Internal Linking Audit

- **Visible H1s:** confirmed exactly one real `<h1>` on every page individually checked (`/`, `/pricing`, `/about`, `/our-story`, `/articles/rwr-karte`, `/tax-return`, `/impressum` — via `grep -c "<h1"`; the homepage's grep initially returned "2" but the second match was a code *comment* containing the literal text "<h1>" as part of an English sentence at `src/app/page.tsx:864`, not a real second heading — verified by reading the surrounding code).
- **Duplicate headings:** none identified in the pages inspected.
- **Thin pages:** the 9 redirect-only routes have no content by design (they redirect); this is expected, not a defect, once addressed per H1/M3.
- **Duplicated content across routes:** none identified — each page's copy is distinct.
- **Orphan pages:** `/our-story` (see M1).
- **Descriptive anchor text:** spot-checked article inline links and Footer/Navbar links — all use real link text (article titles, "Всі статті," etc.), no "click here"-style anchors found.
- **Image alt text:** many decorative illustration images correctly use `alt=""` (confirmed: 5 occurrences in `src/app/our-story/page.tsx`, 6 in `src/app/page.tsx`) — this is the *correct* pattern for purely decorative images, not a defect. Meaningful images (e.g. the RWR+ hero cover, `alt="RWR+ Karte"` in `src/app/articles/rwr-karte/page.tsx`) carry descriptive alt text. No keyword-stuffed alt text was found on any image inspected.
- **Links relying only on JavaScript:** none found — all primary navigation uses real `<Link>`/`<a>` elements with real `href` values (confirmed via the `href="#"` search returning zero results repo-wide).
- **Content existing only client-side:** the entire site's visible text content is generated client-side after `useEffect`-driven locale resolution (see C4) — this is the single biggest "content hidden from crawlers at first paint" risk on the site, though the Ukrainian-default content IS present in the initial server-rendered HTML (it's not *empty* on first paint, just not necessarily the *intended* language for a given visitor).
- **Placeholder/Lorem ipsum/TODO content:** none found in body copy, **except** the legal-page "working template" banners already covered in C5.
- **Obsolete year references:** none found suggesting an outdated copyright year or similar (Footer copyright reads "© 2026 QLIXA®," confirmed in `Footer.tsx`, consistent with the current date).
- **Inconsistent product claims:** none identified beyond the "platform" wording already flagged in C3/C5 — spot-checked Pricing, About, and Homepage for "guaranteed"/"maximum refund"-style language and found none; the copy consistently uses qualified wording ("попередній розрахунок можливого повернення" / "preliminary estimate of a possible refund").

---

## 15. Article / Knowledge Content Audit

All 5 articles are defined in `src/lib/articles.ts` and individually verified to return HTTP 200.

| URL | Locale | Title/H1 (UA, default) | Topic | Search intent | Indexable | Canonical | Metadata | Schema | Internal links | CTA to QLIXA | Date handling | Duplicate-locale risk | Completeness |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/articles/rwr-karte` | UA default, DE/EN/RU via client state | "Як підготуватися до подачі на RWR+ карту" | RWR+ card application prep | Informational, high commercial-adjacent intent (links to RWR+ calculator) | Yes | None (C4) | Global only (C3) | None (H7) | Links to `/articles/austria-id`; embeds `RWRCalculator` | Yes — checklist downloads, calculator | Free-text ("Липень 2026"), not machine-readable (H4) | Same as all pages — one URL, 4 languages via state | Appears complete and substantial |
| `/articles/gewerbeanmeldung` | Same pattern | "Gewerbeanmeldung в Австрії: покрокова реєстрація самозайнятості" | Business registration walkthrough | Informational | Yes | None | Global only | None | Links to official `bmf.gv.at` source | Implicit (QLIXA branding) | NOT VERIFIED FROM CODE (date field not individually located) | Same | Appears complete |
| `/articles/austria-id` | Same pattern | "Як оформити ID Austria: покроковий гайд для іноземців" | ID Austria application guide | Informational | Yes | None | Global only | None | NOT VERIFIED FROM CODE | Implicit | NOT VERIFIED FROM CODE | Same | Appears complete |
| `/articles/invalidity-child` | Same pattern | "Інвалідність дитини в Австрії: виплати, пільги та з чого почати" | Child disability benefits | Informational | Yes | None | Global only | None | NOT VERIFIED FROM CODE | Implicit | NOT VERIFIED FROM CODE | Same | Appears complete |
| `/articles/gisa-formular` | Same pattern | "Як зареєструвати підприємницьку діяльність через GISA" | GISA online registration walkthrough | Informational, step-by-step | Yes | None | Global only | None | Links to official `startup.usp.gv.at`, `gisa.gv.at` sources | Implicit | Contains a specific example date "04.06.2026" inside a walkthrough example (`src/app/articles/gisa-formular/page.tsx`) — this is example/scenario copy, not a publish date | Same | Appears complete, longest/most detailed article |

**Tax/legal accuracy note (per audit instructions, not evaluated for correctness):** Several articles cite specific Austrian legal/procedural details (BMI residency requirements, Familienbeihilfe amounts, GISA form fields, Firmenbuch registration steps). This audit does not verify tax/legal accuracy. **Flagging for human/legal source verification before publication:** the specific euro amounts in `invalidity-child` (e.g. Familienbeihilfe/Pflegegeld figures), the RWR+ residency/insurance duration requirements in `rwr-karte`, and any dated administrative fee or form-version references in `gisa-formular` and `gewerbeanmeldung` — all of these should be checked against current official sources before the site goes live, since procedural/legal details of this kind change over time.

**Duplicate-language issue:** not duplicate *pages*, but see C4 — the same underlying single-URL-per-article-per-language architecture applies to articles exactly as it does to every other route.

---

## 16. Performance Risks from Code

(Full detail in H5, H6, M6 above.) Summary table, clearly separating observed code risk from what requires production measurement:

| Item | OBSERVED CODE RISK | REQUIRES PRODUCTION MEASUREMENT |
|---|---|---|
| Font loading (`@import`, no `next/font`) | Render-blocking external stylesheet fetch | Actual FCP/LCP impact |
| `images.unoptimized: true` | No format/size optimization for any image, including `next/image` usage | Actual LCP/bandwidth impact |
| Raw `<img>` vs `next/image` mix | Some images lack built-in lazy-loading/explicit dimensions | Actual CLS impact |
| `'use client'` on nearly every page | Confirmed via inspection: every `page.tsx` in `src/app` begins with `'use client'` — the entire site is client-rendered React with no Server Components doing data/markup work | Actual hydration cost / TTI impact |
| Large inline translation objects per page | Multiple pages embed all 4 languages' full text in one client bundle (e.g. `RWR_TEXT` in `rwr-karte/page.tsx` contains full UA/RU/EN/DE copy in a single object shipped to every visitor regardless of selected language) | Actual bundle-size/parse-time impact — NOT VERIFIED FROM CODE without a bundle analyzer run |
| Third-party scripts | None found (no GA/GTM/chat-widget script tags anywhere) | N/A — nothing to measure |
| Cookie consent script | None found | N/A |
| Animations | Limited, CSS-based (`@keyframes bounce` in `RWRCalculator.tsx`) — low risk | N/A |
| Video | None found anywhere in the codebase | N/A |

---

## 17. Mobile / Crawlability Findings

- **Viewport:** correctly configured — confirmed via `curl`: `<meta name="viewport" content="width=device-width, initial-scale=1"/>` present on every page (Next.js's default, not overridden).
- **Responsive layout:** extensive, deliberate mobile-responsive work exists across the codebase (confirmed via `src/styles/globals.css`'s large `@media (max-width: 900px)` block covering Homepage, Pricing, Articles, About, Legal pages, and the Footer modal — the product of this session's prior mobile-adaptation tasks).
- **Semantic HTML:** headings use real `<h1>`/`<h2>`/`<h3>` tags (not styled `<div>`s) throughout the pages inspected.
- **Navigation crawlability:** primary nav (`Navbar.tsx`) uses real `<Link>` elements with real `href`s; language switching does not change the URL (see C4) but does not block crawling of the underlying links either.
- **Buttons vs links:** spot-checked — CTAs that navigate use `<Link>`; the mobile Navbar's hamburger/language triggers correctly use `<button>` (confirmed from this session's own prior Navbar accordion work), consistent with correct semantic usage.
- **Empty anchors:** none found (`href="#"` search returned zero results).
- **Broken internal hrefs:** none identified in the routes/links inspected; all internal `<Link href="...">` targets checked resolve to real, existing routes.
- **Duplicated IDs:** NOT VERIFIED FROM CODE — would require rendered-DOM inspection (e.g. browser devtools) across a full page including all dynamic states; static code review of `id="..."` usage shows IDs are generally scoped to unique, purpose-specific anchors (e.g. `id="calculator"`, `id="eligibility"`) that don't appear duplicated within a single page from inspection, but this wasn't exhaustively verified across every dynamically-rendered component.
- **Language attribute on `<html>`:** present but incorrect as served — see C6.

---

## 18. Redirect / URL Normalization Audit

- **www vs non-www:** NOT VERIFIED FROM CODE — this is typically a hosting/DNS-level configuration, not something present in this Next.js repository (no `next.config.js` redirect rule handles it, confirmed no `redirects()` function exists at all).
- **HTTP vs HTTPS:** NOT VERIFIED FROM CODE for enforcement (also typically hosting-level); the one hardcoded absolute URL in the codebase (`og:url` in `layout.tsx`) correctly uses `https://qlixa.eu`.
- **Trailing slash:** default Next.js behavior (no trailing slash), not overridden — confirmed no `trailingSlash` key in `next.config.js`.
- **Locale root redirects:** none exist (consistent with C4 — no locale-based routing exists to redirect from/to).
- **Old URLs:** the 9 legacy routes (Section 6), all correctly redirecting to their consolidated targets, but as 307s (H1).
- **Redirect chains:** none identified — each of the 9 legacy routes redirects directly to its final destination in one hop (verified: e.g. `/terms` → `/agb` directly, not `/terms` → `/terms-of-use` → `/agb`).
- **Temporary vs permanent:** all 9 are temporary (307) where permanent (301/308) is very likely intended — see H1.
- **Middleware redirects:** none — no `middleware.ts` exists anywhere in the repository.
- **Rewrite behavior:** none — no `rewrites()` in `next.config.js`.
- **Query-string handling:** no route reads query parameters at all (confirmed above), so there is no query-string normalization concern.

---

## 19. Private Area Indexation Audit

This is the one section where the repository itself provides strong, structurally reassuring evidence:

- **Could private dashboard URLs enter the sitemap?** No — there is no dashboard/account/session code in this repository at all. The entire authenticated product experience is hosted on a separate deployment (`cabinet-ten-lac.vercel.app`), confirmed via every "Cabinet"/login link in the codebase pointing to that external domain (`Navbar.tsx:263,413`, `pricing/page.tsx:9`, `tax-return/page.tsx:8`, `invalidity-child/page.tsx:465`). A sitemap generated from this repository's own routes (per Section 9) cannot accidentally include private pages, because none exist here.
- **Could personal tax report URLs be indexed?** No route in this repository renders or references any user-specific tax data, report, or generated document by URL.
- **Could user-specific query parameters create crawlable URLs?** No — confirmed no page reads `searchParams`/`useSearchParams` anywhere in `src/app`.
- **Are generated tax documents publicly addressable?** Not from this repository — PDF generation (`RWRChecklists.tsx`, `RWRCalculator.tsx`) happens entirely client-side, in-memory, and produces a browser download, never a server-hosted URL.
- **Are authenticated pages emitting indexable metadata?** N/A — no authenticated pages exist in this repository.
- **Are login/account pages indexable unnecessarily?** N/A within this repo; **NOT VERIFIED FROM CODE** for the external `cabinet-ten-lac.vercel.app` deployment, since it's outside this repository's scope (see M4). This is the one genuine open question in this section, and it should be confirmed directly with whoever maintains that separate codebase — if private/authenticated pages there are indexable without a login wall, that would be a CRITICAL finding, but it cannot be assessed from this repository.

**No CRITICAL private-data-exposure finding within this repository itself.** The one flagged item (external Cabinet domain's own indexation posture) is a "needs founder confirmation" item, not a confirmed defect.

---

## 20. Analytics / Search Console Readiness

**CURRENT**
- No Google Analytics found (confirmed via repo-wide search for `gtag(`, `google-analytics`, `googletagmanager`).
- No Google Tag Manager found.
- No Search Console verification meta tag or file found anywhere.
- No other analytics tool's script/SDK found in code or `package.json` dependencies (only `@supabase/supabase-js`, `next`, `react`, `react-dom` are listed as dependencies).
- No cookie-consent integration/script found — consistent with the Privacy Policy's own claim that Plausible "works without cookies and doesn't require consent" (`src/app/privacy/page.tsx:160`), though see H8 regarding whether Plausible itself is actually wired in.

**MISSING**
- Search Console verification (DNS-based verification is independent of any code changes and wouldn't conflict with anything in this repo; an HTML meta-tag-based verification would need to be added to `layout.tsx`'s metadata — confirmed this would not conflict with any existing meta tag, since none currently occupies that space).
- Any analytics implementation matching what the legal pages already describe (H8).
- Sitemap for Search Console to process (C1).
- Robots.txt for Search Console/crawlers to reference (C2).

**OPTIONAL**
- Google Tag Manager (only needed if multiple tracking tools are anticipated later; Plausible alone doesn't need it).
- Bing Webmaster Tools verification (same low-effort pattern as Search Console, not currently present).

**Reminder honored:** Search Console does not require Analytics — this audit does not treat their absence as linked requirements, and confirms adding Search Console verification would not conflict with current metadata (there is effectively no metadata to conflict with beyond what's listed in Section 7).

---

## 21. Recommended SEO Metadata

Only for pages where a change is actually warranted (i.e., all of them, since none currently have page-specific metadata — see C3). German copy written to sound natural for an Austrian audience, not machine-translated; no keyword-stuffing; no claim changes.

| Route | Primary search intent | Recommended Title | Recommended Meta Description | Recommended H1 change | Reason |
|---|---|---|---|---|---|
| `/` (Homepage, DE) | "Steuererklärung Österreich" / "Steuererklärung selbst machen" | QLIXA – Steuererklärung in Österreich selbst machen | QLIXA führt dich Schritt für Schritt durch deine Steuererklärung in Österreich. Fragebogen, vorläufige Berechnung und fertige Erklärung zur Einreichung – ab €0. | None needed — current H1 already communicates the product clearly (per this session's own established Homepage copy) | Current title/description are global, generic, and contain "platform" |
| `/tax-return` (DE) | "Arbeitnehmerveranlagung" / "Einkommensteuererklärung Österreich" | QLIXA Tax Return – deine Steuererklärung, Schritt für Schritt | Beantworte einfache Fragen zu deiner Situation. QLIXA prüft mögliche Kategorien und bereitet deine Steuererklärung zur Prüfung und Einreichung vor. | None needed | Highest-intent conversion page currently has no unique title at all |
| `/pricing` (DE) | "QLIXA Preise" / commercial-investigation intent | QLIXA Preise – kostenlos starten, ab €24,90 pro Erklärung | QLIXA Kabinet, Fragebogen und vorläufige Berechnung sind kostenlos. Die fertige Steuererklärung kostet einmalig €24,90 – ohne Abo. | None needed | No unique title; description should reflect the actual approved pricing model |
| `/about` (DE) | Brand/company informational intent | Über QLIXA – automatisiertes Tool für deine Steuererklärung | QLIXA ist ein automatisiertes Tool zur selbstständigen Vorbereitung der Steuererklärung in Österreich – kein Steuerberater, kein Abo. | None needed | Reuses the page's own already-approved product-focused copy (this session's earlier About-page rewrite) |
| `/our-story` (DE) | Low-volume brand/trust intent | Unsere Geschichte – wie QLIXA entstanden ist | Wie zwei Gründerinnen aus eigener Erfahrung mit österreichischer Bürokratie QLIXA entwickelt haben. | None needed | Currently shares the generic global title; low priority but easy win once C3 is addressed |
| `/articles/rwr-karte` (DE) | "RWR Karte Steuernachweis" / long-tail informational | RWR+ Karte beantragen: Einkommensnachweis & Vorbereitung | Schritt-für-Schritt-Vorbereitung für die Rot-Weiß-Rot – Karte plus: Dokumente, Einkommensnachweis und ein kostenloser Rechner. | None needed | Substantial, unique content currently has no unique title at all |
| `/articles/gewerbeanmeldung` (DE) | "Gewerbeanmeldung Österreich" | Gewerbeanmeldung in Österreich: Schritt-für-Schritt-Anleitung | So meldest du dein Gewerbe in Österreich an – von der Vorbereitung bis zur Anmeldung bei der Behörde. | None needed | Same pattern |
| `/articles/gisa-formular` (DE) | "GISA Gewerbeanmeldung online" | Gewerbe über GISA anmelden: die Online-Anleitung | Die Online-Gewerbeanmeldung über GISA im Detail erklärt – jedes Formularfeld, Schritt für Schritt. | None needed | Same pattern; most detailed article on the site |
| `/articles/austria-id` (DE) | "ID Austria beantragen" | ID Austria beantragen: Anleitung für Zugezogene | So beantragst du deine ID Austria und nutzt sie für FinanzOnline und weitere digitale Behördengänge. | None needed | Same pattern |
| `/articles/invalidity-child` (DE) | "Familienbeihilfe erhöht Kindesbehinderung" | Kindesbehinderung in Österreich: Leistungen und erste Schritte | Ein Überblick über Behindertenpass, erhöhte Familienbeihilfe, Pflegegeld und steuerliche Freibeträge für Eltern. | None needed | Same pattern |

**Not recommending changes for:** `/impressum`, `/privacy`, `/agb`, `/cookies` — these should not be optimized for search traffic; a simple, accurate, non-duplicated `Impressum – QLIXA` / `Datenschutz – QLIXA` / etc. pattern is sufficient once C3 is fixed generally, and their content needs to be finalized (C5) before any SEO polish is meaningful.

---

## 22. Pre-Launch Action Plan

### MUST FIX BEFORE LAUNCH
1. Resolve the legal-page placeholder banners and the "platform" wording in `agb/page.tsx` (C5) — this is a content/legal decision, not a code task, but blocks launch of 4 live URLs.
2. Decide the internationalization architecture (URL-based locales vs. single-URL) and, at minimum, make the default server-rendered language match the stated primary market if staying single-URL (C4/C6).
3. Add per-page `metadata` (title, description, canonical) for every route in Section 6's "SHOULD INCLUDE" list, removing "platform" from all copy (C3) — depends on nothing else, can start immediately.
4. Add `src/app/robots.ts` (C2) — depends on knowing final route inclusion decisions from items 1–2.
5. Add `src/app/sitemap.ts` (C1) — depends on items 1–4 being settled (can't finalize sitemap contents until legal pages and locale strategy are decided).
6. Change the 9 legacy redirects from `redirect()` (307) to `permanentRedirect()` (308) (H1) — independent, can be done any time.

### SHOULD FIX BEFORE LAUNCH
7. Add a default Open Graph image + `metadataBase` (H2).
8. Correct `og:locale` to match the finalized primary-language decision (H3).
9. Add real `publishedAt`/`updatedAt` dates to `src/lib/articles.ts`, sourced from the founders (H4) — needed before any `Article` schema or sitemap `lastmod` can be added.
10. Add `Organization`/`WebSite` JSON-LD using only verified facts (H7).
11. Confirm whether Plausible Analytics is actually implemented (at the hosting layer or otherwise) to match the Privacy/Cookie page claims, or amend that copy (H8).
12. Add a branded `not-found.tsx` (M2).

### CAN DO AFTER LAUNCH
13. Migrate Google Fonts to `next/font` (H5) — real-world impact best measured with production Core Web Vitals data first.
14. Revisit `images.unoptimized` and the raw-`<img>`-vs-`next/image` mix (H6/M6) once real performance data from Search Console/PageSpeed Insights is available.
15. Add `BreadcrumbList` schema and on-page breadcrumb UI (M8).
16. Add a `.ico` favicon fallback and `manifest.json` (M5).
17. Decide `/our-story`'s intended discoverability level and adjust internal linking if needed (M1).
18. Clean up `.DS_Store` files from git tracking (L1) and the meta `keywords` tag (L3) — pure hygiene, zero urgency.

---

## 23. Launch-Day Checklist

- [ ] Confirm production `robots.txt` is live at `https://qlixa.eu/robots.txt` and correctly allows all intended public routes.
- [ ] Confirm no `noindex` meta tag or `X-Robots-Tag` header is present on any page intended for indexing (re-run the repo-wide grep from Section 10 against the final pre-launch codebase).
- [ ] Confirm every intended-indexable page serves a unique, self-referencing canonical tag pointing to `https://qlixa.eu/...`.
- [ ] Confirm hreflang tags (if the URL-based locale decision from Action Plan item 2 was implemented) are present and reciprocal across all language versions of each page.
- [ ] Confirm `https://qlixa.eu/sitemap.xml` is live and returns valid XML listing only intended-indexable URLs.
- [ ] Confirm the entire production site is served over HTTPS with no mixed-content warnings.
- [ ] Confirm all 9 legacy redirects return the intended permanent status code (301/308) in production, not 307 (re-run the `curl -D -` check from this audit's Section 3/H1 against production).
- [ ] Confirm all key pages (Section 6's "SHOULD INCLUDE" list) return HTTP 200 in production.
- [ ] Confirm the external Cabinet domain's authenticated routes are excluded from indexing (requires checking that separate deployment directly — see M4).
- [ ] Set up a Google Search Console **Domain Property** for `qlixa.eu` (covers all subdomains/protocols, recommended over a URL-prefix property).
- [ ] Complete DNS-based verification for the Domain Property.
- [ ] Submit `sitemap.xml` inside Search Console.
- [ ] Run URL Inspection in Search Console for the homepage and the 3–4 highest-priority pages (`/tax-return`, `/pricing`, `/articles/rwr-karte`, `/about`).
- [ ] Request indexing for those same 3–4 highest-priority pages only (not the entire site at once).
- [ ] Manually check social share previews (paste each key URL into WhatsApp, Telegram, LinkedIn, and X's own card-preview tools) once the Open Graph image fix (Action Plan item 7) is live.

---

## 24. First 30 Days After Launch

**Week 1**
- Monitor Search Console's Coverage/Indexing report daily for crawl errors, especially on the legal pages and any page whose metadata changed at the last minute.
- Confirm the sitemap shows as "Success" and that the submitted URL count matches expectations.
- Watch for unexpected "Duplicate, Google chose different canonical" reports, which would indicate the canonical-tag fix (C4/Action Plan item 3) wasn't fully effective.

**Week 2**
- Begin reviewing the Performance report's early Impressions/Queries data — at this stage expect low volume, but check which URLs are appearing at all (confirms indexing is progressing) and for which queries (early signal on whether title/description work from Section 21 is being matched to the intended search intent).
- Check the Pages report for any pages Google discovered but excluded, and investigate why.
- If international/hreflang was implemented, check the International Targeting report for hreflang errors.

**Week 3**
- Compare early CTR by page against the Section 21 recommended titles/descriptions — if CTR is unexpectedly low on a high-impression page, consider a title/description revision.
- Cross-check canonical/hreflang reports again now that Google has had 2+ weeks to fully process the sitemap.
- If Core Web Vitals field data has started populating in Search Console's Core Web Vitals report (usually needs a meaningful traffic volume over 28 days), do a first pass — this is the first point where H5/H6's real-world impact can be measured rather than estimated from code.

**Week 4**
- Full-month review: indexed-page count vs. sitemap-submitted count, top queries by page, any recurring crawl errors.
- Identify content opportunities from the Queries report — search terms with impressions but low CTR, or "near-miss" queries (page ranks but not for the intended primary keyword) that suggest a title/H1/content adjustment.
- Revisit the "CAN DO AFTER LAUNCH" list (Action Plan items 13–18) now informed by real production data instead of code-only estimates.

---

# Files inspected

- `package.json`, `next.config.js`
- `src/app/layout.tsx`
- `src/app/page.tsx` (Homepage)
- `src/app/pricing/page.tsx`
- `src/app/about/page.tsx`
- `src/app/our-story/page.tsx`
- `src/app/tax-return/page.tsx`
- `src/app/tools/page.tsx`
- `src/app/articles/page.tsx`
- `src/app/articles/rwr-karte/page.tsx`
- `src/app/articles/gewerbeanmeldung/page.tsx`
- `src/app/articles/austria-id/page.tsx`
- `src/app/articles/invalidity-child/page.tsx`
- `src/app/articles/gisa-formular/page.tsx`
- `src/app/impressum/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/agb/page.tsx`
- `src/app/cookies/page.tsx`
- `src/app/datenschutz/page.tsx`, `src/app/terms/page.tsx`, `src/app/how-it-works/tax-return/page.tsx`
- `src/app/for/biznes/page.tsx`, `src/app/for/frilanser/page.tsx`, `src/app/for/naymanyy/page.tsx`, `src/app/for/nerukhomist/page.tsx`, `src/app/for/pensioner/page.tsx`, `src/app/for/samostiynyy/page.tsx`
- `src/lib/articles.ts`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/LangSync.tsx`
- `src/components/layout/LegalLayout.tsx`
- `src/components/layout/ArticleNav.tsx`
- `src/components/layout/ArticlesSlider.tsx`
- `src/components/layout/ScrollArrows.tsx`
- `src/components/RWRCalculator.tsx`
- `src/components/RWRChecklists.tsx`
- `src/components/WhatIsQlixaFeatureGrid.tsx`, `src/components/ForWhomExpandableGrid.tsx`
- `src/components/NotifyMeButton.tsx`
- `src/components/ui/Input.tsx`, `src/components/ui/Textarea.tsx`, `src/components/ui/Badge.tsx`
- `src/styles/globals.css`
- `public/` directory structure (top-level folder listing; favicon files specifically)
- Full repository grep sweeps for: `noindex`/`nofollow`/`X-Robots-Tag`/`Disallow`, `application/ld+json`/`schema.org`, `canonical`, analytics scripts, `useState('UA')`, `href="#"`, localhost/staging domains, `sitemap`/`robots` filenames, `searchParams`/`useSearchParams`, `middleware`, `.DS_Store`
- Production verification: `npm run build` + `npm run start`, then `curl -D -` against `/`, `/pricing`, `/articles/rwr-karte`, `/about`, `/our-story`, `/tools`, `/articles`, `/impressum`, `/privacy`, `/agb`, `/cookies`, `/tax-return`, `/how-it-works/tax-return`, `/for/biznes`, `/for/frilanser`, `/datenschutz`, `/terms`, and a nonexistent route (404 check)

---

# Questions / Information Needed From Founders

1. **Internationalization strategy:** should QLIXA have separate crawlable URLs per language (e.g. `/de/...`, `/en/...`), or is the current single-URL/client-side-switch approach intentional? This single decision drives C4, C6, H3, and the entire Hreflang Matrix in Section 8, and cannot be inferred from the code.
2. **Legal page content:** when will the Impressum/Privacy/AGB/Cookies "working template" placeholders (C5) be finalized and removed? Launch should not proceed with these live in their current state.
3. **Plausible Analytics:** is it actually implemented somewhere outside this repository (e.g. injected at the hosting/platform level), or does the Privacy/Cookie Policy text need to be corrected to match reality (H8)?
4. **Article publish/update dates:** what are the real publication and last-updated dates for the 5 articles? Needed for `lastmod` in the sitemap and for any future `Article` schema (H4) — this audit will not invent these.
5. **Cabinet domain indexation:** can whoever maintains `cabinet-ten-lac.vercel.app` confirm that its authenticated routes are not indexable (noindex + not linked from anywhere public)? This repository cannot verify that separate deployment (M4).
6. **Primary OG image:** is there an existing approved 1200×630px brand image to use as the default social-share image (H2), or does one need to be created?
7. **Domain/redirect-level configuration (www vs. non-www, HTTP→HTTPS enforcement):** is this handled at the hosting/DNS layer already? Not visible from this repository (Section 18).
