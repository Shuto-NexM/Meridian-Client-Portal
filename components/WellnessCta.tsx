import Link from 'next/link';
import styles from './WellnessCta.module.css';

export default function WellnessCta() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>Wellness &amp; Restoration</span>
          <div className={styles.eyebrowLine} />
        </div>

        <h2 className={styles.heading}>
          Begin<br />
          <em className={styles.headingItalic}>Your Restoration</em>
        </h2>

        <p className={styles.subtitle}>
          Every wellness journey begins with a conversation. Tell us what you need to leave behind, and we will find the place that asks for none of it.
        </p>

        <div className={styles.ctas}>
          <Link href="/begin-your-journey" className={styles.btnPrimary}>Speak with a concierge</Link>
          <Link href="/collections" className={styles.btnText}>Explore all collections →</Link>
        </div>
      </div>
    </section>
  );
}
