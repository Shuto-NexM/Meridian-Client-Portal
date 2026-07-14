import Image from 'next/image';
import styles from './ConciergeHero.module.css';

export default function ConciergeHero() {
  return (
    <section className={styles.section}>
      {/* Background image */}
      <div className={styles.imgBg} />
      <div className={styles.imgEl}>
        <Image src="/images/Private concierge Begin your Journey Our story/PC-HERO-01.png" alt="Writing desk with travel journal, morning light" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
      </div>
      <div className={styles.warmPulse} />
      <div className={styles.vignette} />

      {/* Centered content */}
      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>Meridian Private Journeys</span>
          <div className={styles.eyebrowLine} />
        </div>
        <h1 className={styles.h1}>
          <span className={styles.h1Line1}>Private</span>
          <span className={styles.h1Line2}>Concierge</span>
        </h1>
        <p className={styles.subtitle}>
          Every journey begins with someone who listens before they speak — and who shapes what follows around what they have heard rather than what is already available.
        </p>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <div className={styles.tagline}>Your dedicated concierge · One relationship · Every journey</div>
        <a href="#philosophy" className={styles.readMore}>
          Read more
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </a>
      </div>
    </section>
  );
}
