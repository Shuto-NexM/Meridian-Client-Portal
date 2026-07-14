'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './JourneysInteractive.module.css';

type Filters = { collection: string; region: string; season: string; pace: string };

const JOURNEYS = [
  {
    id: 1, slug: 'kyoto', img: 'JO-JNY-01', country: 'Japan', nights: '7 nights', season: 'Autumn',
    badge: 'Wellness',
    title: 'Before the famous week arrives.',
    body: 'Kyoto in the week before its autumn colour peaks. The gardens at their most honest; the temples before the crowds remember they are beautiful.',
    gradient: 'linear-gradient(155deg, oklch(26% 0.026 72) 0%, oklch(18% 0.018 68) 55%, oklch(13% 0.012 64) 100%)',
    bottomGradient: 'oklch(13% 0.012 64 / 0.80)',
    badgeBg: 'oklch(13% 0.012 64 / 0.60)',
    collection: ['wellness'], region: ['asia'], seasons: ['autumn'], pace: ['unhurried'],
  },
  {
    id: 2, slug: 'bhutan', img: 'JO-JNY-02', country: 'Bhutan', nights: '10 nights', season: 'Autumn · Spring',
    badge: 'Cultural · Honeymoon',
    title: 'The kingdom that measures its wealth differently.',
    body: 'Paro and Punakha valleys. Temple mornings, farmhouse lunches, the light of the Himalayan plateau in October.',
    gradient: 'linear-gradient(152deg, oklch(24% 0.026 52) 0%, oklch(16% 0.018 48) 55%, oklch(11% 0.012 44) 100%)',
    bottomGradient: 'oklch(11% 0.012 44 / 0.80)',
    badgeBg: 'oklch(11% 0.012 44 / 0.60)',
    collection: ['cultural', 'honeymoon'], region: ['asia'], seasons: ['autumn', 'spring'], pace: ['unhurried'],
  },
  {
    id: 3, slug: 'patagonia', img: 'JO-JNY-03', country: 'Patagonia', nights: '9 nights', season: 'March',
    badge: 'Adventure',
    title: 'The world at the end of the map.',
    body: 'Lake district to Torres del Paine. Three nights on horseback. The towers turning pink for forty minutes at dusk.',
    gradient: 'linear-gradient(158deg, oklch(22% 0.018 220) 0%, oklch(15% 0.012 216) 55%, oklch(10% 0.007 212) 100%)',
    bottomGradient: 'oklch(10% 0.007 212 / 0.80)',
    badgeBg: 'oklch(10% 0.007 212 / 0.60)',
    collection: ['adventure'], region: ['americas'], seasons: ['autumn', 'spring'], pace: ['active'],
  },
  {
    id: 4, slug: 'dolomites', img: 'JO-JNY-04', country: 'Italy', nights: '6 nights', season: 'Summer · Autumn',
    badge: 'Adventure',
    title: 'Limestone cathedrals, lit from within at dusk.',
    body: 'Walking the high passes of the Dolomites, between rifugi chosen for the quality of their morning views rather than their facilities.',
    gradient: 'linear-gradient(150deg, oklch(28% 0.020 218) 0%, oklch(19% 0.014 214) 55%, oklch(14% 0.009 210) 100%)',
    bottomGradient: 'oklch(14% 0.009 210 / 0.80)',
    badgeBg: 'oklch(14% 0.009 210 / 0.60)',
    collection: ['adventure', 'wellness'], region: ['europe'], seasons: ['summer', 'autumn'], pace: ['active'],
  },
  {
    id: 5, slug: 'bali', img: 'JO-JNY-05', country: 'Bali', nights: '10 nights', season: 'Year-round',
    badge: 'Wellness · Honeymoon',
    title: 'Above the rice terraces. Below the noise.',
    body: 'Ubud in the hills above the famous town. A private villa with a garden wall. The sound of rain on a thatched roof at three in the morning.',
    gradient: 'linear-gradient(155deg, oklch(28% 0.038 80) 0%, oklch(20% 0.026 76) 55%, oklch(14% 0.018 72) 100%)',
    bottomGradient: 'oklch(14% 0.018 72 / 0.80)',
    badgeBg: 'oklch(14% 0.018 72 / 0.60)',
    collection: ['wellness', 'honeymoon'], region: ['asia'], seasons: ['spring', 'summer', 'autumn', 'winter'], pace: ['unhurried'],
  },
  {
    id: 6, slug: 'sri-lanka', img: 'JO-JNY-06', country: 'Sri Lanka', nights: '6 nights', season: 'Winter · Spring',
    badge: 'Wellness · Honeymoon',
    title: 'Where the Indian Ocean exhales.',
    body: 'The southern coast before the season discovers it. Days shaped by tide rather than schedule. Amanwella at the edge of a quiet stretch of water.',
    gradient: 'linear-gradient(152deg, oklch(26% 0.034 155) 0%, oklch(18% 0.024 150) 55%, oklch(13% 0.016 146) 100%)',
    bottomGradient: 'oklch(13% 0.016 146 / 0.80)',
    badgeBg: 'oklch(13% 0.016 146 / 0.60)',
    collection: ['wellness', 'honeymoon'], region: ['asia'], seasons: ['winter', 'spring'], pace: ['unhurried'],
  },
  {
    id: 7, slug: 'morocco', img: 'JO-JNY-07', country: 'Morocco', nights: '5 nights', season: 'Spring · Autumn',
    badge: 'Cultural',
    title: 'The medina before the souks become a stage.',
    body: 'Marrakech at the edge of the Palmeraie. Rose garden mornings, an old riad, the particular quality of light that arrives over the Atlas in late autumn.',
    gradient: 'linear-gradient(148deg, oklch(30% 0.038 52) 0%, oklch(21% 0.026 48) 55%, oklch(15% 0.016 44) 100%)',
    bottomGradient: 'oklch(15% 0.016 44 / 0.80)',
    badgeBg: 'oklch(15% 0.016 44 / 0.60)',
    collection: ['cultural'], region: ['africa'], seasons: ['spring', 'autumn'], pace: ['mixed'],
  },
  {
    id: 8, slug: 'lofoten', img: 'JO-JNY-08', country: 'Norway · Lofoten', nights: '7 nights', season: 'Summer · Winter',
    badge: 'Adventure',
    title: 'Mountains that rise directly from the sea.',
    body: 'Seven nights in the Lofoten archipelago. A fisherman\'s cabin. The midnight sun or the northern lights, depending entirely on the season and the weather.',
    gradient: 'linear-gradient(152deg, oklch(22% 0.018 222) 0%, oklch(15% 0.012 218) 55%, oklch(10% 0.007 214) 100%)',
    bottomGradient: 'oklch(10% 0.007 214 / 0.80)',
    badgeBg: 'oklch(10% 0.007 214 / 0.60)',
    collection: ['adventure'], region: ['nordic'], seasons: ['summer', 'winter'], pace: ['active'],
  },
  {
    id: 9, slug: 'iceland', img: 'JO-JNY-09', country: 'Iceland', nights: '8 nights', season: 'Summer · Autumn',
    badge: 'Adventure',
    title: 'The interior, in the season when it allows visitors.',
    body: 'The Icelandic highlands open only in summer. Geothermal plains, obsidian rivers, a sky that doesn\'t darken until the season has ended.',
    gradient: 'linear-gradient(148deg, oklch(20% 0.014 220) 0%, oklch(13% 0.009 216) 55%, oklch(9% 0.005 212) 100%)',
    bottomGradient: 'oklch(9% 0.005 212 / 0.80)',
    badgeBg: 'oklch(9% 0.005 212 / 0.60)',
    collection: ['adventure'], region: ['nordic'], seasons: ['summer', 'autumn'], pace: ['active'],
  },
  {
    id: 10, slug: 'scotland', img: 'JO-JNY-10', country: 'Scotland', nights: '7 nights', season: 'Spring · Autumn',
    badge: 'Adventure · Honeymoon',
    title: 'The north, where weather is a companion.',
    body: 'A private lodge at the edge of a loch. Seven nights of walking, reading, and watching the weather change its mind every four hours.',
    gradient: 'linear-gradient(146deg, oklch(22% 0.018 155) 0%, oklch(15% 0.012 150) 55%, oklch(11% 0.008 146) 100%)',
    bottomGradient: 'oklch(11% 0.008 146 / 0.80)',
    badgeBg: 'oklch(11% 0.008 146 / 0.60)',
    collection: ['adventure', 'honeymoon'], region: ['europe'], seasons: ['spring', 'autumn'], pace: ['mixed'],
  },
  {
    id: 11, slug: 'lake-como', img: 'JO-JNY-11', country: 'Lake Como', nights: '7 nights', season: 'October · April',
    badge: 'Honeymoon',
    title: 'The lake in October, when it belongs again.',
    body: 'An old villa on the western shore. Fog in the morning, mountain light in the afternoon. The lake at a pace that no summer month permits.',
    gradient: 'linear-gradient(155deg, oklch(28% 0.022 205) 0%, oklch(19% 0.016 200) 55%, oklch(14% 0.010 195) 100%)',
    bottomGradient: 'oklch(14% 0.010 195 / 0.80)',
    badgeBg: 'oklch(14% 0.010 195 / 0.60)',
    collection: ['honeymoon'], region: ['europe'], seasons: ['autumn', 'spring'], pace: ['unhurried'],
  },
  {
    id: 12, slug: 'faroe-islands', img: 'JO-JNY-12', country: 'Faroe Islands', nights: '6 nights', season: 'Summer',
    badge: 'Adventure',
    title: 'Eighteen islands convinced of their own sufficiency.',
    body: 'Between Scotland and Iceland, the Atlantic on all sides. Grass-roofed villages, cliffs that have been absorbing the ocean since before recorded time.',
    gradient: 'linear-gradient(150deg, oklch(24% 0.016 220) 0%, oklch(16% 0.010 216) 55%, oklch(11% 0.006 212) 100%)',
    bottomGradient: 'oklch(11% 0.006 212 / 0.80)',
    badgeBg: 'oklch(11% 0.006 212 / 0.60)',
    collection: ['adventure'], region: ['nordic'], seasons: ['summer'], pace: ['active'],
  },
];

const FILTER_GROUPS = [
  { key: 'collection', label: 'Collection', options: ['All', 'Wellness', 'Cultural', 'Adventure', 'Honeymoon'] },
  { key: 'region', label: 'Region', options: ['All', 'Asia', 'Europe', 'Americas', 'Africa', 'Nordic'] },
  { key: 'season', label: 'Season', options: ['All', 'Spring', 'Summer', 'Autumn', 'Winter'] },
  { key: 'pace', label: 'Pace', options: ['All', 'Unhurried', 'Active', 'Mixed'] },
] as const;

const ArrowRight = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
  </svg>
);

function isVisible(j: typeof JOURNEYS[0], filters: Filters) {
  if (filters.collection !== 'all' && !j.collection.includes(filters.collection)) return false;
  if (filters.region !== 'all' && !j.region.includes(filters.region)) return false;
  if (filters.season !== 'all' && !j.seasons.includes(filters.season)) return false;
  if (filters.pace !== 'all' && !j.pace.includes(filters.pace)) return false;
  return true;
}

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function JourneysInteractive() {
  const [filters, setFilters] = useState<Filters>({ collection: 'all', region: 'all', season: 'all', pace: 'all' });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  // Non-passive wheel listener so preventDefault works
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.shiftKey) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY * 1.2, behavior: 'auto' });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const scrollByAmount = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    didDrag.current = false;
    dragStartX.current = e.pageX - el.getBoundingClientRect().left;
    dragScrollLeft.current = el.scrollLeft;
    el.style.cursor = 'grabbing';
    el.style.userSelect = 'none';
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.getBoundingClientRect().left;
    const delta = x - dragStartX.current;
    if (Math.abs(delta) > 4) didDrag.current = true;
    scrollRef.current.scrollLeft = dragScrollLeft.current - delta;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = '';
      scrollRef.current.style.userSelect = '';
    }
  };

  const setFilter = (key: keyof Filters, val: string, btn: HTMLButtonElement) => {
    if (didDrag.current) return;
    setFilters(prev => ({ ...prev, [key]: val.toLowerCase() }));
    requestAnimationFrame(() => {
      btn.scrollIntoView({ inline: 'nearest', behavior: 'smooth', block: 'nearest' });
    });
  };

  const visible = JOURNEYS.filter(j => isVisible(j, filters));

  return (
    <>
      {/* §2 · Sticky Filter Bar */}
      <div className={styles.filterBar}>
        {/* Desktop: scrollable 4-group filter */}
        <div className={styles.filterScrollWrap}>
          {/* Left arrow */}
          <button
            className={`${styles.filterArrow} ${styles.filterArrowLeft} ${canScrollLeft ? styles.filterArrowVisible : ''}`}
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll filters left"
            tabIndex={canScrollLeft ? 0 : -1}
          >
            <ChevronLeft />
          </button>

          {/* Left fade */}
          <div className={`${styles.filterFade} ${styles.filterFadeLeft} ${canScrollLeft ? styles.filterFadeVisible : ''}`} />

          {/* Scroll container */}
          <div
            ref={scrollRef}
            className={styles.filterScroll}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {FILTER_GROUPS.map((group, gi) => (
              <div key={group.key} className={`${styles.filterGroup} ${gi < FILTER_GROUPS.length - 1 ? styles.filterGroupBorder : ''}`}>
                <span className={styles.filterLabel}>{group.label}</span>
                <div className={styles.filterBtns}>
                  {group.options.map(opt => {
                    const val = opt.toLowerCase();
                    const active = filters[group.key] === val || (val === 'all' && filters[group.key] === 'all');
                    return (
                      <button
                        key={opt}
                        className={`${styles.filterBtn} ${active ? styles.filterBtnActive : ''}`}
                        onClick={e => setFilter(group.key, val, e.currentTarget)}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right fade */}
          <div className={`${styles.filterFade} ${styles.filterFadeRight} ${canScrollRight ? styles.filterFadeVisible : ''}`} />

          {/* Right arrow */}
          <button
            className={`${styles.filterArrow} ${styles.filterArrowRight} ${canScrollRight ? styles.filterArrowVisible : ''}`}
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll filters right"
            tabIndex={canScrollRight ? 0 : -1}
          >
            <ChevronRight />
          </button>
        </div>

        {/* Mobile: Season-only pill tabs */}
        <div className={styles.mobileSeasonTabs}>
          {(['All', 'Spring', 'Summer', 'Autumn', 'Winter'] as const).map(opt => {
            const val = opt.toLowerCase();
            const active = filters.season === val;
            return (
              <button
                key={opt}
                className={`${styles.mobileSeasonTab} ${active ? styles.mobileSeasonTabActive : ''}`}
                onClick={() => setFilters(prev => ({ ...prev, season: val }))}
              >{opt}</button>
            );
          })}
        </div>

        <div className={styles.resultsCount}>
          {visible.length === JOURNEYS.length
            ? `Showing all ${JOURNEYS.length} journeys`
            : `Showing ${visible.length} of ${JOURNEYS.length} journeys`}
        </div>
      </div>

      {/* §3 · Featured Journey */}
      <section className={styles.featured}>
        <div className={styles.featuredEyebrow}>
          <div className={styles.featuredEyebrowLine} />
          <span>Featured Journey · Autumn 2026</span>
        </div>

        <div className={styles.featuredGrid}>
          <div className={styles.featuredImgWrap}>
            <div className={styles.featuredImgBg} />
            <Image src="/images/Journeys overview/JO-FEAT-01.png" alt="Kyoto, Japan" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.featuredImgFade} />
            <div className={styles.featuredCaption}>Kyoto, Japan · November · 05:48</div>
          </div>

          <div className={styles.featuredContent}>
            <div className={styles.featuredMeta}>
              <span>Kyoto, Japan</span>
              <span className={styles.featuredMetaDot}>·</span>
              <span>7 nights</span>
              <span className={styles.featuredMetaDot}>·</span>
              <span>Wellness &amp; Restoration</span>
            </div>

            <h2 className={styles.featuredTitle}>Before the famous week arrives.</h2>

            <p className={styles.featuredBody}>
              Seven nights in Kyoto during the week before the city's autumn colour reaches its peak — when the gardens are at their most honest and the light arrives at angles it holds only for those who came early. Temple corridors walked at dawn, a private ryokan in the eastern hills, the particular silence of a world that has not yet composed itself for company.
            </p>

            <div className={styles.featuredStats}>
              <div className={styles.featuredStat}>
                <div className={styles.featuredStatLabel}>Season</div>
                <div className={styles.featuredStatVal}>Late November</div>
              </div>
              <div className={styles.featuredStatDivider} />
              <div className={styles.featuredStat}>
                <div className={styles.featuredStatLabel}>Pace</div>
                <div className={styles.featuredStatVal}>Unhurried</div>
              </div>
              <div className={styles.featuredStatDivider} />
              <div className={styles.featuredStat}>
                <div className={styles.featuredStatLabel}>Group</div>
                <div className={styles.featuredStatVal}>1 – 4</div>
              </div>
            </div>

            <div className={styles.featuredCtas}>
              <Link href="/journeys/kyoto" className={styles.btnGold}>Explore this journey</Link>
              <Link href="/begin-your-journey" className={styles.btnText}>
                Speak with a concierge <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* §4 · Journey Library */}
      <section className={styles.library}>
        <div className={styles.libraryHeader}>
          <div>
            <div className={styles.libraryEyebrow}>
              <div className={styles.libraryEyebrowLine} />
              <span>The Archive</span>
            </div>
            <h2 className={styles.libraryHeading}>
              Every journey,<br />
              <em className={styles.libraryHeadingItalic}>in one place.</em>
            </h2>
          </div>
        </div>

        <div className={styles.grid}>
          {JOURNEYS.map(j => {
            const show = isVisible(j, filters);
            return (
              <Link key={j.id} href={`/journeys/${j.slug}`} className={`${styles.card} ${show ? '' : styles.cardHidden}`}>
                <div className={styles.cardImgWrap}>
                  <div className={styles.cardImgBg} style={{ background: j.gradient }}>
                    <div className={styles.cardImgGrad} style={{ background: `linear-gradient(to top, ${j.bottomGradient} 0%, transparent 100%)` }} />
                    <div className={styles.cardBadge} style={{ background: j.badgeBg }}>{j.badge}</div>
                  </div>
                  <Image src={`/images/Journeys overview/${j.img}.png`} alt={j.country} fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
                </div>

                <div className={styles.cardMeta}>
                  <span className={styles.cardMetaCountry}>{j.country}</span>
                  <span className={styles.cardMetaDot}>·</span>
                  <span>{j.nights}</span>
                  <span className={styles.cardMetaDot}>·</span>
                  <span>{j.season}</span>
                </div>

                <h3 className={styles.cardTitle}>{j.title}</h3>
                <p className={styles.cardBody}>{j.body}</p>
                <span className={styles.cardLink}>
                  Explore journey <ArrowRight />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
