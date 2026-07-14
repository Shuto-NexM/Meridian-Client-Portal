import Image from 'next/image';
import Link from 'next/link';
import styles from './CulturalFeatured.module.css';

const stops = [
  { nights: 'Nights 1–3', place: 'Seville', note: 'Triana neighbourhood. The flamenco heard through a wall, not arranged for you.', accent: true },
  { nights: 'Nights 4–5', place: 'Alpujarras', note: 'A village guesthouse. The olive harvest, if the timing is right.', accent: false },
  { nights: 'Nights 6–8', place: 'Granada', note: 'The Albaicín at dusk. The Alhambra before anyone else arrives.', accent: false },
];

export default function CulturalFeatured() {
  return (
    <section className={styles.section}>
      <div className={styles.eyebrowRow}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>Featured Journey</span>
        </div>
      </div>

      <div className={styles.inner}>
        {/* Image side — 52% */}
        <div className={styles.imageSide}>
          <div className={styles.imgWrap}>
            <div className={styles.imgPlaceholder}>
              <Image src="/images/Cultural Immersion/CI-FEAT-01.png" alt="Andalusia, Spain — featured cultural journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              <div className={styles.imgFadeRight} />
            </div>
            <div className={styles.imgCaption}>Andalusia, Spain · October · 07:14</div>
          </div>
        </div>

        {/* Text side — 48% */}
        <div className={styles.textSide}>
          <div className={styles.destination}>Andalusia · 8 nights · October</div>

          <h2 className={styles.heading}>
            <em>The south, outside the season of itself.</em>
          </h2>

          <p className={styles.body}>
            October in Andalusia is the month the culture returns to itself after the summer. The olive harvest begins. The morning markets in Granada carry produce that has no equivalent in any other season. The Alhambra at seven in the morning receives thirty visitors rather than three thousand.
          </p>
          <p className={styles.body}>
            Eight nights moving from Seville to Granada, with three days in the whitewashed villages of the Alpujarras, where the pace of life has been shaped by the mountain above rather than the road below.
          </p>

          <div className={styles.spine}>
            {stops.map((s, i) => (
              <div key={i} className={`${styles.stop} ${s.accent ? styles.stopGold : styles.stopStone}`}>
                <span className={`${styles.stopNights} ${s.accent ? styles.stopNightsGold : ''}`}>{s.nights}</span>
                <span className={styles.stopNote}>{s.place} · {s.note}</span>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <Link href="/journeys/bhutan" className={styles.btnGold}>Explore this journey</Link>
            <Link href="/begin-your-journey" className={styles.ctaLink}>
              Speak with a concierge
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
