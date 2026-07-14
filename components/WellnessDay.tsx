import Image from 'next/image';
import styles from './WellnessDay.module.css';

const moments = [
  {
    time: '05:30',
    label: 'Morning',
    title: 'The still hour',
    body: 'The garden before the light arrives. A path through pine and moss walked in silence. The particular quality of cold air at altitude and the discipline it instills in the lungs.',
    img: '/images/Wellness/WC-DAY-01.png',
    imgGrad: 'linear-gradient(152deg, oklch(28% 0.030 72) 0%, oklch(20% 0.020 68) 60%, oklch(15% 0.012 65) 100%)',
    accent: true,
  },
  {
    time: '13:00',
    label: 'Afternoon',
    title: 'The slow hour',
    body: 'Lunch taken without urgency. A body of water nearby that does not require anything of you — to swim in, or simply to observe from a distance while the day rearranges itself.',
    img: '/images/Wellness/WC-DAY-02.png',
    imgGrad: 'linear-gradient(148deg, oklch(32% 0.022 82) 0%, oklch(22% 0.016 78) 60%, oklch(16% 0.012 72) 100%)',
    accent: false,
  },
  {
    time: '19:30',
    label: 'Evening',
    title: 'The golden hour',
    body: 'The shift of light that arrives at a specific angle and lasts, in the best places, for a specific number of minutes. A private table. A single glass of something cold. The sound of the kitchen preparing itself.',
    img: '/images/Wellness/WC-DAY-03.png',
    imgGrad: 'linear-gradient(155deg, oklch(30% 0.042 68) 0%, oklch(22% 0.030 62) 60%, oklch(16% 0.018 58) 100%)',
    accent: false,
  },
  {
    time: '23:00',
    label: 'Night',
    title: 'The dark hour',
    body: 'The temperature that arrives after midnight in the mountains. The particular weight of a bed in a room designed to be dark. Sleep, uninterrupted, until the body decides that it has had enough of it.',
    img: '/images/Wellness/WC-DAY-04.png',
    imgGrad: 'linear-gradient(160deg, oklch(18% 0.012 215) 0%, oklch(13% 0.008 210) 60%, oklch(10% 0.006 205) 100%)',
    accent: false,
  },
];

export default function WellnessDay() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>A day without obligation</span>
        </div>
        <h2 className={styles.heading}>
          The shape of<br />
          <em className={styles.headingMuted}>a restorative day.</em>
        </h2>
      </div>

      <div className={styles.timeline}>
        {moments.map((m) => (
          <div key={m.label} className={`${styles.col} ${m.accent ? styles.colAccent : ''}`}>
            <div className={styles.colTime}>{m.time}</div>
            <div className={styles.colLabel}>{m.label}</div>

            <div className={styles.imgWrap} style={{ background: m.imgGrad }}>
              <Image src={m.img} alt={m.label} fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              <div className={styles.imgFade} />
            </div>

            <div className={styles.colContent}>
              <h3 className={styles.colTitle}>{m.title}</h3>
              <p className={styles.colBody}>{m.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
