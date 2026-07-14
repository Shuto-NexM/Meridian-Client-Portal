import Link from 'next/link';
import styles from './JourneysSeasonal.module.css';

const seasonalJourneys = [
  {
    meta: 'Japan · 7 nights',
    title: 'Kyoto, before the famous week.',
    body: 'The colour has arrived, but the crowds have not. The only week in the year when Kyoto belongs entirely to itself.',
  },
  {
    meta: 'Andalusia · 8 nights',
    title: 'The south, outside its own season.',
    body: 'October. The olive harvest. The Alhambra at seven in the morning receives thirty visitors rather than three thousand.',
  },
  {
    meta: 'Patagonia · 9 nights',
    title: 'The end of summer. The best light.',
    body: 'March in Patagonia is the autumn of the south. Dramatic light, fewer people, and the estancias still open.',
  },
];

export default function JourneysSeasonal() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>The Season</span>
          </div>
          <h2 className={styles.heading}>
            Journeys worth considering<br />
            <em className={styles.headingItalic}>this autumn.</em>
          </h2>
        </div>
        <p className={styles.intro}>
          The following journeys are in their finest condition between September and November. The brief window when each place is exactly what it is without being managed for public consumption.
        </p>
      </div>

      <div className={styles.grid}>
        {seasonalJourneys.map((j, i) => (
          <div key={i} className={`${styles.cell} ${i === 1 ? styles.cellMiddle : ''}`}>
            <div className={styles.cellMeta}>{j.meta}</div>
            <div className={styles.cellTitle}>{j.title}</div>
            <p className={styles.cellBody}>{j.body}</p>
            <Link href="/journeys" className={styles.cellLink}>
              Explore
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
