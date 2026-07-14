import Image from 'next/image';
import styles from './CulturalDay.module.css';

const moments = [
  {
    time: '05:45',
    label: 'Morning',
    title: 'The market before the market is for you.',
    body: 'The working market at six in the morning belongs entirely to the people who supply it and the people who buy from it. You are there as a witness, with a guide who has been shopping here every morning for years and who buys what is worth buying.',
    img: '/images/Cultural Immersion/CI-DAY-01.png',
    imgGrad: 'linear-gradient(158deg, oklch(28% 0.026 44) 0%, oklch(19% 0.018 40) 55%, oklch(14% 0.012 36) 100%)',
    accent: true,
  },
  {
    time: '10:30',
    label: 'Morning / Workshop',
    title: 'The artisan\'s studio, during working hours.',
    body: 'An hour with the ceramicist, or the weaver, or the woodworker — not a demonstration but a working morning in which you observe someone doing something they have been doing for thirty years. The difference between seeing craft and being present for it.',
    img: '/images/Cultural Immersion/CI-DAY-02.png',
    imgGrad: 'linear-gradient(155deg, oklch(30% 0.028 56) 0%, oklch(21% 0.020 52) 55%, oklch(15% 0.014 48) 100%)',
    accent: false,
  },
  {
    time: '14:00',
    label: 'Afternoon',
    title: 'The old neighbourhood, without a map.',
    body: 'Your guide has suggested a direction. The rest is yours. The streets are old enough to have been worn into their own logic. The doorways, the thresholds, the windows at odd heights — the architecture of a place that was not built for visitors.',
    img: '/images/Cultural Immersion/CI-DAY-03.png',
    imgGrad: 'linear-gradient(152deg, oklch(26% 0.022 60) 0%, oklch(18% 0.016 56) 55%, oklch(13% 0.010 52) 100%)',
    accent: false,
  },
  {
    time: '19:30',
    label: 'Evening',
    title: 'Dinner that tells you where you are.',
    body: 'The restaurant is not the obvious one. It is the one in the neighbourhood that has been feeding the same families for three generations and has no need to explain itself. Tonight, you are one of those people.',
    img: '/images/Cultural Immersion/CI-DAY-04.png',
    imgGrad: 'linear-gradient(150deg, oklch(20% 0.018 48) 0%, oklch(14% 0.012 44) 55%, oklch(10% 0.008 40) 100%)',
    accent: false,
  },
];

export default function CulturalDay() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>A Day of Immersion</span>
        </div>
        <h2 className={styles.heading}>
          Not an itinerary.<br />
          <em className={styles.headingMuted}>A way of moving through a place.</em>
        </h2>
      </div>

      <div className={styles.grid}>
        {moments.map((m) => (
          <div key={m.time} className={styles.col}>
            <div className={styles.imgWrap} style={{ background: m.imgGrad }}>
              <Image src={m.img} alt={m.label} fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              <div className={styles.imgFade} />
              <div className={styles.timestamp}>{m.time}</div>
            </div>
            <div className={`${styles.content} ${m.accent ? styles.contentGold : styles.contentStone}`}>
              <div className={styles.colLabel}>{m.label}</div>
              <h3 className={styles.colTitle}>{m.title}</h3>
              <p className={styles.colBody}>{m.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
