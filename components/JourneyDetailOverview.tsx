import Link from 'next/link';
import styles from './JourneyDetailOverview.module.css';

const ArrowRight = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
  </svg>
);

export default function JourneyDetailOverview() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.heading}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Journey Details</span>
          </div>
          <h2 className={styles.h2}>
            Everything you need to know,<br />
            <em className={styles.h2Italic}>before asking.</em>
          </h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.cell}>
            <div className={styles.cellLabel}>Duration</div>
            <div className={styles.cellVal}>7 nights</div>
            <div className={styles.cellSub}>8 days</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.cellLabel}>Ideal Season</div>
            <div className={`${styles.cellVal} ${styles.cellValItalic}`}>November</div>
            <div className={styles.cellSub}>Week of 10–17</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.cellLabel}>Pace</div>
            <div className={`${styles.cellVal} ${styles.cellValItalic}`}>Unhurried</div>
            <div className={styles.cellSub}>No more than two sites daily</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.cellLabel}>Group Size</div>
            <div className={styles.cellVal}>1 – 4</div>
            <div className={styles.cellSub}>Private &amp; exclusive</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.cellLabel}>Accommodation</div>
            <div className={`${styles.cellVal} ${styles.cellValItalic}`}>Ryokan</div>
            <div className={styles.cellSub}>Historic &amp; intimate</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.cellLabel}>Ideal For</div>
            <div className={`${styles.cellValSm} ${styles.cellValItalic}`}>Quiet<br />travellers</div>
            <div className={styles.cellSub}>Couples or individuals</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.cellLabel}>Transport</div>
            <div className={`${styles.cellValSm} ${styles.cellValItalic}`}>Private<br />transfer</div>
            <div className={styles.cellSub}>No group transport</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.cellLabel}>Collection</div>
            <div className={`${styles.cellValSm} ${styles.cellValItalic}`}>Wellness &amp;<br />Restoration</div>
            <Link href="/collections/wellness" className={styles.cellLink}>View collection <ArrowRight /></Link>
          </div>
        </div>

      </div>
    </section>
  );
}
