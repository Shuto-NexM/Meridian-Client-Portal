import Image from 'next/image';
import styles from './JourneysHero.module.css';

export default function JourneysHero() {
  return (
    <section className={styles.section}>
      <div className={styles.bg}>
        <Image src="/images/Journeys overview/JO-HERO-01.png" alt="Journeys Archive" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
      </div>
      <div className={styles.warmPulse} />
      <div className={styles.vignette} />

      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>80 curated journeys · 2026</span>
          <div className={styles.eyebrowLine} />
        </div>

        <h1 className={styles.heading}>
          <span className={styles.headingLine1}>Every journey begins</span>
          <span className={styles.headingLine2}>with a different question.</span>
        </h1>

        <p className={styles.subtitle}>
          Each journey in this archive has been chosen for a specific emotional purpose. Not for its popularity, nor for its renown, but for the quality of time it reliably produces in the people who take it.
        </p>
      </div>
    </section>
  );
}
