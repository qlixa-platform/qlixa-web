export type Article = {
  slug: string
  href: string
  tag: string
  title: string
  desc: string
  cover: string
  published: boolean
}

export const articles: Article[] = [
  {
    slug: 'rwr-karte',
    href: '/articles/rwr-karte',
    tag: 'Гайд',
    title: 'Як підготуватися до подачі на RWR+ карту',
    desc: 'Покроковий гайд: документи, калькулятор фінансових вимог і PDF чеклісти для найманих та самозайнятих.',
    cover: '/articles/rwr-karte-cover.jpg',
    published: true,
  },
  {
    slug: 'gewerbeanmeldung',
    href: '/articles/gewerbeanmeldung',
    tag: 'Реєстрація бізнесу',
    title: 'Gewerbeanmeldung в Австрії: покрокова реєстрація самозайнятості',
    desc: 'Покроковий огляд Gewerbeanmeldung: які документи можуть знадобитися, куди подавати заяву та на що звернути увагу під час реєстрації.',
    cover: '/articles/gewerbeanmeldung-cover.jpg',
    published: true,
  },
  {
    slug: 'austria-id',
    href: '/articles/austria-id',
    tag: 'Австрія · Документи',
    title: 'Як оформити ID Austria: покроковий гайд для іноземців',
    desc: 'Як оформити ID Austria та використовувати її для доступу до цифрових державних сервісів, зокрема FinanzOnline.',
    cover: '/articles/austria-id-cover.jpg',
    published: true,
  },
  {
    slug: 'invalidity-child',
    href: '/articles/invalidity-child',
    tag: 'Сім\'я · Пільги',
    title: 'Інвалідність дитини в Австрії: виплати, пільги та з чого почати',
    desc: 'Behindertenpass, підвищена Familienbeihilfe, Pflegegeld та податкові пільги — покроковий гайд для батьків.',
    cover: '/articles/invalidity-cover.jpg',
    published: true,
  },
  {
    slug: 'gisa-formular',
    href: '/articles/gisa-formular',
    tag: 'GISA · Реєстрація',
    title: 'Як зареєструвати підприємницьку діяльність через GISA: покрокова онлайн-інструкція',
    desc: 'Як подати заяву Gewerbeanmeldung онлайн через GISA — детально, з поясненням кожного поля та кроку.',
    cover: '/articles/gisa-cover.jpg',
    published: true,
  },
  // Added once the article existed in all 4 locales (Phase 8 EN/UA/RU
  // localization brief, section 9). Appended at the end — this only
  // gives gisa-formular a "next" article it didn't have before and
  // doesn't reshuffle any other existing article's prev/next adjacency.
  // `tag`/`title` here are the UA base text (this array has no language
  // dimension of its own); EN/RU/DE overrides live in
  // src/components/layout/ArticleNav.tsx's ARTICLE_META_TRANSLATIONS,
  // exactly like the other 5 articles. `cover` is required by the
  // `Article` type but — like every other entry here — is never
  // actually read by ArticleSidebar/ArticlePrevNext (confirmed: neither
  // renders an image), so this placeholder path being non-existent has
  // no effect.
  {
    slug: 'steuererklaerung-selbst-vorbereiten',
    href: '/articles/steuererklaerung-selbst-vorbereiten',
    tag: 'Податкова декларація',
    title: 'Як самостійно підготувати податкову декларацію в Австрії: крок за кроком',
    desc: 'Як самостійно підготувати податкову декларацію в Австрії без вивчення податкових форм. QLIXA проводить крок за кроком через зрозумілі запитання.',
    cover: '/articles/steuererklaerung-selbst-vorbereiten-cover.jpg',
    published: true,
  },
]

export function getAdjacentArticles(currentSlug: string) {
  const published = articles.filter(a => a.published)
  const idx = published.findIndex(a => a.slug === currentSlug)
  return {
    prev: idx > 0 ? published[idx - 1] : null,
    next: idx < published.length - 1 ? published[idx + 1] : null,
  }
}
