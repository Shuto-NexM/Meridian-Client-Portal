import styles from './CulturalQualities.module.css';

const qualities = [
  {
    title: 'Craft',
    body: 'The particular intelligence of a person who has been making the same thing by hand for decades and has found, in the repetition, a form of knowledge that no instruction can transmit.',
  },
  {
    title: 'Market',
    body: 'Not the tourist market but the working one. The stalls that open before five. The vendors who have been selling the same thing in the same spot since their parents did. The economy of a place, visible and specific.',
  },
  {
    title: 'Kitchen',
    body: 'Every culture communicates something essential about itself through the way it prepares food. The techniques that have not changed in five generations. The ingredient that grows only in this valley. The meal that begins at the market and ends at the table.',
  },
  {
    title: 'Ceremony',
    body: 'The ritualised act that is performed not for visitors but for the community itself — and which communicates, to the careful observer, something about what that community believes is worth marking.',
  },
  {
    title: 'Archive',
    body: 'Libraries, collections, private holdings. The accumulated record of what a culture thought was worth keeping — and the particular quality of attention produced in a room full of things that have outlasted their makers.',
  },
  {
    title: 'Pace',
    body: 'The speed at which life is lived in a particular place is itself a form of cultural information. The afternoon that closes entirely. The meal that takes three hours by design. The walk that has no destination except the quality of attention it produces.',
  },
  {
    title: 'Stone',
    body: 'The built environment of a place — the streets, the thresholds, the walls of buildings that have been absorbing weather for centuries — communicates a culture\'s relationship with time more honestly than any museum can.',
  },
  {
    title: 'Belonging',
    body: 'The feeling, achieved rarely and only by those who were genuinely present, that a place has accepted you — not as a visitor but as a temporary inhabitant. This is the purpose of immersion. Everything else is in service of this.',
  },
];

export default function CulturalQualities() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>What Immersion Means</span>
        </div>
        <h2 className={styles.heading}>Eight qualities every journey in this collection possesses.</h2>
      </div>

      <div className={styles.grid}>
        {qualities.map((q) => (
          <div key={q.title} className={styles.cell}>
            <div className={styles.cellTitle}>{q.title}</div>
            <p className={styles.cellBody}>{q.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
