import Image from 'next/image';
import Link from 'next/link';
import styles from './WellnessFeatured.module.css';

const stops = [
  { nights: 'Nights 1–2', place: 'Gion', note: 'Machiya townhouse in the heart of the historic district', accent: 'gold' },
  { nights: 'Nights 3–5', place: 'Hoshinoya Kyoto', note: 'Arrived by boat along the Oi River, surrounded by forest', accent: 'stone' },
  { nights: 'Nights 6–7', place: 'Arashiyama', note: 'The bamboo grove at first light, the last evening in the hills', accent: 'stone' },
];

export default function WellnessFeatured() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Image side — 52% */}
        <div className={styles.imageSide}>
          <div className={styles.imgWrap}>
            <div className={`${styles.imgPlaceholder}`}>
              <Image src="/images/Wellness/WC-FEAT-01.png" alt="Kyoto, Hoshinoya — Wellness & Restoration featured journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            </div>
            <div className={styles.imgCaption}>Kyoto · November · 05:48</div>
          </div>
        </div>

        {/* Text side — 48% */}
        <div className={styles.textSide}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Featured Journey</span>
          </div>

          <div className={styles.destination}>Kyoto &amp; Hoshinoya</div>

          <h2 className={styles.heading}>
            Seven days in the city<br />
            <em className={styles.headingItalic}>that refuses to hurry.</em>
          </h2>

          <p className={styles.body}>
            November is the correct month. Not for the famous foliage — that arrives in the third week and brings the crowds with it — but for the ten days before it, when the temples are quiet and the light has the particular quality of a season in the act of changing its mind.
          </p>

          <p className={styles.body}>
            MERIDIAN has curated a seven-night sequence that begins in the Gion machiya and moves gradually westward, ending at Hoshinoya Kyoto — a property that can only be reached by boat and exists in a state of deliberate remove from everything the city is known for being.
          </p>

          <div className={styles.itinerary}>
            <div className={styles.itinLabel}>The sequence</div>
            <div className={styles.spine}>
              {stops.map((s, i) => (
                <div key={i} className={`${styles.stop} ${s.accent === 'gold' ? styles.stopGold : styles.stopStone}`}>
                  <div className={styles.stopNights}>{s.nights}</div>
                  <div className={styles.stopPlace}>{s.place}</div>
                  <div className={styles.stopNote}>{s.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.meta}>
              <span className={styles.metaItem}>7 nights</span>
              <span className={styles.metaDot} />
              <span className={styles.metaItem}>From ¥1,480,000 per person</span>
            </div>
            <Link href="/begin-your-journey" className={styles.btn}>Request this journey</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
