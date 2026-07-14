import Image from 'next/image';
import styles from './HoneymoonDay.module.css';

const days = [
  {
    time: '08:00',
    label: 'Morning',
    title: 'Tea before the decision of what kind of day to have.',
    body: 'The morning meal that arrives without urgency. The window that faces the garden or the lake or the mountain, depending on where you are. The first conversation of the day, which is never about anything important and is therefore completely important.',
    img: '/images/Honeymoon/HJ-DAY-01.png',
    gold: true,
    bg: 'linear-gradient(158deg, oklch(26% 0.026 72) 0%, oklch(18% 0.018 68) 55%, oklch(13% 0.012 64) 100%)',
  },
  {
    time: '11:30',
    label: 'Morning / Walking',
    title: 'Walking without speaking, which is a different thing from walking in silence.',
    body: 'The walk that begins with no clear destination. The attention that shifts from each other to the landscape and back again naturally. The small thing one of you notices that the other would have walked past. The particular quality of company produced by moving through a good place together.',
    img: '/images/Honeymoon/HJ-DAY-02.png',
    gold: false,
    bg: 'linear-gradient(155deg, oklch(28% 0.022 68) 0%, oklch(20% 0.016 64) 55%, oklch(14% 0.010 60) 100%)',
  },
  {
    time: '15:00',
    label: 'Afternoon',
    title: 'The two chairs in the good light, and what is read in them.',
    body: 'The afternoon room with the right quality of afternoon light. Each with a book chosen the day before or found on a shelf that was well-stocked by someone who understood reading. The hour that passes unnoticed because nothing needed to be done in it. Two people in the same room, each somewhere entirely different.',
    img: '/images/Honeymoon/HJ-DAY-03.png',
    gold: false,
    bg: 'linear-gradient(152deg, oklch(24% 0.020 72) 0%, oklch(17% 0.014 68) 55%, oklch(12% 0.009 64) 100%)',
  },
  {
    time: '20:30',
    label: 'Evening',
    title: 'Dinner at the table that was set while you were somewhere else.',
    body: 'The meal prepared from what the season offers in this particular place at this particular time. Candles not as atmosphere but as light — the only kind that communicates warmth at the right scale. The conversation that goes where it goes. The evening without obligation to be anything other than what it is.',
    img: '/images/Honeymoon/HJ-DAY-04.png',
    gold: false,
    bg: 'linear-gradient(150deg, oklch(20% 0.018 66) 0%, oklch(14% 0.012 62) 55%, oklch(10% 0.008 58) 100%)',
  },
];

export default function HoneymoonDay() {
  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>A Day Together</span>
        </div>
        <h2 className={styles.heading}>
          No itinerary.<br />
          <em>Only the quality of the day itself.</em>
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
