import Link from 'next/link';
import styles from './MeridianCircle.module.css';

const BENEFITS = [
  { title: 'Private Invitations', body: 'Access to openings, dinners, and private gatherings that Meridian arranges for Circle members only. Things that don\'t exist on any list.' },
  { title: 'Seasonal Letters', body: 'Four times a year, your concierge writes personally. Not a newsletter — a considered note about what the season holds, and what we are holding for you.' },
  { title: 'Hidden Journeys', body: 'Certain itineraries are never published. They exist only within the Circle — for destinations and seasons that cannot be scaled without losing what makes them rare.' },
  { title: 'Concierge Continuity', body: 'The same concierge travels with you across years. They remember what you love. What you avoid. What surprised you. The relationship deepens with every journey.' },
];

export default function MeridianCircle() {
  return (
    <section className={styles.section}>
      <div className={styles.glow}/>
      <div className={styles.grid}>
        <div>
          <div className={styles.eyebrow}><div className={styles.eyebrowLine}/>Meridian Circle</div>
          <h2 className={styles.heading}>An invitation into<br />something continuous.</h2>
          <p className={styles.body}>Meridian Circle is not a programme. It is a continuing relationship. A quiet thread that runs beneath every journey — connecting you to the people, places, and moments that matter most.</p>
          <p className={styles.sub}>It begins with an introduction. Everything else follows at its own pace.</p>
          <div className={styles.rule}/>
          <Link href="/begin-your-journey" className={styles.cta}>Request an introduction</Link>
        </div>
        <div className={styles.benefits}>
          {BENEFITS.map(({ title, body }, i) => (
            <div key={title} className={i < BENEFITS.length - 1 ? styles.benefit : styles.benefitLast}>
              <div className={styles.benefitTitle}>{title}</div>
              <p className={styles.benefitBody}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
