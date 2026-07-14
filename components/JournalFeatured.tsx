import Image from 'next/image';
import Link from 'next/link';
import styles from './JournalFeatured.module.css';

export default function JournalFeatured() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>Featured Essay · Autumn 2026</span>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Left: image */}
        <div className={styles.imgCol}>
          <div className={styles.imgBg} />
          <Image src="/images/Jernal overview & Article template/JV-FEAT-01.png" alt="Nanzenji, Kyoto at dawn" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div className={styles.imgFadeRight} />
          <div className={styles.imgCaption}>Nanzenji, Kyoto · November · 05:52</div>
        </div>

        {/* Right: text */}
        <div className={styles.textCol}>
          <div className={styles.badgeRow}>
            <span className={styles.badge}>Essay</span>
            <span className={styles.readTime}>18 min read</span>
          </div>

          <h2 className={styles.h2}>
            What the temple at five in the morning communicates that it withholds at nine.
          </h2>

          <p className={styles.body}>
            On the particular quality of a sacred place before it has been prepared for visitors — when the monks are still present in it and the morning light belongs entirely to the building and the people who have always been there. A record of seven mornings in Kyoto, arriving before the gates opened.
          </p>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Written by</div>
              <div className={`${styles.metaVal} ${styles.metaValItalic}`}>The MERIDIAN Journal</div>
            </div>
            <div className={styles.metaDivider} />
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Published</div>
              <div className={styles.metaVal}>October 2026</div>
            </div>
            <div className={styles.metaDivider} />
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Place</div>
              <div className={styles.metaVal}>Kyoto, Japan</div>
            </div>
          </div>

          <Link href="/journal/kyoto-temple" className={styles.readLink}>
            Read the essay
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
