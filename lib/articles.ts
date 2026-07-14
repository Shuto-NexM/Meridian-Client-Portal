export interface Article {
  slug: string;
  label: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  theme: string;
  location?: string;
}

export const ARTICLES: Article[] = [
  {
    slug: 'kyoto-temple',
    label: 'Feature',
    title: 'The quality of silence in a temple garden at dawn.',
    excerpt: 'What Japanese inns understand about rest that Western spas have almost certainly missed. Twelve years of returning to the same inn in the hills above Kyoto, and what changed was not the place.',
    date: 'November 2024',
    readTime: '12 min read',
    theme: 'Wellness',
    location: 'Kyoto, Japan',
  },
  {
    slug: 'why-we-travel-before-the-season',
    label: 'Essay',
    title: 'Why we travel before the season.',
    excerpt: 'Against the reflex to maximise, and in favour of the slow hour in the hotel bar before the journey properly begins. On arriving early, and what it costs.',
    date: 'October 2024',
    readTime: '8 min read',
    theme: 'Pace',
  },
  {
    slug: 'doing-nothing-abroad',
    label: 'Essay',
    title: 'On the ethics of doing nothing abroad.',
    excerpt: 'Productivity culture has colonised the concept of rest. A meditation on what it means to travel without an agenda and why it is harder than it sounds.',
    date: 'September 2024',
    readTime: '7 min read',
    theme: 'Wellness',
  },
  {
    slug: 'case-for-arriving-early',
    label: 'Dispatch',
    title: 'The case for arriving a day early.',
    excerpt: 'Against the reflex to maximise, and in favour of the slow hour in the hotel bar before the journey properly begins.',
    date: 'October 2024',
    readTime: '5 min read',
    theme: 'Pace',
  },
  {
    slug: 'medina-before-the-souks',
    label: 'Dispatch',
    title: 'The medina before the souks become a stage.',
    excerpt: 'Marrakech at the edge of the Palmeraie — what survives of the ordinary life of the city when you know where to look for it and arrive before the performance begins.',
    date: 'March 2025',
    readTime: '6 min read',
    theme: 'Culture',
    location: 'Marrakech, Morocco',
  },
  {
    slug: 'dolomites-high-summer',
    label: 'Field Notes',
    title: 'The Dolomites in high summer.',
    excerpt: 'Walking the high passes between rifugi chosen for the quality of their morning views. On the discipline of altitude and what the body learns when the schedule is replaced by the terrain.',
    date: 'August 2024',
    readTime: '9 min read',
    theme: 'Adventure',
    location: 'Dolomites, Italy',
  },
  {
    slug: 'honeymoon-as-pace',
    label: 'Essay',
    title: 'The honeymoon as a first practice in pace.',
    excerpt: 'For two people at the beginning of a shared life, the most valuable thing the first journey can offer is not spectacle but unhurried time. What that actually requires.',
    date: 'February 2025',
    readTime: '8 min read',
    theme: 'Honeymoon',
  },
  {
    slug: 'bhutan-measure-of-wealth',
    label: 'Field Notes',
    title: 'The kingdom that measures its wealth differently.',
    excerpt: 'Ten days in Bhutan — Paro and Punakha. On the particular atmosphere of a country that chose to remain something particular, and what that choice looks like from the inside.',
    date: 'January 2025',
    readTime: '11 min read',
    theme: 'Culture',
    location: 'Bhutan',
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug);
}
