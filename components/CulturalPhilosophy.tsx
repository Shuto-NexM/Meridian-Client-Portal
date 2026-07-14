import styles from './CulturalPhilosophy.module.css';

export default function CulturalPhilosophy() {
  return (
    <section id="philosophy" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>The Philosophy</span>
          </div>
          <h2 className={styles.heading}>
            Not every culture<br />is understood by visiting.<br />
            <em className={styles.headingMuted}>Some require time.</em>
          </h2>
        </div>

        <div className={styles.bodyGrid}>
          <div>
            <p className={styles.body}>There is a kind of travel that accumulates sights. And there is a kind that accumulates understanding. They are not the same thing, and they do not produce the same memories. The first produces photographs. The second produces something that alters, in some quiet and permanent way, the pace at which you move through your own life afterwards.</p>
            <p className={styles.body}>MERIDIAN&rsquo;s Cultural Immersion journeys are designed around the second kind. Every destination in this collection was chosen because it has a particular way of doing ordinary things &mdash; preparing food, observing the season, practising a craft, beginning the morning &mdash; that rewards the visitor who slows down sufficiently to actually see it.</p>
          </div>
          <div>
            <p className={styles.body}>We do not arrange cultural experiences. We arrange the conditions under which culture becomes visible to a person who is paying the right quality of attention. The difference matters. The arranged experience communicates something about what a culture is. The discovered one communicates something about what it feels like to belong to it, however briefly.</p>
            <p className={styles.body}>Every journey in this collection asks of its guest the same thing: the willingness to proceed at the pace of the place, rather than at the pace of the itinerary. In most cases this is slower. In every case it is more rewarding.</p>
          </div>
        </div>

        <div className={styles.quoteWrapper}>
          <blockquote className={styles.blockquote}>
            &ldquo;The most interesting thing about any culture is not its most famous expression. It is the ordinary morning &mdash; the ritual enacted by people who have been doing it this way for generations, for reasons that are simply obvious to them.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
