import Image from 'next/image';
import Link from 'next/link';
import styles from './WellnessHero.module.css';

function ArrowRight({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

function ChevronRight({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="oklch(40% 0.012 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9,18 15,12 9,6" />
    </svg>
  );
}

export default function WellnessHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <Image src="/images/Wellness/WC-HERO-01.png" alt="Wellness retreat at dawn — a restorative MERIDIAN journey" fill priority style={{ objectFit: 'cover', objectPosition: 'center' }} />
      </div>
      <div className={styles.warmPulse} />
      <div className={styles.gradLeft} />
      <div className={styles.gradBottom} />

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <a href="/collections" className={styles.breadcrumbLink}>Collections</a>
        <ChevronRight />
        <span className={styles.breadcrumbCurrent}>Wellness &amp; Restoration</span>
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>A MERIDIAN COLLECTION</span>
          </div>
          <h1 className={styles.heading}>
            <span className={styles.line1}>Wellness &amp;</span>
            <span className={styles.line2}>Restoration</span>
          </h1>
          <p className={styles.subtitle}>Journeys that return you to yourself.</p>
          <div className={styles.ctas}>
            <Link href="/collections/wellness" className={styles.btnGhost}>Explore the Collection</Link>
            <a href="#philosophy" className={styles.ctaLink}>
              Read the philosophy
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.scrollNudge}>
        <div className={styles.scrollText}>Scroll</div>
        <div className={styles.scrollArrow}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="oklch(42% 0.012 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
