import Image from 'next/image';
import Link from 'next/link';
import styles from './JourneyDetailHero.module.css';

const ChevronRight = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="oklch(36% 0.010 62)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9,18 15,12 9,6" />
  </svg>
);

export default function JourneyDetailHero() {
  return (
    <section className={styles.section}>
      <div className={styles.bg}>
        <Image src="/images/Journey detail template/JD-HERO-01.png" alt="Kyoto" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
      </div>
      <div className={styles.warmPulse} />
      <div className={styles.diagonalVignette} />
      <div className={styles.bottomVignette} />

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/collections" className={styles.breadcrumbLink}>Collections</Link>
        <ChevronRight />
        <Link href="/collections/wellness" className={styles.breadcrumbLink}>Wellness &amp; Restoration</Link>
        <ChevronRight />
        <span className={styles.breadcrumbCurrent}>Before the leaves fall</span>
      </div>

      {/* Hero content */}
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.tags}>
            <div className={styles.tagCollection}>
              <div className={styles.tagLine} />
              <span>Wellness &amp; Restoration</span>
            </div>
            <span className={styles.tagDot}>·</span>
            <span className={styles.tagLocation}>Kyoto, Japan</span>
          </div>

          <h1 className={styles.heading}>
            <span className={styles.headingLine1}>Before the</span>
            <span className={styles.headingLine2}>leaves fall.</span>
          </h1>

          <p className={styles.poetic}>
            Seven nights in Kyoto during the week before the city remembers it is beautiful.
          </p>

          <div className={styles.metaBar}>
            <div className={styles.metaStats}>
              <div className={styles.metaStat}>
                <div className={styles.metaLabel}>Duration</div>
                <div className={styles.metaVal}>7 nights</div>
              </div>
              <div className={styles.metaDivider} />
              <div className={styles.metaStat}>
                <div className={styles.metaLabel}>Season</div>
                <div className={styles.metaVal}>Late November</div>
              </div>
              <div className={styles.metaDivider} />
              <div className={styles.metaStat}>
                <div className={styles.metaLabel}>Pace</div>
                <div className={styles.metaVal}>Unhurried</div>
              </div>
            </div>
            <button className={styles.ghostBtn}>Read the journey</button>
          </div>
        </div>
      </div>

      {/* Scroll nudge */}
      <div className={styles.scrollNudge}>
        <div className={styles.scrollLabel}>Scroll</div>
        <div className={styles.scrollIcon}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="oklch(38% 0.010 62)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
