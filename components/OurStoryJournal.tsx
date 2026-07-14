import Image from 'next/image';
import Link from 'next/link';
import styles from './OurStoryJournal.module.css';

export default function OurStoryJournal() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>The Journal</span>
          </div>
          <h2 className={styles.h2}>Further reading.</h2>
        </div>
        <Link href="/journal" className={styles.viewAll}>
          All journal entries
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
          </svg>
        </Link>
      </div>

      <div className={styles.grid}>
        {/* Featured */}
        <div className={styles.featured}>
          <div className={styles.featuredImgPh}>
            <Image src="/images/Private concierge Begin your Journey Our story/OS-JOUR-01.png" alt="Our Story journal" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          </div>
          <div className={styles.tag}>Essay · 14 min read</div>
          <h3 className={styles.featuredTitle}>Why we travel and what we secretly hope to find that we do not admit we are looking for.</h3>
          <p className={styles.featuredBody}>On the unnamed want that drives most meaningful travel — not adventure, not beauty, not even rest — and the particular quality of journey that is capable of addressing it.</p>
          <Link href="/journal/kyoto-temple" className={styles.readLink}>
            Read the essay
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
            </svg>
          </Link>
        </div>

        {/* Secondary 1 */}
        <div className={styles.secondary}>
          <div className={styles.tag}>Essay · 10 min read</div>
          <h3 className={styles.secondaryTitle}>On the particular pleasure of having stayed somewhere long enough to begin to understand it.</h3>
          <Link href="/journal/why-we-travel-before-the-season" className={styles.readLinkStone}>
            Read
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
            </svg>
          </Link>
        </div>

        {/* Secondary 2 */}
        <div className={styles.secondary}>
          <div className={styles.tag}>Architecture · 9 min read</div>
          <h3 className={styles.secondaryTitle}>The buildings that were made for winter, and what they know about warmth that summer architecture cannot.</h3>
          <Link href="/journal/doing-nothing-abroad" className={styles.readLinkStone}>
            Read
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
