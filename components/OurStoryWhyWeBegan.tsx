import styles from './OurStoryWhyWeBegan.module.css';

export default function OurStoryWhyWeBegan() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Why we began</span>
          </div>
          <h2 className={styles.h2}>The observation that started everything.</h2>
        </div>

        <div className={styles.body}>
          <div>
            <p className={styles.p}>There is a form of travel that the industry has become extraordinarily good at delivering. It is efficient, well-organised, comprehensively reviewed, and optimised for the production of experiences at the highest possible density across the shortest possible duration. It fills every available hour with something worth photographing, every available meal with something worth recommending, every available day with something worth having done.</p>
            <p className={styles.p}>And it produces, reliably, a particular quality of exhaustion that no amount of rest during the journey itself can address — because the exhaustion is not physical. It is the exhaustion of a person who has been consuming experiences rather than having them. Who has been present at a series of events without ever being fully present inside any single one.</p>
          </div>
          <div>
            <p className={styles.p}>We began with the observation that the journeys people remembered most vividly — the ones that had actually changed something in how they moved through their subsequent lives — were almost never the most efficiently designed. They were the ones in which something had been allowed to happen slowly. A place encountered at length rather than in passing. A morning given entirely to the quality of the light rather than to a destination. A conversation that went on long enough to become something other than the exchange of information.</p>
            <p className={styles.p}>MERIDIAN was founded on the belief that a journey designed around the quality of time rather than its quantity produces a different kind of memory — and a different kind of person. Not someone who has seen more, but someone who has experienced something more completely.</p>
          </div>
        </div>

        <div className={styles.quoteWrap}>
          <blockquote className={styles.quote}>&ldquo;We did not want to make travel better organised. We wanted to make it more honest. To return it to what it was before it was optimised — which is simply the act of being somewhere, fully, for long enough to understand why it mattered.&rdquo;</blockquote>
        </div>
      </div>
    </section>
  );
}
