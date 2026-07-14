import Image from 'next/image';
import styles from './CollectionsHero.module.css';

export default function CollectionsHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <Image
          src="/images/Collection Overview/CO-HERO-01.png"
          alt="Four worlds of travel — the Collections hero"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <div className={styles.warmPulse} />
      <div className={styles.gradOverlay} />

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>The Collections</span>
          <div className={styles.eyebrowLine} />
        </div>

        <h1 className={styles.heading}>
          <span className={styles.line1}>Four ways</span>
          <span className={styles.line2}>of being somewhere.</span>
        </h1>

        <p className={styles.subtitle}>Each collection begins not with a destination but with a disposition — the particular quality of attention a traveller brings to the world.</p>

        <div className={styles.scrollNudge}>
          <div className={styles.scrollText}>Scroll</div>
          <div className={styles.scrollArrow}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="oklch(38% 0.010 62)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6,9 12,15 18,9" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
