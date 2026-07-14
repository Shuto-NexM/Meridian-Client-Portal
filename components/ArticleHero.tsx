import Image from 'next/image';
import Link from 'next/link';
import styles from './ArticleHero.module.css';

export default function ArticleHero() {
  return (
    <section className={styles.section}>
      {/* Full-bleed hero image */}
      <div className={styles.heroImg}>
        <div className={styles.heroImgBg} />
        <Image src="/images/Jernal overview & Article template/JA-HERO-01.png" alt="Nanzenji temple garden at dawn" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
        <div className={styles.heroImgVignette} />
        <div className={styles.heroImgCaption}>Nanzenji · Kyoto · 05:52 · November</div>
      </div>

      {/* Hero text block */}
      <div className={styles.textBlock}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/journal" className={styles.breadcrumbLink}>The Journal</Link>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--m-border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9,18 15,12 9,6" />
          </svg>
          <Link href="/journal" className={styles.breadcrumbLink}>Essays</Link>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--m-border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9,18 15,12 9,6" />
          </svg>
          <span className={styles.breadcrumbCurrent}>On Temples &amp; Attention</span>
        </div>

        {/* Category + read time */}
        <div className={styles.badgeRow}>
          <span className={styles.badge}>Essay</span>
          <span className={styles.readTime}>18 min read</span>
        </div>

        {/* Title */}
        <h1 className={styles.h1}>
          What the temple at five in the morning communicates that it withholds at nine.
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          A record of seven mornings in Kyoto, arriving before the gates opened — and an argument for the discipline of arriving before you are welcome.
        </p>

        {/* Meta strip */}
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Written by</span>
            <span className={`${styles.metaVal} ${styles.metaValItalic}`}>The MERIDIAN Journal</span>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Published</span>
            <span className={styles.metaVal}>October 2026</span>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Place</span>
            <span className={styles.metaVal}>Kyoto, Japan</span>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Volume</span>
            <span className={styles.metaVal}>VII · Autumn 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
