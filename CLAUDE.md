# CLAUDE.md — QLIXA Website

QLIXA is a multilingual Austrian self-service digital product.
This repository contains the public QLIXA marketing website.

- **Stack:** Next.js 15 + TypeScript
- **Repository:** `qlixa-platform/qlixa-web`
- **Production workflow:** Vercel, auto-deploy from `main`
- **Languages:** UA / DE / EN / RU
- **Dev:** `npm run dev` → `localhost:3000`

This file explains **how** to work in this repository and records
the current approved product guardrails needed to prevent accidental regressions.
Detailed visual, brand and PDF specifications live in the dedicated
source-of-truth documents identified below.

---

## SOURCE OF TRUTH

Before changing something, identify which document owns that decision.

### UI / visual design / components

`docs/QLIXA-DESIGN-SYSTEM-v1.md`

This is the visual source of truth for QLIXA — colors, typography,
spacing, containers, radius, buttons, cards, badges, forms, states,
marketing/product patterns, icons, accessibility.

Read it before:
- creating UI;
- materially changing UI;
- creating reusable UI components;
- changing typography, colors, spacing, cards, buttons, forms or
  interaction states.

Do not use the Design System as permission to redesign approved layouts.

### Brand (logos, tone of voice, brand-level rules)

`docs/QLIXA_Brand_Style_Guide.md`

Read it before working with logos, brand tone of voice, or any
brand-identity question not already answered by the Design System.

### PDF documents

`docs/PDF_MASTER_TEMPLATE.md`
`docs/QLIXA_Brand_Style_Guide.md`

Read both before creating or materially modifying QLIXA PDFs.
`PDF_MASTER_TEMPLATE.md` owns PDF-specific layout (page format,
header/footer measurements, content blocks, multi-page rules).

### Repository workflow

`CLAUDE.md` (this file)

Defines HOW to work with this repository. It must not duplicate
detailed specifications owned by the dedicated source-of-truth
documents above.

---

## WHEN RULES CONFLICT

Use this priority:

1. User's explicit instruction for the current task
2. Safety / critical-area rules in this file
3. Relevant dedicated source-of-truth document
4. Existing approved implementation
5. General conventions

If two project documents contradict each other: **STOP and report the
conflict.** Do not silently choose one.

---

## APPROVAL WORKFLOW

Before a new or materially changed implementation task:

1. Explain what you intend to change.
2. Explain which files/areas are likely affected.
3. Explain how you will verify the result.
4. Wait for explicit approval before implementation.

Once the user approves a clearly defined task or implementation
package, do NOT repeatedly ask for approval for every file inside
that approved scope. Do not expand the approved scope without asking.

For tiny corrections explicitly requested by the user, the user's
request itself counts as approval for that exact change.

---

## PRESERVE APPROVED WORK

Default behavior is minimal change. Unless explicitly requested, do NOT:

- redesign approved sections;
- rewrite approved copy;
- reorder sections or cards;
- change page structure;
- replace approved illustrations;
- alter intentional/manual positioning;
- change section heights purely for cleanup;
- introduce new marketing claims;
- invent new product features or promises.

Refactoring must preserve rendered behavior unless visual change is
explicitly part of the approved task.

Do not perform cleanup outside the approved scope merely because you
notice something that could be improved. Report unrelated technical
debt separately.

**Important:** do not preserve old implementation details when the
user has explicitly approved replacing them as part of a current task.

---

## CRITICAL AREAS — STOP BEFORE EDITING

Do not modify without separate explicit approval:

- payments / Stripe;
- authentication;
- Supabase data behavior;
- subscriptions / entitlements;
- database migrations;
- tax calculations;
- generated tax-return logic;
- production data behavior;
- legal documents;
- Cabinet authentication URLs;
- product-selection parameters.

This includes, where present: `?plan=employee`, payment flows,
entitlement logic.

Before editing a critical area:

1. explain why the change is needed;
2. identify affected files;
3. explain possible side effects;
4. explain rollback strategy;
5. wait for explicit approval.

A broad cleanup/design/refactor approval does NOT automatically
authorize HOT ZONE changes.

---

## PRODUCT BOUNDARIES

QLIXA is a self-service automated tool.

Do not present QLIXA as: Steuerberater, accountant, lawyer, financial
adviser, or individual tax adviser.

Avoid unsupported guarantees or claims such as: maximum refund,
guaranteed refund, error-free, exact refund, "we find every
deduction", "we know what is best for you".

Prefer factual product language such as: based on the user's answers,
possible deductions/categories, preliminary refund estimate, prepared
for review and submission.

QLIXA does not submit the tax return for the user unless actual
product behavior is explicitly changed and verified.

Do not invent legal/tax claims. For current Austrian legal, tax or
procedural claims, verify authoritative current sources before
publishing.

---

## CURRENT PRODUCT MODEL

### QLIXA Account / Cabinet
- free account;
- no artificial annual subscription access period.

### QLIXA Tax Return
- questionnaire can be completed before payment;
- preliminary result may be shown before payment;
- final ready tax declaration/download is paid;
- current consumer price: €24.90 including VAT;
- one payment = one tax declaration for one selected supported tax year;
- no subscription.

### QLIXA Business
- separate future product;
- Coming Soon;
- do not invent features or pricing.

This section describes the currently approved product model. Do not
infer additional functionality from it.

---

## LOCALIZATION

Supported public languages: UA / DE / EN / RU.

Rules:

- do not silently update only one locale when the approved task
  explicitly requires all locales;
- preserve meaning across translations rather than translating UI
  strings mechanically;
- German uses informal "du" where required by the current product voice;
- canonical public routes and section IDs use stable English
  technical names;
- do not create locale-specific route variants unless explicitly approved.

---

## DESIGN SYSTEM

Visual source of truth: `docs/QLIXA-DESIGN-SYSTEM-v1.md`

Do not duplicate Design System tokens in this file.

Website and Cabinet belong to the same QLIXA Design System but may
have independent implementations. Marketing and product UI should
have family resemblance, not identical layouts.

Before creating a reusable UI primitive:

1. inspect existing components;
2. determine whether an equivalent already exists;
3. reuse or extend when appropriate;
4. avoid abstraction for abstraction's sake.

---

## CURRENT RESPONSIVE STAGE

Current stage: **Desktop consistency and Design System foundation,
before broad mobile adaptation.**

Do not start broad mobile/tablet redesign as part of unrelated tasks.

Desktop QA targets: `1024 / 1280 / 1366 / 1440 / 1920`
Future mobile QA targets: `320 / 360 / 375 / 390 / 430`
Future tablet QA targets: `768 / 820 / 1024`

When overflow exists: diagnose the actual cause and choose the least
destructive solution for that specific case. Do not use
`overflow: hidden` merely to hide broken text, and do not prescribe
one implementation technique globally.

---

## CODE & ARCHITECTURE

Before creating something new:

- inspect the existing implementation;
- reuse appropriate components/utilities;
- avoid duplicate logic;
- avoid unnecessary abstraction;
- keep changes scoped;
- preserve localization architecture;
- preserve maintainability.

Do not perform broad refactors merely because cleaner architecture is
theoretically possible.

If technical debt is discovered outside the approved scope: report it
separately instead of silently fixing it.

---

## VERIFY BEFORE AND AFTER

Before implementation: state the verification plan.

After implementation:

- run appropriate build/type/lint checks that are actually available
  to the project;
- inspect affected routes/components;
- check for broken imports/references;
- report exactly what changed;
- report what was verified;
- report anything that could not be verified.

Never claim something was tested if it was not. Do not invent a
successful verification result.

---

## CANONICAL PUBLIC ARCHITECTURE

Canonical routes include:

```
/
/tax-return
/pricing
/about
/articles
/tools
/impressum
/privacy
/agb
/cookies
```

Legacy redirects may intentionally remain (e.g. old `/for/*` slugs,
`/datenschutz`, `/terms`, `/how-it-works/tax-return`).

Rules:

- do not introduce new segmented consumer product pages such as
  `/for/employee`, `/for/freelancer`, etc.;
- the unified consumer tax product canonical page is `/tax-return`;
- do not remove an intentional redirect merely because it is legacy.

If current repository structure differs, report the difference
instead of silently rewriting architecture.

---

## ARTICLES

Before creating a new article:

- inspect the current published article architecture;
- inspect `src/lib/articles.ts`;
- inspect one current representative published article;
- reuse current article components/patterns;
- verify every place where article metadata must currently be registered.

Do not rely on an old copied JSX template in this file.

For current Austrian legal, tax or procedural claims: verify
authoritative current sources before publishing. Do not invent fixed
deadlines, eligibility, fees or legal requirements.

If article registration is duplicated across multiple files, do not
silently refactor it during article creation. Report it as technical
debt unless refactoring was explicitly approved.

---

## PDF WORK

Before creating or materially modifying a PDF, read:

1. `docs/PDF_MASTER_TEMPLATE.md`
2. `docs/QLIXA_Brand_Style_Guide.md`

Those documents own PDF-specific layout and branding.

Do not duplicate PDF CSS/layout specifications in this file.

If those documents conflict with each other: STOP and report the conflict.

---

## LEGAL / COMPANY INFORMATION

Do not assume company, trademark, analytics, cookie, privacy or
legal-page facts from historical project notes.

Before publishing or changing legal/company information: verify the
current approved project information and, where appropriate, current
authoritative legal sources.

Legal pages are a CRITICAL AREA and require explicit approval before
modification.

---

## Key files

```
src/app/page.tsx                     — homepage
src/app/articles/                    — all articles
src/lib/articles.ts                  — article metadata source of truth
src/app/about/page.tsx               — about page
src/styles/globals.css               — global styles
src/components/layout/Navbar.tsx     — navbar
src/components/layout/Footer.tsx     — footer
src/components/RWRCalculator.tsx     — RWR+ calculator
src/components/RWRChecklists.tsx     — PDF checklists
public/logos/                        — all logos
public/articles/                     — article media and PDFs
```
