import styles from './HoneymoonQualities.module.css';

const qualities = [
  {
    title: 'Mornings',
    body: 'The morning that belongs to two people who have nowhere they need to be at any particular hour. Tea that arrives at the exact moment of wanting it. The window and what it shows. The particular quality of an unhurried beginning.',
  },
  {
    title: 'Silence',
    body: 'The shared silence of two people who have run out of the need to fill every pause with speech. This takes several days to arrive. These journeys are designed with that arrival in mind — and with enough time for what comes after it.',
  },
  {
    title: 'Table',
    body: 'A meal that takes two hours by design. A kitchen that sends things when they are ready rather than when they are scheduled. A table placed where the view changes with the light. The dinner that has nowhere it needs to arrive at, except completion.',
  },
  {
    title: 'Walk',
    body: 'The walk without a destination — that begins when two people are ready, proceeds at the pace of the slower one, and turns around when the view in the other direction becomes interesting. The walk that is complete when it ends, not when it arrives anywhere.',
  },
  {
    title: 'Library',
    body: 'The room with books and two good chairs and a view through a window that changes throughout the afternoon. The particular intimacy of two people reading beside each other. Companionship without obligation. Presence without performance.',
  },
  {
    title: 'Weather',
    body: 'The rain that keeps two people inside, which turns out to be an improvement on whatever was planned. The fog that makes the lake private. The afternoon that closes early and makes the interior warmer than it would otherwise be. Weather as collaborator.',
  },
  {
    title: 'Room',
    body: 'The room that was prepared for exactly this purpose — not for sleep alone but for the whole duration of a day. The window placed at a height designed for sitting, not standing. The bath drawn at the exact temperature the hour requires. A room that functions as a place of habitation rather than accommodation.',
  },
  {
    title: 'Return',
    body: 'The particular quality of homecoming after a journey that was long enough and unhurried enough to have actually changed something. The ordinary life returned to, but approached with a different quality of attention than the one with which it was left. This is what these journeys are for.',
  },
];

export default function HoneymoonQualities() {
  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>What These Journeys Offer</span>
        </div>
        <h2 className={styles.heading}>Eight qualities every journey in this collection possesses.</h2>
      </div>

      <div className={styles.grid}>
        {qualities.map((q) => (
          <div key={q.title} className={styles.cell}>
            <div className={styles.qualityTitle}><em>{q.title}</em></div>
            <p className={styles.qualityBody}>{q.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
