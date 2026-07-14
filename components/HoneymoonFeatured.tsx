import Image from 'next/image';
import Link from 'next/link';
import styles from './HoneymoonFeatured.module.css';

export default function HoneymoonFeatured() {
  return (
    <section className={styles.section}>
      <div className={styles.topBar}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>Featured Journey</span>
        </div>
      </div>

      <div className={styles.split}>
        <div className={styles.imageWrap}>
          <Image src="/images/Honeymoon/HJ-FEAT-01.png" alt="Provence, France — featured honeymoon journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div className={styles.imgFade} />
          <div className={styles.imgCaption}>Provence, France · September · 08:05</div>
        </div>

        <div className={styles.content}>
          <div className={styles.meta}>Provence · 8 nights · September</div>
          <h2 className={styles.heading}><em>When the harvest is in and the light changes its mind.</em></h2>
          <p className={styles.body}>September in Provence carries a quality of light that July does not possess — lower, amber, arriving at angles that make the stone of old farmhouses warm from within. The lavender is gone. The tourists are largely gone. What remains is the place itself, in its most genuinely Provençal condition.</p>
          <p className={styles.body}>Eight nights at a private mas in the Luberon — a farmhouse that has been in one family for four generations and which accepts a small number of guests in the way that a well-considered house accepts friends: with the expectation that they will make themselves at home and stay as long as suits them.</p>

          <div className={styles.spine}>
            <div className={`${styles.spineRow} ${styles.spineRowFirst}`}>
              <span className={styles.daysGold}>Days 1–3</span>
              <span className={styles.spineText}>The mas · Arrive, settle, discover the garden at the pace it deserves.</span>
            </div>
            <div className={styles.spineRow}>
              <span className={styles.daysStone}>Days 4–6</span>
              <span className={styles.spineText}>The villages of the Luberon · Walk, lunch, return. No schedule beyond daylight.</span>
            </div>
            <div className={`${styles.spineRow} ${styles.spineRowLast}`}>
              <span className={styles.daysStone}>Days 7–8</span>
              <span className={styles.spineText}>The last mornings · Leave with difficulty. This is a sign it worked.</span>
            </div>
          </div>

          <div className={styles.ctas}>
            <Link href="/journeys/lake-como" className={styles.btnGold}>Explore this journey</Link>
            <Link href="/begin-your-journey" className={styles.btnText}>
              Speak with a concierge
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
