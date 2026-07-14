import Image from 'next/image';
import Link from 'next/link';
import styles from './WellnessRetreats.module.css';

const retreats = [
  {
    name: 'Como Shambhala',
    location: 'Ubud, Bali',
    description: 'A retreat in the forest above the Ayung River. Pavilions connected by jungle paths, sunrise yoga in open-air studios, three-day programmes designed around the particular kind of exhaustion you arrive with.',
    highlights: ['Jungle setting', 'Integrated wellness programmes', 'Private villa residences'],
    img: '/images/Wellness/WC-RET-01.png',
    imgGrad: 'linear-gradient(152deg, oklch(30% 0.042 88) 0%, oklch(22% 0.030 82) 55%, oklch(16% 0.020 76) 100%)',
    season: 'May — October',
  },
  {
    name: 'Amanwella',
    location: 'South Coast, Sri Lanka',
    description: 'A crescent of beach that the Indian Ocean reaches at precisely the right angle in the morning. Seventeen pool suites on the headland. The sound of waves as the primary experience.',
    highlights: ['Private beach', 'Oceanfront pool suites', 'Ayurveda consultations'],
    img: '/images/Wellness/WC-RET-02.png',
    imgGrad: 'linear-gradient(148deg, oklch(28% 0.032 195) 0%, oklch(20% 0.022 188) 55%, oklch(15% 0.016 182) 100%)',
    season: 'December — April',
  },
  {
    name: 'Deplar Farm',
    location: 'Troll Peninsula, Iceland',
    description: 'A converted sheep farm at the edge of a fjord. The northern lights, when present, fill every window. The geothermal pool steams in sub-zero air. Thirteen rooms, no distractions.',
    highlights: ['Northern lights access', 'Geothermal infinity pool', 'Helicopter excursions'],
    img: '/images/Wellness/WC-RET-03.png',
    imgGrad: 'linear-gradient(145deg, oklch(26% 0.018 230) 0%, oklch(18% 0.014 225) 55%, oklch(13% 0.010 218) 100%)',
    season: 'October — March',
  },
  {
    name: 'The Alpina Gstaad',
    location: 'Gstaad, Switzerland',
    description: 'At 1,100 metres, in a valley that the Swiss decided to leave as it was. The Six Senses Spa occupies an entire floor. Snow in December. Silence, year-round.',
    highlights: ['Six Senses Spa', 'Alpine altitude', 'Private ski access'],
    img: '/images/Wellness/WC-RET-04.png',
    imgGrad: 'linear-gradient(155deg, oklch(38% 0.014 218) 0%, oklch(26% 0.010 212) 55%, oklch(18% 0.008 208) 100%)',
    season: 'December — March, July — September',
  },
];

export default function WellnessRetreats() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>Partner Properties</span>
        </div>
        <h2 className={styles.heading}>
          The properties we trust<br />
          <em className={styles.headingMuted}>with your restoration.</em>
        </h2>
      </div>

      <div className={styles.grid}>
        {retreats.map((r) => (
          <div key={r.name} className={styles.card}>
            <div className={styles.imgWrap} style={{ background: r.imgGrad }}>
              <Image src={r.img} alt={r.name} fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              <div className={styles.imgFade} />
            </div>

            <div className={styles.cardBody}>
              <div className={styles.cardLocation}>{r.location}</div>
              <h3 className={styles.cardName}>{r.name}</h3>
              <p className={styles.cardDesc}>{r.description}</p>

              <ul className={styles.highlights}>
                {r.highlights.map((h) => (
                  <li key={h} className={styles.highlight}>{h}</li>
                ))}
              </ul>

              <div className={styles.cardFooter}>
                <em className={styles.cardSeason}>{r.season}</em>
                <Link href="/begin-your-journey" className={styles.cardLink}>Request this property →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
