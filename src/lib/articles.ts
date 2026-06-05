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
    slug: 'gewerbeanmeldung',
    href: '/articles/gewerbeanmeldung',
    tag: 'Реєстрація бізнесу',
    title: 'Gewerbeanmeldung в Австрії: покрокова реєстрація самозайнятості',
    desc: 'Іноземці в Австрії платять юристам €300–500 за типові питання. Ми зібрали всю інформацію безкоштовно.',
    cover: '/articles/gewerbeanmeldung-cover.jpg',
    published: true,
  },
  {
    slug: 'austria-id',
    href: '/articles/austria-id',
    tag: 'Австрія · Документи',
    title: 'Як оформити Austria ID: покроковий гайд для іноземців',
    desc: 'Austria ID — обов\'язковий перший крок для реєстрації бізнесу, FinanzOnline та SVS.',
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
    title: 'Реєстрація на сайті GISA: покрокова інструкція',
    desc: 'Як подати заяву Gewerbeanmeldung онлайн через GISA — детально, з поясненням кожного поля та кроку.',
    cover: '/articles/gisa-cover.jpg',
    published: true,
  },
  {
    slug: 'svs-formular',
    href: '/articles/svs-formular',
    tag: 'SVS',
    title: 'Як заповнити формуляр SVS',
    desc: 'Соціальне страхування — що вказати щоб не переплатити.',
    cover: '',
    published: false,
  },
  {
    slug: 'finanz-online',
    href: '/articles/finanz-online',
    tag: 'FinanzOnline',
    title: 'Як заповнити формуляр FinanzOnline',
    desc: 'Реєстрація в податковій онлайн — покроково.',
    cover: '',
    published: false,
  },
  {
    slug: 'mvk-pension',
    href: '/articles/mvk-pension',
    tag: 'MVK',
    title: 'Як обрати пенсійний фонд MVK',
    desc: 'Що таке MVK і як не пропустити дедлайн 6 місяців.',
    cover: '',
    published: false,
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
