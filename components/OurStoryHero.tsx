import Image from 'next/image';
import styles from './OurStoryHero.module.css';

export default function OurStoryHero() {
  return (
    <section className={styles.hero}>
      {/* Image placeholder */}
      <div className={styles.imgPh}>
        <Image src="/images/Private concierge Begin your Journey Our story/OS-HERO-01.png" alt="Our Story hero" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
      </div>
      <div className={styles.warmPulse} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>Meridian Private Journeys</span>
          <div className={styles.eyebrowLine} />
        </div>
        <h1 className={styles.h1}>
          <span className={styles.h1Line1}>Our</span>
          <span className={styles.h1Line2}>Story</span>
        </h1>
        <p className={styles.subtitle}>We did not begin with a product. We began with a question: why does so much travel leave people more depleted than they arrived?</p>
      </div>

      <div className={styles.statLine}>
        Founded 2018 · Private journeys · Four collections · Eighty destinations
      </div>
    </section>
  );
}
