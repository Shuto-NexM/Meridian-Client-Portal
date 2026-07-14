import Link from 'next/link';
import styles from './AdventureCta.module.css';

export default function AdventureCta() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>Adventure &amp; Landscape</span>
          <div className={styles.eyebrowLine} />
        </div>

        <h2 className={styles.heading}>
          Enter<br />
          <em className={styles.headingItalic}>The Landscape</em>
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
