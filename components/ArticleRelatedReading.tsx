import Image from 'next/image';
import Link from 'next/link';
import styles from './ArticleRelatedReading.module.css';

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

export default function ArticleRelatedReading() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Continue reading</span>
          </div>
          <h2 className={styles.h2}>Related essays.</h2>
        </div>
        <Link href="/journal" className={styles.allLink}>
          All essays <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
        </Link>
      </div>

      <div className={styles.grid}>
        {/* Featured related — with image */}
        <Link href="/journal/why-we-travel-before-the-season" className={styles.featCard}>
          <div className={styles.featImgWrap}>
            <div className={styles.featImgBg} />
            <Image src="/images/Jernal overview & Article template/JA-REL-01.png" alt="Silence — mountain and still water" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          </div>
          <div className={styles.featMeta}>
            <span className={styles.tag}>Silence</span>
            <span className={styles.dot}>·</span>
            <span className={styles.readTime}>7 min read</span>
          </div>
          <h3 className={styles.featTitle}>On the difficulty of sitting in silence and the value of getting better at it.</h3>
          <p className={styles.featBody}>Why silence is a skill rather than an absence — and why the places most worth visiting tend to be the ones that teach it whether or not you came intending to learn.</p>
          <span className={styles.readLink}>Read <ArrowIcon /></span>
        </Link>

        {/* Secondary 1 — text only */}
        <Link href="/journal/case-for-arriving-early" className={styles.secondaryCard}>
          <div className={styles.secondaryMeta}>
            <span className={styles.tag}>Morning Rituals</span>
            <span className={styles.dot}>·</span>
            <span className={styles.readTime}>8 min read</span>
          </div>
          <h3 className={styles.secondaryTitle}>Why every meaningful journey should include at least one morning with nowhere to be.</h3>
          <span className={`${styles.readLink} ${styles.readLinkBottom}`}>Read <ArrowIcon /></span>
        </Link>

        {/* Secondary 2 — text only */}
        <Link href="/journal/doing-nothing-abroad" className={styles.secondaryCard}>
          <div className={styles.secondaryMeta}>
            <span className={styles.tag}>Walking</span>
            <span className={styles.dot}>·</span>
            <span className={styles.readTime}>13 min read</span>
          </div>
          <h3 className={styles.secondaryTitle}>On walking without a destination, which is a different thing from being lost.</h3>
          <span className={`${styles.readLink} ${styles.readLinkBottom}`}>Read <ArrowIcon /></span>
        </Link>
      </div>
    </section>
  );
}
