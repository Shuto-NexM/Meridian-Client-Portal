import Image from 'next/image';
import Link from 'next/link';
import styles from './ArticleRelatedJourney.module.css';

export default function ArticleRelatedJourney() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>This essay connects to</span>
        </div>
        <h2 className={styles.h2}>
          A journey<br />
          <em className={styles.h2Italic}>worth considering.</em>
        </h2>
      </div>

      <Link href="/journeys/kyoto" className={styles.card}>
        {/* Image side */}
        <div className={styles.imgSide}>
          <div className={styles.imgBg} />
          <Image src="/images/Jernal overview & Article template/JA-JOUR-01.png" alt="Kyoto forest, autumn" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div className={styles.imgFadeRight} />
          <div className={styles.imgCaption}>Kyoto, Japan · Autumn</div>
        </div>

        {/* Text side */}
        <div className={styles.textSide}>
          <div className={styles.textTop}>
            <div className={styles.journeyMeta}>Wellness &amp; Restoration · 7 nights</div>
            <h3 className={styles.journeyTitle}>Before the famous week arrives.</h3>
            <p className={styles.journeyBody}>
              Seven nights in Kyoto during the week before its autumn colour reaches its peak. Structured around the early morning hours this essay describes — when the gardens are most honest and the city most fully itself.
            </p>
          </div>
          <div className={styles.textFooter}>
            <span className={styles.journeyDate}>November · Unhurried</span>
            <span className={styles.exploreLink}>
              Explore journey
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
