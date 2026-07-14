import Image from 'next/image';
import Link from 'next/link';
import styles from './JourneysJournal.module.css';

const ArrowRight = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
  </svg>
);

export default function JourneysJournal() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>The Journal</span>
          </div>
          <h2 className={styles.heading}>Further reading.</h2>
        </div>
        <Link href="/journal" className={styles.allLink}>
          All journal entries <ArrowRight />
        </Link>
      </div>

      <div className={styles.grid}>
        <Link href="/journal/kyoto-temple" className={styles.featured}>
          <div className={styles.featuredImg}>
            <Image src="/images/Journeys overview/JO-JOUR-01.png" alt="Journal" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          </div>
          <div className={styles.featuredMeta}>Essay · 12 min read</div>
          <h3 className={styles.featuredTitle}>The journey before the season, and the particular honesty it finds there.</h3>
          <p className={styles.featuredBody}>On the week before the famous week — and why the most interesting version of almost any destination exists in the days before it becomes what everyone comes to see.</p>
          <span className={styles.featuredLink}>Read the essay <ArrowRight /></span>
        </Link>

        <Link href="/journal/dolomites-high-summer" className={styles.secondary}>
          <div className={styles.secondaryMeta}>Journal · 8 min read</div>
          <h3 className={styles.secondaryTitle}>On the particular relationship between remoteness and proportion.</h3>
          <p className={styles.secondaryBody}>Why the journeys that go furthest from ordinary life tend to return the most useful information about it — and how long one must stay for this effect to occur.</p>
          <span className={styles.secondaryLink}>Read <ArrowRight /></span>
        </Link>

        <Link href="/journal/medina-before-the-souks" className={styles.secondary}>
          <div className={styles.secondaryMeta}>Essay · 9 min read</div>
          <h3 className={styles.secondaryTitle}>The question that precedes every good journey, and why it is so rarely asked first.</h3>
          <p className={styles.secondaryBody}>Not where would you like to go — but what quality of time are you looking for? The question that changes every answer that follows it.</p>
          <span className={styles.secondaryLink}>Read <ArrowRight /></span>
        </Link>
      </div>
    </section>
  );
}
