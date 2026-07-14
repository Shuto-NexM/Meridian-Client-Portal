import Image from 'next/image';
import Link from 'next/link';
import styles from './HoneymoonJournal.module.css';

export default function HoneymoonJournal() {
  return (
    <section className={styles.section}>
      <div className={styles.topBar}>
        <div>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>The Journal</span>
          </div>
          <h2 className={styles.heading}>Further reading.</h2>
        </div>
        <Link href="/journal" className={styles.viewAll}>
          All journal entries
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
        </Link>
      </div>

      <div className={styles.grid}>
        <Link href="/journal/honeymoon-as-pace" className={styles.featured}>
          <div className={styles.featuredImg}>
            <Image src="/images/Honeymoon/HJ-JOUR-01.png" alt="Honeymoon journal — intimate travel scene" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          </div>
          <div className={styles.tag}>Essay · 12 min read</div>
          <h3 className={styles.featuredTitle}><em>On the particular quality of time that belongs only to two people who have stopped trying to use it well.</em></h3>
          <p className={styles.featuredBody}>What the honeymoon period actually is, and why the best version of it requires the deliberate removal of everything that fills ordinary hours — and what emerges in the space that remains.</p>
          <span className={styles.readLink}>
            Read the essay
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
          </span>
        </Link>

        <Link href="/journal/why-we-travel-before-the-season" className={styles.secondary}>
          <div className={styles.tag}>Journal · 7 min read</div>
          <h3 className={styles.secondaryTitle}><em>Bhutan in October: ten days with no agenda other than the quality of each morning.</em></h3>
          <p className={styles.secondaryBody}>A personal account of a journey that was not designed to produce memorable experiences — and which produced more of them than any journey designed for that purpose.</p>
          <span className={styles.readLinkSm}>
            Read
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
          </span>
        </Link>

        <Link href="/journal/doing-nothing-abroad" className={styles.secondary}>
          <div className={styles.tag}>Essay · 9 min read</div>
          <h3 className={styles.secondaryTitle}><em>Why the best shared journeys are the ones where nothing of consequence happened, and both people remember every day of them.</em></h3>
          <p className={styles.secondaryBody}>On the difference between the kind of journey you describe at dinner parties and the kind that quietly changes how you move through the rest of your life together.</p>
          <span className={styles.readLinkSm}>
            Read
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
