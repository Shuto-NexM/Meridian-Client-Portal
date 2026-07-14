import Image from 'next/image';
import Link from 'next/link';
import styles from './HoneymoonJourneys.module.css';

const ArrowMd = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
  </svg>
);
const ArrowSm = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
  </svg>
);

export default function HoneymoonJourneys() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>16 curated journeys</span>
          </div>
          <h2 className={styles.heading}>
            Places that offer<br />
            <em>the gift of time.</em>
          </h2>
        </div>
        <Link href="/journeys" className={styles.viewAll}>View all journeys <ArrowMd /></Link>
      </div>

      {/* Row 1: 1.5fr / 1fr */}
      <div className={styles.row1}>
        <Link href="/journeys/bhutan" className={styles.card}>
          <div className={`${styles.img} ${styles.imgBhutan}`}>
            <Image src="/images/Honeymoon/HJ-JNY-01.png" alt="Bhutan, Punakha Valley — honeymoon journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgOverlay} />
            <div className={styles.imgCaption}>Bhutan · Punakha Valley · 07:10</div>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardMeta}>10 nights · Bhutan</div>
            <h3 className={`${styles.cardTitle} ${styles.cardTitleLg}`}>
              <em>A kingdom that has decided, very deliberately, not to hurry.</em>
            </h3>
            <p className={styles.cardBody}>Ten nights moving between Paro and Punakha. Farmhouse mornings, fortress afternoons, and the particular quality of a country that measures its prosperity differently from all its neighbours. Two people and all the time they require.</p>
            <span className={styles.exploreLink}>Explore this journey <ArrowMd /></span>
          </div>
        </Link>

        <Link href="/journeys/lake-como" className={styles.card}>
          <div className={`${styles.img} ${styles.imgComo}`}>
            <Image src="/images/Honeymoon/HJ-JNY-02.png" alt="Lake Como, Italy — honeymoon journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgOverlay} />
            <div className={styles.imgCaption}>Lake Como, Italy · October mist</div>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardMeta}>7 nights · Italian Lakes</div>
            <h3 className={`${styles.cardTitle} ${styles.cardTitleMd}`}>
              <em>The lake in October, when it belongs again to the people who live beside it.</em>
            </h3>
            <span className={styles.exploreLink}>Explore this journey <ArrowMd /></span>
          </div>
        </Link>
      </div>

      {/* Row 2: 1fr 1fr 1fr */}
      <div className={styles.row2}>
        <Link href="/journeys/kyoto" className={styles.card}>
          <div className={`${styles.imgMd} ${styles.imgKyoto}`}>
            <Image src="/images/Honeymoon/HJ-JNY-03.png" alt="Kyoto, Japan — honeymoon journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgOverlay} />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardMetaSm}>Kyoto, Japan · 7 nights</div>
            <h3 className={`${styles.cardTitle} ${styles.cardTitleSm}`}>
              <em>A ryokan that has been preparing rooms for two people since 1788.</em>
            </h3>
            <span className={styles.exploreLinkSm}>Explore <ArrowSm /></span>
          </div>
        </Link>

        <Link href="/journeys/lake-como" className={styles.card}>
          <div className={`${styles.imgMd} ${styles.imgProvence}`}>
            <Image src="/images/Honeymoon/HJ-JNY-04.png" alt="Provence, France — honeymoon journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgOverlay} />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardMetaSm}>Provence, France · 8 nights</div>
            <h3 className={`${styles.cardTitle} ${styles.cardTitleSm}`}>
              <em>September, when the harvest is in and the light becomes something else entirely.</em>
            </h3>
            <span className={styles.exploreLinkSm}>Explore <ArrowSm /></span>
          </div>
        </Link>

        <Link href="/journeys/scotland" className={styles.card}>
          <div className={`${styles.imgMd} ${styles.imgScotland}`}>
            <Image src="/images/Honeymoon/HJ-JNY-05.png" alt="Scottish Highlands — honeymoon journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgOverlay} />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardMetaSm}>Scottish Highlands · 6 nights</div>
            <h3 className={`${styles.cardTitle} ${styles.cardTitleSm}`}>
              <em>A private lodge at the edge of a loch, with a library and no agenda.</em>
            </h3>
            <span className={styles.exploreLinkSm}>Explore <ArrowSm /></span>
          </div>
        </Link>
      </div>

      {/* Row 3: 1fr / 1.5fr */}
      <div className={styles.row3}>
        <Link href="/journeys/bali" className={styles.card}>
          <div className={`${styles.imgSm} ${styles.imgBali}`}>
            <Image src="/images/Honeymoon/HJ-JNY-06.png" alt="Bali, Indonesia — honeymoon journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgOverlay} />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardMetaSm}>Bali · Private villa · 9 nights</div>
            <h3 className={`${styles.cardTitle} ${styles.cardTitleSm}`}>
              <em>A garden wall, a private pool, the sound of rain on a thatched roof.</em>
            </h3>
            <span className={styles.exploreLinkSm}>Explore <ArrowSm /></span>
          </div>
        </Link>

        {/* Santorini editorial */}
        <div className={styles.editorialCard}>
          <div>
            <div className={styles.editorialMeta}>Santorini, Greece · November · 7 nights</div>
            <h3 className={styles.editorialTitle}>
              <em>The island after the island is done performing for anyone.</em>
            </h3>
            <p className={styles.editorialBody}>November in Santorini: the crowds have left, the caldera is fog-grey by morning and amber by evening, and the tavernas that were too full to enter in July are now quiet enough for a two-hour dinner. A private house in Oia with a terrace that no one else is using.</p>
          </div>
          <div className={styles.editorialFooter}>
            <span className={styles.editorialSeason}><em>November &amp; early December only</em></span>
            <Link href="/journeys/lake-como" className={styles.btnGhost}>Explore this journey</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
