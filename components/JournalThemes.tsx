import Link from 'next/link';
import styles from './JournalThemes.module.css';

export default function JournalThemes() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Browse by theme</span>
          </div>
          <h2 className={styles.h2}>
            What are you<br />
            <em className={styles.h2Italic}>thinking about?</em>
          </h2>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={`${styles.col} ${styles.colBorderRight} ${styles.colBorderBottom}`}>
          <button className={styles.themeLink}>Stillness</button>
          <button className={styles.themeLink}>Morning</button>
          <button className={styles.themeLink}>Silence</button>
          <button className={styles.themeLink}>Ritual</button>
        </div>
        <div className={`${styles.col} ${styles.colBorderRight} ${styles.colBorderBottom}`}>
          <button className={styles.themeLink}>Craft</button>
          <button className={styles.themeLink}>Landscape</button>
          <button className={styles.themeLink}>Architecture</button>
          <button className={styles.themeLink}>Light</button>
        </div>
        <div className={`${styles.col} ${styles.colBorderBottom}`}>
          <button className={styles.themeLink}>Seasonality</button>
          <button className={styles.themeLink}>Hospitality</button>
          <button className={styles.themeLink}>Walking</button>
          <button className={styles.themeLink}>Reading</button>
        </div>
        <div className={styles.footer}>
          <span className={styles.footerText}>42 essays across 12 themes</span>
          <span className={styles.footerDot}>·</span>
          <Link href="/journal" className={styles.footerLink}>
            Browse all
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
