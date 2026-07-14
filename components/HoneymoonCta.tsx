import Link from 'next/link';
import styles from './HoneymoonCta.module.css';

export default function HoneymoonCta() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>Honeymoon Journeys</span>
          <div className={styles.eyebrowLine} />
        </div>

        <h2 className={styles.heading}>
          Begin<br />
          <em className={styles.headingItalic}>Together</em>
        </h2>

        <p className={styles.subtitle}>Every meaningful journey begins with a conversation.</p>

        <div className={styles.ctas}>
          <Link href="/begin-your-journey" className={styles.btnGold}>Speak with a concierge</Link>
          <Link href="/collections" className={styles.btnText}>Explore all collections →</Link>
        </div>
      </div>
    </section>
  );
}
