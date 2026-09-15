# QLIXA Design System v1.0

**Status:** Approved foundation specification\
**Scope:** QLIXA marketing website (`qlixa.eu`) and QLIXA Cabinet /
product UI (`app.qlixa.eu`)\
**Purpose:** A shared visual and interaction language for all QLIXA
products. The specification is shared; React/CSS implementations may
remain independent in separate repositories.

------------------------------------------------------------------------

## 1. Principles

QLIXA should feel like one product across the public website and the
Cabinet.

The design language is:

-   clear, modern and trustworthy;
-   minimal without feeling sterile;
-   friendly without becoming playful or childish;
-   visually distinctive through teal/turquoise brand elements and
    faceted low-poly marketing illustrations;
-   functional and calm in product interfaces;
-   accessible by default.

### Core implementation principle

**Standardize what already works. Do not use the design system as a
reason to redesign approved pages.**

The design system defines reusable foundations and patterns. It does not
require every visual composition to become a shared React component.

------------------------------------------------------------------------

## 2. Brand

### Brand character

QLIXA combines:

-   clean modern SaaS;
-   Scandinavian/minimal visual restraint;
-   deep charcoal typography;
-   teal/turquoise brand color;
-   pale aqua surfaces;
-   restrained yellow, green, amber and red semantic accents;
-   faceted / geometric / low-poly illustrations for marketing.

### Logo

Use the approved QLIXA logo and Q/orbit/planet motif.

Do not:

-   distort the logo;
-   recolor it with arbitrary colors;
-   add unapproved effects;
-   use the orbit motif so frequently that it competes with the logo.

------------------------------------------------------------------------

## 3. Colors

### Core palette

  ------------------------------------------------------------------------
  Token                    Value                   Primary use
  ------------------------ ----------------------- -----------------------
  `color-primary`          `#038390`               Brand, primary actions,
                                                   active states, links

  `color-primary-dark`     `#026B76`               Hover, strong brand
                                                   surfaces

  `color-charcoal`         `#1A1A1A`               Headings, strongest
                                                   text

  `color-surface`          `#FFFFFF`               Cards, forms, elevated
                                                   surfaces

  `color-background`       `#F0F7F8`               Main light background

  `color-light-teal`       `#E6F4F5`               Secondary surfaces

  `color-text-secondary`   `#404040`               Body and descriptive
                                                   text

  `color-text-muted`       `#737373`               Secondary metadata and
                                                   helper text

  `color-disabled`         `#9D9D9D`               Disabled/decorative
                                                   use, not important
                                                   small text

  `color-accent-yellow`    `#F5E642`               Coming Soon and rare
                                                   accent states

  `color-success`          `#10B981`               Successful states

  `color-warning`          `#F59E0B`               Warnings

  `color-danger`           `#CC0000`               Errors and destructive
                                                   states
  ------------------------------------------------------------------------

### Color rules

-   Primary readable text should normally use `#1A1A1A` or `#404040`.
-   `#9D9D9D` must not be the default color for important small text.
-   Yellow is an accent, not a general background color.
-   Success, warning and danger colors must carry semantic meaning
    rather than decoration.
-   Never communicate status through color alone.
-   New color combinations must satisfy WCAG AA contrast requirements
    for their intended text size.

------------------------------------------------------------------------

## 4. Typography

### Font families

**DM Sans**\
Primary UI font. Use for body text, buttons, navigation, forms, Cabinet
headings, tables and functional interfaces.

**DM Serif Display**\
Editorial/marketing display font. Use selectively for important
marketing headings. It is not the default Cabinet heading font.

**DM Mono**\
Use sparingly for data, codes or technical values when a monospaced
treatment genuinely improves comprehension.

### Semantic desktop type scale

  Role           Desktop size   Typical weight
  ------------ -------------- ----------------
  Display           `48–56px`              700
  H1                `40–46px`              700
  H2                `32–38px`              700
  H3                `24–28px`              700
  H4                   `20px`              700
  Body Large           `18px`          400/500
  Body                 `16px`          400/500
  Small                `14px`          400/500
  Caption              `12px`          500/600
  Eyebrow           `11–12px`              700

### Typography rules

-   Normal readable prose should default to **16px**.
-   `14px` is acceptable for secondary UI text.
-   `11–13px` is reserved for concise metadata, badges, captions and
    helper text.
-   Do not use tiny type to make content fit a layout.
-   Marketing headings may use responsive `clamp()` values while
    preserving the semantic hierarchy.
-   Long-form reading should prioritize comfortable line length and
    line-height over compactness.
-   Cabinet/data UI may be denser than marketing pages, but must remain
    readable.

------------------------------------------------------------------------

## 5. Spacing

### Primary spacing scale

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`

Use the scale for new components whenever practical.

Existing approved layouts may retain values such as `20px`, `28px` or
`40px` where changing them would alter the approved visual composition.

### Marketing guidance

-   `96px` --- major section separation where generous whitespace is
    appropriate.
-   `64px` --- standard section separation.
-   `32–48px` --- related content groups.
-   `24–32px` --- typical card padding.
-   `16–24px` --- internal groups.
-   `8–12px` --- tightly related controls/text.

### Cabinet guidance

Cabinet interfaces may use denser `16 / 24 / 32` spacing. Density should
come from intentional product hierarchy, not arbitrary compression.

------------------------------------------------------------------------

## 6. Containers

Do not force every QLIXA page into one universal width.

### Marketing containers

  ------------------------------------------------------------------------
  Container                                Max width Typical use
  --------------------- ---------------------------- ---------------------
  `wide`                                    `1200px` Pricing, complex
                                                     grids, wide landing
                                                     compositions

  `content`                                 `1080px` About and normal
                                                     landing sections

  `reading`                                  `760px` Long-form
                                                     article/legal reading
                                                     column

  `navigation`                              `1280px` Navbar / wide shell
  ------------------------------------------------------------------------

### Cabinet

Cabinet layouts may be fluid and product-specific. They should use
consistent page gutters and content hierarchy rather than inheriting
marketing widths.

------------------------------------------------------------------------

## 7. Radius

### Radius scale

`8px · 12px · 16px · 20px · 999px`

  Radius    Use
  --------- -------------------------------
  `8px`     Compact UI
  `12px`    Buttons, inputs, small cards
  `16px`    Standard cards and modals
  `20px`    Large product/marketing cards
  `999px`   Pills and badges

Do not mechanically alter approved `11px` or `13px` radii solely for
mathematical purity. New reusable components should prefer the token
scale.

------------------------------------------------------------------------

## 8. Borders & Shadows

### Borders

**Default brand border**\
`1px solid rgba(3,131,144,0.18)`

**Strong brand border**\
`1px solid rgba(3,131,144,0.30)`

**Neutral border**\
`1px solid rgba(26,26,26,0.12)`

### Shadows

QLIXA is primarily a flat/minimal interface. Shadows should communicate
hierarchy, elevation or interaction.

Use stronger teal shadows only for deliberately featured elements, such
as a primary commercial/product card.

Do not add large shadows to every card.

------------------------------------------------------------------------

## 9. Buttons

### Variants

**Primary**\
Teal background, white text. Main action.

**Secondary**\
Pale teal background, teal text, restrained teal border.

**Outline**\
White/transparent surface with visible border.

**Ghost**\
Text action, optionally with arrow/icon. Lowest visual priority.

### Base rules

-   Recommended minimum height: `44px`.
-   Preferred radius: `12px`.
-   Font: `15–16px`, weight `700`.
-   Typical horizontal padding: `20–24px`.
-   Button labels should describe the action.
-   Avoid multiple competing primary buttons in one local decision area.

### Required states

Every reusable button must define:

-   default;
-   hover;
-   `focus-visible`;
-   active;
-   disabled;
-   loading where relevant.

### Focus

Use a clearly visible brand-colored focus treatment, e.g. a `2px` teal
outline/ring with sufficient offset.

Do not remove focus outlines without providing an accessible
replacement.

------------------------------------------------------------------------

## 10. Cards

QLIXA does **not** use one universal card component for every purpose.

### Foundation

Cards share:

-   surface language;
-   radius family;
-   border language;
-   spacing rhythm;
-   typography hierarchy;
-   accessible interaction states when clickable.

### Reusable foundations

-   `StandardCard`
-   `FeatureCard`
-   `InfoCard`
-   `InteractiveCard`

### Composition-specific cards

These may remain separate components:

-   PricingCard
-   ArticleCard
-   DashboardCard
-   KPI card
-   Tax questionnaire card
-   Result card

They should share the QLIXA visual DNA without being forced into
identical structures.

### Interactive cards

Clickable cards require:

-   obvious interactive affordance;
-   hover where pointer devices support it;
-   visible keyboard focus;
-   correct semantic element/link behavior.

------------------------------------------------------------------------

## 11. Badges

### Semantic variants

**Brand**\
Light teal surface + teal text.

**Neutral**\
Neutral/muted surface.

**Success**\
Light success treatment.

**Warning / Coming Soon**\
Yellow accent with readable dark text.

### Rules

-   Badges are labels, not buttons.
-   Keep badge copy concise.
-   Use uppercase only when appropriate to the visual role.
-   Coming Soon yellow is a recognizable QLIXA accent and should remain
    consistent across marketing surfaces.

------------------------------------------------------------------------

## 12. Forms

Forms are a critical shared system, especially for the QLIXA Cabinet and
adaptive tax questionnaire.

### Components

The system should cover:

-   Input
-   Select
-   Textarea
-   Checkbox
-   Radio
-   Date input/picker
-   Search field where needed
-   Field group
-   Helper text
-   Error message

### Default input guidance

-   Height: approximately `48px`.
-   Radius: `12px`.
-   Surface: white.
-   Label: approximately `14px / 600`.
-   User-entered text: `16px`.
-   Helper/error text: `13–14px`.
-   Border: neutral by default.

### States

**Default**\
Neutral border.

**Hover**\
Slightly stronger border.

**Focus**\
Teal border + visible teal focus ring.

**Filled**\
Normal readable state; do not overdecorate.

**Success**\
Use only when explicit success confirmation helps the user.

**Error**\
Danger border plus a clear textual error message.

**Disabled**\
Visually muted but still legible.

### Form rules

-   Never indicate an error using color alone.
-   Every input needs an accessible label or equivalent accessible name.
-   Placeholder text is not a substitute for a label.
-   Error text should explain how to resolve the problem when possible.
-   Checkbox/radio controls should have a comfortable click/touch
    target; target size should generally be at least `44 × 44px` even if
    the visual control itself is smaller.
-   Preserve user-entered values when showing validation errors whenever
    possible.

------------------------------------------------------------------------

## 13. Feedback & States

Reusable feedback patterns should include:

-   info;
-   success;
-   warning;
-   error;
-   loading;
-   empty;
-   disabled.

### Feedback rules

-   Pair semantic color with text and/or an icon.
-   Do not use alarming red for neutral information.
-   Loading states should not cause unnecessary layout jumps.
-   Destructive actions must be clearly distinguishable from primary
    positive actions.
-   Toasts/temporary feedback must not be the only place where critical
    information is available.

------------------------------------------------------------------------

## 14. Marketing Patterns

Marketing pages may use:

-   DM Serif Display for important headings;
-   generous whitespace;
-   faceted low-poly illustrations;
-   stronger visual storytelling;
-   wide/content/reading containers according to purpose;
-   expressive but restrained featured cards.

Typical marketing patterns include:

-   Hero
-   Section heading
-   Feature grid
-   CTA block
-   Pricing composition
-   Article card
-   Article info box
-   FAQ
-   Editorial reading layout

### Important

Existing approved Homepage Hero, Pricing structure, About storytelling
and Tax Return flow are **not redesign targets** merely because the
design system exists.

------------------------------------------------------------------------

## 15. Product / Cabinet Patterns

The Cabinet should feel related to the website but prioritize usability
and information density.

### Cabinet characteristics

-   DM Sans as the primary heading/body font.
-   Smaller or no decorative illustrations inside task-heavy screens.
-   Functional line icons are acceptable.
-   Fluid dashboard layouts are acceptable.
-   Higher information density than marketing pages.
-   Clear action hierarchy.
-   Consistent form controls and states.
-   Strong progress/status communication.

### Shared with marketing

Website and Cabinet should share:

-   core colors;
-   button language;
-   form controls;
-   badges;
-   border language;
-   radius family;
-   semantic states;
-   focus behavior;
-   core typography family;
-   icon discipline;
-   tone of UI.

### Not required to be identical

Marketing and Cabinet do not need identical:

-   page widths;
-   heading font treatment;
-   card compositions;
-   whitespace density;
-   illustration density;
-   navigation structure.

The goal is **family resemblance, not duplication**.

------------------------------------------------------------------------

## 16. Icons & Illustrations

### Marketing illustration language

Approved direction:

**faceted / geometric / low-poly / modern business abstraction /
teal-turquoise**

Use this style consistently for marketing illustrations.

Avoid introducing competing illustration systems such as:

-   glossy 3D icon packs;
-   generic stock SaaS characters;
-   photorealistic stock illustrations;
-   unrelated cartoon styles.

### Functional icons

Cabinet/product UI may use simple line icons rather than low-poly art.

Functional icon rules should remain consistent in:

-   stroke weight;
-   optical size;
-   alignment;
-   active/inactive color;
-   semantic use.

Icons should support comprehension rather than decorate every label.

------------------------------------------------------------------------

## 17. Accessibility

Accessibility is part of the design system, not a final optional audit.

### Baseline

New and refactored components should:

-   meet WCAG AA color contrast for their intended use;
-   provide visible `focus-visible` states;
-   support keyboard operation;
-   use semantic HTML;
-   provide accessible names/labels for controls;
-   provide textual validation errors;
-   include meaningful alt text for informative images;
-   use `alt=""` for purely decorative images;
-   avoid relying on color alone;
-   provide comfortable interaction targets, generally at least `44px`;
-   respect `prefers-reduced-motion` where motion is non-essential.

### Heading hierarchy

Pages should have a meaningful semantic hierarchy. Visual size and
semantic heading level are related but not interchangeable.

### Motion

Animation should clarify state or hierarchy. It should not be required
to understand content.

------------------------------------------------------------------------

## 18. Do / Don't

### Do

-   Reuse semantic tokens.
-   Preserve approved QLIXA visual identity.
-   Prefer consistent interaction states.
-   Use one clear primary action per decision area.
-   Keep marketing expressive and Cabinet functional.
-   Use low-poly art as a marketing brand asset.
-   Build shared primitives only when they have genuinely reusable
    behavior.
-   Verify accessibility when creating a reusable component.

### Don't

-   Redesign approved pages simply to make them conform to a theoretical
    component library.
-   Force every page into the same max-width.
-   Force every card into one universal component.
-   Use tiny text to solve layout problems.
-   Add arbitrary new colors.
-   add strong shadows everywhere.
-   Use yellow as a generic button color.
-   Remove focus states.
-   Communicate errors/status only through color.
-   Copy React components between repositories merely to make
    implementations identical.
-   Mix multiple unrelated illustration styles.

------------------------------------------------------------------------

## 19. Implementation Rules

### Shared specification, independent implementation

This document is the shared source of truth for:

-   `qlixa.eu`
-   `app.qlixa.eu`

Each repository may implement the specification independently.

Do not copy components between projects unless there is a deliberate
future decision to create a shared package.

### Adoption workflow

For an existing project:

1.  Audit current implementation against this specification.
2.  Produce a gap report.
3.  Identify foundations that can be normalized without changing
    approved visuals.
4.  Introduce or normalize tokens.
5.  Refactor genuinely repeated primitives gradually.
6.  Verify the affected pages after each bounded change.
7.  Only then address broader consistency issues.

### No mass refactor

Do not:

-   rewrite every inline style at once;
-   replace all cards/buttons in one uncontrolled pass;
-   change approved layouts while introducing tokens;
-   perform responsive redesign as part of foundation adoption;
-   change product logic, payment, auth or data behavior as part of
    visual-system work.

### Marketing website adoption

First adoption should focus on foundations and visual consistency while
preserving:

-   approved Homepage Hero;
-   Pricing structure;
-   About story/content;
-   Tax Return flow;
-   existing approved illustrations.

### Cabinet adoption

First perform a read-only gap audit against this specification.

Prioritize:

1.  colors and surfaces;
2.  typography;
3.  buttons;
4.  forms;
5.  states/focus;
6.  cards;
7.  navigation/dashboard consistency;
8.  accessibility.

Do not redesign task flows solely to match the marketing website.

------------------------------------------------------------------------

## 20. Versioning

This specification is **QLIXA Design System v1.0**.

Changes should be intentional and documented.

### Patch change --- `v1.0.x`

Examples:

-   clarify a usage rule;
-   correct a token typo;
-   add accessibility guidance without changing visual behavior.

### Minor change --- `v1.x`

Examples:

-   introduce an approved new component pattern;
-   add a new semantic token;
-   expand Cabinet patterns.

### Major change --- `v2.0`

Examples:

-   brand palette change;
-   typography replacement;
-   fundamental component language redesign.

Do not silently change shared tokens in one project without checking
whether the same decision should apply to the other QLIXA project.

------------------------------------------------------------------------

# Quick Reference

## Colors

``` text
Primary          #038390
Primary Dark     #026B76
Charcoal         #1A1A1A
Surface          #FFFFFF
Background       #F0F7F8
Light Teal       #E6F4F5
Text Secondary   #404040
Text Muted       #737373
Disabled         #9D9D9D
Accent Yellow    #F5E642
Success          #10B981
Warning          #F59E0B
Danger           #CC0000
```

## Typography

``` text
UI / Body        DM Sans
Marketing Display DM Serif Display
Data / Code      DM Mono

Display          48–56
H1               40–46
H2               32–38
H3               24–28
H4               20
Body Large       18
Body             16
Small            14
Caption          12
Eyebrow          11–12
```

## Spacing

``` text
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96
```

## Radius

``` text
8 / 12 / 16 / 20 / 999
```

## Containers

``` text
Navigation       1280px
Wide             1200px
Content          1080px
Reading           760px
Cabinet           fluid / product-specific
```

## Interaction

``` text
Minimum action target: ~44px
Primary control radius: 12px
Visible focus: required
Keyboard support: required
Color-only status: prohibited
```

------------------------------------------------------------------------

**QLIXA Design System v1.0 --- Reports in One Click**
