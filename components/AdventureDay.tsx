import Image from 'next/image';
import styles from './AdventureDay.module.css';

const days = [
  {
    time: '05:15',
    label: 'Before dawn',
    title: 'The landscape before it has an audience.',
    body: 'The hour before light has committed to a direction. The sky beginning to separate from the land. Your guide is already in position. This is not early for the sake of it. This is the only time this particular view exists in this particular way.',
    img: '/images/Adventure & Landscape/AL-DAY-01.png',
    gold: true,
    bg: 'linear-gradient(158deg, oklch(20% 0.016 220) 0%, oklch(14% 0.010 216) 55%, oklch(10% 0.006 212) 100%)',
  },
  {
    time: '09:30',
    label: 'Morning walk',
    title: 'Moving through the landscape rather than looking at it.',
    body: 'Three or four hours on foot, with a guide who understands that the walk is not a means of reaching a view but a relationship with the landscape\'s own pace. The quality of attention that walking produces is different from the quality produced by any vehicle. It is the correct scale for this terrain.',
    img: '/images/Adventure & Landscape/AL-DAY-02.png',
    gold: false,
    bg: 'linear-gradient(155deg, oklch(24% 0.018 218) 0%, oklch(16% 0.012 214) 55%, oklch(11% 0.007 210) 100%)',
  },
  {
    time: '14:00',
    label: 'Afternoon rest',
    title: 'Staying in one place long enough for it to change.',
    body: 'The view from a single vantage point across four hours of changing light is never the same view four times. Cloud, shadow, wind — the landscape continues to be itself. The person who remained to watch has seen something the person who photographed and moved on did not.',
    img: '/images/Adventure & Landscape/AL-DAY-03.png',
    gold: false,
    bg: 'linear-gradient(152deg, oklch(22% 0.014 222) 0%, oklch(15% 0.010 218) 55%, oklch(11% 0.006 214) 100%)',
  },
  {
    time: '20:00',
    label: 'Evening return',
    title: 'The warmth of inside, after all that outside.',
    body: 'The meal is simple because simplicity is correct after a day in a large landscape. The fire, the food from the immediate region, the conversation that arrives easily between people who have spent a day together in open air. The particular quality of sleep that follows.',
    img: '/images/Adventure & Landscape/AL-DAY-04.png',
    gold: false,
    bg: 'linear-gradient(150deg, oklch(18% 0.014 220) 0%, oklch(12% 0.009 216) 55%, oklch(9% 0.005 212) 100%)',
  },
];

export default function AdventureDay() {
  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>A Day in the Landscape</span>
        </div>
        <h2 className={styles.heading}>
          Not a programme.<br />
          <em>A relationship with the day.</em>
        </h2>
      </div>

      <div className={styles.grid}>
        {days.map((d) => (
          <div key={d.time} className={styles.column}>
            <div className={styles.imgWrap} style={{ background: d.bg }}>
              <Image src={d.img} alt={d.label} fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              <div className={styles.imgOverlay} />
              <div className={styles.timestamp}>{d.time}</div>
            </div>
            <div className={d.gold ? styles.contentGold : styles.contentStone}>
              <div className={styles.label}>{d.label}</div>
              <h3 className={styles.title}><em>{d.title}</em></h3>
              <p className={styles.body}>{d.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
