import styles from './WellnessQualities.module.css';

const qualities = [
  {
    title: 'Stillness',
    body: 'The ability to arrive somewhere that does not compete for your attention. A place that asks nothing of you in its presence.',
  },
  {
    title: 'Silence',
    body: 'Not the absence of sound, but the absence of obligation. The particular quiet of mornings in places that have not yet been discovered.',
  },
  {
    title: 'Morning',
    body: 'The hours before the day organises itself. Access to dawn in places where dawn still feels like something worth witnessing.',
  },
  {
    title: 'Sleep',
    body: 'The particular quality of sleep that arrives when the body is finally allowed to let go. Darkness, temperature, the sound of water or wind.',
  },
  {
    title: 'Nature',
    body: 'Landscapes that remind a person of their actual scale. Mountains, ocean, forest — environments that require nothing of you in return.',
  },
  {
    title: 'Light',
    body: 'The kind of light that communicates that this hour does not require anything of you. The light of late afternoon in places built for it.',
  },
  {
    title: 'Ritual',
    body: 'Small ceremonies that give a day its shape — not schedules, but rhythms. The bath, the tea, the hour before dinner spent doing nothing at all.',
  },
  {
    title: 'Return',
    body: 'The knowledge, at the end of a journey, that something has been restored — not added to, not improved, but returned to itself.',
  },
];

export default function WellnessQualities() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>What we look for</span>
          </div>
          <h2 className={styles.heading}>
            Eight qualities a restorative<br />
            <em className={styles.headingMuted}>journey possesses.</em>
          </h2>
        </div>

        <div className={styles.grid}>
          {qualities.map((q) => (
            <div key={q.title} className={styles.cell}>
              <h3 className={styles.cellTitle}>{q.title}</h3>
              <p className={styles.cellBody}>{q.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
