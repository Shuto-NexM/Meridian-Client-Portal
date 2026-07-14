import Image from 'next/image';
import Link from 'next/link';
import styles from './CulturalHero.module.css';

function ArrowRight({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

function ChevronRight({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="oklch(36% 0.010 56)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9,18 15,12 9,6" />
    </svg>
  );
}

function ChevronDown({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="oklch(42% 0.010 62)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6,9 12,15 18,9" />
    </svg>
  );
}

export default function CulturalHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <Image src="/images/Cultural Immersion/CI-HERO-01.png" alt="Cultural Immersion hero — temple at dawn" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
      </div>
      <div className={styles.warmPulse} />
      <div className={styles.gradLeft} />
      <div className={styles.gradBottom} />

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/collections" className={styles.breadcrumbLink}>Collections</Link>
        <ChevronRight />
        <span className={styles.breadcrumbCurrent}>Cultural Immersion</span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>A Meridian Collection</span>
          </div>
          <h1 className={styles.heading}>
            <span className={styles.line1}>Cultural</span>
            <span className={styles.line2}>Immersion</span>
          </h1>
          <p className={styles.subtitle}>Journeys that return you to the pace the world once moved at.</p>
          <div className={styles.ctas}>
            <Link href="/collections/cultural-immersion" className={styles.btnGhost}>Explore the Collection</Link>
            <a href="#philosophy" className={styles.ctaLink}>
              Read the philosophy <ArrowRight />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll nudge */}
      <div className={styles.scrollNudge}>
        <div className={styles.scrollText}>Scroll</div>
        <div className={styles.scrollArrow}><ChevronDown /></div>
      </div>
    </section>
  );
}
