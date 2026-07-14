import Image from 'next/image';
import Link from 'next/link';
import styles from './AdventureJournal.module.css';

export default function AdventureJournal() {
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
        {/* Featured */}
        <Link href="/journal/dolomites-high-summer" className={styles.featured}>
          <div className={styles.featuredImg}>
            <Image src="/images/Adventure & Landscape/AL-JOUR-01.png" alt="Adventure & Landscape journal — wilderness scene" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          </div>
          <div className={styles.tag}>Essay · 11 min read</div>
          <h3 className={styles.featuredTitle}><em>What very large landscapes do to the size of everything else.</em></h3>
          <p className={styles.featuredBody}>On the particular recalibration that occurs when a person has been in a genuinely remote landscape for more than three days — and why this effect persists, in some form, for months after the return.</p>
          <span className={styles.readLink}>
            Read the essay
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
          </span>
        </Link>

        {/* Secondary 1 */}
        <Link href="/journal/why-we-travel-before-the-season" className={styles.secondary}>
          <div className={styles.tag}>Journal · 7 min read</div>
          <h3 className={styles.secondaryTitle}><em>Patagonia in March: nine days in a place that makes no concessions.</em></h3>
          <p className={styles.secondaryBody}>A personal account of the journey south — the estancias, the horseback days, the evening the towers turned pink for forty minutes — and the quality of attention a landscape like this requires and eventually produces.</p>
          <span className={styles.readLinkSm}>
            Read
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
          </span>
        </Link>

        {/* Secondary 2 */}
        <Link href="/journal/doing-nothing-abroad" className={styles.secondary}>
          <div className={styles.tag}>Essay · 9 min read</div>
          <h3 className={styles.secondaryTitle}><em>On fog, and the particular form of attention it produces in a landscape that usually has a long view.</em></h3>
          <p className={styles.secondaryBody}>Why the best photographs from this collection are almost never made in clear weather — and what the overcast morning communicates about a landscape that the clear one conceals.</p>
          <span className={styles.readLinkSm}>
            Read
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
