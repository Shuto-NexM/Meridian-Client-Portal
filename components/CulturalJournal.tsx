import Image from 'next/image';
import Link from 'next/link';
import styles from './CulturalJournal.module.css';

export default function CulturalJournal() {
  return (
    <section className={styles.section}>
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>The Journal</span>
          </div>
          <h2 className={styles.heading}>Further reading.</h2>
        </div>
        <Link href="/journal" className={styles.viewAll}>
          All journal entries
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
          </svg>
        </Link>
      </div>

      <div className={styles.grid}>
        {/* Featured */}
        <Link href="/journal/medina-before-the-souks" className={styles.featured}>
          <div className={styles.featImg}>
            <Image src="/images/Cultural Immersion/CI-JOUR-01.png" alt="Cultural Immersion journal — temple detail" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          </div>
          <div className={styles.articleLabel}>Essay · 14 min read</div>
          <h3 className={styles.featTitle}>On the difference between visiting a culture and inhabiting it, however briefly.</h3>
          <p className={styles.featBody}>Why the most meaningful encounters on any cultural journey are almost always the ones that were not arranged — and how to create the conditions in which they can occur.</p>
          <span className={styles.featLink}>
            Read the essay
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
            </svg>
          </span>
        </Link>

        {/* Secondary 1 */}
        <Link href="/journal/bhutan-measure-of-wealth" className={styles.secondary}>
          <div className={styles.articleLabel}>Journal · 8 min read</div>
          <h3 className={styles.secTitle}>Noto Peninsula: what the earthquake did not take.</h3>
          <p className={styles.secBody}>A personal account of returning to the Noto Peninsula eighteen months after the 2024 earthquake, and finding something in the reconstruction that was not there before.</p>
          <span className={styles.secLink}>
            Read
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
            </svg>
          </span>
        </Link>

        {/* Secondary 2 */}
        <Link href="/journal/why-we-travel-before-the-season" className={styles.secondary}>
          <div className={styles.articleLabel}>Essay · 10 min read</div>
          <h3 className={styles.secTitle}>What the morning market knows that the afternoon cannot say.</h3>
          <p className={styles.secBody}>On the particular form of cultural intelligence that exists in working markets at five in the morning — and why the tourist market at noon is not the same thing.</p>
          <span className={styles.secLink}>
            Read
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
