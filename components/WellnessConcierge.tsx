import Link from 'next/link';
import styles from './WellnessConcierge.module.css';

export default function WellnessConcierge() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Wellness Concierge Team</div>
          <blockquote className={styles.quote}>
            &ldquo;Tell us what you most need to leave behind. We will find the place that asks for none of it.&rdquo;
          </blockquote>
          <p className={styles.body}>
            Our Wellness Concierge team specialises in restoration. They know the difference between a spa hotel and a place that understands rest. They have spent time in all of them, and they will ask you the right questions before they recommend any of them.
          </p>
          <div className={styles.ctas}>
            <Link href="/begin-your-journey" className={styles.btnPrimary}>Begin a conversation</Link>
            <Link href="/journeys" className={styles.btnGhost}>View all journeys</Link>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detail}>
            <div className={styles.detailLabel}>Availability</div>
            <div className={styles.detailValue}>Monday — Friday, 9am — 6pm GMT</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.detailLabel}>Response time</div>
            <div className={styles.detailValue}>Within 4 hours</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.detailLabel}>First consultation</div>
            <div className={styles.detailValue}>Always complimentary</div>
          </div>
        </div>
      </div>
    </section>
  );
}
