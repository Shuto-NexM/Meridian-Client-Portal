import styles from './AdventureQualities.module.css';

const qualities = [
  {
    title: 'Silence',
    body: 'Not the absence of noise but the presence of something else — the sound of wind on grass, of water over stone, of a landscape going about its business entirely indifferent to whether anyone is listening.',
  },
  {
    title: 'Weather',
    body: 'The itineraries in this collection are shaped by weather rather than resistant to it. Fog over a mountain pass is not an obstacle. It is the condition under which that pass communicates something it conceals in clear light.',
  },
  {
    title: 'Scale',
    body: 'The particular recalibration that occurs when a person has been in a very large landscape for long enough. The concerns that seemed fixed in proportion become movable. Something else, harder to name, becomes more important.',
  },
  {
    title: 'Dawn',
    body: 'Landscapes at dawn are landscapes before the day has committed to itself. The quality of light in the first hour communicates something about the place that noon and afternoon, for all their clarity, cannot replicate.',
  },
  {
    title: 'Distance',
    body: 'The horizon that extends beyond the manageable distance. The view from which the return journey is not immediately visible. The particular freedom produced by being somewhere sufficiently remote that the ordinary world is genuinely unavailable.',
  },
  {
    title: 'Forest',
    body: 'Ancient forest — the kind that has not been managed for commercial purposes — produces an atmosphere that younger forests do not possess. The particular quality of light through old-growth canopy, the sound of a forest that has been a forest for a very long time.',
  },
  {
    title: 'Water',
    body: 'Glacial lakes, tidal straits, rivers that change colour with the season and the depth of the sky above them. Moving water communicates, more directly than any other element of a landscape, the passage of time at geological scale.',
  },
  {
    title: 'Solitude',
    body: 'Not loneliness — presence without performance. The particular quality of being in a landscape with no obligation to be interesting, or interested, or anything other than what you are when no one requires anything of you. This is the rarest luxury these journeys offer.',
  },
];

export default function AdventureQualities() {
  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>What These Landscapes Offer</span>
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
