import styles from './OurStoryBeliefs.module.css';

const beliefs = [
  {
    title: 'Travel\nshould restore.',
    body: 'Not by being comfortable — though comfort matters — but by being slow enough that the nervous system actually settles, the quality of attention deepens, and the person returns to their ordinary life carrying something they did not have when they left.',
  },
  {
    title: 'Luxury is\nmeasured in time.',
    body: 'The luxury of arriving somewhere a day before anyone expects anything of you. The luxury of staying long enough that a place becomes familiar rather than exotic. The luxury of an afternoon with no particular purpose except the quality of being in it.',
  },
  {
    title: 'Silence\nhas value.',
    body: 'The morning before the guided visit. The gap between dinner and sleep. The unscheduled hour in a garden that was tended before you arrived. Silence in a journey communicates, like silence in music, everything that the surrounding material cannot say.',
  },
  {
    title: 'Every place\nhas its rhythm.',
    body: 'Kyoto moves differently from Oaxaca. The Scottish Highlands move differently from Bali. A journey that respects the rhythm of the place it visits produces an experience that the place itself is participating in. A journey that imposes its own rhythm on the place visits it without really arriving.',
  },
  {
    title: 'Architecture\nshapes emotion.',
    body: 'The room you wake up in determines the quality of the morning. The building that surrounds a meal changes what the meal means. Old stone, warm timber, a window placed by someone who understood light — these are not aesthetic preferences. They are the conditions under which the deepest forms of rest occur.',
  },
  {
    title: 'Details\nare the point.',
    body: 'The specific hour the guide suggested for this particular garden. The obscure restaurant chosen because it has been feeding the same neighbourhood for three generations. The room facing east because the east wall catches the first light. These are not improvements on a standard journey. They are what the journey actually is.',
  },
];

export default function OurStoryBeliefs() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>What we believe</span>
        </div>
        <h2 className={styles.h2}>Six beliefs that shape every decision we make.</h2>
      </div>

      <div className={styles.grid}>
        {beliefs.map((b, i) => (
          <div key={i} className={`${styles.cell} ${i >= 3 ? styles.cellBottomRow : ''} ${i % 3 !== 0 ? styles.cellNotFirst : ''}`}>
            <div className={styles.title}>{b.title.split('\n').map((line, j) => (
              <span key={j}>{line}{j === 0 && <br />}</span>
            ))}</div>
            <p className={styles.body}>{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
