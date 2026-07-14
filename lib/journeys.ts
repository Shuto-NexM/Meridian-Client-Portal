export interface Journey {
  slug: string;
  id: number;
  img: string;
  country: string;
  nights: string;
  season: string;
  badge: string;
  title: string;
  body: string;
  gradient: string;
  bottomGradient: string;
  badgeBg: string;
  collection: string[];
  region: string[];
  seasons: string[];
  pace: string[];
  // Detail page fields
  location: string;
  heroCaption: string;
  collectionPage: string;
  collectionLabel: string;
}

export const JOURNEYS: Journey[] = [
  {
    slug: 'kyoto',
    id: 1, img: 'JO-JNY-01', country: 'Japan', nights: '7 nights', season: 'Autumn',
    badge: 'Wellness',
    title: 'Before the famous week arrives.',
    body: 'Kyoto in the week before its autumn colour peaks. The gardens at their most honest; the temples before the crowds remember they are beautiful.',
    gradient: 'linear-gradient(155deg, oklch(26% 0.026 72) 0%, oklch(18% 0.018 68) 55%, oklch(13% 0.012 64) 100%)',
    bottomGradient: 'oklch(13% 0.012 64 / 0.80)',
    badgeBg: 'oklch(13% 0.012 64 / 0.60)',
    collection: ['wellness'], region: ['asia'], seasons: ['autumn'], pace: ['unhurried'],
    location: 'Kyoto, Japan', heroCaption: 'Kyoto, Japan · November · 05:48',
    collectionPage: '/collections/wellness', collectionLabel: 'Wellness & Restoration',
  },
  {
    slug: 'bhutan',
    id: 2, img: 'JO-JNY-02', country: 'Bhutan', nights: '10 nights', season: 'Autumn · Spring',
    badge: 'Cultural · Honeymoon',
    title: 'The kingdom that measures its wealth differently.',
    body: 'Paro and Punakha valleys. Temple mornings, farmhouse lunches, the light of the Himalayan plateau in October.',
    gradient: 'linear-gradient(152deg, oklch(24% 0.026 52) 0%, oklch(16% 0.018 48) 55%, oklch(11% 0.012 44) 100%)',
    bottomGradient: 'oklch(11% 0.012 44 / 0.80)',
    badgeBg: 'oklch(11% 0.012 44 / 0.60)',
    collection: ['cultural', 'honeymoon'], region: ['asia'], seasons: ['autumn', 'spring'], pace: ['unhurried'],
    location: 'Bhutan', heroCaption: 'Paro Valley, Bhutan · October · 06:30',
    collectionPage: '/collections/cultural-immersion', collectionLabel: 'Cultural Immersion',
  },
  {
    slug: 'patagonia',
    id: 3, img: 'JO-JNY-03', country: 'Patagonia', nights: '9 nights', season: 'March',
    badge: 'Adventure',
    title: 'The world at the end of the map.',
    body: 'Lake district to Torres del Paine. Three nights on horseback. The towers turning pink for forty minutes at dusk.',
    gradient: 'linear-gradient(158deg, oklch(22% 0.018 220) 0%, oklch(15% 0.012 216) 55%, oklch(10% 0.007 212) 100%)',
    bottomGradient: 'oklch(10% 0.007 212 / 0.80)',
    badgeBg: 'oklch(10% 0.007 212 / 0.60)',
    collection: ['adventure'], region: ['americas'], seasons: ['autumn', 'spring'], pace: ['active'],
    location: 'Patagonia, Chile', heroCaption: 'Torres del Paine · March · 07:20',
    collectionPage: '/collections/adventure-landscape', collectionLabel: 'Adventure & Landscape',
  },
  {
    slug: 'dolomites',
    id: 4, img: 'JO-JNY-04', country: 'Italy', nights: '6 nights', season: 'Summer · Autumn',
    badge: 'Adventure',
    title: 'Limestone cathedrals, lit from within at dusk.',
    body: 'Walking the high passes of the Dolomites, between rifugi chosen for the quality of their morning views rather than their facilities.',
    gradient: 'linear-gradient(150deg, oklch(28% 0.020 218) 0%, oklch(19% 0.014 214) 55%, oklch(14% 0.009 210) 100%)',
    bottomGradient: 'oklch(14% 0.009 210 / 0.80)',
    badgeBg: 'oklch(14% 0.009 210 / 0.60)',
    collection: ['adventure', 'wellness'], region: ['europe'], seasons: ['summer', 'autumn'], pace: ['active'],
    location: 'Dolomites, Italy', heroCaption: 'Alta Badia, Dolomites · August · 06:15',
    collectionPage: '/collections/adventure-landscape', collectionLabel: 'Adventure & Landscape',
  },
  {
    slug: 'bali',
    id: 5, img: 'JO-JNY-05', country: 'Bali', nights: '10 nights', season: 'Year-round',
    badge: 'Wellness · Honeymoon',
    title: 'Above the rice terraces. Below the noise.',
    body: 'Ubud in the hills above the famous town. A private villa with a garden wall. The sound of rain on a thatched roof at three in the morning.',
    gradient: 'linear-gradient(155deg, oklch(28% 0.038 80) 0%, oklch(20% 0.026 76) 55%, oklch(14% 0.018 72) 100%)',
    bottomGradient: 'oklch(14% 0.018 72 / 0.80)',
    badgeBg: 'oklch(14% 0.018 72 / 0.60)',
    collection: ['wellness', 'honeymoon'], region: ['asia'], seasons: ['spring', 'summer', 'autumn', 'winter'], pace: ['unhurried'],
    location: 'Ubud, Bali', heroCaption: 'Tegallalang, Bali · Dawn',
    collectionPage: '/collections/wellness', collectionLabel: 'Wellness & Restoration',
  },
  {
    slug: 'sri-lanka',
    id: 6, img: 'JO-JNY-06', country: 'Sri Lanka', nights: '6 nights', season: 'Winter · Spring',
    badge: 'Wellness · Honeymoon',
    title: 'Where the Indian Ocean exhales.',
    body: 'The southern coast before the season discovers it. Days shaped by tide rather than schedule. Amanwella at the edge of a quiet stretch of water.',
    gradient: 'linear-gradient(152deg, oklch(26% 0.034 155) 0%, oklch(18% 0.024 150) 55%, oklch(13% 0.016 146) 100%)',
    bottomGradient: 'oklch(13% 0.016 146 / 0.80)',
    badgeBg: 'oklch(13% 0.016 146 / 0.60)',
    collection: ['wellness', 'honeymoon'], region: ['asia'], seasons: ['winter', 'spring'], pace: ['unhurried'],
    location: 'South Coast, Sri Lanka', heroCaption: 'Tangalle, Sri Lanka · December · 06:40',
    collectionPage: '/collections/wellness', collectionLabel: 'Wellness & Restoration',
  },
  {
    slug: 'morocco',
    id: 7, img: 'JO-JNY-07', country: 'Morocco', nights: '5 nights', season: 'Spring · Autumn',
    badge: 'Cultural',
    title: 'The medina before the souks become a stage.',
    body: 'Marrakech at the edge of the Palmeraie. Rose garden mornings, an old riad, the particular quality of light that arrives over the Atlas in late autumn.',
    gradient: 'linear-gradient(148deg, oklch(30% 0.038 52) 0%, oklch(21% 0.026 48) 55%, oklch(15% 0.016 44) 100%)',
    bottomGradient: 'oklch(15% 0.016 44 / 0.80)',
    badgeBg: 'oklch(15% 0.016 44 / 0.60)',
    collection: ['cultural'], region: ['africa'], seasons: ['spring', 'autumn'], pace: ['mixed'],
    location: 'Marrakech, Morocco', heroCaption: 'Amanjena, Marrakech · October · 07:10',
    collectionPage: '/collections/cultural-immersion', collectionLabel: 'Cultural Immersion',
  },
  {
    slug: 'lofoten',
    id: 8, img: 'JO-JNY-08', country: 'Norway · Lofoten', nights: '7 nights', season: 'Summer · Winter',
    badge: 'Adventure',
    title: 'Mountains that rise directly from the sea.',
    body: "Seven nights in the Lofoten archipelago. A fisherman's cabin. The midnight sun or the northern lights, depending entirely on the season and the weather.",
    gradient: 'linear-gradient(152deg, oklch(22% 0.018 222) 0%, oklch(15% 0.012 218) 55%, oklch(10% 0.007 214) 100%)',
    bottomGradient: 'oklch(10% 0.007 214 / 0.80)',
    badgeBg: 'oklch(10% 0.007 214 / 0.60)',
    collection: ['adventure'], region: ['nordic'], seasons: ['summer', 'winter'], pace: ['active'],
    location: 'Lofoten, Norway', heroCaption: 'Reine, Lofoten · July · Midnight',
    collectionPage: '/collections/adventure-landscape', collectionLabel: 'Adventure & Landscape',
  },
  {
    slug: 'iceland',
    id: 9, img: 'JO-JNY-09', country: 'Iceland', nights: '8 nights', season: 'Summer · Autumn',
    badge: 'Adventure',
    title: 'The interior, in the season when it allows visitors.',
    body: "The Icelandic highlands open only in summer. Geothermal plains, obsidian rivers, a sky that doesn't darken until the season has ended.",
    gradient: 'linear-gradient(148deg, oklch(20% 0.014 220) 0%, oklch(13% 0.009 216) 55%, oklch(9% 0.005 212) 100%)',
    bottomGradient: 'oklch(9% 0.005 212 / 0.80)',
    badgeBg: 'oklch(9% 0.005 212 / 0.60)',
    collection: ['adventure'], region: ['nordic'], seasons: ['summer', 'autumn'], pace: ['active'],
    location: 'Icelandic Highlands', heroCaption: 'Landmannalaugar, Iceland · August · 23:00',
    collectionPage: '/collections/adventure-landscape', collectionLabel: 'Adventure & Landscape',
  },
  {
    slug: 'scotland',
    id: 10, img: 'JO-JNY-10', country: 'Scotland', nights: '7 nights', season: 'Spring · Autumn',
    badge: 'Adventure · Honeymoon',
    title: 'The north, where weather is a companion.',
    body: 'A private lodge at the edge of a loch. Seven nights of walking, reading, and watching the weather change its mind every four hours.',
    gradient: 'linear-gradient(146deg, oklch(22% 0.018 155) 0%, oklch(15% 0.012 150) 55%, oklch(11% 0.008 146) 100%)',
    bottomGradient: 'oklch(11% 0.008 146 / 0.80)',
    badgeBg: 'oklch(11% 0.008 146 / 0.60)',
    collection: ['adventure', 'honeymoon'], region: ['europe'], seasons: ['spring', 'autumn'], pace: ['mixed'],
    location: 'Scottish Highlands', heroCaption: 'Loch Torridon, Scotland · April · 08:00',
    collectionPage: '/collections/adventure-landscape', collectionLabel: 'Adventure & Landscape',
  },
  {
    slug: 'lake-como',
    id: 11, img: 'JO-JNY-11', country: 'Lake Como', nights: '7 nights', season: 'October · April',
    badge: 'Honeymoon',
    title: 'The lake in October, when it belongs again.',
    body: 'An old villa on the western shore. Fog in the morning, mountain light in the afternoon. The lake at a pace that no summer month permits.',
    gradient: 'linear-gradient(155deg, oklch(28% 0.022 205) 0%, oklch(19% 0.016 200) 55%, oklch(14% 0.010 195) 100%)',
    bottomGradient: 'oklch(14% 0.010 195 / 0.80)',
    badgeBg: 'oklch(14% 0.010 195 / 0.60)',
    collection: ['honeymoon'], region: ['europe'], seasons: ['autumn', 'spring'], pace: ['unhurried'],
    location: 'Lake Como, Italy', heroCaption: 'Bellagio, Lake Como · October · 07:50',
    collectionPage: '/collections/honeymoon', collectionLabel: 'Honeymoon Journeys',
  },
  {
    slug: 'faroe-islands',
    id: 12, img: 'JO-JNY-12', country: 'Faroe Islands', nights: '6 nights', season: 'Summer',
    badge: 'Adventure',
    title: 'Eighteen islands convinced of their own sufficiency.',
    body: 'Between Scotland and Iceland, the Atlantic on all sides. Grass-roofed villages, cliffs that have been absorbing the ocean since before recorded time.',
    gradient: 'linear-gradient(150deg, oklch(24% 0.016 220) 0%, oklch(16% 0.010 216) 55%, oklch(11% 0.006 212) 100%)',
    bottomGradient: 'oklch(11% 0.006 212 / 0.80)',
    badgeBg: 'oklch(11% 0.006 212 / 0.60)',
    collection: ['adventure'], region: ['nordic'], seasons: ['summer'], pace: ['active'],
    location: 'Faroe Islands', heroCaption: 'Gásadalur, Faroe Islands · July · 20:00',
    collectionPage: '/collections/adventure-landscape', collectionLabel: 'Adventure & Landscape',
  },
];

export function getJourney(slug: string): Journey | undefined {
  return JOURNEYS.find(j => j.slug === slug);
}
