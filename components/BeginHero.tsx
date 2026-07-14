import Image from 'next/image';
import styles from './BeginHero.module.css';

export default function BeginHero() {
  return (
    <section className={styles.section}>
      <div className={styles.imgBg} />
      <div className={styles.imgWrap}>
        <Image src="/images/Private concierge Begin your Journey Our story/BJ-HERO-01.png" alt="Writing desk with travel journal, warm morning light" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
      </div>
      <div className={styles.warmPulse} />
      <div className={styles.vignette} />

      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>Meridian Private Journeys</span>
          <div className={styles.eyebrowLine} />
        </div>
        <h1 className={styles.h1}>
          <span className={styles.line1}>Begin Your</span>
          <span className={styles.line2}>Journey</span>
        </h1>
        <p className={styles.subtitle}>
          This is not a booking form. It is the beginning of a conversation — and we will take it from there.
        </p>
      </div>
    </section>
  );
}
