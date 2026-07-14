import Image from 'next/image';
import Link from 'next/link';
import styles from './AdventureFeatured.module.css';

export default function AdventureFeatured() {
  return (
    <section className={styles.section}>
      <div className={styles.topBar}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>Featured Journey</span>
        </div>
      </div>

      <div className={styles.split}>
        {/* Left: image */}
        <div className={styles.imageWrap}>
          <Image src="/images/Adventure & Landscape/AL-FEAT-01.png" alt="Torres del Paine, Patagonia — featured adventure journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div className={styles.imgFade} />
          <div className={styles.imgCaption}>Torres del Paine, Patagonia · March · 06:22</div>
        </div>

        {/* Right: content */}
        <div className={styles.content}>
          <div className={styles.meta}>Patagonia, Chile &amp; Argentina · 9 nights · March</div>
          <h2 className={styles.heading}><em>The world at the end of the map.</em></h2>
          <p className={styles.body}>March in Patagonia is the end of summer and the beginning of the only thing the landscape truly favours: dramatic light, shifting weather, fewer people than in any other month. The estancias are still open. The passes are still clear. The wind is already making its intentions known.</p>
          <p className={styles.body}>Nine nights moving south from the lake district of Patagonia to Torres del Paine — on horseback for three of them, by private vessel for the last two, finishing at the base of the towers that give the park its name, in the particular quality of autumn light that arrives in March and turns the granite pink for exactly forty minutes at dusk.</p>

          <div className={styles.spine}>
            <div className={`${styles.spineRow} ${styles.spineRowFirst}`}>
              <span className={styles.nightsGold}>Nights 1–3</span>
              <span className={styles.spineText}>Lake District · Private estancia. The morning mist on Lago Nahuel Huapi.</span>
            </div>
            <div className={styles.spineRow}>
              <span className={styles.nightsStone}>Nights 4–6</span>
              <span className={styles.spineText}>On horseback, heading south. Camping at altitude. The condor and the wind.</span>
            </div>
            <div className={`${styles.spineRow} ${styles.spineRowLast}`}>
              <span className={styles.nightsStone}>Nights 7–9</span>
              <span className={styles.spineText}>Torres del Paine by vessel. The towers at dusk. Leave slowly.</span>
            </div>
          </div>

          <div className={styles.ctas}>
            <Link href="/journeys/patagonia" className={styles.btnGold}>Explore this journey</Link>
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
