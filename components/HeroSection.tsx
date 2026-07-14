import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* Photography layer — Ken Burns */}
      <div className={styles.photoBg}>
        <Image
          src="/images/Home/HP-HERO-01.png"
          alt="A quiet threshold at dawn — the hour Meridian journeys are shaped around"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div className={styles.textureLine} />
      </div>

      {/* Atmospheric warmth pulse */}
      <div className={styles.warmPulse} />

      {/* Gradient overlays */}
      <div className={styles.gradLeft} />
      <div className={styles.gradBottom} />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Curated Journeys · 2026</span>
          </div>
          <h1 className={styles.headline}>
            <span className={styles.h1Line1}>Every place has an hour</span>
            <span className={styles.h1Line2}>that belongs only to you.</span>
          </h1>
          <p className={styles.subtitle}>Meridian curates journeys around that hour — and every hour surrounding it.</p>
          <div className={styles.ctas}>
            <Link href="/begin-your-journey" className={styles.ctaPrimary}>Begin your journey</Link>
            <Link href="/journeys" className={styles.ctaSecondary}>
              Explore all destinations
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll nudge */}
      <div className={styles.scrollNudge}>
        <div className={styles.scrollText}>Scroll</div>
        <div className={styles.scrollArrow}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(55% 0.012 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6,9 12,15 18,9"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
    </svg>
  );
}
