import Image from 'next/image';
import Link from 'next/link';
import styles from './HoneymoonHero.module.css';

export default function HoneymoonHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <Image src="/images/Honeymoon/HJ-HERO-01.png" alt="Honeymoon hero — private villa terrace at dawn" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
      </div>
      <div className={styles.warmPulse} />
      <div className={styles.topVignette} />
      <div className={styles.bottomVignette} />

      <div className={styles.breadcrumb}>
        <Link href="/collections" className={styles.breadcrumbLink}>Collections</Link>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="oklch(34% 0.012 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6" /></svg>
        <span className={styles.breadcrumbCurrent}>Honeymoon</span>
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>A Meridian Collection</span>
          </div>
          <h1 className={styles.heading}>
            <span className={styles.line1}>Honeymoon</span>
            <em className={styles.line2}>Journeys</em>
          </h1>
          <p className={styles.subtitle}>Journeys designed not for celebration, but for the quieter beginning of a shared rhythm.</p>
          <div className={styles.ctas}>
            <Link href="/collections/honeymoon" className={styles.btnGhost}>Explore the Collection</Link>
            <a href="#philosophy" className={styles.btnText}>
              Read the philosophy
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.scrollNudge}>
        <div className={styles.scrollLabel}>Scroll</div>
        <div className={styles.scrollIcon}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="oklch(40% 0.012 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,9 12,15 18,9" /></svg>
        </div>
      </div>
    </section>
  );
}
